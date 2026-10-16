# Changelog

BrandOS uses semantic versioning: patch (1.0.x) for fixes and rule changes, minor (1.x.0) for new features, major (x.0.0) for breaking changes.

## 1.2.2

- Command menus rest cleanly: the panel clips instead of scrolling, so the search field can't be pushed out of place, and the pre-selected first item only shows its highlight once the menu is in use.
- Guide: demos that grab focus on load no longer scroll the page or their own panels.

## 1.2.1

- Hover only on things you can click: table rows (including header and footer rows) and plain ghost badges no longer change on hover.
- Input groups and comboboxes keep the field's inner padding when there is no icon or prefix on that side, so text no longer touches the edge.
- File inputs show a real browse button.
- Guide: the light and dark switch works inside sandboxed pages and follows the host's theme; demos that are hard to read at a glance (right-to-left direction, combobox) have a short note.

## 1.2.0

Editorial layout, heading fonts and a visual guide.

- Heading and body fonts: `brandos extract` reads the family name stored inside font files, so a heading face whose files are in `brand-source/` (for example a licensed slab) becomes `fonts.display` even when the guide doesn't name it. Serif and slab faces get serif fallbacks and a matching free stand-in until the files are added. Italic files named "It" are detected.
- New layout layer in `brandos-ui.css`: `bos-display`, `bos-h1`, `bos-h2`, `bos-h3`, `bos-lead`, `bos-stat`, `bos-kicker`; `bos-hero`, `bos-stats`, `bos-block`, `bos-sec-head`, `bos-feature-grid`; `bos-surface` (solid, for the one featured thing per section), `bos-glass`, `bos-rows` and `bos-row` (glass, solid on hover), `bos-tile`; charms (`bos-charm` in six shapes, four fills, three sizes) and `bos-avatar`; `bos-pill`; `bos-band` (the brand gradient with a glass button); `bos-table` with `bos-rank` and `bos-row-self`.
- Secondary buttons are glass and turn solid on hover, in every kit: `bos-btn-glass`, the React and CSS kits' secondary and glass variants, and PrimeVue secondary and outlined buttons. New `bos-btn-primary`, `bos-btn-sm`, `bos-btn-lg`.
- Backdrop: one glow of brand colour fixed at the top edge (it no longer drifts), so glass always has colour behind it. The old three-corner pools are `data-aura="soft"`.
- Sticky app bar: the wrap no longer fades the page out, so the glass bar shows content blurring under it (`data-fade` restores the fade). `bos-shell bos-glass` is the most frosted glass.
- Theme: new `--band-1` to `--band-4`, `--band-foreground` and `--gradient-brand` (contrast-checked for white text, 150 checks per theme), `--shadow-sm`, `--shadow-md`, `--shadow-lg` tinted with the brand's neutral, and `--display-weight`.
- Fix: tints mixed with white or the text colour now use OKLab, so a pale tint keeps its hue. Before, pale tints of green, teal and blue brands drifted towards pink (PrimeVue `primary.50` to `300`, and several `color-mix` tints).
- Fix: chat bubbles in the glass style put the glass on the bubble, not on a rectangle behind it. Native selects from the kit no longer show two arrows. Grids no longer widen the page when a child has wide content.
- New visual guide: `node scripts/build-guide.mjs` builds a page with every component (live), the layout patterns, tokens, diagrams and rules, in any set of brands.

## 1.1.0

Palette lock: apps may only use brand colours (plus black, white and greys) and brand fonts, and BrandOS checks it.

- `brandos theme` writes `palette.json`: the brand's colour families (by hue) and allowed fonts. Install copies it into the app.
- `brandos audit` now lists every off-brand colour and font in the app's code, with file and line, and fails until there are none.
- New `brandos verify <url> --app <app>`: opens the running app in a real browser, in light and dark, and lists every off-brand colour and font actually on screen, including values from data, runtime styles, third-party components and icons. Needs Playwright.
- A colour passes when it is a neutral or shares a hue with a brand colour; pale tints get a wider tolerance because their hue drifts.
- Theme: chart colours, backdrop and the dark-mode focus ring now come only from brand colours (no invented hues). A brand without an error colour gets a flagged standard red.
- PrimeVue: every stock colour ramp is remapped (danger to the destructive colour, warn and info to neutral, the rest to the brand colour), so no severity can show a non-brand colour.
- Fonts: inside `bos-backdrop`, body text uses the brand UI font, headings the display font, code the mono font.
- Install records the app's dark-mode selector and keeps every BrandOS file in the manifest across re-installs.

## 1.0.8

- PrimeVue preset passes strict TypeScript, including `noUncheckedIndexedAccess`. Fixes two type-check errors in apps with strict settings.
- Migration skill: record the app's type-check, lint and test results before starting, re-run them after every item, and fix anything the migration newly breaks.
- Migration skill: guard browser APIs (localStorage, matchMedia, ResizeObserver) so tests and server rendering keep working.

## 1.0.7

- Native selects: the arrow is replaced by an inset chevron with right padding, so values never touch the edge or run under the arrow. Applies to `bos-select` and every single-choice select inside `bos-backdrop`, with hover and focus states.
- `bos-filters`: a search and filter row where every control shares one height and wraps cleanly.
- `bos-shell-wrap`: a sticky wrapper for the app bar that fades content out as it scrolls under, so nothing shows in the gap above the bar.
- Design rule: controls have breathing room on both sides, and controls in one row share one height.

## 1.0.6

- Auras: `bos-backdrop` now adds two very soft, blurred pools of light (a warm one from the primary, top left, and a cooler one from the backdrop colours, bottom right) that drift slowly. Optional third aura with `<div class="bos-aura">` for long pages. Strength is one token, `--aura-strength` (0.35 light, 0.28 dark), and blur is `--aura-blur`.
- Auras stop moving under prefers-reduced-motion and disappear under prefers-reduced-transparency.
- Backdrop and aura colours now come only from the brand: with fewer than three brand colours they stay close to the primary hue instead of inventing new hues.

## 1.0.5

- Install now always refreshes the files BrandOS owns (theme, fonts, tokens, shared styles, presets, markup) and re-applies app-specific settings such as the dark-mode selector. Fixes dark mode breaking when a newer theme.css was copied into an app by hand.
- Install output lists "Updated BrandOS files" separately from conflicts.
- Rule (AGENTS.md, brand-apply): update by re-running `brandos theme` and `brandos install`, never by copying files.

## 1.0.4

- Extract reads what the guide says, not just what appears most: colours labelled primary, secondary, accent, neutral, background or error (before or after the colour code) are used for those roles, even when the primary is dark or muted.
- Font roles from the guide: "Headline font" becomes the display font and "Body font" the UI font.
- Font names are cleaned up ("Space Grotesk Space Grotesk SemiBold" becomes "Space Grotesk").
- The extract summary shows the background colour when the guide sets one.

## 1.0.3

- Motion tokens: `--motion-fast` (120ms), `--motion-base` (200ms), `--motion-slow` (320ms), `--ease-out`, `--ease-in-out`.
- Motion classes in brandos-ui.css: `bos-enter`, `bos-stagger`, page transitions (`bos-page-*`), `bos-skeleton`; overlays pop in, progress bars grow in, clickable things press in slightly.
- PrimeVue overlays, dialogs and progress bars use the same motion.
- Everything respects prefers-reduced-motion.
- Design rule: motion is small, quick and purposeful; entrances play once.

## 1.0.2

- App bar that cannot overlap: `bos-shell` (brand | nav | actions grid), `bos-nav` with `data-priority="low"` items moving into a "More" menu when space is tight, and a menu button below 768px.
- Design rules: plan the nav for the role with the most items (about 6 to 7 top-level items, the rest in "More"); theme switcher and admin tools go in the user menu; check layouts at 1440, 1280, 1024, 768 and 390px for every role.

## 1.0.1

Lessons from the first real migration, built into the system so every brand gets them.

### Theme (`brandos theme`)

- Frost tiers: `--frost-strong`, `--frost-medium`, `--frost-light`, `--frost-border` and `--overlay`, light and dark. Text is contrast-checked on every tier over the backdrop.
- Brand ramp: `--ramp-0` to `--ramp-5` with `--ramp-N-foreground`, one hue from pale to the full brand colour (dim to bright in dark mode), for ordered things like levels or tiers. Every step is checked for 4.5:1 text.
- Muted progress colours: `--progress-fill` and `--progress-track`, a mid neutral checked at 3:1 against its track.
- Spacing scale: `--space-1` to `--space-9` (4 to 96 px).
- Calmer backdrop: paler, lower-chroma colour fields, so glass reads as frosted rather than tinted.
- Contrast checks grew from 74 to 140 per theme.

### Shared UI layer (`brandos-ui.css`, installed by every kit)

- Classes for the backdrop, frost tiers, cards, page header and titles, sections, one segmented control for tabs and filters, glass buttons with full states, whole-card links, chips, ramp colours and dots, and progress bars.
- Reduced-motion and reduced-transparency fallbacks.

### PrimeVue bridge

- Cards and panels are medium frost; menus, dropdowns and dialogs use the near-opaque overlay so nothing shows through.
- Progress bars are muted by default (`bos-progress-primary` for the one main bar).
- Severities follow the colour budget: success uses the brand colour, info is neutral, danger uses the destructive colour.
- Toggle and segmented selections are neutral.
- The installer now flags an app's own preset that is defined but no longer applied.

### Scan

- Finds colours that come from data or code: colour fields read from objects, colour maps in code, and status props such as `severity="success"`.

### Design rules (ui-migrate skill)

- Make it systemic: restyle shared components and point the app's own tokens at the theme before working page by page.
- Colour sweep beyond CSS: inline bindings, code maps, status props, API data, images and charts.
- Glass is the surface; importance is shown by frost level, never by solid white.
- Colour budget: about 90% neutrals; brand colour for the primary action, active navigation, focus ring and the user's own status.
- One spacing scale and shared page header; no icons before page titles, no empty dividers, no nested cards.
- One neutral segmented control for every tab bar and filter.
- Hover only on things you can click.
- Ordered things use one hue from pale to full, with the name always shown; status is not a traffic light.
- Progress bars are a muted neutral.

## 1.0.0

First release.

- `brandos extract` reads a PDF, PowerPoint, website or image, writes brand.json and generates the theme in one step, and finds licensed font files next to the source.
- Contrast-checked theme generation (WCAG 2.2 AA, light and dark, including text on glass).
- React kit (64 Glass UI components on shadcn/ui and Base UI), CSS kit with exact HTML markup for any framework, and a PrimeVue 4 bridge.
- `install`, `scan` (page-by-page MIGRATION.md), `audit` and a local `preview`.
- Agent skills for intake, apply, migrate and audit.
