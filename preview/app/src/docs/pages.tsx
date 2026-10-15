import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { BRANDS, BrandSelect, href, useBrand } from "./app"
import { Code } from "./code"
import { COMPONENTS, DOC_PAGES, type DocEntry } from "./registry"
import { Showcase } from "./showcase"
import { THEME_CSS } from "./theme-source"

/* ---------------- sources ---------------- */

const demoModules = import.meta.glob("./demos/*.tsx", { eager: true }) as Record<
  string,
  { default: React.ComponentType }
>
const demoSources = import.meta.glob("./demos/*.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>
const uiSources = import.meta.glob("../components/ui/*.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>

const demoFor = (slug: string) => demoModules[`./demos/${slug}.tsx`]?.default
const demoSourceFor = (slug: string) =>
  (demoSources[`./demos/${slug}.tsx`] ?? "").replace(/@\/docs\/[^"]*/g, (m) => m)
const uiSourceFor = (file: string) => uiSources[`../components/ui/${file}.tsx`]

function exportsOf(src: string) {
  const m = src.match(/export \{([^}]*)\}/)
  if (!m) return []
  return m[1]
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith("type ") && !/^[a-z]/.test(s))
}

function depsOf(src: string) {
  const deps = new Set<string>()
  for (const m of src.matchAll(/from "([^"]+)"/g)) {
    const p = m[1]
    if (p.startsWith("@/") || p === "react") continue
    deps.add(p.startsWith("@") ? p.split("/").slice(0, 2).join("/") : p.split("/")[0])
  }
  return [...deps]
}

/* ---------------- shared bits ---------------- */

function PageTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{title}</h1>
      <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-pretty">{description}</p>
    </div>
  )
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-14 mb-4 scroll-mt-24 text-2xl font-semibold tracking-[-0.025em]">
      {children}
    </h2>
  )
}

function Pager({ prev, next }: { prev?: { label: string; to: string }; next?: { label: string; to: string } }) {
  return (
    <div className="mt-16 flex items-center justify-between gap-4">
      {prev ? (
        <Button variant="glass" render={<a href={prev.to} />} nativeButton={false}>
          <ArrowLeftIcon data-icon="inline-start" />
          {prev.label}
        </Button>
      ) : (
        <span />
      )}
      {next && (
        <Button variant="glass" render={<a href={next.to} />} nativeButton={false}>
          {next.label}
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      )}
    </div>
  )
}

function PreviewFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "backdrop-mesh border-border/70 relative flex min-h-[420px] w-full items-center justify-center overflow-hidden rounded-3xl border p-6 sm:p-10",
        className
      )}
    >
      <div className="relative flex w-full min-w-0 items-center justify-center">{children}</div>
    </div>
  )
}

/* ---------------- home ---------------- */

export function HomePage() {
  return (
    <main id="main">
      <section className="mx-auto max-w-[1400px] px-5 pt-20 pb-14 sm:px-8 sm:pt-28">
        <h1 className="max-w-5xl text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-balance">
          {window.BRANDOS_BRAND ? `${window.BRANDOS_BRAND.name}, on every component.` : "Components that just work."}{" "}
          <span className="text-muted-foreground">A look that is entirely yours.</span>
        </h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            Glass UI is shadcn/ui's accessible Base UI components with a liquid glass style on top. Change one theme
            file and every app follows your brand.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Button size="lg" render={<a href={href.components} />} nativeButton={false}>
              Browse components
            </Button>
            <Button size="lg" variant="glass" render={<a href={href.doc("theming")} />} nativeButton={false}>
              How theming works
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-3 sm:px-6">
        <div className="backdrop-mesh border-border/60 rounded-[2.5rem] border p-3 sm:p-6">
          <Showcase />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-10 px-5 pt-28 pb-10 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance">
          Behaviour, style and brand are separate files.{" "}
          <span className="text-muted-foreground">Swap any one without touching the others.</span>
        </h2>
        <dl className="grid gap-8 sm:grid-cols-3">
          {[
            ["Components", "Base UI handles focus, keyboard, ARIA and positioning. You own the code, copied into your app like shadcn/ui."],
            ["Glass style", "One CSS file sets how every component looks: surfaces, radii, spacing, motion. This is the Glass UI design language."],
            ["Brand theme", "About 30 colour, type and radius tokens. A new client is a new theme block, generated from their brand."],
          ].map(([t, d]) => (
            <div key={t} className="border-border flex flex-col gap-2 border-t pt-5">
              <dt className="font-semibold">{t}</dt>
              <dd className="text-muted-foreground text-sm leading-relaxed">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1400px] px-3 pt-16 pb-10 sm:px-6">
        <div className="bg-primary text-primary-foreground flex flex-wrap items-end justify-between gap-8 rounded-[2.5rem] p-8 sm:p-14">
          <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance">
            Try it with a different brand.
          </h2>
          <div className="flex items-center gap-3">
            <BrandSelect className="flex bg-background/90 text-foreground" />
          </div>
        </div>
      </section>
    </main>
  )
}

/* ---------------- docs pages ---------------- */

export function DocPage({ slug }: { slug: string }) {
  const idx = DOC_PAGES.findIndex((p) => p.slug === slug)
  const page = DOC_PAGES[idx] ?? DOC_PAGES[0]
  const prev = DOC_PAGES[idx - 1]
  const next = DOC_PAGES[idx + 1]
  return (
    <article className="max-w-3xl">
      <Crumbs items={[{ label: "Docs", to: href.doc("introduction") }]} current={page.name} />
      {slug === "installation" ? (
        <Installation />
      ) : slug === "theming" ? (
        <Theming />
      ) : slug === "brand-themes" ? (
        <BrandThemes />
      ) : (
        <Introduction />
      )}
      <Pager
        prev={prev && { label: prev.name, to: href.doc(prev.slug) }}
        next={next ? { label: next.name, to: href.doc(next.slug) } : { label: "Components", to: href.components }}
      />
    </article>
  )
}

function Crumbs({ items, current }: { items: { label: string; to: string }[]; current: string }) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {items.map((i) => (
          <React.Fragment key={i.to}>
            <BreadcrumbItem>
              <BreadcrumbLink href={i.to}>{i.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function Introduction() {
  return (
    <>
      <PageTitle
        title="Introduction"
        description="A component library you copy into your app, built so any brand can sit on top of it."
      />
      <div className="docs-prose mt-10">
        <p>
          Glass UI follows the shadcn/ui model. The components are not a package you install and fight with. They are
          source files that live in your project, built on <a href="https://base-ui.com">Base UI</a> for behaviour
          and accessibility. You get working focus management, keyboard support and screen reader labels for free,
          and you can change anything.
        </p>
        <p>
          On top of that sits the <strong className="text-foreground">Glass style</strong>: one CSS file that defines
          how every component looks. Floating layers like menus, dialogs and popovers use frosted glass. Everyday
          controls stay crisp and readable.
        </p>
        <p>
          Colour, type and radius come from a <strong className="text-foreground">brand theme</strong>. The token names
          are shadcn's, so any shadcn-compatible component or block works with every theme.
        </p>
      </div>
      <H2 id="principles">Design principles</H2>
      <ul className="grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-2">
        {[
          ["One thing wins the eye", "One primary action per view. Everything else steps back."],
          ["Colour means something", "Brand colour marks action and selection. Surfaces stay neutral."],
          ["Glass where it floats", "Frosted surfaces for things above the page, solid ones for content in it."],
          ["Labels you can see", "Every field has a visible label. Placeholders are examples, not names."],
          ["Copy that says what happens", "Buttons name the action. Errors say how to fix the problem."],
          ["Quiet motion", "Short, small movements. Nothing bounces, nothing performs."],
          ["Readable on every brand", "Text meets WCAG AA in every theme, light and dark, including on glass."],
        ].map(([t, d]) => (
          <li key={t} className="bg-card/70 flex flex-col gap-1 p-5 backdrop-blur">
            <span className="font-medium">{t}</span>
            <span className="text-muted-foreground text-sm leading-relaxed">{d}</span>
          </li>
        ))}
      </ul>
      <H2 id="included">What is included</H2>
      <div className="docs-prose">
        <p>
          {COMPONENTS.length} components, from Button to agent-era pieces like Trace, Questionnaire and Message
          Scroller. Two brand themes ship as examples: Generic and Northwind, a fictional client.
        </p>
      </div>
    </>
  )
}

function Installation() {
  return (
    <>
      <PageTitle title="Installation" description="Add Glass UI to a React app that uses Tailwind CSS v4." />
      <H2 id="deps">1. Install the shared dependencies</H2>
      <Code title="Terminal" code={`npm install @base-ui/react class-variance-authority clsx tailwind-merge lucide-react tw-animate-css`} />
      <H2 id="css">2. Add the theme and style</H2>
      <div className="docs-prose mb-4">
        <p>
          Copy <code>theme.css</code> and <code>style-glass.css</code> into your styles folder and import them from your
          global stylesheet. Put <code>class="style-glass"</code> on your <code>&lt;html&gt;</code> element.
        </p>
      </div>
      <Code
        title="app/globals.css"
        code={`@import "tailwindcss";
@import "tw-animate-css";
@import "./theme.css";
@import "./style-glass.css" layer(components);

@custom-variant dark (&:is(.dark *));`}
      />
      <H2 id="add">3. Add components</H2>
      <div className="docs-prose mb-4">
        <p>
          Add components with the shadcn CLI pointed at the Glass UI registry, or open any component page and copy the
          source from the Manual tab.
        </p>
      </div>
      <Code title="Terminal" code={`npx shadcn@latest add @glass-ui/button @glass-ui/card @glass-ui/dialog`} />
      <H2 id="brand">4. Pick a brand</H2>
      <div className="docs-prose">
        <p>
          Set <code>data-brand</code> on <code>&lt;html&gt;</code>, or replace the <code>:root</code> block in{" "}
          <code>theme.css</code> with your own. See <a href={href.doc("brand-themes")}>Brand themes</a>.
        </p>
      </div>
    </>
  )
}

const TOKENS: { name: string; note: string; fg?: string }[] = [
  { name: "background", note: "Page", fg: "foreground" },
  { name: "card", note: "Solid surfaces", fg: "card-foreground" },
  { name: "popover", note: "Fallback for floating layers", fg: "popover-foreground" },
  { name: "primary", note: "Main action, selection", fg: "primary-foreground" },
  { name: "secondary", note: "Secondary actions", fg: "secondary-foreground" },
  { name: "muted", note: "Quiet fills and supporting text", fg: "muted-foreground" },
  { name: "accent", note: "Hover and highlighted rows", fg: "accent-foreground" },
  { name: "destructive", note: "Irreversible actions, errors" },
  { name: "border", note: "Dividers and outlines" },
  { name: "input", note: "Field borders" },
  { name: "ring", note: "Focus ring" },
  { name: "glass", note: "Glass surfaces" },
  { name: "glass-strong", note: "Menus, dialogs, popovers" },
  { name: "glass-border", note: "Rim light on glass" },
]

function Theming() {
  return (
    <>
      <PageTitle
        title="Theming"
        description="Every colour is a CSS variable with shadcn's names, plus six glass tokens. Change them and every component follows."
      />
      <H2 id="tokens">Tokens</H2>
      <div className="docs-prose mb-6">
        <p>
          Surfaces pair with a <code>-foreground</code> token for the text on them. The values below are live, so they
          change with the brand and dark mode toggles in the header.
        </p>
      </div>
      <div className="overflow-hidden rounded-3xl border">
        {TOKENS.map((t, i) => (
          <div
            key={t.name}
            className={cn("bg-card/70 flex items-center gap-4 px-5 py-3 backdrop-blur", i > 0 && "border-t")}
          >
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold"
              style={{ background: `var(--${t.name})`, color: t.fg ? `var(--${t.fg})` : undefined }}
            >
              {t.fg ? "Aa" : ""}
            </span>
            <code className="font-mono text-sm">--{t.name}</code>
            <span className="text-muted-foreground ml-auto text-right text-sm">{t.note}</span>
          </div>
        ))}
      </div>
      <H2 id="contrast">Contrast</H2>
      <div className="docs-prose mb-6">
        <p>
          Contrast is a release rule, not a guideline. Every theme, light and dark, is checked against WCAG 2.2 AA
          before it ships, including text on glass over the brand backdrop. Run <code>npm run contrast</code> after
          editing a theme; it fails if any pair below misses its minimum.
        </p>
      </div>
      <div className="overflow-hidden rounded-3xl border">
        {[
          ["Body text and labels", "foreground and muted-foreground on every surface, glass included", "4.5 : 1"],
          ["Text on filled buttons", "primary-foreground on primary", "4.5 : 1"],
          ["Error text", "destructive on background and card", "4.5 : 1"],
          ["Large text", "24px and up, or 19px bold and up", "3 : 1"],
          ["Control edges", "input borders, checkbox and radio outlines, switch tracks", "3 : 1"],
          ["Focus ring", "ring against the page", "3 : 1"],
        ].map(([what, pair, min], i) => (
          <div key={what} className={cn("bg-card/70 flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-3.5 backdrop-blur", i > 0 && "border-t")}>
            <span className="font-medium">{what}</span>
            <span className="text-muted-foreground text-sm">{pair}</span>
            <span className="ml-auto font-mono text-sm tabular-nums">{min}</span>
          </div>
        ))}
      </div>
      <div className="docs-prose mt-6">
        <p>
          Disabled controls are exempt by WCAG, but still use <code>muted-foreground</code> so they stay legible. A
          brand colour that cannot reach 4.5 : 1 with white or near-black text is used for fills and accents only,
          never as a button background.
        </p>
      </div>
      <H2 id="radius">Radius</H2>
      <div className="docs-prose">
        <p>
          One <code>--radius</code> value scales the whole set, from <code>rounded-sm</code> to{" "}
          <code>rounded-4xl</code>. The Glass style leans round: pills for buttons and fields, large radii for cards
          and dialogs.
        </p>
      </div>
      <H2 id="source">The default theme</H2>
      <Code title="theme.css" code={THEME_CSS} maxHeight={420} />
    </>
  )
}

function BrandThemes() {
  const { brand, setBrand } = useBrand()
  return (
    <>
      <PageTitle
        title="Brand themes"
        description="A brand only overrides colour, type and radius. The components and the Glass style never change."
      />
      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {BRANDS.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setBrand(b.id)}
            aria-pressed={brand === b.id}
            data-brand={b.id}
            className={cn(
              "bg-card/80 flex flex-col items-start gap-4 rounded-3xl border p-5 text-left backdrop-blur transition-shadow",
              brand === b.id ? "ring-ring ring-2" : "hover:shadow-md"
            )}
          >
            <span className="flex gap-1.5">
              <span className="bg-primary size-7 rounded-full" />
              <span className="size-7 rounded-full" style={{ background: "var(--chart-2)" }} />
              <span className="size-7 rounded-full" style={{ background: "var(--chart-3)" }} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-semibold" style={{ fontFamily: "var(--font-sans)" }}>
                {b.label}
              </span>
              <span className="text-muted-foreground text-sm">
                {brand === b.id ? "In use on this site" : "Click to apply"}
              </span>
            </span>
          </button>
        ))}
      </div>
      <H2 id="brandos">From a brand to a theme</H2>
      <div className="docs-prose mb-6">
        <p>
          This is the job BrandOS automates: read a client's brand guidelines, website or Figma file, then write one
          theme block. Everything else in the app is reused as is.
        </p>
      </div>
      <Code
        title="theme.css"
        code={`[data-brand="northwind"] {
  --font-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --radius: 0.75rem;
  --primary: oklch(0.511 0.086 186.4);
  --primary-foreground: oklch(1 0 0);
  --ring: oklch(0.511 0.086 186.4);
  --chart-1: oklch(0.511 0.086 186.4);
  --chart-2: oklch(0.705 0.187 47.6);
  --backdrop-1: oklch(0.912 0.062 180.9);
  --backdrop-2: oklch(0.925 0.052 66.2);
  --backdrop-3: oklch(0.914 0.047 238.5);
}`}
      />
    </>
  )
}

/* ---------------- components ---------------- */

export function ComponentsIndex() {
  return (
    <article>
      <Crumbs items={[{ label: "Docs", to: href.doc("introduction") }]} current="Components" />
      <PageTitle
        title="Components"
        description={`${COMPONENTS.length} components. Each one is source you own, styled by Glass and themed by your brand.`}
      />
      <ul className="mt-12 grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
        {COMPONENTS.map((c) => (
          <li key={c.slug} className="border-border border-t">
            <a
              href={href.component(c.slug)}
              className="group flex items-center justify-between gap-3 py-4 text-lg font-medium tracking-tight"
            >
              <span className="flex items-center gap-2.5">
                {c.name}
                {c.isNew && <Badge variant="secondary">New</Badge>}
              </span>
              <ArrowRightIcon className="text-muted-foreground size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

export function ComponentPage({ slug }: { slug: string }) {
  const idx = COMPONENTS.findIndex((c) => c.slug === slug)
  const entry = COMPONENTS[idx]
  if (!entry) {
    return (
      <PageTitle title="Not found" description="That component does not exist. Pick one from the list on the left." />
    )
  }
  const Demo = demoFor(slug)
  const demoSrc = demoSourceFor(slug)
  const file = entry.file === undefined ? slug : entry.file
  const uiSrc = file ? uiSourceFor(file) : undefined
  const prev = COMPONENTS[idx - 1]
  const next = COMPONENTS[idx + 1]
  return (
    <article className="max-w-4xl">
      <Crumbs
        items={[
          { label: "Docs", to: href.doc("introduction") },
          { label: "Components", to: href.components },
        ]}
        current={entry.name}
      />
      <PageTitle title={entry.name} description={entry.description} />
      <Meta entry={entry} />

      <Tabs defaultValue="preview" className="mt-10">
        <TabsList variant="glass">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-3">
          <PreviewFrame>{Demo ? <Demo /> : <p className="text-muted-foreground">Demo coming soon.</p>}</PreviewFrame>
        </TabsContent>
        <TabsContent value="code" className="mt-3">
          <Code code={demoSrc} title={`${slug}-demo.tsx`} maxHeight={560} />
        </TabsContent>
      </Tabs>

      {uiSrc && <InstallSection slug={slug} file={file!} src={uiSrc} />}
      {!uiSrc && (
        <>
          <H2 id="installation">Installation</H2>
          <div className="docs-prose">
            <p>
              {entry.name} is a composition of other components, not a file of its own. Add the components it imports
              (see the Code tab) and copy the example.
            </p>
          </div>
        </>
      )}

      {(entry.base || entry.lib) && (
        <>
          <H2 id="api">API reference</H2>
          <div className="docs-prose">
            <p>
              Props and behaviour come from{" "}
              {entry.base ? (
                <a href={`https://base-ui.com/react/components/${entry.base}`}>the Base UI {entry.name} docs</a>
              ) : (
                <a href={entry.lib!.url}>{entry.lib!.name}</a>
              )}
              . Glass UI adds styling and, where noted, a <code>glass</code> variant.
            </p>
          </div>
        </>
      )}

      <Pager
        prev={prev && { label: prev.name, to: href.component(prev.slug) }}
        next={next && { label: next.name, to: href.component(next.slug) }}
      />
    </article>
  )
}

function Meta({ entry }: { entry: DocEntry }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {entry.base && (
        <Badge variant="glass" render={<a href={`https://base-ui.com/react/components/${entry.base}`} />}>
          Base UI
          <ArrowUpRightIcon data-icon="inline-end" />
        </Badge>
      )}
      {entry.lib && (
        <Badge variant="glass" render={<a href={entry.lib.url} />}>
          {entry.lib.name}
          <ArrowUpRightIcon data-icon="inline-end" />
        </Badge>
      )}
      {entry.glass && <Badge variant="secondary">Glass surface</Badge>}
    </div>
  )
}

function InstallSection({ slug, file, src }: { slug: string; file: string; src: string }) {
  const deps = depsOf(src)
  const names = exportsOf(src)
  return (
    <>
      <H2 id="installation">Installation</H2>
      <Tabs defaultValue="cli">
        <TabsList variant="line">
          <TabsTrigger value="cli">Command</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli" className="mt-4">
          <Code title="Terminal" code={`npx shadcn@latest add @glass-ui/${slug}`} />
        </TabsContent>
        <TabsContent value="manual" className="mt-4 flex flex-col gap-6">
          {deps.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium">Install the dependencies</p>
              <Code title="Terminal" code={`npm install ${deps.join(" ")}`} />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Copy the source into your project</p>
            <Code title={`components/ui/${file}.tsx`} code={src} maxHeight={420} />
          </div>
        </TabsContent>
      </Tabs>
      {names.length > 0 && (
        <>
          <H2 id="usage">Usage</H2>
          <Code
            title="tsx"
            code={`import {\n  ${names.join(",\n  ")},\n} from "@/components/ui/${file}"`}
          />
        </>
      )}
    </>
  )
}
