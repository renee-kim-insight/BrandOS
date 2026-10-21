// brandos studio: a local dashboard that turns brand material into a brand pack.
// Everything runs on this computer: files never leave it, and no AI is used. People check and fix the
// result by hand, with a live preview and the contrast checks, then export the pack.
import fs from "node:fs"
import http from "node:http"
import path from "node:path"

import { extractDraft, findFontFiles } from "./extract.mjs"
import { FONT_EXT, fontFamiliesIn, fontEntry, standIn, classify } from "./fontfiles.mjs"
import { buildPack, previewHtml } from "./pack.mjs"
import { generateTheme, themeCss, fontsCss, fontsHtml } from "./theme.mjs"
import { validateBrand } from "./validate.mjs"
import { oklch } from "./color.mjs"

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".woff": "font/woff", ".otf": "font/otf", ".ttf": "font/ttf", ".zip": "application/zip", ".md": "text/markdown; charset=utf-8" }

export async function studio(a, PKG) {
  const root = path.resolve(a.dir ?? "brand-studio")
  fs.mkdirSync(root, { recursive: true })
  // Brand material and licensed fonts stay out of git.
  fs.writeFileSync(path.join(root, ".gitignore"), "*\n")
  const port = Number(a.port ?? 4400)
  const ui = path.join(PKG, "cli", "studio", "index.html")
  const ws = (id) => {
    if (!/^[a-z0-9-]+$/.test(id ?? "")) throw new Error("Unknown project")
    return path.join(root, id)
  }

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", "http://x")
    const send = (code, body, type = "application/json") => {
      res.writeHead(code, { "content-type": type, "cache-control": "no-store" })
      res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body))
    }
    try {
      if (req.method === "GET" && url.pathname === "/") return send(200, fs.readFileSync(ui), TYPES[".html"])
      if (req.method === "GET" && url.pathname === "/api/projects") return send(200, listProjects(root))
      if (req.method === "GET" && url.pathname.startsWith("/preview/")) {
        const id = url.pathname.split("/")[2]
        const brand = JSON.parse(fs.readFileSync(path.join(ws(id), "brand.json"), "utf8"))
        const theme = generateTheme(brand)
        return send(200, previewHtml({ embed: url.searchParams.has("embed"), brand, themeCss: themeCss(brand, theme), fontsCss: fontsCss(brand), fontsHtml: fontsHtml(brand), uiCss: fs.readFileSync(path.join(PKG, "kits", "react", "src", "styles", "brandos-ui.css"), "utf8"), fontBase: `/fonts/${id}/` }), TYPES[".html"])
      }
      if (req.method === "GET" && url.pathname.startsWith("/fonts/")) {
        // Font files the brand points at, served by name for the preview.
        const [, , id, , file] = url.pathname.split("/")
        const brand = JSON.parse(fs.readFileSync(path.join(ws(id), "brand.json"), "utf8"))
        const all = Object.values(brand.fonts).flatMap((f) => f?.files ?? [])
        const hit = all.find((p) => path.basename(p) === decodeURIComponent(file))
        if (!hit) return send(404, "Not found", "text/plain")
        return send(200, fs.readFileSync(path.resolve(ws(id), hit)), TYPES[path.extname(hit).toLowerCase()] ?? "application/octet-stream")
      }
      if (req.method === "GET" && url.pathname.startsWith("/files/")) {
        const [, , id, ...rest] = url.pathname.split("/")
        const file = path.join(ws(id), ...rest.map(decodeURIComponent))
        if (!file.startsWith(ws(id) + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return send(404, "Not found", "text/plain")
        res.writeHead(200, { "content-type": TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream", "content-disposition": file.endsWith(".zip") ? `attachment; filename="${path.basename(file)}"` : "inline" })
        return res.end(fs.readFileSync(file))
      }
      if (req.method !== "POST") return send(404, { error: "Not found" })

      if (url.pathname === "/api/upload") {
        const dir = path.join(ws(url.searchParams.get("id")), "sources")
        const name = path.basename(url.searchParams.get("name") ?? "file").replace(/[^\w.\- ()]+/g, "_")
        const dest = FONT_EXT.test(name) ? path.join(dir, "fonts", name) : path.join(dir, name)
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.writeFileSync(dest, await body(req))
        return send(200, sources(ws(url.searchParams.get("id"))))
      }
      const data = JSON.parse((await body(req)).toString("utf8") || "{}")
      if (url.pathname === "/api/new") {
        const id = `${(data.name || "brand").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || "brand"}-${Date.now().toString(36)}`
        fs.mkdirSync(path.join(root, id, "sources"), { recursive: true })
        return send(200, { id })
      }
      if (url.pathname === "/api/open") {
        const dir = ws(data.id)
        const brand = fs.existsSync(path.join(dir, "brand.json")) ? JSON.parse(fs.readFileSync(path.join(dir, "brand.json"), "utf8")) : null
        const state = fs.existsSync(path.join(dir, "state.json")) ? JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8")) : {}
        return send(200, { ...state, brand, sources: sources(dir) })
      }
      if (url.pathname === "/api/remove") {
        const dir = path.join(ws(data.id), "sources")
        const file = path.join(dir, data.name)
        if (file.startsWith(dir + path.sep)) fs.rmSync(file, { force: true })
        return send(200, sources(ws(data.id)))
      }
      if (url.pathname === "/api/read") return send(200, await readAll(ws(data.id), data.urls ?? []))
      if (url.pathname === "/api/fonts") return send(200, { families: fontFamilies(path.join(ws(data.id), "sources")) })
      if (url.pathname === "/api/check") {
        const dir = ws(data.id)
        const brand = clean(data.brand)
        attachFonts(brand, path.join(dir, "sources"), true)
        const errors = validateBrand(brand)
        if (errors.length) return send(200, { ok: false, errors })
        fs.writeFileSync(path.join(dir, "brand.json"), JSON.stringify(brand, null, 2) + "\n")
        const theme = generateTheme(brand)
        const fails = theme.audit.checks.filter((c) => !c.pass)
        return send(200, { ok: !fails.length, checks: theme.audit.checks.length, fails, changes: theme.changes, errors: [], fonts: brand.fonts })
      }
      if (url.pathname === "/api/pack") {
        const dir = ws(data.id)
        const brand = clean(data.brand)
        attachFonts(brand, path.join(dir, "sources"), true)
        const errors = validateBrand(brand)
        if (errors.length) return send(200, { ok: false, errors })
        fs.writeFileSync(path.join(dir, "brand.json"), JSON.stringify(brand, null, 2) + "\n")
        const { zip, dir: packDir, name } = await buildPack(path.join(dir, "brand.json"), { out: path.join(dir, "packs"), quiet: true })
        const licensed = Object.values(brand.fonts).some((f) => f?.source === "self-hosted" && f.files?.length)
        const fonts = Object.entries(brand.fonts).filter(([, f]) => f).map(([k, f]) => ({ role: { sans: "body", display: "headings", mono: "code" }[k] ?? k, family: f.family, source: f.source, files: f.files?.length ?? 0, fallback: f.fallback }))
        return send(200, { ok: true, fonts, name, zip: `/files/${data.id}/packs/${path.basename(zip)}`, preview: `/files/${data.id}/packs/${name}/preview.html`, rules: `/files/${data.id}/packs/${name}/brand-rules.md`, folder: packDir, zipPath: zip, licensed })
      }
      return send(404, { error: "Not found" })
    } catch (e) {
      return send(500, { error: e.message })
    }
  })
  await new Promise((resolve, reject) => server.listen(port, "127.0.0.1", resolve).on("error", reject))
  console.log(`✓ BrandOS studio is running at http://localhost:${port}`)
  console.log(`  Projects are saved in ${path.relative(process.cwd(), root) || "."}/ (kept out of git). Press Ctrl+C to stop.`)
}

function body(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on("data", (c) => {
      size += c.length
      if (size > 200 * 1024 * 1024) reject(new Error("File is larger than 200 MB"))
      chunks.push(c)
    })
    req.on("end", () => resolve(Buffer.concat(chunks)))
    req.on("error", reject)
  })
}

function sources(dir) {
  const src = path.join(dir, "sources")
  if (!fs.existsSync(src)) return []
  const out = []
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (e.isFile()) out.push({ name: e.name, kind: kindOf(e.name), size: fs.statSync(path.join(src, e.name)).size })
    if (e.isDirectory() && e.name === "fonts") for (const f of fs.readdirSync(path.join(src, "fonts"))) out.push({ name: `fonts/${f}`, kind: "font", size: fs.statSync(path.join(src, "fonts", f)).size })
  }
  return out
}

function kindOf(name) {
  if (/\.(pdf)$/i.test(name)) return "guide"
  if (/\.(pptx|potx)$/i.test(name)) return "deck"
  if (/\.(png|jpe?g|webp|gif|svg)$/i.test(name)) return "image"
  if (/\.(json|css|scss|less|js|cjs|mjs|ts)$/i.test(name)) return "design system"
  if (FONT_EXT.test(name)) return "font"
  return "file"
}

function listProjects(root) {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(root, e.name, "brand.json")))
    .map((e) => {
      const b = JSON.parse(fs.readFileSync(path.join(root, e.name, "brand.json"), "utf8"))
      return { id: e.name, name: b.name, version: b.version, primary: b.colors?.primary, updated: fs.statSync(path.join(root, e.name, "brand.json")).mtimeMs }
    })
    .sort((a, b) => b.updated - a.updated)
}

// Read every source, then merge. Design-system files and brand.json are exact, so their values win;
// guides and websites fill whatever is still missing.
async function readAll(dir, urls) {
  const src = path.join(dir, "sources")
  const inputs = sources(dir)
    .filter((s) => s.kind !== "font")
    .map((s) => path.join(src, s.name))
  const results = []
  let n = 0
  for (const input of [...inputs, ...urls]) {
    try {
      const r = await extractDraft(input, path.join(dir, "extract", String(n++)))
      results.push({ source: path.basename(input), ok: true, exact: !!r.exact, ...r, ev: undefined, report: undefined })
    } catch (e) {
      results.push({ source: /^https?:/.test(input) ? input : path.basename(input), ok: false, error: e.message })
    }
  }
  const good = results.filter((r) => r.ok).sort((a, b) => Number(b.exact) - Number(a.exact))
  const brand = { name: "", slug: "", version: "1.0.0", sources: [], colors: {}, fonts: {}, radius: "rounded" }
  for (const r of good) {
    const d = r.draft
    if (!brand.name && d.name && d.name !== "Brand") brand.name = d.name
    for (const [k, v] of Object.entries(d.colors ?? {})) if (brand.colors[k] == null) brand.colors[k] = v
    for (const [k, v] of Object.entries(d.fonts ?? {})) if (!brand.fonts[k] && v) brand.fonts[k] = v
    brand.sources.push(...(d.sources ?? []))
    if (d.radius && brand.radius === "rounded") brand.radius = d.radius
  }
  if (!brand.name) brand.name = "New brand"
  // Font files dropped in: attach them, and use a second family as the heading font when none is set.
  const families = fontFamilies(src)
  if (!brand.fonts.sans) brand.fonts.sans = families.find((f) => f.kind === "sans") ? fontEntry({ family: families.find((f) => f.kind === "sans").family }) : { family: "Geist", source: "google" }
  if (!brand.fonts.display) {
    const second = families.filter((f) => f.family !== brand.fonts.sans.family && f.kind !== "mono").sort((a, b) => (a.kind === "sans") - (b.kind === "sans"))[0]
    if (second) brand.fonts.display = { family: second.family, source: "self-hosted", files: [], fallback: standIn(second.family) }
  }
  attachFonts(brand, src)
  if (!brand.colors.primary) brand.colors.primary = "#4f46e5"
  const seen = new Set()
  const candidates = good
    .flatMap((r) => r.candidates ?? [])
    .filter((c) => c?.hex && !seen.has(c.hex) && seen.add(c.hex))
    .slice(0, 36)
  const notes = good.flatMap((r) => (r.notes ?? []).map((t) => ({ source: r.source, text: t })))
  const state = { candidates, families, notes, results: results.map(({ draft, candidates, notes, ...rest }) => rest), urls }
  fs.writeFileSync(path.join(dir, "state.json"), JSON.stringify(state, null, 2))
  fs.writeFileSync(path.join(dir, "brand.json"), JSON.stringify(clean(brand), null, 2) + "\n")
  return { brand: clean(brand), ...state }
}

function attachFonts(brand, src, onlySelfHosted = false) {
  for (const f of Object.values(brand.fonts)) {
    if (!f || (onlySelfHosted && (f.source !== "self-hosted" || f.files?.length))) continue
    const files = findFontFiles(f.family, path.join(src, "x.pdf"))
    if (files.length) {
      f.source = "self-hosted"
      f.files = files.map((p) => path.resolve(p))
      f.fallback ??= standIn(f.family)
    }
  }
}

// What the dashboard sends back: drop empty values so the brand validates.
function clean(b) {
  const out = { name: String(b.name || "New brand").trim(), slug: "", version: String(b.version || "1.0.0"), sources: b.sources ?? [], colors: {}, fonts: {}, radius: b.radius || "rounded" }
  out.slug = (b.slug || out.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "brand"
  for (const [k, v] of Object.entries(b.colors ?? {})) {
    if (k === "accents") {
      const list = (v ?? []).filter(okColour)
      if (list.length) out.colors.accents = list.slice(0, 6)
    } else if (okColour(v)) out.colors[k] = v
  }
  for (const [k, f] of Object.entries(b.fonts ?? {})) {
    if (!f?.family) continue
    const e = { family: f.family.trim(), source: f.source || "google" }
    if (e.source === "self-hosted") {
      e.files = f.files ?? []
      e.fallback = f.fallback || standIn(e.family)
    }
    if (f.weights) e.weights = f.weights
    out.fonts[k] = e
  }
  if (b.darkMode === false) out.darkMode = false
  if (b.typography?.headings === "display") out.typography = { headings: "display" }
  return out
}

function okColour(v) {
  if (typeof v !== "string" || !v.trim()) return false
  try {
    return Number.isFinite(oklch(v).l)
  } catch {
    return false
  }
}

const WEIGHT_NAMES = [[/thin|hairline/i, "Thin"], [/extra ?light|ultra ?light/i, "Extra Light"], [/light/i, "Light"], [/semi ?bold|demi/i, "Semibold"], [/extra ?bold|ultra ?bold/i, "Extra Bold"], [/black|heavy/i, "Black"], [/bold/i, "Bold"], [/medium/i, "Medium"], [/book/i, "Book"]]
function fontFamilies(src) {
  return fontFamiliesIn([path.join(src, "fonts")]).map((f) => {
    const names = f.files.map((p) => path.basename(p))
    const weights = [...new Set(names.map((n) => {
      const stem = n.replace(/\.[^.]+$/, "")
      const w = WEIGHT_NAMES.find(([re]) => re.test(stem))?.[1] ?? "Regular"
      return /italic|oblique|(?:[a-z0-9]|[-_ ])It$/i.test(stem) ? `${w} Italic` : w
    }))]
    const order = ["Thin", "Extra Light", "Light", "Book", "Regular", "Medium", "Semibold", "Bold", "Extra Bold", "Black"]
    weights.sort((a, b) => order.indexOf(a.replace(" Italic", "")) - order.indexOf(b.replace(" Italic", "")) || a.length - b.length)
    return { family: f.family, files: f.files.length, names, weights, kind: classify(f.family) }
  })
}
