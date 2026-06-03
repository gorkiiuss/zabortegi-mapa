// src/features/landfills/domain/valueObjects/humanAndSocialEnvironment/UrbanCalification.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const URBAN_CALIFICATIONS = [
    "RURAL_SETTLEMENTS_ON_NOT_DEVELOPABLE", "URBAN_FOR_ECONOMIC", "SCHEDULED_DEVELOPABLE_FOR_ECONOMIC",
    "GS_OPEN_SPACES", "ECONOMIC_ON_NOT_DEVELOPABLE", "EXTRACTIVE_ACTIVITIES", "RESIDENTIAL_URBAN", 
    "SCHEDULED_DEVELOPABLE_FOR_RESIDENTIAL", "GS_T_AND_C", "GS_PUBLIC_FACILITIES", 
    "UNSCHEDULED_DEVELOPABLE_FOR_RESIDENTIAL", "UNSCHEDULED_DEVELOPABLE_FOR_ECONOMIC", "GS_BASIC_INFRASTRUCTURE"

] as const;

export type UrbanCalification = typeof URBAN_CALIFICATIONS[number];

export const UrbanCalificationVO : TranslatableEnumVO<UrbanCalification> = {
  hydrate: (value: string | null | undefined): UrbanCalification | null => {
    if (!value) return null;
    return value as UrbanCalification;
  },
  values: (): readonly UrbanCalification[] => URBAN_CALIFICATIONS,
  getTxKey: function (value: UrbanCalification): string {
    return `domain.vos.humanAndSocialEnvironment.urban_calification.types.${value.toLowerCase()}`
  }
};