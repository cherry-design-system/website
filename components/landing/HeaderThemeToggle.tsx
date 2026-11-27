"use client";

import {
  ThemeToggle,
  Tooltip,
  useColorModeShortcut,
} from "@cherry-design-system/react";

// The header's mode switch, plus ⌘⇧L / Ctrl+Shift+L to flip light and dark
// from anywhere on the page. The tooltip says the shortcut, and the toggle
// announces it through aria-keyshortcuts.
export function HeaderThemeToggle() {
  const shortcut = useColorModeShortcut();
  return (
    <Tooltip content={`Toggle light and dark · ${shortcut.label}`}>
      <ThemeToggle size="sm" aria-keyshortcuts={shortcut.ariaKeyShortcuts} />
    </Tooltip>
  );
}
