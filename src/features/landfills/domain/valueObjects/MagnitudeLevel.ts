// src/features/landfills/domain/valueObjects/MagnitudeLevel.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const MAGNITUDE_LEVELS = [
   "INSIGNIFICANT", "VERY_LOW", "LOW", "MID", "HIGH", "VERY_HIGH"
] as const;

export type MagnitudeLevel = typeof MAGNITUDE_LEVELS[number];

export const MagnitudeLevelVO : TranslatableEnumVO<MagnitudeLevel> = {
  hydrate: (value: string | null | undefined): MagnitudeLevel | null => {
    if (!value) return null;
    return value as MagnitudeLevel;
  },
  values: (): readonly MagnitudeLevel[] => MAGNITUDE_LEVELS,
  getTxKey: function (value: MagnitudeLevel): string {
    return `domain.vos.magnitude_level_types.${value.toLowerCase()}`
  }
};