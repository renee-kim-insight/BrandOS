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
  // Loading: failed requests and script errors mean a page isn't working, whatever it looks like.
  const loadIssues = []
  let current = null
  page.on("response", (r) => {
    if (r.status() >= 400 && current) loadIssues.push({ page: current, detail: `${r.status()} ${r.request().method()} ${short(r.url())}` })
  })
  page.on("requestfailed", (r) => current && loadIssues.push({ page: current, detail: `failed ${r.request ? "" : ""}${short(r.url())} (${r.failure()?.errorText ?? "no response"})` }))
  page.on("pageerror", (e) => current && loadIssues.push({ page: current, detail: `script error: ${String(e.message).slice(0, 140)}` }))
  page.on("console", (m) => m.type() === "error" && current && loadIssues.push({ page: current, detail: `console error: ${m.text().slice(0, 140)}` }))
  const checks = []
  for (const mode of modes) {
    for (const p of pages) {
      const url = new URL(p, base).href
      current = mode === modes[0] ? p : null
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
      if (!a["no-checks"]) {
        for (const c of await page.evaluate(visibility)) checks.push({ mode, page: p, ...c })
        if (mode === modes[0]) for (const c of await hoverCheck(page, Number(a["hover-limit"] ?? 80))) checks.push({ mode, page: p, ...c })
      }
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
  const seenLoad = new Set()
  const loads = loadIssues.filter((l) => !seenLoad.has(l.page + l.detail) && seenLoad.add(l.page + l.detail))
  if (loads.length) {
    console.log(`✗ Loading: ${loads.length} failed requests or errors. Pages may be missing data; fix these first.`)
    for (const l of loads.slice(0, 20)) console.log(`   ${l.page}  ${l.detail}`)
    console.log("")
  } else console.log("✓ Every page loaded without failed requests or script errors.")
  if (!a["no-checks"]) {
    const byKind = {}
    for (const c of checks) (byKind[c.kind] ??= []).push(c)
    const label = { hover: "Clickable but no hover change", clipped: "Content cut off by its container", overflow: "Page scrolls sideways", image: "Broken image", hidden: "Text you can't see", corners: "Broken corners" }
    for (const k of Object.keys(label)) {
      const list = byKind[k] ?? []
      if (!list.length) console.log(`✓ ${label[k]}: none`)
      else {
        console.log(`✗ ${label[k]}: ${list.length}`)
        for (const c of list.slice(0, Number(a.limit ?? 12))) console.log(`   ${c.page} (${c.mode})  ${c.selector}${c.text ? `  "${c.text}"` : ""}${c.detail ? `  ${c.detail}` : ""}`)
        if (list.length > Number(a.limit ?? 12)) console.log(`   …and ${list.length - Number(a.limit ?? 12)} more`)
      }
    }
    console.log("")
  }
  const failing = problems.length + loads.length + (a["no-checks"] ? 0 : checks.length)
  const out = path.join(app, ".brandos", "verify.json")
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, JSON.stringify({ colours: problems, loading: loads, checks }, null, 2))
  if (!problems.length) {
    console.log("✓ Every colour on screen is a brand colour or a neutral, and every font is a brand font.")
    if (failing) console.log(`\n${failing} problems. Full list: ${path.relative(process.cwd(), out)}`)
    return failing ? 1 : 0
  }
  const byPage = {}
  for (const pr of problems) (byPage[`${pr.page} (${pr.mode})`] ??= []).push(pr)
  for (const [k, list] of Object.entries(byPage)) {
    console.log(`✗ ${k}: ${list.length} off-brand`)
    for (const pr of list.slice(0, Number(a.limit ?? 12))) console.log(`   ${pr.prop.padEnd(18)} ${pr.detail}\n     on ${pr.selector}${pr.text ? `  "${pr.text}"` : ""}`)
    if (list.length > Number(a.limit ?? 12)) console.log(`   …and ${list.length - Number(a.limit ?? 12)} more`)
  }
  console.log(`\n${failing} problems. Full list: ${path.relative(process.cwd(), out)}`)
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

const short = (u) => {
  try {
    const x = new URL(u)
    return (x.pathname + x.search).slice(0, 120)
  } catch {
    return String(u).slice(0, 120)
  }
}

/** Runs in the page: things that are on the page but can't be seen or used properly. */
function visibility() {
  const out = []
  const sel = (el) => {
    const parts = []
    for (let e = el; e && e.nodeType === 1 && parts.length < 3; e = e.parentElement) {
      let s = e.tagName.toLowerCase()
      if (e.id) s += `#${e.id}`
      const cls = [...e.classList].filter((c) => !/^(p-|v-|data-v)/.test(c)).slice(0, 2)
      if (cls.length) s += "." + cls.join(".")
      parts.unshift(s)
      if (e.id) break
    }
    return parts.join(" > ")
  }
  const doc = document.documentElement
  if (doc.scrollWidth > window.innerWidth + 1) {
    const wide = [...document.querySelectorAll("body *")].filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1 && e.getClientRects().length).slice(-1)[0]
    out.push({ kind: "overflow", selector: wide ? sel(wide) : "page", detail: `${doc.scrollWidth}px wide in a ${window.innerWidth}px window` })
  }
  for (const img of document.images) if (img.complete && img.naturalWidth === 0 && img.getClientRects().length) out.push({ kind: "image", selector: sel(img), detail: img.getAttribute("src")?.slice(0, 80) ?? "" })
  const clips = (cs) => /hidden|clip/.test(cs.overflowX + cs.overflowY)
  // One style lookup per element, reused for ancestors, so long pages stay quick.
  const styles = new Map()
  const style = (e) => {
    let s = styles.get(e)
    if (!s) styles.set(e, (s = getComputedStyle(e)))
    return s
  }
  // Corners: a pill radius on a big box turns it into an oval, and a square box with a background inside
  // a rounded one pokes its corners out past the curve.
  const painted = (cs) => !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor) || parseFloat(cs.borderTopWidth) > 0
  const radius = (cs, r) => { const v = cs.borderTopLeftRadius; return v.endsWith("%") ? (parseFloat(v) / 100) * Math.min(r.width, r.height) : parseFloat(v) || 0 }
  const corners = (el, cs) => {
    if (el.closest("[data-bos-static]")) return
    const r = el.getBoundingClientRect()
    if (r.width < 24 || r.height < 24 || !painted(cs)) return
    const rad = radius(cs, r)
    if (r.height > 72 && Math.abs(r.width - r.height) > 8 && rad >= Math.min(r.width, r.height) / 2 - 1)
      return out.push({ kind: "corners", selector: sel(el), detail: `pill radius on a ${Math.round(r.width)}x${Math.round(r.height)} box, so it draws as an oval; use --radius-card` })
    if (rad > 2 || /rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor)) return
    for (let p = el.parentElement, n = 0; p && p !== document.body && n < 3; p = p.parentElement, n++) {
      const ps = style(p)
      if (!painted(ps)) continue
      const pr = p.getBoundingClientRect()
      const prad = radius(ps, pr)
      if (prad < 8 || clips(ps)) return
      const inset = prad * 0.3
      const touches = (Math.abs(r.top - pr.top) < inset || Math.abs(r.bottom - pr.bottom) < inset) && (Math.abs(r.left - pr.left) < inset || Math.abs(r.right - pr.right) < inset)
      if (touches) out.push({ kind: "corners", selector: sel(el), detail: `square corners stick out of rounded ${sel(p)}; give it border-radius: inherit or --radius-inner, or no background` })
      return
    }
  }
  const all = [...document.querySelectorAll("body *")].slice(0, 6000)
  for (const el of all) {
    const cs = style(el)
    if (cs.visibility === "hidden" || cs.display === "none" || !el.getClientRects().length) continue
    if (el.closest("details:not([open])") && !el.closest("summary")) continue
    corners(el, cs)
    const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)
    if (!ownText) continue
    const text = el.textContent.trim().slice(0, 40)
    const r = el.getBoundingClientRect()
    // Screen-reader-only text is clipped on purpose.
    if (r.width <= 2 || r.height <= 2 || el.closest(".sr-only, [data-bos-static]")) continue
    // Text cut off inside its own box (ellipsis counts: whole words should show).
    if ((el.scrollWidth > el.clientWidth + 1 && clips(cs) && el.clientWidth > 0) || (el.scrollHeight > el.clientHeight + 2 && clips(cs) && cs.webkitLineClamp === "none" && el.clientHeight > 0 && !/auto|scroll/.test(cs.overflowY)))
      out.push({ kind: "clipped", selector: sel(el), text, detail: cs.textOverflow === "ellipsis" ? "truncated with …" : "" })
    // Text cut off by a rounded or clipping ancestor.
    else
      for (let p = el.parentElement, n = 0; p && p !== document.body && n < 6; p = p.parentElement, n++) {
        const ps = style(p)
        // Inside something that scrolls, being partly out of view is expected.
        if (/auto|scroll/.test(ps.overflowX + ps.overflowY)) break
        if (!clips(ps)) continue
        const pr = p.getBoundingClientRect()
        // Entirely outside (a carousel slide, a closed panel) is hidden on purpose; partly outside is cut off.
        const outside = r.right <= pr.left || r.left >= pr.right || r.bottom <= pr.top || r.top >= pr.bottom
        if (!outside && (r.left < pr.left - 2 || r.right > pr.right + 2 || r.top < pr.top - 2 || r.bottom > pr.bottom + 2)) {
          out.push({ kind: "clipped", selector: sel(el), text, detail: `cut off by ${sel(p)}` })
          break
        }
      }
    // Text drawn in the same colour as what's behind it, or fully transparent.
    if (cs.opacity === "0" || /rgba\(0, 0, 0, 0\)/.test(cs.color)) out.push({ kind: "hidden", selector: sel(el), text, detail: "transparent text" })
  }
  return out
}

/** Hover each clickable thing and check something visibly changes. */
async function hoverCheck(page, limit) {
  const targets = await page.evaluate((limit) => {
    // Content of a closed <details> still reports a size but isn't drawn; only its <summary> is.
    const hiddenInDetails = (e) => { const d = e.closest("details:not([open])"); return !!d && !e.closest("summary") }
    const q = 'a[href], button, [role="button"], [role="tab"], [role="menuitem"], [role="link"], summary, input[type="submit"], input[type="button"], [onclick]'
    const els = [...document.querySelectorAll(q)].filter((e) => {
      const r = e.getBoundingClientRect()
      const cs = getComputedStyle(e)
      return r.width > 4 && r.height > 4 && cs.visibility !== "hidden" && cs.display !== "none" && !e.disabled && e.getAttribute("aria-disabled") !== "true" && !e.closest("[inert], [data-bos-static]") && !hiddenInDetails(e)
    })
    // Skip duplicates of the same component (same classes and text length) so long lists stay quick.
    const seen = new Set()
    const pick = []
    for (const e of els) {
      const key = e.tagName + "|" + e.className + "|" + (e.getAttribute("role") ?? "")
      if (seen.has(key)) continue
      seen.add(key)
      e.setAttribute("data-bos-hover", String(pick.length))
      pick.push({ i: pick.length, text: (e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 30) })
      if (pick.length >= limit) break
    }
    return pick
  }, limit)
  const snap = (i) =>
    page.evaluate((i) => {
      const e = document.querySelector(`[data-bos-hover="${i}"]`)
      if (!e) return null
      const parts = [e, ...e.querySelectorAll("svg, span, div")].slice(0, 6)
      return parts.map((x) => { const s = getComputedStyle(x); return [s.backgroundColor, s.backgroundImage, s.color, s.borderColor, s.boxShadow, s.textDecorationLine, s.transform, s.opacity, s.filter, s.outlineStyle].join("|") }).join("~")
    }, i)
  const out = []
  await page.mouse.move(-20, -20)
  for (const t of targets) {
    try {
      const loc = page.locator(`[data-bos-hover="${t.i}"]`)
      await loc.scrollIntoViewIfNeeded({ timeout: 1500 })
      const before = await snap(t.i)
      await loc.hover({ timeout: 1500, force: true })
      await page.waitForTimeout(220)
      const after = await snap(t.i)
      if (before && before === after) {
        const selector = await page.evaluate((i) => {
          const e = document.querySelector(`[data-bos-hover="${i}"]`)
          const cls = [...e.classList].slice(0, 2)
          return e.tagName.toLowerCase() + (cls.length ? "." + cls.join(".") : "")
        }, t.i)
        out.push({ kind: "hover", selector, text: t.text })
      }
      await page.mouse.move(-20, -20)
    } catch {}
  }
  return out
}
