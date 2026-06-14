---
description: Interactive workflow to execute the entire development cycle from brainstorming to merge
---

# /full_cycle Workflow

This command executes the full development cycle interactively. Follow these steps and move on as soon as each stage is complete.

## Execution Steps

1. Brainstorming
Ask the user what they want to build.
Read the brainstorming SKILL.md.
Engage in a design and requirement gathering discussion without writing implementation code.
Proceed to Step 2 as soon as the last clarifying question has been answered and there are no unresolved design concerns.

2. Workspace Isolation
Inform the user that you will create an isolated workspace.
Read and use the using-git-worktrees skill to set up a new branch and worktree (e.g., feature/xxx).

3. Plan Creation
Inform the user that you will create an implementation plan.
Read and use the writing-plans skill to break the design into small achievable tasks.
Save the plan to `<PLAN_PATH_PATTERN>`.
Ask the user to review and approve the plan.
Proceed to Step 4 only after the user approves the plan.

4. Documentation Impact Review
Inform the user that you will identify every file that must be updated if the implementation changes behavior, contracts, prompts, schema, or workflow instructions.
List the expected non-code follow-up targets before implementation begins, including `<REPO_INSTRUCTION_FILES>`, any affected files under `docs/`, `workflows/`, `.agents/`, example env/config files, and CI/deploy definitions.
Proceed to Step 5 only after the update target list is explicit.

5. Implementation and Parallel Testing
Inform the user that implementation and testing will begin.
Read and use the subagent-driven-development skill to execute the tasks sequentially.
Rule requirement: Use requesting-test-creation to dispatch the test-engineer subagent as soon as interfaces are defined.
Ensure implementation tasks and required tests are complete before proceeding.

6. Documentation Update
Inform the user that documentation and workflow updates are starting.
Update every target identified in Step 4 that is still affected by the implemented result.
If implementation changed the expected update list, revise the list first and then finish the missing updates.
Proceed to Step 7 only after the repository instructions and relevant docs are aligned with the final code.

7. Repository Verification
Inform the user that repository verification is starting.
If only documentation, workflow, or agent-instruction files changed, note that no repository-wide quality command is required and proceed.
If any non-documentation file changed, run repository verification:
- always run `<BASELINE_VERIFICATION_COMMAND>`
- also run `<SUPPLEMENTAL_VERIFICATION_COMMANDS>` that apply to the touched surfaces, such as CLI smoke tests, integration checks, deploy checks, schema/code generation, or image builds
If `<BASELINE_VERIFICATION_COMMAND>` or `<SUPPLEMENTAL_VERIFICATION_COMMANDS>` have not been initialized for the repository, stop and use `INIT-SUPERPOWERS-EXTENDED.md` before proceeding.
If a required verification command cannot run because Docker, gcloud, or another external dependency is unavailable, report the blocker explicitly and stop until the user decides whether to skip that check.
Proceed to Step 8 only when verification evidence is fresh and successful.

8. Final Code Review
Inform the user that the final review is starting.
Read and use the requesting-code-review skill to dispatch the code-reviewer subagent over the entire changeset.
Fix any critical or important issues reported by the agent.
Proceed to Step 9 only when the reviewer assesses it as Ready to merge.

9. Integration and Cleanup
Inform the user that the implementation is complete and ready for integration.
Ask the user if they want to merge the work into the main branch.
If approved, read and use the finishing-a-development-branch skill to merge changes and delete the worktree.

## Execution Requirements

- Block and require user confirmation at the end of every step. Do not proceed autonomously through the whole cycle.
- If tests fail or errors occur, pause and use the systematic-debugging skill.
- Before claiming that verification passed or the task is complete, use `verification-before-completion`.
- Read the specific `SKILL.md` file for a skill before invoking it.
