#!/usr/bin/env node
// BrandOS CLI. Every command is plain Node so any coding agent with a terminal can run it.
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const PKG = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const [cmd, ...rest] = process.argv.slice(2)

function args(list) {
  const out = { _: [] }
  for (let i = 0; i < list.length; i++) {
    const a = list[i]
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=")
      out[k] = v ?? (list[i + 1] && !list[i + 1].startsWith("--") ? list[++i] : true)
    } else out._.push(a)
  }
  return out
}

const HELP = `brandos <command>

Brand
  extract <file|url> [--out draft.brand.json]   Pull colours, fonts and logos from a PDF, PowerPoint, image or website
  validate <brand.json>                         Check a brand file against the schema
  theme <brand.json> [--out dir] [--scope slug] Generate theme.css, fonts.css, tokens.json and a contrast report
  contrast <theme.css>                          WCAG AA check of an existing theme
  pack <brand.json> [--out brand-packs]         Build a reusable brand pack (zip): theme, fonts, adapters, rules, preview
  studio [--port 4400] [--dir brand-studio]     Dashboard: drop in guides, links or design-system files, check, export a pack

  extract also reads design-system files: tokens JSON (W3C, Figma variables, Tokens Studio,
  Style Dictionary), CSS or SCSS variables, a Tailwind config, or an existing brand.json.

App
  detect [appDir]                               Report framework, styling and package manager
  install [appDir] [--kit react] [--dry-run]    Copy the component kit and theme into an app
          [--pack brand.zip]                    ...using a brand pack instead of brand-out/
  scan [appDir] [--out MIGRATION.md]            Inventory pages and hand-built UI, write the migration plan
  audit [appDir]                                Leftover hand-built UI, off-brand colours and fonts in the code
  verify <url> --app <appDir> [--pages /,/a]    Open the running app and check every colour and font on screen
                                                and that it works: failed requests, hover on everything clickable,
                                                content cut off, sideways scrolling, broken images (--no-checks to skip)

Preview
  preview [--brand brand-out-dir] [--port 4321] Local site showing every component in the brand

Package: ${PKG}`

const a = args(rest)
try {
  switch (cmd) {
    case "theme": {
      const { runTheme } = await import("./lib/run-theme.mjs")
      process.exitCode = await runTheme(a)
      break
    }
    case "contrast": {
      const { parseThemeCss, audit } = await import("./lib/contrast.mjs")
      const file = a._[0] ?? "theme.css"
      const res = audit(parseThemeCss(fs.readFileSync(file, "utf8")))
      const fails = res.checks.filter((c) => !c.pass)
      if (!fails.length) console.log(`✓ ${res.checks.length} contrast checks pass WCAG 2.2 AA (${file})`)
      else {
        for (const f of fails) console.log(`✗ [${f.mode}] ${f.pair}: ${f.ratio} (needs ${f.min})`)
        process.exitCode = 1
      }
      break
    }
    case "validate": {
      const { validateBrand } = await import("./lib/validate.mjs")
      const errs = validateBrand(JSON.parse(fs.readFileSync(a._[0], "utf8")))
      if (errs.length) {
        errs.forEach((e) => console.log(`✗ ${e}`))
        process.exitCode = 1
      } else console.log("✓ brand.json is valid")
      break
    }
    case "pack": {
      const { runPack } = await import("./lib/pack.mjs")
      process.exitCode = await runPack(a)
      break
    }
    case "studio": {
      const { studio } = await import("./lib/studio.mjs")
      await studio(a, PKG)
      break
    }
    case "extract": {
      const { runExtract } = await import("./lib/extract.mjs")
      process.exitCode = await runExtract(a)
      break
    }
    case "detect": {
      const { detect } = await import("./lib/detect.mjs")
      console.log(JSON.stringify(detect(a._[0] ?? "."), null, 2))
      break
    }
    case "install": {
      const { install } = await import("./lib/install.mjs")
      process.exitCode = await install(a, PKG)
      break
    }
    case "scan": {
      const { scan } = await import("./lib/scan.mjs")
      process.exitCode = await scan(a)
      break
    }
    case "audit": {
      const { auditApp } = await import("./lib/scan.mjs")
      process.exitCode = await auditApp(a)
      break
    }
    case "verify": {
      const { verify } = await import("./lib/verify.mjs")
      process.exitCode = await verify(a, PKG)
      break
    }
    case "preview": {
      const { preview } = await import("./lib/preview.mjs")
      await preview(a, PKG)
      break
    }
    default:
      console.log(HELP)
  }
} catch (e) {
  console.error(`brandos ${cmd}: ${e.message}`)
  process.exitCode = 1
}
