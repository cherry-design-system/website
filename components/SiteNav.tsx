"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem, NavPill } from "@cherry-design-system/react";
import { site } from "@/lib/site";

/**
 * The main navigation: a fixed cherry NavPill floating at the top.
 *
 * - Every item is a Next.js <Link> through `asChild`, so navigation is
 *   client-side (a plain `href` on NavItem would reload the page).
 * - Route links get `active` from usePathname(), so the highlight is in the
 *   server-rendered HTML. Don't also set `trackRoute`.
 * - In-page links (`/#id`) leave `active` off: `trackSections` highlights them
 *   while their section is in view. The targets are `#ai-kit` (ProductShot)
 *   and `#components` (Showcase).
 */
export function SiteNav() {
  const pathname = usePathname();
  return (
    <NavPill aria-label="Main" position="fixed" placement="top" trackSections>
      <NavItem asChild active={pathname === "/"}>
        <Link href="/">Home</Link>
      </NavItem>
      <NavItem asChild>
        <Link href="/#ai-kit">AI kit</Link>
      </NavItem>
      <NavItem asChild>
        <Link href="/#components">Components</Link>
      </NavItem>
      <NavItem asChild>
        <Link href={site.links.docs}>Docs</Link>
      </NavItem>
    </NavPill>
  );
}
