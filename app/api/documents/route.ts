/**
 * app/api/documents/route.ts
 *
 * Document checklist generation endpoint.
 *
 * Pipeline:
 *   1. Validate service ID against known services list
 *   2. Return pre-built checklist if available (instant)
 *   3. Use Gemini to explain documents in plain language (if API key present)
 *   4. Fall back to basic documentsNeeded list from service data
 *
 * Smart Bharat alignment:
 *   - Simplifies government information for every citizen
 *   - Plain-language document explanations reduce confusion and failed applications
 *   - Supports 50+ government services with personalized checklists
 */

import { NextRequest, NextResponse } from "next/server";
import { explainDocumentRequirements } from "@/services/gemini";
import { SERVICE_DOCUMENT_CHECKLISTS, SERVICES } from "@/lib/mock-data";
import { sanitizeText } from "@/lib/validation";

export interface DocumentChecklistItem {
  name: string;
  description: string;
  required: boolean;
}

/**
 * Returns a pre-built or derived document checklist for a service.
 * Pre-built checklists take precedence for quality and speed.
 */
function getLocalChecklist(serviceId: string): DocumentChecklistItem[] | null {
  const checklist = SERVICE_DOCUMENT_CHECKLISTS[serviceId];
  if (checklist) return checklist;

  const service = SERVICES.find((s) => s.id === serviceId);
  if (service) {
    return service.documentsNeeded.map((doc) => ({
      name: doc,
      description: `Required document: ${doc}`,
      required: true,
    }));
  }

  return null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as { serviceId?: unknown };

    if (typeof body.serviceId !== "string" || !body.serviceId.trim()) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const serviceId = sanitizeText(body.serviceId, 100);
    const service = SERVICES.find((s) => s.id === serviceId);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Step 1: Local checklist (instant, no API cost)
    const localChecklist = getLocalChecklist(serviceId);
    let checklist: DocumentChecklistItem[] | null = localChecklist;

    // Step 2: Enrich with Gemini plain-language explanations (only for basic fallback lists)
    if (
      process.env.GEMINI_API_KEY &&
      !SERVICE_DOCUMENT_CHECKLISTS[serviceId] &&
      service.documentsNeeded.length > 0
    ) {
      const geminiExplanations = await explainDocumentRequirements(
        service.title,
        service.documentsNeeded
      );

      if (geminiExplanations) {
        checklist = geminiExplanations.map((item, idx) => ({
          name: item.name,
          description: item.explanation,
          required: idx < Math.ceil(service.documentsNeeded.length * 0.8),
        }));
      }
    }

    return NextResponse.json({
      serviceId,
      serviceTitle: service.title,
      department: service.department,
      estimatedTime: service.estimatedTime,
      checklist: checklist ?? [],
      usedGemini: !!process.env.GEMINI_API_KEY && !SERVICE_DOCUMENT_CHECKLISTS[serviceId],
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch document checklist. Please try again." },
      { status: 500 }
    );
  }
}
