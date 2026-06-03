// src/features/landfills/domain/valueObjects/geology/Geology.ts

import { MagnitudeLevelVO, type MagnitudeLevel } from "../MagnitudeLevel";
import { getMagnitudeScore } from "../MagnitudeScore";
import { NumberRangeVO, type NumberRange, type NumberRangeParams } from "../NumberRange";
import { MorphologyVO, type Morphology } from "./Morphology";
import { PermeabilityReasonVO, type PermeabilityReason } from "./PermeabilityReason";
import { SoilTypeVO, type SoilType } from "./SoilType";
import { SuperficialDepositVO, type SuperficialDeposit } from "./SuperficialDeposit";


export interface GeologyHydrateParams {
    lithologycalAndLithostratigraphycalUnits: string | null;
    superficialDeposit: string | null;
    regolithThickness: string | null;
    soilType: string | null;
    morphology: string | null;
    permeabilityLevel: string | null;
    permeabilityReason: string | null;
}

export interface GeologyCreateParams {
    lithologycalAndLithostratigraphycalUnits: string | null;
    superficialDeposit: string | null;
    regolithThickness: NumberRangeParams | null;
    soilType: string | null;
    morphology: string | null;
    permeabilityLevel: string | null;
    permeabilityReason: string | null;
}

export interface Geology {
    readonly lithologycalAndLithostratigraphycalUnits: string | null;
    readonly superficialDeposit: SuperficialDeposit | null;
    readonly regolithThickness: NumberRange | null;
    readonly soilType: SoilType | null;
    readonly morphology: Morphology | null;
    readonly permeabilityLevel: MagnitudeLevel | null;
    readonly permeabilityReason: PermeabilityReason | null;
    getScore(field: keyof Geology): number | null;
}

export const GeologyVO = {
    hydrate: (params: GeologyHydrateParams): Geology => ({
        lithologycalAndLithostratigraphycalUnits: params.lithologycalAndLithostratigraphycalUnits,
        superficialDeposit: SuperficialDepositVO.hydrate(params.superficialDeposit),
        regolithThickness: NumberRangeVO.hydrate(params.regolithThickness),
        soilType: SoilTypeVO.hydrate(params.soilType),
        morphology: MorphologyVO.hydrate(params.morphology),
        permeabilityLevel: MagnitudeLevelVO.hydrate(params.permeabilityLevel),
        permeabilityReason: PermeabilityReasonVO.hydrate(params.permeabilityReason),
        getScore(field) {
            if (field === "permeabilityLevel") {
                return getMagnitudeScore(this.permeabilityLevel);
            }
            return null;
        }
    }),
    create: (params: GeologyCreateParams): Geology => ({
        lithologycalAndLithostratigraphycalUnits: params.lithologycalAndLithostratigraphycalUnits,
        superficialDeposit: SuperficialDepositVO.hydrate(params.superficialDeposit),
        regolithThickness: NumberRangeVO.create(params.regolithThickness),
        soilType: SoilTypeVO.hydrate(params.soilType),
        morphology: MorphologyVO.hydrate(params.morphology),
        permeabilityLevel: MagnitudeLevelVO.hydrate(params.permeabilityLevel),
        permeabilityReason: PermeabilityReasonVO.hydrate(params.permeabilityReason),
        getScore(field) {
            if (field === "permeabilityLevel") {
                return getMagnitudeScore(this.permeabilityLevel);
            }
            return null;
        }
    })
};