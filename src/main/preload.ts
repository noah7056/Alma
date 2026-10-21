import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("almaAPI", {
  newWindow: (url?: string) => ipcRenderer.invoke("browser:new-window", url),
  navigate: (url: string) => ipcRenderer.invoke("browser:navigate", url),
  back: () => ipcRenderer.invoke("browser:back"),
  forward: () => ipcRenderer.invoke("browser:forward"),
  reload: () => ipcRenderer.invoke("browser:reload"),
  canGoBack: () => ipcRenderer.invoke("browser:can-go-back"),
  canGoForward: () => ipcRenderer.invoke("browser:can-go-forward"),
  getTitle: () => ipcRenderer.invoke("browser:get-title"),
  getURL: () => ipcRenderer.invoke("browser:get-url"),
  openExternal: (url: string) => {
    void ipcRenderer.send("browser:open-external", url);
  },
  onNavigateTo: (callback: (url: string) => void) => {
    const channel = "browser:navigate-to";
    const handler = (_: unknown, url: string) => callback(url);
    ipcRenderer.on(channel, handler);
    return () => ipcRenderer.removeAllListeners(channel);
  },
  notifyDragStart: (payload: unknown) => { ipcRenderer.send("browser:tab-drag-start", payload); },
  notifyDragEnd: () => { ipcRenderer.send("browser:tab-drag-end"); },
  finalizeDrag: (payload: unknown) => ipcRenderer.invoke("browser:finalize-drag", payload),
  notifyDragHandled: (sourceWindowId: number) => { ipcRenderer.send("browser:tab-drag-handled", sourceWindowId); },
  onDragHandled: (callback: () => void) => {
    const channel = "browser:tab-drag-handled";
    const handler = () => callback();
    ipcRenderer.on(channel, handler);
    return () => ipcRenderer.removeAllListeners(channel);
  },
  onDragStart: (callback: (payload: unknown) => void) => {
    const channel = "browser:tab-drag-start";
    const handler = (_: unknown, payload: unknown) => callback(payload);
    ipcRenderer.on(channel, handler);
    return () => ipcRenderer.removeAllListeners(channel);
  },
  onDragEnd: (callback: () => void) => {
    const channel = "browser:tab-drag-end";
    const handler = () => callback();
    ipcRenderer.on(channel, handler);
    return () => ipcRenderer.removeAllListeners(channel);
  },
  getWindowId: () => ipcRenderer.sendSync("window:get-id"),
  removeTabInWindow: (windowId: number, tabId: number) => ipcRenderer.invoke("browser:remove-tab", windowId, tabId),
  onRemoveTab: (callback: (tabId: number) => void) => {
    const channel = "browser:remove-tab";
    const handler = (_: unknown, tabId: number) => callback(tabId);
    ipcRenderer.on(channel, handler);
    return () => ipcRenderer.removeAllListeners(channel);
  },
  minimizeWindow: () => ipcRenderer.invoke("window:minimize"),
  maximizeWindow: () => ipcRenderer.invoke("window:maximize"),
  closeWindow: () => ipcRenderer.invoke("window:close"),
  isMaximized: () => ipcRenderer.invoke("window:is-maximized"),
  showTabContextMenu: (data: { tabId: number; canCloseOthers: boolean; canCloseRight: boolean }) => {
    ipcRenderer.send("context-menu:show-tab", data);
  },
  showTabStripContextMenu: (data: { canReopen: boolean }) => {
    ipcRenderer.send("context-menu:show-tab-strip", data);
  },
  showAddressContextMenu: (data?: { hasSelection?: boolean }) => {
    ipcRenderer.send("context-menu:show-address-bar", data);
  },
  onNewTab: (callback: (data: { url: string; makeActive?: boolean; insertAfterTabId?: number }) => void) => {
    const channel = "browser:new-tab";
    const handler = (_: unknown, data: { url: string; makeActive?: boolean; insertAfterTabId?: number }) => callback(data);
    ipcRenderer.on(channel, handler);
    return () => ipcRenderer.removeAllListeners(channel);
  },
  onTabAction: (callback: (action: string, tabId?: number) => void) => {
    const channels = [
      "tab-action:new-to-right",
      "tab-action:reload",
      "tab-action:duplicate",
      "tab-action:close",
      "tab-action:close-others",
      "tab-action:close-right",
      "tab-action:new",
      "tab-action:reopen-closed",
    ];
    const handlers = channels.map((channel) => {
      const action = channel.replace("tab-action:", "");
      const handler = (_: unknown, tabId?: number) => callback(action, tabId);
      ipcRenderer.on(channel, handler);
      return { channel, handler };
    });
    return () => {
      handlers.forEach(({ channel, handler }) => ipcRenderer.removeListener(channel, handler));
    };
  },
  onAddressAction: (callback: (action: string, payload?: any) => void) => {
    const channel = "address-action:paste-and-go";
    const handler = (_: unknown, text: string) => callback("paste-and-go", text);
    ipcRenderer.on(channel, handler);
    return () => ipcRenderer.removeAllListeners(channel);
  },
});

declare global {
  interface AlmaAPI {
    newWindow: (url?: string) => Promise<{ id: number }>;
    navigate: (url: string) => Promise<{ success: boolean }>;
    back: () => Promise<{ success: boolean }>;
    forward: () => Promise<{ success: boolean }>;
    reload: () => Promise<{ success: boolean }>;
    canGoBack: () => Promise<boolean>;
    canGoForward: () => Promise<boolean>;
    getTitle: () => Promise<string | null>;
    getURL: () => Promise<string | null>;
    openExternal: (url: string) => void;
    onNavigateTo: (callback: (url: string) => void) => () => void;
    notifyDragStart: (payload: unknown) => void;
    notifyDragEnd: () => void;
    finalizeDrag: (payload: unknown) => Promise<{ success: boolean; action: string }>;
    notifyDragHandled: (sourceWindowId: number) => void;
    onDragHandled: (callback: () => void) => () => void;
    onDragStart: (callback: (payload: unknown) => void) => () => void;
    onDragEnd: (callback: () => void) => () => void;
    getWindowId: () => number | null;
    removeTabInWindow: (windowId: number, tabId: number) => Promise<{ success: boolean }>;
    onRemoveTab: (callback: (tabId: number) => void) => () => void;
    minimizeWindow: () => Promise<{ success: boolean }>;
    maximizeWindow: () => Promise<{ success: boolean }>;
    closeWindow: () => Promise<{ success: boolean }>;
    isMaximized: () => Promise<boolean>;
    showTabContextMenu: (data: { tabId: number; canCloseOthers: boolean; canCloseRight: boolean }) => void;
    showTabStripContextMenu: (data: { canReopen: boolean }) => void;
    showAddressContextMenu: (data?: { hasSelection?: boolean }) => void;
    onNewTab: (callback: (data: { url: string; makeActive?: boolean; insertAfterTabId?: number }) => void) => () => void;
    onTabAction: (callback: (action: string, tabId?: number) => void) => () => void;
    onAddressAction: (callback: (action: string, payload?: any) => void) => () => void;
  }
  interface Window {
    almaAPI: AlmaAPI;
  }
}
