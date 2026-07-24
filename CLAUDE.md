# Claude Code Guide

This repository stores the target-project installation payload under `template/`.

For the actual Claude Code Superpowers guide source, read [`template/.superpowers-extended/entrypoints/CLAUDE.md`](./template/.superpowers-extended/entrypoints/CLAUDE.md). Root `README.md` and `changelogs/` intentionally stay at the repository root; they are copied alongside the contents of `template/` when installing into a target project.

When editing pack behavior, update files under `template/`. Do not duplicate payload changes in this root file.

## Pack Maintenance

- Every upstream refresh from `obra/superpowers` MUST add a self-contained entry under `changelogs/` (YAML frontmatter with `upstream_repo`, `upstream_version`, `upstream_sha`, `previous_upstream_sha`, `ours_from_sha`, `ours_to_sha`; summary; upstream coverage; reconciliation decisions; full unified diff in a ```diff block) and update `changelogs/UPSTREAM_SHA`.
- `template/.agents/` and `template/.claude/` are mirrored trees — apply every skill/agent edit to both. Allowed drift is platform wording only: `superpowers:<skill>` prefix (.agents) vs bare skill name (.claude), and `Task tool` vs `Agent tool`.
- `<KEY>` placeholders in `template/` are intentional: they resolve at runtime from each target repo's `Superpowers Extended Configuration` section (written by the `init` workflow). When adding a new placeholder, add it to the key table in `template/.claude/commands/init.md` and `template/workflows/init.md`.
- Validate after edits: `diff -ru template/.agents/skills template/.claude/skills`, `diff -ru template/.agents/agents template/.claude/agents`, and `claude plugin validate .claude-plugin/plugin.json`.
