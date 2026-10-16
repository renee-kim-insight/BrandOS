// Font files the client supplies (licensed faces) say which family they belong to.
// Reads the family name from OpenType/TrueType files, and falls back to the file name for WOFF/WOFF2.
import fs from "node:fs"
import path from "node:path"

export const FONT_EXT = /\.(woff2|woff|otf|ttf)$/i
const STYLE_WORDS = /(thin|hairline|extralight|ultralight|light|book|regular|normal|roman|medium|semibold|demibold|bold|extrabold|ultrabold|black|heavy|italic|oblique|it|variable|vf)$/i

/** Family name stored in the font (name ID 16, typographic family, else ID 1). */
export function familyOf(file) {
  const ext = path.extname(file).toLowerCase()
  if (ext === ".otf" || ext === ".ttf") {
    try {
      const n = readNameTable(fs.readFileSync(file))
      if (n) return n
    } catch {}
  }
  return familyFromFileName(file)
}

/** "KlinicSlab-BookIt.woff2" -> "Klinic Slab" */
export function familyFromFileName(file) {
  let base = path.basename(file, path.extname(file)).replace(/[-_ ]+(?=[A-Za-z]*$)/, "-")
  base = base.split("-")[0]
  let prev
  do {
    prev = base
    base = base.replace(STYLE_WORDS, "")
  } while (base !== prev && base.length > 2)
  return base.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim()
}

function readNameTable(buf) {
  const num = buf.readUInt16BE(4)
  for (let i = 0; i < num; i++) {
    const rec = 12 + i * 16
    if (buf.toString("latin1", rec, rec + 4) !== "name") continue
    const off = buf.readUInt32BE(rec + 8)
    const count = buf.readUInt16BE(off + 2)
    const strings = off + buf.readUInt16BE(off + 4)
    const names = {}
    for (let j = 0; j < count; j++) {
      const r = off + 6 + j * 12
      const platform = buf.readUInt16BE(r)
      const id = buf.readUInt16BE(r + 6)
      const len = buf.readUInt16BE(r + 8)
      const start = strings + buf.readUInt16BE(r + 10)
      if (id !== 1 && id !== 16) continue
      const raw = buf.subarray(start, start + len)
      const text = platform === 1 ? raw.toString("latin1") : utf16be(raw)
      if (text && !names[id]) names[id] = text.trim()
    }
    return names[16] ?? names[1] ?? null
  }
  return null
}

function utf16be(b) {
  let s = ""
  for (let i = 0; i + 1 < b.length; i += 2) s += String.fromCharCode(b.readUInt16BE(i))
  return s
}

/** Every font family that has files in the given folders, with its files. */
export function fontFamiliesIn(roots) {
  const fams = new Map()
  const walk = (dir, depth) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory() && depth < 3 && e.name !== "node_modules") walk(p, depth + 1)
      else if (e.isFile() && FONT_EXT.test(e.name)) {
        const fam = familyOf(p)
        if (!fam) continue
        const k = fam.toLowerCase()
        if (!fams.has(k)) fams.set(k, { family: fam, files: [] })
        fams.get(k).files.push(p)
      }
    }
  }
  for (const r of roots) if (fs.existsSync(r)) walk(r, 0)
  return [...fams.values()]
}

/** Slab, serif or sans: decides the fallback stack and the free stand-in face. */
export function classify(family) {
  if (/slab|egyptian|clarendon|rockwell|bitter|zilla|arvo|roboto slab/i.test(family)) return "slab"
  if (/serif(?!.*sans)|garamond|caslon|baskerville|bodoni|didot|georgia|times|playfair|merriweather|lora|tiempos|freight|canela|domaine|recoleta|fraunces|cormorant|crimson|libre baskerville|instrument serif|source serif|noto serif|pt serif/i.test(family) && !/sans/i.test(family)) return "serif"
  if (/mono|code|courier/i.test(family)) return "mono"
  return "sans"
}

/** A free Google face to show until the licensed files are added. */
export function standIn(family) {
  return { slab: "Bitter", serif: "Source Serif 4", mono: "Geist Mono", sans: "Geist" }[classify(family)]
}
