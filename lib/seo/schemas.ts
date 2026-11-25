import { faqs } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

/** One canonical id, referenced by every other node. */
export const ORGANIZATION_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;
const SOFTWARE_ID = `${site.url}/#software`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.fullName,
    alternateName: site.name,
    url: site.url,
    logo: absoluteUrl("/icons/android-chrome-512x512.png"),
    description: site.description,
    sameAs: [site.links.org, site.links.github, site.links.npm],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.fullName,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function softwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "SoftwareSourceCode"],
    "@id": SOFTWARE_ID,
    name: `${site.fullName} ${site.version}`,
    alternateName: site.packageName,
    description: site.description,
    url: site.url,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "UI component library",
    operatingSystem: "Web",
    softwareVersion: site.version,
    license: "https://opensource.org/licenses/MIT",
    codeRepository: site.links.github,
    programmingLanguage: ["TypeScript", "CSS"],
    runtimePlatform: "React",
    keywords: site.keywords.join(", "),
    featureList: [
      "More than 60 React components",
      "Light and dark mode from one brand color",
      "Plain CSS in a cascade layer, zero styling runtime",
      "React Server Components ready",
      "Accessible by default (WCAG 2.2 AA)",
      "AI chat kit: messages, sources, composer and drawer panel",
      "Figma kit with matching tokens",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    image: absoluteUrl("/opengraph-image.png"),
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Mirrors the accordions on the page exactly, as Google requires. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
