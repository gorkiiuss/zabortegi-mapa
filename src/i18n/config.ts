// src/i18n/config.ts

import es from './locales/es';
import eu from './locales/eu';

export const LOCALES = {
  es: 'es',
  eu: 'eu',
} as const;

export type Language = keyof typeof LOCALES;

export const resources = {
  es,
  eu,
} as const;

export type TxKeyPath = RecursiveKeyOf<typeof es>;

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];