import fs from "node:fs"
import { render } from "./render-markup.js"
const { out, meta } = render()
const dir = process.env.BRANDOS_MARKUP_DIR ?? "../../../../kits/css/markup"
let ok = 0, failed = []
for (const m of meta) {
  const html = out[m.slug]
  if (!html) continue
  if (html.startsWith("<!-- could not")) failed.push(m.slug)
  else ok++
  const behaviour = m.base ? "Interactive behaviour (open/close, keyboard, focus) is not included. Add it with your framework's headless library (Angular: Spartan or CDK; Vue: Reka UI; Svelte: Bits UI) or with the native element, keeping these classes and data attributes." : "Static component: this markup is complete."
  fs.writeFileSync(dir + "/" + m.slug + ".html", "<!--\n  " + m.name + " (BrandOS CSS kit)\n  " + m.description + "\n  Generated from the React component, so classes and data attributes match exactly. Keep them; change only text and wiring.\n  " + behaviour + "\n-->\n" + html.replace(/></g, ">\n<") + "\n")
}
console.log("rendered", ok, "failed", failed)
