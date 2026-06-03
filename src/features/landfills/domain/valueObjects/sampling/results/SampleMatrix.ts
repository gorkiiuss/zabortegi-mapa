// src/features/landfills/domain/sampling/results/SampleMatrix.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const SAMPLE_MATRICES = [
    "LIXIVIATE", "SOLID", "WATER", "GAS", "UNKNOWN"
] as const;

export type SampleMatrix = typeof SAMPLE_MATRICES[number];

export const SampleMatrixVO : TranslatableEnumVO<SampleMatrix, SampleMatrix> = {
  hydrate: (value: string | null): SampleMatrix => {
    if (!value) return "UNKNOWN"
    return value as SampleMatrix;
  },
  values: (): readonly SampleMatrix[] => SAMPLE_MATRICES,
  getTxKey: function (value: SampleMatrix): string {
    return `domain.vos.sampling.results.sample_matrix.types.${value.toLowerCase()}`
  }
};