# BrandOS: instructions for coding agents

You are helping someone put their client's brand on an app. BrandOS gives you three things:

1. **A component library in code** (Glass UI, 64 components). React components in `kits/react`, and exact plain-CSS plus HTML markup for every other framework in `kits/css`. You do not design components. You use these.
2. **A brand pipeline.** A brand guide (PDF, PowerPoint, website, images) becomes `brand.json`, and `brand.json` becomes `theme.css`. Only the theme changes between clients.
3. **A migration workflow.** The app's pages are rebuilt with the components, one page at a time, with a person approving each page.

Run every command with `node <path-to-brandos>/cli/brandos.mjs <command>` (below written as `brandos <command>`). Run `npm install` inside the brandos folder once first.

## The workflow

Follow these phases in order. Each has a skill with the detailed steps in `skills/<name>/SKILL.md`. Read the skill before starting its phase.

| Phase | Skill | Output |
|---|---|---|
| 1. Brand intake | `skills/brand-intake` | `brand.json`, confirmed by a person |
| 2. Theme and install | `skills/brand-apply` | `brand-out/` (theme.css and friends), kit installed in the app, preview approved |
| 3. Migrate the UI | `skills/ui-migrate` | Every page rebuilt with the components, each one approved |
| 4. Audit | `skills/brand-audit` | `brandos audit` passes |

## Rules that always apply

- **Never edit `theme.css` by hand.** Change `brand.json` and run `brandos theme` again.
- **Never ship a theme that fails contrast.** `brandos theme` refuses to finish cleanly if any pair misses WCAG 2.2 AA. Text is 4.5:1, large text and control edges 3:1. Do not work around a failure; fix `brand.json` or ask the person.
- **Never invent brand values.** Colours, fonts and logos come from the client's material. If something is missing or unclear, ask. Write down where each value came from in `brand.json` `sources`.
- **Use the components, do not recreate them.** If a component exists in the kit, use it as is. Change look only through the theme. If something truly has no component, compose it from existing ones and the theme tokens.
- **No hard-coded colours or fonts in app code.** Use theme tokens (`bg-primary`, `text-muted-foreground`, `border-border` in Tailwind; `var(--primary)` in plain CSS).
- **One page at a time, and wait for approval.** Do not migrate the next page until the person approves the current one. `MIGRATION.md` is the record; keep it up to date.
- **Do not change behaviour.** Data, routes, API calls, validation and tests stay as they were. If a restructure would change how something works, ask first.
- **Keep the person informed in plain language.** Say what you changed and why, not which files you touched.

## Commands

```
brandos extract <pdf|pptx|image|url>     # writes brand.json and brand-out/ in one go
brandos validate brand.json
brandos theme brand.json --out brand-out
brandos contrast brand-out/theme.css
brandos preview --brand brand-out
brandos detect <app>
brandos install <app> --brand brand-out [--components button,card,...] [--yes] [--dry-run]
brandos scan <app>
brandos audit <app>
```

## Which kit

`brandos detect` decides. In short:

- **React, Next.js, React Router, Astro with React:** `kits/react`. Needs Tailwind CSS v4. If the app has none or v3, say so and offer to add or upgrade it before installing.
- **Vue with PrimeVue 4:** `kits/primevue`, installed automatically. `BrandOSPreset` points every PrimeVue token at theme.css, and `brandos-primevue.css` adds the Glass layer, so all existing screens take the brand at once. Migration then keeps PrimeVue components: restructure layouts, replace hard-coded colours with theme variables, and use `kit/markup` only for things PrimeVue lacks.
- **Angular, Vue, Svelte, plain HTML, .NET, anything else:** `kits/css`. Copy markup from `brandos/markup/<component>.html` into the app's templates, keeping every class and `data-*` attribute. For interactive components (dialogs, menus, selects, tooltips), add behaviour with the framework's headless library: Angular CDK or Spartan, Reka UI for Vue, Bits UI for Svelte, or native elements like `<dialog>` and `<details>`. The markup and classes stay exactly as given.

## Agent-specific notes

- **Claude Code:** copy the `skills/` folders into `.claude/skills/` in the project (or `~/.claude/skills/`) so they load automatically. Run commands in the terminal.
- **Cursor, Codex, GitHub Copilot, Windsurf and others:** this file is read automatically when the brandos folder is in the repo root. Open the matching `skills/<name>/SKILL.md` at each phase.
- **Lovable and other agents without a terminal:** run phases 1 and 2 elsewhere (any machine with Node, or Claude Code), then add `brand-out/theme.css` and the kit files to the project through GitHub sync or by pasting them. Lovable's stack (React, Tailwind, shadcn) matches the React kit. Use `skills/ui-migrate` as the prompt for phase 3.
