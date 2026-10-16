import { classify } from "./fontfiles.mjs"
import path from "node:path"
// brand.json -> full shadcn-compatible token set (light + dark), with contrast fixes.
import { contrast, css, hex, isNeutral, mk, nudge, oklch, over } from "./color.mjs"
import { audit, RULES } from "./contrast.mjs"

const RADIUS = { sharp: 0.25, soft: 0.75, rounded: 1, pill: 1.25 }
const WHITE = mk(1, 0, 0)

export function generateTheme(brand) {
  const changes = [] // human-readable notes on every adjustment
  const P = oklch(brand.colors.primary)
  const neutralSrc = brand.colors.neutral ? oklch(brand.colors.neutral) : P
  const nh = isNeutral(neutralSrc) && neutralSrc.c < 0.005 ? 300 : neutralSrc.h // neutral hue
  const N = (l, c) => mk(l, c, nh)
  const near = N(0.19, 0.02) // near-black for text on light fills

  /* ---------- light ---------- */
  const L = {}
  L.background = brand.colors.background ? oklch(brand.colors.background) : N(0.975, 0.004)
  L.foreground = brand.colors.text ? oklch(brand.colors.text) : N(0.196, 0.019)
  L.card = WHITE
  L["card-foreground"] = L.foreground
  L.popover = WHITE
  L["popover-foreground"] = L.foreground
  L.secondary = N(0.949, 0.007)
  L["secondary-foreground"] = L.foreground
  L.muted = N(0.949, 0.007)
  L.accent = N(0.949, 0.007)
  L["accent-foreground"] = L.foreground
  L.border = N(0.913, 0.014)

  // Primary as a button fill: text on it must reach 4.5:1.
  const pick = (fill) => (contrast(WHITE, fill) >= contrast(near, fill) ? WHITE : near)
  let primary = P
  let pf = pick(primary)
  if (contrast(pf, primary) < RULES.text) {
    const darker = nudge(primary, (c) => contrast(WHITE, c) >= RULES.text + 0.05, { step: -0.01 })
    if (darker) {
      changes.push(`Light mode: darkened primary ${hex(P)} to ${hex(darker)} so white button text reaches 4.5:1. Use the original ${hex(P)} for accents and illustrations.`)
      primary = darker
      pf = WHITE
    }
  }
  // A very light primary (yellow, pale blue) barely separates from the page as a button fill.
  // Prefer a darker brand colour for buttons and keep the light one for accents.
  if (contrast(primary, L.background) < RULES.ui) {
    const candidates = [brand.colors.secondary, ...(brand.colors.accents ?? [])].filter(Boolean).map(oklch)
    const swap = candidates.find((c) => contrast(WHITE, c) >= RULES.text + 0.05 && contrast(c, L.background) >= RULES.ui)
    if (swap) {
      changes.push(`DECISION: primary ${hex(P)} is too light to stand out as a button on a light page (${contrast(P, L.background).toFixed(2)}:1). Buttons, selection and focus now use ${hex(swap)}; ${hex(P)} stays in charts and the backdrop. Confirm this with the brand owner.`)
      primary = swap
      pf = WHITE
    } else {
      changes.push(`DECISION NEEDED: primary ${hex(P)} only reaches ${contrast(P, L.background).toFixed(2)}:1 against the page, so light-mode buttons will look faint. Add a darker brand colour as colors.secondary, or accept near-black button text on ${hex(P)}.`)
    }
  }
  L.primary = primary
  L["primary-foreground"] = pf
  if (pf !== WHITE) changes.push(`Light mode: primary is light, so button text is near-black instead of white.`)

  const ringL = nudge(primary, (c) => contrast(c, L.background) >= RULES.ui + 0.05, { step: -0.01 })
  L.ring = ringL ?? N(0.48, 0.15)

  const danger = brand.colors.danger ? oklch(brand.colors.danger) : mk(0.551, 0.19, 27.2)
  if (!brand.colors.danger) changes.push(`DECISION NEEDED: the brand has no error colour, so errors use a standard red (${hex(danger)}). Add colors.danger to brand.json if the guide has one; this red is the only colour allowed outside the brand.`)
  L.destructive = nudge(danger, (c) => contrast(c, L.background) >= RULES.text && contrast(c, WHITE) >= RULES.text) ?? mk(0.5, 0.19, 27)

  // Brand palette for charts and backdrop
  const brandHues = [P, brand.colors.secondary && oklch(brand.colors.secondary), ...(brand.colors.accents ?? []).map(oklch)].filter(Boolean)
  const chromatic = brandHues.filter((c) => !isNeutral(c))
  const baseHue = chromatic[0]?.h ?? 280
  // Charts use only brand colours. With fewer than five, repeat them at other lightness levels
  // instead of inventing hues; a brand with no colour at all gets a neutral greyscale.
  const chart = chromatic.slice(0, 5)
  const steps = [0.45, 0.75, 0.35, 0.82]
  for (let i = 0; chart.length < 5; i++) {
    const src = chromatic[i % Math.max(chromatic.length, 1)]
    chart.push(src ? { ...src, l: steps[Math.floor(i / Math.max(chromatic.length, 1)) % steps.length] } : N(0.3 + chart.length * 0.12, 0.02))
  }
  chart.forEach((c, i) => (L[`chart-${i + 1}`] = c))

  // Backdrop and aura colours come only from the brand. With fewer than three brand colours, stay close
  // to the primary hue instead of inventing new ones, so the background never adds off-brand colour.
  const bd = [chromatic[0], chromatic[1], chromatic[2]].map((c, i) => c?.h ?? (baseHue + [0, 8, -8][i] + 360) % 360)
  // Soft wash: glass reads through gentle colour, so the backdrop stays pale and low in chroma.
  L["backdrop-1"] = mk(0.9, 0.05, bd[0])
  L["backdrop-2"] = mk(0.91, 0.045, bd[1])
  L["backdrop-3"] = mk(0.92, 0.04, bd[2])

  // Brand band: the one full-colour gradient (closing calls to action, feature bands, charm fills).
  // Built from brand colours only, each stop darkened just enough that white text reads at 4.5:1.
  const bandSrc = [
    chromatic[1] ?? { ...P, l: P.l - 0.14 },
    { ...P, l: P.l - 0.06 },
    P,
    chromatic[2] ?? chromatic[1] ?? { ...P, l: P.l + 0.04 },
  ]
  bandSrc.forEach((c, i) => {
    L[`band-${i + 1}`] = nudge(c, (x) => contrast(WHITE, x) >= RULES.text + 0.05) ?? mk(0.4, c.c, c.h)
  })
  L["band-foreground"] = WHITE

  L.glass = mk(1, 0, 0, 0.55)
  L["glass-strong"] = mk(1, 0, 0, 0.78)
  L["glass-border"] = mk(1, 0, 0, 0.72)
  L["glass-highlight"] = mk(1, 0, 0, 0.95)
  // Frost tiers: importance is shown by how frosted a surface is, never by switching to solid white.
  L["frost-strong"] = mk(1, 0, 0, 0.72)
  L["frost-medium"] = mk(1, 0, 0, 0.48)
  L["frost-light"] = mk(1, 0, 0, 0.3)
  L["frost-border"] = mk(1, 0, 0, 0.6)
  L.overlay = mk(1, 0, 0, 0.9)

  // Muted text and input borders are tuned against the worst surface.
  L["muted-foreground"] = N(0.5, 0.028)
  L.input = N(0.68, 0.02)
  fixSupporting(L, changes, "Light", -0.01)

  /* ---------- dark ---------- */
  const D = {}
  if (brand.darkMode !== false) {
    D.background = N(0.157, 0.015)
    D.foreground = N(0.964, 0.007)
    D.card = N(0.196, 0.019)
    D["card-foreground"] = D.foreground
    D.popover = N(0.213, 0.018)
    D["popover-foreground"] = D.foreground
    D.secondary = N(0.279, 0.021)
    D["secondary-foreground"] = D.foreground
    D.muted = N(0.279, 0.021)
    D.accent = N(0.279, 0.021)
    D["accent-foreground"] = D.foreground
    D.border = mk(1, 0, 0, 0.1)

    let dp
    if (isNeutral(P)) {
      dp = D.foreground // neutral brands invert, like shadcn's default
    } else {
      dp = nudge({ ...P, l: Math.max(P.l, 0.62) }, (c) => contrast(c, D.background) >= RULES.ui, { step: 0.01, max: 0.92 }) ?? P
    }
    let dpf = pick(dp)
    if (contrast(dpf, dp) < RULES.text) {
      const lighter = nudge(dp, (c) => contrast(near, c) >= RULES.text, { step: 0.01, max: 0.95 })
      if (lighter) {
        dp = lighter
        dpf = near
      }
    }
    D.primary = dp
    D["primary-foreground"] = dpf
    if (!isNeutral(P)) changes.push(`Dark mode: primary is ${hex(dp)} with ${dpf === WHITE ? "white" : "near-black"} text, so both the button text (4.5:1) and the button itself (3:1) read on the dark page.`)
    // A neutral brand keeps a neutral focus ring rather than inventing a colour.
    D.ring = isNeutral(P) ? (chromatic[0] ? { ...chromatic[0], l: 0.7 } : D.foreground) : dp
    D.destructive = nudge({ ...danger, l: Math.max(danger.l, 0.62) }, (c) => contrast(c, D.background) >= RULES.text && contrast(c, D.card) >= RULES.text, { step: 0.01 }) ?? mk(0.64, 0.18, 27)
    for (let i = 1; i <= 5; i++) {
      const c = L[`chart-${i}`]
      D[`chart-${i}`] = { ...c, l: Math.max(c.l, 0.66) }
    }
    D["backdrop-1"] = mk(0.34, 0.09, bd[0])
    D["backdrop-2"] = mk(0.34, 0.075, bd[1])
    D["backdrop-3"] = mk(0.35, 0.06, bd[2])
    D.glass = N(0.24, 0.02)
    D.glass = { ...D.glass, alpha: 0.5 }
    D["glass-strong"] = { ...N(0.22, 0.02), alpha: 0.78 }
    D["glass-border"] = mk(1, 0, 0, 0.12)
    D["glass-highlight"] = mk(1, 0, 0, 0.16)
    D["frost-strong"] = { ...N(0.24, 0.02), alpha: 0.7 }
    D["frost-medium"] = { ...N(0.22, 0.02), alpha: 0.46 }
    D["frost-light"] = mk(1, 0, 0, 0.07)
    D["frost-border"] = mk(1, 0, 0, 0.12)
    D.overlay = { ...N(0.21, 0.018), alpha: 0.92 }
    D["muted-foreground"] = N(0.72, 0.021)
    D.input = N(0.52, 0.02)
    fixSupporting(D, changes, "Dark", +0.01)
  }

  buildProgress(L, N, -0.01)
  buildRamp(L, false)
  if (D.background) {
    buildProgress({ ...L, ...D, set: D }, N, +0.01)
    buildRamp({ ...L, ...D, set: D }, true)
  }

  for (const M of [L, D]) {
    if (!M.background) continue
    M.sidebar = M.background
    M["sidebar-foreground"] = M.foreground
    M["sidebar-primary"] = M.primary
    M["sidebar-primary-foreground"] = M["primary-foreground"]
    M["sidebar-accent"] = M.accent
    M["sidebar-accent-foreground"] = M["accent-foreground"]
    M["sidebar-border"] = M.border
    M["sidebar-ring"] = M.ring
  }

  const modes = { light: L }
  if (D.background) modes.dark = { ...L, ...D }
  const result = audit(modes)
  return { modes, changes, audit: result, radius: radiusOf(brand), fonts: fontStacks(brand) }
}

/**
 * Progress bars default to a muted neutral, not black and not brand colour (brand colour is kept for the
 * user's one main progress bar). The fill must still read against its track at 3:1.
 */
function buildProgress(M, N, step) {
  const out = M.set ?? M
  const dark = step > 0
  const track = dark ? N(0.3, 0.015) : N(0.925, 0.008)
  const start = dark ? N(0.6, 0.02) : N(0.62, 0.02)
  let fill = nudge(start, (c) => contrast(c, track) >= RULES.ui + 0.05 && contrast(c, oklch(M.background)) >= RULES.ui + 0.05, { step }) ?? start
  // Some bars print their value inside the fill: give it a text colour that reaches 4.5:1.
  const inks = [WHITE, oklch(M.foreground), oklch(M.background)]
  const best = (c) => inks.reduce((a, b) => (contrast(b, c) > contrast(a, c) ? b : a))
  if (contrast(best(fill), fill) < RULES.text + 0.05) {
    // Light text needs a darker fill, dark text a lighter one; take whichever direction works.
    const ok = (c) => contrast(best(c), c) >= RULES.text + 0.05 && contrast(c, track) >= RULES.ui + 0.05
    fill = nudge(fill, ok, { step: -0.01 }) ?? nudge(fill, ok, { step: 0.01 }) ?? fill
  }
  out["progress-track"] = track
  out["progress-fill"] = fill
  out["progress-fill-foreground"] = best(fill)
}

/**
 * A six-step sequential ramp of the primary hue, for ordered things like levels, tiers or stages:
 * step 0 is the palest, step 5 the full brand colour. In dark mode it runs dim to bright.
 * Each step gets the text colour (foreground or white) that reaches 4.5:1, nudging lightness if neither does.
 */
function buildRamp(M, dark) {
  const out = M.set ?? M
  const p = oklch(M.primary)
  const fg = oklch(M.foreground)
  const dim = dark ? oklch(M.background) : null
  const L5 = dark ? Math.max(p.l, 0.72) : p.l
  const ls = dark ? [0.3, 0.38, 0.46, 0.55, 0.64, L5] : [0.955, 0.9, 0.83, 0.74, 0.65, p.l]
  const cs = [0.12, 0.27, 0.45, 0.65, 0.85, 1].map((k) => p.c * k)
  for (let i = 0; i < 6; i++) {
    let col = i === 5 && !dark ? p : mk(ls[i], cs[i], p.h)
    const best = (c) => (contrast(WHITE, c) >= contrast(fg, c) ? WHITE : fg)
    let txt = best(col)
    if (contrast(txt, col) < RULES.text + 0.05) {
      // Move away from the text colour until it passes.
      const towardDark = txt === WHITE
      const fixed = nudge(col, (c) => contrast(txt, c) >= RULES.text + 0.05, { step: towardDark ? -0.01 : 0.01 })
      if (fixed) col = fixed
    }
    out[`ramp-${i}`] = col
    out[`ramp-${i}-foreground`] = best(col)
    void dim
  }
}

// Darken (light mode) or lighten (dark mode) muted text and input borders until every surface passes.
function fixSupporting(M, changes, label, step) {
  const probe = (key, min, isBorder) => (c) => {
    const modes = { m: { ...M, [key]: c } }
    const res = audit(modes).checks.filter((x) => (isBorder ? x.pair.startsWith("input border") : x.pair.startsWith("muted-foreground")))
    return res.every((x) => x.ratio >= min + 0.05) // margin absorbs rounding in the CSS output
  }
  const mf = nudge(M["muted-foreground"], probe("muted-foreground", RULES.text), { step })
  if (mf) M["muted-foreground"] = mf
  else changes.push(`${label} mode: could not get muted text to 4.5:1 on every surface. Check the backdrop colours.`)
  const inp = nudge(M.input, probe("input", RULES.ui, true), { step })
  if (inp) M.input = inp
}

function radiusOf(brand) {
  const r = brand.radius ?? "rounded"
  return typeof r === "number" ? r : (RADIUS[r] ?? 1)
}

function stack(f, generic) {
  if (!f) return null
  const parts = [`"${f.family}"`]
  if (f.fallback) parts.push(`"${f.fallback}"`)
  return [...parts, ...generic].join(", ")
}

function fontStacks(brand) {
  const sans = ["ui-sans-serif", "system-ui", "sans-serif"]
  const generic = (f) => ({ slab: ["Rockwell", "Georgia", "serif"], serif: ["Georgia", "ui-serif", "serif"], mono: ["ui-monospace", "monospace"] })[f ? classify(f.family) : "sans"] ?? sans
  return {
    sans: stack(brand.fonts.sans, generic(brand.fonts.sans)),
    display: stack(brand.fonts.display, generic(brand.fonts.display)),
    mono: stack(brand.fonts.mono ?? { family: "Geist Mono" }, ["ui-monospace", "SFMono-Regular", "monospace"]),
  }
}

/* ---------- writers ---------- */

const ORDER = [
  "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
  "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground",
  "accent", "accent-foreground", "destructive", "border", "input", "ring",
  "chart-1", "chart-2", "chart-3", "chart-4", "chart-5",
  "sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-primary-foreground",
  "sidebar-accent", "sidebar-accent-foreground", "sidebar-border", "sidebar-ring",
  "glass", "glass-strong", "glass-border", "glass-highlight",
  "frost-strong", "frost-medium", "frost-light", "frost-border", "overlay",
  "backdrop-1", "backdrop-2", "backdrop-3",
  "band-1", "band-2", "band-3", "band-4", "band-foreground",
  "progress-fill", "progress-fill-foreground", "progress-track",
  "ramp-0", "ramp-0-foreground", "ramp-1", "ramp-1-foreground", "ramp-2", "ramp-2-foreground",
  "ramp-3", "ramp-3-foreground", "ramp-4", "ramp-4-foreground", "ramp-5", "ramp-5-foreground",
]

export function themeCss(brand, theme, { scope } = {}) {
  const { modes, radius, fonts } = theme
  const lightSel = scope ? `[data-brand="${scope}"]` : ":root"
  const darkSel = scope ? `.dark[data-brand="${scope}"]` : ".dark"
  const line = (k, v) => `  --${k}: ${v};`
  const out = []
  out.push(`/*`)
  out.push(` * ${brand.name} theme${brand.version ? ` v${brand.version}` : ""}. Generated by BrandOS from brand.json. Do not edit by hand:`)
  out.push(` * change brand.json and run \`brandos theme\` again. Token names match shadcn/ui.`)
  out.push(` */`)
  out.push(`${lightSel} {`)
  out.push(line("radius", `${radius}rem`))
  if (fonts.sans) out.push(line("font-sans", fonts.sans))
  if (fonts.display) out.push(line("font-display", fonts.display))
  out.push(line("display-weight", brand.fonts.display ? (brand.fonts.display.weight ?? 500) : 650))
  if (fonts.mono) out.push(line("font-mono", fonts.mono))
  for (const k of ORDER) if (modes.light[k]) out.push(line(k, css(modes.light[k])))
  out.push(`  --glass-shadow: 0 8px 32px oklch(0.3 0.06 300 / 10%), 0 1px 2px oklch(0.3 0.06 300 / 6%);`)
  out.push(`  --glass-blur: 24px;`)
  // Shadows tinted with the brand's neutral, so they read as warm or cool like the rest of the greys.
  const sh = (a) => css({ ...oklch(modes.light.foreground), alpha: a })
  out.push(`  --shadow-sm: 0 1px 2px ${sh(0.06)}, 0 1px 3px ${sh(0.06)};`)
  out.push(`  --shadow-md: 0 1px 2px ${sh(0.05)}, 0 4px 12px ${sh(0.07)};`)
  out.push(`  --shadow-lg: 0 2px 4px ${sh(0.05)}, 0 12px 32px ${sh(0.1)};`)
  out.push(`  --gradient-brand: linear-gradient(120deg, var(--band-1) 0%, var(--band-2) 40%, var(--band-3) 68%, var(--band-4) 100%);`)
  out.push(`  /* Spacing scale: use only these steps for gaps, padding and margins. */`)
  ;[4, 8, 12, 16, 24, 32, 48, 64, 96].forEach((px, i) => out.push(line(`space-${i + 1}`, `${px}px`)))
  out.push(`}`)
  if (modes.dark) {
    out.push(``)
    out.push(`${darkSel} {`)
    for (const k of ORDER) {
      const v = modes.dark[k]
      if (v && css(v) !== css(modes.light[k] ?? "transparent")) out.push(line(k, css(v)))
    }
    out.push(`  --glass-shadow: 0 12px 40px oklch(0 0 0 / 40%), 0 1px 2px oklch(0 0 0 / 30%);`)
    out.push(`  --shadow-sm: 0 1px 2px oklch(0 0 0 / 30%);`)
    out.push(`  --shadow-md: 0 4px 12px oklch(0 0 0 / 35%);`)
    out.push(`  --shadow-lg: 0 12px 32px oklch(0 0 0 / 45%);`)
    out.push(`}`)
  }
  return out.join("\n") + "\n"
}

export function fontsCss(brand) {
  const out = [`/* Fonts for ${brand.name}. Import this before theme.css. */`]
  const google = []
  for (const f of Object.values(brand.fonts)) {
    if (!f) continue
    if (f.source === "google") google.push(f)
    if (f.source === "self-hosted") {
      for (const [i, file] of (f.files ?? []).entries()) {
        const w = f.weights?.[i] ?? weightFromName(file)
        const stem = path.basename(file, path.extname(file))
        const style = /italic|oblique/i.test(stem) || /(?:[a-z0-9]|[-_ ])It$/.test(stem) ? "italic" : "normal"
        const ext = path.extname(file).toLowerCase()
        const format = { ".woff2": "woff2", ".woff": "woff", ".otf": "opentype", ".ttf": "truetype" }[ext] ?? "woff2"
        // run-theme copies every file into <out>/fonts/, which travels next to fonts.css.
        out.push(`@font-face {\n  font-family: "${f.family}";\n  src: url("./fonts/${path.basename(file)}") format("${format}");\n  font-weight: ${w};\n  font-style: ${style};\n  font-display: swap;\n}`)
      }
      if (!f.files?.length) out.push(`/* ${f.family} is self-hosted but no files were given. Add licensed .woff2 files to brand.json fonts.${keyOf(brand, f)}.files. Until then the fallback${f.fallback ? ` "${f.fallback}"` : ""} is used. */`)
      if (f.fallback) google.push({ family: f.fallback, weights: f.weights })
    }
  }
  if (google.length) out.push(`/* Google Fonts are loaded by the <link> tags in fonts.html, placed in the page <head>. */`)
  return out.join("\n") + "\n"
}

/** <link> tags for Google Fonts. Goes in the page <head> (a remote @import inside bundled CSS is unreliable). */
export function fontsHtml(brand) {
  const google = []
  for (const f of Object.values(brand.fonts)) {
    if (!f) continue
    if (f.source === "google") google.push(f)
    if (f.source === "self-hosted" && f.fallback) google.push({ family: f.fallback, weights: f.weights })
  }
  if (!brand.fonts.mono) google.push({ family: "Geist Mono", weights: [400, 500] })
  if (!google.length) return ""
  const fam = google
    .map((f) => `family=${encodeURIComponent(f.family).replace(/%20/g, "+")}:wght@${[...new Set(f.weights ?? [400, 500, 600, 700])].sort((a, b) => a - b).join(";")}`)
    .join("&")
  return [
    `<!-- ${brand.name} fonts (BrandOS). Put these in the page <head>. -->`,
    `<link rel="preconnect" href="https://fonts.googleapis.com">`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`,
    `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fam}&display=swap">`,
  ].join("\n") + "\n"
}

const keyOf = (brand, f) => Object.entries(brand.fonts).find(([, v]) => v === f)?.[0]
function weightFromName(file) {
  const n = path.basename(file).toLowerCase().replace(/[-_ ]/g, "")
  if (/thin|hairline/.test(n)) return 100
  if (/extralight|ultralight/.test(n)) return 200
  if (/black|heavy/.test(n)) return 900
  if (/extrabold|ultrabold/.test(n)) return 800
  if (/semibold|demibold/.test(n)) return 600
  if (/bold/.test(n)) return 700
  if (/medium/.test(n)) return 500
  if (/light/.test(n)) return 300
  return 400
}

/** W3C Design Tokens (DTCG) export, for Figma (Tokens Studio), Style Dictionary and others. */
export function tokensJson(brand, theme) {
  const group = (M) => Object.fromEntries(ORDER.filter((k) => M[k]).map((k) => [k, { $type: "color", $value: hex(M[k]) }]))
  return {
    $description: `${brand.name} tokens generated by BrandOS`,
    color: { light: group(theme.modes.light), ...(theme.modes.dark ? { dark: group(theme.modes.dark) } : {}) },
    radius: { base: { $type: "dimension", $value: `${theme.radius}rem` } },
    font: Object.fromEntries(Object.entries(theme.fonts).filter(([, v]) => v).map(([k, v]) => [k, { $type: "fontFamily", $value: v }])),
  }
}

export function reportMd(brand, theme) {
  const { audit: a, changes } = theme
  const fails = a.checks.filter((c) => !c.pass)
  const lines = [
    `# ${brand.name} theme report`,
    ``,
    `Contrast: **${a.pass ? "all checks pass WCAG 2.2 AA" : `${fails.length} checks fail`}** (${a.checks.length} checks across ${Object.keys(theme.modes).join(" and ")}).`,
    ``,
  ]
  if (changes.length) {
    lines.push(`## Adjustments made`, ``)
    for (const c of changes) lines.push(`- ${c}`)
    lines.push(``)
  }
  if (fails.length) {
    lines.push(`## Failing checks`, ``, `| Mode | Pair | Ratio | Needs |`, `|---|---|---|---|`)
    for (const f of fails) lines.push(`| ${f.mode} | ${f.pair} | ${f.ratio} | ${f.min} |`)
    lines.push(``)
  }
  lines.push(`## Key pairs`, ``, `| Mode | Pair | Ratio |`, `|---|---|---|`)
  for (const c of a.checks.filter((c) => /^(primary-foreground|destructive on background|input border on background|focus ring|foreground on page on background|muted-foreground on glass on backdrop-1)/.test(c.pair)))
    lines.push(`| ${c.mode} | ${c.pair} | ${c.ratio} |`)
  return lines.join("\n") + "\n"
}
