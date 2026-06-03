// src/features/landfills/data/mappers/landfillVersionMapper.ts

import { type LandfillVersionDTO } from '../dto/LandfillVersionDTO';
import { type LandfillVersionParams } from '../../domain/entities/LandfillVersion';

export const mapVersionDTOToDomain = (dto: LandfillVersionDTO): LandfillVersionParams => {
  return {
    versionId: dto.version_id,
    versionNumber: dto.version_number,
    status: dto.status,
    createdBy: dto.created_by,
    changeSummary: dto.change_summary,
    createdAt: dto.created_at,
    reviewedBy: dto.reviewed_by,
    reviewNotes: dto.review_notes,
    reviewedAt: dto.reviewed_at
  };
};