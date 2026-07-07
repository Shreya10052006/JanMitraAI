/**
 * tests/unit/ruleEngine.test.ts
 *
 * Unit tests for the rule engine — the zero-cost structured response layer
 * that handles known civic intents without calling Gemini.
 */

import { getRuleEngineResponse, getFallbackResponse } from "@/services/ruleEngine";
import type { IntentType } from "@/services/intentDetector";

describe("getRuleEngineResponse — Government Services", () => {
  test("returns driving license response with official portal link", () => {
    const res = getRuleEngineResponse("driving_license");
    expect(res.content).toBeTruthy();
    expect(res.content.toLowerCase()).toContain("driving");
    expect(res.suggestedActions).toBeDefined();
    expect(res.suggestedActions!.length).toBeGreaterThan(0);
  });

  test("passport response includes fees and processing time", () => {
    const res = getRuleEngineResponse("passport");
    expect(res.content).toContain("₹");
    expect(res.content.toLowerCase()).toContain("passport");
    expect(res.suggestedActions).toBeDefined();
  });

  test("aadhaar response includes UIDAI link", () => {
    const res = getRuleEngineResponse("aadhaar");
    const hasUidaiLink = res.suggestedActions?.some((a) =>
      a.href.includes("uidai")
    );
    expect(hasUidaiLink).toBe(true);
  });

  test("PAN card response mentions income tax", () => {
    const res = getRuleEngineResponse("pan_card");
    expect(res.content.toLowerCase()).toContain("pan");
  });

  test("voter ID response includes ECI portal link", () => {
    const res = getRuleEngineResponse("voter_id");
    const hasEciLink = res.suggestedActions?.some((a) =>
      a.href.includes("eci") || a.href.includes("voter")
    );
    expect(hasEciLink).toBe(true);
  });

  test("scholarship response includes National Scholarship Portal", () => {
    const res = getRuleEngineResponse("scholarship");
    const hasNspLink = res.suggestedActions?.some((a) =>
      a.href.includes("scholarships")
    );
    expect(hasNspLink).toBe(true);
  });

  test("Udyam MSME response mentions free registration", () => {
    const res = getRuleEngineResponse("udyam_msme");
    expect(res.content.toUpperCase()).toContain("FREE");
  });

  test("health ID response mentions ABHA", () => {
    const res = getRuleEngineResponse("health_id");
    expect(res.content).toContain("ABHA");
  });
});

describe("getRuleEngineResponse — Civic Issues", () => {
  test("complaint reporting response includes step-by-step guide", () => {
    const res = getRuleEngineResponse("report_complaint");
    expect(res.content).toBeTruthy();
    expect(res.suggestedActions?.some((a) => a.href === "/complaints")).toBe(true);
  });

  test("complaint tracking response explains status meanings", () => {
    const res = getRuleEngineResponse("track_complaint");
    expect(res.content.toLowerCase()).toContain("status");
    expect(res.suggestedActions).toBeDefined();
  });

  test("scheme finder response lists popular government schemes", () => {
    const res = getRuleEngineResponse("find_scheme");
    expect(res.content).toContain("PM Kisan");
    expect(res.content).toContain("Ayushman");
    expect(res.suggestedActions?.some((a) => a.href === "/schemes")).toBe(true);
  });

  test("document upload response guides to Documents section", () => {
    const res = getRuleEngineResponse("upload_document");
    expect(res.suggestedActions?.some((a) => a.href === "/documents")).toBe(true);
  });
});

describe("getRuleEngineResponse — Conversational", () => {
  test("greeting response introduces JanMitra AI", () => {
    const res = getRuleEngineResponse("greeting");
    expect(res.content).toContain("JanMitra");
    // Should include quick action links for onboarding
    expect(res.suggestedActions).toBeDefined();
    expect(res.suggestedActions!.length).toBeGreaterThanOrEqual(3);
  });

  test("gratitude response is friendly and offers further help", () => {
    const res = getRuleEngineResponse("gratitude");
    expect(res.content).toBeTruthy();
    expect(res.content.length).toBeGreaterThan(10);
  });

  test("general_query response covers all major feature areas", () => {
    const res = getRuleEngineResponse("general_query");
    const content = res.content.toLowerCase();
    expect(content).toContain("service");
    expect(content).toContain("complaint");
    expect(content).toContain("scheme");
  });
});

describe("getRuleEngineResponse — Response Shape", () => {
  const allIntents: IntentType[] = [
    "driving_license", "passport", "birth_certificate", "ration_card",
    "aadhaar", "pan_card", "voter_id", "income_certificate",
    "caste_certificate", "land_records", "vehicle_registration",
    "udyam_msme", "scholarship", "health_id", "report_complaint",
    "track_complaint", "find_scheme", "upload_document",
    "language_help", "greeting", "gratitude", "general_query",
  ];

  test.each(allIntents)("returns non-empty content for intent: %s", (intent) => {
    const res = getRuleEngineResponse(intent);
    expect(res.content).toBeTruthy();
    expect(res.content.length).toBeGreaterThan(20);
  });

  test("all service intents include at least one suggested action", () => {
    const serviceIntents: IntentType[] = [
      "driving_license", "passport", "aadhaar", "pan_card",
      "voter_id", "scholarship", "find_scheme", "report_complaint",
    ];
    serviceIntents.forEach((intent) => {
      const res = getRuleEngineResponse(intent);
      expect(res.suggestedActions).toBeDefined();
      expect(res.suggestedActions!.length).toBeGreaterThan(0);
    });
  });
});

describe("getFallbackResponse", () => {
  test("always returns a usable response", () => {
    const res = getFallbackResponse();
    expect(res.content).toBeTruthy();
    expect(res.suggestedActions).toBeDefined();
    expect(res.suggestedActions!.length).toBeGreaterThan(0);
  });

  test("fallback includes links to all major features", () => {
    const res = getFallbackResponse();
    const hrefs = res.suggestedActions!.map((a) => a.href);
    expect(hrefs).toContain("/services");
    expect(hrefs).toContain("/complaints");
    expect(hrefs).toContain("/schemes");
  });
});
