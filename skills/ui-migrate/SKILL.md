---
name: ui-migrate
description: Rebuild an existing app's UI with the BrandOS component kit, one page at a time, with the person approving each page before moving on. Swaps hand-built elements for kit components and restructures parts of pages into better components. Use after brand-apply has installed the kit, or when someone asks to make their app use the components.
---

# UI migration, page by page

Goal: every page uses the kit components and theme tokens, behaves exactly as before, and has been approved by the person.

## 0. Understand the app first

Before touching code, read the main routes and components and tell the person in two or three sentences what you think the app is for and who uses it. Ask them to confirm or correct. Restructuring decisions depend on this.

## 0b. Record the baseline

Before changing anything, run the app's own checks and note the results: type-check, lint and tests (for example `npm run typecheck`, `npm run lint`, `npm test`). After each item, run them again. Anything that newly fails is caused by the migration and must be fixed before the item is shown; anything that already failed is reported, not hidden.

## 1. Make the plan

```
brandos scan <app>
```

This writes `MIGRATION.md`: shared layout first, then every page, each with the hand-built elements found and the component that replaces them, plus hard-coded colours to remove. Read it, fix anything it got wrong (missed pages, wrong order), and show the person the list of pages in order.

`MIGRATION.md` is the source of truth for progress. If it already has `[x]` or `[~]` items, you are resuming: continue from the first item that is not `[x]`.

## 1b. Make it systemic first

Before any single page, find the app's shared building blocks (card, panel, stat card, page header, section header, badge, pill, avatar, progress bar, button, chip, table, empty state) and list which pages use each. Restyle those once, with the shared layer, so every page inherits the change. Styling one page's own elements leaves every other page behind.

Also point the app's own design tokens (its CSS variables for primary, text, borders, surfaces, radius, font) at the BrandOS theme variables in one file, imported after the app's CSS. That moves the whole app onto the brand in one step.

### The shared layer (brandos-ui.css)

Every kit installs `brandos-ui.css`. Use its classes and the theme variables instead of writing new styles:

| Need | Use |
|---|---|
| Background behind the app | `bos-backdrop` on the root element: one glow of brand colour fixed at the top edge, so glass always has colour to frost (`data-aura="soft"` for pools in three corners; `bos-aura` adds a second glow lower down on long pages) |
| The one featured thing in a section (the next step, the user's level, a key form) | `bos-surface` (solid, soft shadow; `bos-surface-lg` for the hero card) |
| Secondary items, the app bar, floating controls | glass: `bos-glass`, rows in `bos-rows` > `bos-row` (solid on hover when clickable) |
| Repeating cards in a grid | `bos-tile` in `bos-grid-3` or `bos-grid-2` (solid on hover when it is a link) |
| Panels and ordinary cards in dense app screens | `bos-frost` (`bos-frost-strong`, `bos-frost-light` for the other tiers) |
| Menus, dropdowns, popovers, dialogs | `bos-overlay` |
| Card padding and radius | `bos-card`, `bos-card-compact` |
| App bar (brand, nav, actions) | `bos-shell` with `bos-brand`, `bos-nav` > `bos-nav-list`, `bos-actions`; `data-priority="low"` on items that may move into `bos-nav-more`; `bos-nav-toggle` for small screens |
| Page title block (app screens) | `bos-page-header` with `bos-title` and `bos-subtitle` |
| App shell (every app, same anatomy) | The glass pill nav: `bos-shell-wrap` > `bos-container` > `bos-shell bos-glass` with `bos-brand` (logo, name, optional `<small>` subtitle), `bos-nav` > `bos-nav-list` (up to 6 main pages, `aria-current="page"` on the active one) followed by `<details class="bos-menu-wrap bos-nav-more">` (More, grouped with `bos-menu-group` and `bos-menu-label`), then `bos-actions`: search, the one Create action (`bos-btn-primary`), and the user menu (`<details class="bos-menu-wrap bos-menu-end">`: settings, admin, theme, sign out). The sidebar shell (`bos-app`, `bos-sidebar`) is only for an app the person explicitly wants it for |
| Page layout | `bos-container` (or `bos-content`) for width and margins, `bos-page` for the stack of title block and sections, `bos-stack` inside a section. Never set page width, margins or section spacing by hand |
| The top of a page | One of the heroes in "Choosing the top of a page" below: `bos-hero-compact`, `bos-hero-overview`, `bos-hero-search`, `bos-hero-chat`, `bos-hero-split`, or `bos-record-header` |
| Type sizes | `bos-display` (landing and welcome only), `bos-h1` (every page title, home included), `bos-h2`, `bos-h3`, `bos-lead`, `bos-stat`. Sizes come from `--text-*`; never set a heading size by hand |
| Work queues, big search, chat | `bos-queue` (numbered next actions, the first is solid), `bos-search-xl`, `bos-composer`, `bos-suggestions` |
| Type scale | `bos-display`, `bos-h1`, `bos-h2`, `bos-stat` use the brand's heading font; `bos-h3`, `bos-lead`, `bos-label`, `bos-caption`, `bos-kicker` use the body font |
| Section with a featured item and a list | `bos-block` > `bos-sec-head` (title plus `bos-text-link`), then `bos-feature-grid` with a `bos-surface bos-feature` and a `bos-rows` list |
| The closing call to action | `bos-band` (the brand gradient, once per page) with a `bos-btn-glass` on it |
| Badges, avatars, icon frames | charms: `bos-charm` plus a shape (`bos-charm-petal`, `-leaf`, `-arch`, `-bloom`, `-pebble`, `-tab`), a fill (gradient by default, `-primary`, `-soft`, `-secondary`) and a size (`-sm`, `-md`, `-lg`); `bos-avatar` for initials |
| The user's own status | `bos-pill` |
| Ranked lists, leaderboards | `bos-table-wrap` > `bos-table`, `bos-rank` (`bos-rank-top` for first), `bos-row-self` on the user's row |
| Sections | `bos-section`, `bos-section-title` |
| Tabs, filters, view switches | `bos-segmented` (selected item: `aria-selected="true"`, `aria-pressed="true"` or `data-active`), counts in `bos-count` |
| Buttons | `bos-btn-primary` (one per view), `bos-btn-glass` for every secondary action (glass at rest, solid on hover); sizes `bos-btn-sm`, `bos-btn-lg`. Component-library secondary and glass buttons follow the same rule automatically |
| A whole card that is a link | `bos-card-link` on a real `<a>` or `<button>` |
| Tags and status | `bos-chip`, `bos-status-done` |
| Ordered steps (levels, tiers, stages) | `--ramp-0` to `--ramp-5` with `--ramp-N-foreground`, classes `bos-ramp-N`, `bos-dot-N`, `bos-ramp-gradient` |
| Progress | `bos-progress` (muted), `bos-progress-primary` for the user's one main bar |
| Motion | `bos-enter` (one block appearing), `bos-stagger` (list or grid, children arrive in turn), `bos-page-*` (route changes), `bos-skeleton` (loading); overlays and progress animate automatically |
| Search and filter rows | `bos-filters` (one height, aligned); native selects get an inset chevron and right padding automatically, or add `bos-select` |
| Sticky app bar | `bos-shell bos-glass` inside `bos-shell-wrap`; content scrolls under the bar and blurs through it (`data-fade` on the wrap hides content in the gap above instead) |
| Spacing | `--space-1` to `--space-9` (4, 8, 12, 16, 24, 32, 48, 64, 96 px) |

### Colour sweep beyond CSS

Off-brand colours usually survive in places a stylesheet search misses. Check all of these, and `brandos scan` flags most of them:

- `<style>` blocks, inline `style` and `:style` bindings
- colour maps and helpers in code (`levelColors`, `getStatusColor()`)
- status props such as PrimeVue `severity="success"` or `"info"`
- colours sent by the API or seed data (the frontend decides colour by meaning, for example by level number, whatever the data says; do not change backend data without asking)
- SVGs and images with colours baked in (report these and propose a fix before changing them)
- chart settings (use `--chart-1` to `--chart-5`)

### Palette lock

Every coloured value must come from the brand. Blacks, whites and greys are free; anything with colour must share a hue with one of the brand colours in `palette.json` (tints, shades and glass over brand colours are fine). Fonts must be the brand's fonts or generic fallbacks. Two checks enforce it, and a page is not done until both pass:

- `brandos audit <app>`: scans the app's code (CSS, templates, scripts) and lists every off-brand colour and font with file and line.
- `brandos verify <url> --app <app>`: opens the running app in a real browser, in light and dark, and lists every off-brand colour and font actually on screen, including ones that come from data, runtime styles, third-party components and icons. Needs Playwright (`npm install playwright && npx playwright install chromium` in the brandos folder).

When either finds something, fix the source: map it to a theme token (`--primary`, `--ramp-N`, `--chart-N`, `--destructive`, a neutral), never just change the hex to a brand hex in place. The only colour allowed outside the brand is the standard error red, and only when the brand defines no error colour.

## 2. For each item, in order

### a. Propose

Fill in _Restructure ideas_ for this item in `MIGRATION.md`, then tell the person in plain words what you plan, for example:

> Header: the four links become a navigation bar with the current page highlighted, "New order" becomes the primary button, and the user menu becomes an avatar with a dropdown.

For small swaps, proceed. For restructures that change layout or how something is used, wait for a yes.

### b. Rebuild

- Replace hand-built elements with kit components. Use the variants and props that exist; do not restyle components with extra classes beyond layout (spacing, width, grid placement).
- Replace hard-coded colours and fonts with theme tokens.
- Keep every handler, data binding, route, form field name, test id and accessibility attribute. If a test breaks, the migration is wrong.
- New browser APIs must not break tests or server rendering. Guard `localStorage`, `sessionStorage`, `matchMedia`, `ResizeObserver` and similar: check they exist and wrap storage in try/catch, falling back to a default. Test environments (jsdom, SSR) often lack them.
- Delete CSS that only styled the old elements, once nothing else uses it.
- Apply the design rules below.

### c. Show

Run `brandos audit` and `brandos verify` for the page. Verify must report nothing off-brand, no failed requests or script errors, no clickable thing without a hover change, no content cut off by its container, no sideways scrolling and no broken images. Also look at the page yourself at 1440 and 390px wide, in light and dark: everything visible, nothing overlapping, every menu and dialog opening in full. Mark the item `[~]` in `MIGRATION.md`. Run the app (or reload it) and give the person the URL of the page, plus a short summary: what changed, and anything you chose not to change and why. A before-and-after screenshot helps when you can take one.

### d. Wait

Do not start the next item. The person either:

- **approves**: mark it `[x]` and write "Approved" with the date under _Review_; or
- **asks for tweaks**: make them, note them under _Review_, show again, and wait again.

Then go to the next item.

## The layout system

Every app uses the same measurements, set once in `brandos-ui.css`. Pages change what's inside them, never these.

| Token | Value | Used for |
|---|---|---|
| `--page-max` | 1200px | The width of every page and of the nav bar, so their edges line up |
| `--page-gutter` | 16 to 40px | Left and right page margin |
| `--page-top` | 48px | Nav bar to page title |
| `--section-gap` | 64px | Between sections (`bos-page` sets it) |
| `--block-gap` | 24px | Section title to its content, and between cards |
| `--pad-card` / `--pad-tile` / `--pad-row` | 28px / 24px / 16px 20px | Inside surfaces, tiles and glass panels, rows and queue items |
| `--radius-control` / `--radius-card` / `--radius-row` / `--radius-inner` | pill / 24px / 18px / 14px | Buttons and inputs, cards and tables, rows, anything inside a card |

Rules:
- Every block on a page spans the same width: the page container. Heroes, queues, lists, grids and tables all line up with the page title on the left and the nav bar on the right. Only text gets a narrower measure (`bos-lead` stops at 60ch), and it stays aligned to the same left edge, or centred in a centred hero.
- No hand-set widths, margins, paddings, gaps or radii on page-level blocks. If something needs a size that isn't a token, ask the person.
- Corners: anything inside a rounded container uses `--radius-inner`. Don't put `overflow: hidden` on a rounded container that holds menus, popovers, focus rings or tooltips; round the container and let its children sit inside the padding, or use `bos-clip`, which keeps room for focus rings. Tables go inside `bos-table-wrap`, which rounds the frame, never the cells.
- Glass needs a visible edge everywhere, on white as much as on colour: use the BrandOS classes, which draw it with `--edge`.
- Every clickable thing has a hover state, and nothing else does: links, buttons, menu items, chips that act, rows and cards that are links. `brandos verify` hovers every clickable thing and lists the ones that don't change. Mark a deliberately static demo or preview with `data-bos-static`.

## Choosing the top of a page

Ask: what is the first thing a person does on this page? Then pick the pattern that serves that. These are starting points, not the only options: if a page needs something else, compose it from the same parts, keep the shared type sizes and shell, and say why in `MIGRATION.md`.

| The page is for | Pattern | Looks like | Avoid |
|---|---|---|---|
| Acting on what needs attention (a work queue, "up next", approvals) | `bos-hero-compact` then `bos-queue` | Greeting or title in `bos-h1`, one line saying how many things need them, then the queue full width with the first item solid | A giant greeting beside the queue with empty space; a stat strip |
| Seeing how things stand (metrics, an estate, a portfolio) | `bos-hero-overview` then `bos-stats` | Title and one-sentence summary left, the page's actions right, then 3 to 5 numbers that change what someone does | Numbers that are just counts of static things |
| Finding something (a library, a knowledge base, a directory) | `bos-hero-search` | Centred title and lead, a wide `bos-search-xl`, ways in as `bos-suggestions` (stages, categories, recent searches) | Putting the search in a side card; stats about how much content exists |
| Asking an assistant | `bos-hero-chat` | Centred greeting, a full-width `bos-composer`, suggested prompts as `bos-suggestions` that wrap to show the whole question | Side-by-side greeting and composer; truncated suggestions; counts of assistants or prompts |
| Explaining the product (landing, welcome, first run) | `bos-hero-split` | `bos-display` title and story left, one featured `bos-surface` or visual right, optional `bos-stats` that support the story | Using this on everyday app pages |
| One record (a project, customer, agent, document) | `bos-record-header` | Title in `bos-h1`, key facts as chips, actions right; content starts straight after | A hero of any kind |

Stats belong only where the numbers are the point and someone would act on them. Never show counts of things that rarely change (number of assistants, prompts, published entries, stages).

## Consistency across apps

When several apps carry the same brand, the important things must match exactly and only the page content may differ.

Must match in every app:
- The shell: the glass pill nav, its height and width (the page width), brand block (logo, name and, unless the app is white-label, a one-line subtitle, always the same size), the active item style, the More menu, the Create action and the user menu with settings, admin, theme and sign out.
- The layout system: page width, margins, the gap above the page title, section and block gaps, card and row padding, corner radii.
- Type: the same classes and sizes for page titles (`bos-h1`), section titles (`bos-h2`), leads and stats. No custom heading sizes.
- Colour: primary only for the main action, the active nav item, focus and the user's own status. Inputs, focus rings and selected states look the same everywhere.
- Buttons, chips, pills, cards, rows and their hover states.
- Spacing: the same gap above the page title and between sections.

May differ: which hero a page uses, what sections follow, and how many columns the content needs.

Before showing a page, compare it with the same page in the other apps (if there are any) and fix any difference in the must-match list.

## Restructure catalogue

Use these when a page part matches. They are the most common improvements, not a checklist to force.

| You see | Rebuild as |
|---|---|
| Row of links at the top, active one styled by hand | Navigation Menu (marketing sites) or Sidebar (apps with many sections) |
| Custom modal or popup div | Dialog. Destructive confirmation: Alert Dialog. Side panel or filters: Sheet. Mobile bottom panel: Drawer |
| Label and input pairs, error text in red divs | Field with FieldLabel, Input, FieldDescription, FieldError. Every input gets a visible label |
| Long settings page of checkboxes | FieldSet groups with Switch (takes effect now) or Checkbox (saved with a button) |
| Several buttons for "more actions" on a row | One primary action plus a Dropdown Menu on an icon Button |
| Hand-made tabs or segmented buttons | Tabs (switch views) or Toggle Group (set a value) |
| HTML table with sorting or row checkboxes | Data Table pattern: Table with Checkbox and Dropdown Menu |
| Coloured status text or pills | Badge with the matching variant |
| Info, warning or error boxes | Alert (inline) or a Sonner toast (after an action) |
| Loading text or gif | Skeleton for content that is loading, Spinner inside the button that triggered it |
| "No results" text | Empty with a next step |
| Boxes with a title, text and actions | Card (glass variant when it sits on imagery or colour) |
| Search box with an icon | Input Group with the icon as an addon; Command for app-wide search |
| Long list of links or items | Item rows in an Item Group |
| Chat or assistant UI | Message, Bubble, Message Scroller, Input Group composer; Trace for agent steps |

## Design rules

- One primary button per view. Everything else is secondary, outline, ghost or glass.
- Colour budget: about 90% neutrals (the brand's greys and text colours), brand colour for the few things that need attention: the one primary button, the active nav item, the focus ring, and the user's own status (current level, main progress). Progress bars, secondary buttons, links, icons, tags and chips stay neutral. The backdrop and shell are neutral with only faint brand colour. Squint test: on any page the eye should land on one coloured thing first.
- Solid for what matters, glass for the rest. In each section, the single most important thing (the next step, the user's level, a key form) is a solid `bos-surface` with a soft shadow. Secondary items next to it (lists of rows, the nav, floating controls, secondary buttons) are glass and turn solid when hovered if they are clickable. Repeating cards in a grid are outlined `bos-tile`s. Dense app screens with many panels can use the frost tiers instead. Floating menus and dialogs are the most opaque surfaces so text behind never shows through. Text must pass contrast on every surface.
- Choose the top of each page by what it is for (see "Choosing the top of a page"). Do not give every home page the same hero, and do not add a stat strip, a side card or a band just because another page has one.
- Type: the brand's heading font is for big type only: display, h1, h2 and stat numbers. Everything else (h3, lists, tiles, tables, forms, menus) uses the body font. When the brand has no heading font, headings use the body font at a heavier weight.
- Brand colour in small doses beyond the colour budget: one `bos-band` per page for the closing call to action, and charms for badges, avatars and icon frames. No other gradients.
- Hover only on things you can click: buttons, links, nav and menu items, and cards that are links as a whole. Static cards and rows get no hover lift, shadow, colour change or pointer cursor. A card that is clickable as a whole must be a real link or button so it works with the keyboard.
- One spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96 px) and one shared page header, so every page starts the same way: the same gap above the title, between title and subtitle, and before the first content. No icons in front of page titles, no empty dividers, no nested cards (a card inside a card inside a card).
- One control per job: every tab bar, filter toggle and segmented choice uses the same segmented control, and its selected state is neutral (strong frost, --foreground text). Brand colour is for the main nav and the primary action only.
- Progress bars are a muted neutral (a mid warm grey from the brand's neutrals) on a light track, not black and not brand colour, except the user's one main progress bar.
- The app bar must never overlap or wrap, at any width and for every role. Brand and actions keep their size, the nav takes what is left. Plan for the longest nav (usually an admin's): at most about 6 to 7 top-level items; mark the rest `data-priority="low"` so they move into a "More" menu, and put account-level things (theme switcher, settings, admin tools) in the user menu rather than the bar. Below 768px the nav collapses into a menu button.
- Check every layout at 1440, 1280, 1024, 768 and 390px wide, logged in as the role with the most items, in light and dark. Nothing may overlap, clip or scroll sideways.
- Motion is small and quick: 120 to 320ms, ease-out, only opacity and transform, no bounce or spin. Use it to show where something came from (menus pop from their trigger, content fades up once when it first appears, pages cross-fade, progress grows in), never as decoration. Entrances play once, not on every re-render or poll. Everything turns off under prefers-reduced-motion.
- Controls have breathing room on both sides: dropdown arrows sit inset from the edge, with padding so text never runs under them; inputs, selects and buttons in the same row share one height.
- Visible labels on every field. Placeholders are examples, not labels.
- Buttons say what happens ("Save changes", "Delete order"), never "Submit" or "OK".
- Error messages say how to fix the problem.
- Ordered things (levels, tiers, stages) use one hue from pale to full: the `--ramp-N` steps, never a rainbow. Always show the name or number next to the colour. In lists and tables, a neutral chip with a `bos-dot-N` is enough; the full ramp colour is for places where the order is the point (the user's own badge, a journey or stepper).
- Status is not a traffic light: done and success use the brand colour at a light tint (`bos-status-done`), info is neutral, and red (`--destructive`) is only for real errors.
- Do not add decoration the original did not have: no gradient text, no icon tiles in front of headings, no numbered section labels. Charms are for things that already had a badge, avatar or icon.
- Text contrast is handled by the theme. Do not put text on colours outside the theme tokens.

## Framework notes

- **React:** import from the ui folder the installer used (`@/components/ui/button` or a relative path). Base UI uses `render={<a href="..." />}` where Radix uses `asChild`.
- **Vue with PrimeVue (primevue kit):** PrimeVue components are already on brand through `BrandOSPreset`. Keep them and use their props and severities (`severity="secondary"`, `outlined`, `text`) rather than restyling. Restructure with PrimeVue's own pieces (Dialog, Drawer, Menu, Tabs, DataTable, Message, Tag, Skeleton). PrimeVue cards and panels are medium frost and overlays are `--overlay` automatically; use the `bos-*` classes from brandos-ui.css for everything the app builds itself, and `bos-backdrop` on the layout root. Severities are remapped: "success" renders in the brand colour and "info" is neutral, so prefer them over custom colours. Replace hard-coded colours in `<style>` blocks with `var(--primary)`, `var(--muted-foreground)`, `var(--border)` and the other theme variables. Use `brandos/kit/markup` only for a component PrimeVue lacks.
- **Angular, Vue, Svelte, HTML:** copy the component's markup from `brandos/markup/<component>.html` into the template. Keep every class and `data-*` attribute, change only text and bindings. Interactive pieces (open state, keyboard, focus) come from the framework's headless library (Angular CDK or Spartan, Reka UI, Bits UI) or native elements (`<dialog>`, `<details>`, `<select>`). Toggle state with the same `data-*` attributes the markup uses, such as `data-open`, `data-checked` and `data-active`.

## When everything is approved

Run the `brand-audit` skill.
