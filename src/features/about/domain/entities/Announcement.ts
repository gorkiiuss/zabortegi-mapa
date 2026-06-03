// src/features/about/domain/entities/Announcement.ts

import { type MultilingualText, MultilingualTextVO } from "../valueObjects/MultilingualText";
import { type Widget, WidgetVO } from "../valueObjects/Widget";
import { type Attachment, AttachmentVO } from "../valueObjects/Attachment";

export interface AnnouncementParams {
  id: string;
  date: string;
  active: boolean;
  title: { es: string; eu: string };
  content: { es: string; eu: string };
  widgets?: any[];
  attachments?: any[];
  relatedLandfillIds?: string[];
}

export interface AnnouncementEntity {
  readonly id: string;
  readonly date: string;
  readonly active: boolean;
  readonly title: MultilingualText;
  readonly content: MultilingualText;
  readonly widgets: Widget[];
  readonly attachments: Attachment[];
  readonly relatedLandfillIds: string[];
}

export const AnnouncementFactory = {
  hydrate: (params: AnnouncementParams): AnnouncementEntity => {
    return {
      id: params.id,
      date: params.date,
      active: !!params.active,
      title: MultilingualTextVO.hydrate(params.title),
      content: MultilingualTextVO.hydrate(params.content),
      widgets: Array.isArray(params.widgets) ? params.widgets.map(WidgetVO.hydrate) : [],
      attachments: Array.isArray(params.attachments) ? params.attachments.map(AttachmentVO.hydrate) : [],
      relatedLandfillIds: Array.isArray(params.relatedLandfillIds) ? params.relatedLandfillIds : [],
    };
  },
};
