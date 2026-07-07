# Testing — JanMitra AI

JanMitra AI uses **[Jest](https://jestjs.io/)** with **[ts-jest](https://kulshekhar.github.io/ts-jest/)** for a fast, TypeScript-native test suite covering the core business logic: intent detection, rule engine responses, input validation, and the hybrid AI chat pipeline.

## Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file change)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Results

```
Test Suites: 4 passed, 4 total
Tests:       121 passed, 121 total
Time:        ~2.3s
```

## Test Structure

```
tests/
├── unit/
│   ├── intentDetector.test.ts   # 30 tests — keyword intent classification
│   ├── ruleEngine.test.ts       # 42 tests — structured civic responses
│   └── validation.test.ts       # 34 tests — input sanitization & validation
└── api/
    └── chat.test.ts             # 15 tests — hybrid AI pipeline (mocked)
```

## Test Coverage

| Module | What's Tested |
|--------|--------------|
| `services/intentDetector.ts` | All 20+ civic intents, Hindi keyword support, entity extraction, confidence scoring |
| `services/ruleEngine.ts` | All 22 intent responses, suggested actions, fallback behavior |
| `lib/validation.ts` | sanitizeText, email/name/language validation, full request body validators |
| `app/api/chat/route.ts` | Validation errors, rule engine routing, Gemini fallback, response shape |

## What the Tests Cover

### 1. Intent Detection (`tests/unit/intentDetector.test.ts`)
Tests that the keyword-based intent classifier correctly routes citizen queries:
- Government services: driving license, passport, Aadhaar, PAN, voter ID, ration card, etc.
- Civic issues: pothole reporting, street light, complaint tracking with ID extraction
- Schemes: PM Kisan, Ayushman Bharat, scholarship queries
- Conversational: greetings, gratitude (never require Gemini)
- **Hindi language support**: छात्रवृत्ति, नमस्ते, धन्यवाद

### 2. Rule Engine (`tests/unit/ruleEngine.test.ts`)
Tests that every civic intent returns a structured, helpful response:
- All 22 intents return non-empty content
- Official portal links are included (UIDAI, ECI, NSP, parivahan.gov.in)
- Response content is relevant (e.g., MSME response mentions "FREE")
- Fallback response always includes links to all major feature areas

### 3. Input Validation (`tests/unit/validation.test.ts`)
Tests the security layer for citizen-submitted data:
- Text sanitization (trim + length cap)
- Email format validation
- Name field validation (1–50 chars)
- Language code validation (10 supported Indian languages)
- Role validation (blocks `system` role injection attacks)
- Full chat and complaint request body validation

### 4. Chat API Route (`tests/api/chat.test.ts`)
End-to-end hybrid pipeline tests with mocked Gemini:
- Input validation (400 on missing/invalid data)
- Rule engine correctly handles high-confidence civic queries
- Fallback returns usable content for unrecognized queries
- `system` role injection attempts are filtered
- Every response has `content` and `usedGemini` fields

## Configuration

| File | Purpose |
|------|---------|
| `jest.config.ts` | Jest configuration — ts-jest preset, path aliases, coverage |
| `tsconfig.json` | TypeScript config (shared with tests via ts-jest) |

## Running Specific Tests

```bash
# Run only intent detector tests
npm test -- tests/unit/intentDetector.test.ts

# Run only API tests
npm test -- tests/api/

# Run with verbose output
npm test -- --verbose

# Run tests matching a pattern
npm test -- --testNamePattern="driving license"
```

## Mocking Strategy

- **`next/server`** — Mocked in API tests so route handlers run outside the Next.js runtime
- **`@/services/gemini`** — Mocked to return `null` (simulates Gemini unavailable), ensuring the rule engine fallback is always tested without network calls
- **`localStorage`** — Not needed; storage tests use pure functions that guard for `typeof window`

## Adding New Tests

1. Create a new `.test.ts` file in `tests/unit/` or `tests/api/`
2. Import the module under test using the `@/` alias
3. Use `describe` blocks to group related tests
4. Run `npm test` to verify

## CI Integration

Tests are suitable for any CI pipeline (GitHub Actions, Vercel, etc.):

```yaml
# .github/workflows/test.yml (example)
- name: Run tests
  run: npm test
```
