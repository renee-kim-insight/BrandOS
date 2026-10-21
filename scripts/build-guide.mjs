#!/usr/bin/env node
// Builds the visual component guide: every component and layout pattern, in one or more brand themes.
//   node scripts/build-guide.mjs [--out docs/guide] [brand.json ...]
// With no brand files it uses brand/examples/*.brand.json. The first brand is shown first.
import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"

import { generateTheme, themeCss } from "../cli/lib/theme.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const APP = path.join(ROOT, "preview", "app")
const args = process.argv.slice(2)
let out = path.join(ROOT, "docs", "guide")
const files = []
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--out") out = path.resolve(args[++i])
  else files.push(path.resolve(args[i]))
}
if (!files.length) {
  const ex = path.join(ROOT, "brand", "examples")
  for (const f of fs.readdirSync(ex).filter((f) => f.endsWith(".brand.json")).sort().reverse()) files.push(path.join(ex, f))
}

const css = []
const list = []
const google = new Map()
const addGoogle = (family, weights = [400, 500, 600, 700]) => google.set(family, [...new Set([...(google.get(family) ?? []), ...weights])])
for (const f of files) {
  const brand = JSON.parse(fs.readFileSync(f, "utf8"))
  const theme = generateTheme(brand)
  if (!theme.audit.pass) console.log(`! ${brand.name}: some contrast checks fail`)
  css.push(themeCss(brand, theme, { scope: brand.slug }))
  for (const font of Object.values(brand.fonts)) {
    if (font?.source === "google") addGoogle(font.family)
    if (font?.source === "self-hosted" && font.fallback) addGoogle(font.fallback)
  }
  const label = (font) => (font ? (font.source === "self-hosted" && !font.files?.length ? `${font.family} (shown as ${font.fallback})` : font.family) : null)
  list.push({ id: brand.slug, label: brand.name, display: brand.typography?.headings === "display" ? label(brand.fonts.display) : null, sans: label(brand.fonts.sans) })
}
addGoogle("Geist Mono", [400, 500])

const guideSrc = path.join(APP, "src", "guide")
fs.writeFileSync(path.join(guideSrc, "brands.css"), css.join("\n"))
fs.writeFileSync(path.join(guideSrc, "brands.json"), JSON.stringify(list, null, 2))
// The guide renders the kit as it ships: same components, same styles.
fs.copyFileSync(path.join(ROOT, "kits", "react", "src", "styles", "brandos-ui.css"), path.join(APP, "src", "styles", "brandos-ui.css"))
fs.copyFileSync(path.join(ROOT, "kits", "react", "src", "styles", "style-glass.css"), path.join(APP, "src", "styles", "style-glass.css"))
for (const d of ["components", "lib", "hooks"]) fs.cpSync(path.join(ROOT, "kits", "react", "src", d), path.join(APP, "src", d), { recursive: true })

const fam = [...google].map(([f, w]) => `family=${f.replace(/ /g, "+")}:wght@${w.sort((a, b) => a - b).join(";")}`).join("&")
const html = fs.readFileSync(path.join(APP, "guide.html"), "utf8")
const built = html.replace(/<!--BRAND_FONTS-->|<link rel="stylesheet" data-brand-fonts[^>]*>/, `<link rel="stylesheet" data-brand-fonts href="https://fonts.googleapis.com/css2?${fam}&display=swap" />`)
fs.writeFileSync(path.join(APP, "guide.html"), built)
fs.writeFileSync(
  path.join(APP, "vite.guide.config.ts"),
  `import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

// Builds guide.html (scripts/build-guide.mjs writes this file).
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
  build: { rollupOptions: { input: path.resolve(import.meta.dirname, "guide.html") }, chunkSizeWarningLimit: 4000 },
})
`,
)
if (!fs.existsSync(path.join(APP, "node_modules"))) execFileSync("npm", ["install"], { cwd: APP, stdio: "inherit" })
execFileSync("npx", ["vite", "build", "--config", "vite.guide.config.ts", "--outDir", out, "--emptyOutDir"], { cwd: APP, stdio: "inherit" })
fs.renameSync(path.join(out, "guide.html"), path.join(out, "index.html"))
fs.writeFileSync(path.join(APP, "guide.html"), html.replace(/<link rel="stylesheet" data-brand-fonts[^>]*>/, "<!--BRAND_FONTS-->"))
console.log(`✓ Guide built for ${list.map((b) => b.label).join(", ")}: ${path.relative(process.cwd(), path.join(out, "index.html"))}`)
