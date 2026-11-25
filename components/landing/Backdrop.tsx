import styles from "./Backdrop.module.css";

/** Hero grid and cherry glow behind the header and hero. Decorative only. */
export function Backdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.grid} />
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG */}
      <img
        className={styles.glow}
        src="/brand/hero-glow.svg"
        alt=""
        width={1100}
        height={520}
      />
    </div>
  );
}
