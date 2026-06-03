// src/features/landfills/domain/valueObjects/geotechniqueCharacteristics/GeotechniqueCharacteristics.ts

import { InspectionStateVO, type InspectionState } from "../InspectionState";
import { MagnitudeLevelVO, type MagnitudeLevel } from "../MagnitudeLevel";
import { getMagnitudeScore } from "../MagnitudeScore";
import { NumberRangeVO, type NumberRange, type NumberRangeParams } from "../NumberRange";
import { FloodPotentialVO, type FloodPotential } from "./FloodPotential";
import { LandCoveringTypeVO, type LandCoveringType } from "./LandCoveringType";
import { SlopeInstabilityProcessesVO, type SlopeInstabilityProcesses } from "./SlopeInstabilityProcesses";

export interface GeotechniqueCharacteristicsHydrateParams {
    hillsideSlope: string | null;
    slopeInstabilityProcesses: string | null;
    wasteMassStabilityLevel: string | null;
    floodPotential: string | null;
    erodibilityLevel: string | null;
    structuralDiscontinuities: string | null;
    coveringState: string | null;
    landCoveringType: string | null;
    landCoveringDescription: string | null;
    coveringMaterialState: string | null;
    coveringMaterialDescription: string | null;
    effectOnExistingStructuresState: string | null;
    elementsUndergoSlippingState: string | null;
}

export interface GeotechniqueCharacteristicsCreateParams {
    hillsideSlope: NumberRangeParams | null;
    slopeInstabilityProcesses: string | null;
    wasteMassStabilityLevel: string | null;
    floodPotential: string | null;
    erodibilityLevel: string | null;
    structuralDiscontinuities: string | null;
    coveringState: string | null;
    landCoveringType: string | null;
    landCoveringDescription: string | null;
    coveringMaterialState: string | null;
    coveringMaterialDescription: string | null;
    effectOnExistingStructuresState: string | null;
    elementsUndergoSlippingState: string | null;
}

export interface GeotechniqueCharacteristics {
    readonly hillsideSlope: NumberRange | null;
    readonly slopeInstabilityProcesses: SlopeInstabilityProcesses | null;
    readonly wasteMassStabilityLevel: MagnitudeLevel | null;
    readonly floodPotential: FloodPotential | null;
    readonly erodibilityLevel: MagnitudeLevel | null;
    readonly structuralDiscontinuities: string | null;
    readonly coveringState: InspectionState | null;
    readonly landCoveringType: LandCoveringType | null;
    readonly landCoveringDescription: string | null;
    readonly coveringMaterialState: InspectionState | null;
    readonly coveringMaterialDescription: string | null;
    readonly effectOnExistingStructuresState: InspectionState | null;
    readonly elementsUndergoSlippingState: InspectionState | null;
    getScore(field: keyof GeotechniqueCharacteristics): number | null;
}

export const GeotechniqueCharacteristicsVO = {
    hydrate(params: GeotechniqueCharacteristicsHydrateParams): GeotechniqueCharacteristics {
        return {
            hillsideSlope: NumberRangeVO.hydrate(params.hillsideSlope),
            slopeInstabilityProcesses: SlopeInstabilityProcessesVO.hydrate(params.slopeInstabilityProcesses),
            wasteMassStabilityLevel: MagnitudeLevelVO.hydrate(params.wasteMassStabilityLevel),
            floodPotential: FloodPotentialVO.hydrate(params.floodPotential),
            erodibilityLevel: MagnitudeLevelVO.hydrate(params.erodibilityLevel),
            structuralDiscontinuities: params.structuralDiscontinuities,
            coveringState: InspectionStateVO.hydrate(params.coveringState),
            landCoveringType: LandCoveringTypeVO.hydrate(params.landCoveringType),
            landCoveringDescription: params.landCoveringDescription,
            coveringMaterialState: InspectionStateVO.hydrate(params.coveringMaterialState),
            coveringMaterialDescription: params.coveringMaterialDescription,
            effectOnExistingStructuresState: InspectionStateVO.hydrate(params.effectOnExistingStructuresState),
            elementsUndergoSlippingState: InspectionStateVO.hydrate(params.elementsUndergoSlippingState),
            getScore(field) {
                if (field === "erodibilityLevel") {
                    return getMagnitudeScore(this.erodibilityLevel);
                }
                if (field === "wasteMassStabilityLevel") {
                    return getMagnitudeScore(this.wasteMassStabilityLevel, true);
                }
                return null;
            }
        }
    },
    create(params: GeotechniqueCharacteristicsCreateParams): GeotechniqueCharacteristics {
        return {
            hillsideSlope: NumberRangeVO.create(params.hillsideSlope),
            slopeInstabilityProcesses: SlopeInstabilityProcessesVO.hydrate(params.slopeInstabilityProcesses),
            wasteMassStabilityLevel: MagnitudeLevelVO.hydrate(params.wasteMassStabilityLevel),
            floodPotential: FloodPotentialVO.hydrate(params.floodPotential),
            erodibilityLevel: MagnitudeLevelVO.hydrate(params.erodibilityLevel),
            structuralDiscontinuities: params.structuralDiscontinuities,
            coveringState: InspectionStateVO.hydrate(params.coveringState),
            landCoveringType: LandCoveringTypeVO.hydrate(params.landCoveringType),
            landCoveringDescription: params.landCoveringDescription,
            coveringMaterialState: InspectionStateVO.hydrate(params.coveringMaterialState),
            coveringMaterialDescription: params.coveringMaterialDescription,
            effectOnExistingStructuresState: InspectionStateVO.hydrate(params.effectOnExistingStructuresState),
            elementsUndergoSlippingState: InspectionStateVO.hydrate(params.elementsUndergoSlippingState),
            getScore(field) {
                if (field === "erodibilityLevel") {
                    return getMagnitudeScore(this.erodibilityLevel);
                }
                if (field === "wasteMassStabilityLevel") {
                    return getMagnitudeScore(this.wasteMassStabilityLevel, true);
                }
                return null;
            }
        }
    }
};