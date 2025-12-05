// src/features/landfills/components/details/DetailsHeader.tsx

import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { Image } from "@shared/components/Icons";

interface DetailsHeaderProps {
  coverImageUrl?: string | null;
  imgsCount: number;
}

export function DetailsHeader({
  coverImageUrl,
  imgsCount,
}: DetailsHeaderProps) {
  const { toggleActiveModal } = useUiStore();
  const { t } = useLanguageStore();

  if (!coverImageUrl) return null;

  return (
    <>
      <div className="group relative h-48 w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm">
        <img
          src={coverImageUrl}
          alt="Vista del vertedero"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradiente sutil para profundidad */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

        {/* Botón para abrir galería */}
        {imgsCount > 0 && (
          <button
            onClick={() => toggleActiveModal("gallery", true)}
            className="absolute right-3 bottom-3 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm backdrop-blur-sm transition-all hover:bg-white"
          >
            <Image size={14}/>
            <span>{t("selection.see_photos", { count: imgsCount })}</span>
          </button>
        )}
      </div>
    </>
  );
}
