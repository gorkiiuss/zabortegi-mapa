// src/features/media/data/mappers/mediaItemMapper.ts

import type { LandfillMultimediaIndexDTO } from "../dto/LandfillMultimediaIndexDTO";
import type { MediaItemEntityParams } from "../../domain/entities/MediaItemEntity";
import { buildLandfillMediaUrl } from "@shared/utils/media";

export const mapLandfillMultimediaDTOToParams = (
    dto: LandfillMultimediaIndexDTO,
    index: number
): MediaItemEntityParams => {
    const url = buildLandfillMediaUrl(dto.landfill_id, dto.file_path) || "";
    const filename = dto.file_name || dto.file_path.split('/').pop() || `file_${index}`;
    const categoryUpper = dto.category ? dto.category.toUpperCase() : "OTHER";

    return {
        id: `lf-${dto.landfill_id}-db-${index}`,
        filePath: url,
        fileName: filename,
        title: dto.description || filename,
        description: dto.description,
        category: categoryUpper,
        context: categoryUpper === "PDF" ? "LANDFILL_DOC" : "LANDFILL_IMAGE",
        relatedId: dto.landfill_id,
        relatedName: dto.landfill_name,
        uploadedAt: null,
        fileSizeBytes: null
    };
};

export const mapAnnouncementGalleryImageToParams = (
    announcementId: string,
    announcementTitle: string,
    imageUrl: string,
    widgetIndex: number,
    imageIndex: number,
    lang: 'es' | 'eu'
): MediaItemEntityParams => {
    const filename = imageUrl.split('/').pop() || `image_${imageIndex}.jpg`;
    const defaultTitle = lang === 'eu' ? 'Irudia' : 'Imagen';
    return {
        id: `ann-${announcementId}-gal-${widgetIndex}-img-${imageIndex}`,
        filePath: imageUrl,
        fileName: filename,
        title: defaultTitle,
        description: defaultTitle,
        category: "IMAGE",
        context: "ANNOUNCEMENT",
        relatedId: announcementId,
        relatedName: announcementTitle,
        uploadedAt: null,
        fileSizeBytes: null
    };
};

export const mapAnnouncementAttachmentToParams = (
    announcementId: string,
    announcementTitle: string,
    attachmentUrl: string,
    attachmentLabel: string,
    attachmentIndex: number
): MediaItemEntityParams => {
    const filename = attachmentUrl.split('/').pop() || `document_${attachmentIndex}.pdf`;
    return {
        id: `ann-${announcementId}-att-${attachmentIndex}`,
        filePath: attachmentUrl,
        fileName: filename,
        title: attachmentLabel || filename,
        description: attachmentLabel || filename,
        category: "PDF",
        context: "ANNOUNCEMENT",
        relatedId: announcementId,
        relatedName: announcementTitle,
        uploadedAt: null,
        fileSizeBytes: null
    };
};
