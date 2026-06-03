// src/features/landfills/domain/valueObjects/infrastructure/ExistingMachinery.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const EXISTING_MACHINERY_TYPES = [
    "FREQUENT", "SPORADICALLY", "NONE"
] as const;

export type ExistingMachinery = typeof EXISTING_MACHINERY_TYPES[number];

export const ExistingMachineryVO : TranslatableEnumVO<ExistingMachinery> = {
  hydrate: (value: string | null | undefined): ExistingMachinery | null => {
    if (!value) return null;
    return value as ExistingMachinery;
  },
  values: (): readonly ExistingMachinery[] => EXISTING_MACHINERY_TYPES,
  getTxKey: function (value: ExistingMachinery): string {
    return `domain.vos.infrastructure.existing_machinery.types.${value.toLowerCase()}`
  }
};