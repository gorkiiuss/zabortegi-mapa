// src/features/landfills/domain/entities/LandfillSummary.ts

import { CLPSymbolVO, type CLPSymbol } from '../valueObjects/CLPSymbol';
import { LandfillCodeVO, type LandfillCode } from '../valueObjects/LandfillCode';
import { HistoricTerritoryVO, type HistoricTerritory } from '../valueObjects/location/HistoricTerritory';

export interface LandfillSummaryParams {
  id: string;
  name: string | null;
  code: string | null;
  geometry: { type: 'MultiPolygon', coordinates: number[][][][] };
  rawRiskPct: number | null;
  centroid: { lat: number, lng: number };
  municipality: string | null;
  mainClpSymbol: string | null;
  historicTerritory: string | null;
}

export interface LandfillSummaryEntity {
  readonly id: string;
  readonly name: string | null;
  readonly code: LandfillCode | null;
  readonly geometry: {
    readonly type: 'MultiPolygon';
    readonly coordinates: number[][][][];
  };
  readonly riskScore: number | null;
  readonly mainClpSymbol: CLPSymbol | null;
  readonly centroid: { lat: number, lng: number };
  readonly municipality: string | null;
  readonly historicTerritory: HistoricTerritory | null;
}

export const LandfillSummaryFactory = {
  hydrate: (params: LandfillSummaryParams): LandfillSummaryEntity => {
    return {
      id: params.id,
      name: params.name,
      code: LandfillCodeVO.hydrate(params.code),
      geometry: params.geometry,
      riskScore: params.rawRiskPct,
      mainClpSymbol: CLPSymbolVO.hydrate(params.mainClpSymbol),
      centroid: params.centroid,
      municipality: params.municipality,
      historicTerritory: HistoricTerritoryVO.hydrate(params.historicTerritory)
    };
  }
};