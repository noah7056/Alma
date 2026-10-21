# Icon Assets

Place your custom icons here. Replace the placeholder SVGs with your own designs.

Files:
- `alma.svg` — App icon (shown in title bar)
- `back.svg` — Back navigation button
- `forward.svg` — Forward navigation button
- `reload.svg` — Reload button
- `home.svg` — Home button
- `new-window.svg` — New window button (+)
- `theme.svg` — Theme toggle (light/dark)

To use them in the app, update `src/renderer/index.html` or `src/renderer/styles.css` to reference these files, e.g.:

```html
<img src="../assets/icons/alma.svg" alt="Alma" />
```

or in CSS:

```css
.title-bar-name::before {
  content: url("../assets/icons/alma.svg");
}
```
