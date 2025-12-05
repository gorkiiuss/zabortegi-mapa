import { create } from "zustand";
import { persist } from "zustand/middleware"; // 1. Importar persist
import { translations, type Language } from "../../i18n/translations";

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
}

const getNestedValue = (obj: any, path: string): string => {
  return (
    path.split(".").reduce((prev, curr) => {
      return prev ? prev[curr] : null;
    }, obj) || path
  );
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: "eu",

      setLanguage: (lang: Language) => set({ currentLanguage: lang }),

      t: (path: string, params?: Record<string, string | number>) => {
        const lang = get().currentLanguage;
        const dictionary = translations[lang];
        let text = getNestedValue(dictionary, path);

        if (params && text) {
          Object.entries(params).forEach(([key, value]) => {
            text = text.replace(new RegExp(`{{${key}}}`, "g"), String(value));
          });
        }

        return text;
      },
    }),
    {
      name: "app-language-storage",
      partialize: (state) => ({ currentLanguage: state.currentLanguage }),
    }
  )
);