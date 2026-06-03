// src/features/media/data/apiRepository.ts

import type { MediaRepository } from "../domain/repository";
import type { MediaItemEntity } from "../domain/entities/MediaItemEntity";
import type { LandfillMultimediaIndexDTO } from "./dto/LandfillMultimediaIndexDTO";
import { mapLandfillMultimediaDTOToParams } from "./mappers/mediaItemMapper";
import { MediaItemEntityFactory } from "../domain/entities/MediaItemEntity";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const apiMediaRepository: MediaRepository = {
    getMultimediaIndex: async (): Promise<MediaItemEntity[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/multimedia`);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data: LandfillMultimediaIndexDTO[] = await response.json();
            return data.map((item, idx) => {
                const params = mapLandfillMultimediaDTOToParams(item, idx);
                return MediaItemEntityFactory.hydrate(params);
            });
        } catch (error) {
            console.error("[MEDIA REPO ERROR]", error);
            throw error;
        }
    }
};
