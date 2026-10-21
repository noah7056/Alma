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
  }
  interface Window {
    almaAPI: AlmaAPI;
  }
}
export {};
