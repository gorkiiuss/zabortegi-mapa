// src/features/landfills/domain/valueObjects/operation/WasteLegalCategory.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const WASTE_LEGAL_CATEGORIES = [
    "NO_HAZARDOUS", "INERT", "HAZARDOUS"
] as const;

export type WasteLegalCategory = typeof WASTE_LEGAL_CATEGORIES[number];

export const WasteLegalCategoryVO: TranslatableEnumVO<WasteLegalCategory> = {
  hydrate: (value: string | null | undefined): WasteLegalCategory | null => {
    if (!value) return null;
    return value as WasteLegalCategory;
  },
  values: (): readonly WasteLegalCategory[] => WASTE_LEGAL_CATEGORIES,
  getTxKey: (value: WasteLegalCategory): string => {
      return `domain.vos.operation.waste_legal_category.types.${value.toLowerCase()}`
  }
};