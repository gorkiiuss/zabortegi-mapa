// src/features/landfills/domain/valueObjects/geology/SoilType.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const SOIL_TYPES = [
    "DYSTRIC_CAMBISOL", "EUTRIC_CAMBISOL", "NO_SOIL"
] as const;

export type SoilType = typeof SOIL_TYPES[number];

export const SoilTypeVO : TranslatableEnumVO<SoilType> = {
  hydrate: (value: string | null | undefined): SoilType | null => {
    if (!value) return null;
    return value as SoilType;
  },
  values: (): readonly SoilType[] => SOIL_TYPES,
  getTxKey: function (value: SoilType): string {
    return `domain.vos.geology.soil_type.types.${value.toLowerCase()}`
  }
};