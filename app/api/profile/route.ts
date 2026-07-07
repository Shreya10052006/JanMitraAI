/**
 * app/api/profile/route.ts
 *
 * Profile validation endpoint.
 *
 * GET  — returns the list of supported profile fields
 * POST — validates profile data before client-side persistence
 *
 * Architecture note: profile data is persisted in localStorage
 * (see services/storage.ts). This route validates data server-side
 * before the client stores it, ensuring data integrity.
 *
 * Smart Bharat alignment:
 *   - Personalized scheme recommendations based on profile
 *   - Occupation and income enable targeted benefit matching
 */

import { NextRequest, NextResponse } from "next/server";
import { validateProfileRequest } from "@/lib/validation";

const PROFILE_FIELDS = [
  "name",
  "fullName",
  "email",
  "location",
  "occupation",
  "income",
  "age",
  "category",
  "notificationsEnabled",
] as const;

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: "Profile is managed client-side via localStorage",
    fields: PROFILE_FIELDS,
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { errors, data } = validateProfileRequest(body);

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors[0].message, field: errors[0].field },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, profile: data });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
