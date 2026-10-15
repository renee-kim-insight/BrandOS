/*
 * BrandOS preset for PrimeVue 4.
 *
 * Every PrimeVue colour, radius and focus ring points at the BrandOS theme variables
 * (--primary, --card, --border, ...) in theme.css. Change the brand by regenerating
 * theme.css; this file never needs editing. Light and dark both follow theme.css,
 * so dark mode is whatever selector theme.css uses (the installer lines it up).
 */
import { definePreset } from "@primeuix/themes"
import Aura from "@primeuix/themes/aura"

const mix = (a: string, pct: number, b: string) => `color-mix(in oklch, ${a} ${pct}%, ${b})`

// Tints and shades of a theme colour, for components that ask for primary.50 ... primary.950.
// 400 and 500 are the colour itself: Aura uses 500 in light mode and 400 in dark, and theme.css
// has already made each mode's value pass contrast.
const LIGHT = "oklch(0.99 0 0)"
const INK = "oklch(0.15 0.01 0)"
const ramp = (v: string) => ({
  // Like Aura's palettes, 50 is always the lightest and 950 the darkest, in both modes.
  50: mix(v, 8, LIGHT),
  100: mix(v, 16, LIGHT),
  200: mix(v, 32, LIGHT),
  300: mix(v, 55, LIGHT),
  400: v,
  500: v,
  600: mix(v, 85, INK),
  700: mix(v, 70, INK),
  800: mix(v, 55, INK),
  900: mix(v, 30, INK),
  950: mix(v, 10, INK),
})

// Greys from the brand's own tinted neutrals. Light: 0 is the card, 950 the text. Dark: inverted, as Aura expects.
// [step, % of text colour mixed in]. Pairs keep this safe under strict index checks (noUncheckedIndexedAccess).
const steps: ReadonlyArray<readonly [number, number]> = [
  [0, 0], [50, 3], [100, 6], [200, 12], [300, 22], [400, 40],
  [500, 52], [600, 62], [700, 72], [800, 82], [900, 90], [950, 96],
]
const surface = (dark: boolean) =>
  Object.fromEntries(steps.map(([step, pct]) => [step, dark ? mix("var(--foreground)", 100 - pct, "var(--background)") : mix("var(--foreground)", pct, "var(--card)")]))

const scheme = (dark: boolean) => ({
  surface: surface(dark),
  primary: {
    color: "var(--primary)",
    contrastColor: "var(--primary-foreground)",
    hoverColor: mix("var(--primary)", 88, "var(--foreground)"),
    activeColor: mix("var(--primary)", 78, "var(--foreground)"),
  },
  highlight: {
    background: mix("var(--primary)", dark ? 22 : 12, "transparent"),
    focusBackground: mix("var(--primary)", dark ? 30 : 20, "transparent"),
    color: "var(--foreground)",
    focusColor: "var(--foreground)",
  },
  mask: { background: dark ? "oklch(0 0 0 / 60%)" : "oklch(0.2 0.02 280 / 35%)", color: "var(--foreground)" },
  formField: {
    background: dark ? mix("var(--input)", 30, "var(--background)") : "var(--card)",
    disabledBackground: "var(--muted)",
    filledBackground: "var(--muted)",
    filledHoverBackground: "var(--muted)",
    filledFocusBackground: "var(--muted)",
    borderColor: "var(--input)",
    hoverBorderColor: mix("var(--input)", 70, "var(--foreground)"),
    focusBorderColor: "var(--ring)",
    invalidBorderColor: "var(--destructive)",
    color: "var(--foreground)",
    disabledColor: "var(--muted-foreground)",
    placeholderColor: "var(--muted-foreground)",
    invalidPlaceholderColor: "var(--destructive)",
    floatLabelColor: "var(--muted-foreground)",
    floatLabelFocusColor: "var(--primary)",
    floatLabelActiveColor: "var(--muted-foreground)",
    floatLabelInvalidColor: "var(--destructive)",
    iconColor: "var(--muted-foreground)",
    shadow: "none",
  },
  text: { color: "var(--foreground)", hoverColor: "var(--foreground)", mutedColor: "var(--muted-foreground)", hoverMutedColor: "var(--foreground)" },
  content: { background: "var(--card)", hoverBackground: "var(--accent)", borderColor: "var(--border)", color: "var(--card-foreground)", hoverColor: "var(--accent-foreground)" },
  overlay: {
    select: { background: "var(--popover)", borderColor: "var(--border)", color: "var(--popover-foreground)" },
    popover: { background: "var(--popover)", borderColor: "var(--border)", color: "var(--popover-foreground)" },
    modal: { background: "var(--popover)", borderColor: "var(--border)", color: "var(--popover-foreground)" },
  },
  list: {
    option: {
      focusBackground: "var(--accent)",
      selectedBackground: "{highlight.background}",
      selectedFocusBackground: "{highlight.focus.background}",
      color: "var(--popover-foreground)",
      focusColor: "var(--accent-foreground)",
      selectedColor: "var(--foreground)",
      selectedFocusColor: "var(--foreground)",
      icon: { color: "var(--muted-foreground)", focusColor: "var(--accent-foreground)" },
    },
    optionGroup: { background: "transparent", color: "var(--muted-foreground)" },
  },
  navigation: {
    item: {
      focusBackground: "var(--accent)",
      activeBackground: "var(--accent)",
      color: "var(--foreground)",
      focusColor: "var(--accent-foreground)",
      activeColor: "var(--accent-foreground)",
      icon: { color: "var(--muted-foreground)", focusColor: "var(--accent-foreground)", activeColor: "var(--accent-foreground)" },
    },
    submenuLabel: { background: "transparent", color: "var(--muted-foreground)" },
    submenuIcon: { color: "var(--muted-foreground)", focusColor: "var(--accent-foreground)", activeColor: "var(--accent-foreground)" },
  },
})

export const BrandOSPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: "0",
      xs: "calc(var(--radius) * 0.25)",
      sm: "calc(var(--radius) * 0.4)",
      md: "calc(var(--radius) * 0.6)",
      lg: "calc(var(--radius) * 0.8)",
      xl: "var(--radius)",
    },
    // Severities follow the colour budget: "danger" is the brand's destructive colour, "success" is the
    // brand colour, and "info" is neutral. Nothing renders stock green, blue or sky.
    red: ramp("var(--destructive)"),
    green: ramp("var(--primary)"),
    emerald: ramp("var(--primary)"),
    blue: ramp("var(--muted-foreground)"),
    sky: ramp("var(--muted-foreground)"),
  },
  semantic: {
    primary: ramp("var(--primary)"),
    focusRing: { width: "2px", style: "solid", color: "var(--ring)", offset: "2px", shadow: "none" },
    formField: { focusRing: { width: "0", style: "none", color: "transparent", offset: "0", shadow: "0 0 0 3px color-mix(in oklch, var(--ring) 35%, transparent)" } },
    colorScheme: { light: scheme(false), dark: scheme(true) },
  },
  components: {
    // Progress is muted by default. Give the user's one main progress bar class="bos-progress-primary".
    progressbar: { root: { background: "var(--progress-track)" }, value: { background: "var(--progress-fill)" }, label: { color: "var(--progress-fill-foreground)" } },
  },
})

export default BrandOSPreset
