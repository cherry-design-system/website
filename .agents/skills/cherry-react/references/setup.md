# Setup

## Install

```bash
pnpm add @cherry-design-system/react lucide-react
# or: npm install / yarn add / bun add
```

`react`, `react-dom` (18.2+) and `lucide-react` are peer dependencies. cherry renders its own internal icons from `lucide-react`, and your code imports icons from it to pass as `icon` props, so the app lists it directly.

## Three things, once

1. **The stylesheet.** `import "@cherry-design-system/react/styles.css"` in your root layout or entry file. JavaScript never imports CSS by itself.
2. **The init script** in `<head>`. It sets the `dark` class on `<html>` from the visitor's preference before the first paint, so there is no flash of the wrong mode.
3. **`className="cherry-root"` on `<body>`.** It applies the canvas color, text color and font.

## Next.js (App Router)

```tsx
// app/layout.tsx
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

`suppressHydrationWarning` is needed because the script changes `<html>`'s class before React hydrates. Components without interactivity (Button, Badge, Card, Table, Prose, layout…) are Server Component safe; interactive ones carry `"use client"` themselves, so you can import any of them from a Server Component. `references/components.md` marks each one.

`themeInitScript` is a static string you control (no user input), which is why `dangerouslySetInnerHTML` is acceptable here. Under a strict CSP, serve it as a file or add its hash to `script-src`.

## Vite, Create React App and other client-only apps

```html
<!-- index.html -->
<body class="cherry-root">
  <div id="root"></div>
</body>
```

```tsx
// main.tsx
import "@cherry-design-system/react/styles.css";
import { themeInitScript } from "@cherry-design-system/react/theme-init";

// Run before the first render so the first paint is already in the right mode.
const init = document.createElement("script");
init.textContent = themeInitScript;
document.head.appendChild(init);
```

## Navigation with a router (Next.js and others)

`NavItem` renders a plain `<a>`, which reloads the page. For client-side navigation, pass your router's link with `asChild`: NavItem gives it the item's class, state and icon, and your router handles the click.

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem, NavPill } from "@cherry-design-system/react";

export function SiteNav() {
  const pathname = usePathname();
  return (
    <NavPill aria-label="Main" position="fixed" trackSections>
      <NavItem asChild active={pathname === "/"}>
        <Link href="/">Home</Link>
      </NavItem>
      <NavItem asChild>
        <Link href="/#components">Components</Link>
      </NavItem>
      <NavItem asChild active={pathname.startsWith("/docs")}>
        <Link href="/docs">Docs</Link>
      </NavItem>
    </NavPill>
  );
}
```

- **The current page:** pass `active` from your router (`usePathname()` in Next.js) so the server renders the highlight on the first paint. Or set `trackRoute` on NavPill and leave `active` off: it matches each link against the URL and follows route changes, but only after hydration.
- **In-page links** (`#section` or `/path#section`): `trackSections` highlights the one whose section is in view, with `aria-current="location"`. Give each target section an `id`.
- **Position:** `position="sticky"` or `"fixed"`, with `placement` (`top`, `bottom`, `top-start`, `top-end`, `bottom-start`, `bottom-end`). A sticky or fixed pill offsets anchor jumps so headings land below it; set `--cherry-nav-pill-offset` to change its distance from the edge.
- **Other routers:** the same `asChild` pattern works with React Router's `<Link to>` and TanStack Router's `<Link to>`. The child must render an `<a href>`.

## Only the CSS you use

Instead of `styles.css`, import `tokens.css`, `css/base.css` and the component files you render:

```ts
import "@cherry-design-system/react/tokens.css";
import "@cherry-design-system/react/css/base.css";
import "@cherry-design-system/react/css/button.css";
import "@cherry-design-system/react/css/field.css";
import "@cherry-design-system/react/css/input.css";
```

Some components render others (Field labels, DatePicker uses Calendar and Button, Toast uses Spinner): include those files too, or use `styles.css` while prototyping.

## The theme-color meta

The init script keeps `<meta name="theme-color">` in step with the mode (cherry's canvas colors by default). Use your own colors, or opt out:

```ts
import { createThemeInitScript } from "@cherry-design-system/react/theme-init";

const script = createThemeInitScript({
  themeColor: { light: "#ffffff", dark: "#0b0b0f" },
});
// createThemeInitScript({ themeColor: false }) leaves the meta alone
```

## Server-side mode

The visitor's choice lives in `localStorage` (`themePreference`: light, dark or system) and is mirrored to a `theme` cookie. Server code that needs the mode (for example to pick an image) reads the cookie with `modeFromCookie(cookies().get("theme")?.value)`. Nothing visual depends on it: the init script already set the right class.

## Other entry points

| Import                                       | What                                                                       |
| -------------------------------------------- | -------------------------------------------------------------------------- |
| `@cherry-design-system/react`                | components, hooks, `createBrand`, color-mode helpers                       |
| `@cherry-design-system/react/styles.css`     | all CSS (tokens, base, every component)                                    |
| `@cherry-design-system/react/tokens.css`     | only the tokens                                                            |
| `@cherry-design-system/react/css/<name>.css` | one component's CSS                                                        |
| `@cherry-design-system/react/theme-init`     | `themeInitScript`, `createThemeInitScript`, `modeFromCookie` (server safe) |
| `@cherry-design-system/react/tokens`         | token names as typed lists (`colorTokens`, `spaceTokens`, `textStyles`…)   |
| `@cherry-design-system/react/style-api.json` | every class, data attribute and allowed value                              |
