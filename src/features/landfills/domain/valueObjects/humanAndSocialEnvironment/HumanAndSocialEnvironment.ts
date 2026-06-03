// src/features/landfills/domain/valueObjects/humanAndSocialEnvironment/HumanAndSocialEnvironment.ts

import { NumberRangeVO, type NumberRange, type NumberRangeParams } from "../NumberRange";
import { UrbanCalificationVO, type UrbanCalification } from "./UrbanCalification";
import { UrbanClassificationVO, type UrbanClassification } from "./UrbanClassification";
import { UsageStatusVO, type UsageStatus } from "./UsageStatus";
import { WaterUsageVO, type WaterUsage } from "./WaterUsage";

export interface HumanAndSocialEnvironmentHydrateParams {
    surroundingPopulation: string | null;
    distanceToHousesOrRecreation: string | null;
    nearHousesCount: number | null;
    currentUsageStatus: string | null;
    currentUsageDescription: string | null;
    futureUsages: string | null;
    surfaceWaterUsage: string | null;
    groundWaterUsage: string | null;
    urbanClasification: string | null;
    urbanCalification: string | null;
}

export interface HumanAndSocialEnvironmentCreateParams {
    surroundingPopulation: NumberRangeParams | null;
    distanceToHousesOrRecreation: NumberRangeParams | null;
    nearHousesCount: number | null;
    currentUsageStatus: string | null;
    currentUsageDescription: string | null;
    futureUsages: string | null;
    surfaceWaterUsage: string | null;
    groundWaterUsage: string | null;
    urbanClasification: string | null;
    urbanCalification: string | null;
}

export interface HumanAndSocialEnvironment {
    readonly surroundingPopulation: NumberRange | null;
    readonly distanceToHousesOrRecreation: NumberRange | null;
    readonly nearHousesCount: number | null;
    readonly currentUsageStatus: UsageStatus | null;
    readonly currentUsageDescription: string | null;
    readonly futureUsages: UsageStatus | null;
    readonly surfaceWaterUsage: WaterUsage | null;
    readonly groundWaterUsage: WaterUsage | null;
    readonly urbanClasification: UrbanClassification | null;
    readonly urbanCalification: UrbanCalification | null;
}

export const HumanAndSocialEnvironmentVO = {
    hydrate(params: HumanAndSocialEnvironmentHydrateParams): HumanAndSocialEnvironment {
        return {
            surroundingPopulation: NumberRangeVO.hydrate(params.surroundingPopulation),
            distanceToHousesOrRecreation: NumberRangeVO.hydrate(params.distanceToHousesOrRecreation),
            nearHousesCount: params.nearHousesCount,
            currentUsageStatus: UsageStatusVO.hydrate(params.currentUsageStatus),
            currentUsageDescription: params.currentUsageDescription,
            futureUsages: UsageStatusVO.hydrate(params.futureUsages),
            surfaceWaterUsage: WaterUsageVO.hydrate(params.surfaceWaterUsage),
            groundWaterUsage: WaterUsageVO.hydrate(params.groundWaterUsage),
            urbanClasification: UrbanClassificationVO.hydrate(params.urbanClasification),
            urbanCalification: UrbanCalificationVO.hydrate(params.urbanCalification),
        };
    },
    create(params: HumanAndSocialEnvironmentCreateParams): HumanAndSocialEnvironment {
        return {
            surroundingPopulation: NumberRangeVO.create(params.surroundingPopulation),
            distanceToHousesOrRecreation: NumberRangeVO.create(params.distanceToHousesOrRecreation),
            nearHousesCount: params.nearHousesCount,
            currentUsageStatus: UsageStatusVO.hydrate(params.currentUsageStatus),
            currentUsageDescription: params.currentUsageDescription,
            futureUsages: UsageStatusVO.hydrate(params.futureUsages),
            surfaceWaterUsage: WaterUsageVO.hydrate(params.surfaceWaterUsage),
            groundWaterUsage: WaterUsageVO.hydrate(params.groundWaterUsage),
            urbanClasification: UrbanClassificationVO.hydrate(params.urbanClasification),
            urbanCalification: UrbanCalificationVO.hydrate(params.urbanCalification),
        };
    }
};