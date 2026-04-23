# Workflows

Workflows tie specialized agents and skills into end-to-end development procedures. They live in `workflows/` (and are mirrored into `.claude/commands/` for Claude Code so they surface as native slash commands). Each file carries YAML frontmatter `description: ...` so supporting platforms expose it as a slash command.

## Available Workflows

### `/full_cycle`

The full 6-phase development cycle for a new feature or sizeable change. Runs brainstorm → isolate → plan → implementation (with parallel testing) → documentation update → repository verification → final review → integration.

Use when: starting real feature work.

### `/plan`

Brainstorming + plan creation only. Stops after the plan is approved.

Use when: you want the design and the implementation plan, but intend to execute later (often in a different session with `/execute`).

### `/execute`

Post-plan execution: workspace isolation, documentation impact review, implementation with parallel testing, documentation update, repository verification, final code review, integration and cleanup.

Use when: a plan already exists and you want to carry it through to merge.

### `/execute_parallel`

Same as `/execute`, but extracts independent implementation tracks first and runs them in parallel worktrees before integrating on a coordination branch. Falls back to `/execute` if fewer than two independent tracks survive the extraction step.

Use when: the approved plan has tasks that truly can be implemented in parallel without shared ownership.

### `/quick`

A shortened cycle for small-scoped changes. Keeps brainstorming, documentation impact review, implementation with parallel testing, documentation update, verification, and final review. Skips separate plan creation, workspace isolation, and integration/cleanup.

Use when: the change is small enough to land without a separate written plan or an isolated worktree. If scope grows, stop and switch to `/full_cycle`.

## Guarantees

All five workflows share the same guardrails:

- **Safety**: Never write to `main`/`master` without explicit user consent; work happens on a feature branch (and, for most workflows, in a dedicated worktree).
- **Quality**: No task is marked complete without a RED-GREEN test cycle and a two-stage review.
- **Transparency**: Each step blocks for user confirmation. Agents do not proceed autonomously through the whole cycle.
- **Evidence**: `verification-before-completion` runs before any "done" claim.
- **Root cause over symptoms**: When tests fail, `systematic-debugging` drives the investigation.

## Invoking a Workflow

| Platform | How |
|---|---|
| Claude Code | Type the slash command (`/full_cycle`, `/plan`, …). They are sourced from `.claude/commands/`. |
| Gemini CLI | Slash commands read from `workflows/`. |
| Codex / Cursor / Aider | No native slash commands — read the workflow file directly (e.g. `workflows/full_cycle.md`) and instruct the agent to follow it step-by-step. |

> **See Also**: [Development Cycle Guide](./development_cycle.md) for a detailed walkthrough of each phase.
