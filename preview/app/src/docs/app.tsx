import * as React from "react"
import { useTheme } from "next-themes"
import { MenuIcon, MoonIcon, SearchIcon, SunIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Toaster as BaseToaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { COMPONENTS, DOC_PAGES } from "./registry"
import { ComponentPage, ComponentsIndex, DocPage, HomePage } from "./pages"

/* ---------------- routing ---------------- */

export type Route =
  | { kind: "home" }
  | { kind: "doc"; slug: string }
  | { kind: "components" }
  | { kind: "component"; slug: string }

function parse(hash: string): Route {
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean)
  if (parts[0] !== "docs") return { kind: "home" }
  if (parts[1] === "components" && parts[2]) return { kind: "component", slug: parts[2] }
  if (parts[1] === "components") return { kind: "components" }
  return { kind: "doc", slug: parts[1] ?? "introduction" }
}

export const href = {
  home: "#/",
  doc: (slug: string) => `#/docs/${slug}`,
  components: "#/docs/components",
  component: (slug: string) => `#/docs/components/${slug}`,
}

function useRoute() {
  const [route, setRoute] = React.useState<Route>(() => parse(window.location.hash))
  React.useEffect(() => {
    const onHash = () => {
      setRoute(parse(window.location.hash))
      window.scrollTo({ top: 0 })
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])
  return route
}

/* ---------------- brand ---------------- */

// `brandos preview` injects window.BRANDOS_BRAND and the client's theme.css.
// Then the preview shows only that brand; its :root tokens override the defaults.
declare global {
  interface Window {
    BRANDOS_BRAND?: { name: string }
  }
}
const CUSTOM = typeof window !== "undefined" ? window.BRANDOS_BRAND : undefined
export const BRANDS: readonly { id: string; label: string }[] = CUSTOM
  ? [{ id: "custom", label: CUSTOM.name }]
  : [
      { id: "generic", label: "Generic" },
      { id: "northwind", label: "Northwind (demo client)" },
    ]
export type BrandId = string

const BrandContext = React.createContext<{ brand: BrandId; setBrand: (b: BrandId) => void }>({
  brand: "generic",
  setBrand: () => {},
})
export const useBrand = () => React.useContext(BrandContext)

function readBrand(): BrandId {
  if (CUSTOM) return "custom"
  try {
    const b = localStorage.getItem("glass-ui-brand")
    if (b && BRANDS.some((x) => x.id === b)) return b as BrandId
  } catch {}
  return "generic"
}

/* ---------------- shell ---------------- */

export function App() {
  const route = useRoute()
  const [brand, setBrandState] = React.useState<BrandId>(readBrand)
  const setBrand = React.useCallback((b: BrandId) => {
    setBrandState(b)
    try {
      localStorage.setItem("glass-ui-brand", b)
    } catch {}
  }, [])
  React.useEffect(() => {
    document.documentElement.dataset.brand = brand
  }, [brand])

  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      <TooltipProvider delay={300}>
        <div className="backdrop-mesh fixed inset-0 -z-10 opacity-70 dark:opacity-60" aria-hidden />
        <SiteHeader route={route} />
        {route.kind === "home" ? (
          <HomePage />
        ) : (
          <DocsLayout route={route} />
        )}
        <SiteFooter />
        <BaseToaster />
        <SonnerToaster position="bottom-center" />
      </TooltipProvider>
    </BrandContext.Provider>
  )
}

function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6", className)} aria-hidden>
      <circle cx="9" cy="12" r="7" className="fill-primary" />
      <circle cx="15" cy="12" r="7" className="fill-foreground/15 stroke-background" strokeWidth="1" />
    </svg>
  )
}

const NAV = [
  { label: "Docs", href: href.doc("introduction"), match: (r: Route) => r.kind === "doc" && r.slug !== "theming" && r.slug !== "brand-themes" },
  { label: "Components", href: href.components, match: (r: Route) => r.kind === "components" || r.kind === "component" },
  { label: "Theming", href: href.doc("theming"), match: (r: Route) => r.kind === "doc" && (r.slug === "theming" || r.slug === "brand-themes") },
]

function SiteHeader({ route }: { route: Route }) {
  const [searchOpen, setSearchOpen] = React.useState(false)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 px-4 pt-3">
      <div className="glass mx-auto flex h-14 max-w-[1400px] items-center gap-2 rounded-full border px-2 pl-4">
        <MobileNav route={route} />
        <a href={href.home} className="flex items-center gap-2.5 pr-2 font-semibold tracking-tight">
          <Logo />
          <span>Glass UI</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
          {NAV.map((n) => {
            const active = n.match(route)
            return (
              <a
                key={n.label}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-background text-foreground shadow-[0_1px_2px_oklch(0_0_0/8%)]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {n.label}
              </a>
            )
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="glass-thin text-muted-foreground hover:text-foreground hidden h-10 w-64 items-center gap-2 rounded-full border px-3.5 text-sm transition-colors lg:flex"
          >
            <SearchIcon className="size-4" />
            <span>Search components</span>
            <Kbd className="ml-auto">⌘K</Kbd>
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon />
          </Button>
          <BrandSelect />
          <ThemeToggle />
          <Button render={<a href={href.doc("installation")} />} nativeButton={false} className="hidden sm:inline-flex">
            Get started
          </Button>
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}

export function BrandSelect({ className }: { className?: string }) {
  const { brand, setBrand } = useBrand()
  const items = BRANDS.map((b) => ({ label: b.label, value: b.id }))
  return (
    <Select items={items} value={brand} onValueChange={(v) => v && setBrand(v as BrandId)}>
      <SelectTrigger aria-label="Brand theme" className={cn("hidden w-auto min-w-36 sm:flex", className)}>
        <span
          aria-hidden
          className="bg-primary size-3 shrink-0 rounded-full ring-2 ring-background"
        />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((i) => (
          <SelectItem key={i.value} value={i.value}>
            {i.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const dark = resolvedTheme === "dark"
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const go = (to: string) => {
    window.location.hash = to
    onOpenChange(false)
  }
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search docs and components" />
      <CommandList>
        <CommandEmpty>Nothing matches that. Try a component name.</CommandEmpty>
        <CommandGroup heading="Docs">
          {DOC_PAGES.map((p) => (
            <CommandItem key={p.slug} onSelect={() => go(href.doc(p.slug))}>
              {p.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Components">
          {COMPONENTS.map((c) => (
            <CommandItem key={c.slug} onSelect={() => go(href.component(c.slug))}>
              {c.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

function SidebarNav({ route, onNavigate }: { route: Route; onNavigate?: () => void }) {
  const link = (to: string, label: string, active: boolean, isNew?: boolean) => (
    <a
      key={to}
      href={to}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors",
        active
          ? "bg-background text-foreground font-medium shadow-[0_1px_2px_oklch(0_0_0/8%)]"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      {isNew && <span className="text-primary text-[11px] font-medium">New</span>}
    </a>
  )
  return (
    <nav aria-label="Docs" className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col gap-0.5">
        <p className="text-muted-foreground px-3 pb-1.5 text-xs font-medium">Getting started</p>
        {DOC_PAGES.map((p) => link(href.doc(p.slug), p.name, route.kind === "doc" && route.slug === p.slug))}
        {link(href.components, "All components", route.kind === "components")}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-muted-foreground px-3 pb-1.5 text-xs font-medium">Components</p>
        {COMPONENTS.map((c) =>
          link(href.component(c.slug), c.name, route.kind === "component" && route.slug === c.slug, c.isNew)
        )}
      </div>
    </nav>
  )
}

function MobileNav({ route }: { route: Route }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <ScrollArea className="h-full">
          <div className="p-4 pt-14">
            <div className="mb-4 flex flex-col gap-0.5">
              {NAV.map((n) => (
                <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-full px-3 py-2 text-base font-medium">
                  {n.label}
                </a>
              ))}
            </div>
            <BrandSelect className="mb-6 flex w-full" />
            <SidebarNav route={route} onNavigate={() => setOpen(false)} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

function DocsLayout({ route }: { route: Exclude<Route, { kind: "home" }> }) {
  return (
    <div className="mx-auto grid max-w-[1400px] gap-10 px-4 pt-8 sm:px-6 lg:grid-cols-[230px_minmax(0,1fr)]">
      <aside className="sticky top-24 hidden h-[calc(100svh-7rem)] lg:block">
        <ScrollArea className="h-full pr-3">
          <SidebarNav route={route} />
        </ScrollArea>
      </aside>
      <main id="main" className="min-w-0 pb-24">
        {route.kind === "doc" && <DocPage slug={route.slug} />}
        {route.kind === "components" && <ComponentsIndex />}
        {route.kind === "component" && <ComponentPage slug={route.slug} />}
      </main>
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="text-muted-foreground mx-auto max-w-[1400px] px-6 py-10 text-sm">
      Built on Base UI and shadcn/ui's open-source components. Glass style and theme generator by BrandOS.
    </footer>
  )
}
