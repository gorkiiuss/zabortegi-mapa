// src/features/landfills/domain/valueObjects/faunaAndVegetation/EnvironmentVegetationType.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const ENVIRONMENT_VEGETATION_TYPES = [
    "FOREST_PLANTATIONS", "ATLANTIC_MEADOWS_AND_CROPS", "BROADLEAF_PATCHES", "BROADLEAF_FOREST", 
    "CEREAL_CROPS", "POTATO_AND_BEET_CROPS", "STRAWBERRY_TREE_SHRUBLAND", "GALLERY_FOREST", 
    "FERN_FIELD", "GORSE_SHRUBLAND", "MARKET_GARDENS", "FRUIT_TREES", "TALL_GRASSLAND"
] as const;

export type EnvironmentVegetationType = typeof ENVIRONMENT_VEGETATION_TYPES[number];

export const EnvironmentVegetationTypeVO : TranslatableEnumVO<EnvironmentVegetationType> = {
  hydrate: (value: string | null | undefined): EnvironmentVegetationType | null => {
    if (!value) return null;
    return value as EnvironmentVegetationType;
  },
  values: (): readonly EnvironmentVegetationType[] => ENVIRONMENT_VEGETATION_TYPES,
  getTxKey: function (value: EnvironmentVegetationType): string {
    return `domain.vos.fauna_and_vegetation.environment_vegetation.types.${value.toLowerCase()}`
  }
};