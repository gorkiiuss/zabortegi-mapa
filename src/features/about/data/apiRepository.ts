// src/features/about/data/apiRepository.ts

import type { NewsRepository } from "../domain/repository";
import type { AnnouncementEntity } from "../domain/entities/Announcement";
import type { ChangeLogEntryEntity } from "../domain/entities/ChangeLogEntry";
import type { AnnouncementDTO, ChangeLogEntryDTO } from "./dto/NewsDTO";
import { mapAnnouncementDTOToDomain, mapChangelogDTOToDomain } from "./mappers/newsMapper";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const apiNewsRepository: NewsRepository = {
  getAnnouncements: async (): Promise<AnnouncementEntity[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/announcements`);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const dtoList: AnnouncementDTO[] = await response.json();
      return dtoList.map(mapAnnouncementDTOToDomain);
    } catch (error) {
      console.error("[NEWS REPO ERROR] getAnnouncements:", error);
      throw error;
    }
  },

  getChangelog: async (): Promise<ChangeLogEntryEntity[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/changelog`);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const dtoList: ChangeLogEntryDTO[] = await response.json();
      return dtoList.map(mapChangelogDTOToDomain);
    } catch (error) {
      console.error("[NEWS REPO ERROR] getChangelog:", error);
      throw error;
    }
  },
};
