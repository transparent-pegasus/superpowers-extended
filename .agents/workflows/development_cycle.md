---
description: Interactive workflow to execute the entire Superpowers development cycle from brainstorming to merge
---

# /development_cycle Workflow

This command executes the full Superpowers development cycle interactively. Follow these steps and require user consensus before advancing to the next phase.

## Execution Steps

1. Brainstorming
Ask the user what they want to build.
Read the brainstorming SKILL.md.
Engage in a design and requirement gathering discussion without writing implementation code.
Proceed to Step 2 only after the user agrees on the design.

2. Workspace Isolation
Inform the user that you will create an isolated workspace.
Read and use the using-git-worktrees skill to set up a new branch and worktree (e.g., feature/xxx).

3. Plan Creation
Inform the user that you will create an implementation plan.
Read and use the writing-plans skill to break the design into small achievable tasks.
Save the plan to docs/plans/YYYY-MM-DD-feature.md.
Ask the user to review and approve the plan.
Proceed to Step 4 only after the user approves the plan.

4. Implementation and Parallel Testing
Inform the user that implementation and testing will begin.
Read and use the subagent-driven-development skill to execute the tasks sequentially.
Rule requirement: Use requesting-test-creation to dispatch the test-engineer subagent as soon as interfaces are defined.
Ensure all tasks pass compliance checks, quality reviews, and have GREEN test results before proceeding.

5. Final Code Review
Inform the user that the final review is starting.
Read and use the requesting-code-review skill to dispatch the code-reviewer subagent over the entire changeset.
Fix any critical or important issues reported by the agent.
Proceed to Step 6 only when the reviewer assesses it as Ready to merge.

6. Integration and Cleanup
Inform the user that the implementation is complete and ready for integration.
Ask the user if they want to merge the work into the main branch.
If approved, read and use the finishing-a-development-branch skill to merge changes and delete the worktree.

## Execution Requirements

- Block and require user confirmation at the end of every step. Do not proceed autonomously through the whole cycle.
- If tests fail or errors occur, pause and use the systematic-debugging skill.
- You must use view_file to read the specific SKILL.md file for a skill before invoking it.
