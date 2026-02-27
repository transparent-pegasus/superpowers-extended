# Development Cycle Guide

This guide describes how to use the Superpowers development cycle to build and deliver high-quality code. The entire process is driven by the `/development_cycle` workflow.

## 6 Phases of Development

### Phase 1: Brainstorming (Design & Requirements)

In this phase, the Gemini CLI will ask you what you want to build. You'll engage in a design and requirement gathering discussion. No implementation code is written at this stage.

- **Purpose**: To define the feature's purpose, constraints, and success criteria.
- **Outcome**: An approved architectural design.
- **Tools**: `brainstorming` skill.

---

### Phase 2: Workspace Isolation (Safe Development)

Once the design is approved, a new branch and an isolated git worktree (e.g., `feature/xxx`) are created.

- **Purpose**: To ensure code safety and prevent context pollution.
- **Tools**: `using-git-worktrees` skill.

---

### Phase 3: Plan Creation (Bite-Sized Tasks)

The Gemini CLI breaks the approved design into small, achievable tasks. Each task is detailed with the specific files to touch and the tests to write.

- **Purpose**: To create a clear, actionable roadmap for implementation.
- **Outcome**: An implementation plan saved to `docs/plans/YYYY-MM-DD-feature.md`.
- **Tools**: `writing-plans` skill.

---

### Phase 4: Implementation (TDD & Subagents)

This is the active coding phase. Each task in the plan is executed sequentially using specialized subagents.

- **The Cycle**:
    1.  Define interfaces and types.
    2.  Dispatch the **Test Engineer** to write failing tests (**RED**).
    3.  Implement the minimal code to pass the tests (**GREEN**).
    4.  Refactor and self-review.
    5.  Perform a two-stage review: **Spec Compliance** and **Code Quality**.
- **Tools**: `subagent-driven-development` skill, `test-engineer` agent.

---

### Phase 5: Final Code Review (Quality Assurance)

After all tasks are complete, a final review of the entire changeset is performed by a senior-level agent.

- **Purpose**: To ensure the overall implementation aligns with the plan and coding standards.
- **Outcome**: A report with Critical, Important, and Suggestion-level issues.
- **Tools**: `requesting-code-review` skill, `code-reviewer` agent.

---

### Phase 6: Integration (Merge & Cleanup)

The final step is to merge the verified changes into the main branch.

- **Purpose**: To integrate the new feature and clean up the temporary workspace.
- **Outcome**: A merged feature and a deleted git worktree.
- **Tools**: `finishing-a-development-branch` skill.

---

## Your Role as a User

The Gemini CLI is designed to be autonomous but not independent. Your role is:
- **Review and Approve**: You must approve the design, the implementation plan, and the final merge.
- **Provide Context**: Answer questions from subagents to clarify requirements.
- **Confirm Success**: Validate that the implementation meets your expectations before merging.
