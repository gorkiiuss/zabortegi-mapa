// src/features/landfills/domain/selectors.ts
import type { LandfillSummary } from "./types";
import type { Landfill } from "./types";

export function isLandfillInBounds(
  landfill: Landfill,
  bounds: [number, number, number, number] | undefined,
): boolean {
  if (!bounds) return true;
  const [south, west, north, east] = bounds;
  const { lat, lng } = landfill.centroid;
  return lat >= south && lat <= north && lng >= west && lng <= east;
}

export function sortRankingByScore(
  items: LandfillSummary[],
): LandfillSummary[] {
  return [...items].sort((a, b) => b.score - a.score);
}

export function filterRankingByQuery(
  items: LandfillSummary[],
  query: string,
): LandfillSummary[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  const matches = (value: string | undefined | null) =>
    (value ?? "").toLowerCase().includes(q);

  return items.filter((item) => {
    const hit =
      matches(item.id) || matches(item.name) || matches(item.municipality);

    if (item.id == null || item.name == null || item.municipality == null) {
      console.warn(
        "[filterRankingByQuery] RankingItem con campos vacíos",
        item,
      );
    }

    return hit;
  });
}

export function getRiskScoreRange(
  landfills: Landfill[],
): { min: number; max: number } | null {
  const scores = landfills
    .filter((l) => l.riskLevel != "unknown")
    .map((l) => l.riskScore)
    .filter((s): s is number => s != null && Number.isFinite(s));

  if (scores.length === 0) return null;

  let min = scores[0];
  let max = scores[0];

  for (const s of scores) {
    if (s < min) min = s;
    if (s > max) max = s;
  }

  return { min, max };
}

export function summarize(landfill: Landfill): LandfillSummary {
  return {
    id: landfill.parcelId ?? "",
    name: landfill.name,
    municipality: landfill.municipality,
    score: landfill.riskScore,
  };
}

export function getTopRiskLandfillIds(
  landfills: Landfill[],
  count: number,
): Set<string> {
  const sorted = landfills
    .filter((l) => l.riskLevel !== "unknown")
    .slice()
    .sort((a, b) => (b.riskScore ?? 0) - (a.riskScore ?? 0));

  const top = sorted.slice(0, count).map((l) => l.parcelId ?? "");
  return new Set(top);
}

export function matchesQuery(landfill: Landfill, query: string): boolean {
  const summary = summarize(landfill);

  const q = query.trim().toLowerCase();
  if (!q) return true;

  const matches = (value: string | undefined | null) =>
    (value ?? "").toLowerCase().includes(q);

  return (
    matches(summary.id) ||
    matches(summary.name) ||
    matches(summary.municipality)
  );
}

export function hasId(landfill: Landfill, id: string): boolean {
  return landfill.parcelId === id;
}
