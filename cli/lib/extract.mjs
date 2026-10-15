// Pull brand evidence out of a PDF, PowerPoint, website or image into:
//   draft.brand.json   best guess, for an agent and a person to confirm
//   extract-report.md  every candidate with counts and where it came from
//   brand-text.txt     the document's text, so the agent can read rules and voice
//   assets/            images and logos found
import fs from "node:fs"
import path from "node:path"
import { unzipSync, strFromU8 } from "fflate"

import { hex, isNeutral, oklch } from "./color.mjs"

const PKG_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..")
const FONT_EXT = /\.(woff2|woff|otf|ttf)$/i

export async function runExtract(a) {
  const input = a._[0]
  if (!input) throw new Error("Give a file or URL: brandos extract brand-guide.pdf")
  const outDir = path.dirname(a.out ?? "brand-extract/draft.brand.json")
  fs.mkdirSync(path.join(outDir, "assets"), { recursive: true })
  const ev = newEvidence(input)

  if (/^https?:\/\//.test(input)) await fromUrl(input, ev, outDir)
  else {
    const ext = path.extname(input).toLowerCase()
    const buf = fs.readFileSync(input)
    if (ext === ".pptx" || ext === ".potx") fromPptx(buf, ev, outDir)
    else if (ext === ".pdf") await fromPdf(buf, ev, outDir)
    else if ([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"].includes(ext)) {
      fs.copyFileSync(input, path.join(outDir, "assets", path.basename(input)))
      ev.assets.push(path.join("assets", path.basename(input)))
      ev.notes.push("Image input: colours and fonts must be read visually by the agent. Open the image and fill in draft.brand.json.")
    } else throw new Error(`Unsupported file type ${ext}. Use .pdf, .pptx, an image, or a URL.`)
  }

  const draft = buildDraft(ev, input)
  fs.writeFileSync(path.join(outDir, "draft.brand.json"), JSON.stringify(draft, null, 2) + "\n")
  fs.writeFileSync(path.join(outDir, "extract-report.md"), report(ev, draft))
  if (ev.text) fs.writeFileSync(path.join(outDir, "brand-text.txt"), ev.text)
  console.log(`✓ Extracted from ${input}`)
  console.log(`  ${ev.colors.size} colours, ${ev.fonts.size} fonts, ${ev.assets.length} images, ${ev.text.length} characters of text`)
  summarise(draft)

  // brand.json goes next to where the command runs (the app's root). An existing one is never overwritten.
  const target = a.brand ?? "brand.json"
  const exists = fs.existsSync(target)
  if (exists && !a.force) {
    console.log(`\n  ${target} already exists, so it was left alone. The new draft is in ${outDir}/draft.brand.json (use --force to replace).`)
    return 0
  }
  const final = { ...draft, $schema: ((r) => (r.startsWith(".") ? r : "./" + r))(path.relative(path.dirname(path.resolve(target)), path.join(PKG_DIR, "brand", "brand.schema.json")).replace(/\\/g, "/")) }
  fs.writeFileSync(target, JSON.stringify(final, null, 2) + "\n")
  console.log(`\n✓ Wrote ${target}. Report: ${outDir}/extract-report.md`)
  if (a["no-theme"]) return 0

  // Straight on to the theme, so the next thing the person sees is their brand on real components.
  const { runTheme } = await import("./run-theme.mjs")
  console.log("")
  const code = await runTheme({ _: [target], out: a["theme-out"] ?? "brand-out" })
  if (code === 0) console.log(`\nNext: node ${path.relative(process.cwd(), path.join(PKG_DIR, "cli", "brandos.mjs"))} preview   (then open http://localhost:4321)`)
  return code
}

function summarise(d) {
  const c = d.colors
  const f = d.fonts.sans
  console.log(`\n  Brand:      ${d.name}`)
  console.log(`  Primary:    ${c.primary}`)
  if (c.secondary) console.log(`  Secondary:  ${c.secondary}`)
  if (c.accents?.length) console.log(`  Accents:    ${c.accents.join(", ")}`)
  if (c.neutral) console.log(`  Neutral:    ${c.neutral}`)
  if (c.danger) console.log(`  Danger:     ${c.danger}`)
  if (c.background) console.log(`  Background: ${c.background}`)
  console.log(`  Font:       ${f.family} (${f.source}${f.files?.length ? `, ${f.files.length} files found` : f.source === "self-hosted" ? `, no font files found, using ${f.fallback} until added` : ""})`)
  if (d.fonts.display) console.log(`  Headings:   ${d.fonts.display.family}`)
}

/* ---------------- evidence ---------------- */

function newEvidence(input) {
  return { input, colors: new Map(), fonts: new Map(), declared: [], assets: [], notes: [], text: "", roles: {}, fontRoles: {} }
}

function addColor(ev, value, source, weight = 1) {
  let c
  try {
    c = oklch(value)
  } catch {
    return
  }
  if (c.alpha < 0.5) return
  const key = hex(c)
  const e = ev.colors.get(key) ?? { hex: key, count: 0, sources: new Set(), neutral: isNeutral(c), l: c.l, first: ev.colors.size }
  e.count += weight
  e.sources.add(source)
  ev.colors.set(key, e)
}

function addFont(ev, family, source, weight = 1) {
  const f = family.replace(/["']/g, "").split(",")[0].trim()
  if (!f || /^(inherit|initial|sans-serif|serif|monospace|system-ui|-apple-system|ui-sans-serif|var\()/i.test(f)) return
  const clean = f.replace(/^[A-Z]{6}\+/, "").replace(/([-, ]+(Regular|Bold|Medium|Light|Italic|Oblique|Semi[- ]?Bold|Demi[- ]?Bold|Demi|Black|Book|Roman|Heavy|Thin|Extra[- ]?Bold|Extra[- ]?Light|Ultra[- ]?Light|Hairline))+$/i, "").trim()
  const e = ev.fonts.get(clean) ?? { family: clean, count: 0, sources: new Set() }
  e.count += weight
  e.sources.add(source)
  ev.fonts.set(clean, e)
}

/** Colour codes written in the text itself: hex, RGB, CMYK, Pantone. Brand guides list these explicitly. */
function scanText(ev, text, source) {
  for (const m of text.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)) addColor(ev, `#${m[1]}`, `${source} (written hex)`, 10)
  for (const m of text.matchAll(/\bR\s*:?\s*(\d{1,3})\s*[,/ ]\s*G\s*:?\s*(\d{1,3})\s*[,/ ]\s*B\s*:?\s*(\d{1,3})/gi))
    addColor(ev, `rgb(${m[1]},${m[2]},${m[3]})`, `${source} (written RGB)`, 10)
  for (const m of text.matchAll(/\bC\s*:?\s*(\d{1,3})\s*[,/ ]?\s*M\s*:?\s*(\d{1,3})\s*[,/ ]?\s*Y\s*:?\s*(\d{1,3})\s*[,/ ]?\s*K\s*:?\s*(\d{1,3})/gi)) {
    const [c, mm, y, k] = [m[1], m[2], m[3], m[4]].map((v) => Number(v) / 100)
    const r = 255 * (1 - c) * (1 - k), g = 255 * (1 - mm) * (1 - k), b = 255 * (1 - y) * (1 - k)
    addColor(ev, `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`, `${source} (CMYK ${m[1]} ${m[2]} ${m[3]} ${m[4]}, converted)`, 6)
  }
  for (const m of text.matchAll(/\b(PMS|Pantone)\s*([0-9]{3,4}\s*[A-Z]{0,2}|[A-Za-z]+\s*[A-Z]?)\b/g))
    ev.declared.push(`Pantone mentioned: "${m[0].trim()}" (convert using the guide's own hex or RGB if listed)`)
  for (const m of text.matchAll(/(typeface|font family|font|primary font|secondary font|headline font|heading font|display font|body font|text font)s?\s*[:\-–]\s*([A-Z][A-Za-z0-9 ]{2,40})/gi)) {
    const family = cleanFontName(m[2])
    if (!family) continue
    ev.declared.push(`Font named in text: "${family}" (${m[1].toLowerCase()})`)
    addFont(ev, family, "named in text", 15)
    const role = /headline|heading|display/i.test(m[1]) ? "display" : /body|text|primary font/i.test(m[1]) ? "sans" : null
    if (role && !ev.fontRoles[role]) ev.fontRoles[role] = family
  }
  // Colour roles the guide states in words, e.g. "Primary colour: Fjord #0E5A6B" or "Fjord · Primary  HEX #0E5A6B".
  for (const m of text.matchAll(/#([0-9a-f]{6})\b/gi)) {
    const before = text.slice(Math.max(0, m.index - 60), m.index).toLowerCase()
    // Only the words since the previous colour code count, so one swatch's label never leaks into the next.
    const own = before.split(/#[0-9a-f]{3,6}\b|\brgb\b/).pop()
    const role = /\bsecondary\b/.test(own) ? "secondary" : /\bprimary\b/.test(own) ? "primary"
      : /\b(error|errors|alert|alerts|danger|destructive)\b/.test(own) ? "danger" : /\baccents?\b/.test(own) ? "accent"
      : /\b(neutral|text colou?r|body text)\b/.test(own) ? "neutral" : /\bbackgrounds?\b/.test(own) ? "background" : null
    // "Signal #C2412D is reserved for errors": the role can also come right after the code.
    const after = text.slice(m.index + 7, m.index + 70).toLowerCase().split(/#[0-9a-f]{3,6}\b/)[0]
    const roleAfter = !role && /\b(error|errors|alert|alerts|danger|destructive)\b/.test(after) ? "danger" : null
    if (!role && !roleAfter) continue
    const hexv = hex(`#${m[1]}`)
    const list = (ev.roles[role ?? roleAfter] ??= [])
    if (!list.includes(hexv)) list.push(hexv)
  }
}

// "Space Grotesk Space Grotesk SemiBold for headings" -> "Space Grotesk"
function cleanFontName(raw) {
  const words = raw.trim().split(/[.,;\n]/)[0].split(/\s+/)
  const out = []
  for (const w of words) {
    if (out.length && (w === out[0] || /^(use|used|for|and|in|on|is|are|with|regular|medium|bold|semibold|light|italic|black|book|thin)$/i.test(w))) break
    out.push(w)
    if (out.length === 3) break
  }
  return out.join(" ")
}

/* ---------------- PowerPoint ---------------- */

function fromPptx(buf, ev, outDir) {
  const files = unzipSync(new Uint8Array(buf))
  const names = Object.keys(files)
  for (const n of names.filter((n) => /^ppt\/theme\/theme\d+\.xml$/.test(n))) {
    const xml = strFromU8(files[n])
    const scheme = xml.match(/<a:clrScheme[^>]*name="([^"]*)"/)?.[1]
    const major0 = xml.match(/<a:majorFont>\s*<a:latin typeface="([^"]+)"/)?.[1] ?? ""
    // Stock Office themes say nothing about the brand: count them lightly.
    const stock = /^(Office|Office Theme|Office 2007 - 2010|Office 2013 - 2022)$/i.test(scheme ?? "") || /^(Calibri|Calibri Light|Aptos|Aptos Display)$/i.test(major0)
    if (stock) ev.notes.push(`The deck uses a stock Office theme ("${scheme}"). Its theme colours and fonts are probably not the brand's; trust colours and fonts used on the slides instead.`)
    const tw = stock ? 0.15 : 1
    for (const slot of ["dk1", "lt1", "dk2", "lt2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6"]) {
      const m = xml.match(new RegExp(`<a:${slot}>[\\s\\S]*?(?:srgbClr val="([0-9A-Fa-f]{6})"|lastClr="([0-9A-Fa-f]{6})")`))
      const v = m?.[1] ?? m?.[2]
      if (v) {
        addColor(ev, `#${v}`, `PowerPoint theme ${slot}${stock ? " (stock)" : ""}`, (slot.startsWith("accent") ? 8 : 2) * tw)
        ev.declared.push(`Theme colour ${slot}${scheme ? ` (${scheme})` : ""}: #${v.toUpperCase()}`)
      }
    }
    const major = xml.match(/<a:majorFont>\s*<a:latin typeface="([^"]+)"/)?.[1]
    const minor = xml.match(/<a:minorFont>\s*<a:latin typeface="([^"]+)"/)?.[1]
    if (major) {
      addFont(ev, major, `PowerPoint theme headings${stock ? " (stock)" : ""}`, 10 * tw)
      ev.declared.push(`Heading font (theme): ${major}`)
    }
    if (minor) {
      addFont(ev, minor, `PowerPoint theme body${stock ? " (stock)" : ""}`, 12 * tw)
      ev.declared.push(`Body font (theme): ${minor}`)
    }
  }
  let text = ""
  for (const n of names.filter((n) => /^ppt\/(slides|slideMasters|slideLayouts)\/[^/]+\.xml$/.test(n)).sort(natural)) {
    const xml = strFromU8(files[n])
    for (const m of xml.matchAll(/srgbClr val="([0-9A-Fa-f]{6})"/g)) addColor(ev, `#${m[1]}`, "slides (used)", 1)
    for (const m of xml.matchAll(/typeface="([^"+][^"]*)"/g)) addFont(ev, m[1], "slides (used)", 1)
    if (n.startsWith("ppt/slides/")) {
      const t = [...xml.matchAll(/<a:t>([^<]*)<\/a:t>/g)].map((m) => m[1]).join(" ")
      if (t.trim()) text += `\n\n--- ${path.basename(n, ".xml")} ---\n${decode(t)}`
    }
  }
  ev.text = text.trim()
  scanText(ev, ev.text, "slide text")
  for (const n of names.filter((n) => /^ppt\/media\//.test(n))) {
    const data = files[n]
    if (data.length > 2_000_000) continue
    const file = path.join("assets", path.basename(n))
    fs.writeFileSync(path.join(outDir, file), data)
    ev.assets.push(file)
  }
  if (ev.assets.length) ev.notes.push("Logos are usually among the extracted images. Ask for an SVG version for the final brand.json.")
}

/* ---------------- PDF ---------------- */

async function fromPdf(buf, ev, outDir) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs")
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buf), isEvalSupported: false, useSystemFonts: false, verbosity: 0 }).promise
  const pages = Math.min(doc.numPages, 60)
  const OPS = pdfjs.OPS
  let text = ""
  for (let p = 1; p <= pages; p++) {
    const page = await doc.getPage(p)
    const tc = await page.getTextContent()
    const pageText = tc.items.map((i) => ("str" in i ? i.str : "")).join(" ").replace(/\s+/g, " ").trim()
    if (pageText) text += `\n\n--- page ${p} ---\n${pageText}`
    for (const st of Object.values(tc.styles ?? {})) if (st.fontFamily) addFont(ev, st.fontFamily, `PDF page ${p}`, 1)
    const ops = await page.getOperatorList()
    const seen = new Set() // count each colour once per page, so body-text black can't drown out brand colours
    const fontIds = new Set()
    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i]
      if (fn === OPS.setFillRGBColor || fn === OPS.setStrokeRGBColor) {
        const v = ops.argsArray[i]
        const col = typeof v?.[0] === "string" ? v[0] : Array.isArray(v) && v.length >= 3 ? `rgb(${v[0]},${v[1]},${v[2]})` : null
        if (col && !seen.has(col)) {
          seen.add(col)
          addColor(ev, col, `PDF page ${p} (drawn)`, 1)
        }
      }
      if (fn === OPS.setFont) fontIds.add(ops.argsArray[i]?.[0])
    }
    // Embedded font names (e.g. "ABCDEF+GreycliffCF-Bold") are resolved once the operator list is built.
    for (const id of fontIds) {
      try {
        const f = page.commonObjs.has(id) ? page.commonObjs.get(id) : null
        if (f?.name) addFont(ev, f.name, `PDF page ${p} (embedded)`, 1)
      } catch {}
    }
  }
  // Embedded font names from the raw file catch fonts pdf.js does not expose (works when font dicts are uncompressed).
  const raw = Buffer.from(buf).toString("latin1")
  for (const m of raw.matchAll(/\/BaseFont\s*\/([A-Za-z0-9+\-_,]+)/g)) {
    const name = m[1].replace(/^[A-Z]{6}\+/, "")
    if (!/^(Helvetica|Times|Courier|Symbol|ZapfDingbats|DejaVu|Arial|LiberationSans)/i.test(name)) addFont(ev, name, "PDF embedded font", 3)
  }
  ev.text = text.trim()
  scanText(ev, ev.text, "PDF text")
  if (doc.numPages > pages) ev.notes.push(`Only the first ${pages} of ${doc.numPages} pages were scanned.`)
  ev.notes.push("PDF images are not extracted. Ask for logo files (SVG preferred) separately.")
}

/* ---------------- Website ---------------- */

async function fromUrl(url, ev, outDir) {
  const get = async (u) => {
    const r = await fetch(u, { headers: { "user-agent": "Mozilla/5.0 BrandOS/0.1" }, redirect: "follow" })
    if (!r.ok) throw new Error(`${u} returned ${r.status}`)
    return r
  }
  const html = await (await get(url)).text()
  const base = new URL(url)
  const abs = (h) => {
    try {
      return new URL(h, base).href
    } catch {
      return null
    }
  }
  const sheets = []
  for (const m of html.matchAll(/<link[^>]+rel=["']?stylesheet["']?[^>]*>/gi)) {
    const href = m[0].match(/href=["']([^"']+)["']/)?.[1]
    if (href) sheets.push(abs(href))
  }
  let cssText = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join("\n")
  for (const s of sheets.filter(Boolean).slice(0, 10)) {
    if (/fonts\.googleapis\.com/.test(s)) {
      for (const f of s.matchAll(/family=([^&:]+)/g)) addFont(ev, decodeURIComponent(f[1].replace(/\+/g, " ")), "Google Fonts link", 6)
      continue
    }
    try {
      cssText += "\n" + (await (await get(s)).text())
    } catch (e) {
      ev.notes.push(`Could not load stylesheet ${s}: ${e.message}`)
    }
  }
  // CSS custom properties are usually the brand's own tokens: weight them highest.
  for (const m of cssText.matchAll(/--([\w-]*(?:color|brand|primary|accent|secondary)[\w-]*)\s*:\s*([^;}{]+)/gi)) {
    addColor(ev, m[2].trim(), `CSS variable --${m[1]}`, 6)
    ev.declared.push(`CSS variable --${m[1]}: ${m[2].trim()}`)
  }
  for (const m of cssText.matchAll(/(?:^|[;{\s])(?:background(?:-color)?|color|border(?:-color)?|fill|stroke)\s*:\s*([^;}{]+)/gi))
    for (const c of m[1].match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)/gi) ?? []) addColor(ev, c, "site CSS", 1)
  for (const m of cssText.matchAll(/font-family\s*:\s*([^;}{]+)/gi)) addFont(ev, m[1], "site CSS", 2)
  for (const m of cssText.matchAll(/@font-face\s*{[^}]*font-family\s*:\s*([^;}]+)/gi)) addFont(ev, m[1], "@font-face (self-hosted)", 4)
  const theme = html.match(/<meta[^>]+name=["']theme-color["'][^>]*content=["']([^"']+)/i)?.[1]
  if (theme) {
    addColor(ev, theme, "meta theme-color", 8)
    ev.declared.push(`meta theme-color: ${theme}`)
  }
  // Logo candidates
  const logos = new Set()
  for (const m of html.matchAll(/<img[^>]+>/gi)) {
    const tag = m[0]
    if (/logo|brand/i.test(tag)) {
      const src = tag.match(/src=["']([^"']+)["']/)?.[1]
      if (src) logos.add(abs(src))
    }
  }
  for (const m of html.matchAll(/<link[^>]+rel=["'][^"']*(icon|apple-touch-icon|mask-icon)[^"']*["'][^>]*>/gi)) {
    const href = m[0].match(/href=["']([^"']+)["']/)?.[1]
    if (href) logos.add(abs(href))
  }
  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)/i)?.[1]
  if (og) logos.add(abs(og))
  const headerSvg = html.match(/<header[\s\S]*?(<svg[\s\S]*?<\/svg>)/i)?.[1]
  if (headerSvg) {
    fs.writeFileSync(path.join(outDir, "assets", "header-logo.svg"), headerSvg)
    ev.assets.push("assets/header-logo.svg")
  }
  let i = 0
  for (const l of [...logos].filter(Boolean).slice(0, 8)) {
    try {
      const r = await get(l)
      const ext = path.extname(new URL(l).pathname) || ".png"
      const file = path.join("assets", `logo-${++i}${ext}`)
      fs.writeFileSync(path.join(outDir, file), Buffer.from(await r.arrayBuffer()))
      ev.assets.push(`${file}  (from ${l})`)
    } catch (e) {
      ev.notes.push(`Could not download ${l}: ${e.message}`)
    }
  }
  ev.text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 20000)
  scanText(ev, ev.text, "page text")
  ev.notes.push("Website colours show what is used, not what is official. Prefer a brand guide when one exists.")
}

/* ---------------- draft + report ---------------- */

function ranked(ev) {
  // Merge near-identical colours, then rank by weighted count.
  const list = [...ev.colors.values()].sort((a, b) => b.count - a.count)
  const merged = []
  for (const c of list) {
    const twin = merged.find((m) => dist(m.hex, c.hex) < 0.025)
    if (twin) {
      twin.count += c.count
      c.sources.forEach((s) => twin.sources.add(s))
    } else merged.push({ ...c, sources: new Set(c.sources) })
    if (twin) twin.first = Math.min(twin.first, c.first)
  }
  return merged.sort((a, b) => b.count - a.count)
}

function dist(a, b) {
  const x = oklch(a), y = oklch(b)
  const dh = Math.min(Math.abs(x.h - y.h), 360 - Math.abs(x.h - y.h)) / 360
  return Math.hypot(x.l - y.l, x.c - y.c, dh * (x.c + y.c))
}

// Where a font comes from decides how the theme loads it. Only claim Google Fonts when we know it is there.
const GOOGLE = /^(Inter|Roboto|Open Sans|Lato|Montserrat|Poppins|Nunito|Nunito Sans|Raleway|Work Sans|DM Sans|Manrope|Source Sans 3|Source Sans Pro|Noto Sans|IBM Plex Sans|IBM Plex Mono|Geist|Geist Mono|Plus Jakarta Sans|Outfit|Figtree|Lexend|Space Grotesk|Playfair Display|Merriweather|Lora|Rubik|Karla|Mulish|Barlow|Oswald|PT Sans|Fira Sans|Fira Code|JetBrains Mono|Archivo|Sora|Urbanist|Instrument Sans|Instrument Serif|Libre Franklin|Libre Baskerville|Cormorant Garamond|EB Garamond|Crimson Pro|Quicksand|Josefin Sans|Cabin|Heebo|Hind|Titillium Web|Ubuntu|Bebas Neue|Anton|Space Mono)$/i
const SYSTEM = /^(Arial|Helvetica|Helvetica Neue|Calibri|Cambria|Segoe UI|Georgia|Times|Times New Roman|Verdana|Tahoma|Trebuchet MS|Courier New|SF Pro|San Francisco|system-ui|Aptos)/i
function fontEntry(f) {
  const google = [...(f.sources ?? [])].some((s) => /Google Fonts link/.test(s)) || GOOGLE.test(f.family)
  if (google) return { family: f.family, source: "google" }
  if (SYSTEM.test(f.family)) return { family: f.family, source: "system" }
  // Licensed or unknown face: the client must supply web font files. Fall back to a close free face until then.
  return { family: f.family, source: "self-hosted", files: [], fallback: "Geist" }
}

function buildDraft(ev, input) {
  const colors = ranked(ev)
  // A primary is saturated and mid-lightness; pale tints and near-blacks belong elsewhere.
  // Colours the source writes out (hex, RGB, theme slots) are trusted more than drawn ones.
  const trust = (c) => ([...c.sources].some((s) => /written|variable|theme-color|PowerPoint theme accent\d$/.test(s)) ? 2 : 1)
  const score = (c) => c.count * trust(c) * (1 + oklch(c.hex).c * 1.5)
  const brandish = colors
    .filter((c) => !c.neutral && c.l > 0.3 && c.l < 0.8 && oklch(c.hex).c >= 0.08)
    .sort((a, b) => {
      const sa = score(a), sb = score(b)
      // Near-ties go to whichever the source mentions first: guides usually lead with the primary.
      return Math.abs(sa - sb) / Math.max(sa, sb) < 0.15 ? a.first - b.first : sb - sa
    })
  const fonts = [...ev.fonts.values()].sort((a, b) => b.count - a.count)
  const stated = (r) => ev.roles[r]?.[0]
  // What the guide calls primary wins over what appears most, even if it is dark or muted.
  const primary = stated("primary") ?? brandish[0]?.hex ?? colors[0]?.hex ?? "#17131C"
  const fontOf = (family) => fonts.find((f) => f.family.toLowerCase() === family?.toLowerCase())
  const draft = {
    $schema: "../brandos/brand/brand.schema.json",
    name: guessName(input),
    slug: "",
    version: "1.0.0",
    sources: [{ type: /^https?:/.test(ev.input) ? "url" : path.extname(ev.input).slice(1).replace("potx", "pptx"), ref: ev.input, note: "Extracted automatically. Confirm before use." }],
    colors: { primary },
    fonts: { sans: fontEntry(fontOf(ev.fontRoles.sans) ?? fonts.find((f) => f.family !== ev.fontRoles.display) ?? fonts[0] ?? { family: "Geist", sources: new Set(["Google Fonts link"]) }) },
    radius: "rounded",
  }
  draft.slug = draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "brand"
  const notStockOnly = (c) => ![...c.sources].every((s) => /\(stock\)/.test(s))
  // Shades of a colour already chosen (a darker magenta next to the magenta) are tints, not separate brand colours.
  const picked = [primary]
  const isShadeOfPicked = (h) => picked.some((p) => hueGap(p, h) < 22 && Math.abs(oklch(p).l - oklch(h).l) < 0.2)
  const isRed = (h) => { const o = oklch(h); return o.c >= 0.15 && o.h >= 5 && o.h <= 40 }
  const statedHexes = new Set(Object.values(ev.roles).flat())
  const rest = brandish.filter((c) => c.hex !== primary && notStockOnly(c) && !(statedHexes.has(c.hex) && !(ev.roles.secondary ?? []).concat(ev.roles.accent ?? []).includes(c.hex)))
  const sec = stated("secondary") ?? rest.find((c) => !isShadeOfPicked(c.hex) && !isRed(c.hex))?.hex
  if (sec) { draft.colors.secondary = sec; picked.push(sec) }
  const accents = [...(ev.roles.accent ?? [])].filter((h) => h !== primary && h !== sec).slice(0, 4)
  accents.forEach((h) => picked.push(h))
  if (!ev.roles.accent)
    for (const c of rest) {
      if (accents.length >= 3 || c.hex === sec || isRed(c.hex) || isShadeOfPicked(c.hex)) continue
      accents.push(c.hex)
      picked.push(c.hex)
    }
  if (accents.length) draft.colors.accents = accents
  // Danger: what the guide reserves for errors, else the brand's own red if it isn't the primary.
  const red = stated("danger") ?? brandish.find((c) => c.hex !== primary && isRed(c.hex) && hueGap(primary, c.hex) > 12)?.hex
  if (red) draft.colors.danger = red
  // Neutral: the brand's own dark grey (warm or cool), used to tint every grey in the UI.
  const grey = stated("neutral") ?? colors.find((c) => { const o = oklch(c.hex); return o.c < 0.05 && o.l > 0.2 && o.l < 0.6 && notStockOnly(c) })?.hex
  if (grey) draft.colors.neutral = grey
  const bgStated = (ev.roles.background ?? []).find((h) => oklch(h).l > 0.9)
  if (bgStated) draft.colors.background = bgStated
  // Only suggest a display face when the source clearly names a second font for headings.
  const statedDisplay = fontOf(ev.fontRoles.display)
  const second = statedDisplay ?? fonts.find((f) => f.family !== draft.fonts.sans.family)
  if (second && second.family !== draft.fonts.sans.family && (statedDisplay || [...second.sources].some((s) => /named in text|headings(?! \(stock\))/.test(s))) && !/^(Arial|Helvetica|Calibri|Times)/i.test(second.family))
    draft.fonts.display = fontEntry(second)
  for (const f of Object.values(draft.fonts)) if (f.source === "self-hosted") f.files = findFontFiles(f.family, input)
  return draft
}

const hueGap = (a, b) => { const d = Math.abs(oklch(a).h - oklch(b).h); return Math.min(d, 360 - d) }

// "Acme Brand Guidelines.pptx" -> "Acme"; "https://www.northwind.com" -> "Northwind"
function guessName(input) {
  if (/^https?:/.test(input)) {
    const host = new URL(input).hostname.replace(/^www\./, "").split(".")[0]
    return host.charAt(0).toUpperCase() + host.slice(1)
  }
  const words = path.basename(input, path.extname(input)).replace(/[_-]+/g, " ").split(/\s+/)
  const stop = /^(brand|branding|design|style|visual|identity|guide|guides|guideline|guidelines|presentation|system|book|manual|template|deck|master|corporate|v\d.*|\d{4}|final)$/i
  const name = []
  for (const w of words) { if (stop.test(w)) break; name.push(w) }
  const n = name.join(" ") || words[0] || "Brand"
  return n === n.toLowerCase() ? n.replace(/\b\w/g, (c) => c.toUpperCase()) : n
}

// Licensed fonts: look for the files next to the source (brand-source/, brand-source/fonts/ and so on).
function findFontFiles(family, input) {
  if (/^https?:/.test(input)) return []
  const key = family.toLowerCase().replace(/[^a-z0-9]/g, "")
  const roots = [...new Set([path.dirname(input), "brand-source", "fonts"])].filter((d) => fs.existsSync(d))
  const found = []
  const walk = (dir, depth) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory() && depth < 3 && e.name !== "node_modules") walk(p, depth + 1)
      else if (FONT_EXT.test(e.name) && e.name.toLowerCase().replace(/[^a-z0-9]/g, "").startsWith(key)) found.push(p)
    }
  }
  roots.forEach((r) => walk(r, 0))
  // One format per style: prefer woff2, then woff, otf, ttf.
  const rank = { ".woff2": 0, ".woff": 1, ".otf": 2, ".ttf": 3 }
  const best = new Map()
  for (const f of [...new Set(found.map((f) => path.normalize(f)))]) {
    const style = path.basename(f, path.extname(f)).toLowerCase()
    const cur = best.get(style)
    if (!cur || rank[path.extname(f).toLowerCase()] < rank[path.extname(cur).toLowerCase()]) best.set(style, f)
  }
  return [...best.values()].sort(natural).map((f) => f.replace(/\\/g, "/"))
}

function report(ev, draft) {
  const colors = ranked(ev)
  const fonts = [...ev.fonts.values()].sort((a, b) => b.count - a.count)
  const L = [`# Brand extraction report`, ``, `Source: ${ev.input}`, ``, `The draft is a best guess. The same values were written to brand.json. A person confirms them by looking at the preview; edit brand.json and re-run \`brandos theme\` to change anything.`, ``]
  if (ev.declared.length) {
    L.push(`## Stated in the source`, ``)
    for (const d of [...new Set(ev.declared)].slice(0, 40)) L.push(`- ${d}`)
    L.push(``)
  }
  L.push(`## Colour candidates`, ``, `Weighted by how they appear: written colour codes and theme slots count most, drawn shapes least.`, ``, `| Colour | Score | Neutral | Seen in |`, `|---|---|---|---|`)
  for (const c of colors.slice(0, 24)) L.push(`| \`${c.hex}\` | ${Math.round(c.count)} | ${c.neutral ? "yes" : ""} | ${[...c.sources].slice(0, 3).join("; ")} |`)
  L.push(``, `## Font candidates`, ``, `| Font | Score | Seen in |`, `|---|---|---|`)
  for (const f of fonts.slice(0, 12)) L.push(`| ${f.family} | ${Math.round(f.count)} | ${[...f.sources].slice(0, 3).join("; ")} |`)
  if (ev.assets.length) {
    L.push(``, `## Images and logos found`, ``)
    for (const a of ev.assets.slice(0, 40)) L.push(`- ${a}`)
  }
  if (ev.notes.length) {
    L.push(``, `## Notes`, ``)
    for (const n of ev.notes) L.push(`- ${n}`)
  }
  L.push(``, `## Draft`, ``, "```json", JSON.stringify(draft, null, 2), "```", ``)
  return L.join("\n")
}

const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true })
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'")
