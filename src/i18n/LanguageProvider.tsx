import { createContext, useContext, useEffect, useState } from "react";
import en from "@/data/locales/en.json";
import fr from "@/data/locales/fr.json";
import es from "@/data/locales/es.json";

export type Content = typeof en;

export const languages = {
  en: { label: "English", content: en },
  fr: { label: "Français", content: fr as Content },
  es: { label: "Español", content: es as Content },
} as const;

export type Language = keyof typeof languages;

const defaultLanguage: Language = "en";
const storageKey = "portfolio-language";

const isLanguage = (value: string | null): value is Language =>
  value !== null && value in languages;

function readSavedLanguage() {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function saveLanguage(language: Language) {
  try {
    localStorage.setItem(storageKey, language);
  } catch {
    return;
  }
}

function detectLanguage(): Language {
  const saved = readSavedLanguage();
  if (isLanguage(saved)) return saved;

  for (const browserLanguage of navigator.languages ?? [navigator.language]) {
    const code = browserLanguage.toLowerCase().split("-")[0];
    if (isLanguage(code)) return code;
  }

  return defaultLanguage;
}

type LanguageState = {
  language: Language;
  setLanguage: (language: Language) => void;
  content: Content;
};

const LanguageContext = createContext<LanguageState | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    saveLanguage(newLanguage);
    setLanguageState(newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, content: languages[language].content }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}

export function useContent() {
  return useLanguage().content;
}

export function format(
  template: string,
  values: Record<string, string | number>
) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match
  );
}
