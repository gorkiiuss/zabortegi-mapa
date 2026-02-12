// src/features/about/components/widgets/GalleryWidget.tsx

import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import type { GalleryWidgetConfig } from "../../domain/types";
import { Image as ImageIcon, Plus } from "lucide-react";

interface Props {
  config: GalleryWidgetConfig;
}

export function GalleryWidget({ config }: Props) {
  const { toggleActiveModal } = useUiStore();
  const { currentLanguage } = useLanguageStore();

  const images = config.images || [];

  if (images.length === 0) return null;

  const handleOpenGallery = () => {
    toggleActiveModal("gallery", true, {
      title: currentLanguage === 'es' ? 'Galería de imágenes' : 'Irudi galeria',
      images: images.map(url => ({ url, title: '' }))
    });
  };

  const previewImages = images.slice(0, 4);
  const remainingCount = images.length - 4;

  return (
    <div className="my-4 space-y-2 select-none">
      <div
        className="grid grid-cols-4 gap-2 overflow-hidden rounded-xl border border-slate-200"
        style={{ height: '100px' }}
      >
        {previewImages.map((url, idx) => (
          <div
            key={url + idx}
            onClick={handleOpenGallery}
            className="group relative h-full w-full cursor-pointer overflow-hidden bg-slate-100"
          >
            <img
              src={url}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {idx === 3 && remainingCount > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 font-bold text-white backdrop-blur-[2px]">
                <div className="flex items-center gap-1">
                  <Plus size={16} />
                  <span>{remainingCount}</span>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </div>
        ))}
      </div>

      <button
        onClick={handleOpenGallery}
        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-emerald-600"
      >
        <ImageIcon size={14} />
        <span>
          {currentLanguage === 'es'
            ? `Ver galería (${images.length} imágenes)`
            : `Ikusi galeria (${images.length} irudi)`}
        </span>
      </button>
    </div>
  );
}