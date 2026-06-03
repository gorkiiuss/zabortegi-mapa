// src/features/landfills/domain/valueObjects/operation/ownership/OwnershipType.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const OWNERSHIP_TYPES = [
    "PRIVATE_INDIVIDUAL", "PRIVATE_COMPANY", "PUBLIC_MUNICIPAL", "PUBLIC_MANCOMUNIDAD", 
    "PUBLIC_PROVINCIAL", "PUBLIC_REGIONAL", "PUBLIC_STATE", "UNKNOWN"
] as const;

export type OwnershipType = typeof OWNERSHIP_TYPES[number];

export const OwnershipTypeVO : TranslatableEnumVO<OwnershipType, OwnershipType> = {
  hydrate: (value: string | null | undefined): OwnershipType => {
    if (!value) return "UNKNOWN";
    return value as OwnershipType;
  },
  values: (): readonly OwnershipType[] => OWNERSHIP_TYPES,
  getTxKey: function (value: OwnershipType): string {
      return `domain.vos.operation.ownership.ownership_types.types.${value.toLocaleLowerCase()}`
  }
};