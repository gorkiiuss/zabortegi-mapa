// src/features/landfills/domain/valueObjects/geotechniqueCharacteristics/LandCoveringType.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const LAND_COVERING_TYPES = [
    "SOIL", "CONSTRUCTION", "CONCRETE", "SEALED"
] as const;

export type LandCoveringType = typeof LAND_COVERING_TYPES[number];

export const LandCoveringTypeVO : TranslatableEnumVO<LandCoveringType> = {
  hydrate: (value: string | null | undefined): LandCoveringType | null => {
    if (!value) return null;
    return value as LandCoveringType;
  },
  values: (): readonly LandCoveringType[] => LAND_COVERING_TYPES,
  getTxKey: function (value: LandCoveringType): string {
    return `domain.vos.geotechnique_characteristics.land_covering_type.types.${value.toLowerCase()}`
  }
};