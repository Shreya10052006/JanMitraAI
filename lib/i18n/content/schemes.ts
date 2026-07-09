/**
 * lib/i18n/content/schemes.ts
 *
 * Deep, page-specific static content for the Schemes page — featured
 * scheme cards, category buckets, trending schemes, stats, filter tabs,
 * and the page's own UI copy. NOT AI-translated. Fully translated for
 * English, Hindi and Tamil; other language codes fall back to English
 * via getSchemesContent() until they receive their own full pass.
 */

export interface FeaturedSchemeContent {
  name: string;
  description: string;
  tag: string;
  benefit: string;
  eligibleLabel: string;
}

export interface TrendingSchemeContent {
  name: string;
  sub: string;
}

export interface SchemesPageContent {
  filterTabs: Record<string, string>;
  moreOptions: Record<string, string>;
  featuredSchemes: Record<string, FeaturedSchemeContent>;
  categoryBuckets: Record<string, string>;
  trendingSchemes: Record<string, TrendingSchemeContent>;
  stats: { label: string; sub: string }[];
  ui: {
    featuredSchemesHeading: string;
    featuredSchemesSub: string;
    noSchemesMatch: string;
    schemesByCategory: string;
    schemesCountSuffix: string;
    notSureTitle: string;
    notSureDesc: string;
    getPersonalized: string;
    findSchemesForYou: string;
    findSchemesDesc: string;
    findMySchemes: string;
    trendingSchemesHeading: string;
    trending: string;
    needHelpHeading: string;
    needHelpDesc: string;
    chatWithAI: string;
    learnMore: string;
    clearFilters: string;
    searchPlaceholder: string;
  };
}

const en: SchemesPageContent = {
  filterTabs: {
    "All Schemes": "All Schemes",
    Education: "Education",
    Health: "Health",
    "Financial Support": "Financial Support",
    Employment: "Employment",
    Housing: "Housing",
    "Women & Child": "Women & Child",
    More: "More",
  },
  moreOptions: {
    Agriculture: "Agriculture",
    "Women & Child": "Women & Child",
    "SC/ST": "SC/ST",
    "Senior Citizens": "Senior Citizens",
    Disability: "Disability",
  },
  featuredSchemes: {
    "pm-kisan": { name: "PM Kisan Samman Nidhi", description: "Financial support to small and marginal farmers.", tag: "Agriculture", benefit: "₹6,000 / year", eligibleLabel: "Eligible Citizens" },
    "pm-scholarship": { name: "PM Scholarship Scheme", description: "Scholarships for students from various backgrounds.", tag: "Education", benefit: "Up to ₹75,000", eligibleLabel: "Eligible Students" },
    pmmvy: { name: "Pradhan Mantri Matru Vandana Yojana", description: "Financial assistance for pregnant women and lactating mothers.", tag: "Women", benefit: "₹5,000", eligibleLabel: "Eligible Beneficiaries" },
    "pm-awas": { name: "PM Awas Yojana (Urban)", description: "Affordable housing for urban poor and middle class.", tag: "Housing", benefit: "Up to ₹2.67 Lakh", eligibleLabel: "Eligible Families" },
  },
  categoryBuckets: {
    education: "Education",
    health: "Health",
    financial: "Financial Support",
    employment: "Employment",
    more: "More",
  },
  trendingSchemes: {
    "1": { name: "Ayushman Bharat Yojana", sub: "Health Insurance" },
    "2": { name: "Skill India Mission", sub: "Skill Development" },
    "3": { name: "PM Ujjwala Yojana", sub: "Clean Cooking" },
    "4": { name: "Startup India Initiative", sub: "Entrepreneurship" },
  },
  stats: [
    { label: "Total Schemes", sub: "Across India" },
    { label: "Central Schemes", sub: "By Government of India" },
    { label: "State Schemes", sub: "By State Governments" },
    { label: "New Schemes", sub: "Added this month" },
  ],
  ui: {
    featuredSchemesHeading: "Featured Schemes",
    featuredSchemesSub: "Popular schemes you might be eligible for",
    noSchemesMatch: 'No schemes match "{search}"',
    schemesByCategory: "Schemes by Category",
    schemesCountSuffix: "Schemes",
    notSureTitle: "Not sure which scheme is right for you?",
    notSureDesc: "Let our AI Assistant help you find the perfect schemes based on your profile.",
    getPersonalized: "Get Personalized Recommendations",
    findSchemesForYou: "Find Schemes for You",
    findSchemesDesc: "Answer a few questions and we'll find the best schemes for you.",
    findMySchemes: "Find My Schemes",
    trendingSchemesHeading: "Trending Schemes",
    trending: "Trending",
    needHelpHeading: "Need Help?",
    needHelpDesc: "Our AI Assistant can help you find and understand the right schemes.",
    chatWithAI: "Chat with AI Assistant",
    learnMore: "Learn more about",
    clearFilters: "Clear Filters",
    searchPlaceholder: "Search schemes by name or category...",
  },
};

const hi: SchemesPageContent = {
  filterTabs: {
    "All Schemes": "सभी योजनाएं",
    Education: "शिक्षा",
    Health: "स्वास्थ्य",
    "Financial Support": "वित्तीय सहायता",
    Employment: "रोज़गार",
    Housing: "आवास",
    "Women & Child": "महिला व बाल विकास",
    More: "अधिक",
  },
  moreOptions: {
    Agriculture: "कृषि",
    "Women & Child": "महिला व बाल विकास",
    "SC/ST": "अनुसूचित जाति/जनजाति",
    "Senior Citizens": "वरिष्ठ नागरिक",
    Disability: "विकलांगता",
  },
  featuredSchemes: {
    "pm-kisan": { name: "पीएम किसान सम्मान निधि", description: "छोटे और सीमांत किसानों को वित्तीय सहायता।", tag: "कृषि", benefit: "₹6,000 / वर्ष", eligibleLabel: "पात्र नागरिक" },
    "pm-scholarship": { name: "पीएम छात्रवृत्ति योजना", description: "विभिन्न पृष्ठभूमि के छात्रों के लिए छात्रवृत्ति।", tag: "शिक्षा", benefit: "₹75,000 तक", eligibleLabel: "पात्र छात्र" },
    pmmvy: { name: "प्रधानमंत्री मातृ वंदना योजना", description: "गर्भवती महिलाओं और स्तनपान कराने वाली माताओं के लिए वित्तीय सहायता।", tag: "महिला", benefit: "₹5,000", eligibleLabel: "पात्र लाभार्थी" },
    "pm-awas": { name: "पीएम आवास योजना (शहरी)", description: "शहरी गरीब और मध्यम वर्ग के लिए किफायती आवास।", tag: "आवास", benefit: "₹2.67 लाख तक", eligibleLabel: "पात्र परिवार" },
  },
  categoryBuckets: {
    education: "शिक्षा",
    health: "स्वास्थ्य",
    financial: "वित्तीय सहायता",
    employment: "रोज़गार",
    more: "अधिक",
  },
  trendingSchemes: {
    "1": { name: "आयुष्मान भारत योजना", sub: "स्वास्थ्य बीमा" },
    "2": { name: "स्किल इंडिया मिशन", sub: "कौशल विकास" },
    "3": { name: "पीएम उज्ज्वला योजना", sub: "स्वच्छ खाना पकाना" },
    "4": { name: "स्टार्टअप इंडिया पहल", sub: "उद्यमिता" },
  },
  stats: [
    { label: "कुल योजनाएं", sub: "पूरे भारत में" },
    { label: "केंद्रीय योजनाएं", sub: "भारत सरकार द्वारा" },
    { label: "राज्य योजनाएं", sub: "राज्य सरकारों द्वारा" },
    { label: "नई योजनाएं", sub: "इस माह जोड़ी गईं" },
  ],
  ui: {
    featuredSchemesHeading: "विशेष रुप से प्रदर्शित योजनाएं",
    featuredSchemesSub: "लोकप्रिय योजनाएं जिनके लिए आप पात्र हो सकते हैं",
    noSchemesMatch: '"{search}" से कोई योजना मेल नहीं खाती',
    schemesByCategory: "श्रेणी के अनुसार योजनाएं",
    schemesCountSuffix: "योजनाएं",
    notSureTitle: "पक्का नहीं है कि कौन सी योजना आपके लिए सही है?",
    notSureDesc: "हमारा एआई सहायक आपकी प्रोफ़ाइल के आधार पर सही योजनाएं खोजने में आपकी मदद करने दें।",
    getPersonalized: "व्यक्तिगत सिफारिशें प्राप्त करें",
    findSchemesForYou: "आपके लिए योजनाएं खोजें",
    findSchemesDesc: "कुछ सवालों के जवाब दें और हम आपके लिए सर्वोत्तम योजनाएं खोजेंगे।",
    findMySchemes: "मेरी योजनाएं खोजें",
    trendingSchemesHeading: "ट्रेंडिंग योजनाएं",
    trending: "ट्रेंडिंग",
    needHelpHeading: "मदद चाहिए?",
    needHelpDesc: "हमारा एआई सहायक आपको सही योजनाएं खोजने और समझने में मदद कर सकता है।",
    chatWithAI: "एआई सहायक से चैट करें",
    learnMore: "इसके बारे में और जानें",
    clearFilters: "फ़िल्टर हटाएं",
    searchPlaceholder: "नाम या श्रेणी के अनुसार योजनाएं खोजें...",
  },
};

const ta: SchemesPageContent = {
  filterTabs: {
    "All Schemes": "அனைத்து திட்டங்கள்",
    Education: "கல்வி",
    Health: "சுகாதாரம்",
    "Financial Support": "நிதி உதவி",
    Employment: "வேலைவாய்ப்பு",
    Housing: "வீட்டுவசதி",
    "Women & Child": "பெண்கள் & குழந்தைகள்",
    More: "மேலும்",
  },
  moreOptions: {
    Agriculture: "விவசாயம்",
    "Women & Child": "பெண்கள் & குழந்தைகள்",
    "SC/ST": "SC/ST",
    "Senior Citizens": "மூத்த குடிமக்கள்",
    Disability: "மாற்றுத்திறனாளிகள்",
  },
  featuredSchemes: {
    "pm-kisan": { name: "பிஎம் கிசான் சம்மான் நிதி", description: "சிறு மற்றும் குறு விவசாயிகளுக்கு நிதி உதவி.", tag: "விவசாயம்", benefit: "₹6,000 / ஆண்டு", eligibleLabel: "தகுதியான குடிமக்கள்" },
    "pm-scholarship": { name: "பிஎம் உதவித்தொகை திட்டம்", description: "பல்வேறு பின்னணியில் உள்ள மாணவர்களுக்கான உதவித்தொகைகள்.", tag: "கல்வி", benefit: "₹75,000 வரை", eligibleLabel: "தகுதியான மாணவர்கள்" },
    pmmvy: { name: "பிரதம மந்திரி மாத்ரு வந்தனா யோஜனா", description: "கர்ப்பிணிப் பெண்கள் மற்றும் பாலூட்டும் தாய்மார்களுக்கான நிதி உதவி.", tag: "பெண்கள்", benefit: "₹5,000", eligibleLabel: "தகுதியான பயனாளிகள்" },
    "pm-awas": { name: "பிஎம் ஆவாஸ் யோஜனா (நகர்ப்புற)", description: "நகர்ப்புற ஏழைகள் மற்றும் நடுத்தர வர்க்கத்தினருக்கான மலிவு விலை வீடுகள்.", tag: "வீட்டுவசதி", benefit: "₹2.67 லட்சம் வரை", eligibleLabel: "தகுதியான குடும்பங்கள்" },
  },
  categoryBuckets: {
    education: "கல்வி",
    health: "சுகாதாரம்",
    financial: "நிதி உதவி",
    employment: "வேலைவாய்ப்பு",
    more: "மேலும்",
  },
  trendingSchemes: {
    "1": { name: "ஆயுஷ்மான் பாரத் யோஜனா", sub: "சுகாதார காப்பீடு" },
    "2": { name: "ஸ்கில் இந்தியா மிஷன்", sub: "திறன் மேம்பாடு" },
    "3": { name: "பிஎம் உஜ்வலா யோஜனா", sub: "தூய்மையான சமையல்" },
    "4": { name: "ஸ்டார்ட்அப் இந்தியா முன்முயற்சி", sub: "தொழில் முனைவு" },
  },
  stats: [
    { label: "மொத்த திட்டங்கள்", sub: "இந்தியா முழுவதும்" },
    { label: "மத்திய திட்டங்கள்", sub: "இந்திய அரசால்" },
    { label: "மாநில திட்டங்கள்", sub: "மாநில அரசுகளால்" },
    { label: "புதிய திட்டங்கள்", sub: "இந்த மாதம் சேர்க்கப்பட்டது" },
  ],
  ui: {
    featuredSchemesHeading: "சிறப்பு திட்டங்கள்",
    featuredSchemesSub: "நீங்கள் தகுதி பெறக்கூடிய பிரபலமான திட்டங்கள்",
    noSchemesMatch: '"{search}" உடன் எந்த திட்டமும் பொருந்தவில்லை',
    schemesByCategory: "வகை வாரியான திட்டங்கள்",
    schemesCountSuffix: "திட்டங்கள்",
    notSureTitle: "உங்களுக்கு எந்த திட்டம் சரியானது என்று உறுதியாக தெரியவில்லையா?",
    notSureDesc: "உங்கள் சுயவிவரத்தின் அடிப்படையில் சரியான திட்டங்களைக் கண்டறிய எங்கள் AI உதவியாளர் உதவட்டும்.",
    getPersonalized: "தனிப்பயனாக்கப்பட்ட பரிந்துரைகளைப் பெறுங்கள்",
    findSchemesForYou: "உங்களுக்கான திட்டங்களைக் கண்டறியுங்கள்",
    findSchemesDesc: "சில கேள்விகளுக்குப் பதிலளியுங்கள், உங்களுக்கான சிறந்த திட்டங்களை நாங்கள் கண்டறிவோம்.",
    findMySchemes: "எனது திட்டங்களைக் கண்டறியுங்கள்",
    trendingSchemesHeading: "பிரபலமான திட்டங்கள்",
    trending: "பிரபலமானது",
    needHelpHeading: "உதவி தேவையா?",
    needHelpDesc: "சரியான திட்டங்களைக் கண்டறியவும் புரிந்துகொள்ளவும் எங்கள் AI உதவியாளர் உதவ முடியும்.",
    chatWithAI: "AI உதவியாளருடன் அரட்டையடிக்கவும்",
    learnMore: "இதைப் பற்றி மேலும் அறிக",
    clearFilters: "வடிகட்டிகளை அழிக்கவும்",
    searchPlaceholder: "பெயர் அல்லது வகையால் திட்டங்களைத் தேடுங்கள்...",
  },
};

export const SCHEMES_CONTENT: Record<string, SchemesPageContent> = { en, hi, ta };

export function getSchemesContent(langCode: string): SchemesPageContent {
  return SCHEMES_CONTENT[langCode] ?? SCHEMES_CONTENT.en;
}
