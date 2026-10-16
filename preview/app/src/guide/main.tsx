import * as React from "react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "next-themes"

import "@/styles/globals.css"
import "./brands.css"
import "@/styles/brandos-ui.css"
import "./guide.css"
import { Guide, ModeContext, type Mode } from "./guide"

const root = document.documentElement
root.classList.add("style-glass")

// Light or dark: the host's data-theme when it sets one, else the system setting.
// The page owns the switch itself (no storage), so it works inside sandboxed frames.
function initialMode(): Mode {
  const t = root.getAttribute("data-theme")
  if (t === "dark" || t === "light") return t
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  } catch {
    return "light"
  }
}

function App() {
  const [mode, setMode] = React.useState<Mode>(initialMode)
  React.useEffect(() => {
    const mo = new MutationObserver(() => {
      const t = root.getAttribute("data-theme")
      if (t === "dark" || t === "light") setMode(t)
    })
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] })
    return () => mo.disconnect()
  }, [])
  React.useLayoutEffect(() => {
    root.classList.toggle("dark", mode === "dark")
    root.classList.toggle("light", mode === "light")
    root.style.colorScheme = mode
  }, [mode])
  return (
    <ThemeProvider attribute="class" forcedTheme={mode} enableSystem={false}>
      <ModeContext.Provider value={{ mode, setMode }}>
        <Guide />
      </ModeContext.Provider>
    </ThemeProvider>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
