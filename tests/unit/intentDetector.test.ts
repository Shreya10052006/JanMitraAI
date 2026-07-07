/**
 * tests/unit/intentDetector.test.ts
 *
 * Unit tests for the keyword-based intent detection service.
 * The intent detector is the critical first layer of the hybrid AI pipeline —
 * it routes 70%+ of citizen queries without any API cost.
 *
 * Tests verify:
 * - Correct intent classification for all civic service categories
 * - Proper Gemini bypass flags for high-confidence matches
 * - Confidence score behavior
 * - Hindi keyword support for multilingual citizens
 */

import { detectIntent } from "@/services/intentDetector";

describe("detectIntent — Government Services", () => {
  test("detects driving license intent", () => {
    const result = detectIntent("How do I renew my driving license?");
    expect(result.intent).toBe("driving_license");
    expect(result.confidence).toBeGreaterThan(0);
    expect(result.requiresGemini).toBe(false);
  });

  test("detects passport intent", () => {
    const result = detectIntent("I want to apply for a passport");
    expect(result.intent).toBe("passport");
    expect(result.requiresGemini).toBe(false);
  });

  test("detects Aadhaar intent", () => {
    const result = detectIntent("How to download aadhaar card online?");
    expect(result.intent).toBe("aadhaar");
    expect(result.confidence).toBeGreaterThan(0);
  });

  test("detects PAN card intent", () => {
    const result = detectIntent("I need to apply for a pan card");
    expect(result.intent).toBe("pan_card");
  });

  test("detects voter ID intent", () => {
    const result = detectIntent("How to register for voter id card?");
    expect(result.intent).toBe("voter_id");
  });

  test("detects ration card intent", () => {
    const result = detectIntent("How to apply for BPL ration card?");
    expect(result.intent).toBe("ration_card");
  });

  test("detects birth certificate intent", () => {
    const result = detectIntent("I need a birth certificate for my child");
    expect(result.intent).toBe("birth_certificate");
  });

  test("detects income certificate intent", () => {
    const result = detectIntent("How to get an income certificate?");
    expect(result.intent).toBe("income_certificate");
  });

  test("detects MSME/Udyam registration intent", () => {
    const result = detectIntent("How to register my small business under MSME?");
    expect(result.intent).toBe("udyam_msme");
  });

  test("detects scholarship intent", () => {
    const result = detectIntent("How to apply for national scholarship?");
    expect(result.intent).toBe("scholarship");
  });

  test("detects ABHA health ID intent", () => {
    const result = detectIntent("How to create ABHA health id?");
    expect(result.intent).toBe("health_id");
  });
});

describe("detectIntent — Civic Issues", () => {
  test("detects complaint reporting intent for pothole", () => {
    const result = detectIntent("There is a big pothole near my house");
    expect(result.intent).toBe("report_complaint");
  });

  test("detects complaint reporting intent for street light", () => {
    const result = detectIntent("The street light is not working on my road");
    expect(result.intent).toBe("report_complaint");
  });

  test("detects complaint tracking intent", () => {
    const result = detectIntent("What is the status of my complaint CMP-2026-1453?");
    expect(result.intent).toBe("track_complaint");
  });

  test("extracts complaint ID entity when present", () => {
    const result = detectIntent("Track my complaint CMP-2026-1234");
    expect(result.entities.complaintId).toBe("CMP-2026-1234");
  });
});

describe("detectIntent — Schemes & Documents", () => {
  test("detects scheme intent", () => {
    const result = detectIntent("Which government schemes am I eligible for?");
    expect(result.intent).toBe("find_scheme");
  });

  test("detects PM Kisan scheme query", () => {
    const result = detectIntent("How to apply for PM Kisan yojana?");
    expect(result.intent).toBe("find_scheme");
  });

  test("detects document upload intent", () => {
    const result = detectIntent("How do I upload my documents?");
    expect(result.intent).toBe("upload_document");
  });
});

describe("detectIntent — Conversational", () => {
  test("detects greeting intent and never requires Gemini", () => {
    const result = detectIntent("namaste");
    expect(result.intent).toBe("greeting");
    expect(result.requiresGemini).toBe(false);
  });

  test("detects English greeting", () => {
    const result = detectIntent("Hello, I need help");
    expect(result.intent).toBe("greeting");
    expect(result.requiresGemini).toBe(false);
  });

  test("detects gratitude and never requires Gemini", () => {
    const result = detectIntent("thank you for your help");
    expect(result.intent).toBe("gratitude");
    expect(result.requiresGemini).toBe(false);
  });

  test("falls back to general_query for unknown input", () => {
    const result = detectIntent("xyz abc random unrecognized text here");
    expect(result.intent).toBe("general_query");
    expect(result.requiresGemini).toBe(true);
  });
});

describe("detectIntent — Hindi Language Support", () => {
  test("detects scholarship from Hindi keyword छात्रवृत्ति", () => {
    const result = detectIntent("मुझे छात्रवृत्ति चाहिए");
    expect(result.intent).toBe("scholarship");
  });

  test("detects greeting from Hindi नमस्ते", () => {
    const result = detectIntent("नमस्ते, मुझे मदद चाहिए");
    expect(result.intent).toBe("greeting");
  });

  test("detects gratitude from Hindi धन्यवाद", () => {
    const result = detectIntent("धन्यवाद");
    expect(result.intent).toBe("gratitude");
  });
});

describe("detectIntent — Response Shape", () => {
  test("always returns required fields", () => {
    const result = detectIntent("any query");
    expect(result).toHaveProperty("intent");
    expect(result).toHaveProperty("confidence");
    expect(result).toHaveProperty("entities");
    expect(result).toHaveProperty("requiresGemini");
  });

  test("confidence is between 0 and 1", () => {
    const result = detectIntent("I need help with driving license renewal");
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
  });

  test("entities is always an object", () => {
    const result = detectIntent("any query at all");
    expect(typeof result.entities).toBe("object");
  });
});
