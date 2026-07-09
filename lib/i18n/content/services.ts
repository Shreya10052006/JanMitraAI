/**
 * lib/i18n/content/services.ts
 *
 * Deep, page-specific static content for the Services page — category
 * labels, the top-services list, "you may also need" prompts, full
 * per-service detail tabs (overview/eligibility/documents/process/fees/FAQs),
 * and the page's own UI copy (buttons, empty states, section labels).
 *
 * NOT AI-translated. Currently fully translated for English, Hindi, and
 * Tamil; other supported language codes fall back to English via
 * getServicesContent() until they receive their own full pass.
 */

export interface ServiceDetailContent {
  title: string;
  subtitle: string;
  whoCanApply: string;
  validity: string;
  processingTime: string;
  mode: string;
  description: string;
  features: string[];
  overview: string;
  eligibility: string[];
  documents: string[];
  process: string[];
  fees: string;
  faqs: { q: string; a: string }[];
}

export interface ServicesPageContent {
  categories: Record<string, string>;
  topServices: Record<string, { label: string; sub: string }>;
  youMayNeed: { id: string; label: string; q: string }[];
  serviceDetails: Record<string, ServiceDetailContent>;
  ui: {
    clearFilter: string;
    noServicesMatch: string;
    cantFindService: string;
    askJanMitra: string;
    backToAllServices: string;
    popular: string;
    whoCanApply: string;
    validity: string;
    processingTime: string;
    mode: string;
    officialPortal: string;
    tabs: { overview: string; eligibility: string; documents: string; process: string; fees: string; faqs: string };
    description: string;
    feesNote: string;
    needHelp: string;
    needHelpDesc: string;
    aiEligibilityCheck: string;
    aiEligibilityDesc: string;
    youMayAlsoNeed: string;
    secureTrusted: string;
    secureTrustedDesc: string;
    govtVerified: string;
    officialSource: string;
    securePlatform: string;
    endToEnd: string;
    privacyFirst: string;
    privacyMatters: string;
    copied: string;
    checkEligibility: string;
    searchAriaLabel: string;
  };
}

const en: ServicesPageContent = {
  categories: {
    identity: "Identity &\nDocuments",
    transport: "Transport",
    education: "Education",
    health: "Health",
    finance: "Finance & Tax",
    housing: "Housing",
    employment: "Employment",
    business: "Business",
    agriculture: "Agriculture",
  },
  topServices: {
    "dl-renewal": { label: "Driving License Renewal", sub: "Renew your driving license online" },
    passport: { label: "Passport Seva", sub: "Apply for new passport or re-issue" },
    aadhaar: { label: "Aadhaar Services", sub: "Update, download, or verify Aadhaar" },
    pan: { label: "PAN Card", sub: "Apply for new PAN or corrections" },
    "voter-id": { label: "Voter ID Card", sub: "Apply for new voter ID or corrections" },
  },
  youMayNeed: [
    { id: "1", label: "Change of Address in DL", q: "How do I update my address on my driving license?" },
    { id: "2", label: "DL Duplicate Copy", q: "How do I get a duplicate copy of my driving license?" },
    { id: "3", label: "International Driving Permit", q: "How do I apply for an international driving permit?" },
    { id: "4", label: "Book Driving Test Slot", q: "How do I book a driving test slot?" },
  ],
  serviceDetails: {
    "dl-renewal": {
      title: "Driving License Renewal",
      subtitle: "Renew your driving license online through the Parivahan Sewa portal",
      whoCanApply: "All Indian citizens with valid DL",
      validity: "20 years or till age 50",
      processingTime: "3 – 7 working days",
      mode: "Online",
      description: "Renew your driving license before it expires to continue driving legally. You can renew online easily without visiting the RTO office.",
      features: ["Quick & easy online process", "Home delivery of DL", "Secure & government verified"],
      overview: "Your DL is valid for 20 years or until you turn 50. Renewal can be done 1 year before expiry or up to 5 years after.",
      eligibility: [
        "Indian citizen with a valid or recently expired DL",
        "DL must be expired within the last 5 years",
        "No pending court cases against the DL",
        "Medical fitness certificate (if age > 40)",
      ],
      documents: [
        "Original Driving License",
        "Aadhaar Card or valid ID proof",
        "Address proof",
        "Passport-size photograph",
        "Medical Certificate Form 1A (if age > 40)",
      ],
      process: [
        "Visit parivahan.gov.in and log in",
        "Select 'DL Renewal' under Driving License services",
        "Fill in the required details and upload documents",
        "Pay the renewal fee online",
        "Book a slot for biometric if required",
        "Receive renewed DL at your registered address",
      ],
      fees: "₹200 – ₹600 depending on DL category",
      faqs: [
        { q: "What if my DL is expired for more than 5 years?", a: "You may need to appear for a fresh driving test. Visit your nearest RTO." },
        { q: "Can I renew DL offline?", a: "Yes, you can visit your nearest RTO with the required documents." },
        { q: "How long does it take to get the renewed DL?", a: "Typically 3–7 working days after document verification." },
      ],
    },
    passport: {
      title: "Passport Seva",
      subtitle: "Apply for a new passport, renew existing, or get emergency travel documents",
      whoCanApply: "All Indian citizens",
      validity: "10 years (adults), 5 years (minors)",
      processingTime: "7 – 45 working days",
      mode: "Online + In-person appointment",
      description: "Apply for a new passport or renew your existing one through the Passport Seva portal. Book an appointment at your nearest Passport Seva Kendra.",
      features: ["Online application & appointment booking", "Tatkal (expedited) option available", "Track application status online"],
      overview: "Passport Seva lets you apply online, pay fees, and book a PSK appointment before visiting in person for document verification and biometrics.",
      eligibility: [
        "Indian citizen by birth, descent, or registration",
        "No pending criminal proceedings",
        "Valid proof of date of birth and address",
      ],
      documents: [
        "Birth Certificate or equivalent proof of DOB",
        "Aadhaar Card",
        "Address Proof",
        "Passport Photos (as per specification)",
        "Existing passport (for renewal)",
      ],
      process: [
        "Register on passportindia.gov.in",
        "Fill the online application form",
        "Pay the applicable fee",
        "Book an appointment at your nearest PSK",
        "Visit PSK with original documents for verification",
        "Passport dispatched via speed post after police verification",
      ],
      fees: "₹1,500 (normal) – ₹3,500 (Tatkal) for 36-page booklet",
      faqs: [
        { q: "How fast is the Tatkal scheme?", a: "Tatkal passports are typically issued within 1–3 working days after police verification." },
        { q: "Can I apply for a minor's passport?", a: "Yes, parents/guardians can apply on behalf of minors with their consent and documents." },
        { q: "Is police verification always required?", a: "It depends on your address history; some applicants get post-issuance verification." },
      ],
    },
    aadhaar: {
      title: "Aadhaar Services",
      subtitle: "Update, download, or verify your Aadhaar through UIDAI's official portal",
      whoCanApply: "All Indian residents",
      validity: "Lifetime (no expiry)",
      processingTime: "Instant download, 7–15 days for updates",
      mode: "Online + Aadhaar Seva Kendra",
      description: "Manage your Aadhaar online — download a copy, update your address or mobile number, or verify Aadhaar details for a service.",
      features: ["Instant e-Aadhaar download", "Online demographic updates", "Free address update via mAadhaar app"],
      overview: "Aadhaar is a 12-digit unique identity number issued by UIDAI. Most demographic updates can be done online; biometric updates need a physical visit.",
      eligibility: ["Valid registered mobile number for OTP-based services", "Existing Aadhaar enrolment"],
      documents: ["Aadhaar number or enrolment ID", "Proof of address (for address update)", "Proof of identity (for name/DOB correction)"],
      process: [
        "Visit uidai.gov.in and select the required service",
        "Enter your Aadhaar number and verify via OTP",
        "Upload supporting documents if updating details",
        "Submit the update request",
        "Track status using the Update Request Number (URN)",
      ],
      fees: "Free online; ₹50 at Aadhaar Seva Kendra for biometric updates",
      faqs: [
        { q: "Can I change my Aadhaar photo online?", a: "No, photo and biometric updates require an in-person visit to an Aadhaar Seva Kendra." },
        { q: "How do I download my Aadhaar without a registered mobile number?", a: "You'll need to first update your mobile number at an Aadhaar Seva Kendra." },
        { q: "Is Aadhaar mandatory for government services?", a: "It's required for many welfare schemes and services, subject to applicable rules." },
      ],
    },
    pan: {
      title: "PAN Card",
      subtitle: "Apply for a new Permanent Account Number or request corrections",
      whoCanApply: "Indian citizens, NRIs, and entities",
      validity: "Lifetime (no expiry)",
      processingTime: "7 – 15 working days",
      mode: "Online (NSDL/UTIITSL)",
      description: "PAN is a 10-digit alphanumeric identifier required for tax filing, high-value transactions, and most financial services in India.",
      features: ["e-PAN issued within 48 hours (instant PAN via Aadhaar)", "Track application online", "Correction requests supported"],
      overview: "You can apply for a new PAN, request a reprint, or correct details like name, date of birth, or address through the NSDL/UTIITSL portals.",
      eligibility: ["Indian citizens, HUFs, companies, and other entities", "Valid identity, address, and date of birth proof"],
      documents: ["Aadhaar Card", "Proof of address", "Proof of date of birth", "Passport-size photograph (for physical application)"],
      process: [
        "Visit the NSDL or UTIITSL PAN portal",
        "Fill Form 49A (Indian citizens) online",
        "Upload documents and photograph",
        "Pay the application fee",
        "e-PAN emailed and physical card dispatched by post",
      ],
      fees: "₹93 – ₹107 (e-PAN) / ₹864+ for physical dispatch outside India",
      faqs: [
        { q: "Can I get an instant PAN?", a: "Yes, if you have a valid Aadhaar with a linked mobile number, e-PAN can be issued within minutes via the Instant PAN facility." },
        { q: "How do I link PAN with Aadhaar?", a: "You can link them online via the Income Tax e-filing portal." },
        { q: "What if I lose my PAN card?", a: "You can apply for a reprint/duplicate PAN card using the same portals." },
      ],
    },
    "voter-id": {
      title: "Voter ID Card",
      subtitle: "Apply for a new Voter ID (EPIC) or request corrections via the National Voter Service Portal",
      whoCanApply: "Indian citizens aged 18+",
      validity: "Lifetime (no expiry)",
      processingTime: "15 – 30 working days",
      mode: "Online (NVSP / Voter Helpline app)",
      description: "Register as a voter, get your Elector's Photo ID Card (EPIC), or update your existing voter details through the Election Commission's portal.",
      features: ["Online form submission (Form 6)", "Track application status", "Digital voter ID (e-EPIC) download"],
      overview: "Every Indian citizen aged 18 or above is eligible to register as a voter in their constituency of residence and receive a Voter ID card.",
      eligibility: [
        "Indian citizen aged 18 years or above",
        "Ordinarily resident in the constituency of registration",
        "Not already registered elsewhere",
      ],
      documents: ["Proof of age (birth certificate, 10th marksheet, etc.)", "Proof of residence", "Passport-size photograph"],
      process: [
        "Visit voters.eci.gov.in and register/log in",
        "Fill Form 6 for new registration (or Form 8 for corrections)",
        "Upload photograph and supporting documents",
        "Submit and note the reference ID",
        "Booth Level Officer verifies details before approval",
      ],
      fees: "Free",
      faqs: [
        { q: "How do I download a digital voter ID?", a: "Once approved, you can download the e-EPIC from the NVSP portal or Voter Helpline app." },
        { q: "Can I update my address if I've moved?", a: "Yes, use Form 8 to update your address or transfer your registration to a new constituency." },
        { q: "How do I check if my name is on the voter list?", a: "Search using your EPIC number or personal details on voters.eci.gov.in." },
      ],
    },
  },
  ui: {
    clearFilter: "Clear filter",
    noServicesMatch: "No services match your search.",
    cantFindService: "Can't find a service?",
    askJanMitra: "Ask JanMitra AI to help you",
    backToAllServices: "Back to all services",
    popular: "Popular",
    whoCanApply: "Who can apply",
    validity: "Validity",
    processingTime: "Processing Time",
    mode: "Mode",
    officialPortal: "Official Portal",
    tabs: { overview: "Overview", eligibility: "Eligibility", documents: "Documents", process: "Process", fees: "Fees", faqs: "FAQs" },
    description: "Description",
    feesNote: "Fees may vary by state and application category",
    needHelp: "Need help?",
    needHelpDesc: "Chat with JanMitra AI for step-by-step guidance.",
    aiEligibilityCheck: "AI Eligibility Check",
    aiEligibilityDesc: "Answer a few questions and JanMitra AI will check your eligibility",
    youMayAlsoNeed: "You may also need",
    secureTrusted: "100% Secure & Trusted",
    secureTrustedDesc: "Your data is protected and only used for official government services. We never share your information.",
    govtVerified: "Govt. Verified",
    officialSource: "Official source",
    securePlatform: "Secure Platform",
    endToEnd: "End-to-end encryption",
    privacyFirst: "Privacy First",
    privacyMatters: "Your privacy matters",
    copied: "Copied!",
    checkEligibility: "Check Eligibility",
    searchAriaLabel: "Search government services",
  },
};

const hi: ServicesPageContent = {
  categories: {
    identity: "पहचान और\nदस्तावेज़",
    transport: "परिवहन",
    education: "शिक्षा",
    health: "स्वास्थ्य",
    finance: "वित्त और कर",
    housing: "आवास",
    employment: "रोज़गार",
    business: "व्यवसाय",
    agriculture: "कृषि",
  },
  topServices: {
    "dl-renewal": { label: "ड्राइविंग लाइसेंस नवीनीकरण", sub: "अपना ड्राइविंग लाइसेंस ऑनलाइन नवीनीकृत करें" },
    passport: { label: "पासपोर्ट सेवा", sub: "नए पासपोर्ट के लिए आवेदन करें या पुनः जारी करवाएं" },
    aadhaar: { label: "आधार सेवाएं", sub: "आधार अपडेट, डाउनलोड या सत्यापित करें" },
    pan: { label: "पैन कार्ड", sub: "नए पैन के लिए आवेदन करें या सुधार करवाएं" },
    "voter-id": { label: "वोटर आईडी कार्ड", sub: "नए वोटर आईडी के लिए आवेदन करें या सुधार करवाएं" },
  },
  youMayNeed: [
    { id: "1", label: "डीएल में पते में बदलाव", q: "मैं अपने ड्राइविंग लाइसेंस पर अपना पता कैसे अपडेट करूं?" },
    { id: "2", label: "डीएल की डुप्लिकेट कॉपी", q: "मुझे अपने ड्राइविंग लाइसेंस की डुप्लिकेट कॉपी कैसे मिलेगी?" },
    { id: "3", label: "अंतरराष्ट्रीय ड्राइविंग परमिट", q: "मैं अंतरराष्ट्रीय ड्राइविंग परमिट के लिए आवेदन कैसे करूं?" },
    { id: "4", label: "ड्राइविंग टेस्ट स्लॉट बुक करें", q: "मैं ड्राइविंग टेस्ट स्लॉट कैसे बुक करूं?" },
  ],
  serviceDetails: {
    "dl-renewal": {
      title: "ड्राइविंग लाइसेंस नवीनीकरण",
      subtitle: "परिवहन सेवा पोर्टल के माध्यम से अपना ड्राइविंग लाइसेंस ऑनलाइन नवीनीकृत करें",
      whoCanApply: "वैध डीएल वाले सभी भारतीय नागरिक",
      validity: "20 वर्ष या 50 वर्ष की आयु तक",
      processingTime: "3 – 7 कार्य दिवस",
      mode: "ऑनलाइन",
      description: "कानूनी रूप से गाड़ी चलाना जारी रखने के लिए अपना ड्राइविंग लाइसेंस समाप्त होने से पहले नवीनीकृत करें। आप आरटीओ कार्यालय जाए बिना आसानी से ऑनलाइन नवीनीकरण कर सकते हैं।",
      features: ["त्वरित और आसान ऑनलाइन प्रक्रिया", "डीएल की होम डिलीवरी", "सुरक्षित और सरकार द्वारा सत्यापित"],
      overview: "आपका डीएल 20 वर्षों के लिए या जब तक आप 50 वर्ष के नहीं हो जाते, वैध है। नवीनीकरण समाप्ति से 1 वर्ष पहले या समाप्ति के 5 वर्ष बाद तक किया जा सकता है।",
      eligibility: [
        "वैध या हाल ही में समाप्त डीएल वाला भारतीय नागरिक",
        "डीएल पिछले 5 वर्षों के भीतर समाप्त होना चाहिए",
        "डीएल के खिलाफ कोई लंबित अदालती मामला नहीं",
        "मेडिकल फिटनेस प्रमाणपत्र (यदि आयु > 40)",
      ],
      documents: [
        "मूल ड्राइविंग लाइसेंस",
        "आधार कार्ड या वैध पहचान प्रमाण",
        "पता प्रमाण",
        "पासपोर्ट आकार की फोटो",
        "मेडिकल सर्टिफिकेट फॉर्म 1A (यदि आयु > 40)",
      ],
      process: [
        "parivahan.gov.in पर जाएं और लॉग इन करें",
        "ड्राइविंग लाइसेंस सेवाओं के तहत 'डीएल नवीनीकरण' चुनें",
        "आवश्यक विवरण भरें और दस्तावेज़ अपलोड करें",
        "नवीनीकरण शुल्क ऑनलाइन भुगतान करें",
        "यदि आवश्यक हो तो बायोमेट्रिक के लिए स्लॉट बुक करें",
        "अपने पंजीकृत पते पर नवीनीकृत डीएल प्राप्त करें",
      ],
      fees: "डीएल श्रेणी के आधार पर ₹200 – ₹600",
      faqs: [
        { q: "यदि मेरा डीएल 5 वर्ष से अधिक समय से समाप्त है तो क्या होगा?", a: "आपको नए सिरे से ड्राइविंग टेस्ट देना पड़ सकता है। अपने नज़दीकी आरटीओ पर जाएं।" },
        { q: "क्या मैं ऑफलाइन डीएल नवीनीकृत कर सकता हूं?", a: "हां, आप आवश्यक दस्तावेज़ों के साथ अपने नज़दीकी आरटीओ जा सकते हैं।" },
        { q: "नवीनीकृत डीएल प्राप्त करने में कितना समय लगता है?", a: "आमतौर पर दस्तावेज़ सत्यापन के बाद 3–7 कार्य दिवस।" },
      ],
    },
    passport: {
      title: "पासपोर्ट सेवा",
      subtitle: "नए पासपोर्ट के लिए आवेदन करें, मौजूदा को नवीनीकृत करें, या आपातकालीन यात्रा दस्तावेज़ प्राप्त करें",
      whoCanApply: "सभी भारतीय नागरिक",
      validity: "10 वर्ष (वयस्क), 5 वर्ष (नाबालिग)",
      processingTime: "7 – 45 कार्य दिवस",
      mode: "ऑनलाइन + व्यक्तिगत नियुक्ति",
      description: "पासपोर्ट सेवा पोर्टल के माध्यम से नए पासपोर्ट के लिए आवेदन करें या अपने मौजूदा पासपोर्ट को नवीनीकृत करें। अपने नज़दीकी पासपोर्ट सेवा केंद्र पर नियुक्ति बुक करें।",
      features: ["ऑनलाइन आवेदन और नियुक्ति बुकिंग", "तत्काल (शीघ्र) विकल्प उपलब्ध", "आवेदन की स्थिति ऑनलाइन ट्रैक करें"],
      overview: "पासपोर्ट सेवा आपको ऑनलाइन आवेदन करने, शुल्क भुगतान करने और दस्तावेज़ सत्यापन तथा बायोमेट्रिक्स के लिए व्यक्तिगत रूप से जाने से पहले पीएसके नियुक्ति बुक करने देती है।",
      eligibility: [
        "जन्म, वंश या पंजीकरण द्वारा भारतीय नागरिक",
        "कोई लंबित आपराधिक कार्यवाही नहीं",
        "जन्मतिथि और पते का वैध प्रमाण",
      ],
      documents: [
        "जन्मतिथि प्रमाण के रूप में जन्म प्रमाणपत्र या समकक्ष",
        "आधार कार्ड",
        "पता प्रमाण",
        "पासपोर्ट फोटो (विनिर्देश के अनुसार)",
        "मौजूदा पासपोर्ट (नवीनीकरण के लिए)",
      ],
      process: [
        "passportindia.gov.in पर पंजीकरण करें",
        "ऑनलाइन आवेदन पत्र भरें",
        "लागू शुल्क का भुगतान करें",
        "अपने नज़दीकी पीएसके पर नियुक्ति बुक करें",
        "सत्यापन के लिए मूल दस्तावेज़ों के साथ पीएसके जाएं",
        "पुलिस सत्यापन के बाद स्पीड पोस्ट द्वारा पासपोर्ट भेजा जाता है",
      ],
      fees: "36-पृष्ठ बुकलेट के लिए ₹1,500 (सामान्य) – ₹3,500 (तत्काल)",
      faqs: [
        { q: "तत्काल योजना कितनी तेज़ है?", a: "तत्काल पासपोर्ट आमतौर पर पुलिस सत्यापन के बाद 1–3 कार्य दिवसों के भीतर जारी किए जाते हैं।" },
        { q: "क्या मैं नाबालिग के पासपोर्ट के लिए आवेदन कर सकता हूं?", a: "हां, माता-पिता/अभिभावक अपनी सहमति और दस्तावेज़ों के साथ नाबालिगों की ओर से आवेदन कर सकते हैं।" },
        { q: "क्या पुलिस सत्यापन हमेशा आवश्यक है?", a: "यह आपके पते के इतिहास पर निर्भर करता है; कुछ आवेदकों को जारी करने के बाद सत्यापन मिलता है।" },
      ],
    },
    aadhaar: {
      title: "आधार सेवाएं",
      subtitle: "UIDAI के आधिकारिक पोर्टल के माध्यम से अपना आधार अपडेट, डाउनलोड या सत्यापित करें",
      whoCanApply: "सभी भारतीय निवासी",
      validity: "आजीवन (कोई समाप्ति नहीं)",
      processingTime: "तत्काल डाउनलोड, अपडेट के लिए 7–15 दिन",
      mode: "ऑनलाइन + आधार सेवा केंद्र",
      description: "अपने आधार को ऑनलाइन प्रबंधित करें — एक प्रति डाउनलोड करें, अपना पता या मोबाइल नंबर अपडेट करें, या किसी सेवा के लिए आधार विवरण सत्यापित करें।",
      features: ["तत्काल ई-आधार डाउनलोड", "ऑनलाइन जनसांख्यिकीय अपडेट", "mAadhaar ऐप के माध्यम से मुफ्त पता अपडेट"],
      overview: "आधार UIDAI द्वारा जारी 12-अंकीय विशिष्ट पहचान संख्या है। अधिकांश जनसांख्यिकीय अपडेट ऑनलाइन किए जा सकते हैं; बायोमेट्रिक अपडेट के लिए व्यक्तिगत रूप से जाना आवश्यक है।",
      eligibility: ["OTP-आधारित सेवाओं के लिए वैध पंजीकृत मोबाइल नंबर", "मौजूदा आधार नामांकन"],
      documents: ["आधार नंबर या नामांकन आईडी", "पता प्रमाण (पता अपडेट के लिए)", "पहचान प्रमाण (नाम/जन्मतिथि सुधार के लिए)"],
      process: [
        "uidai.gov.in पर जाएं और आवश्यक सेवा चुनें",
        "अपना आधार नंबर दर्ज करें और OTP के माध्यम से सत्यापित करें",
        "विवरण अपडेट करते समय सहायक दस्तावेज़ अपलोड करें",
        "अपडेट अनुरोध सबमिट करें",
        "अपडेट रिक्वेस्ट नंबर (URN) का उपयोग करके स्थिति ट्रैक करें",
      ],
      fees: "ऑनलाइन मुफ्त; बायोमेट्रिक अपडेट के लिए आधार सेवा केंद्र पर ₹50",
      faqs: [
        { q: "क्या मैं अपनी आधार फोटो ऑनलाइन बदल सकता हूं?", a: "नहीं, फोटो और बायोमेट्रिक अपडेट के लिए आधार सेवा केंद्र पर व्यक्तिगत रूप से जाना आवश्यक है।" },
        { q: "पंजीकृत मोबाइल नंबर के बिना मैं अपना आधार कैसे डाउनलोड करूं?", a: "आपको पहले आधार सेवा केंद्र पर अपना मोबाइल नंबर अपडेट करना होगा।" },
        { q: "क्या सरकारी सेवाओं के लिए आधार अनिवार्य है?", a: "यह लागू नियमों के अधीन कई कल्याणकारी योजनाओं और सेवाओं के लिए आवश्यक है।" },
      ],
    },
    pan: {
      title: "पैन कार्ड",
      subtitle: "नए स्थायी खाता नंबर के लिए आवेदन करें या सुधार का अनुरोध करें",
      whoCanApply: "भारतीय नागरिक, एनआरआई और संस्थाएं",
      validity: "आजीवन (कोई समाप्ति नहीं)",
      processingTime: "7 – 15 कार्य दिवस",
      mode: "ऑनलाइन (NSDL/UTIITSL)",
      description: "पैन एक 10-अंकीय अल्फ़ान्यूमेरिक पहचानकर्ता है जो कर फाइलिंग, उच्च-मूल्य लेनदेन और भारत में अधिकांश वित्तीय सेवाओं के लिए आवश्यक है।",
      features: ["48 घंटों के भीतर ई-पैन जारी (आधार के माध्यम से तत्काल पैन)", "ऑनलाइन आवेदन ट्रैक करें", "सुधार अनुरोध समर्थित"],
      overview: "आप NSDL/UTIITSL पोर्टल के माध्यम से नए पैन के लिए आवेदन कर सकते हैं, पुनर्मुद्रण का अनुरोध कर सकते हैं, या नाम, जन्मतिथि या पते जैसे विवरण सुधार सकते हैं।",
      eligibility: ["भारतीय नागरिक, HUF, कंपनियां और अन्य संस्थाएं", "पहचान, पता और जन्मतिथि का वैध प्रमाण"],
      documents: ["आधार कार्ड", "पता प्रमाण", "जन्मतिथि प्रमाण", "पासपोर्ट आकार की फोटो (भौतिक आवेदन के लिए)"],
      process: [
        "NSDL या UTIITSL पैन पोर्टल पर जाएं",
        "फॉर्म 49A (भारतीय नागरिक) ऑनलाइन भरें",
        "दस्तावेज़ और फोटो अपलोड करें",
        "आवेदन शुल्क का भुगतान करें",
        "ई-पैन ईमेल किया जाता है और भौतिक कार्ड डाक द्वारा भेजा जाता है",
      ],
      fees: "₹93 – ₹107 (ई-पैन) / भारत के बाहर भौतिक प्रेषण के लिए ₹864+",
      faqs: [
        { q: "क्या मुझे तत्काल पैन मिल सकता है?", a: "हां, यदि आपके पास लिंक किए गए मोबाइल नंबर के साथ वैध आधार है, तो इंस्टेंट पैन सुविधा के माध्यम से मिनटों में ई-पैन जारी किया जा सकता है।" },
        { q: "मैं पैन को आधार से कैसे लिंक करूं?", a: "आप उन्हें इनकम टैक्स ई-फाइलिंग पोर्टल के माध्यम से ऑनलाइन लिंक कर सकते हैं।" },
        { q: "अगर मैं अपना पैन कार्ड खो दूं तो क्या होगा?", a: "आप उसी पोर्टल्स का उपयोग करके पुनर्मुद्रण/डुप्लिकेट पैन कार्ड के लिए आवेदन कर सकते हैं।" },
      ],
    },
    "voter-id": {
      title: "वोटर आईडी कार्ड",
      subtitle: "नए वोटर आईडी (EPIC) के लिए आवेदन करें या नेशनल वोटर सर्विस पोर्टल के माध्यम से सुधार का अनुरोध करें",
      whoCanApply: "18+ वर्ष के भारतीय नागरिक",
      validity: "आजीवन (कोई समाप्ति नहीं)",
      processingTime: "15 – 30 कार्य दिवस",
      mode: "ऑनलाइन (NVSP / वोटर हेल्पलाइन ऐप)",
      description: "मतदाता के रूप में पंजीकरण करें, अपना निर्वाचक फोटो पहचान पत्र (EPIC) प्राप्त करें, या चुनाव आयोग के पोर्टल के माध्यम से अपने मौजूदा मतदाता विवरण अपडेट करें।",
      features: ["ऑनलाइन फॉर्म सबमिशन (फॉर्म 6)", "आवेदन की स्थिति ट्रैक करें", "डिजिटल वोटर आईडी (e-EPIC) डाउनलोड"],
      overview: "18 वर्ष या उससे अधिक आयु का प्रत्येक भारतीय नागरिक अपने निवास के निर्वाचन क्षेत्र में मतदाता के रूप में पंजीकरण करने और वोटर आईडी कार्ड प्राप्त करने के लिए पात्र है।",
      eligibility: [
        "18 वर्ष या उससे अधिक आयु का भारतीय नागरिक",
        "पंजीकरण के निर्वाचन क्षेत्र में सामान्यतः निवासी",
        "अन्यत्र पहले से पंजीकृत नहीं",
      ],
      documents: ["आयु प्रमाण (जन्म प्रमाणपत्र, 10वीं मार्कशीट, आदि)", "निवास प्रमाण", "पासपोर्ट आकार की फोटो"],
      process: [
        "voters.eci.gov.in पर जाएं और पंजीकरण/लॉग इन करें",
        "नए पंजीकरण के लिए फॉर्म 6 भरें (या सुधार के लिए फॉर्म 8)",
        "फोटो और सहायक दस्तावेज़ अपलोड करें",
        "सबमिट करें और संदर्भ आईडी नोट करें",
        "बूथ लेवल अधिकारी अनुमोदन से पहले विवरण सत्यापित करता है",
      ],
      fees: "मुफ्त",
      faqs: [
        { q: "मैं डिजिटल वोटर आईडी कैसे डाउनलोड करूं?", a: "स्वीकृत होने पर, आप NVSP पोर्टल या वोटर हेल्पलाइन ऐप से e-EPIC डाउनलोड कर सकते हैं।" },
        { q: "अगर मैं स्थानांतरित हो गया हूं तो क्या मैं अपना पता अपडेट कर सकता हूं?", a: "हां, अपना पता अपडेट करने या नए निर्वाचन क्षेत्र में अपना पंजीकरण स्थानांतरित करने के लिए फॉर्म 8 का उपयोग करें।" },
        { q: "मैं कैसे जांचूं कि मेरा नाम मतदाता सूची में है या नहीं?", a: "voters.eci.gov.in पर अपने EPIC नंबर या व्यक्तिगत विवरण का उपयोग करके खोजें।" },
      ],
    },
  },
  ui: {
    clearFilter: "फ़िल्टर हटाएं",
    noServicesMatch: "आपकी खोज से कोई सेवा मेल नहीं खाती।",
    cantFindService: "कोई सेवा नहीं मिल रही?",
    askJanMitra: "जनमित्र एआई से मदद मांगें",
    backToAllServices: "सभी सेवाओं पर वापस जाएं",
    popular: "लोकप्रिय",
    whoCanApply: "कौन आवेदन कर सकता है",
    validity: "वैधता",
    processingTime: "प्रक्रिया समय",
    mode: "माध्यम",
    officialPortal: "आधिकारिक पोर्टल",
    tabs: { overview: "अवलोकन", eligibility: "पात्रता", documents: "दस्तावेज़", process: "प्रक्रिया", fees: "शुल्क", faqs: "सामान्य प्रश्न" },
    description: "विवरण",
    feesNote: "शुल्क राज्य और आवेदन श्रेणी के अनुसार भिन्न हो सकता है",
    needHelp: "मदद चाहिए?",
    needHelpDesc: "चरण-दर-चरण मार्गदर्शन के लिए जनमित्र एआई से चैट करें।",
    aiEligibilityCheck: "एआई पात्रता जांच",
    aiEligibilityDesc: "कुछ सवालों के जवाब दें और जनमित्र एआई आपकी पात्रता जांचेगा",
    youMayAlsoNeed: "आपको यह भी चाहिए हो सकता है",
    secureTrusted: "100% सुरक्षित और भरोसेमंद",
    secureTrustedDesc: "आपका डेटा सुरक्षित है और केवल आधिकारिक सरकारी सेवाओं के लिए उपयोग किया जाता है। हम आपकी जानकारी कभी साझा नहीं करते।",
    govtVerified: "सरकार द्वारा सत्यापित",
    officialSource: "आधिकारिक स्रोत",
    securePlatform: "सुरक्षित प्लेटफ़ॉर्म",
    endToEnd: "एंड-टू-एंड एन्क्रिप्शन",
    privacyFirst: "गोपनीयता पहले",
    privacyMatters: "आपकी गोपनीयता मायने रखती है",
    copied: "कॉपी हो गया!",
    checkEligibility: "पात्रता जांचें",
    searchAriaLabel: "सरकारी सेवाएं खोजें",
  },
};

const ta: ServicesPageContent = {
  categories: {
    identity: "அடையாளம் &\nஆவணங்கள்",
    transport: "போக்குவரத்து",
    education: "கல்வி",
    health: "சுகாதாரம்",
    finance: "நிதி & வரி",
    housing: "வீட்டுவசதி",
    employment: "வேலைவாய்ப்பு",
    business: "வணிகம்",
    agriculture: "விவசாயம்",
  },
  topServices: {
    "dl-renewal": { label: "ஓட்டுநர் உரிமம் புதுப்பித்தல்", sub: "உங்கள் ஓட்டுநர் உரிமத்தை ஆன்லைனில் புதுப்பிக்கவும்" },
    passport: { label: "பாஸ்போர்ட் சேவா", sub: "புதிய பாஸ்போர்ட் அல்லது மறு வழங்கலுக்கு விண்ணப்பிக்கவும்" },
    aadhaar: { label: "ஆதார் சேவைகள்", sub: "ஆதாரைப் புதுப்பிக்க, பதிவிறக்க அல்லது சரிபார்க்க" },
    pan: { label: "பான் கார்டு", sub: "புதிய பான் அல்லது திருத்தங்களுக்கு விண்ணப்பிக்கவும்" },
    "voter-id": { label: "வாக்காளர் அடையாள அட்டை", sub: "புதிய வாக்காளர் அடையாள அட்டை அல்லது திருத்தங்களுக்கு விண்ணப்பிக்கவும்" },
  },
  youMayNeed: [
    { id: "1", label: "DL-ல் முகவரி மாற்றம்", q: "எனது ஓட்டுநர் உரிமத்தில் எனது முகவரியை நான் எவ்வாறு புதுப்பிப்பது?" },
    { id: "2", label: "DL நகல் பிரதி", q: "எனது ஓட்டுநர் உரிமத்தின் நகல் பிரதியை நான் எவ்வாறு பெறுவது?" },
    { id: "3", label: "சர்வதேச ஓட்டுநர் அனுமதி", q: "சர்வதேச ஓட்டுநர் அனுமதிக்கு நான் எவ்வாறு விண்ணப்பிப்பது?" },
    { id: "4", label: "ஓட்டுநர் தேர்வு நேரத்தை பதிவு செய்யவும்", q: "ஓட்டுநர் தேர்வு நேரத்தை நான் எவ்வாறு பதிவு செய்வது?" },
  ],
  serviceDetails: {
    "dl-renewal": {
      title: "ஓட்டுநர் உரிமம் புதுப்பித்தல்",
      subtitle: "பரிவாகன் சேவா போர்ட்டல் மூலம் உங்கள் ஓட்டுநர் உரிமத்தை ஆன்லைனில் புதுப்பிக்கவும்",
      whoCanApply: "செல்லுபடியாகும் DL உள்ள அனைத்து இந்திய குடிமக்களும்",
      validity: "20 ஆண்டுகள் அல்லது 50 வயது வரை",
      processingTime: "3 – 7 வேலை நாட்கள்",
      mode: "ஆன்லைன்",
      description: "சட்டப்பூர்வமாக வாகனம் ஓட்டுவதைத் தொடர, உங்கள் ஓட்டுநர் உரிமம் காலாவதியாவதற்கு முன் புதுப்பிக்கவும். RTO அலுவலகத்திற்குச் செல்லாமல் ஆன்லைனில் எளிதாகப் புதுப்பிக்கலாம்.",
      features: ["விரைவான & எளிதான ஆன்லைன் செயல்முறை", "DL வீட்டு விநியோகம்", "பாதுகாப்பான & அரசு சரிபார்க்கப்பட்டது"],
      overview: "உங்கள் DL 20 ஆண்டுகளுக்கு அல்லது நீங்கள் 50 வயதை அடையும் வரை செல்லுபடியாகும். காலாவதியாவதற்கு 1 ஆண்டு முன்பு அல்லது காலாவதியான 5 ஆண்டுகள் வரை புதுப்பிக்கலாம்.",
      eligibility: [
        "செல்லுபடியாகும் அல்லது சமீபத்தில் காலாவதியான DL உள்ள இந்திய குடிமகன்",
        "DL கடந்த 5 ஆண்டுகளுக்குள் காலாவதியாகியிருக்க வேண்டும்",
        "DL மீது நிலுவையில் உள்ள நீதிமன்ற வழக்குகள் இல்லை",
        "மருத்துவ தகுதி சான்றிதழ் (வயது > 40 எனில்)",
      ],
      documents: [
        "அசல் ஓட்டுநர் உரிமம்",
        "ஆதார் அட்டை அல்லது செல்லுபடியாகும் அடையாள சான்று",
        "முகவரி சான்று",
        "பாஸ்போர்ட் அளவு புகைப்படம்",
        "மருத்துவ சான்றிதழ் படிவம் 1A (வயது > 40 எனில்)",
      ],
      process: [
        "parivahan.gov.in-ஐப் பார்வையிட்டு உள்நுழையவும்",
        "ஓட்டுநர் உரிம சேவைகளின் கீழ் 'DL புதுப்பித்தல்' தேர்ந்தெடுக்கவும்",
        "தேவையான விவரங்களை நிரப்பி ஆவணங்களைப் பதிவேற்றவும்",
        "புதுப்பித்தல் கட்டணத்தை ஆன்லைனில் செலுத்தவும்",
        "தேவைப்பட்டால் பயோமெட்ரிக்கிற்கான நேரத்தைப் பதிவு செய்யவும்",
        "உங்கள் பதிவு செய்யப்பட்ட முகவரியில் புதுப்பிக்கப்பட்ட DL-ஐப் பெறவும்",
      ],
      fees: "DL வகையைப் பொறுத்து ₹200 – ₹600",
      faqs: [
        { q: "எனது DL 5 ஆண்டுகளுக்கு மேல் காலாவதியாகிவிட்டால் என்ன செய்வது?", a: "நீங்கள் புதிய ஓட்டுநர் தேர்வுக்கு ஆஜராக வேண்டியிருக்கலாம். உங்கள் அருகிலுள்ள RTO-வைப் பார்வையிடவும்." },
        { q: "நான் ஆஃப்லைனில் DL-ஐ புதுப்பிக்க முடியுமா?", a: "ஆம், தேவையான ஆவணங்களுடன் உங்கள் அருகிலுள்ள RTO-வைப் பார்வையிடலாம்." },
        { q: "புதுப்பிக்கப்பட்ட DL பெற எவ்வளவு நேரம் ஆகும்?", a: "பொதுவாக ஆவண சரிபார்ப்புக்குப் பிறகு 3–7 வேலை நாட்கள்." },
      ],
    },
    passport: {
      title: "பாஸ்போர்ட் சேவா",
      subtitle: "புதிய பாஸ்போர்ட்டுக்கு விண்ணப்பிக்கவும், தற்போதையதைப் புதுப்பிக்கவும் அல்லது அவசர பயண ஆவணங்களைப் பெறவும்",
      whoCanApply: "அனைத்து இந்திய குடிமக்களும்",
      validity: "10 ஆண்டுகள் (பெரியவர்கள்), 5 ஆண்டுகள் (சிறார்கள்)",
      processingTime: "7 – 45 வேலை நாட்கள்",
      mode: "ஆன்லைன் + நேரடி சந்திப்பு",
      description: "பாஸ்போர்ட் சேவா போர்ட்டல் மூலம் புதிய பாஸ்போர்ட்டுக்கு விண்ணப்பிக்கவும் அல்லது உங்கள் தற்போதைய பாஸ்போர்ட்டைப் புதுப்பிக்கவும். உங்கள் அருகிலுள்ள பாஸ்போர்ட் சேவா கேந்திரத்தில் சந்திப்பைப் பதிவு செய்யவும்.",
      features: ["ஆன்லைன் விண்ணப்பம் & சந்திப்பு பதிவு", "தட்கல் (விரைவான) விருப்பம் கிடைக்கிறது", "விண்ணப்ப நிலையை ஆன்லைனில் கண்காணிக்கவும்"],
      overview: "ஆவண சரிபார்ப்பு மற்றும் பயோமெட்ரிக்ஸுக்காக நேரில் செல்வதற்கு முன் ஆன்லைனில் விண்ணப்பிக்கவும், கட்டணம் செலுத்தவும், PSK சந்திப்பைப் பதிவு செய்யவும் பாஸ்போர்ட் சேவா அனுமதிக்கிறது.",
      eligibility: [
        "பிறப்பு, வம்சாவளி அல்லது பதிவு மூலம் இந்திய குடிமகன்",
        "நிலுவையில் உள்ள குற்றவியல் நடவடிக்கைகள் இல்லை",
        "பிறந்த தேதி மற்றும் முகவரிக்கான செல்லுபடியாகும் சான்று",
      ],
      documents: [
        "பிறப்பு சான்றிதழ் அல்லது பிறந்த தேதிக்கான சமமான சான்று",
        "ஆதார் அட்டை",
        "முகவரி சான்று",
        "பாஸ்போர்ட் புகைப்படங்கள் (விவரக்குறிப்பின்படி)",
        "தற்போதைய பாஸ்போர்ட் (புதுப்பித்தலுக்கு)",
      ],
      process: [
        "passportindia.gov.in-இல் பதிவு செய்யவும்",
        "ஆன்லைன் விண்ணப்பப் படிவத்தை நிரப்பவும்",
        "பொருந்தும் கட்டணத்தைச் செலுத்தவும்",
        "உங்கள் அருகிலுள்ள PSK-இல் சந்திப்பைப் பதிவு செய்யவும்",
        "சரிபார்ப்புக்காக அசல் ஆவணங்களுடன் PSK-ஐப் பார்வையிடவும்",
        "காவல் துறை சரிபார்ப்புக்குப் பிறகு ஸ்பீட் போஸ்ட் மூலம் பாஸ்போர்ட் அனுப்பப்படும்",
      ],
      fees: "36-பக்க புத்தகத்திற்கு ₹1,500 (சாதாரண) – ₹3,500 (தட்கல்)",
      faqs: [
        { q: "தட்கல் திட்டம் எவ்வளவு வேகமானது?", a: "தட்கல் பாஸ்போர்ட்கள் பொதுவாக காவல் துறை சரிபார்ப்புக்குப் பிறகு 1–3 வேலை நாட்களுக்குள் வழங்கப்படும்." },
        { q: "சிறார் பாஸ்போர்ட்டுக்கு நான் விண்ணப்பிக்க முடியுமா?", a: "ஆம், பெற்றோர்/பாதுகாவலர்கள் தங்கள் ஒப்புதல் மற்றும் ஆவணங்களுடன் சிறார்கள் சார்பாக விண்ணப்பிக்கலாம்." },
        { q: "காவல் துறை சரிபார்ப்பு எப்போதும் தேவையா?", a: "இது உங்கள் முகவரி வரலாற்றைப் பொறுத்தது; சில விண்ணப்பதாரர்களுக்கு வழங்கிய பின் சரிபார்ப்பு நடைபெறும்." },
      ],
    },
    aadhaar: {
      title: "ஆதார் சேவைகள்",
      subtitle: "UIDAI-இன் அதிகாரப்பூர்வ போர்ட்டல் மூலம் உங்கள் ஆதாரைப் புதுப்பிக்கவும், பதிவிறக்கவும் அல்லது சரிபார்க்கவும்",
      whoCanApply: "அனைத்து இந்திய குடியிருப்பாளர்களும்",
      validity: "வாழ்நாள் முழுவதும் (காலாவதி இல்லை)",
      processingTime: "உடனடி பதிவிறக்கம், புதுப்பிப்புகளுக்கு 7–15 நாட்கள்",
      mode: "ஆன்லைன் + ஆதார் சேவா கேந்திரம்",
      description: "உங்கள் ஆதாரை ஆன்லைனில் நிர்வகிக்கவும் — ஒரு பிரதியைப் பதிவிறக்கவும், உங்கள் முகவரி அல்லது மொபைல் எண்ணைப் புதுப்பிக்கவும் அல்லது ஒரு சேவைக்கான ஆதார் விவரங்களைச் சரிபார்க்கவும்.",
      features: ["உடனடி இ-ஆதார் பதிவிறக்கம்", "ஆன்லைன் மக்கள்தொகை புதுப்பிப்புகள்", "mAadhaar ஆப் மூலம் இலவச முகவரி புதுப்பிப்பு"],
      overview: "ஆதார் என்பது UIDAI வழங்கும் 12-இலக்க தனித்துவ அடையாள எண். பெரும்பாலான மக்கள்தொகை புதுப்பிப்புகளை ஆன்லைனில் செய்யலாம்; பயோமெட்ரிக் புதுப்பிப்புகளுக்கு நேரில் செல்ல வேண்டும்.",
      eligibility: ["OTP அடிப்படையிலான சேவைகளுக்கு செல்லுபடியாகும் பதிவு செய்யப்பட்ட மொபைல் எண்", "தற்போதைய ஆதார் பதிவு"],
      documents: ["ஆதார் எண் அல்லது பதிவு ஐடி", "முகவரி சான்று (முகவரி புதுப்பிப்புக்கு)", "அடையாள சான்று (பெயர்/பிறந்த தேதி திருத்தத்திற்கு)"],
      process: [
        "uidai.gov.in-ஐப் பார்வையிட்டு தேவையான சேவையைத் தேர்ந்தெடுக்கவும்",
        "உங்கள் ஆதார் எண்ணை உள்ளிட்டு OTP மூலம் சரிபார்க்கவும்",
        "விவரங்களைப் புதுப்பிக்கும்போது ஆதரவு ஆவணங்களைப் பதிவேற்றவும்",
        "புதுப்பிப்பு கோரிக்கையைச் சமர்ப்பிக்கவும்",
        "புதுப்பிப்பு கோரிக்கை எண்ணை (URN) பயன்படுத்தி நிலையைக் கண்காணிக்கவும்",
      ],
      fees: "ஆன்லைனில் இலவசம்; பயோமெட்ரிக் புதுப்பிப்புகளுக்கு ஆதார் சேவா கேந்திரத்தில் ₹50",
      faqs: [
        { q: "நான் எனது ஆதார் புகைப்படத்தை ஆன்லைனில் மாற்ற முடியுமா?", a: "இல்லை, புகைப்படம் மற்றும் பயோமெட்ரிக் புதுப்பிப்புகளுக்கு ஆதார் சேவா கேந்திரத்திற்கு நேரில் செல்ல வேண்டும்." },
        { q: "பதிவு செய்யப்பட்ட மொபைல் எண் இல்லாமல் எனது ஆதாரை எவ்வாறு பதிவிறக்குவது?", a: "நீங்கள் முதலில் ஆதார் சேவா கேந்திரத்தில் உங்கள் மொபைல் எண்ணைப் புதுப்பிக்க வேண்டும்." },
        { q: "அரசு சேவைகளுக்கு ஆதார் கட்டாயமா?", a: "பொருந்தும் விதிகளுக்கு உட்பட்டு பல நலத்திட்டங்கள் மற்றும் சேவைகளுக்கு இது தேவைப்படுகிறது." },
      ],
    },
    pan: {
      title: "பான் கார்டு",
      subtitle: "புதிய நிரந்தர கணக்கு எண்ணுக்கு விண்ணப்பிக்கவும் அல்லது திருத்தங்களைக் கோரவும்",
      whoCanApply: "இந்திய குடிமக்கள், என்ஆர்ஐகள் மற்றும் நிறுவனங்கள்",
      validity: "வாழ்நாள் முழுவதும் (காலாவதி இல்லை)",
      processingTime: "7 – 15 வேலை நாட்கள்",
      mode: "ஆன்லைன் (NSDL/UTIITSL)",
      description: "பான் என்பது இந்தியாவில் வரி தாக்கல், அதிக மதிப்புள்ள பரிவர்த்தனைகள் மற்றும் பெரும்பாலான நிதி சேவைகளுக்குத் தேவையான 10-இலக்க எழுத்தெண் அடையாளங்காட்டி ஆகும்.",
      features: ["48 மணி நேரத்திற்குள் இ-பான் வழங்கப்படும் (ஆதார் மூலம் உடனடி பான்)", "விண்ணப்பத்தை ஆன்லைனில் கண்காணிக்கவும்", "திருத்தக் கோரிக்கைகள் ஆதரிக்கப்படுகின்றன"],
      overview: "NSDL/UTIITSL போர்ட்டல்கள் மூலம் புதிய பானுக்கு விண்ணப்பிக்கலாம், மறுஅச்சிடலைக் கோரலாம் அல்லது பெயர், பிறந்த தேதி அல்லது முகவரி போன்ற விவரங்களைத் திருத்தலாம்.",
      eligibility: ["இந்திய குடிமக்கள், HUF-கள், நிறுவனங்கள் மற்றும் பிற நிறுவனங்கள்", "செல்லுபடியாகும் அடையாளம், முகவரி மற்றும் பிறந்த தேதி சான்று"],
      documents: ["ஆதார் அட்டை", "முகவரி சான்று", "பிறந்த தேதி சான்று", "பாஸ்போர்ட் அளவு புகைப்படம் (உடல் விண்ணப்பத்திற்கு)"],
      process: [
        "NSDL அல்லது UTIITSL பான் போர்ட்டலைப் பார்வையிடவும்",
        "படிவம் 49A (இந்திய குடிமக்கள்) ஆன்லைனில் நிரப்பவும்",
        "ஆவணங்கள் மற்றும் புகைப்படத்தைப் பதிவேற்றவும்",
        "விண்ணப்பக் கட்டணத்தைச் செலுத்தவும்",
        "இ-பான் மின்னஞ்சல் செய்யப்படும் மற்றும் உடல் அட்டை தபால் மூலம் அனுப்பப்படும்",
      ],
      fees: "₹93 – ₹107 (இ-பான்) / இந்தியாவிற்கு வெளியே உடல் அனுப்புதலுக்கு ₹864+",
      faqs: [
        { q: "எனக்கு உடனடி பான் கிடைக்குமா?", a: "ஆம், இணைக்கப்பட்ட மொபைல் எண்ணுடன் செல்லுபடியாகும் ஆதார் இருந்தால், இன்ஸ்டன்ட் பான் வசதி மூலம் நிமிடங்களில் இ-பான் வழங்கப்படும்." },
        { q: "பானை ஆதாருடன் எவ்வாறு இணைப்பது?", a: "வருமான வரி இ-ஃபைலிங் போர்ட்டல் மூலம் ஆன்லைனில் அவற்றை இணைக்கலாம்." },
        { q: "எனது பான் கார்டை இழந்தால் என்ன செய்வது?", a: "அதே போர்ட்டல்களைப் பயன்படுத்தி மறுஅச்சு/நகல் பான் கார்டுக்கு விண்ணப்பிக்கலாம்." },
      ],
    },
    "voter-id": {
      title: "வாக்காளர் அடையாள அட்டை",
      subtitle: "தேசிய வாக்காளர் சேவை போர்ட்டல் மூலம் புதிய வாக்காளர் அடையாள அட்டைக்கு (EPIC) விண்ணப்பிக்கவும் அல்லது திருத்தங்களைக் கோரவும்",
      whoCanApply: "18+ வயதுடைய இந்திய குடிமக்கள்",
      validity: "வாழ்நாள் முழுவதும் (காலாவதி இல்லை)",
      processingTime: "15 – 30 வேலை நாட்கள்",
      mode: "ஆன்லைன் (NVSP / வாக்காளர் உதவி ஆப்)",
      description: "வாக்காளராகப் பதிவு செய்யவும், உங்கள் தேர்தல் புகைப்பட அடையாள அட்டையைப் (EPIC) பெறவும் அல்லது தேர்தல் ஆணையத்தின் போர்ட்டல் மூலம் உங்கள் தற்போதைய வாக்காளர் விவரங்களைப் புதுப்பிக்கவும்.",
      features: ["ஆன்லைன் படிவம் சமர்ப்பித்தல் (படிவம் 6)", "விண்ணப்ப நிலையைக் கண்காணிக்கவும்", "டிஜிட்டல் வாக்காளர் அடையாள அட்டை (e-EPIC) பதிவிறக்கம்"],
      overview: "18 வயது அல்லது அதற்கு மேற்பட்ட ஒவ்வொரு இந்திய குடிமகனும் தங்கள் வசிப்பிட தொகுதியில் வாக்காளராகப் பதிவு செய்து வாக்காளர் அடையாள அட்டையைப் பெற தகுதியுடையவர்.",
      eligibility: [
        "18 வயது அல்லது அதற்கு மேற்பட்ட இந்திய குடிமகன்",
        "பதிவு தொகுதியில் பொதுவாக வசிப்பவர்",
        "வேறு எங்கும் ஏற்கனவே பதிவு செய்யப்படவில்லை",
      ],
      documents: ["வயது சான்று (பிறப்பு சான்றிதழ், 10ஆம் வகுப்பு மதிப்பெண் பட்டியல் போன்றவை)", "குடியிருப்பு சான்று", "பாஸ்போர்ட் அளவு புகைப்படம்"],
      process: [
        "voters.eci.gov.in-ஐப் பார்வையிட்டு பதிவு/உள்நுழையவும்",
        "புதிய பதிவுக்கு படிவம் 6-ஐ நிரப்பவும் (அல்லது திருத்தங்களுக்கு படிவம் 8)",
        "புகைப்படம் மற்றும் ஆதரவு ஆவணங்களைப் பதிவேற்றவும்",
        "சமர்ப்பித்து குறிப்பு ஐடியைக் குறிக்கவும்",
        "ஒப்புதலுக்கு முன் பூத் லெவல் அதிகாரி விவரங்களைச் சரிபார்க்கிறார்",
      ],
      fees: "இலவசம்",
      faqs: [
        { q: "டிஜிட்டல் வாக்காளர் அடையாள அட்டையை நான் எவ்வாறு பதிவிறக்குவது?", a: "ஒப்புதல் அளிக்கப்பட்டதும், NVSP போர்ட்டல் அல்லது வாக்காளர் உதவி ஆப்பிலிருந்து e-EPIC-ஐ பதிவிறக்கலாம்." },
        { q: "நான் இடம் மாறினால் எனது முகவரியைப் புதுப்பிக்க முடியுமா?", a: "ஆம், உங்கள் முகவரியைப் புதுப்பிக்க அல்லது புதிய தொகுதிக்கு உங்கள் பதிவை மாற்ற படிவம் 8-ஐப் பயன்படுத்தவும்." },
        { q: "எனது பெயர் வாக்காளர் பட்டியலில் உள்ளதா என்பதை நான் எவ்வாறு சரிபார்ப்பது?", a: "voters.eci.gov.in-இல் உங்கள் EPIC எண் அல்லது தனிப்பட்ட விவரங்களைப் பயன்படுத்தி தேடவும்." },
      ],
    },
  },
  ui: {
    clearFilter: "வடிகட்டியை அழிக்கவும்",
    noServicesMatch: "உங்கள் தேடலுடன் எந்த சேவையும் பொருந்தவில்லை.",
    cantFindService: "சேவை கிடைக்கவில்லையா?",
    askJanMitra: "உதவிக்கு ஜன்மித்ரா AI-யிடம் கேளுங்கள்",
    backToAllServices: "அனைத்து சேவைகளுக்கும் திரும்பு",
    popular: "பிரபலமானது",
    whoCanApply: "யார் விண்ணப்பிக்கலாம்",
    validity: "செல்லுபடி காலம்",
    processingTime: "செயலாக்க நேரம்",
    mode: "முறை",
    officialPortal: "அதிகாரப்பூர்வ போர்ட்டல்",
    tabs: { overview: "மேலோட்டம்", eligibility: "தகுதி", documents: "ஆவணங்கள்", process: "செயல்முறை", fees: "கட்டணம்", faqs: "அடிக்கடி கேட்கப்படும் கேள்விகள்" },
    description: "விளக்கம்",
    feesNote: "கட்டணம் மாநிலம் மற்றும் விண்ணப்ப வகையைப் பொறுத்து மாறுபடலாம்",
    needHelp: "உதவி தேவையா?",
    needHelpDesc: "படிப்படியான வழிகாட்டுதலுக்கு ஜன்மித்ரா AI உடன் அரட்டையடிக்கவும்.",
    aiEligibilityCheck: "AI தகுதி சரிபார்ப்பு",
    aiEligibilityDesc: "சில கேள்விகளுக்குப் பதிலளிக்கவும், ஜன்மித்ரா AI உங்கள் தகுதியைச் சரிபார்க்கும்",
    youMayAlsoNeed: "உங்களுக்கு இதுவும் தேவைப்படலாம்",
    secureTrusted: "100% பாதுகாப்பானது & நம்பகமானது",
    secureTrustedDesc: "உங்கள் தரவு பாதுகாக்கப்படுகிறது மற்றும் அதிகாரப்பூர்வ அரசு சேவைகளுக்கு மட்டுமே பயன்படுத்தப்படுகிறது. உங்கள் தகவலை நாங்கள் ஒருபோதும் பகிர மாட்டோம்.",
    govtVerified: "அரசு சரிபார்த்தது",
    officialSource: "அதிகாரப்பூர்வ மூலம்",
    securePlatform: "பாதுகாப்பான தளம்",
    endToEnd: "இறுதி முதல் இறுதி வரை குறியாக்கம்",
    privacyFirst: "தனியுரிமை முதலில்",
    privacyMatters: "உங்கள் தனியுரிமை முக்கியமானது",
    copied: "நகலெடுக்கப்பட்டது!",
    checkEligibility: "தகுதியைச் சரிபார்க்கவும்",
    searchAriaLabel: "அரசு சேவைகளைத் தேடு",
  },
};

export const SERVICES_CONTENT: Record<string, ServicesPageContent> = { en, hi, ta };

export function getServicesContent(langCode: string): ServicesPageContent {
  return SERVICES_CONTENT[langCode] ?? SERVICES_CONTENT.en;
}
