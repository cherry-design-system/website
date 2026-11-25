/**
 * Single source of truth for site-wide facts: name, URLs, copy reused by
 * metadata, JSON-LD, llms.txt and the page itself. Change links here only.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cherry.al"
).replace(/\/$/, "");

export const site = {
  name: "cherry",
  fullName: "cherry design system",
  url: siteUrl,
  title: "cherry: a themeable React design system in plain CSS",
  tagline: "One color in. A design system out.",
  description:
    "cherry is an open source React design system in plain CSS: more than 60 accessible components (WCAG 2.2 AA), light and dark mode from one brand color, zero styling runtime and Server Components ready.",
  shortDescription:
    "A themeable React design system in plain CSS. Accessible by default, no copied code to maintain, and any class you add still wins.",
  version: "2.0",
  license: "MIT",
  packageName: "@cherry-design-system/react",
  installCommand: "pnpm add @cherry-design-system/react lucide-react",
  keywords: [
    "React design system",
    "React component library",
    "plain CSS components",
    "zero runtime CSS",
    "React Server Components",
    "accessible React components",
    "WCAG 2.2 AA",
    "dark mode",
    "design tokens",
    "AI chat UI kit",
    "Figma UI kit",
    "Next.js components",
  ],
  links: {
    github: "https://github.com/cherry-design-system/react",
    githubIssues: "https://github.com/cherry-design-system/react/issues",
    releases: "https://github.com/cherry-design-system/react/releases",
    npm: "https://www.npmjs.com/package/@cherry-design-system/react",
    docs: "https://docs.cherry.al",
    playground: "https://v2.cherry.al",
    figma:
      "https://www.figma.com/community/file/943862931766586094/cherry-design-system",
    discord: "https://discord.gg/6JvcWU5bke",
    org: "https://github.com/cherry-design-system",
    website: "https://github.com/cherry-design-system/website",
  },
} as const;

export const absoluteUrl = (path = "/") =>
  `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
