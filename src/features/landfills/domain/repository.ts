// src/features/landfills/domain/repository.ts

import type { Landfill } from "./types";

export interface LandfillRepository {
  getAll(): Promise<Landfill[]>;
  getById(id: string): Promise<Landfill | null>;
}
