// src/shared/domain/mediaTypes.ts

export type MediaType = 'image' | 'pdf' | 'other';
export type MediaContext = 'landfill_image' | 'landfill_doc' | 'announcement';

export interface MediaItem {
    id: string;
    url: string;
    filename: string;
    title: string;
    type: MediaType;

    context: MediaContext;
    relatedId: string;
    relatedName: string;
}