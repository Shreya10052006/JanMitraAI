import { NextRequest, NextResponse } from "next/server";
import { explainDocumentRequirements } from "@/services/gemini";
import { SERVICE_DOCUMENT_CHECKLISTS, SERVICES } from "@/lib/mock-data";

export interface DocumentRequestBody {
  serviceId: string;
}

export interface DocumentChecklistItem {
  name: string;
  description: string;
  required: boolean;
}

function getLocalChecklist(serviceId: string): DocumentChecklistItem[] | null {
  // Check our pre-built checklists first
  const checklist = SERVICE_DOCUMENT_CHECKLISTS[serviceId];
  if (checklist) return checklist;

  // Fall back to service's documentsNeeded array
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
    const body = await request.json() as DocumentRequestBody;

    if (!body.serviceId?.trim()) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const serviceId = body.serviceId.trim();
    const service = SERVICES.find((s) => s.id === serviceId);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Get local checklist first (instant)
    const localChecklist = getLocalChecklist(serviceId);

    // Try to enrich with Gemini explanations (only if local checklist is basic)
    let checklist: DocumentChecklistItem[] | null = localChecklist;

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
