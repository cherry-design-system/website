# Theming and styling

## Light and dark

The mode is the `dark` class on `<html>`, set before the first paint by `themeInitScript` (see `setup.md`). Every `--cherry-*` color token holds both values and switches with that class, so:

- never branch on the mode in JavaScript to pick a color;
- never write `.dark .my-thing { color: … }` for a cherry color: use the token and it already switches;
- only for something CSS cannot style (a canvas, a chart library) read the mode in JS.

Let visitors choose with `<ThemeToggle />` (System, Light, Dark). To read or set the preference yourself:

```tsx
"use client";
import { useColorMode } from "@cherry-design-system/react";

function ModeMenu() {
  const { mode, preference, setPreference, toggle } = useColorMode();
  // mode: "light" | "dark" (in force); preference: "light" | "dark" | "system"
  return (
    <button onClick={() => setPreference("system")}>
      Follow system ({mode})
    </button>
  );
}
```

The preference is stored in `localStorage` (`themePreference`) and mirrored to a `theme` cookie; "system" follows the OS live. `useColorMode` reports light/system during server rendering; the init script has already applied the real mode, so nothing visible depends on it.

### A section in a fixed mode

Scope any element to a mode, regardless of the page:

```tsx
<section data-cherry-mode="dark">…always dark…</section>
<aside data-cherry-mode="light">…always light…</aside>
```

## Brands

`createBrand` builds a validated CSS block for a `[data-cherry-brand="<name>"]` scope. One accent color is enough: hover, subtle, text and ring shades are derived for both modes.

```ts
import { createBrand } from "@cherry-design-system/react";

export const acme = createBrand("acme", { accent: "#5b5bd6" });
// per mode: createBrand("acme", { accent: { light: "#5b5bd6", dark: "#8b8bf0" } })
// optional primary: { primary: { light: "#111827", dark: "#f9fafb" } }
```

Put `acme.css` in your stylesheet (it is plain CSS, so it works under a strict `style-src 'self'` CSP), then scope with the attributes:

```tsx
<body className="cherry-root" {...acme.attributes}>
  …
</body>
```

`createBrand` rejects anything that is not a plain color (no `var()`, keywords, quotes or declarations), so it is safe to feed user-chosen colors; it throws `BrandValidationError` otherwise. Check the accent still gives at least 4.5:1 with white text (`--cherry-fg-on-accent`) if buttons use it.

## Overriding styles

All cherry rules live in `@layer cherry`. Any rule you write outside a layer wins, without `!important` and without matching specificity:

```css
/* your CSS */
.checkout-button {
  width: 100%;
  border-radius: var(--cherry-radius-full);
}
```

```tsx
<Button className="checkout-button">Pay</Button>
```

- Use `--cherry-*` tokens in overrides (`references/tokens.md`), so they follow light/dark and brands.
- Target cherry's stable hooks when needed: classes `cherry-<name>` and `cherry-<name>__<part>`, variants and states as `data-*` attributes (`[data-variant="outline"]`, `[data-size="sm"]`, `[data-invalid]`). `@cherry-design-system/react/style-api.json` lists every one.
- Tailwind: its utilities live in layers too, and of two layers the one declared later wins. Declare cherry's layer first so utilities override it, at the top of your main CSS: `@layer cherry, theme, base, components, utilities;` (or import cherry's `styles.css` before Tailwind).
- Don't restyle focus away: if you change a control's `box-shadow`, keep `:focus-visible` showing `var(--cherry-ring)`.

## Your own components

When cherry has no component for something, build it with semantic HTML and a class:

```css
.plan-card {
  padding: var(--cherry-space-5);
  border: 1px solid var(--cherry-border-default);
  border-radius: var(--cherry-radius-xl);
  background: var(--cherry-bg-elevated);
  color: var(--cherry-fg-default);
  box-shadow: var(--cherry-elevation-sm);
  transition: box-shadow var(--cherry-duration-fast)
    var(--cherry-easing-standard);
}
.plan-card:hover {
  box-shadow: var(--cherry-elevation-md);
}
.plan-card:focus-visible {
  outline: 2px solid transparent; /* repainted in Windows High Contrast */
  box-shadow: var(--cherry-ring);
}
.plan-card__price {
  font-size: var(--cherry-text-h3-size);
  line-height: var(--cherry-text-h3-line-height);
  font-weight: var(--cherry-text-h3-weight);
}
.plan-card__note {
  color: var(--cherry-fg-muted); /* not fg-subtle: that one is below 4.5:1 */
}
```

Compose cherry components inside it (`Button`, `Badge`, `Card`) rather than recreating them, use the motion tokens for transitions (they shorten under reduced motion), and follow `accessibility.md`.
