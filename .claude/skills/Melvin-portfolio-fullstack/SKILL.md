```markdown
# Melvin-portfolio-fullstack Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill introduces the core development patterns and conventions used in the `Melvin-portfolio-fullstack` repository, a JavaScript-based fullstack project leveraging the Express framework. You'll learn about file organization, import/export styles, commit patterns, and how to write and run tests. This guide also provides command suggestions for streamlining your workflow.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userController.js`, `projectRoutes.js`

### Import Style
- Use **relative imports** for modules within the project.
  - Example:
    ```js
    import { getUser } from './userController';
    ```

### Export Style
- Use **named exports** for functions and variables.
  - Example:
    ```js
    // userController.js
    export function getUser(req, res) { ... }
    export function createUser(req, res) { ... }
    ```

### Commit Patterns
- Commit messages are **freeform**, sometimes with prefixes.
- Average commit message length: **73 characters**.
- Example commit messages:
  - `Add user authentication middleware`
  - `Fix bug in project creation endpoint`

## Workflows

### Code Development
**Trigger:** When adding or updating features or bug fixes  
**Command:** `/develop`

1. Create or update files using camelCase naming.
2. Use relative imports and named exports.
3. Write clear, descriptive commit messages.
4. Push changes to the repository.

### Testing
**Trigger:** When verifying code correctness  
**Command:** `/test`

1. Create test files matching the pattern `*.test.*` (e.g., `userController.test.js`).
2. Write tests for your modules and functions.
3. Run the test suite using your chosen test runner (framework not specified).
4. Review test results and fix any failing cases.

## Testing Patterns

- Test files follow the `*.test.*` naming pattern.
  - Example: `apiRoutes.test.js`
- The specific testing framework is **unknown**; adapt to your team's standard.
- Place test files alongside the modules they test or in a dedicated `tests` directory.
- Example test file structure:
  ```js
  // userController.test.js
  import { getUser } from './userController';

  test('getUser returns correct user data', () => {
    // ...test implementation
  });
  ```

## Commands
| Command    | Purpose                                   |
|------------|-------------------------------------------|
| /develop   | Start or continue feature/bug development |
| /test      | Run the test suite                        |
```
