/**
 * lib/i18n/content/dashboard.ts
 *
 * Deep, page-specific static content for the Home dashboard — Quick
 * Actions, Continue-where-you-left-off items, AI Suggestions, prompt
 * chips and top-bar notifications. Keyed by the same ids used in
 * lib/mock-data.ts so components can pair non-text metadata (icon, href,
 * color) from mock-data with translated text from here.
 *
 * NOT AI-translated. Fully translated for English, Hindi and Tamil; other
 * language codes fall back to English via getDashboardContent().
 */

export interface DashboardContent {
  quickActions: Record<string, { label: string; description: string }>;
  recentItems: Record<string, { title: string; subtitle: string; status: string }>;
  aiSuggestions: Record<string, { title: string; description: string }>;
  promptChips: Record<string, string>;
  notifications: Record<string, { title: string; body: string; time: string }>;
}

const en: DashboardContent = {
  quickActions: {
    "ai-assistant": { label: "AI Assistant", description: "Ask anything. Get instant answers & guidance." },
    "find-services": { label: "Find Services", description: "Explore government services & how to apply." },
    "report-issue": { label: "Report an Issue", description: "Report problems in your area in just a few steps." },
    "track-complaint": { label: "Track Complaint", description: "Track real-time status of your complaints." },
    schemes: { label: "Schemes for You", description: "Discover schemes you may be eligible for." },
    language: { label: "Language", description: "Change language & preferences." },
  },
  recentItems: {
    "1": { title: "Driving License Renewal", subtitle: "Application in progress", status: "Documents Pending" },
    "2": { title: "Complaint #CMP-2026-1452", subtitle: "Street light not working", status: "Engineer Assigned" },
    "3": { title: "PM Kisan Yojana", subtitle: "Check your eligibility", status: "Eligible" },
  },
  aiSuggestions: {
    "1": { title: "You may be eligible for PM Kisan Yojana", description: "Check your eligibility and apply" },
    "2": { title: "Renew your vehicle insurance", description: "Your policy expires in 15 days" },
    "3": { title: "Apply for Birth Certificate", description: "Get your birth certificate online" },
    "4": { title: "Register for Udyam (MSME)", description: "Register your business in a few simple steps" },
  },
  promptChips: {
    "1": "Driving License",
    "2": "Pothole near me",
    "3": "Scholarship for students",
    "4": "Birth Certificate",
    "5": "Start a business",
  },
  notifications: {
    "1": { title: "Documents Pending", body: "Upload your Aadhaar card for Driving License Renewal", time: "2 hours ago" },
    "2": { title: "Complaint Updated", body: "Engineer has been assigned to your street light complaint", time: "5 hours ago" },
    "3": { title: "New Scheme Available", body: "You may be eligible for PM Awas Yojana. Check now.", time: "1 day ago" },
  },
};

const hi: DashboardContent = {
  quickActions: {
    "ai-assistant": { label: "एआई सहायक", description: "कुछ भी पूछें। तुरंत उत्तर और मार्गदर्शन प्राप्त करें।" },
    "find-services": { label: "सेवाएं खोजें", description: "सरकारी सेवाओं का अन्वेषण करें और आवेदन करना सीखें।" },
    "report-issue": { label: "समस्या दर्ज करें", description: "अपने क्षेत्र की समस्याओं को कुछ ही चरणों में दर्ज करें।" },
    "track-complaint": { label: "शिकायत ट्रैक करें", description: "अपनी शिकायतों की रीयल-टाइम स्थिति ट्रैक करें।" },
    schemes: { label: "आपके लिए योजनाएं", description: "उन योजनाओं को खोजें जिनके लिए आप पात्र हो सकते हैं।" },
    language: { label: "भाषा", description: "भाषा और प्राथमिकताएं बदलें।" },
  },
  recentItems: {
    "1": { title: "ड्राइविंग लाइसेंस नवीनीकरण", subtitle: "आवेदन प्रगति पर है", status: "दस्तावेज़ लंबित" },
    "2": { title: "शिकायत #CMP-2026-1452", subtitle: "स्ट्रीट लाइट काम नहीं कर रही", status: "इंजीनियर नियुक्त" },
    "3": { title: "पीएम किसान योजना", subtitle: "अपनी पात्रता जांचें", status: "पात्र" },
  },
  aiSuggestions: {
    "1": { title: "आप पीएम किसान योजना के लिए पात्र हो सकते हैं", description: "अपनी पात्रता जांचें और आवेदन करें" },
    "2": { title: "अपना वाहन बीमा नवीनीकृत करें", description: "आपकी पॉलिसी 15 दिनों में समाप्त हो रही है" },
    "3": { title: "जन्म प्रमाणपत्र के लिए आवेदन करें", description: "अपना जन्म प्रमाणपत्र ऑनलाइन प्राप्त करें" },
    "4": { title: "उद्यम (एमएसएमई) के लिए पंजीकरण करें", description: "कुछ आसान चरणों में अपना व्यवसाय पंजीकृत करें" },
  },
  promptChips: {
    "1": "ड्राइविंग लाइसेंस",
    "2": "मेरे पास गड्ढा",
    "3": "छात्रों के लिए छात्रवृत्ति",
    "4": "जन्म प्रमाणपत्र",
    "5": "व्यवसाय शुरू करें",
  },
  notifications: {
    "1": { title: "दस्तावेज़ लंबित", body: "ड्राइविंग लाइसेंस नवीनीकरण के लिए अपना आधार कार्ड अपलोड करें", time: "2 घंटे पहले" },
    "2": { title: "शिकायत अपडेट की गई", body: "आपकी स्ट्रीट लाइट शिकायत के लिए एक इंजीनियर नियुक्त किया गया है", time: "5 घंटे पहले" },
    "3": { title: "नई योजना उपलब्ध", body: "आप पीएम आवास योजना के लिए पात्र हो सकते हैं। अभी जांचें।", time: "1 दिन पहले" },
  },
};

const ta: DashboardContent = {
  quickActions: {
    "ai-assistant": { label: "AI உதவியாளர்", description: "எதையும் கேளுங்கள். உடனடி பதில்கள் & வழிகாட்டுதலைப் பெறுங்கள்." },
    "find-services": { label: "சேவைகளைக் கண்டறியுங்கள்", description: "அரசு சேவைகள் & விண்ணப்பிப்பது எப்படி என்பதை ஆராயுங்கள்." },
    "report-issue": { label: "சிக்கலைப் புகாரளி", description: "உங்கள் பகுதியில் உள்ள சிக்கல்களை சில படிகளில் புகாரளிக்கவும்." },
    "track-complaint": { label: "புகாரைக் கண்காணி", description: "உங்கள் புகார்களின் நிகழ்நேர நிலையைக் கண்காணிக்கவும்." },
    schemes: { label: "உங்களுக்கான திட்டங்கள்", description: "நீங்கள் தகுதி பெறக்கூடிய திட்டங்களைக் கண்டறியுங்கள்." },
    language: { label: "மொழி", description: "மொழி & விருப்பத்தேர்வுகளை மாற்றவும்." },
  },
  recentItems: {
    "1": { title: "ஓட்டுநர் உரிமம் புதுப்பித்தல்", subtitle: "விண்ணப்பம் செயலாக்கத்தில் உள்ளது", status: "ஆவணங்கள் நிலுவையில்" },
    "2": { title: "புகார் #CMP-2026-1452", subtitle: "தெரு விளக்கு வேலை செய்யவில்லை", status: "பொறியாளர் நியமிக்கப்பட்டார்" },
    "3": { title: "பிஎம் கிசான் யோஜனா", subtitle: "உங்கள் தகுதியைச் சரிபார்க்கவும்", status: "தகுதியானது" },
  },
  aiSuggestions: {
    "1": { title: "நீங்கள் பிஎம் கிசான் யோஜனாவுக்கு தகுதியுடையவராக இருக்கலாம்", description: "உங்கள் தகுதியைச் சரிபார்த்து விண்ணப்பிக்கவும்" },
    "2": { title: "உங்கள் வாகன காப்பீட்டைப் புதுப்பிக்கவும்", description: "உங்கள் பாலிசி 15 நாட்களில் காலாவதியாகும்" },
    "3": { title: "பிறப்பு சான்றிதழுக்கு விண்ணப்பிக்கவும்", description: "உங்கள் பிறப்பு சான்றிதழை ஆன்லைனில் பெறுங்கள்" },
    "4": { title: "உத்யம் (MSME) பதிவு செய்யவும்", description: "சில எளிய படிகளில் உங்கள் வணிகத்தைப் பதிவு செய்யவும்" },
  },
  promptChips: {
    "1": "ஓட்டுநர் உரிமம்",
    "2": "எனக்கு அருகில் உள்ள சாலைக் குழி",
    "3": "மாணவர்களுக்கான உதவித்தொகை",
    "4": "பிறப்பு சான்றிதழ்",
    "5": "ஒரு வணிகத்தைத் தொடங்குங்கள்",
  },
  notifications: {
    "1": { title: "ஆவணங்கள் நிலுவையில்", body: "ஓட்டுநர் உரிமம் புதுப்பித்தலுக்கு உங்கள் ஆதார் அட்டையைப் பதிவேற்றவும்", time: "2 மணி நேரத்திற்கு முன்" },
    "2": { title: "புகார் புதுப்பிக்கப்பட்டது", body: "உங்கள் தெரு விளக்கு புகாருக்கு ஒரு பொறியாளர் நியமிக்கப்பட்டுள்ளார்", time: "5 மணி நேரத்திற்கு முன்" },
    "3": { title: "புதிய திட்டம் கிடைக்கிறது", body: "நீங்கள் பிஎம் ஆவாஸ் யோஜனாவுக்கு தகுதியுடையவராக இருக்கலாம். இப்போது சரிபார்க்கவும்.", time: "1 நாளுக்கு முன்" },
  },
};

export const DASHBOARD_CONTENT: Record<string, DashboardContent> = { en, hi, ta };

export function getDashboardContent(langCode: string): DashboardContent {
  return DASHBOARD_CONTENT[langCode] ?? DASHBOARD_CONTENT.en;
}
