"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Language = "en" | "es";

type LanguageContextValue = {
  language: Language;
  toggle: () => void;
  setLanguage: (lang: Language) => void;
};

const STORAGE_KEY = "ccu_lang";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        const next = event.newValue === "es" ? "es" : "en";
        setLanguage(next);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      toggle: () => setLanguage((prev) => (prev === "en" ? "es" : "en")),
      setLanguage,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
