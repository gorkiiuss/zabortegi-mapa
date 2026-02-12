// src/features/about/domain/types.ts

export interface Attachment {
  type: "pdf" | "link";
  label: { es: string; eu: string };
  url: string;
}

export interface CounterWidgetConfig {
  type: 'counter';
  targetDate?: string; 
  startDate?: string;
  label: { es: string; eu: string };
  targetDateLabel?: { es: string; eu: string };
  style?: 'neutral' | 'alarm' | 'success'; 
}

export interface GalleryWidgetConfig {
  type: 'gallery';
  images: string[];
}

export type Widget = CounterWidgetConfig | GalleryWidgetConfig;

export interface AnnouncementPost {
  id: string;
  date: string;
  active: boolean;
  title: { es: string; eu: string };
  
  content: { es: string; eu: string };
  
  widgets?: Widget[];
  
  attachments?: Attachment[];
  
  relatedLandfillCodes?: string[];
}

export interface ChangeLogEntry {
  version: string;
  date: string;
  title: { es: string; eu: string };
  changes: { es: string[]; eu: string[] };
}