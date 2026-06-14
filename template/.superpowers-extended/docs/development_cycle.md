# Development Cycle Guide

This guide describes the 6-phase Superpowers development cycle. The full cycle is driven by the `/full_cycle` workflow; `/plan`, `/execute`, `/execute_parallel`, and `/quick` run structured subsets.

## 6 Phases of Development

### Phase 1: Brainstorming (Design & Requirements)

The agent asks what you want to build and engages in a design and requirements discussion. No implementation code is written at this stage.

- **Purpose**: Define the feature's purpose, constraints, and success criteria.
- **Outcome**: An approved architectural design saved to `<DESIGN_DOC_PATH_PATTERN>` (not committed).
- **Skill**: `brainstorming`.

---

### Phase 2: Workspace Isolation (Safe Development)

Once the design is approved, a new branch and isolated git worktree (e.g., `feature/xxx`) are created.

- **Purpose**: Keep main untouched and prevent context pollution between features.
- **Skill**: `using-git-worktrees`.

---

### Phase 3: Plan Creation (Bite-Sized Tasks)

The agent breaks the approved design into small, achievable tasks. Each task specifies the exact files to touch and the tests to write.

- **Purpose**: Create a clear, actionable roadmap.
- **Outcome**: A plan saved to `<PLAN_PATH_PATTERN>` (not committed).
- **Skill**: `writing-plans`.

---

### Phase 4: Implementation (TDD & Subagents)

The active coding phase. Each task in the plan is executed sequentially using specialized subagents.

- **The per-task cycle**:
    1. Define interfaces and types.
    2. Dispatch the **test-engineer** to write failing tests (**RED**) — in parallel with implementation.
    3. Implement the minimal code to pass the tests (**GREEN**).
    4. Self-review and commit.
    5. Two-stage review: **Spec Compliance** first, then **Code Quality**.
- **Skills**: `subagent-driven-development`, `requesting-test-creation`, `test-driven-development`.
- **Agents**: `test-engineer`, `code-reviewer`.

---

### Phase 5: Final Code Review (Quality Assurance)

After all tasks complete, a final review of the entire changeset runs on the coordination branch.

- **Purpose**: Ensure the overall implementation aligns with the plan and coding standards.
- **Outcome**: A report with Critical / Important / Minor issues.
- **Skill**: `requesting-code-review`. **Agent**: `code-reviewer`.

---

### Phase 6: Integration (Merge & Cleanup)

The final step is to merge the verified changes into the base branch and clean up the worktree.

- **Purpose**: Integrate the new feature and remove the temporary workspace.
- **Outcome**: A merged feature branch and a cleaned-up worktree.
- **Skill**: `finishing-a-development-branch`.

---

## Supporting Rules

Throughout the cycle, these skills are always in play:

- **`verification-before-completion`** — Before claiming anything works, run the verification command and read the output.
- **`systematic-debugging`** — When something fails, find the root cause before proposing fixes.
- **`update-docs`** — When code or config changes alter behavior covered in `docs/`, update the affected root docs.

## Your Role as a User

The agent is autonomous within a phase but not independent across phases. You:

- **Review and approve**: Approve the design, the plan, and the final merge.
- **Provide context**: Answer clarifying questions before the agent proceeds.
- **Confirm success**: Validate that the implementation meets your expectations before merging.

Every workflow (`/full_cycle`, `/plan`, `/execute`, `/execute_parallel`, `/quick`) blocks for user confirmation between phases. That is by design.
