# Changelog

BrandOS uses semantic versioning: patch (1.0.x) for fixes and rule changes, minor (1.x.0) for new features, major (x.0.0) for breaking changes.

## 1.5.0

Fixes from review: plain HTML pages, dark mode, logos, the checks, and phones.

- **Plain HTML:** `brandos-ui.css` now includes a light reset (box sizing, body margin, images and code that fit their box), so plain pages no longer scroll sideways. It has zero specificity, so an app's own reset still wins.
- **Heroes:** a hero written as a `<section>` splits into columns like a `<div>` does. Only unclassed sections inside `bos-page` stack.
- **Dark mode:** new `brandos-theme.js` follows the computer's light or dark setting, remembers a person's choice and offers `BrandOSTheme.set("light" | "dark" | "system")`. Install copies it and says where to load it.
- **Logos:** wide logos keep their shape (32px tall, up to 180px wide). A collapsible sidebar can show a square mark when collapsed (`bos-logo-wide` and `bos-logo-mark`).
- **audit:** elements styled with BrandOS classes are no longer counted as hand-built UI.
- **verify:** Playwright comes with BrandOS (`playwright-core`), and verify uses the Chrome or Edge already on the computer when Playwright's own browser isn't installed.
- **Phones:** below 560px the spacing and padding tighten, stats sit two to a row, card actions go full width so every card ends the same way, and decorative icons that would sit alone on a line are dropped.

## 1.4.3

No more serif sneaking in.

- `--font-display` now follows the body font unless the brand opts in (`typography.headings: "display"`), so apps that style headings with `var(--font-display)` or Tailwind's `font-display` get the sans too.
- The palette lock leaves out a display font the brand hasn't opted in to, so `audit` and `verify` flag it if an app still uses it.
- Installing from a brand pack rebuilds `theme.css` and `palette.json` from the pack's brand.json with the current BrandOS, so packs made before 1.3 pick up the one-family rule without being made again.

## 1.4.2

- Fix: the counter, timer, meta chips, status pills, score and segmented control keep their own width instead of stretching across a card.

## 1.4.1

The component guide is up to date with everything since 1.2.

- How it works now shows the real flow: studio, brand pack, install --pack, migrate, verify, with the real commands.
- Fonts, the type table and the stat notes describe one font family with size and weight doing the hierarchy.
- Fix: panel titles no longer push View all onto a second line on phones.
- A full page is now an app home: the sidebar shell, the shared title block and bento panels.
- The do and don't rules cover the shells, layout system, page tops, bento, chat boxes, interactive states, corners, More and verify's checks.

## 1.4.0

Bento pages and a softer type hierarchy.

### Bento
- New `bos-bento` grid: 12 columns, panels spanning 3, 4, 6, 8 or 12 (`bos-span-*`), optionally two rows tall (`bos-tall`). On tablets panels sit two to a row and a lone panel fills its row, so there are never holes; on phones they stack.
- New `bos-panel` with `bos-panel-head`, `bos-panel-title` and `bos-link-pill` ("View all"), plus `bos-panel-scroll` for long lists that fade at the bottom.
- New items: `bos-inner` tiles, `bos-event` (title, one line, times and dates, who's going, one highlighted "now" event per panel) and `bos-person` cards in a `bos-people` grid.
- New for dashboards and feature pages: `bos-feature` (a live preview on top, then a title and a line), `bos-figure` (a big number with its unit), `bos-metric-tabs` (pills that switch what a chart shows) and a `bos-chart` frame, `bos-icon-badge`, `bos-bars` (several things running side by side), `bos-flow` (a workflow, top to bottom on phones), `bos-media` (picture cards) and `data-glow` (one soft brand light per page).
- New small pieces: `bos-chip-meta` (icon and a fact), `bos-avatars` (stacked people with a count), `bos-status` (dot and a word, in positive, waiting or negative tones).

### Type
- Headings and item titles are medium weight (500) instead of bold, so size makes the hierarchy: big titles, medium names, regular muted detail. `typography.headingWeight` still overrides it.

### Fixes
- The segmented control keeps each option on one line and scrolls sideways on narrow screens instead of wrapping into an oval.
- Trace titles wrap to two lines instead of cutting off mid-sentence.

### Guide
- A live Bento section with two examples: a team home (weekly summary, assistant, upcoming events, onboarding) and an agent overview (switchable chart, agents in parallel, workflow, time saved, a summary feature and news).

## 1.3.1

One shell per app.

- A sidebar app has no top bar on desktop. Its brand block sits at the top of the sidebar and the user menu at the bottom; `bos-topbar` now only shows on phones, to open the sidebar.
- Rule: never a top bar and a sidebar together. Anything from a top bar (brand, role or demo switcher, user, search, Create) moves into the sidebar or the page's title block.

## 1.3.0

Navigation chosen by purpose, one font family, and interactive components for learning apps.

### Navigation by purpose
- Two shells. A top bar for apps people explore and browse, and a collapsible sidebar for apps with one main job, so the work draws the eye instead of the navigation. The skill and brand-rules.md explain how to choose, and the agent says which it picked and why.
- The sidebar is now a quiet floating glass panel that collapses to icons (`data-collapsed` on `bos-app`, `bos-sidebar-toggle`). The current page uses the same filled primary pill as the top bar. On phones it opens as a sheet.

### One font family
- Headings use the body font at a heavier weight (`--font-heading`). A brand's display or serif font is only used for headings when brand.json sets `typography.headings` to `"display"`; the studio has a "Headings use" choice for it.

### Interactive and learning components
- Quiz, exam and challenge questions (`bos-quiz`): question track, answer options with selected, correct, incorrect and missed states, feedback that says why, and a running score.
- Score tally (`bos-tally`), progress ring (`bos-ring`), timer with warning and over states (`bos-timer`), counter (`bos-counter`) and an end-of-quiz result (`bos-result`).
- Written answers graded by an assistant (`bos-graded`, `bos-grading`, `bos-score`, `bos-rubric`).
- Courses and lessons: module progress, lesson list with done, current, to-do and locked states (`bos-lessons`), video lessons (`bos-video`) and a lesson page layout (`bos-learn`).
- Rules for right and wrong (never colour alone), progress and time, locked lessons, and when to use a modal or a side panel.
- The guide has a new Interactive section where the quiz, grading and lessons all work.

## 1.2.3

Chat pages: switch assistants anywhere, and the composer stays at the bottom.

- New `bos-composer-dock`: any composer docks at the bottom of the screen and stays there while the page scrolls.
- New assistant picker in the composer (`bos-composer-agent`): switch who answers without leaving the page or losing what you typed. Its menu opens upward.
- New conversation layout: `bos-chat` with a rail of assistants and recent conversations (`bos-chat-rail`), `bos-chat-head`, `bos-thread` and message bubbles (`bos-msg-user`, `bos-msg-assistant`). The rail hides below 1024px.
- New tokens: `--shell-space` and `--chat-measure`. New `bos-avatar-sm`.
- Rule: when a More menu is removed or nav items move, every item must land somewhere, and the agent lists where.
- Guide: a live Conversation pattern under Page tops.
- `brandos verify` no longer flags items inside a closed menu as missing hover.

## 1.2.2

No more oval dialogs, and one title block for every page.

- Dialogs, command menus and popovers always use the card and row corners, even if an app changed its radius scale to make buttons round. That was turning modals into ovals and cutting off their content.
- The Tailwind adapter now sets the whole radius scale, up to `rounded-4xl`.
- Rules: never change the radius scale to round buttons; use `rounded-full` on the button.
- Rules: the title block is the same on every page of every app (gap below the nav, optional kicker that never repeats the app name, `bos-h1`, one lead line). Only what follows it changes, and every difference between apps needs a one-sentence reason.

## 1.2.1

Wider pages, an even nav bar, and corners that can't break.

- Pages use the window: `--page-max` is now 1680px and the side margin (`--page-gutter`) is a slim 12 to 24px. Running text is still held to a readable line length (`--measure`).
- The nav bar has the same padding on both ends, and the main pages sit in the true centre of the bar.
- More only shows when it holds something. With six main pages or fewer there is no More; settings and admin go in the user menu.
- More is sized and spaced exactly like the other nav items.
- Menus are solid, so the page's text no longer shows through them (a blur inside the glass nav bar can't blur anything).
- Glass rows have a soft shadow, so they lift off the page like cards.
- `brandos verify` checks corners: a pill radius on a big box (it draws as an oval) and square boxes with a background inside a rounded one. `--chromium <path>` uses a local browser.
- Rules: pill radius is for controls only; the serif heading font is for page titles and section headings only.

## 1.2.0

Brand packs and BrandOS Studio, design-system import, page tops chosen by purpose, one layout system for every app, and checks that pages actually work.

### Make a brand once, reuse it everywhere
- New `brandos studio`: a local dashboard (nothing is uploaded, no AI is used). Add brand guides (PDF, PowerPoint), website links and design-system files, plus licensed font files in their own drop area. Check and fix the colours, roles, fonts, corners and dark mode with a live preview and live contrast checks, then export a brand pack. Saved brands can be reopened, changed and re-exported with a new version.
- Each font shows whether its files are in the pack or a free stand-in is showing, with an "Add font files" button right there. The download lists every font in the pack and how it loads.
- New `brandos pack brand.json`: builds `<brand>-brand-<version>.zip` with the theme, fonts, tokens, palette, `brandos-ui.css`, adapters (Tailwind v4, Tailwind v3, PrimeVue), `brand-rules.md` (a one-page brief for AI tools), a contrast report and `preview.html`.
- `brandos install --pack <zip|folder>` installs straight from a pack, keeps the unpacked copy out of git, and writes `brand-rules.md` into the app fresh from the current BrandOS, so older packs get the latest rules.

### Read existing design systems exactly
- `brandos extract` and the studio read design-system files directly: W3C design tokens, Figma variables exports, Tokens Studio and Style Dictionary JSON, CSS, SCSS and Less variables (including shadcn-style HSL channels), Tailwind configs (read as text, never run) and existing brand.json files. Roles come from token names (primary, brand, secondary, accent, error, neutral, background), fonts from font tokens. When several sources are added, design-system files win over guides.
- More free stand-ins recognised for licensed slab and serif faces.

### Find the app, wherever it lives
- `brandos detect` finds the frontend when it isn't at the repo root (monorepos and full-stack repos), lists each candidate with its framework, and spots .NET Razor views and server-rendered templates.
- `brandos install` on a repo root whose UI lives in a subfolder stops and names the right folder (`--here` overrides).

### Page tops chosen by what the page is for
- Six patterns: work queue (`bos-hero-compact` + `bos-queue`), overview (`bos-hero-overview` + `bos-stats`), search (`bos-hero-search` + `bos-search-xl` + `bos-suggestions`), ask an assistant (`bos-hero-chat` + `bos-composer`), welcome or landing (`bos-hero-split`), and record pages (`bos-record-header`). They are starting points; the AI composes something else from the same parts when a page needs it and says why.
- Stats only where someone would act on the numbers, never counts of static things.

### One layout system and one shell for every app
- Layout tokens: `--page-max` (1200px, shared by the nav bar and every page, so their edges line up), `--page-gutter`, `--page-top`, `--section-gap`, `--block-gap`, `--pad-card`, `--pad-tile`, `--pad-row`, and radii `--radius-control`, `--radius-card`, `--radius-row`, `--radius-inner`. New `bos-page` and `bos-stack`. Every block spans the page width; only text gets a narrower measure.
- One type scale: `--text-display` to `--text-stat`. Every page title uses `bos-h1`, home included; `bos-display` is for landing pages only.
- The glass pill nav is the standard: brand block, up to six main pages, a More menu grouped by section (no script needed), search, one Create action and a user menu with settings, admin, theme and sign out. On phones the main pages move into More, and nothing in the bar overlaps. A sidebar shell exists for apps that ask for it.
- The migrate skill and `brand-rules.md` spell out what must match across apps (shell, layout, type, colour use, buttons, spacing) and what may differ (which page top, what follows).

### Visible glass, hover everywhere, safe corners
- Glass has a visible edge on white as well as on colour: suggestion chips, glass rows, glass buttons, queue items, panels and the segmented control no longer read as plain text.
- Every clickable thing responds on hover, including the selected tab or segment, select triggers, the active sidebar item, brand links and plain links.
- Rules for corners: `--radius-inner` inside cards, no `overflow: hidden` on rounded containers that hold menus or focus rings (`bos-clip` keeps room for them). Stat strips wrap cleanly at any width.

### Checks that pages work
- `brandos verify` now also reports failed requests and script errors, clickable things with no hover change, text cut off by its container (including rounded corners), sideways scrolling and broken images. `--no-checks` skips them; `data-bos-static` marks deliberate static previews.

### Fixes
- An old `bos-page` rule added its own side padding, so some pages sat 32px in from the nav bar and from other pages.
- Docs, the studio and pack READMEs show the real command (`node path/to/brandos/cli/brandos.mjs ...`); BrandOS isn't on npm, so `npx brandos` did not work.

### Guide
- The component guide gains a "Page tops" section with every pattern live, when to use it and what to avoid, the pill nav shell with its menus, and a table of the layout system.

## 1.1.2

Editorial layout, heading fonts and a visual guide.

- Heading and body fonts: `brandos extract` reads the family name stored inside font files, so a heading face whose files are in `brand-source/` (for example a licensed slab) becomes `fonts.display` even when the guide doesn't name it. Serif and slab faces get serif fallbacks and a matching free stand-in until the files are added. Italic files named "It" are detected.
- New layout layer in `brandos-ui.css`: `bos-display`, `bos-h1`, `bos-h2`, `bos-h3`, `bos-lead`, `bos-stat`, `bos-kicker`; `bos-hero`, `bos-stats`, `bos-block`, `bos-sec-head`, `bos-feature-grid`; `bos-surface` (solid, for the one featured thing per section), `bos-glass`, `bos-rows` and `bos-row` (glass, solid on hover), `bos-tile`; charms (`bos-charm` in six shapes, four fills, three sizes) and `bos-avatar`; `bos-pill`; `bos-band` (the brand gradient with a glass button); `bos-table` with `bos-rank` and `bos-row-self`.
- Secondary buttons are glass and turn solid on hover, in every kit: `bos-btn-glass`, the React and CSS kits' secondary and glass variants, and PrimeVue secondary and outlined buttons. New `bos-btn-primary`, `bos-btn-sm`, `bos-btn-lg`.
- Backdrop: one glow of brand colour fixed at the top edge (it no longer drifts), so glass always has colour behind it. The old three-corner pools are `data-aura="soft"`.
- Sticky app bar: the wrap no longer fades the page out, so the glass bar shows content blurring under it (`data-fade` restores the fade). `bos-shell bos-glass` is the most frosted glass.
- Theme: new `--band-1` to `--band-4`, `--band-foreground` and `--gradient-brand` (contrast-checked for white text, 150 checks per theme), `--shadow-sm`, `--shadow-md`, `--shadow-lg` tinted with the brand's neutral, and `--display-weight`.
- Fix: tints mixed with white or the text colour now use OKLab, so a pale tint keeps its hue. Before, pale tints of green, teal and blue brands drifted towards pink (PrimeVue `primary.50` to `300`, and several `color-mix` tints).
- Fix: chat bubbles in the glass style put the glass on the bubble, not on a rectangle behind it. Native selects from the kit no longer show two arrows. Grids no longer widen the page when a child has wide content.
- New visual guide: `node scripts/build-guide.mjs` builds a page with every component (live), the layout patterns, tokens, diagrams and rules, in any set of brands.

- Hover only on things you can click: table rows (including header and footer rows) and plain ghost badges no longer change on hover.
- Input groups and comboboxes keep the field's inner padding when there is no icon or prefix on that side, so text no longer touches the edge.
- File inputs show a real browse button.
- Guide: the light and dark switch works inside sandboxed pages and follows the host's theme; demos that are hard to read at a glance (right-to-left direction, combobox) have a short note.

- Command menus rest cleanly: the panel clips instead of scrolling, so the search field can't be pushed out of place, and the pre-selected first item only shows its highlight once the menu is in use.
- Guide: demos that grab focus on load no longer scroll the page or their own panels.

- Attachment chips without a remove button have even padding on both sides, so the file name no longer runs to the right edge, and small chips have a tighter gap between icon and name.

## 1.1.0

Palette lock: apps may only use brand colours (plus black, white and greys) and brand fonts, and BrandOS checks it.

- `brandos theme` writes `palette.json`: the brand's colour families (by hue) and allowed fonts. Install copies it into the app.
- `brandos audit` now lists every off-brand colour and font in the app's code, with file and line, and fails until there are none.
- New `brandos verify <url> --app <app>`: opens the running app in a real browser, in light and dark, and lists every off-brand colour and font actually on screen, including values from data, runtime styles, third-party components and icons. Needs Playwright.
- A colour passes when it is a neutral or shares a hue with a brand colour; pale tints get a wider tolerance because their hue drifts.
- Theme: chart colours, backdrop and the dark-mode focus ring now come only from brand colours (no invented hues). A brand without an error colour gets a flagged standard red.
- PrimeVue: every stock colour ramp is remapped (danger to the destructive colour, warn and info to neutral, the rest to the brand colour), so no severity can show a non-brand colour.
- Fonts: inside `bos-backdrop`, body text uses the brand UI font, headings the display font, code the mono font.
- Install records the app's dark-mode selector and keeps every BrandOS file in the manifest across re-installs.

## 1.0.8

- PrimeVue preset passes strict TypeScript, including `noUncheckedIndexedAccess`. Fixes two type-check errors in apps with strict settings.
- Migration skill: record the app's type-check, lint and test results before starting, re-run them after every item, and fix anything the migration newly breaks.
- Migration skill: guard browser APIs (localStorage, matchMedia, ResizeObserver) so tests and server rendering keep working.

## 1.0.7

- Native selects: the arrow is replaced by an inset chevron with right padding, so values never touch the edge or run under the arrow. Applies to `bos-select` and every single-choice select inside `bos-backdrop`, with hover and focus states.
- `bos-filters`: a search and filter row where every control shares one height and wraps cleanly.
- `bos-shell-wrap`: a sticky wrapper for the app bar that fades content out as it scrolls under, so nothing shows in the gap above the bar.
- Design rule: controls have breathing room on both sides, and controls in one row share one height.

## 1.0.6

- Auras: `bos-backdrop` now adds two very soft, blurred pools of light (a warm one from the primary, top left, and a cooler one from the backdrop colours, bottom right) that drift slowly. Optional third aura with `<div class="bos-aura">` for long pages. Strength is one token, `--aura-strength` (0.35 light, 0.28 dark), and blur is `--aura-blur`.
- Auras stop moving under prefers-reduced-motion and disappear under prefers-reduced-transparency.
- Backdrop and aura colours now come only from the brand: with fewer than three brand colours they stay close to the primary hue instead of inventing new hues.

## 1.0.5

- Install now always refreshes the files BrandOS owns (theme, fonts, tokens, shared styles, presets, markup) and re-applies app-specific settings such as the dark-mode selector. Fixes dark mode breaking when a newer theme.css was copied into an app by hand.
- Install output lists "Updated BrandOS files" separately from conflicts.
- Rule (AGENTS.md, brand-apply): update by re-running `brandos theme` and `brandos install`, never by copying files.

## 1.0.4

- Extract reads what the guide says, not just what appears most: colours labelled primary, secondary, accent, neutral, background or error (before or after the colour code) are used for those roles, even when the primary is dark or muted.
- Font roles from the guide: "Headline font" becomes the display font and "Body font" the UI font.
- Font names are cleaned up ("Space Grotesk Space Grotesk SemiBold" becomes "Space Grotesk").
- The extract summary shows the background colour when the guide sets one.

## 1.0.3

- Motion tokens: `--motion-fast` (120ms), `--motion-base` (200ms), `--motion-slow` (320ms), `--ease-out`, `--ease-in-out`.
- Motion classes in brandos-ui.css: `bos-enter`, `bos-stagger`, page transitions (`bos-page-*`), `bos-skeleton`; overlays pop in, progress bars grow in, clickable things press in slightly.
- PrimeVue overlays, dialogs and progress bars use the same motion.
- Everything respects prefers-reduced-motion.
- Design rule: motion is small, quick and purposeful; entrances play once.

## 1.0.2

- App bar that cannot overlap: `bos-shell` (brand | nav | actions grid), `bos-nav` with `data-priority="low"` items moving into a "More" menu when space is tight, and a menu button below 768px.
- Design rules: plan the nav for the role with the most items (about 6 to 7 top-level items, the rest in "More"); theme switcher and admin tools go in the user menu; check layouts at 1440, 1280, 1024, 768 and 390px for every role.

## 1.0.1

Lessons from the first real migration, built into the system so every brand gets them.

### Theme (`brandos theme`)

- Frost tiers: `--frost-strong`, `--frost-medium`, `--frost-light`, `--frost-border` and `--overlay`, light and dark. Text is contrast-checked on every tier over the backdrop.
- Brand ramp: `--ramp-0` to `--ramp-5` with `--ramp-N-foreground`, one hue from pale to the full brand colour (dim to bright in dark mode), for ordered things like levels or tiers. Every step is checked for 4.5:1 text.
- Muted progress colours: `--progress-fill` and `--progress-track`, a mid neutral checked at 3:1 against its track.
- Spacing scale: `--space-1` to `--space-9` (4 to 96 px).
- Calmer backdrop: paler, lower-chroma colour fields, so glass reads as frosted rather than tinted.
- Contrast checks grew from 74 to 140 per theme.

### Shared UI layer (`brandos-ui.css`, installed by every kit)

- Classes for the backdrop, frost tiers, cards, page header and titles, sections, one segmented control for tabs and filters, glass buttons with full states, whole-card links, chips, ramp colours and dots, and progress bars.
- Reduced-motion and reduced-transparency fallbacks.

### PrimeVue bridge

- Cards and panels are medium frost; menus, dropdowns and dialogs use the near-opaque overlay so nothing shows through.
- Progress bars are muted by default (`bos-progress-primary` for the one main bar).
- Severities follow the colour budget: success uses the brand colour, info is neutral, danger uses the destructive colour.
- Toggle and segmented selections are neutral.
- The installer now flags an app's own preset that is defined but no longer applied.

### Scan

- Finds colours that come from data or code: colour fields read from objects, colour maps in code, and status props such as `severity="success"`.

### Design rules (ui-migrate skill)

- Make it systemic: restyle shared components and point the app's own tokens at the theme before working page by page.
- Colour sweep beyond CSS: inline bindings, code maps, status props, API data, images and charts.
- Glass is the surface; importance is shown by frost level, never by solid white.
- Colour budget: about 90% neutrals; brand colour for the primary action, active navigation, focus ring and the user's own status.
- One spacing scale and shared page header; no icons before page titles, no empty dividers, no nested cards.
- One neutral segmented control for every tab bar and filter.
- Hover only on things you can click.
- Ordered things use one hue from pale to full, with the name always shown; status is not a traffic light.
- Progress bars are a muted neutral.

## 1.0.0

First release.

- `brandos extract` reads a PDF, PowerPoint, website or image, writes brand.json and generates the theme in one step, and finds licensed font files next to the source.
- Contrast-checked theme generation (WCAG 2.2 AA, light and dark, including text on glass).
- React kit (64 Glass UI components on shadcn/ui and Base UI), CSS kit with exact HTML markup for any framework, and a PrimeVue 4 bridge.
- `install`, `scan` (page-by-page MIGRATION.md), `audit` and a local `preview`.
- Agent skills for intake, apply, migrate and audit.
