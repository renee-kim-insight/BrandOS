import fs from "node:fs"
import path from "node:path"

import { fontsCss, fontsHtml, generateTheme, reportMd, themeCss, tokensJson } from "./theme.mjs"
import { validateBrand } from "./validate.mjs"

export async function runTheme(a) {
  const file = a._[0] ?? "brand.json"
  const brand = JSON.parse(fs.readFileSync(file, "utf8"))
  const errs = validateBrand(brand)
  if (errs.length) {
    errs.forEach((e) => console.log(`✗ ${e}`))
    return 1
  }
  const out = a.out ?? path.join(path.dirname(file), "brand-out")
  fs.mkdirSync(out, { recursive: true })
  const theme = generateTheme(brand)
  const scope = a.scope === true ? brand.slug : a.scope
  fs.writeFileSync(path.join(out, "theme.css"), themeCss(brand, theme, { scope }))
  fs.writeFileSync(path.join(out, "brand.json"), JSON.stringify(brand, null, 2) + "\n")
  // Self-hosted font files are copied next to fonts.css so the theme folder is self-contained.
  const base = path.dirname(path.resolve(file))
  for (const f of Object.values(brand.fonts)) {
    for (const ff of (f?.source === "self-hosted" && f.files) || []) {
      let src = path.resolve(base, ff)
      if (!fs.existsSync(src)) src = path.resolve(ff)
      if (!fs.existsSync(src)) {
        console.log(`✗ Font file not found: ${ff} (paths are relative to ${path.basename(file)})`)
        return 1
      }
      fs.mkdirSync(path.join(out, "fonts"), { recursive: true })
      fs.copyFileSync(src, path.join(out, "fonts", path.basename(src)))
    }
  }
  fs.writeFileSync(path.join(out, "fonts.css"), fontsCss(brand))
  fs.writeFileSync(path.join(out, "fonts.html"), fontsHtml(brand))
  fs.writeFileSync(path.join(out, "tokens.json"), JSON.stringify(tokensJson(brand, theme), null, 2) + "\n")
  fs.writeFileSync(path.join(out, "theme-report.md"), reportMd(brand, theme))
  for (const c of theme.changes) console.log(`• ${c}`)
  const fails = theme.audit.checks.filter((c) => !c.pass)
  if (fails.length) {
    for (const f of fails) console.log(`✗ [${f.mode}] ${f.pair}: ${f.ratio} (needs ${f.min})`)
    console.log(`\nWrote ${out}/ but ${fails.length} contrast checks fail. See theme-report.md.`)
    return 1
  }
  console.log(`✓ ${brand.name}: ${theme.audit.checks.length} contrast checks pass. Wrote theme.css, fonts.css, fonts.html, tokens.json, theme-report.md to ${out}/`)
  return 0
}
