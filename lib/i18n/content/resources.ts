/**
 * lib/i18n/content/resources.ts
 *
 * Deep, page-specific static content for the Resources page and the
 * Help page — featured resource cards, quick links, popular downloads,
 * FAQs, and each page's own UI copy. NOT AI-translated. Fully translated
 * for English, Hindi and Tamil; other language codes fall back to English
 * via getResourcesContent()/getHelpContent().
 */

export interface FeaturedResourceContent {
  title: string;
  type: string;
  description: string;
  cta: string;
}

export interface QuickLinkContent {
  label: string;
  sub: string;
}

export interface PopularDownloadContent {
  name: string;
}

export interface ResourcesPageContent {
  resourceTabs: Record<string, string>;
  featuredResources: Record<string, FeaturedResourceContent>;
  quickLinks: Record<string, QuickLinkContent>;
  popularDownloads: Record<string, PopularDownloadContent>;
  ui: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    featuredResourcesHeading: string;
    noResourcesMatch: string;
    clearFilters: string;
    quickLinksHeading: string;
    cantFindHeading: string;
    cantFindDesc: string;
    callUs: string;
    emailUs: string;
    chatWithAI: string;
    helpSupportHeading: string;
    helpSupportDesc: string;
    faqLabel: string;
    faqSub: string;
    userGuidesLabel: string;
    userGuidesSub: string;
    contactSupportLabel: string;
    contactSupportSub: string;
    popularDownloadsHeading: string;
  };
}

export interface HelpPageContent {
  title: string;
  subtitle: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  stillNeedHelp: string;
  callUs: string;
  emailUs: string;
  chatNow: string;
  instantAiHelp: string;
  browseGuides: string;
  browseGuidesSub: string;
}

const resourcesEn: ResourcesPageContent = {
  resourceTabs: {
    all: "All Resources",
    guides: "Guides & How Tos",
    faqs: "FAQs",
    videos: "Videos",
    reports: "Reports & Publications",
    tools: "Tools & Calculators",
    links: "Important Links",
  },
  featuredResources: {
    "1": { title: "Citizen's Guide to Government Services", type: "Guide", description: "A step-by-step guide to help you access various government services easily.", cta: "Read More" },
    "2": { title: "Understanding Your Rights as a Citizen", type: "Guide", description: "Know your fundamental rights and how to avail public services.", cta: "Read More" },
    "3": { title: "How to File a Complaint", type: "Video", description: "Watch this video to learn how to file and track a complaint on JanMitra AI.", cta: "Watch Now" },
    "4": { title: "Annual Report 2023-24", type: "Report", description: "Performance highlights and key initiatives from the past year.", cta: "Download" },
  },
  quickLinks: {
    "1": { label: "Government Websites", sub: "Official government portals and websites" },
    "2": { label: "Forms & Applications", sub: "Download important forms and applications" },
    "3": { label: "Public Grievance Redressal", sub: "Information about grievance redressal systems" },
    "4": { label: "Citizen Charter", sub: "Know the services and standards" },
    "5": { label: "RTI Information", sub: "Right to Information resources and guides" },
    "6": { label: "Public Notices", sub: "Important notices and announcements" },
    "7": { label: "E-Governance Initiatives", sub: "Digital initiatives and online services" },
    "8": { label: "State Portals", sub: "Access your state's citizen portal" },
  },
  popularDownloads: {
    "1": { name: "BPL Certificate Application Form" },
    "2": { name: "Income Certificate Format" },
    "3": { name: "Domicile Certificate Form" },
    "4": { name: "Caste Certificate Application" },
    "5": { name: "EWS Certificate Format" },
  },
  ui: {
    title: "Resources",
    subtitle: "Curated information, guides and tools to help you stay informed",
    searchPlaceholder: "Search resources, guides...",
    featuredResourcesHeading: "Featured Resources",
    noResourcesMatch: "No resources match your search.",
    clearFilters: "Clear filters",
    quickLinksHeading: "Quick Links",
    cantFindHeading: "Can't find what you're looking for?",
    cantFindDesc: "Our support team is here to help you.",
    callUs: "Call Us",
    emailUs: "Email Us",
    chatWithAI: "Chat with AI Assistant",
    helpSupportHeading: "Help & Support",
    helpSupportDesc: "Need help finding something? We're here for you.",
    faqLabel: "Frequently Asked Questions",
    faqSub: "Find answers to common queries",
    userGuidesLabel: "User Guides",
    userGuidesSub: "Step-by-step guides for citizens",
    contactSupportLabel: "Contact Support",
    contactSupportSub: "Get help from our support team",
    popularDownloadsHeading: "Popular Downloads",
  },
};

const resourcesHi: ResourcesPageContent = {
  resourceTabs: {
    all: "सभी संसाधन",
    guides: "गाइड और हाउ-टू",
    faqs: "सामान्य प्रश्न",
    videos: "वीडियो",
    reports: "रिपोर्ट और प्रकाशन",
    tools: "उपकरण और कैलकुलेटर",
    links: "महत्वपूर्ण लिंक",
  },
  featuredResources: {
    "1": { title: "सरकारी सेवाओं के लिए नागरिक गाइड", type: "गाइड", description: "विभिन्न सरकारी सेवाओं तक आसानी से पहुंचने में आपकी मदद करने के लिए एक चरण-दर-चरण मार्गदर्शिका।", cta: "और पढ़ें" },
    "2": { title: "नागरिक के रूप में अपने अधिकारों को समझना", type: "गाइड", description: "अपने मौलिक अधिकारों और सार्वजनिक सेवाओं का लाभ कैसे उठाएं, यह जानें।", cta: "और पढ़ें" },
    "3": { title: "शिकायत कैसे दर्ज करें", type: "वीडियो", description: "जनमित्र एआई पर शिकायत दर्ज करने और ट्रैक करने का तरीका जानने के लिए यह वीडियो देखें।", cta: "अभी देखें" },
    "4": { title: "वार्षिक रिपोर्ट 2023-24", type: "रिपोर्ट", description: "पिछले वर्ष की प्रदर्शन मुख्य बातें और प्रमुख पहल।", cta: "डाउनलोड करें" },
  },
  quickLinks: {
    "1": { label: "सरकारी वेबसाइटें", sub: "आधिकारिक सरकारी पोर्टल और वेबसाइटें" },
    "2": { label: "फॉर्म और आवेदन", sub: "महत्वपूर्ण फॉर्म और आवेदन डाउनलोड करें" },
    "3": { label: "सार्वजनिक शिकायत निवारण", sub: "शिकायत निवारण प्रणालियों के बारे में जानकारी" },
    "4": { label: "नागरिक चार्टर", sub: "सेवाओं और मानकों के बारे में जानें" },
    "5": { label: "आरटीआई जानकारी", sub: "सूचना का अधिकार संसाधन और गाइड" },
    "6": { label: "सार्वजनिक सूचनाएं", sub: "महत्वपूर्ण सूचनाएं और घोषणाएं" },
    "7": { label: "ई-गवर्नेंस पहल", sub: "डिजिटल पहल और ऑनलाइन सेवाएं" },
    "8": { label: "राज्य पोर्टल", sub: "अपने राज्य के नागरिक पोर्टल तक पहुंचें" },
  },
  popularDownloads: {
    "1": { name: "बीपीएल प्रमाणपत्र आवेदन पत्र" },
    "2": { name: "आय प्रमाणपत्र प्रारूप" },
    "3": { name: "अधिवास प्रमाणपत्र फॉर्म" },
    "4": { name: "जाति प्रमाणपत्र आवेदन" },
    "5": { name: "ईडब्ल्यूएस प्रमाणपत्र प्रारूप" },
  },
  ui: {
    title: "संसाधन",
    subtitle: "आपको सूचित रहने में मदद करने के लिए क्यूरेट की गई जानकारी, गाइड और उपकरण",
    searchPlaceholder: "संसाधन, गाइड खोजें...",
    featuredResourcesHeading: "विशेष रुप से प्रदर्शित संसाधन",
    noResourcesMatch: "आपकी खोज से कोई संसाधन मेल नहीं खाता।",
    clearFilters: "फ़िल्टर हटाएं",
    quickLinksHeading: "त्वरित लिंक",
    cantFindHeading: "जो आप ढूंढ रहे हैं वह नहीं मिल रहा?",
    cantFindDesc: "हमारी सहायता टीम आपकी मदद के लिए यहां है।",
    callUs: "हमें कॉल करें",
    emailUs: "हमें ईमेल करें",
    chatWithAI: "एआई सहायक से चैट करें",
    helpSupportHeading: "सहायता और समर्थन",
    helpSupportDesc: "कुछ ढूंढने में मदद चाहिए? हम आपके लिए यहां हैं।",
    faqLabel: "अक्सर पूछे जाने वाले प्रश्न",
    faqSub: "सामान्य प्रश्नों के उत्तर खोजें",
    userGuidesLabel: "उपयोगकर्ता गाइड",
    userGuidesSub: "नागरिकों के लिए चरण-दर-चरण गाइड",
    contactSupportLabel: "सहायता से संपर्क करें",
    contactSupportSub: "हमारी सहायता टीम से मदद प्राप्त करें",
    popularDownloadsHeading: "लोकप्रिय डाउनलोड",
  },
};

const resourcesTa: ResourcesPageContent = {
  resourceTabs: {
    all: "அனைத்து வளங்கள்",
    guides: "வழிகாட்டிகள் & எப்படி செய்வது",
    faqs: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    videos: "வீடியோக்கள்",
    reports: "அறிக்கைகள் & வெளியீடுகள்",
    tools: "கருவிகள் & கால்குலேட்டர்கள்",
    links: "முக்கியமான இணைப்புகள்",
  },
  featuredResources: {
    "1": { title: "அரசு சேவைகளுக்கான குடிமக்கள் வழிகாட்டி", type: "வழிகாட்டி", description: "பல்வேறு அரசு சேவைகளை எளிதாக அணுக உதவும் படிப்படியான வழிகாட்டி.", cta: "மேலும் படிக்க" },
    "2": { title: "குடிமகனாக உங்கள் உரிமைகளைப் புரிந்துகொள்ளுதல்", type: "வழிகாட்டி", description: "உங்கள் அடிப்படை உரிமைகள் மற்றும் பொது சேவைகளைப் பெறுவது எப்படி என்பதை அறியுங்கள்.", cta: "மேலும் படிக்க" },
    "3": { title: "புகார் அளிப்பது எப்படி", type: "வீடியோ", description: "ஜன்மித்ரா AI-இல் புகார் அளித்து கண்காணிப்பது எப்படி என்பதை அறிய இந்த வீடியோவைப் பாருங்கள்.", cta: "இப்போது பார்க்க" },
    "4": { title: "வருடாந்திர அறிக்கை 2023-24", type: "அறிக்கை", description: "கடந்த ஆண்டின் செயல்திறன் சிறப்பம்சங்கள் மற்றும் முக்கிய முயற்சிகள்.", cta: "பதிவிறக்கு" },
  },
  quickLinks: {
    "1": { label: "அரசு இணையதளங்கள்", sub: "அதிகாரப்பூர்வ அரசு போர்ட்டல்கள் மற்றும் இணையதளங்கள்" },
    "2": { label: "படிவங்கள் & விண்ணப்பங்கள்", sub: "முக்கியமான படிவங்கள் மற்றும் விண்ணப்பங்களைப் பதிவிறக்கவும்" },
    "3": { label: "பொது குறை தீர்வு", sub: "குறை தீர்வு அமைப்புகள் பற்றிய தகவல்" },
    "4": { label: "குடிமக்கள் சாசனம்", sub: "சேவைகள் மற்றும் தரங்களை அறியுங்கள்" },
    "5": { label: "RTI தகவல்", sub: "தகவல் அறியும் உரிமை வளங்கள் மற்றும் வழிகாட்டிகள்" },
    "6": { label: "பொது அறிவிப்புகள்", sub: "முக்கியமான அறிவிப்புகள் மற்றும் அறிவிப்புகள்" },
    "7": { label: "இ-கவர்னன்ஸ் முயற்சிகள்", sub: "டிஜிட்டல் முயற்சிகள் மற்றும் ஆன்லைன் சேவைகள்" },
    "8": { label: "மாநில போர்ட்டல்கள்", sub: "உங்கள் மாநில குடிமக்கள் போர்ட்டலை அணுகவும்" },
  },
  popularDownloads: {
    "1": { name: "பிபிஎல் சான்றிதழ் விண்ணப்பப் படிவம்" },
    "2": { name: "வருமான சான்றிதழ் வடிவம்" },
    "3": { name: "வதிவிட சான்றிதழ் படிவம்" },
    "4": { name: "சாதி சான்றிதழ் விண்ணப்பம்" },
    "5": { name: "EWS சான்றிதழ் வடிவம்" },
  },
  ui: {
    title: "வளங்கள்",
    subtitle: "நீங்கள் தகவலறிந்திருக்க உதவும் தேர்ந்தெடுக்கப்பட்ட தகவல்கள், வழிகாட்டிகள் மற்றும் கருவிகள்",
    searchPlaceholder: "வளங்கள், வழிகாட்டிகளைத் தேடுங்கள்...",
    featuredResourcesHeading: "சிறப்பு வளங்கள்",
    noResourcesMatch: "உங்கள் தேடலுடன் எந்த வளமும் பொருந்தவில்லை.",
    clearFilters: "வடிகட்டிகளை அழிக்கவும்",
    quickLinksHeading: "விரைவு இணைப்புகள்",
    cantFindHeading: "நீங்கள் தேடுவது கிடைக்கவில்லையா?",
    cantFindDesc: "எங்கள் ஆதரவு குழு உங்களுக்கு உதவ இங்கே உள்ளது.",
    callUs: "எங்களை அழைக்கவும்",
    emailUs: "எங்களுக்கு மின்னஞ்சல் அனுப்பவும்",
    chatWithAI: "AI உதவியாளருடன் அரட்டையடிக்கவும்",
    helpSupportHeading: "உதவி & ஆதரவு",
    helpSupportDesc: "எதையாவது கண்டறிய உதவி தேவையா? நாங்கள் உங்களுக்காக இங்கே உள்ளோம்.",
    faqLabel: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    faqSub: "பொதுவான கேள்விகளுக்கான பதில்களைக் கண்டறியவும்",
    userGuidesLabel: "பயனர் வழிகாட்டிகள்",
    userGuidesSub: "குடிமக்களுக்கான படிப்படியான வழிகாட்டிகள்",
    contactSupportLabel: "ஆதரவைத் தொடர்பு கொள்ளவும்",
    contactSupportSub: "எங்கள் ஆதரவு குழுவிடமிருந்து உதவி பெறுங்கள்",
    popularDownloadsHeading: "பிரபலமான பதிவிறக்கங்கள்",
  },
};

export const RESOURCES_CONTENT: Record<string, ResourcesPageContent> = { en: resourcesEn, hi: resourcesHi, ta: resourcesTa };

export function getResourcesContent(langCode: string): ResourcesPageContent {
  return RESOURCES_CONTENT[langCode] ?? RESOURCES_CONTENT.en;
}

const helpEn: HelpPageContent = {
  title: "Help & Support",
  subtitle: "Find answers or get in touch with us.",
  faqHeading: "Frequently Asked Questions",
  faqs: [
    { q: "How do I report a civic issue?", a: "Go to Complaints → Report an Issue, describe the problem, optionally attach a photo and drop a pin on the map, then submit. You'll get a ticket ID to track it." },
    { q: "How do I track a complaint I already filed?", a: "Open Complaints → Track Complaint and enter your ticket ID, or find it under My Complaints for a full list with statuses." },
    { q: "Is my data saved if I refresh the page?", a: "Yes. Your profile, bookmarks, complaints, language and accessibility preferences are all saved on this device and persist across sessions." },
    { q: "Can I use JanMitra AI in my own language?", a: "Yes — use the language selector in the top bar or Settings → Language to switch between English, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati and Punjabi." },
    { q: "Does voice input work throughout the app?", a: "When Voice Assistance is turned on in the Accessibility panel, you can use the microphone icon on search bars and the AI Assistant to speak instead of type." },
  ],
  stillNeedHelp: "Still need help?",
  callUs: "Call Us",
  emailUs: "Email Us",
  chatNow: "Chat Now",
  instantAiHelp: "Instant AI help",
  browseGuides: "Browse Guides & Resources",
  browseGuidesSub: "Step-by-step guides, FAQs and downloadable forms",
};

const helpHi: HelpPageContent = {
  title: "सहायता और समर्थन",
  subtitle: "उत्तर खोजें या हमसे संपर्क करें।",
  faqHeading: "अक्सर पूछे जाने वाले प्रश्न",
  faqs: [
    { q: "मैं नागरिक समस्या की रिपोर्ट कैसे करूं?", a: "शिकायतें → समस्या दर्ज करें पर जाएं, समस्या का वर्णन करें, वैकल्पिक रूप से एक फोटो संलग्न करें और मानचित्र पर एक पिन लगाएं, फिर सबमिट करें। आपको ट्रैक करने के लिए एक टिकट आईडी मिलेगी।" },
    { q: "मैंने पहले से दर्ज की गई शिकायत को कैसे ट्रैक करूं?", a: "शिकायतें → शिकायत ट्रैक करें खोलें और अपनी टिकट आईडी दर्ज करें, या स्थितियों की पूरी सूची के लिए इसे मेरी शिकायतें के तहत खोजें।" },
    { q: "क्या पेज रीफ्रेश करने पर मेरा डेटा सहेजा जाता है?", a: "हां। आपकी प्रोफ़ाइल, बुकमार्क, शिकायतें, भाषा और सुगम्यता प्राथमिकताएं सभी इस डिवाइस पर सहेजी जाती हैं और सत्रों में बनी रहती हैं।" },
    { q: "क्या मैं जनमित्र एआई को अपनी भाषा में उपयोग कर सकता हूं?", a: "हां — अंग्रेज़ी, हिंदी, तमिल, तेलुगु, कन्नड़, मलयालम, मराठी, बंगाली, गुजराती और पंजाबी के बीच स्विच करने के लिए टॉप बार में भाषा चयनकर्ता या सेटिंग्स → भाषा का उपयोग करें।" },
    { q: "क्या पूरे ऐप में वॉइस इनपुट काम करता है?", a: "जब सुगम्यता पैनल में वॉइस असिस्टेंस चालू होता है, तो आप टाइप करने के बजाय बोलने के लिए सर्च बार और एआई असिस्टेंट पर माइक्रोफ़ोन आइकन का उपयोग कर सकते हैं।" },
  ],
  stillNeedHelp: "अभी भी मदद चाहिए?",
  callUs: "हमें कॉल करें",
  emailUs: "हमें ईमेल करें",
  chatNow: "अभी चैट करें",
  instantAiHelp: "तत्काल एआई मदद",
  browseGuides: "गाइड और संसाधन ब्राउज़ करें",
  browseGuidesSub: "चरण-दर-चरण गाइड, सामान्य प्रश्न और डाउनलोड करने योग्य फॉर्म",
};

const helpTa: HelpPageContent = {
  title: "உதவி & ஆதரவு",
  subtitle: "பதில்களைக் கண்டறியவும் அல்லது எங்களைத் தொடர்பு கொள்ளவும்.",
  faqHeading: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
  faqs: [
    { q: "ஒரு குடிமக்கள் சிக்கலை நான் எவ்வாறு புகாரளிப்பது?", a: "புகார்கள் → சிக்கலைப் புகாரளி என்பதற்குச் சென்று, சிக்கலை விவரித்து, விருப்பமாக ஒரு புகைப்படத்தை இணைத்து வரைபடத்தில் ஒரு பின்னை போட்டு, பின் சமர்ப்பிக்கவும். கண்காணிக்க ஒரு டிக்கெட் ஐடி கிடைக்கும்." },
    { q: "நான் ஏற்கனவே தாக்கல் செய்த புகாரை எவ்வாறு கண்காணிப்பது?", a: "புகார்கள் → புகாரைக் கண்காணி என்பதைத் திறந்து உங்கள் டிக்கெட் ஐடியை உள்ளிடவும், அல்லது நிலைகளுடன் கூடிய முழுப் பட்டியலுக்கு என் புகார்களின் கீழ் கண்டறியவும்." },
    { q: "பக்கத்தை புதுப்பித்தால் எனது தரவு சேமிக்கப்படுமா?", a: "ஆம். உங்கள் சுயவிவரம், புத்தகக்குறிகள், புகார்கள், மொழி மற்றும் அணுகல்தன்மை விருப்பத்தேர்வுகள் அனைத்தும் இந்தச் சாதனத்தில் சேமிக்கப்பட்டு அமர்வுகள் முழுவதும் தக்கவைக்கப்படும்." },
    { q: "ஜன்மித்ரா AI-ஐ எனது சொந்த மொழியில் பயன்படுத்த முடியுமா?", a: "ஆம் — ஆங்கிலம், இந்தி, தமிழ், தெலுங்கு, கன்னடம், மலையாளம், மராத்தி, வங்காளம், குஜராத்தி மற்றும் பஞ்சாபி ஆகியவற்றுக்கு இடையே மாற மேல்பட்டியில் உள்ள மொழி தேர்வாளர் அல்லது அமைப்புகள் → மொழியைப் பயன்படுத்தவும்." },
    { q: "ஆப் முழுவதும் குரல் உள்ளீடு வேலை செய்யுமா?", a: "அணுகல்தன்மை பலகத்தில் குரல் உதவி இயக்கப்பட்டிருக்கும்போது, தட்டச்சு செய்வதற்குப் பதிலாக பேச தேடல் பட்டைகள் மற்றும் AI உதவியாளரில் உள்ள மைக்ரோஃபோன் ஐகானைப் பயன்படுத்தலாம்." },
  ],
  stillNeedHelp: "இன்னும் உதவி தேவையா?",
  callUs: "எங்களை அழைக்கவும்",
  emailUs: "எங்களுக்கு மின்னஞ்சல் அனுப்பவும்",
  chatNow: "இப்போது அரட்டையடிக்க",
  instantAiHelp: "உடனடி AI உதவி",
  browseGuides: "வழிகாட்டிகள் & வளங்களை உலாவு",
  browseGuidesSub: "படிப்படியான வழிகாட்டிகள், அடிக்கடி கேட்கப்படும் கேள்விகள் மற்றும் பதிவிறக்கக்கூடிய படிவங்கள்",
};

export const HELP_CONTENT: Record<string, HelpPageContent> = { en: helpEn, hi: helpHi, ta: helpTa };

export function getHelpContent(langCode: string): HelpPageContent {
  return HELP_CONTENT[langCode] ?? HELP_CONTENT.en;
}
