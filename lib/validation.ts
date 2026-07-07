/**
 * lib/validation.ts
 *
 * Centralized input validation and sanitization utilities.
 * All API routes should use these functions to ensure consistent
 * security practices and prevent injection or abuse.
 *
 * Smart Bharat alignment: validates citizen-submitted data safely
 * before processing or forwarding to AI services.
 */

import { MAX_LENGTHS, VALID_LANGUAGES, VALID_ROLES } from "./constants";

// ─── Sanitization ─────────────────────────────────────────────────────────────

/**
 * Strips leading/trailing whitespace and truncates to the given max length.
 * Safe default for any freeform text field.
 */
export function sanitizeText(input: string, maxLength: number = MAX_LENGTHS.DEFAULT): string {
  return input.trim().slice(0, maxLength);
}

/**
 * Sanitizes a chat message, enforcing the per-message character limit.
 */
export function sanitizeMessage(content: string): string {
  return sanitizeText(content, MAX_LENGTHS.MESSAGE);
}

// ─── Validation ───────────────────────────────────────────────────────────────

/**
 * Validates an email address format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates a name field (1–50 printable characters).
 */
export function isValidName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= 1 && trimmed.length <= 50;
}

/**
 * Validates a language code against the supported language list.
 */
export function isValidLanguage(code: string): boolean {
  return (VALID_LANGUAGES as readonly string[]).includes(code);
}

/**
 * Validates a chat message role.
 */
export function isValidRole(role: string): role is "user" | "assistant" {
  return (VALID_ROLES as readonly string[]).includes(role);
}

// ─── Request Body Validators ──────────────────────────────────────────────────

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validates and sanitizes the chat API request body.
 * Returns sanitized messages and language, or an array of errors.
 */
export function validateChatRequest(body: unknown): {
  valid: true;
  messages: { role: "user" | "assistant"; content: string }[];
  language: string;
} | {
  valid: false;
  errors: ValidationError[];
} {
  if (!body || typeof body !== "object") {
    return { valid: false, errors: [{ field: "body", message: "Request body is required" }] };
  }

  const b = body as Record<string, unknown>;
  const errors: ValidationError[] = [];

  if (!Array.isArray(b.messages) || b.messages.length === 0) {
    errors.push({ field: "messages", message: "messages must be a non-empty array" });
  }

  if (errors.length > 0) return { valid: false, errors };

  const messages = (b.messages as unknown[])
    .filter((m): m is { role: string; content: string } =>
      typeof m === "object" && m !== null &&
      "role" in m && "content" in m &&
      typeof (m as Record<string, unknown>).role === "string" &&
      typeof (m as Record<string, unknown>).content === "string"
    )
    .filter((m) => isValidRole(m.role))
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: sanitizeMessage(m.content),
    }));

  if (messages.length === 0) {
    return { valid: false, errors: [{ field: "messages", message: "No valid messages found" }] };
  }

  const rawLanguage = typeof b.language === "string" ? b.language : "en";
  const language = isValidLanguage(rawLanguage) ? rawLanguage : "en";

  return { valid: true, messages, language };
}

/**
 * Validates and sanitizes the complaint analysis request body.
 */
export function validateComplaintRequest(body: unknown): {
  valid: true;
  description: string;
  location: string;
} | {
  valid: false;
  errors: ValidationError[];
} {
  if (!body || typeof body !== "object") {
    return { valid: false, errors: [{ field: "body", message: "Request body is required" }] };
  }

  const b = body as Record<string, unknown>;
  const errors: ValidationError[] = [];

  if (typeof b.description !== "string" || !b.description.trim()) {
    errors.push({ field: "description", message: "description is required" });
  }

  if (typeof b.location !== "string" || !b.location.trim()) {
    errors.push({ field: "location", message: "location is required" });
  }

  if (errors.length > 0) return { valid: false, errors };

  return {
    valid: true,
    description: sanitizeText(b.description as string, MAX_LENGTHS.COMPLAINT_DESCRIPTION),
    location: sanitizeText(b.location as string, MAX_LENGTHS.LOCATION),
  };
}

/**
 * Validates and sanitizes the profile update request body.
 */
export function validateProfileRequest(body: unknown): {
  valid: true;
  errors: ValidationError[];
  data: Record<string, unknown>;
} {
  const errors: ValidationError[] = [];

  if (!body || typeof body !== "object") {
    return { valid: true, errors, data: {} };
  }

  const b = body as Record<string, unknown>;

  if (typeof b.email === "string" && b.email && !isValidEmail(b.email)) {
    errors.push({ field: "email", message: "Invalid email address" });
  }

  if (typeof b.name === "string" && b.name && !isValidName(b.name)) {
    errors.push({ field: "name", message: "Name must be 1–50 characters" });
  }

  return { valid: true, errors, data: b };
}
