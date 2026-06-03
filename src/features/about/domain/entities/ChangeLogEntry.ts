// src/features/about/domain/entities/ChangeLogEntry.ts

import { type MultilingualText, MultilingualTextVO } from "../valueObjects/MultilingualText";
import { type ChangeLogItem, ChangeLogItemVO } from "../valueObjects/ChangeLogItem";

export interface ChangeLogEntryParams {
  version: string;
  date: string;
  title: { es: string; eu: string };
  items: any[];
  isSnapshot?: boolean;
  targetVersion?: string;
}

export interface ChangeLogEntryEntity {
  readonly version: string;
  readonly date: string;
  readonly title: MultilingualText;
  readonly items: ChangeLogItem[];
  readonly isSnapshot: boolean;
  readonly targetVersion: string | null;
}

export const ChangeLogEntryFactory = {
  hydrate: (params: ChangeLogEntryParams): ChangeLogEntryEntity => {
    return {
      version: params.version,
      date: params.date,
      title: MultilingualTextVO.hydrate(params.title),
      items: Array.isArray(params.items) ? params.items.map(ChangeLogItemVO.hydrate) : [],
      isSnapshot: !!params.isSnapshot,
      targetVersion: params.targetVersion ?? null,
    };
  },
};
