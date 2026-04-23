# Specialized Agents

superpowers-extended ships two specialized agent personas. Separating roles is how the framework prevents the "grading your own homework" problem: the implementer never writes the tests, and the reviewer never reviews its own code.

Agent definitions live in two mirrored trees:

- Claude Code: `.claude/agents/<name>.md`
- Codex / Cursor / Gemini CLI: `.agents/agents/<name>.md`

Both trees contain the same personas with the same responsibilities.

## Code Reviewer (`code-reviewer`)

A senior-level reviewer responsible for validating completed work against the plan and enforcing code quality standards.

### Key Responsibilities

- **Plan alignment**: Confirm the implementation matches the approved design and requirements.
- **Code quality**: Evaluate SOLID principles, design patterns, error handling, and maintainability.
- **Architectural integrity**: Verify separation of concerns, integration seams, and scalability considerations.
- **Issue categorization**: Sort findings into Critical, Important, and Minor.

> **Note:** The code-reviewer does **not** review test code. Test coverage concerns go to the `test-engineer`.

## Test Engineer (`test-engineer`)

The **sole** agent permitted to write test code in this workspace. This separation prevents the implementation agent from writing tests that confirm its own assumptions.

### Key Responsibilities

- **TDD enforcement**: Follows RED-GREEN-REFACTOR. Writes the failing test first.
- **Test strategy**: Designs unit / integration tests using the repo's initialized test stack (`<TEST_FRAMEWORK_AND_COMMANDS>`, `<TEST_FILE_LOCATIONS>`).
- **Behavioral verification**: Tests observable behavior, not implementation details.
- **Validation**: Runs `<TARGETED_TEST_COMMAND>` and `<FULL_TEST_SUITE_COMMAND>` (when practical) and reports exact results.

### Iron Law

**NO PRODUCTION CODE.** The test-engineer only writes test files and fixtures. Bugs discovered during testing are reported back to the implementer for fixing — never patched by the test-engineer.

## Dispatching an Agent

| Platform | How to dispatch |
|---|---|
| Claude Code | Agent tool with `subagent_type: code-reviewer` or `subagent_type: test-engineer`. |
| Codex / Cursor | Reference `.agents/agents/<name>.md` in the prompt; the persona file describes the contract the agent must follow. |
| Gemini CLI | Invoke the sub-agent by name. |

Skills that wrap these dispatches:

- `requesting-code-review` + `receiving-code-review`
- `requesting-test-creation` + `receiving-test-creation`

Use the request/receive skills rather than dispatching ad-hoc so inputs, outputs, and loop behavior stay consistent.
