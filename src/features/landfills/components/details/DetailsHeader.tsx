// src/features/landfills/components/details/DetailsHeader.tsx

import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { Image } from "@shared/components/Icons";
import { buildSelectionPanelData } from "../../domain/mappers/landfillDetailsMapper";
import type { Landfill } from "../../domain/types";

interface DetailsHeaderProps {
  landfill: Landfill;
}

export function DetailsHeader({ landfill }: DetailsHeaderProps) {
  const { toggleActiveModal } = useUiStore();
  const { t } = useLanguageStore();

  const data = buildSelectionPanelData(landfill);
  const coverImageUrl = data.coverImageUrl;
  const imgsCount = data.galleryImages.length;

  const handleOpenGallery = () => {
    toggleActiveModal("gallery", true, {
      title: landfill.name,
      images: data.galleryImages,
    });
  };

  if (!coverImageUrl) return null;

  return (
    <div className="group relative h-48 w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      <img
        src={coverImageUrl}
        alt="Vista del vertedero"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      {imgsCount > 0 && (
        <button
          onClick={handleOpenGallery}
          className="absolute right-3 bottom-3 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm backdrop-blur-sm transition-all hover:bg-white"
        >
          <Image size={14} />
          <span>{t("selection.see_photos", { count: imgsCount })}</span>
        </button>
      )}
    </div>
  );
}