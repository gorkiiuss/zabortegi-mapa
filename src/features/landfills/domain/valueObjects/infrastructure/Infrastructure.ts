// src/features/landfills/domain/valueObjects/infrastructure/Infrastructure.ts

import { InspectionStateVO, type InspectionState } from "../InspectionState";
import { NumberRangeVO, type NumberRange, type NumberRangeParams } from "../NumberRange";
import { ChannelingTypeVO, type ChannelingType } from "./ChannelingType";
import { ExistingMachineryVO, type ExistingMachinery } from "./ExistingMachinery";

export interface InfrastructureHydrateParams {
    undergroundChannelingState: string | null;
    undergroundChannelingType: string | null;
    hiredPersonnel: string | null;
    existingMachinery: string | null;
    stormwaterManagement: boolean | null;
    leachateSamplingPointsState: string | null;
    bedWaterproofingState: string | null;
    sideWaterproofingState: string | null;
    peripheralEnclosureState: string | null;
    hedgeState: string | null;
    operationPlanState: string | null;
    closingPlanState: string | null;
}

export interface InfrastructureCreateParams {
    undergroundChannelingState: string | null;
    undergroundChannelingType: string | null;
    hiredPersonnel: NumberRangeParams | null;
    existingMachinery: string | null;
    stormwaterManagement: boolean | null;
    leachateSamplingPointsState: string | null;
    bedWaterproofingState: string | null;
    sideWaterproofingState: string | null;
    peripheralEnclosureState: string | null;
    hedgeState: string | null;
    operationPlanState: string | null;
    closingPlanState: string | null;
}

export interface Infrastructure {
    readonly undergroundChannelingState: InspectionState | null;
    readonly undergroundChannelingType: ChannelingType | null;
    readonly hiredPersonnel: NumberRange | null;
    readonly existingMachinery: ExistingMachinery | null;
    readonly stormwaterManagement: boolean | null;
    readonly leachateSamplingPointsState: InspectionState | null;
    readonly bedWaterproofingState: InspectionState | null;
    readonly sideWaterproofingState: InspectionState | null;
    readonly peripheralEnclosureState: InspectionState | null;
    readonly hedgeState: InspectionState | null;
    readonly operationPlanState: InspectionState | null;
    readonly closingPlanState: InspectionState | null;
}

export const InfrastructureVO = {
    hydrate: (params: InfrastructureHydrateParams): Infrastructure => {
        return {
            undergroundChannelingState: InspectionStateVO.hydrate(params.undergroundChannelingState),
            undergroundChannelingType: ChannelingTypeVO.hydrate(params.undergroundChannelingType),
            hiredPersonnel: NumberRangeVO.hydrate(params.hiredPersonnel),
            existingMachinery: ExistingMachineryVO.hydrate(params.existingMachinery),
            stormwaterManagement: params.stormwaterManagement,
            leachateSamplingPointsState: InspectionStateVO.hydrate(params.leachateSamplingPointsState),
            bedWaterproofingState: InspectionStateVO.hydrate(params.bedWaterproofingState),
            sideWaterproofingState: InspectionStateVO.hydrate(params.sideWaterproofingState),
            peripheralEnclosureState: InspectionStateVO.hydrate(params.peripheralEnclosureState),
            hedgeState: InspectionStateVO.hydrate(params.hedgeState),
            operationPlanState: InspectionStateVO.hydrate(params.operationPlanState),
            closingPlanState: InspectionStateVO.hydrate(params.closingPlanState)
        }
    },
    create: (params: InfrastructureCreateParams): Infrastructure => {
        return {
            undergroundChannelingState: InspectionStateVO.hydrate(params.undergroundChannelingState),
            undergroundChannelingType: ChannelingTypeVO.hydrate(params.undergroundChannelingType),
            hiredPersonnel: NumberRangeVO.create(params.hiredPersonnel),
            existingMachinery: ExistingMachineryVO.hydrate(params.existingMachinery),
            stormwaterManagement: params.stormwaterManagement,
            leachateSamplingPointsState: InspectionStateVO.hydrate(params.leachateSamplingPointsState),
            bedWaterproofingState: InspectionStateVO.hydrate(params.bedWaterproofingState),
            sideWaterproofingState: InspectionStateVO.hydrate(params.sideWaterproofingState),
            peripheralEnclosureState: InspectionStateVO.hydrate(params.peripheralEnclosureState),
            hedgeState: InspectionStateVO.hydrate(params.hedgeState),
            operationPlanState: InspectionStateVO.hydrate(params.operationPlanState),
            closingPlanState: InspectionStateVO.hydrate(params.closingPlanState)
        }
    }
}