// src/features/about/domain/repository.ts

import type { AnnouncementEntity } from "./entities/Announcement";
import type { ChangeLogEntryEntity } from "./entities/ChangeLogEntry";

export interface NewsRepository {
  getAnnouncements(): Promise<AnnouncementEntity[]>;
  getChangelog(): Promise<ChangeLogEntryEntity[]>;
}
