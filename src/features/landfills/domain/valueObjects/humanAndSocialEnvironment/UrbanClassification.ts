// src/features/landfills/domain/valueObjects/humanAndSocialEnvironment/UrbanClassification.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const URBAN_CLASSIFICATIONS = [
    'NOT_DEVELOPABLE', 'DEVELOPABLE', 'URBAN'
] as const;

export type UrbanClassification = typeof URBAN_CLASSIFICATIONS[number];

export const UrbanClassificationVO : TranslatableEnumVO<UrbanClassification> = {
  hydrate: (value: string | null | undefined): UrbanClassification | null => {
    if (!value) return null;
    return value as UrbanClassification;
  },
  values: (): readonly UrbanClassification[] => URBAN_CLASSIFICATIONS,
  getTxKey: function (value: UrbanClassification): string {
    return `domain.vos.humanAndSocialEnvironment.urban_clasification.types.${value.toLowerCase()}`
  }
};