/**
 * app/api/complaints/route.ts
 *
 * Civic complaint analysis endpoint.
 *
 * Pipeline:
 *   1. Input validation & sanitization
 *   2. Gemini AI categorization (when API key present)
 *   3. Local keyword-based categorization (fallback, always available)
 *
 * Smart Bharat alignment:
 *   - AI-powered grievance categorization for faster routing
 *   - Ensures complaints reach the correct government department
 *   - Transparent process with confidence scoring
 *   - Works offline via rule-based fallback (rural connectivity)
 */

import { NextRequest, NextResponse } from "next/server";
import { categorizeComplaint } from "@/services/gemini";
import { COMPLAINT_CATEGORIES } from "@/lib/mock-data";
import { validateComplaintRequest } from "@/lib/validation";
import { CATEGORY_DEPARTMENT_MAP } from "@/lib/constants";

// ─── Local Keyword Categorizer ────────────────────────────────────────────────

interface KeywordCategoryRule {
  keywords: string[];
  category: string;
  priority: "low" | "medium" | "high";
}

const KEYWORD_CATEGORY_RULES: KeywordCategoryRule[] = [
  {
    keywords: ["street light", "light not working", "lamp", "lighting"],
    category: "Street Lighting",
    priority: "medium",
  },
  {
    keywords: ["pothole", "road damage", "road broken", "broken road", "road repair"],
    category: "Roads & Infrastructure",
    priority: "high",
  },
  {
    keywords: ["water", "water supply", "no water", "water leak", "pipeline"],
    category: "Water Supply",
    priority: "high",
  },
  {
    keywords: ["garbage", "waste", "trash", "dustbin", "sweeping"],
    category: "Garbage Collection",
    priority: "medium",
  },
  {
    keywords: ["drainage", "sewage", "drain blocked", "waterlogging", "flooding"],
    category: "Sanitation & Drainage",
    priority: "high",
  },
  {
    keywords: ["electricity", "power cut", "no power", "electric", "blackout"],
    category: "Electricity",
    priority: "high",
  },
  {
    keywords: ["bus", "transport", "auto", "taxi"],
    category: "Public Transport",
    priority: "low",
  },
  {
    keywords: ["park", "garden", "playground", "tree"],
    category: "Parks & Recreation",
    priority: "low",
  },
  {
    keywords: ["noise", "sound", "loud", "music", "horn"],
    category: "Noise Pollution",
    priority: "low",
  },
];

interface ComplaintAnalysis {
  category: string;
  department: string;
  priority: "low" | "medium" | "high";
  summary: string;
  confidence: number;
}

/**
 * Rule-based complaint categorizer — always available with zero latency.
 * Serves as the primary categorizer when Gemini is unavailable.
 */
function localCategorize(description: string, location: string): ComplaintAnalysis {
  const lower = `${description} ${location}`.toLowerCase();

  for (const rule of KEYWORD_CATEGORY_RULES) {
    for (const keyword of rule.keywords) {
      if (lower.includes(keyword)) {
        return {
          category: rule.category,
          department: CATEGORY_DEPARTMENT_MAP[rule.category] ?? CATEGORY_DEPARTMENT_MAP["Other"],
          priority: rule.priority,
          summary: `${rule.category} issue reported at ${location}`,
          confidence: 0.85,
        };
      }
    }
  }

  return {
    category: "Other",
    department: CATEGORY_DEPARTMENT_MAP["Other"],
    priority: "medium",
    summary: `Civic issue reported at ${location}`,
    confidence: 0.6,
  };
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validated = validateComplaintRequest(body);

    if (!validated.valid) {
      return NextResponse.json(
        { error: validated.errors[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    const { description, location } = validated;

    // Try Gemini for smart AI categorization
    let analysis: ComplaintAnalysis | null = null;
    if (process.env.GEMINI_API_KEY) {
      analysis = await categorizeComplaint(description, location);
    }

    // Fall back to rule-based local categorization
    if (!analysis) {
      analysis = localCategorize(description, location);
    }

    // Ensure category is from the validated list
    if (!COMPLAINT_CATEGORIES.includes(analysis.category)) {
      analysis.category = "Other";
      analysis.department = CATEGORY_DEPARTMENT_MAP["Other"];
    }

    return NextResponse.json({
      category: analysis.category,
      department: analysis.department,
      priority: analysis.priority,
      summary: analysis.summary,
      confidence: analysis.confidence,
      usedGemini: !!process.env.GEMINI_API_KEY && analysis.confidence > 0.85,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to analyze complaint. Please try again." },
      { status: 500 }
    );
  }
}
