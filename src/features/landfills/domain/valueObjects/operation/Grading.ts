// src/features/landfills/domain/valueObjects/operation/Grading.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const GRADING_TYPES = [
    "HETEROMETRIC", "SANDS", "CLAYS", "BOULDERS", "GRAVELS", "PEBBLES"
] as const;

export type Grading = typeof GRADING_TYPES[number];

export const GradingVO : TranslatableEnumVO<Grading> = {
  hydrate: (value: string | null | undefined): Grading | null => {
    if (!value) return null;
    return value as Grading;
  },
  values: (): readonly Grading[] => GRADING_TYPES,
  getTxKey: function (value: Grading): string {
      return `domain.vos.operation.grading.types.${value.toLocaleLowerCase()}`
  }
};