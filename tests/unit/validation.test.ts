/**
 * tests/unit/validation.test.ts
 *
 * Unit tests for the centralized input validation and sanitization utilities.
 * These functions are the security boundary for all citizen-submitted data
 * before it is processed by the AI pipeline or stored.
 *
 * Tests verify:
 * - Text sanitization (trimming, length capping)
 * - Email format validation
 * - Name field validation
 * - Language code validation against supported Indian languages
 * - Full chat request body validation pipeline
 * - Full complaint request body validation pipeline
 */

import {
  sanitizeText,
  sanitizeMessage,
  isValidEmail,
  isValidName,
  isValidLanguage,
  isValidRole,
  validateChatRequest,
  validateComplaintRequest,
  validateProfileRequest,
} from "@/lib/validation";

// ─── sanitizeText ─────────────────────────────────────────────────────────────

describe("sanitizeText", () => {
  test("trims leading and trailing whitespace", () => {
    expect(sanitizeText("  hello world  ")).toBe("hello world");
  });

  test("truncates to specified max length", () => {
    expect(sanitizeText("abcdefgh", 5)).toBe("abcde");
  });

  test("does not truncate if within limit", () => {
    expect(sanitizeText("hi", 100)).toBe("hi");
  });

  test("handles empty string", () => {
    expect(sanitizeText("")).toBe("");
  });

  test("trims before truncating", () => {
    // "  abc  " → "abc" (trimmed), then slice(0, 2) → "ab"
    expect(sanitizeText("  abc  ", 2)).toBe("ab");
  });
});

// ─── sanitizeMessage ──────────────────────────────────────────────────────────

describe("sanitizeMessage", () => {
  test("trims whitespace", () => {
    expect(sanitizeMessage("  hello  ")).toBe("hello");
  });

  test("enforces 2000 character limit", () => {
    const long = "a".repeat(3000);
    expect(sanitizeMessage(long).length).toBe(2000);
  });
});

// ─── isValidEmail ─────────────────────────────────────────────────────────────

describe("isValidEmail", () => {
  test("accepts valid email", () => {
    expect(isValidEmail("citizen@example.com")).toBe(true);
    expect(isValidEmail("user.name+tag@gov.in")).toBe(true);
  });

  test("rejects email without @ symbol", () => {
    expect(isValidEmail("notanemail")).toBe(false);
  });

  test("rejects email without domain", () => {
    expect(isValidEmail("user@")).toBe(false);
  });

  test("rejects email with spaces", () => {
    expect(isValidEmail("user @example.com")).toBe(false);
  });

  test("rejects empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });
});

// ─── isValidName ──────────────────────────────────────────────────────────────

describe("isValidName", () => {
  test("accepts valid names", () => {
    expect(isValidName("Priya Sharma")).toBe(true);
    expect(isValidName("A")).toBe(true);
  });

  test("rejects empty name", () => {
    expect(isValidName("")).toBe(false);
    expect(isValidName("   ")).toBe(false);
  });

  test("rejects names over 50 characters", () => {
    expect(isValidName("A".repeat(51))).toBe(false);
  });

  test("accepts exactly 50 character name", () => {
    expect(isValidName("A".repeat(50))).toBe(true);
  });
});

// ─── isValidLanguage ──────────────────────────────────────────────────────────

describe("isValidLanguage", () => {
  test("accepts all supported Indian language codes", () => {
    const supported = ["en", "hi", "ta", "te", "bn", "mr", "gu", "kn", "ml", "pa"];
    supported.forEach((code) => {
      expect(isValidLanguage(code)).toBe(true);
    });
  });

  test("rejects unsupported language codes", () => {
    expect(isValidLanguage("fr")).toBe(false);
    expect(isValidLanguage("zh")).toBe(false);
    expect(isValidLanguage("")).toBe(false);
    expect(isValidLanguage("xyz")).toBe(false);
  });
});

// ─── isValidRole ──────────────────────────────────────────────────────────────

describe("isValidRole", () => {
  test("accepts user and assistant roles", () => {
    expect(isValidRole("user")).toBe(true);
    expect(isValidRole("assistant")).toBe(true);
  });

  test("rejects invalid roles", () => {
    expect(isValidRole("system")).toBe(false);
    expect(isValidRole("admin")).toBe(false);
    expect(isValidRole("")).toBe(false);
  });
});

// ─── validateChatRequest ──────────────────────────────────────────────────────

describe("validateChatRequest", () => {
  test("accepts valid chat request", () => {
    const result = validateChatRequest({
      messages: [{ role: "user", content: "How do I get a driving license?" }],
      language: "en",
    });
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.messages).toHaveLength(1);
      expect(result.language).toBe("en");
    }
  });

  test("rejects null body", () => {
    const result = validateChatRequest(null);
    expect(result.valid).toBe(false);
  });

  test("rejects empty messages array", () => {
    const result = validateChatRequest({ messages: [] });
    expect(result.valid).toBe(false);
  });

  test("rejects non-array messages", () => {
    const result = validateChatRequest({ messages: "hello" });
    expect(result.valid).toBe(false);
  });

  test("filters out messages with invalid roles", () => {
    const result = validateChatRequest({
      messages: [
        { role: "user", content: "Hello" },
        { role: "system", content: "Injected" },
      ],
    });
    expect(result.valid).toBe(true);
    if (result.valid) {
      // 'system' role should be filtered out
      expect(result.messages).toHaveLength(1);
      expect(result.messages[0].role).toBe("user");
    }
  });

  test("defaults to 'en' for unknown language code", () => {
    const result = validateChatRequest({
      messages: [{ role: "user", content: "hi" }],
      language: "xx",
    });
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.language).toBe("en");
    }
  });

  test("accepts Hindi language code", () => {
    const result = validateChatRequest({
      messages: [{ role: "user", content: "नमस्ते" }],
      language: "hi",
    });
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.language).toBe("hi");
    }
  });

  test("sanitizes message content length", () => {
    const longContent = "a".repeat(3000);
    const result = validateChatRequest({
      messages: [{ role: "user", content: longContent }],
    });
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.messages[0].content.length).toBeLessThanOrEqual(2000);
    }
  });
});

// ─── validateComplaintRequest ─────────────────────────────────────────────────

describe("validateComplaintRequest", () => {
  test("accepts valid complaint request", () => {
    const result = validateComplaintRequest({
      description: "There is a large pothole on MG Road",
      location: "MG Road, Bangalore",
    });
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.description).toBe("There is a large pothole on MG Road");
      expect(result.location).toBe("MG Road, Bangalore");
    }
  });

  test("rejects missing description", () => {
    const result = validateComplaintRequest({ location: "Delhi" });
    expect(result.valid).toBe(false);
  });

  test("rejects empty description", () => {
    const result = validateComplaintRequest({
      description: "   ",
      location: "Delhi",
    });
    expect(result.valid).toBe(false);
  });

  test("rejects missing location", () => {
    const result = validateComplaintRequest({ description: "Street light broken" });
    expect(result.valid).toBe(false);
  });

  test("rejects null body", () => {
    const result = validateComplaintRequest(null);
    expect(result.valid).toBe(false);
  });

  test("sanitizes description to max 1000 characters", () => {
    const result = validateComplaintRequest({
      description: "x".repeat(2000),
      location: "Delhi",
    });
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.description.length).toBeLessThanOrEqual(1000);
    }
  });

  test("sanitizes location to max 200 characters", () => {
    const result = validateComplaintRequest({
      description: "Issue description",
      location: "a".repeat(500),
    });
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.location.length).toBeLessThanOrEqual(200);
    }
  });
});

// ─── validateProfileRequest ───────────────────────────────────────────────────

describe("validateProfileRequest", () => {
  test("accepts valid profile data", () => {
    const result = validateProfileRequest({
      name: "Arjun Kumar",
      email: "arjun@example.com",
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("reports error for invalid email", () => {
    const result = validateProfileRequest({
      email: "not-an-email",
    });
    expect(result.valid).toBe(true); // Still valid, just has errors
    const emailError = result.errors.find((e) => e.field === "email");
    expect(emailError).toBeDefined();
  });

  test("reports error for name over 50 characters", () => {
    const result = validateProfileRequest({
      name: "A".repeat(51),
    });
    const nameError = result.errors.find((e) => e.field === "name");
    expect(nameError).toBeDefined();
  });

  test("handles null body gracefully", () => {
    const result = validateProfileRequest(null);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
