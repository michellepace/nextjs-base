import "@testing-library/jest-dom/vitest";

/**
vitest.setup.ts is a file used in Vitest for setting up the testing environment before tests run. It is specified in your vitest.config.ts under the test.setupFiles option.

Purpose of vitest.setup.ts:

- Global Test Setup: It provides a place to configure global settings or perform actions that need to happen before each test file runs.

- Extending Matchers: "Matchers" are the assertion methods you use in tests, like expect(x).toBe(y). Vitest has basic matchers, but when testing React components you want more. Imports in this file like "@testing-library/jest-dom/vitest" extend the basic matchers with more useful ones for React testing.

- Environment Setup: This file runs after the test environment (jsdom) is already initialised. Use it to add global mocks (e.g., window.matchMedia), configure libraries (e.g., i18n, date libraries), or set up test utilities that need to be available in all test files.

- Cleanup Operations: Add cleanup code here for mocks or global state. React Testing Library (v16+) automatically unmounts components after tests when globals: true is enabled in vitest.config.ts (which this project has)
*/

// Global test setup

// Add any global mocks or setup here
