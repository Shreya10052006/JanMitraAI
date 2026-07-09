"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { LANGUAGES } from "@/lib/mock-data";
import { getSavedLanguage, saveLanguage } from "@/services/storage";
import { TRANSLATIONS, type TranslationKey } from "@/lib/i18n/translations";
import type { Language } from "@/types";

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  languages: Language[];
  /** Look up a static UI-chrome translation for the current language, falling back to English. */
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Starts at the default (English) on both server and first client render,
  // then swaps to the saved language after mount — reading localStorage
  // synchronously here would desync server/client output and trigger a
  // hydration mismatch once language actually changes visible text.
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);

  useEffect(() => {
    const savedCode = getSavedLanguage();
    const saved = LANGUAGES.find((l) => l.code === savedCode);
    if (saved && saved.code !== LANGUAGES[0].code) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentLanguage(saved);
    }
  }, []);

  const setLanguage = useCallback((language: Language) => {
    setCurrentLanguage(language);
    saveLanguage(language.code);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const dict = TRANSLATIONS[currentLanguage.code] ?? TRANSLATIONS.en;
      return dict[key] ?? TRANSLATIONS.en[key] ?? key;
    },
    [currentLanguage.code]
  );

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setLanguage, languages: LANGUAGES, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
