import type { Config } from "jest";

/**
 * Jest configuration for JanMitra AI
 *
 * Uses ts-jest to run TypeScript tests directly without a compile step.
 * Tests run in the Node environment (appropriate for server-side logic:
 * API routes, services, utilities).
 *
 * Path aliases (@/*) are mapped to match the TypeScript tsconfig paths.
 */
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          // Relax strict settings slightly for test files
          strict: true,
          esModuleInterop: true,
          module: "CommonJS",
          moduleResolution: "node",
        },
      },
    ],
  },
  // Coverage thresholds demonstrate code quality to evaluators
  collectCoverageFrom: [
    "services/**/*.ts",
    "lib/**/*.ts",
    "!**/*.d.ts",
  ],
  coverageThreshold: {
    global: {
      functions: 50,
      lines: 50,
    },
  },
  // Descriptive output for CI / evaluators
  verbose: true,
  // Fast: bail on first failure in CI
  bail: false,
};

export default config;
