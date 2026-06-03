// src/features/landfills/domain/valueObjects/operation/WasteType.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const WASTE_TYPES = [
    "BUILDING", "FIT_FOR_BACKFILLING", "INERT_INDUSTRIAL", "INERTIZIED", "GENERIC"
] as const;

export type WasteType = typeof WASTE_TYPES[number];

export const WasteTypeVO: TranslatableEnumVO<WasteType> = {
  hydrate: (value: string | null | undefined): WasteType | null => {
    if (!value) return null;
    return value as WasteType;
  },
  values: (): readonly WasteType[] => WASTE_TYPES,
  getTxKey: (value: WasteType): string => {
      return `domain.vos.operation.waste_type.types.${value.toLowerCase()}`
  }
};