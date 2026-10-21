import { app, BrowserWindow, ipcMain, screen, shell } from "electron";
import path from "node:path";
import url from "node:url";

const windows = new Map<number, BrowserWindow>();
let nextTabId = 1;

const HOME_URL = url.pathToFileURL(path.join(__dirname, "../renderer/home.html")).href;

function createWindow(tabId?: number, initialURL?: string): BrowserWindow {
  const id = tabId ?? nextTabId++;
  const indexPath = path.join(__dirname, "../renderer/index.html");
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    titleBarStyle: "hidden",
    title: "Alma",
    backgroundColor: "#f2f2f7",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webviewTag: true,
    },
  });

  win.loadFile(indexPath);

  if (initialURL) {
    win.webContents.once("did-finish-load", () => {
      if (initialURL !== HOME_URL) {
        win.webContents.send("browser:navigate-to", initialURL);
      }
    });
  }

  const handleClosed = () => {
    windows.delete(id);
    if (windows.size === 0) {
      app.quit();
    }
  };

  win.on("closed", handleClosed);
  windows.set(id, win);

  win.webContents.setWindowOpenHandler(({ url: targetUrl }) => {
    shell.openExternal(targetUrl).catch(() => {
      // ignore
    });
    return { action: "deny" };
  });

  return win;
}

ipcMain.handle("browser:new-window", (_, url?: string) => {
  const win = createWindow(undefined, url);
  return { id: win.webContents.id };
});

ipcMain.handle("browser:open-external", (_, targetURL: string) => {
  void shell.openExternal(targetURL).catch(() => {
    // ignore
  });
  return { success: true };
});

ipcMain.handle("browser:navigate", (event, targetURL: string) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return { success: false };
  win.webContents.send("browser:navigate-to", targetURL);
  return { success: true };
});

ipcMain.handle("browser:get-title", async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return null;
  try {
    return await win.webContents.executeJavaScript(`(() => { try { const w = document.getElementById("webview"); if (w && typeof w.getTitle === "function") return w.getTitle(); return document.title; } catch (e) { return document.title; } })()`);
  } catch {
    return win.getTitle();
  }
});

ipcMain.handle("browser:get-url", async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return null;
  try {
    return await win.webContents.executeJavaScript(`(() => { try { const w = document.getElementById("webview"); if (w && typeof w.getURL === "function") return w.getURL(); return w?.src ?? window.location.href; } catch (e) { return window.location.href; } })()`);
  } catch {
    return win.webContents.getURL();
  }
});

ipcMain.handle("browser:back", async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return { success: false };
  try {
    const ok = await win.webContents.executeJavaScript(`(() => { try { const w = document.getElementById("webview"); if (w && typeof w.canGoBack === "function" && w.canGoBack() && typeof w.goBack === "function") { w.goBack(); return true; } return false; } catch (e) { return false; } })()`);
    return { success: !!ok };
  } catch {
    return { success: false };
  }
});

ipcMain.handle("browser:forward", async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return { success: false };
  try {
    const ok = await win.webContents.executeJavaScript(`(() => { try { const w = document.getElementById("webview"); if (w && typeof w.canGoForward === "function" && w.canGoForward() && typeof w.goForward === "function") { w.goForward(); return true; } return false; } catch (e) { return false; } })()`);
    return { success: !!ok };
  } catch {
    return { success: false };
  }
});

ipcMain.handle("browser:reload", async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return { success: false };
  try {
    const ok = await win.webContents.executeJavaScript(`(() => { try { const w = document.getElementById("webview"); if (w && typeof w.reload === "function") { w.reload(); return true; } return false; } catch (e) { return false; } })()`);
    return { success: !!ok };
  } catch {
    return { success: false };
  }
});

ipcMain.handle("browser:can-go-back", async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return false;
  try {
    return !!(await win.webContents.executeJavaScript(`(() => { try { const w = document.getElementById("webview"); return !!(w && typeof w.canGoBack === "function" && w.canGoBack()); } catch (e) { return false; } })()`));
  } catch {
    return false;
  }
});

ipcMain.handle("browser:can-go-forward", async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return false;
  try {
    return !!(await win.webContents.executeJavaScript(`(() => { try { const w = document.getElementById("webview"); return !!(w && typeof w.canGoForward === "function" && w.canGoForward()); } catch (e) { return false; } })()`));
  } catch {
    return false;
  }
});

function getWindowFromEvent(event: Electron.IpcMainInvokeEvent): BrowserWindow | null {
  const win = BrowserWindow.fromWebContents(event.sender);
  return win ?? null;
}

ipcMain.handle("window:minimize", (event) => {
  const win = getWindowFromEvent(event);
  if (!win || win.isDestroyed()) return { success: false };
  win.minimize();
  return { success: true };
});

ipcMain.handle("window:maximize", (event) => {
  const win = getWindowFromEvent(event);
  if (!win || win.isDestroyed()) return { success: false };
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
  return { success: true };
});

ipcMain.handle("window:close", (event) => {
  const win = getWindowFromEvent(event);
  if (!win || win.isDestroyed()) return { success: false };
  win.close();
  return { success: true };
});

ipcMain.handle("window:is-maximized", (event) => {
  const win = getWindowFromEvent(event);
  if (!win || win.isDestroyed()) return false;
  return win.isMaximized();
});

ipcMain.handle("window:get-id", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return null;
  return win.id;
});

ipcMain.on("window:get-id", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  event.returnValue = win && !win.isDestroyed() ? win.id : null;
});

ipcMain.handle("browser:remove-tab", (event, sourceWindowId: number, tabId: number) => {
  const win = BrowserWindow.fromId(sourceWindowId);
  if (!win || win.isDestroyed()) return { success: false };
  win.webContents.send("browser:remove-tab", tabId);
  return { success: true };
});

ipcMain.on("browser:tab-drag-start", (_, payload: unknown) => {
  BrowserWindow.getAllWindows().forEach((win) => {
    if (!win.isDestroyed()) win.webContents.send("browser:tab-drag-start", payload);
  });
});

ipcMain.on("browser:tab-drag-end", () => {
  BrowserWindow.getAllWindows().forEach((win) => {
    if (!win.isDestroyed()) win.webContents.send("browser:tab-drag-end");
  });
});

ipcMain.on("browser:tab-drag-handled", (_, sourceWindowId: number) => {
  const win = BrowserWindow.fromId(sourceWindowId);
  if (win && !win.isDestroyed()) win.webContents.send("browser:tab-drag-handled");
});

ipcMain.handle("browser:finalize-drag", async (event, payload: any) => {
  const sourceWindowId = payload?.sourceWindowId ?? BrowserWindow.fromWebContents(event.sender)?.id;
  const sourceWindow = sourceWindowId ? BrowserWindow.fromId(sourceWindowId) : BrowserWindow.fromWebContents(event.sender);
  const cursor = screen.getCursorScreenPoint();
  let target: BrowserWindow | null = null;
  for (const win of BrowserWindow.getAllWindows()) {
    if (win.isDestroyed()) continue;
    const b = win.getBounds();
    if (cursor.x >= b.x && cursor.x < b.x + b.width && cursor.y >= b.y && cursor.y < b.y + b.height) {
      target = win;
      break;
    }
  }

  let overTabBar = false;
  let targetTabId: number | null = null;
  if (target && !target.isDestroyed()) {
    const b = target.getBounds();
    const relX = cursor.x - b.x;
    const relY = cursor.y - b.y;
    try {
      const res = await target.webContents.executeJavaScript(`(() => {
        const bar = document.querySelector(".tab-strip");
        if (!bar) return { overTabBar: false, tabId: null };
        const r = bar.getBoundingClientRect();
        if (${relX} < r.left || ${relX} > r.right || ${relY} < r.top || ${relY} > r.bottom) {
          return { overTabBar: false, tabId: null };
        }
        const el = document.elementFromPoint(${relX}, ${relY});
        const tab = el ? el.closest(".tab") : null;
        const tabId = tab ? Number((tab as HTMLElement).dataset.tabId) : null;
        return { overTabBar: true, tabId: Number.isFinite(tabId) ? tabId : null };
      })()`);
      overTabBar = !!res?.overTabBar;
      targetTabId = res?.tabId ?? null;
    } catch {
      overTabBar = false;
    }
  }

  if (target && target !== sourceWindow && overTabBar) {
    try {
      await target.webContents.executeJavaScript(`(() => { if (typeof (window as any).__almaReceiveTab === "function") { (window as any).__almaReceiveTab(${JSON.stringify(payload)}, ${targetTabId === null ? "null" : targetTabId}); return true; } return false; })()`);
    } catch {
      // ignore
    }
    if (sourceWindow && !sourceWindow.isDestroyed()) {
      sourceWindow.webContents.send("browser:remove-tab", payload?.tabId);
    }
    return { success: true, action: "move" };
  }

  // tear off: new window
  const win = createWindow(undefined, payload?.url);
  if (sourceWindow && !sourceWindow.isDestroyed()) {
    sourceWindow.webContents.send("browser:remove-tab", payload?.tabId);
  }
  return { success: true, action: "tearoff" };
});

app.whenReady().then(() => {
  createWindow(undefined, HOME_URL);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

export { windows, HOME_URL };
