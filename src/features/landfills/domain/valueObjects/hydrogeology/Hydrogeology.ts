// src/features/landfills/domain/valueObjects/hydrogeology/Hydrogeology.ts

import { MagnitudeLevelVO, type MagnitudeLevel } from "../MagnitudeLevel";
import { getMagnitudeScore } from "../MagnitudeScore";
import { NumberRangeVO, type NumberRange, type NumberRangeParams } from "../NumberRange";
import { AquiferTypeVO, type AquiferType } from "./AquiferType";

export interface HydrogeologyHydrateParams {
    aquiferType: string | null;
    estimatedDepth: string | null;
    estimatedStreamDirection: string | null;
    vulnerabilityLevel: string | null;
    hydrogeologycalUnit: string | null;
}

export interface HydrogeologyCreateParams {
    aquiferType: string | null;
    estimatedDepth: NumberRangeParams | null;
    estimatedStreamDirection: string | null;
    vulnerabilityLevel: string | null;
    hydrogeologycalUnit: string | null;

}

export interface Hydrogeology {
    readonly aquiferType: AquiferType | null;
    readonly estimatedDepth: NumberRange | null;
    readonly estimatedStreamDirection: string | null;
    readonly vulnerabilityLevel: MagnitudeLevel | null;
    readonly hydrogeologycalUnit: string | null;
    getScore(field: keyof Hydrogeology): number | null;
}

export const HydrogeologyVO = {
    hydrate: (params: HydrogeologyHydrateParams): Hydrogeology => ({
        aquiferType: AquiferTypeVO.hydrate(params.aquiferType),
        estimatedDepth: NumberRangeVO.hydrate(params.estimatedDepth),
        estimatedStreamDirection: params.estimatedStreamDirection,
        vulnerabilityLevel: MagnitudeLevelVO.hydrate(params.vulnerabilityLevel),
        hydrogeologycalUnit: params.hydrogeologycalUnit,
        getScore(field) {
            if (field === "vulnerabilityLevel") {
                return getMagnitudeScore(this.vulnerabilityLevel);
            }
            return null;
        }
    }),
    create: (params: HydrogeologyCreateParams): Hydrogeology => ({
        aquiferType: AquiferTypeVO.hydrate(params.aquiferType),
        estimatedDepth: NumberRangeVO.create(params.estimatedDepth),
        estimatedStreamDirection: params.estimatedStreamDirection,
        vulnerabilityLevel: MagnitudeLevelVO.hydrate(params.vulnerabilityLevel),
        hydrogeologycalUnit: params.hydrogeologycalUnit,
        getScore(field) {
            if (field === "vulnerabilityLevel") {
                return getMagnitudeScore(this.vulnerabilityLevel);
            }
            return null;
        }
    })
};