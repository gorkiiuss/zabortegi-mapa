// src/features/landfills/domain/valueObjects/operation/WasteComponent.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const WASTE_COMPONENTS = [
  "NO_WASTE_OBSERVED",
  "EARTH_AND_ROCKS",
  "CONSTRUCTION_DEBRIS",

  "PESTICIDES_AND_POPS",
  "OILS_AND_FATS",
  "SLUDGES_AND_ASHES",
  "METALLURGICAL_WASTE",
  "TYRES_AND_RUBBER",
  "PAINTS_AND_SOLVENTS",
  "WOOD_AND_VEGETATION",
  "PAPER_AND_CELLULOSE",
  "URBAN_WASTE_RSU",
  "ASBESTOS_URALITE",

  "POWDER_WASTE",

  "DRUMS_AND_CONTAINERS",
  "LIQUIDS",
  "OTHER"
] as const;

export type WasteComponent = typeof WASTE_COMPONENTS[number];

export const WasteComponentVO: TranslatableEnumVO<WasteComponent> = {
  hydrate: (value: string | null | undefined): WasteComponent | null => {
    if (!value) return null;
    return value as WasteComponent;
  },
  values: (): readonly WasteComponent[] => WASTE_COMPONENTS,
  getTxKey: function (value: WasteComponent): string {
    return `domain.vos.operation.waste_components.types.${value.toLocaleLowerCase()}`
  }
};