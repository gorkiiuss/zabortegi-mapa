// src/features/landfills/state/selectors.ts

import type { LandfillSummaryEntity } from "../domain/entities/LandfillSummary";

export function isLandfillInBounds(
  landfill: LandfillSummaryEntity,
  bounds: [number, number, number, number] | undefined,
): boolean {
  if (!bounds) return true;
  const [south, west, north, east] = bounds;
  const { lat, lng } = landfill.centroid;
  
  return lat >= south && lat <= north && lng >= west && lng <= east;
}

export function matchesQuery(landfill: LandfillSummaryEntity, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const match = (val?: string | null) => (val ?? "").toLowerCase().includes(q);

  return match(landfill.name) || match(landfill.code) || match(landfill.municipality);
}

export function getTopRiskLandfillIds(
  landfills: LandfillSummaryEntity[],
  count: number,
): Set<string> {
  const sorted = landfills
    .slice() 
    .sort((a, b) => {
      if (a.riskScore == null && b.riskScore == null) return 0;
      if (a.riskScore == null) return 1;
      if (b.riskScore == null) return -1;
      return b.riskScore - a.riskScore;
    });

  const top = sorted.slice(0, count).map((l) => l.id);
  return new Set(top);
}