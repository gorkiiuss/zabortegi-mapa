// src/features/landfills/domain/valueObjects/geology/SuperficialDeposit.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const SUPERFICIAL_DEPOSIT_TYPES = [
    "NONE", "ELUVIUM", "ALLUVIUM", "ARTIFICIAL_BACKFILLING", "COLLUVIUM", "FLUVIO_MARINE", "MIXED_OR_POLYGENIC", "ALLUVIOCOLLUVIUM", "KARST", "MARINE", "UNKNOWN"
] as const;

export type SuperficialDeposit = typeof SUPERFICIAL_DEPOSIT_TYPES[number];

export const SuperficialDepositVO : TranslatableEnumVO<SuperficialDeposit> = {
  hydrate: (value: string | null | undefined): SuperficialDeposit | null => {
    if (!value) return null;
    return value as SuperficialDeposit;
  },
  values: (): readonly SuperficialDeposit[] => SUPERFICIAL_DEPOSIT_TYPES,
  getTxKey: function (value: SuperficialDeposit): string {
    return `domain.vos.geology.superficial_deposit.types.${value.toLowerCase()}`
  }
};