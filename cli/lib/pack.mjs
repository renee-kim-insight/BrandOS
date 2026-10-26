// brandos pack: turn a confirmed brand.json into a brand pack, built once and reused by every project.
// A pack holds the theme, fonts, tokens, the BrandOS UI layer, adapters for common stacks, a short rules file
// for AI tools, and a preview page. Installing a pack needs no extraction and no AI.
import fs from "node:fs"
import path from "node:path"
import { zipSync, unzipSync } from "fflate"

import { runTheme } from "./run-theme.mjs"
import { generateTheme, themeCss } from "./theme.mjs"
import { buildPalette } from "./palette.mjs"
import { hex } from "./color.mjs"

const PKG = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..")
const version = () => JSON.parse(fs.readFileSync(path.join(PKG, "package.json"), "utf8")).version

/** Builds <out>/<slug>-brand-<version>/ and a .zip next to it. Returns { dir, zip, brand }. */
export async function buildPack(brandFile, { out = "brand-packs", quiet = false } = {}) {
  const brand = JSON.parse(fs.readFileSync(brandFile, "utf8"))
  const slug = brand.slug || brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  const name = `${slug}-brand-${brand.version ?? "1.0.0"}`
  const dir = path.resolve(out, name)
  fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })

  const log = console.log
  if (quiet) console.log = () => {}
  let code
  try {
    code = await runTheme({ _: [brandFile], out: dir })
  } finally {
    console.log = log
  }
  if (code !== 0) throw new Error("The theme did not pass every contrast check, so no pack was built. Run brandos theme to see which.")

  // brand.json in the pack points at its own font copies, so the pack works wherever it is unzipped.
  const packed = { ...brand }
  delete packed.$schema
  for (const f of Object.values(packed.fonts ?? {})) if (f?.files?.length) f.files = f.files.map((p) => `fonts/${path.basename(p)}`)
  fs.writeFileSync(path.join(dir, "brand.json"), JSON.stringify(packed, null, 2) + "\n")

  const theme = generateTheme(brand)
  const read = (...p) => fs.readFileSync(path.join(PKG, ...p), "utf8")
  const ui = read("kits", "react", "src", "styles", "brandos-ui.css")
  fs.writeFileSync(path.join(dir, "brandos-ui.css"), ui)
  fs.mkdirSync(path.join(dir, "adapters"), { recursive: true })
  fs.writeFileSync(path.join(dir, "adapters", "tailwind-v4.css"), tailwindV4())
  fs.writeFileSync(path.join(dir, "adapters", "tailwind.preset.cjs"), tailwindV3())
  fs.copyFileSync(path.join(PKG, "kits", "primevue", "brandos-preset.ts"), path.join(dir, "adapters", "primevue-preset.ts"))
  fs.copyFileSync(path.join(PKG, "kits", "primevue", "brandos-primevue.css"), path.join(dir, "adapters", "primevue.css"))
  fs.writeFileSync(path.join(dir, "brand-rules.md"), rulesMd(brand, theme))
  fs.writeFileSync(path.join(dir, "README.md"), readme(brand, name))
  fs.writeFileSync(
    path.join(dir, "preview.html"),
    previewHtml({ brand, themeCss: fs.readFileSync(path.join(dir, "theme.css"), "utf8"), fontsCss: fs.readFileSync(path.join(dir, "fonts.css"), "utf8"), fontsHtml: fs.readFileSync(path.join(dir, "fonts.html"), "utf8"), uiCss: ui }),
  )
  const files = listFiles(dir)
  fs.writeFileSync(
    path.join(dir, "pack.json"),
    JSON.stringify({ name: brand.name, slug, version: brand.version ?? "1.0.0", brandos: version(), created: new Date().toISOString(), licensedFonts: Object.values(brand.fonts).some((f) => f?.source === "self-hosted" && f.files?.length), files }, null, 2) + "\n",
  )

  const zip = `${dir}.zip`
  const entries = {}
  for (const f of listFiles(dir)) entries[`${name}/${f}`] = fs.readFileSync(path.join(dir, f))
  fs.writeFileSync(zip, zipSync(entries, { level: 6 }))
  return { dir, zip, brand, name }
}

export async function runPack(a) {
  const file = a._[0] ?? "brand.json"
  const { dir, zip, brand } = await buildPack(file, { out: a.out ?? "brand-packs" })
  console.log(`✓ ${brand.name} brand pack: ${path.relative(process.cwd(), zip)}`)
  console.log(`  Folder: ${path.relative(process.cwd(), dir)}/  (open preview.html to see it)`)
  console.log(`  Use it in any project: brandos install <appDir> --pack ${path.relative(process.cwd(), zip)}`)
  if (Object.values(brand.fonts).some((f) => f?.source === "self-hosted" && f.files?.length))
    console.log(`  ! This pack contains licensed font files. Keep it in a private place (internal registry, private repo, shared drive), never a public one.`)
  return 0
}

/** For brandos install --pack: unzip (or use) a pack and return the folder that holds theme.css. */
export function openPack(p, app) {
  const abs = path.resolve(p)
  const dir = fs.statSync(abs).isDirectory() ? abs : unpack(abs, p, app)
  // AI tools working on the app read the short rules file instead of the brand guide.
  // Written fresh from the pack's brand.json, so the rules always match the BrandOS version doing the install.
  const rules = path.join(app, "brand-rules.md")
  if (fs.existsSync(path.join(dir, "brand.json"))) {
    const brand = JSON.parse(fs.readFileSync(path.join(dir, "brand.json"), "utf8"))
    const theme = generateTheme(brand)
    if (!fs.existsSync(rules) || /brand rules \(BrandOS/.test(fs.readFileSync(rules, "utf8"))) fs.writeFileSync(rules, rulesMd(brand, theme))
    // The theme and palette lock are rebuilt from brand.json too, so a pack made with an older BrandOS
    // gets today's rules (for example one font family) without being made again.
    const themeFile = path.join(dir, "theme.css")
    if (!fs.existsSync(themeFile) || /Generated by BrandOS/.test(fs.readFileSync(themeFile, "utf8"))) fs.writeFileSync(themeFile, themeCss(brand, theme))
    fs.writeFileSync(path.join(dir, "palette.json"), JSON.stringify(buildPalette(brand, theme), null, 2) + "\n")
  }
  return dir
}

function unpack(abs, p, app) {
  const dest = path.join(app, ".brandos", "pack")
  fs.rmSync(dest, { recursive: true, force: true })
  const files = unzipSync(new Uint8Array(fs.readFileSync(abs)))
  for (const [name, data] of Object.entries(files)) {
    if (name.endsWith("/")) continue
    const rel = name.split("/").slice(1).join("/") || name
    if (rel.includes("..")) continue
    fs.mkdirSync(path.dirname(path.join(dest, rel)), { recursive: true })
    fs.writeFileSync(path.join(dest, rel), data)
  }
  if (!fs.existsSync(path.join(dest, "theme.css"))) throw new Error(`${p} is not a BrandOS brand pack (no theme.css inside).`)
  // The unpacked copy may hold licensed fonts: keep it out of git.
  fs.writeFileSync(path.join(dest, ".gitignore"), "*\n")
  return dest
}

function listFiles(dir, base = "") {
  const out = []
  for (const e of fs.readdirSync(path.join(dir, base), { withFileTypes: true })) {
    const rel = base ? `${base}/${e.name}` : e.name
    if (e.isDirectory()) out.push(...listFiles(dir, rel))
    else out.push(rel)
  }
  return out.sort()
}

/* ---------------- adapters ---------------- */

const TOKENS = [
  "background", "foreground", "card", "card-foreground", "popover", "popover-foreground", "primary", "primary-foreground",
  "secondary", "secondary-foreground", "muted", "muted-foreground", "accent", "accent-foreground", "destructive", "border", "input", "ring",
  "chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "band-1", "band-2", "band-3", "band-4",
  "ramp-0", "ramp-1", "ramp-2", "ramp-3", "ramp-4", "ramp-5", "progress-fill", "progress-track",
]

function tailwindV4() {
  return `/* Tailwind CSS v4: import after tailwindcss and theme.css. Classes like bg-primary, text-muted-foreground,
   font-display and rounded-xl then use the brand. */
@theme inline {
${TOKENS.map((t) => `  --color-${t}: var(--${t});`).join("\n")}
  --font-sans: var(--font-sans);
  --font-display: var(--font-display, var(--font-sans));
  --font-heading: var(--font-heading, var(--font-sans));
  --font-mono: var(--font-mono);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
}
`
}

function tailwindV3() {
  const colors = TOKENS.map((t) => `      "${t}": "var(--${t})",`).join("\n")
  return `// Tailwind CSS v3: presets: [require("./tailwind.preset.cjs")] in tailwind.config.js. Load theme.css in the app.
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
${colors}
      },
      fontFamily: {
        sans: "var(--font-sans)",
        display: "var(--font-display, var(--font-sans))",
        heading: "var(--font-heading, var(--font-sans))",
        mono: "var(--font-mono)",
      },
      borderRadius: { lg: "var(--radius)", xl: "calc(var(--radius) * 1.4)", "2xl": "calc(var(--radius) * 1.8)" },
      boxShadow: { sm: "var(--shadow-sm)", md: "var(--shadow-md)", lg: "var(--shadow-lg)" },
    },
  },
}
`
}

/* ---------------- rules for AI tools: short, so it is cheap to read on every task ---------------- */

function rulesMd(brand, theme) {
  const c = brand.colors
  const L = theme.modes.light
  const f = brand.fonts
  const fam = (x) => (x ? `${x.family}${x.source === "self-hosted" ? ` (licensed, files in fonts/; stand-in ${x.fallback})` : ""}` : null)
  const line = (k, v) => (v ? `- ${k}: ${Array.isArray(v) ? v.join(", ") : v}` : null)
  return [
    `# ${brand.name} brand rules (BrandOS ${version()})`,
    ``,
    `Read this instead of the brand guide. Every value here is final and already contrast-checked (WCAG 2.2 AA, light and dark).`,
    ``,
    `## Colours`,
    line("Primary", c.primary),
    line("Secondary", c.secondary),
    line("Accents", c.accents),
    line("Neutral", c.neutral),
    line("Background", c.background),
    line("Error", c.danger),
    ``,
    `Use theme tokens, never hex values: \`var(--primary)\`, \`--primary-foreground\`, \`--foreground\`, \`--muted-foreground\`, \`--border\`, \`--card\`, \`--destructive\`, \`--chart-1\` to \`--chart-5\`, \`--ramp-0\` to \`--ramp-5\` (ordered levels), \`--gradient-brand\`. In Tailwind: \`bg-primary\`, \`text-muted-foreground\` and so on.`,
    `Palette lock: only these colours, plus black, white and greys. Run \`brandos audit\` and \`brandos verify\` to check.`,
    ``,
    `## Fonts`,
    line("Body and UI", fam(f.sans)),
    line("Headings", brand.typography?.headings === "display" && f.display ? fam(f.display) : "same as body (sans)"),
    line("Code", fam(f.mono)),
    `One font family for everything: headings use the body font at a heavier weight (\`--font-heading\`). Don't put a display or serif font on headings, labels or accents unless brand.json sets typography.headings to "display".`,
    ``,
    `## Shell, layout and type (must match in every app)`,
    `- Navigation by purpose: a top bar (\`bos-shell\`) for apps people explore and browse; a collapsible sidebar (\`bos-app\`, \`bos-sidebar\`, \`data-collapsed\`) for apps with one main job, so the work draws the eye. One shell per app, never both: a sidebar app puts its brand at the top of the sidebar and the user menu at the bottom, with no top bar on desktop. Both: same brand block, filled primary pill for the current page, user menu (settings, admin, theme, sign out). Top bar: up to six main pages, More only when there are more, same padding both ends, nav centred.`,
    `- Fonts: headings are sans, the same family as the body. Never set font-family by hand; use the type classes.`,
    `- Layout: \`bos-container\` for width and margins (\`--page-max\` 1680px, slim \`--page-gutter\` 12 to 24px; running text held to \`--measure\`), \`bos-page\` stacks the title block and sections (\`--page-top\` 48, \`--section-gap\` 64), \`bos-stack\` inside sections (\`--block-gap\` 24). Every block spans the page width; only text gets a narrower measure. No hand-set widths, margins, paddings or radii.`,
    `- Corners: \`--radius-control\` pill, \`--radius-card\` 24, \`--radius-row\` 18, \`--radius-inner\` 14 for anything inside a card. No overflow hidden on rounded containers that hold menus or focusable things (use \`bos-clip\`).`,
    `- Title block: the same in every app and on every page: \`bos-page\` sets the gap below the nav, then an optional \`bos-kicker\` (a section or date, never the app's name), \`bos-h1\`, and one \`bos-lead\` line. What follows the title block (stats, queue, search, composer) changes with the page's purpose; the title block itself doesn't. Centred titles only on search and assistant pages.`,
    `- Chat: a composer is always docked at the bottom of the screen (\`bos-composer-dock\`, last on the page). Every composer has an assistant picker (\`bos-composer-agent\`). Conversation pages use \`bos-chat\` with a rail of assistants and recent conversations (\`bos-chat-rail\`), so switching never means going back home.`,
    `- Bento: home pages and dashboards use \`bos-bento\` with \`bos-panel\` (spans \`bos-span-3/4/6/8/12\`, \`bos-tall\`; spans per row add to 12), \`bos-panel-head\` with \`bos-panel-title\` and a \`bos-link-pill\` View all, \`bos-inner\` items (\`bos-event\`, \`bos-person\`), \`bos-chip-meta\` for times, dates and counts, \`bos-avatars\`, \`bos-status\`, \`bos-feature\` (preview stage, title, line), \`bos-figure\` (big number with unit), \`bos-metric-tabs\` over a chart, \`bos-bars\`, \`bos-flow\`, \`bos-media\`, and at most one \`data-glow\` panel per page. Hierarchy comes from size and weight (500), not bold.`,
    `- Interactive: quizzes and exams use \`bos-quiz\`, \`bos-track\`, \`bos-options\` (data-state correct, incorrect, missed after checking), \`bos-feedback\`, \`bos-tally\`, \`bos-timer\`, \`bos-result\`; graded answers use \`bos-graded\` and \`bos-rubric\`; courses use \`bos-lessons\`, \`bos-ring\`, \`bos-video\`, \`bos-learn\`; \`bos-counter\` for stepping numbers. Never colour alone for right and wrong; always show progress and time left. Modal for short decisions, side panel when the page behind matters.`,
    `- Type: \`bos-h1\` for every page title (home included), \`bos-h2\` sections, \`bos-h3\` items, \`bos-lead\`, \`bos-stat\`. \`bos-display\` only on landing and welcome pages. Never set heading sizes by hand.`,
    `- Every clickable thing has a hover state; nothing else does. \`brandos verify\` checks hover, cut-off content, broken corners, sideways scrolling, broken images and failed requests.`,
    `- Corners: pill radius (\`--radius-control\`) only on controls: buttons, inputs, chips, the nav. Big boxes (dialogs, command menus, composers, cards) use \`--radius-card\`, never pill, or they turn into ovals. Never change the radius scale (\`--radius\`, \`--radius-xl\` and so on) to make buttons round; use \`rounded-full\` on the button. Anything with a background inside a rounded box gets \`border-radius: inherit\` or \`--radius-inner\`, or no background.`,
    ``,
    `## The top of a page: pick by what the page is for`,
    `- Acting on what needs attention: \`bos-hero-compact\` then \`bos-queue\`.`,
    `- Seeing how things stand: \`bos-hero-overview\` then \`bos-stats\` (only numbers someone acts on).`,
    `- Finding something: \`bos-hero-search\` with \`bos-search-xl\` and \`bos-suggestions\`, centred.`,
    `- Asking an assistant: \`bos-hero-chat\` with \`bos-composer\` and wrapping \`bos-suggestions\`, centred.`,
    `- Explaining the product (landing, welcome): \`bos-hero-split\` with \`bos-display\` and one \`bos-surface\`.`,
    `- One record: \`bos-record-header\`, no hero.`,
    `These are starting points; compose something else from the same parts when a page needs it. Never add stats, side cards or bands just to match another page.`,
    ``,
    `## Surfaces and components`,
    `- Each section: one solid \`bos-surface\` for the most important thing; secondary items as glass \`bos-row\` in \`bos-rows\`; repeating cards as \`bos-tile\`.`,
    `- Buttons: one \`bos-btn-primary\` per view; every other action \`bos-btn-glass\` (glass, solid on hover).`,
    `- Closing call to action, where a page has one: \`bos-band\` with a \`bos-btn-glass\`.`,
    `- Badges and avatars: \`bos-charm\` (+ shape: petal, leaf, arch, bloom, pebble, tab), \`bos-avatar\`. User's own status: \`bos-pill\`.`,
    `- Tabs and filters: \`bos-segmented\`. Progress: \`bos-progress\` (muted), \`bos-progress-primary\` for the user's one main bar. Tables: \`bos-table\`.`,
    ``,
    `## Rules`,
    `- About 90% neutrals. Brand colour for the primary action, the active nav item, focus and the user's own status.`,
    `- Hover only on things you can click. Static cards and rows never move or change colour.`,
    `- One spacing scale: \`--space-1\` to \`--space-9\` (4, 8, 12, 16, 24, 32, 48, 64, 96 px).`,
    `- Ordered things (levels, tiers) use one hue from pale to full (\`--ramp-N\`), never a rainbow.`,
    `- No gradient text, no extra gradients, no icon tiles in front of headings.`,
    `- Visible labels on every field; buttons say what happens.`,
    `- Motion: 120 to 320 ms, ease-out, opacity and transform only, off under prefers-reduced-motion.`,
  ]
    .filter((x) => x !== null)
    .join("\n") + "\n"
}

function readme(brand, name) {
  return `# ${name}

The ${brand.name} brand, packed by BrandOS ${version()}. Built once from the brand guide or design system; reuse it in every project.

## Use it

With BrandOS (any app; it detects React, PrimeVue or plain CSS):

    node path/to/brandos/cli/brandos.mjs install path/to/app --pack ${name}.zip

Without BrandOS, load these in the page, in this order:

1. The \`<link>\` tags in \`fonts.html\` (Google Fonts), then \`fonts.css\`
2. \`theme.css\` (light and dark; dark mode is the \`.dark\` class)
3. \`brandos-ui.css\` (layout classes: hero, surfaces, glass rows, buttons, charms, band)

Stack adapters are in \`adapters/\`: Tailwind v4 (\`tailwind-v4.css\`), Tailwind v3 (\`tailwind.preset.cjs\`), PrimeVue (\`primevue-preset.ts\` and \`primevue.css\`).

## For AI tools

Point the tool at \`brand-rules.md\`. It holds every colour, font and layout rule in a page, so the tool never needs the brand guide.

## What's inside

- \`brand.json\`: the source of truth. Edit it in \`brandos studio\` and rebuild the pack.
- \`theme.css\`, \`fonts.css\`, \`fonts/\`, \`tokens.json\` (W3C design tokens for Figma and Style Dictionary), \`palette.json\` (the palette lock)
- \`theme-report.md\`: every contrast check
- \`preview.html\`: the brand on real components

${Object.values(brand.fonts).some((f) => f?.source === "self-hosted" && f.files?.length) ? "This pack contains licensed font files. Keep it private.\n" : ""}`
}

/* ---------------- preview: one page of the brand on real patterns ---------------- */

export function previewHtml({ brand, themeCss, fontsCss, fontsHtml, uiCss, fontBase = "./", embed = false }) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])
  const fonts = fontsCss.replace(/url\("\.\/fonts\//g, `url("${fontBase}fonts/`)
  const sw = (t) => `<div class="pv-sw"><span style="background:var(--${t})"></span><code>${t}</code></div>`
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(brand.name)} brand preview</title>
${fontsHtml}
<style>
${fonts}
${themeCss}
${uiCss}
body { margin: 0; background: var(--background); color: var(--foreground); font: 16px/1.6 var(--font-sans); }
.pv-mode { position: fixed; right: 16px; bottom: 16px; z-index: 60; }
.pv-sws { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 12px; }
.pv-sw { display: flex; flex-direction: column; gap: 6px; }
.pv-sw span { height: 52px; border-radius: 14px; box-shadow: inset 0 0 0 1px var(--border); }
.pv-sw code { font: 11px var(--font-mono); color: var(--muted-foreground); }
.pv-level { display: flex; gap: 16px; align-items: center; }
.pv-next { display: flex; justify-content: space-between; margin: 18px 0 8px; font-size: 14px; }
.pv-field { display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600; }
.pv-field input { min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--input); background: var(--card); color: var(--foreground); font: 400 15px var(--font-sans); }
</style>
</head>
<body>
<div class="bos-backdrop">
  <div class="bos-shell-wrap"><div class="bos-container">
    <header class="bos-shell bos-glass">
      <span class="bos-brand"><span class="bos-charm bos-charm-sm" aria-hidden="true"></span><strong>${esc(brand.name)}</strong></span>
      <nav class="bos-nav" aria-label="Preview"><ul class="bos-nav-list"><li><a href="#" aria-current="page">Home</a></li><li><a href="#">Projects</a></li><li><a href="#">Team</a></li><li><a href="#">Reports</a></li></ul></nav>
      <span class="bos-actions"><span class="bos-avatar">AB</span></span>
    </header>
  </div></div>
  <main class="bos-container">
    <section class="bos-hero">
      <div class="bos-hero-grid">
        <div>
          <span class="bos-kicker">Brand preview</span>
          <h1 class="bos-display" style="margin-top:8px">Welcome back, Avery. Two steps to go.</h1>
          <p class="bos-lead">Finish this week's review and one short course, and the next level is yours.</p>
          <div class="bos-btns"><button class="bos-btn-primary">Start the review</button><button class="bos-btn-glass">See what's next</button></div>
        </div>
        <div class="bos-surface bos-surface-lg">
          <div class="pv-level"><span class="bos-charm bos-charm-md" aria-hidden="true"></span><div><div class="bos-kicker">Level 4</div><div class="bos-h2">Navigator</div></div></div>
          <div class="pv-next"><span>Next: <span class="bos-pill">Pathfinder</span></span><strong>72%</strong></div>
          <div class="bos-progress bos-progress-primary"><div style="width:72%"></div></div>
        </div>
      </div>
      <div class="bos-stats"><div><div class="bos-stat">18</div><small>projects shipped</small></div><div><div class="bos-stat">9</div><small>courses done</small></div><div><div class="bos-stat">#4</div><small>on the team board</small></div></div>
    </section>
    <section class="bos-block">
      <div class="bos-sec-head"><h2 class="bos-h2">Next up</h2><a class="bos-text-link" href="#">See all</a></div>
      <div class="bos-feature-grid">
        <div class="bos-surface bos-feature"><span class="bos-caption">Review · due Friday</span><h3 class="bos-h2" style="font-size:24px">Weekly project review</h3><p class="bos-caption" style="font-size:15px;margin:0">Look over three updates from your team and approve or send back.</p><div class="bos-btns"><button class="bos-btn-glass">Open review</button></div></div>
        <div class="bos-rows">
          <a class="bos-row" href="#"><div><div class="bos-h3" style="font-size:16px">Writing clear briefs</div><div class="bos-meta"><span class="bos-chip">Short read</span><span class="bos-chip">8 min</span></div></div><span>›</span></a>
          <a class="bos-row" href="#"><div><div class="bos-h3" style="font-size:16px">Planning a sprint</div><div class="bos-meta"><span class="bos-chip">Course</span><span class="bos-chip">12 min</span></div></div><span>›</span></a>
          <div class="pv-field" style="margin-top:12px">Project name<input value="Northern launch" aria-label="Project name"></div>
        </div>
      </div>
    </section>
    <section class="bos-block">
      <div class="bos-sec-head"><h2 class="bos-h2">Colours</h2></div>
      <div class="pv-sws">${["primary", "ring", "destructive", "band-1", "band-2", "band-3", "band-4", "chart-1", "chart-2", "chart-3", "ramp-0", "ramp-2", "ramp-4", "ramp-5", "background", "card", "muted", "border", "muted-foreground", "foreground"].map(sw).join("")}</div>
    </section>
    <section class="bos-band">
      <div><h2 class="bos-h2">Something worked? Share it.</h2><p>Every idea you share saves someone else the trial and error.</p></div>
      <button class="bos-btn-glass bos-btn-lg">Share an idea</button>
    </section>
    <div style="height:64px"></div>
  </main>
${embed ? "" : `  <button class="bos-btn-glass pv-mode" type="button" onclick="document.documentElement.classList.toggle('dark')">Light or dark</button>`}
</div>
${embed ? "" : `<script>try{if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark')}catch(e){}</script>`}
</body>
</html>
`
}
