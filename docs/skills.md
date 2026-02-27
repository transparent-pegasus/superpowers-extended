# Superpowers (Skills)

Superpowers are specialized "skills" that extend the capabilities of AI assistants. These skills provide structured workflows, expert guidance, and automated procedures for various development tasks.

Depending on your platform, these skills are located in:
- **Gemini CLI / Codex**: `.agents/skills/`
- **Claude Code**: `.claude/skills/`

##  Strategic & Planning

Skills used at the beginning of a feature's lifecycle to ensure a solid foundation.

- **`brainstorming`**: From idea to approved design. Engages in requirement gathering and architecture discussion without writing code.
- **`writing-plans`**: Breaks a design into bite-sized, achievable tasks assuming the engineer has zero codebase context.

##  Operational & Execution

Skills used during the active implementation of a feature.

- **`subagent-driven-development`**: The primary engine for implementation. Dispatches fresh subagents per task with a two-stage review process (Spec Compliance → Code Quality).
- **`executing-plans`**: An alternative for batch execution with checkpoints, ideal for parallel sessions.
- **`finishing-a-development-branch`**: Completes development work by guiding the merge, PR, or cleanup process.

##  Quality & Verification

Skills dedicated to maintaining high standards and preventing regressions.

- **`test-driven-development`**: Enforces writing failing tests first (RED) and verifies behavior before implementation.
- **`verification-before-completion`**: A mandatory check before claiming a task is done, requiring evidence of passing tests and functional correctness.
- **`systematic-debugging`**: A rigorous approach to root-cause analysis and fixing bugs when tests fail or errors occur.

##  Inter-Agent Communication

Skills that facilitate collaboration between specialized agents.

- **`requesting-code-review`**: Dispatches the `code-reviewer` agent to validate a completed changeset.
- **`requesting-test-creation`**: Dispatches the `test-engineer` agent as soon as interfaces are defined.
- **`receiving-code-review`**: Guides the implementation agent through addressing feedback from a code review.
- **`receiving-test-creation`**: Handles the results and reports from the `test-engineer`.

##  Infrastructure & Workspace

- **`using-git-worktrees`**: Sets up isolated workspaces for each feature to prevent context pollution and ensure safety.
- **`using-superpowers`**: The foundational skill for discovering and invoking other superpowers.
