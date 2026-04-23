# INIT-SUPERPOWERS-EXTENDED

This repository ships as a portable extension pack that layers specialized agents, skills, and workflows onto any project. Before using it in a real repository, replace the placeholders listed below, initialize the docs contract, and delete whatever you do not use.

## What You Get

After dropping the pack into a target repository, you have:

| Path | Purpose |
|---|---|
| `.agents/agents/` | Agent personas for Codex / Cursor / Gemini CLI |
| `.agents/skills/` | Skills for Codex / Cursor / Gemini CLI |
| `.claude/agents/` | Agent personas for Claude Code (mirror of `.agents/agents/`) |
| `.claude/skills/` | Skills for Claude Code (mirror of `.agents/skills/`) |
| `.claude/commands/` | Claude Code slash-command copies of the workflow files |
| `workflows/` | Workflow definitions (rendered as slash commands by supporting tools) |
| `docs/` | Root docs explaining the framework to humans |
| `CLAUDE.md` | Claude Code entry point |
| `AGENTS.md` | Entry point for Codex / Cursor / Gemini CLI / other `AGENTS.md`-aware tools |

The `.agents/` and `.claude/` trees are intentionally redundant — each tool reads the one it expects. Keep them in sync when you add, rename, or delete skills and agents.

## How to Install in a Target Repository

1. Copy the entire contents of this pack into the target repository root (`.agents/`, `.claude/`, `workflows/`, `docs/`, `CLAUDE.md`, `AGENTS.md`, `INIT-SUPERPOWERS-EXTENDED.md`, `README.md`, `LICENSE`).
2. Commit the untouched import first so later diffs are small.
3. Work through "Placeholders" and "Files To Initialize" below.
4. Rewrite `docs/` and the root README to match the target repository's voice (see "Docs Contract").
5. Delete everything you do not use.
6. Run the validation commands in the final section.

## Placeholders

Replace these values everywhere they appear (see search command at the bottom to find every occurrence):

| Placeholder | Meaning |
|---|---|
| `<REPO_INSTRUCTION_FILES>` | The repo's instruction files, such as `README.md`, `AGENTS.md`, `CLAUDE.md`, or equivalent |
| `<DESIGN_DOC_PATH_PATTERN>` | Where brainstorming design docs should be written (e.g. `docs/designs/YYYY-MM-DD-feature.md`) |
| `<PLAN_PATH_PATTERN>` | Where implementation plans should be written (e.g. `docs/plans/YYYY-MM-DD-feature.md`) |
| `<PLAN_DIRECTORY>` | Directory to search first when only a plan filename is given |
| `<BASELINE_VERIFICATION_COMMAND>` | Default repo-wide verification command (e.g. `make check`, `npm test`) |
| `<SUPPLEMENTAL_VERIFICATION_COMMANDS>` | Extra commands triggered by changed surfaces (CLI, deploy, build, generation) |
| `<TEST_FRAMEWORK_AND_COMMANDS>` | The repo's test stack and command conventions |
| `<TEST_FILE_LOCATIONS>` | Where tests and shared test helpers belong |
| `<TARGETED_TEST_COMMAND>` | Narrow test command for the touched scope |
| `<FULL_TEST_SUITE_COMMAND>` | Broader test suite command |

## Files To Initialize

### Planning and workflow (placeholders present in both trees)

- `workflows/plan.md`
- `workflows/full_cycle.md`
- `workflows/execute.md`
- `workflows/execute_parallel.md`
- `workflows/quick.md`
- `.claude/commands/*.md` (same files, Claude-Code slash-command copies)
- `.agents/skills/brainstorming/SKILL.md` and `.claude/skills/brainstorming/SKILL.md`
- `.agents/skills/writing-plans/SKILL.md` and `.claude/skills/writing-plans/SKILL.md`
- `.agents/skills/subagent-driven-development/SKILL.md` and `.claude/skills/subagent-driven-development/SKILL.md`
- `.agents/skills/requesting-code-review/SKILL.md` and `.claude/skills/requesting-code-review/SKILL.md`
- `.agents/skills/requesting-test-creation/SKILL.md` and `.claude/skills/requesting-test-creation/SKILL.md`

### Verification and test stack

- `.agents/agents/test-engineer.md` and `.claude/agents/test-engineer.md`
- `.agents/skills/requesting-test-creation/test-engineer-dispatch.md` and `.claude/skills/requesting-test-creation/test-engineer-dispatch.md`
- `.agents/skills/receiving-test-creation/SKILL.md` and `.claude/skills/receiving-test-creation/SKILL.md`

### Entry-point files

- `CLAUDE.md` — refresh references to match the actual repo (paths, verification commands, directory names).
- `AGENTS.md` — same, for non-Claude tools.
- `README.md` — project-level pitch and install instructions.

### Docs contract

- `.agents/skills/update-docs/ROOT_DOCS.md` and `.claude/skills/update-docs/ROOT_DOCS.md` — rewrite so the sections describe the real `docs/` files in the target repo.

## Initialization Steps

1. **Replace every placeholder** with repo-specific values in both trees (`.agents/` and `.claude/`).
2. **Rewrite the docs contract** (`.agents/skills/update-docs/ROOT_DOCS.md` and `.claude/skills/update-docs/ROOT_DOCS.md`) so the sections match the real root docs in the target repo.
3. **Sync `.claude/` with `.agents/`**: if the target repo renames or removes a skill, do it in both.
4. **Update the entry points** (`CLAUDE.md`, `AGENTS.md`, `README.md`) to point at the target repo's actual verification/test commands and any repo-specific skills.
5. **Delete unused skills and workflows**. Fewer paths = less drift.
6. **Encode repo-specific checks** in the relevant skill or workflow (`<SUPPLEMENTAL_VERIFICATION_COMMANDS>` call sites) rather than burying them in comments.
7. **Encode repo-specific review/deploy/docs flows** in the relevant skill or workflow instead of relying on agent memory.
8. **Commit in logical chunks** so later reviewers can tell "pack imported" from "pack customized".

## Keeping `.agents/` and `.claude/` in Sync

The two trees are mirrored on purpose. To avoid silent drift:

- When you edit a skill, edit both copies, or edit one and `diff -ru .agents/skills .claude/skills` to spot the gap.
- Prefer small, equivalent edits. Don't fork the two trees with different content.
- If you do need platform-specific wording (e.g. Claude-Code tool names vs Gemini CLI command names), isolate it to a clearly labeled paragraph.

## Validation

After initialization, these commands should be clean:

```bash
# 1. No placeholders left anywhere (except this file, which documents them)
rg -n "<[A-Z_]+>" .agents .claude workflows docs CLAUDE.md AGENTS.md README.md

# 2. No leftover references to the original authoring repo
rg -n "vod_to_text|Nova|ops/gcp|YouTube|Twitch|yt-dlp|faster-whisper" .agents .claude workflows

# 3. Review drift between the two trees (expect only platform-specific wording)
diff -ru .agents/skills .claude/skills
diff -ru .agents/agents .claude/agents
```

Command 1 should return only this file (or nothing if you deleted the placeholder table after init).
Command 2 should return nothing.
Command 3 is for human review — the `.claude/` tree intentionally rewords a few platform references (`superpowers:<skill>` → the bare skill name, `Task tool` → `Agent tool`). Everything else should be identical; if you see unexplained drift, re-sync.
