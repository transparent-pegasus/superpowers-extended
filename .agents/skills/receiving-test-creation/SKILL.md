---
name: receiving-test-creation
description: Use when receiving test execution reports from the test-engineer subagent to properly verify results or act on discovered bugs.
---

# Test Creation Reception

## Overview

Process test results rigorously. Test failures dictate the next steps in development.

**Core principle:** Tests define correctness. Bug reports from the test-engineer must be verified and fixed before proceeding.

## The Response Pattern

```
WHEN receiving test results from test-engineer:

1. READ: Review the test strategy and test cases created.
2. VERIFY STATUS: Are the tests RED or GREEN?
3. EVALUATE ISSUES: Did they report bugs in the implementation?
4. RESPOND (If RED/Bugs): Implement fix -> Rerun `<FULL_TEST_SUITE_COMMAND>` or `<TARGETED_TEST_COMMAND>` -> Verify GREEN.
5. RESPOND (If GREEN): Ready to move to Code Review.
```

## Handling RED Tests (Parallel Implementation)

When the `test-engineer` was dispatched in parallel based on interfaces, their tests are *expected* to fail (RED) initially.

1. Review the failing tests to ensure they fail for the *correct* reason (e.g., expecting "Success" but got "Not Implemented").
2. Implementer uses the failing tests as the target constraint.
3. Once implementation is complete, the implementer runs the relevant `<TARGETED_TEST_COMMAND>` and then `<FULL_TEST_SUITE_COMMAND>` when appropriate.
4. If it's GREEN, the task moves forward. If not, fix implementation.

## Handling Bugs Found By Test-Engineer

If the implementation was "complete" but the `test-engineer` reports failing tests or edge-case bugs:

**NEVER:**
- Ask the `test-engineer` to change the test just to make it pass (unless the requirement was misunderstood).
- Ignore edge-case warnings.

**INSTEAD:**
1. Verify the requirement.
2. Fix the implementation code.
3. Run `<FULL_TEST_SUITE_COMMAND>` or the most relevant `<TARGETED_TEST_COMMAND>`.
4. If it passes, the loop is closed. No need to re-dispatch the test-engineer unless the interface changed to fix the bug.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Arguing with the test | Fix the implementation to match the spec. |
| Asking test-engineer to "fix the test" | Tests failing correctly means the code is broken. |
| Proceeding with 1 failing test | All tests for the specific task must be GREEN before Spec Review. |
| Making test-engineer fix the code | test-engineer ONLY writes tests. Implementer fixes the code. |
