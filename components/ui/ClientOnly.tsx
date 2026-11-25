"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const subscribe = () => () => {};

/**
 * Renders `children` only in the browser and `fallback` during prerendering.
 * For cherry's Calendar and DatePicker: they read "today" from the clock,
 * which must not be frozen into the static HTML (Cache Components rejects it).
 */
export function ClientOnly({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return isClient ? children : fallback;
}
