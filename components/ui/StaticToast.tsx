import { Check } from "lucide-react";
import styles from "./StaticToast.module.css";

/**
 * A still picture of a cherry success toast, for showcase layouts. Real toasts
 * come from `useToast()` and live in the Toaster; this one is decorative
 * content, so it has no live region and no close button.
 */
export function StaticToast({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={styles.toast}>
      <span className={styles.tile} aria-hidden="true">
        <Check size={18} strokeWidth={2.5} />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </span>
    </div>
  );
}
