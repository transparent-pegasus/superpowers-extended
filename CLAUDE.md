# Specialized Agents & Superpowers (Skills) for Claude Code

This workspace uses a specialized multi-agent architecture and structured workflows (Superpowers) to ensure high code quality, architectural integrity, and rigorous testing.

## Specialized Agents

All detailed instructions for specialized agents are located in `.claude/agents/`.

- **Code Reviewer (`code-reviewer`)**: Senior-level agent for validating plan alignment and code quality. (See `.claude/agents/code-reviewer.md`)
- **Test Engineer (`test-engineer`)**: The **sole** entity permitted to write test code. Follows TDD (RED-GREEN-REFACTOR). (See `.claude/agents/test-engineer.md`)

## Superpowers (Skills)

Skills provide structured guidance and automated procedures. For Claude Code, these are located in `.claude/skills/`.

### Strategic & Planning
- `brainstorming`: Design and requirements gathering. (`.claude/skills/brainstorming/SKILL.md`)
- `writing-plans`: Breaking designs into bite-sized tasks. (`.claude/skills/writing-plans/SKILL.md`)

### Operational & Execution
- `subagent-driven-development`: Primary implementation engine with two-stage review. (`.claude/skills/subagent-driven-development/SKILL.md`)
- `executing-plans`: Batch execution with checkpoints. (`.claude/skills/executing-plans/SKILL.md`)
- `finishing-a-development-branch`: Merging and cleanup. (`.claude/skills/finishing-a-development-branch/SKILL.md`)

### Quality & Verification
- `test-driven-development`: Enforcing RED-GREEN cycles. (`.claude/skills/test-driven-development/SKILL.md`)
- `verification-before-completion`: Mandatory pre-merge checks. (`.claude/skills/verification-before-completion/SKILL.md`)
- `systematic-debugging`: Rigorous root-cause analysis. (`.claude/skills/systematic-debugging/SKILL.md`)

## Workflows

Workflows orchestrate agents and skills.

- **`/development_cycle`**: The 6-phase process (Brainstorming → Isolation → Planning → Implementation → Review → Integration). (See `.agents/workflows/development_cycle.md`)

## Instructions for Claude Code

When operating in this workspace, you MUST:
1.  **Read and follow** the detailed instructions in `.claude/skills/` and `.claude/agents/` relevant to your current task.
2.  **Respect the role boundaries**: Do not write production code if acting as the Test Engineer, and do not write tests if acting as the primary implementer.
3.  **Follow the Development Cycle**: Ensure you are in the correct phase and using the appropriate skills.
4.  **Use Worktrees**: Always work in an isolated git worktree for new features.
