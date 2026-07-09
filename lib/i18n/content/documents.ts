/**
 * lib/i18n/content/documents.ts
 *
 * Deep, page-specific static content for the Documents page — the
 * recommended-service list, recommended document names/descriptions,
 * status labels, quick links, and the page's own UI copy. NOT
 * AI-translated. Fully translated for English, Hindi and Tamil; other
 * language codes fall back to English via getDocumentsContent().
 */

export interface DocumentsPageContent {
  servicesList: Record<string, string>;
  recommendedDocs: Record<string, { name: string; description: string }>;
  quickLinks: Record<string, { label: string; sub: string }>;
  recentDocStatus: { Verified: string; "In Review": string; Pending: string };
  statusLabels: { completed: string; in_progress: string; missing: string };
  ui: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    uploadedSuffix: string;
    aiAdvisorTitle: string;
    aiAdvisorSub: string;
    checkEligibilityTitle: string;
    checkEligibilitySub: string;
    missingDocsTitle: string;
    missingDocsSub: string;
    aiRecommendedHeading: string;
    aiRecommendedSub: string;
    serviceSelected: string;
    changeService: string;
    documentName: string;
    required: string;
    optional: string;
    action: string;
    status: string;
    upload: string;
    view: string;
    viewDetails: string;
    download: string;
    delete: string;
    loadingChecklist: string;
    viewFullDocumentList: string;
    recentlyUploaded: string;
    noDocumentsMatch: string;
    documentChecklist: string;
    refresh: string;
    totalRequired: string;
    completedLabel: string;
    missingLabel: string;
    completeNote: string;
    uploadAiVerify: string;
    dragDrop: string;
    clickToBrowse: string;
    supportsFormats: string;
    secureEncrypted: string;
    quickLinksHeading: string;
    completedPct: string;
  };
}

const en: DocumentsPageContent = {
  servicesList: {
    "driving-license": "Driving License Renewal",
    passport: "Passport Application",
    "birth-certificate": "Birth Certificate",
    "ration-card": "Ration Card",
    "udyam-registration": "Udyam Registration (MSME)",
  },
  recommendedDocs: {
    "1": { name: "Aadhaar Card", description: "Proof of identity and address" },
    "2": { name: "Bank Passbook", description: "Bank account details" },
    "3": { name: "Land Ownership Proof", description: "Land records or ownership document" },
    "4": { name: "Passport Size Photo", description: "Recent passport size photograph" },
    "5": { name: "Income Certificate", description: "Income proof certificate" },
  },
  quickLinks: {
    "1": { label: "DigiLocker", sub: "Access your documents from DigiLocker" },
    "2": { label: "UMANG", sub: "Access government services on UMANG app" },
    "3": { label: "Common Service Centers", sub: "Find nearest CSC centers" },
    "4": { label: "National Scholarship Portal", sub: "Apply for scholarships online" },
  },
  recentDocStatus: { Verified: "Verified", "In Review": "In Review", Pending: "Pending" },
  statusLabels: { completed: "Completed", in_progress: "In Progress", missing: "Missing" },
  ui: {
    title: "Documents",
    subtitle: "Get personalized document guidance and manage your documents easily.",
    searchPlaceholder: "Search documents, certificates...",
    uploadedSuffix: "uploaded successfully!",
    aiAdvisorTitle: "AI Document Advisor",
    aiAdvisorSub: "Get personalized document list based on your needs.",
    checkEligibilityTitle: "Check Eligibility",
    checkEligibilitySub: "Check documents required for your eligibility.",
    missingDocsTitle: "Missing Documents",
    missingDocsSub: "Identify missing documents and how to obtain them.",
    aiRecommendedHeading: "AI Recommended for You",
    aiRecommendedSub: "Personalized document list based on your selected service",
    serviceSelected: "Service Selected",
    changeService: "Change Service",
    documentName: "Document Name",
    required: "Required",
    optional: "Optional",
    action: "Action",
    status: "Status",
    upload: "Upload",
    view: "View",
    viewDetails: "View Details",
    download: "Download",
    delete: "Delete",
    loadingChecklist: "Loading document checklist…",
    viewFullDocumentList: "View Full Document List",
    recentlyUploaded: "Recently Uploaded Documents",
    noDocumentsMatch: 'No documents match "{search}"',
    documentChecklist: "Document Checklist",
    refresh: "Refresh",
    totalRequired: "Total Required",
    completedLabel: "Completed",
    missingLabel: "Missing",
    completeNote: "Upload your pending documents to complete your application.",
    uploadAiVerify: "Upload & AI Verify",
    dragDrop: "Drag & drop files here or",
    clickToBrowse: "click to browse",
    supportsFormats: "Supports PDF, JPG, PNG (Max 10MB)",
    secureEncrypted: "Your documents are secure and encrypted",
    quickLinksHeading: "Quick Links",
    completedPct: "Completed",
  },
};

const hi: DocumentsPageContent = {
  servicesList: {
    "driving-license": "ड्राइविंग लाइसेंस नवीनीकरण",
    passport: "पासपोर्ट आवेदन",
    "birth-certificate": "जन्म प्रमाणपत्र",
    "ration-card": "राशन कार्ड",
    "udyam-registration": "उद्यम पंजीकरण (एमएसएमई)",
  },
  recommendedDocs: {
    "1": { name: "आधार कार्ड", description: "पहचान और पते का प्रमाण" },
    "2": { name: "बैंक पासबुक", description: "बैंक खाते का विवरण" },
    "3": { name: "भूमि स्वामित्व प्रमाण", description: "भूमि रिकॉर्ड या स्वामित्व दस्तावेज़" },
    "4": { name: "पासपोर्ट आकार का फोटो", description: "हाल की पासपोर्ट आकार की तस्वीर" },
    "5": { name: "आय प्रमाणपत्र", description: "आय प्रमाण पत्र" },
  },
  quickLinks: {
    "1": { label: "डिजिलॉकर", sub: "डिजिलॉकर से अपने दस्तावेज़ों तक पहुंचें" },
    "2": { label: "उमंग", sub: "उमंग ऐप पर सरकारी सेवाओं तक पहुंचें" },
    "3": { label: "कॉमन सर्विस सेंटर", sub: "नज़दीकी सीएससी केंद्र खोजें" },
    "4": { label: "राष्ट्रीय छात्रवृत्ति पोर्टल", sub: "ऑनलाइन छात्रवृत्ति के लिए आवेदन करें" },
  },
  recentDocStatus: { Verified: "सत्यापित", "In Review": "समीक्षाधीन", Pending: "लंबित" },
  statusLabels: { completed: "पूर्ण", in_progress: "प्रगति में", missing: "अनुपलब्ध" },
  ui: {
    title: "दस्तावेज़",
    subtitle: "व्यक्तिगत दस्तावेज़ मार्गदर्शन प्राप्त करें और आसानी से अपने दस्तावेज़ प्रबंधित करें।",
    searchPlaceholder: "दस्तावेज़, प्रमाणपत्र खोजें...",
    uploadedSuffix: "सफलतापूर्वक अपलोड हो गया!",
    aiAdvisorTitle: "एआई दस्तावेज़ सलाहकार",
    aiAdvisorSub: "अपनी आवश्यकताओं के आधार पर व्यक्तिगत दस्तावेज़ सूची प्राप्त करें।",
    checkEligibilityTitle: "पात्रता जांचें",
    checkEligibilitySub: "अपनी पात्रता के लिए आवश्यक दस्तावेज़ जांचें।",
    missingDocsTitle: "अनुपलब्ध दस्तावेज़",
    missingDocsSub: "अनुपलब्ध दस्तावेज़ों की पहचान करें और उन्हें प्राप्त करने का तरीका जानें।",
    aiRecommendedHeading: "आपके लिए एआई अनुशंसित",
    aiRecommendedSub: "आपकी चयनित सेवा के आधार पर व्यक्तिगत दस्तावेज़ सूची",
    serviceSelected: "सेवा चयनित",
    changeService: "सेवा बदलें",
    documentName: "दस्तावेज़ का नाम",
    required: "आवश्यक",
    optional: "वैकल्पिक",
    action: "कार्रवाई",
    status: "स्थिति",
    upload: "अपलोड करें",
    view: "देखें",
    viewDetails: "विवरण देखें",
    download: "डाउनलोड करें",
    delete: "हटाएं",
    loadingChecklist: "दस्तावेज़ चेकलिस्ट लोड हो रही है…",
    viewFullDocumentList: "पूरी दस्तावेज़ सूची देखें",
    recentlyUploaded: "हाल ही में अपलोड किए गए दस्तावेज़",
    noDocumentsMatch: '"{search}" से कोई दस्तावेज़ मेल नहीं खाता',
    documentChecklist: "दस्तावेज़ चेकलिस्ट",
    refresh: "रिफ्रेश करें",
    totalRequired: "कुल आवश्यक",
    completedLabel: "पूर्ण",
    missingLabel: "अनुपलब्ध",
    completeNote: "अपना आवेदन पूरा करने के लिए अपने लंबित दस्तावेज़ अपलोड करें।",
    uploadAiVerify: "अपलोड करें और एआई सत्यापन",
    dragDrop: "फ़ाइलों को यहां खींचें और छोड़ें या",
    clickToBrowse: "ब्राउज़ करने के लिए क्लिक करें",
    supportsFormats: "PDF, JPG, PNG समर्थित (अधिकतम 10MB)",
    secureEncrypted: "आपके दस्तावेज़ सुरक्षित और एन्क्रिप्टेड हैं",
    quickLinksHeading: "त्वरित लिंक",
    completedPct: "पूर्ण",
  },
};

const ta: DocumentsPageContent = {
  servicesList: {
    "driving-license": "ஓட்டுநர் உரிமம் புதுப்பித்தல்",
    passport: "பாஸ்போர்ட் விண்ணப்பம்",
    "birth-certificate": "பிறப்பு சான்றிதழ்",
    "ration-card": "ரேஷன் அட்டை",
    "udyam-registration": "உத்யம் பதிவு (MSME)",
  },
  recommendedDocs: {
    "1": { name: "ஆதார் அட்டை", description: "அடையாளம் மற்றும் முகவரி சான்று" },
    "2": { name: "வங்கி பாஸ்புக்", description: "வங்கி கணக்கு விவரங்கள்" },
    "3": { name: "நில உரிமை சான்று", description: "நில பதிவுகள் அல்லது உரிமை ஆவணம்" },
    "4": { name: "பாஸ்போர்ட் அளவு புகைப்படம்", description: "சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படம்" },
    "5": { name: "வருமான சான்றிதழ்", description: "வருமான சான்று சான்றிதழ்" },
  },
  quickLinks: {
    "1": { label: "டிஜிலாக்கர்", sub: "டிஜிலாக்கரிலிருந்து உங்கள் ஆவணங்களை அணுகவும்" },
    "2": { label: "உமங்", sub: "உமங் ஆப்பில் அரசு சேவைகளை அணுகவும்" },
    "3": { label: "பொது சேவை மையங்கள்", sub: "அருகிலுள்ள CSC மையங்களைக் கண்டறியவும்" },
    "4": { label: "தேசிய உதவித்தொகை போர்ட்டல்", sub: "ஆன்லைனில் உதவித்தொகைக்கு விண்ணப்பிக்கவும்" },
  },
  recentDocStatus: { Verified: "சரிபார்க்கப்பட்டது", "In Review": "மறுஆய்வில்", Pending: "நிலுவையில்" },
  statusLabels: { completed: "முடிந்தது", in_progress: "செயல்பாட்டில்", missing: "இல்லை" },
  ui: {
    title: "ஆவணங்கள்",
    subtitle: "தனிப்பயன் ஆவண வழிகாட்டுதலைப் பெற்று உங்கள் ஆவணங்களை எளிதாக நிர்வகிக்கவும்.",
    searchPlaceholder: "ஆவணங்கள், சான்றிதழ்களைத் தேடுங்கள்...",
    uploadedSuffix: "வெற்றிகரமாக பதிவேற்றப்பட்டது!",
    aiAdvisorTitle: "AI ஆவண ஆலோசகர்",
    aiAdvisorSub: "உங்கள் தேவைகளின் அடிப்படையில் தனிப்பயன் ஆவணப் பட்டியலைப் பெறுங்கள்.",
    checkEligibilityTitle: "தகுதியைச் சரிபார்க்கவும்",
    checkEligibilitySub: "உங்கள் தகுதிக்குத் தேவையான ஆவணங்களைச் சரிபார்க்கவும்.",
    missingDocsTitle: "விடுபட்ட ஆவணங்கள்",
    missingDocsSub: "விடுபட்ட ஆவணங்களையும் அவற்றைப் பெறும் வழியையும் கண்டறியவும்.",
    aiRecommendedHeading: "உங்களுக்காக AI பரிந்துரைத்தது",
    aiRecommendedSub: "நீங்கள் தேர்ந்தெடுத்த சேவையின் அடிப்படையில் தனிப்பயன் ஆவணப் பட்டியல்",
    serviceSelected: "சேவை தேர்ந்தெடுக்கப்பட்டது",
    changeService: "சேவையை மாற்று",
    documentName: "ஆவணத்தின் பெயர்",
    required: "தேவை",
    optional: "விருப்பத்தேர்வு",
    action: "செயல்",
    status: "நிலை",
    upload: "பதிவேற்று",
    view: "காண்க",
    viewDetails: "விவரங்களைக் காண்க",
    download: "பதிவிறக்கு",
    delete: "நீக்கு",
    loadingChecklist: "ஆவண சரிபார்ப்பு பட்டியல் ஏற்றப்படுகிறது…",
    viewFullDocumentList: "முழு ஆவணப் பட்டியலைக் காண்க",
    recentlyUploaded: "சமீபத்தில் பதிவேற்றப்பட்ட ஆவணங்கள்",
    noDocumentsMatch: '"{search}" உடன் எந்த ஆவணமும் பொருந்தவில்லை',
    documentChecklist: "ஆவண சரிபார்ப்பு பட்டியல்",
    refresh: "புதுப்பிக்கவும்",
    totalRequired: "மொத்தம் தேவை",
    completedLabel: "முடிந்தது",
    missingLabel: "இல்லை",
    completeNote: "உங்கள் விண்ணப்பத்தை முடிக்க நிலுவையில் உள்ள ஆவணங்களைப் பதிவேற்றவும்.",
    uploadAiVerify: "பதிவேற்று & AI சரிபார்ப்பு",
    dragDrop: "கோப்புகளை இங்கே இழுத்து விடவும் அல்லது",
    clickToBrowse: "உலாவ கிளிக் செய்யவும்",
    supportsFormats: "PDF, JPG, PNG ஆதரிக்கப்படுகிறது (அதிகபட்சம் 10MB)",
    secureEncrypted: "உங்கள் ஆவணங்கள் பாதுகாப்பானவை மற்றும் குறியாக்கம் செய்யப்பட்டவை",
    quickLinksHeading: "விரைவு இணைப்புகள்",
    completedPct: "முடிந்தது",
  },
};

export const DOCUMENTS_CONTENT: Record<string, DocumentsPageContent> = { en, hi, ta };

export function getDocumentsContent(langCode: string): DocumentsPageContent {
  return DOCUMENTS_CONTENT[langCode] ?? DOCUMENTS_CONTENT.en;
}
