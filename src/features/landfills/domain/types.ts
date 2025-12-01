// src/features/landfills/domain/types.ts

import type * as GeoJSON from "geojson";

export type LandfillId = string;

export type Territory = "Araba" | "Bizkaia" | "Gipuzkoa";

export type LandfillKind =
  | "inert"
  | "hazardous"
  | "industrial"
  | "urban"
  | "mining"
  | "unknown";

export type RiskLevel = "low" | "medium" | "high" | "very-high" | "unknown";

export interface Landfill {
  id: LandfillId;
  parcelId?: string;
  code?: string;

  hasInfo: boolean;
  name: string;
  municipality: string;
  territory: Territory;
  kind: LandfillKind;
  riskScore: number;
  riskLevel: RiskLevel;
  centroid: { lat: number; lng: number };
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon;
  rawProperties?: Record<string, unknown>;
  clpSymbols: ClpSymbol[];
  mainClpSymbol: ClpSymbol | null;
}

export interface LandfillSummary {
  id: string;
  name: string;
  municipality: string;
  score: number;
}

export type ClpSymbol =
  | "acute-toxicity" // GHS06 – calavera
  | "health-hazard" // GHS08 – peligro salud crónico
  | "corrosive" // GHS05
  | "flammable" // GHS02
  | "environmental" // GHS09 – pez+árbol
  | "irritant"; // GHS07 – exclamación
