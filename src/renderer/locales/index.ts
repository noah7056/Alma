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
