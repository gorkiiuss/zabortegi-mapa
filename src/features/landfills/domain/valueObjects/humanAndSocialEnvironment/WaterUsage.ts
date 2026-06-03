// src/features/landfills/domain/valueObjects/humanAndSocialEnvironment/WaterUsage.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const WATER_USAGES = [
  "NO_USE", "POTABLE", "OTHER", "AGRICULTURE_RANCHING_INDUSTRIAL", "WATERING"
] as const;

export type WaterUsage = typeof WATER_USAGES[number];

export const WaterUsageVO : TranslatableEnumVO<WaterUsage> = {
  hydrate: (value: string | null | undefined): WaterUsage | null => {
    if (!value) return null;
    return value as WaterUsage;
  },
  values: (): readonly WaterUsage[] => WATER_USAGES,
  getTxKey: function (value: WaterUsage): string {
    return `domain.vos.humanAndSocialEnvironment.water_usage_types.${value.toLowerCase()}`
  }
};