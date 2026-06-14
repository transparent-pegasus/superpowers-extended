---
description: Interactive workflow for workspace isolation, implementation, testing, review, and cleanup
---

# /execute Workflow

This command runs the post-plan execution stages of the development cycle. Follow these steps and require user consensus before advancing to the next phase, except between Step 1 and Step 2.

## Execution Steps

1. Workspace Isolation
Inform the user that you will create an isolated workspace.
Read and use the using-git-worktrees skill to set up a new branch and worktree (e.g., feature/xxx).
Proceed directly to Step 2 after setup completes.

2. Documentation Impact Review
Inform the user that you will identify every file that must be updated if the implementation changes behavior, contracts, prompts, schema, or workflow instructions.
List the expected non-code follow-up targets before implementation begins, including `<REPO_INSTRUCTION_FILES>`, any affected files under `docs/`, `workflows/`, `.agents/`, example env/config files, and CI/deploy definitions.
Proceed to Step 3 only after the update target list is explicit.

3. Implementation and Parallel Testing
Inform the user that implementation and testing will begin.
Read and use the subagent-driven-development skill to execute the tasks sequentially.
Rule requirement: Use requesting-test-creation to dispatch the test-engineer subagent as soon as interfaces are defined.
Ensure implementation tasks and required tests are complete before proceeding.

4. Documentation Update
Inform the user that documentation and workflow updates are starting.
Update every target identified in Step 2 that is still affected by the implemented result.
If implementation changed the expected update list, revise the list first and then finish the missing updates.
Proceed to Step 5 only after the repository instructions and relevant docs are aligned with the final code.

5. Repository Verification
Inform the user that repository verification is starting.
If only documentation, workflow, or agent-instruction files changed, note that no repository-wide quality command is required and proceed.
If any non-documentation file changed, run repository verification:
- always run `<BASELINE_VERIFICATION_COMMAND>`
- also run `<SUPPLEMENTAL_VERIFICATION_COMMANDS>` that apply to the touched surfaces, such as CLI smoke tests, integration checks, deploy checks, schema/code generation, or image builds
If `<BASELINE_VERIFICATION_COMMAND>` or `<SUPPLEMENTAL_VERIFICATION_COMMANDS>` have not been initialized for the repository, stop and use `INIT-SUPERPOWERS-EXTENDED.md` before proceeding.
If a required verification command cannot run because Docker, gcloud, or another external dependency is unavailable, report the blocker explicitly and stop until the user decides whether to skip that check.
Proceed to Step 6 only when verification evidence is fresh and successful.

6. Final Code Review
Inform the user that the final review is starting.
Read and use the requesting-code-review skill to dispatch the code-reviewer subagent over the entire changeset.
Fix any critical or important issues reported by the agent.
Proceed to Step 7 only when the reviewer assesses it as Ready to merge.

7. Integration and Cleanup
Inform the user that the implementation is complete and ready for integration.
Ask the user if they want to merge the work into the main branch.
If approved, read and use the finishing-a-development-branch skill to merge changes, delete the worktree, and remove the merged branch.

## Execution Requirements

- Do not begin until a plan already exists and has been approved.
- When the plan input is only a filename and the path is ambiguous, search `<PLAN_DIRECTORY>` first and use the matching file there before checking other locations.
- Block and require user confirmation at the end of every step except Step 1. Do not proceed autonomously through the whole cycle.
- If tests fail or errors occur, pause and use the systematic-debugging skill.
- Before claiming that verification passed or the task is complete, use `verification-before-completion`.
- Read the specific `SKILL.md` file for a skill before invoking it.
