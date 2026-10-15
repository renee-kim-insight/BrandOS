import raw from "@/styles/theme.css?raw"

// Only the default (Generic) block, for display on the Theming page.
export const THEME_CSS = raw.slice(raw.indexOf(":root {"), raw.indexOf("/* ---------- Northwind")).trim()
