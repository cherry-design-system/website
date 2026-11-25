import { NavItem, NavPill, ThemeToggle } from "@cherry-design-system/react";
import { BrandLockup } from "@/components/ui/BrandLockup";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <BrandLockup />
      <div className={styles.links}>
        <NavPill aria-label="Main">
          <NavItem href="/" active>
            Home
          </NavItem>
          <NavItem href="#components">Components</NavItem>
          <NavItem href="#ai-kit">AI kit</NavItem>
          <NavItem href={site.links.docs}>Docs</NavItem>
        </NavPill>
      </div>
      <div className={styles.actions}>
        <ThemeToggle size="sm" />
        <ButtonLink size="sm" href={site.links.docs} className={styles.cta}>
          Get started
        </ButtonLink>
      </div>
    </header>
  );
}
