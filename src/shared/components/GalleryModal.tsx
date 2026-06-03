// src/shared/components/GalleryModal.tsx

import { useEffect, useState } from "react";
import { useUiStore, type GalleryData } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { ChevronLeft, ChevronRight, X } from "@shared/components/Icons";

export function GalleryModal() {
  const { closeModal, modalData } = useUiStore();
  const { t } = useLanguageStore();

  const { modalRef, handleMouseEnter, handleMouseLeave } =
    useMapModalInteractions();

  const data = (modalData as GalleryData);

  const images = data.images || [];
  const mainTitle = data.title || "";

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImg = images[currentIndex];

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images.length]);

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

  if (images.length === 0 || !currentImg) return null;

  return (
    <div
      className="flex h-full w-full items-center justify-center p-3 sm:p-6"
      onClick={closeModal}
    >
      <div
        ref={modalRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex w-full max-w-4xl max-h-[85vh] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/95 text-slate-100 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/40 px-6 py-4">
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-slate-100 line-clamp-1">
              {mainTitle}
            </h2>
            <span className="mt-0.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {t("details.gallery.count", {
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
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white cursor-pointer"
            aria-label={t("details.gallery.close")}
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-slate-950/40 p-4 sm:p-12">
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 z-10 rounded-full border border-slate-800 bg-slate-900/80 p-3 text-slate-300 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-slate-800 hover:text-emerald-400 hover:border-emerald-500/50 active:scale-95 focus:outline-hidden cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div
            className="relative flex max-h-full max-w-full flex-col items-center justify-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group max-h-[50vh] sm:max-h-[55vh] flex items-center justify-center">
              <img
                key={currentImg.filePath}
                src={currentImg.filePath}
                alt={currentImg.description || data.title}
                className="max-h-[50vh] sm:max-h-[55vh] max-w-full rounded-xl object-contain shadow-2xl select-none transition-all duration-300 animate-in fade-in zoom-in-95 duration-200 ring-1 ring-white/10"
                draggable={false}
              />
            </div>

            {currentImg.description && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/85 px-4 py-2.5 text-center shadow-lg backdrop-blur-md max-w-md">
                <p className="text-xs font-medium text-slate-300 leading-normal">
                  {currentImg.description}
                </p>
              </div>
            )}

            {images.length > 1 && (
              <div className="flex gap-1.5 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                      idx === currentIndex
                        ? "bg-emerald-400 w-4"
                        : "bg-slate-500 hover:bg-slate-300 w-1.5"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 z-10 rounded-full border border-slate-800 bg-slate-900/80 p-3 text-slate-300 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-slate-800 hover:text-emerald-400 hover:border-emerald-500/50 active:scale-95 focus:outline-hidden cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}