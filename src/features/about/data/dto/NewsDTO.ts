// src/features/about/data/dto/NewsDTO.ts

export interface AttachmentDTO {
  type: "pdf" | "link" | "folder";
  label: { es: string; eu: string };
  url: string;
}

export interface CounterWidgetConfigDTO {
  type: "counter";
  targetDate?: string;
  startDate?: string;
  label: { es: string; eu: string };
  targetDateLabel?: { es: string; eu: string };
  style?: "neutral" | "alarm" | "success";
}

export interface GalleryWidgetConfigDTO {
  type: "gallery";
  images: string[];
}

export type WidgetDTO = CounterWidgetConfigDTO | GalleryWidgetConfigDTO;

export interface AnnouncementDTO {
  id: string;
  date: string;
  active: boolean;
  title: { es: string; eu: string };
  content: { es: string; eu: string };
  widgets?: WidgetDTO[];
  attachments?: AttachmentDTO[];
  relatedLandfillIds?: string[];
}

export interface ChangeLogItemDTO {
  text: { es: string; eu: string };
  action?: {
    type: string;
    payload?: any;
  } | null;
}

export interface ChangeLogEntryDTO {
  version: string;
  date: string;
  title: { es: string; eu: string };
  items: ChangeLogItemDTO[];
  isSnapshot?: boolean;
  targetVersion?: string;
}
