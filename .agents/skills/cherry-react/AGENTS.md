# cherry 2.0 - agent guide

This project uses **cherry 2.0** (`@cherry-design-system/react`), a themeable React design system in plain CSS: static CSS in `@layer cherry`, `--cherry-*` tokens, no CSS-in-JS, no theme provider, light/dark by a class on `<html>`, WCAG 2.2 AA. When you write or edit UI here, follow these rules. They are not optional.

For exact props, types, defaults and a checked example of every component, read `skills/cherry-react/references/components.md`; for tokens `references/tokens.md`; for setup, theming and accessibility `references/setup.md`, `theming.md`, `accessibility.md`. Those files are generated from the source and match this version.

## Rules

1. **Every control is a cherry component.** `Button` / `IconButton` (`aria-label` required) for actions; `Input`, `Textarea`, `Select`, `Combobox`, `Checkbox`, `RadioGroup` + `Radio`, `Toggle`, `Range`, `NumberField`, `Password`, `OTPInput`, `DatePicker`, `TimePicker`, `DateTimePicker` for input. Never raw `<button>`/`<input>`/`<select>`/`<textarea>`, never another UI library.
2. **Every control has a name.** Wrap form controls in `<Field label hint error>`; otherwise `aria-label`. Placeholders are not labels. Errors go through `Field error`, not just a red border.
3. **Plain prop names and listed values only**: `variant`, `size` (`"sm" | "md" | "lg"` on most controls), `invalid`, `fullWidth`. No `$` props (that was cherry 1.x). Unknown values render unstyled.
4. **Tokens, never hardcoded values.** Colors, spacing, radius, shadows, type and motion are `--cherry-*` variables and switch with light/dark by themselves. Never branch on the mode in JS. Readable text uses `--cherry-fg-default` or `--cherry-fg-muted`, never `--cherry-fg-subtle`.
5. **Customize with a plain class.** cherry is in `@layer cherry`; your unlayered CSS wins without `!important`. Keep focus rings (`outline: 2px solid transparent; box-shadow: var(--cherry-ring)`).
6. **Icons are `lucide-react` elements** passed to `icon` / `leadingIcon` / `trailingIcon`.
7. **Distinct names for repeated landmarks** (two `Pagination`s, several `Banner`s), real headings in order, meaning never in color alone.
8. **Router links go through `asChild`**: `<NavItem asChild><Link href="/docs">Docs</Link></NavItem>` navigates client-side; a plain `href` reloads the page. Pass `active` from the router (`usePathname()`) for a correct first paint, or set `trackRoute` on `NavPill`; `trackSections` highlights `#section` links as their section scrolls into view.

## Setup (once)

```tsx
// app/layout.tsx
import "@cherry-design-system/react/styles.css";
import { themeInitScript } from "@cherry-design-system/react/theme-init";

<html lang="en" suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
  </head>
  <body className="cherry-root">{children}</body>
</html>;
```

Interactive components are `"use client"` internally; import any component from a Server Component.

## Components

- **Actions:** `Button`, `IconButton`, `ConfirmButton`, `Link`.
- **Forms:** `Field`, `Input`, `Textarea`, `Select`, `Combobox`, `Password`, `NumberField`, `OTPInput`, `Checkbox`, `RadioGroup` + `Radio`, `Toggle`, `Range`, `ToggleGroup` + `ToggleGroupItem`, `ThemeToggle`, `Tag`, `Dropzone`, `FileItem`, `AvatarDropzone`.
- **Pickers:** `Calendar`, `DatePicker`, `TimePicker`, `DateTimePicker`.
- **Navigation:** `Tabs` + `TabList` + `Tab` + `TabPanel`, `Sidebar` + `SidebarGroup` + `SidebarItem`, `NavPill` + `NavItem`, `Breadcrumb`, `Pagination`, `Stepper`.
- **Overlays:** `Menu` + `MenuGroup` + `MenuItem` + `MenuSeparator`, `Modal` (+ `ModalBody`, `ModalFooter`), `Sheet`, `Popover` (open with `popoverTarget`), `Tooltip`, `SearchDialog` + `SearchGroup` + `SearchResult`.
- **Feedback:** toasts (`ToastProvider` + `Toaster` once, then `useToast().show(…)`), `Banner`, `Callout`, `Progress`, `Spinner`, `Skeleton`, `EmptyState`.
- **Data display:** `Badge`, `Avatar`, `AvatarGroup`, `Table`, `StatCard`, `Kbd`.
- **Content:** `Card` (+ `CardIcon`, `CardTitle`, `CardDescription`), `Accordion` + `AccordionItem`, `Prose`, `CodeBlock`, `InlineCode`, `Snippet`, `Separator`.
- **Layout:** `Container`, `Grid` + `Col`, `Flex`, `Stack` (responsive props per breakpoint: `gap={{ xs: 2, lg: 4 }}`).
- **Chat kit:** `ChatPanel`, `ChatMessageList`, `ChatMessage`, `ChatInput`, `ChatLauncher`, `ChatTyping`, `ChatSources` + `ChatSource`, `ChatSuggestions` + `ChatSuggestion`.

## Verify

Type-check and build. In the browser, in light and dark: every control is a cherry component, has a visible label or name, shows a focus ring on Tab, and works with the keyboard (Escape closes popups and returns focus).
