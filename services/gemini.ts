/**
 * Gemini AI client — server-side only.
 * Never import this in client components.
 */

export interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface ChatApiResponse {
  content: string;
  suggestedActions?: { label: string; href: string }[];
  relatedServices?: string[];
  usedGemini: boolean;
}

export interface ComplaintAnalysis {
  category: string;
  department: string;
  priority: "low" | "medium" | "high";
  summary: string;
  confidence: number;
}

export interface SchemeRecommendation {
  schemeId: string;
  reason: string;
  matchScore: number;
}

const CIVIC_SYSTEM_PROMPT = `You are JanMitra AI, a helpful civic assistant for Indian citizens. You help people:
- Access government services (driving license, passport, Aadhaar, ration card, etc.)
- Report and track civic issues (potholes, street lights, water supply, etc.)
- Find and apply for government schemes and benefits
- Understand document requirements for various services
- Navigate government portals and processes

Guidelines:
- Always respond in the same language the user writes in (Hindi or English or regional)
- Be concise, friendly, and clear. Use simple language.
- For government services, always mention official portals
- Warn users to verify information on official government websites
- Do not provide legal or financial advice
- Keep responses helpful and actionable`;

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return key;
}

function buildGeminiUrl(model: string): string {
  const key = getApiKey();
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
}

async function callGemini(
  contents: GeminiMessage[],
  systemInstruction: string,
  temperature = 0.7,
  maxTokens = 1024
): Promise<string | null> {
  try {
    const url = buildGeminiUrl("gemini-1.5-flash");
    const body = {
      contents,
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
        topK: 40,
        topP: 0.95,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json() as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text ?? null;
  } catch {
    return null;
  }
}

/**
 * Generate a chat response using Gemini.
 * Returns null if Gemini is unavailable (caller should use rule engine).
 */
export async function generateChatResponse(
  messages: { role: "user" | "assistant"; content: string }[],
  languageCode = "en"
): Promise<string | null> {
  const langInstruction =
    languageCode !== "en"
      ? `\nIMPORTANT: Respond in the user's language (language code: ${languageCode}).`
      : "";

  const contents: GeminiMessage[] = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  return callGemini(contents, CIVIC_SYSTEM_PROMPT + langInstruction, 0.7, 800);
}

/**
 * Categorize a civic complaint using Gemini.
 * Returns null if Gemini is unavailable.
 */
export async function categorizeComplaint(
  description: string,
  location: string
): Promise<ComplaintAnalysis | null> {
  const prompt = `Analyze this civic complaint and categorize it.

Description: "${description}"
Location: "${location}"

Respond with valid JSON only:
{
  "category": "<category from: Street Lighting, Roads & Infrastructure, Water Supply, Sanitation & Drainage, Garbage Collection, Public Transport, Electricity, Parks & Recreation, Noise Pollution, Other>",
  "department": "<responsible government department>",
  "priority": "<low|medium|high>",
  "summary": "<one sentence summary of the issue>",
  "confidence": <0.0 to 1.0>
}`;

  const contents: GeminiMessage[] = [{ role: "user", parts: [{ text: prompt }] }];

  const result = await callGemini(
    contents,
    "You are a civic complaint classification system. Always respond with valid JSON only.",
    0.2,
    256
  );

  if (!result) return null;

  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    const parsed = JSON.parse(jsonMatch[0]) as ComplaintAnalysis;
    if (
      typeof parsed.category === "string" &&
      typeof parsed.department === "string" &&
      typeof parsed.priority === "string" &&
      typeof parsed.summary === "string"
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Get scheme recommendations for a user profile using Gemini.
 * Returns null if Gemini is unavailable.
 */
export async function getSchemeRecommendations(
  profile: {
    occupation?: string;
    income?: string;
    location?: string;
    age?: string;
    category?: string;
  },
  availableSchemes: { id: string; title: string; eligibility: string[]; category: string }[]
): Promise<SchemeRecommendation[] | null> {
  const schemeList = availableSchemes
    .map((s) => `- ${s.id}: ${s.title} (${s.category}) — Eligibility: ${s.eligibility.join(", ")}`)
    .join("\n");

  const prompt = `Based on this user profile, recommend the most relevant government schemes:

User Profile:
- Occupation: ${profile.occupation || "Not specified"}
- Annual Income: ${profile.income || "Not specified"}
- Location: ${profile.location || "India"}
- Age: ${profile.age || "Not specified"}
- Social Category: ${profile.category || "Not specified"}

Available Schemes:
${schemeList}

Respond with valid JSON only — array of up to 4 recommendations:
[
  {
    "schemeId": "<scheme id>",
    "reason": "<brief reason why this scheme matches>",
    "matchScore": <0.0 to 1.0>
  }
]`;

  const contents: GeminiMessage[] = [{ role: "user", parts: [{ text: prompt }] }];
  const result = await callGemini(
    contents,
    "You are a government scheme recommendation system. Respond with valid JSON only.",
    0.3,
    512
  );

  if (!result) return null;

  try {
    const jsonMatch = result.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return null;
    const parsed = JSON.parse(jsonMatch[0]) as SchemeRecommendation[];
    if (Array.isArray(parsed)) return parsed;
    return null;
  } catch {
    return null;
  }
}

/**
 * Explain document requirements in simple language using Gemini.
 * Returns null if Gemini is unavailable.
 */
export async function explainDocumentRequirements(
  serviceTitle: string,
  documents: string[]
): Promise<{ name: string; explanation: string }[] | null> {
  const docList = documents.map((d, i) => `${i + 1}. ${d}`).join("\n");

  const prompt = `Explain these document requirements for "${serviceTitle}" in simple, plain language that any Indian citizen can understand:

${docList}

Respond with valid JSON only — array for each document:
[
  {
    "name": "<exact document name>",
    "explanation": "<plain language explanation of what it is, why needed, and where to get it>"
  }
]`;

  const contents: GeminiMessage[] = [{ role: "user", parts: [{ text: prompt }] }];
  const result = await callGemini(
    contents,
    "You are a civic assistant helping Indian citizens understand government document requirements. Respond with valid JSON only.",
    0.5,
    1024
  );

  if (!result) return null;

  try {
    const jsonMatch = result.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return null;
    const parsed = JSON.parse(jsonMatch[0]) as { name: string; explanation: string }[];
    if (Array.isArray(parsed)) return parsed;
    return null;
  } catch {
    return null;
  }
}
