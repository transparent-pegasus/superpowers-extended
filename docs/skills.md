# Superpowers (Skills)

Superpowers are structured "skills" — reference guides with procedures, flowcharts, and anti-patterns — that extend an AI agent's capabilities without bloating the session context. Each skill lives in its own directory with a `SKILL.md` plus any supporting files.

## Where Skills Live

| Platform | Location |
|---|---|
| Claude Code | `.claude/skills/<name>/SKILL.md` |
| Codex / Cursor / Gemini CLI | `.agents/skills/<name>/SKILL.md` |

The two trees mirror each other. Edit both when adding or changing a skill.

## Strategic & Planning

- **`brainstorming`** — Turn an idea into an approved design through one-question-at-a-time dialogue. Writes the design to `<DESIGN_DOC_PATH_PATTERN>` (do not commit). Terminal state is invoking `writing-plans`.
- **`writing-plans`** — Break the approved design into bite-sized, TDD-shaped tasks. Writes the plan to `<PLAN_PATH_PATTERN>` (do not commit). Offers `subagent-driven-development` or `executing-plans` as next step.

## Operational & Execution

- **`subagent-driven-development`** — Primary implementation engine. Dispatches a fresh subagent per task with a two-stage review (spec compliance → code quality) after each task.
- **`executing-plans`** — Alternative for batch execution with human-in-the-loop checkpoints. Good for a separate session.
- **`dispatching-parallel-agents`** — Partition 2+ independent tasks and dispatch one subagent per domain concurrently.
- **`finishing-a-development-branch`** — Verify tests, then present four merge/PR/keep/discard options. Cleans up the worktree.

## Quality & Verification

- **`test-driven-development`** — RED-GREEN-REFACTOR reference. In this workspace, the coding agent does NOT write tests directly — it dispatches the `test-engineer` via `requesting-test-creation` while following the TDD principles as guidance.
- **`verification-before-completion`** — Mandatory evidence check before claiming a task is done. Run the verification command, read the output, THEN make the claim.
- **`systematic-debugging`** — Four-phase root-cause process (Investigation → Pattern → Hypothesis → Implementation) so bugs don't get patched with symptom fixes.

## Inter-Agent Communication

- **`requesting-code-review`** — Dispatches the `code-reviewer`. Provides the review template at `code-reviewer.md`.
- **`requesting-test-creation`** — Dispatches the `test-engineer` in parallel as soon as interfaces are defined.
- **`receiving-code-review`** — How the implementer processes review feedback (verify → evaluate → respond → implement; no performative agreement).
- **`receiving-test-creation`** — How the implementer processes test results from the test-engineer.

## Infrastructure & Meta

- **`using-git-worktrees`** — Create isolated worktrees with safety verification (`.gitignore`, baseline tests). Required before implementation starts.
- **`update-docs`** — Keep root-level `docs/*.md` aligned with the codebase according to the contract in `update-docs/ROOT_DOCS.md`.
- **`writing-skills`** — Meta-skill for creating new skills with TDD applied to documentation (pressure-test with subagents).

## How to Use a Skill

1. Read the skill's `SKILL.md` end-to-end before starting the work it describes.
2. Follow the skill's own process — flowcharts, checklists, and red flags are there for a reason.
3. If the skill references another skill as a required sub-skill, read that one first too.
4. Skills are reference guides, not checklists to blindly tick off. When the skill explicitly says "stop and ask", stop and ask.
