// src/features/media/domain/repository.ts

import type { MediaItemEntity } from "./entities/MediaItemEntity";

export interface MediaRepository {
    getMultimediaIndex(): Promise<MediaItemEntity[]>;
}
