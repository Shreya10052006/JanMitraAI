/**
 * lib/constants.ts
 *
 * Application-wide constants — single source of truth for all
 * hardcoded limits, configuration values, and magic numbers.
 *
 * Smart Bharat alignment: enforces safe, consistent limits
 * for all citizen-submitted data across the platform.
 */

// ─── Input Limits ─────────────────────────────────────────────────────────────

export const MAX_LENGTHS = {
  /** Default max for any freeform text field */
  DEFAULT: 2000,
  /** Per-message content limit in AI chat */
  MESSAGE: 2000,
  /** Complaint description limit */
  COMPLAINT_DESCRIPTION: 1000,
  /** Location field limit */
  LOCATION: 200,
  /** Profile name limit */
  NAME: 50,
} as const;

// ─── AI Configuration ─────────────────────────────────────────────────────────

export const AI_CONFIG = {
  /** Gemini model used for all AI features */
  MODEL: "gemini-1.5-flash",
  /** Timeout for Gemini API requests (milliseconds) */
  REQUEST_TIMEOUT_MS: 15_000,
  /** Max chat messages sent in API context window */
  MAX_CONTEXT_MESSAGES: 20,
  /** Max messages stored in localStorage chat history */
  MAX_STORED_MESSAGES: 100,
  /** Minimum intent confidence score to skip Gemini */
  RULE_ENGINE_CONFIDENCE_THRESHOLD: 0.5,
  /** Minimum confidence to use rule engine as Gemini fallback */
  FALLBACK_CONFIDENCE_THRESHOLD: 0.3,
} as const;

// ─── Storage ──────────────────────────────────────────────────────────────────

export const STORAGE_LIMITS = {
  /** Max recent activity items to keep in localStorage */
  MAX_ACTIVITY_ITEMS: 20,
  /** Starting complaint counter (realistic-looking ticket IDs) */
  COMPLAINT_COUNTER_SEED: 1452,
} as const;

// ─── Supported Languages ──────────────────────────────────────────────────────

/**
 * BCP-47 language codes supported by the multilingual AI assistant.
 * Smart Bharat alignment: ensures digital inclusion for all Indian citizens
 * by supporting 10 major Indian languages.
 */
export const VALID_LANGUAGES = [
  "en",   // English
  "hi",   // Hindi (हिन्दी)
  "ta",   // Tamil (தமிழ்)
  "te",   // Telugu (తెలుగు)
  "bn",   // Bengali (বাংলা)
  "mr",   // Marathi (मराठी)
  "gu",   // Gujarati (ગુજરાતી)
  "kn",   // Kannada (ಕನ್ನಡ)
  "ml",   // Malayalam (മലയാളം)
  "pa",   // Punjabi (ਪੰਜਾਬੀ)
] as const;

export type SupportedLanguage = typeof VALID_LANGUAGES[number];

// ─── Chat Message Roles ───────────────────────────────────────────────────────

export const VALID_ROLES = ["user", "assistant"] as const;

export type MessageRole = typeof VALID_ROLES[number];

// ─── Complaint Priorities ─────────────────────────────────────────────────────

export const COMPLAINT_PRIORITY_LABELS: Record<"low" | "medium" | "high", string> = {
  low: "Low Priority",
  medium: "Medium Priority",
  high: "High Priority",
} as const;

// ─── Civic Department Map ─────────────────────────────────────────────────────

/**
 * Maps civic complaint categories to responsible government departments.
 * Smart Bharat alignment: ensures complaints reach the correct authority
 * for faster resolution.
 */
export const CATEGORY_DEPARTMENT_MAP: Record<string, string> = {
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
} as const;
