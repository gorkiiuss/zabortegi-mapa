// src/features/landfills/data/mappers/landfillSummaryMapper.ts

import { type FeatureDTO } from '../dto/LandfillSummaryDTO';
import { type LandfillSummaryParams } from '../../domain/entities/LandfillSummary';

export const mapSummaryFeatureToDomain = (dto: FeatureDTO): LandfillSummaryParams => {
  const { properties, geometry } = dto;

  return {
    id: properties.id,
    name: properties.name,
    code: properties.code,
    geometry: geometry as { type: 'MultiPolygon', coordinates: number[][][][] },
    rawRiskPct: properties.global_risk_pct,
    centroid: {
      lat: properties.centroid.lat,
      lng: properties.centroid.lng
    },
    municipality: properties.municipality,
    mainClpSymbol: properties.main_clp_symbol,
    historicTerritory: properties.historic_territory
  };
};