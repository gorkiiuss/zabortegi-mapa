// src/features/landfills/domain/valueObjects/operation/LandfillType.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const LANDFILL_TYPES = [
    "INERT", "INDUSTRIAL", "URBAN", "CO_DISPOSAL", "DUMPING_SOURCE", "DUMPS", "UNKNOWN"
] as const;

export type LandfillType = typeof LANDFILL_TYPES[number];

export const LandfillTypeVO: TranslatableEnumVO<LandfillType, LandfillType> = {
  hydrate: (value: string | null | undefined): LandfillType => {
    if (!value) return "UNKNOWN";
    return value as LandfillType;
  },
  values: (): readonly LandfillType[] => LANDFILL_TYPES,
  getTxKey: (value: LandfillType): string => {
    return `domain.vos.operation.landfill_type.types.${value.toLowerCase()}`
  }
};