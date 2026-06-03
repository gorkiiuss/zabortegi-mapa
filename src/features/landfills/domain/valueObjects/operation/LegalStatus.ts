// src/features/landfills/domain/valueObjects/operation/LegalStatus.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const LEGAL_STATUSES = ["NOT_AUTHORIZED", "UNKNOWN", "AUTHORIZED", "SUB_JUDICE"] as const;

export type LegalStatus = typeof LEGAL_STATUSES[number];

export const LegalStatusVO: TranslatableEnumVO<LegalStatus, LegalStatus> = {
  hydrate: (value: string | null): LegalStatus => {
    if (!value) return "UNKNOWN"
    return value as LegalStatus;
  },
  values: (): readonly LegalStatus[] => LEGAL_STATUSES,
  getTxKey: (value: LegalStatus): string => {
    return `domain.vos.operation.legal_status.types.${value.toLowerCase()}`
  }
};