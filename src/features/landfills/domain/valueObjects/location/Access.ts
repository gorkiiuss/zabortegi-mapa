// src/features/landfills/domain/valueObjects/location/Access.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const ACCESSES = [
    "FREE_ACCESS", "FENCED_OFF", "PARTIALLY_FENCED", "IMPASSABLE_FENCING", "SECURITY_SERVICE", 
    "CHAINED", "IMPASSABLE_DUE_TO_OVERGROWTH", "IMPASSABLE_DUE_TO_SLOPE_TOE", "UNLEASHED_DOGS", 
    "OTHER"
] as const;

export type Access = typeof ACCESSES[number];

export const AccessVO : TranslatableEnumVO<Access> = {
  hydrate: (value: string | null | undefined): Access | null => {
    if (!value) return null;
    return value as Access;
  },
  values: (): readonly Access[] => ACCESSES,
  getTxKey: function (value: Access): string {
    return `domain.vos.location.accesses.types.${value.toLowerCase()}`
  }
};