/**
 * services/ruleEngine.ts
 *
 * Structured response engine for known civic intents.
 * Contains curated, human-verified responses for 20+ government service
 * and civic assistance intents. Serves as both the primary handler for
 * high-confidence intent matches and the fallback when Gemini is unavailable.
 *
 * Design principle: The rule engine ensures the platform is ALWAYS useful,
 * even without an internet connection or API key.
 *
 * Smart Bharat alignment:
 *   - Government service discovery (DL, Passport, Aadhaar, PAN, etc.)
 *   - Civic issue reporting guidance with step-by-step flow
 *   - Scheme discovery and eligibility pointers
 *   - Document upload and management guidance
 *   - Verified official portal links for all services
 */

import type { IntentType } from "./intentDetector";

export interface RuleEngineResponse {
  content: string;
  suggestedActions?: { label: string; href: string }[];
  relatedServices?: string[];
  card?: "driving-license" | "passport" | "complaint-guide" | "schemes-guide";
}

const RESPONSES: Partial<Record<IntentType, RuleEngineResponse>> = {
  greeting: {
    content:
      "Namaste! 🙏 I'm JanMitra AI, your civic companion.\n\nI can help you with:\n• Government services (Driving License, Passport, Aadhaar, etc.)\n• Reporting civic issues (Potholes, Street Lights, Water Supply)\n• Finding schemes & benefits you're eligible for\n• Document requirements and guidance\n\nWhat would you like help with today?",
    suggestedActions: [
      { label: "Find Government Services", href: "/services" },
      { label: "Report an Issue", href: "/complaints" },
      { label: "Check Scheme Eligibility", href: "/schemes" },
    ],
  },

  gratitude: {
    content:
      "You're welcome! 😊 I'm always here to help you navigate government services and civic issues.\n\nIs there anything else I can assist you with?",
    suggestedActions: [
      { label: "Explore Services", href: "/services" },
      { label: "My Complaints", href: "/complaints" },
    ],
  },

  driving_license: {
    content:
      "I can help you with Driving License services! 🚗\n\nHere's what you need to know for **DL Renewal**:\n\n**Documents Required:**\n• Original Driving License\n• Aadhaar Card (or valid ID proof)\n• Address proof\n• Passport-size photograph\n• Medical Certificate Form 1A (if age > 40)\n\n**Fees:** ₹200 – ₹600 (depending on DL type)\n**Processing Time:** 3–7 working days\n\n**How to Apply Online:**\n1. Visit parivahan.gov.in\n2. Select 'Driving License' → 'DL Renewal'\n3. Fill details and upload documents\n4. Pay fee and book slot if required\n5. Receive renewed DL at your address\n\nYou can also check DL status, apply for duplicate, or book a driving test slot.",
    suggestedActions: [
      { label: "Apply / Renew DL", href: "https://parivahan.gov.in" },
      { label: "Check DL Status", href: "https://parivahan.gov.in" },
      { label: "Document Checklist", href: "/documents" },
    ],
    relatedServices: [
      "Change of Address in DL",
      "International Driving Permit",
      "Learner's License",
      "Vehicle Registration",
    ],
    card: "driving-license",
  },

  passport: {
    content:
      "I can guide you with Passport services! 📘\n\n**For a New Passport:**\n\n**Documents Required:**\n• Birth Certificate\n• Aadhaar Card\n• Address proof (Voter ID / Utility Bill)\n• 2 recent passport-size photos\n\n**Fees:** ₹1,500 (Normal) | ₹3,500 (Tatkal)\n**Processing Time:** 7–45 days (Normal) | 1–3 days (Tatkal)\n\n**How to Apply:**\n1. Register on passportindia.gov.in\n2. Fill the online application form\n3. Book appointment at nearest PSK\n4. Visit PSK with original documents\n5. Police verification (for some cases)\n6. Passport delivered to your address\n\nFor minors, parental documents are also required.",
    suggestedActions: [
      { label: "Apply on Passport Seva", href: "https://passportindia.gov.in" },
      { label: "Find Passport Office", href: "https://passportindia.gov.in" },
      { label: "Document Checklist", href: "/documents" },
    ],
    relatedServices: ["PAN Card", "Aadhaar Card", "Birth Certificate", "Tatkal Passport"],
  },

  birth_certificate: {
    content:
      "Here's how to get a Birth Certificate in India 📋\n\n**Documents Required:**\n• Hospital Discharge Summary\n• Parents' Aadhaar Cards\n• Parents' Marriage Certificate\n• Application form (from Municipal Corporation)\n\n**Process:**\n1. Report birth within 21 days at Municipal Corporation\n2. Submit hospital records and parent documents\n3. Get acknowledgment slip\n4. Certificate issued in 3–7 days\n\n**Late Registration (after 21 days):** Requires affidavit and additional verification.\n\n**Online:** Many states now offer online registration at crsorgi.gov.in",
    suggestedActions: [
      { label: "Apply Online (CRSORGI)", href: "https://crsorgi.gov.in" },
      { label: "Document Checklist", href: "/documents" },
    ],
    relatedServices: ["Aadhaar Enrolment", "Passport", "School Admission"],
  },

  aadhaar: {
    content:
      "Here's how to manage your Aadhaar 🪪\n\n**Services Available:**\n• Download e-Aadhaar (free)\n• Update Name / Address / Mobile / Email\n• Check Aadhaar status\n• Lock/Unlock biometrics\n• Order PVC Aadhaar card\n\n**To Update Address:**\n1. Visit uidai.gov.in\n2. Login with Aadhaar + OTP\n3. Select 'Update Aadhaar'\n4. Upload address proof\n5. Update reflected in 90 days\n\n**Visit Aadhaar Enrolment Centre** for biometric updates or name changes.",
    suggestedActions: [
      { label: "UIDAI Official Site", href: "https://uidai.gov.in" },
      { label: "Download e-Aadhaar", href: "https://eaadhaar.uidai.gov.in" },
    ],
    relatedServices: ["PAN Card", "Voter ID", "Driving License"],
  },

  ration_card: {
    content:
      "Here's how to apply for a Ration Card 🏠\n\n**Documents Required:**\n• Aadhaar cards of all family members\n• Address proof\n• Income certificate\n• Recent family photograph\n• Bank account details\n\n**Process:**\n1. Visit your state's Food Department portal\n2. Fill the online application form\n3. Upload required documents\n4. Submit and get acknowledgment\n5. Field verification by officer\n6. Card issued in 14–30 days\n\n**Note:** Each state has its own portal. Search for '[State Name] ration card apply online'.",
    suggestedActions: [
      { label: "National Food Security", href: "https://nfsa.gov.in" },
      { label: "Document Checklist", href: "/documents" },
    ],
    relatedServices: ["Income Certificate", "Aadhaar Card", "One Nation One Ration Card"],
  },

  udyam_msme: {
    content:
      "Here's how to register your business under Udyam (MSME) 💼\n\n**Udyam Registration is FREE and completely online!**\n\n**Documents Required:**\n• Aadhaar Card (proprietor/partner/director)\n• PAN Card\n• Bank account details with IFSC\n• Business address proof\n\n**Process:**\n1. Visit udyamregistration.gov.in\n2. Login with Aadhaar OTP\n3. Fill business details\n4. Auto-fetches GSTIN and PAN details\n5. Get Udyam Registration Certificate instantly\n\n**Benefits:**\n• Priority lending from banks\n• Subsidies on various government schemes\n• Protection against delayed payments\n• Tax benefits and exemptions",
    suggestedActions: [
      { label: "Register on Udyam Portal", href: "https://udyamregistration.gov.in" },
      { label: "Startup India Scheme", href: "/schemes" },
    ],
    relatedServices: ["GST Registration", "Startup India", "PMEGP Scheme"],
  },

  scholarship: {
    content:
      "Here's how to apply for Government Scholarships 🎓\n\n**National Scholarship Portal (NSP)** is the single platform for all central scholarships.\n\n**Major Schemes:**\n• Pre-Matric & Post-Matric Scholarships (SC/ST/OBC/Minorities)\n• National Means-cum-Merit Scholarship (NMMSS)\n• Central Sector Scholarship for College Students\n• PM Scholarship for RPF/RPSF wards\n\n**Documents Required:**\n• Aadhaar Card\n• Marksheets (previous year)\n• Bank account details\n• Caste/Income Certificate (if applicable)\n• Institution verification\n\n**Application Window:** Generally August–November each year",
    suggestedActions: [
      { label: "National Scholarship Portal", href: "https://scholarships.gov.in" },
      { label: "Find Schemes", href: "/schemes" },
    ],
    relatedServices: ["Income Certificate", "Caste Certificate", "State Scholarships"],
  },

  report_complaint: {
    content:
      "I can help you report a civic issue! 📢\n\nYou can report the following types of issues:\n• 💡 Street Lighting problems\n• 🚧 Potholes & Road damage\n• 💧 Water supply disruptions\n• 🗑️ Garbage collection issues\n• ⚡ Electricity problems\n• 🌿 Parks & public spaces\n\n**How it works:**\n1. Upload a photo of the issue\n2. Add your location\n3. Describe the problem\n4. Our AI categorizes & routes it\n5. Get a complaint ID for tracking\n6. Receive status updates\n\nShall I take you to the complaint form?",
    suggestedActions: [
      { label: "Report an Issue Now", href: "/complaints" },
      { label: "Track Existing Complaint", href: "/complaints" },
      { label: "View My Complaints", href: "/complaints" },
    ],
    card: "complaint-guide",
  },

  track_complaint: {
    content:
      "To track your complaint, you'll need your **Complaint ID** (format: CMP-YEAR-XXXX).\n\n**How to track:**\n1. Go to the Complaints section\n2. Click 'Track Complaint' tab\n3. Enter your Complaint ID\n4. See real-time status and timeline\n\n**Status meanings:**\n• 📋 **Submitted** — Received by system\n• 🔍 **Under Review** — Department reviewing\n• 👷 **Assigned** — Officer assigned\n• 🔧 **In Progress** — Work started\n• ✅ **Resolved** — Issue fixed\n\nYou can find your complaint ID in the confirmation SMS or in 'My Complaints'.",
    suggestedActions: [
      { label: "Track Complaint", href: "/complaints" },
      { label: "My Complaints", href: "/complaints" },
    ],
  },

  find_scheme: {
    content:
      "Let me help you find government schemes you may be eligible for! 🎁\n\n**Popular Schemes:**\n• 🌾 **PM Kisan Samman Nidhi** — ₹6,000/year for farmers\n• 🏥 **Ayushman Bharat PMJAY** — ₹5 lakh health cover\n• 🏠 **PM Awas Yojana** — Housing subsidy\n• 💼 **Startup India** — Tax & funding support\n• 👧 **Sukanya Samriddhi Yojana** — Savings for girl child\n• 🏭 **PMEGP** — 15–35% subsidy for enterprises\n\nVisit our Schemes section to check your eligibility and apply for schemes you qualify for.",
    suggestedActions: [
      { label: "Browse All Schemes", href: "/schemes" },
      { label: "Check Eligibility", href: "/schemes" },
    ],
    card: "schemes-guide",
  },

  income_certificate: {
    content:
      "Here's how to get an Income Certificate 📄\n\n**Documents Required:**\n• Aadhaar Card\n• Salary slips / IT Returns (last 3 years)\n• Bank statements\n• Address proof\n• Application form\n\n**Process:**\n1. Visit your state's Revenue Department portal\n2. Fill the income certificate application\n3. Upload required documents\n4. Pay nominal fee (₹10–₹50)\n5. Certificate issued in 7–14 days\n\n**Required For:** Scholarships, ration card, caste certificate, scheme eligibility",
    suggestedActions: [
      { label: "Apply via DigiLocker", href: "https://digilocker.gov.in" },
      { label: "Find Schemes", href: "/schemes" },
    ],
    relatedServices: ["Ration Card", "Scholarship", "Caste Certificate", "PM Awas Yojana"],
  },

  caste_certificate: {
    content:
      "Here's how to get a Caste Certificate (SC/ST/OBC) 📋\n\n**Documents Required:**\n• Aadhaar Card\n• Address proof\n• Self-declaration affidavit\n• Village/Ward records\n• Parent's caste certificate (if available)\n\n**Process:**\n1. Visit state revenue department portal\n2. Apply for SC/ST/OBC certificate\n3. Submit documents\n4. Field verification by Tehsildar\n5. Certificate issued in 14–30 days\n\n**Required For:** Government jobs, education reservations, scheme eligibility",
    suggestedActions: [
      { label: "Apply via DigiLocker", href: "https://digilocker.gov.in" },
      { label: "Find Schemes", href: "/schemes" },
    ],
    relatedServices: ["Income Certificate", "Scholarship", "Ration Card"],
  },

  land_records: {
    content:
      "Here's how to access Land Records online 🏡\n\n**Bhulekh** is the online portal for land records in most Indian states.\n\n**What you can access:**\n• Khasra / Khatauni (land ownership records)\n• Jamabandi (record of rights)\n• Property maps and boundaries\n• Mutation status\n\n**Process:**\n1. Visit your state's Bhulekh portal\n2. Select district, tehsil, and village\n3. Enter Khasra or Khata number\n4. View and download records\n\n**Key Portals:**\n• Delhi: dlrc.delhigovt.nic.in\n• UP: upbhulekh.gov.in\n• Maharashtra: bhulekh.mahabhumi.gov.in",
    suggestedActions: [
      { label: "National Land Records", href: "https://dilrmp.gov.in" },
      { label: "DigiLocker Documents", href: "/documents" },
    ],
    relatedServices: ["Property Registration", "Mutation of Land", "Property Tax"],
  },

  vehicle_registration: {
    content:
      "Here's how to register your Vehicle 🚗\n\n**Documents Required:**\n• Vehicle Invoice (Form 21)\n• Insurance Certificate\n• PUC Certificate\n• Aadhaar Card\n• Form 20 (application)\n\n**Process:**\n1. Visit parivahan.gov.in\n2. Select 'Vehicle Registration'\n3. Fill details and upload documents\n4. Pay registration fee\n5. RC Book delivered in 7–14 days\n\n**Fees:** ₹300–₹600 (2-wheeler) | ₹600–₹1,500 (4-wheeler)\n\nFor **Transfer of Ownership**, both buyer and seller must visit RTO with Form 29 and 30.",
    suggestedActions: [
      { label: "Parivahan Portal", href: "https://parivahan.gov.in" },
      { label: "Check Vehicle Details", href: "https://vahan.parivahan.gov.in" },
    ],
    relatedServices: ["Driving License", "PUC Certificate", "Vehicle Insurance"],
  },

  health_id: {
    content:
      "Here's how to create your ABHA (Ayushman Bharat Health Account) 🏥\n\n**ABHA is a 14-digit health ID for digital health records — it's FREE!**\n\n**Documents Required:**\n• Aadhaar Card (Aadhaar-based method)\n• OR Driving License / PAN (other method)\n• Mobile number linked to Aadhaar\n\n**Process:**\n1. Visit abdm.gov.in or ABHA app\n2. Select 'Create ABHA'\n3. Verify with Aadhaar OTP\n4. Your ABHA number is created instantly\n\n**Benefits:**\n• Access all health records digitally\n• Accepted at empanelled hospitals\n• No need for paper prescriptions",
    suggestedActions: [
      { label: "Create ABHA ID", href: "https://abdm.gov.in" },
      { label: "Ayushman Bharat PMJAY", href: "/schemes" },
    ],
    relatedServices: ["Ayushman Bharat PMJAY", "Aadhaar Card"],
  },

  pan_card: {
    content:
      "Here's how to get or update a PAN Card 💳\n\n**Apply for New PAN:**\n\n**Documents Required:**\n• Aadhaar Card (identity + address proof)\n• Passport-size photograph\n• Signature\n\n**Process (Online via NSDL/UTI):**\n1. Visit tin.tin.nsdl.com or utiitsl.com\n2. Select Form 49A (Indian citizen)\n3. Fill details and upload documents\n4. Pay fee (₹107 for delivery in India)\n5. PAN delivered in 15–20 days\n\n**Instant e-PAN (FREE):**\nVisit incometax.gov.in → Instant PAN via Aadhaar (OTP-based, takes 10 minutes!)",
    suggestedActions: [
      { label: "Apply on NSDL", href: "https://tin.tin.nsdl.com" },
      { label: "Instant e-PAN", href: "https://www.incometax.gov.in" },
    ],
    relatedServices: ["Aadhaar Card", "Income Tax Filing", "Udyam Registration"],
  },

  voter_id: {
    content:
      "Here's how to get a Voter ID (EPIC) Card 🗳️\n\n**Apply for New Voter ID:**\n\n**Documents Required:**\n• Aadhaar Card / Passport (identity proof)\n• Address proof\n• Passport-size photograph\n• Age proof (birth certificate / school certificate)\n\n**Process (Online):**\n1. Visit voters.eci.gov.in\n2. Click 'Register as Voter' (Form 6)\n3. Fill personal details\n4. Upload documents\n5. Submit and get Application Reference Number\n6. Voter ID issued in 15–30 days\n\n**Update/Correction:** Use Form 8 on the same portal",
    suggestedActions: [
      { label: "Voter Portal (ECI)", href: "https://voters.eci.gov.in" },
      { label: "Download Voter ID", href: "https://voterportal.eci.gov.in" },
    ],
    relatedServices: ["Aadhaar Card", "Passport"],
  },

  upload_document: {
    content:
      "You can manage and upload your documents in the Documents section! 📂\n\n**Supported Document Types:**\n• Identity (Aadhaar, PAN, Voter ID, Passport)\n• Transport (Driving License, Vehicle Insurance)\n• Financial (Income Certificate, Bank Statements)\n• Property (Land Records, Property Documents)\n\n**How to upload:**\n1. Go to Documents section\n2. Click 'Upload New Document'\n3. Select document type\n4. Upload your file (PDF, JPG, PNG)\n5. Document is stored securely\n\nYour documents are stored locally and can be used to auto-fill government service applications.",
    suggestedActions: [
      { label: "My Documents", href: "/documents" },
      { label: "DigiLocker", href: "https://digilocker.gov.in" },
    ],
  },

  general_query: {
    content:
      "I'm here to help with all your civic needs! 🏛️\n\nI can assist you with:\n\n**Government Services:**\nDriving License • Passport • Aadhaar • PAN • Voter ID • Ration Card • Birth Certificate • and more\n\n**Civic Issues:**\nReport potholes, street lights, water supply, garbage problems, and track your complaints\n\n**Schemes & Benefits:**\nCheck eligibility for PM Kisan, Ayushman Bharat, PM Awas Yojana, scholarships, and more\n\n**Documents:**\nUpload, manage, and get guidance on required documents\n\nPlease tell me what you need help with, and I'll guide you step by step!",
    suggestedActions: [
      { label: "Government Services", href: "/services" },
      { label: "Report an Issue", href: "/complaints" },
      { label: "Find Schemes", href: "/schemes" },
    ],
  },
};

export function getRuleEngineResponse(intent: IntentType): RuleEngineResponse {
  return (
    RESPONSES[intent] ??
    (RESPONSES.general_query as RuleEngineResponse)
  );
}

export function getFallbackResponse(): RuleEngineResponse {
  return {
    content:
      "I'm experiencing a temporary issue connecting to the AI service. However, I can still help you with structured information!\n\nPlease select what you need help with:",
    suggestedActions: [
      { label: "Government Services", href: "/services" },
      { label: "Report an Issue", href: "/complaints" },
      { label: "Find Schemes", href: "/schemes" },
      { label: "My Documents", href: "/documents" },
    ],
  };
}
