import {
  app,
  BrowserWindow,
  clipboard,
  dialog,
  Menu,
  MenuItemConstructorOptions,
  WebContents,
} from "electron";

export interface TabContextMenuOptions {
  tabId: number;
  canCloseOthers: boolean;
  canCloseRight: boolean;
}

export interface TabStripContextMenuOptions {
  canReopen: boolean;
}

export interface AddressContextMenuOptions {
  hasSelection: boolean;
}

function getHostWindow(contents: WebContents): BrowserWindow | null {
  if (contents.isDestroyed()) return null;
  const host = contents.hostWebContents ?? contents;
  return BrowserWindow.fromWebContents(host);
}

export function registerContextMenuHandlers(
  createWindowFn: (tabId?: number, initialURL?: string, isNewWindow?: boolean) => BrowserWindow
) {
  // 1. Handle Webview and Window context menus via app web-contents-created
  app.on("web-contents-created", (_event, contents) => {
    const isWebview = contents.getType() === "webview";

    if (isWebview) {
      // Allow window.open / target="_blank" inside webviews to open in a new Alma tab
      contents.setWindowOpenHandler(({ url }) => {
        const win = getHostWindow(contents);
        if (win && !win.isDestroyed()) {
          win.webContents.send("browser:new-tab", { url, makeActive: true });
        } else {
          createWindowFn(undefined, url, true);
        }
        return { action: "deny" };
      });
    }

    contents.on("context-menu", async (_menuEvent, params) => {
      const win = getHostWindow(contents);
      if (!win || win.isDestroyed()) return;

      const menuTemplate: MenuItemConstructorOptions[] = [];

      // A. Spellchecker suggestions (for editable inputs)
      if (params.misspelledWord && params.misspelledWord.length > 0) {
        if (params.dictionarySuggestions && params.dictionarySuggestions.length > 0) {
          for (const suggestion of params.dictionarySuggestions) {
            menuTemplate.push({
              label: suggestion,
              click: () => contents.replaceMisspelling(suggestion),
            });
          }
        } else {
          menuTemplate.push({
            label: "No suggestions",
            enabled: false,
          });
        }
        menuTemplate.push({
          label: "Add to Dictionary",
          click: () => {
            contents.session.addWordToSpellCheckerDictionary(params.misspelledWord);
          },
        });
        menuTemplate.push({ type: "separator" });
      }

      // B. Link context
      if (params.linkURL) {
        menuTemplate.push(
          {
            label: "Open Link in New Tab",
            click: () => {
              win.webContents.send("browser:new-tab", {
                url: params.linkURL,
                makeActive: true,
              });
            },
          },
          {
            label: "Open Link in New Window",
            click: () => {
              createWindowFn(undefined, params.linkURL, true);
            },
          },
          { type: "separator" },
          {
            label: "Copy Link Address",
            click: () => {
              clipboard.writeText(params.linkURL);
            },
          },
          {
            label: "Save Link As...",
            click: () => {
              contents.downloadURL(params.linkURL);
            },
          }
        );
      }

      // C. Image / Media context
      if (params.hasImageContents || params.mediaType === "image") {
        if (menuTemplate.length > 0 && menuTemplate[menuTemplate.length - 1].type !== "separator") {
          menuTemplate.push({ type: "separator" });
        }
        if (params.srcURL) {
          menuTemplate.push(
            {
              label: "Open Image in New Tab",
              click: () => {
                win.webContents.send("browser:new-tab", {
                  url: params.srcURL,
                  makeActive: true,
                });
              },
            },
            {
              label: "Save Image As...",
              click: () => {
                contents.downloadURL(params.srcURL);
              },
            },
            {
              label: "Copy Image",
              click: () => {
                contents.copyImageAt(params.x, params.y);
              },
            },
            {
              label: "Copy Image Address",
              click: () => {
                clipboard.writeText(params.srcURL);
              },
            }
          );
        }
      } else if (params.mediaType === "video" || params.mediaType === "audio") {
        if (menuTemplate.length > 0 && menuTemplate[menuTemplate.length - 1].type !== "separator") {
          menuTemplate.push({ type: "separator" });
        }
        const mediaLabel = params.mediaType === "video" ? "Video" : "Audio";
        if (params.srcURL) {
          menuTemplate.push(
            {
              label: `Open ${mediaLabel} in New Tab`,
              click: () => {
                win.webContents.send("browser:new-tab", {
                  url: params.srcURL,
                  makeActive: true,
                });
              },
            },
            {
              label: `Save ${mediaLabel} As...`,
              click: () => {
                contents.downloadURL(params.srcURL);
              },
            },
            {
              label: `Copy ${mediaLabel} Address`,
              click: () => {
                clipboard.writeText(params.srcURL);
              },
            }
          );
        }
      }

      // D. Selection context
      const trimmedSelection = params.selectionText ? params.selectionText.trim() : "";
      if (trimmedSelection) {
        if (menuTemplate.length > 0 && menuTemplate[menuTemplate.length - 1].type !== "separator") {
          menuTemplate.push({ type: "separator" });
        }
        menuTemplate.push({
          label: "Copy",
          accelerator: "CmdOrCtrl+C",
          role: "copy",
        });

        const truncated =
          trimmedSelection.length > 30
            ? `${trimmedSelection.slice(0, 30)}…`
            : trimmedSelection;

        menuTemplate.push({
          label: `Search Google for "${truncated}"`,
          click: () => {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
              trimmedSelection
            )}`;
            win.webContents.send("browser:new-tab", {
              url: searchUrl,
              makeActive: true,
            });
          },
        });

        if (isWebview) {
          menuTemplate.push(
            { type: "separator" },
            {
              label: "Print...",
              accelerator: "CmdOrCtrl+P",
              click: () => {
                contents.print();
              },
            }
          );
        }
      }

      // E. Editable field context (inputs/textareas)
      if (params.isEditable) {
        if (menuTemplate.length > 0 && menuTemplate[menuTemplate.length - 1].type !== "separator") {
          menuTemplate.push({ type: "separator" });
        }
        menuTemplate.push(
          {
            label: "Undo",
            accelerator: "CmdOrCtrl+Z",
            role: "undo",
            enabled: params.editFlags.canUndo,
          },
          {
            label: "Redo",
            accelerator: process.platform === "darwin" ? "Shift+Cmd+Z" : "Ctrl+Y",
            role: "redo",
            enabled: params.editFlags.canRedo,
          },
          { type: "separator" },
          {
            label: "Cut",
            accelerator: "CmdOrCtrl+X",
            role: "cut",
            enabled: params.editFlags.canCut,
          },
          {
            label: "Copy",
            accelerator: "CmdOrCtrl+C",
            role: "copy",
            enabled: params.editFlags.canCopy,
          },
          {
            label: "Paste",
            accelerator: "CmdOrCtrl+V",
            role: "paste",
            enabled: params.editFlags.canPaste,
          },
          {
            label: "Paste and Match Style",
            accelerator: "Shift+CmdOrCtrl+V",
            role: "pasteAndMatchStyle",
            enabled: params.editFlags.canPaste,
          },
          {
            label: "Delete",
            role: "delete",
            enabled: params.editFlags.canDelete,
          },
          { type: "separator" },
          {
            label: "Select All",
            accelerator: "CmdOrCtrl+A",
            role: "selectAll",
            enabled: params.editFlags.canSelectAll,
          }
        );
      }

      // F. General page context (when not clicking link/image/selection/editable)
      if (!params.linkURL && !params.hasImageContents && !trimmedSelection && !params.isEditable) {
        menuTemplate.push(
          {
            label: "Back",
            accelerator: process.platform === "darwin" ? "Cmd+[" : "Alt+Left",
            enabled: contents.canGoBack(),
            click: () => contents.goBack(),
          },
          {
            label: "Forward",
            accelerator: process.platform === "darwin" ? "Cmd+]" : "Alt+Right",
            enabled: contents.canGoForward(),
            click: () => contents.goForward(),
          },
          {
            label: "Reload",
            accelerator: "CmdOrCtrl+R",
            click: () => contents.reload(),
          }
        );

        if (isWebview) {
          menuTemplate.push(
            { type: "separator" },
            {
              label: "Save Page As...",
              accelerator: "CmdOrCtrl+S",
              click: async () => {
                try {
                  const rawTitle = contents.getTitle() || "page";
                  const safeTitle = rawTitle.replace(/[/\\?%*:|"<>]/g, "-").slice(0, 100);
                  const { filePath, canceled } = await dialog.showSaveDialog(win, {
                    defaultPath: `${safeTitle}.html`,
                    filters: [
                      { name: "Webpage, Complete", extensions: ["html", "htm"] },
                      { name: "Webpage, Single File", extensions: ["mhtml"] },
                    ],
                  });
                  if (!canceled && filePath) {
                    const saveType = filePath.endsWith(".mhtml") ? "MHTML" : "HTMLComplete";
                    await contents.savePage(filePath, saveType);
                  }
                } catch (err) {
                  console.error("[alma] Save Page As failed:", err);
                }
              },
            },
            {
              label: "Print...",
              accelerator: "CmdOrCtrl+P",
              click: () => contents.print(),
            }
          );

          if (params.pageURL && !params.pageURL.startsWith("view-source:")) {
            menuTemplate.push(
              { type: "separator" },
              {
                label: "View Page Source",
                accelerator: process.platform === "darwin" ? "Alt+Cmd+U" : "Ctrl+U",
                click: () => {
                  win.webContents.send("browser:new-tab", {
                    url: `view-source:${params.pageURL}`,
                    makeActive: true,
                  });
                },
              }
            );
          }
        }
      }

      // G. Inspect Element / Developer tools
      if (menuTemplate.length > 0 && menuTemplate[menuTemplate.length - 1].type !== "separator") {
        menuTemplate.push({ type: "separator" });
      }
      menuTemplate.push({
        label: "Inspect",
        accelerator: process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+Shift+I",
        click: () => {
          contents.inspectElement(params.x, params.y);
          if (!contents.isDevToolsOpened()) {
            contents.openDevTools({ mode: "detach" });
          }
        },
      });

      const menu = Menu.buildFromTemplate(menuTemplate);
      menu.popup({ window: win });
    });
  });
}

/**
 * Show native context menu for a Tab in the tab strip
 */
export function showTabContextMenu(
  win: BrowserWindow,
  options: TabContextMenuOptions
) {
  const menuTemplate: MenuItemConstructorOptions[] = [
    {
      label: "New Tab to the Right",
      click: () => {
        win.webContents.send("tab-action:new-to-right", options.tabId);
      },
    },
    {
      label: "Reload",
      click: () => {
        win.webContents.send("tab-action:reload", options.tabId);
      },
    },
    {
      label: "Duplicate Tab",
      click: () => {
        win.webContents.send("tab-action:duplicate", options.tabId);
      },
    },
    { type: "separator" },
    {
      label: "Close Tab",
      accelerator: "CmdOrCtrl+W",
      click: () => {
        win.webContents.send("tab-action:close", options.tabId);
      },
    },
    {
      label: "Close Other Tabs",
      enabled: options.canCloseOthers,
      click: () => {
        win.webContents.send("tab-action:close-others", options.tabId);
      },
    },
    {
      label: "Close Tabs to the Right",
      enabled: options.canCloseRight,
      click: () => {
        win.webContents.send("tab-action:close-right", options.tabId);
      },
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  menu.popup({ window: win });
}

/**
 * Show native context menu for empty space in Tab Strip
 */
export function showTabStripContextMenu(
  win: BrowserWindow,
  options: TabStripContextMenuOptions
) {
  const menuTemplate: MenuItemConstructorOptions[] = [
    {
      label: "New Tab",
      accelerator: "CmdOrCtrl+T",
      click: () => {
        win.webContents.send("tab-action:new");
      },
    },
    {
      label: "Reopen Closed Tab",
      accelerator: "Shift+CmdOrCtrl+T",
      enabled: options.canReopen,
      click: () => {
        win.webContents.send("tab-action:reopen-closed");
      },
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  menu.popup({ window: win });
}

/**
 * Show native context menu for the Address Bar
 */
export async function showAddressContextMenu(
  win: BrowserWindow,
  _options?: AddressContextMenuOptions
) {
  let clipText = "";
  try {
    clipText = (await clipboard.readText()).trim();
  } catch {
    clipText = "";
  }
  const hasClipboard = clipText.length > 0;

  let pasteAndGoLabel = "Paste and Go";
  if (hasClipboard) {
    const isUrl = /^https?:\/\//i.test(clipText) || (clipText.includes(".") && !clipText.includes(" "));
    pasteAndGoLabel = isUrl ? "Paste and Go" : "Paste and Search";
  }

  const menuTemplate: MenuItemConstructorOptions[] = [
    {
      label: "Undo",
      accelerator: "CmdOrCtrl+Z",
      role: "undo",
    },
    {
      label: "Redo",
      accelerator: process.platform === "darwin" ? "Shift+Cmd+Z" : "Ctrl+Y",
      role: "redo",
    },
    { type: "separator" },
    {
      label: "Cut",
      accelerator: "CmdOrCtrl+X",
      role: "cut",
    },
    {
      label: "Copy",
      accelerator: "CmdOrCtrl+C",
      role: "copy",
    },
    {
      label: "Paste",
      accelerator: "CmdOrCtrl+V",
      role: "paste",
    },
  ];

  if (hasClipboard) {
    menuTemplate.push({
      label: pasteAndGoLabel,
      click: () => {
        win.webContents.send("address-action:paste-and-go", clipText);
      },
    });
  }

  menuTemplate.push(
    {
      label: "Delete",
      role: "delete",
    },
    { type: "separator" },
    {
      label: "Select All",
      accelerator: "CmdOrCtrl+A",
      role: "selectAll",
    },
    { type: "separator" },
    {
      label: "Inspect",
      accelerator: process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+Shift+I",
      click: () => {
        win.webContents.openDevTools({ mode: "detach" });
      },
    }
  );

  const menu = Menu.buildFromTemplate(menuTemplate);
  menu.popup({ window: win });
}
