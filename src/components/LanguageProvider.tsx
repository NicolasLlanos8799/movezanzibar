"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CONTENT, LANGUAGES, type Copy, type Lang } from "@/lib/content";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Copy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "mz-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restaura la preferencia guardada (o la del navegador) tras la hidratación.
  useEffect(() => {
    let next: Lang | null = null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && (LANGUAGES as readonly string[]).includes(stored)) {
        next = stored as Lang;
      }
    } catch {
      /* storage bloqueado: seguimos con el idioma por defecto */
    }
    if (!next && navigator.language?.toLowerCase().startsWith("sw")) {
      next = "sw";
    }
    if (next) setLangState(next);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* noop */
    }
  }, []);

  // Mantiene el atributo lang del documento en sincronía (SEO + lectores de pantalla).
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "en" ? "sw" : "en"),
      t: CONTENT[lang],
    }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  }
  return ctx;
}
