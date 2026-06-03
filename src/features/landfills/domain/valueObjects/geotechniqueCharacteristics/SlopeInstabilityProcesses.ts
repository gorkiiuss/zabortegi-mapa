// src/features/landfills/domain/valueObjects/geotechniqueCharacteristics/SlopeInstabilityProcesses.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const SLOPE_INSTABILITY_PROCESSES = [
    "NO", "SLIDINGS", "LANDSLIDES", "DOWNHILL_CREEP", "AVALANCHE"
] as const;

export type SlopeInstabilityProcesses = typeof SLOPE_INSTABILITY_PROCESSES[number];

export const SlopeInstabilityProcessesVO : TranslatableEnumVO<SlopeInstabilityProcesses> = {
  hydrate: (value: string | null | undefined): SlopeInstabilityProcesses | null => {
    if (!value) return null;
    return value as SlopeInstabilityProcesses;
  },
  values: (): readonly SlopeInstabilityProcesses[] => SLOPE_INSTABILITY_PROCESSES,
  getTxKey: function (value: SlopeInstabilityProcesses): string {
    return `domain.vos.geotechnique_characteristics.slope_instability_processes.types.${value.toLowerCase()}`
  }
};