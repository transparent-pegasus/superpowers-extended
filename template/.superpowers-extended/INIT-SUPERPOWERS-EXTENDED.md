# INIT-SUPERPOWERS-EXTENDED

This repository ships as a portable extension pack that layers specialized agents, skills, and workflows onto any project. In the source repository, the installable payload lives under `template/`; root `README.md` and `LICENSE` are copied alongside that payload, while install/update guides and changelog state live under `.superpowers-extended/` in installed repositories. Before using it in a real repository, replace the placeholders listed below, initialize the docs contract, and delete whatever you do not use.

## What You Get

After copying the pack into a target repository, you have:

| Path | Purpose |
|---|---|
| `.agents/agents/` | Agent personas for Codex / Cursor / Gemini CLI |
| `.agents/skills/` | Skills for Codex / Cursor / Gemini CLI |
| `.claude/agents/` | Agent personas for Claude Code (mirror of `.agents/agents/`) |
| `.claude/skills/` | Skills for Claude Code (mirror of `.agents/skills/`) |
| `.claude/commands/` | Claude Code slash-command copies of the workflow files |
| `workflows/` | Workflow definitions (rendered as slash commands by supporting tools) |
| `.superpowers-extended/docs/` | Human-facing framework docs |
| `.superpowers-extended/scripts/` | Cross-platform helper scripts used by install/update docs |
| `.superpowers-extended/entrypoints/` | Source content to merge into root instruction files |
| `.superpowers-extended/INIT-SUPERPOWERS-EXTENDED.md` | First-install guide for placeholder substitution, customization, and validation |
| `.superpowers-extended/UPDATE-SUPERPOWERS-EXTENDED.md` | Update guide for applying newer pack changelogs |
| `.superpowers-extended/changelogs/` | Fetched upstream changelog entries, local `UPSTREAM_SHA` bookkeeping, and the ignored update-time cache |

The `.agents/` and `.claude/` trees are intentionally redundant — each tool reads the one it expects. Keep them in sync when you add, rename, or delete skills and agents.

## How to Install in a Target Repository

If this file is already at `.superpowers-extended/INIT-SUPERPOWERS-EXTENDED.md` in the target repository, the copy step has already happened; start from step 2.

1. Copy the contents of `template/` into the target repository root, including hidden directories such as `.agents/`, `.claude/`, and `.superpowers-extended/`. The template stores entrypoint source files under `.superpowers-extended/entrypoints/`, so this copy does not replace root `AGENTS.md` or `CLAUDE.md`.
2. Merge `.superpowers-extended/entrypoints/AGENTS.md` into the target repo's `AGENTS.md`, or copy it to `AGENTS.md` if no such file exists.
3. Merge `.superpowers-extended/entrypoints/CLAUDE.md` into the target repo's `CLAUDE.md`, or copy it to `CLAUDE.md` if no such file exists.
4. Copy root `LICENSE` into the target repository root. Treat root `README.md` like any other conflict: merge or replace only after preserving target-specific content.
5. Add `.superpowers-extended/changelogs/` to the target repository's `.gitignore`; it is the working changelog cache and sync-point store, not a root-level history directory.
6. Commit the untouched import first so later diffs are small.
7. Work through "Placeholders" and "Files To Initialize" below.
8. Rewrite `.superpowers-extended/docs/` and the root README to match the target repository's voice (see "Docs Contract").
9. Delete everything you do not use.
10. Run the validation commands in the final section.

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

- `.superpowers-extended/entrypoints/CLAUDE.md` / `CLAUDE.md` — merge the Superpowers source content into the actual repo entrypoint, then refresh references to match the actual repo (paths, verification commands, directory names).
- `.superpowers-extended/entrypoints/AGENTS.md` / `AGENTS.md` — same, for non-Claude tools.
- `README.md` — project-level pitch and install instructions.

### Docs contract

- `.agents/skills/update-docs/ROOT_DOCS.md` and `.claude/skills/update-docs/ROOT_DOCS.md` — rewrite so the sections describe the real `docs/` files in the target repo.

## Initialization Steps

1. **Ignore `.superpowers-extended/changelogs/`**. `.superpowers-extended/` contains tracked framework support files; only the latest-changelog cache is generated.
2. **Replace every placeholder** with repo-specific values in both trees (`.agents/` and `.claude/`).
3. **Rewrite the docs contract** (`.agents/skills/update-docs/ROOT_DOCS.md` and `.claude/skills/update-docs/ROOT_DOCS.md`) so the sections match the real root docs in the target repo.
4. **Sync `.claude/` with `.agents/`**: if the target repo renames or removes a skill, do it in both.
5. **Update the entry points** (`CLAUDE.md`, `AGENTS.md`, `README.md`) to point at the target repo's actual verification/test commands and any repo-specific skills.
6. **Delete unused skills and workflows**. Fewer paths = less drift.
7. **Encode repo-specific checks** in the relevant skill or workflow (`<SUPPLEMENTAL_VERIFICATION_COMMANDS>` call sites) rather than burying them in comments.
8. **Encode repo-specific review/deploy/docs flows** in the relevant skill or workflow instead of relying on agent memory.
9. **Commit in logical chunks** so later reviewers can tell "pack imported" from "pack customized".

## Keeping `.agents/` and `.claude/` in Sync

The two trees are mirrored on purpose. To avoid silent drift:

- When you edit a skill, edit both copies, or edit one and `diff -ru .agents/skills .claude/skills` to spot the gap.
- Prefer small, equivalent edits. Don't fork the two trees with different content.
- If you do need platform-specific wording (e.g. Claude-Code tool names vs Gemini CLI command names), isolate it to a clearly labeled paragraph.

## Validation

After initialization, these commands should be clean:

```bash
# 1. No placeholders left anywhere (except this file, which documents them)
rg -n "<[A-Z_]+>" .agents .claude .superpowers-extended workflows CLAUDE.md AGENTS.md README.md

# 2. Review drift between the two trees (expect only platform-specific wording)
diff -ru .agents/skills .claude/skills
diff -ru .agents/agents .claude/agents
```

Command 1 should return only this file (or nothing if you deleted the placeholder table after init).
Command 2 is for human review — the `.claude/` tree intentionally rewords a few platform references (`superpowers:<skill>` → the bare skill name, `Task tool` → `Agent tool`). Everything else should be identical; if you see unexplained drift, re-sync.

## After Installation: Staying Current

Future updates to superpowers-extended are recorded as individual entries in `.superpowers-extended/changelogs/`. To apply a newer version on top of your filled-in installation, follow [`.superpowers-extended/UPDATE-SUPERPOWERS-EXTENDED.md`](./UPDATE-SUPERPOWERS-EXTENDED.md). Your applied sync point is stored in `.superpowers-extended/changelogs/UPSTREAM_SHA`; the latest upstream changelog copy is fetched into the same directory.

## Maintaining this Pack (for pack maintainers, not consumers)

If you maintain superpowers-extended itself (i.e., you periodically resync from `obra/superpowers`), each refresh MUST capture a new changelog entry. After merging an upstream-refresh branch:

1. Determine the commit range that landed (e.g. `git diff <before>..<after>`).
2. Look up the upstream commit SHA you synced against (`cd /tmp/<upstream-clone> && git rev-parse HEAD`).
3. Create `changelogs/YYYY-MM-DD-upstream-vX.Y.Z.md` with the YAML frontmatter (`upstream_repo`, `upstream_version`, `upstream_sha`, `previous_upstream_sha` from the prior entry, `ours_from_sha`, `ours_to_sha`), a summary, the upstream coverage list, reconciliation decisions, and the full unified diff inside a ` ```diff ` block.
4. Update `changelogs/UPSTREAM_SHA` to the new upstream SHA.
5. Commit both alongside the refresh.

This pattern is what downstream consumers rely on when they follow `.superpowers-extended/UPDATE-SUPERPOWERS-EXTENDED.md`.
