# Accessibility

cherry's components meet **WCAG 2.2 AA** when used as documented. Its own CI runs axe in light and dark, at desktop and 320px widths, with every popup open, and checks focus visibility, focus traps and Windows High Contrast on every push. Keeping that true in an app depends on the few things only the app can provide, listed below. Each component's own notes are in `components.md` under **Accessibility**.

## What cherry handles

- **Roles, states and names** on every component: `role="switch"`, `aria-expanded`, `aria-current`, `aria-invalid`, labelled close and copy buttons, live regions for toasts and results counts.
- **Keyboard support** for every widget, following the WAI-ARIA patterns (table below).
- **Focus**: a visible ring on every focusable element, in both modes and in Windows High Contrast; dialogs and sheets move focus in, trap it, and return it to the trigger; popovers and menus return focus on Escape.
- **Contrast**: text tokens meet 4.5:1 (`--cherry-fg-subtle` excepted, which is for disabled and decorative use only), focus rings and control borders meet 3:1.
- **Target size**: controls are at least 24×24px or spaced so they don't collide (WCAG 2.5.8).
- **Reflow**: nothing forces sideways scrolling at 320px (400% zoom); tables and code scroll inside their own focusable region.
- **Motion**: every transition uses the motion tokens, which shrink to 1ms under `prefers-reduced-motion: reduce`.
- **Text spacing**: no clipping when users increase line, letter and word spacing (WCAG 1.4.12).

## What you must provide

1. **A name for every control.**
   - Form controls: wrap them in `<Field label="…">`, or pass `aria-label` when a visible label is impossible. A placeholder is not a label.
   - `IconButton`: `aria-label` is required. Same for icon-only `Kbd`, `ToggleGroupItem` with only an icon, and `ConfirmButton` (make it specific: "Delete report.pdf").
   - Groups: name a `RadioGroup` or `ToggleGroup` (`aria-label` or a surrounding `Field`).
2. **Errors through `Field`.** Pass the message as `<Field error={…}>`: it sets `aria-invalid` and links the text so it is read with the field. Don't show errors only as red borders.
3. **Distinct landmark names.** When a page has two `Pagination`s, several `Banner`s, two `Sidebar`s or two `Table` scroll regions, give each a different name (`labels={{ nav: "Results pages" }}`, `aria-label`, `navLabel`, `scrollLabel`).
4. **Real headings and structure.** Use `CardTitle level={…}`, `EmptyState headingLevel`, and `<h1>`…`<h6>` in order. Put page content in `<main>`.
5. **Meaning beyond color.** Status, trend and severity must be in text too: `Badge` text, `Callout` titles, `StatCard trendLabels`. Name destructive menu items clearly ("Delete project").
6. **Alt text.** `Avatar` takes `alt` (defaults to `name`); images you render need `alt` (empty `alt=""` when decorative).
7. **Translations.** Every built-in string is a prop (`closeLabel`, `dismissLabel`, `copyLabel`, `labels`, `statusLabels`…). Translate them along with your UI.
8. **Your own components** follow the same bar: visible `:focus-visible` (`outline: 2px solid transparent; box-shadow: var(--cherry-ring)`), `--cherry-fg-muted` or stronger for readable text, 24px targets, motion tokens.
9. **Don't hide focus or meaning.** Never set `outline: none` without a replacement ring, never put essential information only in a `Tooltip`, never disable zoom.

## Keyboard patterns

| Component                                             | Keys                                                                                |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Button, IconButton, Link, Toggle, Checkbox            | Tab to focus; Enter/Space activate (Space toggles switches and checkboxes)          |
| RadioGroup, ToggleGroup (single), ThemeToggle         | Arrows move and select; one tab stop for the group                                  |
| Tabs                                                  | Left/Right move and select; Home/End first/last                                     |
| Menu                                                  | Enter/Space/ArrowDown open; Up/Down move; Home/End; Escape closes and returns focus |
| Combobox, SearchDialog                                | Type to filter; Up/Down highlight; Enter selects; Escape closes                     |
| Select                                                | Native select keys                                                                  |
| Calendar (and DatePicker grid)                        | Arrows by day/week; PageUp/PageDown by month (Shift: year); Home/End week start/end |
| TimePicker                                            | Up/Down, Home/End, Enter; columns: Left/Right between hour, minute, AM/PM           |
| NumberField                                           | Up/Down step; PageUp/PageDown large step; Home/End min/max                          |
| Range                                                 | Arrows step; PageUp/PageDown; Home/End                                              |
| OTPInput                                              | Type to advance; Backspace back; Left/Right/Home/End; paste fills                   |
| Modal, Sheet, DatePicker, ChatPanel drawer            | Focus moves in and stays in; Escape closes; focus returns to the trigger            |
| Popover, Tooltip                                      | Escape closes; Tooltip also shows on keyboard focus                                 |
| Accordion                                             | Enter/Space toggles (native `<details>`)                                            |
| ChatInput                                             | Enter sends; Shift+Enter new line                                                   |
| Table, CodeBlock, Snippet (when wider than their box) | Tab to the region; arrows scroll                                                    |

## Testing

- **Automated**: run axe (for example `@axe-core/playwright`) on your pages in light and dark, at a desktop width and at 320px, and with menus, dialogs and pickers open. axe does not check `::placeholder` contrast or focus visibility; test those separately.
- **Keyboard**: unplug the mouse. Tab through the page: every stop shows a ring, nothing is skipped or trapped, every popup closes with Escape and returns focus.
- **Screen reader**: VoiceOver (Safari) and NVDA (Firefox/Chrome). Check names on icon buttons, errors read with their fields, toasts announced once without stealing focus, dialog titles read on open.
- **Zoom and contrast**: 200% browser zoom and the OS text size; Windows High Contrast (or Chrome's forced-colors emulation): focus and selected states stay visible.
