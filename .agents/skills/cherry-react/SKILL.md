---
name: cherry-react
repo: https://github.com/cherry-design-system/react
description: >
  cherry 2.0, the `@cherry-design-system/react` npm package: a themeable React
  design system in plain CSS (zero styling runtime, Server Components ready,
  WCAG 2.2 AA). Use this skill when building, editing or reviewing any UI in a
  project that lists `@cherry-design-system/react` in package.json or imports
  from it. Covers choosing the right component (Button, IconButton, Input,
  Field, Select, Combobox, the date and time pickers, Tabs, Menu, Modal, Sheet,
  Popover, Tooltip, Toast, Table, layout primitives, the chat kit and more),
  exact prop names and allowed values, setup (styles.css, themeInitScript),
  light/dark mode, brands, styling with --cherry-* tokens instead of hardcoded
  values, and the accessibility each component expects from you (labels, names,
  keyboard). Not for `cherry-styled-components` (cherry 1.x), which has its own
  skill.
license: MIT
---

# cherry 2.0 (`@cherry-design-system/react`)

cherry is a React design system in plain CSS: every component ships static CSS in `@layer cherry`, styled through `--cherry-*` tokens, with no CSS-in-JS and no theme provider. Light and dark switch by a class on `<html>`. Components meet WCAG 2.2 AA when you use them as documented here. When this skill applies, the rules below are not optional.

The `references/` files are generated from the component source, so props, types, defaults and examples there are exact for this version.

## Rules

1. **Use cherry components for every control.** `Button` / `IconButton` for actions, `Input`, `Textarea`, `Select`, `Combobox`, `Checkbox`, `RadioGroup` + `Radio`, `Toggle`, `Range`, `NumberField`, `Password`, `OTPInput`, `DatePicker`, `TimePicker`, `DateTimePicker` for input. Never a raw `<button>`, `<input>`, `<select>` or `<textarea>`, and never a second component library.
2. **Label every control.** Wrap form controls in `<Field label="…">` (it wires the label, hint and error for you), or give them `aria-label`. Every `IconButton` needs `aria-label`. A placeholder is not a label.
3. **Use the documented props and values only.** Prop names are plain (`variant`, `size`, `invalid`, `fullWidth`), never `$`-prefixed. Values must be one of the listed options (`size` is `"sm" | "md" | "lg"` on most controls); an unknown value renders unstyled. Check `references/components.md`.
4. **Style with tokens, never hardcoded values.** Colors, spacing, radius, shadows, type and motion come from `--cherry-*` custom properties (`references/tokens.md`). They switch with light/dark by themselves: never branch on the mode in JS or add `.dark` overrides for cherry colors.
5. **Customize with a plain class.** cherry's rules sit in `@layer cherry`, so any unlayered class of yours wins without `!important`. Pass `className`; don't fight specificity or wrap components in styled-components.
6. **Set up once.** Import `@cherry-design-system/react/styles.css` once, put `themeInitScript` in `<head>` and `className="cherry-root"` on `<body>` (`references/setup.md`). Components then work in Server Components; interactive ones are marked `"use client"` internally.
7. **Router links go through `asChild`.** For client-side navigation, wrap the router's link: `<NavItem asChild><Link href="/docs">Docs</Link></NavItem>`. A plain `href` reloads the page. See `references/setup.md` (Navigation with a router).
8. **Icons are `lucide-react` elements**, passed as `icon`, `leadingIcon`, `trailingIcon` (`<Button leadingIcon={<Plus />}>`). Any React element works.
9. **Keep it accessible.** Follow each component's **Accessibility** note in the reference and `references/accessibility.md`: distinct names for repeated landmarks (two `Pagination`s, several `Banner`s), real headings, error text through `Field`, no information in color alone, focus rings never removed.

## Quick start

```tsx
// app/layout.tsx (Next.js App Router)
import "@cherry-design-system/react/styles.css";
import { themeInitScript } from "@cherry-design-system/react/theme-init";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="cherry-root">{children}</body>
    </html>
  );
}
```

```tsx
import { Button, Field, Input, ThemeToggle } from "@cherry-design-system/react";
import { Mail } from "lucide-react";

<Field label="Email" hint="We never share it.">
  <Input type="email" leadingIcon={<Mail />} />
</Field>
<Button variant="primary">Subscribe</Button>
<ThemeToggle />
```

## Which component?

| Need                               | Use                                                                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Action / submit                    | `Button` (`variant`: primary, secondary, outline, ghost, accent)                                                           |
| Icon-only action                   | `IconButton` with `aria-label`                                                                                             |
| Destructive two-step action        | `ConfirmButton`                                                                                                            |
| Text field with label, hint, error | `Field` + `Input` / `Textarea` / `Password`                                                                                |
| Pick one of a few, visible         | `RadioGroup` + `Radio`, or `ToggleGroup type="single"`                                                                     |
| Pick one of many                   | `Select` (native) or `Combobox` (filterable)                                                                               |
| On/off setting                     | `Toggle` (switch) or `Checkbox` (in forms)                                                                                 |
| Number with steppers               | `NumberField`                                                                                                              |
| One-time code                      | `OTPInput`                                                                                                                 |
| Date / time                        | `DatePicker`, `TimePicker`, `DateTimePicker`, `Calendar`                                                                   |
| Files                              | `Dropzone` + `FileItem`, `AvatarDropzone`                                                                                  |
| Sections in place                  | `Tabs`; collapsible: `Accordion`                                                                                           |
| App navigation                     | `NavPill` (sticky/fixed, tracks route and sections), `Sidebar`, `Breadcrumb`, `Pagination`, `Stepper`                      |
| Actions list                       | `Menu` + `MenuItem`                                                                                                        |
| Blocking dialog                    | `Modal`; edge panel: `Sheet`; anchored panel: `Popover`; hint: `Tooltip`                                                   |
| Command palette / search           | `SearchDialog` + `SearchGroup` + `SearchResult`                                                                            |
| Notification                       | `useToast` (`ToastProvider` + `Toaster` once); page-level: `Banner`; inline: `Callout`                                     |
| Loading                            | `Spinner`, `Skeleton`, `Progress`                                                                                          |
| Nothing to show                    | `EmptyState`                                                                                                               |
| Status / label                     | `Badge`; removable chip: `Tag`                                                                                             |
| Data                               | `Table`, `StatCard`, `Avatar`, `AvatarGroup`                                                                               |
| Text content                       | `Prose` (markdown), `CodeBlock`, `InlineCode`, `Snippet`, `Kbd`, `Link`, `Separator`, `Card`                               |
| Layout                             | `Container`, `Grid` + `Col`, `Flex`, `Stack`                                                                               |
| AI chat                            | `ChatPanel`, `ChatMessageList`, `ChatMessage`, `ChatInput`, `ChatLauncher`, `ChatTyping`, `ChatSources`, `ChatSuggestions` |
| Light / dark switch                | `ThemeToggle`, or `useColorMode()`                                                                                         |

When cherry has no component for something, build it with plain elements and a class whose CSS uses `--cherry-*` tokens, a `:focus-visible` ring (`outline: 2px solid transparent; box-shadow: var(--cherry-ring)`) and the motion tokens. See `references/theming.md`.

## Verify your work

Type-check and build the app. Then check in the browser, in light and dark: every control renders as a cherry component, has a visible label or name, shows a focus ring when tabbed to, and works with the keyboard as its Accessibility note says. If the project has an axe or Playwright accessibility run, keep it green.

## Reference files

Load the one that matches the task:

- **`references/components.md`**: every component, generated from the source: description, client or server, props with exact types and defaults, accessibility notes, and an example that type-checks.
- **`references/tokens.md`**: every `--cherry-*` token (generated): semantic colors with their light/dark values, spacing, radius, elevation and focus rings, motion, layout and type styles.
- **`references/setup.md`**: install, Next.js App Router, navigation with a router (`asChild`, route and section tracking), Vite and other client-only apps, per-component CSS, scoped light/dark sections, server-side mode.
- **`references/theming.md`**: light/dark, `useColorMode`, brands with `createBrand`, overriding styles with classes and tokens, building your own on-theme components.
- **`references/accessibility.md`**: what cherry guarantees, what you must provide, keyboard patterns per component type, and how to test.
