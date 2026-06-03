// src/features/landfills/domain/valueObjects/version/VersionStatus.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const VERSTION_STATUS_TYPES = [
    "ACTIVE", "ARCHIVED", "PENDING"
] as const;

export type VersionStatus = typeof VERSTION_STATUS_TYPES[number];

export const VersionStatusVO : TranslatableEnumVO<VersionStatus, VersionStatus> = {
  hydrate: (value: string | null): VersionStatus => {
    if (!value) return "PENDING";
    return value as VersionStatus;
  },
  values: (): readonly VersionStatus[] => VERSTION_STATUS_TYPES,
  getTxKey: function (value: VersionStatus): string {
    return `domain.entities.landfill_version.status.types.${value.toLowerCase()}`
  }
};