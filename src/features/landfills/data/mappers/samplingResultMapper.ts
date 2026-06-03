// src/features/landfills/data/mappers/samplingResultMapper.ts

import type { SamplingResultParams } from "@features/landfills/domain/valueObjects/sampling/results/SamplingResult";
import type { LandfillSamplingResultDTO } from "../dto/LandfillDetailsDTO";

export function mapSamplingResultDTOToDomain(dto: LandfillSamplingResultDTO): SamplingResultParams {
    return {
        parameterParams: {
            name: dto.parameter.name,
            family: dto.parameter.family,
            legalLimit: dto.parameter.legal_limit
        },
        regulationRef: dto.regulation_ref,
        matrix: dto.matrix,
        resultOperator: dto.result_operator,
        resultValue: dto.result_value,
        alternativeResultValue: dto.alternative_result_value,
        unit: dto.unit
    }
}