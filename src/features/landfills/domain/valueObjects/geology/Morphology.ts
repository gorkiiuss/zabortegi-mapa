// src/features/landfills/domain/valueObjects/geology/Morphology.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const MORPHOLOGY_TYPES = [
    "SLOPE", "THALWEG", "PLAIN", "QUARRY_HOLE", "FLOODPLAIN", "RIVERBED", "CHASM"
] as const;

export type Morphology = typeof MORPHOLOGY_TYPES[number];

export const MorphologyVO : TranslatableEnumVO<Morphology> = {
  hydrate: (value: string | null | undefined): Morphology | null => {
    if (!value) return null;
    return value as Morphology;
  },
  values: (): readonly Morphology[] => MORPHOLOGY_TYPES,
  getTxKey: function (value: Morphology): string {
    return `domain.vos.geology.morphology.types.${value.toLowerCase()}`
  }
};