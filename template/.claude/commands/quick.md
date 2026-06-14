---
description: Interactive workflow for a shortened development cycle from brainstorming through final review
---

# /quick Workflow

This command runs a shortened development cycle for small-scoped changes in this repository. It keeps the `/full_cycle` flow's brainstorming, documentation, implementation, verification, and review phases while omitting workspace isolation, separate plan creation, and integration cleanup. Follow these steps and require explicit user confirmation before advancing to the next stage.

## Execution Steps

1. Brainstorming
Ask the user what they want to build.
Read the specific `SKILL.md` for `brainstorming`.
Engage in a design and requirement gathering discussion without writing implementation code.
Proceed to Step 2 only after the design is explicit and the user confirms.

2. Documentation Impact Review
Inform the user that you will identify every file that must be updated if the implementation changes behavior, contracts, prompts, schema, or workflow instructions.
List the expected non-code follow-up targets before implementation begins, including `<REPO_INSTRUCTION_FILES>`, any affected files under `docs/`, `workflows/`, `.agents/`, example env/config files, and CI/deploy definitions.
Proceed to Step 3 only after the update target list is explicit and the user confirms.

3. Implementation and Parallel Testing
Inform the user that implementation and testing will begin.
Read the specific `SKILL.md` files for `subagent-driven-development` and `requesting-test-creation`, then execute the scoped work directly without a separate plan-creation or workspace-isolation phase.
Dispatch the `test-engineer` as soon as interfaces or types are stable enough for the touched scope.
If the touched package has no automated test harness, state that gap explicitly and use the strongest available validation instead of inventing a fake test step.
Ensure implementation tasks and required tests or equivalent validations are complete before proceeding.
Proceed to Step 4 only after the user confirms.

4. Documentation Update
Inform the user that documentation and workflow updates are starting.
Update every target identified in Step 2 that is still affected by the implemented result.
If implementation changed the expected update list, revise the list first and then finish the missing updates.
Proceed to Step 5 only after the repository instructions and relevant docs are aligned with the final code and the user confirms.

5. Repository Verification
Inform the user that repository verification is starting.
If only documentation, workflow, or agent-instruction files changed, note that no repository-wide quality command is required and proceed.
If any non-documentation file changed, run repository verification:
- always run `<BASELINE_VERIFICATION_COMMAND>`
- also run `<SUPPLEMENTAL_VERIFICATION_COMMANDS>` that apply to the touched surfaces, such as CLI smoke tests, integration checks, deploy checks, schema/code generation, or image builds
If `<BASELINE_VERIFICATION_COMMAND>` or `<SUPPLEMENTAL_VERIFICATION_COMMANDS>` have not been initialized for the repository, stop and use `INIT-SUPERPOWERS-EXTENDED.md` before proceeding.
If a required verification command cannot run because Docker, gcloud, or another external dependency is unavailable, report the blocker explicitly and stop until the user decides whether to skip that check.
Proceed to Step 6 only when verification evidence is fresh, successful, and the user confirms.

6. Final Code Review
Inform the user that the final review is starting.
Read the specific `SKILL.md` for `requesting-code-review`, then dispatch the `code-reviewer` subagent over the entire changeset.
Fix any critical or important issues reported by the agent.
Proceed only when the reviewer assesses it as Ready to merge and the user confirms.

## Execution Requirements

- Use `/quick` only when the change is small enough to proceed without a separate written implementation plan or an isolated worktree.
- If the work expands beyond that scope, stop and switch to `/full_cycle`, or use `/plan` followed by `/execute`.
- Treat `<REPO_INSTRUCTION_FILES>`, the repository's build/test/deploy configuration, and the latest approved plan as the source of truth for repository-specific commands, environment variables, and deploy flows.
- Block and require user confirmation at the end of every step. Do not proceed autonomously through the whole cycle.
- If tests fail or errors occur, pause and use the `systematic-debugging` skill.
- Before claiming that verification passed or the task is complete, use `verification-before-completion`.
- Read the specific `SKILL.md` file for a skill before invoking it.
