# Updating an Existing superpowers-extended Installation

This guide is for repositories that already installed superpowers-extended (per `INIT-SUPERPOWERS-EXTENDED.md`) and now want to pull in a newer version of the pack on top of their installation.

If you have not installed superpowers-extended yet, use `INIT-SUPERPOWERS-EXTENDED.md` instead.

## How it works

This pack publishes each upstream refresh as a self-contained changelog entry in `.superpowers-extended/changelogs/`. Each entry contains:

- A YAML frontmatter header with the upstream version, upstream commit SHA, and the commit range in this repo that the refresh produced.
- A summary of what landed and what was deliberately skipped.
- Reconciliation decisions (fork-specific rewrites — named-agent dispatch, placeholders, etc.).
- A full unified diff of the changes that landed in this repo.

You fetch the latest upstream changelog copy into `.superpowers-extended/changelogs/`, then apply each unseen entry **manually, hunk by hunk**, on top of your installation. There is no automated patcher because every consumer's installation diverges differently (filled placeholders, deleted skills, local customizations) — a blind `patch -p1` would corrupt those.

Do not update an initialized target repository by copying `template/` over it wholesale. Use the changelog loop below instead, and merge entrypoint changes hunk by hunk.

When a changelog diff path starts with `template/`, strip that prefix before applying it in the target repository. For example, source path `template/.agents/skills/brainstorming/SKILL.md` maps to target path `.agents/skills/brainstorming/SKILL.md`, and `template/UPDATE-SUPERPOWERS-EXTENDED.md` maps to `UPDATE-SUPERPOWERS-EXTENDED.md`. If a changelog touches `template/.superpowers-extended/entrypoints/AGENTS.md` or `template/.superpowers-extended/entrypoints/CLAUDE.md`, apply the relevant changes to the target repo's merged `AGENTS.md` or `CLAUDE.md`. Root `README.md` and `LICENSE` stay at root, while changelog state lives under `.superpowers-extended/changelogs`.

## Preflight

### 1. Locate your current sync point

Look for `.superpowers-extended/changelogs/UPSTREAM_SHA` in **your** repository (the copy of superpowers-extended that you installed).

```bash
cat .superpowers-extended/changelogs/UPSTREAM_SHA 2>/dev/null || echo "absent"
```

- **If the file exists**, its content is the upstream commit SHA your installation is currently synced to.
- **If absent**, you installed before `.superpowers-extended/changelogs/` was introduced. Treat your sync point as "pre-changelog era" — every changelog in the upstream pack is unseen.

### 2. Fetch the latest superpowers-extended

Pull the latest changelog directory from the upstream superpowers-extended repository into `.superpowers-extended/changelogs/`:

```bash
node .superpowers-extended/scripts/fetch-latest-changelogs.js
ls .superpowers-extended/changelogs/
```

The helper defaults to `transparent-pegasus/superpowers-extended` on `main`. If you installed from a fork or another branch, pass `--owner`, `--repo`, or `--ref`.

### 3. Identify unseen entries

```bash
# Your current sync point (or "none" if absent)
LOCAL_SHA=$(cat .superpowers-extended/changelogs/UPSTREAM_SHA 2>/dev/null || echo "none")
LATEST_SHA=$(cat .superpowers-extended/changelogs/UPSTREAM_SHA)
echo "you are at: $LOCAL_SHA"
echo "latest is:  $LATEST_SHA"

# Listed in chronological order; sorted by filename (YYYY-MM-DD prefix)
ls .superpowers-extended/changelogs/*.md
```

For each changelog entry whose `upstream_sha` you have **not** yet applied, you'll walk the cherry-pick loop below.

## The cherry-pick loop

Repeat for each unseen changelog entry, oldest first:

### Step 1: Read the entry

Open `.superpowers-extended/changelogs/<date>-upstream-<version>.md`. Read the summary, the upstream coverage, and especially the reconciliation decisions. Those decisions are how the pack maintainer reconciled upstream against the fork model — they may or may not match your local customizations.

### Step 2: Walk the diff section by section

Scroll to the ` ```diff ` block. The diff is grouped by file. For each file:

1. **Does this file exist in your installation?**
   - If the changelog path starts with `template/`, first strip `template/` to get the target path.
   - If you deleted it during INIT (step 5 lets consumers prune unused skills), **skip** the entire hunk.
   - If it exists, continue.

2. **Have you customized this file?**
   - `git log --oneline -- <path>` against your installation to see whether you've touched it locally.
   - Treat `AGENTS.md`, `CLAUDE.md`, and `README.md` as customized if they contain target-repo instructions, even if they have not been committed separately since installation.
   - If yes, switch to "Apply with adjustments" mode (Step 3 below).
   - If no, apply the changelog's diff hunk directly after previewing it.

3. **Does the file contain filled placeholders?** Examples:
   - `<PLAN_PATH_PATTERN>` may have been replaced with your concrete path at INIT time.
   - `<TEST_FRAMEWORK_AND_COMMANDS>` etc.
   - The diff captures the framework's pre-fill state. You must translate each placeholder to your filled-in form when applying.

### Step 3: Apply with adjustments

For files you customized or that contain filled placeholders, apply hunks by hand from the changelog entry:

```bash
# Open the unseen changelog entry and the target file side by side in your editor.
# The changelog entry lives under .superpowers-extended/changelogs/.
```

For each diff hunk, decide:
- **Apply as-is** — your local content matches the framework's pre-fill state for this hunk.
- **Apply with translation** — replace any placeholder tokens with your filled-in versions before pasting.
- **Skip** — your local customization is intentional and conflicts with the change.

Use your editor or `patch --dry-run` to preview before writing. Don't rush; the diff-driven model trades speed for safety.

### Step 4: Maintain the mirror

After modifying a file in `.claude/skills/<name>/`, mirror the change to `.agents/skills/<name>/` (or vice versa). Translation rule: `.agents/` references use the `superpowers:` prefix on cross-skill links (`superpowers:writing-plans`); `.claude/` references use the bare name (`writing-plans`).

```bash
# Quick parity check after changes
diff -r .claude/skills/<name> .agents/skills/<name>
# Every line of diff MUST be a 'superpowers:' prefix difference; anything else is a bug.
```

### Step 5: Post-changelog verification

After applying everything from a single changelog entry, re-run the validation block from `INIT-SUPERPOWERS-EXTENDED.md`:

```bash
# 1. No placeholders left anywhere (except docs that document them)
rg -n "<[A-Z_]+>" .agents .claude .superpowers-extended workflows CLAUDE.md AGENTS.md README.md

# 2. Review drift between the two trees (expect only platform-specific wording)
diff -ru .agents/skills .claude/skills
diff -ru .agents/agents .claude/agents
```

If something looks wrong, fix it before moving to the next changelog entry.

### Step 6: Update bookkeeping

Update your local `.superpowers-extended/changelogs/UPSTREAM_SHA` to the applied entry's `upstream_sha` (from its frontmatter), and copy the changelog file itself into your installation's `.superpowers-extended/changelogs/` directory so future updates know where you are:

```bash
cp .superpowers-extended/changelogs/<date>-upstream-<version>.md .superpowers-extended/changelogs/
# Read the file's frontmatter and copy the upstream_sha value
grep "^upstream_sha:" .superpowers-extended/changelogs/<date>-upstream-<version>.md | awk '{print $2}' > .superpowers-extended/changelogs/UPSTREAM_SHA
```

### Step 7: Commit incrementally

Commit each applied changelog separately so your history records the upgrade path:

```bash
git add .superpowers-extended/changelogs/ <files-you-updated>
git commit -m "chore: apply superpowers-extended changelog <date>-upstream-<version>"
```

Then proceed to the next unseen changelog entry, if any.

## Handling local customizations

These files are explicitly out of scope for sync — never overwrite them from a changelog:

- `.claude/skills/update-docs/ROOT_DOCS.md` and `.agents/skills/update-docs/ROOT_DOCS.md` — you rewrote these at INIT time for your repo's actual docs contract.
- Any skill directory you intentionally deleted at INIT step 5.
- Any agent or skill you added yourself.

When a changelog diff touches one of these, skip the affected hunks.

## Handling filled placeholders

`INIT-SUPERPOWERS-EXTENDED.md` enumerates every placeholder you replaced at install time. Common examples:

- `<PLAN_PATH_PATTERN>`
- `<DESIGN_DOC_PATH_PATTERN>`
- `<TEST_FRAMEWORK_AND_COMMANDS>`
- `<BASELINE_VERIFICATION_COMMAND>`
- `<FULL_TEST_SUITE_COMMAND>` / `<TARGETED_TEST_COMMAND>`

When a diff hunk references one of these placeholders, **translate to your filled-in form before applying**. The framework's diff is captured against the unfilled state.

If you find a hunk you cannot reconcile (the upstream change fundamentally changes the surrounding context your filled placeholder lived in), skip the hunk and add a TODO comment in the file so a follow-up review surfaces it.

## When in doubt

- **Read the changelog's reconciliation decisions first.** They tell you why the maintainer adopted what they did. Your local situation may justify different choices.
- **Skip rather than guess.** A skipped hunk is recoverable (re-read the changelog next time); a wrongly-applied hunk silently corrupts your skills.
- **Mirror parity is non-negotiable.** If `diff -r .claude/skills .agents/skills` shows non-prefix differences after your update, fix them before committing.

## Reference

- `INIT-SUPERPOWERS-EXTENDED.md` — first-install guide (placeholder substitution, customization, validation).
- `.superpowers-extended/changelogs/` — latest fetched copy of upstream changelog entries.
- `.superpowers-extended/changelogs/` — working copy of every upstream refresh plus the applied sync point for this installation.
- `.superpowers-extended/changelogs/UPSTREAM_SHA` — the applied sync point.
- `README.md` — top-level overview and feature list.
