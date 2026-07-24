# Instruction-File Snippet for Target Repositories

The pack works without any of this: skills self-describe, and `/init` (`/superpowers-extended:init` on Claude Code) writes the required `Superpowers Extended Configuration` section into the target repo's `CLAUDE.md` / `AGENTS.md`. Paste the snippet below **in addition** only when a repository wants the framework rules stated explicitly in its own instruction files (recommended for tools without plugin support, e.g. Aider or Gemini CLI reading a checked-in copy).

```markdown
## Superpowers Extended

This repository uses the superpowers-extended framework: specialized roles,
structured skills, and multi-phase workflows for AI-driven development.

Rules:
1. Role boundaries are enforced. The implementer never writes test code — the
   `test-engineer` agent is the sole author of tests (RED-GREEN-REFACTOR). The
   `test-engineer` never writes production code. The `code-reviewer` reviews
   production code only.
2. Feature work happens on a feature branch, normally in a git worktree
   (`using-git-worktrees` skill) — never directly on main.
3. Follow the workflows: `/init` (one-time setup), `/full_cycle`, `/plan`,
   `/execute`, `/execute_parallel`, `/quick`. Stay inside their phases.
4. Design docs and implementation plans are coordination artifacts. Save them
   to `<DESIGN_DOC_PATH_PATTERN>` / `<PLAN_PATH_PATTERN>` and do not commit them.
5. Before claiming completion, use the `verification-before-completion` skill;
   on failures, use `systematic-debugging`.
6. `<KEY>` placeholders resolve from the `Superpowers Extended Configuration`
   section in this file.
```

For checked-in copies, adjust workflow invocation to how your tool reads `commands/` (slash commands, skills, or direct file reads — see [workflows.md](./workflows.md)).
