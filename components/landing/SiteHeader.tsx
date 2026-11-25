import { ThemeToggle } from "@cherry-design-system/react";
import { BrandLockup } from "@/components/ui/BrandLockup";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <BrandLockup />
      <div className={styles.actions}>
        <ThemeToggle size="sm" />
        <a
          href={site.links.github}
          className="cherry-icon-button"
          data-variant="ghost"
          data-size="sm"
          aria-label="cherry on GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- 16px static pictogram */}
          <img src="/brand/github.svg" alt="" width={16} height={16} />
        </a>
        <ButtonLink size="sm" href={site.links.docs} className={styles.cta}>
          Get started
        </ButtonLink>
      </div>
    </header>
  );
}
