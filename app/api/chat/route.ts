import { NextRequest, NextResponse } from "next/server";
import { detectIntent } from "@/services/intentDetector";
import { getRuleEngineResponse, getFallbackResponse } from "@/services/ruleEngine";
import { generateChatResponse } from "@/services/gemini";

export interface ChatRequestBody {
  messages: { role: "user" | "assistant"; content: string }[];
  language?: string;
}

export interface ChatResponseBody {
  content: string;
  suggestedActions?: { label: string; href: string }[];
  relatedServices?: string[];
  card?: string;
  usedGemini: boolean;
  intent?: string;
}

function sanitizeInput(text: string): string {
  return text.trim().slice(0, 2000);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as ChatRequestBody;

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 });
    }

    const messages = body.messages.map((m) => ({
      role: m.role,
      content: sanitizeInput(m.content),
    }));

    const latestUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (!latestUserMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 });
    }

    const languageCode = body.language ?? "en";

    // Step 1: Intent Detection
    const detected = detectIntent(latestUserMessage.content);

    // Step 2: For simple/known intents, use Rule Engine directly
    if (!detected.requiresGemini && detected.confidence > 0.5) {
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

    // Step 3: For complex queries, use Gemini
    if (process.env.GEMINI_API_KEY) {
      const geminiResponse = await generateChatResponse(messages, languageCode);
      if (geminiResponse) {
        // Also get rule engine suggestions to supplement Gemini response
        const ruleResponse = detected.confidence > 0.3
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

    // Step 4: Fallback — Gemini failed or not configured
    // Try rule engine for matched intent
    if (detected.confidence > 0.3) {
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

    // Final fallback
    const fallback = getFallbackResponse();
    const response: ChatResponseBody = {
      content: fallback.content,
      suggestedActions: fallback.suggestedActions,
      usedGemini: false,
    };
    return NextResponse.json(response);
  } catch {
    const fallback = getFallbackResponse();
    return NextResponse.json(
      {
        content: fallback.content,
        suggestedActions: fallback.suggestedActions,
        usedGemini: false,
      },
      { status: 200 } // Return 200 so client still gets usable content
    );
  }
}
