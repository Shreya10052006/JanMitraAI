import { NextRequest, NextResponse } from "next/server";
import { SCHEMES } from "@/lib/mock-data";
import { getSchemeRecommendations } from "@/services/gemini";

export interface SchemeRequestBody {
  occupation?: string;
  income?: string;
  location?: string;
  age?: string;
  category?: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase().trim() ?? "";
  const category = searchParams.get("category")?.toLowerCase().trim() ?? "";
  const filter = searchParams.get("filter")?.toLowerCase().trim() ?? "";

  let results = [...SCHEMES];

  if (category && category !== "all") {
    results = results.filter((s) => s.category.toLowerCase() === category);
  }

  if (filter === "eligible") {
    results = results.filter((s) => s.isEligible);
  }

  if (search) {
    results = results.filter(
      (s) =>
        s.title.toLowerCase().includes(search) ||
        s.description.toLowerCase().includes(search) ||
        s.ministry.toLowerCase().includes(search) ||
        s.category.toLowerCase().includes(search) ||
        s.eligibility.some((e) => e.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({ schemes: results, total: results.length });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as SchemeRequestBody;

    const schemeList = SCHEMES.map((s) => ({
      id: s.id,
      title: s.title,
      eligibility: s.eligibility,
      category: s.category,
    }));

    // Try Gemini recommendations if profile is provided
    if (process.env.GEMINI_API_KEY && (body.occupation || body.income || body.age)) {
      const recommendations = await getSchemeRecommendations(body, schemeList);
      if (recommendations && recommendations.length > 0) {
        const recommendedSchemes = recommendations
          .map((rec) => {
            const scheme = SCHEMES.find((s) => s.id === rec.schemeId);
            if (!scheme) return null;
            return { ...scheme, aiReason: rec.reason, matchScore: rec.matchScore };
          })
          .filter(Boolean);

        if (recommendedSchemes.length > 0) {
          return NextResponse.json({
            schemes: recommendedSchemes,
            total: recommendedSchemes.length,
            isPersonalized: true,
            usedGemini: true,
          });
        }
      }
    }

    // Fallback: return eligible schemes
    const eligibleSchemes = SCHEMES.filter((s) => s.isEligible);
    return NextResponse.json({
      schemes: eligibleSchemes,
      total: eligibleSchemes.length,
      isPersonalized: false,
      usedGemini: false,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to get scheme recommendations" },
      { status: 500 }
    );
  }
}
