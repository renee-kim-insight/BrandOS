---
name: ui-migrate
description: Rebuild an existing app's UI with the BrandOS component kit, one page at a time, with the person approving each page before moving on. Swaps hand-built elements for kit components and restructures parts of pages into better components. Use after brand-apply has installed the kit, or when someone asks to make their app use the components.
---

# UI migration, page by page

Goal: every page uses the kit components and theme tokens, behaves exactly as before, and has been approved by the person.

## 0. Understand the app first

Before touching code, read the main routes and components and tell the person in two or three sentences what you think the app is for and who uses it. Ask them to confirm or correct. Restructuring decisions depend on this.

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
| Background behind the app | `bos-backdrop` on the root element |
| Most important item on a page | `bos-frost-strong` |
| Ordinary cards, panels, the app shell | `bos-frost` |
| Chips, rows, icon backgrounds, secondary buttons inside cards | `bos-frost-light` |
| Menus, dropdowns, popovers, dialogs | `bos-overlay` |
| Card padding and radius | `bos-card`, `bos-card-compact` |
| Page title block | `bos-page-header` with `bos-title` (`bos-title-hero` on the home page only) and `bos-subtitle` |
| Sections | `bos-section`, `bos-section-title` |
| Tabs, filters, view switches | `bos-segmented` (selected item: `aria-selected="true"`, `aria-pressed="true"` or `data-active`), counts in `bos-count` |
| Secondary actions | `bos-btn-glass` |
| A whole card that is a link | `bos-card-link` on a real `<a>` or `<button>` |
| Tags and status | `bos-chip`, `bos-status-done` |
| Ordered steps (levels, tiers, stages) | `--ramp-0` to `--ramp-5` with `--ramp-N-foreground`, classes `bos-ramp-N`, `bos-dot-N`, `bos-ramp-gradient` |
| Progress | `bos-progress` (muted), `bos-progress-primary` for the user's one main bar |
| Spacing | `--space-1` to `--space-9` (4, 8, 12, 16, 24, 32, 48, 64, 96 px) |

### Colour sweep beyond CSS

Off-brand colours usually survive in places a stylesheet search misses. Check all of these, and `brandos scan` flags most of them:

- `<style>` blocks, inline `style` and `:style` bindings
- colour maps and helpers in code (`levelColors`, `getStatusColor()`)
- status props such as PrimeVue `severity="success"` or `"info"`
- colours sent by the API or seed data (the frontend decides colour by meaning, for example by level number, whatever the data says; do not change backend data without asking)
- SVGs and images with colours baked in (report these and propose a fix before changing them)
- chart settings (use `--chart-1` to `--chart-5`)

## 2. For each item, in order

### a. Propose

Fill in _Restructure ideas_ for this item in `MIGRATION.md`, then tell the person in plain words what you plan, for example:

> Header: the four links become a navigation bar with the current page highlighted, "New order" becomes the primary button, and the user menu becomes an avatar with a dropdown.

For small swaps, proceed. For restructures that change layout or how something is used, wait for a yes.

### b. Rebuild

- Replace hand-built elements with kit components. Use the variants and props that exist; do not restyle components with extra classes beyond layout (spacing, width, grid placement).
- Replace hard-coded colours and fonts with theme tokens.
- Keep every handler, data binding, route, form field name, test id and accessibility attribute. If a test breaks, the migration is wrong.
- Delete CSS that only styled the old elements, once nothing else uses it.
- Apply the design rules below.

### c. Show

Mark the item `[~]` in `MIGRATION.md`. Run the app (or reload it) and give the person the URL of the page, plus a short summary: what changed, and anything you chose not to change and why. A before-and-after screenshot helps when you can take one.

### d. Wait

Do not start the next item. The person either:

- **approves**: mark it `[x]` and write "Approved" with the date under _Review_; or
- **asks for tweaks**: make them, note them under _Review_, show again, and wait again.

Then go to the next item.

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
- Glass is the surface. Importance is shown by how frosted it is, not by switching to solid white: more frost (more opaque, more blur, stronger highlight and shadow) means more important. Use three tiers: strong frost for the one or two most important items on a page, medium frost for ordinary cards and the app shell, light frost for supporting pieces inside cards (chips, icon backgrounds, secondary buttons). Floating menus and dialogs are the most opaque of all (85 to 90%) so text behind never shows through. Text must pass contrast on every tier.
- Hover only on things you can click: buttons, links, nav and menu items, and cards that are links as a whole. Static cards and rows get no hover lift, shadow, colour change or pointer cursor. A card that is clickable as a whole must be a real link or button so it works with the keyboard.
- One spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96 px) and one shared page header, so every page starts the same way: the same gap above the title, between title and subtitle, and before the first content. No icons in front of page titles, no empty dividers, no nested cards (a card inside a card inside a card).
- One control per job: every tab bar, filter toggle and segmented choice uses the same segmented control, and its selected state is neutral (strong frost, --foreground text). Brand colour is for the main nav and the primary action only.
- Progress bars are a muted neutral (a mid warm grey from the brand's neutrals) on a light track, not black and not brand colour, except the user's one main progress bar.
- Visible labels on every field. Placeholders are examples, not labels.
- Buttons say what happens ("Save changes", "Delete order"), never "Submit" or "OK".
- Error messages say how to fix the problem.
- Ordered things (levels, tiers, stages) use one hue from pale to full: the `--ramp-N` steps, never a rainbow. Always show the name or number next to the colour. In lists and tables, a neutral chip with a `bos-dot-N` is enough; the full ramp colour is for places where the order is the point (the user's own badge, a journey or stepper).
- Status is not a traffic light: done and success use the brand colour at a light tint (`bos-status-done`), info is neutral, and red (`--destructive`) is only for real errors.
- Do not add decoration the original did not have: no gradient text, no icon tiles, no numbered section labels.
- Text contrast is handled by the theme. Do not put text on colours outside the theme tokens.

## Framework notes

- **React:** import from the ui folder the installer used (`@/components/ui/button` or a relative path). Base UI uses `render={<a href="..." />}` where Radix uses `asChild`.
- **Vue with PrimeVue (primevue kit):** PrimeVue components are already on brand through `BrandOSPreset`. Keep them and use their props and severities (`severity="secondary"`, `outlined`, `text`) rather than restyling. Restructure with PrimeVue's own pieces (Dialog, Drawer, Menu, Tabs, DataTable, Message, Tag, Skeleton). PrimeVue cards and panels are medium frost and overlays are `--overlay` automatically; use the `bos-*` classes from brandos-ui.css for everything the app builds itself, and `bos-backdrop` on the layout root. Severities are remapped: "success" renders in the brand colour and "info" is neutral, so prefer them over custom colours. Replace hard-coded colours in `<style>` blocks with `var(--primary)`, `var(--muted-foreground)`, `var(--border)` and the other theme variables. Use `brandos/kit/markup` only for a component PrimeVue lacks.
- **Angular, Vue, Svelte, HTML:** copy the component's markup from `brandos/markup/<component>.html` into the template. Keep every class and `data-*` attribute, change only text and bindings. Interactive pieces (open state, keyboard, focus) come from the framework's headless library (Angular CDK or Spartan, Reka UI, Bits UI) or native elements (`<dialog>`, `<details>`, `<select>`). Toggle state with the same `data-*` attributes the markup uses, such as `data-open`, `data-checked` and `data-active`.

## When everything is approved

Run the `brand-audit` skill.
