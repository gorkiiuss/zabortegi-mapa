// src/features/landfills/domain/valueObjects/operation/WasteLayout.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const WASTE_LAYOUTS = [
    "ON_A_SLOPE", "IN_A_THALWEG", "ON_A_PLAIN", "QUARRY_BACKFILL", "ADJACENT_TO_WATERCOURSE",
    "FLOOD_ZONE", "MIXED", "IN_SEGREGATED_AREAS", "NEAR_POPULATED_AREAS", "PROGRADING"
] as const;

export type WasteLayout = typeof WASTE_LAYOUTS[number];

export const WasteLayoutVO : TranslatableEnumVO<WasteLayout> = {
  hydrate: (value: string | null | undefined): WasteLayout | null => {
    if (!value) return null;
    return value as WasteLayout;
  },
  values: (): readonly WasteLayout[] => WASTE_LAYOUTS,
  getTxKey: function (value: WasteLayout): string {
      return `domain.vos.operation.waste_layout.types.${value.toLocaleLowerCase()}`
  }
};