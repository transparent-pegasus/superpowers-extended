# Specialized Agents

In this workspace, we employ specialized AI agents, each with a dedicated role and set of responsibilities. This separation of concerns ensures high code quality, rigorous testing, and architectural integrity.

## Code Reviewer (`code-reviewer`)

The **Code Reviewer** is a senior-level agent responsible for validating completed project steps against the original plan and maintaining high coding standards.

### Key Responsibilities:
- **Plan Alignment**: Ensures the implementation matches the approved design and requirements.
- **Code Quality**: Evaluates the code for SOLID principles, design patterns, and maintainability.
- **Architectural Integrity**: Verifies proper separation of concerns and system integration.
- **Issue Categorization**: Identifies and prioritizes issues as Critical, Important, or Suggestions.

> **Note:** The Code Reviewer does *not* review test code. That responsibility is delegated to the Test Engineer.

---

## Test Engineer (`test-engineer`)

The **Test Engineer** is the **sole** entity permitted to write test code within this workspace. This separation prevents the coding agent from "grading their own homework."

### Key Responsibilities:
- **TDD Enforcement**: Follows the RED-GREEN-REFACTOR cycle, writing failing tests *before* any implementation code is written.
- **Test Strategy**: Designs comprehensive test suites covering unit, integration, and component tests using Vitest and React Testing Library.
- **Behavioral Verification**: Focuses on testing observable behavior rather than implementation details.
- **Validation**: Ensures all tests pass (GREEN) and provides detailed reports on test coverage and results.

### Iron Law:
**NO PRODUCTION CODE.** The Test Engineer *only* writes test files. Any implementation bugs discovered during testing are reported back to the coding agent for fixing.
