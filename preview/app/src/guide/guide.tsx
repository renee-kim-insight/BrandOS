import * as React from "react"
import {
  ArrowRight,
  LayoutDashboard,
  Package,
  Search,
  Send,
  Check,
  ChevronRight,
  FileText,
  Layers,
  MoonIcon,
  Paintbrush,
  Plug,
  ShieldCheck,
  Sparkles,
  Star,
  SunIcon,
  Type,
  X,
} from "lucide-react"

import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Toaster as BaseToaster } from "@/components/ui/toast"
import { COMPONENTS } from "@/docs/registry"
import BRANDS from "./brands.json"
import { BentoAgentsDemo, BentoDemo, ExampleApp } from "./bento"
import { GradedDemo, LessonDemo, QuizDemo, SidebarShellDemo, SmallPieces } from "./learning"

const demos = import.meta.glob("../docs/demos/*.tsx", { eager: true }) as Record<string, { default: React.ComponentType }>

export type Mode = "light" | "dark"
export const ModeContext = React.createContext<{ mode: Mode; setMode: (m: Mode) => void }>({ mode: "light", setMode: () => {} })

type Brand = { id: string; label: string; display: string | null; sans: string }

/* ------------------------------------------------------------------ shell */

export function Guide() {
  const brands = BRANDS as Brand[]
  const [brand, setBrand] = React.useState<string>(() => {
    try {
      const b = localStorage.getItem("bos-guide-brand")
      if (b && brands.some((x) => x.id === b)) return b
    } catch {}
    return brands[0]?.id ?? "generic"
  })
  React.useEffect(() => {
    document.documentElement.dataset.brand = brand
    try {
      localStorage.setItem("bos-guide-brand", brand)
    } catch {}
  }, [brand])
  const current = brands.find((b) => b.id === brand) ?? brands[0]
  // Some demos focus an input when they mount, which scrolls the page and the demo's own panel.
  // Undo that until the reader starts moving around, so the guide opens at the top with every demo at rest.
  React.useEffect(() => {
    let touched = false
    const mark = () => (touched = true)
    const opts = { once: true, passive: true } as AddEventListenerOptions
    for (const ev of ["wheel", "touchstart", "keydown", "pointerdown"]) window.addEventListener(ev, mark, opts)
    const reset = () => {
      if (touched) return
      const a = document.activeElement as HTMLElement | null
      if (a && a.closest(".gd-comp")) a.blur()
      document.querySelectorAll<HTMLElement>(".gd-comp-stage, .gd-comp-stage *").forEach((el) => {
        if (el.closest('[data-slot*="scroller"]')) return // chat transcripts stay pinned to the newest message
        if (el.scrollTop) el.scrollTop = 0
        if (el.scrollLeft && getComputedStyle(el).direction !== "rtl") el.scrollLeft = 0
      })
      if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    }
    const timers = [0, 100, 400, 1200].map((ms) => window.setTimeout(reset, ms))
    return () => {
      timers.forEach((t) => window.clearTimeout(t))
      for (const ev of ["wheel", "touchstart", "keydown", "pointerdown"]) window.removeEventListener(ev, mark)
    }
  }, [])

  return (
    <TooltipProvider delay={300}>
      <div className="bos-backdrop">
        <Nav brands={brands} brand={brand} setBrand={setBrand} />
        <main className="bos-container">
          <Hero current={current} />
          <HowItWorks />
          <Anatomy />
          <Surfaces />
          <Foundations current={current} />
          <Patterns />
          <Heroes />
          <Bento />
          <Learning />
          <ComponentLibrary />
          <ExamplePage />
          <Rules />
          <footer className="gd-footer">
            <span>BrandOS component guide</span>
            <span>Every example on this page is rendered live with the brand themes BrandOS generates.</span>
          </footer>
        </main>
      </div>
      <BaseToaster />
      <SonnerToaster position="bottom-center" />
    </TooltipProvider>
  )
}

const SECTIONS: [string, string, boolean][] = [
  ["how", "How it works", true],
  ["surfaces", "Surfaces", true],
  ["foundations", "Foundations", false],
  ["patterns", "Patterns", true],
  ["heroes", "Page tops", false],
  ["bento", "Bento", false],
  ["learn", "Interactive", true],
  ["components", "Components", false],
  ["rules", "Rules", true],
]

function Nav({ brands, brand, setBrand }: { brands: Brand[]; brand: string; setBrand: (b: string) => void }) {
  const { mode, setMode } = React.useContext(ModeContext)
  const dark = mode === "dark"
  return (
    <div className="bos-shell-wrap">
      <div className="bos-container">
        <header className="bos-shell bos-glass gd-shell">
          <a className="bos-brand gd-brand" href="#top">
            <span className="bos-charm bos-charm-sm" aria-hidden="true" />
            BrandOS
          </a>
          <nav className="bos-nav" aria-label="Sections">
            <ul className="bos-nav-list">
              {SECTIONS.map(([id, label, low]) => (
                <li key={id} data-priority={low ? "low" : undefined}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="bos-actions">
            <label className="sr-only" htmlFor="gd-brand">
              Brand
            </label>
            <select id="gd-brand" className="bos-select gd-brand-select" value={brand} onChange={(e) => setBrand(e.target.value)}>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="bos-btn-glass gd-icon-btn"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setMode(dark ? "light" : "dark")}
            >
              {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </button>
          </div>
        </header>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ helpers */

function Section({ id, kicker, title, intro, children }: { id: string; kicker: string; title: string; intro?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="bos-block gd-section" aria-labelledby={`${id}-title`}>
      <div className="gd-sec-head">
        <span className="bos-kicker">{kicker}</span>
        <h2 className="bos-h1" id={`${id}-title`}>
          {title}
        </h2>
        {intro && <p className="bos-lead gd-intro">{intro}</p>}
      </div>
      {children}
    </section>
  )
}

function Specimen({ label, note, children, className = "" }: { label: string; note?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <figure className={`gd-specimen ${className}`}>
      <div className="gd-stage">{children}</div>
      <figcaption>
        <code>{label}</code>
        {note && <span>{note}</span>}
      </figcaption>
    </figure>
  )
}

function Code({ children }: { children: string }) {
  return (
    <pre className="gd-code">
      <code>{children}</code>
    </pre>
  )
}

function Chev() {
  return <ChevronRight className="bos-row-chevron" size={18} aria-hidden="true" />
}

/* ------------------------------------------------------------------ hero */

function Hero({ current }: { current?: Brand }) {
  return (
    <header className="bos-hero" id="top">
      <div className="bos-hero-grid">
        <div>
          <span className="bos-kicker">Component guide · BrandOS 1.5</span>
          <h1 className="bos-display" style={{ marginTop: 10 }}>
            One component library. Any brand.
          </h1>
          <p className="bos-lead">
            BrandOS reads a brand guide, builds a theme that passes accessibility checks, and dresses every component in it. Switch the brand at the top right to see the same page in another identity.
          </p>
          <div className="bos-btns">
            <a className="bos-btn-primary" href="#components">
              See every component <ArrowRight size={16} />
            </a>
            <a className="bos-btn-glass" href="#how">
              How it works
            </a>
          </div>
        </div>
        <aside className="bos-surface bos-surface-lg" aria-label="Current brand">
          <div className="gd-level-top">
            <span className="bos-charm" aria-hidden="true">
              <Star fill="currentColor" />
            </span>
            <div>
              <div className="bos-kicker">Now showing</div>
              <p className="bos-h2" style={{ margin: "2px 0 0" }}>
                {current?.label}
              </p>
              <div className="bos-caption">
                {current?.display ? `Headings: ${current.display} · Body: ${current.sans}` : `Headings and body: ${current?.sans}`}
              </div>
            </div>
          </div>
          <div className="gd-next">
            <span>
              Contrast checks <span className="bos-pill">WCAG 2.2 AA</span>
            </span>
            <strong className="bos-num">150 / 150</strong>
          </div>
          <div className="bos-progress bos-progress-primary" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} aria-label="Contrast checks passing">
            <div style={{ width: "100%" }} />
          </div>
        </aside>
      </div>
      <div className="bos-stats">
        <div>
          <div className="bos-stat">{COMPONENTS.length}</div>
          <small>components</small>
        </div>
        <div>
          <div className="bos-stat">3</div>
          <small>kits: React, PrimeVue, plain CSS</small>
        </div>
        <div>
          <div className="bos-stat">2</div>
          <small>modes, light and dark</small>
        </div>
        <div>
          <div className="bos-stat">0</div>
          <small>colours outside the brand</small>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ how it works */

const STEPS = [
  { icon: LayoutDashboard, cmd: "brandos studio", title: "Studio", body: "Drop in a brand guide, design-system files, links and licensed fonts. Check colours, fonts and contrast live. No AI, nothing uploaded." },
  { icon: Package, cmd: "brand pack", title: "Pack", body: "Download a brand pack once: theme, fonts, tokens, components, adapters and brand-rules.md for AI tools." },
  { icon: Plug, cmd: "brandos install --pack", title: "Install", body: "Finds the app (even in a subfolder) and adds the theme, fonts and the kit that fits it." },
  { icon: Paintbrush, cmd: "ui-migrate", title: "Migrate", body: "An agent moves each page onto the shell, layout, page tops, bento panels and components in this guide." },
  { icon: ShieldCheck, cmd: "brandos verify", title: "Check", body: "Opens every page: brand colours and fonts, failed requests, hover, cut-off text, broken corners, sideways scrolling." },
]

function HowItWorks() {
  return (
    <Section id="how" kicker="Workflow" title="From brand guide to branded app" intro="Make a brand pack once, then reuse it in every app. Migration is done page by page by an agent following the ui-migrate skill; everything else is a command.">
      <ol className="gd-flow">
        {STEPS.map((s, i) => (
          <li key={s.title} className="gd-flow-step">
            <span className={`bos-charm bos-charm-md ${["bos-charm-petal", "bos-charm-leaf", "bos-charm-arch", "bos-charm-bloom", "bos-charm-pebble", "bos-charm-tab"][i]} ${i % 2 ? "bos-charm-soft" : ""}`} aria-hidden="true">
              <s.icon />
            </span>
            <span className="gd-flow-num">{i + 1}</span>
            <h3 className="bos-h3">{s.title}</h3>
            <code className="gd-chipcode">{s.cmd}</code>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="bos-grid-2" style={{ marginTop: 32 }}>
        <div className="bos-surface">
          <h3 className="bos-h3">Run it</h3>
          <Code>{`# once per brand: make the pack in the studio
node path/to/brandos/cli/brandos.mjs studio

# in each app's repo
node path/to/brandos/cli/brandos.mjs detect
node path/to/brandos/cli/brandos.mjs install --pack ~/Downloads/acme-brand-1.0.0.zip
node path/to/brandos/cli/brandos.mjs audit app/frontend
node path/to/brandos/cli/brandos.mjs verify http://localhost:5173 --app app/frontend`}</Code>
        </div>
        <div className="gd-fontflow bos-glass">
          <h3 className="bos-h3">How fonts are chosen</h3>
          <div className="gd-fontflow-grid">
            <div className="gd-node">
              <Type size={18} /> The brand's body font
            </div>
            <div className="gd-node">
              <FileText size={18} /> Licensed files added in the studio
            </div>
            <ArrowRight className="gd-arrow" aria-hidden="true" />
            <ArrowRight className="gd-arrow" aria-hidden="true" />
            <div className="gd-node gd-node-out">
              headings → <code>--font-heading</code>
              <small>the body font, heavier; a display font only if the brand opts in</small>
            </div>
            <div className="gd-node gd-node-out">
              fonts.sans → <code>--font-sans</code>
              <small>everything else</small>
            </div>
          </div>
          <p className="bos-caption" style={{ marginTop: 12 }}>
            One family for everything: size and weight make the hierarchy. Licensed font files travel in the pack; until they're added, a free stand-in of the same style shows. A brand can opt in to its display font for headings in the studio.
          </p>
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ anatomy */

const PARTS = [
  ["Glass nav", "Sticky, floats over the page. Content blurs through it."],
  ["Hero", "Display heading, a lead line, one primary and one glass button."],
  ["Featured surface", "Solid, with a soft shadow. The single most important thing."],
  ["Stat strip", "Big numbers, medium weight, divided by hairlines."],
  ["Featured + glass rows", "One solid item beside secondary items in glass."],
  ["Tiles", "Repeating cards. Outlined glass, solid on hover."],
  ["Table", "Ranked or tabular data. The user's own row is tinted."],
  ["Brand band", "The one full-colour gradient, with a glass button."],
  ["Edge glow", "Fixed to the viewport, so glass always has colour to frost."],
]

function Anatomy() {
  return (
    <Section id="anatomy" kicker="Layout" title="Anatomy of a page" intro="Every migrated page follows the same order. Numbers match the list.">
      <div className="gd-anatomy">
        <div className="gd-wire" aria-hidden="true">
          <div className="gd-wire-glow">
            <i>9</i>
          </div>
          <div className="gd-wire-nav">
            <i>1</i>
            <b />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="gd-wire-hero">
            <div>
              <i>2</i>
              <div className="gd-wire-h" />
              <div className="gd-wire-h short" />
              <div className="gd-wire-p" />
              <div className="gd-wire-btns">
                <span className="p" />
                <span className="g" />
              </div>
            </div>
            <div className="gd-wire-card">
              <i>3</i>
              <span className="gd-wire-charm" />
              <div className="gd-wire-p" />
              <div className="gd-wire-bar" />
            </div>
          </div>
          <div className="gd-wire-stats">
            <i>4</i>
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="gd-wire-feature">
            <i>5</i>
            <div className="gd-wire-card tall" />
            <div className="gd-wire-rows">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="gd-wire-tiles">
            <i>6</i>
            <span />
            <span />
            <span />
          </div>
          <div className="gd-wire-table">
            <i>7</i>
            <span />
            <span />
            <span className="self" />
          </div>
          <div className="gd-wire-band">
            <i>8</i>
            <span />
          </div>
        </div>
        <ol className="gd-legend">
          {PARTS.map(([t, d], i) => (
            <li key={t}>
              <span className="gd-legend-num">{i + 1}</span>
              <div>
                <strong>{t}</strong>
                <span>{d}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ surfaces */

function Surfaces() {
  return (
    <Section id="surfaces" kicker="Hierarchy" title="Solid for what matters, glass for the rest" intro="Importance decides the surface. Hover over the glass examples: they turn solid when they can be clicked.">
      <div className="gd-ladder">
        <div className="gd-ladder-item">
          <div className="bos-surface gd-ladder-demo">
            <span className="bos-caption">Next step</span>
            <h3 className="bos-h2" style={{ fontSize: 24 }}>
              Finish your profile
            </h3>
            <button className="bos-btn-primary bos-btn-sm">Continue</button>
          </div>
          <h3 className="bos-h3">Surface</h3>
          <code>bos-surface</code>
          <p>Solid card with a soft shadow. One per section: the thing the person should do or see first.</p>
        </div>
        <div className="gd-ladder-item">
          <div className="gd-ladder-demo gd-on-glow">
            <a className="bos-row" href="#surfaces">
              <div>
                <div className="bos-h3" style={{ fontSize: 16 }}>
                  Weekly report
                </div>
                <div className="bos-meta">
                  <span className="bos-chip">8 min</span>
                </div>
              </div>
              <Chev />
            </a>
            <a className="bos-row" href="#surfaces">
              <div className="bos-h3" style={{ fontSize: 16 }}>
                Team settings
              </div>
              <Chev />
            </a>
          </div>
          <h3 className="bos-h3">Glass</h3>
          <code>bos-glass · bos-row · bos-btn-glass</code>
          <p>Secondary items, the nav and floating controls. Turns solid on hover when clickable.</p>
        </div>
        <div className="gd-ladder-item">
          <div className="gd-ladder-demo">
            <a className="bos-tile" href="#surfaces">
              <span className="bos-caption">Article · 6 min</span>
              <h3 className="bos-h3" style={{ fontSize: 16 }}>
                Getting started
              </h3>
            </a>
          </div>
          <h3 className="bos-h3">Tile</h3>
          <code>bos-tile</code>
          <p>Repeating cards in a grid. Outlined glass, so a grid never competes with the featured surface.</p>
        </div>
        <div className="gd-ladder-item">
          <div className="gd-ladder-demo">
            <div className="bos-band gd-mini-band">
              <strong>Ready?</strong>
              <button className="bos-btn-glass bos-btn-sm">Start</button>
            </div>
          </div>
          <h3 className="bos-h3">Band</h3>
          <code>bos-band</code>
          <p>The brand gradient. Once per page, for the closing call to action.</p>
        </div>
      </div>

      <div className="bos-grid-2" style={{ marginTop: 32 }}>
        <div className="bos-surface">
          <h3 className="bos-h3">Secondary button states</h3>
          <div className="gd-states">
            <div>
              <button className="bos-btn-glass">Save draft</button>
              <small>Rest: glass</small>
            </div>
            <ArrowRight className="gd-arrow" aria-hidden="true" />
            <div>
              <button className="bos-btn-glass gd-force-hover" tabIndex={-1} data-bos-static>
                Save draft
              </button>
              <small>Hover: solid</small>
            </div>
            <ArrowRight className="gd-arrow" aria-hidden="true" />
            <div>
              <button className="bos-btn-glass gd-force-press" tabIndex={-1} data-bos-static>
                Save draft
              </button>
              <small>Pressed</small>
            </div>
          </div>
        </div>
        <div className="bos-band gd-states-band">
          <div className="gd-states">
            <div>
              <button className="bos-btn-glass">Get started</button>
              <small>On colour: clear glass</small>
            </div>
            <ArrowRight className="gd-arrow" aria-hidden="true" />
            <div>
              <button className="bos-btn-glass gd-force-hover-band" tabIndex={-1} data-bos-static>
                Get started
              </button>
              <small>Hover: solid white</small>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ foundations */

const COLOUR_GROUPS: [string, string[]][] = [
  ["Brand", ["primary", "ring", "destructive"]],
  ["Band (gradient stops)", ["band-1", "band-2", "band-3", "band-4"]],
  ["Levels ramp", ["ramp-0", "ramp-1", "ramp-2", "ramp-3", "ramp-4", "ramp-5"]],
  ["Charts", ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]],
  ["Neutrals", ["background", "card", "secondary", "muted", "border", "input", "muted-foreground", "foreground"]],
  ["Glow and progress", ["backdrop-1", "backdrop-2", "backdrop-3", "progress-track", "progress-fill"]],
]

function Foundations({ current }: { current?: Brand }) {
  return (
    <Section id="foundations" kicker="Tokens" title="Foundations" intro="Generated from brand.json. Nothing here is typed by hand, so changing the brand changes all of it.">
      <h3 className="bos-h2 gd-sub">Colour</h3>
      <div className="gd-colours">
        {COLOUR_GROUPS.map(([g, toks]) => (
          <div key={g} className="gd-colour-group">
            <div className="bos-label">{g}</div>
            <div className="gd-swatches">
              {toks.map((t) => (
                <div key={t} className="gd-swatch">
                  <span style={{ background: `var(--${t})` }} />
                  <code>--{t}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="gd-colour-group">
          <div className="bos-label">Brand gradient</div>
          <div className="gd-gradient" />
          <code className="bos-caption">--gradient-brand</code>
        </div>
      </div>

      <h3 className="bos-h2 gd-sub">Type</h3>
      <div className="bos-surface gd-type">
        {[
          ["bos-display", "Display", "Medium, landing pages only", "Big ideas, short lines"],
          ["bos-h1", "H1", "Medium", "The title of every page"],
          ["bos-h2", "H2", "Medium", "Section titles"],
          ["bos-panel-title", "Panel", "Medium", "Bento panel titles"],
          ["bos-h3", "H3", "Medium", "Items in lists, tiles and cards"],
          ["bos-lead", "Lead", "Body font", "The sentence under a title that says what the page is for."],
          ["bos-stat", "Stat", "Medium, tabular", "1,284"],
          ["", "Body", "Body font", "Regular text sits at 16px with a 1.6 line height, so long paragraphs stay comfortable to read."],
          ["bos-label", "Label", "Body font, semibold", "Form labels and table headers"],
          ["bos-caption", "Caption", "Body font", "Metadata and timestamps"],
        ].map(([cls, name, font, sample]) => (
          <div key={name} className="gd-type-row">
            <div className="gd-type-meta">
              <strong>{name}</strong>
              <span>{font}</span>
              {cls && <code>{cls}</code>}
            </div>
            <div className={cls}>{sample}</div>
          </div>
        ))}
        <p className="bos-caption" style={{ margin: "16px 0 0" }}>
          {current?.display ? `This brand uses ${current.display} for headings and ${current.sans} for everything else.` : `One family, ${current?.sans}, for everything. Headings are the same font at a heavier weight.`}
        </p>
      </div>

      <div className="bos-grid-3" style={{ marginTop: 32 }}>
        <div className="bos-surface">
          <h3 className="bos-h3">Spacing</h3>
          <div className="gd-spacing">
            {[4, 8, 12, 16, 24, 32, 48, 64, 96].map((px, i) => (
              <div key={px}>
                <code>--space-{i + 1}</code>
                <span style={{ width: px }} />
                <small>{px}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="bos-surface">
          <h3 className="bos-h3">Shadows</h3>
          <div className="gd-shadows">
            {["sm", "md", "lg"].map((s) => (
              <div key={s} style={{ boxShadow: `var(--shadow-${s})` }}>
                <code>--shadow-{s}</code>
              </div>
            ))}
          </div>
        </div>
        <div className="bos-surface">
          <h3 className="bos-h3">Radius</h3>
          <div className="gd-radii">
            {[
              ["Controls", 999],
              ["Rows", 18],
              ["Cards", 24],
              ["Bands", 28],
            ].map(([n, r]) => (
              <div key={n}>
                <span style={{ borderRadius: Number(r) }} />
                <small>
                  {n} · {r === 999 ? "pill" : `${r}px`}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 className="bos-h2 gd-sub">Charms</h3>
      <p className="bos-lead gd-intro" style={{ marginBottom: 20 }}>
        Soft shapes for badges, avatars and icon frames. They carry the brand's colour in small doses.
      </p>
      <div className="gd-charms">
        {["petal", "leaf", "arch", "bloom", "pebble", "tab"].map((s, i) => (
          <div key={s} className="gd-charm-cell">
            <span className={`bos-charm bos-charm-${s} ${["", "bos-charm-soft", "bos-charm-primary", "", "bos-charm-secondary", "bos-charm-soft"][i]}`} aria-hidden="true">
              {[<Star key="a" fill="currentColor" />, <Sparkles key="b" />, <Check key="c" />, <Layers key="d" />, <Type key="e" />, <span key="f" className="gd-charm-initials">AB</span>][i]}
            </span>
            <code>bos-charm-{s}</code>
          </div>
        ))}
      </div>
      <p className="bos-caption" style={{ marginTop: 12 }}>
        Fills: gradient (default), <code>bos-charm-primary</code>, <code>bos-charm-soft</code>, <code>bos-charm-secondary</code>. Sizes: <code>bos-charm-sm</code> 40, <code>bos-charm-md</code> 64, default 88, <code>bos-charm-lg</code> 120.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ patterns */

function Patterns() {
  const [seg, setSeg] = React.useState("All")
  return (
    <Section id="patterns" kicker="BrandOS layer" title="Layout patterns" intro="Plain CSS classes from brandos-ui.css. They work in every kit, including PrimeVue and apps with no component library.">
      <div className="gd-specimens">
        <Specimen label="bos-btn-primary · bos-btn-glass" note="One primary per view. Sizes: bos-btn-sm, bos-btn-lg.">
          <div className="bos-btns">
            <button className="bos-btn-primary">Submit</button>
            <button className="bos-btn-glass">Save draft</button>
            <button className="bos-btn-glass" disabled>
              Disabled
            </button>
          </div>
          <div className="bos-btns" style={{ marginTop: 12 }}>
            <button className="bos-btn-primary bos-btn-sm">Small</button>
            <button className="bos-btn-glass bos-btn-lg">Large glass</button>
          </div>
        </Specimen>

        <Specimen label="bos-segmented" note="Tabs, filters and view switches. Selection is neutral, not brand colour.">
          <div className="bos-segmented" role="tablist">
            {["All", "In progress", "Done"].map((s) => (
              <button key={s} role="tab" aria-selected={seg === s} onClick={() => setSeg(s)}>
                {s}
                <span className="bos-count">{s === "All" ? 12 : s === "Done" ? 7 : 5}</span>
              </button>
            ))}
          </div>
        </Specimen>

        <Specimen label="bos-chip · bos-pill · bos-dot-N" note="Chips are neutral metadata. A pill marks the person's own status.">
          <div className="bos-meta">
            <span className="bos-chip">Course</span>
            <span className="bos-chip">15 min</span>
            <span className="bos-chip">
              <span className="bos-dot bos-dot-3" /> Level 3
            </span>
            <span className="bos-pill">Your next level</span>
          </div>
        </Specimen>

        <Specimen label="bos-progress · bos-progress-primary" note="Muted by default. Brand colour only for the person's one main bar.">
          <div className="gd-progress-demo">
            <div className="gd-next">
              <span className="bos-caption">Your progress</span>
              <strong className="bos-num">64%</strong>
            </div>
            <div className="bos-progress bos-progress-primary">
              <div style={{ width: "64%" }} />
            </div>
            <div className="gd-next">
              <span className="bos-caption">Team average</span>
              <strong className="bos-num">41%</strong>
            </div>
            <div className="bos-progress">
              <div style={{ width: "41%" }} />
            </div>
          </div>
        </Specimen>

        <Specimen label="bos-ramp-0 … bos-ramp-5" note="Levels, tiers and stages: one hue, pale to full.">
          <div className="gd-ramp">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={`bos-ramp-${n}`}>
                L{n + 1}
              </span>
            ))}
          </div>
        </Specimen>

        <Specimen label="bos-filters · bos-select" note="Search and filters share one height; selects have room for the arrow.">
          <div className="bos-filters">
            <input className="gd-input" placeholder="Search" aria-label="Search" />
            <select className="bos-select" aria-label="Sort">
              <option>Newest first</option>
              <option>Oldest first</option>
            </select>
          </div>
        </Specimen>

        <Specimen label="bos-avatar · bos-charm-sm" note="Initials sit in a tab-shaped charm.">
          <div className="bos-meta">
            <span className="bos-avatar">AB</span>
            <span className="bos-avatar">RK</span>
            <span className="bos-charm bos-charm-sm bos-charm-bloom" aria-hidden="true" />
            <span className="bos-charm bos-charm-sm bos-charm-leaf bos-charm-soft" aria-hidden="true" />
          </div>
        </Specimen>

        <Specimen label="bos-skeleton" note="Loading placeholders shimmer gently instead of spinning.">
          <div className="gd-skel">
            <div className="bos-skeleton" style={{ height: 14, width: "70%" }} />
            <div className="bos-skeleton" style={{ height: 14, width: "90%" }} />
            <div className="bos-skeleton" style={{ height: 14, width: "40%" }} />
          </div>
        </Specimen>

        <Specimen label="bos-stats" note="Big numbers in medium weight, with hairline dividers." className="gd-span-2">
          <div className="bos-stats" style={{ marginTop: 0 }}>
            <div>
              <div className="bos-stat">32</div>
              <small>approved</small>
            </div>
            <div>
              <div className="bos-stat">#6</div>
              <small>of 42 on the board</small>
            </div>
            <div>
              <div className="bos-stat">67</div>
              <small>hours saved</small>
            </div>
          </div>
        </Specimen>

        <Specimen label="bos-table · bos-rank · bos-row-self" note="The person's own row is tinted; first place is filled." className="gd-span-2">
          <div className="bos-table-wrap">
            <table className="bos-table">
              <thead>
                <tr>
                  <th style={{ width: 56 }}>Rank</th>
                  <th>Name</th>
                  <th className="bos-num">Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="bos-rank bos-rank-top">1</span>
                  </td>
                  <td>Sam Rivera</td>
                  <td className="bos-num">1,150</td>
                </tr>
                <tr>
                  <td>
                    <span className="bos-rank">2</span>
                  </td>
                  <td>Jordan Lee</td>
                  <td className="bos-num">880</td>
                </tr>
                <tr className="bos-row-self">
                  <td>
                    <span className="bos-rank">6</span>
                  </td>
                  <td>
                    <strong>You</strong>
                  </td>
                  <td className="bos-num">670</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Specimen>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ heroes */

const HEROES: { id: string; name: string; cls: string; when: string; avoid: string; demo: React.ReactNode }[] = [
  {
    id: "compact",
    name: "Work queue",
    cls: "bos-hero-compact + bos-queue",
    when: "The page is for acting on what needs attention: tasks, approvals, what's up next.",
    avoid: "A giant greeting beside the queue with empty space, or a stat strip.",
    demo: (
      <>
        <div className="bos-hero-compact" style={{ paddingTop: 8 }}>
          <h3 className="bos-h1">Good morning, Sam</h3>
          <p className="bos-lead">Three things need you. Start with the first.</p>
        </div>
        <ol className="bos-queue">
          <li>
            <div>
              <div className="bos-h3">Confirm the cutover plan</div>
              <p>Atlas migration · 2 days late</p>
            </div>
            <button className="bos-btn-primary bos-btn-sm">Open task</button>
          </li>
          <li>
            <div>
              <div className="bos-h3" style={{ fontSize: 16 }}>Review the data model</div>
              <p>Atlas migration · due today</p>
            </div>
            <button className="bos-btn-glass bos-btn-sm">Open task</button>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "overview",
    name: "Overview",
    cls: "bos-hero-overview + bos-stats",
    when: "The page is for seeing how things stand, and the numbers change what someone does next.",
    avoid: "Counts of things that rarely change, or more than five numbers.",
    demo: (
      <>
        <div className="bos-hero-overview" style={{ paddingTop: 8 }}>
          <div>
            <h3 className="bos-h1">How the estate is doing</h3>
            <p className="bos-lead">4 decisions opened and 2 were resolved this week.</p>
          </div>
          <div className="bos-btns">
            <button className="bos-btn-glass bos-btn-sm">Export</button>
            <button className="bos-btn-primary bos-btn-sm">Review decisions</button>
          </div>
        </div>
        <div className="bos-stats">
          <div><div className="bos-stat">24</div><small>agents live</small></div>
          <div><div className="bos-stat">5</div><small>open decisions</small></div>
          <div><div className="bos-stat">12.5 d</div><small>brief to production</small></div>
        </div>
      </>
    ),
  },
  {
    id: "search",
    name: "Search",
    cls: "bos-hero-search + bos-search-xl + bos-suggestions",
    when: "The page is for finding something: a library, knowledge base or directory.",
    avoid: "Tucking the search into a side card, or stats about how much content exists.",
    demo: (
      <div className="bos-hero-search" style={{ paddingTop: 8 }}>
        <h3 className="bos-h1">Find how we deliver</h3>
        <p className="bos-lead">Search every procedure and guide, or ask and get an answer with sources.</p>
        <label className="bos-search-xl">
          <Search aria-hidden="true" />
          <input aria-label="Search procedures" placeholder="Search procedures, guides and templates" />
          <button className="bos-btn-primary bos-btn-sm" type="button">Search</button>
        </label>
        <div className="bos-suggestions">
          <a href="#heroes">Pursuit</a>
          <a href="#heroes">Setup</a>
          <a href="#heroes">Delivery</a>
          <a href="#heroes">Close out</a>
        </div>
      </div>
    ),
  },
  {
    id: "chat",
    name: "Ask an assistant",
    cls: "bos-hero-chat + bos-composer-dock + bos-composer-agent",
    when: "The page is for asking an assistant a question. In the app, wrap the composer in bos-composer-dock so it stays at the bottom of the screen. The picker in the composer switches assistants.",
    avoid: "Greeting and composer side by side, suggestions cut off mid-sentence, or a composer that scrolls away.",
    demo: (
      <div className="bos-hero-chat" style={{ paddingTop: 8 }}>
        <h3 className="bos-h1">Welcome back, Sam</h3>
        <p className="bos-lead">Ask a question or describe what you need.</p>
        <div className="bos-composer">
          <textarea aria-label="Your question" placeholder="Ask a question or describe what you need" />
          <div className="bos-composer-bar">
            <details className="bos-menu-wrap bos-composer-agent">
              <summary>Policy Helper</summary>
              <div className="bos-menu" role="menu">
                <span className="bos-menu-label">Who answers</span>
                <button type="button" aria-current="page">Policy Helper</button>
                <button type="button">IT Desk</button>
                <button type="button">Deal Coach</button>
              </div>
            </details>
            <button className="bos-btn-primary bos-btn-sm" type="button"><Send size={16} /> Send</button>
          </div>
        </div>
        <div className="bos-suggestions">
          <button type="button">What is our travel policy?</button>
          <button type="button">Reset my VPN</button>
          <button type="button">Draft a renewal email</button>
        </div>
      </div>
    ),
  },
  {
    id: "conversation",
    name: "Conversation",
    cls: "bos-chat + bos-chat-rail + bos-thread + bos-composer-dock",
    when: "A conversation with an assistant. The rail switches assistants and reopens recent conversations; the composer stays at the bottom of the screen.",
    avoid: "Going back to the home page to switch assistants, or a composer that floats mid-page when the thread is short.",
    demo: (
      <div className="gd-chat-demo">
        <div className="bos-chat">
          <nav className="bos-chat-rail" aria-label="Assistants and conversations">
            <section>
              <h2>Assistants</h2>
              <a href="#heroes" aria-current="page"><span className="bos-avatar bos-avatar-sm">P</span><span>Policy Helper<small>Company policy</small></span></a>
              <a href="#heroes"><span className="bos-avatar bos-avatar-sm">I</span><span>IT Desk<small>Laptops, access, accounts</small></span></a>
              <a href="#heroes"><span className="bos-avatar bos-avatar-sm">D</span><span>Deal Coach<small>Proposals from past wins</small></span></a>
            </section>
            <section>
              <h2>Recent</h2>
              <a href="#heroes"><span>Travel policy for Lisbon<small>Policy Helper · Today</small></span></a>
              <a href="#heroes"><span>VPN keeps dropping<small>IT Desk · Yesterday</small></span></a>
            </section>
          </nav>
          <div className="bos-chat-main" style={{ minHeight: 440 }}>
            <div className="bos-chat-head">
              <span className="bos-kicker">Policy Helper</span>
              <h3 className="bos-h1" style={{ fontSize: "var(--text-h2)" }}>Travel policy for Lisbon</h3>
            </div>
            <div className="bos-thread">
              <div className="bos-msg bos-msg-user">Can I book business class to Lisbon?</div>
              <div className="bos-msg bos-msg-assistant">Economy is the default for flights under 8 hours. Lisbon from Toronto is about 7, so book economy, or ask your manager for an exception.</div>
              <div className="bos-msg bos-msg-user">What about a seat upgrade?</div>
              <div className="bos-msg bos-msg-assistant">Paid seat selection up to $80 each way is covered. Anything above that needs approval first.</div>
            </div>
            <div className="bos-composer-dock">
              <div className="bos-composer">
                <textarea aria-label="Your message" placeholder="Reply to Policy Helper" />
                <div className="bos-composer-bar">
                  <details className="bos-menu-wrap bos-composer-agent">
              <summary>Policy Helper</summary>
              <div className="bos-menu" role="menu">
                <span className="bos-menu-label">Who answers</span>
                <button type="button" aria-current="page">Policy Helper</button>
                <button type="button">IT Desk</button>
                <button type="button">Deal Coach</button>
              </div>
            </details>
                  <button className="bos-btn-primary bos-btn-sm" type="button"><Send size={16} /> Send</button>
                </div>
              </div>
              <span className="bos-composer-hint">Enter to send · Shift+Enter for a new line</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "split",
    name: "Welcome or landing",
    cls: "bos-hero-split + bos-display + bos-surface",
    when: "The page explains the product: a landing page, welcome or first run.",
    avoid: "Using it on everyday app pages, where it pushes the work down the screen.",
    demo: (
      <div className="bos-hero-split" style={{ paddingTop: 8 }}>
        <div>
          <h3 className="bos-display" style={{ fontSize: "clamp(2rem, 2.4vw + 1rem, 3rem)" }}>Agents that do the work</h3>
          <p className="bos-lead" style={{ margin: "12px 0 20px" }}>Build, test and run agents your whole team can trust.</p>
          <div className="bos-btns"><button className="bos-btn-primary">Get started</button><button className="bos-btn-glass">See how it works</button></div>
        </div>
        <div className="bos-surface">
          <span className="bos-charm bos-charm-md" aria-hidden="true"><Sparkles /></span>
          <div className="bos-h3" style={{ marginTop: 12 }}>12 agents ready to use</div>
          <p className="bos-caption" style={{ margin: "4px 0 0" }}>Start from a template and change what you need.</p>
        </div>
      </div>
    ),
  },
  {
    id: "record",
    name: "Record page",
    cls: "bos-record-header",
    when: "The page is about one thing: a project, customer, agent or document.",
    avoid: "Any hero. The record's content should start right away.",
    demo: (
      <div className="bos-record-header" style={{ paddingTop: 8, marginBottom: 0 }}>
        <div>
          <span className="bos-caption">Projects</span>
          <h3 className="bos-h1">Atlas migration</h3>
          <div className="bos-meta"><span className="bos-pill">On track</span><span className="bos-chip">Due Nov 14</span><span className="bos-chip">Owner: Sam Rivera</span></div>
        </div>
        <div className="bos-btns"><button className="bos-btn-glass bos-btn-sm">Share</button><button className="bos-btn-primary bos-btn-sm">Add task</button></div>
      </div>
    ),
  },
]

function Bento() {
  return (
    <Section
      id="bento"
      kicker="Bento"
      title="Pages made of panels"
      intro="For home pages and dashboards: panels of a few set sizes in one grid, each with a title, a quiet View all, and its content. One family of type, sized for hierarchy: big medium-weight titles, medium item names, regular muted detail. Same gap and padding everywhere."
    >
      <div className="gd-bento-stage">
        <BentoDemo />
      </div>
      <h3 className="bos-h3 gd-sub-sm">Another mix: an agent overview</h3>
      <p className="bos-caption gd-learn-note">bos-metric-tabs switch the chart, bos-figure for a big number with its unit, bos-bars for things running side by side, bos-flow for a workflow, bos-feature with a preview on top, bos-media cards, and one data-glow panel per page. Pick the metric pills to see the chart change.</p>
      <div className="gd-bento-stage">
        <BentoAgentsDemo />
      </div>
      <div className="gd-learn-rules">
        <div className="bos-tile"><div className="bos-label">Sizes</div><p className="bos-caption" style={{ margin: "6px 0 0" }}>bos-bento is 12 columns. Panels span 3, 4, 6, 8 or 12 (bos-span-*) and can be two rows tall (bos-tall). Thirds and quarters become halves on tablets and everything stacks on phones.</p></div>
        <div className="bos-tile"><div className="bos-label">Inside a panel</div><p className="bos-caption" style={{ margin: "6px 0 0" }}>bos-panel-head with bos-panel-title and a bos-link-pill. Items are bos-inner tiles: bos-event, bos-person. Facts go in bos-chip-meta with an icon; people in bos-avatars.</p></div>
        <div className="bos-tile"><div className="bos-label">Restraint</div><p className="bos-caption" style={{ margin: "6px 0 0" }}>At most one highlighted item per panel (data-tone="now"). Long lists scroll inside the panel and fade at the bottom. Every panel answers one question.</p></div>
      </div>
    </Section>
  )
}

function Learning() {
  return (
    <Section
      id="learn"
      kicker="Interactive"
      title="Quizzes, challenges and lessons"
      intro="For apps where people learn, practise and get graded. Each piece shows its state clearly: what's selected, what was right, what was wrong, how far along you are and how long is left. Answer the quiz below to see every state."
    >
      <div className="gd-learn">
        <div>
          <h3 className="bos-h3 gd-sub-sm">Quiz, exam or challenge question</h3>
          <p className="bos-caption gd-learn-note">bos-quiz, bos-track, bos-options, bos-feedback, bos-tally, bos-timer, then bos-result at the end</p>
          <QuizDemo />
        </div>
        <div>
          <h3 className="bos-h3 gd-sub-sm">Answer graded by an assistant</h3>
          <p className="bos-caption gd-learn-note">bos-graded, bos-grading while it works, then bos-score and bos-rubric</p>
          <GradedDemo />
        </div>
      </div>
      <h3 className="bos-h3 gd-sub-sm">Lesson page</h3>
      <p className="bos-caption gd-learn-note">bos-learn: the lesson (bos-video) with the module beside it (bos-ring, bos-lessons). The module moves under the lesson on smaller screens.</p>
      <LessonDemo />
      <h3 className="bos-h3 gd-sub-sm">Small pieces</h3>
      <SmallPieces />
      <div className="gd-learn-rules">
        <div className="bos-tile"><div className="bos-label">Modal or side panel?</div><p className="bos-caption" style={{ margin: "6px 0 0" }}>A modal for a short decision that stops everything (confirm, rename, submit an exam). A side panel (Sheet) when people need to see the page behind it: a use case's details, a lesson's notes, a row they are editing.</p></div>
        <div className="bos-tile"><div className="bos-label">Right and wrong</div><p className="bos-caption" style={{ margin: "6px 0 0" }}>Never colour alone: every outcome has an icon and words ("Correct", "Not quite"). Show the right answer after a wrong one, and say why.</p></div>
        <div className="bos-tile"><div className="bos-label">Time and progress</div><p className="bos-caption" style={{ margin: "6px 0 0" }}>Show where people are (question 3 of 10, lesson 3 of 5) and how long is left. The timer turns amber in the last minute, and nothing moves on its own without warning.</p></div>
      </div>
    </Section>
  )
}

function SetupDetails() {
  const { mode, setMode } = React.useContext(ModeContext)
  const [choice, setChoice] = React.useState<"light" | "dark" | "system">("system")
  const pick = (c: "light" | "dark" | "system") => {
    setChoice(c)
    if (c === "system") {
      let dark = false
      try { dark = window.matchMedia("(prefers-color-scheme: dark)").matches } catch {}
      setMode(dark ? "dark" : "light")
    } else setMode(c)
  }
  const wide = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="168" height="32" viewBox="0 0 168 32"><rect width="32" height="32" rx="9" fill="#5b6cff"/><text x="44" y="22" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#5b6cff">Northwind Co.</text></svg>')
  const mark = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" rx="9" fill="#5b6cff"/></svg>')
  return (
    <>
      <h3 className="bos-h2 gd-sub">Logos, light and dark, and phones</h3>
      <p className="bos-lead gd-intro" style={{ marginBottom: 20 }}>Three things every app gets right without extra work.</p>
      <div className="gd-learn-rules" style={{ marginTop: 0 }}>
        <div className="bos-tile">
          <div className="bos-label">Logos keep their shape</div>
          <p className="bos-caption" style={{ margin: "6px 0 14px" }}>32px tall, up to 180px wide. A collapsed sidebar shows the square mark.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="bos-brand"><img src={wide} alt="Northwind Co." /></span>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}><span className="bos-brand"><img src={mark} alt="" style={{ width: 32 }} /></span><span className="bos-caption">collapsed sidebar</span></span>
          </div>
          <code className="bos-caption" style={{ display: "block", marginTop: 12 }}>bos-logo-wide · bos-logo-mark</code>
        </div>
        <div className="bos-tile">
          <div className="bos-label">Follows the computer</div>
          <p className="bos-caption" style={{ margin: "6px 0 14px" }}>Light or dark matches the computer's setting until someone picks one. Try it: this page switches too.</p>
          <div className="bos-segmented" role="group" aria-label="Theme">
            {(["light", "dark", "system"] as const).map((c) => (
              <button key={c} type="button" aria-pressed={choice === c} onClick={() => pick(c)}>{c[0].toUpperCase() + c.slice(1)}</button>
            ))}
          </div>
          <code className="bos-caption" style={{ display: "block", marginTop: 12 }}>brandos-theme.js · now {mode}</code>
        </div>
        <div className="bos-tile">
          <div className="bos-label">Made for phones too</div>
          <p className="bos-caption" style={{ margin: "6px 0 0" }}>Below 560px: tighter spacing, two stats per row, full-width buttons at the end of each card, and no icons left sitting alone. Every example on this page does it; narrow the window to see.</p>
        </div>
      </div>
    </>
  )
}

function Heroes() {
  return (
    <Section
      id="heroes"
      kicker="Page tops"
      title="Pick the top of a page by what it's for"
      intro="Ask what a person does first on the page, then start from the matching pattern. Every pattern uses the same title size, width and shell, so apps match where it matters and differ where the job differs."
    >
      <div className="gd-heroes">
        {HEROES.map((h) => (
          <article key={h.id} className="gd-hero-card">
            <header>
              <h3 className="bos-h3">{h.name}</h3>
              <code>{h.cls}</code>
            </header>
            <div className="gd-hero-stage">{h.demo}</div>
            <dl className="gd-hero-rules">
              <div><dt>Use when</dt><dd>{h.when}</dd></div>
              <div><dt>Avoid</dt><dd>{h.avoid}</dd></div>
            </dl>
          </article>
        ))}
      </div>

      <h3 className="bos-h2 gd-sub">Two shells, chosen by what the app is for</h3>
      <p className="bos-lead gd-intro" style={{ marginBottom: 20 }}>
        Ask why people open the app. If they come to look around and find things, use the top bar. If they come to get one job done and the rest is there when needed, use the sidebar, so the work draws the eye and the navigation stays quiet. Both use the same brand block, active style, user menu, width and spacing.
      </p>
      <div className="gd-shell-choice">
        <div className="bos-tile"><div className="bos-label">Top bar · bos-shell</div><p className="bos-caption" style={{ margin: "6px 0 0" }}>Browse, search and explore: a library, a knowledge base, a catalogue of assistants. Up to six main pages; More only when there are more.</p></div>
        <div className="bos-tile"><div className="bos-label">Sidebar · bos-app</div><p className="bos-caption" style={{ margin: "6px 0 0" }}>One main job: training, a delivery tracker, a build pipeline. Collapses to icons so the work gets the room; becomes a sheet on phones.</p></div>
      </div>
      <h4 className="bos-h3 gd-sub-sm">Top bar, for apps people explore</h4>
      <div className="gd-browser">
        <div className="gd-browser-bar" aria-hidden="true"><span /><span /><span /></div>
        <div className="gd-browser-page gd-shell-demo">
          <div className="gd-browser-glow" aria-hidden="true" />
          <header className="bos-shell bos-glass">
            <a className="bos-brand" href="#heroes">
              <span className="bos-charm bos-charm-sm" aria-hidden="true" />
              <span>Watchtower<small>Delivery</small></span>
            </a>
            <nav className="bos-nav" aria-label="Example main">
              <ul className="bos-nav-list">
                <li><a href="#heroes" aria-current="page">Dashboard</a></li>
                <li><a href="#heroes">Projects</a></li>
                <li><a href="#heroes">Customers</a></li>
                <li><a href="#heroes">RFPs</a></li>
              </ul>
              <details className="bos-menu-wrap bos-nav-more">
                <summary>More</summary>
                <div className="bos-menu bos-menu-cols">
                  <div className="bos-menu-group" data-mobile>
                    <span className="bos-menu-label">Main</span>
                    <a href="#heroes" aria-current="page">Dashboard</a>
                    <a href="#heroes">Projects</a>
                    <a href="#heroes">Customers</a>
                    <a href="#heroes">RFPs</a>
                  </div>
                  <div className="bos-menu-group">
                    <span className="bos-menu-label">Work</span>
                    <a href="#heroes">People</a>
                    <a href="#heroes">Funding</a>
                  </div>
                  <div className="bos-menu-group">
                    <span className="bos-menu-label">Resources</span>
                    <a href="#heroes">Documents</a>
                    <a href="#heroes">Content library</a>
                  </div>
                </div>
              </details>
            </nav>
            <div className="bos-actions">
              <button className="bos-btn-glass bos-btn-sm" type="button" aria-label="Search"><Search size={16} /></button>
              <button className="bos-btn-primary bos-btn-sm" type="button">Create</button>
              <details className="bos-menu-wrap bos-menu-end">
                <summary aria-label="Account"><span className="bos-avatar" style={{ width: 32, height: 32, fontSize: 13 }}>SR</span></summary>
                <div className="bos-menu">
                  <span className="bos-menu-label">Sam Rivera</span>
                  <a href="#heroes">Settings</a>
                  <a href="#heroes">Administration</a>
                  <a href="#heroes">AI models</a>
                  <hr />
                  <button type="button">Sign out</button>
                </div>
              </details>
            </div>
          </header>
          <div className="bos-page" style={{ paddingTop: 40, paddingBottom: 8 }}>
            <div className="bos-hero-compact">
              <h3 className="bos-h1">Good afternoon, Sam</h3>
              <p className="bos-lead">Three things need you. Start with the first.</p>
            </div>
            <ol className="bos-queue">
              <li><div><div className="bos-h3">Confirm the cutover plan</div><p>Atlas migration · 2 days late</p></div><button className="bos-btn-primary bos-btn-sm">Open task</button></li>
              <li><div><div className="bos-h3" style={{ fontSize: 16 }}>Review the data model</div><p>Due today</p></div><button className="bos-btn-glass bos-btn-sm">Open task</button></li>
            </ol>
          </div>
        </div>
      </div>

      <h4 className="bos-h3 gd-sub-sm">Sidebar, for apps with one main job (try the collapse button)</h4>
      <div className="gd-browser">
        <div className="gd-browser-bar" aria-hidden="true"><span /><span /><span /></div>
        <div className="gd-browser-page">
          <div className="gd-browser-glow" aria-hidden="true" />
          <SidebarShellDemo />
        </div>
      </div>

      <SetupDetails />

      <h3 className="bos-h2 gd-sub">The layout system</h3>
      <p className="bos-lead gd-intro" style={{ marginBottom: 20 }}>
        Every page uses the same width, margins, gaps, padding and corners. What goes inside changes from page to page; these never do.
      </p>
      <div className="gd-layout-spec">
        {[
          ["--page-max", "1680px", "Width of every page and the nav bar"],
          ["--page-gutter", "12 to 24px", "Left and right page margin, kept slim"],
          ["--page-top", "48px", "Nav bar to the page title"],
          ["--section-gap", "64px", "Between sections"],
          ["--block-gap", "24px", "Section title to content, and between cards"],
          ["--pad-card", "28px", "Inside solid surfaces"],
          ["--pad-tile", "24px", "Inside tiles and glass panels"],
          ["--pad-row", "16px 20px", "Inside rows and queue items"],
          ["--radius-control", "pill", "Buttons, inputs, chips, nav"],
          ["--radius-card", "24px", "Surfaces, tiles, tables"],
          ["--radius-row", "18px", "Rows and queue items"],
          ["--radius-inner", "14px", "Anything inside a card"],
        ].map(([k, v, d]) => (
          <div key={k} className="gd-layout-row">
            <code>{k}</code>
            <strong>{v}</strong>
            <span>{d}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ component library */

// Extra context for demos that are hard to read at a glance.
const NOTES: Record<string, string> = {
  direction: "Shown in Arabic, which reads right to left: text aligns right, the button sits on the left, and the slider fills from the right edge. Wrap a page in Direction and every component flips like this.",
  combobox: "Type to filter, or open the list with the arrow. The list floats above the page.",
  "input-otp": "One box per character; typing moves to the next box.",
  resizable: "Drag the handle between the panels.",
}

function ComponentLibrary() {
  const [q, setQ] = React.useState("")
  const list = COMPONENTS.filter((c) => !q || `${c.name} ${c.description}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <Section
      id="components"
      kicker="Component library"
      title={`All ${COMPONENTS.length} components`}
      intro="The React kit, rendered live. The CSS kit ships the same markup for any framework, and PrimeVue apps get the same look through the BrandOS preset. Try them: menus open, dialogs open, toasts appear."
    >
      <div className="bos-filters" style={{ marginBottom: 24 }}>
        <input className="gd-input" placeholder={`Search ${COMPONENTS.length} components`} aria-label="Search components" value={q} onChange={(e) => setQ(e.target.value)} />
        <span className="bos-caption">{list.length} shown</span>
      </div>
      <nav className="gd-index" aria-label="Component index">
        {list.map((c) => (
          <a key={c.slug} href={`#c-${c.slug}`} className="bos-chip">
            {c.name}
          </a>
        ))}
      </nav>
      <div className="gd-components">
        {list.map((c) => {
          const Demo = demos[`../docs/demos/${c.slug}.tsx`]?.default
          return (
            <article key={c.slug} id={`c-${c.slug}`} className="gd-comp">
              <header>
                <h3 className="bos-h3">{c.name}</h3>
                <div className="bos-meta" style={{ marginTop: 0 }}>
                  {c.glass && <span className="bos-chip">Glass</span>}
                  {c.isNew && <span className="bos-pill">New</span>}
                </div>
              </header>
              <p className="bos-caption gd-comp-desc">{c.description}</p>
              <div className="gd-comp-stage">{Demo ? <ErrorBoundary name={c.name}><Demo /></ErrorBoundary> : <span className="bos-caption">See the docs site for this one.</span>}</div>
              {NOTES[c.slug] && <p className="bos-caption gd-comp-note">{NOTES[c.slug]}</p>}
            </article>
          )
        })}
      </div>
    </Section>
  )
}

class ErrorBoundary extends React.Component<{ name: string; children: React.ReactNode }, { err: boolean }> {
  state = { err: false }
  static getDerivedStateFromError() {
    return { err: true }
  }
  render() {
    return this.state.err ? <span className="bos-caption">{this.props.name} needs a live app to render.</span> : this.props.children
  }
}

/* ------------------------------------------------------------------ example page */

function ExamplePage() {
  return (
    <Section id="example" kicker="Putting it together" title="A full page" intro="An app home built only from the patterns above: the sidebar shell for an app with one main job, the shared title block, and bento panels. This is the layout pages are migrated to.">
      <div className="gd-browser">
        <div className="gd-browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="gd-browser-page">
          <div className="gd-browser-glow" aria-hidden="true" />
          <ExampleApp />
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ rules */

const DOS: [string, string][] = [
  ["One shell, chosen by purpose", "A top bar for apps people explore, a collapsible sidebar for apps with one main job. Never both."],
  ["One layout system", "Same page width, margins, gaps, padding and corners in every app. Pages differ in content, never in these."],
  ["Pick the page top by purpose", "Queue, overview, search, assistant, record or welcome. The title block itself is the same everywhere."],
  ["Bento for homes and dashboards", "Panels of set sizes; spans in a row add up to 12; every panel answers one question."],
  ["One font family", "Size and weight make the hierarchy: big medium titles, medium names, regular muted detail."],
  ["One solid surface per section", "The most important thing gets a white card. Everything around it is glass."],
  ["Neutrals first", "About 90% of a page is neutral. Brand colour marks the primary action, the current page, focus and the person's own status."],
  ["Hover on everything clickable", "And nothing else. Static cards never move or change colour."],
  ["Chat boxes at the bottom", "Docked to the bottom of the screen, with an assistant picker so switching never means going home."],
  ["Show right, wrong and progress clearly", "An icon and words, never colour alone. Always say where people are and how long is left."],
]
const DONTS: [string, string][] = [
  ["Colours or fonts outside the brand", "brandos audit and verify fail on any colour that isn't a brand hue or a neutral, and any font that isn't the brand's."],
  ["Pill corners on big boxes", "Pills are for buttons, inputs, chips and the nav. Dialogs, menus and cards use card corners or they turn into ovals."],
  ["Square corners inside rounded ones", "Anything with a background inside a rounded box takes its corners from it."],
  ["Bold headings or a second family", "No serif or display font unless the brand opts in."],
  ["A More menu with one item", "More only appears with more than six main pages."],
  ["Extra gradients and glows", "One brand band and at most one glow per page. No gradient text."],
  ["Text cut off or sideways scrolling", "Whole words always show, at every width. verify checks it."],
]

function Rules() {
  return (
    <Section id="rules" kicker="Rules" title="Do and don't" intro="The ui-migrate skill applies these on every page, and brandos verify checks the colours, fonts, hover, corners, cut-off text and sideways scrolling automatically.">
      <div className="bos-grid-2">
        <div className="bos-surface">
          <h3 className="bos-h3 gd-rule-head">
            <span className="bos-charm bos-charm-sm bos-charm-soft" aria-hidden="true">
              <Check />
            </span>
            Do
          </h3>
          <ul className="gd-rules">
            {DOS.map(([t, d]) => (
              <li key={t}>
                <strong>{t}</strong>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bos-glass gd-rules-card">
          <h3 className="bos-h3 gd-rule-head">
            <span className="bos-charm bos-charm-sm bos-charm-leaf gd-charm-neutral" aria-hidden="true">
              <X />
            </span>
            Don't
          </h3>
          <ul className="gd-rules">
            {DONTS.map(([t, d]) => (
              <li key={t}>
                <strong>{t}</strong>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bos-band">
        <div>
          <h3 className="bos-h2">Bring your own brand</h3>
          <p>Open the studio, add your brand guide or design system and your fonts, and download a brand pack. Everything on this page follows.</p>
        </div>
        <a className="bos-btn-glass bos-btn-lg" href="#how">
          Start with step one
        </a>
      </div>
    </Section>
  )
}
