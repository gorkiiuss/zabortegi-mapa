// src/features/landfills/domain/symbology.ts

import type { ClpSymbol, RiskLevel } from "./types";

const NEUTRAL_COLOR = "#a3a3c9ff";
const NEUTRAL_SIZE = 10;

export function getRiskFillColor(
  level: RiskLevel,
  score: number,
  min: number,
  max: number,
): string {
  if (level == "unknown") return NEUTRAL_COLOR;

  const t = Math.min(Math.max((score - min) / (max - min), 0), 1);

  const start = { r: 0xff, g: 0xff, b: 0x4d };
  const end = { r: 0xff, g: 0x00, b: 0x00 };

  const r = Math.round(start.r + (end.r - start.r) * t);
  const g = Math.round(start.g + (end.g - start.g) * t);
  const b = Math.round(start.b + (end.b - start.b) * t);

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

export function getMarkerSize(
  level: RiskLevel,
  score: number,
  min: number,
  max: number,
): number {
  if (level == "unknown") return NEUTRAL_SIZE;

  const t = Math.min(Math.max((score - min) / (max - min), 0), 1);

  const start = 10;
  const end = 25;

  return start + (end - start) * t;
}

export function getClpIconPath(
  symbol: ClpSymbol | null | undefined,
): string | null {
  if (!symbol) return null;

  const base = import.meta.env.BASE_URL;

  switch (symbol) {
    case "acute-toxicity":
      return `${base}assets/icons/landfills/clp_acute-toxicity.svg`;
    case "health-hazard":
      return `${base}assets/icons/landfills/clp_health-hazard.svg`;
    case "corrosive":
      return `${base}assets/icons/landfills/clp_corrosive.svg`;
    case "flammable":
      return `${base}assets/icons/landfills/clp_flammable.svg`;
    case "environmental":
      return `${base}assets/icons/landfills/clp_environmental.svg`;
    case "irritant":
      return `${base}assets/icons/landfills/clp_irritant.svg`;
    default:
      return null;
  }
}
