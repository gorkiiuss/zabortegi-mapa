// src/features/landfills/domain/valueObjects/location/HistoricTerritory.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const HISTORIC_TERRITORIES = ["ARABA", "BIZKAIA", "GIPUZKOA"] as const;

export type HistoricTerritory = typeof HISTORIC_TERRITORIES[number];

export const HistoricTerritoryVO : TranslatableEnumVO<HistoricTerritory> = {
  hydrate: (value: string | null | undefined): HistoricTerritory | null => {
    if (!value) return null;
    return value as HistoricTerritory;
  },
  values: (): readonly HistoricTerritory[] => HISTORIC_TERRITORIES,
  getTxKey: function (value: HistoricTerritory): string {
    return `domain.vos.location.historic_territory.types.${value.toLocaleLowerCase()}`
  }
};