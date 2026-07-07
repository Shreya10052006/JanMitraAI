import { NextRequest, NextResponse } from "next/server";

export interface ProfileRequestBody {
  name?: string;
  fullName?: string;
  email?: string;
  location?: string;
  occupation?: string;
  income?: string;
  age?: string;
  category?: string;
  notificationsEnabled?: boolean;
}

// Profile is stored client-side in localStorage.
// This route validates profile updates for future server-side use.
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: "Profile is managed client-side via localStorage",
    fields: [
      "name", "fullName", "email", "location",
      "occupation", "income", "age", "category",
      "notificationsEnabled",
    ],
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as ProfileRequestBody;

    // Validate fields
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (body.name && (body.name.trim().length < 1 || body.name.trim().length > 50)) {
      return NextResponse.json({ error: "Name must be 1–50 characters" }, { status: 400 });
    }

    // Return validated data back to client for localStorage persistence
    return NextResponse.json({ success: true, profile: body });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
