// src/features/media/domain/entities/MediaItemEntity.ts

import { type MultimediaCategory, MultimediaCategoryVO } from "@features/landfills/domain/valueObjects/MultimediaCategory";
import { type MediaContext, MediaContextVO } from "../valueObjects/MediaContext";

export interface MediaItemEntityParams {
    id: string;
    filePath: string;
    fileName: string;
    title: string;
    description: string | null;
    category: string;
    context: string;
    relatedId: string;
    relatedName: string;
    uploadedAt: string | null;
    fileSizeBytes: number | null;
}

export interface MediaItemEntity {
    readonly id: string;
    readonly filePath: string;
    readonly fileName: string;
    readonly title: string;
    readonly description: string | null;
    readonly category: MultimediaCategory;
    readonly context: MediaContext;
    readonly relatedId: string;
    readonly relatedName: string;
    readonly uploadedAt: Date | null;
    readonly fileSizeBytes: number | null;

    hasCategory(category: MultimediaCategory): boolean;
    hasContext(context: MediaContext): boolean;
}

export const MediaItemEntityFactory = {
    hydrate: (params: MediaItemEntityParams): MediaItemEntity => {
        return {
            id: params.id,
            filePath: params.filePath,
            fileName: params.fileName,
            title: params.title,
            description: params.description,
            category: MultimediaCategoryVO.hydrate(params.category),
            context: MediaContextVO.hydrate(params.context),
            relatedId: params.relatedId,
            relatedName: params.relatedName,
            uploadedAt: params.uploadedAt ? new Date(params.uploadedAt) : null,
            fileSizeBytes: params.fileSizeBytes,

            hasCategory(category: MultimediaCategory) {
                return this.category === category;
            },
            hasContext(context: MediaContext) {
                return this.context === context;
            }
        };
    }
};
