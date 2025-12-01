import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";

interface SelectionHeaderProps {
  coverImageUrl?: string | null;
  imgsCount: number;
}

export function SelectionHeader({
  coverImageUrl,
  imgsCount,
}: SelectionHeaderProps) {
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>{t("selection.see_photos", { count: imgsCount })}</span>
          </button>
        )}
      </div>
    </>
  );
}
