// src/features/landfills/domain/valueObjects/OtherImpacts.ts

import { InspectionStateVO, type InspectionState } from "./InspectionState";
import { getInspectionScore } from "./InspectionScore";
import { MagnitudeLevelVO, type MagnitudeLevel } from "./MagnitudeLevel";
import { getMagnitudeScore } from "./MagnitudeScore";

export interface OtherImpactsParams {
    impactDescription: string | null;
    naturalHeritageState: string | null;
    badSmells: string | null;
    particleEmissionState: string | null;
    particleDescription: string | null;
    heavyVehicleTrafficState: string | null;
    rodentAndInsectPresenceState: string | null;
    periodicSituationImpactsState: string | null;
    exploitationLossState: string | null;
    culturalHeritageState: string | null;
    effectsAndImpactsLevel: string | null;
    environmentVisualBasinLevel: string | null;
    whereItsSeenFrom: string | null;
    firesState: string | null;
    firesCause: string | null;
    firesFrequency: string | null;
    paperAndPlasticFlights: string | null;
}

export interface OtherImpacts {
    readonly impactDescription: string | null;
    readonly naturalHeritageState: InspectionState | null;
    readonly badSmells: InspectionState | null;
    readonly particleEmissionState: InspectionState | null;
    readonly particleDescription: string | null;
    readonly heavyVehicleTrafficState: InspectionState | null;
    readonly rodentAndInsectPresenceState: InspectionState | null;
    readonly periodicSituationImpactsState: InspectionState | null;
    readonly exploitationLossState: InspectionState | null;
    readonly culturalHeritageState: InspectionState | null;
    readonly effectsAndImpactsLevel: MagnitudeLevel | null;
    readonly environmentVisualBasinLevel: MagnitudeLevel | null;
    readonly whereItsSeenFrom: string | null;
    readonly firesState: InspectionState | null;
    readonly firesCause: string | null;
    readonly firesFrequency: string | null;
    readonly paperAndPlasticFlights: InspectionState | null;
    getScore(field: keyof OtherImpacts): number | null;
}

export const OtherImpactsVO = {
    hydrate(params: OtherImpactsParams): OtherImpacts {
        return {
            impactDescription: params.impactDescription,
            naturalHeritageState: InspectionStateVO.hydrate(params.naturalHeritageState),
            badSmells: InspectionStateVO.hydrate(params.badSmells),
            particleEmissionState: InspectionStateVO.hydrate(params.particleEmissionState),
            particleDescription: params.particleDescription,
            heavyVehicleTrafficState: InspectionStateVO.hydrate(params.heavyVehicleTrafficState),
            rodentAndInsectPresenceState: InspectionStateVO.hydrate(params.rodentAndInsectPresenceState),
            periodicSituationImpactsState: InspectionStateVO.hydrate(params.periodicSituationImpactsState),
            exploitationLossState: InspectionStateVO.hydrate(params.exploitationLossState),
            culturalHeritageState: InspectionStateVO.hydrate(params.culturalHeritageState),
            effectsAndImpactsLevel: MagnitudeLevelVO.hydrate(params.effectsAndImpactsLevel),
            environmentVisualBasinLevel: MagnitudeLevelVO.hydrate(params.environmentVisualBasinLevel),
            whereItsSeenFrom: params.whereItsSeenFrom,
            firesState: InspectionStateVO.hydrate(params.firesState),
            firesCause: params.firesCause,
            firesFrequency: params.firesFrequency,
            paperAndPlasticFlights: InspectionStateVO.hydrate(params.paperAndPlasticFlights),
            getScore(field) {
                if (field === "effectsAndImpactsLevel" || field === "environmentVisualBasinLevel") {
                    return getMagnitudeScore(this[field]);
                }
                
                const negativeImpactFields: Array<keyof OtherImpacts> = [
                    "naturalHeritageState",
                    "badSmells",
                    "particleEmissionState",
                    "heavyVehicleTrafficState",
                    "rodentAndInsectPresenceState",
                    "periodicSituationImpactsState",
                    "exploitationLossState",
                    "culturalHeritageState",
                    "firesState",
                    "paperAndPlasticFlights"
                ];
                
                if (negativeImpactFields.includes(field)) {
                    return getInspectionScore(this[field] as any);
                }
                
                return null;
            }
        };
    }
};