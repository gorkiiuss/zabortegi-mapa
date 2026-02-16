// src/shared/state/languageStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { resources, type Language, type TxKeyPath } from "../../i18n/config";
import { formatLiteralDate } from "../utils/dateFormatter";

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (path: TxKeyPath, params?: Record<string, string | number>) => string;
  formatDate: (dateStr: string, type?: 'numeric' | 'long') => string;
}

const getNestedValue = (obj: any, path: string): string => {
  return path.split(".").reduce((prev, curr) => {
    return prev && prev[curr] !== undefined ? prev[curr] : null;
  }, obj) as string;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: "eu",

      setLanguage: (lang: Language) => set({ currentLanguage: lang }),

      t: (path, params) => {
        const lang = get().currentLanguage;
        const dictionary = resources[lang];
        
        let text = getNestedValue(dictionary, path);

        if (!text && lang !== 'es') {
          console.warn(`Falta traducción para: "${path}" en idioma: "${lang}"`);
          text = getNestedValue(resources['es'], path);
        }

        if (!text) return path;

        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            text = text.replace(new RegExp(`{{${key}}}`, "g"), String(value));
          });
        }
        return text;
      },

      formatDate: (dateStr: string, type: 'numeric' | 'long' = 'numeric') => {
        const lang = get().currentLanguage;
        return formatLiteralDate(dateStr, lang, { type });
      }
    }),
    {
      name: "app-language-storage",
      partialize: (state) => ({ currentLanguage: state.currentLanguage }),
    }
  )
);