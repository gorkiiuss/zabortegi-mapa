// src/shared/utils/dateFormatter.ts

import type { Language } from "../../i18n/translations";

export const formatLiteralDate = (
  dateStr: string,
  lang: Language,
  options: { type: 'numeric' | 'long' } = { type: 'numeric' }
): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);

  if (options.type === 'numeric') {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    if (lang === 'eu') {
      return `${year}/${month}/${day}`;
    } else {
      return `${day}/${month}/${year}`;
    }
  }

  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'eu-ES', {
    dateStyle: 'long'
  }).format(date);
};