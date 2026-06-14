---
description: Interactive workflow for isolated parallel execution, testing, review, and cleanup
---

# /execute_parallel Workflow

This command runs the post-plan execution stages of the development cycle when the approved plan contains tasks that can be implemented safely in parallel. Follow these steps and require user consensus before advancing to the next phase, except between Step 2 and Step 3.

## Execution Steps

1. Implementation Track Extraction
Inform the user that you will extract confirmed implementation tracks before creating any worktree.
Read and use the dispatching-parallel-agents skill to partition the approved plan into independent implementation tracks before creating any worktree or dispatching any implementer.
When extracting tracks:
- include only implementation work that can be owned and verified independently
- exclude documentation updates, repository-wide verification, final review, integration, cleanup, and other coordination tasks from parallel tracks
- split any mixed-scope item such as `implementation + docs update` into one implementation track plus a post-integration follow-up task
- require each track to define a goal, owned files, dependencies, expected verification, and documentation impact
- name tracks by module or behavior, not by generic phase labels such as `implementation` or `documentation update`
- produce one explicit post-integration update list covering `<REPO_INSTRUCTION_FILES>`, any affected files under `docs/`, `workflows/`, `.agents/`, example env/config files, and CI/deploy definitions

Parallelize only tracks that satisfy all of the following:
- no ordering dependency between tasks
- no overlapping write ownership
- no shared mutable artifact that would require same-session coordination
- integration can be deferred until after all parallel tracks complete

If fewer than two confirmed implementation tracks remain after this extraction, stop parallel execution and continue with `/execute` instead.
Require user confirmation of the extracted track table before moving to Step 2.

2. Workspace Isolation
Inform the user that you will create isolated workspaces for the confirmed implementation tracks.
Read and use the using-git-worktrees skill to create one coordination branch/worktree plus one per-track worktree for each confirmed implementation track.
Ensure every parallel track starts from the same approved base and has a clearly assigned ownership boundary.
Proceed directly to Step 3 after setup completes.

3. Parallel Implementation and Testing
Inform the user that parallel implementation and testing will begin.
For each confirmed implementation track:
- assign one implementation subagent and one isolated worktree
- provide the exact task text, owned files, constraints, and expected verification
- require the implementer to stop and escalate if the task expands beyond its assigned ownership
- use requesting-test-creation to dispatch the test-engineer subagent as soon as interfaces are defined for that track
- run track-local verification before considering the track complete

After all parallel tracks complete:
- integrate changes onto the coordination branch in a controlled order
- resolve conflicts before proceeding
- stop if integration reveals that the original post-integration update list is incomplete, then revise the list before moving on

4. Documentation Update
Inform the user that post-integration documentation and workflow updates are starting.
Apply every deferred update identified in Step 1 that still matters after integration.
Proceed to Step 5 only after the repository instructions and relevant docs are aligned with the integrated result.

5. Repository Verification
Inform the user that repository verification is starting on the integrated result.
If only documentation, workflow, or agent-instruction files changed, note that no repository-wide quality command is required and proceed.
If any non-documentation file changed, run repository verification:
- always run `<BASELINE_VERIFICATION_COMMAND>`
- also run `<SUPPLEMENTAL_VERIFICATION_COMMANDS>` that apply to the touched surfaces, such as CLI smoke tests, integration checks, deploy checks, schema/code generation, or image builds
If `<BASELINE_VERIFICATION_COMMAND>` or `<SUPPLEMENTAL_VERIFICATION_COMMANDS>` have not been initialized for the repository, stop and use `INIT-SUPERPOWERS-EXTENDED.md` before proceeding.
If a required verification command cannot run because Docker, gcloud, or another external dependency is unavailable, report the blocker explicitly and stop until the user decides whether to skip that check.
Proceed to Step 6 only when verification evidence is fresh and successful.

If any task is discovered to be coupled, conflicting, or blocked on another track, stop parallel execution for that task and continue it sequentially.

6. Final Code Review
Inform the user that the final review is starting.
Read and use the requesting-code-review skill to dispatch the code-reviewer subagent over the fully integrated changeset on the coordination branch.
Fix any critical or important issues reported by the agent.
Proceed to Step 7 only when the reviewer assesses it as Ready to merge.

7. Integration and Cleanup
Inform the user that the implementation is complete and ready for integration.
Ask the user if they want to merge the coordination branch into the main branch.
If approved, read and use the finishing-a-development-branch skill to merge changes, delete all temporary worktrees, and remove the merged branches.

## Execution Requirements

- Do not begin until a plan already exists and has been approved.
- When the plan input is only a filename and the path is ambiguous, search `<PLAN_DIRECTORY>` first and use the matching file there before checking other locations.
- Block and require user confirmation at the end of every step except Step 2. Do not proceed autonomously through the whole cycle.
- Never run multiple implementation subagents against the same worktree.
- Never create per-track worktrees until the implementation track extraction step has completed and been confirmed.
- Never parallelize tasks with overlapping file ownership unless the user explicitly approves a revised plan that serializes the overlap.
- Treat documentation updates as post-integration tasks unless the user explicitly approves a docs-only parallel track with independent ownership.
- If an approved plan item mixes implementation and documentation, split it into separate tasks before dispatching any implementer.
- If fewer than two confirmed implementation tracks remain, use `/execute` instead of `/execute_parallel`.
- Treat the coordination branch as the only branch that may receive the final integrated result before review.
- If tests fail or errors occur, pause and use the systematic-debugging skill.
- Before claiming that verification passed or the task is complete, use `verification-before-completion`.
- Read the specific `SKILL.md` file for a skill before invoking it.
