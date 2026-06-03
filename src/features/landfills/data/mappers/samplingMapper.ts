// src/features/landfills/data/mappers/samplingMapper.ts

import type { LandfillSamplingDTO } from "@features/landfills/data/dto/LandfillDetailsDTO";
import type { SamplingEntityParams } from "../../domain/entities/Sampling";
import { mapSamplingResultDTOToDomain } from "./samplingResultMapper";

export function mapSamplingDTOToDomain(dto: LandfillSamplingDTO): SamplingEntityParams {
    return {
        id: dto.id,
        description: dto.description,
        samplingDate: dto.sampling_date,
        sampleType: dto.sample_type,
        location: dto.location,
        resultParams: dto.results ? 
            dto.results.map(mapSamplingResultDTOToDomain)
            : null
    }
}