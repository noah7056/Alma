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
├── src/renderer/home.html  # Custom home page (Alma-branded, Google-powered search)
├── src/renderer/renderer.ts# Renderer logic: nav controls, URL resolution, view toggling
├── src/renderer/styles.css # Toolbar, home page, theme styling
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
- [x] Address bar stays Google-powered (search queries resolve to Google)
- [x] Icon placeholders in `src/assets/icons/`

### Phase 2 — Multi-window / tab support
- [x] Tab model: each tab owns a `<webview>` plus URL/title state
- [x] Tab strip UI with close buttons and active-tab indication
- [x] "New window" spawns a top-level `BrowserWindow` starting at the home page
- [x] Persist tab order and allow reordering via drag-and-drop

### Phase 3 — Navigation & address bar
- [x] Sync address bar with `did-navigate` / `did-finish-load` / `did-fail-load` webview events
- [x] Smart URL resolution: bare domains get `https://`, space-separated input becomes a Google search
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

## Running

```bash
npm install
npm run build
npm run electron
```

## Notes

- The custom home page (`home.html`) is rendered directly in the renderer DOM (not inside `<webview>`) because Electron blocks `file://` navigation inside webview tags for security. External websites load inside `<webview>`.
- The address bar always resolves to Google for searches, even from the home page.
- IPC surface: `browser:new-window`, `browser:navigate`, `browser:get-title`, `browser:get-url`, `window:minimize`, `window:maximize`, `window:close`, `window:is-maximized`.
- Drop your custom icons into `src/assets/icons/` and reference them from `index.html` or `styles.css`.
