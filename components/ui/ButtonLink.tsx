import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { ButtonProps } from "@cherry-design-system/react";
import { cx } from "@cherry-design-system/react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Opens in a new tab with a safe rel, and says so to screen readers. */
  external?: boolean;
};

/**
 * A link that looks like a cherry Button. Navigation must be an <a>, so this
 * renders cherry's stable button hooks (`cherry-button`, data-variant,
 * data-size) on an anchor instead of wrapping a <button> in a link.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  external,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={cx("cherry-button", className)}
      data-variant={variant}
      data-size={size}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {leadingIcon ? (
        <span className="cherry-button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      <span className="cherry-button__label">
        {children}
        {external ? (
          <span className="visually-hidden"> (opens in a new tab)</span>
        ) : null}
      </span>
      {trailingIcon ? (
        <span className="cherry-button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </a>
  );
}
