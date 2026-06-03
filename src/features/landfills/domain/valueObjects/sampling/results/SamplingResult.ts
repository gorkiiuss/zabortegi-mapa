// src/features/landfills/domain/valueObjects/sampling/results/SamplingResult.ts

import { ParameterVO, type Parameter, type ParameterParams } from "./Parameter";
import { ResultOperatorVO, type ResultOperator } from "./ResultOperator";
import { SampleMatrixVO, type SampleMatrix } from "./SampleMatrix";

export interface SamplingResultParams {
    parameterParams: ParameterParams;
    regulationRef: string | null;
    matrix: string;
    resultOperator: string | null;
    resultValue: number;
    alternativeResultValue: string | null;
    unit: string | null;
}

export interface SamplingResult {
    readonly parameter: Parameter;
    readonly regulationRef: string | null;
    readonly matrix: SampleMatrix;
    readonly resultOperator: ResultOperator | null;
    readonly resultValue: number;
    readonly alternativeResultValue: string | null;
    readonly unit: string | null;

}

export const SamplingResultVO = {
    hydrate: (params: SamplingResultParams): SamplingResult => {
        return {
            parameter: ParameterVO.hydrate(params.parameterParams),
            regulationRef: params.regulationRef,
            matrix: SampleMatrixVO.hydrate(params.matrix),
            resultOperator: ResultOperatorVO.hydrate(params.resultOperator),
            resultValue: params.resultValue,
            alternativeResultValue: params.alternativeResultValue,
            unit: params.unit
        }
    },
    create: (params: SamplingResultParams): SamplingResult => {
        return {
            parameter: ParameterVO.hydrate(params.parameterParams),
            regulationRef: params.regulationRef,
            matrix: SampleMatrixVO.hydrate(params.matrix),
            resultOperator: ResultOperatorVO.create(params.resultOperator),
            resultValue: params.resultValue,
            alternativeResultValue: params.alternativeResultValue,
            unit: params.unit
        }
    }
}