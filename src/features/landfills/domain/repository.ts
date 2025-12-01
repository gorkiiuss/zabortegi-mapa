// src/features/landfills/domain/repository.ts

import type { Landfill, LandfillId } from "./types";

export interface LandfillRepository {
  getAll(): Promise<Landfill[]>;
  getById(id: LandfillId): Promise<Landfill | null>;
}
