---
name: requesting-test-creation
description: Use when interfaces or types have been defined (in parallel with implementation), or when completed functionality needs automated tests before moving forward.
---

# Requesting Test Creation

Dispatch the `test-engineer` subagent to write automated tests for implementation code.

**Core principle:** Test creation runs in **parallel** with implementation whenever possible. Do not wait for implementation to finish before requesting tests if the API/interface is defined.

## When to Request Test Creation

**Mandatory:**
- When interfaces, dataclasses, helper signatures, or CLI arguments are defined (parallel with implementation)
- After fixing an undetected bug (to add regression tests)
- After refactoring untested legacy code

## How to Request

**1. Identify what needs testing:**
Understand the interfaces, function signatures, or completed logic that the test-engineer needs to write tests against.

**2. Dispatch test-engineer subagent:**

Use the available agent-dispatch tooling and fill the template at `test-engineer-dispatch.md`.

**Placeholders:**
- `{WHAT_TO_TEST}` - The feature, CLI surface, or function that requires tests
- `{FILES_CHANGED}` - Files where the implementation or interfaces live
- `{INTERFACES_OR_TYPES}` - The established signature/types that the tests must adhere to
- `{PLAN_OR_REQUIREMENTS}` - Expected behavior
- `{DESCRIPTION}` - Brief summary of the specific test requirements or edge cases

**3. Test-driven interaction (Parallel Execution):**
- **Implementer**: writes interface -> requests tests -> continues writing implementation
- **Test-engineer**: writes tests against the interface -> runs tests (they fail: RED) -> hands back to implementer
- **Implementer**: finishes implementation -> runs tests (they pass: GREEN) -> refactors

## Example

```
[Implementer has just defined the target parser contract]

You: Interface is defined. Dispatching test-engineer in parallel while I do the implementation.

[Dispatch test-engineer subagent]
  WHAT_TO_TEST: normalize_input classification
  FILES_CHANGED: src/app/input.py src/app/cli.py
  INTERFACES_OR_TYPES: normalize_input(raw: str) -> ParsedInput
  PLAN_OR_REQUIREMENTS: Task 2 from <PLAN_PATH_PATTERN>. Must classify supported inputs and reject unsupported ones.
  DESCRIPTION: Cover valid inputs, invalid inputs, and avoid live external dependencies.

[Implementer continues building input.py]
...
```

## Integration with Subagent-Driven Development

- **Parallel Flow**: Dispatch `test-engineer` *immediately* after the implementer finalizes the public API or CLI contract, before the implementation is complete.
- Let the test-engineer write failing tests while the implementer works on the logic.
- Instruct the test-engineer to use fixtures and fakes instead of live network, cloud, container, hardware, or paid third-party integrations unless the task explicitly requires a manual smoke test.
- Do not move to `Spec Review` until BOTH the implementation and tests are complete and the tests pass.

See template at: requesting-test-creation/test-engineer-dispatch.md
