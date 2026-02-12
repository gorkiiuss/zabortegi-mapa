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

  const data = (modalData as GalleryData) || { title: "", images: [] };

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
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed inset-0 z-2000 flex flex-col bg-slate-50/95 backdrop-blur-md transition-all duration-300"
      onClick={closeModal}
    >
      {/* ─── HEADER FLOTANTE ─── */}
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
          <X size={20} />
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
            <ChevronLeft size={24} />
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
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}