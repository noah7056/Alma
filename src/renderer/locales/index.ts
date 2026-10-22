export type Locale = {
  back: string; forward: string; reload: string; home: string;
  newWindow: string; newTab: string; go: string; searchOrUrl: string;
  history: string; themes: string; favorites: string;
  restoreSessionOn: string; restoreSessionOff: string; language: string;
  themesTitle: string; mode: string; light: string; dark: string;
  accent: string; homeBackground: string; chooseImage: string;
  favoritesTitle: string; openFavoritesPage: string;
  historyTitle: string; clearHistory: string; clearFavorites: string;
  subtitle: string; languageTitle: string; systemLanguage: string;
  remove: string;
  addShortcut: string; shortcutName: string; shortcutLink: string;
  cancel: string; confirm: string;
  folder: string; link: string;
  documents: string; sheets: string; presentations: string;
  newDocument: string; newSheet: string; newPresentation: string;
  docsSubtitle: string; sheetsSubtitle: string; presentationsSubtitle: string;
  docsReady: string; untitledDocument: string; startWriting: string;
  export: string; exportAs: string; exportPDF: string; exportText: string;
  exportHTML: string; exportMarkdown: string;
  rename: string; delete: string; deleteConfirm: string;
  saved: string; saving: string;
  noDocuments: string; oneDocument: string; manyDocuments: string;
  apps: string; shortcuts: string; noHistory: string;
  historySubtitle: string; favoritesSubtitle: string;
  searchDocuments: string; noResults: string; noResultsHint: string;
  emptyTitle: string; emptyText: string;
  word: string; words: string;
  undo: string; redo: string;
  paragraph: string; heading1: string; heading2: string; heading3: string;
  quote: string; codeBlock: string;
  font: string; size: string;
  strike: string; textColor: string; highlight: string;
  alignLeft: string; alignCenter: string; alignRight: string; alignJustify: string;
  bulletedList: string; numberedList: string;
  insertLink: string; insertDivider: string; clearFormatting: string;
  linkDialogTitle: string; linkUrlLabel: string; linkTextLabel: string;
  linkRemove: string; insert: string;
  sheetsReady: string; presentationsReady: string;
  untitledSpreadsheet: string; searchSpreadsheets: string;
  oneSpreadsheet: string; manySpreadsheets: string;
  noSpreadsheets: string; noMatchingSpreadsheets: string;
  emptySheetsTitle: string; emptySheetsText: string;
  deleteSpreadsheetConfirm: string;
  addSheet: string; renameSheet: string; deleteSheet: string; sheetName: string;
  insertRowAbove: string; insertColumnLeft: string; deleteRow: string; deleteColumn: string;
  numberFormat: string;
  fmtGeneral: string; fmtNumber: string; fmtThousands: string;
  fmtPercent: string; fmtCurrency: string; fmtScientific: string;
  bold: string; italic: string; underline: string; fillColor: string;
  sum: string; average: string; count: string; min: string; max: string;
  exportCSV: string; exportTSV: string; exportJSON: string;
  sheetTab: string;
};

export type LangCode = "en" | "it" | "zh";
export type LangSetting = LangCode | "system";

const en: Locale = {
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
  untitledDocument: "Untitled Document", startWriting: "Start writing...",
  export: "Export", exportAs: "Export as", exportPDF: "PDF",
  exportText: "Plain Text (.txt)", exportHTML: "HTML (.html)",
  exportMarkdown: "Markdown (.md)",
  rename: "Rename", delete: "Delete",
  deleteConfirm: "Delete this document? This cannot be undone.",
  saved: "Saved", saving: "Saving…",
  noDocuments: "No documents yet. Create one to get started.",
  oneDocument: "1 document", manyDocuments: "documents",
  apps: "Apps", shortcuts: "Shortcuts", noHistory: "Nothing here yet",
  historySubtitle: "Pages you have visited", favoritesSubtitle: "Links you saved",
  searchDocuments: "Search documents", noResults: "No matching documents",
  noResultsHint: "Try a different search term.",
  emptyTitle: "No documents yet", emptyText: "Create your first document to get started.",
  word: "word", words: "words",
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

const it: Locale = {
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
  untitledDocument: "Documento Senza Titolo", startWriting: "Inizia a scrivere...",
  export: "Esporta", exportAs: "Esporta come", exportPDF: "PDF",
  exportText: "Testo semplice (.txt)", exportHTML: "HTML (.html)",
  exportMarkdown: "Markdown (.md)",
  rename: "Rinomina", delete: "Elimina",
  deleteConfirm: "Eliminare questo documento? L'operazione non può essere annullata.",
  saved: "Salvato", saving: "Salvataggio…",
  noDocuments: "Nessun documento ancora. Creane uno per iniziare.",
  oneDocument: "1 documento", manyDocuments: "documenti",
  apps: "App", shortcuts: "Scorciatoie", noHistory: "Ancora niente",
  historySubtitle: "Pagine visitate", favoritesSubtitle: "Link salvati",
  searchDocuments: "Cerca documenti", noResults: "Nessun documento corrispondente",
  noResultsHint: "Prova con un altro termine di ricerca.",
  emptyTitle: "Nessun documento", emptyText: "Crea il tuo primo documento per iniziare.",
  word: "parola", words: "parole",
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

const zh: Locale = {
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
  untitledDocument: "未命名文档", startWriting: "开始编写...",
  export: "导出", exportAs: "导出为", exportPDF: "PDF",
  exportText: "纯文本 (.txt)", exportHTML: "HTML (.html)",
  exportMarkdown: "Markdown (.md)",
  rename: "重命名", delete: "删除",
  deleteConfirm: "删除此文档？此操作无法撤销。",
  saved: "已保存", saving: "保存中…",
  noDocuments: "暂无文档。创建一个以开始。",
  oneDocument: "1 份文档", manyDocuments: "份文档",
  apps: "应用", shortcuts: "快捷方式", noHistory: "暂无记录",
  historySubtitle: "您访问过的页面", favoritesSubtitle: "您保存的链接",
  searchDocuments: "搜索文档", noResults: "没有匹配的文档",
  noResultsHint: "请尝试其他搜索词。",
  emptyTitle: "暂无文档", emptyText: "创建你的第一个文档以开始。",
  word: "字", words: "字",
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

export const locales: Record<LangCode, Locale> = { en, it, zh };

export const LANG_NAMES: Record<LangSetting, string> = {
  system: "System (auto)", en: "English", it: "Italiano", zh: "中文",
};

const STORAGE_KEY = "alma:lang";

export function getSavedLang(): LangSetting {
  return (localStorage.getItem(STORAGE_KEY) as LangSetting) ?? "system";
}

export function saveLang(lang: LangSetting): void {
  localStorage.setItem(STORAGE_KEY, lang);
}

function detectSystemLang(): LangCode {
  const nav = navigator.language?.toLowerCase() ?? "en";
  if (nav.startsWith("it")) return "it";
  if (nav.startsWith("zh")) return "zh";
  return "en";
}

export function resolveLocale(): { lang: LangCode; locale: Locale } {
  const saved = getSavedLang();
  const lang: LangCode = saved === "system" ? detectSystemLang() : saved;
  return { lang, locale: locales[lang] };
}
