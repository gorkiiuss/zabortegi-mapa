// src/features/media/data/dto/LandfillMultimediaIndexDTO.ts

export interface LandfillMultimediaIndexDTO {
    readonly file_name: string;
    readonly file_path: string;
    readonly category: string;
    readonly description: string | null;
    readonly landfill_id: string;
    readonly landfill_name: string;
}
