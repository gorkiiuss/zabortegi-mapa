// src/features/landfills/domain/valueObjects/correctingMeasures/CorrectingMeasures.ts


const CORRECTING_MEASURES = [
    'WASTE_REMOVAL_MANAGEMENT', 'SURFACE_DRAINAGE', 'LEACHATE_C_AND_D_SYSTEMS', 'SURFACE_SEALING',
    'IN_SITU_STABILIZATION', 'GAS_COLLECTION', 'PHYS_CHEM_TREATMENT', 'IMPERMEABLE_BARRIERS',
    'GROUNDWATER_DRAINAGE', 'BIOLOGICAL_TREATMENT', 'OTHER'
] as const;

export type CorrectingMeasures = typeof CORRECTING_MEASURES[number];

export const CorrectingMeasuresVO = {
  hydrate: (value: string | null | undefined): CorrectingMeasures | null => {
    if (!value) return null
    return value as CorrectingMeasures;
  },
  values: (): readonly CorrectingMeasures[] => CORRECTING_MEASURES,
  getTxKey: (value: CorrectingMeasures): string => {
      return `domain.vos.correcting_measures.measures.types.${value.toLowerCase()}`
  }
};