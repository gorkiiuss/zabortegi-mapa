// src/features/landfills/components/details/fullDetails/parseDisplay.ts

import type { ViewableEnumVO } from "@shared/domain/interfaces/ViewableEnumVO";
import type { TxKeyPath } from "i18n/config";

export function formatNumberRange(range: { min: number | null, max: number | null } | null): string | null {
  if (!range) return null;
  const { min, max } = range;
  if (min === null && max === null) return null;
  if (min !== null && max !== null) return `${min} - ${max}`;
  if (min !== null) return `> ${min}`;
  if (max !== null) return `< ${max}`;
  return null;
}

export function parseDisplay(
  rawValue: any,
  enumVO: ViewableEnumVO | null,
  contextObj: any,
  t: (key: TxKeyPath, options?: any) => string,
  formatSeparatedDate: (y: string, m: string, d: string) => string
): string | null {
  if (rawValue == null || rawValue === "") {
    return null;
  }
  if (typeof rawValue === "object" && rawValue !== null && rawValue._type === "NumberRange") {
    return formatNumberRange(rawValue);
  }
  if (rawValue instanceof Function) {
    return parseDisplay(rawValue.call(contextObj), enumVO, contextObj, t, formatSeparatedDate);
  }
  if (rawValue instanceof Date) {
    const yyyy = String(rawValue.getFullYear());
    const mm = String(rawValue.getMonth() + 1).padStart(2, '0');
    const dd = String(rawValue.getDate()).padStart(2, '0');
    return formatSeparatedDate(yyyy, mm, dd);
  }
  if (typeof rawValue === "boolean") {
    return rawValue ? t("domain.boolean.yes" as TxKeyPath) : t("domain.boolean.no" as TxKeyPath);
  }
  if (Array.isArray(rawValue)) {
    if (rawValue.length === 0) return null;
    return rawValue
      .map((v) => parseDisplay(v, enumVO, contextObj, t, formatSeparatedDate))
      .filter(Boolean)
      .join(", ");
  }
  if (enumVO && typeof rawValue === "string") {
    return t(enumVO.getTxKey(rawValue) as TxKeyPath);
  }
  if (typeof rawValue === "object" && "toDisplayString" in rawValue) {
    return rawValue.toDisplayString();
  }
  return String(rawValue);
}
