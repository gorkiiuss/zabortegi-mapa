// src/features/landfills/domain/valueObjects/operation/LicenseCharacteristics.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const LICENSE_CHARACTERISTICS = [
    "NO_LICENSE", "OTHER", "EARTHWORK_INFILL", "INERT_LANDFILL", "NON_HAZARDOUS_LANDFILL", 
    "C_AND_D_INERT_LANDFILL", "TERRAIN_REMODELING", "INERT_INDUSTRIAL_LANDFILL", "INERTIZED_HAZARDOUS_LANDFILL"
] as const;

export type LicenseCharacteristics = typeof LICENSE_CHARACTERISTICS[number];

export const LicenseCharacteristicsVO: TranslatableEnumVO<LicenseCharacteristics> = {
  hydrate: (value: string | null | undefined): LicenseCharacteristics | null => {
    if (!value) return null;
    return value as LicenseCharacteristics;
  },
  values: (): readonly LicenseCharacteristics[] => LICENSE_CHARACTERISTICS,
  getTxKey: (value: LicenseCharacteristics): string => {
    return `domain.vos.operation.license_characteristics.types.${value.toLocaleLowerCase()}`
  }
};