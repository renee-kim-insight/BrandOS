import * as React from "react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider, useTheme } from "next-themes"

import "@/styles/globals.css"
import "./brands.css"
import "@/styles/brandos-ui.css"
import "./guide.css"
import { Guide } from "./guide"

document.documentElement.classList.add("style-glass")

// Follow the host's theme when it sets data-theme on the root element; otherwise follow the system.
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
      <Guide />
    </ThemeProvider>
  </StrictMode>
)
