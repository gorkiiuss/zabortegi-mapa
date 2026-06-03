// src/features/landfills/config/styling.ts

import type { CLPSymbol } from "../domain/valueObjects/CLPSymbol";

const NEUTRAL_COLOR = "hsl(240, 20%, 75%)";

export function getContinuousColor(
  percent: number | null,
  startHue = 60,
  endHue = 0,
  s = 100,
  l = 50
): string {
  if (percent === null) return NEUTRAL_COLOR;
  const safePercent = Math.min(Math.max(percent, 0), 100);
  const hue = startHue + (endHue - startHue) * (safePercent / 100);
  return `hsl(${hue}, ${s}%, ${l}%)`;
}

export function getRiskFillColor(
  score: number | null,
  min = 0,
  max = 100
): string {
  if (score === null) return NEUTRAL_COLOR;
  const percent = ((score - min) / (max - min)) * 100;
  return getContinuousColor(percent);
}

export function getMarkerSize(score: number | null): number {
  if (score === null) return 10;
  return Math.min(Math.max((30 * score / 100) + 10, 10), 40);
}

export interface AlertTagStyles {
  backgroundColor: string;
  color: string;
  borderColor: string;
}

export function getAlertTagStyles(score: number | null): AlertTagStyles {
  if (score === null) {
    return {
      backgroundColor: "hsl(210, 40%, 96%)",
      color: "hsl(210, 40%, 35%)",
      borderColor: "hsl(210, 30%, 85%)",
    };
  }
  const percent = score * 100;
  const hue = Math.max(0, 60 - percent * 1.2);
  return {
    backgroundColor: `hsl(${hue}, 100%, 96%)`,
    color: `hsl(${hue}, 95%, 30%)`,
    borderColor: `hsl(${hue}, 80%, 80%)`,
  };
}

export function getClpIconPath(symbol: CLPSymbol | null | undefined): string | null {
  if (!symbol) return null;
  const base = import.meta.env.BASE_URL;
  return `${base}assets/icons/landfills/clp_${symbol}.svg`;
}
