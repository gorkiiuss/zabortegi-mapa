// src/features/landfills/domain/valueObjects/hydrology/Hydrology.ts

import { InspectionStateVO, type InspectionState } from "../InspectionState";
import { NumberRangeVO, type NumberRange, type NumberRangeParams } from "../NumberRange";
import { StreamDirectionVO, type StreamDirection } from "./StreamDirection";

export interface HydrologyHydrateParams {
    annualPrecipitation: string | null;
    effectiveRainfall: string | null;
    drainageSystem: string | null;
    nearWaterAbstraction: string | null;
    distanceToNearestWatercourse: string | null;
    waterAbstractionType: string | null;
    streamDirection: string;
    distance: string | null;
    crossingWatercourseState: string | null;
    underlyingWatercourseState: string | null;
    streamName: string | null;
}

export interface HydrologyCreateParams {
    annualPrecipitation: NumberRangeParams | null;
    effectiveRainfall: NumberRangeParams | null;
    drainageSystem: string | null;
    nearWaterAbstraction: string | null;
    distanceToNearestWatercourse: NumberRangeParams | null;
    waterAbstractionType: string | null;
    streamDirection: string;
    distance: NumberRangeParams | null;
    crossingWatercourseState: string | null;
    underlyingWatercourseState: string | null;
    streamName: string | null;
}

export interface Hydrology {
    readonly annualPrecipitation: NumberRange | null;
    readonly effectiveRainfall: NumberRange | null;
    readonly drainageSystem: string | null;
    readonly nearWaterAbstraction: InspectionState | null;
    readonly distanceToNearestWatercourse: NumberRange | null;
    readonly waterAbstractionType: string | null;
    readonly streamDirection: StreamDirection;
    readonly distance: NumberRange | null;
    readonly crossingWatercourseState: InspectionState | null;
    readonly underlyingWatercourseState: InspectionState | null;
    readonly streamName: string | null;
}

export const HydrologyVO = {
    hydrate: (params: HydrologyHydrateParams): Hydrology => {
        return {
            annualPrecipitation: NumberRangeVO.hydrate(params.annualPrecipitation),
            effectiveRainfall: NumberRangeVO.hydrate(params.effectiveRainfall),
            drainageSystem: params.drainageSystem,
            nearWaterAbstraction: InspectionStateVO.hydrate(params.nearWaterAbstraction),
            distanceToNearestWatercourse: NumberRangeVO.hydrate(params.distanceToNearestWatercourse),
            waterAbstractionType: params.waterAbstractionType,
            streamDirection: StreamDirectionVO.hydrate(params.streamDirection),
            distance: NumberRangeVO.hydrate(params.distance),
            crossingWatercourseState: InspectionStateVO.hydrate(params.crossingWatercourseState),
            underlyingWatercourseState: InspectionStateVO.hydrate(params.underlyingWatercourseState),
            streamName: params.streamName
        }
    },
    create: (params: HydrologyCreateParams): Hydrology => {
        return {
            annualPrecipitation: NumberRangeVO.create(params.annualPrecipitation),
            effectiveRainfall: NumberRangeVO.create(params.effectiveRainfall),
            drainageSystem: params.drainageSystem,
            nearWaterAbstraction: InspectionStateVO.hydrate(params.nearWaterAbstraction),
            distanceToNearestWatercourse: NumberRangeVO.create(params.distanceToNearestWatercourse),
            waterAbstractionType: params.waterAbstractionType,
            streamDirection: StreamDirectionVO.hydrate(params.streamDirection),
            distance: NumberRangeVO.create(params.distance),
            crossingWatercourseState: InspectionStateVO.hydrate(params.crossingWatercourseState),
            underlyingWatercourseState: InspectionStateVO.hydrate(params.underlyingWatercourseState),
            streamName: params.streamName
        }
    }
};