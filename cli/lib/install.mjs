// Copy the component kit and the generated brand theme into an app.
// Never overwrites a different existing file: it writes <file>.brandos-new next to it instead.
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { execSync } from "node:child_process"

import { detect } from "./detect.mjs"

const BASE_DEPS = ["@base-ui/react", "class-variance-authority", "clsx", "tailwind-merge", "lucide-react", "tw-animate-css", "shadcn"]

export async function install(a, PKG) {
  const app = path.resolve(a._[0] ?? ".")
  const d = detect(app)
  // Installing at a repo root whose UI lives in a subfolder would put the kit in the wrong place.
  if (d.frontends?.length && !a.here)
    throw new Error(`${path.basename(app)}'s frontend is in a subfolder: ${d.frontends.map((f) => `${f.path} (${f.label})`).join(", ")}. Install there instead, e.g. brandos install ${path.join(a._[0] ?? ".", d.frontends[0].path)}${a.pack ? ` --pack ${a.pack}` : ""}. (Add --here to install at the root anyway.)`)
  const kit = a.kit ?? d.kit
  // A brand pack (zip or folder) is a ready-made brand: no extract or theme step needed.
  const brandDir = a.pack ? (await import("./pack.mjs")).openPack(String(a.pack), app) : path.resolve(a.brand ?? findBrandDir(app))
  const dry = !!a["dry-run"]
  const force = !!a.force
  if (!fs.existsSync(path.join(brandDir, "theme.css")))
    throw new Error(`No theme.css in ${brandDir}. Run \`brandos theme brand.json --out ${path.relative(process.cwd(), brandDir) || "."}\` first, or pass --brand <dir>.`)

  const log = { copied: [], updated: [], same: [], conflicts: [], edited: [], todo: [] }
  // Files BrandOS owns (generated theme, fonts, shared styles, presets, markup) are never edited by hand,
  // so re-running install always refreshes them, with the app's dark-mode selector applied again.
  // Files the app may change (components, utils) keep the never-overwrite rule.
  const put = (dest, content, { owned = false } = {}) => {
    const rel = path.relative(app, dest)
    if (fs.existsSync(dest)) {
      const cur = fs.readFileSync(dest)
      if (Buffer.compare(cur, Buffer.from(content)) === 0) return log.same.push(rel)
      if (owned) {
        if (!dry) fs.writeFileSync(dest, content)
        return log.updated.push(rel)
      }
      if (!force) {
        if (!dry) fs.writeFileSync(dest + ".brandos-new", content)
        return log.conflicts.push(rel)
      }
    }
    if (!dry) {
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.writeFileSync(dest, content)
    }
    log.copied.push(rel)
  }

  console.log(`App: ${app}\nFramework: ${d.framework}  Tailwind: ${d.tailwind ? `v${d.tailwind.version}` : "none"}  Kit: ${kit}${dry ? "  (dry run)" : ""}`)
  for (const n of d.notes) console.log(`  note: ${n}`)

  const brandFiles = ["theme.css", "fonts.css", "tokens.json", "palette.json"].filter((f) => fs.existsSync(path.join(brandDir, f)))
  const fontDir = path.join(brandDir, "fonts")
  if (fs.existsSync(fontDir)) for (const f of fs.readdirSync(fontDir)) brandFiles.push(path.join("fonts", f))

  if (kit === "react") {
    const kitSrc = path.join(PKG, "kits/react/src")
    const src = path.join(app, d.srcDir)
    const uiDir = path.join(app, d.componentsDir)
    const stylesDir = d.cssEntry ? path.join(app, path.dirname(d.cssEntry), "brandos") : path.join(src, "styles", "brandos")
    const alias = hasAtAlias(app)

    // Which components? Default all; --components button,card,dialog adds their internal dependencies too.
    const all = fs.readdirSync(path.join(kitSrc, "components/ui")).filter((f) => f.endsWith(".tsx")).map((f) => f.replace(/\.tsx$/, ""))
    let wanted = a.components ? String(a.components).split(",").map((s) => s.trim()) : all
    wanted = closure(wanted, kitSrc)
    const unknown = wanted.filter((w) => !all.includes(w))
    if (unknown.length) throw new Error(`Unknown components: ${unknown.join(", ")}`)

    const map = {
      "components/ui": (f) => path.join(uiDir, f),
      "components/icon-placeholder.tsx": () => path.join(src, "components", "icon-placeholder.tsx"),
      "lib/utils.ts": () => path.join(src, "lib", "utils.ts"),
      "hooks/use-mobile.ts": () => path.join(src, "hooks", "use-mobile.ts"),
    }
    const targets = { "@/lib/utils": map["lib/utils.ts"](), "@/components/icon-placeholder": map["components/icon-placeholder.tsx"](), "@/hooks/use-mobile": map["hooks/use-mobile.ts"]() }
    for (const c of all) targets[`@/components/ui/${c}`] = path.join(uiDir, `${c}.tsx`)

    const rewrite = (code, dest) =>
      alias && d.componentsDir.replace(/\\/g, "/").endsWith("components/ui")
        ? code
        : code.replace(/from "(@\/[^"]+)"/g, (m, spec) => {
            const t = targets[spec]
            if (!t) return m
            let rel = path.relative(path.dirname(dest), t).replace(/\\/g, "/").replace(/\.tsx?$/, "")
            if (!rel.startsWith(".")) rel = "./" + rel
            return `from "${rel}"`
          })

    const deps = new Set(BASE_DEPS)
    for (const c of wanted) {
      const code = fs.readFileSync(path.join(kitSrc, "components/ui", `${c}.tsx`), "utf8")
      for (const m of code.matchAll(/from "([^"@./][^"]*|@[^/"]+\/[^"]+)"/g)) {
        const p = m[1].startsWith("@") ? m[1].split("/").slice(0, 2).join("/") : m[1].split("/")[0]
        if (!["react", "react-dom"].includes(p) && !p.startsWith("@/")) deps.add(p)
      }
      const dest = path.join(uiDir, `${c}.tsx`)
      put(dest, rewrite(code, dest))
    }
    for (const [from, to] of [["components/icon-placeholder.tsx", map["components/icon-placeholder.tsx"]()], ["hooks/use-mobile.ts", map["hooks/use-mobile.ts"]()]]) {
      const dest = to
      put(dest, rewrite(fs.readFileSync(path.join(kitSrc, from), "utf8"), dest))
    }
    const utilsDest = map["lib/utils.ts"]()
    if (fs.existsSync(utilsDest) && /export function cn\b|export const cn\b/.test(fs.readFileSync(utilsDest, "utf8"))) log.same.push(path.relative(app, utilsDest) + " (already exports cn)")
    else put(utilsDest, fs.readFileSync(path.join(kitSrc, "lib/utils.ts"), "utf8"))

    // Styles: entry + Glass style + brand files
    for (const f of ["brandos.css", "brandos-ui.css", "style-glass.css"]) put(path.join(stylesDir, f), fs.readFileSync(path.join(kitSrc, "styles", f), "utf8"), { owned: true })
    for (const f of brandFiles) put(path.join(stylesDir, f), fs.readFileSync(path.join(brandDir, f)), { owned: true })

    // Wire the stylesheet into the app's CSS entry
    if (d.cssEntry && d.tailwind?.version === 4) {
      const entry = path.join(app, d.cssEntry)
      const css = fs.readFileSync(entry, "utf8")
      const rel = "./" + path.relative(path.dirname(entry), path.join(stylesDir, "brandos.css")).replace(/\\/g, "/")
      if (!css.includes(rel)) {
        const line = `@import "${rel}";`
        const next = /@import\s+["']tailwindcss["'];?/.test(css) ? css.replace(/(@import\s+["']tailwindcss["'];?)/, `$1\n${line}`) : `${line}\n${css}`
        if (!dry) fs.writeFileSync(entry, next)
        log.edited.push(`${d.cssEntry}: added ${line}`)
      }
    } else log.todo.push(`Import ${path.relative(app, path.join(stylesDir, "brandos.css"))} from your main CSS, right after @import "tailwindcss". ${d.tailwind ? "" : "Tailwind CSS v4 must be installed first."}`)

    wireRoot(app, d, brandDir, dry, log)
    const pm = d.packageManager
    const cmd = `${pm === "npm" ? "npm install" : `${pm} add`} ${[...deps].sort().join(" ")}`
    if (a.yes && !dry) {
      console.log(`Running: ${cmd}`)
      execSync(cmd, { cwd: app, stdio: "inherit" })
    } else log.todo.push(`Install dependencies: ${cmd}`)
    writeManifest(app, { kit, brandDir, components: wanted, files: log.copied.concat(log.updated, log.same) }, dry)
  } else if (kit === "primevue") {
    // PrimeVue bridge: keep every PrimeVue component, point its tokens at the brand theme, add the Glass layer.
    const dest = path.join(app, d.srcDir, a.dir ?? "brandos")
    const pv = path.join(PKG, "kits/primevue")
    const main = d.mainEntry ? path.join(app, d.mainEntry) : null
    let code = main ? fs.readFileSync(main, "utf8") : ""
    const dm = code.match(/darkModeSelector\s*:\s*(?:(['"`])([^'"`]+)\1|(false|null))/)
    const darkSel = dm ? (dm[3] ? null : dm[2]) : "system"

    for (const f of brandFiles) {
      let buf = fs.readFileSync(path.join(brandDir, f))
      if (f === "theme.css") buf = Buffer.from(alignDark(buf.toString(), darkSel))
      put(path.join(dest, f), buf, { owned: true })
    }
    const ext = d.typescript ? "ts" : "js"
    let preset = fs.readFileSync(path.join(pv, "brandos-preset.ts"), "utf8")
    if (ext === "js") preset = stripTypes(preset)
    put(path.join(dest, `brandos-preset.${ext}`), preset, { owned: true })
    put(path.join(dest, "brandos-primevue.css"), fs.readFileSync(path.join(pv, "brandos-primevue.css")), { owned: true })
    put(path.join(dest, "brandos-ui.css"), fs.readFileSync(path.join(PKG, "kits/react/src/styles/brandos-ui.css")), { owned: true })
    // The CSS kit comes along for page migration later; it is not loaded until a page uses it.
    const kitCss = path.join(PKG, "kits/css")
    put(path.join(dest, "kit", "glass-ui.css"), fs.readFileSync(path.join(kitCss, "glass-ui.css")), { owned: true })
    const markupDir = path.join(kitCss, "markup")
    if (fs.existsSync(markupDir)) for (const f of fs.readdirSync(markupDir)) put(path.join(dest, "kit", "markup", f), fs.readFileSync(path.join(markupDir, f)), { owned: true })

    const rel = "./" + path.relative(path.dirname(main ?? path.join(app, d.srcDir, "main.ts")), dest).replace(/\\/g, "/")
    const imports = [`import "${rel}/fonts.css"`, `import "${rel}/theme.css"`, `import "${rel}/brandos-ui.css"`, `import "${rel}/brandos-primevue.css"`, `import { BrandOSPreset } from "${rel}/brandos-preset"`]
    const pm = code.match(/preset\s*:\s*([A-Za-z_$][\w$]*)/)
    if (main && pm && !code.includes("BrandOSPreset")) {
      const old = pm[1]
      code = code.replace(pm[0], "preset: BrandOSPreset")
      // Drop the old preset's import if nothing else uses it (keeps lint and noUnusedLocals happy).
      const imp = new RegExp(`^import\\s+${old}\\s+from\\s+['"][^'"]+['"];?\\s*\\n`, "m")
      const uses = code.split(new RegExp(`\\b${old}\\b`)).length - 1
      if (uses === 1 && imp.test(code)) code = code.replace(imp, "")
      else if (uses === 1) log.todo.push(`${d.mainEntry}: the app's own preset "${old}" is defined here but no longer applied. Its custom tokens (colours, greys, focus rings) are now replaced by BrandOS. Delete it, or move anything still needed into definePreset(BrandOSPreset, {...}).`)
      else if (uses > 1) log.todo.push(`${d.mainEntry}: the previous preset "${old}" is no longer applied. If it held custom tokens, move them into a definePreset(BrandOSPreset, {...}) call.`)
      const lastImport = [...code.matchAll(/^import[^\n]*\n/gm)].pop()
      const at = lastImport ? lastImport.index + lastImport[0].length : 0
      code = code.slice(0, at) + imports.join("\n") + "\n" + code.slice(at)
      if (!dry) fs.writeFileSync(main, code)
      log.edited.push(`${d.mainEntry}: PrimeVue now uses BrandOSPreset; imported fonts.css, theme.css, brandos-ui.css and brandos-primevue.css`)
    } else if (code.includes("BrandOSPreset")) log.same.push(`${d.mainEntry} (already wired)`)
    else log.todo.push(`In ${d.mainEntry ?? "your entry file"}, add:\n    ${imports.join("\n    ")}\n  and set app.use(PrimeVue, { theme: { preset: BrandOSPreset } }).`)
    log.todo.push(darkSel ? `Dark mode follows PrimeVue's darkModeSelector (${darkSel}); theme.css was lined up with it.` : `PrimeVue dark mode is off, so the light theme is used.`)
    log.todo.push(`Add class="bos-backdrop" to the app's root element so glass has a soft brand wash behind it. Shared classes for frost tiers, page headers, segmented controls, buttons, chips, ramps and progress are in brandos-ui.css (see skills/ui-migrate).`)
    wireRoot(app, d, brandDir, dry, log)
    writeManifest(app, { kit, brandDir, files: log.copied.concat(log.updated, log.same), darkSelector: darkSel && darkSel !== "system" ? darkSel : null }, dry)
  } else {
    // CSS kit: exact styles as plain CSS + generated HTML markup for every component.
    const dest = path.join(app, a.dir ?? "brandos")
    const kitCss = path.join(PKG, "kits/css")
    if (!fs.existsSync(path.join(kitCss, "glass-ui.css"))) throw new Error("kits/css/glass-ui.css is missing from the package.")
    put(path.join(dest, "glass-ui.css"), fs.readFileSync(path.join(kitCss, "glass-ui.css")), { owned: true })
    put(path.join(dest, "brandos-ui.css"), fs.readFileSync(path.join(PKG, "kits/react/src/styles/brandos-ui.css")), { owned: true })
    for (const f of brandFiles) put(path.join(dest, f), fs.readFileSync(path.join(brandDir, f)), { owned: true })
    const markupDir = path.join(kitCss, "markup")
    if (fs.existsSync(markupDir)) for (const f of fs.readdirSync(markupDir)) put(path.join(dest, "markup", f), fs.readFileSync(path.join(markupDir, f)), { owned: true })
    log.todo.push(`Load in this order on every page: ${["fonts.css", "theme.css", "brandos-ui.css", "glass-ui.css"].map((f) => path.relative(app, path.join(dest, f))).join(", ")}`)
    log.todo.push(`Copy component markup from ${path.relative(app, path.join(dest, "markup"))}/. Keep the classes and data attributes exactly; only change text and wiring.`)
    if (d.framework === "angular") log.todo.push(`Angular: add the four CSS files to "styles" in angular.json, in that order.`)
    wireRoot(app, d, brandDir, dry, log)
    writeManifest(app, { kit, brandDir, files: log.copied.concat(log.updated, log.same) }, dry)
  }

  const show = (t, list) => list.length && console.log(`\n${t}\n${list.map((x) => `  ${x}`).join("\n")}`)
  show(`Copied (${log.copied.length})`, log.copied.length > 12 ? [...log.copied.slice(0, 12), `…and ${log.copied.length - 12} more`] : log.copied)
  show(`Updated BrandOS files (${log.updated.length})`, log.updated.length > 12 ? [...log.updated.slice(0, 12), `…and ${log.updated.length - 12} more`] : log.updated)
  show("Unchanged", log.same.length > 6 ? [`${log.same.length} files already up to date`] : log.same)
  show("Conflicts: kept your file, wrote <file>.brandos-new to compare", log.conflicts)
  show("Edited", log.edited)
  show("Still to do", log.todo)
  return log.conflicts.length ? 2 : 0
}

function findBrandDir(app) {
  for (const p of ["brand-out", "brandos/brand-out", "brand/brand-out", "."]) if (fs.existsSync(path.join(app, p, "theme.css"))) return path.join(app, p)
  return path.join(process.cwd(), "brand-out")
}

function hasAtAlias(app) {
  for (const f of ["tsconfig.json", "tsconfig.app.json", "jsconfig.json"]) {
    const p = path.join(app, f)
    if (!fs.existsSync(p)) continue
    const text = fs.readFileSync(p, "utf8")
    if (/"@\/\*"\s*:/.test(text)) return true
  }
  return false
}

/** Add components that the requested ones import (e.g. dialog -> button). */
function closure(list, kitSrc) {
  const out = new Set(list)
  let grew = true
  while (grew) {
    grew = false
    for (const c of [...out]) {
      const f = path.join(kitSrc, "components/ui", `${c}.tsx`)
      if (!fs.existsSync(f)) continue
      for (const m of fs.readFileSync(f, "utf8").matchAll(/from "@\/components\/ui\/([^"]+)"/g))
        if (!out.has(m[1])) {
          out.add(m[1])
          grew = true
        }
    }
  }
  return [...out]
}

/** Make theme.css's dark block apply wherever the app's dark mode lives. */
function alignDark(css, sel) {
  if (!sel || sel === ".dark") return css
  const block = css.match(/^\.dark\s*\{([^}]*)\}/m)
  if (!block) return css
  if (sel === "system") return `${css}\n/* PrimeVue follows the system setting, so dark tokens do too. */\n@media (prefers-color-scheme: dark) {\n  :root:not(.light) {${block[1].replace(/\n/g, "\n  ")}}\n}\n`
  return css.replace(/^\.dark\s*\{/m, `.dark,\n${sel} {`)
}

function stripTypes(ts) {
  return ts
    .replace(/ as const/g, "")
    .replace(/: Record<[^>]+>/g, "")
    .replace(/: ReadonlyArray<readonly \[number, number\]>/g, "")
    .replace(/\((\w+): string, (\w+): number, (\w+): string\)/g, "($1, $2, $3)")
    .replace(/\((\w+): (string|boolean)\)/g, "($1)")
    .replace(/\(\[(\w+), (\w+)\]\)/g, "([$1, $2])")
}

/** Root class for the Glass style, and Google Font links. */
function wireRoot(app, d, brandDir, dry, log) {
  const fontsHtml = fs.existsSync(path.join(brandDir, "fonts.html")) ? fs.readFileSync(path.join(brandDir, "fonts.html"), "utf8").trim() : ""
  if (d.rootHtml) {
    const f = path.join(app, d.rootHtml)
    let html = fs.readFileSync(f, "utf8")
    const before = html
    if (!/class="[^"]*style-glass/.test(html.match(/<html[^>]*>/)?.[0] ?? ""))
      html = html.replace(/<html([^>]*)>/, (m, attrs) => (/class="/.test(attrs) ? `<html${attrs.replace(/class="/, 'class="style-glass ')}>` : `<html${attrs} class="style-glass">`))
    if (fontsHtml && !html.includes("fonts.googleapis.com/css2")) html = html.replace(/<\/head>/i, `${fontsHtml.split("\n").map((l) => "    " + l).join("\n")}\n  </head>`)
    if (html !== before) {
      if (!dry) fs.writeFileSync(f, html)
      log.edited.push(`${d.rootHtml}: added class="style-glass" to <html> and the brand font links`)
    }
  } else if (d.layout) {
    const f = path.join(app, d.layout)
    let tsx = fs.readFileSync(f, "utf8")
    const tag = tsx.match(/<html[^>]*>/)?.[0]
    if (tag && !tag.includes("style-glass")) {
      const next = /className="/.test(tag) ? tag.replace(/className="/, 'className="style-glass ') : /className=\{/.test(tag) ? null : tag.replace(/<html/, '<html className="style-glass"')
      if (next) {
        tsx = tsx.replace(tag, next)
        if (!dry) fs.writeFileSync(f, tsx)
        log.edited.push(`${d.layout}: added style-glass to <html>`)
      } else log.todo.push(`Add "style-glass" to the className of <html> in ${d.layout}.`)
    }
    if (fontsHtml) log.todo.push(`Load the brand fonts in ${d.layout}: put the <link> tags from fonts.html in <head>, or use next/font with the same family.`)
  } else {
    log.todo.push(`Add class="style-glass" to the <html> element so menus and dialogs rendered in portals pick up the Glass style.`)
    if (fontsHtml) log.todo.push(`Put the <link> tags from ${path.join(brandDir, "fonts.html")} in the page <head>.`)
  }
}

function writeManifest(app, info, dry) {
  if (dry) return
  const dir = path.join(app, ".brandos")
  fs.mkdirSync(dir, { recursive: true })
  const hash = (p) => {
    try {
      return crypto.createHash("sha1").update(fs.readFileSync(path.join(app, p))).digest("hex").slice(0, 12)
    } catch {
      return null
    }
  }
  const manifest = {
    installedAt: new Date().toISOString(),
    kit: info.kit,
    brand: path.relative(app, info.brandDir) || ".",
    components: info.components,
    darkSelector: info.darkSelector ?? undefined,
    files: Object.fromEntries((info.files ?? []).map((f) => [f, hash(f)])),
  }
  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n")
}
