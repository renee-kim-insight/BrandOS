// brandos verify: open the running app in a real browser and check what is actually on screen.
// Catches colours and fonts that a source scan cannot see: values from APIs and seed data, inline
// styles built at runtime, third-party components and SVG icons.
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"

import { checkColour, checkFont } from "./palette.mjs"

export async function verify(a, PKG) {
  const base = a._[0]
  if (!base || !/^https?:\/\//.test(base)) throw new Error("Give the running app's URL: brandos verify http://localhost:5173 --app app/frontend")
  const app = path.resolve(a.app ?? ".")
  const palette = loadPalette(app, a.palette)
  const pages = String(a.pages ?? routesFromScan(app) ?? "/").split(",").map((p) => p.trim()).filter(Boolean)
  const darkClass = a["dark-class"] ?? manifestDark(app) ?? "dark"
  const modes = a.mode ? [a.mode] : ["light", "dark"]
  const pw = await loadPlaywright(app, PKG)

  const launchOpts = {}
  if (a.chromium) launchOpts.executablePath = a.chromium
  const browser = await pw.chromium.launch(launchOpts)
  const page = await browser.newPage({ viewport: { width: Number(a.width ?? 1280), height: 900 } })
  const problems = []
  for (const mode of modes) {
    for (const p of pages) {
      const url = new URL(p, base).href
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 })
      } catch {
        await page.goto(url, { waitUntil: "load", timeout: 30000 }).catch(() => {})
      }
      await page.evaluate(([dark, cls]) => {
        const sels = cls.split(",").map((s) => s.trim().replace(/^\./, ""))
        for (const c of sels) document.documentElement.classList.toggle(c, dark)
      }, [mode === "dark", darkClass])
      await page.waitForTimeout(Number(a.wait ?? 600))
      const found = await page.evaluate(collect)
      const seen = new Set()
      for (const f of found) {
        const bad = f.kind === "font" ? (checkFont(f.value, palette).ok ? null : checkFont(f.value, palette).bad.join(", ")) : (checkColour(f.value, palette).ok ? null : checkColour(f.value, palette))
        if (!bad) continue
        const key = `${f.kind}|${f.prop}|${typeof bad === "string" ? bad : bad.hex}|${f.selector}`
        if (seen.has(key)) continue
        seen.add(key)
        problems.push({ mode, page: p, ...f, detail: typeof bad === "string" ? `font ${bad}` : `${bad.hex} is not a brand hue (nearest ${bad.nearest?.hex ?? "none"}, ${bad.hueGap}° away)` })
      }
    }
  }
  await browser.close()

  console.log(`BrandOS verify: ${base}  (${pages.length} pages × ${modes.join(" and ")})\n`)
  if (!problems.length) {
    console.log("✓ Every colour on screen is a brand colour or a neutral, and every font is a brand font.")
    return 0
  }
  const byPage = {}
  for (const pr of problems) (byPage[`${pr.page} (${pr.mode})`] ??= []).push(pr)
  for (const [k, list] of Object.entries(byPage)) {
    console.log(`✗ ${k}: ${list.length} off-brand`)
    for (const pr of list.slice(0, Number(a.limit ?? 12))) console.log(`   ${pr.prop.padEnd(18)} ${pr.detail}\n     on ${pr.selector}${pr.text ? `  "${pr.text}"` : ""}`)
    if (list.length > Number(a.limit ?? 12)) console.log(`   …and ${list.length - Number(a.limit ?? 12)} more`)
  }
  const out = path.join(app, ".brandos", "verify.json")
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, JSON.stringify(problems, null, 2))
  console.log(`\n${problems.length} problems. Full list: ${path.relative(process.cwd(), out)}`)
  return 1
}

/** Runs in the page: every visible element's colours and fonts. */
function collect() {
  const out = []
  const sel = (el) => {
    const parts = []
    for (let e = el; e && e.nodeType === 1 && parts.length < 4; e = e.parentElement) {
      let s = e.tagName.toLowerCase()
      if (e.id) s += `#${e.id}`
      const cls = [...e.classList].filter((c) => !/^(p-|v-|data-v)/.test(c)).slice(0, 2)
      if (cls.length) s += "." + cls.join(".")
      parts.unshift(s)
      if (e.id) break
    }
    return parts.join(" > ")
  }
  const colourProps = ["color", "background-color", "border-top-color", "border-bottom-color", "outline-color", "fill", "stroke"]
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el)
    if (cs.visibility === "hidden" || cs.display === "none" || el.getClientRects().length === 0) continue
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) continue
    const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    const text = ownText ? el.textContent.trim().slice(0, 30) : ""
    for (const prop of colourProps) {
      if (prop === "color" && !ownText && !(el instanceof SVGElement)) continue
      if (prop.startsWith("border") && parseFloat(cs[prop.replace("color", "width")]) === 0) continue
      if (prop === "outline-color" && (cs.outlineStyle === "none" || parseFloat(cs.outlineWidth) === 0)) continue
      if ((prop === "fill" || prop === "stroke") && !(el instanceof SVGElement)) continue
      const v = cs.getPropertyValue(prop)
      if (!v || v === "none" || v === "transparent" || /rgba\(0, 0, 0, 0\)/.test(v) || v.startsWith("url(")) continue
      out.push({ kind: "colour", prop, value: v, selector: sel(el), text })
    }
    const bg = cs.backgroundImage
    if (bg && bg !== "none") for (const m of bg.matchAll(/(?:rgba?|oklch|oklab|color)\([^)]*\)/g)) out.push({ kind: "colour", prop: "background-image", value: m[0], selector: sel(el), text })
    if (ownText) out.push({ kind: "font", prop: "font-family", value: cs.fontFamily, selector: sel(el), text })
  }
  return out
}

function loadPalette(app, explicit) {
  const tryRead = (p) => {
    try {
      return JSON.parse(fs.readFileSync(p, "utf8"))
    } catch {
      return null
    }
  }
  if (explicit) return tryRead(path.resolve(explicit)) ?? fail(`Could not read ${explicit}`)
  const m = tryRead(path.join(app, ".brandos", "manifest.json"))
  const pf = m && Object.keys(m.files ?? {}).find((f) => /(^|[\\/])palette\.json$/.test(f))
  return (pf && tryRead(path.join(app, pf))) ?? fail(`No palette.json found for ${app}. Run brandos theme and brandos install, or pass --palette brand-out/palette.json.`)
}

function routesFromScan(app) {
  try {
    const s = JSON.parse(fs.readFileSync(path.join(app, ".brandos", "scan.json"), "utf8"))
    const routes = [...new Set(s.entries.map((e) => e.route).filter((r) => typeof r === "string" && !r.includes(":")))]
    return routes.length ? routes.join(",") : null
  } catch {
    return null
  }
}

function manifestDark(app) {
  try {
    return JSON.parse(fs.readFileSync(path.join(app, ".brandos", "manifest.json"), "utf8")).darkSelector ?? null
  } catch {
    return null
  }
}

async function loadPlaywright(app, PKG) {
  for (const from of [app, process.cwd(), PKG]) {
    try {
      const req = createRequire(path.join(from, "package.json"))
      const mod = await import(req.resolve("playwright"))
      return mod.chromium ? mod : mod.default
    } catch {}
  }
  fail("brandos verify needs Playwright. In the brandos folder run: npm install playwright && npx playwright install chromium")
}

function fail(msg) {
  throw new Error(msg)
}
