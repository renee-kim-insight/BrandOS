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
- Brand colour marks action and selection only. Surfaces stay neutral.
- Glass surfaces for things that float (menus, dialogs, toasts, nav over content) and cards over imagery or colour. Solid cards for ordinary content.
- Visible labels on every field. Placeholders are examples, not labels.
- Buttons say what happens ("Save changes", "Delete order"), never "Submit" or "OK".
- Error messages say how to fix the problem.
- Do not add decoration the original did not have: no gradient text, no icon tiles, no numbered section labels.
- Text contrast is handled by the theme. Do not put text on colours outside the theme tokens.

## Framework notes

- **React:** import from the ui folder the installer used (`@/components/ui/button` or a relative path). Base UI uses `render={<a href="..." />}` where Radix uses `asChild`.
- **Vue with PrimeVue (primevue kit):** PrimeVue components are already on brand through `BrandOSPreset`. Keep them and use their props and severities (`severity="secondary"`, `outlined`, `text`) rather than restyling. Restructure with PrimeVue's own pieces (Dialog, Drawer, Menu, Tabs, DataTable, Message, Tag, Skeleton). For floating panels and cards on imagery, add `class="brandos-glass"`; for a coloured page background, `class="brandos-backdrop"` on the layout root. Replace hard-coded colours in `<style>` blocks with `var(--primary)`, `var(--muted-foreground)`, `var(--border)` and the other theme variables. Use `brandos/kit/markup` only for a component PrimeVue lacks.
- **Angular, Vue, Svelte, HTML:** copy the component's markup from `brandos/markup/<component>.html` into the template. Keep every class and `data-*` attribute, change only text and bindings. Interactive pieces (open state, keyboard, focus) come from the framework's headless library (Angular CDK or Spartan, Reka UI, Bits UI) or native elements (`<dialog>`, `<details>`, `<select>`). Toggle state with the same `data-*` attributes the markup uses, such as `data-open`, `data-checked` and `data-active`.

## When everything is approved

Run the `brand-audit` skill.
