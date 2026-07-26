# Superpowers (Skills)

Superpowers are structured "skills" — reference guides with procedures, flowcharts, and anti-patterns — that extend an AI agent's capabilities without bloating the session context. Each skill lives in its own directory with a `SKILL.md` plus any supporting files.

## Where Skills Live

Skills live in a single tree at `skills/<name>/SKILL.md`. Claude Code, Codex, and Cursor all discover this directory through the pack's plugin manifests; other tools read the files directly.

## Strategic & Planning

- **`brainstorming`** — Turn an idea into an approved design through one-question-at-a-time dialogue. Writes the design to `<DESIGN_DOC_PATH_PATTERN>` (do not commit). Terminal state is invoking `writing-plans`. Includes an optional **visual companion** (browser-based Node.js server in `brainstorming/scripts/` and `brainstorming/visual-companion.md`) for mockups, diagrams, and visual comparisons. Inline spec self-review (placeholder/consistency/scope/ambiguity) runs before the user-review gate.
- **`writing-plans`** — Break the approved design into bite-sized, TDD-shaped tasks. Writes the plan to `<PLAN_PATH_PATTERN>` (do not commit). Includes File Structure, Task Right-Sizing, Global Constraints, per-task Interfaces, "No Placeholders" guardrails, and inline self-review. Offers `subagent-driven-development` or `executing-plans` as co-equal next steps.

## Operational & Execution

- **`subagent-driven-development`** — Primary implementation engine. Dispatches a fresh implementer per task, hands task briefs/review packages through files, runs one task review with separate spec-compliance and code-quality verdicts, and finishes with a broad whole-branch review. Implementer status protocol: `DONE / DONE_WITH_CONCERNS / BLOCKED / NEEDS_CONTEXT`. Reviewers are dispatched as the named `code-reviewer` agent (not `general-purpose`). Failed reviews enter a five-round fix loop (resume the implementer for rounds 1-3, escalate to a fresh implementer on a more capable model for 4-5), each round closed by a scoped re-review (`re-review-prompt.md`); at the cap the controller adjudicates each open finding. Includes model-selection guidance, pre-flight plan review, and a per-plan workspace (`.superpowers/sdd/<plan>/`) holding a durable progress ledger.
- **`executing-plans`** — Alternative for batch execution with human-in-the-loop checkpoints. Good for a separate session.
- **`dispatching-parallel-agents`** — Partition 2+ independent tasks and dispatch one subagent per domain concurrently.
- **`finishing-a-development-branch`** — Verify tests, then present three merge/PR/keep options. Discarding happens only when the human explicitly asks. Cleans up the worktree.

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

- **`using-git-worktrees`** — Create isolated worktrees with safety verification (`.gitignore`, baseline tests). Detects existing isolation (`GIT_DIR != GIT_COMMON`), prefers harness-native worktree tools, asks consent before creating. Required before implementation starts.
- **`update-docs`** — Keep root-level `docs/*.md` aligned with the codebase according to the contract in `update-docs/ROOT_DOCS.md`.
- **`writing-skills`** — Meta-skill for creating new skills with TDD applied to documentation (pressure-test with subagents). Bundles `examples/` for reference SKILL patterns.

## How to Use a Skill

1. Read the skill's `SKILL.md` end-to-end before starting the work it describes.
2. Follow the skill's own process — flowcharts, checklists, and red flags are there for a reason.
3. If the skill references another skill as a required sub-skill, read that one first too.
4. Skills are reference guides, not checklists to blindly tick off. When the skill explicitly says "stop and ask", stop and ask.
