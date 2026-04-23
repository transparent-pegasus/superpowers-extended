---
description: Interactive workflow for brainstorming and plan creation only
---

# /plan Workflow

This command runs only the discovery and planning stages of the development cycle. Follow these steps and move on as soon as the design discussion is complete.

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
