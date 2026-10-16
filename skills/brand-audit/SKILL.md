---
name: brand-audit
description: Check that an app fully follows its BrandOS brand: theme contrast passes WCAG AA, every page in MIGRATION.md is approved, and no hand-built UI or hard-coded colours remain. Use at the end of a migration, before release, or when asked whether an app is on brand.
---

# Brand audit

```
brandos audit <app>
```

It checks:

1. **Theme contrast:** the installed theme passes every WCAG 2.2 AA pair in light and dark.
2. **Approvals:** every item in `MIGRATION.md` is `[x]`.
3. **Hand-built UI:** raw buttons, inputs, tables, modals and so on outside the kit.
4. **Hard-coded colours:** hex, rgb, hsl and Tailwind palette colours in app code and stylesheets.
5. **Palette lock:** every coloured value and font in the code must come from the brand (`palette.json`), listed by file and line.

Then check what is actually on screen:

```
brandos verify http://localhost:5173 --app <app>
```

It opens each page (from the scan, or `--pages /,/profile`) in light and dark and lists every off-brand colour and font, including ones from data, runtime styles and third-party components. Both checks must be clean.

For each finding, either fix it (migrate the element, replace the colour with a token) or, if it is intentional (a third-party embed, a chart's data colours, an email template), record why under the relevant item in `MIGRATION.md`.

Then do a short manual pass the script cannot do:

- Tab through each main page: focus is visible everywhere and the order makes sense.
- Switch to dark mode, if the app supports it: nothing is unreadable.
- Check the logo is the supplied file, at or above its minimum size.
- Read button labels and error messages: they say what happens and how to fix problems.

Report to the person in plain language: what passed, what was fixed, and anything left with a reason.
