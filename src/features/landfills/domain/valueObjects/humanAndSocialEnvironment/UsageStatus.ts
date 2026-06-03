// src/features/landfills/domain/valueObjects/humanAndSocialEnvironment/UsageStatus.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const USAGE_STATUSES = [
    "PUBLIC_OPEN_SPACES", "INDUSTRIAL", "AGRICULTURAL_USE", "RESIDENTIAL", "OPEN_SPACES",
    "MULTI_FAMILY_HOUSING", "COMMERCIAL", "SPORTS", "INFRASTRUCTURE", "EDUCATIONAL", "OTHER"
] as const;

export type UsageStatus = typeof USAGE_STATUSES[number];

export const UsageStatusVO : TranslatableEnumVO<UsageStatus> = {
  hydrate: (value: string | null | undefined): UsageStatus | null => {
    if (!value) return null;
    return value as UsageStatus;
  },
  values: (): readonly UsageStatus[] => USAGE_STATUSES,
  getTxKey: function (value: UsageStatus): string {
    return `domain.vos.humanAndSocialEnvironment.usage_status_types.${value.toLowerCase()}`
  }
};