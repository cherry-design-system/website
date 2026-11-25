import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    // Exported from the Figma kit (Assets > App icons).
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      {
        src: "/icons/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
      {
        src: "/icons/maskable-512x512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
  };
}
