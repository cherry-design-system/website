import { Link } from "@cherry-design-system/react";
import { BrandLockup } from "@/components/ui/BrandLockup";
import { site } from "@/lib/site";
import { InstallSnippet } from "./InstallSnippet";
import styles from "./SiteFooter.module.css";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Components", href: `${site.links.docs}/components` },
      { label: "Theming", href: `${site.links.docs}/brands` },
      { label: "AI chat kit", href: `${site.links.docs}/components/chat` },
      { label: "Figma kit", href: site.links.figma },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: site.links.docs },
      { label: "Changelog", href: `${site.links.docs}/changelog` },
      { label: "GitHub issues", href: site.links.githubIssues },
      { label: "Migrating to 2.0", href: `${site.links.docs}/migration` },
    ],
  },
];

const social = [
  { label: "cherry on GitHub", href: site.links.github, icon: "/brand/github.svg" },
  { label: "cherry on npm", href: site.links.npm, icon: "/brand/npm.svg" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <BrandLockup />
            <p className={styles.text}>
              The cherry design system: React components, tokens and a Figma
              kit.
            </p>
            <InstallSnippet location="footer" />
          </div>
          {groups.map((group) => (
            <nav
              key={group.title}
              className={styles.group}
              aria-labelledby={`footer-${group.title}`}
            >
              <h2 id={`footer-${group.title}`} className={styles.groupTitle}>
                {group.title}
              </h2>
              <ul className={styles.list}>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} variant="muted">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={styles.bottom}>
          <p className={styles.text}>
            © 2026 {site.name} · {site.license} License
          </p>
          {social.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="cherry-icon-button"
              data-variant="ghost"
              data-size="md"
              aria-label={item.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- 16px static pictogram */}
              <img src={item.icon} alt="" width={16} height={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
