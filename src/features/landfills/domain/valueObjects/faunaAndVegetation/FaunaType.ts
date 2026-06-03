// src/features/landfills/domain/valueObjects/faunaAndVegetation/FaunaType.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const FAUNA_TYPES = [
    "AVIFAUNA", "SMALL_VERTEBRATES", "LIVESTOCK", "LARGE_VERTEBRATES", "RODENTS"
] as const;

export type FaunaType = typeof FAUNA_TYPES[number];

export const FaunaTypeVO : TranslatableEnumVO<FaunaType> = {
  hydrate: (value: string | null | undefined): FaunaType | null => {
    if (!value) return null;
    return value as FaunaType;
  },
  values: (): readonly FaunaType[] => FAUNA_TYPES,
  getTxKey: function (value: FaunaType): string {
    return `domain.vos.fauna_and_vegetation.fauna_type.types.${value.toLowerCase()}`
  }
};