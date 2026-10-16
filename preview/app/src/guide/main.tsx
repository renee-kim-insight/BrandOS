import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "next-themes"

import "@/styles/globals.css"
import "./brands.css"
import "@/styles/brandos-ui.css"
import "./guide.css"
import { Guide } from "./guide"

document.documentElement.classList.add("style-glass")

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Guide />
    </ThemeProvider>
  </StrictMode>
)
