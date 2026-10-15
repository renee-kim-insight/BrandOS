// Colour helpers. All maths happens in OKLCH so lightness changes look even.
import { converter, parse, wcagContrast, formatHex } from "culori"

const toOklch = converter("oklch")
const toRgb = converter("rgb")

const round = (n, d = 3) => Math.round(n * 10 ** d) / 10 ** d

/** Parse any CSS colour string into OKLCH { l, c, h, alpha }. Throws on bad input. */
export function oklch(input) {
  const p = typeof input === "string" ? parse(input.trim()) : input
  if (!p) throw new Error(`Not a colour: ${input}`)
  const c = toOklch(p)
  return { mode: "oklch", l: c.l ?? 0, c: c.c ?? 0, h: Number.isFinite(c.h) ? c.h : 0, alpha: c.alpha ?? 1 }
}

export const mk = (l, c, h, alpha = 1) => ({ mode: "oklch", l, c, h, alpha })

/** CSS string in oklch(), matching shadcn's theme format. */
export function css(col) {
  const c = oklch(col)
  const base = `oklch(${round(c.l)} ${round(c.c)} ${round(c.h, 1)}`
  return c.alpha < 1 ? `${base} / ${Math.round(c.alpha * 100)}%)` : `${base})`
}

export const hex = (col) => formatHex(oklch(col))

/** Alpha-composite `top` over an opaque `bottom`, in sRGB like a browser does. */
export function over(top, bottom) {
  const t = toRgb(oklch(top))
  const b = toRgb(oklch(bottom))
  const a = t.alpha ?? 1
  return oklch({ mode: "rgb", r: t.r * a + b.r * (1 - a), g: t.g * a + b.g * (1 - a), b: t.b * a + b.b * (1 - a) })
}

export const contrast = (a, b) => wcagContrast(oklch(a), oklch(b))

/** Move lightness in `step` increments until test(colour) passes or bounds are hit. */
export function nudge(col, test, { step = -0.01, min = 0.05, max = 0.98 } = {}) {
  let c = oklch(col)
  for (let i = 0; i < 100; i++) {
    if (test(c)) return c
    const l = c.l + step
    if (l < min || l > max) break
    c = { ...c, l }
  }
  return test(c) ? c : null
}

export const isNeutral = (col) => oklch(col).c < 0.035
