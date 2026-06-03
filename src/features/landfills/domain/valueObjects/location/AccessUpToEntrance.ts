// src/features/landfills/domain/valueObjects/location/AccessUpToEntrance.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const ACCESSES_UP_TO_ENTRANCE = ["PASSABLE_FOREST_TRAIL", "URBAN_AREA", "FACTORY_ACCESS", "IMPASSABLE_FOREST_TRAIL", "OTHER"] as const;

export type AccessUpToEntrance = typeof ACCESSES_UP_TO_ENTRANCE[number];

export const AccessUpToEntranceVO : TranslatableEnumVO<AccessUpToEntrance> = {
  hydrate: (value: string | null | undefined): AccessUpToEntrance | null => {
    if (!value) return null;
    return value as AccessUpToEntrance;
  },
  values: (): readonly AccessUpToEntrance[] => ACCESSES_UP_TO_ENTRANCE,
  getTxKey: function (value: AccessUpToEntrance): string {
    return `domain.vos.location.accesses_up_to_entrance.types.${value.toLocaleLowerCase()}`
  }
};