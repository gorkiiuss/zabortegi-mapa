// src/features/landfills/domain/valueObjects/MagnitudeScore.ts

import type { MagnitudeLevel } from "./MagnitudeLevel";

export function getMagnitudeScore(level: MagnitudeLevel | null, inverse: boolean = false): number | null {
    if (!level) return null;

    let baseScore: number;
    switch (level) {
        case "INSIGNIFICANT":
            baseScore = 0.0;
            break;
        case "VERY_LOW":
            baseScore = 0.2;
            break;
        case "LOW":
            baseScore = 0.4;
            break;
        case "MID":
            baseScore = 0.6;
            break;
        case "HIGH":
            baseScore = 0.8;
            break;
        case "VERY_HIGH":
            baseScore = 1.0;
            break;
        default:
            return null;
    }

    return inverse ? 1.0 - baseScore : baseScore;
}
