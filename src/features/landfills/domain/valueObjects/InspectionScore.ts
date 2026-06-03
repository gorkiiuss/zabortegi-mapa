// src/features/landfills/domain/valueObjects/InspectionScore.ts

import type { InspectionState } from "./InspectionState";

export function getInspectionScore(state: InspectionState | null, isGoodIfYes: boolean = false): number | null {
    if (!state || state === "UNKNOWN") return null;
    
    if (state === "YES") {
        return isGoodIfYes ? 0.0 : 1.0;
    }
    
    if (state === "NO") {
        return isGoodIfYes ? 1.0 : 0.0;
    }
    
    return null;
}
