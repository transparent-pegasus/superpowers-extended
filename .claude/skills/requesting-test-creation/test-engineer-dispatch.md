# Test Creation Request Template

Use this template when dispatching the `test-engineer` subagent.

**Purpose:** Author tests against a known interface or completed logic. The implementer never writes tests themselves — they request, the test-engineer authors.

```
Agent tool (subagent_type: test-engineer):
  description: "Author tests for {WHAT_TO_TEST}"
  prompt: (use the template body below)
```

**Your task:**
1. Review {WHAT_TO_TEST} implementation or interface.
2. If a codegraph plugin/tool is available, search nearby tests, related symbols, and callers/callees before choosing test locations. If unavailable, use ordinary repo search and file reads.
3. Read the behavior expectations from {PLAN_OR_REQUIREMENTS}.
4. Create automated tests matching {INTERFACES_OR_TYPES}.
5. Follow TDD: Tests must initially fail if implementation is incomplete (RED).
6. Ensure tests check real behavior, edge cases, and error states without relying on live network, cloud, container, hardware, or paid third-party dependencies unless explicitly requested.
7. Verify tests pass (GREEN) if implementation is already complete.

## Target

**What to test:** {WHAT_TO_TEST}
**Files:** {FILES_CHANGED}

## Interface Definition

{INTERFACES_OR_TYPES}

## Requirements

{PLAN_OR_REQUIREMENTS}

## Details

{DESCRIPTION}

## Output Expected

Return a report containing:
### Test Strategy
[Brief summary of approach, unit vs integration, edge cases considered]

### Created/Modified Files
[List test files]

### Test Results
[Output of `<TARGETED_TEST_COMMAND>` for these specific tests. Expected state: RED (failing correctly) or GREEN (passing correctly)]

### Issues
[Any bugs found in the implementation, unclear requirements, or untestable code]
