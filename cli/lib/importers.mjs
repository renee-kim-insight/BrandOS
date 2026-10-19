// Design systems that already exist (token files, CSS variables, Tailwind configs, a brand.json) state their
// values exactly. These importers read them directly into a brand.json draft: no guessing and no AI.
import fs from "node:fs"
import path from "node:path"

import { hex, oklch } from "./color.mjs"
import { classify, fontEntry } from "./fontfiles.mjs"

const EXT = /\.(json|css|scss|less|js|cjs|mjs|ts)$/i
export const isDesignSystemFile = (file) => EXT.test(file)

/** Returns { draft, candidates, notes, report } for a tokens, CSS, Tailwind or brand.json file. */
export function importDesignSystem(file) {
  const text = fs.readFileSync(file, "utf8")
  const ext = path.extname(file).toLowerCase()
  const notes = []
  let tokens
  if (ext === ".json") {
    const data = JSON.parse(text)
    if (data?.colors?.primary && data?.fonts?.sans) {
      notes.push(`${path.basename(file)} is already a BrandOS brand file, so it was used as is.`)
      const draft = { ...data }
      delete draft.$schema
      return { draft, candidates: [], notes, report: notes.join("\n") }
    }
    tokens = fromJson(data)
    notes.push(`Read ${tokens.length} tokens from ${path.basename(file)} (design tokens, Figma variables, Tokens Studio or Style Dictionary).`)
  } else if (/\.(css|scss|less)$/.test(ext)) {
    tokens = fromCss(text)
    notes.push(`Read ${tokens.length} variables from ${path.basename(file)}.`)
  } else {
    tokens = fromTailwind(text)
    notes.push(`Read ${tokens.length} values from the Tailwind config ${path.basename(file)} (read as text, never run).`)
  }
  const draft = toBrand(tokens, file, notes)
  const candidates = tokens
    .filter((t) => t.kind === "color")
    .map((t) => ({ hex: t.hex, name: t.name }))
    .filter((c, i, a) => a.findIndex((x) => x.hex === c.hex) === i)
    .slice(0, 32)
  const report = [`# Imported from ${path.basename(file)}`, "", ...notes, "", "| Token | Value |", "|---|---|", ...tokens.slice(0, 120).map((t) => `| ${t.name} | ${t.kind === "color" ? t.hex : t.value} |`)].join("\n")
  return { draft, candidates, notes, report }
}

/* ---------------- readers: every source becomes a flat list of { name, kind, value, hex } ---------------- */

function colorOf(v) {
  if (typeof v !== "string") return null
  const s = v.trim()
  if (!/^(#|rgb|hsl|oklch|oklab|lab|lch|hwb|color\()/i.test(s)) return null
  try {
    const c = oklch(s)
    return c && Number.isFinite(c.l) ? hex(c) : null
  } catch {
    return null
  }
}

const FONTISH = /font|family|typeface|typography/i
function fontOf(v) {
  const list = Array.isArray(v) ? v : typeof v === "string" ? v.split(",") : []
  for (const raw of list) {
    const f = String(raw).trim().replace(/^["']|["']$/g, "")
    if (f && !/^(var\(|ui-|system-ui|-apple|BlinkMacSystemFont|sans-serif|serif|monospace|cursive|inherit|initial)/i.test(f) && !/^\d/.test(f)) return f
  }
  return null
}

function fromJson(data) {
  const out = []
  const flat = new Map()
  const walk = (node, trail, inheritedType) => {
    if (node == null) return
    if (typeof node !== "object" || Array.isArray(node)) {
      flat.set(trail.join("."), { value: node, type: inheritedType })
      return
    }
    const type = node.$type ?? node.type ?? inheritedType
    if ("$value" in node || ("value" in node && typeof node.value !== "object")) {
      flat.set(trail.join("."), { value: node.$value ?? node.value, type })
      return
    }
    // Figma variables export: { variables: [{ name, resolvedValuesByMode | valuesByMode }] }
    if (Array.isArray(node.variables)) {
      for (const v of node.variables) {
        const val = Object.values(v.resolvedValuesByMode ?? v.valuesByMode ?? {})[0]
        const value = val?.resolvedValue ?? val
        flat.set(String(v.name).replace(/\//g, "."), { value: typeof value === "object" && value && "r" in value ? rgbaObj(value) : value, type: v.resolvedType?.toLowerCase() })
      }
      return
    }
    for (const [k, v] of Object.entries(node)) if (!k.startsWith("$")) walk(v, [...trail, k], type)
  }
  walk(data, [], undefined)
  const resolve = (v, depth = 0) => {
    if (typeof v === "string" && /^\{[^}]+\}$/.test(v) && depth < 8) {
      const ref = flat.get(v.slice(1, -1))
      return ref ? resolve(ref.value, depth + 1) : v
    }
    return v
  }
  for (const [name, { value, type }] of flat) {
    const v = resolve(value)
    const c = colorOf(v)
    if (c && (!type || /colou?r/i.test(type))) out.push({ name, kind: "color", hex: c, value: v })
    else if ((/fontfamil/i.test(type ?? "") || (FONTISH.test(name) && !/size|weight|height|spacing|style/i.test(name))) && fontOf(v)) out.push({ name, kind: "font", value: fontOf(v) })
  }
  return out
}

const rgbaObj = ({ r, g, b }) => `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`

function fromCss(text) {
  const out = []
  const vars = new Map()
  for (const m of text.matchAll(/(--[\w-]+|\$[\w-]+|@[\w-]+)\s*:\s*([^;{}]+);/g)) if (!vars.has(m[1])) vars.set(m[1], m[2].trim())
  const resolve = (v, depth = 0) => {
    const m = v.match(/^var\((--[\w-]+)(?:,\s*([^)]+))?\)$/) || v.match(/^(\$[\w-]+|@[\w-]+)$/)
    if (m && depth < 8) return vars.has(m[1]) ? resolve(vars.get(m[1]), depth + 1) : m[2] ?? v
    return v
  }
  for (const [k, raw] of vars) {
    const name = k.replace(/^(--|\$|@)/, "")
    const v = resolve(raw)
    // shadcn style: --primary: 330 80% 45% (bare HSL channels)
    const bare = /^\d+(\.\d+)?\s+\d+(\.\d+)?%\s+\d+(\.\d+)?%$/.test(v) ? `hsl(${v})` : v
    const c = colorOf(bare)
    if (c) out.push({ name, kind: "color", hex: c, value: v })
    else if (FONTISH.test(name) && !/size|weight|height|spacing/i.test(name) && fontOf(v)) out.push({ name, kind: "font", value: fontOf(v) })
  }
  for (const m of text.matchAll(/@font-face\s*{[^}]*font-family\s*:\s*([^;}]+)/gi)) {
    const f = fontOf(m[1])
    if (f) out.push({ name: "font-face", kind: "font", value: f })
  }
  return out
}

function fromTailwind(text) {
  const out = []
  const src = text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1")
  // Walk the object literal, tracking the key path through braces.
  const stack = []
  let pending = null
  const re = /(['"]?[\w-]+['"]?)\s*:\s*(\{|\[[^\]]*\]|['"][^'"]*['"])|(\{)|(\})/g
  for (const m of src.matchAll(re)) {
    if (m[3]) stack.push(pending ?? "")
    else if (m[4]) stack.pop()
    else {
      const key = m[1].replace(/['"]/g, "")
      if (m[2] === "{") {
        stack.push(key)
        continue
      }
      const name = [...stack.filter(Boolean), key].join(".")
      const raw = m[2].startsWith("[") ? m[2] : m[2].slice(1, -1)
      const c = colorOf(raw)
      if (c) out.push({ name: name.replace(/^.*?colors\./, ""), kind: "color", hex: c, value: raw })
      else if (/fontFamily/.test(name)) {
        const list = raw.startsWith("[") ? [...raw.matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]) : [raw]
        const f = fontOf(list)
        if (f) out.push({ name: name.replace(/^.*?fontFamily\./, "font-"), kind: "font", value: f })
      }
    }
    pending = null
  }
  return out
}

/* ---------------- roles: names say what a token is for ---------------- */

const ROLE = {
  primary: /(^|[.\-_/])(primary|brand|main)([.\-_/]|$)/i,
  secondary: /(^|[.\-_/])secondary([.\-_/]|$)/i,
  accent: /(^|[.\-_/])(accent|tertiary|highlight)([.\-_/]|$)/i,
  danger: /(^|[.\-_/])(danger|error|destructive|critical)([.\-_/]|$)/i,
  success: /(^|[.\-_/])(success|positive)([.\-_/]|$)/i,
  warning: /(^|[.\-_/])(warning|caution)([.\-_/]|$)/i,
  neutral: /(^|[.\-_/])(neutral|gr[ae]y|slate|stone|zinc|carbon)([.\-_/]|$)/i,
  background: /(^|[.\-_/])(background|bg|canvas|page)([.\-_/]|$)/i,
  text: /(^|[.\-_/])(text|foreground|fg|ink|body-color)([.\-_/]|$)/i,
}
const SKIP = /(foreground|fg|text|border|ring|hover|active|pressed|disabled|subtle|muted|on-|shadow|overlay|focus)/i

// From a scale (50 ... 900), the step people mean when they say "the blue".
function representative(list) {
  const step = (t) => Number(t.name.match(/(\d{2,3})$/)?.[1] ?? NaN)
  const plain = list.find((t) => /(DEFAULT|base|main)$/i.test(t.name)) ?? list.find((t) => !Number.isFinite(step(t)))
  if (plain) return plain
  return [...list].sort((a, b) => Math.abs((step(a) || 500) - 550) - Math.abs((step(b) || 500) - 550))[0]
}

function toBrand(tokens, file, notes) {
  const colors = tokens.filter((t) => t.kind === "color")
  const fonts = tokens.filter((t) => t.kind === "font")
  const pick = (role, extra = () => true) => {
    const list = colors.filter((t) => ROLE[role].test(t.name) && (role === "text" || role === "background" || !SKIP.test(t.name.replace(ROLE[role], ""))) && extra(t))
    return list.length ? representative(list) : null
  }
  const chroma = (h) => oklch(h).c
  const brand = { name: guessName(file), slug: "", version: "1.0.0", sources: [{ type: "tokens", ref: path.basename(file), note: "Imported from a design-system file." }], colors: {}, fonts: {}, radius: "rounded" }
  const used = new Set()
  const take = (role, t) => {
    if (!t) return
    brand.colors[role] = t.hex
    used.add(t.hex)
    notes.push(`${role}: ${t.hex} from ${t.name}`)
  }
  take("primary", pick("primary", (t) => chroma(t.hex) >= 0.04))
  if (!brand.colors.primary) {
    // No token called primary: the most used colourful family.
    const fam = new Map()
    for (const t of colors.filter((t) => chroma(t.hex) >= 0.08 && !SKIP.test(t.name))) {
      const k = t.name.replace(/[.\-_/]?\d{2,3}$/, "")
      fam.set(k, [...(fam.get(k) ?? []), t])
    }
    const best = [...fam.values()].sort((a, b) => b.length - a.length)[0]
    if (best) {
      take("primary", representative(best))
      notes.push("DECISION: no token is named primary or brand, so the most used colour family was chosen. Check it.")
    }
  }
  take("secondary", pick("secondary", (t) => !used.has(t.hex)))
  take("danger", pick("danger"))
  take("success", pick("success"))
  take("warning", pick("warning"))
  take("neutral", pick("neutral", (t) => oklch(t.hex).l > 0.2 && oklch(t.hex).l < 0.6))
  const bg = pick("background", (t) => oklch(t.hex).l > 0.9)
  if (bg && oklch(bg.hex).c > 0.005) take("background", bg)
  const accents = colors.filter((t) => ROLE.accent.test(t.name) && !used.has(t.hex) && chroma(t.hex) >= 0.04)
  const acc = [...new Map(accents.map((t) => [t.name.replace(/[.\-_/]?\d{2,3}$/, ""), t])).values()].slice(0, 4).map((t) => t.hex)
  // Other colourful families in the file are brand colours too (charts, illustrations).
  if (acc.length < 3) {
    const fams = new Map()
    for (const t of colors) {
      if (used.has(t.hex) || acc.includes(t.hex) || chroma(t.hex) < 0.08 || SKIP.test(t.name) || Object.entries(ROLE).some(([r, re]) => r !== "accent" && re.test(t.name))) continue
      const k = t.name.replace(/[.\-_/]?(\d{2,3}|DEFAULT)$/, "")
      fams.set(k, [...(fams.get(k) ?? []), t])
    }
    for (const list of fams.values()) if (acc.length < 3) acc.push(representative(list).hex)
  }
  if (acc.length) brand.colors.accents = acc
  // Fonts: heading or display names go to display, body or sans to sans, mono to mono.
  const fam = (re) => fonts.find((f) => re.test(f.name))?.value
  const display = fam(/head|display|title|headline|serif(?!.*sans)/i)
  const sans = fam(/body|sans|base|text|ui|primary|default/i) ?? fonts.find((f) => f.value !== display && classify(f.value) !== "mono")?.value
  const mono = fam(/mono|code/i)
  brand.fonts.sans = fontEntry({ family: sans ?? "Geist", sources: new Set() })
  if (display && display !== brand.fonts.sans.family) brand.fonts.display = fontEntry({ family: display, sources: new Set() })
  if (mono) brand.fonts.mono = fontEntry({ family: mono, sources: new Set() })
  if (!sans) notes.push("No body font in the file, so Geist is used. Set fonts.sans in the dashboard.")
  if (!brand.colors.primary) {
    brand.colors.primary = "#17131c"
    notes.push("DECISION NEEDED: no brand colour found. Pick the primary in the dashboard.")
  }
  brand.slug = brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "brand"
  return brand
}

function guessName(file) {
  const base = path.basename(file).replace(/\.[^.]+$/, "")
  const words = base.replace(/[._-]+/g, " ").replace(/\b(tokens?|design|system|theme|variables?|tailwind|config|styles?|brand|colou?rs?|figma|export|css|json)\b/gi, "").trim()
  const n = words || "Brand"
  return n.replace(/\b\w/g, (c) => c.toUpperCase())
}
