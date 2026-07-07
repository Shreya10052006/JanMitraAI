import { NextRequest, NextResponse } from "next/server";
import { categorizeComplaint } from "@/services/gemini";
import { COMPLAINT_CATEGORIES } from "@/lib/mock-data";

const CATEGORY_DEPARTMENT_MAP: Record<string, string> = {
  "Street Lighting": "Municipal Electric Department",
  "Roads & Infrastructure": "Public Works Department (PWD)",
  "Water Supply": "Jal Board / Water Department",
  "Sanitation & Drainage": "Sanitation & Drainage Department",
  "Garbage Collection": "Municipal Solid Waste Management",
  "Public Transport": "State Transport Department",
  "Electricity": "State Electricity Board",
  "Parks & Recreation": "Horticulture / Parks Department",
  "Noise Pollution": "Pollution Control Board",
  "Other": "Municipal Corporation",
};

const KEYWORD_CATEGORY_MAP: Array<{ keywords: string[]; category: string; priority: "low" | "medium" | "high" }> = [
  { keywords: ["street light", "light not working", "lamp", "lighting"], category: "Street Lighting", priority: "medium" },
  { keywords: ["pothole", "road damage", "road broken", "broken road", "road repair"], category: "Roads & Infrastructure", priority: "high" },
  { keywords: ["water", "water supply", "no water", "water leak", "pipeline"], category: "Water Supply", priority: "high" },
  { keywords: ["garbage", "waste", "trash", "dustbin", "sweeping"], category: "Garbage Collection", priority: "medium" },
  { keywords: ["drainage", "sewage", "drain blocked", "waterlogging", "flooding"], category: "Sanitation & Drainage", priority: "high" },
  { keywords: ["electricity", "power cut", "no power", "electric", "blackout"], category: "Electricity", priority: "high" },
  { keywords: ["bus", "transport", "auto", "taxi"], category: "Public Transport", priority: "low" },
  { keywords: ["park", "garden", "playground", "tree"], category: "Parks & Recreation", priority: "low" },
  { keywords: ["noise", "sound", "loud", "music", "horn"], category: "Noise Pollution", priority: "low" },
];

function localCategorize(description: string, location: string): {
  category: string;
  department: string;
  priority: "low" | "medium" | "high";
  summary: string;
  confidence: number;
} {
  const lower = `${description} ${location}`.toLowerCase();

  for (const rule of KEYWORD_CATEGORY_MAP) {
    for (const keyword of rule.keywords) {
      if (lower.includes(keyword)) {
        return {
          category: rule.category,
          department: CATEGORY_DEPARTMENT_MAP[rule.category],
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

export interface ComplaintRequestBody {
  description: string;
  location: string;
  when?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as ComplaintRequestBody;

    if (!body.description?.trim() || !body.location?.trim()) {
      return NextResponse.json(
        { error: "Description and location are required" },
        { status: 400 }
      );
    }

    const description = body.description.trim().slice(0, 1000);
    const location = body.location.trim().slice(0, 200);

    // Try Gemini first for smart categorization
    let analysis = null;
    if (process.env.GEMINI_API_KEY) {
      analysis = await categorizeComplaint(description, location);
    }

    // Fall back to rule-based categorization
    if (!analysis) {
      analysis = localCategorize(description, location);
    }

    // Ensure category is from our valid list
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
