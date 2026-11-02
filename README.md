# Alma

A personal browser built with Electron and TypeScript.

## Structure

```
Alma/
├── package.json
├── tsconfig.main.json
├── tsconfig.renderer.json
├── src/main/main.ts        # Main process: window lifecycle, IPC, multi-window
├── src/main/preload.ts     # Preload script: contextBridge expose of almaAPI
├── src/renderer/index.html # Renderer UI: toolbar, address bar, home view, webview
├── src/renderer/home.html  # Custom home page (Alma-branded)
├── src/renderer/search.html# Alma Custom Search shell
├── src/renderer/search.ts  # Alma Search: native Tavily-powered search engine UI
├── src/renderer/renderer.ts# Renderer logic: nav controls, URL resolution, view toggling
├── src/renderer/presentations.ts # Alma Presentations: deck editor (slides, canvas, presenter)
├── src/renderer/calendar.ts     # Alma Calendar: day/week/month views, events, reminders
├── src/renderer/ai.ts           # Alma AI: chat UI, Markdown, browser-context collection
├── src/renderer/styles.css # Toolbar, home page, native apps, theme styling
├── src/assets/icons/       # Placeholder SVGs — drop your custom icons here
│   ├── alma.svg
│   ├── back.svg
│   ├── forward.svg
│   ├── reload.svg
│   ├── home.svg
│   ├── new-window.svg
│   └── theme.svg
└── README.md
```

## UI layout

The renderer is a single shell (title bar → tab strip → toolbar → content area) that
swaps the content area between views. Every view follows the same rules:

| View | Layout |
| --- | --- |
| Home | Centred column: logo, search box, shortcuts; native apps live in the **apps panel** (grid button, top right) |
| History / Favorites | `page-panel`: title + subtitle header, scrollable list, footer actions |
| Documents | List page (header + search + grid of documents) and, on click, a full-width editor page |
| Sheets | Same list-page shell, plus a spreadsheet editor: formula bar, cell grid, sheet tabs |
| Presentations | Same list-page shell, plus a deck editor: slide filmstrip, 16:9 canvas, formatting toolbar, properties panel, presenter mode |
| Calendar | Full-screen scheduler: mini month picker, calendar list, month / week / day views, event editor with reminders |

The right-side overlays (Themes, Favorites, Language and Alma AI) share one
glass panel shell (`.themes-panel`): 400px wide, 20px left corners, the same
blurred surface, header treatment, 38px controls, focus rings and thin
scrollbars. The settings menu is a compact dropdown built from the same
material.

Native apps share the `.docs-page` shell, so adding a new one is a matter of
copying the header markup. Opening a document swaps the list page for the
editor page (`.is-editing` on the view); the back arrow returns to the list.

Sheets follows the same two-page pattern: the list page uses the shared
`.docs-list` grid, while the editor page is a spreadsheet surface (formula bar,
`.sheets-grid` table, sheet tabs, status bar). Both live in `renderer.ts`
under the `// ---- Sheets App ----` section and persist to `localStorage`
under `alma:sheets`.

Presentations lives in its own module (`src/renderer/presentations.ts`) and
persists to `alma:presentations`. `renderer.ts` only drives it through the
`presentationsApp` facade (`onShow`, `isEditing`, `closeEditor`, `setLang`).

Calendar follows the same pattern in `src/renderer/calendar.ts`, persisted
under `alma:calendar_events` and `alma:calendar_calendars`, and driven through
the `calendarApp` facade. It is the only native app without a list page: it
opens straight onto the schedule.

Alma AI (`src/renderer/ai.ts`) is a right-side overlay, not a tab view. It is
driven through the `aiApp` facade (`open`, `close`, `setLang`,
`notifyPageChanged`, `refreshContext`) and talks to the local Ollama model over
the `ai:status` / `ai:chat` IPC channels. `renderer.ts` passes it lazy getters
for the tab list, active tab and app state, so the module never reaches into
renderer internals directly.

### Internal view history

The home page and the native apps are overlays on top of the webview, so the
webview's own history cannot walk between them. Every tab therefore keeps an
`internalStack` (plus an `internalForward` for the forward button) of the
internal views it visited — home, history, favorites, documents, sheets,
presentations. Back pops that stack, forward replays it, and the back/forward
buttons are enabled from it instead of from the webview. Opening a native app
while its editor is open steps back to the app's list first, and only then to
the home page. Native app visits are recorded in the history list like any
other page.

## Scripts

- `npm run build` — compile main + renderer TypeScript + copy assets
- `npm run build:main` — compile main process
- `npm run build:renderer` — compile renderer
- `npm run build:copy-assets` — copy HTML/CSS to dist/
- `npm run electron` — run Electron
- `npm run dev` — build renderer then run Electron (concurrently)
- `npm run typecheck` — typecheck both projects without emitting
- `npm run lint` — lint TS/HTML

## Implementation plan

### Phase 1 — Foundation (done)
- [x] Electron + TypeScript scaffold with separate tsconfigs for main/renderer
- [x] Frameless window with custom title bar (app name centered, drag via CSS `-webkit-app-region`)
- [x] Main process with `BrowserWindow` lifecycle and IPC handlers
- [x] Preload script exposing `almaAPI` via `contextBridge` (nav + window controls)
- [x] Renderer with custom title bar, toolbar, address bar, back/forward/reload/home/new window
- [x] Theme support (light/dark, persisted in localStorage)
- [x] Custom home page (`src/renderer/home.html`) rendered in the renderer; webview used only for external sites
- [x] Address bar resolves search queries to native Alma Search (powered by Tavily)
- [x] Icon placeholders in `src/assets/icons/`

### Phase 2 — Multi-window / tab support
- [x] Tab model: each tab owns a `<webview>` plus URL/title state
- [x] Tab strip UI with close buttons and active-tab indication
- [x] "New window" spawns a top-level `BrowserWindow` starting at the home page
- [x] Persist tab order and allow reordering via drag-and-drop

### Phase 3 — Navigation & address bar
- [x] Sync address bar with `did-navigate` / `did-finish-load` / `did-fail-load` webview events
- [x] Smart URL resolution: bare domains get `https://`, space-separated input becomes an Alma Search
- [x] Back/forward enabled state driven by webview history
- [x] Home button returns to the custom Alma home page
- [ ] Page title reflected in custom title bar

### Phase 4 — Security & hardening
- [x] Enable `contextIsolation` and `sandbox` where feasible; review `sandbox: false` usage
- [x] Restrict `setWindowOpenHandler` to deny popups (open externally instead)
- [x] Validate/sanitize URLs before navigation to avoid `javascript:`/`data:` injections
- [x] Content-Security-Policy for renderer (basic CSP header added)

### Phase 5 — Personal-browser features
- [ ] Bookmarks (read/write to userData JSON)
- [x] History page (local SQLite or JSON log)
- [ ] Settings: default search engine, homepage, theme
- [x] Session restore on launch
- [x] Chrome-like right-click context menus (webview, links, media, text selection, editable fields, tabs, tab strip, address bar)
- [x] Reopen closed tabs (`Cmd+Shift+T` / `Ctrl+Shift+T`)
- [ ] Extension-style content scripts via `webview` preloads

### Phase 6 — Native apps
- [x] Shared app shell (`.docs-page`): full-width header + content, used by Documents/Sheets/Presentations
- [x] Native apps launched from the apps panel on the home page
- [x] Documents: list page with search, rename, delete, relative "edited" times; clicking a document opens a full-width editor page
- [x] Documents: A4 page (210 × 297 mm) rendered on a canvas, printed/exported as A4
- [x] Documents: formatting toolbar — block style, font family, font size, bold/italic/underline/strike-through, text colour, highlight, alignment, lists, links, divider, clear formatting, undo/redo
- [x] Documents: autosave, word count and export (PDF/TXT/HTML/MD)
- [x] Sheets: list page with search, rename, delete, relative "edited" times; clicking a spreadsheet opens the grid editor
- [x] Sheets: cell grid with row/column headers, sticky headers, drag-to-resize columns, range selection and keyboard navigation (arrows, Tab, Enter, F2, Delete, Home/End)
- [x] Sheets: formula engine — arithmetic, comparisons, string concat, cell/range references (including `Sheet2!A1`), and functions (SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, MEDIAN, PRODUCT, ROUND, ABS, SQRT, POWER, MOD, INT, IF, AND, OR, NOT, CONCATENATE, LEN, UPPER, LOWER, TRIM) with circular-reference detection
- [x] Sheets: formatting toolbar — number format (general/number/thousands/percent/currency/scientific), bold/italic/underline, text and fill colour, alignment; insert/delete rows and columns
- [x] Sheets: multiple sheet tabs (add/rename/delete/switch), formula bar, live range stats (sum/average/count/min/max), undo/redo, autosave and export (CSV/TSV/JSON/HTML/PDF)
- [x] Presentations: list page with search, rename, delete, deck preview thumbnails and relative "edited" times; clicking a deck opens the editor
- [x] Presentations: slide filmstrip with live thumbnails, drag-to-reorder, new/duplicate/delete slide and six layouts (title, title + body, title only, two columns, section header, blank)
- [x] Presentations: 16:9 slide canvas with text boxes, shapes (rectangle/ellipse/triangle) and images — select, drag, resize from eight handles, double-click to edit text
- [x] Presentations: formatting toolbar and properties panel (position/size, font size, bold/italic/underline, bullets, alignment, text and fill colour, z-order, duplicate, delete), undo/redo, autosave
- [x] Presentations: presenter mode (fullscreen, arrow keys, progress bar) and export (PDF/HTML/JSON)
- [ ] Presentations: speaker notes
- [x] Calendar: day, week and month views over the hours of the day, the days of the week and the months of the year
- [x] Calendar: event editor (title, date, start/end, all day, calendar, reminder, description) with create, edit and delete
- [x] Calendar: drag on the time grid to create an event, drag an event to move it (it stays under the cursor), drag its top or bottom edge to resize in either direction, snapped to 15 minutes
- [x] Calendar: single click opens a details popup (time, calendar, description) with edit and delete; double click opens the full editor
- [x] Calendar: overlapping events share the column side by side; all-day events sit in their own row
- [x] Calendar: multiple calendars with colours and visibility toggles, mini month picker, reminders with in-app notifications
- [ ] Calendar: recurring events, search and multiple time zones

### Phase 7 — Alma AI
- [x] Slide-over chat panel: status dot, context strip, empty state with suggestions, clear chat
- [x] Polished message bubbles: user/assistant styling, avatars, timestamps, Markdown (lists, headings, code fences, links, quotes), copy and retry actions
- [x] Auto-growing composer with Enter-to-send, Shift+Enter newlines, context on/off toggle and per-message busy state
- [x] Typing indicator, error bubbles with retry, scroll-to-latest affordance, Escape to close
- [x] Read the active page: title, URL, meta description, language, headings, selected text and readable body text (scripts/nav/footer stripped, truncated to 14k characters)
- [x] Share the open tabs of the current window, the focused split pane and the real page titles (the tab strip keeps its short site names)
- [x] Share app state: theme, accent colour, UI language and language setting, current view, split view, custom home background, session-restore setting, window size and platform
- [x] Context strip shows what will be sent, with an expandable preview and manual refresh; context auto-refreshes on navigation, tab switches and theme/language changes
- [x] Untrusted page text is delimited in the system prompt with an explicit prompt-injection guard
- [ ] Alma AI: streaming replies, chat history persistence and tool/actions (navigate, open tabs, change settings)

## Running

```bash
npm install
npm run build
npm run electron
```

## Notes

- The custom home page (`home.html`) is rendered directly in the renderer DOM (not inside `<webview>`) because Electron blocks `file://` navigation inside webview tags for security. External websites load inside `<webview>`.
- The address bar and home search resolve to the native Alma Search interface (`search.html?q=...`), fetching web results, AI overviews, and images via the Tavily API (configured securely via `TAVILY_API_KEY` in `.env`).
- IPC surface: `browser:new-window`, `browser:navigate`, `browser:get-title`, `browser:get-url`, `browser:search-web`, `window:minimize`, `window:maximize`, `window:close`, `window:is-maximized`, `ai:status`, `ai:chat`.
- Alma AI runs entirely against a local Ollama instance (`http://127.0.0.1:11434`, model `llama3.2:latest`). Browser context is only sent to that local endpoint, never to a remote service, and the "Context off" pill in the composer keeps even the local model blind to the page. Page text is read with `webview.executeJavaScript()` and is always treated as untrusted data.
- Drop your custom icons into `src/assets/icons/` and reference them from `index.html` or `styles.css`.
- Translations live in two places: `src/renderer/locales/index.ts` and the inlined copy at the top of `src/renderer/renderer.ts` (inlined because the renderer is loaded as a plain ES module). Keep both in sync when adding a string. `src/renderer/presentations.ts` and `src/renderer/ai.ts` keep their own string tables for the deck editor and the AI panel.
- The native app names (Documents, Sheets, Presentations) are proper nouns and stay in English in every language.
