// Renders every demo to static HTML so non-React apps get exact markup for the CSS kit.
import { renderToStaticMarkup } from "react-dom/server"
import { createElement } from "react"
import { COMPONENTS } from "../src/docs/registry"

const mods = import.meta.glob("../src/docs/demos/*.tsx", { eager: true }) as Record<string, { default: () => any }>

export function render() {
  const out: Record<string, string> = {}
  for (const c of COMPONENTS) {
    const m = mods[`../src/docs/demos/${c.slug}.tsx`]
    if (!m) continue
    try {
      out[c.slug] = renderToStaticMarkup(createElement(m.default))
    } catch (e) {
      out[c.slug] = `<!-- could not render statically: ${(e as Error).message} -->`
    }
  }
  return { out, meta: COMPONENTS.map((c) => ({ slug: c.slug, name: c.name, description: c.description, base: c.base })) }
}
