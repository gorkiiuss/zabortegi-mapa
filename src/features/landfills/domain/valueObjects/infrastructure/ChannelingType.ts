// src/features/landfills/domain/valueObjects/infrastructure/ChannelingType.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const CHANNELING_TYPES = [
    "OTHER", "LEACHED", "SANITARY"
] as const;

export type ChannelingType = typeof CHANNELING_TYPES[number];

export const ChannelingTypeVO : TranslatableEnumVO<ChannelingType> = {
  hydrate: (value: string | null | undefined): ChannelingType | null => {
    if (!value) return null;
    return value as ChannelingType;
  },
  values: (): readonly ChannelingType[] => CHANNELING_TYPES,
  getTxKey: function (value: ChannelingType): string {
    return `domain.vos.infrastructure.underground_channeling_type.types.${value.toLowerCase()}`
  }
};