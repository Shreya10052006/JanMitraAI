/**
 * lib/i18n/content/settings.ts
 *
 * Deep, page-specific static content for the Settings and Language
 * Settings pages. NOT AI-translated. Fully translated for English,
 * Hindi and Tamil; other language codes fall back to English via
 * getSettingsContent().
 */

export interface SettingsPageContent {
  subtitle: string;
  languageHeading: string;
  displayLanguage: string;
  accessibilityHeading: string;
  textSizeSmall: string;
  textSizeMedium: string;
  textSizeLarge: string;
  notificationsHeading: string;
  notificationsLabel: string;
  notificationsSub: string;
  accountSecurityHeading: string;
  accountSecurityDesc: string;
  askAboutSecurity: string;
  linkedAccounts: string;
  logoutConfirm: string;
  languagePageSubtitle: string;
  languageUpdatedTo: string;
}

const en: SettingsPageContent = {
  subtitle: "Configure your language, accessibility, notifications and account.",
  languageHeading: "Language",
  displayLanguage: "Display Language",
  accessibilityHeading: "Accessibility",
  textSizeSmall: "Small",
  textSizeMedium: "Medium",
  textSizeLarge: "Large",
  notificationsHeading: "Notifications",
  notificationsLabel: "Complaint & scheme updates",
  notificationsSub: "Email & SMS alerts for status changes",
  accountSecurityHeading: "Account & Security",
  accountSecurityDesc: "JanMitra AI is currently passwordless and doesn't connect to third-party accounts — your data stays on this device. Have a security question?",
  askAboutSecurity: "Ask about account security",
  linkedAccounts: "Linked accounts",
  logoutConfirm: "Are you sure you want to log out? Your saved data will remain on this device.",
  languagePageSubtitle: "Choose your preferred language. The interface updates instantly and your choice is saved on this device.",
  languageUpdatedTo: "Language updated to",
};

const hi: SettingsPageContent = {
  subtitle: "अपनी भाषा, सुगम्यता, सूचनाएं और खाता कॉन्फ़िगर करें।",
  languageHeading: "भाषा",
  displayLanguage: "प्रदर्शन भाषा",
  accessibilityHeading: "सुगम्यता",
  textSizeSmall: "छोटा",
  textSizeMedium: "मध्यम",
  textSizeLarge: "बड़ा",
  notificationsHeading: "सूचनाएं",
  notificationsLabel: "शिकायत और योजना अपडेट",
  notificationsSub: "स्थिति परिवर्तन के लिए ईमेल और एसएमएस अलर्ट",
  accountSecurityHeading: "खाता और सुरक्षा",
  accountSecurityDesc: "जनमित्र एआई वर्तमान में पासवर्ड रहित है और थर्ड-पार्टी खातों से कनेक्ट नहीं होता है — आपका डेटा इस डिवाइस पर ही रहता है। कोई सुरक्षा प्रश्न है?",
  askAboutSecurity: "खाता सुरक्षा के बारे में पूछें",
  linkedAccounts: "लिंक किए गए खाते",
  logoutConfirm: "क्या आप वाकई लॉग आउट करना चाहते हैं? आपका सहेजा गया डेटा इस डिवाइस पर बना रहेगा।",
  languagePageSubtitle: "अपनी पसंदीदा भाषा चुनें। इंटरफ़ेस तुरंत अपडेट होता है और आपकी पसंद इस डिवाइस पर सहेजी जाती है।",
  languageUpdatedTo: "भाषा बदलकर की गई",
};

const ta: SettingsPageContent = {
  subtitle: "உங்கள் மொழி, அணுகல்தன்மை, அறிவிப்புகள் மற்றும் கணக்கை உள்ளமைக்கவும்.",
  languageHeading: "மொழி",
  displayLanguage: "காட்சி மொழி",
  accessibilityHeading: "அணுகல்தன்மை",
  textSizeSmall: "சிறியது",
  textSizeMedium: "நடுத்தரம்",
  textSizeLarge: "பெரியது",
  notificationsHeading: "அறிவிப்புகள்",
  notificationsLabel: "புகார் & திட்ட புதுப்பிப்புகள்",
  notificationsSub: "நிலை மாற்றங்களுக்கான மின்னஞ்சல் & SMS எச்சரிக்கைகள்",
  accountSecurityHeading: "கணக்கு & பாதுகாப்பு",
  accountSecurityDesc: "ஜன்மித்ரா AI தற்போது கடவுச்சொல் இல்லாதது மற்றும் மூன்றாம் தரப்பு கணக்குகளுடன் இணைக்கப்படவில்லை — உங்கள் தரவு இந்தச் சாதனத்திலேயே இருக்கும். பாதுகாப்பு கேள்வி உள்ளதா?",
  askAboutSecurity: "கணக்கு பாதுகாப்பு பற்றி கேளுங்கள்",
  linkedAccounts: "இணைக்கப்பட்ட கணக்குகள்",
  logoutConfirm: "நீங்கள் நிச்சயமாக வெளியேற விரும்புகிறீர்களா? உங்கள் சேமிக்கப்பட்ட தரவு இந்தச் சாதனத்தில் இருக்கும்.",
  languagePageSubtitle: "உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும். இடைமுகம் உடனடியாகப் புதுப்பிக்கப்படும், உங்கள் தேர்வு இந்தச் சாதனத்தில் சேமிக்கப்படும்.",
  languageUpdatedTo: "மொழி மாற்றப்பட்டது",
};

export const SETTINGS_CONTENT: Record<string, SettingsPageContent> = { en, hi, ta };

export function getSettingsContent(langCode: string): SettingsPageContent {
  return SETTINGS_CONTENT[langCode] ?? SETTINGS_CONTENT.en;
}
