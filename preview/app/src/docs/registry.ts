// Docs metadata for every component. Descriptions are ours; behaviour comes
// from Base UI (via shadcn's open-source wrappers), the look from style-glass.css.

export type DocEntry = {
  slug: string
  name: string
  description: string
  /** Base UI component docs slug, when the component wraps one. */
  base?: string
  /** Third-party library the component builds on, when not Base UI. */
  lib?: { name: string; url: string }
  /** Has a glass variant or glass surface by default. */
  glass?: boolean
  /** Source file in components/ui, when different from the slug. */
  file?: string | null
  isNew?: boolean
}

export const COMPONENTS: DocEntry[] = [
  { slug: "accordion", name: "Accordion", description: "Stacked sections that expand one at a time or all together. Good for FAQs and settings groups.", base: "accordion" },
  { slug: "alert", name: "Alert", description: "An inline message that calls attention to something the person should know before they continue." },
  { slug: "alert-dialog", name: "Alert Dialog", description: "A blocking confirmation for actions that cannot be undone. Always names the action on the button.", base: "alert-dialog", glass: true },
  { slug: "aspect-ratio", name: "Aspect Ratio", description: "Keeps media at a fixed ratio while the layout around it changes." },
  { slug: "attachment", name: "Attachment", description: "A file or image chip for composers, messages and upload lists.", isNew: true },
  { slug: "avatar", name: "Avatar", description: "A person or team, with image, initials fallback, status badge and stacked groups.", base: "avatar" },
  { slug: "badge", name: "Badge", description: "A short label for status or category. Use tone for meaning, not decoration.", glass: true },
  { slug: "breadcrumb", name: "Breadcrumb", description: "Shows where a page sits in the hierarchy and links back up it." },
  { slug: "bubble", name: "Bubble", description: "A chat message surface for people and assistants, with grouped and reaction states.", isNew: true, glass: true },
  { slug: "button", name: "Button", description: "Triggers an action. One primary per view; glass for actions that sit on imagery or colour.", base: "button", glass: true },
  { slug: "button-group", name: "Button Group", description: "Related actions joined into one control, with optional separators and text." },
  { slug: "calendar", name: "Calendar", description: "Pick a date or a range from a month grid.", lib: { name: "React DayPicker", url: "https://daypicker.dev" } },
  { slug: "card", name: "Card", description: "Groups one piece of content and its actions. Solid by default, glass over imagery.", glass: true },
  { slug: "carousel", name: "Carousel", description: "Swipeable slides with previous and next controls.", lib: { name: "Embla Carousel", url: "https://www.embla-carousel.com" } },
  { slug: "chart", name: "Chart", description: "Recharts wrappers that read colours from your theme's chart tokens.", lib: { name: "Recharts", url: "https://recharts.org" } },
  { slug: "checkbox", name: "Checkbox", description: "Turns an option on or off within a set. Supports an indeterminate state.", base: "checkbox" },
  { slug: "code-block", name: "Code Block", description: "Formatted code with a header, copy action, line numbers and diff lines.", isNew: true },
  { slug: "collapsible", name: "Collapsible", description: "Shows and hides one region of content.", base: "collapsible" },
  { slug: "combobox", name: "Combobox", description: "A text input with a filtered list of options. Supports multiple chips.", base: "combobox", glass: true },
  { slug: "command", name: "Command", description: "A keyboard-first search and action menu, inline or in a dialog.", lib: { name: "cmdk", url: "https://cmdk.paco.me" }, glass: true },
  { slug: "context-menu", name: "Context Menu", description: "Actions for an element, opened with right-click or long press.", base: "context-menu", glass: true },
  { slug: "data-table", name: "Data Table", description: "A sortable, selectable table built from Table, Checkbox and Dropdown Menu.", file: null },
  { slug: "date-picker", name: "Date Picker", description: "A button that opens a Calendar in a Popover.", file: null, glass: true },
  { slug: "dialog", name: "Dialog", description: "A focused task on top of the page. One primary action, aligned right.", base: "dialog", glass: true },
  { slug: "direction", name: "Direction", description: "Sets left-to-right or right-to-left for everything inside it.", base: "direction-provider" },
  { slug: "drawer", name: "Drawer", description: "A panel that slides up from the bottom edge. Best on touch screens.", base: "drawer", glass: true },
  { slug: "dropdown-menu", name: "Dropdown Menu", description: "A list of actions or options opened from a trigger.", base: "menu", glass: true },
  { slug: "empty", name: "Empty", description: "What a view shows before it has content, with the next step to take." },
  { slug: "field", name: "Field", description: "Label, control, description and error laid out together and wired for accessibility.", base: "field" },
  { slug: "hover-card", name: "Hover Card", description: "A preview that appears when the pointer rests on a link.", base: "preview-card", glass: true },
  { slug: "input", name: "Input", description: "A single-line text field.", base: "input" },
  { slug: "input-group", name: "Input Group", description: "An input with icons, text or buttons attached to its edges." },
  { slug: "input-otp", name: "Input OTP", description: "One-time code entry split into slots.", lib: { name: "input-otp", url: "https://input-otp.rodz.dev" } },
  { slug: "item", name: "Item", description: "A flexible row with media, title, description and actions. The building block for lists." },
  { slug: "kbd", name: "Kbd", description: "Shows a key or shortcut." },
  { slug: "label", name: "Label", description: "Names a form control." },
  { slug: "marker", name: "Marker", description: "A small inline status line, for steps, activity and system notes.", isNew: true },
  { slug: "menubar", name: "Menubar", description: "A desktop-style row of menus for dense tools.", base: "menubar", glass: true },
  { slug: "message", name: "Message", description: "Lays out a chat turn: avatar, header, bubbles and footer.", isNew: true },
  { slug: "message-scroller", name: "Message Scroller", description: "A chat transcript that stays pinned to the newest message.", isNew: true },
  { slug: "native-select", name: "Native Select", description: "The browser's own select, styled to match. Best on mobile." },
  { slug: "navigation-menu", name: "Navigation Menu", description: "Top-level site navigation with rich dropdown panels.", base: "navigation-menu", glass: true },
  { slug: "pagination", name: "Pagination", description: "Moves between pages of results." },
  { slug: "popover", name: "Popover", description: "Floating content anchored to a trigger, for small forms and details.", base: "popover", glass: true },
  { slug: "progress", name: "Progress", description: "Shows how far a task has come.", base: "progress" },
  { slug: "questionnaire", name: "Questionnaire", description: "A step-by-step set of questions, for agents that need input before acting.", isNew: true },
  { slug: "radio-group", name: "Radio Group", description: "Choose exactly one option from a short list.", base: "radio-group" },
  { slug: "resizable", name: "Resizable", description: "Panels the person can drag to resize.", lib: { name: "react-resizable-panels", url: "https://github.com/bvaughn/react-resizable-panels" } },
  { slug: "scroll-area", name: "Scroll Area", description: "Native scrolling with a slim glass scrollbar that fades in while you scroll.", base: "scroll-area", glass: true },
  { slug: "select", name: "Select", description: "Choose one option from a list in a floating panel.", base: "select", glass: true },
  { slug: "separator", name: "Separator", description: "A quiet line between groups of content.", base: "separator" },
  { slug: "sheet", name: "Sheet", description: "A side panel for secondary tasks and filters.", base: "dialog", glass: true },
  { slug: "sidebar", name: "Sidebar", description: "App navigation that collapses to icons and becomes a sheet on mobile.", glass: true },
  { slug: "skeleton", name: "Skeleton", description: "A placeholder shape while content loads." },
  { slug: "slider", name: "Slider", description: "Pick a value or range by dragging.", base: "slider" },
  { slug: "sonner", name: "Sonner", description: "Stacked toast notifications with promise and action support.", lib: { name: "Sonner", url: "https://sonner.emilkowal.ski" } },
  { slug: "spinner", name: "Spinner", description: "A small indicator for work in progress. Pair it with text that says what is happening." },
  { slug: "switch", name: "Switch", description: "Turns a setting on or off immediately.", base: "switch" },
  { slug: "table", name: "Table", description: "Rows and columns of data." },
  { slug: "tabs", name: "Tabs", description: "Switch between views of the same subject. Line, filled and glass styles.", base: "tabs", glass: true },
  { slug: "textarea", name: "Textarea", description: "Multi-line text entry." },
  { slug: "toast", name: "Toast", description: "Brief feedback after an action, on thick glass.", base: "toast", glass: true },
  { slug: "toggle", name: "Toggle", description: "A two-state button, like bold in a text editor.", base: "toggle" },
  { slug: "toggle-group", name: "Toggle Group", description: "A set of toggles where one or many can be on.", base: "toggle-group" },
  { slug: "tooltip", name: "Tooltip", description: "A short label on hover or focus. Never the only place key information lives.", base: "tooltip", glass: true },
  { slug: "trace", name: "Trace", description: "Shows what an agent did: steps, tool calls and reasoning, collapsible.", isNew: true },
  { slug: "typography", name: "Typography", description: "Headings, body, lists, quotes and inline code in the theme's type.", file: null },
]

export const DOC_PAGES = [
  { slug: "introduction", name: "Introduction" },
  { slug: "installation", name: "Installation" },
  { slug: "theming", name: "Theming" },
  { slug: "brand-themes", name: "Brand themes" },
]
