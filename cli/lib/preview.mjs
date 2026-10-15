// Local preview: every component, in the client's brand, before anything touches their app.
import fs from "node:fs"
import http from "node:http"
import path from "node:path"

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".otf": "font/otf", ".ttf": "font/ttf" }

export async function preview(a, PKG) {
  const dist = path.join(PKG, "preview", "dist")
  if (!fs.existsSync(path.join(dist, "index.html"))) throw new Error("preview/dist is missing from the package.")
  const brandDir = path.resolve(a.brand ?? "brand-out")
  const theme = path.join(brandDir, "theme.css")
  if (!fs.existsSync(theme)) throw new Error(`No theme.css in ${brandDir}. Run \`brandos theme brand.json\` first, or pass --brand <dir>.`)
  const name = brandName(brandDir)
  const port = Number(a.port ?? 4321)

  const inject = (html) => {
    const fonts = fs.existsSync(path.join(brandDir, "fonts.html")) ? fs.readFileSync(path.join(brandDir, "fonts.html"), "utf8") : ""
    const tags = [
      fonts,
      `<link rel="stylesheet" href="/brand/fonts.css">`,
      `<link rel="stylesheet" href="/brand/theme.css">`,
      `<script>window.BRANDOS_BRAND = ${JSON.stringify({ name })}</script>`,
    ].join("\n")
    // Brand styles go after the app stylesheet so its :root tokens win.
    return html.replace(/<\/head>/i, `${tags}\n</head>`).replace(/<title>[^<]*<\/title>/, `<title>${name} · BrandOS preview</title>`)
  }

  const server = http.createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? "/").split("?")[0])
    let file
    if (url.startsWith("/brand/fonts/")) file = path.join(brandDir, "fonts", path.basename(url))
    else if (url.startsWith("/brand/")) file = path.join(brandDir, path.basename(url))
    else file = path.join(dist, url === "/" ? "index.html" : url)
    if (!file.startsWith(dist) && !file.startsWith(brandDir)) return res.writeHead(403).end()
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(dist, "index.html")
    const ext = path.extname(file)
    let body = fs.readFileSync(file)
    if (file === path.join(dist, "index.html")) body = inject(body.toString())
    res.writeHead(200, { "content-type": TYPES[ext] ?? "application/octet-stream", "cache-control": "no-store" })
    res.end(body)
  })
  await new Promise((resolve, reject) => server.listen(port, resolve).on("error", reject))
  console.log(`✓ ${name} preview running at http://localhost:${port}`)
  console.log(`  Every component, in light and dark (toggle in the header). Edit brand.json, re-run \`brandos theme\`, then refresh.`)
  console.log(`  Press Ctrl+C to stop.`)
}

function brandName(dir) {
  for (const f of ["brand.json", "../brand.json"]) {
    try {
      return JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")).name
    } catch {}
  }
  const head = fs.readFileSync(path.join(dir, "theme.css"), "utf8").slice(0, 300)
  return head.match(/\*\s+(.+?) theme/)?.[1] ?? "Your brand"
}
