// Work out what an app is built with, so install and scan know what to do.
import fs from "node:fs"
import path from "node:path"

const exists = (...p) => fs.existsSync(path.join(...p))
const readJson = (p) => {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8").replace(/^﻿/, ""))
  } catch {
    return null
  }
}

export function detect(dir = ".") {
  const root = path.resolve(dir)
  const pkg = readJson(path.join(root, "package.json"))
  const deps = { ...(pkg?.dependencies ?? {}), ...(pkg?.devDependencies ?? {}) }
  const has = (n) => n in deps
  const major = (n) => Number(String(deps[n] ?? "").match(/\d+/)?.[0] ?? NaN)

  let framework = "unknown"
  if (has("next")) framework = "next"
  else if (has("@remix-run/react") || has("react-router") && has("@react-router/dev")) framework = "react-router"
  else if (has("@angular/core")) framework = "angular"
  else if (has("nuxt")) framework = "nuxt"
  else if (has("vue")) framework = "vue"
  else if (has("@sveltejs/kit") || has("svelte")) framework = "svelte"
  else if (has("solid-js")) framework = "solid"
  else if (has("astro")) framework = "astro"
  else if (has("react")) framework = "react"
  else if (!pkg && hasFiles(root, /\.(cshtml|razor)$/)) framework = "dotnet"
  else if (!pkg && hasFiles(root, /\.html?$/)) framework = "html"

  const react = ["next", "react", "react-router"].includes(framework) || (framework === "astro" && has("@astrojs/react"))
  const tailwind = has("tailwindcss")
    ? { version: major("tailwindcss") >= 4 || has("@tailwindcss/vite") || has("@tailwindcss/postcss") ? 4 : 3 }
    : null
  const shadcn = readJson(path.join(root, "components.json"))
  const ts = exists(root, "tsconfig.json")
  const pm = exists(root, "pnpm-lock.yaml") ? "pnpm" : exists(root, "yarn.lock") ? "yarn" : exists(root, "bun.lockb") || exists(root, "bun.lock") ? "bun" : "npm"
  const srcDir = exists(root, "src") ? "src" : "."

  const cssCandidates = [
    shadcn?.tailwind?.css,
    "src/app/globals.css", "app/globals.css", "src/styles/globals.css", "styles/globals.css",
    "src/index.css", "src/main.css", "src/styles.css", "src/styles.scss", "src/assets/main.css", "src/app.css", "app/app.css", "src/global.css",
  ].filter(Boolean)
  const cssEntry = cssCandidates.find((c) => exists(root, c)) ?? null

  const rootHtml = ["index.html", "src/index.html", "public/index.html"].find((f) => exists(root, f)) ?? null
  const layout = ["src/app/layout.tsx", "app/layout.tsx", "src/app/layout.jsx", "app/layout.jsx", "app/root.tsx", "src/root.tsx"].find((f) => exists(root, f)) ?? null

  const componentsDir = shadcn?.aliases?.ui
    ? shadcn.aliases.ui.replace(/^@\//, `${srcDir === "src" ? "src/" : ""}`)
    : path.join(srcDir, "components", "ui")

  // Component libraries we can re-skin in place, before any page is rebuilt.
  const uiLibrary = has("primevue") ? "primevue" : has("vuetify") ? "vuetify" : has("element-plus") ? "element-plus" : has("quasar") ? "quasar" : has("@mui/material") ? "mui" : has("antd") ? "antd" : has("@angular/material") ? "angular-material" : has("primeng") ? "primeng" : null
  const mainEntry = ["src/main.ts", "src/main.js", "src/main.tsx", "src/main.jsx"].find((f) => exists(root, f)) ?? null
  const kit = uiLibrary === "primevue" && Number(String(deps.primevue).match(/\d+/)?.[0]) >= 4 ? "primevue" : react ? "react" : "css"
  const notes = []
  if (react && !tailwind) notes.push("React app without Tailwind. The React kit needs Tailwind CSS v4; install it (it can sit alongside existing CSS).")
  if (react && tailwind?.version === 3) notes.push("Tailwind v3 detected. The React kit is written for Tailwind v4. Upgrade with `npx @tailwindcss/upgrade`, or use the CSS kit.")
  if (shadcn) notes.push("shadcn/ui is already set up. Existing components in the ui folder will be compared, not overwritten.")
  if (framework === "angular") notes.push("Angular: use the CSS kit for exact styling. For behaviour (menus, dialogs), pair it with Spartan UI or Angular CDK, keeping the same markup and classes.")
  if (["vue", "nuxt"].includes(framework) && kit !== "primevue") notes.push("Vue: use the CSS kit. shadcn-vue shares our token names, so theme.css works with it directly.")
  if (framework === "svelte") notes.push("Svelte: use the CSS kit. shadcn-svelte shares our token names, so theme.css works with it directly.")
  if (kit === "primevue") notes.push("PrimeVue 4 found. BrandOS re-skins it in place with a preset that reads the brand theme, plus the Glass layer, so every existing screen changes at once. Pages can then be migrated to kit components one by one (CSS kit markup).")
  else if (uiLibrary) notes.push(`${uiLibrary} found. There is no automatic bridge for it yet: theme.css variables can be mapped onto its theme by hand, and pages migrated to the CSS kit.`)
  if (["html", "dotnet", "unknown"].includes(framework)) notes.push("No JS framework found. Use the CSS kit: plain HTML markup plus glass-ui.css.")

  return { root, framework, react, typescript: ts, tailwind, shadcn: !!shadcn, uiLibrary, packageManager: pm, srcDir, cssEntry, mainEntry, rootHtml, layout, componentsDir, kit, notes }
}

function hasFiles(root, re, depth = 3) {
  const walk = (d, n) => {
    if (n > depth) return false
    let entries = []
    try {
      entries = fs.readdirSync(d, { withFileTypes: true })
    } catch {
      return false
    }
    for (const e of entries) {
      if (e.name === "node_modules" || e.name.startsWith(".")) continue
      if (e.isFile() && re.test(e.name)) return true
      if (e.isDirectory() && walk(path.join(d, e.name), n + 1)) return true
    }
    return false
  }
  return walk(root, 0)
}
