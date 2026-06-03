// src/features/landfills/components/details/DetailsHeader.tsx

import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { Image } from "@shared/components/Icons";
import type { LandfillDetailsEntity } from "@features/landfills/domain/entities/LandfillDetails";

interface DetailsHeaderProps {
  details: LandfillDetailsEntity;
}

export function DetailsHeader({ details }: DetailsHeaderProps) {
  const { toggleActiveModal } = useUiStore();
  const { t } = useLanguageStore();

  const images = details.multimedia ?
    details.multimedia.filter((multi) => multi.hasCategory("IMAGE"))
    : []
  const coverImageUrl = images.length > 0 ? images[0].filePath : null
  const modalGallerytitle = details.name ? details.name : t("gallery.title_placeholder")

  const handleOpenGallery = () => {
    toggleActiveModal("gallery", true, {
      title: modalGallerytitle,
      images: images,
    });
  };

  if (!coverImageUrl) {
    return (
      <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/30 p-6 text-center select-none">
        <div className="rounded-full bg-slate-100 p-3 text-slate-400">
          <Image size={24} className="stroke-[1.5]" />
        </div>
        <span className="mt-2.5 text-xs font-medium text-slate-400">
          {t("details.no_images")}
        </span>
      </div>
    );
  }

  return (
    <div className="group relative h-48 w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      <img
        src={coverImageUrl}
        alt="Vista del vertedero"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

      {images.length > 0 && (
        <button
          onClick={handleOpenGallery}
          className="absolute right-3 bottom-3 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm backdrop-blur-sm transition-all hover:bg-white"
        >
          <Image size={14} />
          <span>{t("details.see_photos", { count: images.length })}</span>
        </button>
      )}
    </div>
  );
}