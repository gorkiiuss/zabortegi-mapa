// src/features/landfills/domain/valueObjects/hydrogeology/AquiferType.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const AQUIFER_TYPES = [
    "LOW_PERMEABILITY_SYSTEM", "NOT_CONSOLIDATED_DETRITAL", "STRICT_DIRECTION_KARSTIC", 
    "MIXED_KARSTIC", "CONSOLIDATED_DETRITAL", "MIXED_DETRITAL", "DIFFUSED_FLOW_KARSTIC",
    "NO_AQUIFER"

] as const;

export type AquiferType = typeof AQUIFER_TYPES[number];

export const AquiferTypeVO : TranslatableEnumVO<AquiferType> = {
  hydrate: (value: string | null | undefined): AquiferType | null => {
    if (!value) return null;
    return value as AquiferType;
  },
  values: (): readonly AquiferType[] => AQUIFER_TYPES,
  getTxKey: function (value: AquiferType): string {
    return `domain.vos.hydrogeology.aquifer_type.types.${value.toLowerCase()}`
  }
};