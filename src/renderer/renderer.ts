const HOME_URL = "home.html";
const HISTORY_URL = "history.html";
const FAVORITES_URL = "favorites.html";

const backBtn = document.getElementById("back") as HTMLButtonElement;
const forwardBtn = document.getElementById("forward") as HTMLButtonElement;
const reloadBtn = document.getElementById("reload") as HTMLButtonElement;
const homeBtn = document.getElementById("home") as HTMLButtonElement;
const newWindowBtn = document.getElementById("new-window") as HTMLButtonElement;
const themeToggleBtn = document.getElementById("theme-toggle") as HTMLButtonElement;
const addressInput = document.getElementById("address") as HTMLInputElement;
const goBtn = document.getElementById("go") as HTMLButtonElement;
const statusEl = document.getElementById("status") as HTMLElement | null;
const homeView = document.getElementById("home-view") as HTMLElement | null;
const historyView = document.getElementById("history-view") as HTMLElement | null;
const favoritesView = document.getElementById("favorites-view") as HTMLElement | null;
const tabsContainer = document.getElementById("tabs") as HTMLElement | null;
const newTabBtn = document.getElementById("new-tab") as HTMLButtonElement | null;
const splitBtn = document.getElementById("split-view") as HTMLButtonElement | null;
const splitDivider = document.getElementById("split-divider") as HTMLElement | null;
const webviewContainer = document.getElementById("webview-container") as HTMLElement | null;
const mainToolbar = document.querySelector(".toolbar") as HTMLElement | null;

const almaAPI = (window as unknown as { almaAPI?: AlmaAPI }).almaAPI;

console.log("[alma] renderer loaded");

// ---- Theme ----
const savedTheme = localStorage.getItem("alma:theme") ?? "light";
document.documentElement.setAttribute("data-theme", savedTheme);

const themesPanel = document.getElementById("themes-panel");
if (themeToggleBtn && themesPanel) {
  themeToggleBtn.addEventListener("click", () => {
    themesPanel.style.display = themesPanel.style.display === "none" ? "block" : "none";
    if (settingsPanel) settingsPanel.style.display = "none";
    const fp = document.getElementById("favorites-panel");
    if (fp) fp.style.display = "none";
  });
}
const closeThemes = document.getElementById("close-themes");
if (closeThemes && themesPanel) {
  closeThemes.addEventListener("click", () => { themesPanel.style.display = "none"; });
}
window.addEventListener("beforeunload", () => {
  if (themesPanel) themesPanel.style.display = "none";
});
window.addEventListener("pagehide", () => {
  if (themesPanel) themesPanel.style.display = "none";
});

const themeLightBtn = document.getElementById("theme-light");
const themeDarkBtn = document.getElementById("theme-dark");
function applyTheme(mode: string) {
  const prevMode = document.documentElement.getAttribute("data-theme") ?? "light";
  const prevTint = localStorage.getItem("alma:tint") ?? defaultTintFor(prevMode);
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem("alma:theme", mode);
  if (DEFAULT_TINTS.has(prevTint)) {
    const newTint = defaultTintFor(mode);
    applyTint(newTint);
    localStorage.setItem("alma:tint", newTint);
    if (tintInput) tintInput.value = newTint;
  }
}
if (themeLightBtn) themeLightBtn.addEventListener("click", () => applyTheme("light"));
if (themeDarkBtn) themeDarkBtn.addEventListener("click", () => applyTheme("dark"));

// Tint color
const tintInput = document.getElementById("tint-color") as HTMLInputElement | null;
const resetTintBtn = document.getElementById("reset-tint");
const LIGHT_DEFAULT_TINT = "#8e8e93";
const DARK_DEFAULT_TINT = "#1d1d1f";
const DEFAULT_TINTS = new Set([LIGHT_DEFAULT_TINT, DARK_DEFAULT_TINT]);
function defaultTintFor(mode: string): string {
  return mode === "dark" ? DARK_DEFAULT_TINT : LIGHT_DEFAULT_TINT;
}

function applyTint(color: string) {
  document.documentElement.style.setProperty("--tint", color);
  document.documentElement.style.setProperty("--accent", color);
}

const savedTint = localStorage.getItem("alma:tint");
if (savedTint) {
  applyTint(savedTint);
  if (tintInput) tintInput.value = savedTint;
} else {
  const def = defaultTintFor(savedTheme);
  if (tintInput) tintInput.value = def;
}

if (tintInput) {
  tintInput.addEventListener("input", () => {
    applyTint(tintInput.value);
    localStorage.setItem("alma:tint", tintInput.value);
  });
}
if (resetTintBtn) {
  resetTintBtn.addEventListener("click", () => {
    const mode = document.documentElement.getAttribute("data-theme") ?? "light";
    const def = defaultTintFor(mode);
    applyTint(def);
    localStorage.removeItem("alma:tint");
    if (tintInput) tintInput.value = def;
  });
}

document.querySelectorAll(".themes-swatch").forEach((btn) => {
  btn.addEventListener("click", () => {
    const color = btn.getAttribute("data-color");
    if (!color) return;
    applyTint(color);
    localStorage.setItem("alma:tint", color);
    if (tintInput) tintInput.value = color;
  });
});

// Home background image
const bgInput = document.getElementById("bg-image") as HTMLInputElement | null;
const clearBgBtn = document.getElementById("clear-bg");
function applyBg(dataUrl: string | null) {
  if (homeView) {
    if (dataUrl) {
      homeView.style.backgroundImage = `url(${dataUrl})`;
      homeView.style.backgroundSize = "cover";
      homeView.style.backgroundPosition = "center";
    } else {
      homeView.style.backgroundImage = "";
      homeView.style.backgroundSize = "";
      homeView.style.backgroundPosition = "";
    }
  }
}
const savedBg = localStorage.getItem("alma:bgImage");
if (savedBg) applyBg(savedBg);
if (clearBgBtn && savedBg) clearBgBtn.style.display = "";
if (bgInput) {
  bgInput.addEventListener("change", () => {
    const file = bgInput.files && bgInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      localStorage.setItem("alma:bgImage", dataUrl);
      applyBg(dataUrl);
      if (clearBgBtn) clearBgBtn.style.display = "";
    };
    reader.readAsDataURL(file);
  });
}
if (clearBgBtn) {
  clearBgBtn.addEventListener("click", () => {
    localStorage.removeItem("alma:bgImage");
    applyBg(null);
    if (bgInput) bgInput.value = "";
    clearBgBtn.style.display = "none";
  });
}

// ---- Tab model ----
interface Tab {
  id: number;
  title: string;
  url: string;
  webview: any;
  element: HTMLElement;
  initialAboutBlankPending: boolean;
}

let tabs: Tab[] = [];
let activeTabId: number | null = null;
let nextTabId = 1;
let webview: any = null;
let splitMode = false;
let splitRatio = 0.5;
let leftTabId: number | null = null;
let rightTabId: number | null = null;
let focusedPane: "left" | "right" = "left";
let leftToolbar: HTMLElement | null = null;
let rightToolbar: HTMLElement | null = null;
let currentWindowId: number | null = null;
const removedByDrop = new Set<number>();
let draggedTabId: number | null = null;
let dragHandled = false;
let currentDragPayload: any = null;
let dropInProgress = false;
let droppedInTabBar = false;

function isHomeUrl(url: string): boolean {
  return url === HOME_URL || url === "about:blank" || /^https?:\/\/home\.html$/i.test(url);
}

function isHistoryUrl(url: string): boolean {
  return url === HISTORY_URL || /^https?:\/\/history\.html$/i.test(url);
}

function isFavoritesUrl(url: string): boolean {
  return url === FAVORITES_URL || /^https?:\/\/favorites\.html$/i.test(url);
}

function friendlyTabTitle(url: string): string {
  if (isHomeUrl(url)) return "Home";
  if (isHistoryUrl(url)) return "History";
  if (isFavoritesUrl(url)) return "Favorites";
  if (/google\.[^/]*\/search/i.test(url)) return "Search";
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./i, "");
    return host || url;
  } catch {
    return url === "about:blank" ? "Home" : url;
  }
}

function getActiveTab(): Tab | null {
  if (splitMode) {
    const id = focusedPane === "left" ? leftTabId : rightTabId;
    return tabs.find((t) => t.id === id) ?? null;
  }
  return tabs.find((t) => t.id === activeTabId) ?? null;
}

function getActiveWebview(): any {
  const tab = getActiveTab();
  return tab ? tab.webview : null;
}

function setNavState(back: boolean, forward: boolean) {
  backBtn.disabled = !back;
  forwardBtn.disabled = !forward;
}

function syncNavState() {
  const wv = getActiveWebview();
  try {
    setNavState(
      typeof wv?.canGoBack === "function" ? !!wv.canGoBack() : false,
      typeof wv?.canGoForward === "function" ? !!wv.canGoForward() : false
    );
  } catch {
    setNavState(false, false);
  }
}

function updateTabUI(tab: Tab) {
  if (!tab.element) return;
  const titleEl = tab.element.querySelector(".tab-title") as HTMLElement | null;
  if (titleEl) titleEl.textContent = tab.title || tab.url || "New Tab";
  tab.element.classList.toggle("active", tab.id === activeTabId);
  if (tab.id === activeTabId) updateFavoriteButtons();
}

function attachWebviewEvents(tab: Tab) {
  const wv = tab.webview;
  wv.addEventListener("did-navigate", (event: Event) => {
    const url = (event as unknown as { url?: string }).url ?? "";
    const staleInitial = url === "about:blank" && tab.initialAboutBlankPending && tab.url !== HOME_URL;
    if (staleInitial) {
      // ignore stale initial about:blank navigation for external tabs
    } else {
      tab.url = url === "about:blank" ? HOME_URL : url;
      tab.title = friendlyTabTitle(tab.url);
      recordHistory(tab.url, tab.title);
      persistTabs();
    }
    tab.initialAboutBlankPending = false;
    if (tab.id === activeTabId) {
      if (isHomeUrl(tab.url)) {
        if (homeView) homeView.style.display = "flex";
        if (historyView) historyView.style.display = "none";
        if (favoritesView) favoritesView.style.display = "none";
      } else if (isHistoryUrl(tab.url)) {
        if (homeView) homeView.style.display = "none";
        if (historyView) historyView.style.display = "flex";
        if (favoritesView) favoritesView.style.display = "none";
        renderHistory();
      } else if (isFavoritesUrl(tab.url)) {
        if (homeView) homeView.style.display = "none";
        if (historyView) historyView.style.display = "none";
        if (favoritesView) favoritesView.style.display = "flex";
        renderFavorites();
      } else {
        if (homeView) homeView.style.display = "none";
        if (historyView) historyView.style.display = "none";
        if (favoritesView) favoritesView.style.display = "none";
      }
      addressInput.value = tab.url;
      syncNavState();
      if (splitMode) applyLayout();
    }
    updateTabUI(tab);
  });
  wv.addEventListener("did-navigate-in-page", (event: Event) => {
    const url = (event as unknown as { url?: string }).url ?? "";
    if (!(url === "about:blank" && tab.initialAboutBlankPending && tab.url !== HOME_URL)) {
      tab.url = url === "about:blank" ? HOME_URL : url;
      tab.title = friendlyTabTitle(tab.url);
    }
    tab.initialAboutBlankPending = false;
    if (tab.id === activeTabId) {
      if (isHomeUrl(tab.url)) {
        if (homeView) homeView.style.display = "flex";
        if (historyView) historyView.style.display = "none";
        if (favoritesView) favoritesView.style.display = "none";
      } else if (isHistoryUrl(tab.url)) {
        if (homeView) homeView.style.display = "none";
        if (historyView) historyView.style.display = "flex";
        if (favoritesView) favoritesView.style.display = "none";
        renderHistory();
      } else if (isFavoritesUrl(tab.url)) {
        if (homeView) homeView.style.display = "none";
        if (historyView) historyView.style.display = "none";
        if (favoritesView) favoritesView.style.display = "flex";
        renderFavorites();
      } else {
        if (homeView) homeView.style.display = "none";
        if (historyView) historyView.style.display = "none";
        if (favoritesView) favoritesView.style.display = "none";
      }
      addressInput.value = tab.url;
      syncNavState();
      if (splitMode) applyLayout();
    }
    updateTabUI(tab);
  });
  wv.addEventListener("did-finish-load", () => {
    if (tab.id === activeTabId) {
      syncNavState();
    }
    tab.title = friendlyTabTitle(tab.url);
    try {
      // ignore page title; keep simplified site name
    } catch {
      // ignore
    }
    updateTabUI(tab);
  });
  wv.addEventListener("page-title-updated", () => {
    tab.title = friendlyTabTitle(tab.url);
    updateTabUI(tab);
  });
  wv.addEventListener("did-fail-load", (event: Event) => {
    const e = event as unknown as { errorDescription?: string };
    console.error("[alma] did-fail-load:", e);
  });
}

function createTab(initialUrl: string = HOME_URL, makeActive: boolean = true): Tab {
  const id = nextTabId++;
  const wv = document.createElement("webview") as any;
  wv.style.width = "100%";
  wv.style.height = "100%";
  wv.setAttribute("webpreferences", '{"contextIsolation":true,"nodeIntegration":false,"sandbox":false}');

  const element = document.createElement("div");
  element.className = "tab";
  element.draggable = true;
  element.dataset.tabId = String(id);
  const titleSpan = document.createElement("span");
  titleSpan.className = "tab-title";
  titleSpan.textContent = "New Tab";
  const closeBtn = document.createElement("button");
  closeBtn.className = "tab-close";
  closeBtn.textContent = "×";
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeTab(id);
  });
  element.appendChild(titleSpan);
  element.appendChild(closeBtn);
  if (tabsContainer) {
    const newTabBtn = document.getElementById("new-tab");
    if (newTabBtn) tabsContainer.insertBefore(element, newTabBtn);
    else tabsContainer.appendChild(element);
  }

  const tab: Tab = { id, title: "New Tab", url: initialUrl, webview: wv, element, initialAboutBlankPending: true };
  tabs.push(tab);
  attachWebviewEvents(tab);

  // drag and drop (in-window reorder only)
  element.addEventListener("dragstart", (e) => {
    e.dataTransfer?.setData("text/plain", String(id));
    element.classList.add("dragging");
  });
  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");
  });
  element.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  element.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fromId = Number(e.dataTransfer?.getData("text/plain"));
    if (!fromId || fromId === id) return;
    reorderTabs(fromId, id);
    persistTabs();
  });

  element.addEventListener("click", () => {
    if (splitMode) {
      // Do not affect split panes when interacting with the tab strip.
      return;
    }
    switchTab(id);
  });

  element.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const idx = tabs.findIndex((t) => t.id === id);
    almaAPI?.showTabContextMenu({
      tabId: id,
      canCloseOthers: tabs.length > 1,
      canCloseRight: idx !== -1 && idx < tabs.length - 1,
    });
  });

  if (makeActive) {
    switchTab(id);
  }

  // navigate to initial url after the webview is ready
  wv.addEventListener("dom-ready", () => {
    navigateTab(tab, initialUrl);
  }, { once: true });

  // attach to DOM and start loading only after the listener is registered
  wv.src = "about:blank";
  if (webviewContainer) webviewContainer.appendChild(wv);

  persistTabs();
  return tab;
}

function switchTab(id: number) {
  const tab = tabs.find((t) => t.id === id);
  if (!tab) return;
  if (splitMode) {
    activeTabId = id;
    webview = tab.webview;
    addressInput.value = tab.url;
    syncNavState();
    updateFavoriteButtons();
    applyLayout();
    return;
  }
  activeTabId = id;
  webview = tab.webview;
  tabs.forEach((t) => {
    t.webview.style.visibility = t.id === id ? "visible" : "hidden";
    t.webview.style.zIndex = t.id === id ? "2" : "0";
    t.webview.style.pointerEvents = t.id === id ? "auto" : "none";
    updateTabUI(t);
  });
  if (isHomeUrl(tab.url)) {
    if (homeView) homeView.style.display = "flex";
    if (historyView) historyView.style.display = "none";
    if (favoritesView) favoritesView.style.display = "none";
  } else if (isHistoryUrl(tab.url)) {
    if (homeView) homeView.style.display = "none";
    if (historyView) historyView.style.display = "flex";
    if (favoritesView) favoritesView.style.display = "none";
    renderHistory();
  } else if (isFavoritesUrl(tab.url)) {
    if (homeView) homeView.style.display = "none";
    if (historyView) historyView.style.display = "none";
    if (favoritesView) favoritesView.style.display = "flex";
    renderFavorites();
  } else {
    if (homeView) homeView.style.display = "none";
    if (historyView) historyView.style.display = "none";
    if (favoritesView) favoritesView.style.display = "none";
  }
  addressInput.value = tab.url;
  syncNavState();
  updateFavoriteButtons();
}

interface ClosedTabRecord {
  url: string;
  title: string;
}
const recentlyClosedTabs: ClosedTabRecord[] = [];

function recordClosedTab(url: string, title: string) {
  if (!url || isHomeUrl(url) || url === "about:blank") return;
  recentlyClosedTabs.unshift({ url, title });
  if (recentlyClosedTabs.length > 30) recentlyClosedTabs.pop();
}

function reopenClosedTab() {
  const last = recentlyClosedTabs.shift();
  if (last) {
    createTab(last.url, true);
  }
}

function closeTab(id: number) {
  const idx = tabs.findIndex((t) => t.id === id);
  if (idx === -1) return;
  if (splitMode) {
    if (leftTabId === id) leftTabId = tabs.find((t) => t.id !== id)?.id ?? null;
    if (rightTabId === id) rightTabId = tabs.find((t) => t.id !== id)?.id ?? null;
  }
  const tab = tabs[idx];
  recordClosedTab(tab.url, tab.title);
  tab.webview.remove();
  tab.element.remove();
  tabs.splice(idx, 1);
  if (splitMode && tabs.length < 2) {
    disableSplitMode();
  }
  if (tabs.length === 0) {
    createTab(HOME_URL, true);
  } else if (activeTabId === id && !splitMode) {
    const next = tabs[Math.min(idx, tabs.length - 1)];
    switchTab(next.id);
  }
  persistTabs();
}

function insertTabAfter(newTabId: number, afterId: number) {
  if (newTabId === afterId) return;
  const fromIndex = tabs.findIndex((t) => t.id === newTabId);
  const targetIndex = tabs.findIndex((t) => t.id === afterId);
  if (fromIndex === -1 || targetIndex === -1) return;
  const [moved] = tabs.splice(fromIndex, 1);
  const newIndex = fromIndex < targetIndex ? targetIndex : targetIndex + 1;
  tabs.splice(newIndex, 0, moved);
  tabs.forEach((t) => {
    if (tabsContainer) tabsContainer.appendChild(t.element);
  });
  const newTabBtn = document.getElementById("new-tab");
  if (newTabBtn && tabsContainer) tabsContainer.appendChild(newTabBtn);
  persistTabs();
}

function reorderTabs(fromId: number, toId: number) {
  if (fromId === toId) return;
  const fromIndex = tabs.findIndex((t) => t.id === fromId);
  const toIndex = tabs.findIndex((t) => t.id === toId);
  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;
  const [moved] = tabs.splice(fromIndex, 1);
  tabs.splice(toIndex, 0, moved);
  // move DOM node
  const fromNode = moved.element;
  const toNode = tabs[toIndex === 0 ? 1 : toIndex - 1]?.element;
  // simpler: re-append in order
  tabs.forEach((t) => {
    if (tabsContainer) tabsContainer.appendChild(t.element);
  });
  const newTabBtn = document.getElementById("new-tab");
  if (newTabBtn && tabsContainer) tabsContainer.appendChild(newTabBtn);
  persistTabs();
}

function persistTabs() {
  const data = {
    tabs: tabs.map((t) => ({ url: t.url, title: t.title })),
    activeIndex: tabs.findIndex((t) => t.id === activeTabId),
  };
  try {
    localStorage.setItem("alma:tabs", JSON.stringify(data));
  } catch {
    // ignore
  }
}

function recordHistory(url: string, title: string) {
  if (isHomeUrl(url) || isHistoryUrl(url) || isFavoritesUrl(url)) return;
  let list: { url: string; title: string; time: number }[] = [];
  try { list = JSON.parse(localStorage.getItem("alma:history") || "[]"); } catch { list = []; }
  list = list.filter((e) => e.url !== url);
  list.unshift({ url, title: title || url, time: Date.now() });
  if (list.length > 200) list = list.slice(0, 200);
  localStorage.setItem("alma:history", JSON.stringify(list));
  renderHistory();
}

function renderHistory() {
  const container = document.getElementById("history-list");
  if (!container) return;
  let list: { url: string; title: string; time: number }[] = [];
  try { list = JSON.parse(localStorage.getItem("alma:history") || "[]"); } catch { list = []; }
  list.sort((a, b) => b.time - a.time);
  if (list.length === 0) {
    container.innerHTML = `<div style="padding:12px 0;color:var(--text-secondary);">Nothing yet</div>`;
    return;
  }
  container.innerHTML = list.map((e) => `<div style="padding:6px 0;border-bottom:1px solid var(--border);"><a href="${e.url}" data-url="${e.url}" style="color:#007aff;text-decoration:none;">${e.title}</a><div style="font-size:11px;color:var(--text-secondary);">${new Date(e.time).toLocaleString()}</div></div>`).join("");
  container.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (ev) => {
      ev.preventDefault();
      const url = (ev.currentTarget as HTMLElement).getAttribute("data-url");
      if (url) navigateTo(url);
    });
  });
}

function getFavorites(): { url: string; title: string; time: number }[] {
  try { return JSON.parse(localStorage.getItem("alma:favorites") || "[]"); } catch { return []; }
}
function setFavorites(list: { url: string; title: string; time: number }[]) {
  try { localStorage.setItem("alma:favorites", JSON.stringify(list)); } catch { /* ignore */ }
}
function isFavoriteUrlSaved(url: string): boolean {
  return getFavorites().some((f) => f.url === url);
}
function addFavorite(url: string, title: string) {
  if (!url || isHomeUrl(url) || isHistoryUrl(url) || isFavoritesUrl(url)) return;
  const favs = getFavorites();
  if (favs.some((f) => f.url === url)) return;
  favs.unshift({ url, title: title || friendlyTabTitle(url), time: Date.now() });
  setFavorites(favs);
}
function removeFavorite(url: string) {
  const favs = getFavorites().filter((f) => f.url !== url);
  setFavorites(favs);
}
function toggleFavorite(url: string, title: string) {
  if (isFavoriteUrlSaved(url)) removeFavorite(url);
  else addFavorite(url, title);
  renderFavorites();
}
function renderFavorites() {
  const favs = getFavorites();
  const render = (containerId: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (favs.length === 0) {
      container.innerHTML = `<div style="padding:12px 0;color:var(--text-secondary);">Nothing yet</div>`;
      return;
    }
    container.innerHTML = favs.map((e) => `<div style="padding:6px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:8px;"><a href="${e.url}" data-url="${e.url}" style="color:#007aff;text-decoration:none;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.title}</a><button data-remove="${e.url}" class="settings-btn" style="width:auto;padding:2px 8px;">Remove</button></div>`).join("");
    container.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        const url = (ev.currentTarget as HTMLElement).getAttribute("data-url");
        if (url) navigateTo(url);
      });
    });
    container.querySelectorAll("button[data-remove]").forEach((b) => {
      b.addEventListener("click", (ev) => {
        ev.preventDefault();
        const url = (ev.currentTarget as HTMLElement).getAttribute("data-remove");
        if (url) { removeFavorite(url); renderFavorites(); updateFavoriteButtons(); }
      });
    });
  };
  render("favorites-list");
  render("favorites-list-page");
}

function updateFavoriteButtons() {
  const setBtn = (btn: HTMLButtonElement | null, url: string | null) => {
    if (!btn) return;
    const fav = !!url && isFavoriteUrlSaved(url);
    btn.classList.toggle("favorited", fav);
    const outline = btn.querySelector(".favorite-star-outline") as HTMLImageElement | null;
    const filled = btn.querySelector(".favorite-star-filled") as HTMLImageElement | null;
    if (outline) outline.style.display = fav ? "none" : "";
    if (filled) filled.style.display = fav ? "" : "none";
  };
  // main toolbar
  const mainBtn = document.getElementById("favorite") as HTMLButtonElement | null;
  setBtn(mainBtn, getActiveTab() ? getActiveTab()!.url : null);
  // pane toolbars
  document.querySelectorAll(".pane-toolbar").forEach((bar) => {
    const btn = bar.querySelector(".favorite-btn") as HTMLButtonElement | null;
    // find corresponding tab via toolbar? Use data attribute if set; fallback by reading input? We'll set data-side
    const side = (bar as HTMLElement).dataset.side;
    const tabId = side === "left" ? leftTabId : side === "right" ? rightTabId : null;
    const tab = tabId ? tabs.find((t) => t.id === tabId) : null;
    setBtn(btn, tab ? tab.url : null);
  });
}

// Settings panel wiring
const settingsBtn = document.getElementById("settings-btn");
const settingsPanel = document.getElementById("settings-panel");
if (settingsBtn && settingsPanel) {
  settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    settingsPanel.style.display = settingsPanel.style.display === "none" ? "block" : "none";
  });
}
document.addEventListener("click", (e) => {
  if (!settingsPanel || settingsPanel.style.display === "none") return;
  const target = e.target as Node;
  if (settingsPanel.contains(target)) return;
  if (settingsBtn && settingsBtn.contains(target)) return;
  settingsPanel.style.display = "none";
});
const openHistoryBtn = document.getElementById("open-history");
if (openHistoryBtn) {
  openHistoryBtn.addEventListener("click", () => {
    createTab(HISTORY_URL, true);
    if (settingsPanel) settingsPanel.style.display = "none";
  });
}
const favoritesToggleBtn = document.getElementById("favorites-toggle") || document.getElementById("open-favorites");
if (favoritesToggleBtn) {
  favoritesToggleBtn.addEventListener("click", () => {
    if (settingsPanel) settingsPanel.style.display = "none";
    const fp = document.getElementById("favorites-panel");
    if (fp) fp.style.display = fp.style.display === "none" ? "block" : "none";
  });
}
const closeFavoritesBtn = document.getElementById("close-favorites");
const favoritesPanelEl = document.getElementById("favorites-panel");
if (closeFavoritesBtn && favoritesPanelEl) {
  closeFavoritesBtn.addEventListener("click", () => { favoritesPanelEl.style.display = "none"; });
}
const openFavoritesPageBtn = document.getElementById("open-favorites-page");
if (openFavoritesPageBtn) {
  openFavoritesPageBtn.addEventListener("click", () => {
    createTab(FAVORITES_URL, true);
    if (favoritesPanelEl) favoritesPanelEl.style.display = "none";
  });
}
const clearFavoritesBtn = document.getElementById("clear-favorites");
if (clearFavoritesBtn) {
  clearFavoritesBtn.addEventListener("click", () => {
    setFavorites([]);
    renderFavorites();
    updateFavoriteButtons();
  });
}
const clearHistoryBtn = document.getElementById("clear-history");
if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener("click", () => {
    localStorage.removeItem("alma:history");
    renderHistory();
  });
}
const restoreBtn = document.getElementById("restore-session") as HTMLButtonElement | null;
function updateRestoreBtn() {
  if (!restoreBtn) return;
  const on = localStorage.getItem("alma:restoreSession") !== "false";
  restoreBtn.textContent = "Restore session on launch: " + (on ? "On" : "Off");
}
if (restoreBtn) {
  updateRestoreBtn();
  restoreBtn.addEventListener("click", () => {
    const on = localStorage.getItem("alma:restoreSession") !== "false";
    localStorage.setItem("alma:restoreSession", String(!on));
    updateRestoreBtn();
  });
}

function restoreTabs() {
  const restore = localStorage.getItem("alma:restoreSession") !== "false";
  if (!restore) {
    createTab(HOME_URL, true);
    return;
  }
  const raw = localStorage.getItem("alma:tabs");
  if (raw) {
    try {
      const data = JSON.parse(raw);
      if (Array.isArray(data.tabs) && data.tabs.length) {
        data.tabs.forEach((t: { url?: string; title?: string }) => {
          const tab = createTab(t.url || HOME_URL, false);
          tab.title = friendlyTabTitle(t.url || HOME_URL);
          updateTabUI(tab);
        });
        const activeIndex = Math.max(0, Math.min(data.activeIndex ?? 0, tabs.length - 1));
        switchTab(tabs[activeIndex].id);
        return;
      }
    } catch {
      // ignore
    }
  }
  createTab(HOME_URL, true);
  console.log("[restore-end] tabs", tabs.length, tabs.map(t=>t.url));
}

function isSafeUrl(target: string): boolean {
  return !/^\s*(javascript|data|vbscript):/i.test(target);
}

function resolveURL(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return HOME_URL;
  if (trimmed.toLowerCase() === "about:blank") return HOME_URL;
  if (/^(https?|view-source):\/\//i.test(trimmed) || trimmed.startsWith("view-source:")) return trimmed;
  if (trimmed.includes(".") && !trimmed.includes(" ")) return `https://${trimmed}`;
  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
}

function navigateTab(tab: Tab, target: string) {
  tab.initialAboutBlankPending = false;
  if (!isSafeUrl(target)) {
    if (statusEl) statusEl.textContent = "Blocked unsafe URL";
    return;
  }
  if (isHomeUrl(target)) {
    tab.url = HOME_URL;
    tab.title = "Home";
    if (tab.webview.src !== "about:blank") {
      tab.webview.src = "about:blank";
    }
    if (tab.id === activeTabId) {
      if (homeView) homeView.style.display = "flex";
      if (historyView) historyView.style.display = "none";
      if (favoritesView) favoritesView.style.display = "none";
      addressInput.value = HOME_URL;
      syncNavState();
    }
    if (splitMode) applyLayout();
    updateTabUI(tab);
    return;
  }
  if (isHistoryUrl(target)) {
    tab.url = HISTORY_URL;
    tab.title = "History";
    if (tab.id === activeTabId) {
      if (homeView) homeView.style.display = "none";
      if (historyView) historyView.style.display = "flex";
      if (favoritesView) favoritesView.style.display = "none";
      renderHistory();
      addressInput.value = HISTORY_URL;
      syncNavState();
    }
    if (splitMode) applyLayout();
    updateTabUI(tab);
    return;
  }
  if (isFavoritesUrl(target)) {
    tab.url = FAVORITES_URL;
    tab.title = "Favorites";
    if (tab.id === activeTabId) {
      if (homeView) homeView.style.display = "none";
      if (historyView) historyView.style.display = "none";
      if (favoritesView) favoritesView.style.display = "flex";
      renderFavorites();
      addressInput.value = FAVORITES_URL;
      syncNavState();
    }
    if (splitMode) applyLayout();
    updateTabUI(tab);
    return;
  }
  tab.url = target;
  tab.title = friendlyTabTitle(target);
  if (tab.id === activeTabId) {
    if (homeView) homeView.style.display = "none";
    if (historyView) historyView.style.display = "none";
    if (favoritesView) favoritesView.style.display = "none";
    addressInput.value = target;
  }
  tab.webview.src = target;
  updateTabUI(tab);
  if (tab.id === activeTabId) syncNavState();
  if (splitMode) applyLayout();
}

function navigateTo(target: string) {
  const tab = getActiveTab();
  if (!tab) {
    createTab(target, true);
    return;
  }
  navigateTab(tab, target);
}

// ---- Events ----
backBtn.addEventListener("click", () => {
  try {
    const tab = getActiveTab();
    if (!tab) return;
    if (typeof tab.webview?.canGoBack === "function" && tab.webview.canGoBack() && typeof tab.webview?.goBack === "function") {
      if (homeView && homeView.style.display !== "none") homeView.style.display = "none";
      tab.webview.goBack();
    }
  } catch (err) {
    console.error("[alma] back failed:", err);
  }
});

forwardBtn.addEventListener("click", () => {
  try {
    const tab = getActiveTab();
    if (!tab) return;
    if (typeof tab.webview?.canGoForward === "function" && tab.webview.canGoForward() && typeof tab.webview?.goForward === "function") {
      if (homeView && homeView.style.display !== "none") homeView.style.display = "none";
      tab.webview.goForward();
    }
  } catch (err) {
    console.error("[alma] forward failed:", err);
  }
});

reloadBtn.addEventListener("click", () => {
  try {
    const tab = getActiveTab();
    if (!tab) return;
    if (typeof tab.webview?.reload === "function") void tab.webview.reload();
  } catch (err) {
    console.error("[alma] reload failed:", err);
  }
});

homeBtn.addEventListener("click", () => {
  try {
    navigateTo(HOME_URL);
  } catch (err) {
    console.error("[alma] home failed:", err);
  }
});

goBtn.addEventListener("click", () => {
  try {
    navigateTo(resolveURL(addressInput.value));
  } catch (err) {
    console.error("[alma] go failed:", err);
  }
});

addressInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") goBtn.click();
});

addressInput.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const hasSelection = (addressInput.selectionEnd ?? 0) > (addressInput.selectionStart ?? 0);
  almaAPI?.showAddressContextMenu({ hasSelection });
});

newWindowBtn.addEventListener("click", () => {
  try {
    if (almaAPI) void almaAPI.newWindow();
  } catch (err) {
    console.error("[alma] new window failed:", err);
  }
});

if (newTabBtn) {
  newTabBtn.addEventListener("click", () => {
    createTab(HOME_URL, true);
  });
}

if (tabsContainer) {
  tabsContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  tabsContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    if (dropInProgress) return;
    dropInProgress = true;
    setTimeout(() => { dropInProgress = false; }, 0);
    dragHandled = true;
    droppedInTabBar = true;
    let payload: any = currentDragPayload;
    if (!payload) {
      try {
        payload = JSON.parse(e.dataTransfer?.getData("text/plain") || "");
      } catch {
        return;
      }
    }
    if (!payload || !payload.url) return;
    if (payload.sourceWindowId !== currentWindowId) return;
    const lastTab = tabs[tabs.length - 1];
    if (lastTab && payload.tabId !== lastTab.id) reorderTabs(payload.tabId, lastTab.id);
    persistTabs();
  });

  tabsContainer.addEventListener("contextmenu", (e) => {
    const target = e.target as HTMLElement;
    if (
      target === tabsContainer ||
      target.classList.contains("tab-strip") ||
      target.id === "tab-strip"
    ) {
      e.preventDefault();
      almaAPI?.showTabStripContextMenu({
        canReopen: recentlyClosedTabs.length > 0,
      });
    }
  });
}

if (almaAPI?.onNavigateTo) {
  almaAPI.onNavigateTo((url: string) => {
    try {
      navigateTo(url);
    } catch (err) {
      console.error("[alma] onNavigateTo failed:", err);
    }
  });
}

if (almaAPI?.onNewTab) {
  almaAPI.onNewTab((data) => {
    try {
      const newTab = createTab(data.url || HOME_URL, data.makeActive ?? true);
      if (data.insertAfterTabId) {
        insertTabAfter(newTab.id, data.insertAfterTabId);
      }
    } catch (err) {
      console.error("[alma] onNewTab failed:", err);
    }
  });
}

if (almaAPI?.onTabAction) {
  almaAPI.onTabAction((action: string, tabId?: number) => {
    try {
      if (action === "new") {
        createTab(HOME_URL, true);
      } else if (action === "reopen-closed") {
        reopenClosedTab();
      } else if (tabId !== undefined) {
        const tab = tabs.find((t) => t.id === tabId);
        if (!tab) return;
        if (action === "close") {
          closeTab(tabId);
        } else if (action === "reload") {
          if (isHomeUrl(tab.url) || isHistoryUrl(tab.url) || isFavoritesUrl(tab.url)) {
            if (tab.id === activeTabId) navigateTab(tab, tab.url);
          } else {
            try {
              if (typeof tab.webview?.reload === "function") tab.webview.reload();
            } catch (err) {
              console.error("[alma] reload tab error:", err);
            }
          }
        } else if (action === "new-to-right") {
          const newTab = createTab(HOME_URL, true);
          insertTabAfter(newTab.id, tabId);
        } else if (action === "duplicate") {
          const dupTab = createTab(tab.url, true);
          insertTabAfter(dupTab.id, tabId);
        } else if (action === "close-others") {
          const others = tabs.filter((t) => t.id !== tabId).map((t) => t.id);
          others.forEach((id) => closeTab(id));
        } else if (action === "close-right") {
          const targetIdx = tabs.findIndex((t) => t.id === tabId);
          if (targetIdx !== -1) {
            const rightTabs = tabs.slice(targetIdx + 1).map((t) => t.id);
            rightTabs.forEach((id) => closeTab(id));
          }
        }
      }
    } catch (err) {
      console.error("[alma] onTabAction failed:", err);
    }
  });
}

if (almaAPI?.onAddressAction) {
  almaAPI.onAddressAction((action: string, payload?: any) => {
    if (action === "paste-and-go" && typeof payload === "string") {
      addressInput.value = payload;
      navigateTo(resolveURL(payload));
    }
  });
}

window.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "t" || e.key === "T")) {
    e.preventDefault();
    reopenClosedTab();
  }
});

// ---- Home page search ----
const homeSearch = document.getElementById("home-search") as HTMLInputElement | null;
const homeGo = document.getElementById("home-go") as HTMLButtonElement | null;

function goHomeSearch() {
  if (!homeSearch) return;
  const val = homeSearch.value.trim();
  if (!val) return;
  navigateTo(resolveURL(val));
}

if (homeGo) homeGo.addEventListener("click", goHomeSearch);
if (homeSearch) homeSearch.addEventListener("keydown", (e) => { if (e.key === "Enter") goHomeSearch(); });

if (almaAPI?.getWindowId) {
  currentWindowId = almaAPI.getWindowId();
}
if (almaAPI?.onRemoveTab) {
  almaAPI.onRemoveTab((tabId: number) => {
    removedByDrop.add(tabId);
    const idx = tabs.findIndex((t) => t.id === tabId);
    if (idx !== -1) {
      const tab = tabs[idx];
      tab.webview.remove();
      tab.element.remove();
      tabs.splice(idx, 1);
    }
    if (tabs.length === 0) {
      if (almaAPI) void almaAPI.closeWindow();
    } else if (activeTabId === tabId) {
      const next = tabs[Math.min(idx, tabs.length - 1)];
      if (next) switchTab(next.id);
    }
    persistTabs();
  });
}

function applyLayout() {
  if (!webviewContainer) return;
  if (splitMode) {
    if (splitDivider) {
      splitDivider.style.display = "block";
      splitDivider.style.left = (splitRatio * 100) + "%";
    }
    if (leftToolbar) {
      leftToolbar.style.width = (splitRatio * 100) + "%";
    }
    if (rightToolbar) {
      rightToolbar.style.left = (splitRatio * 100) + "%";
      rightToolbar.style.width = ((1 - splitRatio) * 100) + "%";
    }
    tabs.forEach((t) => {
      const isLeft = t.id === leftTabId;
      const isRight = t.id === rightTabId;
      if (isLeft || isRight) {
        t.webview.style.display = "block";
        t.webview.style.visibility = "visible";
        t.webview.style.pointerEvents = "auto";
        t.webview.style.zIndex = "2";
        if (isLeft) {
          t.webview.style.left = "0px";
          t.webview.style.top = "44px";
          t.webview.style.bottom = "0px";
          t.webview.style.width = (splitRatio * 100) + "%";
          t.webview.style.height = "auto";
        } else {
          t.webview.style.left = (splitRatio * 100) + "%";
          t.webview.style.top = "44px";
          t.webview.style.bottom = "0px";
          t.webview.style.width = ((1 - splitRatio) * 100) + "%";
          t.webview.style.height = "auto";
        }
      } else {
        t.webview.style.display = "none";
      }
    });
    const focusedId = focusedPane === "left" ? leftTabId : rightTabId;
    const focusedTab = tabs.find((t) => t.id === focusedId);
    if (focusedTab && isHomeUrl(focusedTab.url) && homeView) {
      homeView.style.display = "flex";
      homeView.style.position = "absolute";
      homeView.style.top = "44px";
      homeView.style.bottom = "0px";
      homeView.style.right = "auto";
      homeView.style.height = "auto";
      if (historyView) historyView.style.display = "none";
      if (favoritesView) favoritesView.style.display = "none";
      if (focusedPane === "left") {
        homeView.style.left = "0px";
        homeView.style.width = (splitRatio * 100) + "%";
      } else {
        homeView.style.left = (splitRatio * 100) + "%";
        homeView.style.width = ((1 - splitRatio) * 100) + "%";
      }
    } else if (homeView) {
      homeView.style.display = "none";
    }
    if (focusedTab && isHistoryUrl(focusedTab.url) && historyView) {
      historyView.style.display = "flex";
      historyView.style.position = "absolute";
      historyView.style.top = "44px";
      historyView.style.bottom = "0px";
      historyView.style.right = "auto";
      historyView.style.height = "auto";
      if (focusedPane === "left") {
        historyView.style.left = "0px";
        historyView.style.width = (splitRatio * 100) + "%";
      } else {
        historyView.style.left = (splitRatio * 100) + "%";
        historyView.style.width = ((1 - splitRatio) * 100) + "%";
      }
    } else if (historyView) {
      historyView.style.display = "none";
    }
    if (focusedTab && isFavoritesUrl(focusedTab.url) && favoritesView) {
      favoritesView.style.display = "flex";
      favoritesView.style.position = "absolute";
      favoritesView.style.top = "44px";
      favoritesView.style.bottom = "0px";
      favoritesView.style.right = "auto";
      favoritesView.style.height = "auto";
      if (focusedPane === "left") {
        favoritesView.style.left = "0px";
        favoritesView.style.width = (splitRatio * 100) + "%";
      } else {
        favoritesView.style.left = (splitRatio * 100) + "%";
        favoritesView.style.width = ((1 - splitRatio) * 100) + "%";
      }
      renderFavorites();
    } else if (favoritesView) {
      favoritesView.style.display = "none";
    }
  } else {
    if (splitDivider) splitDivider.style.display = "none";
    if (homeView) {
      homeView.style.left = "";
      homeView.style.top = "";
      homeView.style.width = "";
      homeView.style.height = "";
      homeView.style.right = "";
      homeView.style.bottom = "";
      homeView.style.position = "";
    }
    if (historyView) {
      historyView.style.left = "";
      historyView.style.top = "";
      historyView.style.width = "";
      historyView.style.height = "";
      historyView.style.right = "";
      historyView.style.bottom = "";
      historyView.style.position = "";
    }
    tabs.forEach((t) => {
      const isActive = t.id === activeTabId;
      t.webview.style.display = "block";
      t.webview.style.visibility = isActive ? "visible" : "hidden";
      t.webview.style.zIndex = isActive ? "2" : "0";
      t.webview.style.pointerEvents = isActive ? "auto" : "none";
      t.webview.style.left = "0px";
      t.webview.style.top = "0px";
      t.webview.style.width = "100%";
      t.webview.style.height = "100%";
    });
    const tab = tabs.find((t) => t.id === activeTabId);
    if (tab && isHomeUrl(tab.url) && homeView) homeView.style.display = "flex";
    else if (homeView) homeView.style.display = "none";
    if (tab && isHistoryUrl(tab.url) && historyView) historyView.style.display = "flex";
    else if (historyView) historyView.style.display = "none";
    if (tab && isFavoritesUrl(tab.url) && favoritesView) favoritesView.style.display = "flex";
    else if (favoritesView) favoritesView.style.display = "none";
  }
}

function enableSplitMode() {
  if (tabs.length < 2) {
    createTab(HOME_URL, false);
  }
  if (leftTabId === null) leftTabId = activeTabId ?? tabs[0]?.id ?? null;
  if (rightTabId === null || rightTabId === leftTabId) {
    const other = tabs.find((t) => t.id !== leftTabId);
    rightTabId = other ? other.id : (createTab(HOME_URL, false).id);
  }
  splitMode = true;
  focusedPane = "left";
  if (mainToolbar) mainToolbar.style.display = "none";
  leftToolbar = createPaneToolbar("left");
  rightToolbar = createPaneToolbar("right");
  if (webviewContainer) {
    if (leftToolbar) webviewContainer.appendChild(leftToolbar);
    if (rightToolbar) webviewContainer.appendChild(rightToolbar);
  }
  if (leftToolbar && (leftToolbar as any)._sync) (leftToolbar as any)._sync();
  if (rightToolbar && (rightToolbar as any)._sync) (rightToolbar as any)._sync();
  updateFavoriteButtons();
  applyLayout();
}

function disableSplitMode() {
  splitMode = false;
  activeTabId = leftTabId ?? rightTabId ?? tabs[0]?.id ?? null;
  webview = activeTabId !== null ? (tabs.find((t) => t.id === activeTabId)?.webview ?? webview) : webview;
  leftTabId = null;
  rightTabId = null;
  removePaneToolbars();
  if (mainToolbar) mainToolbar.style.display = "";
  updateFavoriteButtons();
  applyLayout();
  if (activeTabId !== null) syncNavState();
}

function createPaneToolbar(side: "left" | "right"): HTMLElement {
  const bar = document.createElement("div");
  bar.className = "pane-toolbar";
  bar.dataset.side = side;
  bar.style.position = "absolute";
  bar.style.top = "0px";
  bar.style.height = "44px";
  bar.style.display = "flex";
  bar.style.alignItems = "center";
  bar.style.gap = "6px";
  bar.style.padding = "0 8px";
  bar.style.background = "var(--surface)";
  bar.style.borderBottom = "1px solid var(--border)";
  bar.style.zIndex = "5";
  if (side === "left") {
    bar.style.left = "0px";
    bar.style.width = (splitRatio * 100) + "%";
  } else {
    bar.style.left = (splitRatio * 100) + "%";
    bar.style.width = ((1 - splitRatio) * 100) + "%";
  }

  const mkBtn = (label: string, icon: string) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", label);
    b.style.minWidth = "36px";
    b.style.height = "36px";
    b.style.border = "1px solid var(--border)";
    b.style.borderRadius = "18px";
    b.style.background = "var(--bg)";
    b.style.cursor = "pointer";
    b.style.display = "flex";
    b.style.alignItems = "center";
    b.style.justifyContent = "center";
    b.style.padding = "0";
    const img = document.createElement("img");
    img.src = `assets/icons/${icon}`;
    img.style.width = "16px";
    img.style.height = "16px";
    b.appendChild(img);
    return b;
  };

  const backB = mkBtn("Back", "back.svg");
  const fwdB = mkBtn("Forward", "forward.svg");
  const reloadB = mkBtn("Reload", "reload.svg");
  const homeB = mkBtn("Home", "home.svg");
  const input = document.createElement("input");
  input.type = "url";
  input.placeholder = "Search or type a URL...";
  input.style.flex = "1";
  input.style.minWidth = "0";
  input.style.height = "36px";
  input.style.padding = "0 12px";
  input.style.border = "1px solid var(--border)";
  input.style.borderRadius = "18px";
  input.style.background = "var(--bg)";
  input.style.color = "var(--text)";
  const goB = document.createElement("button");
  goB.setAttribute("aria-label", "Go");
  goB.style.minWidth = "36px";
  goB.style.height = "36px";
  goB.style.border = "1px solid var(--border)";
  goB.style.borderRadius = "18px";
  goB.style.background = "var(--bg)";
  goB.style.cursor = "pointer";
  goB.style.display = "flex";
  goB.style.alignItems = "center";
  goB.style.justifyContent = "center";
  goB.style.padding = "0";
  const goImg = document.createElement("img");
  goImg.src = "assets/icons/search.svg";
  goImg.style.width = "14px";
  goImg.style.height = "14px";
  goB.appendChild(goImg);

  const favB = document.createElement("button");
  favB.setAttribute("aria-label", "Favorite");
  favB.style.minWidth = "36px";
  favB.style.height = "36px";
  favB.style.border = "1px solid var(--border)";
  favB.style.borderRadius = "18px";
  favB.style.background = "var(--bg)";
  favB.style.cursor = "pointer";
  favB.style.display = "flex";
  favB.style.alignItems = "center";
  favB.style.justifyContent = "center";
  favB.style.padding = "0";
  favB.classList.add("favorite-btn");
  const favOutline = document.createElement("img");
  favOutline.src = "assets/icons/favorite.svg";
  favOutline.className = "nav-icon favorite-star-outline";
  favOutline.style.width = "16px";
  favOutline.style.height = "16px";
  favOutline.style.display = "block";
  const favFilled = document.createElement("img");
  favFilled.src = "assets/icons/favorited.svg";
  favFilled.className = "nav-icon favorite-star-filled";
  favFilled.style.width = "16px";
  favFilled.style.height = "16px";
  favFilled.style.display = "none";
  favB.appendChild(favOutline);
  favB.appendChild(favFilled);
  bar.appendChild(backB);
  bar.appendChild(fwdB);
  bar.appendChild(reloadB);
  bar.appendChild(homeB);
  bar.appendChild(input);
  bar.appendChild(goB);
  bar.appendChild(favB);

  const getTab = () => tabs.find((t) => t.id === (side === "left" ? leftTabId : rightTabId)) ?? null;

  backB.addEventListener("click", () => {
    const tab = getTab();
    if (tab && typeof tab.webview?.canGoBack === "function" && tab.webview.canGoBack()) {
      tab.webview.goBack();
    }
  });
  fwdB.addEventListener("click", () => {
    const tab = getTab();
    if (tab && typeof tab.webview?.canGoForward === "function" && tab.webview.canGoForward()) {
      tab.webview.goForward();
    }
  });
  reloadB.addEventListener("click", () => {
    const tab = getTab();
    if (tab && typeof tab.webview?.reload === "function") void tab.webview.reload();
  });
  homeB.addEventListener("click", () => {
    const tab = getTab();
    if (tab) navigateTab(tab, HOME_URL);
  });
  const go = () => {
    const tab = getTab();
    if (!tab) return;
    navigateTab(tab, resolveURL(input.value));
  };
  goB.addEventListener("click", go);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") go();
  });

  favB.addEventListener("click", () => {
    const tab = getTab();
    if (tab) {
      const wasFav = isFavoriteUrlSaved(tab.url);
      toggleFavorite(tab.url, tab.title);
      const outline = favB.querySelector(".favorite-star-outline") as HTMLImageElement | null;
      const filled = favB.querySelector(".favorite-star-filled") as HTMLImageElement | null;
      if (outline) outline.style.display = wasFav ? "" : "none";
      if (filled) filled.style.display = wasFav ? "none" : "";
    }
    updateFavoriteButtons();
  });

  // sync input when tab changes
  (bar as any)._sync = () => {
    const tab = getTab();
    if (tab) input.value = tab.url;
    updateFavoriteButtons();
  };

  return bar;
}

function removePaneToolbars() {
  if (leftToolbar) { leftToolbar.remove(); leftToolbar = null; }
  if (rightToolbar) { rightToolbar.remove(); rightToolbar = null; }
}

const favoriteBtn = document.getElementById("favorite") as HTMLButtonElement | null;
if (favoriteBtn) {
  favoriteBtn.addEventListener("click", () => {
    const tab = getActiveTab();
    if (!tab) return;
    const wasFav = isFavoriteUrlSaved(tab.url);
    toggleFavorite(tab.url, tab.title);
    const outline = favoriteBtn.querySelector(".favorite-star-outline") as HTMLImageElement | null;
    const filled = favoriteBtn.querySelector(".favorite-star-filled") as HTMLImageElement | null;
    if (outline) outline.style.display = wasFav ? "" : "none";
    if (filled) filled.style.display = wasFav ? "none" : "";
    updateFavoriteButtons();
  });
}

if (splitBtn) {
  splitBtn.addEventListener("click", () => {
    if (splitMode) disableSplitMode();
    else enableSplitMode();
  });
}

if (splitDivider) {
  let draggingDivider = false;
  splitDivider.addEventListener("mousedown", (e) => {
    draggingDivider = true;
    e.preventDefault();
  });
  window.addEventListener("mousemove", (e) => {
    if (!draggingDivider || !splitMode || !webviewContainer) return;
    const rect = webviewContainer.getBoundingClientRect();
    let ratio = (e.clientX - rect.left) / rect.width;
    ratio = Math.min(0.8, Math.max(0.2, ratio));
    splitRatio = ratio;
    applyLayout();
  });
  window.addEventListener("mouseup", () => {
    draggingDivider = false;
  });
}

if (webviewContainer) {
  webviewContainer.addEventListener("click", (e) => {
    if (!splitMode) return;
    const rect = webviewContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    focusedPane = x < splitRatio * rect.width ? "left" : "right";
    applyLayout();
  });
}

if (almaAPI?.onDragStart) {
  almaAPI.onDragStart((payload: unknown) => {
    currentDragPayload = payload;
  });
}
if (almaAPI?.onDragEnd) {
  almaAPI.onDragEnd(() => {
    currentDragPayload = null;
  });
}
if (almaAPI?.onDragHandled) {
  almaAPI.onDragHandled(() => {
    dragHandled = true;
  });
}



(window as any).__almaReceiveTab = (payload: any, targetTabId: number | null) => {
  const newTab = createTab(payload?.url || HOME_URL, false);
  newTab.title = friendlyTabTitle(payload?.url || HOME_URL);
  updateTabUI(newTab);
  if (targetTabId) {
    const idx = tabs.indexOf(newTab);
    const tIdx = tabs.findIndex((t) => t.id === targetTabId);
    if (idx !== -1 && tIdx !== -1 && idx !== tIdx) {
      const [m] = tabs.splice(idx, 1);
      tabs.splice(tIdx, 0, m);
      tabs.forEach((t) => {
        if (tabsContainer) tabsContainer.appendChild(t.element);
      });
    }
  }
  switchTab(newTab.id);
  persistTabs();
  return true;
};

renderFavorites();
updateFavoriteButtons();

// Initial restore
restoreTabs();
