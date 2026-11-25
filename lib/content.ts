/**
 * Copy shared by the visible page and its machine-readable twins (JSON-LD,
 * llms.txt). Keep them in one place so structured data never drifts from what
 * people actually see.
 */

export const features = [
  {
    id: "theming",
    title: "Your brand in one file",
    description:
      "Colors, radius, type and shadows are tokens. Set your brand once and light and dark follow.",
  },
  {
    id: "ai-kit",
    title: "AI chat kit",
    description:
      "Messages, sources, a glowing composer and a drawer panel, ready to wire to your model.",
  },
  {
    id: "plain-css",
    title: "Plain CSS, zero runtime",
    description:
      "Styles live in their own cascade layer, so a class overrides them. No !important, no runtime.",
  },
] as const;

export const faqs = [
  {
    question: "How do I add a brand color?",
    answer:
      "Pass your hex to the theme. cherry derives hover, tint and focus tokens for light and dark.",
  },
  {
    question: "Does it work with Next.js App Router?",
    answer:
      "Yes. Import the stylesheet once in your root layout and add the theme init script to the head. Static components render as Server Components, and interactive ones mark themselves as client components, so you can import any of them from a Server Component.",
  },
] as const;
