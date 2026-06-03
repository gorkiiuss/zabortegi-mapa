// src/features/landfills/data/mappers/multimediaMapper.ts

import type { MultimediaEntityParams } from "@features/landfills/domain/entities/Multimedia";
import type { LandfillMultimediaDTO } from "../dto/LandfillDetailsDTO";
import { buildMediaPath } from "../utils/mediaUtils";

export function mapMultimediaDTOToDomain(dto: LandfillMultimediaDTO, id: string): MultimediaEntityParams {
    return {
        fileName: dto.file_name,
        filePath: buildMediaPath(id, dto.file_path),
        category: dto.category,
        description: dto.description,
        fileSizeBytes: dto.file_size_bytes,
        uploadedAt: dto.uploaded_at
    }
}