import { presentationsApp } from "./presentations.js";

// ---- i18n (inlined to avoid ES module resolution issues) ----
type LangCode = "en" | "it" | "zh";
type LangSetting = LangCode | "system";
type Locale = typeof _en;
const _en = {
  back: "Back", forward: "Forward", reload: "Reload", home: "Home",
  newWindow: "New window", newTab: "New tab", go: "Go",
  searchOrUrl: "Search or type a URL...",
  history: "History", themes: "Themes", favorites: "Favorites",
  restoreSessionOn: "Restore session on launch: On",
  restoreSessionOff: "Restore session on launch: Off",
  language: "Language", themesTitle: "Themes", mode: "Mode",
  light: "Light", dark: "Dark", accent: "Accent",
  homeBackground: "Home background", chooseImage: "Choose image",
  favoritesTitle: "Favorites", openFavoritesPage: "Open favorites page",
  historyTitle: "History", clearHistory: "Clear history",
  clearFavorites: "Clear favorites", subtitle: "Your personal browser",
  languageTitle: "Language", systemLanguage: "System (auto)", remove: "Remove",
  addShortcut: "Add shortcut", shortcutName: "Name", shortcutLink: "Link",
  cancel: "Cancel", confirm: "Add",
  folder: "Folder", link: "Link",
  documents: "Documents", sheets: "Sheets", presentations: "Presentations",
  newDocument: "+ New Document", newSheet: "+ New Spreadsheet", newPresentation: "+ New Presentation",
  docsSubtitle: "Document workspace",
  sheetsSubtitle: "Spreadsheet workspace",
  presentationsSubtitle: "Presentation workspace",
  docsReady: "Your documents workspace is ready. Native tools under active development.",
  untitledDocument: "Untitled Document",
  export: "Export",
  exportAs: "Export as",
  exportPDF: "PDF",
  exportText: "Plain Text (.txt)",
  exportHTML: "HTML (.html)",
  exportMarkdown: "Markdown (.md)",
  rename: "Rename",
  delete: "Delete",
  deleteConfirm: "Delete this document? This cannot be undone.",
  saved: "Saved",
  saving: "Saving…",
  noDocuments: "No documents yet. Create one to get started.",
  oneDocument: "1 document",
  manyDocuments: "documents",
  undo: "Undo", redo: "Redo",
  paragraph: "Paragraph", heading1: "Heading 1", heading2: "Heading 2", heading3: "Heading 3",
  quote: "Quote", codeBlock: "Code",
  font: "Font", size: "Size",
  strike: "Strikethrough", textColor: "Text color", highlight: "Highlight",
  alignLeft: "Align left", alignCenter: "Align center", alignRight: "Align right", alignJustify: "Justify",
  bulletedList: "Bulleted list", numberedList: "Numbered list",
  insertLink: "Insert link", insertDivider: "Insert divider", clearFormatting: "Clear formatting",
  linkDialogTitle: "Insert link", linkUrlLabel: "Link address", linkTextLabel: "Text to display",
  linkRemove: "Remove link", insert: "Insert",
  apps: "Apps",
  noHistory: "Nothing here yet",
  historySubtitle: "Pages you have visited",
  favoritesSubtitle: "Links you saved",
  shortcuts: "Shortcuts",
  searchDocuments: "Search documents",
  noResults: "No matching documents",
  noResultsHint: "Try a different search term.",
  emptyTitle: "No documents yet",
  startWriting: "Start writing...",
  emptyText: "Create your first document to get started.",
  word: "word",
  words: "words",
  sheetsReady: "Your spreadsheet workspace is ready. Native tools under active development.",
  presentationsReady: "Your presentations workspace is ready. Native tools under active development.",
  untitledSpreadsheet: "Untitled Spreadsheet",
  searchSpreadsheets: "Search spreadsheets",
  oneSpreadsheet: "1 spreadsheet",
  manySpreadsheets: "spreadsheets",
  noSpreadsheets: "No spreadsheets yet. Create one to get started.",
  noMatchingSpreadsheets: "No matching spreadsheets",
  emptySheetsTitle: "No spreadsheets yet",
  emptySheetsText: "Create your first spreadsheet to get started.",
  deleteSpreadsheetConfirm: "Delete this spreadsheet? This cannot be undone.",
  addSheet: "Add sheet",
  renameSheet: "Rename sheet",
  deleteSheet: "Delete sheet",
  sheetName: "Sheet name",
  insertRowAbove: "Insert row above",
  insertColumnLeft: "Insert column left",
  deleteRow: "Delete row",
  deleteColumn: "Delete column",
  numberFormat: "Number format",
  fmtGeneral: "General",
  fmtNumber: "Number",
  fmtThousands: "Number (1,000.00)",
  fmtPercent: "Percent",
  fmtCurrency: "Currency",
  fmtScientific: "Scientific",
  bold: "Bold",
  italic: "Italic",
  underline: "Underline",
  fillColor: "Fill color",
  sum: "Sum",
  average: "Average",
  count: "Count",
  min: "Min",
  max: "Max",
  exportCSV: "CSV (.csv)",
  exportTSV: "TSV (.tsv)",
  exportJSON: "JSON (.json)",
  sheetTab: "Sheet",
};
const _it: Locale = {
  back: "Indietro", forward: "Avanti", reload: "Ricarica", home: "Home",
  newWindow: "Nuova finestra", newTab: "Nuova scheda", go: "Vai",
  searchOrUrl: "Cerca o inserisci un URL...",
  history: "Cronologia", themes: "Temi", favorites: "Preferiti",
  restoreSessionOn: "Ripristina sessione: Attivo",
  restoreSessionOff: "Ripristina sessione: Disattivo",
  language: "Lingua", themesTitle: "Temi", mode: "Modalità",
  light: "Chiaro", dark: "Scuro", accent: "Accento",
  homeBackground: "Sfondo Home", chooseImage: "Scegli immagine",
  favoritesTitle: "Preferiti", openFavoritesPage: "Apri pagina preferiti",
  historyTitle: "Cronologia", clearHistory: "Cancella cronologia",
  clearFavorites: "Cancella preferiti", subtitle: "Il tuo browser personale",
  languageTitle: "Lingua", systemLanguage: "Sistema (automatico)", remove: "Rimuovi",
  addShortcut: "Aggiungi", shortcutName: "Nome", shortcutLink: "Link",
  cancel: "Annulla", confirm: "Aggiungi",
  folder: "Cartella", link: "Link",
  documents: "Documents", sheets: "Sheets", presentations: "Presentations",
  newDocument: "+ Nuovo Documento", newSheet: "+ Nuovo Foglio di Calcolo", newPresentation: "+ Nuova Presentazione",
  docsSubtitle: "Spazio documenti",
  sheetsSubtitle: "Spazio fogli di calcolo",
  presentationsSubtitle: "Spazio presentazioni",
  docsReady: "Il tuo spazio documenti è pronto. Strumenti nativi in fase di sviluppo attivo.",
  untitledDocument: "Documento Senza Titolo",
  export: "Esporta",
  exportAs: "Esporta come",
  exportPDF: "PDF",
  exportText: "Testo semplice (.txt)",
  exportHTML: "HTML (.html)",
  exportMarkdown: "Markdown (.md)",
  rename: "Rinomina",
  delete: "Elimina",
  deleteConfirm: "Eliminare questo documento? L'operazione non può essere annullata.",
  saved: "Salvato",
  saving: "Salvataggio…",
  noDocuments: "Nessun documento ancora. Creane uno per iniziare.",
  oneDocument: "1 documento",
  manyDocuments: "documenti",
  undo: "Annulla", redo: "Ripeti",
  paragraph: "Paragrafo", heading1: "Titolo 1", heading2: "Titolo 2", heading3: "Titolo 3",
  quote: "Citazione", codeBlock: "Codice",
  font: "Carattere", size: "Dimensione",
  strike: "Barrato", textColor: "Colore del testo", highlight: "Evidenzia",
  alignLeft: "Allinea a sinistra", alignCenter: "Allinea al centro", alignRight: "Alligna a destra", alignJustify: "Giustifica",
  bulletedList: "Elenco puntato", numberedList: "Elenco numerato",
  insertLink: "Inserisci collegamento", insertDivider: "Inserisci linea", clearFormatting: "Cancella formattazione",
  linkDialogTitle: "Inserisci collegamento", linkUrlLabel: "Indirizzo del collegamento", linkTextLabel: "Testo da visualizzare",
  linkRemove: "Rimuovi collegamento", insert: "Inserisci",
  apps: "App",
  noHistory: "Ancora niente",
  historySubtitle: "Pagine visitate",
  favoritesSubtitle: "Link salvati",
  shortcuts: "Scorciatoie",
  searchDocuments: "Cerca documenti",
  noResults: "Nessun documento corrispondente",
  noResultsHint: "Prova con un altro termine di ricerca.",
  emptyTitle: "Nessun documento",
  startWriting: "Inizia a scrivere...",
  emptyText: "Crea il tuo primo documento per iniziare.",
  word: "parola",
  words: "parole",
  sheetsReady: "Il tuo spazio fogli è pronto. Strumenti nativi in fase di sviluppo attivo.",
  presentationsReady: "Il tuo spazio presentazioni è pronto. Strumenti nativi in fase di sviluppo attivo.",
  untitledSpreadsheet: "Foglio di Calcolo Senza Titolo",
  searchSpreadsheets: "Cerca fogli di calcolo",
  oneSpreadsheet: "1 foglio di calcolo",
  manySpreadsheets: "fogli di calcolo",
  noSpreadsheets: "Nessun foglio di calcolo ancora. Creane uno per iniziare.",
  noMatchingSpreadsheets: "Nessun foglio di calcolo corrispondente",
  emptySheetsTitle: "Nessun foglio di calcolo",
  emptySheetsText: "Crea il tuo primo foglio di calcolo per iniziare.",
  deleteSpreadsheetConfirm: "Eliminare questo foglio di calcolo? L'operazione non può essere annullata.",
  addSheet: "Aggiungi foglio",
  renameSheet: "Rinomina foglio",
  deleteSheet: "Elimina foglio",
  sheetName: "Nome foglio",
  insertRowAbove: "Inserisci riga sopra",
  insertColumnLeft: "Inserisci colonna a sinistra",
  deleteRow: "Elimina riga",
  deleteColumn: "Elimina colonna",
  numberFormat: "Formato numero",
  fmtGeneral: "Generale",
  fmtNumber: "Numero",
  fmtThousands: "Numero (1.000,00)",
  fmtPercent: "Percentuale",
  fmtCurrency: "Valuta",
  fmtScientific: "Notazione scientifica",
  bold: "Grassetto",
  italic: "Corsivo",
  underline: "Sottolineato",
  fillColor: "Colore di riempimento",
  sum: "Somma",
  average: "Media",
  count: "Conteggio",
  min: "Min",
  max: "Max",
  exportCSV: "CSV (.csv)",
  exportTSV: "TSV (.tsv)",
  exportJSON: "JSON (.json)",
  sheetTab: "Foglio",
};
const _zh: Locale = {
  back: "返回", forward: "前进", reload: "刷新", home: "主页",
  newWindow: "新窗口", newTab: "新标签页", go: "前往",
  searchOrUrl: "搜索或输入网址...",
  history: "历史记录", themes: "主题", favorites: "收藏夹",
  restoreSessionOn: "启动时恢复会话：开",
  restoreSessionOff: "启动时恢复会话：关",
  language: "语言", themesTitle: "主题", mode: "模式",
  light: "浅色", dark: "深色", accent: "强调色",
  homeBackground: "主页背景", chooseImage: "选择图片",
  favoritesTitle: "收藏夹", openFavoritesPage: "打开收藏夹页面",
  historyTitle: "历史记录", clearHistory: "清除历史记录",
  clearFavorites: "清除收藏", subtitle: "您的个人浏览器",
  languageTitle: "语言", systemLanguage: "系统（自动）", remove: "删除",
  addShortcut: "添加快捷方式", shortcutName: "名称", shortcutLink: "链接",
  cancel: "取消", confirm: "添加",
  folder: "文件夹", link: "链接",
  documents: "Documents", sheets: "Sheets", presentations: "Presentations",
  newDocument: "+ 新建文档", newSheet: "+ 新建电子表格", newPresentation: "+ 新建演示文稿",
  docsSubtitle: "文档工作区",
  sheetsSubtitle: "电子表格工作区",
  presentationsSubtitle: "演示文稿工作区",
  docsReady: "你的文档工作区已就绪。原生工具正在积极开发中。",
  untitledDocument: "未命名文档",
  export: "导出",
  exportAs: "导出为",
  exportPDF: "PDF",
  exportText: "纯文本 (.txt)",
  exportHTML: "HTML (.html)",
  exportMarkdown: "Markdown (.md)",
  rename: "重命名",
  delete: "删除",
  deleteConfirm: "删除此文档？此操作无法撤销。",
  saved: "已保存",
  saving: "保存中…",
  noDocuments: "暂无文档。创建一个以开始。",
  oneDocument: "1 份文档",
  manyDocuments: "份文档",
  undo: "撤销", redo: "重做",
  paragraph: "段落", heading1: "标题 1", heading2: "标题 2", heading3: "标题 3",
  quote: "引用", codeBlock: "代码",
  font: "字体", size: "字号",
  strike: "删除线", textColor: "文字颜色", highlight: "高亮",
  alignLeft: "左对齐", alignCenter: "居中对齐", alignRight: "右对齐", alignJustify: "两端对齐",
  bulletedList: "项目符号", numberedList: "编号列表",
  insertLink: "插入链接", insertDivider: "插入分隔线", clearFormatting: "清除格式",
  linkDialogTitle: "插入链接", linkUrlLabel: "链接地址", linkTextLabel: "显示文本",
  linkRemove: "移除链接", insert: "插入",
  apps: "应用",
  noHistory: "暂无记录",
  historySubtitle: "您访问过的页面",
  favoritesSubtitle: "您保存的链接",
  shortcuts: "快捷方式",
  searchDocuments: "搜索文档",
  noResults: "没有匹配的文档",
  noResultsHint: "请尝试其他搜索词。",
  emptyTitle: "暂无文档",
  startWriting: "开始编写...",
  emptyText: "创建你的第一个文档以开始。",
  word: "字",
  words: "字",
  sheetsReady: "你的电子表格工作区已就绪。原生工具正在积极开发中。",
  presentationsReady: "你的演示文稿工作区已就绪。原生工具正在积极开发中。",
  untitledSpreadsheet: "未命名电子表格",
  searchSpreadsheets: "搜索电子表格",
  oneSpreadsheet: "1 份电子表格",
  manySpreadsheets: "份电子表格",
  noSpreadsheets: "暂无电子表格。创建一个以开始。",
  noMatchingSpreadsheets: "没有匹配的电子表格",
  emptySheetsTitle: "暂无电子表格",
  emptySheetsText: "创建你的第一个电子表格以开始。",
  deleteSpreadsheetConfirm: "删除此电子表格？此操作无法撤销。",
  addSheet: "添加工作表",
  renameSheet: "重命名工作表",
  deleteSheet: "删除工作表",
  sheetName: "工作表名称",
  insertRowAbove: "在上方插入行",
  insertColumnLeft: "在左侧插入列",
  deleteRow: "删除行",
  deleteColumn: "删除列",
  numberFormat: "数字格式",
  fmtGeneral: "常规",
  fmtNumber: "数字",
  fmtThousands: "数字 (1,000.00)",
  fmtPercent: "百分比",
  fmtCurrency: "货币",
  fmtScientific: "科学计数法",
  bold: "加粗",
  italic: "斜体",
  underline: "下划线",
  fillColor: "填充颜色",
  sum: "求和",
  average: "平均值",
  count: "计数",
  min: "最小值",
  max: "最大值",
  exportCSV: "CSV (.csv)",
  exportTSV: "TSV (.tsv)",
  exportJSON: "JSON (.json)",
  sheetTab: "工作表",
};
const _locales: Record<LangCode, Locale> = { en: _en, it: _it, zh: _zh };

function _detectSystemLang(): LangCode {
  const nav = navigator.language?.toLowerCase() ?? "en";
  if (nav.startsWith("it")) return "it";
  if (nav.startsWith("zh")) return "zh";
  return "en";
}
function getSavedLang(): LangSetting {
  return (localStorage.getItem("alma:lang") as LangSetting) ?? "system";
}
function saveLang(lang: LangSetting): void {
  localStorage.setItem("alma:lang", lang);
}
function resolveLocale(): { lang: LangCode; locale: Locale } {
  const saved = getSavedLang();
  const lang: LangCode = saved === "system" ? _detectSystemLang() : saved;
  return { lang, locale: _locales[lang] };
}

let { lang: currentLang, locale: t } = resolveLocale();

function applyLocale(): void {
  ({ lang: currentLang, locale: t } = resolveLocale());

  const saved = getSavedLang();

  // Address / search placeholders
  (document.getElementById("address") as HTMLInputElement | null)
    ?.setAttribute("placeholder", t.searchOrUrl);
  document.querySelectorAll<HTMLInputElement>(".home-search-input")
    .forEach((el) => el.setAttribute("placeholder", t.searchOrUrl));

  // Home subtitle
  setTextAll(".home-view .alma-subtitle", t.subtitle);

  // Home sections
  setTextAll("#home-apps-title", t.apps);
  setTextAll("#home-shortcuts-title", t.shortcuts);
  setTextAll(".app-item[data-app='documents'] .app-name", t.documents);
  setTextAll(".app-item[data-app='sheets'] .app-name", t.sheets);
  setTextAll(".app-item[data-app='presentations'] .app-name", t.presentations);

  // Settings panel buttons
  const elMap: [string, string][] = [
    ["open-history",       t.history],
    ["theme-toggle",       t.themes],
    ["lang-settings-btn",  t.language],
  ];
  elMap.forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });

  // Favorites label inside settings panel (nested span)
  const favSpan = document.getElementById("open-favorites");
  if (favSpan) favSpan.textContent = t.favorites;

  // Restore session button
  updateRestoreBtn();

  // Themes panel
  setText("#themes-panel .themes-title", t.themesTitle);
  setText("#themes-section-mode .themes-label", t.mode);
  setText("#themes-section-accent .themes-label", t.accent);
  setText("#themes-section-bg .themes-label", t.homeBackground);
  setText("#theme-light", t.light);
  setText("#theme-dark", t.dark);

  // Choose image label (text node only, preserve hidden input)
  const chooseLabel = document.querySelector<HTMLLabelElement>(".themes-file");
  if (chooseLabel) {
    const firstChild = chooseLabel.childNodes[0];
    if (firstChild?.nodeType === Node.TEXT_NODE) firstChild.textContent = t.chooseImage + "\n";
  }

  // Favorites panel
  setText("#favorites-panel .themes-title", t.favoritesTitle);
  setText("#open-favorites-page", t.openFavoritesPage);

  // History / favorites views
  setText("#history-title", t.historyTitle);
  setText("#history-subtitle", t.historySubtitle);
  setText("#clear-history", t.clearHistory);
  setText("#favorites-title", t.favoritesTitle);
  setText("#favorites-subtitle", t.favoritesSubtitle);
  setText("#clear-favorites", t.clearFavorites);

  // Native apps views
  applyDocumentsLocale();
  applySheetsLocale();
  presentationsApp.setLang(currentLang);

  // Language panel
  setText("#language-panel .themes-title", t.languageTitle);

  // Nav aria-labels
  const ariaMap: [string, string][] = [
    ["back", t.back], ["forward", t.forward], ["reload", t.reload],
    ["home", t.home], ["new-window", t.newWindow], ["new-tab", t.newTab],
  ];
  ariaMap.forEach(([id, label]) => document.getElementById(id)?.setAttribute("aria-label", label));

  // Shortcut modal
  setText("#shortcut-modal-title", t.addShortcut);
  setText("#shortcut-name-label", t.shortcutName);
  setText("#shortcut-url-label", t.shortcutLink);
  setText("#cancel-shortcut-btn", t.cancel);
  setText("#confirm-shortcut-btn", t.confirm);
  renderShortcuts();

  // Favorites folder & link buttons
  setText("#new-folder-btn", "+ " + (t.folder || "Folder"));
  setText("#new-folder-btn-page", "+ " + (t.folder || "Folder"));
  setText("#new-link-btn", "+ " + (t.link || "Link"));
  setText("#new-link-btn-page", "+ " + (t.link || "Link"));

  // Language option active highlight
  document.querySelectorAll<HTMLButtonElement>(".lang-option").forEach(btn => {
    const active = btn.dataset.lang === saved;
    btn.style.fontWeight = active ? "700" : "500";
    btn.style.background = active ? "color-mix(in srgb, var(--tint) 20%, var(--surface))" : "";
  });
}

function setText(selector: string, text: string): void {
  const el = document.querySelector<HTMLElement>(selector);
  if (el) el.textContent = text;
}

function setTextAll(selector: string, text: string): void {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => { el.textContent = text; });
}

const HOME_URL = "home.html";
const HISTORY_URL = "history.html";
const FAVORITES_URL = "favorites.html";
const DOCUMENTS_URL = "documents.html";
const SHEETS_URL = "sheets.html";
const PRESENTATIONS_URL = "presentations.html";

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
const documentsView = document.getElementById("documents-view") as HTMLElement | null;
const sheetsView = document.getElementById("sheets-view") as HTMLElement | null;
const presentationsView = document.getElementById("presentations-view") as HTMLElement | null;
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
    themesPanel.style.display = themesPanel.style.display === "none" ? "flex" : "none";
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
const DARK_DEFAULT_TINT = "#4c4c70";
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
  /** Internal views (home/history/favorites/documents/sheets/presentations) visited by this tab. */
  internalStack: string[];
  /** Internal views popped by "back", replayed by "forward". */
  internalForward: string[];
}

let tabs: Tab[] = [];
let activeTabId: number | null = null;
let nextTabId = 1;
let webview: any = null;
let splitMode = false;
let splitRatio = 0.5;
let draggingDivider = false;
let dragOverlayEl: HTMLElement | null = null;
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
  return url === HOME_URL
    || url === "about:blank"
    || /^https?:\/\/home\.html$/i.test(url)
    || /[/\\]home\.html$/i.test(url);   // catches file:// paths to home.html
}

function isHistoryUrl(url: string): boolean {
  return url === HISTORY_URL || /^https?:\/\/history\.html$/i.test(url);
}

function isFavoritesUrl(url: string): boolean {
  return url === FAVORITES_URL || /^https?:\/\/favorites\.html$/i.test(url);
}

function isDocumentsUrl(url: string): boolean {
  return url === DOCUMENTS_URL || /^https?:\/\/documents\.html$/i.test(url) || url === "alma://documents";
}

function isSheetsUrl(url: string): boolean {
  return url === SHEETS_URL || /^https?:\/\/sheets\.html$/i.test(url) || url === "alma://sheets";
}

function isPresentationsUrl(url: string): boolean {
  return url === PRESENTATIONS_URL || /^https?:\/\/presentations\.html$/i.test(url) || url === "alma://presentations";
}

/** Maps any flavour of an internal URL to its canonical constant, or null for web pages. */
function canonicalInternalUrl(url: string): string | null {
  if (isHomeUrl(url)) return HOME_URL;
  if (isHistoryUrl(url)) return HISTORY_URL;
  if (isFavoritesUrl(url)) return FAVORITES_URL;
  if (isDocumentsUrl(url)) return DOCUMENTS_URL;
  if (isSheetsUrl(url)) return SHEETS_URL;
  if (isPresentationsUrl(url)) return PRESENTATIONS_URL;
  return null;
}

function isNativeAppUrl(url: string): boolean {
  return isDocumentsUrl(url) || isSheetsUrl(url) || isPresentationsUrl(url);
}

/** History a fresh tab starts with: the home page, plus the view it was opened on. */
function initialInternalStack(url: string): string[] {
  const internal = canonicalInternalUrl(url);
  if (internal && internal !== HOME_URL) return [HOME_URL, internal];
  return [HOME_URL];
}

/** True while a native app shows a document/spreadsheet/deck instead of its list. */
function nativeAppIsEditing(url: string): boolean {
  if (isDocumentsUrl(url)) return !!activeDocId;
  if (isSheetsUrl(url)) return !!activeSheetId;
  if (isPresentationsUrl(url)) return presentationsApp.isEditing();
  return false;
}

/** Sends a native app back to its list view. */
function closeNativeAppEditor(url: string): void {
  if (isDocumentsUrl(url)) closeEditorReturnToList();
  else if (isSheetsUrl(url)) closeSheetEditorReturnToList();
  else if (isPresentationsUrl(url)) presentationsApp.closeEditor();
}

function friendlyTabTitle(url: string): string {
  if (isHomeUrl(url)) return "Home";
  if (isHistoryUrl(url)) return "History";
  if (isFavoritesUrl(url)) return "Favorites";
  if (isDocumentsUrl(url)) return "Documents";
  if (isSheetsUrl(url)) return "Sheets";
  if (isPresentationsUrl(url)) return "Presentations";
  if (/google\.[^/]*\/search/i.test(url)) return "Search";
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./i, "");
    return host || url;
  } catch {
    return url === "about:blank" ? "Home" : url;
  }
}

function syncInternalView(url: string) {
  const isHome = isHomeUrl(url);
  const isHist = isHistoryUrl(url);
  const isFav = isFavoritesUrl(url);
  const isDoc = isDocumentsUrl(url);
  const isSheet = isSheetsUrl(url);
  const isPres = isPresentationsUrl(url);

  if (homeView) homeView.style.display = isHome ? "flex" : "none";
  if (historyView) {
    historyView.style.display = isHist ? "flex" : "none";
    if (isHist) renderHistory();
  }
  if (favoritesView) {
    favoritesView.style.display = isFav ? "flex" : "none";
    if (isFav) renderFavorites();
  }
  if (documentsView) {
    documentsView.style.display = isDoc ? "flex" : "none";
    if (isDoc) {
      documents = getDocuments();
      initDocumentsUI();
    }
  }
  if (sheetsView) {
    sheetsView.style.display = isSheet ? "flex" : "none";
    if (isSheet) {
      doSheetAutoSave();
      spreadsheets = getSpreadsheets();
      initSheetsUI();
    }
  }
  if (presentationsView) {
    presentationsView.style.display = isPres ? "flex" : "none";
    if (isPres) presentationsApp.onShow();
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
  if (splitMode) {
    if (leftToolbar && (leftToolbar as any)._sync) (leftToolbar as any)._sync();
    if (rightToolbar && (rightToolbar as any)._sync) (rightToolbar as any)._sync();
  }
  const tab = getActiveTab();
  setNavState(tabCanGoBack(tab), tabCanGoForward(tab));
}

function tabCanGoBack(tab: Tab | null): boolean {
  if (!tab) return false;
  if (canonicalInternalUrl(tab.url)) {
    if (nativeAppIsEditing(tab.url)) return true;
    return tab.internalStack.length > 1;
  }
  try {
    return typeof tab.webview?.canGoBack === "function" ? !!tab.webview.canGoBack() : false;
  } catch {
    return false;
  }
}

function tabCanGoForward(tab: Tab | null): boolean {
  if (!tab) return false;
  if (canonicalInternalUrl(tab.url)) {
    return tab.internalForward.length > 0;
  }
  try {
    return typeof tab.webview?.canGoForward === "function" ? !!tab.webview.canGoForward() : false;
  } catch {
    return false;
  }
}

function updateTabUI(tab: Tab) {
  if (!tab.element) return;
  const titleEl = tab.element.querySelector(".tab-title") as HTMLElement | null;
  if (titleEl) titleEl.textContent = tab.title || tab.url || "New Tab";
  const isActive = splitMode ? (tab.id === leftTabId || tab.id === rightTabId) : (tab.id === activeTabId);
  tab.element.classList.toggle("active", isActive);
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
    if (tab.id === activeTabId || (splitMode && (tab.id === leftTabId || tab.id === rightTabId))) {
      if (!splitMode) {
        syncInternalView(tab.url);
        addressInput.value = tab.url;
      }
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
    if (tab.id === activeTabId || (splitMode && (tab.id === leftTabId || tab.id === rightTabId))) {
      if (!splitMode) {
        syncInternalView(tab.url);
        addressInput.value = tab.url;
      }
      syncNavState();
      if (splitMode) applyLayout();
    }
    updateTabUI(tab);
  });
  wv.addEventListener("did-finish-load", () => {
    if (tab.id === activeTabId || (splitMode && (tab.id === leftTabId || tab.id === rightTabId))) {
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

function receiveTabFromWindow(payload: any, insertBeforeTabId?: number) {
  const url = payload?.url || HOME_URL;
  const title = payload?.title || friendlyTabTitle(url);
  const fromWindowId = payload?.sourceWindowId as number | null;
  const fromTabId = payload?.tabId as number | undefined;

  // Pass the real URL directly — createTab navigates via dom-ready, so this is correct
  const newTab = createTab(url, false);
  newTab.title = title;
  updateTabUI(newTab);

  // Insert before a specific tab if requested
  if (insertBeforeTabId != null) {
    const targetIdx = tabs.findIndex((t) => t.id === insertBeforeTabId);
    const newIdx = tabs.indexOf(newTab);
    if (targetIdx !== -1 && newIdx !== -1 && newIdx !== targetIdx) {
      const [m] = tabs.splice(newIdx, 1);
      tabs.splice(targetIdx, 0, m);
      if (tabsContainer) tabs.forEach((t) => tabsContainer!.appendChild(t.element));
    }
  }

  switchTab(newTab.id);
  persistTabs();

  // Remove the tab from the source window
  if (fromWindowId != null && fromTabId != null && almaAPI) {
    void almaAPI.removeTabInWindow(fromWindowId, fromTabId);
  }
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

  const tab: Tab = {
    id,
    title: "New Tab",
    url: initialUrl,
    webview: wv,
    element,
    initialAboutBlankPending: true,
    internalStack: initialInternalStack(initialUrl),
    internalForward: [],
  };
  tabs.push(tab);
  attachWebviewEvents(tab);

  // drag and drop: reorder within window + tear-off + drop into other window
  element.addEventListener("dragstart", (e) => {
    draggedTabId = id;
    dragHandled = false;
    droppedInTabBar = false;
    const tab = tabs.find((t) => t.id === id);
    const payload = {
      tabId: id,
      url: tab?.url ?? HOME_URL,
      title: tab?.title ?? "New Tab",
      sourceWindowId: currentWindowId,
    };
    currentDragPayload = payload;
    e.dataTransfer?.setData("text/plain", JSON.stringify(payload));
    element.classList.add("dragging");
    almaAPI?.notifyDragStart(payload);
  });

  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");
    if (!draggedTabId || draggedTabId !== id) return;
    const capturedId = id;
    const capturedUrl = (tabs.find((t) => t.id === capturedId)?.url) ?? HOME_URL;

    draggedTabId = null;
    almaAPI?.notifyDragEnd();
    currentDragPayload = null;

    // Same-window drop on tab bar — reorder already handled by drop event
    if (droppedInTabBar) {
      droppedInTabBar = false;
      return;
    }
    droppedInTabBar = false;

    // Wait for any cross-window IPC (removeTabInWindow) to be processed
    // before deciding whether a tearoff is needed
    setTimeout(() => {
      // If the tab was already removed by the target window, nothing to do
      if (!tabs.some((t) => t.id === capturedId)) return;
      // Tab still exists: user dropped outside any window → tear off
      const stillExists = tabs.find((t) => t.id === capturedId);
      if (!stillExists) return;
      closeTab(capturedId);
      // Open a new window with the tab's real URL
      if (almaAPI) void almaAPI.newWindow(isHomeUrl(capturedUrl) ? undefined : capturedUrl);
    }, 200);
  });

  element.addEventListener("dragover", (e) => {
    e.preventDefault();
    element.classList.add("drag-over");
  });

  element.addEventListener("dragleave", () => {
    element.classList.remove("drag-over");
  });

  element.addEventListener("drop", (e) => {
    element.classList.remove("drag-over");
    e.preventDefault();
    e.stopPropagation();
    if (dropInProgress) return;
    dropInProgress = true;
    setTimeout(() => { dropInProgress = false; }, 50);

    let payload: any = currentDragPayload;
    if (!payload) {
      try { payload = JSON.parse(e.dataTransfer?.getData("text/plain") || ""); } catch { return; }
    }
    if (!payload?.tabId) return;
    const fromId = payload.tabId as number;
    const fromWindowId = payload.sourceWindowId as number | null;

    if (fromWindowId === currentWindowId) {
      // Same-window reorder
      if (fromId === id) return;
      droppedInTabBar = true;
      reorderTabs(fromId, id);
      persistTabs();
    } else if (fromWindowId != null) {
      // Cross-window drop: receive tab in this window, remove from source
      receiveTabFromWindow(payload, id);
    }
  });

  element.addEventListener("click", () => {
    if (splitMode) {
      if (focusedPane === "left") {
        leftTabId = id;
      } else {
        rightTabId = id;
      }
      activeTabId = id;
      tabs.forEach((t) => updateTabUI(t));
      applyLayout();
      syncNavState();
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
  syncInternalView(tab.url);
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
  if (!url || isHomeUrl(url) || url === "about:blank" || isDocumentsUrl(url) || isSheetsUrl(url) || isPresentationsUrl(url)) return;
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

/** Native apps count as visited pages: opening one shows up in the history list. */
function recordNativeAppVisit(url: string): void {
  recordHistory(url, friendlyTabTitle(url));
}

const HISTORY_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l3 2"></path></svg>`;
const SHEETS_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M3 10h18M9 10v10M15 10v10"></path></svg>`;
const PRESENTATIONS_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M12 16v4M8 20h8"></path></svg>`;

/** Native apps get their own glyph in the history list. */
function historyEntryIcon(url: string): string {
  if (isDocumentsUrl(url)) return DOC_ICON_SVG;
  if (isSheetsUrl(url)) return SHEETS_ICON_SVG;
  if (isPresentationsUrl(url)) return PRESENTATIONS_ICON_SVG;
  return HISTORY_ICON_SVG;
}

function renderHistory() {
  const container = document.getElementById("history-list");
  if (!container) return;
  let list: { url: string; title: string; time: number }[] = [];
  try { list = JSON.parse(localStorage.getItem("alma:history") || "[]"); } catch { list = []; }
  list.sort((a, b) => b.time - a.time);
  if (list.length === 0) {
    container.innerHTML = `<div class="page-empty">${escapeHtml(t.noHistory)}</div>`;
    return;
  }
  container.innerHTML = list.map((e) => `
    <a class="page-row" href="${escapeHtmlAttr(e.url)}" data-url="${escapeHtmlAttr(e.url)}">
      <span class="page-row-icon">${historyEntryIcon(e.url)}</span>
      <span class="page-row-body">
        <span class="page-row-title">${escapeHtml(e.title || e.url)}</span>
        <span class="page-row-meta">${escapeHtml(formatHistoryTime(e.time))}</span>
      </span>
    </a>
  `).join("");
  container.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (ev) => {
      ev.preventDefault();
      const url = (ev.currentTarget as HTMLElement).getAttribute("data-url");
      if (url) navigateTo(url);
    });
  });
}

function formatHistoryTime(ts: number): string {
  try {
    return new Date(ts).toLocaleString(currentLang, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return new Date(ts).toLocaleString();
  }
}

function normalizeUrl(u: string): string {
  if (!u) return "";
  try {
    const parsed = new URL(u);
    let pathname = parsed.pathname;
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }
    return `${parsed.protocol}//${parsed.host}${pathname}${parsed.search}`;
  } catch {
    return u.trim().replace(/\/+$/, "");
  }
}

interface FavoriteItem {
  url: string;
  title: string;
  time: number;
  folderId?: string;
}

interface FavoriteFolder {
  id: string;
  name: string;
}

const openFolderIds: Set<string> = new Set();
let foldersInitialized = false;

function ensureFolderState() {
  if (!foldersInitialized) {
    getFavoriteFolders().forEach(f => openFolderIds.add(f.id));
    foldersInitialized = true;
  }
}

function getFavoriteFolders(): FavoriteFolder[] {
  try { return JSON.parse(localStorage.getItem("alma:favorite_folders") || "[]"); } catch { return []; }
}
function setFavoriteFolders(folders: FavoriteFolder[]) {
  try { localStorage.setItem("alma:favorite_folders", JSON.stringify(folders)); } catch { /* ignore */ }
}

function getFavorites(): FavoriteItem[] {
  try { return JSON.parse(localStorage.getItem("alma:favorites") || "[]"); } catch { return []; }
}
function setFavorites(list: FavoriteItem[]) {
  try { localStorage.setItem("alma:favorites", JSON.stringify(list)); } catch { /* ignore */ }
}
function isFavoriteUrlSaved(url: string): boolean {
  const norm = normalizeUrl(url);
  if (!norm) return false;
  return getFavorites().some((f) => normalizeUrl(f.url) === norm);
}
function addFavorite(url: string, title: string, folderId?: string) {
  if (!url || isHomeUrl(url) || isHistoryUrl(url) || isFavoritesUrl(url) || isDocumentsUrl(url) || isSheetsUrl(url) || isPresentationsUrl(url)) return;
  const norm = normalizeUrl(url);
  const favs = getFavorites();
  if (favs.some((f) => normalizeUrl(f.url) === norm)) return;
  favs.unshift({ url, title: title || friendlyTabTitle(url), time: Date.now(), folderId });
  setFavorites(favs);
}
function removeFavorite(url: string) {
  const norm = normalizeUrl(url);
  const favs = getFavorites().filter((f) => normalizeUrl(f.url) !== norm);
  setFavorites(favs);
}
function toggleFavorite(url: string, title: string) {
  if (isFavoriteUrlSaved(url)) removeFavorite(url);
  else addFavorite(url, title);
  renderFavorites();
}

function deleteFavoriteFolder(folderId: string) {
  const folders = getFavoriteFolders().filter(f => f.id !== folderId);
  setFavoriteFolders(folders);
  openFolderIds.delete(folderId);

  // Unfile items from this folder (don't delete their links)
  const favs = getFavorites();
  favs.forEach(f => {
    if (f.folderId === folderId) {
      delete f.folderId;
    }
  });
  setFavorites(favs);
  renderFavorites();
}

function renderFavoriteRow(item: FavoriteItem, folders: FavoriteFolder[]): string {
  const folderOptions = [
    `<option value="none" ${!item.folderId ? "selected" : ""}>Unfiled</option>`,
    ...folders.map(f => `<option value="${f.id}" ${item.folderId === f.id ? "selected" : ""}>📁 ${f.name}</option>`)
  ].join("");

  return `
    <div class="fav-item-row" draggable="true" data-fav-url="${encodeURIComponent(item.url)}">
      <a href="${item.url}" data-url="${item.url}" class="fav-item-link" title="${item.title}">${item.title}</a>
      ${folders.length > 0 ? `<select class="fav-move-select" data-url="${encodeURIComponent(item.url)}" title="Move to folder">${folderOptions}</select>` : ""}
      <button data-remove="${encodeURIComponent(item.url)}" class="settings-btn" style="width:auto;padding:2px 8px;font-size:12px;">Remove</button>
    </div>
  `;
}

function renderFavorites() {
  ensureFolderState();
  const favs = getFavorites();
  const folders = getFavoriteFolders();

  const render = (containerId: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (favs.length === 0 && folders.length === 0) {
      container.innerHTML = `<div style="padding:16px 0;text-align:center;color:var(--text-secondary);font-size:13px;">Nothing yet</div>`;
      return;
    }

    let html = "";

    // 1. Folders
    folders.forEach(folder => {
      const folderFavs = favs.filter(f => f.folderId === folder.id);
      const isOpen = openFolderIds.has(folder.id);

      html += `
        <div class="fav-folder-section ${isOpen ? "open" : ""}" data-folder-id="${folder.id}">
          <div class="fav-folder-header" data-toggle-folder="${folder.id}">
            <span class="fav-folder-toggle">${isOpen ? "▼" : "▶"}</span>
            <span class="fav-folder-title">📁 ${folder.name}</span>
            <span class="fav-folder-count">(${folderFavs.length})</span>
            <button class="fav-folder-delete" data-delete-folder="${folder.id}" title="Delete folder" aria-label="Delete folder">✕</button>
          </div>
          ${isOpen ? `
            <div class="fav-folder-items">
              ${folderFavs.length === 0
                ? `<div style="padding:8px 4px;color:var(--text-secondary);font-size:12px;font-style:italic;">Empty folder (drag links here)</div>`
                : folderFavs.map(f => renderFavoriteRow(f, folders)).join("")}
            </div>
          ` : ""}
        </div>
      `;
    });

    // 2. Unfiled items
    const unfiledFavs = favs.filter(f => !f.folderId || !folders.some(fd => fd.id === f.folderId));
    if (folders.length > 0 || unfiledFavs.length > 0) {
      html += `
        <div class="fav-unfiled-dropzone" data-drop-unfiled="true">
          ${folders.length > 0 ? `<div class="fav-section-label">Unfiled Favorites (${unfiledFavs.length})</div>` : ""}
          <div class="fav-unfiled-items">
            ${unfiledFavs.length === 0 && folders.length > 0
              ? `<div style="padding:6px 4px;color:var(--text-secondary);font-size:12px;font-style:italic;">Drag links here to unfile</div>`
              : unfiledFavs.map(f => renderFavoriteRow(f, folders)).join("")}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;

    // Attach listeners
    container.querySelectorAll<HTMLAnchorElement>("a.fav-item-link").forEach(a => {
      a.addEventListener("click", ev => {
        ev.preventDefault();
        const url = (ev.currentTarget as HTMLElement).getAttribute("data-url");
        if (url) navigateTo(url);
      });
    });

    container.querySelectorAll<HTMLButtonElement>("button[data-remove]").forEach(b => {
      b.addEventListener("click", ev => {
        ev.preventDefault();
        const encodedUrl = (ev.currentTarget as HTMLElement).getAttribute("data-remove");
        if (encodedUrl) {
          const url = decodeURIComponent(encodedUrl);
          removeFavorite(url);
          renderFavorites();
          updateFavoriteButtons();
        }
      });
    });

    container.querySelectorAll<HTMLSelectElement>("select.fav-move-select").forEach(sel => {
      sel.addEventListener("change", ev => {
        const select = ev.currentTarget as HTMLSelectElement;
        const encodedUrl = select.getAttribute("data-url");
        if (!encodedUrl) return;
        const url = decodeURIComponent(encodedUrl);
        const folderId = select.value === "none" ? undefined : select.value;
        const currentFavs = getFavorites();
        const targetFav = currentFavs.find(f => normalizeUrl(f.url) === normalizeUrl(url));
        if (targetFav) {
          targetFav.folderId = folderId;
          setFavorites(currentFavs);
          renderFavorites();
        }
      });
    });

    container.querySelectorAll<HTMLElement>("[data-toggle-folder]").forEach(header => {
      header.addEventListener("click", ev => {
        const target = ev.target as HTMLElement;
        if (target.closest("[data-delete-folder]")) return;
        const folderId = header.getAttribute("data-toggle-folder");
        if (!folderId) return;
        if (openFolderIds.has(folderId)) {
          openFolderIds.delete(folderId);
        } else {
          openFolderIds.add(folderId);
        }
        renderFavorites();
      });
    });

    container.querySelectorAll<HTMLButtonElement>("[data-delete-folder]").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.stopPropagation();
        const folderId = btn.getAttribute("data-delete-folder");
        if (!folderId) return;
        deleteFavoriteFolder(folderId);
      });
    });

    // Drag and Drop for favorites across folders
    container.querySelectorAll<HTMLElement>(".fav-item-row[draggable='true']").forEach(row => {
      row.addEventListener("dragstart", (e) => {
        const url = row.getAttribute("data-fav-url");
        if (!url) return;
        row.classList.add("fav-dragging");
        e.dataTransfer?.setData("text/alma-fav-url", url);
        e.dataTransfer?.setData("text/plain", decodeURIComponent(url));
        if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
      });

      row.addEventListener("dragend", () => {
        row.classList.remove("fav-dragging");
        container.querySelectorAll(".fav-drop-target").forEach(el => el.classList.remove("fav-drop-target"));
      });
    });

    const setupDropTarget = (targetEl: HTMLElement, targetFolderId: string | undefined) => {
      targetEl.addEventListener("dragover", (e) => {
        if (e.dataTransfer?.types.includes("text/alma-fav-url")) {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = "move";
          targetEl.classList.add("fav-drop-target");
        }
      });

      targetEl.addEventListener("dragleave", (e) => {
        if (!targetEl.contains(e.relatedTarget as Node)) {
          targetEl.classList.remove("fav-drop-target");
        }
      });

      targetEl.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        targetEl.classList.remove("fav-drop-target");
        const encodedUrl = e.dataTransfer?.getData("text/alma-fav-url");
        if (!encodedUrl) return;
        const url = decodeURIComponent(encodedUrl);
        const currentFavs = getFavorites();
        const targetFav = currentFavs.find(f => normalizeUrl(f.url) === normalizeUrl(url));
        if (targetFav) {
          targetFav.folderId = targetFolderId;
          setFavorites(currentFavs);
          if (targetFolderId) {
            openFolderIds.add(targetFolderId);
          }
          renderFavorites();
        }
      });
    };

    container.querySelectorAll<HTMLElement>(".fav-folder-section").forEach(sec => {
      const folderId = sec.getAttribute("data-folder-id");
      if (folderId) setupDropTarget(sec, folderId);
    });

    container.querySelectorAll<HTMLElement>(".fav-unfiled-dropzone").forEach(dropzone => {
      setupDropTarget(dropzone, undefined);
    });
  };

  render("favorites-list");
  render("favorites-list-page");
}

// ---- Documents App ----
interface Doc {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
  createdAt: number;
}

const DOCS_STORAGE_KEY = "alma:documents";

const DOC_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path></svg>`;
const SEARCH_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.6-3.6"></path></svg>`;
const RENAME_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L18 10a2.83 2.83 0 0 0-4-4L4 16z"></path></svg>`;
const DELETE_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"></path><path d="M9 7V5h6v2"></path><path d="M6 7l1 13h10l1-13"></path></svg>`;

let documents: Doc[] = [];
let activeDocId: string | null = null;
let autoSaveTimer: number | null = null;
let isAutoSaving = false;
let docsUIReady = false;
let docsQuery = "";

function getDocuments(): Doc[] {
  try {
    const raw = localStorage.getItem(DOCS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveDocuments(list: Doc[]): void {
  try {
    localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function documentsViewEl(): HTMLElement | null {
  return document.getElementById("documents-view") as HTMLElement | null;
}

function docsListEl(): HTMLElement | null {
  return document.getElementById("docs-list") as HTMLElement | null;
}

function docsEditorEl(): HTMLElement | null {
  return document.getElementById("docs-editor") as HTMLElement | null;
}

function createDocument(): Doc {
  const now = Date.now();
  const doc: Doc = {
    id: "doc_" + now + "_" + Math.random().toString(36).slice(2, 7),
    title: t.untitledDocument,
    content: "",
    updatedAt: now,
    createdAt: now,
  };
  documents.unshift(doc);
  saveDocuments(documents);
  return doc;
}

function deleteDocument(id: string): void {
  documents = documents.filter((d) => d.id !== id);
  saveDocuments(documents);
  if (activeDocId === id) {
    closeEditorReturnToList();
  }
  renderDocumentList();
}

function renameDocument(id: string, title: string): void {
  const doc = documents.find((d) => d.id === id);
  if (!doc || !title.trim()) return;
  doc.title = title.trim();
  doc.updatedAt = Date.now();
  saveDocuments(documents);
  renderDocumentList();
  const titleEl = document.getElementById("docs-doc-title") as HTMLElement | null;
  if (titleEl && activeDocId === id) titleEl.textContent = doc.title;
}

function formatDocDate(ts: number): string {
  const diff = Date.now() - ts;
  const minute = 60_000;
  const hour = 3_600_000;
  const day = 86_400_000;
  try {
    const rtf = new Intl.RelativeTimeFormat(currentLang, { numeric: "auto" });
    if (diff < minute) return rtf.format(0, "second");
    if (diff < hour) return rtf.format(-Math.round(diff / minute), "minute");
    if (diff < day) return rtf.format(-Math.round(diff / hour), "hour");
    if (diff < 7 * day) return rtf.format(-Math.round(diff / day), "day");
  } catch {
    // fall through to a plain date
  }
  return new Date(ts).toLocaleDateString(currentLang, { month: "short", day: "numeric" });
}

function closeEditorReturnToList(): void {
  activeDocId = null;
  documentsViewEl()?.classList.remove("is-editing");
  renderDocumentList();
}

function openDocumentEditor(docId?: string, focus = true): void {
  let doc: Doc | null = null;
  if (docId) {
    doc = documents.find((d) => d.id === docId) ?? null;
  }
  if (!doc) {
    doc = createDocument();
  }
  activeDocId = doc.id;

  documentsViewEl()?.classList.add("is-editing");

  const titleEl = document.getElementById("docs-doc-title") as HTMLElement | null;
  const editor = docsEditorEl();

  if (titleEl) {
    titleEl.textContent = doc.title;
    titleEl.setAttribute("data-placeholder", t.untitledDocument);
  }
  if (editor) {
    editor.innerHTML = sanitizeDocHtml(doc.content);
    editor.setAttribute("data-placeholder", t.startWriting);
  }

  updateDocsStatus("saved");
  updateWordCount();
  renderDocumentList();

  if (focus) {
    editor?.focus();
  }
}

function renderDocumentList(): void {
  const listEl = docsListEl();
  const countEl = document.getElementById("docs-list-count");
  if (!listEl || !countEl) return;

  const sorted = [...documents].sort((a, b) => b.updatedAt - a.updatedAt);
  const total = sorted.length;
  countEl.textContent = total === 1 ? t.oneDocument : `${total} ${t.manyDocuments}`;

  const query = docsQuery.trim().toLowerCase();
  const visible = query
    ? sorted.filter((d) => d.title.toLowerCase().includes(query))
    : sorted;

  if (visible.length === 0) {
    const noMatch = total > 0;
    listEl.innerHTML = `
      <div class="docs-list-empty">
        <div class="docs-empty-icon">${noMatch ? SEARCH_ICON_SVG : DOC_ICON_SVG}</div>
        <p class="docs-empty-title">${escapeHtml(noMatch ? t.noResults : t.emptyTitle)}</p>
        <p class="docs-empty-sub">${escapeHtml(noMatch ? t.noResultsHint : t.emptyText)}</p>
      </div>`;
    return;
  }

  listEl.innerHTML = visible.map((doc) => `
    <div class="docs-item${doc.id === activeDocId ? " active" : ""}" data-doc-id="${doc.id}" role="listitem" tabindex="0">
      <div class="docs-item-icon">${DOC_ICON_SVG}</div>
      <div class="docs-item-body">
        <div class="docs-item-title">${escapeHtml(doc.title)}</div>
        <div class="docs-item-meta">${escapeHtml(formatDocDate(doc.updatedAt))}</div>
      </div>
      <div class="docs-item-actions">
        <button class="docs-item-btn" data-action="rename" title="${escapeHtmlAttr(t.rename)}" aria-label="${escapeHtmlAttr(t.rename)}">${RENAME_ICON_SVG}</button>
        <button class="docs-item-btn danger" data-action="delete" title="${escapeHtmlAttr(t.delete)}" aria-label="${escapeHtmlAttr(t.delete)}">${DELETE_ICON_SVG}</button>
      </div>
    </div>
  `).join("");
}

function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function escapeHtmlAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function updateDocsStatus(state: "saved" | "saving"): void {
  const status = document.getElementById("docs-save-status");
  const dot = document.getElementById("docs-status-dot") as HTMLElement | null;
  if (status) status.textContent = state === "saving" ? t.saving : t.saved;
  if (dot) dot.className = "status-dot " + state;
}

function updateWordCount(): void {
  const el = document.getElementById("docs-word-count");
  if (!el) return;
  const editor = docsEditorEl();
  const text = (editor?.innerText || "").trim();
  const count = text ? text.split(/\s+/).filter(Boolean).length : 0;
  el.textContent = `${count} ${count === 1 ? t.word : t.words}`;
}

function scheduleAutoSave(): void {
  if (autoSaveTimer !== null) {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = null;
  }
  if (!activeDocId) return;
  autoSaveTimer = window.setTimeout(() => {
    doAutoSave();
  }, 1500);
}

function doAutoSave(): void {
  autoSaveTimer = null;
  if (!activeDocId || isAutoSaving) return;
  const editor = docsEditorEl();
  const titleEl = document.getElementById("docs-doc-title") as HTMLElement | null;
  const content = editor ? sanitizeDocHtml(editor.innerHTML) : "";
  const title = titleEl ? titleEl.textContent?.trim() || t.untitledDocument : t.untitledDocument;
  const idx = documents.findIndex((d) => d.id === activeDocId);
  if (idx === -1) return;
  isAutoSaving = true;
  updateDocsStatus("saving");
  documents[idx].title = title;
  documents[idx].content = content;
  documents[idx].updatedAt = Date.now();
  saveDocuments(documents);
  isAutoSaving = false;
  updateDocsStatus("saved");
  renderDocumentList();
}

// ---- Editor formatting engine ----
const FONT_FAMILIES: { value: string; label: string; probe: string }[] = [
  { value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", label: "Sans", probe: "-apple-system" },
  { value: "Georgia, 'Times New Roman', Times, serif", label: "Serif", probe: "Georgia" },
  { value: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Courier New', monospace", label: "Mono", probe: "monospace" },
  { value: "Arial, Helvetica, sans-serif", label: "Arial", probe: "Arial" },
  { value: "'Times New Roman', Times, serif", label: "Times", probe: "Times" },
  { value: "Verdana, Geneva, sans-serif", label: "Verdana", probe: "Verdana" },
  { value: "'Courier New', Courier, monospace", label: "Courier", probe: "Courier" },
];

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 32, 48];
const LEGACY_SIZES = [13.3, 17.3, 21.3, 24, 32, 42.7, 64];
const UNSAFE_TAGS = "script,style,iframe,object,embed,link,meta,form";

const TAG_COMMANDS: Record<string, string> = {
  strong: "bold",
  em: "italic",
  u: "underline",
  s: "strikeThrough",
};

let savedRange: Range | null = null;
let toolbarSyncQueued = false;

function saveSelection(): void {
  const editor = docsEditorEl();
  const sel = window.getSelection();
  if (!editor || !sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  if (!editor.contains(range.commonAncestorContainer)) return;
  savedRange = range.cloneRange();
}

function restoreSelection(): boolean {
  const sel = window.getSelection();
  if (!sel || !savedRange) return false;
  sel.removeAllRanges();
  sel.addRange(savedRange);
  return true;
}

function selectionRootElement(): HTMLElement | null {
  const editor = docsEditorEl();
  const sel = window.getSelection();
  if (!editor || !sel || sel.rangeCount === 0) return null;
  const container = sel.getRangeAt(0).commonAncestorContainer;
  const el = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as HTMLElement;
  if (!el || !editor.contains(el)) return null;
  return el;
}

function currentSelectionElement(): HTMLElement | null {
  return selectionRootElement();
}

function findAncestorWithInline(el: HTMLElement | null, prop: string): HTMLElement | null {
  const editor = docsEditorEl();
  let cur = el;
  while (cur && cur !== editor) {
    if (cur.style && cur.style.getPropertyValue(prop)) return cur;
    cur = cur.parentElement;
  }
  return null;
}

function findAncestorTag(el: HTMLElement | null, tag: string): HTMLElement | null {
  const editor = docsEditorEl();
  let cur = el;
  while (cur && cur !== editor) {
    if (cur.tagName.toLowerCase() === tag) return cur;
    cur = cur.parentElement;
  }
  return null;
}

function unwrapElement(el: HTMLElement): void {
  const parent = el.parentNode;
  if (!parent) return;
  while (el.firstChild) parent.insertBefore(el.firstChild, el);
  parent.removeChild(el);
}

/** Removes the empty text nodes that range.insertNode() can leave behind. */
function pruneEmptyTextNodes(around: Node): void {
  const parent = around.parentNode;
  if (!parent) return;
  let prev = around.previousSibling;
  while (prev && prev.nodeType === Node.TEXT_NODE && !(prev.textContent || "").trim()) {
    const before = prev.previousSibling;
    parent.removeChild(prev);
    prev = before;
  }
  let next = around.nextSibling;
  while (next && next.nodeType === Node.TEXT_NODE && !(next.textContent || "").trim()) {
    const after = next.nextSibling;
    parent.removeChild(next);
    next = after;
  }
}

function selectNodeContents(node: Node): void {
  const sel = window.getSelection();
  if (!sel) return;
  const range = document.createRange();
  range.selectNodeContents(node);
  sel.removeAllRanges();
  sel.addRange(range);
  savedRange = range.cloneRange();
}

function afterEdit(): void {
  updateWordCount();
  scheduleAutoSave();
  syncToolbarState();
}

function runCommand(command: string, value?: string): void {
  restoreSelection();
  try {
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand(command, false, value);
  } catch {
    // ignore unsupported commands
  }
  saveSelection();
  afterEdit();
}

function legacyFontSize(px: number): string {
  let best = 1;
  let bestDiff = Number.POSITIVE_INFINITY;
  LEGACY_SIZES.forEach((value, index) => {
    const diff = Math.abs(value - px);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = index + 1;
    }
  });
  return String(best);
}

/** Wraps the selection in a semantic tag (strong/em/u/s) or removes it when already applied. */
function toggleInlineTag(tag: string): void {
  const editor = docsEditorEl();
  restoreSelection();
  const sel = window.getSelection();
  if (!editor || !sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);

  if (range.collapsed) {
    runCommand(TAG_COMMANDS[tag] || "bold");
    return;
  }

  const host = findAncestorTag(selectionRootElement(), tag);
  if (host) {
    const parent = host.parentElement;
    unwrapElement(host);
    if (parent) selectNodeContents(parent);
    afterEdit();
    return;
  }

  const frag = range.extractContents();
  const el = document.createElement(tag);
  el.appendChild(frag);
  range.insertNode(el);
  pruneEmptyTextNodes(el);
  selectNodeContents(el);
  afterEdit();
}

/** Applies an inline CSS property, reusing the surrounding span when there is one. */
function applyInlineStyle(prop: string, value: string): void {
  const editor = docsEditorEl();
  restoreSelection();
  const sel = window.getSelection();
  if (!editor || !sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);

  if (range.collapsed) {
    if (prop === "color") runCommand("foreColor", value);
    else if (prop === "background-color") runCommand("hiliteColor", value);
    else if (prop === "font-family") runCommand("fontName", value);
    else runCommand("fontSize", legacyFontSize(parseFloat(value) || 16));
    return;
  }

  const host = findAncestorWithInline(selectionRootElement(), prop);
  if (host) {
    host.style.setProperty(prop, value);
    selectNodeContents(host);
  } else {
    const frag = range.extractContents();
    const span = document.createElement("span");
    span.style.setProperty(prop, value);
    span.appendChild(frag);
    range.insertNode(span);
    pruneEmptyTextNodes(span);
    selectNodeContents(span);
  }
  afterEdit();
}

function setFormatActive(format: string, active: boolean): void {
  const btn = document.querySelector<HTMLElement>(`.format-btn[data-format="${format}"]`);
  if (btn) btn.classList.toggle("active", active);
}

function syncToolbarState(): void {
  if (toolbarSyncQueued) return;
  toolbarSyncQueued = true;
  window.requestAnimationFrame(() => {
    toolbarSyncQueued = false;
    const el = currentSelectionElement();
    if (!el) return;
    const style = getComputedStyle(el);
    const weight = parseInt(style.fontWeight, 10) || 400;
    const decoration = `${style.textDecorationLine || ""} ${style.textDecoration || ""}`;

    setFormatActive("bold", weight >= 600);
    setFormatActive("italic", style.fontStyle === "italic");
    setFormatActive("underline", decoration.includes("underline"));
    setFormatActive("strike", decoration.includes("line-through"));

    const fontSel = document.getElementById("docs-font-family") as HTMLSelectElement | null;
    if (fontSel) {
      const family = (style.fontFamily || "").toLowerCase();
      const match = FONT_FAMILIES.find((f) => family.includes(f.probe.toLowerCase()));
      fontSel.value = match ? match.value : "";
    }

    const sizeSel = document.getElementById("docs-font-size") as HTMLSelectElement | null;
    if (sizeSel) {
      const px = Math.round(parseFloat(style.fontSize) || 16);
      let closest = FONT_SIZES[0];
      FONT_SIZES.forEach((size) => {
        if (Math.abs(size - px) < Math.abs(closest - px)) closest = size;
      });
      sizeSel.value = String(closest);
    }

    const blockSel = document.getElementById("docs-block-style") as HTMLSelectElement | null;
    if (blockSel) {
      const block = el.closest("h1,h2,h3,blockquote,pre") as HTMLElement | null;
      blockSel.value = block ? block.tagName.toLowerCase() : "p";
    }
  });
}

function buildToolbarOptions(): void {
  const blockSel = document.getElementById("docs-block-style") as HTMLSelectElement | null;
  if (blockSel) {
    blockSel.innerHTML = "";
    const blocks: [string, string][] = [
      ["p", t.paragraph],
      ["h1", t.heading1],
      ["h2", t.heading2],
      ["h3", t.heading3],
      ["blockquote", t.quote],
      ["pre", t.codeBlock],
    ];
    blocks.forEach(([value, label]) => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = label;
      blockSel.appendChild(opt);
    });
  }

  const fontSel = document.getElementById("docs-font-family") as HTMLSelectElement | null;
  if (fontSel) {
    fontSel.innerHTML = "";
    const def = document.createElement("option");
    def.value = "";
    def.textContent = t.font;
    fontSel.appendChild(def);
    FONT_FAMILIES.forEach((font) => {
      const opt = document.createElement("option");
      opt.value = font.value;
      opt.textContent = font.label;
      fontSel.appendChild(opt);
    });
  }

  const sizeSel = document.getElementById("docs-font-size") as HTMLSelectElement | null;
  if (sizeSel) {
    sizeSel.innerHTML = "";
    const def = document.createElement("option");
    def.value = "";
    def.textContent = t.size;
    sizeSel.appendChild(def);
    FONT_SIZES.forEach((size) => {
      const opt = document.createElement("option");
      opt.value = String(size);
      opt.textContent = size + "px";
      sizeSel.appendChild(opt);
    });
  }
}

function sanitizeDocHtml(html: string): string {
  try {
    const template = document.createElement("template");
    template.innerHTML = html;
    template.content.querySelectorAll(UNSAFE_TAGS).forEach((el) => el.remove());
    template.content.querySelectorAll("*").forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        if (name.startsWith("on")) el.removeAttribute(attr.name);
        if ((name === "href" || name === "src") && /^\s*(javascript|vbscript):/i.test(attr.value)) {
          el.removeAttribute(attr.name);
        }
      });
    });
    return template.innerHTML;
  } catch {
    return "";
  }
}

function openLinkDialog(): void {
  const existing = document.getElementById("docs-link-modal");
  if (existing) existing.remove();

  restoreSelection();
  const sel = window.getSelection();
  const selectedText = sel ? sel.toString().trim() : "";
  const anchor = currentSelectionElement()?.closest("a") as HTMLAnchorElement | null;

  const modal = document.createElement("div");
  modal.id = "docs-link-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-card" style="max-width:400px;">
      <div class="modal-header">
        <span class="modal-title">${escapeHtml(t.linkDialogTitle)}</span>
        <button class="themes-close" aria-label="Close">&#10005;</button>
      </div>
      <div class="modal-body">
        <div class="modal-field">
          <label class="modal-field-label" for="docs-link-url">${escapeHtml(t.linkUrlLabel)}</label>
          <input type="text" id="docs-link-url" class="modal-input" placeholder="https://..." spellcheck="false" autocomplete="off" />
        </div>
        <div class="modal-field">
          <label class="modal-field-label" for="docs-link-text">${escapeHtml(t.linkTextLabel)}</label>
          <input type="text" id="docs-link-text" class="modal-input" value="${escapeHtmlAttr(selectedText)}" spellcheck="false" autocomplete="off" />
        </div>
      </div>
      <div class="modal-actions">
        ${anchor ? `<button id="docs-link-remove" class="modal-btn secondary">${escapeHtml(t.linkRemove)}</button>` : ""}
        <button id="docs-link-cancel" class="modal-btn secondary">${escapeHtml(t.cancel)}</button>
        <button id="docs-link-insert" class="modal-btn primary">${escapeHtml(t.insert)}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const urlInput = document.getElementById("docs-link-url") as HTMLInputElement | null;
  const textInput = document.getElementById("docs-link-text") as HTMLInputElement | null;
  const close = () => { modal.style.display = "none"; setTimeout(() => modal.remove(), 200); };

  const insert = () => {
    const raw = urlInput?.value.trim() ?? "";
    if (!raw) return;
    const url = /^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : `https://${raw}`;
    const text = textInput?.value.trim() || raw;

    restoreSelection();
    if (selectedText) {
      runCommand("createLink", url);
    } else {
      const active = window.getSelection();
      if (active && active.rangeCount > 0) {
        const range = active.getRangeAt(0);
        const frag = range.extractContents();
        const link = document.createElement("a");
        link.href = url;
        link.textContent = text;
        link.appendChild(frag);
        range.insertNode(link);
        pruneEmptyTextNodes(link);
        selectNodeContents(link);
        afterEdit();
      }
    }
    close();
  };

  modal.querySelector<HTMLElement>(".themes-close")?.addEventListener("click", close);
  document.getElementById("docs-link-cancel")?.addEventListener("click", close);
  document.getElementById("docs-link-insert")?.addEventListener("click", insert);
  document.getElementById("docs-link-remove")?.addEventListener("click", () => {
    restoreSelection();
    runCommand("unlink");
    close();
  });
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  urlInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); insert(); }
    else if (e.key === "Escape") close();
  });
  setTimeout(() => { urlInput?.focus(); }, 50);
}

function applyFormat(format: string): void {
  switch (format) {
    case "bold": toggleInlineTag("strong"); break;
    case "italic": toggleInlineTag("em"); break;
    case "underline": toggleInlineTag("u"); break;
    case "strike": toggleInlineTag("s"); break;
    case "align-left": runCommand("justifyLeft"); break;
    case "align-center": runCommand("justifyCenter"); break;
    case "align-right": runCommand("justifyRight"); break;
    case "align-justify": runCommand("justifyFull"); break;
    case "list": runCommand("insertUnorderedList"); break;
    case "ordered-list": runCommand("insertOrderedList"); break;
    case "divider": runCommand("insertHorizontalRule"); break;
    case "undo": runCommand("undo"); break;
    case "redo": runCommand("redo"); break;
    case "clear":
      runCommand("removeFormat");
      runCommand("unstyle");
      break;
    case "link": openLinkDialog(); break;
  }
}

function setupFormatControls(): void {
  const editor = docsEditorEl();

  document.querySelectorAll<HTMLElement>(".format-btn").forEach(btn => {
    btn.addEventListener("mousedown", (e) => {
      // keep the editor selection alive while the button is pressed
      e.preventDefault();
      saveSelection();
    });
    btn.addEventListener("click", () => {
      if (!activeDocId) return;
      const format = btn.getAttribute("data-format");
      if (!format) return;
      editor?.focus();
      applyFormat(format);
    });
  });

  const blockSel = document.getElementById("docs-block-style") as HTMLSelectElement | null;
  blockSel?.addEventListener("change", () => {
    if (!activeDocId) return;
    editor?.focus();
    runCommand("formatBlock", blockSel.value);
  });

  const fontSel = document.getElementById("docs-font-family") as HTMLSelectElement | null;
  fontSel?.addEventListener("change", () => {
    if (!activeDocId) return;
    editor?.focus();
    if (fontSel.value) applyInlineStyle("font-family", fontSel.value);
  });

  const sizeSel = document.getElementById("docs-font-size") as HTMLSelectElement | null;
  sizeSel?.addEventListener("change", () => {
    if (!activeDocId) return;
    editor?.focus();
    if (sizeSel.value) applyInlineStyle("font-size", sizeSel.value + "px");
  });

  const textColor = document.getElementById("docs-text-color") as HTMLInputElement | null;
  const textColorBar = document.getElementById("docs-text-color-bar");
  if (textColor) {
    textColor.addEventListener("pointerdown", () => saveSelection());
    textColor.addEventListener("input", () => {
      if (!activeDocId) return;
      if (textColorBar) textColorBar.style.background = textColor.value;
      applyInlineStyle("color", textColor.value);
    });
  }

  const highlight = document.getElementById("docs-highlight-color") as HTMLInputElement | null;
  const highlightBar = document.getElementById("docs-highlight-color-bar");
  if (highlight) {
    highlight.addEventListener("pointerdown", () => saveSelection());
    highlight.addEventListener("input", () => {
      if (!activeDocId) return;
      if (highlightBar) highlightBar.style.background = highlight.value;
      applyInlineStyle("background-color", highlight.value);
    });
  }

  document.addEventListener("selectionchange", () => {
    if (!currentSelectionElement()) return;
    saveSelection();
    syncToolbarState();
  });

  // keyboard shortcuts
  editor?.addEventListener("keydown", (e) => {
    if (!(e.metaKey || e.ctrlKey)) return;
    const key = e.key.toLowerCase();
    if (key === "b") { e.preventDefault(); applyFormat("bold"); }
    else if (key === "i") { e.preventDefault(); applyFormat("italic"); }
    else if (key === "u") { e.preventDefault(); applyFormat("underline"); }
    else if (key === "k") { e.preventDefault(); applyFormat("link"); }
    else if (e.shiftKey && key === "x") { e.preventDefault(); applyFormat("strike"); }
  });
}

function setupEditorEvents(): void {
  if (docsUIReady) return;
  const editor = docsEditorEl();
  const titleEl = document.getElementById("docs-doc-title") as HTMLElement | null;
  const backBtn = document.getElementById("docs-back-btn") as HTMLButtonElement | null;
  const newBtn = document.getElementById("docs-new-btn") as HTMLButtonElement | null;
  const searchInput = document.getElementById("docs-search") as HTMLInputElement | null;

  if (editor) {
    editor.addEventListener("input", () => {
      if (!activeDocId) return;
      updateWordCount();
      scheduleAutoSave();
    });
  }

  if (titleEl) {
    titleEl.addEventListener("click", () => {
      if (!activeDocId) return;
      titleEl.focus();
    });
    titleEl.addEventListener("blur", () => {
      if (activeDocId) doAutoSave();
    });
    titleEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        titleEl.blur();
      }
    });
  }

  if (newBtn) {
    newBtn.addEventListener("click", () => {
      openDocumentEditor();
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (activeDocId) doAutoSave();
      closeEditorReturnToList();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      docsQuery = searchInput.value;
      renderDocumentList();
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        docsQuery = "";
        renderDocumentList();
      }
    });
  }

  // Document list interactions (delegated)
  const listEl = docsListEl();
  if (listEl) {
    listEl.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const item = target.closest<HTMLElement>(".docs-item");
      if (!item) return;
      const id = item.getAttribute("data-doc-id");
      if (!id) return;

      const actionBtn = target.closest<HTMLElement>(".docs-item-btn");
      if (actionBtn) {
        e.stopPropagation();
        e.preventDefault();
        const action = actionBtn.getAttribute("data-action");
        if (action === "delete") openDeleteDialog(id);
        else if (action === "rename") openRenameDialog(id);
        return;
      }

      openDocumentEditor(id);
    });

    listEl.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const item = (e.target as HTMLElement).closest<HTMLElement>(".docs-item");
      const id = item?.getAttribute("data-doc-id");
      if (!id) return;
      e.preventDefault();
      openDocumentEditor(id);
    });
  }

  setupFormatControls();

  const exportBtn = document.getElementById("docs-export-menu-btn") as HTMLButtonElement | null;
  const exportMenu = document.getElementById("docs-export-menu") as HTMLElement | null;
  if (exportBtn && exportMenu) {
    exportBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      exportMenu.style.display = exportMenu.style.display === "none" ? "flex" : "none";
    });
    exportMenu.querySelectorAll<HTMLElement>(".export-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const fmt = item.getAttribute("data-format");
        if (fmt && activeDocId) exportDocument(fmt);
        exportMenu.style.display = "none";
      });
    });
  }
  document.addEventListener("click", () => {
    if (exportMenu) exportMenu.style.display = "none";
  });

  docsUIReady = true;
}

function openRenameDialog(id: string): void {
  const doc = documents.find((d) => d.id === id);
  if (!doc) return;
  const existing = document.getElementById("docs-rename-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "docs-rename-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <span class="modal-title">${escapeHtml(t.rename)}</span>
        <button class="themes-close" aria-label="Close">&#10005;</button>
      </div>
      <div class="modal-body">
        <div class="modal-field">
          <label class="modal-field-label" for="docs-rename-input">${escapeHtml(t.untitledDocument)}</label>
          <input type="text" id="docs-rename-input" class="modal-input" value="${escapeHtmlAttr(doc.title)}" spellcheck="false" autocomplete="off" />
        </div>
      </div>
      <div class="modal-actions">
        <button id="docs-rename-cancel" class="modal-btn secondary">${escapeHtml(t.cancel)}</button>
        <button id="docs-rename-save" class="modal-btn primary">${escapeHtml(t.confirm)}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const input = document.getElementById("docs-rename-input") as HTMLInputElement | null;
  const close = () => { modal.style.display = "none"; setTimeout(() => modal.remove(), 200); };
  const save = () => {
    const val = input?.value.trim();
    if (!val) return;
    renameDocument(id, val);
    close();
  };

  modal.querySelector<HTMLElement>(".themes-close")?.addEventListener("click", close);
  document.getElementById("docs-rename-cancel")?.addEventListener("click", close);
  document.getElementById("docs-rename-save")?.addEventListener("click", save);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); save(); }
    else if (e.key === "Escape") close();
  });
  setTimeout(() => { input?.focus(); input?.select(); }, 50);
}

function openDeleteDialog(id: string): void {
  const doc = documents.find((d) => d.id === id);
  if (!doc) return;
  const existing = document.getElementById("docs-delete-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "docs-delete-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-card" style="max-width:380px;">
      <div class="modal-header">
        <span class="modal-title">${escapeHtml(t.delete)}</span>
        <button class="themes-close" aria-label="Close">&#10005;</button>
      </div>
      <div class="modal-body">
        <div class="modal-field">
          <p style="color:var(--text-secondary);margin:0;">${escapeHtml(t.deleteConfirm)}</p>
          <p style="font-size:13px;color:var(--text);margin-top:6px;font-weight:600;">“${escapeHtml(doc.title)}”</p>
        </div>
      </div>
      <div class="modal-actions">
        <button id="docs-delete-cancel" class="modal-btn secondary">${escapeHtml(t.cancel)}</button>
        <button id="docs-delete-save" class="modal-btn primary">${escapeHtml(t.delete)}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => { modal.style.display = "none"; setTimeout(() => modal.remove(), 200); };
  const del = () => { deleteDocument(id); close(); };

  modal.querySelector<HTMLElement>(".themes-close")?.addEventListener("click", close);
  document.getElementById("docs-delete-cancel")?.addEventListener("click", close);
  document.getElementById("docs-delete-save")?.addEventListener("click", del);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
}

function htmlToMarkdown(text: string): string {
  const div = document.createElement("div");
  div.innerHTML = text;
  let out = div.textContent || "";
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim();
}

function exportDocument(format: string): void {
  if (!activeDocId) return;
  const doc = documents.find((d) => d.id === activeDocId);
  if (!doc) return;

  const editor = docsEditorEl();
  const content = editor ? editor.innerHTML : doc.content;

  const fileName = (doc.title || t.untitledDocument).replace(/[^a-z0-9\-_ ]/gi, "_").trim() || "document";

  if (format === "pdf") {
    openPrintView(doc.title, content);
    return;
  }

  let blob: Blob;
  let ext: string;

  if (format === "txt") {
    const text = htmlToMarkdown(content);
    blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    ext = "txt";
  } else if (format === "html") {
    blob = new Blob([content], { type: "text/html;charset=utf-8" });
    ext = "html";
  } else if (format === "md") {
    const text = htmlToMarkdown(content);
    blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    ext = "md";
  } else {
    return;
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function openPrintView(title: string, content: string): void {
  const existing = document.getElementById("docs-print-view");
  if (existing) existing.remove();

  const winDiv = document.createElement("div");
  winDiv.id = "docs-print-view";
  winDiv.style.position = "fixed";
  winDiv.style.inset = "0";
  winDiv.style.zIndex = "1000";
  winDiv.style.background = "var(--bg)";
  winDiv.innerHTML = `
    <div style="padding:24px 32px;max-width:800px;margin:0 auto;min-height:100%;box-sizing:border-box;">
      <h1 style="font-size:24px;font-weight:700;color:var(--text);margin-bottom:12px;">${escapeHtml(title)}</h1>
      <div class="docs-print-content">${content}</div>
    </div>
    <button id="docs-print-close" style="position:fixed;top:20px;right:20px;z-index:1001;padding:8px 14px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text);cursor:pointer;">Close</button>
  `;
  document.body.appendChild(winDiv);

  const style = document.createElement("style");
  style.textContent = `
    .docs-print-content { font-size: 14px; line-height: 1.7; color: var(--text); }
    .docs-print-content p { margin: 8px 0; }
    .docs-print-content h1, .docs-print-content h2, .docs-print-content h3 { margin: 18px 0 8px; font-weight: 700; }
    .docs-print-content ul, .docs-print-content ol { margin: 8px 0 8px 22px; padding-left: 16px; }
    .docs-print-content li { margin: 4px 0; }
    .docs-print-content strong { font-weight: 700; }
    .docs-print-content em { font-style: italic; }
    .docs-print-content u { text-decoration: underline; }
  `;
  document.head.appendChild(style);

  const close = () => { winDiv.remove(); style.remove(); };
  winDiv.querySelector("#docs-print-close")?.addEventListener("click", close);
  winDiv.addEventListener("click", (e) => { if (e.target === winDiv) close(); });

  setTimeout(() => window.print(), 150);
}

function initDocumentsUI(): void {
  setupEditorEvents();
  const open = activeDocId ? documents.find((d) => d.id === activeDocId) : null;
  if (open) {
    openDocumentEditor(open.id, false);
  } else {
    closeEditorReturnToList();
  }
}

function applyDocumentsLocale(): void {
  buildToolbarOptions();
  setText("#docs-app-title", t.documents);
  setText("#docs-new-btn-label", t.newDocument.replace("+ ", ""));
  setText("#docs-export-btn-label", t.export);
  (document.getElementById("docs-search") as HTMLInputElement | null)
    ?.setAttribute("placeholder", t.searchDocuments);
  const titleEl = document.getElementById("docs-doc-title") as HTMLElement | null;
  if (titleEl) titleEl.setAttribute("data-placeholder", t.untitledDocument);
  docsEditorEl()?.setAttribute("data-placeholder", t.startWriting);

  renderDocumentList();
  updateWordCount();
}

// ---- Sheets App ----
type SheetNumberFormat = "general" | "number" | "thousands" | "percent" | "currency" | "scientific";
type SheetAlign = "left" | "center" | "right";

interface SheetCell {
  v?: string;
  b?: boolean;
  i?: boolean;
  u?: boolean;
  tc?: string;
  bg?: string;
  al?: SheetAlign;
  nf?: SheetNumberFormat;
}

interface SheetTab {
  id: string;
  name: string;
  rows: number;
  cols: number;
  cells: Record<string, SheetCell | undefined>;
  widths: Record<string, number>;
}

interface Spreadsheet {
  id: string;
  title: string;
  tabs: SheetTab[];
  activeTabId: string;
  updatedAt: number;
  createdAt: number;
}

interface SheetSelection {
  r1: number;
  c1: number;
  r2: number;
  c2: number;
}

const SHEETS_STORAGE_KEY = "alma:sheets";
const SHEET_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M4 10h16M10 4v16"></path></svg>`;
const DEFAULT_SHEET_ROWS = 50;
const DEFAULT_SHEET_COLS = 26;
const DEFAULT_COL_WIDTH = 104;
const ROW_HEADER_WIDTH = 46;
const MAX_SHEET_ROWS = 500;
const MAX_SHEET_COLS = 52;
const SHEET_NUMBER_FORMATS: SheetNumberFormat[] = ["general", "number", "thousands", "percent", "currency", "scientific"];

let spreadsheets: Spreadsheet[] = [];
let activeSheetId: string | null = null;
let sheetsOpenId: string | null = null;
let sheetsUIReady = false;
let sheetsQuery = "";
let sheetSelection: SheetSelection | null = null;
let sheetEditing: { r: number; c: number } | null = null;
let sheetAutoSaveTimer: number | null = null;
let sheetUndoStack: Spreadsheet[] = [];
let sheetRedoStack: Spreadsheet[] = [];
let sheetCellEls = new Map<string, HTMLElement>();
let sheetSelectedEls: HTMLElement[] = [];
let sheetClipboard: string[][] | null = null;

// ---- Sheets storage ----
function getSpreadsheets(): Spreadsheet[] {
  try {
    const raw = localStorage.getItem(SHEETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((entry) => normalizeSpreadsheet(entry))
      .filter((entry): entry is Spreadsheet => entry !== null);
  } catch {
    return [];
  }
}

function saveSpreadsheets(list: Spreadsheet[]): void {
  try {
    localStorage.setItem(SHEETS_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function normalizeSpreadsheet(entry: unknown): Spreadsheet | null {
  if (!entry || typeof entry !== "object") return null;
  const raw = entry as Record<string, unknown>;
  if (!raw.id) return null;

  const tabs: SheetTab[] = (Array.isArray(raw.tabs) ? raw.tabs : [])
    .filter((tab): tab is Record<string, unknown> => !!tab && typeof tab === "object" && !!(tab as Record<string, unknown>).id)
    .map((tab) => ({
      id: String(tab.id),
      name: typeof tab.name === "string" && tab.name ? tab.name : `${t.sheetTab} 1`,
      rows: Math.max(1, Math.min(MAX_SHEET_ROWS, Number(tab.rows) || DEFAULT_SHEET_ROWS)),
      cols: Math.max(1, Math.min(MAX_SHEET_COLS, Number(tab.cols) || DEFAULT_SHEET_COLS)),
      cells: (tab.cells && typeof tab.cells === "object" ? tab.cells : {}) as Record<string, SheetCell | undefined>,
      widths: (tab.widths && typeof tab.widths === "object" ? tab.widths : {}) as Record<string, number>,
    }));

  if (!tabs.length) tabs.push(createSheetTab(`${t.sheetTab} 1`));

  const activeTabId = typeof raw.activeTabId === "string" && tabs.some((tab) => tab.id === raw.activeTabId)
    ? raw.activeTabId
    : tabs[0].id;

  return {
    id: String(raw.id),
    title: typeof raw.title === "string" && raw.title ? raw.title : t.untitledSpreadsheet,
    tabs,
    activeTabId,
    updatedAt: Number(raw.updatedAt) || Date.now(),
    createdAt: Number(raw.createdAt) || Date.now(),
  };
}

// ---- Sheets helpers ----
function sheetsViewEl(): HTMLElement | null {
  return document.getElementById("sheets-view") as HTMLElement | null;
}

function sheetsGridWrapEl(): HTMLElement | null {
  return document.getElementById("sheets-grid-wrap") as HTMLElement | null;
}

function sheetCellKey(r: number, c: number): string {
  return `${r},${c}`;
}

function sheetColName(c: number): string {
  let n = c;
  let out = "";
  do {
    out = String.fromCharCode(65 + (n % 26)) + out;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return out;
}

function sheetColIndex(letters: string): number {
  let n = 0;
  for (const ch of letters.toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

function activeSpreadsheet(): Spreadsheet | null {
  if (!activeSheetId) return null;
  return spreadsheets.find((ss) => ss.id === activeSheetId) ?? null;
}

function activeTab(): SheetTab | null {
  const ss = activeSpreadsheet();
  if (!ss) return null;
  return ss.tabs.find((tab) => tab.id === ss.activeTabId) ?? ss.tabs[0] ?? null;
}

function findSheetTab(tabId: string): SheetTab | null {
  const ss = activeSpreadsheet();
  if (!ss) return null;
  return ss.tabs.find((tab) => tab.id === tabId) ?? null;
}

function resolveSheetTabId(name: string): string | null {
  const ss = activeSpreadsheet();
  if (!ss) return null;
  const wanted = name.trim().toLowerCase();
  const tab = ss.tabs.find((x) => x.name.trim().toLowerCase() === wanted);
  return tab ? tab.id : null;
}

function nextSheetTabName(): string {
  const ss = activeSpreadsheet();
  const base = t.sheetTab;
  if (!ss) return `${base} 1`;
  const taken = new Set(ss.tabs.map((x) => x.name.trim().toLowerCase()));
  let i = ss.tabs.length + 1;
  let candidate = `${base} ${i}`;
  while (taken.has(candidate.toLowerCase())) {
    i++;
    candidate = `${base} ${i}`;
  }
  return candidate;
}

function createSheetTab(name?: string): SheetTab {
  return {
    id: "tab_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
    name: name ?? nextSheetTabName(),
    rows: DEFAULT_SHEET_ROWS,
    cols: DEFAULT_SHEET_COLS,
    cells: {},
    widths: {},
  };
}

function createSpreadsheet(): Spreadsheet {
  const now = Date.now();
  const tab = createSheetTab(`${t.sheetTab} 1`);
  const ss: Spreadsheet = {
    id: "sheet_" + now + "_" + Math.random().toString(36).slice(2, 7),
    title: t.untitledSpreadsheet,
    tabs: [tab],
    activeTabId: tab.id,
    updatedAt: now,
    createdAt: now,
  };
  spreadsheets.unshift(ss);
  saveSpreadsheets(spreadsheets);
  return ss;
}

function deleteSpreadsheet(id: string): void {
  spreadsheets = spreadsheets.filter((ss) => ss.id !== id);
  saveSpreadsheets(spreadsheets);
  if (activeSheetId === id) closeSheetEditorReturnToList();
  renderSheetList();
}

function renameSpreadsheet(id: string, title: string): void {
  const ss = spreadsheets.find((x) => x.id === id);
  if (!ss || !title.trim()) return;
  ss.title = title.trim();
  ss.updatedAt = Date.now();
  saveSpreadsheets(spreadsheets);
  renderSheetList();
  const titleEl = document.getElementById("sheets-doc-title") as HTMLElement | null;
  if (titleEl && activeSheetId === id) titleEl.textContent = ss.title;
}

// ---- Sheets list page ----
function renderSheetList(): void {
  const listEl = document.getElementById("sheets-list");
  const countEl = document.getElementById("sheets-list-count");
  if (!listEl || !countEl) return;

  const sorted = [...spreadsheets].sort((a, b) => b.updatedAt - a.updatedAt);
  const total = sorted.length;
  countEl.textContent = total === 1 ? t.oneSpreadsheet : `${total} ${t.manySpreadsheets}`;

  const query = sheetsQuery.trim().toLowerCase();
  const visible = query ? sorted.filter((ss) => ss.title.toLowerCase().includes(query)) : sorted;

  if (visible.length === 0) {
    const noMatch = total > 0;
    listEl.innerHTML = `
      <div class="docs-list-empty">
        <div class="docs-empty-icon">${noMatch ? SEARCH_ICON_SVG : SHEET_ICON_SVG}</div>
        <p class="docs-empty-title">${escapeHtml(noMatch ? t.noMatchingSpreadsheets : t.emptySheetsTitle)}</p>
        <p class="docs-empty-sub">${escapeHtml(noMatch ? t.noResultsHint : t.emptySheetsText)}</p>
      </div>`;
    return;
  }

  listEl.innerHTML = visible.map((ss) => `
    <div class="docs-item${ss.id === activeSheetId ? " active" : ""}" data-sheet-id="${ss.id}" role="listitem" tabindex="0">
      <div class="docs-item-icon">${SHEET_ICON_SVG}</div>
      <div class="docs-item-body">
        <div class="docs-item-title">${escapeHtml(ss.title)}</div>
        <div class="docs-item-meta">${escapeHtml(formatDocDate(ss.updatedAt))}</div>
      </div>
      <div class="docs-item-actions">
        <button class="docs-item-btn" data-action="rename" title="${escapeHtmlAttr(t.rename)}" aria-label="${escapeHtmlAttr(t.rename)}">${RENAME_ICON_SVG}</button>
        <button class="docs-item-btn danger" data-action="delete" title="${escapeHtmlAttr(t.delete)}" aria-label="${escapeHtmlAttr(t.delete)}">${DELETE_ICON_SVG}</button>
      </div>
    </div>
  `).join("");
}

// ---- Sheets editor lifecycle ----
function openSheetEditor(id?: string): void {
  let ss: Spreadsheet | null = null;
  if (id) ss = spreadsheets.find((x) => x.id === id) ?? null;
  if (!ss) ss = createSpreadsheet();

  activeSheetId = ss.id;
  sheetsOpenId = ss.id;
  sheetUndoStack = [];
  sheetRedoStack = [];
  sheetSelection = { r1: 0, c1: 0, r2: 0, c2: 0 };

  sheetsViewEl()?.classList.add("is-editing");

  const titleEl = document.getElementById("sheets-doc-title") as HTMLElement | null;
  if (titleEl) {
    titleEl.textContent = ss.title;
    titleEl.setAttribute("data-placeholder", t.untitledSpreadsheet);
  }

  renderSheetTabs();
  renderSheetGrid();
  applySheetSelectionClasses();
  updateSheetFormulaBar();
  updateSheetStats();
  syncSheetToolbarState();
  updateSheetStatus("saved");
  renderSheetList();

  setTimeout(() => sheetsGridWrapEl()?.focus({ preventScroll: true }), 0);
}

function closeSheetEditorReturnToList(): void {
  commitSheetCellEdit();
  if (activeSheetId) doSheetAutoSave();
  activeSheetId = null;
  sheetsOpenId = null;
  sheetSelection = null;
  sheetEditing = null;
  sheetsViewEl()?.classList.remove("is-editing");
  renderSheetList();
}

// ---- Sheets formula engine ----
type SheetScalar = number | string | boolean | null;

interface SheetRangeRef {
  kind: "range";
  tabId: string;
  r1: number;
  c1: number;
  r2: number;
  c2: number;
}

type SheetOperand = SheetScalar | SheetRangeRef;

type SheetTokenType = "number" | "string" | "sheet" | "ident" | "op" | "lparen" | "rparen" | "comma" | "eof";

interface SheetToken {
  type: SheetTokenType;
  value: string;
}

interface SheetEvalState {
  stack: Set<string>;
  depth: number;
}

interface SheetParseCtx {
  tokens: SheetToken[];
  pos: number;
  state: SheetEvalState;
  tabId: string;
}

class SheetFormulaError extends Error {
  constructor(readonly code: string) {
    super(code);
    this.name = "SheetFormulaError";
  }
}

function isSheetRange(value: SheetOperand): value is SheetRangeRef {
  return typeof value === "object" && value !== null && (value as SheetRangeRef).kind === "range";
}

function parseSheetNumberLiteral(text: string): number | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  if (!/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(trimmed)) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

function formatGeneralNumber(n: number): string {
  if (!Number.isFinite(n)) return Number.isNaN(n) ? "#ERROR!" : String(n);
  if (Number.isInteger(n)) return String(n);
  return String(Math.round(n * 1e10) / 1e10);
}

function formatSheetNumber(n: number, nf?: SheetNumberFormat): string {
  switch (nf) {
    case "number":
      return n.toFixed(2);
    case "thousands":
      return n.toLocaleString(currentLang, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    case "percent":
      return `${(n * 100).toFixed(1)}%`;
    case "currency":
      try {
        return n.toLocaleString(currentLang, { style: "currency", currency: "USD" });
      } catch {
        return `$${n.toFixed(2)}`;
      }
    case "scientific":
      return n.toExponential(2);
    default:
      return formatGeneralNumber(n);
  }
}

function sheetDisplayValue(value: SheetScalar, nf?: SheetNumberFormat): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  if (typeof value === "number") return formatSheetNumber(value, nf);
  return value;
}

function sheetTokenize(src: string): SheetToken[] {
  const tokens: SheetToken[] = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(src[i + 1] ?? ""))) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      if (src[j] === "e" || src[j] === "E") {
        let k = j + 1;
        if (src[k] === "+" || src[k] === "-") k++;
        if (/[0-9]/.test(src[k] ?? "")) {
          j = k;
          while (j < src.length && /[0-9]/.test(src[j])) j++;
        }
      }
      tokens.push({ type: "number", value: src.slice(i, j) });
      i = j;
      continue;
    }
    if (ch === '"') {
      let j = i + 1;
      let out = "";
      while (j < src.length) {
        if (src[j] === '"') {
          if (src[j + 1] === '"') { out += '"'; j += 2; continue; }
          break;
        }
        out += src[j];
        j++;
      }
      tokens.push({ type: "string", value: out });
      i = j + 1;
      continue;
    }
    if (ch === "'") {
      let j = i + 1;
      let out = "";
      while (j < src.length && src[j] !== "'") { out += src[j]; j++; }
      tokens.push({ type: "sheet", value: out });
      i = j + 1;
      continue;
    }
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i;
      while (j < src.length && /[A-Za-z0-9_$.]/.test(src[j])) j++;
      tokens.push({ type: "ident", value: src.slice(i, j) });
      i = j;
      continue;
    }
    if (ch === "(") { tokens.push({ type: "lparen", value: ch }); i++; continue; }
    if (ch === ")") { tokens.push({ type: "rparen", value: ch }); i++; continue; }
    if (ch === "," || ch === ";") { tokens.push({ type: "comma", value: ch }); i++; continue; }
    const two = src.slice(i, i + 2);
    if (two === "<=" || two === ">=" || two === "<>") {
      tokens.push({ type: "op", value: two });
      i += 2;
      continue;
    }
    if ("+-*/^&=<>%!:".includes(ch)) {
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }
    throw new SheetFormulaError("#ERROR!");
  }
  tokens.push({ type: "eof", value: "" });
  return tokens;
}

function sheetPeek(ctx: SheetParseCtx): SheetToken {
  return ctx.tokens[ctx.pos] ?? { type: "eof", value: "" };
}

function sheetNext(ctx: SheetParseCtx): SheetToken {
  const tok = sheetPeek(ctx);
  if (tok.type !== "eof") ctx.pos++;
  return tok;
}

function sheetExpect(ctx: SheetParseCtx, type: SheetTokenType): SheetToken {
  const tok = sheetNext(ctx);
  if (tok.type !== type) throw new SheetFormulaError("#ERROR!");
  return tok;
}

function sheetToNumber(value: SheetOperand): number {
  if (isSheetRange(value)) throw new SheetFormulaError("#VALUE!");
  if (value === null || value === "") return 0;
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  const n = parseSheetNumberLiteral(value);
  if (n === null) throw new SheetFormulaError("#VALUE!");
  return n;
}

function sheetToText(value: SheetOperand): string {
  if (isSheetRange(value)) throw new SheetFormulaError("#VALUE!");
  if (value === null) return "";
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  if (typeof value === "number") return formatGeneralNumber(value);
  return value;
}

function sheetToBoolean(value: SheetOperand): boolean {
  if (isSheetRange(value)) throw new SheetFormulaError("#VALUE!");
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (value === null || value === "") return false;
  const up = value.trim().toUpperCase();
  if (up === "TRUE") return true;
  if (up === "FALSE") return false;
  const n = parseSheetNumberLiteral(value);
  if (n !== null) return n !== 0;
  throw new SheetFormulaError("#VALUE!");
}

function sheetParseAddress(text: string): { r: number; c: number } | null {
  const m = /^([A-Za-z]{1,3})([0-9]{1,7})$/.exec(text.replace(/\$/g, ""));
  if (!m) return null;
  const c = sheetColIndex(m[1]);
  const r = parseInt(m[2], 10) - 1;
  if (r < 0 || c < 0) return null;
  return { r, c };
}

function sheetEvalCellRef(ctx: SheetParseCtx, tabId: string, r: number, c: number): SheetScalar {
  const key = `${tabId}!${r},${c}`;
  if (ctx.state.stack.has(key)) throw new SheetFormulaError("#CIRC!");
  if (ctx.state.depth > 50) throw new SheetFormulaError("#ERROR!");
  const tab = findSheetTab(tabId);
  if (!tab) throw new SheetFormulaError("#REF!");
  const cell = tab.cells[sheetCellKey(r, c)];
  if (!cell || !cell.v) return null;
  if (cell.v.startsWith("=")) {
    ctx.state.stack.add(key);
    ctx.state.depth++;
    try {
      const result = evaluateSheetFormula(cell.v.slice(1), tabId, ctx.state);
      if (isSheetRange(result)) throw new SheetFormulaError("#VALUE!");
      return result;
    } finally {
      ctx.state.stack.delete(key);
      ctx.state.depth--;
    }
  }
  return sheetLiteralValue(cell.v);
}

function sheetLiteralValue(raw: string): SheetScalar {
  const n = parseSheetNumberLiteral(raw);
  if (n !== null) return n;
  const up = raw.trim().toUpperCase();
  if (up === "TRUE") return true;
  if (up === "FALSE") return false;
  return raw;
}

function sheetCollectNumbers(ctx: SheetParseCtx, args: SheetOperand[]): number[] {
  const out: number[] = [];
  for (const arg of args) {
    if (isSheetRange(arg)) {
      for (let r = arg.r1; r <= arg.r2; r++) {
        for (let c = arg.c1; c <= arg.c2; c++) {
          const v = sheetEvalCellRef(ctx, arg.tabId, r, c);
          if (typeof v === "number") out.push(v);
          else if (typeof v === "string") {
            const n = parseSheetNumberLiteral(v);
            if (n !== null) out.push(n);
          }
        }
      }
      continue;
    }
    if (typeof arg === "number") out.push(arg);
    else if (typeof arg === "string") {
      const n = parseSheetNumberLiteral(arg);
      if (n !== null) out.push(n);
    }
  }
  return out;
}

function sheetCollectValues(ctx: SheetParseCtx, args: SheetOperand[]): SheetScalar[] {
  const out: SheetScalar[] = [];
  for (const arg of args) {
    if (isSheetRange(arg)) {
      for (let r = arg.r1; r <= arg.r2; r++) {
        for (let c = arg.c1; c <= arg.c2; c++) {
          out.push(sheetEvalCellRef(ctx, arg.tabId, r, c));
        }
      }
      continue;
    }
    out.push(arg);
  }
  return out;
}

function sheetApplyFunction(ctx: SheetParseCtx, name: string, args: SheetOperand[]): SheetOperand {
  switch (name) {
    case "SUM": {
      const nums = sheetCollectNumbers(ctx, args);
      return nums.reduce((acc, n) => acc + n, 0);
    }
    case "PRODUCT": {
      const nums = sheetCollectNumbers(ctx, args);
      return nums.length ? nums.reduce((acc, n) => acc * n, 1) : 0;
    }
    case "AVERAGE": {
      const nums = sheetCollectNumbers(ctx, args);
      if (!nums.length) throw new SheetFormulaError("#DIV/0!");
      return nums.reduce((acc, n) => acc + n, 0) / nums.length;
    }
    case "MIN": {
      const nums = sheetCollectNumbers(ctx, args);
      if (!nums.length) return 0;
      return Math.min(...nums);
    }
    case "MAX": {
      const nums = sheetCollectNumbers(ctx, args);
      if (!nums.length) return 0;
      return Math.max(...nums);
    }
    case "COUNT": {
      return sheetCollectNumbers(ctx, args).length;
    }
    case "COUNTA": {
      return sheetCollectValues(ctx, args).filter((v) => v !== null && v !== "").length;
    }
    case "MEDIAN": {
      const nums = sheetCollectNumbers(ctx, args).sort((a, b) => a - b);
      if (!nums.length) throw new SheetFormulaError("#NUM!");
      const mid = Math.floor(nums.length / 2);
      return nums.length % 2 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    }
    case "ROUND": {
      const value = sheetToNumber(args[0]);
      const digits = args.length > 1 ? Math.trunc(sheetToNumber(args[1])) : 0;
      const factor = Math.pow(10, digits);
      return Math.round(value * factor) / factor;
    }
    case "ROUNDUP": {
      const value = sheetToNumber(args[0]);
      const digits = args.length > 1 ? Math.trunc(sheetToNumber(args[1])) : 0;
      const factor = Math.pow(10, digits);
      return (value < 0 ? -Math.ceil(-value * factor) : Math.ceil(value * factor)) / factor;
    }
    case "ROUNDDOWN": {
      const value = sheetToNumber(args[0]);
      const digits = args.length > 1 ? Math.trunc(sheetToNumber(args[1])) : 0;
      const factor = Math.pow(10, digits);
      return (value < 0 ? -Math.floor(-value * factor) : Math.floor(value * factor)) / factor;
    }
    case "ABS":
      return Math.abs(sheetToNumber(args[0]));
    case "SQRT": {
      const value = sheetToNumber(args[0]);
      if (value < 0) throw new SheetFormulaError("#NUM!");
      return Math.sqrt(value);
    }
    case "POWER":
      return Math.pow(sheetToNumber(args[0]), sheetToNumber(args[1]));
    case "MOD": {
      const divisor = sheetToNumber(args[1]);
      if (divisor === 0) throw new SheetFormulaError("#DIV/0!");
      return sheetToNumber(args[0]) % divisor;
    }
    case "INT":
      return Math.floor(sheetToNumber(args[0]));
    case "SIGN":
      return Math.sign(sheetToNumber(args[0]));
    case "IF": {
      if (!args.length) throw new SheetFormulaError("#VALUE!");
      const condition = sheetToBoolean(args[0]);
      if (condition) return args.length > 1 ? args[1] : true;
      return args.length > 2 ? args[2] : false;
    }
    case "AND":
      return args.every((arg) => sheetToBoolean(arg));
    case "OR":
      return args.some((arg) => sheetToBoolean(arg));
    case "NOT":
      return !sheetToBoolean(args[0]);
    case "TRUE":
      return true;
    case "FALSE":
      return false;
    case "CONCATENATE":
      return args.map((arg) => sheetToText(arg)).join("");
    case "LEN":
      return sheetToText(args[0]).length;
    case "UPPER":
      return sheetToText(args[0]).toUpperCase();
    case "LOWER":
      return sheetToText(args[0]).toLowerCase();
    case "TRIM":
      return sheetToText(args[0]).trim().replace(/\s+/g, " ");
    case "TODAY": {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    }
    case "NOW":
      return new Date().toISOString();
    default:
      throw new SheetFormulaError("#NAME?");
  }
}

function sheetParseCompare(ctx: SheetParseCtx): SheetOperand {
  let left = sheetParseConcat(ctx);
  while (sheetPeek(ctx).type === "op" && ["=", "<>", "<", "<=", ">", ">="].includes(sheetPeek(ctx).value)) {
    const op = sheetNext(ctx).value;
    const right = sheetParseConcat(ctx);
    const a = sheetToNumber(left);
    const b = sheetToNumber(right);
    switch (op) {
      case "=": left = a === b; break;
      case "<>": left = a !== b; break;
      case "<": left = a < b; break;
      case "<=": left = a <= b; break;
      case ">": left = a > b; break;
      case ">=": left = a >= b; break;
    }
  }
  return left;
}

function sheetParseConcat(ctx: SheetParseCtx): SheetOperand {
  let left = sheetParseAdditive(ctx);
  while (sheetPeek(ctx).type === "op" && sheetPeek(ctx).value === "&") {
    sheetNext(ctx);
    const right = sheetParseAdditive(ctx);
    left = sheetToText(left) + sheetToText(right);
  }
  return left;
}

function sheetParseAdditive(ctx: SheetParseCtx): SheetOperand {
  let left = sheetParseMultiplicative(ctx);
  while (sheetPeek(ctx).type === "op" && (sheetPeek(ctx).value === "+" || sheetPeek(ctx).value === "-")) {
    const op = sheetNext(ctx).value;
    const right = sheetParseMultiplicative(ctx);
    const a = sheetToNumber(left);
    const b = sheetToNumber(right);
    left = op === "+" ? a + b : a - b;
  }
  return left;
}

function sheetParseMultiplicative(ctx: SheetParseCtx): SheetOperand {
  let left = sheetParseUnary(ctx);
  while (sheetPeek(ctx).type === "op" && (sheetPeek(ctx).value === "*" || sheetPeek(ctx).value === "/")) {
    const op = sheetNext(ctx).value;
    const right = sheetParseUnary(ctx);
    const a = sheetToNumber(left);
    const b = sheetToNumber(right);
    if (op === "/") {
      if (b === 0) throw new SheetFormulaError("#DIV/0!");
      left = a / b;
    } else {
      left = a * b;
    }
  }
  return left;
}

function sheetParseUnary(ctx: SheetParseCtx): SheetOperand {
  const tok = sheetPeek(ctx);
  if (tok.type === "op" && (tok.value === "-" || tok.value === "+")) {
    sheetNext(ctx);
    const value = sheetToNumber(sheetParseUnary(ctx));
    return tok.value === "-" ? -value : value;
  }
  return sheetParsePower(ctx);
}

function sheetParsePower(ctx: SheetParseCtx): SheetOperand {
  const base = sheetParsePrimary(ctx);
  if (sheetPeek(ctx).type === "op" && sheetPeek(ctx).value === "^") {
    sheetNext(ctx);
    const exponent = sheetToNumber(sheetParseUnary(ctx));
    return Math.pow(sheetToNumber(base), exponent);
  }
  return base;
}

function sheetParsePrimary(ctx: SheetParseCtx): SheetOperand {
  const tok = sheetNext(ctx);
  if (tok.type === "number") return Number(tok.value);
  if (tok.type === "string") return tok.value;
  if (tok.type === "lparen") {
    const value = sheetParseCompare(ctx);
    sheetExpect(ctx, "rparen");
    return value;
  }
  if (tok.type === "sheet") {
    const bang = sheetNext(ctx);
    if (bang.type !== "op" || bang.value !== "!") throw new SheetFormulaError("#REF!");
    const refTok = sheetNext(ctx);
    if (refTok.type !== "ident") throw new SheetFormulaError("#REF!");
    const tabId = resolveSheetTabId(tok.value);
    if (!tabId) throw new SheetFormulaError("#REF!");
    return sheetParseReference(ctx, tabId, refTok.value);
  }
  if (tok.type === "ident") {
    const upper = tok.value.toUpperCase();
    if (sheetPeek(ctx).type === "lparen") {
      sheetNext(ctx);
      const args: SheetOperand[] = [];
      if (sheetPeek(ctx).type !== "rparen") {
        for (;;) {
          args.push(sheetParseCompare(ctx));
          if (sheetPeek(ctx).type === "comma") { sheetNext(ctx); continue; }
          break;
        }
      }
      sheetExpect(ctx, "rparen");
      return sheetApplyFunction(ctx, upper, args);
    }
    if (upper === "TRUE") return true;
    if (upper === "FALSE") return false;
    if (sheetPeek(ctx).type === "op" && sheetPeek(ctx).value === "!") {
      sheetNext(ctx);
      const refTok = sheetNext(ctx);
      if (refTok.type !== "ident") throw new SheetFormulaError("#REF!");
      const qualifiedTabId = resolveSheetTabId(tok.value);
      if (!qualifiedTabId) throw new SheetFormulaError("#REF!");
      return sheetParseReference(ctx, qualifiedTabId, refTok.value);
    }
    return sheetParseReference(ctx, ctx.tabId, tok.value);
  }
  throw new SheetFormulaError("#ERROR!");
}

function sheetParseReference(ctx: SheetParseCtx, tabId: string, text: string): SheetOperand {
  const address = sheetParseAddress(text);
  if (!address) throw new SheetFormulaError("#NAME?");
  if (sheetPeek(ctx).type === "op" && sheetPeek(ctx).value === ":") {
    sheetNext(ctx);
    const endTok = sheetNext(ctx);
    if (endTok.type !== "ident") throw new SheetFormulaError("#REF!");
    const end = sheetParseAddress(endTok.value);
    if (!end) throw new SheetFormulaError("#REF!");
    return {
      kind: "range",
      tabId,
      r1: Math.min(address.r, end.r),
      c1: Math.min(address.c, end.c),
      r2: Math.max(address.r, end.r),
      c2: Math.max(address.c, end.c),
    };
  }
  return sheetEvalCellRef(ctx, tabId, address.r, address.c);
}

function evaluateSheetFormula(src: string, tabId: string, state: SheetEvalState): SheetOperand {
  const tokens = sheetTokenize(src);
  const ctx: SheetParseCtx = { tokens, pos: 0, state, tabId };
  const result = sheetParseCompare(ctx);
  if (sheetPeek(ctx).type !== "eof") throw new SheetFormulaError("#ERROR!");
  return result;
}

function computeSheetCellValue(tabId: string, r: number, c: number): SheetScalar {
  const tab = findSheetTab(tabId);
  if (!tab) return null;
  const cell = tab.cells[sheetCellKey(r, c)];
  if (!cell || !cell.v) return null;
  try {
    if (cell.v.startsWith("=")) {
      const state: SheetEvalState = { stack: new Set<string>(), depth: 0 };
      const result = evaluateSheetFormula(cell.v.slice(1), tabId, state);
      if (isSheetRange(result)) return "#VALUE!";
      return result;
    }
    return sheetLiteralValue(cell.v);
  } catch (err) {
    if (err instanceof SheetFormulaError) return err.code;
    return "#ERROR!";
  }
}

// ---- Sheets grid ----
function sheetCellEl(r: number, c: number): HTMLElement | null {
  return sheetCellEls.get(sheetCellKey(r, c)) ?? null;
}

function sheetNormalizedSelection(sel: SheetSelection): SheetSelection {
  return {
    r1: Math.min(sel.r1, sel.r2),
    c1: Math.min(sel.c1, sel.c2),
    r2: Math.max(sel.r1, sel.r2),
    c2: Math.max(sel.c1, sel.c2),
  };
}

function renderSheetGrid(): void {
  const head = document.getElementById("sheets-grid-head");
  const body = document.getElementById("sheets-grid-body");
  const table = document.getElementById("sheets-grid") as HTMLTableElement | null;
  const tab = activeTab();
  if (!head || !body || !table || !tab) return;

  let headHtml = '<th class="sheets-corner"></th>';
  let totalWidth = ROW_HEADER_WIDTH;
  for (let c = 0; c < tab.cols; c++) {
    const width = tab.widths[String(c)] ?? DEFAULT_COL_WIDTH;
    totalWidth += width;
    headHtml += `<th class="sheets-col-head" data-col="${c}" style="width:${width}px">${sheetColName(c)}</th>`;
  }
  head.innerHTML = headHtml;

  const rows: string[] = [];
  for (let r = 0; r < tab.rows; r++) {
    rows.push(`<tr><th class="sheets-row-head" data-row="${r}">${r + 1}</th>`);
    for (let c = 0; c < tab.cols; c++) {
      rows.push(`<td class="sheets-cell" data-r="${r}" data-c="${c}"></td>`);
    }
    rows.push("</tr>");
  }
  body.innerHTML = rows.join("");
  table.style.width = `${totalWidth}px`;

  sheetCellEls = new Map<string, HTMLElement>();
  body.querySelectorAll<HTMLElement>("td.sheets-cell").forEach((el) => {
    const r = parseInt(el.dataset.r ?? "0", 10);
    const c = parseInt(el.dataset.c ?? "0", 10);
    sheetCellEls.set(sheetCellKey(r, c), el);
  });

  refreshAllSheetCells();
  updateSheetStats();
}

function refreshAllSheetCells(): void {
  const tab = activeTab();
  if (!tab) return;
  for (let r = 0; r < tab.rows; r++) {
    for (let c = 0; c < tab.cols; c++) {
      refreshSheetCell(r, c);
    }
  }
}

function refreshSheetCell(r: number, c: number): void {
  const el = sheetCellEl(r, c);
  const tab = activeTab();
  if (!el || !tab) return;
  const cell = tab.cells[sheetCellKey(r, c)];
  const value = computeSheetCellValue(tab.id, r, c);

  let holder = el.querySelector<HTMLElement>(".sheets-cell-text");
  if (!holder) {
    el.textContent = "";
    holder = document.createElement("span");
    holder.className = "sheets-cell-text";
    el.appendChild(holder);
  }
  holder.textContent = sheetDisplayValue(value, cell?.nf);

  el.classList.toggle("is-formula", !!(cell?.v && cell.v.startsWith("=")));
  el.style.fontWeight = cell?.b ? "600" : "";
  el.style.fontStyle = cell?.i ? "italic" : "";
  el.style.textDecoration = cell?.u ? "underline" : "";
  el.style.color = cell?.tc ?? "";
  el.style.background = cell?.bg ?? "";
  const align: SheetAlign = cell?.al ?? (typeof value === "number" ? "right" : "left");
  el.style.textAlign = align;
}

function refreshSheetCells(cells: { r: number; c: number }[]): void {
  for (const { r, c } of cells) refreshSheetCell(r, c);
}

function recomputeSheetFormulas(): void {
  const tab = activeTab();
  if (!tab) return;
  for (const key of Object.keys(tab.cells)) {
    const cell = tab.cells[key];
    if (!cell?.v || !cell.v.startsWith("=")) continue;
    const [r, c] = key.split(",").map((n) => parseInt(n, 10));
    refreshSheetCell(r, c);
  }
  updateSheetStats();
}

// ---- Sheets selection ----
function applySheetSelectionClasses(): void {
  sheetSelectedEls.forEach((el) => el.classList.remove("in-range"));
  sheetSelectedEls = [];
  sheetCellEls.forEach((el) => el.classList.remove("active-cell"));

  const sel = sheetSelection;
  if (!sel) return;
  const norm = sheetNormalizedSelection(sel);
  for (let r = norm.r1; r <= norm.r2; r++) {
    for (let c = norm.c1; c <= norm.c2; c++) {
      const el = sheetCellEl(r, c);
      if (!el) continue;
      el.classList.add("in-range");
      sheetSelectedEls.push(el);
    }
  }
  const active = sheetCellEl(sel.r1, sel.c1);
  if (active) active.classList.add("active-cell");
}

function selectedSheetCells(): { r: number; c: number }[] {
  const out: { r: number; c: number }[] = [];
  const tab = activeTab();
  const sel = sheetSelection;
  if (!tab || !sel) return out;
  const norm = sheetNormalizedSelection(sel);
  for (let r = norm.r1; r <= norm.r2; r++) {
    for (let c = norm.c1; c <= norm.c2; c++) out.push({ r, c });
  }
  return out;
}

function setSheetSelection(r1: number, c1: number, r2: number, c2: number): void {
  sheetSelection = { r1, c1, r2, c2 };
  applySheetSelectionClasses();
  updateSheetFormulaBar();
  updateSheetStats();
  syncSheetToolbarState();
}

function moveSheetSelection(dr: number, dc: number, extend: boolean): void {
  const tab = activeTab();
  const sel = sheetSelection;
  if (!tab || !sel) return;
  const r = Math.max(0, Math.min(tab.rows - 1, sel.r2 + dr));
  const c = Math.max(0, Math.min(tab.cols - 1, sel.c2 + dc));
  if (extend) setSheetSelection(sel.r1, sel.c1, r, c);
  else setSheetSelection(r, c, r, c);
  scrollSheetSelectionIntoView();
}

function moveSheetSelectionTo(r: number, c: number, extend: boolean): void {
  const tab = activeTab();
  const sel = sheetSelection;
  if (!tab || !sel) return;
  const nr = Math.max(0, Math.min(tab.rows - 1, r));
  const nc = Math.max(0, Math.min(tab.cols - 1, c));
  if (extend) setSheetSelection(sel.r1, sel.c1, nr, nc);
  else setSheetSelection(nr, nc, nr, nc);
  scrollSheetSelectionIntoView();
}

function selectAllSheetCells(): void {
  const tab = activeTab();
  if (!tab) return;
  setSheetSelection(0, 0, tab.rows - 1, tab.cols - 1);
}

function scrollSheetSelectionIntoView(): void {
  const wrap = sheetsGridWrapEl();
  const sel = sheetSelection;
  if (!wrap || !sel) return;
  const el = sheetCellEl(sel.r2, sel.c2);
  if (!el) return;
  const er = el.getBoundingClientRect();
  const wr = wrap.getBoundingClientRect();
  if (er.top < wr.top) wrap.scrollTop -= wr.top - er.top;
  else if (er.bottom > wr.bottom) wrap.scrollTop += er.bottom - wr.bottom;
  if (er.left < wr.left) wrap.scrollLeft -= wr.left - er.left;
  else if (er.right > wr.right) wrap.scrollLeft += er.right - wr.right;
}

// ---- Sheets formula bar & stats ----
function updateSheetFormulaBar(): void {
  const refEl = document.getElementById("sheets-cell-ref");
  const input = document.getElementById("sheets-formula-input") as HTMLInputElement | null;
  const sel = sheetSelection;
  if (!sel) {
    if (refEl) refEl.textContent = "";
    if (input && document.activeElement !== input) input.value = "";
    return;
  }
  const norm = sheetNormalizedSelection(sel);
  const label = norm.r1 === norm.r2 && norm.c1 === norm.c2
    ? `${sheetColName(norm.c1)}${norm.r1 + 1}`
    : `${sheetColName(norm.c1)}${norm.r1 + 1}:${sheetColName(norm.c2)}${norm.r2 + 1}`;
  if (refEl) refEl.textContent = label;
  if (input && document.activeElement !== input) {
    const tab = activeTab();
    const cell = tab?.cells[sheetCellKey(sel.r1, sel.c1)];
    input.value = cell?.v ?? "";
  }
}

function commitSheetFormulaInput(): void {
  const input = document.getElementById("sheets-formula-input") as HTMLInputElement | null;
  const tab = activeTab();
  const sel = sheetSelection;
  if (!input || !tab || !sel) return;
  const value = input.value;
  const key = sheetCellKey(sel.r1, sel.c1);
  const cell = tab.cells[key];
  if ((cell?.v ?? "") === value) {
    updateSheetFormulaBar();
    return;
  }
  pushSheetUndo();
  if (value === "") {
    if (cell) {
      delete cell.v;
      if (Object.keys(cell).length === 0) delete tab.cells[key];
    }
  } else {
    tab.cells[key] = { ...(cell ?? {}), v: value };
  }
  sheetUpdated();
  refreshSheetCell(sel.r1, sel.c1);
  recomputeSheetFormulas();
  updateSheetFormulaBar();
  sheetsGridWrapEl()?.focus({ preventScroll: true });
}

function updateSheetStats(): void {
  const el = document.getElementById("sheets-stats");
  if (!el) return;
  el.textContent = "";
  const tab = activeTab();
  const sel = sheetSelection;
  if (!tab || !sel) return;

  const norm = sheetNormalizedSelection(sel);
  let sum = 0;
  let count = 0;
  let min = Infinity;
  let max = -Infinity;
  for (let r = norm.r1; r <= norm.r2; r++) {
    for (let c = norm.c1; c <= norm.c2; c++) {
      const value = computeSheetCellValue(tab.id, r, c);
      if (typeof value !== "number") continue;
      sum += value;
      count++;
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }
  if (!count) return;

  const add = (label: string, value: string) => {
    const span = document.createElement("span");
    const labelEl = document.createElement("span");
    labelEl.className = "sheets-stat-label";
    labelEl.textContent = `${label} `;
    span.appendChild(labelEl);
    span.appendChild(document.createTextNode(value));
    el.appendChild(span);
  };
  const round = (n: number) => formatGeneralNumber(Math.round(n * 1e10) / 1e10);
  add(t.sum, round(sum));
  add(t.average, round(sum / count));
  add(t.count, String(count));
  add(t.min, round(min));
  add(t.max, round(max));
}

// ---- Sheets cell editing ----
function beginSheetCellEdit(r: number, c: number, initial?: string): void {
  if (sheetEditing) commitSheetCellEdit();
  const el = sheetCellEl(r, c);
  const tab = activeTab();
  if (!el || !tab) return;

  const cell = tab.cells[sheetCellKey(r, c)];
  const raw = initial !== undefined ? initial : (cell?.v ?? "");
  sheetEditing = { r, c };

  el.textContent = "";
  const input = document.createElement("input");
  input.className = "sheets-cell-input";
  input.type = "text";
  input.value = raw;
  input.spellcheck = false;
  input.setAttribute("aria-label", `${sheetColName(c)}${r + 1}`);
  el.appendChild(input);
  input.focus();
  const caret = initial !== undefined ? initial.length : raw.length;
  try {
    input.setSelectionRange(caret, caret);
  } catch {
    // ignore
  }

  input.addEventListener("keydown", onSheetCellInputKeydown);
  input.addEventListener("blur", () => {
    if (sheetEditing && sheetEditing.r === r && sheetEditing.c === c) commitSheetCellEdit();
  });
}

function onSheetCellInputKeydown(e: KeyboardEvent): void {
  if (e.key === "Enter") {
    e.preventDefault();
    commitSheetCellEdit();
    moveSheetSelection(1, 0, false);
  } else if (e.key === "Tab") {
    e.preventDefault();
    commitSheetCellEdit();
    moveSheetSelection(0, e.shiftKey ? -1 : 1, false);
  } else if (e.key === "Escape") {
    e.preventDefault();
    cancelSheetCellEdit();
  }
}

function commitSheetCellEdit(): void {
  if (!sheetEditing) return;
  const { r, c } = sheetEditing;
  sheetEditing = null;

  const el = sheetCellEl(r, c);
  const input = el?.querySelector<HTMLInputElement>(".sheets-cell-input");
  const value = input ? input.value : "";
  const tab = activeTab();

  if (tab) {
    const key = sheetCellKey(r, c);
    const cell = tab.cells[key];
    if ((cell?.v ?? "") !== value) {
      pushSheetUndo();
      if (value === "") {
        if (cell) {
          delete cell.v;
          if (Object.keys(cell).length === 0) delete tab.cells[key];
        }
      } else {
        tab.cells[key] = { ...(cell ?? {}), v: value };
      }
      sheetUpdated();
    }
  }

  if (el) {
    el.textContent = "";
    const holder = document.createElement("span");
    holder.className = "sheets-cell-text";
    el.appendChild(holder);
  }
  refreshSheetCell(r, c);
  recomputeSheetFormulas();
  updateSheetFormulaBar();
}

function cancelSheetCellEdit(): void {
  if (!sheetEditing) return;
  const { r, c } = sheetEditing;
  sheetEditing = null;
  const el = sheetCellEl(r, c);
  if (el) {
    el.textContent = "";
    const holder = document.createElement("span");
    holder.className = "sheets-cell-text";
    el.appendChild(holder);
  }
  refreshSheetCell(r, c);
  updateSheetFormulaBar();
  sheetsGridWrapEl()?.focus({ preventScroll: true });
}

function clearSheetSelection(): void {
  const tab = activeTab();
  if (!tab) return;
  const cells = selectedSheetCells();
  if (!cells.length) return;
  let changed = false;
  for (const { r, c } of cells) {
    const key = sheetCellKey(r, c);
    const cell = tab.cells[key];
    if (!cell || cell.v === undefined) continue;
    changed = true;
    break;
  }
  if (!changed) return;

  pushSheetUndo();
  for (const { r, c } of cells) {
    const key = sheetCellKey(r, c);
    const cell = tab.cells[key];
    if (!cell) continue;
    delete cell.v;
    if (Object.keys(cell).length === 0) delete tab.cells[key];
  }
  sheetUpdated();
  refreshSheetCells(cells);
  recomputeSheetFormulas();
  updateSheetFormulaBar();
}

// ---- Sheets formatting ----
function toggleSheetFormat(kind: "bold" | "italic" | "underline"): void {
  const tab = activeTab();
  if (!tab) return;
  const cells = selectedSheetCells();
  if (!cells.length) return;
  const first = tab.cells[sheetCellKey(cells[0].r, cells[0].c)];
  const next = kind === "bold" ? !first?.b : kind === "italic" ? !first?.i : !first?.u;

  pushSheetUndo();
  for (const { r, c } of cells) {
    const key = sheetCellKey(r, c);
    const cell = { ...(tab.cells[key] ?? {}) };
    if (kind === "bold") cell.b = next || undefined;
    else if (kind === "italic") cell.i = next || undefined;
    else cell.u = next || undefined;
    tab.cells[key] = cell;
  }
  sheetUpdated();
  refreshSheetCells(cells);
  syncSheetToolbarState();
}

function applySheetCellStyle(prop: "tc" | "bg" | "al", value?: string): void {
  const tab = activeTab();
  if (!tab) return;
  const cells = selectedSheetCells();
  if (!cells.length) return;

  pushSheetUndo();
  for (const { r, c } of cells) {
    const key = sheetCellKey(r, c);
    const cell = { ...(tab.cells[key] ?? {}) };
    const bag = cell as unknown as Record<string, unknown>;
    if (value === undefined) delete bag[prop];
    else bag[prop] = value;
    tab.cells[key] = cell;
  }
  sheetUpdated();
  refreshSheetCells(cells);
  syncSheetToolbarState();
}

function setSheetNumberFormat(nf: SheetNumberFormat): void {
  const tab = activeTab();
  if (!tab) return;
  const cells = selectedSheetCells();
  if (!cells.length) return;

  pushSheetUndo();
  for (const { r, c } of cells) {
    const key = sheetCellKey(r, c);
    const cell = { ...(tab.cells[key] ?? {}) };
    if (nf === "general") delete cell.nf;
    else cell.nf = nf;
    tab.cells[key] = cell;
  }
  sheetUpdated();
  refreshSheetCells(cells);
}

function sheetFormatLabel(nf: SheetNumberFormat): string {
  switch (nf) {
    case "number": return t.fmtNumber;
    case "thousands": return t.fmtThousands;
    case "percent": return t.fmtPercent;
    case "currency": return t.fmtCurrency;
    case "scientific": return t.fmtScientific;
    default: return t.fmtGeneral;
  }
}

function buildSheetNumberFormatOptions(): void {
  const sel = document.getElementById("sheets-number-format") as HTMLSelectElement | null;
  if (!sel) return;
  sel.innerHTML = "";
  SHEET_NUMBER_FORMATS.forEach((nf) => {
    const opt = document.createElement("option");
    opt.value = nf;
    opt.textContent = sheetFormatLabel(nf);
    sel.appendChild(opt);
  });
  sel.value = "general";
}

function setSheetActionActive(action: string, active: boolean): void {
  const btn = document.querySelector<HTMLElement>(`.format-btn[data-sheet-action="${action}"]`);
  if (btn) btn.classList.toggle("active", active);
}

function syncSheetToolbarState(): void {
  const tab = activeTab();
  const sel = sheetSelection;
  const cell = tab && sel ? tab.cells[sheetCellKey(sel.r1, sel.c1)] : undefined;

  setSheetActionActive("bold", !!cell?.b);
  setSheetActionActive("italic", !!cell?.i);
  setSheetActionActive("underline", !!cell?.u);
  setSheetActionActive("align-left", cell?.al === "left");
  setSheetActionActive("align-center", cell?.al === "center");
  setSheetActionActive("align-right", cell?.al === "right");

  const fmtSel = document.getElementById("sheets-number-format") as HTMLSelectElement | null;
  if (fmtSel) fmtSel.value = cell?.nf ?? "general";
}

// ---- Sheets structure ----
function insertSheetRow(at: number): void {
  const tab = activeTab();
  if (!tab || tab.rows >= MAX_SHEET_ROWS) return;
  pushSheetUndo();
  const next: Record<string, SheetCell | undefined> = {};
  for (const key of Object.keys(tab.cells)) {
    const [r, c] = key.split(",").map((n) => parseInt(n, 10));
    next[sheetCellKey(r >= at ? r + 1 : r, c)] = tab.cells[key];
  }
  tab.cells = next;
  tab.rows += 1;
  sheetUpdated();
  renderSheetGrid();
  applySheetSelectionClasses();
}

function deleteSheetRow(at: number): void {
  const tab = activeTab();
  if (!tab || tab.rows <= 1) return;
  pushSheetUndo();
  const next: Record<string, SheetCell | undefined> = {};
  for (const key of Object.keys(tab.cells)) {
    const [r, c] = key.split(",").map((n) => parseInt(n, 10));
    if (r === at) continue;
    next[sheetCellKey(r > at ? r - 1 : r, c)] = tab.cells[key];
  }
  tab.cells = next;
  tab.rows -= 1;
  sheetUpdated();
  renderSheetGrid();
  applySheetSelectionClasses();
}

function insertSheetColumn(at: number): void {
  const tab = activeTab();
  if (!tab || tab.cols >= MAX_SHEET_COLS) return;
  pushSheetUndo();
  const next: Record<string, SheetCell | undefined> = {};
  for (const key of Object.keys(tab.cells)) {
    const [r, c] = key.split(",").map((n) => parseInt(n, 10));
    next[sheetCellKey(r, c >= at ? c + 1 : c)] = tab.cells[key];
  }
  tab.cells = next;
  tab.cols += 1;
  sheetUpdated();
  renderSheetGrid();
  applySheetSelectionClasses();
}

function deleteSheetColumn(at: number): void {
  const tab = activeTab();
  if (!tab || tab.cols <= 1) return;
  pushSheetUndo();
  const next: Record<string, SheetCell | undefined> = {};
  for (const key of Object.keys(tab.cells)) {
    const [r, c] = key.split(",").map((n) => parseInt(n, 10));
    if (c === at) continue;
    next[sheetCellKey(r, c > at ? c - 1 : c)] = tab.cells[key];
  }
  tab.cells = next;
  tab.cols -= 1;
  sheetUpdated();
  renderSheetGrid();
  applySheetSelectionClasses();
}

function setSheetColumnWidth(col: number, width: number): void {
  const tab = activeTab();
  if (!tab) return;
  tab.widths[String(col)] = width;
  const th = document.querySelector<HTMLElement>(`#sheets-grid-head th[data-col="${col}"]`);
  if (th) th.style.width = `${width}px`;
  const table = document.getElementById("sheets-grid") as HTMLTableElement | null;
  if (table) {
    let total = ROW_HEADER_WIDTH;
    for (let c = 0; c < tab.cols; c++) total += tab.widths[String(c)] ?? DEFAULT_COL_WIDTH;
    table.style.width = `${total}px`;
  }
}

// ---- Sheets tabs ----
function renderSheetTabs(): void {
  const el = document.getElementById("sheets-tabs");
  const ss = activeSpreadsheet();
  if (!el || !ss) return;
  el.innerHTML = ss.tabs.map((tab) => `
    <div class="sheets-tab${tab.id === ss.activeTabId ? " active" : ""}" data-tab-id="${tab.id}" role="tab" aria-selected="${tab.id === ss.activeTabId}" tabindex="0">
      <span class="sheets-tab-name">${escapeHtml(tab.name)}</span>
      <button class="sheets-tab-close" data-sheet-tab-action="delete" title="${escapeHtmlAttr(t.deleteSheet)}" aria-label="${escapeHtmlAttr(t.deleteSheet)}">&#10005;</button>
    </div>
  `).join("");
}

function addSheetTab(): void {
  const ss = activeSpreadsheet();
  if (!ss) return;
  pushSheetUndo();
  const tab = createSheetTab(nextSheetTabName());
  ss.tabs.push(tab);
  ss.activeTabId = tab.id;
  sheetSelection = { r1: 0, c1: 0, r2: 0, c2: 0 };
  sheetUpdated();
  renderSheetTabs();
  renderSheetGrid();
  applySheetSelectionClasses();
  updateSheetFormulaBar();
  updateSheetStats();
  syncSheetToolbarState();
}

function switchSheetTab(tabId: string): void {
  const ss = activeSpreadsheet();
  if (!ss || ss.activeTabId === tabId) return;
  ss.activeTabId = tabId;
  sheetSelection = { r1: 0, c1: 0, r2: 0, c2: 0 };
  renderSheetTabs();
  renderSheetGrid();
  applySheetSelectionClasses();
  updateSheetFormulaBar();
  updateSheetStats();
  syncSheetToolbarState();
  scheduleSheetAutoSave();
}

function renameSheetTab(tabId: string, name: string): void {
  const ss = activeSpreadsheet();
  if (!ss) return;
  const tab = ss.tabs.find((x) => x.id === tabId);
  if (!tab || !name.trim()) return;
  pushSheetUndo();
  tab.name = name.trim();
  sheetUpdated();
  renderSheetTabs();
}

function deleteSheetTab(tabId: string): void {
  const ss = activeSpreadsheet();
  if (!ss || ss.tabs.length <= 1) return;
  const idx = ss.tabs.findIndex((x) => x.id === tabId);
  if (idx === -1) return;
  pushSheetUndo();
  ss.tabs.splice(idx, 1);
  if (ss.activeTabId === tabId) {
    ss.activeTabId = ss.tabs[Math.min(idx, ss.tabs.length - 1)].id;
    sheetSelection = { r1: 0, c1: 0, r2: 0, c2: 0 };
  }
  sheetUpdated();
  renderSheetTabs();
  renderSheetGrid();
  applySheetSelectionClasses();
  updateSheetFormulaBar();
  updateSheetStats();
  syncSheetToolbarState();
}

// ---- Sheets clipboard ----
function copySheetSelection(): void {
  const tab = activeTab();
  const sel = sheetSelection;
  if (!tab || !sel) return;
  const norm = sheetNormalizedSelection(sel);
  const rows: string[][] = [];
  for (let r = norm.r1; r <= norm.r2; r++) {
    const row: string[] = [];
    for (let c = norm.c1; c <= norm.c2; c++) {
      row.push(tab.cells[sheetCellKey(r, c)]?.v ?? "");
    }
    rows.push(row);
  }
  sheetClipboard = rows;
  writeSheetClipboardText(rows.map((row) => row.join("\t")).join("\n"));
}

function cutSheetSelection(): void {
  copySheetSelection();
  clearSheetSelection();
}

function writeSheetClipboardText(text: string): void {
  try {
    void navigator.clipboard?.writeText(text)?.catch?.(() => {
      // clipboard writes are best-effort (may be denied in file:// contexts)
    });
  } catch {
    // ignore
  }
}

async function readSheetClipboardText(): Promise<string> {
  try {
    return (await navigator.clipboard?.readText()) ?? "";
  } catch {
    return "";
  }
}

async function pasteSheetClipboard(): Promise<void> {
  const tab = activeTab();
  const sel = sheetSelection;
  if (!tab || !sel) return;

  // Prefer the system clipboard so pasting from other apps works; fall back to
  // the in-app buffer when the clipboard is unavailable.
  let rows: string[][] | null = null;
  const external = await readSheetClipboardText();
  if (external) {
    rows = external.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").map((line) => line.split("\t"));
  } else if (sheetClipboard) {
    rows = sheetClipboard;
  }
  if (!rows || !rows.length) return;

  pushSheetUndo();
  const startR = sel.r1;
  const startC = sel.c1;
  rows.forEach((row, ri) => {
    row.forEach((value, ci) => {
      const r = startR + ri;
      const c = startC + ci;
      if (r >= tab.rows || c >= tab.cols) return;
      const key = sheetCellKey(r, c);
      const cell = { ...(tab.cells[key] ?? {}) };
      if (value === "") delete cell.v;
      else cell.v = value;
      tab.cells[key] = cell;
    });
  });
  sheetUpdated();
  renderSheetGrid();
  applySheetSelectionClasses();
}

// ---- Sheets undo / redo ----
function cloneSpreadsheet(ss: Spreadsheet): Spreadsheet {
  return JSON.parse(JSON.stringify(ss)) as Spreadsheet;
}

function pushSheetUndo(): void {
  const ss = activeSpreadsheet();
  if (!ss) return;
  sheetUndoStack.push(cloneSpreadsheet(ss));
  if (sheetUndoStack.length > 60) sheetUndoStack.shift();
  sheetRedoStack = [];
}

function replaceActiveSpreadsheet(snapshot: Spreadsheet): void {
  if (!activeSheetId) return;
  const idx = spreadsheets.findIndex((ss) => ss.id === activeSheetId);
  if (idx === -1) return;
  spreadsheets[idx] = snapshot;
  const titleEl = document.getElementById("sheets-doc-title") as HTMLElement | null;
  if (titleEl) titleEl.textContent = snapshot.title;
  renderSheetTabs();
  renderSheetGrid();
  applySheetSelectionClasses();
  updateSheetFormulaBar();
  updateSheetStats();
  syncSheetToolbarState();
  saveSpreadsheets(spreadsheets);
  updateSheetStatus("saved");
}

function undoSheet(): void {
  const ss = activeSpreadsheet();
  if (!ss) return;
  const previous = sheetUndoStack.pop();
  if (!previous) return;
  sheetRedoStack.push(cloneSpreadsheet(ss));
  replaceActiveSpreadsheet(previous);
}

function redoSheet(): void {
  const ss = activeSpreadsheet();
  if (!ss) return;
  const next = sheetRedoStack.pop();
  if (!next) return;
  sheetUndoStack.push(cloneSpreadsheet(ss));
  replaceActiveSpreadsheet(next);
}

// ---- Sheets persistence ----
function updateSheetStatus(state: "saved" | "saving"): void {
  const status = document.getElementById("sheets-save-status");
  const dot = document.getElementById("sheets-status-dot") as HTMLElement | null;
  if (status) status.textContent = state === "saving" ? t.saving : t.saved;
  if (dot) dot.className = "status-dot " + state;
}

function sheetUpdated(): void {
  const ss = activeSpreadsheet();
  if (!ss) return;
  ss.updatedAt = Date.now();
  updateSheetStatus("saving");
  scheduleSheetAutoSave();
}

function scheduleSheetAutoSave(): void {
  if (sheetAutoSaveTimer !== null) {
    clearTimeout(sheetAutoSaveTimer);
    sheetAutoSaveTimer = null;
  }
  if (!activeSheetId) return;
  sheetAutoSaveTimer = window.setTimeout(() => {
    sheetAutoSaveTimer = null;
    doSheetAutoSave();
  }, 800);
}

function doSheetAutoSave(): void {
  sheetAutoSaveTimer = null;
  const ss = activeSpreadsheet();
  if (!ss) return;
  ss.updatedAt = Date.now();
  saveSpreadsheets(spreadsheets);
  updateSheetStatus("saved");
  renderSheetList();
}

// ---- Sheets export ----
function sheetUsedRange(tab: SheetTab): { rows: number; cols: number } {
  let maxRow = 0;
  let maxCol = 0;
  for (const key of Object.keys(tab.cells)) {
    const cell = tab.cells[key];
    if (!cell?.v || !cell.v.trim()) continue;
    const [r, c] = key.split(",").map((n) => parseInt(n, 10));
    if (r > maxRow) maxRow = r;
    if (c > maxCol) maxCol = c;
  }
  return { rows: maxRow + 1, cols: maxCol + 1 };
}

function sheetTabValueRows(tab: SheetTab): string[][] {
  const used = sheetUsedRange(tab);
  const rows: string[][] = [];
  for (let r = 0; r < used.rows; r++) {
    const row: string[] = [];
    for (let c = 0; c < used.cols; c++) {
      const cell = tab.cells[sheetCellKey(r, c)];
      row.push(sheetDisplayValue(computeSheetCellValue(tab.id, r, c), cell?.nf));
    }
    rows.push(row);
  }
  return rows;
}

function sheetTabHtml(rows: string[][]): string {
  const head = rows.length ? rows[0].map((_, i) => `<th>${escapeHtml(sheetColName(i))}</th>`).join("") : "";
  const body = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
    .join("");
  return `<table class="sheets-print-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function sheetCsvEscape(value: string, sep: string): string {
  if (!value) return "";
  if (value.includes(sep) || value.includes('"') || value.includes("\n") || value.includes("\r")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function downloadSheetFile(text: string, filename: string, mime: string): void {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportSheet(format: string): void {
  const ss = activeSpreadsheet();
  const tab = activeTab();
  if (!ss || !tab) return;
  const fileName = (ss.title || t.untitledSpreadsheet).replace(/[^a-z0-9\-_ ]/gi, "_").trim() || "spreadsheet";
  const rows = sheetTabValueRows(tab);

  if (format === "json") {
    const payload = {
      title: ss.title,
      tabs: ss.tabs.map((x) => ({
        name: x.name,
        rows: x.rows,
        cols: x.cols,
        cells: x.cells,
      })),
    };
    downloadSheetFile(JSON.stringify(payload, null, 2), `${fileName}.json`, "application/json;charset=utf-8");
    return;
  }

  if (format === "html") {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeHtml(ss.title)}</title></head><body>${sheetTabHtml(rows)}</body></html>`;
    downloadSheetFile(html, `${fileName}.html`, "text/html;charset=utf-8");
    return;
  }

  if (format === "pdf") {
    openSheetPrintView(ss.title, sheetTabHtml(rows));
    return;
  }

  const sep = format === "tsv" ? "\t" : ",";
  const text = rows.map((row) => row.map((cell) => sheetCsvEscape(cell, sep)).join(sep)).join("\n");
  downloadSheetFile(text, `${fileName}.${format === "tsv" ? "tsv" : "csv"}`, "text/plain;charset=utf-8");
}

function openSheetPrintView(title: string, tableHtml: string): void {
  const existing = document.getElementById("sheets-print-view");
  if (existing) existing.remove();

  const winDiv = document.createElement("div");
  winDiv.id = "sheets-print-view";
  winDiv.style.position = "fixed";
  winDiv.style.inset = "0";
  winDiv.style.zIndex = "1000";
  winDiv.style.background = "var(--bg)";
  winDiv.innerHTML = `
    <div style="padding:24px 32px;max-width:1000px;margin:0 auto;min-height:100%;box-sizing:border-box;">
      <h1 style="font-size:24px;font-weight:700;color:var(--text);margin-bottom:12px;">${escapeHtml(title)}</h1>
      ${tableHtml}
    </div>
    <button id="sheets-print-close" style="position:fixed;top:20px;right:20px;z-index:1001;padding:8px 14px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text);cursor:pointer;">Close</button>
  `;
  document.body.appendChild(winDiv);

  const close = () => winDiv.remove();
  winDiv.querySelector("#sheets-print-close")?.addEventListener("click", close);
  winDiv.addEventListener("click", (e) => { if (e.target === winDiv) close(); });

  setTimeout(() => window.print(), 150);
}

// ---- Sheets events ----
function onSheetGridMouseDown(e: MouseEvent): void {
  const target = e.target as HTMLElement;
  if (target.classList?.contains("sheets-cell-input")) return;
  const td = target.closest<HTMLElement>("td.sheets-cell");
  if (!td) return;
  e.preventDefault();
  if (sheetEditing) commitSheetCellEdit();

  const r = parseInt(td.dataset.r ?? "0", 10);
  const c = parseInt(td.dataset.c ?? "0", 10);
  const sel = sheetSelection;
  if (e.shiftKey && sel) {
    setSheetSelection(sel.r1, sel.c1, r, c);
  } else {
    setSheetSelection(r, c, r, c);
    startSheetRangeDrag(r, c);
  }
  sheetsGridWrapEl()?.focus({ preventScroll: true });
}

function startSheetRangeDrag(anchorR: number, anchorC: number): void {
  const onMove = (ev: MouseEvent) => {
    const el = document.elementFromPoint(ev.clientX, ev.clientY);
    const td = el?.closest?.("td.sheets-cell") as HTMLElement | null;
    if (!td || !sheetSelection) return;
    const r = parseInt(td.dataset.r ?? "0", 10);
    const c = parseInt(td.dataset.c ?? "0", 10);
    sheetSelection = { r1: anchorR, c1: anchorC, r2: r, c2: c };
    applySheetSelectionClasses();
    updateSheetStats();
  };
  const onUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    updateSheetFormulaBar();
    syncSheetToolbarState();
  };
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
}

function onSheetGridDoubleClick(e: MouseEvent): void {
  const td = (e.target as HTMLElement).closest<HTMLElement>("td.sheets-cell");
  if (!td) return;
  const r = parseInt(td.dataset.r ?? "0", 10);
  const c = parseInt(td.dataset.c ?? "0", 10);
  beginSheetCellEdit(r, c);
}

function onSheetGridKeydown(e: KeyboardEvent): void {
  if (sheetEditing) return;
  const sel = sheetSelection;
  if (!sel) return;
  const mod = e.metaKey || e.ctrlKey;
  const key = e.key;

  if (mod) {
    const k = key.toLowerCase();
    if (k === "b") { e.preventDefault(); toggleSheetFormat("bold"); return; }
    if (k === "i") { e.preventDefault(); toggleSheetFormat("italic"); return; }
    if (k === "u") { e.preventDefault(); toggleSheetFormat("underline"); return; }
    if (k === "z") { e.preventDefault(); if (e.shiftKey) redoSheet(); else undoSheet(); return; }
    if (k === "y") { e.preventDefault(); redoSheet(); return; }
    if (k === "c") { e.preventDefault(); copySheetSelection(); return; }
    if (k === "x") { e.preventDefault(); cutSheetSelection(); return; }
    if (k === "v") { e.preventDefault(); void pasteSheetClipboard(); return; }
    if (k === "a") { e.preventDefault(); selectAllSheetCells(); return; }
    if (key === "Home") { e.preventDefault(); moveSheetSelectionTo(0, 0, false); return; }
    return;
  }

  switch (key) {
    case "ArrowUp": e.preventDefault(); moveSheetSelection(-1, 0, e.shiftKey); return;
    case "ArrowDown": e.preventDefault(); moveSheetSelection(1, 0, e.shiftKey); return;
    case "ArrowLeft": e.preventDefault(); moveSheetSelection(0, -1, e.shiftKey); return;
    case "ArrowRight": e.preventDefault(); moveSheetSelection(0, 1, e.shiftKey); return;
    case "Tab": e.preventDefault(); moveSheetSelection(0, e.shiftKey ? -1 : 1, false); return;
    case "Enter": e.preventDefault(); beginSheetCellEdit(sel.r1, sel.c1); return;
    case "F2": e.preventDefault(); beginSheetCellEdit(sel.r1, sel.c1); return;
    case "Delete":
    case "Backspace": e.preventDefault(); clearSheetSelection(); return;
    case "Home": e.preventDefault(); moveSheetSelectionTo(sel.r2, 0, e.shiftKey); return;
    case "End": {
      const tab = activeTab();
      if (!tab) return;
      e.preventDefault();
      moveSheetSelectionTo(sel.r2, tab.cols - 1, e.shiftKey);
      return;
    }
  }

  if (key.length === 1 && !e.altKey) {
    e.preventDefault();
    beginSheetCellEdit(sel.r1, sel.c1, key);
  }
}

function onSheetColumnHeadMouseDown(e: MouseEvent): void {
  const th = (e.target as HTMLElement).closest<HTMLElement>("th.sheets-col-head");
  if (!th) return;
  const rect = th.getBoundingClientRect();
  if (e.clientX - rect.left < rect.width - 6) return;
  e.preventDefault();

  const col = parseInt(th.getAttribute("data-col") ?? "0", 10);
  const startX = e.clientX;
  const startWidth = rect.width;
  const onMove = (ev: MouseEvent) => {
    const width = Math.max(52, Math.min(600, Math.round(startWidth + (ev.clientX - startX))));
    setSheetColumnWidth(col, width);
  };
  const onUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    scheduleSheetAutoSave();
  };
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
}

function handleSheetAction(action: string | null): void {
  if (!action) return;
  const sel = sheetSelection;
  switch (action) {
    case "undo": undoSheet(); break;
    case "redo": redoSheet(); break;
    case "bold": toggleSheetFormat("bold"); break;
    case "italic": toggleSheetFormat("italic"); break;
    case "underline": toggleSheetFormat("underline"); break;
    case "align-left": applySheetCellStyle("al", "left"); break;
    case "align-center": applySheetCellStyle("al", "center"); break;
    case "align-right": applySheetCellStyle("al", "right"); break;
    case "insert-row": if (sel) insertSheetRow(sel.r1); break;
    case "insert-column": if (sel) insertSheetColumn(sel.c1); break;
    case "delete-row": if (sel) deleteSheetRow(sel.r1); break;
    case "delete-column": if (sel) deleteSheetColumn(sel.c1); break;
  }
}

function setupSheetsUI(): void {
  if (sheetsUIReady) return;
  sheetsUIReady = true;

  const newBtn = document.getElementById("sheets-new-btn") as HTMLButtonElement | null;
  const backBtn = document.getElementById("sheets-back-btn") as HTMLButtonElement | null;
  const searchInput = document.getElementById("sheets-search") as HTMLInputElement | null;
  const titleEl = document.getElementById("sheets-doc-title") as HTMLElement | null;
  const listEl = document.getElementById("sheets-list");
  const gridWrap = sheetsGridWrapEl();
  const formulaInput = document.getElementById("sheets-formula-input") as HTMLInputElement | null;
  const tabsEl = document.getElementById("sheets-tabs");

  if (newBtn) {
    newBtn.addEventListener("click", () => openSheetEditor());
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => closeSheetEditorReturnToList());
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      sheetsQuery = searchInput.value;
      renderSheetList();
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        sheetsQuery = "";
        renderSheetList();
      }
    });
  }

  if (titleEl) {
    titleEl.addEventListener("blur", () => {
      const ss = activeSpreadsheet();
      if (!ss) return;
      const value = titleEl.textContent?.trim() || t.untitledSpreadsheet;
      if (ss.title === value) return;
      ss.title = value;
      sheetUpdated();
      renderSheetList();
    });
    titleEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        titleEl.blur();
      }
    });
  }

  if (listEl) {
    listEl.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const item = target.closest<HTMLElement>(".docs-item");
      if (!item) return;
      const id = item.getAttribute("data-sheet-id");
      if (!id) return;

      const actionBtn = target.closest<HTMLElement>(".docs-item-btn");
      if (actionBtn) {
        e.stopPropagation();
        e.preventDefault();
        const action = actionBtn.getAttribute("data-action");
        if (action === "delete") openSheetDeleteDialog(id);
        else if (action === "rename") openSheetRenameDialog(id);
        return;
      }

      openSheetEditor(id);
    });

    listEl.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const item = (e.target as HTMLElement).closest<HTMLElement>(".docs-item");
      const id = item?.getAttribute("data-sheet-id");
      if (!id) return;
      e.preventDefault();
      openSheetEditor(id);
    });
  }

  const toolbar = document.querySelector<HTMLElement>(".sheets-toolbar");
  toolbar?.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>(".format-btn[data-sheet-action]");
    if (!btn) return;
    handleSheetAction(btn.getAttribute("data-sheet-action"));
  });

  const fmtSel = document.getElementById("sheets-number-format") as HTMLSelectElement | null;
  fmtSel?.addEventListener("change", () => {
    setSheetNumberFormat((fmtSel.value || "general") as SheetNumberFormat);
  });

  const textColor = document.getElementById("sheets-text-color") as HTMLInputElement | null;
  const textColorBar = document.getElementById("sheets-text-color-bar");
  if (textColor) {
    textColor.addEventListener("input", () => {
      if (textColorBar) textColorBar.style.background = textColor.value;
      applySheetCellStyle("tc", textColor.value);
    });
  }

  const fillColor = document.getElementById("sheets-fill-color") as HTMLInputElement | null;
  const fillColorBar = document.getElementById("sheets-fill-color-bar");
  if (fillColor) {
    fillColor.addEventListener("input", () => {
      if (fillColorBar) fillColorBar.style.background = fillColor.value;
      applySheetCellStyle("bg", fillColor.value);
    });
  }

  gridWrap?.addEventListener("mousedown", onSheetGridMouseDown);
  gridWrap?.addEventListener("dblclick", onSheetGridDoubleClick);
  gridWrap?.addEventListener("keydown", onSheetGridKeydown);

  formulaInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitSheetFormulaInput();
    } else if (e.key === "Escape") {
      e.preventDefault();
      updateSheetFormulaBar();
      gridWrap?.focus({ preventScroll: true });
    }
  });

  if (tabsEl) {
    tabsEl.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const tabEl = target.closest<HTMLElement>(".sheets-tab");
      if (!tabEl) return;
      const tabId = tabEl.getAttribute("data-tab-id");
      if (!tabId) return;
      if (target.closest<HTMLElement>(".sheets-tab-close")) {
        e.stopPropagation();
        openSheetTabDeleteDialog(tabId);
        return;
      }
      switchSheetTab(tabId);
    });
    tabsEl.addEventListener("dblclick", (e) => {
      const tabEl = (e.target as HTMLElement).closest<HTMLElement>(".sheets-tab");
      const tabId = tabEl?.getAttribute("data-tab-id");
      if (tabId) openSheetTabRenameDialog(tabId);
    });
  }

  const addTabBtn = document.getElementById("sheets-add-tab") as HTMLButtonElement | null;
  addTabBtn?.addEventListener("click", () => addSheetTab());

  const exportBtn = document.getElementById("sheets-export-menu-btn") as HTMLButtonElement | null;
  const exportMenu = document.getElementById("sheets-export-menu") as HTMLElement | null;
  if (exportBtn && exportMenu) {
    exportBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      exportMenu.style.display = exportMenu.style.display === "none" ? "flex" : "none";
    });
    exportMenu.querySelectorAll<HTMLElement>(".export-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const fmt = item.getAttribute("data-format");
        if (fmt) exportSheet(fmt);
        exportMenu.style.display = "none";
      });
    });
    document.addEventListener("click", () => {
      exportMenu.style.display = "none";
    });
  }

  const head = document.getElementById("sheets-grid-head");
  head?.addEventListener("mousedown", onSheetColumnHeadMouseDown);
}

// ---- Sheets dialogs ----
function openSheetRenameDialog(id: string): void {
  const ss = spreadsheets.find((x) => x.id === id);
  if (!ss) return;
  const existing = document.getElementById("sheets-rename-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "sheets-rename-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <span class="modal-title">${escapeHtml(t.rename)}</span>
        <button class="themes-close" aria-label="Close">&#10005;</button>
      </div>
      <div class="modal-body">
        <div class="modal-field">
          <label class="modal-field-label" for="sheets-rename-input">${escapeHtml(t.untitledSpreadsheet)}</label>
          <input type="text" id="sheets-rename-input" class="modal-input" value="${escapeHtmlAttr(ss.title)}" spellcheck="false" autocomplete="off" />
        </div>
      </div>
      <div class="modal-actions">
        <button id="sheets-rename-cancel" class="modal-btn secondary">${escapeHtml(t.cancel)}</button>
        <button id="sheets-rename-save" class="modal-btn primary">${escapeHtml(t.confirm)}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const input = document.getElementById("sheets-rename-input") as HTMLInputElement | null;
  const close = () => { modal.style.display = "none"; setTimeout(() => modal.remove(), 200); };
  const save = () => {
    const value = input?.value.trim();
    if (!value) return;
    renameSpreadsheet(id, value);
    close();
  };

  modal.querySelector<HTMLElement>(".themes-close")?.addEventListener("click", close);
  document.getElementById("sheets-rename-cancel")?.addEventListener("click", close);
  document.getElementById("sheets-rename-save")?.addEventListener("click", save);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); save(); }
    else if (e.key === "Escape") close();
  });
  setTimeout(() => { input?.focus(); input?.select(); }, 50);
}

function openSheetDeleteDialog(id: string): void {
  const ss = spreadsheets.find((x) => x.id === id);
  if (!ss) return;
  const existing = document.getElementById("sheets-delete-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "sheets-delete-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-card" style="max-width:380px;">
      <div class="modal-header">
        <span class="modal-title">${escapeHtml(t.delete)}</span>
        <button class="themes-close" aria-label="Close">&#10005;</button>
      </div>
      <div class="modal-body">
        <div class="modal-field">
          <p style="color:var(--text-secondary);margin:0;">${escapeHtml(t.deleteSpreadsheetConfirm)}</p>
          <p style="font-size:13px;color:var(--text);margin-top:6px;font-weight:600;">“${escapeHtml(ss.title)}”</p>
        </div>
      </div>
      <div class="modal-actions">
        <button id="sheets-delete-cancel" class="modal-btn secondary">${escapeHtml(t.cancel)}</button>
        <button id="sheets-delete-save" class="modal-btn primary">${escapeHtml(t.delete)}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => { modal.style.display = "none"; setTimeout(() => modal.remove(), 200); };
  const del = () => { deleteSpreadsheet(id); close(); };

  modal.querySelector<HTMLElement>(".themes-close")?.addEventListener("click", close);
  document.getElementById("sheets-delete-cancel")?.addEventListener("click", close);
  document.getElementById("sheets-delete-save")?.addEventListener("click", del);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
}

function openSheetTabRenameDialog(tabId: string): void {
  const tab = findSheetTab(tabId);
  if (!tab) return;
  const existing = document.getElementById("sheets-tab-rename-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "sheets-tab-rename-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-card" style="max-width:360px;">
      <div class="modal-header">
        <span class="modal-title">${escapeHtml(t.renameSheet)}</span>
        <button class="themes-close" aria-label="Close">&#10005;</button>
      </div>
      <div class="modal-body">
        <div class="modal-field">
          <label class="modal-field-label" for="sheets-tab-name-input">${escapeHtml(t.sheetName)}</label>
          <input type="text" id="sheets-tab-name-input" class="modal-input" value="${escapeHtmlAttr(tab.name)}" spellcheck="false" autocomplete="off" />
        </div>
      </div>
      <div class="modal-actions">
        <button id="sheets-tab-rename-cancel" class="modal-btn secondary">${escapeHtml(t.cancel)}</button>
        <button id="sheets-tab-rename-save" class="modal-btn primary">${escapeHtml(t.confirm)}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const input = document.getElementById("sheets-tab-name-input") as HTMLInputElement | null;
  const close = () => { modal.style.display = "none"; setTimeout(() => modal.remove(), 200); };
  const save = () => {
    const value = input?.value.trim();
    if (!value) return;
    renameSheetTab(tabId, value);
    close();
  };

  modal.querySelector<HTMLElement>(".themes-close")?.addEventListener("click", close);
  document.getElementById("sheets-tab-rename-cancel")?.addEventListener("click", close);
  document.getElementById("sheets-tab-rename-save")?.addEventListener("click", save);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); save(); }
    else if (e.key === "Escape") close();
  });
  setTimeout(() => { input?.focus(); input?.select(); }, 50);
}

function openSheetTabDeleteDialog(tabId: string): void {
  const tab = findSheetTab(tabId);
  const ss = activeSpreadsheet();
  if (!tab || !ss) return;
  if (ss.tabs.length <= 1) return;
  const existing = document.getElementById("sheets-tab-delete-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "sheets-tab-delete-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-card" style="max-width:360px;">
      <div class="modal-header">
        <span class="modal-title">${escapeHtml(t.deleteSheet)}</span>
        <button class="themes-close" aria-label="Close">&#10005;</button>
      </div>
      <div class="modal-body">
        <div class="modal-field">
          <p style="color:var(--text-secondary);margin:0;">${escapeHtml(t.deleteSpreadsheetConfirm)}</p>
          <p style="font-size:13px;color:var(--text);margin-top:6px;font-weight:600;">“${escapeHtml(tab.name)}”</p>
        </div>
      </div>
      <div class="modal-actions">
        <button id="sheets-tab-delete-cancel" class="modal-btn secondary">${escapeHtml(t.cancel)}</button>
        <button id="sheets-tab-delete-save" class="modal-btn primary">${escapeHtml(t.delete)}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => { modal.style.display = "none"; setTimeout(() => modal.remove(), 200); };
  const del = () => { deleteSheetTab(tabId); close(); };

  modal.querySelector<HTMLElement>(".themes-close")?.addEventListener("click", close);
  document.getElementById("sheets-tab-delete-cancel")?.addEventListener("click", close);
  document.getElementById("sheets-tab-delete-save")?.addEventListener("click", del);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
}

// ---- Sheets lifecycle ----
function initSheetsUI(): void {
  setupSheetsUI();
  const open = activeSheetId ? spreadsheets.find((ss) => ss.id === activeSheetId) : null;
  if (open) {
    if (sheetsOpenId !== open.id) openSheetEditor(open.id);
  } else {
    closeSheetEditorReturnToList();
  }
  renderSheetList();
}

function applySheetsLocale(): void {
  setText("#sheets-app-title", t.sheets);
  setText("#sheets-new-btn-label", t.newSheet.replace("+ ", ""));
  setText("#sheets-export-btn-label", t.export);
  (document.getElementById("sheets-search") as HTMLInputElement | null)
    ?.setAttribute("placeholder", t.searchSpreadsheets);
  const titleEl = document.getElementById("sheets-doc-title") as HTMLElement | null;
  if (titleEl) titleEl.setAttribute("data-placeholder", t.untitledSpreadsheet);

  setText("#sheets-export-menu .export-item[data-format='csv']", t.exportCSV);
  setText("#sheets-export-menu .export-item[data-format='tsv']", t.exportTSV);
  setText("#sheets-export-menu .export-item[data-format='json']", t.exportJSON);
  setText("#sheets-export-menu .export-item[data-format='html']", t.exportHTML);

  buildSheetNumberFormatOptions();
  renderSheetList();
  renderSheetTabs();
  syncSheetToolbarState();
}

function setupFolderForm(btnId: string, formId: string, inputId: string, cancelId: string, saveId: string, alternateFormId?: string) {
  const btn = document.getElementById(btnId);
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  const cancelBtn = document.getElementById(cancelId);
  const saveBtn = document.getElementById(saveId);

  if (btn && form) {
    btn.addEventListener("click", () => {
      const isVisible = form.style.display !== "none";
      form.style.display = isVisible ? "none" : "flex";
      if (!isVisible) {
        if (alternateFormId) {
          const alt = document.getElementById(alternateFormId);
          if (alt) alt.style.display = "none";
        }
        if (input) {
          input.value = "";
          input.focus();
        }
      }
    });
  }

  const doSave = () => {
    const name = input?.value.trim();
    if (!name) return;
    const folders = getFavoriteFolders();
    const newId = "f_" + Date.now();
    folders.push({ id: newId, name });
    setFavoriteFolders(folders);
    openFolderIds.add(newId);
    if (input) input.value = "";
    if (form) form.style.display = "none";
    renderFavorites();
  };

  if (saveBtn) saveBtn.addEventListener("click", doSave);
  if (cancelBtn && form) cancelBtn.addEventListener("click", () => { form.style.display = "none"; });
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        doSave();
      } else if (e.key === "Escape" && form) {
        form.style.display = "none";
      }
    });
  }
}

function setupLinkForm(btnId: string, formId: string, titleId: string, urlId: string, folderSelectId: string, cancelId: string, saveId: string, alternateFormId?: string) {
  const btn = document.getElementById(btnId);
  const form = document.getElementById(formId);
  const titleInput = document.getElementById(titleId) as HTMLInputElement | null;
  const urlInput = document.getElementById(urlId) as HTMLInputElement | null;
  const folderSelect = document.getElementById(folderSelectId) as HTMLSelectElement | null;
  const cancelBtn = document.getElementById(cancelId);
  const saveBtn = document.getElementById(saveId);

  const populateFolderSelect = () => {
    if (!folderSelect) return;
    const folders = getFavoriteFolders();
    folderSelect.innerHTML = [
      `<option value="none">No folder (Unfiled)</option>`,
      ...folders.map(f => `<option value="${f.id}">📁 ${f.name}</option>`)
    ].join("");
  };

  if (btn && form) {
    btn.addEventListener("click", () => {
      const isVisible = form.style.display !== "none";
      form.style.display = isVisible ? "none" : "flex";
      if (!isVisible) {
        if (alternateFormId) {
          const alt = document.getElementById(alternateFormId);
          if (alt) alt.style.display = "none";
        }
        populateFolderSelect();
        if (titleInput) titleInput.value = "";
        if (urlInput) {
          urlInput.value = "";
          urlInput.focus();
        }
      }
    });
  }

  const doSave = () => {
    let rawUrl = urlInput?.value.trim() ?? "";
    if (!rawUrl) {
      urlInput?.focus();
      return;
    }
    if (!/^https?:\/\//i.test(rawUrl)) {
      rawUrl = "https://" + rawUrl;
    }
    const title = titleInput?.value.trim() || friendlyTabTitle(rawUrl);
    const folderId = (folderSelect && folderSelect.value !== "none") ? folderSelect.value : undefined;

    addFavorite(rawUrl, title, folderId);
    if (titleInput) titleInput.value = "";
    if (urlInput) urlInput.value = "";
    if (form) form.style.display = "none";
    renderFavorites();
    updateFavoriteButtons();
  };

  if (saveBtn) saveBtn.addEventListener("click", doSave);
  if (cancelBtn && form) cancelBtn.addEventListener("click", () => { form.style.display = "none"; });
  [titleInput, urlInput].forEach((inp) => {
    inp?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        doSave();
      } else if (e.key === "Escape" && form) {
        form.style.display = "none";
      }
    });
  });
}

setupFolderForm("new-folder-btn", "new-folder-form", "new-folder-name", "cancel-folder-btn", "save-folder-btn", "new-link-form");
setupFolderForm("new-folder-btn-page", "new-folder-form-page", "new-folder-name-page", "cancel-folder-btn-page", "save-folder-btn-page", "new-link-form-page");
setupLinkForm("new-link-btn", "new-link-form", "new-link-title", "new-link-url", "new-link-folder", "cancel-link-btn", "save-link-btn", "new-folder-form");
setupLinkForm("new-link-btn-page", "new-link-form-page", "new-link-title-page", "new-link-url-page", "new-link-folder-page", "cancel-link-btn-page", "save-link-btn-page", "new-folder-form-page");

function updateFavoriteButtons() {
  const setBtn = (btn: HTMLButtonElement | null, url: string | null) => {
    if (!btn) return;
    const fav = !!url && isFavoriteUrlSaved(url);
    btn.classList.toggle("favorited", fav);
    const outline = btn.querySelector(".favorite-star-outline") as HTMLImageElement | null;
    const filled = btn.querySelector(".favorite-star-filled") as HTMLImageElement | null;
    if (outline) outline.style.display = fav ? "none" : "";
    if (filled) filled.style.display = fav ? "" : "none";
    const singleImg = btn.querySelector("img:not(.favorite-star-outline):not(.favorite-star-filled)") as HTMLImageElement | null;
    if (singleImg) {
      singleImg.src = fav ? "assets/icons/favorited.svg" : "assets/icons/favorite.svg";
    }
  };
  // main toolbar
  const mainBtn = document.getElementById("favorite") as HTMLButtonElement | null;
  const activeTab = getActiveTab();
  setBtn(mainBtn, activeTab ? activeTab.url : null);
  // pane toolbars
  document.querySelectorAll(".pane-toolbar").forEach((bar) => {
    const btn = bar.querySelector(".favorite-btn") as HTMLButtonElement | null;
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
    if (fp) fp.style.display = fp.style.display === "none" ? "flex" : "none";
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
  restoreBtn.textContent = on ? t.restoreSessionOn : t.restoreSessionOff;
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

function navigateTab(tab: Tab, target: string, opts?: { pushHistory?: boolean }) {
  const pushHistory = opts?.pushHistory !== false;
  tab.initialAboutBlankPending = false;
  if (!isSafeUrl(target)) {
    if (statusEl) statusEl.textContent = "Blocked unsafe URL";
    return;
  }
  const internal = canonicalInternalUrl(target);
  if (internal) {
    tab.url = internal;
    tab.title = friendlyTabTitle(internal);
    if (pushHistory) {
      const stack = tab.internalStack;
      if (stack[stack.length - 1] !== internal) stack.push(internal);
      tab.internalForward = [];
    }
    if (internal === HOME_URL && tab.webview.src !== "about:blank") {
      tab.webview.src = "about:blank";
    }
    if (isNativeAppUrl(internal)) recordNativeAppVisit(internal);
    if (tab.id === activeTabId) {
      syncInternalView(internal);
      addressInput.value = internal;
      syncNavState();
    }
    if (splitMode) applyLayout();
    updateTabUI(tab);
    return;
  }
  tab.url = target;
  tab.title = friendlyTabTitle(target);
  // A web page replaces the internal history: the webview can only walk back to the home page.
  tab.internalStack = [HOME_URL];
  tab.internalForward = [];
  if (tab.id === activeTabId) {
    syncInternalView(target);
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
    // A native app opened on a document/spreadsheet/deck steps back to the app's list first.
    if (canonicalInternalUrl(tab.url) && nativeAppIsEditing(tab.url)) {
      closeNativeAppEditor(tab.url);
      syncNavState();
      return;
    }
    const internal = canonicalInternalUrl(tab.url);
    if (internal && tab.internalStack.length > 1) {
      tab.internalStack.pop();
      const previous = tab.internalStack[tab.internalStack.length - 1];
      tab.internalForward.push(internal);
      navigateTab(tab, previous, { pushHistory: false });
      return;
    }
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
    const internal = canonicalInternalUrl(tab.url);
    if (internal && tab.internalForward.length > 0) {
      const next = tab.internalForward.pop() as string;
      tab.internalStack.push(next);
      navigateTab(tab, next, { pushHistory: false });
      return;
    }
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
    setTimeout(() => { dropInProgress = false; }, 50);

    let payload: any = currentDragPayload;
    if (!payload) {
      try {
        payload = JSON.parse(e.dataTransfer?.getData("text/plain") || "");
      } catch {
        return;
      }
    }
    if (!payload || !payload.url) return;
    const fromWindowId = payload.sourceWindowId as number | null;

    if (fromWindowId === currentWindowId) {
      // Same-window drop on empty tab bar area → reorder to end
      droppedInTabBar = true;
      const lastTab = tabs[tabs.length - 1];
      if (lastTab && payload.tabId !== lastTab.id) reorderTabs(payload.tabId, lastTab.id);
      persistTabs();
    } else if (fromWindowId != null) {
      // Cross-window drop on tab bar gap → receive at end
      receiveTabFromWindow(payload);
    }
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
          if (isHomeUrl(tab.url) || isHistoryUrl(tab.url) || isFavoritesUrl(tab.url) || isDocumentsUrl(tab.url) || isSheetsUrl(tab.url) || isPresentationsUrl(tab.url)) {
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
      if (splitMode) {
        const paneTab = tabs.find((t) => t.id === (focusedPane === "left" ? leftTabId : rightTabId));
        if (paneTab) {
          navigateTab(paneTab, resolveURL(payload));
          if (leftToolbar && (leftToolbar as any)._sync) (leftToolbar as any)._sync();
          if (rightToolbar && (rightToolbar as any)._sync) (rightToolbar as any)._sync();
          return;
        }
      }
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
  if (e.key === "ArrowLeft") {
    const el = document.activeElement;
    const isEditable = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || (el as HTMLElement).isContentEditable);
    if (isEditable) return;
    e.preventDefault();
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

// ---- Home Shortcuts ----
interface ShortcutItem {
  name: string;
  url: string;
}

const SHORTCUTS_STORAGE_KEY = "alma:shortcuts";

function loadShortcuts(): ShortcutItem[] {
  try {
    const raw = localStorage.getItem(SHORTCUTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, 6) : [];
  } catch {
    return [];
  }
}

function saveShortcuts(list: ShortcutItem[]): void {
  localStorage.setItem(SHORTCUTS_STORAGE_KEY, JSON.stringify(list.slice(0, 6)));
}

function extractDomain(urlStr: string): string {
  try {
    let u = urlStr.trim();
    if (!/^https?:\/\//i.test(u)) u = "https://" + u;
    const parsed = new URL(u);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return urlStr.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || urlStr;
  }
}

function getFaviconUrl(urlStr: string): string {
  const domain = extractDomain(urlStr);
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
}

function renderShortcuts(): void {
  const containers = document.querySelectorAll<HTMLElement>(".home-shortcuts");
  if (!containers.length) return;
  const shortcuts = loadShortcuts();

  containers.forEach((container) => {
    container.innerHTML = "";

    // 1. Existing shortcuts
    shortcuts.forEach((sc, idx) => {
      const item = document.createElement("div");
      item.className = "shortcut-item";
      item.dataset.index = String(idx);
      item.dataset.url = sc.url;
      item.title = `${sc.name} (${sc.url})`;

      // Delete button on corner
      const delBtn = document.createElement("button");
      delBtn.className = "shortcut-delete";
      delBtn.setAttribute("aria-label", "Delete shortcut");
      delBtn.setAttribute("title", "Delete");
      delBtn.textContent = "×";
      item.appendChild(delBtn);

      // Icon container
      const iconWrapper = document.createElement("div");
      iconWrapper.className = "shortcut-icon-wrapper";

      const img = document.createElement("img");
      img.className = "shortcut-icon";
      img.src = getFaviconUrl(sc.url);
      img.alt = "";

      const fallback = document.createElement("span");
      fallback.className = "shortcut-icon-fallback";
      fallback.style.display = "none";
      const initial = (sc.name[0] || extractDomain(sc.url)[0] || "?").toUpperCase();
      fallback.textContent = initial;

      img.onerror = () => {
        img.style.display = "none";
        fallback.style.display = "block";
      };

      iconWrapper.appendChild(img);
      iconWrapper.appendChild(fallback);
      item.appendChild(iconWrapper);

      // Name
      const nameSpan = document.createElement("span");
      nameSpan.className = "shortcut-name";
      nameSpan.textContent = sc.name;
      item.appendChild(nameSpan);

      container.appendChild(item);
    });

    // 2. "+" placeholder if fewer than 6
    if (shortcuts.length < 6) {
      const addBtn = document.createElement("button");
      addBtn.className = "shortcut-item shortcut-add";
      addBtn.id = "add-shortcut-btn";
      const labelText = t.addShortcut || "Add shortcut";
      addBtn.setAttribute("aria-label", labelText);
      addBtn.setAttribute("title", labelText);

      const iconWrapper = document.createElement("div");
      iconWrapper.className = "shortcut-icon-wrapper";

      const icon = document.createElement("img");
      icon.className = "shortcut-add-icon";
      icon.src = "assets/icons/new-window.svg";
      icon.alt = "+";
      iconWrapper.appendChild(icon);
      addBtn.appendChild(iconWrapper);

      const nameSpan = document.createElement("span");
      nameSpan.className = "shortcut-name";
      nameSpan.textContent = labelText;
      addBtn.appendChild(nameSpan);

      container.appendChild(addBtn);
    }
  });
}

// Modal elements
const shortcutModal = document.getElementById("shortcut-modal");
const shortcutNameInput = document.getElementById("shortcut-name-input") as HTMLInputElement | null;
const shortcutUrlInput = document.getElementById("shortcut-url-input") as HTMLInputElement | null;
const cancelShortcutBtn = document.getElementById("cancel-shortcut-btn");
const confirmShortcutBtn = document.getElementById("confirm-shortcut-btn");
const closeShortcutModalBtn = document.getElementById("close-shortcut-modal");

function openShortcutModal(): void {
  if (!shortcutModal) return;
  if (shortcutNameInput) shortcutNameInput.value = "";
  if (shortcutUrlInput) shortcutUrlInput.value = "";
  shortcutModal.style.display = "flex";
  setTimeout(() => {
    shortcutUrlInput?.focus();
  }, 60);
}

function closeShortcutModal(): void {
  if (!shortcutModal) return;
  shortcutModal.style.display = "none";
}

function handleAddShortcut(): void {
  const rawUrl = shortcutUrlInput?.value.trim() || "";
  let rawName = shortcutNameInput?.value.trim() || "";

  if (!rawUrl) {
    shortcutUrlInput?.focus();
    return;
  }

  let formattedUrl = rawUrl;
  if (!/^(https?|view-source):\/\//i.test(formattedUrl)) {
    formattedUrl = `https://${formattedUrl}`;
  }

  if (!rawName) {
    try {
      const u = new URL(formattedUrl);
      const hostPart = u.hostname.replace(/^www\./, "").split(".")[0];
      rawName = hostPart ? hostPart.charAt(0).toUpperCase() + hostPart.slice(1) : extractDomain(formattedUrl);
    } catch {
      rawName = extractDomain(formattedUrl);
    }
  }

  const list = loadShortcuts();
  if (list.length < 6) {
    list.push({ name: rawName, url: formattedUrl });
    saveShortcuts(list);
    renderShortcuts();
  }
  closeShortcutModal();
}

if (cancelShortcutBtn) cancelShortcutBtn.addEventListener("click", closeShortcutModal);
if (closeShortcutModalBtn) closeShortcutModalBtn.addEventListener("click", closeShortcutModal);
if (confirmShortcutBtn) confirmShortcutBtn.addEventListener("click", handleAddShortcut);

if (shortcutModal) {
  shortcutModal.addEventListener("click", (e) => {
    if (e.target === shortcutModal) {
      closeShortcutModal();
    }
  });
}

[shortcutNameInput, shortcutUrlInput].forEach((inp) => {
  inp?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddShortcut();
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeShortcutModal();
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && shortcutModal && shortcutModal.style.display !== "none") {
    closeShortcutModal();
  }
});

// Delegated click handling on webviewContainer
if (webviewContainer) {
  webviewContainer.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    // Delete button clicked
    const delBtn = target.closest<HTMLButtonElement>(".shortcut-delete");
    if (delBtn) {
      e.stopPropagation();
      e.preventDefault();
      const item = delBtn.closest<HTMLElement>(".shortcut-item");
      if (item && item.dataset.index !== undefined) {
        const idx = parseInt(item.dataset.index, 10);
        const list = loadShortcuts();
        if (!isNaN(idx) && idx >= 0 && idx < list.length) {
          list.splice(idx, 1);
          saveShortcuts(list);
          renderShortcuts();
        }
      }
      return;
    }

    // Add button clicked
    const addBtn = target.closest<HTMLElement>(".shortcut-add");
    if (addBtn) {
      e.stopPropagation();
      e.preventDefault();
      openShortcutModal();
      return;
    }

    // Shortcut item clicked (navigate in same tab)
    const shortcutItem = target.closest<HTMLElement>(".shortcut-item");
    if (shortcutItem && shortcutItem.dataset.url) {
      e.stopPropagation();
      e.preventDefault();
      const isRightPane = !!shortcutItem.closest("#home-view-right");
      if (splitMode && isRightPane) {
        const rightTab = tabs.find((t) => t.id === rightTabId);
        if (rightTab) navigateTab(rightTab, resolveURL(shortcutItem.dataset.url));
      } else {
        navigateTo(resolveURL(shortcutItem.dataset.url));
      }
      return;
    }
  });
}

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

let homeViewRight: HTMLElement | null = null;
function getHomeViewRight(): HTMLElement {
  if (!homeViewRight && homeView) {
    homeViewRight = homeView.cloneNode(true) as HTMLElement;
    homeViewRight.id = "home-view-right";
    const input = homeViewRight.querySelector("input");
    const btn = homeViewRight.querySelector("button");
    const doGo = () => {
      const val = input?.value.trim();
      if (!val) return;
      const rightTab = tabs.find((t) => t.id === rightTabId);
      if (rightTab) navigateTab(rightTab, resolveURL(val));
    };
    btn?.addEventListener("click", doGo);
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doGo();
    });
    if (webviewContainer) webviewContainer.appendChild(homeViewRight);
    renderShortcuts();
  }
  return homeViewRight!;
}

function applyLayout() {
  if (!webviewContainer) return;
  if (splitMode) {
    if (splitDivider) {
      splitDivider.style.display = "block";
      splitDivider.style.left = (splitRatio * 100) + "%";
    }
    if (leftToolbar) {
      leftToolbar.style.left = "0px";
      leftToolbar.style.right = "auto";
      leftToolbar.style.width = (splitRatio * 100) + "%";
    }
    if (rightToolbar) {
      rightToolbar.style.left = (splitRatio * 100) + "%";
      rightToolbar.style.right = "auto";
      rightToolbar.style.width = ((1 - splitRatio) * 100) + "%";
    }
    tabs.forEach((t) => {
      const isLeft = t.id === leftTabId;
      const isRight = t.id === rightTabId;
      if (isLeft || isRight) {
        t.webview.style.display = "flex";
        t.webview.style.visibility = "visible";
        t.webview.style.pointerEvents = draggingDivider ? "none" : "auto";
        t.webview.style.zIndex = "2";
        t.webview.style.top = "44px";
        t.webview.style.bottom = "0px";
        t.webview.style.height = "calc(100% - 44px)";
        if (isLeft) {
          t.webview.style.left = "0px";
          t.webview.style.right = "auto";
          t.webview.style.width = (splitRatio * 100) + "%";
        } else {
          t.webview.style.left = (splitRatio * 100) + "%";
          t.webview.style.right = "auto";
          t.webview.style.width = ((1 - splitRatio) * 100) + "%";
        }
      } else {
        t.webview.style.display = "none";
      }
    });

    const leftTab = tabs.find((t) => t.id === leftTabId);
    const rightTab = tabs.find((t) => t.id === rightTabId);
    const isLeftHome = !!leftTab && isHomeUrl(leftTab.url);
    const isRightHome = !!rightTab && isHomeUrl(rightTab.url);

    if (isLeftHome && homeView) {
      homeView.style.display = "flex";
      homeView.style.position = "absolute";
      homeView.style.top = "44px";
      homeView.style.bottom = "0px";
      homeView.style.left = "0px";
      homeView.style.right = "auto";
      homeView.style.width = (splitRatio * 100) + "%";
      homeView.style.height = "calc(100% - 44px)";
      homeView.style.zIndex = "3";
    } else if (!isLeftHome && !isRightHome && homeView) {
      homeView.style.display = "none";
    }

    if (isRightHome) {
      if (!isLeftHome && homeView) {
        homeView.style.display = "flex";
        homeView.style.position = "absolute";
        homeView.style.top = "44px";
        homeView.style.bottom = "0px";
        homeView.style.left = (splitRatio * 100) + "%";
        homeView.style.right = "auto";
        homeView.style.width = ((1 - splitRatio) * 100) + "%";
        homeView.style.height = "calc(100% - 44px)";
        homeView.style.zIndex = "3";
        if (homeViewRight) homeViewRight.style.display = "none";
      } else {
        const hvRight = getHomeViewRight();
        hvRight.style.display = "flex";
        hvRight.style.position = "absolute";
        hvRight.style.top = "44px";
        hvRight.style.bottom = "0px";
        hvRight.style.left = (splitRatio * 100) + "%";
        hvRight.style.right = "auto";
        hvRight.style.width = ((1 - splitRatio) * 100) + "%";
        hvRight.style.height = "calc(100% - 44px)";
        hvRight.style.zIndex = "3";
      }
    } else if (homeViewRight) {
      homeViewRight.style.display = "none";
    }

    if (historyView) historyView.style.display = "none";
    if (favoritesView) favoritesView.style.display = "none";
    if (documentsView) documentsView.style.display = "none";
    if (sheetsView) sheetsView.style.display = "none";
    if (presentationsView) presentationsView.style.display = "none";
  } else {
    if (splitDivider) splitDivider.style.display = "none";
    if (homeViewRight) homeViewRight.style.display = "none";
    [homeView, historyView, favoritesView, documentsView, sheetsView, presentationsView].forEach((v) => {
      if (v) {
        v.style.left = "";
        v.style.top = "";
        v.style.width = "";
        v.style.height = "";
        v.style.right = "";
        v.style.bottom = "";
        v.style.position = "";
      }
    });
    tabs.forEach((t) => {
      const isActive = t.id === activeTabId;
      t.webview.style.display = "flex";
      t.webview.style.visibility = isActive ? "visible" : "hidden";
      t.webview.style.zIndex = isActive ? "2" : "0";
      t.webview.style.pointerEvents = isActive ? "auto" : "none";
      t.webview.style.left = "0px";
      t.webview.style.top = "0px";
      t.webview.style.right = "0px";
      t.webview.style.bottom = "0px";
      t.webview.style.width = "100%";
      t.webview.style.height = "100%";
    });
    const tab = tabs.find((t) => t.id === activeTabId);
    syncInternalView(tab ? tab.url : "");
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

  bar.addEventListener("mousedown", () => {
    focusedPane = side;
    activeTabId = side === "left" ? leftTabId : rightTabId;
    tabs.forEach((t) => updateTabUI(t));
  });

  input.addEventListener("focus", () => {
    focusedPane = side;
    activeTabId = side === "left" ? leftTabId : rightTabId;
    tabs.forEach((t) => updateTabUI(t));
  });

  input.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    focusedPane = side;
    activeTabId = side === "left" ? leftTabId : rightTabId;
    tabs.forEach((t) => updateTabUI(t));
    const hasSelection = (input.selectionEnd ?? 0) > (input.selectionStart ?? 0);
    almaAPI?.showAddressContextMenu({ hasSelection });
  });

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
      toggleFavorite(tab.url, tab.title);
    }
    updateFavoriteButtons();
  });

  // sync input and buttons when tab changes
  (bar as any)._sync = () => {
    const tab = getTab();
    if (tab) {
      input.value = isHomeUrl(tab.url) ? "" : tab.url;
      try {
        if (typeof tab.webview?.canGoBack === "function") {
          const canBack = tab.webview.canGoBack();
          backB.disabled = !canBack;
          backB.style.opacity = canBack ? "1" : "0.5";
        }
        if (typeof tab.webview?.canGoForward === "function") {
          const canFwd = tab.webview.canGoForward();
          fwdB.disabled = !canFwd;
          fwdB.style.opacity = canFwd ? "1" : "0.5";
        }
      } catch {
        // ignore
      }
    }
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
    toggleFavorite(tab.url, tab.title);
    updateFavoriteButtons();
  });
}

if (splitBtn) {
  splitBtn.addEventListener("click", () => {
    if (splitMode) disableSplitMode();
    else enableSplitMode();
  });
}

function startDividerDrag(e: MouseEvent | PointerEvent) {
  if (!splitMode) return;
  draggingDivider = true;
  if (splitDivider) {
    splitDivider.classList.add("dragging");
    try {
      if ("setPointerCapture" in splitDivider && "pointerId" in e) {
        splitDivider.setPointerCapture((e as PointerEvent).pointerId);
      }
    } catch {
      // ignore
    }
  }
  if (!dragOverlayEl) {
    dragOverlayEl = document.createElement("div");
    dragOverlayEl.id = "split-drag-overlay";
    dragOverlayEl.style.position = "fixed";
    dragOverlayEl.style.inset = "0";
    dragOverlayEl.style.zIndex = "999999";
    dragOverlayEl.style.cursor = "col-resize";
    dragOverlayEl.style.userSelect = "none";
    document.body.appendChild(dragOverlayEl);
  }
  document.querySelectorAll("webview").forEach((wv) => {
    (wv as HTMLElement).style.pointerEvents = "none";
  });
}

function updateDividerDrag(clientX: number) {
  if (!draggingDivider || !splitMode || !webviewContainer) return;
  const rect = webviewContainer.getBoundingClientRect();
  let ratio = (clientX - rect.left) / rect.width;
  ratio = Math.min(0.85, Math.max(0.15, ratio));
  splitRatio = ratio;
  try {
    localStorage.setItem("alma:splitRatio", String(splitRatio));
  } catch {
    // ignore
  }
  applyLayout();
}

function stopDividerDrag(e?: MouseEvent | PointerEvent) {
  if (!draggingDivider) return;
  draggingDivider = false;
  if (splitDivider) {
    splitDivider.classList.remove("dragging");
    try {
      if (e && "releasePointerCapture" in splitDivider && "pointerId" in e) {
        splitDivider.releasePointerCapture((e as PointerEvent).pointerId);
      }
    } catch {
      // ignore
    }
  }
  if (dragOverlayEl) {
    dragOverlayEl.remove();
    dragOverlayEl = null;
  }
  document.querySelectorAll("webview").forEach((wv) => {
    (wv as HTMLElement).style.pointerEvents = "auto";
  });
}

if (splitDivider) {
  splitDivider.addEventListener("pointerdown", (e: PointerEvent) => {
    e.preventDefault();
    startDividerDrag(e);
  });
  splitDivider.addEventListener("mousedown", (e: MouseEvent) => {
    e.preventDefault();
    startDividerDrag(e);
  });

  window.addEventListener("pointermove", (e: PointerEvent) => {
    if (draggingDivider) {
      e.preventDefault();
      updateDividerDrag(e.clientX);
    }
  });
  window.addEventListener("mousemove", (e: MouseEvent) => {
    if (draggingDivider) {
      e.preventDefault();
      updateDividerDrag(e.clientX);
    }
  });

  window.addEventListener("pointerup", (e: PointerEvent) => {
    stopDividerDrag(e);
  });
  window.addEventListener("pointercancel", (e: PointerEvent) => {
    stopDividerDrag(e);
  });
  window.addEventListener("mouseup", (e: MouseEvent) => {
    stopDividerDrag(e);
  });
}

if (webviewContainer) {
  webviewContainer.addEventListener("mousedown", (e) => {
    if (!splitMode) return;
    const rect = webviewContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    focusedPane = x < splitRatio * rect.width ? "left" : "right";
    activeTabId = focusedPane === "left" ? leftTabId : rightTabId;
    tabs.forEach((t) => updateTabUI(t));
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
  const url = payload?.url || HOME_URL;
  const newTab = createTab(HOME_URL, false);
  newTab.title = payload?.title || friendlyTabTitle(url);
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
  // Navigate to the actual URL (not home) after switching
  if (!isHomeUrl(url)) {
    navigateTab(newTab, url);
  }
  persistTabs();
  return true;
};

renderFavorites();
updateFavoriteButtons();

// ---- Native apps launcher wiring ----
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  const appsBtn = target.closest(".apps-btn");
  if (appsBtn) {
    e.stopPropagation();
    const topBar = appsBtn.closest(".home-top-bar");
    const panel = topBar?.querySelector(".apps-panel") as HTMLElement | null;
    if (panel) {
      const isVisible = panel.style.display !== "none";
      panel.style.display = isVisible ? "none" : "block";
    }
    return;
  }

  const appItem = target.closest(".app-item") as HTMLElement | null;
  if (appItem) {
    e.stopPropagation();
    const appType = appItem.getAttribute("data-app");
    const panel = appItem.closest(".apps-panel") as HTMLElement | null;
    if (panel) panel.style.display = "none";

    let targetUrl = HOME_URL;
    if (appType === "documents") targetUrl = DOCUMENTS_URL;
    else if (appType === "sheets") targetUrl = SHEETS_URL;
    else if (appType === "presentations") targetUrl = PRESENTATIONS_URL;

    const inRightPane = !!appItem.closest("#home-view-right");
    if (splitMode && inRightPane) {
      const rightTab = tabs.find((t) => t.id === rightTabId);
      if (rightTab) navigateTab(rightTab, targetUrl);
    } else {
      navigateTo(targetUrl);
    }
    return;
  }

  // Click outside closes any open apps panels
  document.querySelectorAll<HTMLElement>(".apps-panel").forEach((p) => {
    if (!p.contains(target)) {
      p.style.display = "none";
    }
  });
});

// ---- Language panel ----
const langPanel = document.getElementById("language-panel");
const langSettingsBtn = document.getElementById("lang-settings-btn");
const closeLangBtn = document.getElementById("close-language");

if (langSettingsBtn && langPanel) {
  langSettingsBtn.addEventListener("click", () => {
    const open = langPanel.style.display === "none";
    langPanel.style.display = open ? "flex" : "none";
    if (settingsPanel) settingsPanel.style.display = "none";
    const fp = document.getElementById("favorites-panel");
    if (fp) fp.style.display = "none";
    const tp = document.getElementById("themes-panel");
    if (tp) tp.style.display = "none";
  });
}
if (closeLangBtn && langPanel) {
  closeLangBtn.addEventListener("click", () => { langPanel.style.display = "none"; });
}
document.querySelectorAll<HTMLButtonElement>(".lang-option").forEach(btn => {
  btn.addEventListener("click", () => {
    saveLang(btn.dataset.lang as LangSetting);
    applyLocale();
  });
});

// Apply locale on load
applyLocale();

// Initial restore or clean new window tab
const urlParams = new URLSearchParams(window.location.search);
const isNewWindow = urlParams.get("newWindow") === "1";
if (isNewWindow) {
  // Always open a fresh home tab - ignore the file:// initialUrl from main
  // because the renderer HOME_URL constant is what drives the home view overlay
  createTab(HOME_URL, true);
} else {
  restoreTabs();
}
