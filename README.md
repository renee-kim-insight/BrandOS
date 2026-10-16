# BrandOS

Put any client's brand on any app, with components that are consistent, accessible and already built.

Give BrandOS a brand guide (PDF, PowerPoint, website, or just colours and a font). It produces a contrast-checked theme, installs a 64-component library styled with it, then rebuilds the app's pages with those components one page at a time, with a person approving each page.

It runs in any coding agent: Claude Code, Cursor, Codex, GitHub Copilot, and (with one manual step) Lovable.

## Quick start

1. Put this `brandos` folder in the root of the app's repository and run `npm install` inside it.
2. Open the repository in your coding agent and say:

   > Use BrandOS to apply this brand to the app. Here's the brand guide: [attach the PDF, deck or URL].

The agent reads `AGENTS.md` and walks through four phases, checking with you at each one:

| Phase | What happens | You approve |
|---|---|---|
| Brand intake | Reads the guide, asks only what it can't tell, writes `brand.json` | The brand summary |
| Theme and install | Generates the theme, shows every component in your brand, installs the kit | The preview |
| Migrate | Rebuilds the app page by page with the components | Each page |
| Audit | Checks contrast, approvals and leftovers | The final report |

## What's inside

```
AGENTS.md            Instructions every coding agent reads first
skills/              One folder per phase (Agent Skills format)
cli/brandos.mjs      The command line tool the agent runs
brand/               brand.json schema and three example brands
kits/react/          Glass UI React components (shadcn/ui on Base UI), Glass style
kits/css/            The same components as plain CSS + exact HTML markup, for any framework
kits/primevue/       Bridge for Vue + PrimeVue 4 apps: brand and glass on every PrimeVue component
kits/react/src/styles/brandos-ui.css
                     Shared layer for every kit: frost tiers, page header, segmented control,
                     buttons, chips, brand ramp and progress
kits/primevue/       Bridge for Vue + PrimeVue 4 apps: brand and Glass on every PrimeVue component
preview/             Local preview site (prebuilt) showing every component in a brand
```

## How brand values become a theme

`brand.json` holds only what the brand defines: one to three colours, fonts, corner style, logos, voice. `brandos theme` derives the rest:

- tinted neutrals, text colours for every surface, borders, focus ring, charts, the glass backdrop and a full dark mode;
- three frost tiers and an overlay surface, a six-step ramp of the brand colour for ordered things like levels, muted progress colours and a spacing scale;
- a brand band gradient built from the brand's colours (every stop checked for white text), shadows tinted with the brand's neutral, and heading and body font stacks with serif or sans fallbacks to match;
- automatic contrast fixes, so every theme meets WCAG 2.2 AA (4.5:1 for text, 3:1 for large text and control edges), in light and dark, including text on glass;
- when a brand colour is too light to work as a button (bright yellow, pale blue), it uses the brand's darker colour for buttons and keeps the light one for accents, and flags this for you to confirm.

Token names match shadcn/ui, so the theme also works with shadcn's Vue, Svelte and Angular ports and any shadcn-compatible block. `tokens.json` exports the same values in the W3C design tokens format for Figma and Style Dictionary.

## Design rules

BrandOS applies a few rules everywhere (full list in `skills/ui-migrate/SKILL.md`): one solid surface per section for the most important thing and glass for secondary items, the nav and secondary buttons (glass at rest, solid on hover); the brand's heading font for display, h1, h2 and big numbers only; one brand gradient band per page and small charm shapes for badges and avatars; about 90% neutrals with brand colour only for the primary action, active navigation, focus and the user's own status; one spacing scale and page header; one neutral segmented control; hover only on things you can click; ordered things use one hue from pale to full.

To see every component and pattern in your brands, build the visual guide: `node scripts/build-guide.mjs --out docs/guide path/to/brand.json` (with no brand files it uses the examples). It needs the preview app's dependencies, which it installs the first time.

See `CHANGELOG.md` for what changed in each version.

## Requirements

- Node.js 18 or later where the commands run.
- For the React kit: React 18+ and Tailwind CSS v4.
- For everything else: nothing beyond loading three CSS files.

## Commands

```
brandos extract <pdf|pptx|image|url>   Read the brand, write brand.json and generate the theme in one step
brandos validate brand.json            Check a brand file
brandos theme brand.json               Generate theme.css, fonts, tokens and a contrast report
brandos contrast theme.css             Re-check a theme
brandos preview --brand brand-out      Local site with every component in the brand
brandos detect <app>                   Framework, Tailwind, package manager
brandos install <app>                  Install the kit and theme (never overwrites your files)
brandos scan <app>                     Write MIGRATION.md, the page-by-page plan
brandos audit <app>                    Final check: leftovers, off-brand colours and fonts in the code
brandos verify <url> --app <app>       Check every colour and font on screen in the running app
```

## Maintaining BrandOS

The React components and the Glass style in `kits/react` are the source. After changing them, rebuild the CSS kit, the markup and the preview:

```
./scripts/build-kits.sh
```

Credits: components from shadcn/ui (MIT) on Base UI (MIT). Glass style, theme generator and workflow are part of BrandOS.
# BrandOS
