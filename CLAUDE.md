# Claude Code Guide

This repository IS the superpowers-extended plugin: the payload lives directly at the repo root in `skills/`, `commands/`, and `agents/`, discovered by the Claude Code, Codex, and Cursor plugin conventions (manifests in `.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/`, plus the Codex marketplace file at `.agents/plugins/marketplace.json`).

When editing pack behavior, edit `skills/`, `commands/`, or `agents/` directly. `docs/` holds the human-facing framework docs. This file and `AGENTS.md` are maintainer instructions only — they are not part of the payload.

## Pack Maintenance

- Every upstream refresh from `obra/superpowers` MUST add a self-contained entry under `changelogs/` (YAML frontmatter with `upstream_repo`, `upstream_version`, `upstream_sha`, `previous_upstream_sha`, `ours_from_sha`, `ours_to_sha`; summary; upstream coverage; reconciliation decisions; full unified diff in a ```diff block) and update `changelogs/UPSTREAM_SHA`. Structural pack-native changes get a summary entry (no diff required).
- The payload is a single tree — there are no mirrored `.agents/` / `.claude/` copies to sync. Keep skill cross-references as bare skill names (`writing-plans`, not `superpowers:writing-plans`); Claude Code namespaces them automatically at install time (`superpowers-extended:<name>`).
- `<KEY>` placeholders in the payload are intentional: they resolve at runtime from each target repo's `Superpowers Extended Configuration` section (written by the `init` workflow). When adding a new placeholder, add it to the key table in `commands/init.md`.
- Validate after edits: `claude plugin validate .claude-plugin/plugin.json` and `claude plugin validate .` (marketplace), plus `rg -n 'template/|\.superpowers-extended|workflows/' skills commands agents docs` to catch resurrected legacy paths (expect no hits outside historical examples).
