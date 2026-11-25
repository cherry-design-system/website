"use client";

import { Snippet } from "@cherry-design-system/react";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";

/** The install command, copyable, with a "copied" analytics event. */
export function InstallSnippet({
  command = site.installCommand,
  location,
  className,
}: {
  command?: string;
  location: string;
  className?: string;
}) {
  return (
    <Snippet
      prompt="$"
      className={className}
      copyLabel="Copy install command"
      onCopy={() => track("install_command_copied", { location })}
    >
      {command}
    </Snippet>
  );
}
