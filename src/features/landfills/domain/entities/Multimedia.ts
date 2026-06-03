// src/features/landfills/domain/entities/MultimediaEntity.ts

import { MultimediaCategoryVO, type MultimediaCategory } from "../valueObjects/MultimediaCategory";

export interface MultimediaEntityParams {
    fileName: string;
    filePath: string;
    category: string;
    description: string | null;
    fileSizeBytes: number | null;
    uploadedAt: string;
}

export interface MultimediaEntity {
    readonly fileName: string;
    readonly filePath: string;
    readonly category: MultimediaCategory;
    readonly description: string | null;
    readonly fileSizeBytes: number | null;
    readonly uploadedAt: Date;

    hasCategory(category: MultimediaCategory): boolean;
}

export const MultimediaEntityFactory = {
    hydrate: (params: MultimediaEntityParams): MultimediaEntity => {
        return {
            fileName: params.fileName,
            filePath: params.filePath,
            category: MultimediaCategoryVO.hydrate(params.category),
            description: params.description,
            fileSizeBytes: params.fileSizeBytes,
            uploadedAt: new Date(params.uploadedAt),
            hasCategory(category: MultimediaCategory) {
                return this.category == category
            } 
        }
    }
}