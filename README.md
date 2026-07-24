# superpowers-extended

**superpowers-extended** is a portable extension pack for AI-assisted coding agents. It layers specialized roles (code reviewer, test engineer), structured skills, and multi-phase workflows on top of any repository so AI-driven development stays rigorous, test-first, and review-gated.

## Core Principles

- **Eliminate confirmation bias.** The implementer never writes the tests; a dedicated `test-engineer` agent does. No "grading your own homework."
- **Independent TDD.** No production code ships without a failing test written first (RED-GREEN-REFACTOR).
- **Isolated workspaces.** Feature work happens in a git worktree, never on the main branch.
- **Bite-sized tasks.** Plans are broken into 2–5 minute verifiable steps.
- **Task review.** Every task gets one task-scoped review with separate spec-compliance and code-quality verdicts.
- **Visual brainstorming companion (optional).** Browser-based mockups, diagrams, and visual comparisons alongside terminal conversation when a question is better seen than read.
- **Codegraph-assisted discovery (optional).** When a codegraph plugin/tool is available, skills use it to find related files, symbols, callers, callees, and impact surfaces before planning, editing, debugging, testing, or reviewing.

Tracks upstream [obra/superpowers](https://github.com/obra/superpowers) — currently synced to v6.1.1 (`d884ae0`).

## Optional Codegraph Integration

The codegraph integration is opportunistic. The skills activate codegraph-specific discovery rules only when a codegraph plugin or equivalent tool is available in the current agent environment. If it is not available, agents continue with the normal fallback path: `rg`, file reads, stack traces, diffs, recent commits, and manual dependency tracing.

When available, codegraph is used during brainstorming context discovery, implementation-plan file selection, plan review before execution, root-cause tracing, test-location discovery, code review scope discovery, review-feedback verification, and subagent implementation/task-review prompts.

## Supported Platforms

superpowers-extended is multi-platform by design. The payload is a single tree at the repository root, discovered by each platform's plugin convention (all three default to the same `skills/` / `commands/` / `agents/` layout):

| Platform | Skills | Workflow commands | Agents |
|---|---|---|---|
| **Claude Code** | `skills/` (auto) | `commands/` as namespaced slash commands | `agents/` |
| **Codex** | `skills/` | `commands/` (surfaced as skills) | — (not supported by Codex plugins) |
| **Cursor** | `skills/` (auto) | `commands/` as slash commands (auto) | `agents/` (auto) |
| **Aider / Gemini CLI / others** | read `skills/<name>/SKILL.md` directly | read `commands/<name>.md` directly | reference `agents/<name>.md` in prompts |

### Claude Code

- Install as a plugin (below); skills, commands, and agents load automatically.
- Initialize the repository once with `/superpowers-extended:init`, then start a feature with `/superpowers-extended:full_cycle`, or break it up with `plan` → `execute` / `execute_parallel`. For small changes use `quick`.
- Dispatch specialized agents with the Agent tool using `subagent_type: code-reviewer` or `subagent_type: test-engineer` (named `superpowers-extended:code-reviewer` / `superpowers-extended:test-engineer` under a plugin install).

### Codex / Cursor

- Install as a plugin (below). Codex surfaces the workflow commands as skills; Cursor exposes them as native slash commands and also loads the agents.
- Role boundaries (implementer never writes tests, test-engineer never writes production code) are enforced by the skill and agent documents themselves — reference them explicitly where the platform has no native agent dispatch.

### Tools without plugin support (Aider, Gemini CLI, Antigravity CLI, …)

- Check the pack into the repository (copy `skills/`, `commands/`, `agents/`, and optionally `docs/`), or vendor it as a submodule, and add the directories to the tool's context. Tools that auto-discover `.claude/` or `.agents/` trees can be pointed at copies (`cp -r skills .claude/skills`, etc.).
- Ask the agent to "follow the workflow in `commands/full_cycle.md`" or "use the skill at `skills/<name>/SKILL.md`".
- `docs/instruction_snippet.md` has a paste-ready block for the repo's instruction files.

## Repository Structure

```
skills/          # 16 skills (single tree, platform-neutral wording)
commands/        # Workflow commands: init, plan, execute, execute_parallel, full_cycle, quick
agents/          # code-reviewer.md, test-engineer.md
docs/            # Human-facing framework docs + instruction-file snippet
changelogs/      # Applied upstream-refresh history and UPSTREAM_SHA
.claude-plugin/  # Claude Code plugin + marketplace manifests
.codex-plugin/   # Codex plugin manifest
.cursor-plugin/  # Cursor plugin manifest
.agents/plugins/ # Codex marketplace manifest (fixed location per Codex convention)
AGENTS.md        # Maintainer guide for non-Claude agents working on this repo
CLAUDE.md        # Maintainer guide (changelog protocol, validation)
```

## Getting Started

### Framework documentation

- **[Development Cycle Guide](./docs/development_cycle.md)** — Step-by-step walkthrough of the 6-phase process.
- **[Specialized Agents](./docs/agents.md)** — Roles of the `code-reviewer` and `test-engineer`.
- **[Superpowers (Skills)](./docs/skills.md)** — Catalog of every skill and when to use it.
- **[Workflows](./docs/workflows.md)** — `/init`, `/full_cycle`, `/plan`, `/execute`, `/execute_parallel`, `/quick`.

### Installing as a plugin (Claude Code / Codex / Cursor)

- **Claude Code:** `/plugin marketplace add transparent-pegasus/superpowers-extended`, then `/plugin install superpowers-extended@superpowers-extended`.
- **Codex:** `codex plugin marketplace add transparent-pegasus/superpowers-extended`, then `codex plugin add superpowers-extended@superpowers-extended`.
- **Cursor:** install from this repository via the Cursor Marketplace or a team marketplace ("Import from Repo").

**After installing:** run `/superpowers-extended:init` once per repository. Plugin files are read-only, so repo-specific values (`<TARGETED_TEST_COMMAND>`, `<PLAN_PATH_PATTERN>`, …) are never written into the pack; instead, the init workflow detects the repo's tooling, confirms the values with you, and writes a `Superpowers Extended Configuration` section into the target repo's `CLAUDE.md` / `AGENTS.md`. Every skill, command, and agent resolves its `<KEY>` placeholders from that section.

### Updating an existing installation

Plugin installs update through the marketplace (`/plugin marketplace update` in Claude Code, `codex plugin marketplace upgrade` for Codex); the repo-local `Superpowers Extended Configuration` section survives updates untouched because the pack never stores repo-specific values in its own files. Repositories that carry a checked-in copy update by diffing the new `skills/` / `commands/` / `agents/` against their copy (the [`changelogs/`](./changelogs/) entries document what changed in each refresh). Installations created from the pre-2.0 `template/` layout map old paths as `template/.claude/skills/` → `skills/`, `template/workflows/` (or `template/.claude/commands/`) → `commands/`, `template/.claude/agents/` → `agents/`.

## Contributing

This repository includes GitHub issue and pull-request templates under [`.github/`](./.github/) that require disclosure of the authoring environment: model, harness, harness version, installed plugins, and human review status. If an agent produced a contribution, say so plainly. If a human wrote it by hand without agent assistance, say that instead.

The `.github/` templates are for contributing to this pack. Downstream repositories should copy them only if they want the same contributor-disclosure policy.

## Changelog

Each upstream-tracking refresh is recorded in [`changelogs/`](./changelogs/) as a self-contained entry: YAML metadata (upstream version + SHA, our commit range when available), summary, reconciliation decisions, and verification notes. The current upstream sync point is in [`changelogs/UPSTREAM_SHA`](./changelogs/UPSTREAM_SHA).

## License

See [LICENSE](./LICENSE).
