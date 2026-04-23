# Agents Guide (Codex / Cursor / Gemini CLI / non-Claude tools)

This file is the entry point for coding agents that follow the `AGENTS.md` convention (Codex, Cursor, Aider, Gemini CLI extensions, etc.). Claude Code reads `CLAUDE.md` instead; the two files describe the same framework but point at the directories each tool uses natively.

## Framework Summary

This workspace implements a **specialized multi-agent architecture** ("Superpowers") to eliminate confirmation bias in AI-driven development:

- **Independent TDD**: No production code is written until a dedicated test agent has written a failing test.
- **Isolated workspaces**: New features develop in a git worktree, never directly on `main`.
- **Bite-sized tasks**: Plans are broken into 2-5 minute steps so every change is verifiable.
- **Two-stage review**: Every task is reviewed first for spec compliance, then for code quality.

## Directory Map

| Purpose | Codex / Cursor / Gemini CLI | Claude Code |
|---|---|---|
| Agent personas | `.agents/agents/` | `.claude/agents/` |
| Skills | `.agents/skills/<name>/SKILL.md` | `.claude/skills/<name>/SKILL.md` |
| Workflows / slash commands | `workflows/` | `.claude/commands/` |
| Root docs | `docs/` | `docs/` |

The `.agents/` and `.claude/` trees mirror each other. Edit both when adding, removing, or renaming a skill or agent — or update one and re-sync with the other.

## Specialized Agents

- **`code-reviewer`** (`.agents/agents/code-reviewer.md`) — Senior reviewer. Validates plan alignment and code quality. Does NOT review test code.
- **`test-engineer`** (`.agents/agents/test-engineer.md`) — Writes tests only. Follows RED-GREEN-REFACTOR. **Iron law: NO PRODUCTION CODE.**

Dispatch them with whatever agent-delegation tooling your platform provides (Codex task dispatch, Gemini CLI subagents, etc.).

## Skills

Skills provide structured procedures. Discover them from `.agents/skills/` (or `.claude/skills/` for Claude Code). The canonical set:

**Strategic & Planning**
- `brainstorming` — Idea → approved design.
- `writing-plans` — Design → bite-sized implementation plan.

**Operational & Execution**
- `subagent-driven-development` — Primary implementation engine (fresh subagent per task, two-stage review).
- `executing-plans` — Batch execution with checkpoints (separate session).
- `dispatching-parallel-agents` — Parallelize independent tasks.
- `finishing-a-development-branch` — Merge/PR/cleanup.

**Quality & Verification**
- `test-driven-development` — RED-GREEN-REFACTOR.
- `verification-before-completion` — Evidence before completion claims.
- `systematic-debugging` — Root-cause investigation before fixes.

**Inter-Agent Communication**
- `requesting-code-review` / `receiving-code-review`
- `requesting-test-creation` / `receiving-test-creation`

**Infrastructure & Meta**
- `using-git-worktrees`, `update-docs`, `writing-skills`

## Workflows

Workflow files under `workflows/` carry frontmatter `description: ...` and are surfaced as slash commands on platforms that support them.

- `/full_cycle` — Full 6-phase cycle: brainstorm → isolate → plan → implement → review → integrate.
- `/plan` — Brainstorming + plan creation only.
- `/execute` — Post-plan execution (workspace isolation through cleanup).
- `/execute_parallel` — Execute when the plan supports parallel tracks.
- `/quick` — Shortened cycle for small-scoped changes.

On tools without native slash commands, read the workflow file directly (e.g. `workflows/full_cycle.md`) and follow the steps.

## Role Boundaries — Enforced

1. The **implementer** never writes test code. If you are acting as the implementer and a test needs to be written, dispatch the `test-engineer` subagent.
2. The **test-engineer** never writes production code. If it finds a bug during testing, it reports the bug rather than fixing it.
3. The **code-reviewer** reviews production code only; test coverage concerns go back to the test-engineer.
4. Design docs (`<DESIGN_DOC_PATH_PATTERN>`) and implementation plans (`<PLAN_PATH_PATTERN>`) are coordination artifacts — do NOT commit them.

## Initialization

This repository ships as a portable extension pack. Before using it in a real project, walk through `INIT-SUPERPOWERS-EXTENDED.md` — it lists every placeholder (`<PLAN_PATH_PATTERN>`, `<BASELINE_VERIFICATION_COMMAND>`, `<TEST_FRAMEWORK_AND_COMMANDS>`, etc.) and the files that reference them.

## Quick Start

1. Read `docs/development_cycle.md` for the 6-phase process.
2. Read `docs/skills.md` for the catalog of skills.
3. Read `docs/agents.md` for the specialized agent contracts.
4. Start a feature with `/full_cycle` (or `/plan` → `/execute`).
