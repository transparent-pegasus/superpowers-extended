---
name: requesting-test-creation
description: Use when interfaces or types have been defined (in parallel with implementation), or when completed functionality needs automated tests before moving forward.
---

# Requesting Test Creation

Dispatch superpowers:test-engineer subagent to write automated tests for implementation code.

**Core principle:** Test creation runs in **parallel** with implementation whenever possible. Do not wait for implementation to finish before requesting tests if the API/interface is defined.

## When to Request Test Creation

**Mandatory:**
- When interfaces, types, or component signatures are defined (Parallel with implementation)
- After fixing an undetected bug (to add regression tests)
- After refactoring untested legacy code

## How to Request

**1. Identify what needs testing:**
Understand the interfaces, types, or completed logic that the test-engineer needs to write tests against.

**2. Dispatch test-engineer subagent:**

Use Task tool with superpowers:test-engineer type, fill template at `test-engineer-dispatch.md`

**Placeholders:**
- `{WHAT_TO_TEST}` - The feature, component, or function that requires tests
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
[Implementer has just defined the UserCard component props]

You: Interface is defined. Dispatching test-engineer in parallel while I do the implementation.

[Dispatch superpowers:test-engineer subagent]
  WHAT_TO_TEST: UserCard React component
  FILES_CHANGED: src/components/UserCard.tsx
  INTERFACES_OR_TYPES: { name: string, role: string, isActive: boolean }
  PLAN_OR_REQUIREMENTS: Read docs/plans/2026-02-27-usercard.md Task 2. Component should show green dot if isActive, gray if not.
  DESCRIPTION: Focus on the visual state based on isActive prop.

[Implementer continues building UserCard.tsx body]
...
```

## Integration with Subagent-Driven Development

- **Parallel Flow**: Dispatch `test-engineer` *immediately* after the implementer finalizes the public API/interface, before writing the function body.
- Let the test-engineer write failing tests while the implementer works on the logic.
- Do not move to `Spec Review` until BOTH the implementation and tests are complete and the tests pass.

See template at: requesting-test-creation/test-engineer-dispatch.md
