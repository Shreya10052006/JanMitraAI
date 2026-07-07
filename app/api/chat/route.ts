/**
 * app/api/chat/route.ts
 *
 * Hybrid AI chat endpoint — Smart Bharat civic assistant.
 *
 * Pipeline (in order):
 *   1. Input validation & sanitization
 *   2. Intent detection (keyword-based, instant, zero cost)
 *   3. Rule engine (structured response for known civic intents)
 *   4. Gemini AI (only for complex/ambiguous queries)
 *   5. Rule engine fallback (if Gemini fails or is unconfigured)
 *
 * Smart Bharat alignment:
 *   - AI-powered citizen assistance across 10+ Indian languages
 *   - Government service discovery and navigation
 *   - Civic issue reporting guidance
 *   - Scheme eligibility assistance
 */

import { NextRequest, NextResponse } from "next/server";
import { detectIntent } from "@/services/intentDetector";
import { getRuleEngineResponse, getFallbackResponse } from "@/services/ruleEngine";
import { generateChatResponse } from "@/services/gemini";
import { validateChatRequest } from "@/lib/validation";
import { AI_CONFIG } from "@/lib/constants";

export interface ChatResponseBody {
  content: string;
  suggestedActions?: { label: string; href: string }[];
  relatedServices?: string[];
  card?: string;
  usedGemini: boolean;
  intent?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validated = validateChatRequest(body);

    if (!validated.valid) {
      return NextResponse.json(
        { error: validated.errors[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    const { messages, language } = validated;

    const latestUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (!latestUserMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 });
    }

    // Step 1: Intent Detection — runs instantly, no API cost
    const detected = detectIntent(latestUserMessage.content);

    // Step 2: Rule Engine — handles known civic intents with zero latency
    if (!detected.requiresGemini && detected.confidence > AI_CONFIG.RULE_ENGINE_CONFIDENCE_THRESHOLD) {
      const ruleResponse = getRuleEngineResponse(detected.intent);
      const response: ChatResponseBody = {
        content: ruleResponse.content,
        suggestedActions: ruleResponse.suggestedActions,
        relatedServices: ruleResponse.relatedServices,
        card: ruleResponse.card,
        usedGemini: false,
        intent: detected.intent,
      };
      return NextResponse.json(response);
    }

    // Step 3: Gemini — only for complex, ambiguous, or multilingual queries
    if (process.env.GEMINI_API_KEY) {
      const contextMessages = messages.slice(-AI_CONFIG.MAX_CONTEXT_MESSAGES);
      const geminiResponse = await generateChatResponse(contextMessages, language);

      if (geminiResponse) {
        // Supplement Gemini response with rule engine suggested actions
        const ruleResponse = detected.confidence > AI_CONFIG.FALLBACK_CONFIDENCE_THRESHOLD
          ? getRuleEngineResponse(detected.intent)
          : null;

        const response: ChatResponseBody = {
          content: geminiResponse,
          suggestedActions: ruleResponse?.suggestedActions,
          relatedServices: ruleResponse?.relatedServices,
          usedGemini: true,
          intent: detected.intent,
        };
        return NextResponse.json(response);
      }
    }

    // Step 4: Rule Engine Fallback — Gemini unavailable or failed
    if (detected.confidence > AI_CONFIG.FALLBACK_CONFIDENCE_THRESHOLD) {
      const ruleResponse = getRuleEngineResponse(detected.intent);
      const response: ChatResponseBody = {
        content: ruleResponse.content,
        suggestedActions: ruleResponse.suggestedActions,
        relatedServices: ruleResponse.relatedServices,
        card: ruleResponse.card,
        usedGemini: false,
        intent: detected.intent,
      };
      return NextResponse.json(response);
    }

    // Step 5: Final fallback — always returns a usable response
    const fallback = getFallbackResponse();
    return NextResponse.json({
      content: fallback.content,
      suggestedActions: fallback.suggestedActions,
      usedGemini: false,
    } satisfies ChatResponseBody);
  } catch {
    // Always return 200 with fallback content so the client gets a usable response
    const fallback = getFallbackResponse();
    return NextResponse.json({
      content: fallback.content,
      suggestedActions: fallback.suggestedActions,
      usedGemini: false,
    } satisfies ChatResponseBody);
  }
}
