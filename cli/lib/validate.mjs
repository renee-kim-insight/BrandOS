// Small dependency-free validator for brand.json (mirrors brand/brand.schema.json).
import { oklch } from "./color.mjs"

const COLOR_KEYS = ["primary", "secondary", "neutral", "background", "text", "danger", "success", "warning"]
const RADII = ["sharp", "soft", "rounded", "pill"]
const SOURCES = ["google", "self-hosted", "system"]

export function validateBrand(b) {
  const e = []
  if (!b || typeof b !== "object") return ["brand.json must be an object"]
  if (!b.name) e.push("name is required")
  if (b.slug && !/^[a-z0-9-]+$/.test(b.slug)) e.push("slug must be lowercase letters, numbers and dashes")
  if (!b.colors?.primary) e.push("colors.primary is required")
  const isColor = (v, where) => {
    try {
      oklch(v)
    } catch {
      e.push(`${where} is not a valid colour: ${v}`)
    }
  }
  for (const k of COLOR_KEYS) if (b.colors?.[k] != null) isColor(b.colors[k], `colors.${k}`)
  ;(b.colors?.accents ?? []).forEach((v, i) => isColor(v, `colors.accents[${i}]`))
  for (const k of Object.keys(b.colors ?? {})) if (![...COLOR_KEYS, "accents"].includes(k)) e.push(`colors.${k} is not a known key`)
  if (!b.fonts?.sans?.family) e.push("fonts.sans.family is required")
  for (const [k, f] of Object.entries(b.fonts ?? {})) {
    if (!["sans", "display", "mono"].includes(k)) e.push(`fonts.${k} is not a known key (use sans, display, mono)`)
    if (f?.source && !SOURCES.includes(f.source)) e.push(`fonts.${k}.source must be one of ${SOURCES.join(", ")}`)
    if (f?.source === "self-hosted" && !f.fallback) e.push(`fonts.${k}: self-hosted fonts need a fallback in case the files are missing`)
  }
  if (b.radius != null && !(RADII.includes(b.radius) || (typeof b.radius === "number" && b.radius >= 0 && b.radius <= 2)))
    e.push(`radius must be ${RADII.join(", ")} or a number of rem between 0 and 2`)
  return e
}
