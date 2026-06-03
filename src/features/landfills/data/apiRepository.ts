// src/features/landfills/data/apiRepository.ts

import { type FeatureCollectionDTO } from "./dto/LandfillSummaryDTO";
import { mapSummaryFeatureToDomain } from "./mappers/landfillSummaryMapper";
import { LandfillSummaryFactory, type LandfillSummaryEntity } from "../domain/entities/LandfillSummary";
import { LandfillDetailsFactory, type LandfillDetailsEntity } from "../domain/entities/LandfillDetails";
import type { LandfillRepository } from "../domain/repository";
import type { LandfillDetailsDTO } from "./dto/LandfillDetailsDTO";
import { mapLandfillDetailsDTOToDomain } from "./mappers/landfillDetailsMapper";
import { LandfillVersionFactory, type LandfillVersionEntity } from "../domain/entities/LandfillVersion";
import { mapVersionDTOToDomain } from "./mappers/landfillVersionMapper";
import type { VersionsResponseDTO } from "./dto/LandfillVersionDTO";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const apiLandfillsRepository: LandfillRepository = {
  getSummary: async (): Promise<LandfillSummaryEntity[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/landfills/summary`);
      const dto: FeatureCollectionDTO = await response.json();
      const params = dto.features.map(mapSummaryFeatureToDomain);
      return params.map((params) => LandfillSummaryFactory.hydrate(params));
    } catch (error) {
      console.error("[REPO ERROR]", error);
      throw error;
    }
  },

  getDetails: async (id: string, versionId?: number | null): Promise<LandfillDetailsEntity | null> => {
    try {
      const url = versionId
        ? `${API_BASE_URL}/landfills/${id}/details?version_id=${versionId}`
        : `${API_BASE_URL}/landfills/${id}/details`
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const dto: LandfillDetailsDTO = await response.json();
      const params = mapLandfillDetailsDTOToDomain(dto);
      return LandfillDetailsFactory.hydrate(params)
    } catch (error) {
      console.error("[REPO ERROR]", error);
      throw error;
    }
  },

  getVersions: async (id: string): Promise<LandfillVersionEntity[]> => {
    const response = await fetch(`${API_BASE_URL}/landfills/${id}/versions`)

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data: VersionsResponseDTO = await response.json();
    const dtos = data.versions || [];
    const domainParams = dtos.map(mapVersionDTOToDomain);
    return domainParams.map((params) => LandfillVersionFactory.hydrate(params));
  }
};