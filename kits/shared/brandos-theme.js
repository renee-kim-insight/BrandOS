/* BrandOS light and dark mode.
 * Follows the computer's light or dark setting, unless the person picks one (remembered on this device)
 * or the page fixes one with <html data-theme="light"> or data-theme="dark".
 * Load it in <head>, before the stylesheets, so the page never flashes the wrong mode:
 *   <script src="brandos/brandos-theme.js"></script>
 * Then, for a theme switch: BrandOSTheme.set("light" | "dark" | "system"); BrandOSTheme.get()
 */
(function () {
  var KEY = "brandos-theme"
  var root = document.documentElement
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null
  function stored() {
    try { return localStorage.getItem(KEY) || "system" } catch (e) { return "system" }
  }
  function apply() {
    var choice = root.getAttribute("data-theme") || stored()
    var dark = choice === "dark" || (choice === "system" && !!media && media.matches)
    root.classList.toggle("dark", dark)
    root.style.colorScheme = dark ? "dark" : "light"
  }
  apply()
  if (media) {
    if (media.addEventListener) media.addEventListener("change", apply)
    else if (media.addListener) media.addListener(apply)
  }
  window.BrandOSTheme = {
    get: stored,
    set: function (choice) {
      try { localStorage.setItem(KEY, choice) } catch (e) {}
      apply()
    },
  }
})()
