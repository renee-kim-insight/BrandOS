---
name: brand-apply
description: Generate a contrast-checked theme from a confirmed brand.json, preview it on every component, and install the BrandOS component kit and theme into an app (React, Angular, Vue, Svelte, HTML or other). Use after brand-intake, or when someone has a brand.json and wants it applied.
---

# Brand apply

Goal: the app has the component kit and the client's theme installed, and the person has approved how the components look in their brand.

## 1. Generate the theme

```
brandos theme brand.json --out brand-out
```

This writes `brand-out/theme.css` (light and dark), `fonts.css`, `fonts.html`, `tokens.json` (W3C design tokens, for Figma or Style Dictionary) and `theme-report.md`.

Read the printed notes:

- Lines starting **DECISION** are choices the generator made for contrast (for example, using the darker brand colour for buttons because the main colour is too light). Tell the person and get their agreement.
- Lines starting **DECISION NEEDED** mean you must ask the person, then update `brand.json` and run again.
- If any contrast check fails, the command exits with an error. Fix `brand.json` (usually a darker or lighter colour choice, agreed with the person) and run again. Never edit `theme.css` to get past it.

## 2. Preview

```
brandos preview --brand brand-out
```

Opens a local site (default http://localhost:4321) with every component in the brand, light and dark. Ask the person to look through it, especially buttons, forms, cards, menus and dialogs. Adjust `brand.json` for any feedback and regenerate. Move on only when they are happy.

## 3. Install into the app

Check the app first:

```
brandos detect <app>
```

Read the notes it prints. For the React kit without Tailwind v4, offer to add or upgrade Tailwind before continuing.

Then install. Try a dry run first on apps you have not seen before:

```
brandos install <app> --brand brand-out --dry-run
brandos install <app> --brand brand-out
```

What it does:

- **React kit:** copies components to the app's ui folder (respecting an existing shadcn `components.json`), the Glass style and the theme to a `brandos/` styles folder, imports them into the main CSS, adds `class="style-glass"` to `<html>`, adds font links, and prints the dependency install command (or runs it with `--yes`). Use `--components button,card,dialog` to install only some.
- **PrimeVue kit (Vue + PrimeVue 4):** copies the theme, fonts, `brandos-preset.ts` and `brandos-primevue.css` to `src/brandos/`, switches `app.use(PrimeVue, { theme: { preset } })` to `BrandOSPreset`, imports the CSS in the entry file, and lines dark mode up with PrimeVue's `darkModeSelector`. Every PrimeVue screen takes the brand immediately.
- **CSS kit:** copies `glass-ui.css`, the theme and `markup/` (exact HTML for every component) into `<app>/brandos/`, and tells you where to load the CSS.
- **Never overwrites** a different existing file. It writes `<file>.brandos-new` next to it. Compare them with the person and merge deliberately.

Then do whatever the "Still to do" list says, run the app, and check that it still builds and runs. Nothing should look different yet except fonts and colours on existing kit components; the page migration comes next.

## 4. Hand off

Tell the person in a few sentences what was installed and what changed. Then start the `ui-migrate` skill.
