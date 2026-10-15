import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import * as React from "react"
import { ThemeProvider, useTheme } from "next-themes"

import "@/styles/globals.css"
import "@/docs/docs.css"
import { App } from "@/docs/app"

// The Glass style is scoped to .style-glass so portaled layers pick it up too.
document.documentElement.classList.add("style-glass")

// Hosts like the Claude app pass their theme as data-theme on the root element.
// Follow it when present, so the page never mixes light and dark tokens.
function HostThemeSync() {
  const { setTheme } = useTheme()
  React.useEffect(() => {
    const root = document.documentElement
    const apply = () => {
      const t = root.getAttribute("data-theme")
      if (t === "dark" || t === "light") setTheme(t)
    }
    apply()
    const mo = new MutationObserver(apply)
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] })
    return () => mo.disconnect()
  }, [setTheme])
  return null
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <HostThemeSync />
      <App />
    </ThemeProvider>
  </StrictMode>
)
