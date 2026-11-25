# cherry 2.0 - agent skill

Guidance for AI coding agents building with [`@cherry-design-system/react`](https://github.com/cherry-design-system/react). It teaches Claude and other agents to use cherry components for every control, pick the right one, use exact props and values, style with `--cherry-*` tokens, and provide what accessibility needs (labels, names, keyboard).

Documentation only: no runtime code, not part of the npm package.

## What's here

```
cherry-react/
  SKILL.md                 # Agent Skill: rules, quick start, which component to use
  AGENTS.md                # self-contained guide for agents that read one file
  README.md                # this file
  references/
    components.md          # every component: props, defaults, accessibility, checked example (generated)
    tokens.md              # every --cherry-* token with light/dark values (generated)
    setup.md               # install, Next.js, Vite, per-component CSS, server-side mode
    theming.md             # light/dark, useColorMode, brands, overrides, custom components
    accessibility.md       # what cherry guarantees, what you provide, keyboard, testing
```

`components.md` and `tokens.md` are generated from the component source, the manifests and the token files by `scripts/build-skill.mjs`; CI fails if they fall out of date, and every example is type-checked against the real components.

For cherry 1.x (`cherry-styled-components`) use that repo's `cherry-design-system` skill instead; the two can be installed side by side.

## Install

### The `skills` CLI (cross-agent)

The [`skills` CLI](https://github.com/vercel-labs/skills) installs into the right place for Claude Code, Cursor, Codex and other agents:

```bash
# into the current project
npx -y skills add cherry-design-system/react

# globally for Claude Code, no prompts
npx -y skills add cherry-design-system/react --skill cherry-react -g -a claude-code -y
```

Update with `npx skills update cherry-react`, remove with `npx skills remove cherry-react`. `skills` is a third-party tool; if you'd rather not use it, copy the folder by hand.

### Claude Code (manual)

```bash
# project (committed, shared with your team)
cp -r skills/cherry-react .claude/skills/

# personal, every project
cp -r skills/cherry-react ~/.claude/skills/
```

### Other agents

Put `AGENTS.md` at your repository root (or reference it from your agent's rules file: `.cursor/rules`, `CLAUDE.md`, `.github/copilot-instructions.md`). Keep the `references/` folder next to it so the agent can open the full component reference.
