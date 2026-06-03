// src/features/about/data/mappers/newsMapper.ts

import type { AnnouncementEntity } from "../../domain/entities/Announcement";
import { AnnouncementFactory } from "../../domain/entities/Announcement";
import type { ChangeLogEntryEntity } from "../../domain/entities/ChangeLogEntry";
import { ChangeLogEntryFactory } from "../../domain/entities/ChangeLogEntry";
import type { AnnouncementDTO, ChangeLogEntryDTO } from "../dto/NewsDTO";

export function mapAnnouncementDTOToDomain(dto: AnnouncementDTO): AnnouncementEntity {
  return AnnouncementFactory.hydrate(dto);
}

export function mapChangelogDTOToDomain(dto: ChangeLogEntryDTO): ChangeLogEntryEntity {
  return ChangeLogEntryFactory.hydrate(dto);
}
