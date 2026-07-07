import { NextRequest, NextResponse } from "next/server";
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/mock-data";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase().trim() ?? "";
  const category = searchParams.get("category")?.toLowerCase().trim() ?? "";

  let results = [...SERVICES];

  // Filter by category
  if (category && category !== "all") {
    results = results.filter((s) => s.category === category);
  }

  // Filter by search query
  if (search) {
    results = results.filter(
      (s) =>
        s.title.toLowerCase().includes(search) ||
        s.description.toLowerCase().includes(search) ||
        s.department.toLowerCase().includes(search) ||
        s.documentsNeeded.some((d) => d.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({
    services: results,
    categories: SERVICE_CATEGORIES,
    total: results.length,
  });
}
