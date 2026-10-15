# Changelog

BrandOS uses semantic versioning: patch (1.0.x) for fixes and rule changes, minor (1.x.0) for new features, major (x.0.0) for breaking changes.

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
