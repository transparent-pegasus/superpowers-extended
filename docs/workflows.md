# Workflows

Workflows are high-level orchestration layers that tie together specialized agents and superpowers into a cohesive development process.

## `/development_cycle`

This is the primary workflow for all feature development and bug fixes. It guides the Gemini CLI through 6 structured phases:

1.  **Brainstorming**: Requirements gathering and design discussion.
2.  **Workspace Isolation**: Setting up a dedicated branch and git worktree.
3.  **Plan Creation**: Breaking the design into small, testable tasks.
4.  **Implementation**: Sequential task execution using specialized subagents and TDD.
5.  **Final Code Review**: An independent senior-level review of the entire changeset.
6.  **Integration**: Merging the work into the main branch and cleaning up.

The `/development_cycle` ensures:
- **Safety**: No changes are made to the main branch without explicit user consent.
- **Quality**: No task is marked complete without a RED-GREEN test cycle and a two-stage review.
- **Transparency**: Every step requires user confirmation before proceeding.

> **See Also**: [Development Cycle Guide](./development_cycle.md) for a detailed walkthrough of each stage.
