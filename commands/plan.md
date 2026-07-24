---
description: Interactive workflow for brainstorming and plan creation only
---

# /plan Workflow

This command runs only the discovery and planning stages of the development cycle. Follow these steps and move on as soon as the design discussion is complete.

## Deliverable Saves

Whenever this workflow saves a deliverable, also save any corresponding design/plan files in the same change so the artifact and its rationale stay together.

## Workflow File Edits

Do not edit workflow files unless the user's current request explicitly asks to change a workflow file or workflow behavior. A workflow path alone can select the workflow context; it is not permission to edit that file. For example, `update commands/plan.md ...` permits editing the workflow, while `commands/plan.md add a feature ... to the app` does not.

## Configuration

`<KEY>` placeholders in this workflow (for example `<PLAN_PATH_PATTERN>`) resolve from the `Superpowers Extended Configuration` section of the repository's instruction files (`CLAUDE.md` / `AGENTS.md`). If that section is missing, run the pack's init workflow first: `/superpowers-extended:init` on Claude Code plugin installs, or `commands/init.md` otherwise.

## Execution Steps

1. Brainstorming
Ask the user what they want to build.
Read the brainstorming SKILL.md.
Engage in a design and requirement gathering discussion without writing implementation code.
Proceed to Step 2 as soon as the last clarifying question has been answered and there are no unresolved design concerns.

2. Plan Creation
Inform the user that you will create an implementation plan.
Read and use the writing-plans skill to break the design into small achievable tasks.
Save the plan to `<PLAN_PATH_PATTERN>`.
Ask the user to review and approve the plan.

## Execution Requirements

- Stop after the plan is approved. Do not enter implementation, testing, review, or merge steps.
- The remaining development-cycle responsibilities live in `/execute`, `/execute_parallel`, and `/full_cycle`, not in `<REPO_INSTRUCTION_FILES>`.
- If the design discussion changes scope materially, revisit Brainstorming before writing the plan.
- Do not wait for an explicit approval phrase if the final question has already been answered and the design is otherwise complete.
- Read the specific `SKILL.md` file for a skill before invoking it.
