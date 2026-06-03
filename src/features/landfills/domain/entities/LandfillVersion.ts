// src/features/landfills/domain/entities/LandfillVersion.ts

import { VersionStatusVO, type VersionStatus } from "../valueObjects/version/VersionStatus";

export interface LandfillVersionParams {
  versionId: number;
  versionNumber: number;
  status: string;
  createdBy: number;
  changeSummary: string | null;
  createdAt: string | null;
  reviewedBy: string | null;
  reviewNotes: string | null;
  reviewedAt: string | null;
}

export interface LandfillVersionEntity {
  readonly versionId: number;
  readonly versionNumber: number;
  readonly status: VersionStatus;
  readonly createdBy: number; // TODO When adding users this will be a user
  readonly changeSummary: string | null;
  readonly createdAt: Date | null;
  readonly reviewedBy: string | null;
  readonly reviewNotes: string | null;
  readonly reviewedAt: Date | null;
}

export const LandfillVersionFactory = {
  hydrate: (params: LandfillVersionParams): LandfillVersionEntity => ({
    versionId: params.versionId,
    versionNumber: params.versionNumber,
    status: VersionStatusVO.hydrate(params.status),
    createdBy: params.createdBy,
    changeSummary: params.changeSummary,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    reviewedBy: params.reviewedBy,
    reviewNotes: params.reviewNotes,
    reviewedAt: params.reviewedAt ? new Date(params.reviewedAt) : null
  })
};