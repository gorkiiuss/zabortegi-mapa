// src/features/landfills/domain/valueObjects/geotechniqueCharacteristics/FloodPotential.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const FLOOD_POTENTIAL_LEVELS = [
    "NO", "T10", "T100", "T500", "OTHER"
] as const;

export type FloodPotential = typeof FLOOD_POTENTIAL_LEVELS[number];

export const FloodPotentialVO : TranslatableEnumVO<FloodPotential> = {
  hydrate: (value: string | null | undefined): FloodPotential | null => {
    if (!value) return null;
    return value as FloodPotential;
  },
  values: (): readonly FloodPotential[] => FLOOD_POTENTIAL_LEVELS,
  getTxKey: function (value: FloodPotential): string {
    return `domain.vos.geotechnique_characteristics.flood_potential.types.${value.toLowerCase()}`
  }
};