/**
 * Alma Presentations — a PowerPoint / Google Slides style deck editor.
 *
 * The module owns its own state (the list of decks, the open deck, the selected
 * slide and element) and persists it to localStorage, the same way the Documents
 * and Sheets workspaces do. renderer.ts drives it through the `presentationsApp`
 * facade at the bottom of this file.
 */

export type PresLang = "en" | "it" | "zh";

type SlideLayout = "title" | "title-body" | "title-only" | "blank" | "two-content" | "section";
type ElementType = "text" | "rect" | "ellipse" | "triangle" | "image";
type TextAlign = "left" | "center" | "right";
type VerticalAlign = "top" | "middle" | "bottom";

interface SlideElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string;
  align: TextAlign;
  valign: VerticalAlign;
  fill: string;
  bullet: boolean;
  radius: number;
  src: string;
  placeholder: "title" | "body" | "subtitle" | "";
}

interface Slide {
  id: string;
  layout: SlideLayout;
  background: string;
  elements: SlideElement[];
}

interface Presentation {
  id: string;
  title: string;
  slides: Slide[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "alma:presentations";
const SLIDE_W = 1280;
const SLIDE_H = 720;
const DEFAULT_TEXT = "#1d1d1f";
const DEFAULT_FILL = "#4c8dff";

// ---- Strings ----

interface PresStrings {
  appName: string;
  newPresentation: string;
  onePresentation: string;
  manyPresentations: string;
  searchPresentations: string;
  noPresentations: string;
  noMatchingPresentations: string;
  emptyTitle: string;
  emptyText: string;
  noResultsHint: string;
  rename: string;
  delete: string;
  deleteConfirm: string;
  cancel: string;
  backToList: string;
  slides: string;
  slide: string;
  slideOf: string;
  newSlide: string;
  duplicateSlide: string;
  deleteSlide: string;
  untitledPresentation: string;
  layout: string;
  layoutTitle: string;
  layoutTitleBody: string;
  layoutTitleOnly: string;
  layoutBlank: string;
  layoutTwoContent: string;
  layoutSection: string;
  insertText: string;
  insertRectangle: string;
  insertEllipse: string;
  insertImage: string;
  bold: string;
  italic: string;
  underline: string;
  bulletedList: string;
  textColor: string;
  fillColor: string;
  alignLeft: string;
  alignCenter: string;
  alignRight: string;
  bringToFront: string;
  sendToBack: string;
  duplicate: string;
  undo: string;
  redo: string;
  present: string;
  exitPresent: string;
  export: string;
  exportPDF: string;
  exportHTML: string;
  exportJSON: string;
  zoomIn: string;
  zoomOut: string;
  fit: string;
  properties: string;
  position: string;
  size: string;
  fontSize: string;
  alignment: string;
  text: string;
  placeholderTitle: string;
  placeholderBody: string;
  placeholderSubtitle: string;
  layer: string;
  background: string;
  slideLayout: string;
  noSelection: string;
  saved: string;
  saving: string;
}

const STRINGS: Record<PresLang, PresStrings> = {
  en: {
    appName: "Presentations",
    newPresentation: "New presentation",
    onePresentation: "1 presentation",
    manyPresentations: "presentations",
    searchPresentations: "Search presentations",
    noPresentations: "No presentations yet. Create one to get started.",
    noMatchingPresentations: "No matching presentations",
    emptyTitle: "No presentations yet",
    emptyText: "Create your first presentation to get started.",
    noResultsHint: "Try a different search term.",
    rename: "Rename",
    delete: "Delete",
    deleteConfirm: "Delete this presentation? This cannot be undone.",
    cancel: "Cancel",
    backToList: "Back to presentations",
    slides: "Slides",
    slide: "Slide",
    slideOf: "Slide {n} of {m}",
    newSlide: "New slide",
    duplicateSlide: "Duplicate slide",
    deleteSlide: "Delete slide",
    untitledPresentation: "Untitled presentation",
    layout: "Layout",
    layoutTitle: "Title slide",
    layoutTitleBody: "Title and body",
    layoutTitleOnly: "Title only",
    layoutBlank: "Blank",
    layoutTwoContent: "Title and two columns",
    layoutSection: "Section header",
    insertText: "Insert text",
    insertRectangle: "Insert rectangle",
    insertEllipse: "Insert ellipse",
    insertImage: "Insert image",
    bold: "Bold",
    italic: "Italic",
    underline: "Underline",
    bulletedList: "Bulleted list",
    textColor: "Text color",
    fillColor: "Fill color",
    alignLeft: "Align left",
    alignCenter: "Align center",
    alignRight: "Align right",
    bringToFront: "Bring to front",
    sendToBack: "Send to back",
    duplicate: "Duplicate",
    undo: "Undo",
    redo: "Redo",
    present: "Present",
    exitPresent: "Exit presentation",
    export: "Export",
    exportPDF: "PDF",
    exportHTML: "HTML (.html)",
    exportJSON: "JSON (.json)",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    fit: "Fit",
    properties: "Properties",
    position: "Position",
    size: "Size",
    fontSize: "Font size",
    alignment: "Alignment",
    text: "Text",
    placeholderTitle: "Click to add title",
    placeholderBody: "Click to add text",
    placeholderSubtitle: "Click to add subtitle",
    layer: "Layer",
    background: "Background",
    slideLayout: "Slide layout",
    noSelection: "Select an element to edit its properties.",
    saved: "Saved",
    saving: "Saving…",
  },
  it: {
    appName: "Presentations",
    newPresentation: "Nuova presentazione",
    onePresentation: "1 presentazione",
    manyPresentations: "presentazioni",
    searchPresentations: "Cerca presentazioni",
    noPresentations: "Nessuna presentazione ancora. Creane una per iniziare.",
    noMatchingPresentations: "Nessuna presentazione corrispondente",
    emptyTitle: "Nessuna presentazione",
    emptyText: "Crea la tua prima presentazione per iniziare.",
    noResultsHint: "Prova con un altro termine di ricerca.",
    rename: "Rinomina",
    delete: "Elimina",
    deleteConfirm: "Eliminare questa presentazione? L'operazione non può essere annullata.",
    cancel: "Annulla",
    backToList: "Torna alle presentazioni",
    slides: "Diapositive",
    slide: "Diapositiva",
    slideOf: "Diapositiva {n} di {m}",
    newSlide: "Nuova diapositiva",
    duplicateSlide: "Duplica diapositiva",
    deleteSlide: "Elimina diapositiva",
    untitledPresentation: "Presentazione Senza Titolo",
    layout: "Layout",
    layoutTitle: "Diapositiva del titolo",
    layoutTitleBody: "Titolo e testo",
    layoutTitleOnly: "Solo titolo",
    layoutBlank: "Vuota",
    layoutTwoContent: "Titolo e due colonne",
    layoutSection: "Intestazione di sezione",
    insertText: "Inserisci testo",
    insertRectangle: "Inserisci rettangolo",
    insertEllipse: "Inserisci ellisse",
    insertImage: "Inserisci immagine",
    bold: "Grassetto",
    italic: "Corsivo",
    underline: "Sottolineato",
    bulletedList: "Elenco puntato",
    textColor: "Colore del testo",
    fillColor: "Colore di riempimento",
    alignLeft: "Allinea a sinistra",
    alignCenter: "Allinea al centro",
    alignRight: "Allinea a destra",
    bringToFront: "Porta in primo piano",
    sendToBack: "Porta in secondo piano",
    duplicate: "Duplica",
    undo: "Annulla",
    redo: "Ripeti",
    present: "Presenta",
    exitPresent: "Esci dalla presentazione",
    export: "Esporta",
    exportPDF: "PDF",
    exportHTML: "HTML (.html)",
    exportJSON: "JSON (.json)",
    zoomIn: "Ingrandisci",
    zoomOut: "Riduci",
    fit: "Adatta",
    properties: "Proprietà",
    position: "Posizione",
    size: "Dimensione",
    fontSize: "Dimensione carattere",
    alignment: "Allineamento",
    text: "Testo",
    placeholderTitle: "Clicca per aggiungere il titolo",
    placeholderBody: "Clicca per aggiungere il testo",
    placeholderSubtitle: "Clicca per aggiungere il sottotitolo",
    layer: "Livello",
    background: "Sfondo",
    slideLayout: "Layout diapositiva",
    noSelection: "Seleziona un elemento per modificarne le proprietà.",
    saved: "Salvato",
    saving: "Salvataggio…",
  },
  zh: {
    appName: "Presentations",
    newPresentation: "新建演示文稿",
    onePresentation: "1 份演示文稿",
    manyPresentations: "份演示文稿",
    searchPresentations: "搜索演示文稿",
    noPresentations: "暂无演示文稿。创建一个以开始。",
    noMatchingPresentations: "没有匹配的演示文稿",
    emptyTitle: "暂无演示文稿",
    emptyText: "创建你的第一份演示文稿以开始。",
    noResultsHint: "请尝试其他搜索词。",
    rename: "重命名",
    delete: "删除",
    deleteConfirm: "删除此演示文稿？此操作无法撤销。",
    cancel: "取消",
    backToList: "返回演示文稿列表",
    slides: "幻灯片",
    slide: "幻灯片",
    slideOf: "幻灯片 {n} / {m}",
    newSlide: "新建幻灯片",
    duplicateSlide: "复制幻灯片",
    deleteSlide: "删除幻灯片",
    untitledPresentation: "未命名演示文稿",
    layout: "版式",
    layoutTitle: "标题幻灯片",
    layoutTitleBody: "标题和正文",
    layoutTitleOnly: "仅标题",
    layoutBlank: "空白",
    layoutTwoContent: "标题和双栏",
    layoutSection: "节标题",
    insertText: "插入文本",
    insertRectangle: "插入矩形",
    insertEllipse: "插入椭圆",
    insertImage: "插入图片",
    bold: "加粗",
    italic: "斜体",
    underline: "下划线",
    bulletedList: "项目符号",
    textColor: "文字颜色",
    fillColor: "填充颜色",
    alignLeft: "左对齐",
    alignCenter: "居中对齐",
    alignRight: "右对齐",
    bringToFront: "置于顶层",
    sendToBack: "置于底层",
    duplicate: "复制",
    undo: "撤销",
    redo: "重做",
    present: "播放",
    exitPresent: "退出播放",
    export: "导出",
    exportPDF: "PDF",
    exportHTML: "HTML (.html)",
    exportJSON: "JSON (.json)",
    zoomIn: "放大",
    zoomOut: "缩小",
    fit: "适应",
    properties: "属性",
    position: "位置",
    size: "尺寸",
    fontSize: "字号",
    alignment: "对齐",
    text: "文本",
    placeholderTitle: "点击添加标题",
    placeholderBody: "点击添加文本",
    placeholderSubtitle: "点击添加副标题",
    layer: "图层",
    background: "背景",
    slideLayout: "幻灯片版式",
    noSelection: "选择一个元素以编辑其属性。",
    saved: "已保存",
    saving: "保存中…",
  },
};

let lang: PresLang = "en";
function str(): PresStrings {
  return STRINGS[lang];
}

// ---- State ----

let decks: Presentation[] = [];
let activeDeckId: string | null = null;
let activeSlideIndex = 0;
let selectedElementId: string | null = null;
let editingElementId: string | null = null;
let undoStack: string[] = [];
let redoStack: string[] = [];
let searchQuery = "";
let zoomMode: "fit" | number = "fit";
let saveTimer: number | null = null;
let uiReady = false;

// ---- Small helpers ----

function uid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function el<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function viewEl(): HTMLElement | null {
  return el("presentations-view");
}

// ---- Model ----

function getDecks(): Presentation[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeDeck).filter(Boolean) as Presentation[];
  } catch {
    return [];
  }
}

function normalizeDeck(raw: any): Presentation | null {
  if (!raw || typeof raw !== "object" || !raw.id) return null;
  const slides: Slide[] = Array.isArray(raw.slides) && raw.slides.length
    ? raw.slides.map(normalizeSlide)
    : [makeSlide("title")];
  return {
    id: String(raw.id),
    title: typeof raw.title === "string" && raw.title.trim() ? raw.title : str().untitledPresentation,
    slides,
    createdAt: Number(raw.createdAt) || Date.now(),
    updatedAt: Number(raw.updatedAt) || Date.now(),
  };
}

function normalizeSlide(raw: any): Slide {
  const elements: SlideElement[] = Array.isArray(raw?.elements)
    ? raw.elements.map((e: any) => normalizeElement(e)).filter(Boolean) as SlideElement[]
    : [];
  return {
    id: typeof raw?.id === "string" ? raw.id : uid("slide"),
    layout: (["title", "title-body", "title-only", "blank", "two-content", "section"] as SlideLayout[]).includes(raw?.layout)
      ? raw.layout
      : "blank",
    background: typeof raw?.background === "string" ? raw.background : "#ffffff",
    elements,
  };
}

function normalizeElement(raw: any): SlideElement | null {
  if (!raw || typeof raw !== "object") return null;
  const type: ElementType = (["text", "rect", "ellipse", "triangle", "image"] as ElementType[]).includes(raw.type)
    ? raw.type
    : "text";
  return {
    id: typeof raw.id === "string" ? raw.id : uid("el"),
    type,
    x: Number(raw.x) || 0,
    y: Number(raw.y) || 0,
    w: Number(raw.w) || 200,
    h: Number(raw.h) || 80,
    text: typeof raw.text === "string" ? raw.text : "",
    fontSize: Number(raw.fontSize) || 24,
    bold: !!raw.bold,
    italic: !!raw.italic,
    underline: !!raw.underline,
    color: typeof raw.color === "string" ? raw.color : DEFAULT_TEXT,
    align: (["left", "center", "right"] as TextAlign[]).includes(raw.align) ? raw.align : "left",
    valign: (["top", "middle", "bottom"] as VerticalAlign[]).includes(raw.valign) ? raw.valign : "top",
    fill: typeof raw.fill === "string" ? raw.fill : DEFAULT_FILL,
    bullet: !!raw.bullet,
    radius: Number(raw.radius) || 0,
    src: typeof raw.src === "string" ? raw.src : "",
    placeholder: (["title", "body", "subtitle", ""] as const).includes(raw.placeholder) ? raw.placeholder : "",
  };
}

function makeElement(patch: Partial<SlideElement> & { type: ElementType }): SlideElement {
  return {
    id: uid("el"),
    type: patch.type,
    x: patch.x ?? 100,
    y: patch.y ?? 100,
    w: patch.w ?? 320,
    h: patch.h ?? 80,
    text: patch.text ?? "",
    fontSize: patch.fontSize ?? 24,
    bold: patch.bold ?? false,
    italic: patch.italic ?? false,
    underline: patch.underline ?? false,
    color: patch.color ?? DEFAULT_TEXT,
    align: patch.align ?? "left",
    valign: patch.valign ?? "top",
    fill: patch.fill ?? DEFAULT_FILL,
    bullet: patch.bullet ?? false,
    radius: patch.radius ?? 0,
    src: patch.src ?? "",
    placeholder: patch.placeholder ?? "",
  };
}

/** Elements a layout starts with, positioned on the 1280x720 slide. */
function layoutElements(layout: SlideLayout): SlideElement[] {
  switch (layout) {
    case "title":
      return [
        makeElement({ type: "text", x: 90, y: 250, w: 1100, h: 90, text: "", fontSize: 60, align: "center", valign: "middle", placeholder: "title" }),
        makeElement({ type: "text", x: 190, y: 350, w: 900, h: 60, text: "", fontSize: 26, align: "center", valign: "middle", color: "#6b6b70", placeholder: "subtitle" }),
      ];
    case "title-body":
      return [
        makeElement({ type: "text", x: 80, y: 60, w: 1120, h: 80, text: "", fontSize: 44, placeholder: "title" }),
        makeElement({ type: "text", x: 80, y: 180, w: 1120, h: 460, text: "", fontSize: 24, bullet: true, placeholder: "body" }),
      ];
    case "title-only":
      return [makeElement({ type: "text", x: 80, y: 60, w: 1120, h: 80, text: "", fontSize: 44, placeholder: "title" })];
    case "two-content":
      return [
        makeElement({ type: "text", x: 80, y: 60, w: 1120, h: 80, text: "", fontSize: 44, placeholder: "title" }),
        makeElement({ type: "text", x: 80, y: 190, w: 520, h: 440, text: "", fontSize: 22, bullet: true, placeholder: "body" }),
        makeElement({ type: "text", x: 680, y: 190, w: 520, h: 440, text: "", fontSize: 22, bullet: true, placeholder: "body" }),
      ];
    case "section":
      return [makeElement({ type: "text", x: 90, y: 300, w: 1100, h: 120, text: "", fontSize: 52, align: "center", valign: "middle", placeholder: "title" })];
    case "blank":
    default:
      return [];
  }
}

function makeSlide(layout: SlideLayout): Slide {
  return {
    id: uid("slide"),
    layout,
    background: "#ffffff",
    elements: layoutElements(layout),
  };
}

function makeDeck(): Presentation {
  const now = Date.now();
  return {
    id: uid("pres"),
    title: str().untitledPresentation,
    slides: [makeSlide("title")],
    createdAt: now,
    updatedAt: now,
  };
}

function currentDeck(): Presentation | null {
  if (!activeDeckId) return null;
  return decks.find((d) => d.id === activeDeckId) ?? null;
}

function currentSlide(): Slide | null {
  const deck = currentDeck();
  if (!deck || !deck.slides.length) return null;
  const index = Math.max(0, Math.min(activeSlideIndex, deck.slides.length - 1));
  return deck.slides[index];
}

function selectedElement(): SlideElement | null {
  const slide = currentSlide();
  if (!slide || !selectedElementId) return null;
  return slide.elements.find((e) => e.id === selectedElementId) ?? null;
}

// ---- Persistence ----

function persist(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  } catch {
    // ignore quota errors
  }
}

function scheduleSave(): void {
  setSaveState("saving");
  if (saveTimer !== null) clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    saveTimer = null;
    const deck = currentDeck();
    if (deck) deck.updatedAt = Date.now();
    persist();
    setSaveState("saved");
  }, 400);
}

function setSaveState(state: "saved" | "saving"): void {
  const dot = el("pres-status-dot");
  const label = el("pres-save-status");
  if (dot) dot.className = "status-dot " + state;
  if (label) label.textContent = state === "saving" ? str().saving : str().saved;
}

/** Writes any pending change to storage right away. */
function flushSave(): void {
  if (saveTimer !== null) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  persist();
  setSaveState("saved");
}

// ---- Undo / redo ----

function snapshot(): string {
  const deck = currentDeck();
  return deck ? JSON.stringify(deck) : "";
}

function pushUndo(): void {
  const snap = snapshot();
  if (!snap) return;
  undoStack.push(snap);
  if (undoStack.length > 80) undoStack.shift();
  redoStack = [];
}

function applySnapshot(snap: string): void {
  const parsed = JSON.parse(snap) as Presentation;
  const deck = currentDeck();
  if (!deck) return;
  deck.slides = parsed.slides;
  deck.title = parsed.title;
  selectedElementId = null;
  editingElementId = null;
  activeSlideIndex = Math.min(activeSlideIndex, deck.slides.length - 1);
  persist();
  renderEditor();
}

function undo(): void {
  if (!undoStack.length) return;
  const current = snapshot();
  const previous = undoStack.pop() as string;
  redoStack.push(current);
  applySnapshot(previous);
  updateUndoButtons();
}

function redo(): void {
  if (!redoStack.length) return;
  const current = snapshot();
  const next = redoStack.pop() as string;
  undoStack.push(current);
  applySnapshot(next);
  updateUndoButtons();
}

function updateUndoButtons(): void {
  const undoBtn = el<HTMLButtonElement>("pres-undo-btn");
  const redoBtn = el<HTMLButtonElement>("pres-redo-btn");
  if (undoBtn) undoBtn.disabled = undoStack.length === 0;
  if (redoBtn) redoBtn.disabled = redoStack.length === 0;
}

// ---- Rendering: list page ----

function formatDate(ts: number): string {
  const diff = Date.now() - ts;
  const minute = 60_000;
  const hour = 3_600_000;
  const day = 86_400_000;
  try {
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
    if (diff < minute) return rtf.format(0, "second");
    if (diff < hour) return rtf.format(-Math.round(diff / minute), "minute");
    if (diff < day) return rtf.format(-Math.round(diff / hour), "hour");
    if (diff < 7 * day) return rtf.format(-Math.round(diff / day), "day");
  } catch {
    // fall through
  }
  return new Date(ts).toLocaleDateString(lang, { month: "short", day: "numeric" });
}

const ALIGN_LEFT_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 10h10M4 14h16M4 18h10" /></svg>`;
const ALIGN_CENTER_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 10h10M4 14h16M7 18h10" /></svg>`;
const ALIGN_RIGHT_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M10 10h10M4 14h16M10 18h10" /></svg>`;
const LAYER_FRONT_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="12" height="12" rx="1" /><path d="M9 20h11V9" /></svg>`;
const LAYER_BACK_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="1" /><path d="M15 4H4v11" /></svg>`;
const DUPLICATE_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="1" /><path d="M16 8V4H4v12h4" /></svg>`;
const TRASH_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" /></svg>`;
const DECK_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M12 16v4M8 20h8"></path></svg>`;
const SEARCH_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.6-3.6"></path></svg>`;
const RENAME_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L18 10a2.83 2.83 0 0 0-4-4L4 16z"></path></svg>`;
const DELETE_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"></path><path d="M9 7V5h6v2"></path><path d="M6 7l1 13h10l1-13"></path></svg>`;

function renderDeckList(): void {
  const listEl = el("pres-list");
  const countEl = el("pres-list-count");
  if (!listEl || !countEl) return;

  const total = decks.length;
  countEl.textContent = total === 1 ? str().onePresentation : `${total} ${str().manyPresentations}`;

  const query = searchQuery.trim().toLowerCase();
  const visible = query ? decks.filter((d) => d.title.toLowerCase().includes(query)) : decks;

  if (!visible.length) {
    const noMatch = total > 0;
    listEl.innerHTML = `
      <div class="docs-list-empty">
        <div class="docs-empty-icon">${noMatch ? SEARCH_ICON_SVG : DECK_ICON_SVG}</div>
        <p class="docs-empty-title">${escapeHtml(noMatch ? str().noMatchingPresentations : str().emptyTitle)}</p>
        <p class="docs-empty-sub">${escapeHtml(noMatch ? str().noResultsHint : str().emptyText)}</p>
      </div>`;
    return;
  }

  listEl.innerHTML = visible
    .slice()
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .map(
      (deck) => `
      <div class="docs-item pres-deck-item${deck.id === activeDeckId ? " active" : ""}" data-deck-id="${deck.id}" role="listitem" tabindex="0">
        <div class="pres-deck-preview">${deck.slides.length ? slideHtml(deck.slides[0], true) : ""}</div>
        <div class="docs-item-body">
          <div class="docs-item-title">${escapeHtml(deck.title)}</div>
          <div class="docs-item-meta">${deck.slides.length} ${escapeHtml(str().slides.toLowerCase())} · ${escapeHtml(formatDate(deck.updatedAt))}</div>
        </div>
        <div class="docs-item-actions">
          <button class="docs-item-btn" data-action="rename" title="${escapeHtml(str().rename)}" aria-label="${escapeHtml(str().rename)}">${RENAME_ICON_SVG}</button>
          <button class="docs-item-btn danger" data-action="delete" title="${escapeHtml(str().delete)}" aria-label="${escapeHtml(str().delete)}">${DELETE_ICON_SVG}</button>
        </div>
      </div>`
    )
    .join("");

  syncPreviewScales();
}

/** Previews are rendered at slide size, then scaled down to fit their box. */
function syncPreviewScales(): void {
  const scale = (box: HTMLElement, canvas: HTMLElement | null) => {
    if (!canvas) return;
    const width = box.clientWidth;
    if (width > 0) canvas.style.transform = `scale(${width / SLIDE_W})`;
  };
  document.querySelectorAll<HTMLElement>(".pres-deck-preview").forEach((box) => {
    scale(box, box.querySelector<HTMLElement>(".pres-slide-canvas"));
  });
  document.querySelectorAll<HTMLElement>(".pres-thumb-canvas").forEach((box) => {
    scale(box, box.querySelector<HTMLElement>(".pres-slide-canvas"));
  });
}

// ---- Rendering: slide content ----

function valignToFlex(valign: VerticalAlign): string {
  if (valign === "middle") return "center";
  if (valign === "bottom") return "flex-end";
  return "flex-start";
}

function elementStyle(element: SlideElement): string {
  const parts = [
    `left:${element.x}px`,
    `top:${element.y}px`,
    `width:${element.w}px`,
    `height:${element.h}px`,
  ];
  if (element.type === "text") {
    parts.push(`font-size:${element.fontSize}px`);
    parts.push(`color:${element.color}`);
    parts.push(`text-align:${element.align}`);
    parts.push(`justify-content:${valignToFlex(element.valign)}`);
    if (element.bold) parts.push("font-weight:700");
    if (element.italic) parts.push("font-style:italic");
    parts.push(element.underline ? "text-decoration:underline" : "text-decoration:none");
  } else if (element.type === "image") {
    // image uses object-fit
  } else {
    parts.push(`background:${element.fill}`);
    if (element.type === "rect") parts.push(`border-radius:${element.radius}px`);
  }
  return parts.join(";");
}

function bulletHtml(text: string): string {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  if (!lines.length) return "";
  return lines.map((line) => `<div class="pres-bullet">${escapeHtml(line)}</div>`).join("");
}

function placeholderHint(element: SlideElement): string {
  if (element.placeholder === "title") return str().placeholderTitle;
  if (element.placeholder === "body") return str().placeholderBody;
  if (element.placeholder === "subtitle") return str().placeholderSubtitle;
  return "";
}

function elementHtml(element: SlideElement): string {
  const style = elementStyle(element);
  if (element.type === "text") {
    const content = element.bullet ? bulletHtml(element.text) : escapeHtml(element.text).replace(/\n/g, "<br>");
    const hint = element.text ? "" : ` data-placeholder="${escapeHtml(placeholderHint(element))}"`;
    return `<div class="pres-el pres-el-text${element.placeholder ? ` pres-ph-${element.placeholder}` : ""}" data-el-id="${element.id}" style="${style}"${hint}>${content}</div>`;
  }
  if (element.type === "image") {
    return `<div class="pres-el pres-el-image" data-el-id="${element.id}" style="${style}"><img src="${escapeHtml(element.src)}" alt="" /></div>`;
  }
  return `<div class="pres-el pres-el-shape pres-el-${element.type}" data-el-id="${element.id}" style="${style}"></div>`;
}

function slideHtml(slide: Slide, thumbnail = false): string {
  const inner = slide.elements.map(elementHtml).join("");
  return `<div class="pres-slide-canvas${thumbnail ? " is-thumb" : ""}" style="width:${SLIDE_W}px;height:${SLIDE_H}px;background:${escapeHtml(slide.background)}">${inner}</div>`;
}

// ---- Rendering: editor ----

function renderFilmstrip(): void {
  const strip = el("pres-filmstrip");
  const deck = currentDeck();
  if (!strip || !deck) return;
  strip.innerHTML = deck.slides
    .map(
      (slide, index) => `
      <div class="pres-thumb${index === activeSlideIndex ? " active" : ""}" data-index="${index}" draggable="true" role="option" aria-selected="${index === activeSlideIndex}">
        <div class="pres-thumb-canvas">${slideHtml(slide, true)}</div>
        <span class="pres-thumb-num">${index + 1}</span>
      </div>`
    )
    .join("");

  syncPreviewScales();
}

function renderCanvas(): void {
  const content = el("pres-canvas-content");
  const slide = currentSlide();
  if (!content || !slide) return;
  content.innerHTML = slide.elements.map(elementHtml).join("");
  const canvas = el("pres-canvas");
  if (canvas) canvas.style.background = slide.background;
}

function renderSelection(): void {
  const box = el("pres-selection");
  if (!box) return;
  const element = selectedElement();
  if (!element) {
    box.hidden = true;
    box.innerHTML = "";
    return;
  }
  box.hidden = false;
  box.style.left = `${element.x}px`;
  box.style.top = `${element.y}px`;
  box.style.width = `${element.w}px`;
  box.style.height = `${element.h}px`;
  const handles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"]
    .map((dir) => `<span class="pres-handle pres-handle-${dir}" data-handle="${dir}"></span>`)
    .join("");
  box.innerHTML = handles;
}

function renderInspector(): void {
  const panel = el("pres-inspector");
  if (!panel) return;
  const element = selectedElement();
  const deck = currentDeck();
  const slide = currentSlide();
  if (!deck || !slide) {
    panel.innerHTML = "";
    return;
  }

  if (!element) {
    panel.innerHTML = `
      <div class="pres-insp-title">${escapeHtml(str().slideLayout)}</div>
      <div class="pres-insp-row">
        <label for="pres-insp-bg">${escapeHtml(str().background)}</label>
        <input type="color" id="pres-insp-bg" value="${escapeHtml(slide.background)}" />
      </div>
      <div class="pres-insp-note">${escapeHtml(str().noSelection)}</div>`;
    const bg = el<HTMLInputElement>("pres-insp-bg");
    if (bg) {
      bg.addEventListener("input", () => {
        pushUndo();
        slide.background = bg.value;
        renderCanvas();
        renderFilmstrip();
        scheduleSave();
      });
    }
    return;
  }

  const isText = element.type === "text";
  const isShape = element.type === "rect" || element.type === "ellipse" || element.type === "triangle";
  panel.innerHTML = `
    <div class="pres-insp-title">${escapeHtml(str().properties)}</div>
    <div class="pres-insp-group">
      <div class="pres-insp-label">${escapeHtml(str().position)} &amp; ${escapeHtml(str().size)}</div>
      <div class="pres-insp-grid">
        <label>X<input type="number" data-insp="x" value="${Math.round(element.x)}" /></label>
        <label>Y<input type="number" data-insp="y" value="${Math.round(element.y)}" /></label>
        <label>W<input type="number" data-insp="w" value="${Math.round(element.w)}" /></label>
        <label>H<input type="number" data-insp="h" value="${Math.round(element.h)}" /></label>
      </div>
    </div>
    ${
      isText
        ? `<div class="pres-insp-group">
            <div class="pres-insp-label">${escapeHtml(str().text)}</div>
            <textarea class="pres-insp-textarea" data-insp="text" spellcheck="false">${escapeHtml(element.text)}</textarea>
            <div class="pres-insp-row">
              <label for="pres-insp-size">${escapeHtml(str().fontSize)}</label>
              <input type="number" id="pres-insp-size" data-insp="fontSize" value="${element.fontSize}" min="8" max="200" />
            </div>
            <div class="pres-insp-buttons">
              <button class="pres-insp-btn${element.bold ? " active" : ""}" data-insp-toggle="bold" title="${escapeHtml(str().bold)}"><strong>B</strong></button>
              <button class="pres-insp-btn${element.italic ? " active" : ""}" data-insp-toggle="italic" title="${escapeHtml(str().italic)}"><em>I</em></button>
              <button class="pres-insp-btn${element.underline ? " active" : ""}" data-insp-toggle="underline" title="${escapeHtml(str().underline)}"><span class="format-underline">U</span></button>
              <button class="pres-insp-btn${element.bullet ? " active" : ""}" data-insp-toggle="bullet" title="${escapeHtml(str().bulletedList)}">•</button>
            </div>
            <div class="pres-insp-row">
              <label for="pres-insp-color">${escapeHtml(str().textColor)}</label>
              <input type="color" id="pres-insp-color" data-insp="color" value="${escapeHtml(element.color)}" />
            </div>
            <div class="pres-insp-row">
              <label>${escapeHtml(str().alignment)}</label>
              <div class="pres-insp-buttons">
                <button class="pres-insp-btn${element.align === "left" ? " active" : ""}" data-insp-align="left" title="${escapeHtml(str().alignLeft)}">${ALIGN_LEFT_SVG}</button>
                <button class="pres-insp-btn${element.align === "center" ? " active" : ""}" data-insp-align="center" title="${escapeHtml(str().alignCenter)}">${ALIGN_CENTER_SVG}</button>
                <button class="pres-insp-btn${element.align === "right" ? " active" : ""}" data-insp-align="right" title="${escapeHtml(str().alignRight)}">${ALIGN_RIGHT_SVG}</button>
              </div>
            </div>
          </div>`
        : ""
    }
    ${
      isShape
        ? `<div class="pres-insp-group">
            <div class="pres-insp-row">
              <label for="pres-insp-fill">${escapeHtml(str().fillColor)}</label>
              <input type="color" id="pres-insp-fill" data-insp="fill" value="${escapeHtml(element.fill)}" />
            </div>
          </div>`
        : ""
    }
    <div class="pres-insp-group">
      <div class="pres-insp-label">${escapeHtml(str().layer)}</div>
      <div class="pres-insp-buttons">
        <button class="pres-insp-btn" data-insp-action="front" title="${escapeHtml(str().bringToFront)}">${LAYER_FRONT_SVG}</button>
        <button class="pres-insp-btn" data-insp-action="back" title="${escapeHtml(str().sendToBack)}">${LAYER_BACK_SVG}</button>
        <button class="pres-insp-btn" data-insp-action="duplicate" title="${escapeHtml(str().duplicate)}">${DUPLICATE_SVG}</button>
        <button class="pres-insp-btn danger" data-insp-action="delete" title="${escapeHtml(str().delete)}">${TRASH_SVG}</button>
      </div>
    </div>`;

  bindInspectorEvents(panel);
}

function bindInspectorEvents(panel: HTMLElement): void {
  const get = () => selectedElement();

  panel.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-insp]").forEach((input) => {
    const key = input.dataset.insp as string;
    input.addEventListener("focus", () => pushUndo());
    input.addEventListener("input", () => {
      const element = get();
      if (!element) return;
      if (key === "text") element.text = input.value;
      else if (key === "color") element.color = input.value;
      else if (key === "fill") element.fill = input.value;
      else if (key === "fontSize") element.fontSize = Math.max(8, Math.min(200, Number(input.value) || element.fontSize));
      else if (key === "x" || key === "y" || key === "w" || key === "h") {
        const value = Number(input.value);
        if (!Number.isFinite(value)) return;
        if (key === "w" || key === "h") element[key] = Math.max(20, value);
        else element[key] = value;
      }
      renderCanvas();
      renderSelection();
      renderFilmstrip();
      scheduleSave();
    });
  });

  panel.querySelectorAll<HTMLElement>("[data-insp-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const element = get();
      if (!element) return;
      const toggle = btn.dataset.inspToggle as "bold" | "italic" | "underline" | "bullet";
      pushUndo();
      element[toggle] = !element[toggle];
      renderCanvas();
      renderSelection();
      renderInspector();
      scheduleSave();
    });
  });

  panel.querySelectorAll<HTMLElement>("[data-insp-align]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const element = get();
      if (!element) return;
      pushUndo();
      element.align = btn.dataset.inspAlign as TextAlign;
      renderCanvas();
      renderSelection();
      renderInspector();
      scheduleSave();
    });
  });

  panel.querySelectorAll<HTMLElement>("[data-insp-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.inspAction as string;
      if (action === "front") bringToFront();
      else if (action === "back") sendToBack();
      else if (action === "duplicate") duplicateElement();
      else if (action === "delete") deleteElement();
    });
  });
}

function renderStatus(): void {
  const deck = currentDeck();
  const status = el("pres-slide-status");
  if (!deck || !status) return;
  status.textContent = str().slideOf
    .replace("{n}", String(activeSlideIndex + 1))
    .replace("{m}", String(deck.slides.length));
  updateUndoButtons();
}

function renderToolbarState(): void {
  const element = selectedElement();
  const isText = !!element && element.type === "text";
  document.querySelectorAll<HTMLElement>("[data-pres-action]").forEach((btn) => {
    const action = btn.dataset.presAction as string;
    let enabled = true;
    if (["bold", "italic", "underline", "bullet", "align-left", "align-center", "align-right"].includes(action)) enabled = isText;
    else if (["front", "back", "duplicate", "delete"].includes(action)) enabled = !!element;
    btn.classList.toggle("disabled", !enabled);
  });

  const layoutSelect = el<HTMLSelectElement>("pres-layout");
  const slide = currentSlide();
  if (layoutSelect && slide) layoutSelect.value = slide.layout;

  const textColor = el<HTMLInputElement>("pres-text-color");
  const textBar = el("pres-text-color-bar");
  if (textColor && textBar) {
    const color = element && element.type === "text" ? element.color : DEFAULT_TEXT;
    textColor.value = color;
    textBar.style.background = color;
  }
  const fillColor = el<HTMLInputElement>("pres-fill-color");
  const fillBar = el("pres-fill-color-bar");
  if (fillColor && fillBar) {
    const color = element && element.type !== "text" && element.type !== "image" ? element.fill : DEFAULT_FILL;
    fillColor.value = color;
    fillBar.style.background = color;
  }
}

function renderEditor(): void {
  const editor = el("pres-editor");
  const listPage = el("pres-list-page");
  const view = viewEl();
  if (!editor || !listPage || !view) return;

  const deck = currentDeck();
  const isEditing = !!deck;
  editor.style.display = isEditing ? "flex" : "none";
  listPage.style.display = isEditing ? "none" : "flex";
  view.classList.toggle("is-editing", isEditing);

  if (!isEditing) {
    renderDeckList();
    return;
  }

  const titleInput = el<HTMLInputElement>("pres-title-input");
  if (titleInput && document.activeElement !== titleInput) titleInput.value = deck.title;

  renderFilmstrip();
  renderCanvas();
  renderSelection();
  renderInspector();
  renderToolbarState();
  renderStatus();
  applyZoom();
}

// ---- Zoom ----

function stageScale(): number {
  const stage = el("pres-stage");
  if (!stage) return 1;
  const rect = stage.getBoundingClientRect();
  const available = Math.min(rect.width - 64, rect.height - 64);
  return Math.max(0.1, available / SLIDE_W);
}

function currentScale(): number {
  if (zoomMode === "fit") return stageScale();
  return zoomMode;
}

function applyZoom(): void {
  const wrap = el("pres-canvas-wrap");
  const canvas = el("pres-canvas");
  if (!wrap || !canvas) return;
  const scale = currentScale();
  wrap.style.width = `${SLIDE_W * scale}px`;
  wrap.style.height = `${SLIDE_H * scale}px`;
  canvas.style.transform = `scale(${scale})`;
  const label = el("pres-zoom-fit");
  if (label) label.textContent = zoomMode === "fit" ? str().fit : `${Math.round(zoomMode * 100)}%`;
}

// ---- Canvas interaction ----

interface DragState {
  kind: "move" | "resize";
  handle: string;
  startX: number;
  startY: number;
  origin: { x: number; y: number; w: number; h: number };
  elementId: string;
  moved: boolean;
}

let dragState: DragState | null = null;

function onCanvasMouseDown(event: MouseEvent): void {
  const target = event.target as HTMLElement;

  if (editingElementId) {
    const editing = target.closest(".pres-el") as HTMLElement | null;
    if (!editing || editing.dataset.elId !== editingElementId) commitTextEditing();
  }

  const handle = target.closest(".pres-handle") as HTMLElement | null;
  if (handle && selectedElement()) {
    event.preventDefault();
    const element = selectedElement() as SlideElement;
    dragState = {
      kind: "resize",
      handle: handle.dataset.handle || "se",
      startX: event.clientX,
      startY: event.clientY,
      origin: { x: element.x, y: element.y, w: element.w, h: element.h },
      elementId: element.id,
      moved: false,
    };
    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", onDragEnd);
    return;
  }

  const elNode = target.closest(".pres-el") as HTMLElement | null;
  if (elNode) {
    event.preventDefault();
    const id = elNode.dataset.elId as string;
    const element = currentSlide()?.elements.find((e) => e.id === id);
    if (!element) return;
    selectElement(id);
    if (editingElementId === id) return;
    dragState = {
      kind: "move",
      handle: "",
      startX: event.clientX,
      startY: event.clientY,
      origin: { x: element.x, y: element.y, w: element.w, h: element.h },
      elementId: id,
      moved: false,
    };
    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", onDragEnd);
    return;
  }

  selectElement(null);
}

function onDragMove(event: MouseEvent): void {
  if (!dragState) return;
  if (!dragState.moved) {
    dragState.moved = true;
    pushUndo();
  }
  const slide = currentSlide();
  const element = slide?.elements.find((e) => e.id === dragState?.elementId);
  if (!slide || !element) return;
  const scale = currentScale() || 1;
  const dx = (event.clientX - dragState.startX) / scale;
  const dy = (event.clientY - dragState.startY) / scale;
  const origin = dragState.origin;

  if (dragState.kind === "move") {
    element.x = Math.round(Math.max(-element.w + 20, Math.min(SLIDE_W - 20, origin.x + dx)));
    element.y = Math.round(Math.max(-element.h + 20, Math.min(SLIDE_H - 20, origin.y + dy)));
  } else {
    const handle = dragState.handle;
    let { x, y, w, h } = origin;
    if (handle.includes("e")) w = Math.max(40, origin.w + dx);
    if (handle.includes("s")) h = Math.max(30, origin.h + dy);
    if (handle.includes("w")) {
      const newW = Math.max(40, origin.w - dx);
      x = origin.x + (origin.w - newW);
      w = newW;
    }
    if (handle.includes("n")) {
      const newH = Math.max(30, origin.h - dy);
      y = origin.y + (origin.h - newH);
      h = newH;
    }
    element.x = Math.round(x);
    element.y = Math.round(y);
    element.w = Math.round(w);
    element.h = Math.round(h);
  }

  renderCanvas();
  renderSelection();
}

function onDragEnd(): void {
  window.removeEventListener("mousemove", onDragMove);
  window.removeEventListener("mouseup", onDragEnd);
  if (!dragState) return;
  const moved = dragState.moved;
  dragState = null;
  if (!moved) return;
  renderFilmstrip();
  renderInspector();
  scheduleSave();
}

function selectElement(id: string | null): void {
  selectedElementId = id;
  renderSelection();
  renderInspector();
  renderToolbarState();
  const canvas = el("pres-canvas");
  canvas?.focus();
}

// ---- Text editing ----

function startTextEditing(elementId: string): void {
  const node = document.querySelector<HTMLElement>(`#pres-canvas-content .pres-el[data-el-id="${elementId}"]`);
  if (!node) return;
  const element = currentSlide()?.elements.find((e) => e.id === elementId);
  if (!element || element.type !== "text") return;

  pushUndo();
  editingElementId = elementId;
  node.contentEditable = "true";
  node.spellcheck = false;
  node.textContent = element.text;
  node.focus();

  const range = document.createRange();
  range.selectNodeContents(node);
  range.collapse(false);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);

  node.addEventListener("blur", onTextBlur, { once: true });
  node.addEventListener("keydown", onTextKeydown);
  renderSelection();
}

function onTextKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape") {
    event.preventDefault();
    commitTextEditing();
  }
  event.stopPropagation();
}

function onTextBlur(): void {
  commitTextEditing();
}

function commitTextEditing(): void {
  if (!editingElementId) return;
  const id = editingElementId;
  editingElementId = null;
  const node = document.querySelector<HTMLElement>(`#pres-canvas-content .pres-el[data-el-id="${id}"]`);
  const element = currentSlide()?.elements.find((e) => e.id === id);
  if (node) {
    node.removeEventListener("keydown", onTextKeydown);
    node.contentEditable = "false";
  }
  if (element) {
    element.text = (node?.innerText ?? element.text).replace(/\n+$/, "");
    renderCanvas();
    renderFilmstrip();
    scheduleSave();
  }
  renderSelection();
}

// ---- Element actions ----

function addElement(element: SlideElement): void {
  const slide = currentSlide();
  if (!slide) return;
  pushUndo();
  slide.elements.push(element);
  selectElement(element.id);
  renderCanvas();
  renderFilmstrip();
  renderInspector();
  scheduleSave();
}

function insertText(): void {
  addElement(
    makeElement({
      type: "text",
      x: 340,
      y: 300,
      w: 600,
      h: 90,
      text: "",
      fontSize: 32,
      align: "center",
      valign: "middle",
    })
  );
  const selected = selectedElement();
  if (selected) startTextEditing(selected.id);
}

function insertShape(type: "rect" | "ellipse" | "triangle"): void {
  addElement(
    makeElement({
      type,
      x: 490,
      y: 270,
      w: 300,
      h: 180,
      fill: DEFAULT_FILL,
      radius: 12,
    })
  );
}

function insertImage(src: string, naturalWidth = 0, naturalHeight = 0): void {
  const width = 400;
  const ratio = naturalWidth > 0 && naturalHeight > 0 ? naturalHeight / naturalWidth : 0.75;
  const height = Math.round(width * ratio);
  addElement(
    makeElement({
      type: "image",
      x: Math.round((SLIDE_W - width) / 2),
      y: Math.round((SLIDE_H - height) / 2),
      w: width,
      h: height,
      src,
    })
  );
}

function deleteElement(): void {
  const slide = currentSlide();
  const element = selectedElement();
  if (!slide || !element) return;
  pushUndo();
  slide.elements = slide.elements.filter((e) => e.id !== element.id);
  selectElement(null);
  renderCanvas();
  renderFilmstrip();
  renderInspector();
  scheduleSave();
}

function duplicateElement(): void {
  const slide = currentSlide();
  const element = selectedElement();
  if (!slide || !element) return;
  pushUndo();
  const copy: SlideElement = { ...element, id: uid("el"), x: element.x + 24, y: element.y + 24 };
  slide.elements.push(copy);
  selectElement(copy.id);
  renderCanvas();
  renderFilmstrip();
  renderInspector();
  scheduleSave();
}

function bringToFront(): void {
  const slide = currentSlide();
  const element = selectedElement();
  if (!slide || !element) return;
  pushUndo();
  slide.elements = slide.elements.filter((e) => e.id !== element.id);
  slide.elements.push(element);
  renderCanvas();
  scheduleSave();
}

function sendToBack(): void {
  const slide = currentSlide();
  const element = selectedElement();
  if (!slide || !element) return;
  pushUndo();
  slide.elements = slide.elements.filter((e) => e.id !== element.id);
  slide.elements.unshift(element);
  renderCanvas();
  scheduleSave();
}

function applyTextStyle(patch: Partial<SlideElement>): void {
  const element = selectedElement();
  if (!element || element.type !== "text") return;
  pushUndo();
  Object.assign(element, patch);
  renderCanvas();
  renderSelection();
  renderFilmstrip();
  renderInspector();
  renderToolbarState();
  scheduleSave();
}

// ---- Slide actions ----

function addSlide(layout?: SlideLayout): void {
  const deck = currentDeck();
  if (!deck) return;
  pushUndo();
  const slide = makeSlide(layout ?? "title-body");
  deck.slides.splice(activeSlideIndex + 1, 0, slide);
  activeSlideIndex += 1;
  selectedElementId = null;
  renderEditor();
  scheduleSave();
}

function duplicateSlide(): void {
  const deck = currentDeck();
  const slide = currentSlide();
  if (!deck || !slide) return;
  pushUndo();
  const copy: Slide = {
    ...slide,
    id: uid("slide"),
    elements: slide.elements.map((e) => ({ ...e, id: uid("el") })),
  };
  deck.slides.splice(activeSlideIndex + 1, 0, copy);
  activeSlideIndex += 1;
  selectedElementId = null;
  renderEditor();
  scheduleSave();
}

function deleteSlide(): void {
  const deck = currentDeck();
  if (!deck || deck.slides.length <= 1) return;
  pushUndo();
  deck.slides.splice(activeSlideIndex, 1);
  activeSlideIndex = Math.max(0, Math.min(activeSlideIndex, deck.slides.length - 1));
  selectedElementId = null;
  renderEditor();
  scheduleSave();
}

function moveSlide(from: number, to: number): void {
  const deck = currentDeck();
  if (!deck) return;
  if (from === to || from < 0 || to < 0 || from >= deck.slides.length || to >= deck.slides.length) return;
  pushUndo();
  const [moved] = deck.slides.splice(from, 1);
  deck.slides.splice(to, 0, moved);
  activeSlideIndex = to;
  selectedElementId = null;
  renderEditor();
  scheduleSave();
}

function applyLayout(layout: SlideLayout): void {
  const slide = currentSlide();
  if (!slide) return;
  pushUndo();
  const previousTitle = slide.elements.find((e) => e.placeholder === "title")?.text ?? "";
  slide.layout = layout;
  slide.elements = layoutElements(layout);
  const title = slide.elements.find((e) => e.placeholder === "title");
  if (title && previousTitle) title.text = previousTitle;
  selectedElementId = null;
  renderEditor();
  scheduleSave();
}

// ---- Deck actions ----

function createDeck(): void {
  const deck = makeDeck();
  decks.unshift(deck);
  persist();
  openDeck(deck.id);
}

function openDeck(id: string): void {
  const deck = decks.find((d) => d.id === id);
  if (!deck) return;
  activeDeckId = id;
  activeSlideIndex = 0;
  selectedElementId = null;
  editingElementId = null;
  undoStack = [];
  redoStack = [];
  renderEditor();
}

function closeDeck(): void {
  commitTextEditing();
  flushSave();
  activeDeckId = null;
  activeSlideIndex = 0;
  selectedElementId = null;
  editingElementId = null;
  undoStack = [];
  redoStack = [];
  renderEditor();
  renderDeckList();
}

function deleteDeck(id: string): void {
  decks = decks.filter((d) => d.id !== id);
  persist();
  if (activeDeckId === id) {
    activeDeckId = null;
    activeSlideIndex = 0;
    selectedElementId = null;
  }
  renderEditor();
  renderDeckList();
}

function renameDeck(id: string, title: string): void {
  const deck = decks.find((d) => d.id === id);
  if (!deck || !title.trim()) return;
  deck.title = title.trim();
  deck.updatedAt = Date.now();
  persist();
  renderDeckList();
  if (activeDeckId === id) {
    const input = el<HTMLInputElement>("pres-title-input");
    if (input) input.value = deck.title;
  }
}

function openRenameDialog(id: string): void {
  const deck = decks.find((d) => d.id === id);
  if (!deck) return;
  const existing = el("pres-rename-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "pres-rename-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-card" style="max-width:380px;">
      <div class="modal-header">
        <span class="modal-title">${escapeHtml(str().rename)}</span>
        <button class="themes-close" aria-label="Close">&#10005;</button>
      </div>
      <div class="modal-body">
        <div class="modal-field">
          <input type="text" id="pres-rename-input" class="modal-input" value="${escapeHtml(deck.title)}" spellcheck="false" />
        </div>
      </div>
      <div class="modal-actions">
        <button id="pres-rename-cancel" class="modal-btn secondary">${escapeHtml(str().cancel)}</button>
        <button id="pres-rename-save" class="modal-btn primary">${escapeHtml(str().rename)}</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const input = el<HTMLInputElement>("pres-rename-input");
  const close = () => modal.remove();
  const save = () => {
    const value = input?.value.trim();
    if (value) renameDeck(id, value);
    close();
  };

  modal.querySelector<HTMLElement>(".themes-close")?.addEventListener("click", close);
  el("pres-rename-cancel")?.addEventListener("click", close);
  el("pres-rename-save")?.addEventListener("click", save);
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") save();
    else if (e.key === "Escape") close();
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  setTimeout(() => {
    input?.focus();
    input?.select();
  }, 50);
}

function openDeleteDialog(id: string): void {
  const deck = decks.find((d) => d.id === id);
  if (!deck) return;
  const existing = el("pres-delete-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "pres-delete-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-card" style="max-width:380px;">
      <div class="modal-header">
        <span class="modal-title">${escapeHtml(str().delete)}</span>
        <button class="themes-close" aria-label="Close">&#10005;</button>
      </div>
      <div class="modal-body">
        <div class="modal-field">
          <p style="color:var(--text-secondary);margin:0;">${escapeHtml(str().deleteConfirm)}</p>
          <p style="font-size:13px;color:var(--text);margin-top:6px;font-weight:600;">“${escapeHtml(deck.title)}”</p>
        </div>
      </div>
      <div class="modal-actions">
        <button id="pres-delete-cancel" class="modal-btn secondary">${escapeHtml(str().cancel)}</button>
        <button id="pres-delete-save" class="modal-btn primary">${escapeHtml(str().delete)}</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const close = () => modal.remove();
  modal.querySelector<HTMLElement>(".themes-close")?.addEventListener("click", close);
  el("pres-delete-cancel")?.addEventListener("click", close);
  el("pres-delete-save")?.addEventListener("click", () => {
    deleteDeck(id);
    close();
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
}

// ---- Presenter mode ----

let presenterIndex = 0;
let presenterCleanup: (() => void) | null = null;

function openPresenter(): void {
  const deck = currentDeck();
  if (!deck) return;
  commitTextEditing();
  presenterIndex = activeSlideIndex;

  const overlay = document.createElement("div");
  overlay.id = "pres-presenter";
  overlay.className = "pres-presenter";
  overlay.innerHTML = `
    <div class="pres-presenter-stage" id="pres-presenter-stage"></div>
    <div class="pres-presenter-bar">
      <span id="pres-presenter-counter"></span>
      <span class="pres-presenter-progress"><span id="pres-presenter-progress"></span></span>
      <button class="pres-presenter-exit" id="pres-presenter-exit">${escapeHtml(str().exitPresent)}</button>
    </div>`;
  document.body.appendChild(overlay);

  renderPresenterSlide();
  void overlay.requestFullscreen?.().catch(() => undefined);

  const onKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      presenterIndex = Math.min(deck.slides.length - 1, presenterIndex + 1);
      renderPresenterSlide();
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      presenterIndex = Math.max(0, presenterIndex - 1);
      renderPresenterSlide();
    } else if (event.key === "Escape") {
      closePresenter();
    }
  };
  overlay.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest("#pres-presenter-exit")) return;
    if (target.closest(".pres-presenter-bar")) return;
    presenterIndex = Math.min(deck.slides.length - 1, presenterIndex + 1);
    renderPresenterSlide();
  });
  el("pres-presenter-exit")?.addEventListener("click", closePresenter);
  document.addEventListener("keydown", onKey);
  overlay.dataset.bound = "1";
  presenterCleanup = () => {
    document.removeEventListener("keydown", onKey);
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
    overlay.remove();
    presenterCleanup = null;
  };
}

function closePresenter(): void {
  if (presenterCleanup) presenterCleanup();
}

function renderPresenterSlide(): void {
  const deck = currentDeck();
  const stage = el("pres-presenter-stage");
  if (!deck || !stage) return;
  const slide = deck.slides[presenterIndex];
  if (!slide) return;
  const scale = Math.min(window.innerWidth / SLIDE_W, (window.innerHeight - 64) / SLIDE_H);
  stage.innerHTML = `<div class="pres-presenter-canvas" style="width:${SLIDE_W}px;height:${SLIDE_H}px;transform:scale(${scale});background:${escapeHtml(slide.background)}">${slide.elements.map(elementHtml).join("")}</div>`;
  const counter = el("pres-presenter-counter");
  if (counter) counter.textContent = `${presenterIndex + 1} / ${deck.slides.length}`;
  const progress = el("pres-presenter-progress");
  if (progress) progress.style.width = `${((presenterIndex + 1) / deck.slides.length) * 100}%`;
}

// ---- Export ----

function exportDeck(format: string): void {
  const deck = currentDeck();
  if (!deck) return;
  const fileName = (deck.title || str().untitledPresentation).replace(/[^a-z0-9\-_ ]/gi, "_").trim() || "presentation";

  if (format === "pdf") {
    openPrintView(deck);
    return;
  }

  let blob: Blob;
  let ext: string;
  if (format === "html") {
    blob = new Blob([deckHtml(deck)], { type: "text/html;charset=utf-8" });
    ext = "html";
  } else if (format === "json") {
    blob = new Blob([JSON.stringify(deck, null, 2)], { type: "application/json;charset=utf-8" });
    ext = "json";
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

function deckHtml(deck: Presentation): string {
  const slides = deck.slides
    .map(
      (slide) =>
        `<section class="slide"><div class="canvas" style="background:${escapeHtml(slide.background)}">${slide.elements.map(elementHtml).join("")}</div></section>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(deck.title)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #1c1c1e; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  .slide { width: ${SLIDE_W}px; height: ${SLIDE_H}px; margin: 0 auto 32px; position: relative; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.4); }
  .canvas { position: absolute; inset: 0; }
  .pres-el { position: absolute; }
  .pres-el-text { display: flex; flex-direction: column; white-space: pre-wrap; word-wrap: break-word; }
  .pres-el-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .pres-el-rect, .pres-el-ellipse, .pres-el-triangle { }
  .pres-el-triangle { clip-path: polygon(50% 0, 100% 100%, 0 100%); }
  .pres-bullet { padding-left: 26px; position: relative; }
  .pres-bullet::before { content: "•"; position: absolute; left: 0; }
</style>
</head>
<body>
${slides}
</body>
</html>`;
}

function openPrintView(deck: Presentation): void {
  const existing = el("pres-print-view");
  if (existing) existing.remove();

  const pages = deck.slides
    .map(
      (slide) =>
        `<div class="print-page"><div class="print-canvas" style="background:${escapeHtml(slide.background)}">${slide.elements.map(elementHtml).join("")}</div></div>`
    )
    .join("");

  const printDiv = document.createElement("div");
  printDiv.id = "pres-print-view";
  printDiv.innerHTML = `
    <div class="print-pages">${pages}</div>
    <button id="pres-print-close">Close</button>`;
  document.body.appendChild(printDiv);

  const style = document.createElement("style");
  style.id = "pres-print-style";
  style.textContent = `
    @page { size: ${SLIDE_W}px ${SLIDE_H}px; margin: 0; }
    #pres-print-view { position: fixed; inset: 0; z-index: 1000; background: #fff; overflow: auto; }
    #pres-print-view .print-page { width: ${SLIDE_W}px; height: ${SLIDE_H}px; position: relative; overflow: hidden; page-break-after: always; break-after: page; }
    #pres-print-view .print-canvas { position: absolute; inset: 0; }
    #pres-print-view .pres-el { position: absolute; }
    #pres-print-view .pres-el-text { display: flex; flex-direction: column; white-space: pre-wrap; word-wrap: break-word; }
    #pres-print-view .pres-el-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
    #pres-print-view .pres-el-triangle { clip-path: polygon(50% 0, 100% 100%, 0 100%); }
    #pres-print-view .pres-bullet { padding-left: 26px; position: relative; }
    #pres-print-view .pres-bullet::before { content: "•"; position: absolute; left: 0; }
    #pres-print-close { position: fixed; top: 20px; right: 20px; z-index: 1001; padding: 8px 14px; border: 1px solid #d1d1d6; border-radius: 8px; background: #fff; color: #1d1d1f; cursor: pointer; }
    @media print {
      #pres-print-view { position: static; }
      #pres-print-close { display: none; }
      body { background: #fff; }
    }`;
  document.head.appendChild(style);

  const close = () => {
    printDiv.remove();
    style.remove();
  };
  el("pres-print-close")?.addEventListener("click", close);
  setTimeout(() => window.print(), 150);
}

// ---- Image import ----

interface LoadedImage {
  src: string;
  width: number;
  height: number;
}

function readImageFile(file: File): Promise<LoadedImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      const image = new Image();
      image.onload = () => {
        const naturalWidth = image.width;
        const naturalHeight = image.height;
        const maxWidth = 1600;
        const scale = Math.min(1, maxWidth / naturalWidth);
        const width = Math.round(naturalWidth * scale);
        const height = Math.round(naturalHeight * scale);
        if (scale === 1) {
          resolve({ src: dataUrl, width: naturalWidth, height: naturalHeight });
          return;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({ src: dataUrl, width: naturalWidth, height: naturalHeight });
          return;
        }
        ctx.drawImage(image, 0, 0, width, height);
        resolve({ src: canvas.toDataURL("image/jpeg", 0.85), width, height });
      };
      image.onerror = () => resolve({ src: dataUrl, width: 0, height: 0 });
      image.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

// ---- Layout options ----

function buildLayoutOptions(): void {
  const select = el<HTMLSelectElement>("pres-layout");
  if (!select) return;
  const options: [SlideLayout, string][] = [
    ["title", str().layoutTitle],
    ["title-body", str().layoutTitleBody],
    ["title-only", str().layoutTitleOnly],
    ["two-content", str().layoutTwoContent],
    ["section", str().layoutSection],
    ["blank", str().layoutBlank],
  ];
  select.innerHTML = options.map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`).join("");
}

// ---- Wiring ----

function setupUI(): void {
  if (uiReady) return;
  uiReady = true;

  el("pres-new-btn")?.addEventListener("click", createDeck);

  el("pres-search")?.addEventListener("input", (event) => {
    searchQuery = (event.target as HTMLInputElement).value;
    renderDeckList();
  });

  el("pres-list")?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const item = target.closest(".pres-deck-item") as HTMLElement | null;
    if (!item) return;
    const id = item.dataset.deckId as string;
    const action = (target.closest("[data-action]") as HTMLElement | null)?.dataset.action;
    if (action === "rename") {
      openRenameDialog(id);
      return;
    }
    if (action === "delete") {
      openDeleteDialog(id);
      return;
    }
    openDeck(id);
  });

  el("pres-list")?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const item = (event.target as HTMLElement).closest(".pres-deck-item") as HTMLElement | null;
    if (!item) return;
    openDeck(item.dataset.deckId as string);
  });

  el("pres-back-btn")?.addEventListener("click", closeDeck);

  el("pres-title-input")?.addEventListener("input", (event) => {
    const deck = currentDeck();
    if (!deck) return;
    deck.title = (event.target as HTMLInputElement).value;
    scheduleSave();
  });
  el("pres-title-input")?.addEventListener("blur", () => {
    const deck = currentDeck();
    if (!deck) return;
    if (!deck.title.trim()) {
      deck.title = str().untitledPresentation;
      const input = el<HTMLInputElement>("pres-title-input");
      if (input) input.value = deck.title;
    }
    scheduleSave();
  });

  el("pres-undo-btn")?.addEventListener("click", undo);
  el("pres-redo-btn")?.addEventListener("click", redo);

  el("pres-layout")?.addEventListener("change", (event) => {
    applyLayout((event.target as HTMLSelectElement).value as SlideLayout);
  });

  el("pres-insert-text")?.addEventListener("click", insertText);
  el("pres-insert-rect")?.addEventListener("click", () => insertShape("rect"));
  el("pres-insert-ellipse")?.addEventListener("click", () => insertShape("ellipse"));
  el("pres-insert-image")?.addEventListener("click", () => el<HTMLInputElement>("pres-image-input")?.click());
  el("pres-image-input")?.addEventListener("change", (event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    void readImageFile(file)
      .then((loaded) => insertImage(loaded.src, loaded.width, loaded.height))
      .catch(() => undefined);
    input.value = "";
  });

  document.querySelectorAll<HTMLElement>("[data-pres-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.presAction as string;
      switch (action) {
        case "bold":
          applyTextStyle({ bold: !selectedElement()?.bold });
          break;
        case "italic":
          applyTextStyle({ italic: !selectedElement()?.italic });
          break;
        case "underline":
          applyTextStyle({ underline: !selectedElement()?.underline });
          break;
        case "bullet":
          applyTextStyle({ bullet: !selectedElement()?.bullet });
          break;
        case "align-left":
          applyTextStyle({ align: "left" });
          break;
        case "align-center":
          applyTextStyle({ align: "center" });
          break;
        case "align-right":
          applyTextStyle({ align: "right" });
          break;
        case "front":
          bringToFront();
          break;
        case "back":
          sendToBack();
          break;
        case "duplicate":
          duplicateElement();
          break;
        case "delete":
          deleteElement();
          break;
        default:
          break;
      }
    });
  });

  el("pres-text-color")?.addEventListener("input", (event) => {
    const value = (event.target as HTMLInputElement).value;
    const bar = el("pres-text-color-bar");
    if (bar) bar.style.background = value;
    if (selectedElement()?.type === "text") applyTextStyle({ color: value });
  });

  el("pres-fill-color")?.addEventListener("input", (event) => {
    const value = (event.target as HTMLInputElement).value;
    const bar = el("pres-fill-color-bar");
    if (bar) bar.style.background = value;
    const element = selectedElement();
    if (element && element.type !== "text" && element.type !== "image") {
      pushUndo();
      element.fill = value;
      renderCanvas();
      renderFilmstrip();
      scheduleSave();
    }
  });

  el("pres-add-slide")?.addEventListener("click", () => addSlide());
  el("pres-duplicate-slide")?.addEventListener("click", () => duplicateSlide());
  el("pres-delete-slide")?.addEventListener("click", () => deleteSlide());
  el("pres-filmstrip")?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const thumb = target.closest(".pres-thumb") as HTMLElement | null;
    if (!thumb) return;
    const index = Number(thumb.dataset.index);
    if (Number.isFinite(index)) {
      activeSlideIndex = index;
      selectedElementId = null;
      renderEditor();
    }
  });
  el("pres-filmstrip")?.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const thumb = (event.target as HTMLElement).closest(".pres-thumb") as HTMLElement | null;
    if (!thumb) return;
    const index = Number(thumb.dataset.index);
    if (Number.isFinite(index)) {
      activeSlideIndex = index;
      duplicateSlide();
    }
  });

  setupFilmstripDrag();

  el("pres-present-btn")?.addEventListener("click", openPresenter);

  const exportBtn = el("pres-export-menu-btn");
  const exportMenu = el("pres-export-menu");
  exportBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!exportMenu) return;
    exportMenu.style.display = exportMenu.style.display === "none" ? "block" : "none";
  });
  exportMenu?.addEventListener("click", (event) => {
    const item = (event.target as HTMLElement).closest(".export-item") as HTMLElement | null;
    if (!item) return;
    exportMenu.style.display = "none";
    exportDeck(item.dataset.format as string);
  });
  document.addEventListener("click", (event) => {
    if (!exportMenu) return;
    if (!(event.target as HTMLElement).closest(".pres-export-wrap")) exportMenu.style.display = "none";
  });

  el("pres-zoom-in")?.addEventListener("click", () => {
    zoomMode = Math.min(2, (typeof zoomMode === "number" ? zoomMode : currentScale()) + 0.1);
    applyZoom();
  });
  el("pres-zoom-out")?.addEventListener("click", () => {
    zoomMode = Math.max(0.2, (typeof zoomMode === "number" ? zoomMode : currentScale()) - 0.1);
    applyZoom();
  });
  el("pres-zoom-fit")?.addEventListener("click", () => {
    zoomMode = "fit";
    applyZoom();
  });

  const canvas = el("pres-canvas");
  canvas?.addEventListener("mousedown", onCanvasMouseDown);
  canvas?.addEventListener("dblclick", (event) => {
    const node = (event.target as HTMLElement).closest(".pres-el") as HTMLElement | null;
    if (!node) return;
    const element = currentSlide()?.elements.find((e) => e.id === node.dataset.elId);
    if (element?.type === "text") startTextEditing(element.id);
  });

  window.addEventListener("resize", () => {
    if (zoomMode === "fit") applyZoom();
  });

  window.addEventListener("beforeunload", () => {
    flushSave();
  });

  document.addEventListener("keydown", onGlobalKeydown);
}

function setupFilmstripDrag(): void {
  const strip = el("pres-filmstrip");
  if (!strip) return;
  let dragFrom = -1;

  strip.addEventListener("dragstart", (event) => {
    const thumb = (event.target as HTMLElement).closest(".pres-thumb") as HTMLElement | null;
    if (!thumb) return;
    dragFrom = Number(thumb.dataset.index);
    thumb.classList.add("dragging");
    event.dataTransfer?.setData("text/plain", String(dragFrom));
  });

  strip.addEventListener("dragend", () => {
    strip.querySelectorAll(".pres-thumb.dragging").forEach((node) => node.classList.remove("dragging"));
    dragFrom = -1;
  });

  strip.addEventListener("dragover", (event) => {
    event.preventDefault();
    const thumb = (event.target as HTMLElement).closest(".pres-thumb") as HTMLElement | null;
    strip.querySelectorAll(".pres-thumb.drag-over").forEach((node) => node.classList.remove("drag-over"));
    if (thumb) thumb.classList.add("drag-over");
  });

  strip.addEventListener("drop", (event) => {
    event.preventDefault();
    const thumb = (event.target as HTMLElement).closest(".pres-thumb") as HTMLElement | null;
    strip.querySelectorAll(".pres-thumb.drag-over").forEach((node) => node.classList.remove("drag-over"));
    if (!thumb || dragFrom < 0) return;
    const to = Number(thumb.dataset.index);
    moveSlide(dragFrom, to);
    dragFrom = -1;
  });
}

function onGlobalKeydown(event: KeyboardEvent): void {
  const deck = currentDeck();
  if (!deck) return;
  // The presenter owns the keyboard while it is on screen.
  if (el("pres-presenter")) return;
  const view = viewEl();
  if (!view || view.style.display === "none") return;
  if (editingElementId) return;

  const target = event.target as HTMLElement;
  if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;

  const mod = event.metaKey || event.ctrlKey;

  if (mod && event.key.toLowerCase() === "z") {
    event.preventDefault();
    if (event.shiftKey) redo();
    else undo();
    return;
  }
  if (mod && event.key.toLowerCase() === "y") {
    event.preventDefault();
    redo();
    return;
  }
  if (mod && event.key.toLowerCase() === "d") {
    event.preventDefault();
    duplicateElement();
    return;
  }
  if (mod && event.key.toLowerCase() === "s") {
    event.preventDefault();
    persist();
    return;
  }

  if (event.key === "Escape") {
    selectElement(null);
    return;
  }

  const element = selectedElement();
  if (element && (event.key === "Delete" || event.key === "Backspace")) {
    event.preventDefault();
    deleteElement();
    return;
  }

  if (element && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
    event.preventDefault();
    const step = event.shiftKey ? 10 : 1;
    pushUndo();
    if (event.key === "ArrowLeft") element.x -= step;
    if (event.key === "ArrowRight") element.x += step;
    if (event.key === "ArrowUp") element.y -= step;
    if (event.key === "ArrowDown") element.y += step;
    renderCanvas();
    renderSelection();
    renderFilmstrip();
    scheduleSave();
    return;
  }

  if (event.key === "PageDown" || (event.key === "ArrowRight" && !element)) {
    if (activeSlideIndex < deck.slides.length - 1) {
      event.preventDefault();
      activeSlideIndex += 1;
      selectedElementId = null;
      renderEditor();
    }
    return;
  }
  if (event.key === "PageUp" || (event.key === "ArrowLeft" && !element)) {
    if (activeSlideIndex > 0) {
      event.preventDefault();
      activeSlideIndex -= 1;
      selectedElementId = null;
      renderEditor();
    }
  }
}

// ---- Public facade ----

export const presentationsApp = {
  /** Called by renderer.ts when the Presentations view becomes visible. */
  onShow(): void {
    setupUI();
    // Keep whatever is already open: re-reading storage would drop unsaved edits.
    if (!decks.length) decks = getDecks();
    flushSave();
    buildLayoutOptions();
    if (activeDeckId && !decks.some((d) => d.id === activeDeckId)) {
      activeDeckId = null;
      activeSlideIndex = 0;
      selectedElementId = null;
    }
    if (activeDeckId) {
      renderEditor();
    } else {
      const editor = el("pres-editor");
      const listPage = el("pres-list-page");
      if (editor) editor.style.display = "none";
      if (listPage) listPage.style.display = "flex";
      viewEl()?.classList.remove("is-editing");
      renderDeckList();
    }
  },

  /** True while a deck is open (the editor is showing). */
  isEditing(): boolean {
    return !!activeDeckId;
  },

  /** Returns to the list of presentations. */
  closeEditor(): void {
    closeDeck();
  },

  /** Switches the interface language. */
  setLang(next: PresLang): void {
    lang = next;
    const title = el("pres-app-title");
    if (title) title.textContent = str().appName;
    const newBtn = el("pres-new-btn-label");
    if (newBtn) newBtn.textContent = str().newPresentation;
    const search = el<HTMLInputElement>("pres-search");
    if (search) search.setAttribute("placeholder", str().searchPresentations);
    const slidesTitle = el("pres-filmstrip-title");
    if (slidesTitle) slidesTitle.textContent = str().slides;
    const presentLabel = el("pres-present-btn-label");
    if (presentLabel) presentLabel.textContent = str().present;
    const exportLabel = el("pres-export-btn-label");
    if (exportLabel) exportLabel.textContent = str().export;
    const backBtn = el("pres-back-btn");
    if (backBtn) backBtn.setAttribute("aria-label", str().backToList);
    const exportItems: [string, string][] = [
      ["pdf", str().exportPDF],
      ["html", str().exportHTML],
      ["json", str().exportJSON],
    ];
    exportItems.forEach(([format, label]) => {
      const item = document.querySelector(`#pres-export-menu .export-item[data-format='${format}']`);
      if (item) item.textContent = label;
    });
    buildLayoutOptions();
    renderDeckList();
    if (activeDeckId) renderEditor();
  },
};
