/**
 * lib/i18n/content/complaints.ts
 *
 * Deep, page-specific static content for the Complaints page and its three
 * tabs (Report an Issue / My Complaints / Track Complaint) — form labels,
 * category display names, status-guide copy, tips, and UI strings. NOT
 * AI-translated. Fully translated for English, Hindi and Tamil; other
 * language codes fall back to English via getComplaintsContent().
 *
 * Complaint category values themselves stay in English in storage (they're
 * matched/filtered against and produced by the AI analysis step) — only
 * their on-screen label is translated, via `categoryLabels`.
 */

export interface ComplaintsPageContent {
  categoryLabels: Record<string, string>;
  whenOptions: Record<string, string>;
  trustBar: { label: string; sub: string }[];
  report: {
    heading: string;
    subheading: string;
    uploadLabel: string;
    uploadClickText: string;
    uploadHint: string;
    addMore: string;
    locationLabel: string;
    locationPlaceholder: string;
    useCurrentLocation: string;
    locating: string;
    mapHint: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    dictate: string;
    listening: string;
    whenLabel: string;
    analyzing: string;
    analyzeButton: string;
    analyzeHint: string;
    aiHelperNote: string;
    aiPreviewHeading: string;
    aiPreviewSub: string;
    aiDetectedCategory: string;
    priority: string;
    confidenceScore: string;
    suggestedDepartment: string;
    routedNote: string;
    issueSummary: string;
    category: string;
    location: string;
    description: string;
    reported: string;
    aiSuggestionHeading: string;
    aiSuggestionText: string;
    editDetails: string;
    submitComplaint: string;
    fillFormTitle: string;
    fillFormHint: string;
    myComplaintsHeading: string;
    nearbyIssuesHeading: string;
    viewFullMap: string;
    collapseMap: string;
    biggerImpactHeading: string;
    biggerImpactDesc: string;
    inviteNow: string;
    voiceMatters: string;
    successTitle: string;
    successDesc: string;
    yourComplaintId: string;
    department: string;
    status: string;
    trackComplaintBtn: string;
    reportAnother: string;
  };
  myComplaints: {
    statsTotal: string;
    statsResolved: string;
    statsInProgress: string;
    statsUnderReview: string;
    statsAvgResolution: string;
    allTime: string;
    thisMonth: string;
    yourComplaintsHeading: string;
    yourComplaintsSub: string;
    allStatus: string;
    allCategories: string;
    allTimeFilter: string;
    thisWeek: string;
    lastMonth: string;
    searchPlaceholder: string;
    sortNewest: string;
    sortOldest: string;
    sortStatus: string;
    noComplaintsFound: string;
    noComplaintsHint: string;
    showing: string;
    of: string;
    donutTotal: string;
    byCategoryHeading: string;
    noComplaintsYet: string;
    recentActivityHeading: string;
    noRecentActivity: string;
    biggerImpactHeading: string;
    biggerImpactDesc: string;
    inviteNow: string;
  };
  track: {
    heading: string;
    subheading: string;
    inputPlaceholder: string;
    trackButton: string;
    notFound: string;
    resolutionProgress: string;
    category: string;
    priority: string;
    submitted: string;
    lastUpdated: string;
    location: string;
    assignedTo: string;
    department: string;
    timelineHeading: string;
    current: string;
    upcomingResolved: string;
    upcomingResolvedHint: string;
    resolvedBanner: string;
    emptyTitle: string;
    emptyHint: string;
    tryExample: string;
    statusGuideHeading: string;
    statusDescriptions: Record<string, string>;
    tipsHeading: string;
    tips: string[];
    needMoreHelpHeading: string;
    needMoreHelpDesc: string;
    chatWithAI: string;
  };
}

const en: ComplaintsPageContent = {
  categoryLabels: {
    "Street Lighting": "Street Lighting",
    "Roads & Infrastructure": "Roads & Infrastructure",
    "Water Supply": "Water Supply",
    "Sanitation & Drainage": "Sanitation & Drainage",
    "Garbage Collection": "Garbage Collection",
    "Public Transport": "Public Transport",
    Electricity: "Electricity",
    "Parks & Recreation": "Parks & Recreation",
    "Noise Pollution": "Noise Pollution",
    Other: "Other",
  },
  whenOptions: {
    Today: "Today",
    Yesterday: "Yesterday",
    "2 days ago": "2 days ago",
    "3 days ago": "3 days ago",
    "This week": "This week",
    "Last week": "Last week",
  },
  trustBar: [
    { label: "Track in Real-time", sub: "Get updates at every step" },
    { label: "Transparent Process", sub: "Know where your issue stands" },
    { label: "Faster Resolution", sub: "AI ensures quick routing" },
    { label: "Better Communities", sub: "Together, we make change" },
  ],
  report: {
    heading: "Report a New Issue",
    subheading: "Provide details about the issue. Our AI will help route it to the right department.",
    uploadLabel: "1. Upload Photo / Video",
    uploadClickText: "Click to upload or drag & drop",
    uploadHint: "JPG, PNG or MP4 (Max 20MB)",
    addMore: "Add more",
    locationLabel: "2. Location",
    locationPlaceholder: "Enter location...",
    useCurrentLocation: "Use current location",
    locating: "Locating...",
    mapHint: "Or tap the map to drop a pin at the exact spot.",
    descriptionLabel: "3. Describe the Issue",
    descriptionPlaceholder: "Describe the issue in detail...",
    dictate: "Dictate",
    listening: "Listening…",
    whenLabel: "4. When did you notice it?",
    analyzing: "Analyzing...",
    analyzeButton: "Analyze Issue with AI ✨",
    analyzeHint: "Please add a location and description (min. 10 characters) to analyze.",
    aiHelperNote: "AI will suggest the right category and department to resolve your issue faster.",
    aiPreviewHeading: "AI Analysis & Preview",
    aiPreviewSub: "Review the details before submission",
    aiDetectedCategory: "AI Detected Category",
    priority: "Priority",
    confidenceScore: "Confidence Score",
    suggestedDepartment: "Suggested Department",
    routedNote: "This issue will be routed to {department} for faster resolution.",
    issueSummary: "Issue Summary",
    category: "Category",
    location: "Location",
    description: "Description",
    reported: "Reported",
    aiSuggestionHeading: "AI Suggestion",
    aiSuggestionText: "Adding more photos from different angles helps the department understand the issue better and speeds up resolution.",
    editDetails: "✏️ Edit Details",
    submitComplaint: "Submit Complaint",
    fillFormTitle: "Fill in the form",
    fillFormHint: 'Complete the form and click "Analyze Issue with AI" to see the preview.',
    myComplaintsHeading: "My Complaints",
    nearbyIssuesHeading: "Nearby Reported Issues",
    viewFullMap: "View Full Map",
    collapseMap: "Collapse Map",
    biggerImpactHeading: "Make a Bigger Impact!",
    biggerImpactDesc: "Invite your friends and neighbors to report issues and create a better community together.",
    inviteNow: "Invite Now",
    voiceMatters: "Your voice matters. Every complaint you raise makes your city a better place to live.",
    successTitle: "Complaint Submitted!",
    successDesc: "Your complaint has been successfully registered and routed to the appropriate department.",
    yourComplaintId: "Your Complaint ID",
    department: "Department",
    status: "Status",
    trackComplaintBtn: "Track Complaint",
    reportAnother: "Report Another",
  },
  myComplaints: {
    statsTotal: "Total Complaints",
    statsResolved: "Resolved",
    statsInProgress: "In Progress",
    statsUnderReview: "Under Review",
    statsAvgResolution: "Avg. Resolution Time",
    allTime: "All time",
    thisMonth: "This month",
    yourComplaintsHeading: "Your Complaints",
    yourComplaintsSub: "Track and manage all the issues you've reported",
    allStatus: "All Status",
    allCategories: "All Categories",
    allTimeFilter: "All Time",
    thisWeek: "This Week",
    lastMonth: "Last Month",
    searchPlaceholder: "Search by ID or keyword...",
    sortNewest: "Newest First",
    sortOldest: "Oldest First",
    sortStatus: "Status",
    noComplaintsFound: "No complaints found",
    noComplaintsHint: "Try adjusting your filters or report a new issue",
    showing: "Showing",
    of: "of",
    donutTotal: "Total",
    byCategoryHeading: "Complaints by Category",
    noComplaintsYet: "No complaints yet. Report your first issue!",
    recentActivityHeading: "Recent Activity",
    noRecentActivity: "No recent activity",
    biggerImpactHeading: "Make a Bigger Impact!",
    biggerImpactDesc: "Invite your friends and neighbors to report issues and create a better community together.",
    inviteNow: "Invite Now",
  },
  track: {
    heading: "Track Your Complaint",
    subheading: "Enter your complaint ID to track real-time status and timeline",
    inputPlaceholder: "Enter Complaint ID (e.g., CMP-2026-1452)",
    trackButton: "Track",
    notFound: 'Complaint ID "{id}" not found. Please check the ID and try again.',
    resolutionProgress: "Resolution Progress",
    category: "Category",
    priority: "Priority",
    submitted: "Submitted",
    lastUpdated: "Last Updated",
    location: "Location",
    assignedTo: "Assigned To",
    department: "Department",
    timelineHeading: "Complaint Timeline",
    current: "Current",
    upcomingResolved: "Resolved",
    upcomingResolvedHint: "Issue will be marked resolved when fixed",
    resolvedBanner: "Your complaint has been successfully resolved!",
    emptyTitle: "Track Your Complaint",
    emptyHint: "Enter your Complaint ID above to see real-time status and timeline.",
    tryExample: "Try: CMP-2026-1452",
    statusGuideHeading: "Status Guide",
    statusDescriptions: {
      submitted: "Complaint received and registered in the system",
      under_review: "Being reviewed by the concerned department",
      assigned: "An officer/engineer has been assigned",
      in_progress: "Active work is being done to resolve the issue",
      resolved: "Issue has been fixed and complaint is closed",
    },
    tipsHeading: "💡 Tips for Faster Resolution",
    tips: [
      "Add multiple photos for better visibility",
      "Mention the exact location/landmark",
      "Include how long the issue has persisted",
      "Note peak hours when it's most problematic",
    ],
    needMoreHelpHeading: "Need More Help?",
    needMoreHelpDesc: "Chat with JanMitra AI for real-time guidance on your complaint.",
    chatWithAI: "Chat with AI",
  },
};

const hi: ComplaintsPageContent = {
  categoryLabels: {
    "Street Lighting": "स्ट्रीट लाइटिंग",
    "Roads & Infrastructure": "सड़कें और बुनियादी ढांचा",
    "Water Supply": "जल आपूर्ति",
    "Sanitation & Drainage": "स्वच्छता और जल निकासी",
    "Garbage Collection": "कचरा संग्रहण",
    "Public Transport": "सार्वजनिक परिवहन",
    Electricity: "बिजली",
    "Parks & Recreation": "पार्क और मनोरंजन",
    "Noise Pollution": "ध्वनि प्रदूषण",
    Other: "अन्य",
  },
  whenOptions: {
    Today: "आज",
    Yesterday: "कल",
    "2 days ago": "2 दिन पहले",
    "3 days ago": "3 दिन पहले",
    "This week": "इस सप्ताह",
    "Last week": "पिछले सप्ताह",
  },
  trustBar: [
    { label: "रीयल-टाइम ट्रैकिंग", sub: "हर चरण पर अपडेट प्राप्त करें" },
    { label: "पारदर्शी प्रक्रिया", sub: "जानें आपकी समस्या कहां है" },
    { label: "तेज़ समाधान", sub: "एआई त्वरित रूटिंग सुनिश्चित करता है" },
    { label: "बेहतर समुदाय", sub: "साथ मिलकर, हम बदलाव लाते हैं" },
  ],
  report: {
    heading: "नई समस्या दर्ज करें",
    subheading: "समस्या के बारे में विवरण प्रदान करें। हमारा एआई इसे सही विभाग तक पहुंचाने में मदद करेगा।",
    uploadLabel: "1. फोटो / वीडियो अपलोड करें",
    uploadClickText: "अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें",
    uploadHint: "JPG, PNG या MP4 (अधिकतम 20MB)",
    addMore: "और जोड़ें",
    locationLabel: "2. स्थान",
    locationPlaceholder: "स्थान दर्ज करें...",
    useCurrentLocation: "वर्तमान स्थान का उपयोग करें",
    locating: "स्थान खोजा जा रहा है...",
    mapHint: "या सटीक स्थान पर पिन लगाने के लिए मानचित्र पर टैप करें।",
    descriptionLabel: "3. समस्या का वर्णन करें",
    descriptionPlaceholder: "समस्या का विस्तार से वर्णन करें...",
    dictate: "बोलकर लिखें",
    listening: "सुन रहा है…",
    whenLabel: "4. आपने इसे कब देखा?",
    analyzing: "विश्लेषण हो रहा है...",
    analyzeButton: "एआई से समस्या का विश्लेषण करें ✨",
    analyzeHint: "विश्लेषण करने के लिए कृपया स्थान और विवरण जोड़ें (न्यूनतम 10 अक्षर)।",
    aiHelperNote: "आपकी समस्या को तेज़ी से हल करने के लिए एआई सही श्रेणी और विभाग सुझाएगा।",
    aiPreviewHeading: "एआई विश्लेषण और पूर्वावलोकन",
    aiPreviewSub: "सबमिट करने से पहले विवरणों की समीक्षा करें",
    aiDetectedCategory: "एआई द्वारा पहचानी गई श्रेणी",
    priority: "प्राथमिकता",
    confidenceScore: "विश्वास स्कोर",
    suggestedDepartment: "सुझाया गया विभाग",
    routedNote: "इस समस्या को तेज़ समाधान के लिए {department} को भेजा जाएगा।",
    issueSummary: "समस्या सारांश",
    category: "श्रेणी",
    location: "स्थान",
    description: "विवरण",
    reported: "रिपोर्ट किया गया",
    aiSuggestionHeading: "एआई सुझाव",
    aiSuggestionText: "अलग-अलग कोणों से अधिक फ़ोटो जोड़ने से विभाग को समस्या बेहतर ढंग से समझने में मदद मिलती है और समाधान तेज़ होता है।",
    editDetails: "✏️ विवरण संपादित करें",
    submitComplaint: "शिकायत सबमिट करें",
    fillFormTitle: "फ़ॉर्म भरें",
    fillFormHint: 'पूर्वावलोकन देखने के लिए फ़ॉर्म पूरा करें और "एआई से समस्या का विश्लेषण करें" पर क्लिक करें।',
    myComplaintsHeading: "मेरी शिकायतें",
    nearbyIssuesHeading: "आस-पास की रिपोर्ट की गई समस्याएं",
    viewFullMap: "पूरा मानचित्र देखें",
    collapseMap: "मानचित्र संक्षिप्त करें",
    biggerImpactHeading: "बड़ा प्रभाव डालें!",
    biggerImpactDesc: "अपने दोस्तों और पड़ोसियों को समस्याओं की रिपोर्ट करने और साथ मिलकर एक बेहतर समुदाय बनाने के लिए आमंत्रित करें।",
    inviteNow: "अभी आमंत्रित करें",
    voiceMatters: "आपकी आवाज़ मायने रखती है। आपकी हर शिकायत आपके शहर को रहने के लिए एक बेहतर जगह बनाती है।",
    successTitle: "शिकायत सबमिट हो गई!",
    successDesc: "आपकी शिकायत सफलतापूर्वक दर्ज की गई है और उचित विभाग को भेज दी गई है।",
    yourComplaintId: "आपकी शिकायत आईडी",
    department: "विभाग",
    status: "स्थिति",
    trackComplaintBtn: "शिकायत ट्रैक करें",
    reportAnother: "एक और रिपोर्ट करें",
  },
  myComplaints: {
    statsTotal: "कुल शिकायतें",
    statsResolved: "हल हो गईं",
    statsInProgress: "प्रगति में",
    statsUnderReview: "समीक्षाधीन",
    statsAvgResolution: "औसत समाधान समय",
    allTime: "सभी समय",
    thisMonth: "इस माह",
    yourComplaintsHeading: "आपकी शिकायतें",
    yourComplaintsSub: "आपके द्वारा रिपोर्ट की गई सभी समस्याओं को ट्रैक और प्रबंधित करें",
    allStatus: "सभी स्थितियां",
    allCategories: "सभी श्रेणियां",
    allTimeFilter: "सभी समय",
    thisWeek: "इस सप्ताह",
    lastMonth: "पिछले माह",
    searchPlaceholder: "आईडी या कीवर्ड से खोजें...",
    sortNewest: "पहले नवीनतम",
    sortOldest: "पहले सबसे पुराना",
    sortStatus: "स्थिति",
    noComplaintsFound: "कोई शिकायत नहीं मिली",
    noComplaintsHint: "अपने फ़िल्टर समायोजित करें या नई समस्या दर्ज करें",
    showing: "दिखा रहा है",
    of: "में से",
    donutTotal: "कुल",
    byCategoryHeading: "श्रेणी के अनुसार शिकायतें",
    noComplaintsYet: "अभी तक कोई शिकायत नहीं। अपनी पहली समस्या दर्ज करें!",
    recentActivityHeading: "हाल की गतिविधि",
    noRecentActivity: "कोई हाल की गतिविधि नहीं",
    biggerImpactHeading: "बड़ा प्रभाव डालें!",
    biggerImpactDesc: "अपने दोस्तों और पड़ोसियों को समस्याओं की रिपोर्ट करने और साथ मिलकर एक बेहतर समुदाय बनाने के लिए आमंत्रित करें।",
    inviteNow: "अभी आमंत्रित करें",
  },
  track: {
    heading: "अपनी शिकायत ट्रैक करें",
    subheading: "रीयल-टाइम स्थिति और समयरेखा ट्रैक करने के लिए अपनी शिकायत आईडी दर्ज करें",
    inputPlaceholder: "शिकायत आईडी दर्ज करें (जैसे, CMP-2026-1452)",
    trackButton: "ट्रैक करें",
    notFound: 'शिकायत आईडी "{id}" नहीं मिली। कृपया आईडी जांचें और पुनः प्रयास करें।',
    resolutionProgress: "समाधान प्रगति",
    category: "श्रेणी",
    priority: "प्राथमिकता",
    submitted: "सबमिट किया गया",
    lastUpdated: "अंतिम अपडेट",
    location: "स्थान",
    assignedTo: "को सौंपा गया",
    department: "विभाग",
    timelineHeading: "शिकायत समयरेखा",
    current: "वर्तमान",
    upcomingResolved: "हल हो गया",
    upcomingResolvedHint: "ठीक होने पर समस्या हल के रूप में चिह्नित की जाएगी",
    resolvedBanner: "आपकी शिकायत सफलतापूर्वक हल हो गई है!",
    emptyTitle: "अपनी शिकायत ट्रैक करें",
    emptyHint: "रीयल-टाइम स्थिति और समयरेखा देखने के लिए ऊपर अपनी शिकायत आईडी दर्ज करें।",
    tryExample: "प्रयास करें: CMP-2026-1452",
    statusGuideHeading: "स्थिति गाइड",
    statusDescriptions: {
      submitted: "शिकायत प्राप्त हुई और सिस्टम में दर्ज की गई",
      under_review: "संबंधित विभाग द्वारा समीक्षा की जा रही है",
      assigned: "एक अधिकारी/इंजीनियर को नियुक्त किया गया है",
      in_progress: "समस्या को हल करने के लिए सक्रिय कार्य किया जा रहा है",
      resolved: "समस्या ठीक कर दी गई है और शिकायत बंद कर दी गई है",
    },
    tipsHeading: "💡 तेज़ समाधान के लिए सुझाव",
    tips: [
      "बेहतर दृश्यता के लिए कई फ़ोटो जोड़ें",
      "सटीक स्थान/लैंडमार्क का उल्लेख करें",
      "बताएं कि समस्या कितने समय से बनी हुई है",
      "व्यस्त समय नोट करें जब यह सबसे अधिक समस्याग्रस्त हो",
    ],
    needMoreHelpHeading: "और मदद चाहिए?",
    needMoreHelpDesc: "अपनी शिकायत पर रीयल-टाइम मार्गदर्शन के लिए जनमित्र एआई से चैट करें।",
    chatWithAI: "एआई से चैट करें",
  },
};

const ta: ComplaintsPageContent = {
  categoryLabels: {
    "Street Lighting": "தெரு விளக்குகள்",
    "Roads & Infrastructure": "சாலைகள் & உள்கட்டமைப்பு",
    "Water Supply": "நீர் விநியோகம்",
    "Sanitation & Drainage": "சுகாதாரம் & வடிகால்",
    "Garbage Collection": "குப்பை சேகரிப்பு",
    "Public Transport": "பொது போக்குவரத்து",
    Electricity: "மின்சாரம்",
    "Parks & Recreation": "பூங்காக்கள் & பொழுதுபோக்கு",
    "Noise Pollution": "ஒலி மாசுபாடு",
    Other: "மற்றவை",
  },
  whenOptions: {
    Today: "இன்று",
    Yesterday: "நேற்று",
    "2 days ago": "2 நாட்களுக்கு முன்",
    "3 days ago": "3 நாட்களுக்கு முன்",
    "This week": "இந்த வாரம்",
    "Last week": "கடந்த வாரம்",
  },
  trustBar: [
    { label: "நிகழ்நேரத்தில் கண்காணிக்கவும்", sub: "ஒவ்வொரு படியிலும் புதுப்பிப்புகளைப் பெறுங்கள்" },
    { label: "வெளிப்படையான செயல்முறை", sub: "உங்கள் சிக்கல் எங்கே உள்ளது என்பதை அறியுங்கள்" },
    { label: "விரைவான தீர்வு", sub: "AI விரைவான வழிசெலுத்தலை உறுதிசெய்கிறது" },
    { label: "சிறந்த சமூகங்கள்", sub: "இணைந்து, நாங்கள் மாற்றத்தை உருவாக்குகிறோம்" },
  ],
  report: {
    heading: "புதிய சிக்கலைப் புகாரளிக்கவும்",
    subheading: "சிக்கலைப் பற்றிய விவரங்களை வழங்கவும். சரியான துறைக்கு அனுப்ப எங்கள் AI உதவும்.",
    uploadLabel: "1. புகைப்படம் / வீடியோவைப் பதிவேற்றவும்",
    uploadClickText: "பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுத்து விடவும்",
    uploadHint: "JPG, PNG அல்லது MP4 (அதிகபட்சம் 20MB)",
    addMore: "மேலும் சேர்",
    locationLabel: "2. இடம்",
    locationPlaceholder: "இடத்தை உள்ளிடவும்...",
    useCurrentLocation: "தற்போதைய இடத்தைப் பயன்படுத்தவும்",
    locating: "கண்டறியப்படுகிறது...",
    mapHint: "அல்லது சரியான இடத்தில் பின் போட வரைபடத்தைத் தட்டவும்.",
    descriptionLabel: "3. சிக்கலை விவரிக்கவும்",
    descriptionPlaceholder: "சிக்கலை விரிவாக விவரிக்கவும்...",
    dictate: "சொல்லச் சொல்",
    listening: "கேட்கிறது…",
    whenLabel: "4. இதை எப்போது கவனித்தீர்கள்?",
    analyzing: "பகுப்பாய்வு செய்யப்படுகிறது...",
    analyzeButton: "AI மூலம் சிக்கலை பகுப்பாய்வு செய்யவும் ✨",
    analyzeHint: "பகுப்பாய்வு செய்ய இடம் மற்றும் விளக்கத்தைச் சேர்க்கவும் (குறைந்தபட்சம் 10 எழுத்துகள்).",
    aiHelperNote: "உங்கள் சிக்கலை விரைவாக தீர்க்க AI சரியான வகை மற்றும் துறையைப் பரிந்துரைக்கும்.",
    aiPreviewHeading: "AI பகுப்பாய்வு & முன்னோட்டம்",
    aiPreviewSub: "சமர்ப்பிக்கும் முன் விவரங்களை மறுபரிசீலனை செய்யவும்",
    aiDetectedCategory: "AI கண்டறிந்த வகை",
    priority: "முன்னுரிமை",
    confidenceScore: "நம்பிக்கை மதிப்பெண்",
    suggestedDepartment: "பரிந்துரைக்கப்பட்ட துறை",
    routedNote: "இந்த சிக்கல் விரைவான தீர்வுக்காக {department}-க்கு அனுப்பப்படும்.",
    issueSummary: "சிக்கல் சுருக்கம்",
    category: "வகை",
    location: "இடம்",
    description: "விளக்கம்",
    reported: "புகாரளிக்கப்பட்டது",
    aiSuggestionHeading: "AI பரிந்துரை",
    aiSuggestionText: "வெவ்வேறு கோணங்களில் இருந்து மேலும் புகைப்படங்களைச் சேர்ப்பது, துறை சிக்கலை நன்கு புரிந்துகொள்ள உதவுகிறது மற்றும் தீர்வை விரைவுபடுத்துகிறது.",
    editDetails: "✏️ விவரங்களைத் திருத்தவும்",
    submitComplaint: "புகாரைச் சமர்ப்பிக்கவும்",
    fillFormTitle: "படிவத்தை நிரப்பவும்",
    fillFormHint: 'முன்னோட்டத்தைக் காண படிவத்தை நிறைவு செய்து "AI மூலம் சிக்கலை பகுப்பாய்வு செய்யவும்" என்பதைக் கிளிக் செய்யவும்.',
    myComplaintsHeading: "என் புகார்கள்",
    nearbyIssuesHeading: "அருகிலுள்ள புகாரளிக்கப்பட்ட சிக்கல்கள்",
    viewFullMap: "முழு வரைபடத்தைக் காண்க",
    collapseMap: "வரைபடத்தை சுருக்கு",
    biggerImpactHeading: "இன்னும் பெரிய தாக்கத்தை ஏற்படுத்துங்கள்!",
    biggerImpactDesc: "சிக்கல்களைப் புகாரளிக்கவும், ஒன்றிணைந்து சிறந்த சமூகத்தை உருவாக்கவும் உங்கள் நண்பர்களையும் அக்கம்பக்கத்தினரையும் அழையுங்கள்.",
    inviteNow: "இப்போது அழைக்கவும்",
    voiceMatters: "உங்கள் குரல் முக்கியமானது. நீங்கள் எழுப்பும் ஒவ்வொரு புகாரும் உங்கள் நகரத்தை வாழ சிறந்த இடமாக மாற்றுகிறது.",
    successTitle: "புகார் சமர்ப்பிக்கப்பட்டது!",
    successDesc: "உங்கள் புகார் வெற்றிகரமாக பதிவு செய்யப்பட்டு பொருத்தமான துறைக்கு அனுப்பப்பட்டுள்ளது.",
    yourComplaintId: "உங்கள் புகார் ஐடி",
    department: "துறை",
    status: "நிலை",
    trackComplaintBtn: "புகாரைக் கண்காணி",
    reportAnother: "மற்றொன்றை புகாரளிக்கவும்",
  },
  myComplaints: {
    statsTotal: "மொத்த புகார்கள்",
    statsResolved: "தீர்க்கப்பட்டது",
    statsInProgress: "செயல்பாட்டில்",
    statsUnderReview: "மறுஆய்வில்",
    statsAvgResolution: "சராசரி தீர்வு நேரம்",
    allTime: "எல்லா நேரமும்",
    thisMonth: "இந்த மாதம்",
    yourComplaintsHeading: "உங்கள் புகார்கள்",
    yourComplaintsSub: "நீங்கள் புகாரளித்த அனைத்து சிக்கல்களையும் கண்காணித்து நிர்வகிக்கவும்",
    allStatus: "அனைத்து நிலைகள்",
    allCategories: "அனைத்து வகைகள்",
    allTimeFilter: "எல்லா நேரமும்",
    thisWeek: "இந்த வாரம்",
    lastMonth: "கடந்த மாதம்",
    searchPlaceholder: "ஐடி அல்லது முக்கிய வார்த்தையால் தேடுங்கள்...",
    sortNewest: "புதியது முதலில்",
    sortOldest: "பழையது முதலில்",
    sortStatus: "நிலை",
    noComplaintsFound: "புகார்கள் எதுவும் இல்லை",
    noComplaintsHint: "உங்கள் வடிகட்டிகளை சரிசெய்யவும் அல்லது புதிய சிக்கலைப் புகாரளிக்கவும்",
    showing: "காட்டுகிறது",
    of: "இல்",
    donutTotal: "மொத்தம்",
    byCategoryHeading: "வகை வாரியான புகார்கள்",
    noComplaintsYet: "இதுவரை புகார்கள் இல்லை. உங்கள் முதல் சிக்கலைப் புகாரளிக்கவும்!",
    recentActivityHeading: "சமீபத்திய செயல்பாடு",
    noRecentActivity: "சமீபத்திய செயல்பாடு இல்லை",
    biggerImpactHeading: "இன்னும் பெரிய தாக்கத்தை ஏற்படுத்துங்கள்!",
    biggerImpactDesc: "சிக்கல்களைப் புகாரளிக்கவும், ஒன்றிணைந்து சிறந்த சமூகத்தை உருவாக்கவும் உங்கள் நண்பர்களையும் அக்கம்பக்கத்தினரையும் அழையுங்கள்.",
    inviteNow: "இப்போது அழைக்கவும்",
  },
  track: {
    heading: "உங்கள் புகாரைக் கண்காணிக்கவும்",
    subheading: "நிகழ்நேர நிலை மற்றும் காலவரிசையைக் கண்காணிக்க உங்கள் புகார் ஐடியை உள்ளிடவும்",
    inputPlaceholder: "புகார் ஐடியை உள்ளிடவும் (எ.கா., CMP-2026-1452)",
    trackButton: "கண்காணி",
    notFound: '"{id}" எனும் புகார் ஐடி கிடைக்கவில்லை. ஐடியைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
    resolutionProgress: "தீர்வு முன்னேற்றம்",
    category: "வகை",
    priority: "முன்னுரிமை",
    submitted: "சமர்ப்பிக்கப்பட்டது",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது",
    location: "இடம்",
    assignedTo: "நியமிக்கப்பட்டவர்",
    department: "துறை",
    timelineHeading: "புகார் காலவரிசை",
    current: "தற்போதைய",
    upcomingResolved: "தீர்க்கப்பட்டது",
    upcomingResolvedHint: "சரிசெய்யப்பட்டவுடன் சிக்கல் தீர்க்கப்பட்டதாக குறிக்கப்படும்",
    resolvedBanner: "உங்கள் புகார் வெற்றிகரமாக தீர்க்கப்பட்டது!",
    emptyTitle: "உங்கள் புகாரைக் கண்காணிக்கவும்",
    emptyHint: "நிகழ்நேர நிலை மற்றும் காலவரிசையைக் காண மேலே உங்கள் புகார் ஐடியை உள்ளிடவும்.",
    tryExample: "முயற்சிக்கவும்: CMP-2026-1452",
    statusGuideHeading: "நிலை வழிகாட்டி",
    statusDescriptions: {
      submitted: "புகார் பெறப்பட்டு அமைப்பில் பதிவு செய்யப்பட்டது",
      under_review: "தொடர்புடைய துறையால் மறுஆய்வு செய்யப்படுகிறது",
      assigned: "ஒரு அதிகாரி/பொறியாளர் நியமிக்கப்பட்டுள்ளார்",
      in_progress: "சிக்கலைத் தீர்க்க செயலில் பணி நடைபெறுகிறது",
      resolved: "சிக்கல் சரிசெய்யப்பட்டு புகார் மூடப்பட்டது",
    },
    tipsHeading: "💡 விரைவான தீர்வுக்கான குறிப்புகள்",
    tips: [
      "சிறந்த தெரிவுநிலைக்கு பல புகைப்படங்களைச் சேர்க்கவும்",
      "சரியான இடம்/அடையாளத்தைக் குறிப்பிடவும்",
      "சிக்கல் எவ்வளவு காலமாக உள்ளது என்பதைச் சேர்க்கவும்",
      "இது மிகவும் சிக்கலாக இருக்கும் உச்ச நேரங்களைக் குறிப்பிடவும்",
    ],
    needMoreHelpHeading: "மேலும் உதவி தேவையா?",
    needMoreHelpDesc: "உங்கள் புகார் குறித்த நிகழ்நேர வழிகாட்டுதலுக்கு ஜன்மித்ரா AI உடன் அரட்டையடிக்கவும்.",
    chatWithAI: "AI உடன் அரட்டையடிக்கவும்",
  },
};

export const COMPLAINTS_CONTENT: Record<string, ComplaintsPageContent> = { en, hi, ta };

export function getComplaintsContent(langCode: string): ComplaintsPageContent {
  return COMPLAINTS_CONTENT[langCode] ?? COMPLAINTS_CONTENT.en;
}
