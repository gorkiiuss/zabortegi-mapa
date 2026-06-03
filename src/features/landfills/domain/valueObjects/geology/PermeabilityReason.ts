// src/features/landfills/domain/valueObjects/geology/PermeabilityReason.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const PERMEABILITY_REASONS = [
    "FOR_POROSITY", "FOR_CRACKING"
] as const;

export type PermeabilityReason = typeof PERMEABILITY_REASONS[number];

export const PermeabilityReasonVO : TranslatableEnumVO<PermeabilityReason> = {
  hydrate: (value: string | null | undefined): PermeabilityReason | null => {
    if (!value) return null;
    return value as PermeabilityReason;
  },
  values: (): readonly PermeabilityReason[] => PERMEABILITY_REASONS,
  getTxKey: function (value: PermeabilityReason): string {
    return `domain.vos.geology.permeability_reason.types.${value.toLowerCase()}`
  }
};