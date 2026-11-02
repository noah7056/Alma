declare global {
  interface AlmaAiChatContext {
    url?: string;
    title?: string;
    page?: {
      description?: string;
      lang?: string;
      contentType?: string;
      text?: string;
      truncated?: boolean;
      wordCount?: number;
      selection?: string;
      headings?: string[];
    };
    tabs?: { title?: string; url?: string; active?: boolean; pane?: string }[];
    app?: {
      theme?: string;
      accent?: string;
      language?: string;
      languageSetting?: string;
      splitView?: boolean;
      view?: string;
      customBackground?: boolean;
      restoreSession?: boolean;
      windowId?: number | null;
      platform?: string;
      windowSize?: string;
    };
  }

  interface AlmaSearchResult {
    title: string;
    url: string;
    content: string;
    score: number;
  }

  interface AlmaSearchImage {
    url: string;
    title?: string;
    description?: string;
  }

  interface AlmaSearchResponse {
    success: boolean;
    query?: string;
    results?: AlmaSearchResult[];
    answer?: string;
    images?: AlmaSearchImage[];
    responseTime?: number;
    totalResults?: number;
    provider?: string;
    error?: string;
  }

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
    searchWeb: (query: string, limit?: number) => Promise<AlmaSearchResponse>;
    searchMoreImages: (query: string, page?: number) => Promise<{ success: boolean; images?: AlmaSearchImage[]; error?: string }>;
    openExternal: (url: string) => void;
    aiStatus: () => Promise<{ success: boolean; models?: string[]; hasModel?: boolean; error?: string }>;
    aiChat: (messages: { role: string; content: string }[], context?: AlmaAiChatContext) => Promise<{ success: boolean; reply?: string; error?: string }>;
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
    showSearchImageContextMenu: (options: { imageUrl: string; sourceUrl?: string } | string) => void;
    downloadUrl: (url: string) => Promise<boolean>;
    onNewTab: (callback: (data: { url: string; makeActive?: boolean; insertAfterTabId?: number }) => void) => () => void;
    onTabAction: (callback: (action: string, tabId?: number) => void) => () => void;
    onAddressAction: (callback: (action: string, payload?: any) => void) => () => void;
  }
  interface Window {
    almaAPI: AlmaAPI;
  }
}
export {};
