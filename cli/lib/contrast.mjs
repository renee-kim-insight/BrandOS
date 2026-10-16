// WCAG 2.2 AA contrast audit for a generated theme (light and dark token maps).
import { contrast, over, oklch } from "./color.mjs"

export const RULES = {
  text: 4.5, // body text and labels
  large: 3, // 24px+ or 19px bold
  ui: 3, // control edges, focus ring
}

/** Surfaces text can sit on, including glass composited over the brand backdrop. */
function surfaces(t) {
  const bg = oklch(t.background)
  const grounds = { background: bg }
  for (const i of [1, 2, 3]) grounds[`backdrop-${i}`] = over({ ...oklch(t[`backdrop-${i}`]), alpha: 0.7 }, bg)
  const out = {}
  for (const [g, col] of Object.entries(grounds)) {
    out[`page on ${g}`] = col
    out[`glass on ${g}`] = over(t.glass, col)
    out[`glass-strong on ${g}`] = over(t["glass-strong"], col)
    for (const tier of ["frost-strong", "frost-medium", "frost-light"]) if (t[tier]) out[`${tier} on ${g}`] = over(t[tier], col)
  }
  if (t.overlay) out.overlay = over(t.overlay, bg)
  out.card = over(t.card, bg)
  out.popover = over(t.popover, bg)
  out.muted = over(t.muted, bg)
  return out
}

/** Returns { pass, checks: [{ mode, pair, ratio, min, pass }] }. */
export function audit(modes) {
  const checks = []
  const add = (mode, pair, a, b, min) => {
    const ratio = contrast(a, b)
    checks.push({ mode, pair, ratio: Math.round(ratio * 100) / 100, min, pass: ratio >= min })
  }
  for (const [mode, t] of Object.entries(modes)) {
    const bg = oklch(t.background)
    for (const [name, s] of Object.entries(surfaces(t))) {
      add(mode, `foreground on ${name}`, t.foreground, s, RULES.text)
      add(mode, `muted-foreground on ${name}`, t["muted-foreground"], s, RULES.text)
    }
    add(mode, "primary-foreground on primary", t["primary-foreground"], over(t.primary, bg), RULES.text)
    add(mode, "secondary-foreground on secondary", t["secondary-foreground"], over(t.secondary, bg), RULES.text)
    add(mode, "destructive on background", t.destructive, bg, RULES.text)
    add(mode, "destructive on card", t.destructive, over(t.card, bg), RULES.text)
    add(mode, "input border on background", over(t.input, bg), bg, RULES.ui)
    add(mode, "input border on card", over(t.input, over(t.card, bg)), over(t.card, bg), RULES.ui)
    add(mode, "focus ring on background", t.ring, bg, RULES.ui)
    if (t["progress-fill"]) add(mode, "progress fill on track", t["progress-fill"], t["progress-track"], RULES.ui)
    if (t["progress-fill-foreground"]) add(mode, "progress-fill-foreground on progress-fill", t["progress-fill-foreground"], t["progress-fill"], RULES.text)
    for (let i = 1; i <= 4; i++) if (t[`band-${i}`]) add(mode, `band-foreground on band-${i}`, t["band-foreground"], t[`band-${i}`], RULES.text)
    for (let i = 0; i < 6; i++) if (t[`ramp-${i}`]) add(mode, `ramp-${i}-foreground on ramp-${i}`, t[`ramp-${i}-foreground`], over(t[`ramp-${i}`], bg), RULES.text)
  }
  return { pass: checks.every((c) => c.pass), checks }
}

/** Parse :root / .dark blocks from a theme.css (used by `brandos contrast`). */
export function parseThemeCss(text) {
  const blocks = {}
  for (const m of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = m[1].trim().split("\n").pop().trim()
    const vars = {}
    for (const v of m[2].matchAll(/--([\w-]+):\s*([^;]+);/g)) vars[v[1]] = v[2].trim()
    blocks[sel] = vars
  }
  const lightSel = Object.keys(blocks).find((s) => !/\.dark/.test(s) && blocks[s].background)
  const darkSel = Object.keys(blocks).find((s) => /\.dark/.test(s) && blocks[s].background)
  const light = blocks[lightSel] || {}
  const modes = { light }
  if (darkSel) modes.dark = { ...light, ...blocks[darkSel] }
  return modes
}
