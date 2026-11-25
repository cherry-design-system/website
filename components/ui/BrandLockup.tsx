import styles from "./BrandLockup.module.css";

/**
 * The cherry lockup from the Figma kit (Brand/Lockup): the glyph plus the
 * wordmark with the "rr" in the two cherry tones. Scale it, don't restyle it.
 */
export function BrandLockup({
  href = "/",
  label = "cherry home",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <a href={href} className={styles.lockup} aria-label={label}>
      <span className={styles.logo} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG, no optimisation needed */}
        <img
          className={styles.glyph}
          src="/brand/cherry-glyph.svg"
          alt=""
          width={68.267}
          height={68.267}
        />
      </span>
      <span className={styles.word} aria-hidden="true">
        che<span className={styles.rLight}>r</span>
        <span className={styles.rDeep}>r</span>y
      </span>
    </a>
  );
}
