// src/features/media/hooks/useMediaIndex.ts

import { useMemo } from 'react';
import { useLandfillsStore } from '@features/landfills/state/landfillsStore';
import { useNewsStore } from '@features/about/state/newsStore';
import { useLanguageStore } from '@shared/state/languageStore';
import { buildLandfillMediaUrl } from '@shared/utils/media';
import type { MediaItem } from '@shared/domain/mediaTypes';
import type { RawProperties } from '@features/landfills/domain/rawTypes';

export function useMediaIndex() {
  const landfills = useLandfillsStore(s => s.landfills);
  const announcements = useNewsStore(s => s.announcements);
  const currentLanguage = useLanguageStore(s => s.currentLanguage);

  const lang = (currentLanguage || 'es') as 'es' | 'eu';

  const mediaItems = useMemo(() => {
    const items: MediaItem[] = [];

    landfills.forEach(lf => {
      const raw = lf.rawProperties as unknown as RawProperties;
      if (!lf.id) return;

      if (Array.isArray(raw.imgs)) {
        raw.imgs.forEach((img: any, idx: number) => {
          const url = buildLandfillMediaUrl(lf.id, img.path);
          if (!url) return;

          const filename = img.path.split('/').pop() || `img_${idx}.jpg`;

          items.push({
            id: `lf-${lf.id}-img-${idx}`,
            url,
            filename,
            title: img.titulo || filename,
            type: 'image',
            context: 'landfill_image',
            relatedId: lf.id,
            relatedName: lf.name
          });
        });
      }

      if (Array.isArray(raw.documentation)) {
        raw.documentation.forEach((doc: any, idx: number) => {
          const url = buildLandfillMediaUrl(lf.id, doc.path);
          if (!url) return;

          const filename = doc.path.split('/').pop() || `doc_${idx}.pdf`;
          const isPdf = filename.toLowerCase().endsWith('.pdf');

          items.push({
            id: `lf-${lf.id}-doc-${idx}`,
            url,
            filename,
            title: doc.label || filename,
            type: isPdf ? 'pdf' : 'other',
            context: 'landfill_doc',
            relatedId: lf.id,
            relatedName: lf.name
          });
        });
      }
    });

    announcements.forEach(ann => {
      const relatedNameStr = ann.title[lang] || ann.title.es;

      if (Array.isArray(ann.widgets)) {
        ann.widgets.forEach((widget, wIdx) => {
          if (widget.type === 'gallery' && Array.isArray(widget.images)) {
            widget.images.forEach((imgUrl, iIdx) => {
              const filename = imgUrl.split('/').pop() || `image_${iIdx}.jpg`;
              items.push({
                id: `ann-${ann.id}-gal-${wIdx}-img-${iIdx}`,
                url: imgUrl,
                filename,
                title: lang === 'eu' ? 'Irudia' : 'Imagen',
                type: 'image',
                context: 'announcement',
                relatedId: ann.id,
                relatedName: relatedNameStr
              });
            });
          }
        });
      }

      if (Array.isArray(ann.attachments)) {
        ann.attachments.forEach((att, aIdx) => {
          if (att.type === 'pdf') {
            const filename = att.url.split('/').pop() || `document_${aIdx}.pdf`;
            const titleStr = att.label[lang] || att.label.es || filename;

            items.push({
              id: `ann-${ann.id}-att-${aIdx}`,
              url: att.url,
              filename,
              title: titleStr,
              type: 'pdf',
              context: 'announcement',
              relatedId: ann.id,
              relatedName: relatedNameStr
            });
          }
        });
      }
    });

    return items;
  }, [landfills, announcements, lang]);

  return mediaItems;
}