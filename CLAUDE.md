# Specialized Agents & Superpowers (Skills) for Claude Code

This workspace uses a specialized multi-agent architecture and structured workflows (Superpowers) to ensure high code quality, architectural integrity, and rigorous testing.

> **Non-Claude tools:** If you are running Codex, Cursor, or the Gemini CLI, read `AGENTS.md` instead. The Claude-specific copies under `.claude/` mirror `.agents/`, but path references below are the ones Claude Code uses natively.

## Specialized Agents

Agent personas live in `.claude/agents/` (Claude Code) and `.agents/agents/` (Codex/Gemini).

- **Code Reviewer (`code-reviewer`)**: Senior-level agent for validating plan alignment and code quality. (`.claude/agents/code-reviewer.md`)
- **Test Engineer (`test-engineer`)**: The **sole** entity permitted to write test code. Follows TDD (RED-GREEN-REFACTOR). (`.claude/agents/test-engineer.md`)

Dispatch them with the Agent tool using `subagent_type: code-reviewer` or `subagent_type: test-engineer`.

## Superpowers (Skills)

Skills provide structured guidance and automated procedures. In Claude Code they live at `.claude/skills/<name>/SKILL.md` and are invoked with the Skill tool.

### Strategic & Planning
- `brainstorming`: Design and requirements gathering. (`.claude/skills/brainstorming/SKILL.md`)
- `writing-plans`: Breaking designs into bite-sized tasks. (`.claude/skills/writing-plans/SKILL.md`)

### Operational & Execution
- `subagent-driven-development`: Primary implementation engine with two-stage review. (`.claude/skills/subagent-driven-development/SKILL.md`)
- `executing-plans`: Batch execution with checkpoints. (`.claude/skills/executing-plans/SKILL.md`)
- `dispatching-parallel-agents`: Partition independent work for parallel subagents. (`.claude/skills/dispatching-parallel-agents/SKILL.md`)
- `finishing-a-development-branch`: Merging and cleanup. (`.claude/skills/finishing-a-development-branch/SKILL.md`)

### Quality & Verification
- `test-driven-development`: Enforcing RED-GREEN cycles. (`.claude/skills/test-driven-development/SKILL.md`)
- `verification-before-completion`: Mandatory pre-merge checks. (`.claude/skills/verification-before-completion/SKILL.md`)
- `systematic-debugging`: Rigorous root-cause analysis. (`.claude/skills/systematic-debugging/SKILL.md`)

### Inter-Agent Communication
- `requesting-code-review`, `receiving-code-review`
- `requesting-test-creation`, `receiving-test-creation`

### Infrastructure & Meta
- `using-git-worktrees`, `update-docs`, `writing-skills`

## Slash Commands (Workflows)

Workflow files live in `workflows/` (shared) and `.claude/commands/` (Claude Code slash commands).

- `/full_cycle`: Full 6-phase development cycle (brainstorm → isolate → plan → implement → review → integrate).
- `/plan`: Brainstorming + plan creation only.
- `/execute`: Post-plan execution (workspace isolation, implementation, review, cleanup).
- `/execute_parallel`: Parallel-track execution when the plan supports it.
- `/quick`: Shortened cycle for small-scoped changes.

## Instructions for Claude Code

When operating in this workspace, you MUST:
1. **Read and follow** the detailed instructions in `.claude/skills/` and `.claude/agents/` relevant to the current task before acting.
2. **Respect role boundaries**: The `test-engineer` agent is the only one allowed to write test code. The implementer does not write tests; the test engineer does not write production code.
3. **Follow the development cycle**: Invoke the appropriate slash command (`/full_cycle`, `/plan`, `/execute`, `/execute_parallel`, `/quick`) and stay inside its phases.
4. **Use git worktrees**: Work in an isolated worktree for any new feature (see `using-git-worktrees`).
5. **Design docs and plans stay uncommitted**: Save them to `<DESIGN_DOC_PATH_PATTERN>` / `<PLAN_PATH_PATTERN>` and do not add them to git.

## Initialization

This repository ships the framework with placeholders (`<PLAN_PATH_PATTERN>`, `<BASELINE_VERIFICATION_COMMAND>`, etc.) so it can be dropped into other projects. Before using it in a real repository, follow `INIT-SUPERPOWERS-EXTENDED.md` to fill the placeholders and rewrite the docs contract in `.claude/skills/update-docs/ROOT_DOCS.md`.
