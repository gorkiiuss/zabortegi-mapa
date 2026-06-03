// src/features/landfills/domain/entities/Sampling.ts

import { SamplingResultVO, type SamplingResult, type SamplingResultParams } from "../valueObjects/sampling/results/SamplingResult";
import { SampleTypeVO, type SampleType } from "../valueObjects/sampling/SampleType";

export interface SamplingEntityParams {
    id: string;
    description: string;
    samplingDate: string;
    sampleType: string;
    location: string;
    resultParams: SamplingResultParams[] | null;
}

export interface SamplingEntity {
    readonly id: string;
    readonly description: string;
    readonly samplingDate: Date;
    readonly sampleType: SampleType;
    readonly location: string;
    readonly results: SamplingResult[] | null;
}

export const SamplingEntityFactory = {
    hydrate: (params: SamplingEntityParams): SamplingEntity => {
        return {
            id: params.id,
            description: params.description,
            samplingDate: new Date(params.samplingDate),
            sampleType: SampleTypeVO.hydrate(params.sampleType),
            location: params.location,
            results: params.resultParams ? params.resultParams.map(result => SamplingResultVO.hydrate(result)) : null
        }
    },
    create: (params: SamplingEntityParams): SamplingEntity => {
        return {
            id: params.id,
            description: params.description,
            samplingDate: new Date(params.samplingDate),
            sampleType: SampleTypeVO.hydrate(params.sampleType),
            location: params.location,
            results: params.resultParams ? params.resultParams.map(result => SamplingResultVO.create(result)) : null
        }
    }
}