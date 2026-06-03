// src/features/media/hooks/useMediaIndex.ts

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNewsStore } from '@features/about/state/newsStore';
import { useLanguageStore } from '@shared/state/languageStore';
import { type MediaItemEntity, MediaItemEntityFactory } from '../domain/entities/MediaItemEntity';
import { apiMediaRepository } from '../data/apiRepository';
import {
  mapAnnouncementGalleryImageToParams,
  mapAnnouncementAttachmentToParams
} from '../data/mappers/mediaItemMapper';

export function useMediaIndex() {
  const announcements = useNewsStore(s => s.announcements);
  const currentLanguage = useLanguageStore(s => s.currentLanguage);
  const lang = (currentLanguage || 'es') as 'es' | 'eu';

  const { data: dbMedia = [], isLoading } = useQuery({
    queryKey: ["multimedia-index"],
    queryFn: () => apiMediaRepository.getMultimediaIndex(),
  });

  const mediaItems = useMemo(() => {
    const items: MediaItemEntity[] = [...dbMedia];

    announcements.forEach(ann => {
      const relatedNameStr = ann.title[lang] || ann.title.es;

      if (Array.isArray(ann.widgets)) {
        ann.widgets.forEach((widget, wIdx) => {
          if (widget.type === 'gallery' && Array.isArray(widget.images)) {
            widget.images.forEach((imgUrl, iIdx) => {
              const params = mapAnnouncementGalleryImageToParams(
                ann.id,
                relatedNameStr,
                imgUrl,
                wIdx,
                iIdx,
                lang
              );
              items.push(MediaItemEntityFactory.hydrate(params));
            });
          }
        });
      }

      if (Array.isArray(ann.attachments)) {
        ann.attachments.forEach((att, aIdx) => {
          if (att.type === 'pdf') {
            const labelStr = att.label[lang] || att.label.es || "";
            const params = mapAnnouncementAttachmentToParams(
              ann.id,
              relatedNameStr,
              att.url,
              labelStr,
              aIdx
            );
            items.push(MediaItemEntityFactory.hydrate(params));
          }
        });
      }
    });

    return items;
  }, [dbMedia, announcements, lang]);

  return {
    mediaItems,
    isLoading
  };
}