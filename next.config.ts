import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // Extra hosts allowed to load dev resources (e.g. a Tailscale URL), from
  // .env.local so machine names stay out of the repo. Ignored in production.
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",").filter(Boolean),
  // PostHog's API paths end in a slash; don't redirect them.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      // First-party proxy for PostHog (EU Cloud), so ad blockers don't drop
      // analytics.
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // The old docs site lived at cherry.al and now lives at docs.cherry.al, where
  // the 1.x pages sit under /v1. Keep every old URL working (and its search
  // ranking) with permanent redirects. The paths come from the old sitemap.
  async redirects() {
    const v1 = "https://docs.cherry.al/v1";
    const pages = [
      "accordions",
      "buttons",
      "colors",
      "figma",
      "icons",
      "inputs",
      "overlays",
      "shadows",
      "site-images",
      "tabs",
      "typography",
    ];
    // Old social-card assets stayed at the docs root.
    const assets = ["preview.png", "icon.png"];
    return [
      { source: "/code", destination: `${v1}/code`, permanent: true },
      {
        source: "/code/:path*",
        destination: `${v1}/code/:path*`,
        permanent: true,
      },
      ...pages.map((page) => ({
        source: `/${page}`,
        destination: `${v1}/${page}`,
        permanent: true,
      })),
      ...assets.map((file) => ({
        source: `/${file}`,
        destination: `https://docs.cherry.al/${file}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
