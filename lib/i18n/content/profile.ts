/**
 * lib/i18n/content/profile.ts
 *
 * Deep, page-specific static content for the Profile page — badges,
 * fallback recent-activity items, preference labels, quick action
 * labels, account overview rows and the page's own UI copy. NOT
 * AI-translated. Fully translated for English, Hindi and Tamil; other
 * language codes fall back to English via getProfileContent().
 */

export interface ProfilePageContent {
  badges: Record<string, { name: string; desc: string }>;
  recentActivitiesFallback: Record<string, { text: string; sub: string }>;
  quickActionsStatic: Record<string, string>;
  preferences: Record<string, string>;
  activityTypeLabels: Record<string, string>;
  levelTitles: [string, string, string, string, string];
  ui: {
    verifiedUser: string;
    activeCitizenBadge: string;
    levelLabel: string;
    yourImpact: string;
    complaintsResolved: string;
    servicesUsed: string;
    schemesApplied: string;
    complaintsFiled: string;
    youreInThe: string;
    top15: string;
    activeCitizensInArea: string;
    quickActionsHeading: string;
    editProfile: string;
    savedItems: string;
    logOut: string;
    recentActivityHeading: string;
    preferencesHeading: string;
    edit: string;
    savedItemsHeading: string;
    savedSuffix: string;
    noSavedItemsHint: string;
    achievementsHeading: string;
    accountOverviewHeading: string;
    memberSince: string;
    accountType: string;
    individual: string;
    kycStatus: string;
    verified: string;
    profileCompletion: string;
    thankYouTitle: string;
    thankYouDesc: string;
    shareFeedback: string;
    enabled: string;
    disabled: string;
    lightMode: string;
    manage: string;
    view: string;
    notSet: string;
    citizen: string;
    india: string;
    fullNamePlaceholder: string;
    emailPlaceholder: string;
    locationPlaceholder: string;
  };
}

const en: ProfilePageContent = {
  badges: {
    "1": { name: "Civic Starter", desc: "Joined JanMitra AI" },
    "2": { name: "Active Citizen", desc: "Used 5 Services" },
    "3": { name: "Problem Solver", desc: "Resolved 10 Complaints" },
    "4": { name: "Community Helper", desc: "Referred 3 Friends" },
    "5": { name: "Dedicated Citizen", desc: "30 Days Active" },
  },
  recentActivitiesFallback: {
    "1": { text: "Complaint #CMP-2026-1452 resolved", sub: "Road Damage / Pothole" },
    "2": { text: "Downloaded Birth Certificate", sub: "Document downloaded" },
    "3": { text: "Applied for PM Kisan Yojana", sub: "Application submitted" },
    "4": { text: "Water leakage complaint submitted", sub: "#CMP-2026-1287" },
    "5": { text: "Referred a friend to JanMitra AI", sub: "You earned 50 XP" },
  },
  quickActionsStatic: {
    activity: "My Activity",
    notif: "Notification Settings",
    password: "Account & Security",
    help: "Help & Support",
  },
  preferences: {
    language: "Language",
    notifications: "Notification Preference",
    voice: "Voice Assistant",
    theme: "App Theme",
    privacy: "Privacy & Security",
    data: "Data & Activity",
  },
  activityTypeLabels: { complaint: "Complaint", service: "Service", scheme: "Scheme", document: "Document", chat: "Chat" },
  levelTitles: ["Civic Newcomer", "Active Citizen", "Civic Advocate", "Civic Contributor", "Super Citizen"],
  ui: {
    verifiedUser: "Verified User",
    activeCitizenBadge: "Active Citizen",
    levelLabel: "Level",
    yourImpact: "Your Impact",
    complaintsResolved: "Complaints Resolved",
    servicesUsed: "Services Used",
    schemesApplied: "Schemes Applied",
    complaintsFiled: "Complaints Filed",
    youreInThe: "You're in the",
    top15: "top 15%",
    activeCitizensInArea: "of active citizens in your area!",
    quickActionsHeading: "Quick Actions",
    editProfile: "Edit Profile",
    savedItems: "Saved Items",
    logOut: "Log Out",
    recentActivityHeading: "Recent Activity",
    preferencesHeading: "Preferences",
    edit: "Edit",
    savedItemsHeading: "Saved Items",
    savedSuffix: "saved",
    noSavedItemsHint: "Services, schemes and resources you bookmark will show up here.",
    achievementsHeading: "Achievements & Badges",
    accountOverviewHeading: "Account Overview",
    memberSince: "Member Since",
    accountType: "Account Type",
    individual: "Individual",
    kycStatus: "KYC Status",
    verified: "Verified",
    profileCompletion: "Profile Completion",
    thankYouTitle: "Thank you for being an active citizen!",
    thankYouDesc: "Your participation helps build a better and stronger community.",
    shareFeedback: "Share Your Feedback",
    enabled: "Enabled",
    disabled: "Disabled",
    lightMode: "Light Mode",
    manage: "Manage",
    view: "View",
    notSet: "Not set",
    citizen: "Citizen",
    india: "India",
    fullNamePlaceholder: "Full name",
    emailPlaceholder: "Email",
    locationPlaceholder: "Location",
  },
};

const hi: ProfilePageContent = {
  badges: {
    "1": { name: "नागरिक शुरुआतकर्ता", desc: "जनमित्र एआई से जुड़े" },
    "2": { name: "सक्रिय नागरिक", desc: "5 सेवाओं का उपयोग किया" },
    "3": { name: "समस्या समाधानकर्ता", desc: "10 शिकायतें हल कीं" },
    "4": { name: "सामुदायिक सहायक", desc: "3 दोस्तों को रेफर किया" },
    "5": { name: "समर्पित नागरिक", desc: "30 दिन सक्रिय" },
  },
  recentActivitiesFallback: {
    "1": { text: "शिकायत #CMP-2026-1452 हल हो गई", sub: "सड़क क्षति / गड्ढा" },
    "2": { text: "जन्म प्रमाणपत्र डाउनलोड किया", sub: "दस्तावेज़ डाउनलोड किया गया" },
    "3": { text: "पीएम किसान योजना के लिए आवेदन किया", sub: "आवेदन सबमिट किया गया" },
    "4": { text: "पानी रिसाव की शिकायत दर्ज की गई", sub: "#CMP-2026-1287" },
    "5": { text: "जनमित्र एआई के लिए एक दोस्त को रेफर किया", sub: "आपने 50 एक्सपी अर्जित किए" },
  },
  quickActionsStatic: {
    activity: "मेरी गतिविधि",
    notif: "सूचना सेटिंग्स",
    password: "खाता और सुरक्षा",
    help: "सहायता और समर्थन",
  },
  preferences: {
    language: "भाषा",
    notifications: "सूचना प्राथमिकता",
    voice: "वॉइस असिस्टेंट",
    theme: "ऐप थीम",
    privacy: "गोपनीयता और सुरक्षा",
    data: "डेटा और गतिविधि",
  },
  activityTypeLabels: { complaint: "शिकायत", service: "सेवा", scheme: "योजना", document: "दस्तावेज़", chat: "चैट" },
  levelTitles: ["नागरिक नवागंतुक", "सक्रिय नागरिक", "नागरिक अधिवक्ता", "नागरिक योगदानकर्ता", "सुपर नागरिक"],
  ui: {
    verifiedUser: "सत्यापित उपयोगकर्ता",
    activeCitizenBadge: "सक्रिय नागरिक",
    levelLabel: "स्तर",
    yourImpact: "आपका प्रभाव",
    complaintsResolved: "शिकायतें हल हुईं",
    servicesUsed: "सेवाओं का उपयोग किया",
    schemesApplied: "योजनाओं के लिए आवेदन किया",
    complaintsFiled: "शिकायतें दर्ज कीं",
    youreInThe: "आप",
    top15: "शीर्ष 15%",
    activeCitizensInArea: "आपके क्षेत्र के सक्रिय नागरिकों में से!",
    quickActionsHeading: "त्वरित कार्रवाई",
    editProfile: "प्रोफ़ाइल संपादित करें",
    savedItems: "सहेजी गई वस्तुएं",
    logOut: "लॉग आउट",
    recentActivityHeading: "हाल की गतिविधि",
    preferencesHeading: "प्राथमिकताएं",
    edit: "संपादित करें",
    savedItemsHeading: "सहेजी गई वस्तुएं",
    savedSuffix: "सहेजा गया",
    noSavedItemsHint: "आपके द्वारा बुकमार्क की गई सेवाएं, योजनाएं और संसाधन यहां दिखाई देंगे।",
    achievementsHeading: "उपलब्धियां और बैज",
    accountOverviewHeading: "खाता अवलोकन",
    memberSince: "सदस्य बने",
    accountType: "खाता प्रकार",
    individual: "व्यक्तिगत",
    kycStatus: "केवाईसी स्थिति",
    verified: "सत्यापित",
    profileCompletion: "प्रोफ़ाइल पूर्णता",
    thankYouTitle: "एक सक्रिय नागरिक होने के लिए धन्यवाद!",
    thankYouDesc: "आपकी भागीदारी एक बेहतर और मजबूत समुदाय बनाने में मदद करती है।",
    shareFeedback: "अपनी प्रतिक्रिया साझा करें",
    enabled: "सक्षम",
    disabled: "अक्षम",
    lightMode: "लाइट मोड",
    manage: "प्रबंधित करें",
    view: "देखें",
    notSet: "सेट नहीं है",
    citizen: "नागरिक",
    india: "भारत",
    fullNamePlaceholder: "पूरा नाम",
    emailPlaceholder: "ईमेल",
    locationPlaceholder: "स्थान",
  },
};

const ta: ProfilePageContent = {
  badges: {
    "1": { name: "குடிமக்கள் தொடக்கநிலை", desc: "ஜன்மித்ரா AI-இல் இணைந்தார்" },
    "2": { name: "சுறுசுறுப்பான குடிமகன்", desc: "5 சேவைகளைப் பயன்படுத்தினார்" },
    "3": { name: "சிக்கல் தீர்வுக்காரர்", desc: "10 புகார்களைத் தீர்த்தார்" },
    "4": { name: "சமூக உதவியாளர்", desc: "3 நண்பர்களைப் பரிந்துரைத்தார்" },
    "5": { name: "அர்ப்பணிப்புள்ள குடிமகன்", desc: "30 நாட்கள் செயலில்" },
  },
  recentActivitiesFallback: {
    "1": { text: "புகார் #CMP-2026-1452 தீர்க்கப்பட்டது", sub: "சாலை சேதம் / சாலைக் குழி" },
    "2": { text: "பிறப்பு சான்றிதழ் பதிவிறக்கம் செய்யப்பட்டது", sub: "ஆவணம் பதிவிறக்கப்பட்டது" },
    "3": { text: "பிஎம் கிசான் யோஜனாவுக்கு விண்ணப்பித்தார்", sub: "விண்ணப்பம் சமர்ப்பிக்கப்பட்டது" },
    "4": { text: "நீர் கசிவு புகார் சமர்ப்பிக்கப்பட்டது", sub: "#CMP-2026-1287" },
    "5": { text: "ஜன்மித்ரா AI-க்கு ஒரு நண்பரைப் பரிந்துரைத்தார்", sub: "நீங்கள் 50 XP பெற்றீர்கள்" },
  },
  quickActionsStatic: {
    activity: "எனது செயல்பாடு",
    notif: "அறிவிப்பு அமைப்புகள்",
    password: "கணக்கு & பாதுகாப்பு",
    help: "உதவி & ஆதரவு",
  },
  preferences: {
    language: "மொழி",
    notifications: "அறிவிப்பு விருப்பம்",
    voice: "குரல் உதவியாளர்",
    theme: "ஆப் தீம்",
    privacy: "தனியுரிமை & பாதுகாப்பு",
    data: "தரவு & செயல்பாடு",
  },
  activityTypeLabels: { complaint: "புகார்", service: "சேவை", scheme: "திட்டம்", document: "ஆவணம்", chat: "அரட்டை" },
  levelTitles: ["குடிமக்கள் புதியவர்", "சுறுசுறுப்பான குடிமகன்", "குடிமக்கள் ஆதரவாளர்", "குடிமக்கள் பங்களிப்பாளர்", "சூப்பர் குடிமகன்"],
  ui: {
    verifiedUser: "சரிபார்க்கப்பட்ட பயனர்",
    activeCitizenBadge: "சுறுசுறுப்பான குடிமகன்",
    levelLabel: "நிலை",
    yourImpact: "உங்கள் தாக்கம்",
    complaintsResolved: "தீர்க்கப்பட்ட புகார்கள்",
    servicesUsed: "பயன்படுத்திய சேவைகள்",
    schemesApplied: "விண்ணப்பித்த திட்டங்கள்",
    complaintsFiled: "தாக்கல் செய்யப்பட்ட புகார்கள்",
    youreInThe: "நீங்கள்",
    top15: "முதல் 15%",
    activeCitizensInArea: "உங்கள் பகுதியில் உள்ள சுறுசுறுப்பான குடிமக்களில்!",
    quickActionsHeading: "விரைவு செயல்கள்",
    editProfile: "சுயவிவரத்தைத் திருத்து",
    savedItems: "சேமிக்கப்பட்ட உருப்படிகள்",
    logOut: "வெளியேறு",
    recentActivityHeading: "சமீபத்திய செயல்பாடு",
    preferencesHeading: "விருப்பத்தேர்வுகள்",
    edit: "திருத்து",
    savedItemsHeading: "சேமிக்கப்பட்ட உருப்படிகள்",
    savedSuffix: "சேமிக்கப்பட்டது",
    noSavedItemsHint: "நீங்கள் புத்தகக்குறியிடும் சேவைகள், திட்டங்கள் மற்றும் வளங்கள் இங்கே தோன்றும்.",
    achievementsHeading: "சாதனைகள் & பேட்ஜ்கள்",
    accountOverviewHeading: "கணக்கு மேலோட்டம்",
    memberSince: "உறுப்பினரானார்",
    accountType: "கணக்கு வகை",
    individual: "தனிநபர்",
    kycStatus: "KYC நிலை",
    verified: "சரிபார்க்கப்பட்டது",
    profileCompletion: "சுயவிவரம் நிறைவு",
    thankYouTitle: "சுறுசுறுப்பான குடிமகனாக இருப்பதற்கு நன்றி!",
    thankYouDesc: "உங்கள் பங்களிப்பு சிறந்த மற்றும் வலுவான சமூகத்தை உருவாக்க உதவுகிறது.",
    shareFeedback: "உங்கள் கருத்தைப் பகிரவும்",
    enabled: "இயக்கப்பட்டது",
    disabled: "முடக்கப்பட்டது",
    lightMode: "லைட் மோட்",
    manage: "நிர்வகி",
    view: "காண்க",
    notSet: "அமைக்கப்படவில்லை",
    citizen: "குடிமகன்",
    india: "இந்தியா",
    fullNamePlaceholder: "முழுப் பெயர்",
    emailPlaceholder: "மின்னஞ்சல்",
    locationPlaceholder: "இடம்",
  },
};

export const PROFILE_CONTENT: Record<string, ProfilePageContent> = { en, hi, ta };

export function getProfileContent(langCode: string): ProfilePageContent {
  return PROFILE_CONTENT[langCode] ?? PROFILE_CONTENT.en;
}
