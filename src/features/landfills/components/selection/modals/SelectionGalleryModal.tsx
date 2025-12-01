import { useEffect, useMemo, useState } from "react";
import { useUiStore } from "@features/map/state/uiStore";
import { buildSelectionPanelData } from "../SelectionPanelData";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useLandfillsStore } from "@features/landfills/state/landfillsStore";
import { useLanguageStore } from "@shared/state/languageStore";

export function SelectionGalleryModal() {
  const closeModal = useUiStore((s) => s.closeModal);
  const selectedId = useUiStore((s) => s.selectedLandfillId);
  const landfills = useLandfillsStore((s) => s.landfills);
  const { t } = useLanguageStore();

  const { modalRef, handleMouseEnter, handleMouseLeave } =
    useMapModalInteractions();

  const landfill = useMemo(
    () => landfills.find((lf) => lf.parcelId === selectedId),
    [landfills, selectedId],
  );

  const galleryData = useMemo(() => {
    if (!landfill) return null;
    const data = buildSelectionPanelData(landfill);
    return {
      images: data.galleryImages,
      title: landfill.name,
    };
  }, [landfill]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = galleryData?.images ?? [];
  const mainTitle = galleryData?.title ?? "";
  const currentImg = images[currentIndex];

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.stopPropagation();
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          closeModal();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrev();
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal, images.length]);

  if (!landfill || images.length === 0 || !currentImg) return null;

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed inset-0 z-2000 flex flex-col bg-slate-50/95 backdrop-blur-md transition-all duration-300"
      onClick={closeModal}
    >
      {/* ─── HEADER FLOTANTE (Blanco y limpio) ─── */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-2010 flex items-center justify-between px-6 py-5">
        <div className="pointer-events-auto flex flex-col">
          <h2 className="text-lg leading-tight font-bold text-slate-800">
            {mainTitle}
          </h2>
          <span className="mt-0.5 text-xs font-medium tracking-wider text-slate-400 uppercase">
            {t("selection.gallery.count", {
              current: currentIndex + 1,
              total: images.length,
            })}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
          className="pointer-events-auto rounded-full border border-slate-200 bg-white p-2.5 text-slate-400 shadow-sm transition-all duration-200 hover:scale-105 hover:border-slate-300 hover:text-slate-700 hover:shadow-md"
          aria-label={t("selection.gallery.close")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* ─── CUERPO PRINCIPAL ─── */}
      <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden p-4">
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 z-2010 rounded-full border border-slate-100 bg-white p-3 text-slate-600 shadow-lg shadow-slate-200/50 transition-all duration-200 hover:scale-110 hover:text-emerald-600 focus:outline-none md:left-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        <div
          className="relative flex max-h-full max-w-full flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            key={currentImg.url}
            src={currentImg.url}
            alt={currentImg.title || mainTitle}
            className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl shadow-slate-200/80 select-none"
            draggable={false}
          />

          {currentImg.title && (
            <div className="mt-6 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-center shadow-sm backdrop-blur-xl">
              <p className="text-sm font-medium text-slate-700">
                {currentImg.title}
              </p>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 z-2010 rounded-full border border-slate-100 bg-white p-3 text-slate-600 shadow-lg shadow-slate-200/50 transition-all duration-200 hover:scale-110 hover:text-emerald-600 focus:outline-none md:right-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
