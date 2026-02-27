# superpowers-extended

Welcome to **superpowers-extended**. This workspace provides a highly structured, AI-driven development framework designed for professional software engineering. It builds upon the "superpowers" philosophy, emphasizing Test-Driven Development (TDD), specialized AI roles, and rigorous review cycles to deliver high-quality code.

## Core Principles

- **Eliminating Confirmation Bias**: By separating the Test Engineer from the Implementer, we prevent the "grading their own homework" effect where an AI agent writes tests that only confirm its own assumptions.
- **Independent Test-Driven Development (TDD)**: No production code is written until an independent test agent has created a failing test (RED).
- **Isolated Workspaces**: Safe development using git worktrees to prevent context pollution.
- **Bite-Sized Tasks**: Granular, testable implementation plans that ensure constant verification.

## Platform Usage Guides

**superpowers-extended** is designed to work seamlessly across different AI-assisted development environments. Each platform interacts with the `.agents` folder to provide structured capabilities.

### Claude Code

When using Claude Code, **superpowers-extended** acts as a set of structured instructions and tools provided by the `.claude` directory.

- **Workflow Initiation**: Ask Claude to "Follow the development cycle in `.agents/workflows/development_cycle.md`" to begin a feature.
- **Skill Execution**: Claude will automatically use the `Skill` tool to read and follow the instructions in the `.claude/skills/` directory.
- **Agent Dispatch**: Claude can "delegate" tasks to himself by adopting the personas defined in `.claude/agents/` for specialized roles.

### Codex (GitHub Copilot / Cursor)

For IDE-based AI assistants like GitHub Copilot (Codex) or Cursor, **superpowers-extended** serves as a rigorous project-level documentation and instruction set.

- **Context Loading**: Add `.agents/`, and their subdirectories to your IDE's context (e.g., via `@workspace` or `README` context).
- **Execution**: Direct the AI to "Execute the current task from the implementation plan in `docs/plans/` using the `test-driven-development` skill in `.agents/skills/test-driven-development/SKILL.md`."
- **Verification**: Use the instructions in `docs/development_cycle.md` as a checklist for your development progress.

### Gemini CLI

In the Gemini CLI, **superpowers-extended** is fully integrated as a native extension.

- **Primary Command**: Use `/development_cycle` to start the full 6-phase development workflow.
- **Manual Skills**: You can invoke specific skills by name (e.g., `brainstorming`, `writing-plans`) to perform targeted tasks.
- **Sub-Agents**: Use the `code-reviewer` or `test-engineer` agents when prompted or as part of the implementation cycle.

## Repository Structure

- `.agents/agents/`: Definitions for specialized AI roles.
- `.agents/skills/`: The "superpowers" (skills) that extend Gemini CLI capabilities.
- `.agents/workflows/`: Structured, multi-step development procedures.
- `.claude/agents/`: Definitions for specialized AI roles for Claude Code.
- `.claude/skills/`: The "superpowers" (skills) formatted for Claude Code.
- `docs/`: Detailed documentation and implementation plans.

## Getting Started

To explore the development cycle and understand how to build features in this workspace, refer to:

- **[Development Cycle Guide](./docs/development_cycle.md)**: A step-by-step walkthrough of the 6-phase development process.
- **[Specialized Agents](./docs/agents.md)**: Learn about the roles of the Code Reviewer and Test Engineer.
- **[Superpowers (Skills)](./docs/skills.md)**: A comprehensive list of the skills available in this workspace.
- **[Workflows](./docs/workflows.md)**: An overview of the high-level orchestration layers.
