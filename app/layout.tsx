import "@cherry-design-system/react/styles.css";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { themeInitScript } from "@cherry-design-system/react/theme-init";
import { ToastProvider, Toaster } from "@cherry-design-system/react";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import { site } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.fullName}`,
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: [...site.keywords],
  authors: [{ name: site.fullName, url: site.links.org }],
  creator: site.fullName,
  publisher: site.fullName,
  category: "technology",
  alternates: {
    canonical: "/",
    types: { "text/plain": "/llms.txt" },
  },
  openGraph: {
    type: "website",
    siteName: site.fullName,
    locale: "en_US",
    url: "/",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  // theme-color is set by themeInitScript so it follows the chosen mode.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Static string from cherry (no user input): sets the mode before paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="cherry-root">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ToastProvider>
          {children}
          <Toaster position="bottom" align="right" />
        </ToastProvider>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
