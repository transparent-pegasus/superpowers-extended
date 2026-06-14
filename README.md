# superpowers-extended

**superpowers-extended** is a portable extension pack for AI-assisted coding agents. It layers specialized roles (code reviewer, test engineer), structured skills, and multi-phase workflows on top of any repository so AI-driven development stays rigorous, test-first, and review-gated.

## Core Principles

- **Eliminate confirmation bias.** The implementer never writes the tests; a dedicated `test-engineer` agent does. No "grading your own homework."
- **Independent TDD.** No production code ships without a failing test written first (RED-GREEN-REFACTOR).
- **Isolated workspaces.** Feature work happens in a git worktree, never on the main branch.
- **Bite-sized tasks.** Plans are broken into 2–5 minute verifiable steps.
- **Two-stage review.** Every task gets a spec-compliance review followed by a code-quality review.
- **Visual brainstorming companion (optional).** Browser-based mockups, diagrams, and visual comparisons alongside terminal conversation when a question is better seen than read.
- **Codegraph-assisted discovery (optional).** When a codegraph plugin/tool is available, skills use it to find related files, symbols, callers, callees, and impact surfaces before planning, editing, debugging, testing, or reviewing.

Tracks upstream [obra/superpowers](https://github.com/obra/superpowers) — currently synced to v5.1.0 plus post-release commit `6fd4507`.

## Optional Codegraph Integration

The codegraph integration is opportunistic. The skills activate codegraph-specific discovery rules only when a codegraph plugin or equivalent tool is available in the current agent environment. If it is not available, agents continue with the normal fallback path: `rg`, file reads, stack traces, diffs, recent commits, and manual dependency tracing.

When available, codegraph is used during brainstorming context discovery, implementation-plan file selection, plan review before execution, root-cause tracing, test-location discovery, code review scope discovery, review-feedback verification, and subagent implementation/spec-review prompts.

## Supported Platforms

superpowers-extended is multi-platform by design. The installable framework payload lives under `template/` in this repository. After installation, those files sit at the target repository root as two mirrored trees plus a shared `workflows/` directory:

| Platform | Entry point | Agents | Skills | Slash commands |
|---|---|---|---|---|
| **Claude Code** | `CLAUDE.md` | `.claude/agents/` | `.claude/skills/` | `.claude/commands/` |
| **Codex / Cursor / Aider** | `AGENTS.md` | `.agents/agents/` | `.agents/skills/` | `workflows/` (read manually) |
| **Antigravity CLI** | `AGENTS.md` | `.agents/agents/` | `.agents/skills/` | `workflows/` (read manually or adapt as custom commands) |

Each tool reads the tree it expects. The two trees mirror each other — keep them in sync when you customize.

### Claude Code

- Claude Code auto-discovers `.claude/skills/` and `.claude/agents/` and exposes `.claude/commands/` as slash commands.
- Start a feature with `/full_cycle`, or break it up with `/plan` → `/execute` / `/execute_parallel`. For small changes use `/quick`.
- Dispatch specialized agents with the Agent tool using `subagent_type: code-reviewer` or `subagent_type: test-engineer`.

### Codex / Cursor / Aider

- Add `AGENTS.md`, `.agents/`, and `workflows/` to the editor's context.
- Ask the agent to "follow the workflow in `workflows/full_cycle.md`" or "use the skill at `.agents/skills/<name>/SKILL.md`".
- Role boundaries (implementer never writes tests, test-engineer never writes production code) are enforced by the documents themselves — reference them explicitly.

### Antigravity CLI

- Antigravity CLI is Google's terminal interface for Antigravity. Google says it supports key workflow features for this pack: Agent Skills, Hooks, Subagents, and Extensions, now represented as Antigravity plugins.
- Add `AGENTS.md`, `.agents/`, and `workflows/` to the workspace context.
- Skills are invoked by name (`brainstorming`, `writing-plans`, …) after reading the matching `SKILL.md`.
- Use `workflows/*.md` directly, or adapt them as Antigravity custom commands if your setup supports command registration.

## Repository Structure

```
template/        # Files copied into the target repository root
  .agents/       # Agent personas and skills for Codex / Antigravity CLI
  .claude/       # Claude Code mirror, including slash-command copies
  .superpowers-extended/
    docs/        # Human-facing framework docs
    scripts/     # Cross-platform install/update helper scripts
    entrypoints/ # Source content to merge into target AGENTS.md / CLAUDE.md
  workflows/     # Workflow definitions
  INIT-SUPERPOWERS-EXTENDED.md
  UPDATE-SUPERPOWERS-EXTENDED.md
README.md        # Root README, copied alongside template/ contents
LICENSE          # Root license, copied alongside template/ contents
changelogs/      # Root applied upstream-refresh history and UPSTREAM_SHA
AGENTS.md        # Maintainer pointer to template/.superpowers-extended/entrypoints/AGENTS.md
CLAUDE.md        # Maintainer pointer to template/.superpowers-extended/entrypoints/CLAUDE.md
```

## Getting Started

### Using the pack in this repository

- **[Development Cycle Guide](./template/.superpowers-extended/docs/development_cycle.md)** — Step-by-step walkthrough of the 6-phase process.
- **[Specialized Agents](./template/.superpowers-extended/docs/agents.md)** — Roles of the `code-reviewer` and `test-engineer`.
- **[Superpowers (Skills)](./template/.superpowers-extended/docs/skills.md)** — Catalog of every skill and when to use it.
- **[Workflows](./template/.superpowers-extended/docs/workflows.md)** — `/full_cycle`, `/plan`, `/execute`, `/execute_parallel`, `/quick`.

### Installing the pack in a new repository

superpowers-extended is designed to be copied into other repositories as an extension pack. To install:

1. Copy the contents of `template/` into the target repository root, including hidden directories such as `.agents/`, `.claude/`, and `.superpowers-extended/`. The template stores entrypoint source files under `.superpowers-extended/entrypoints/`, so this copy does not replace root `AGENTS.md` or `CLAUDE.md`.
2. Merge `.superpowers-extended/entrypoints/AGENTS.md` into the target repo's `AGENTS.md`, or copy it to `AGENTS.md` if no such file exists.
3. Merge `.superpowers-extended/entrypoints/CLAUDE.md` into the target repo's `CLAUDE.md`, or copy it to `CLAUDE.md` if no such file exists.
4. Copy root `LICENSE` and root `changelogs/`; merge root `README.md` only after preserving target-specific content.
5. Add `.superpowers-extended/changelogs/` to the target repository's `.gitignore`; it is an update-time cache, not applied history.
6. Commit the untouched import so later diffs show only your customizations.
7. Open **[`template/INIT-SUPERPOWERS-EXTENDED.md`](./template/INIT-SUPERPOWERS-EXTENDED.md)** and follow it end-to-end. In the target repo this file lives at `INIT-SUPERPOWERS-EXTENDED.md`. It enumerates every placeholder (`<PLAN_PATH_PATTERN>`, `<BASELINE_VERIFICATION_COMMAND>`, `<TEST_FRAMEWORK_AND_COMMANDS>`, etc.) and the files that reference them.
8. Rewrite `.claude/skills/update-docs/ROOT_DOCS.md` and `.agents/skills/update-docs/ROOT_DOCS.md` to describe your real root docs.
9. Delete any skills or workflows the target repo will not use.
10. Run the validation commands at the end of `INIT-SUPERPOWERS-EXTENDED.md` to confirm no placeholders remain.

Once initialized, your agents (Claude Code, Codex, Antigravity CLI, …) will have a consistent set of specialized roles, skills, and workflows with repo-specific verification and test commands already wired in.

### Updating an existing installation

When a newer version of superpowers-extended is published, follow **[`template/UPDATE-SUPERPOWERS-EXTENDED.md`](./template/UPDATE-SUPERPOWERS-EXTENDED.md)**. In the target repo this file lives at `UPDATE-SUPERPOWERS-EXTENDED.md`. It fetches the latest changelog copy into `.superpowers-extended/changelogs/`, then walks you through a diff-driven cherry-pick of each unseen entry with explicit handling for `template/` path translation, filled placeholders, and local customizations.

## Contributing

This repository includes GitHub issue and pull-request templates under [`.github/`](./.github/) that require disclosure of the authoring environment: model, harness, harness version, installed plugins, and human review status. If an agent produced a contribution, say so plainly. If a human wrote it by hand without agent assistance, say that instead.

The `.github/` templates are for contributing to this pack. Downstream repositories should copy them only if they want the same contributor-disclosure policy.

## Changelog

Each upstream-tracking refresh is recorded in [`changelogs/`](./changelogs/) as a self-contained entry: YAML metadata (upstream version + SHA, our commit range when available), summary, reconciliation decisions, and verification notes. The current upstream sync point is in [`changelogs/UPSTREAM_SHA`](./changelogs/UPSTREAM_SHA).

## License

See [LICENSE](./LICENSE).
