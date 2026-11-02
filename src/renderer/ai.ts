/**
 * Alma AI panel.
 *
 * Owns the chat UI (messages, composer, status, context strip) and the
 * collection of browser context that is shared with the local Ollama model:
 * the readable text of the active page, the open tabs and app preferences.
 *
 * The page reader is injected into the active <webview> with
 * `executeJavaScript`, so it must stay self-contained (no references to
 * module scope). Everything it returns is treated as untrusted data.
 */

export type AiLang = "en" | "it" | "zh";

export interface AiPanelTab {
  title: string;
  url: string;
  active: boolean;
  pane?: "left" | "right";
}

export interface AiPanelActiveTab {
  title: string;
  url: string;
  webview: unknown;
  /** True for Alma's own pages (home, history, native apps, ...). */
  internal: boolean;
  /** Human-readable internal view name, e.g. "Home" or "Documents". */
  viewLabel: string;
}

export interface AiPanelAppState {
  theme: string;
  accent: string;
  language: string;
  languageSetting: string;
  splitView: boolean;
  view: string;
  customBackground: boolean;
  restoreSession: boolean;
  windowId: number | null;
  platform: string;
  windowSize: string;
}

export interface AiPanelDeps {
  getTabs: () => AiPanelTab[];
  getActiveTab: () => AiPanelActiveTab | null;
  getAppState: () => AiPanelAppState;
  getLang: () => AiLang;
  /** Called whenever the panel opens or closes. */
  onOpenChange?: (open: boolean) => void;
}

export interface AiPanelApp {
  setLang(lang: AiLang): void;
  refreshContext(): void;
  notifyPageChanged(): void;
  open(): void;
  close(): void;
  isOpen(): boolean;
}

/** Payload sent to the main process with every chat request. */
export interface AiChatContext {
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

interface AiMsg {
  role: "user" | "assistant";
  content: string;
  at: number;
  error?: boolean;
}

interface PageSnapshot {
  title: string;
  url: string;
  description: string;
  wordCount: number;
  truncated: boolean;
  selection: string;
  headings: string[];
  readable: boolean;
  internal: boolean;
  viewLabel: string;
}

interface CompiledPage extends PageSnapshot {
  lang: string;
  contentType: string;
  text: string;
}

interface CollectedContext {
  payload: AiChatContext;
  snapshot: PageSnapshot;
  capturedAt: number;
}

interface RawPage {
  title: string;
  url: string;
  description: string;
  lang: string;
  contentType: string;
  text: string;
  truncated: boolean;
  wordCount: number;
  selection: string;
  headings: string[];
}

interface AiStrings {
  title: string;
  statusChecking: string;
  statusReady: string;
  statusNoModel: string;
  statusOffline: string;
  statusNoBridge: string;
  statusHint: string;
  newChat: string;
  close: string;
  contextPage: string;
  contextTabs: string;
  contextSelection: string;
  contextApp: string;
  refresh: string;
  updatedJustNow: string;
  updatedSeconds: string;
  updatedMinutes: string;
  reading: string;
  readingFailed: string;
  noPage: string;
  tabOne: string;
  tabMany: string;
  words: string;
  chars: string;
  placeholder: string;
  placeholderGeneral: string;
  contextOn: string;
  contextOff: string;
  contextOffHint: string;
  keyHint: string;
  emptyTitle: string;
  emptyText: string;
  sugSummarize: string;
  sugSummarizePrompt: string;
  sugTabs: string;
  sugTabsPrompt: string;
  sugSelection: string;
  sugSelectionPrompt: string;
  sugState: string;
  sugStatePrompt: string;
  disclaimer: string;
  copy: string;
  copied: string;
  retry: string;
  thinking: string;
  errorPrefix: string;
  noBridge: string;
  ollamaOffline: string;
  modelMissing: string;
  light: string;
  dark: string;
  accent: string;
  splitOn: string;
  splitOff: string;
  currentTab: string;
  selectionText: string;
  sendAria: string;
  clearAria: string;
  closeAria: string;
  scrollAria: string;
  statusAria: string;
  contextToggleAria: string;
}

const AI_STRINGS: Record<AiLang, AiStrings> = {
  en: {
    title: "Alma AI",
    statusChecking: "Checking Ollama…",
    statusReady: "Connected",
    statusNoModel: "Model not installed",
    statusOffline: "Ollama offline",
    statusNoBridge: "AI bridge unavailable",
    statusHint: "Click to re-check the local Ollama connection",
    newChat: "New chat",
    close: "Close",
    contextPage: "Page",
    contextTabs: "Tabs",
    contextSelection: "Selection",
    contextApp: "App",
    refresh: "Refresh",
    updatedJustNow: "Updated just now",
    updatedSeconds: "Updated {n}s ago",
    updatedMinutes: "Updated {n}m ago",
    reading: "Reading page…",
    readingFailed: "Page text unavailable",
    noPage: "No page",
    tabOne: "1 tab",
    tabMany: "{n} tabs",
    words: "{n} words",
    chars: "{n} chars",
    placeholder: "Ask about this page…",
    placeholderGeneral: "Ask Alma AI…",
    contextOn: "Browser context",
    contextOff: "Context off",
    contextOffHint: "Context is off — Alma only sees your messages.",
    keyHint: "send",
    emptyTitle: "How can I help?",
    emptyText: "I can read the page you're on, list your open tabs and check your Alma settings.",
    sugSummarize: "Summarize this page",
    sugSummarizePrompt: "Summarize this page in a few bullet points.",
    sugTabs: "What are my open tabs?",
    sugTabsPrompt: "List my open tabs and say what each one is about.",
    sugSelection: "Explain the selection",
    sugSelectionPrompt: "Explain the selected text.",
    sugState: "Theme & language",
    sugStatePrompt: "What theme and language am I using?",
    disclaimer: "Alma can make mistakes. Check important info.",
    copy: "Copy",
    copied: "Copied",
    retry: "Retry",
    thinking: "Alma is thinking",
    errorPrefix: "Something went wrong.",
    noBridge: "The AI bridge is unavailable.",
    ollamaOffline: "Ollama is not running on this Mac. Start Ollama, then try again.",
    modelMissing: "The llama3.2 model is not installed. Run `ollama pull llama3.2:latest`, then try again.",
    light: "Light",
    dark: "Dark",
    accent: "Accent",
    splitOn: "Split view on",
    splitOff: "Single view",
    currentTab: "Current: {title}",
    selectionText: "{n} selected chars",
    sendAria: "Send message",
    clearAria: "New chat",
    closeAria: "Close",
    scrollAria: "Scroll to latest",
    statusAria: "Check the AI connection",
    contextToggleAria: "Share the current page, tabs and app state with Alma",
  },
  it: {
    title: "Alma AI",
    statusChecking: "Verifico Ollama…",
    statusReady: "Connesso",
    statusNoModel: "Modello non installato",
    statusOffline: "Ollama non raggiungibile",
    statusNoBridge: "Bridge AI non disponibile",
    statusHint: "Clicca per verificare di nuovo la connessione a Ollama",
    newChat: "Nuova chat",
    close: "Chiudi",
    contextPage: "Pagina",
    contextTabs: "Schede",
    contextSelection: "Selezione",
    contextApp: "App",
    refresh: "Aggiorna",
    updatedJustNow: "Aggiornato ora",
    updatedSeconds: "Aggiornato {n}s fa",
    updatedMinutes: "Aggiornato {n}m fa",
    reading: "Leggo la pagina…",
    readingFailed: "Testo non disponibile",
    noPage: "Nessuna pagina",
    tabOne: "1 scheda",
    tabMany: "{n} schede",
    words: "{n} parole",
    chars: "{n} caratteri",
    placeholder: "Chiedi di questa pagina…",
    placeholderGeneral: "Chiedi ad Alma…",
    contextOn: "Contesto browser",
    contextOff: "Contesto off",
    contextOffHint: "Contesto disattivato: Alma vede solo i tuoi messaggi.",
    keyHint: "invia",
    emptyTitle: "Come posso aiutarti?",
    emptyText: "Posso leggere la pagina che stai vedendo, elencare le schede aperte e controllare le impostazioni di Alma.",
    sugSummarize: "Riassumi questa pagina",
    sugSummarizePrompt: "Riassumi questa pagina in alcuni punti elenco.",
    sugTabs: "Quali schede ho aperto?",
    sugTabsPrompt: "Elenca le mie schede aperte e di cosa parla ciascuna.",
    sugSelection: "Spiega la selezione",
    sugSelectionPrompt: "Spiega il testo selezionato.",
    sugState: "Tema e lingua",
    sugStatePrompt: "Quale tema e quale lingua sto usando?",
    disclaimer: "Alma può sbagliare. Verifica le informazioni importanti.",
    copy: "Copia",
    copied: "Copiato",
    retry: "Riprova",
    thinking: "Alma sta pensando",
    errorPrefix: "Qualcosa è andato storto.",
    noBridge: "Il bridge AI non è disponibile.",
    ollamaOffline: "Ollama non è in esecuzione. Avvia Ollama e riprova.",
    modelMissing: "Il modello llama3.2 non è installato. Esegui `ollama pull llama3.2:latest` e riprova.",
    light: "Chiaro",
    dark: "Scuro",
    accent: "Accento",
    splitOn: "Vista divisa attiva",
    splitOff: "Vista singola",
    currentTab: "Attuale: {title}",
    selectionText: "{n} caratteri selezionati",
    sendAria: "Invia messaggio",
    clearAria: "Nuova chat",
    closeAria: "Chiudi",
    scrollAria: "Vai all'ultimo messaggio",
    statusAria: "Verifica la connessione AI",
    contextToggleAria: "Condividi con Alma la pagina, le schede e lo stato dell'app",
  },
  zh: {
    title: "Alma AI",
    statusChecking: "正在检查 Ollama…",
    statusReady: "已连接",
    statusNoModel: "未安装模型",
    statusOffline: "Ollama 未运行",
    statusNoBridge: "AI 桥接不可用",
    statusHint: "点击重新检查本地 Ollama 连接",
    newChat: "新对话",
    close: "关闭",
    contextPage: "页面",
    contextTabs: "标签页",
    contextSelection: "选中内容",
    contextApp: "应用",
    refresh: "刷新",
    updatedJustNow: "刚刚更新",
    updatedSeconds: "{n} 秒前更新",
    updatedMinutes: "{n} 分钟前更新",
    reading: "正在读取页面…",
    readingFailed: "无法读取正文",
    noPage: "无页面",
    tabOne: "1 个标签页",
    tabMany: "{n} 个标签页",
    words: "{n} 个词",
    chars: "{n} 个字符",
    placeholder: "询问当前页面…",
    placeholderGeneral: "询问 Alma…",
    contextOn: "浏览器上下文",
    contextOff: "上下文已关闭",
    contextOffHint: "上下文已关闭：Alma 只能看到你的消息。",
    keyHint: "发送",
    emptyTitle: "有什么可以帮你？",
    emptyText: "我可以读取当前页面、列出已打开的标签页，并查看 Alma 设置。",
    sugSummarize: "总结此页面",
    sugSummarizePrompt: "用几个要点总结这个页面。",
    sugTabs: "我打开了哪些标签页？",
    sugTabsPrompt: "列出我打开的标签页，并说明每个页面的内容。",
    sugSelection: "解释选中内容",
    sugSelectionPrompt: "解释选中的文本。",
    sugState: "主题与语言",
    sugStatePrompt: "我正在使用什么主题和语言？",
    disclaimer: "Alma 可能会出错，请核实重要信息。",
    copy: "复制",
    copied: "已复制",
    retry: "重试",
    thinking: "Alma 正在思考",
    errorPrefix: "出现问题。",
    noBridge: "AI 桥接不可用。",
    ollamaOffline: "Ollama 未在运行。请先启动 Ollama，然后重试。",
    modelMissing: "尚未安装 llama3.2 模型。请运行 `ollama pull llama3.2:latest`，然后重试。",
    light: "浅色",
    dark: "深色",
    accent: "强调色",
    splitOn: "分屏已开启",
    splitOff: "单屏",
    currentTab: "当前：{title}",
    selectionText: "已选中 {n} 个字符",
    sendAria: "发送消息",
    clearAria: "新对话",
    closeAria: "关闭",
    scrollAria: "滚动到最新消息",
    statusAria: "检查 AI 连接",
    contextToggleAria: "与 Alma 分享当前页面、标签页和应用状态",
  },
};

const CONTEXT_STORAGE_KEY = "alma:ai:context";
const MAX_PAGE_CHARS = 14000;
const MAX_SELECTION_CHARS = 3000;
const READ_TIMEOUT_MS = 4000;

function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

function clip(value: string, max: number): { text: string; truncated: boolean } {
  if (value.length <= max) return { text: value, truncated: false };
  let cut = value.slice(0, max);
  const lastBreak = Math.max(cut.lastIndexOf(" "), cut.lastIndexOf("\n"));
  if (lastBreak > max * 0.75) cut = cut.slice(0, lastBreak);
  return { text: cut.trimEnd() + "…", truncated: true };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeHref(value: string): string | null {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed)) return trimmed;
  return null;
}

const INLINE_TOKEN =
  /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(__[^_\n]+__)|(~~[^~\n]+~~)|(\[[^\]\n]+\]\([^)\s]+\))|(\*[^*\n]+\*)/g;

function renderInline(raw: string): string {
  let out = "";
  let last = 0;
  INLINE_TOKEN.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = INLINE_TOKEN.exec(raw)) !== null) {
    out += escapeHtml(raw.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("`")) {
      out += `<code>${escapeHtml(token.slice(1, -1))}</code>`;
    } else if (token.startsWith("**")) {
      out += `<strong>${escapeHtml(token.slice(2, -2))}</strong>`;
    } else if (token.startsWith("__")) {
      out += `<strong>${escapeHtml(token.slice(2, -2))}</strong>`;
    } else if (token.startsWith("~~")) {
      out += `<del>${escapeHtml(token.slice(2, -2))}</del>`;
    } else if (token.startsWith("[")) {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      const href = link ? safeHref(link[2]) : null;
      if (link && href) {
        out += `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link[1])}</a>`;
      } else {
        out += escapeHtml(token);
      }
    } else {
      out += `<em>${escapeHtml(token.slice(1, -1))}</em>`;
    }
    last = INLINE_TOKEN.lastIndex;
  }
  out += escapeHtml(raw.slice(last));
  return out;
}

/** Small, dependency-free Markdown renderer for assistant replies. */
function renderMarkdown(source: string): string {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let list: "ul" | "ol" | null = null;
  let paragraph: string[] = [];
  let quote: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      out.push(`</${list}>`);
      list = null;
    }
  };
  const flushQuote = () => {
    if (quote.length) {
      out.push(`<blockquote>${quote.map((line) => `<p>${renderInline(line)}</p>`).join("")}</blockquote>`);
      quote = [];
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    const fence = /^```([\w+#.-]*)\s*$/.exec(line);
    if (fence) {
      flushAll();
      const lang = fence[1];
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      const attr = lang ? ` data-lang="${escapeHtml(lang)}"` : "";
      out.push(`<pre class="ai-code"><code${attr}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    if (!line.trim()) {
      flushAll();
      index += 1;
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      out.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      flushAll();
      out.push("<hr />");
      index += 1;
      continue;
    }

    const unordered = /^[-*+]\s+(.+)$/.exec(line);
    const ordered = /^\d+[.)]\s+(.+)$/.exec(line);
    if (unordered || ordered) {
      flushParagraph();
      flushQuote();
      const kind: "ul" | "ol" = unordered ? "ul" : "ol";
      if (list && list !== kind) flushList();
      if (!list) {
        list = kind;
        out.push(`<${kind}>`);
      }
      out.push(`<li>${renderInline(unordered ? unordered[1] : ordered![1])}</li>`);
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      flushParagraph();
      flushList();
      quote.push(line.replace(/^>\s?/, ""));
      index += 1;
      continue;
    }

    flushList();
    flushQuote();
    paragraph.push(line.trim());
    index += 1;
  }

  flushAll();
  return out.join("");
}

/* ------------------------------------------------------------------------
 * Page reader (injected into the guest page)
 * --------------------------------------------------------------------- */
function pageReader(): RawPage {
  try {
    const clean = (value: string | null | undefined): string =>
      (value || "").replace(/\s+/g, " ").trim();
    const meta = (selector: string): string => {
      const node = document.querySelector(selector);
      return node ? clean(node.getAttribute("content")) : "";
    };

    let source: HTMLElement | null = null;
    for (const selector of ["article", "main", "[role='main']"]) {
      const candidate = document.querySelector(selector);
      if (candidate instanceof HTMLElement && (candidate.textContent || "").trim().length > 240) {
        source = candidate;
        break;
      }
    }
    if (!source) source = document.body;

    let fullText = "";
    if (source) {
      const clone = source.cloneNode(true) as HTMLElement;
      const junk = [
        "script", "style", "noscript", "template", "svg", "canvas", "iframe",
        "video", "audio", "nav", "footer", "aside", "form", "button", "input",
        "select", "textarea", "[role='navigation']", "[role='banner']",
        "[role='contentinfo']", "[aria-hidden='true']", "[hidden]",
      ].join(",");
      clone.querySelectorAll(junk).forEach((node) => node.remove());

      const blockTags: Record<string, boolean> = {
        P: true, DIV: true, SECTION: true, ARTICLE: true, MAIN: true, HEADER: true,
        FOOTER: true, ASIDE: true, LI: true, UL: true, OL: true, H1: true, H2: true,
        H3: true, H4: true, H5: true, H6: true, TABLE: true, TR: true, TD: true,
        TH: true, BLOCKQUOTE: true, PRE: true, FIGURE: true, FIGCAPTION: true,
        DL: true, DT: true, DD: true, DETAILS: true, SUMMARY: true,
      };
      const parts: string[] = [];
      const walk = (node: Node): void => {
        if (node.nodeType === 3) {
          parts.push(node.nodeValue || "");
          return;
        }
        if (node.nodeType !== 1) return;
        const element = node as HTMLElement;
        const tag = element.tagName;
        if (tag === "BR") {
          parts.push("\n");
          return;
        }
        const block = !!blockTags[tag];
        if (block) parts.push("\n");
        for (const child of Array.from(element.childNodes)) walk(child);
        if (block) parts.push("\n");
        if (tag === "TD" || tag === "TH") parts.push("\t");
      };
      walk(clone);

      fullText = parts
        .join("")
        .replace(/\u00a0/g, " ")
        .replace(/[ \t]+\n/g, "\n")
        .replace(/\n[ \t]+/g, "\n")
        .replace(/[ \t]{2,}/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    }

    const selection = clean(window.getSelection()?.toString() || "");
    const headings: string[] = [];
    document.querySelectorAll("h1, h2, h3").forEach((node) => {
      if (headings.length >= 20) return;
      const text = clean(node.textContent);
      if (text) headings.push(text.slice(0, 180));
    });

    const wordCount = fullText ? fullText.split(/\s+/).filter(Boolean).length : 0;
    const clipped = fullText.slice(0, 30000);

    return {
      title: clean(document.title).slice(0, 300),
      url: String(location.href || "").slice(0, 2000),
      description: (meta('meta[name="description"]') || meta('meta[property="og:description"]')).slice(0, 500),
      lang: clean(document.documentElement.lang).slice(0, 20),
      contentType: String(document.contentType || "").slice(0, 80),
      text: clipped,
      truncated: fullText.length > clipped.length,
      wordCount,
      selection: selection.slice(0, 4000),
      headings,
    };
  } catch {
    return {
      title: "", url: "", description: "", lang: "", contentType: "",
      text: "", truncated: false, wordCount: 0, selection: "", headings: [],
    };
  }
}

function asString(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

function normalizeRawPage(raw: unknown): RawPage | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Record<string, unknown>;
  const headings = Array.isArray(data.headings)
    ? data.headings
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.slice(0, 180))
        .slice(0, 20)
    : [];
  const wordCount = typeof data.wordCount === "number" && Number.isFinite(data.wordCount)
    ? Math.max(0, Math.round(data.wordCount))
    : 0;
  return {
    title: asString(data.title, 300),
    url: asString(data.url, 2000),
    description: asString(data.description, 500),
    lang: asString(data.lang, 20),
    contentType: asString(data.contentType, 80),
    text: asString(data.text, 30000),
    truncated: data.truncated === true,
    wordCount,
    selection: asString(data.selection, 4000),
    headings,
  };
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

/* ------------------------------------------------------------------------
 * Panel
 * --------------------------------------------------------------------- */
export function initAiPanel(deps: AiPanelDeps): AiPanelApp {
  const byId = <T extends HTMLElement>(id: string): T | null =>
    document.getElementById(id) as T | null;

  const panel = byId<HTMLElement>("ai-panel");
  const panelBtn = byId<HTMLButtonElement>("ai-btn");
  const closeBtn = byId<HTMLButtonElement>("close-ai");
  const clearBtn = byId<HTMLButtonElement>("ai-clear");
  const statusBtn = byId<HTMLButtonElement>("ai-status");
  const statusText = byId<HTMLElement>("ai-status-text");
  const contextEl = byId<HTMLElement>("ai-context");
  const contextToggle = byId<HTMLButtonElement>("ai-context-toggle");
  const contextDetails = byId<HTMLElement>("ai-context-details");
  const contextRefresh = byId<HTMLButtonElement>("ai-context-refresh");
  const chipPage = byId<HTMLElement>("ai-chip-page");
  const chipPageLabel = byId<HTMLElement>("ai-chip-page-label");
  const chipTabs = byId<HTMLElement>("ai-chip-tabs");
  const chipApp = byId<HTMLElement>("ai-chip-app");
  const keyPage = byId<HTMLElement>("ai-key-page");
  const keyTabs = byId<HTMLElement>("ai-key-tabs");
  const keySelection = byId<HTMLElement>("ai-key-selection");
  const keyApp = byId<HTMLElement>("ai-key-app");
  const detailPage = byId<HTMLElement>("ai-context-page");
  const detailTabs = byId<HTMLElement>("ai-context-tabs");
  const detailApp = byId<HTMLElement>("ai-context-app");
  const detailSelection = byId<HTMLElement>("ai-context-selection");
  const detailSelectionRow = byId<HTMLElement>("ai-context-selection-row");
  const detailUpdated = byId<HTMLElement>("ai-context-updated");
  const messagesEl = byId<HTMLElement>("ai-messages");
  const emptyEl = byId<HTMLElement>("ai-empty");
  const threadEl = byId<HTMLElement>("ai-thread");
  const scrollBtn = byId<HTMLButtonElement>("ai-scroll-bottom");
  const inputEl = byId<HTMLTextAreaElement>("ai-input");
  const sendBtn = byId<HTMLButtonElement>("ai-send");
  const contextEnabledBtn = byId<HTMLButtonElement>("ai-context-enabled");
  const contextPillLabel = byId<HTMLElement>("ai-context-pill-label");
  const keyHintLabel = byId<HTMLElement>("ai-key-hint-label");
  const disclaimerEl = panel?.querySelector<HTMLElement>(".ai-disclaimer") ?? null;
  const emptyTitleEl = emptyEl?.querySelector<HTMLElement>(".ai-empty-title") ?? null;
  const emptyTextEl = emptyEl?.querySelector<HTMLElement>(".ai-empty-text") ?? null;

  if (!panel || !panelBtn || !inputEl || !sendBtn || !threadEl || !messagesEl) {
    // The AI panel is not part of this document; keep callers safe.
    return {
      setLang: () => {},
      refreshContext: () => {},
      notifyPageChanged: () => {},
      open: () => {},
      close: () => {},
      isOpen: () => false,
    };
  }

  let lang: AiLang = deps.getLang();
  let strings: AiStrings = AI_STRINGS[lang];

  let panelOpen = false;
  let busy = false;
  let includeContext = localStorage.getItem(CONTEXT_STORAGE_KEY) !== "off";
  let messages: AiMsg[] = [];
  let collected: CollectedContext | null = null;
  let contextBusy = false;
  let contextToken = 0;
  let contextTimer = 0;
  let statusKey: "checking" | "ready" | "noModel" | "offline" | "noBridge" = "checking";

  const setText = (el: HTMLElement | null, value: string): void => {
    if (el) el.textContent = value;
  };

  const themeLabel = (theme: string): string =>
    theme === "dark" ? strings.dark : strings.light;

  const formatTime = (at: number): string => {
    try {
      return new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  const formatUpdated = (at: number): string => {
    const seconds = Math.max(0, Math.round((Date.now() - at) / 1000));
    if (seconds < 5) return strings.updatedJustNow;
    if (seconds < 60) return fmt(strings.updatedSeconds, { n: seconds });
    return fmt(strings.updatedMinutes, { n: Math.round(seconds / 60) });
  };

  /* ---- Status ------------------------------------------------------- */
  function renderStatus(): void {
    if (!statusBtn || !statusText) return;
    statusBtn.dataset.state =
      statusKey === "ready" ? "ready"
        : statusKey === "checking" ? "checking"
          : statusKey === "noModel" ? "warn"
            : "error";
    const labels: Record<typeof statusKey, string> = {
      checking: strings.statusChecking,
      ready: strings.statusReady,
      noModel: strings.statusNoModel,
      offline: strings.statusOffline,
      noBridge: strings.statusNoBridge,
    };
    statusText.textContent = labels[statusKey];
  }

  async function refreshStatus(): Promise<void> {
    statusKey = "checking";
    renderStatus();
    if (statusBtn) statusBtn.title = strings.statusHint;
    const api = window.almaAPI;
    if (!api?.aiStatus) {
      statusKey = "noBridge";
      renderStatus();
      return;
    }
    try {
      const result = await api.aiStatus();
      if (!result?.success) {
        statusKey = "offline";
        if (statusBtn) statusBtn.title = result?.error || strings.statusHint;
      } else if (result.hasModel) {
        statusKey = "ready";
      } else {
        statusKey = "noModel";
        if (statusBtn) statusBtn.title = "Run: ollama pull llama3.2:latest";
      }
    } catch {
      statusKey = "offline";
    }
    renderStatus();
  }

  /* ---- Context ------------------------------------------------------ */
  function setContextValue(el: HTMLElement | null, main: string, sub?: string): void {
    if (!el) return;
    el.textContent = "";
    el.appendChild(document.createTextNode(main));
    if (sub) {
      const span = document.createElement("span");
      span.className = "ai-context-sub";
      span.textContent = sub;
      el.appendChild(span);
    }
  }

  function renderContext(): void {
    if (!chipPage || !chipTabs || !chipApp) return;

    contextEl?.classList.toggle("is-disabled", !includeContext);
    if (contextPillLabel) {
      contextPillLabel.textContent = includeContext ? strings.contextOn : strings.contextOff;
    }
    if (contextEnabledBtn) {
      contextEnabledBtn.setAttribute("aria-pressed", String(includeContext));
      contextEnabledBtn.title = strings.contextToggleAria;
    }

    const snapshot = collected?.snapshot ?? null;
    const tabs = collected?.payload.tabs ?? [];
    const app = collected?.payload.app ?? null;

    let pageLabel = strings.reading;
    if (!includeContext) pageLabel = strings.contextOff;
    else if (contextBusy) pageLabel = strings.reading;
    else if (snapshot) {
      if (snapshot.internal) pageLabel = snapshot.title || snapshot.viewLabel || strings.noPage;
      else if (snapshot.readable) pageLabel = snapshot.title || snapshot.url || strings.readingFailed;
      else pageLabel = snapshot.title || strings.readingFailed;
    }
    setText(chipPageLabel, pageLabel);
    if (inputEl && !busy) {
      inputEl.placeholder = snapshot?.internal || !includeContext
        ? strings.placeholderGeneral
        : strings.placeholder;
    }
    if (chipPage) {
      chipPage.title = snapshot
        ? `${snapshot.title || strings.noPage}${snapshot.url ? `\n${snapshot.url}` : ""}`
        : strings.reading;
    }

    const tabCount = tabs.length;
    setText(
      chipTabs,
      tabCount === 1 ? strings.tabOne : fmt(strings.tabMany, { n: tabCount }),
    );
    setText(
      chipApp,
      app ? `${themeLabel(app.theme || "light")} · ${(app.language || "en").toUpperCase()}` : "—",
    );

    setText(keyPage, strings.contextPage);
    setText(keyTabs, strings.contextTabs);
    setText(keySelection, strings.contextSelection);
    setText(keyApp, strings.contextApp);
    setText(contextRefresh, strings.refresh);

    if (detailPage) {
      if (!snapshot) {
        setContextValue(detailPage, strings.reading);
      } else if (snapshot.internal) {
        setContextValue(detailPage, snapshot.title || snapshot.viewLabel || strings.noPage, snapshot.viewLabel);
      } else {
        const words = snapshot.wordCount > 0
          ? fmt(strings.words, { n: snapshot.wordCount })
          : "";
        setContextValue(
          detailPage,
          snapshot.title || strings.noPage,
          snapshot.readable
            ? [snapshot.url, words].filter(Boolean).join(" · ")
            : strings.readingFailed,
        );
      }
    }

    if (detailSelectionRow && detailSelection) {
      const selection = snapshot?.selection || "";
      detailSelectionRow.hidden = !selection;
      if (selection) {
        const preview = clip(selection.replace(/\s+/g, " "), 110).text;
        setContextValue(detailSelection, preview, fmt(strings.selectionText, { n: selection.length }));
      }
    }

    if (detailTabs) {
      const activeTab = tabs.find((tab) => tab.active);
      setContextValue(
        detailTabs,
        tabCount === 1 ? strings.tabOne : fmt(strings.tabMany, { n: tabCount }),
        activeTab?.title ? fmt(strings.currentTab, { title: activeTab.title }) : undefined,
      );
    }

    if (detailApp && app) {
      const appLine = [
        `${themeLabel(app.theme || "light")} · ${(app.language || "en").toUpperCase()}`,
        `${strings.accent} ${app.accent || "—"}`,
        app.splitView ? strings.splitOn : strings.splitOff,
        app.view || "",
      ].filter(Boolean).join(" · ");
      setContextValue(detailApp, appLine, app.windowSize ? `${app.platform || ""} · ${app.windowSize}`.trim() : app.platform);
    }

    if (detailUpdated) {
      detailUpdated.textContent = !includeContext
        ? strings.contextOffHint
        : collected
          ? formatUpdated(collected.capturedAt)
          : strings.reading;
    }
  }

  async function readPage(webview: unknown): Promise<RawPage | null> {
    const view = webview as {
      executeJavaScript?: (code: string, userGesture?: boolean) => Promise<unknown>;
      isDestroyed?: () => boolean;
    } | null;
    if (!view || typeof view.executeJavaScript !== "function") return null;
    try {
      if (typeof view.isDestroyed === "function" && view.isDestroyed()) return null;
    } catch {
      return null;
    }
    try {
      const script = `(${pageReader.toString()})()`;
      const result = await withTimeout(
        Promise.resolve(view.executeJavaScript(script, false)),
        READ_TIMEOUT_MS,
      );
      return normalizeRawPage(result);
    } catch {
      return null;
    }
  }

  async function collectContext(): Promise<CollectedContext> {
    const active = deps.getActiveTab();
    const tabs = deps.getTabs();
    const app = deps.getAppState();

    let raw: RawPage | null = null;
    if (includeContext && active && !active.internal && active.webview) {
      raw = await readPage(active.webview);
    }

    const rawText = raw?.text ?? "";
    const clipped = clip(rawText, MAX_PAGE_CHARS);
    const selection = clip((raw?.selection ?? "").trim(), MAX_SELECTION_CHARS);
    const readable = clipped.text.trim().length > 0;

    const snapshot: PageSnapshot = {
      title: raw?.title || active?.title || strings.noPage,
      url: raw?.url || active?.url || "",
      description: raw?.description || "",
      wordCount: raw?.wordCount || 0,
      truncated: raw?.truncated === true || clipped.truncated,
      selection: selection.text,
      headings: raw?.headings ?? [],
      readable,
      internal: active?.internal ?? false,
      viewLabel: active?.viewLabel || "",
    };

    const payload: AiChatContext = {
      url: snapshot.url,
      title: snapshot.title,
      page: {
        description: snapshot.description,
        lang: raw?.lang ?? "",
        contentType: raw?.contentType ?? "",
        text: includeContext ? clipped.text : "",
        truncated: snapshot.truncated,
        wordCount: snapshot.wordCount,
        selection: includeContext ? selection.text : "",
        headings: snapshot.headings,
      },
      tabs: tabs.slice(0, 40).map((tab) => ({
        title: tab.title,
        url: tab.url,
        active: tab.active,
        pane: tab.pane,
      })),
      app: {
        theme: app.theme,
        accent: app.accent,
        language: app.language,
        languageSetting: app.languageSetting,
        splitView: app.splitView,
        view: app.view,
        customBackground: app.customBackground,
        restoreSession: app.restoreSession,
        windowId: app.windowId,
        platform: app.platform,
        windowSize: app.windowSize,
      },
    };

    return { payload, snapshot, capturedAt: Date.now() };
  }

  async function refreshContext(): Promise<void> {
    if (!panelOpen) return;
    const token = ++contextToken;
    contextBusy = true;
    renderContext();
    try {
      const next = await collectContext();
      if (token !== contextToken) return;
      collected = next;
    } finally {
      if (token === contextToken) {
        contextBusy = false;
        renderContext();
      }
    }
  }

  function notifyPageChanged(): void {
    if (!panelOpen) return;
    window.clearTimeout(contextTimer);
    contextTimer = window.setTimeout(() => {
      void refreshContext();
    }, 350);
  }

  /* ---- Messages ----------------------------------------------------- */
  async function copyToClipboard(text: string): Promise<void> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }
    } catch {
      // fall through to the textarea fallback
    }
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    try {
      document.execCommand("copy");
    } catch {
      // ignore
    }
    helper.remove();
  }

  function buildCopyButton(message: AiMsg): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ai-msg-action";
    button.textContent = strings.copy;
    button.addEventListener("click", () => {
      void copyToClipboard(message.content).then(() => {
        button.textContent = strings.copied;
        window.setTimeout(() => {
          if (button.isConnected) button.textContent = strings.copy;
        }, 1500);
      });
    });
    return button;
  }

  function buildMessage(message: AiMsg): HTMLElement {
    const article = document.createElement("article");
    article.className =
      "ai-msg " + (message.role === "user" ? "ai-msg-user" : "ai-msg-assistant");
    if (message.error) article.classList.add("ai-msg-error");

    if (message.role === "user") {
      const bubble = document.createElement("div");
      bubble.className = "ai-bubble";
      bubble.textContent = message.content;
      article.appendChild(bubble);
      return article;
    }

    const avatar = document.createElement("div");
    avatar.className = "ai-avatar";
    avatar.setAttribute("aria-hidden", "true");
    const avatarImg = document.createElement("img");
    avatarImg.src = "assets/icons/ai.svg";
    avatarImg.alt = "";
    avatar.appendChild(avatarImg);

    const body = document.createElement("div");
    body.className = "ai-msg-body";

    const meta = document.createElement("div");
    meta.className = "ai-msg-meta";
    const name = document.createElement("span");
    name.className = "ai-msg-name";
    name.textContent = "Alma";
    const time = document.createElement("span");
    time.className = "ai-msg-time";
    time.textContent = formatTime(message.at);
    meta.append(name, time);

    const bubble = document.createElement("div");
    bubble.className = "ai-bubble";
    bubble.innerHTML = renderMarkdown(message.content);

    const actions = document.createElement("div");
    actions.className = "ai-msg-actions";
    if (message.error) {
      const retry = document.createElement("button");
      retry.type = "button";
      retry.className = "ai-msg-action danger";
      retry.textContent = strings.retry;
      retry.addEventListener("click", () => retryLast());
      actions.appendChild(retry);
    }
    actions.appendChild(buildCopyButton(message));

    body.append(meta, bubble, actions);
    article.append(avatar, body);
    return article;
  }

  function buildTyping(): HTMLElement {
    const article = document.createElement("article");
    article.className = "ai-msg ai-msg-assistant ai-typing";
    article.setAttribute("role", "status");
    article.setAttribute("aria-label", strings.thinking);

    const avatar = document.createElement("div");
    avatar.className = "ai-avatar";
    avatar.setAttribute("aria-hidden", "true");
    const avatarImg = document.createElement("img");
    avatarImg.src = "assets/icons/ai.svg";
    avatarImg.alt = "";
    avatar.appendChild(avatarImg);

    const bubble = document.createElement("div");
    bubble.className = "ai-bubble";
    for (let i = 0; i < 3; i += 1) {
      const dot = document.createElement("span");
      dot.className = "ai-typing-dot";
      bubble.appendChild(dot);
    }

    article.append(avatar, bubble);
    return article;
  }

  function renderThread(): void {
    if (!threadEl || !emptyEl) return;
    emptyEl.hidden = messages.length > 0;
    threadEl.textContent = "";
    for (const message of messages) {
      threadEl.appendChild(buildMessage(message));
    }
    if (busy) threadEl.appendChild(buildTyping());
  }

  function scrollToBottom(smooth: boolean): void {
    if (!messagesEl) return;
    messagesEl.scrollTo({
      top: messagesEl.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }

  function nearBottom(): boolean {
    if (!messagesEl) return true;
    return messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight < 90;
  }

  function updateScrollButton(): void {
    if (!scrollBtn || !messagesEl) return;
    scrollBtn.hidden = nearBottom() || messages.length === 0;
  }

  function setBusy(next: boolean): void {
    busy = next;
    if (sendBtn) {
      sendBtn.classList.toggle("is-busy", next);
      sendBtn.disabled = next || !inputEl?.value.trim();
    }
    if (clearBtn) clearBtn.disabled = next;
    renderThread();
    updateSendState();
  }

  function updateSendState(): void {
    if (!sendBtn || !inputEl) return;
    sendBtn.disabled = busy || !inputEl.value.trim();
  }

  function resizeInput(): void {
    if (!inputEl) return;
    inputEl.style.height = "auto";
    inputEl.style.height = `${Math.min(inputEl.scrollHeight, 168)}px`;
  }

  function retryLast(): void {
    if (busy) return;
    while (messages.length && messages[messages.length - 1].role === "assistant") {
      messages.pop();
    }
    const lastUser = messages.pop();
    if (!lastUser) return;
    renderThread();
    void sendMessage(lastUser.content);
  }

  async function sendMessage(rawPrompt?: string): Promise<void> {
    if (busy || !inputEl) return;
    const text = (rawPrompt ?? inputEl.value).trim();
    if (!text) return;

    inputEl.value = "";
    resizeInput();
    updateSendState();
    messages.push({ role: "user", content: text, at: Date.now() });
    renderThread();
    scrollToBottom(true);
    setBusy(true);

    let context: AiChatContext | undefined;
    try {
      if (includeContext) {
        contextBusy = true;
        renderContext();
        collected = await collectContext();
        contextBusy = false;
        renderContext();
        context = collected.payload;
      }

      const api = window.almaAPI;
      if (!api?.aiChat) throw new Error(strings.noBridge);
      const chatMessages = messages
        .filter((message) => !message.error)
        .slice(-24)
        .map((message) => ({ role: message.role, content: message.content }));

      const result = await api.aiChat(chatMessages, context);
      if (!result?.success) throw new Error(result?.error || strings.errorPrefix);
      messages.push({
        role: "assistant",
        content: result.reply?.trim() || "…",
        at: Date.now(),
      });
    } catch (error) {
      const rawDetail = error instanceof Error && error.message ? error.message : "";
      let detail = rawDetail;
      if (/fetch failed|econnrefused|not reachable|failed to reach/i.test(rawDetail)) {
        detail = strings.ollamaOffline;
      } else if (/http 404|model .* not found|model not found/i.test(rawDetail)) {
        detail = strings.modelMissing;
      }
      messages.push({
        role: "assistant",
        content: detail ? `${strings.errorPrefix} ${detail}` : strings.errorPrefix,
        at: Date.now(),
        error: true,
      });
    } finally {
      contextBusy = false;
      setBusy(false);
      renderContext();
      scrollToBottom(true);
      inputEl.focus();
    }
  }

  /* ---- Panel open / close ------------------------------------------ */
  function setPanelOpen(open: boolean): void {
    panel!.style.display = open ? "flex" : "none";
    panelOpen = open;
    panelBtn?.classList.toggle("active", open);
    panelBtn?.setAttribute("aria-expanded", String(open));
    deps.onOpenChange?.(open);
    if (!open && panel?.contains(document.activeElement)) panelBtn?.focus();
    if (open) {
      void refreshStatus();
      void refreshContext();
      window.setTimeout(() => {
        inputEl?.focus();
        renderThread();
        updateScrollButton();
      }, 60);
    }
  }

  /* ---- Localisation ------------------------------------------------- */
  function applyStrings(): void {
    strings = AI_STRINGS[lang];
    setText(panel?.querySelector<HTMLElement>(".ai-heading .themes-title") ?? null, strings.title);
    renderStatus();
    if (statusBtn) {
      statusBtn.setAttribute("aria-label", strings.statusAria);
      if (statusKey !== "noModel") statusBtn.title = strings.statusHint;
    }
    if (closeBtn) {
      closeBtn.setAttribute("aria-label", strings.closeAria);
      closeBtn.title = strings.close;
    }
    if (clearBtn) {
      clearBtn.setAttribute("aria-label", strings.clearAria);
      clearBtn.title = strings.newChat;
    }
    if (scrollBtn) scrollBtn.setAttribute("aria-label", strings.scrollAria);
    if (sendBtn) sendBtn.setAttribute("aria-label", strings.sendAria);
    if (inputEl) inputEl.placeholder = strings.placeholder;
    setText(keyHintLabel, strings.keyHint);
    setText(emptyTitleEl, strings.emptyTitle);
    setText(emptyTextEl, strings.emptyText);
    setText(disclaimerEl, strings.disclaimer);

    const suggestions: Array<[string, string]> = [
      [strings.sugSummarize, strings.sugSummarizePrompt],
      [strings.sugTabs, strings.sugTabsPrompt],
      [strings.sugSelection, strings.sugSelectionPrompt],
      [strings.sugState, strings.sugStatePrompt],
    ];
    emptyEl?.querySelectorAll<HTMLButtonElement>(".ai-suggestion").forEach((button, index) => {
      const suggestion = suggestions[index];
      if (!suggestion) return;
      button.textContent = suggestion[0];
      button.dataset.aiPrompt = suggestion[1];
    });

    renderContext();
    renderThread();
  }

  /* ---- Wiring ------------------------------------------------------- */
  panelBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    setPanelOpen(!panelOpen);
  });
  closeBtn?.addEventListener("click", () => setPanelOpen(false));
  clearBtn?.addEventListener("click", () => {
    if (busy) return;
    messages = [];
    collected = null;
    renderThread();
    renderContext();
    updateScrollButton();
    inputEl.focus();
  });
  statusBtn?.addEventListener("click", () => {
    void refreshStatus();
  });
  contextToggle?.addEventListener("click", () => {
    const expanded = contextToggle.getAttribute("aria-expanded") === "true";
    contextToggle.setAttribute("aria-expanded", String(!expanded));
    if (contextDetails) contextDetails.hidden = expanded;
    if (!expanded && !collected) void refreshContext();
  });
  contextRefresh?.addEventListener("click", () => {
    void refreshContext();
  });
  contextEnabledBtn?.addEventListener("click", () => {
    includeContext = !includeContext;
    localStorage.setItem(CONTEXT_STORAGE_KEY, includeContext ? "on" : "off");
    renderContext();
    if (includeContext) void refreshContext();
  });
  inputEl.addEventListener("input", () => {
    resizeInput();
    updateSendState();
  });
  inputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  });
  sendBtn.addEventListener("click", () => {
    void sendMessage();
  });
  emptyEl?.querySelectorAll<HTMLButtonElement>(".ai-suggestion").forEach((button) => {
    button.addEventListener("click", () => {
      const prompt = button.dataset.aiPrompt;
      if (prompt) void sendMessage(prompt);
    });
  });
  messagesEl.addEventListener("scroll", updateScrollButton);
  scrollBtn?.addEventListener("click", () => {
    scrollToBottom(true);
    inputEl.focus();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !panelOpen) return;
    const modal = document.querySelector<HTMLElement>(".modal-overlay");
    if (modal && modal.style.display !== "none") return;
    event.preventDefault();
    setPanelOpen(false);
  });

  applyStrings();
  resizeInput();
  updateSendState();
  renderThread();
  renderContext();
  updateScrollButton();

  /* Keep the "updated x ago" label fresh while the panel is open. */
  window.setInterval(() => {
    if (panelOpen && collected && !contextBusy) renderContext();
  }, 30000);

  return {
    setLang(next: AiLang) {
      if (next === lang) return;
      lang = next;
      applyStrings();
      resizeInput();
      updateSendState();
    },
    refreshContext() {
      void refreshContext();
    },
    notifyPageChanged,
    open() {
      setPanelOpen(true);
    },
    close() {
      setPanelOpen(false);
    },
    isOpen() {
      return panelOpen;
    },
  };
}
