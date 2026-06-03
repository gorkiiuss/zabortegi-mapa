// src/features/landfills/domain/valueObjects/sampling/SampleType.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const SAMPLE_TYPES = [
    "SURFACE_WATER", "LEACHATE", "SOIL", "GROUND_WATER", "WASTE", "SEDIMENT", "AIR", "OTHER", "UNKNOWN"
] as const;

export type SampleType = typeof SAMPLE_TYPES[number];

export const SampleTypeVO : TranslatableEnumVO<SampleType, SampleType> = {
  hydrate: (value: string | null): SampleType => {
    if (!value) return "UNKNOWN"
    return value as SampleType;
  },
  values: (): readonly SampleType[] => SAMPLE_TYPES,
  getTxKey: function (value: SampleType): string {
    return `domain.vos.sampling.sampling_type.types.${value.toLowerCase()}`
  }
};