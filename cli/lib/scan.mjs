// Inventory an app's UI and write MIGRATION.md: a page-by-page plan any coding agent can follow.
import fs from "node:fs"
import path from "node:path"

import { detect } from "./detect.mjs"

const IGNORE = new Set(["node_modules", "dist", "build", ".next", ".nuxt", ".svelte-kit", "out", "coverage", ".git", ".brandos", "brandos", "vendor", "bin", "obj", ".angular", ".turbo", ".vercel"])
const UI_EXT = /\.(tsx|jsx|vue|svelte|astro|html?|cshtml|razor)$/
const STYLE_EXT = /\.(css|scss|sass|less)$/

// Hand-built UI -> the Glass UI component that replaces it.
// Tag rules match lowercase native elements only, so kit components like <Button> are not counted.
// Word rules only look inside class attributes, so component names like <Badge> are not counted.
const cls = (words) => new RegExp(`class(?:Name)?=["'{\`][^"'\`]*\\b(?:${words})\\b`, "g")
const RULES = [
  { id: "button", re: /<button\b/g, use: "Button" },
  { id: "link-button", re: /<a\b[^>]*class(?:Name)?=["'{`][^"'`]*\b(?:btn|button)\b/g, use: "Button (rendered as a link with render={<a/>})" },
  { id: "checkbox", re: /<input[^>]*type=["']checkbox/g, use: "Checkbox" },
  { id: "radio", re: /<input[^>]*type=["']radio/g, use: "Radio Group" },
  { id: "range", re: /<input[^>]*type=["']range/g, use: "Slider" },
  { id: "input", re: /<input(?![^>]*type=["'](?:checkbox|radio|range|hidden|submit|button)["'])[\s>/]/g, use: "Input inside a Field (with a visible label)" },
  { id: "select", re: /<select\b/g, use: "Select (or Native Select on mobile-first forms)" },
  { id: "textarea", re: /<textarea\b/g, use: "Textarea inside a Field" },
  { id: "label", re: /<label\b/g, use: "Field + FieldLabel" },
  { id: "table", re: /<table\b/g, use: "Table (Data Table if it sorts or selects)" },
  { id: "dialog", re: /<dialog\b|class(?:Name)?=["'{`][^"'`]*\b(?:modal|lightbox|popup|overlay)\b/g, use: "Dialog (Alert Dialog for destructive confirmations, Sheet for side panels)" },
  { id: "dropdown", re: cls("dropdown|dropdown-menu|kebab|overflow-menu|context-menu"), use: "Dropdown Menu" },
  { id: "tabs", re: cls("tabs|tab|tab-list|tablist|tab-panel"), use: "Tabs" },
  { id: "tooltip", re: cls("tooltip"), use: "Tooltip" },
  { id: "badge", re: cls("badge|chip|pill|tag-label|status-label"), use: "Badge" },
  { id: "card", re: cls("card|panel|tile"), use: "Card" },
  { id: "toast", re: cls("toast|snackbar|notification"), use: "Sonner toast (or Alert for inline messages)" },
  { id: "alert-call", re: /\balert\(|\bconfirm\(/g, use: "Alert Dialog or a Sonner toast instead of the browser alert/confirm" },
  { id: "spinner", re: cls("spinner|loader|loading|loading-indicator"), use: "Spinner, or Skeleton for content that is loading" },
  { id: "progress", re: /<progress\b|class(?:Name)?=["'{`][^"'`]*\bprogress(?:-bar)?\b/g, use: "Progress" },
  { id: "avatar", re: cls("avatar"), use: "Avatar" },
  { id: "breadcrumb", re: cls("breadcrumbs?"), use: "Breadcrumb" },
  { id: "pagination", re: cls("pagination|pager"), use: "Pagination" },
  { id: "accordion", re: /<details\b|class(?:Name)?=["'{`][^"'`]*\b(?:accordion|collapsible)\b/g, use: "Accordion or Collapsible" },
  { id: "switch", re: cls("switch|toggle-switch"), use: "Switch" },
  { id: "hr", re: /<hr\b/g, use: "Separator" },
  { id: "nav", re: /<nav\b/g, use: "Navigation Menu, or Sidebar for app navigation (keep <nav> as the wrapper)", advice: true },
]
// With the PrimeVue bridge, hand-built UI becomes the PrimeVue component (already on brand), not a kit one.
const PRIMEVUE_USE = {
  button: "Button", "link-button": "Button with as=\"a\" (or as=\"router-link\")", checkbox: "Checkbox", radio: "RadioButton", range: "Slider",
  input: "InputText with a visible label", select: "Select", textarea: "Textarea", label: "keep it, linked to its input with for/id (or IftaLabel)",
  table: "DataTable", dialog: "Dialog (ConfirmDialog for destructive confirmations, Drawer for side panels)", dropdown: "Menu with popup",
  tabs: "Tabs", tooltip: "the v-tooltip directive", badge: "Tag", card: "Card", toast: "Toast (or Message for inline notes)",
  "alert-call": "ConfirmDialog or Toast instead of the browser alert/confirm", spinner: "Skeleton for loading content, ProgressSpinner inside actions",
  progress: "ProgressBar", avatar: "Avatar", breadcrumb: "Breadcrumb", pagination: "Paginator", accordion: "Accordion", switch: "ToggleSwitch",
  hr: "Divider", nav: "Menu, Menubar or PanelMenu (keep <nav> as the wrapper)",
}
const COLOR_RULES = [
  { id: "hex", re: /#[0-9a-fA-F]{3,8}\b(?![\w-])/g },
  { id: "rgb/hsl", re: /\b(?:rgba?|hsla?)\(\s*\d/g },
  { id: "tailwind palette", re: /\b(?:bg|text|border|ring|fill|stroke|from|to|via|outline|divide|placeholder)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)(?:-\d{2,3})?\b/g },
  { id: "tailwind arbitrary colour", re: /\b(?:bg|text|border|ring|fill|stroke)-\[(?:#|rgb|hsl)[^\]]*\]/g },
  { id: "font-family", re: /font-family\s*:|fontFamily\s*:/g },
  // Colour that comes from data or code, not CSS: the usual reason off-brand colours survive a restyle.
  { id: "colour from data", re: /\b(?:color|colour|background(?:Color)?|borderColor|fill|stroke)\s*:\s*[\w$?.]+\.(?:color|colour|hex|accent|accentColor|colorHex)\b/g },
  { id: "colour map in code", re: /\b\w*(?:Colors|Colours|ColorMap|ColourMap|Palette)\s*[=:]\s*[{[]/g },
  { id: "status colour prop", re: /severity\s*=\s*["'](?:success|info|warn|warning|help|contrast)["']/g },
]
const LIBS = [
  ["@mui/", "Material UI"], ["@material-ui/", "Material UI"], ["antd", "Ant Design"], ["react-bootstrap", "React Bootstrap"],
  ["@chakra-ui/", "Chakra UI"], ["@mantine/", "Mantine"], ["@angular/material", "Angular Material"], ["primeng", "PrimeNG"],
  ["primevue", "PrimeVue"], ["vuetify", "Vuetify"], ["bootstrap", "Bootstrap"], ["@headlessui/", "Headless UI"], ["@radix-ui/", "Radix UI"],
  ["semantic-ui", "Semantic UI"], ["@fluentui/", "Fluent UI"], ["element-plus", "Element Plus"],
]

export async function scan(a) {
  const app = path.resolve(a._[0] ?? ".")
  const d = detect(app)
  const files = walk(app)
  const ui = files.filter((f) => UI_EXT.test(f) && !isKitFile(f, d))
  const styles = files.filter((f) => STYLE_EXT.test(f) && !/brandos[\\/]/.test(f))
  const pages = ui.filter((f) => isPage(f, d))
  const shared = ui.filter((f) => !pages.includes(f))
  const analyse = (f) => analyseFile(path.join(app, f), d.kit)
  const entries = [...shared, ...pages].map((f) => ({ file: f, page: pages.includes(f), route: routeOf(f, d), ...analyse(f) }))
  const styleIssues = styles.map((f) => ({ file: f, ...analyseStyle(path.join(app, f)) })).filter((s) => s.colors > 0 || s.fonts > 0)
  const libs = detectLibs(app).filter((l) => !(d.kit === "primevue" && l === "PrimeVue"))

  // Shared layout first (headers, navs, layouts), then pages by route depth.
  const sharedOrdered = entries.filter((e) => !e.page && (e.total > 0 || e.colors > 0 || Object.keys(e.advice ?? {}).length)).sort((x, y) => layoutRank(x.file) - layoutRank(y.file) || y.total - x.total)
  const pageOrdered = entries.filter((e) => e.page).sort((x, y) => (x.route ?? "").split("/").length - (y.route ?? "").split("/").length || (x.route ?? x.file).localeCompare(y.route ?? y.file))

  const out = a.out ?? path.join(app, "MIGRATION.md")
  if (fs.existsSync(out) && !a.force) {
    const prev = fs.readFileSync(out, "utf8")
    if (/\[[x~]\]/.test(prev)) {
      console.log(`MIGRATION.md already has progress. Wrote the fresh scan to MIGRATION.scan.md instead. Use --force to replace.`)
      fs.writeFileSync(out.replace(/\.md$/, ".scan.md"), plan(d, sharedOrdered, pageOrdered, styleIssues, libs))
      return 0
    }
  }
  fs.writeFileSync(out, plan(d, sharedOrdered, pageOrdered, styleIssues, libs))
  fs.mkdirSync(path.join(app, ".brandos"), { recursive: true })
  fs.writeFileSync(path.join(app, ".brandos", "scan.json"), JSON.stringify({ scannedAt: new Date().toISOString(), framework: d.framework, entries, styleIssues, libs }, null, 2))
  const totals = sum(entries)
  console.log(`✓ Scanned ${ui.length} UI files and ${styles.length} stylesheets (${d.framework})`)
  console.log(`  ${pageOrdered.length} pages, ${sharedOrdered.length} shared components with hand-built UI`)
  console.log(`  ${totals.total} UI elements to replace, ${totals.colors} hard-coded colours, ${styleIssues.length} stylesheets with brand overrides`)
  if (libs.length) console.log(`  Other UI libraries in use: ${libs.join(", ")}`)
  console.log(`  Wrote ${path.relative(process.cwd(), out)}`)
  return 0
}

export async function auditApp(a) {
  const app = path.resolve(a._[0] ?? ".")
  const d = detect(app)
  const files = walk(app).filter((f) => UI_EXT.test(f) && !isKitFile(f, d))
  const rows = files.map((f) => ({ file: f, ...analyseFile(path.join(app, f), d.kit) })).filter((r) => r.total || r.colors)
  const styles = walk(app).filter((f) => STYLE_EXT.test(f) && !/brandos[\\/]/.test(f)).map((f) => ({ file: f, ...analyseStyle(path.join(app, f)) })).filter((s) => s.colors)
  const mig = path.join(app, "MIGRATION.md")
  let status = null
  if (fs.existsSync(mig)) {
    const t = fs.readFileSync(mig, "utf8")
    status = { approved: (t.match(/^- \[x\]/gm) ?? []).length, review: (t.match(/^- \[~\]/gm) ?? []).length, todo: (t.match(/^- \[ \]/gm) ?? []).length }
  }
  let themeCandidates = []
  try {
    const m = JSON.parse(fs.readFileSync(path.join(app, ".brandos", "manifest.json"), "utf8"))
    themeCandidates = Object.keys(m.files ?? {}).filter((f) => /(^|[\\/])theme\.css$/.test(f))
  } catch {}
  let contrast = null
  if (themeCandidates.length) {
    const { parseThemeCss, audit } = await import("./contrast.mjs")
    const r = audit(parseThemeCss(fs.readFileSync(path.join(app, themeCandidates[0]), "utf8")))
    contrast = { pass: r.pass, failing: r.checks.filter((c) => !c.pass) }
  }
  // Palette lock: every coloured value and every font in the app's own code must come from the brand.
  let palette = null
  try {
    const m = JSON.parse(fs.readFileSync(path.join(app, ".brandos", "manifest.json"), "utf8"))
    const pf = Object.keys(m.files ?? {}).find((f) => /(^|[\\/])palette\.json$/.test(f))
    if (pf) palette = JSON.parse(fs.readFileSync(path.join(app, pf), "utf8"))
  } catch {}
  const offBrand = []
  if (palette) {
    const { scanSource } = await import("./palette.mjs")
    for (const f of walk(app).filter((f) => (UI_EXT.test(f) || STYLE_EXT.test(f) || /\.(ts|js|mjs)$/.test(f)) && !/(^|[\\/])brandos[\\/]/.test(f) && !/\.(test|spec)\./.test(f)))
      for (const v of scanSource(fs.readFileSync(path.join(app, f), "utf8"), palette)) offBrand.push({ file: f, ...v })
  }

  console.log(`BrandOS audit: ${app}\n`)
  console.log(contrast ? (contrast.pass ? "✓ Theme contrast passes WCAG 2.2 AA" : `✗ Theme contrast: ${contrast.failing.length} failing pairs`) : "• No installed theme.css found")
  if (status) console.log(`${status.todo + status.review ? "✗" : "✓"} Pages: ${status.approved} approved, ${status.review} in review, ${status.todo} to do`)
  const t = sum(rows)
  console.log(`${t.total ? "✗" : "✓"} Hand-built UI left: ${t.total}`)
  console.log(`${t.colors + styles.reduce((n, s) => n + s.colors, 0) ? "✗" : "✓"} Hard-coded colours left: ${t.colors + styles.reduce((n, s) => n + s.colors, 0)}`)
  for (const r of rows.sort((x, y) => y.total + y.colors - (x.total + x.colors)).slice(0, 15))
    console.log(`   ${r.file}: ${describe(r.counts)}${r.colors ? `${r.total ? ", " : ""}${r.colors} colours` : ""}`)
  for (const s of styles.slice(0, 10)) console.log(`   ${s.file}: ${s.colors} colours`)
  if (palette) {
    const cols = offBrand.filter((o) => o.kind === "colour"), fonts = offBrand.filter((o) => o.kind === "font")
    console.log(`${cols.length ? "✗" : "✓"} Off-brand colours: ${cols.length} (palette: ${palette.families.map((f) => f.hex).filter((h, i, a) => a.indexOf(h) === i).join(", ")})`)
    for (const o of cols.slice(0, 25)) console.log(`   ${o.file}:${o.line}  ${o.value}  ${o.detail}`)
    if (cols.length > 25) console.log(`   …and ${cols.length - 25} more`)
    console.log(`${fonts.length ? "✗" : "✓"} Off-brand fonts: ${fonts.length} (allowed: ${Object.values(palette.fonts).flat().join(", ")})`)
    for (const o of fonts.slice(0, 15)) console.log(`   ${o.file}:${o.line}  ${o.value}  ${o.detail}`)
  } else console.log("• No palette.json installed; re-run brandos theme and brandos install to enable the palette lock")
  const ok = (!contrast || contrast.pass) && (!status || status.todo + status.review === 0) && t.total === 0 && offBrand.length === 0
  console.log(ok ? "\n✓ Ready to ship" : "\nNot finished yet. Fix the items above, or record why each one stays in MIGRATION.md.")
  return ok ? 0 : 1
}

/* ---------------- analysis ---------------- */

function walk(root) {
  const out = []
  const go = (dir) => {
    let entries = []
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (IGNORE.has(e.name) || e.name.startsWith(".")) continue
      const p = path.join(dir, e.name)
      if (e.isDirectory()) go(p)
      else out.push(path.relative(root, p))
    }
  }
  go(root)
  return out
}

function isKitFile(f, d) {
  const n = f.replace(/\\/g, "/")
  return n.startsWith(d.componentsDir.replace(/\\/g, "/") + "/") || /components\/icon-placeholder\.tsx$/.test(n) || /\.(test|spec|stories)\./.test(n) || /^public\//.test(n)
}

function isPage(f, d) {
  const n = f.replace(/\\/g, "/")
  switch (d.framework) {
    case "next":
      return /(^|\/)app\/.*\/?page\.(tsx|jsx|mdx)$/.test(n) || (/(^|\/)pages\//.test(n) && !/\/(_app|_document|_error|api\/)/.test(n))
    case "svelte":
      return /\+page\.svelte$/.test(n)
    case "nuxt":
      return /(^|\/)pages\//.test(n)
    case "react-router":
      return /(^|\/)routes\//.test(n)
    case "angular":
      return /\.component\.html$/.test(n) && /(pages?|views?|features?|routes?)\//.test(n) || /-page\.component\.html$/.test(n)
    case "html":
    case "dotnet":
      return /\.(html?|cshtml|razor)$/.test(n) && !/(^|\/)(_|shared\/|partials?\/)/.test(n)
    default:
      return /(^|\/)(pages?|views?|screens?|routes?)\//.test(n) || /(^|\/)(App|Home|Index)\.(tsx|jsx|vue)$/.test(n)
  }
}

function routeOf(f, d) {
  const n = f.replace(/\\/g, "/")
  if (d.framework === "next") {
    const m = n.match(/app\/(.*?)\/?page\.(tsx|jsx|mdx)$/)
    if (m) return "/" + m[1].replace(/\([^)]*\)\/?/g, "").replace(/\/$/, "")
    const p = n.match(/pages\/(.*)\.(tsx|jsx)$/)
    if (p) return "/" + p[1].replace(/(^|\/)index$/, "")
  }
  if (d.framework === "svelte") return "/" + (n.match(/routes\/(.*?)\/?\+page\.svelte$/)?.[1] ?? "")
  return null
}

const layoutRank = (f) => (/layout|shell|header|nav|sidebar|footer|app\.(tsx|jsx|vue|component)/i.test(f) ? 0 : 1)

// Rules that are only advice for a kit (PrimeVue keeps native labels).
const ADVICE_FOR = { primevue: ["label", "hr"] }
function analyseFile(file, kit) {
  const text = fs.readFileSync(file, "utf8")
  // Elements already styled with BrandOS classes (bos-*) are on brand, not hand-built. Find where those
  // tags sit in the file and don't count anything found inside them. (Nothing is removed from the text.)
  const branded = []
  for (const m of text.matchAll(/<[a-zA-Z][\w.-]*\b[^>]*>/g))
    if (/\bclass(?:Name)?=[^>]*\bbos-[\w-]/.test(m[0])) branded.push([m.index, m.index + m[0].length])
  const outsideBranded = (m) => !branded.some(([from, to]) => m.index >= from && m.index < to)
  const counts = {}
  const advice = {}
  for (const r of RULES) {
    const n = [...text.matchAll(r.re)].filter(outsideBranded).length
    if (n) (r.advice || ADVICE_FOR[kit]?.includes(r.id) ? advice : counts)[r.id] = n
  }
  // Already migrated: imports from the kit reduce what's left to do.
  const usesKit = (text.match(/from ["'][^"']*components\/ui\/[\w-]+["']/g) ?? []).length
  let colors = 0
  const colorKinds = {}
  for (const r of COLOR_RULES) {
    // "#1042" is usually an order number, not a colour: skip all-digit 4/8-length codes.
    const n = (text.match(r.re) ?? []).filter((m) => !(r.id === "hex" && /^#(?:\d{4}|\d{8})$/.test(m))).length
    if (n) {
      colorKinds[r.id] = n
      colors += n
    }
  }
  const inlineStyles = (text.match(/\sstyle=\{?\{|\sstyle="/g) ?? []).length
  const total = Object.values(counts).reduce((x, y) => x + y, 0)
  return { counts, advice, total, colors, colorKinds, inlineStyles, usesKit, lines: text.split("\n").length }
}

function analyseStyle(file) {
  const text = fs.readFileSync(file, "utf8")
  const colors = (text.match(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(\s*\d/g) ?? []).length
  const fonts = (text.match(/font-family\s*:/g) ?? []).length
  return { colors, fonts }
}

function detectLibs(app) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(app, "package.json"), "utf8"))
    const deps = Object.keys({ ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) })
    return [...new Set(LIBS.filter(([k]) => deps.some((d) => d === k || d.startsWith(k))).map(([, v]) => v))]
  } catch {
    return []
  }
}

const sum = (rows) => rows.reduce((t, r) => ({ total: t.total + r.total, colors: t.colors + r.colors }), { total: 0, colors: 0 })
const describe = (counts) => Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(", ")

/* ---------------- MIGRATION.md ---------------- */

function plan(d, shared, pages, styles, libs) {
  const rule = (id) => (d.kit === "primevue" && PRIMEVUE_USE[id]) || RULES.find((r) => r.id === id)?.use || id
  const item = (e, i) => {
    const lines = [`- [ ] **${e.file}**${e.route ? ` (route \`${e.route || "/"}\`)` : ""}`]
    const swaps = Object.entries(e.counts).map(([k, v]) => `${v} × ${k} → ${rule(k)}`)
    if (swaps.length) lines.push(`  - Swap: ${swaps.join("; ")}`)
    const tips = Object.entries(e.advice ?? {}).map(([k, v]) => `${v} × ${k} → ${rule(k)}`)
    if (tips.length) lines.push(`  - Consider: ${tips.join("; ")}`)
    if (e.colors) lines.push(`  - Colours: ${e.colors} hard-coded (${Object.entries(e.colorKinds).map(([k, v]) => `${v} ${k}`).join(", ")}) → ${d.tailwind ? "theme tokens (bg-primary, text-muted-foreground, border-border…)" : "theme variables (var(--primary), var(--muted-foreground), var(--border)…)"}`)
    if (e.inlineStyles) lines.push(`  - Inline styles: ${e.inlineStyles} → ${d.tailwind ? "utility classes or component props" : "component props or classes using theme variables"}`)
    if (e.usesKit) lines.push(`  - Already uses ${e.usesKit} kit component imports`)
    lines.push(`  - Restructure ideas: _agent fills this in before starting the page_`)
    lines.push(`  - Review: _not started_`)
    return lines.join("\n")
  }
  const L = []
  L.push(`# UI migration plan`, ``)
  L.push(`| | |`, `|---|---|`)
  L.push(`| Framework | ${d.framework}${d.tailwind ? `, Tailwind v${d.tailwind.version}` : ""} |`)
  L.push(`| Kit | ${d.kit} |`)
  L.push(`| Scanned | ${new Date().toISOString().slice(0, 10)} |`)
  if (d.kit === "primevue") L.push(`| PrimeVue | Already on brand through BrandOSPreset. Keep PrimeVue components; restructure layouts, fix hard-coded colours, and use kit markup only for what PrimeVue lacks. |`)
  if (libs.length) L.push(`| Other UI libraries | ${libs.join(", ")} (replace their components as you go; remove the library when nothing uses it) |`)
  L.push(``)
  L.push(`## Rules for whoever runs this (person or agent)`, ``)
  L.push(`1. Work on **one item at a time**, top to bottom. Shared layout comes first because every page uses it.`)
  L.push(`2. Before changing an item, write its _Restructure ideas_: which parts become which components, and anything you would reorganise (for example "settings list → Field + Switch rows", "custom popup → Dialog"). Keep the page's purpose and data the same.`)
  L.push(`3. Make the change. Behaviour, data flow, routes and tests stay as they were. No hard-coded colours or fonts: use theme tokens only.`)
  L.push(`4. Mark it \`[~]\` (in review), run the app, and show the person the page with a short summary of what changed.`)
  L.push(`5. **Wait for approval.** Apply any tweaks they ask for and note them under _Review_. Mark \`[x]\` only when they say it is approved.`)
  L.push(`6. Then move to the next item. Stop at any point; the next session continues from the first item that is not \`[x]\`.`)
  L.push(`7. When everything is \`[x]\`, run \`brandos audit\`.`)
  L.push(``)
  L.push(`Status key: \`[ ]\` to do · \`[~]\` in review · \`[x]\` approved`, ``)
  L.push(`## 1. Shared layout and components`, ``)
  if (shared.length) shared.forEach((e, i) => L.push(item(e, i)))
  else L.push(`_No shared components with hand-built UI found._`)
  L.push(``, `## 2. Pages`, ``)
  if (pages.length) pages.forEach((e, i) => L.push(item(e, i)))
  else L.push(`_No pages detected automatically. List the app's pages here, one checklist item each, in the order people use them._`)
  if (styles.length) {
    L.push(``, `## 3. Stylesheets with hard-coded brand values`, ``)
    L.push(`Remove colours and fonts these files set once every page using them is migrated. Keep layout-only rules.`, ``)
    for (const s of styles) L.push(`- [ ] **${s.file}**: ${s.colors} colours, ${s.fonts} font declarations`)
  }
  L.push(``)
  return L.join("\n")
}
