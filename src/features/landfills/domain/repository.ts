// src/features/landfills/domain/repository.ts

import type { LandfillDetailsEntity } from "./entities/LandfillDetails";
import type { LandfillSummaryEntity } from "./entities/LandfillSummary";
import type { LandfillVersionEntity } from "./entities/LandfillVersion";

export interface LandfillRepository {
  getSummary(): Promise<LandfillSummaryEntity[]>;
  getDetails(id: string, versionId?: number | null): Promise<LandfillDetailsEntity | null>;
  getVersions(id: string): Promise<LandfillVersionEntity[]>;
}
