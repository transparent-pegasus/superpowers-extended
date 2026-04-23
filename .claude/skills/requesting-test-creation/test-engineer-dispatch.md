# Test Creation Request Template

Use this template to dispatch a test-engineer subagent.

**Your task:**
1. Review {WHAT_TO_TEST} implementation or interface.
2. Read the behavior expectations from {PLAN_OR_REQUIREMENTS}.
3. Create automated tests matching {INTERFACES_OR_TYPES}.
4. Follow TDD: Tests must initially fail if implementation is incomplete (RED).
5. Ensure tests check real behavior, edge cases, and error states without relying on live network, cloud, container, hardware, or paid third-party dependencies unless explicitly requested.
6. Verify tests pass (GREEN) if implementation is already complete.

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
