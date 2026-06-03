// src/features/landfills/components/details/FullDetailsModal.tsx

import { useEffect, useState } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { X, Image, Pen, Spinner } from "@shared/components/Icons";
import { useLandfillDetails } from "@features/landfills/hooks/useLandfillDetails";
import { useLandfillVersions } from "@features/landfills/hooks/useLandfillVersions";
import { VersionStatusVO } from "@features/landfills/domain/valueObjects/version/VersionStatus";
import { FULL_DETAILS_SCHEMA } from "./fullDetails/fullDetailsSchema";
import { parseDisplay } from "./fullDetails/parseDisplay";
import { DetailSection } from "./fullDetails/DetailSection";
import { SamplingsSection } from "./fullDetails/SamplingsSection";
import { StudiesSection } from "./fullDetails/StudiesSection";
import { DocumentsSection } from "./fullDetails/DocumentsSection";
import type { TxKeyPath } from "i18n/config";


export function FullDetailsModal() {
  const { handleMouseEnter, handleMouseLeave, modalRef } = useMapModalInteractions();
  const { t, formatSeparatedDate } = useLanguageStore();
  const selectedLandfillId = useUiStore((s) => s.selectedLandfillId);
  const { toggleActiveModal, closeModal } = useUiStore();

  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(null)

  const { versions, isLoading: isLoadingVersions } = useLandfillVersions(selectedLandfillId);
  const { details, isLoading: isLoadingDetails } = useLandfillDetails(selectedLandfillId, selectedVersionId);


  const docs = details?.multimedia
    ? details.multimedia.filter(multi => multi.hasCategory("PDF"))
    : [];

  const handleClose = () => closeModal();

  useEffect(() => {
    setSelectedVersionId(null);
  }, [selectedLandfillId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (isLoadingVersions || isLoadingDetails) {
    return (
      <div
        ref={modalRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="pointer-events-auto flex h-full w-full flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl"
      >
        <div className="flex flex-col items-center gap-3 select-none">
          <Spinner className="h-8 w-8 animate-spin text-emerald-600" />

          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase animate-pulse">
            {t("details.full_details.loading")}
          </p>
        </div>
      </div>
    );
  }

  if (!details) return null;

  const images = details.multimedia
    ? details.multimedia.filter(multi => multi.hasCategory("IMAGE"))
    : []

  const handleOpenGallery = () => {
    if (images.length === 0) return;
    toggleActiveModal("gallery", true, {
      title: details.name ? details.name : t("gallery.title_placeholder"),
      images: images
    })
  }

  const activeSections = FULL_DETAILS_SCHEMA.map((section) => {
    const valueObject = (section.voKey ? details[section.voKey] : details) as Record<string, any>;

    if (!valueObject) return { ...section, rows: [] };

    const rows = Object.entries(section.fields)
      .map(([fieldKey, config]) => {
        const isAdvanced = typeof config === "object";
        const labelKey = isAdvanced ? config.labelKey : config;
        const enumVO = isAdvanced && "enumVO" in config && config.enumVO ? config.enumVO : null;

        const fullWidth = isAdvanced && "fullWidth" in config ? config.fullWidth : false;

        let rawValue = valueObject[fieldKey];
        if (isAdvanced && config && "getValue" in config && typeof config.getValue === "function") {
          rawValue = config.getValue(valueObject);
        }

        let displayValue: string | null = parseDisplay(rawValue, enumVO, valueObject, t, formatSeparatedDate);

        let score: number | null = null;
        if (typeof (valueObject as any).getScore === "function") {
          score = (valueObject as any).getScore(fieldKey);
        }

        return { labelKey, value: displayValue, score, fullWidth };
      })
      .filter((row) => row.value !== null);

    return { ...section, rows };
  }).filter((section) => section.rows.length > 0);

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            {t("details.full_details.title")}
          </h2>
          {versions && versions.length > 0 && (
            <div className="relative shrink-0 select-none">
              <select
                id="full-details-version-selector"
                value={details.versionId}
                onChange={(e) => setSelectedVersionId(e.target.value ? Number(e.target.value) : null)}
                className="cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white py-1 pl-2.5 pr-8 text-xs font-semibold text-slate-600 shadow-xs transition-all hover:border-slate-300 hover:bg-slate-50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-hidden"
              >
                {versions.map((v) => {
                  return (
                    <option key={v.versionId} value={v.versionId}>
                      v{v.versionNumber} ({t(VersionStatusVO.getTxKey(v.status) as TxKeyPath)} - {v.changeSummary})
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-400">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
          <p className="mt-0.5 text-xs text-slate-500">
            {details.name} · {details.location.municipalityName}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            id="full-details-btn-corrections"
            onClick={() => toggleActiveModal("future_feature" as any, true)}
            className="flex items-center gap-1.5 rounded-lg border border-dashed border-emerald-300 bg-emerald-50/50 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-xs transition-all hover:border-emerald-400 hover:bg-emerald-50"
            title={t("details.add_correction")}
          >
            <Pen size={14} className="text-emerald-500" />
            <span className="hidden sm:inline">{t("details.add_correction")}</span>
          </button>

          <div className="mx-1 h-5 w-px bg-slate-200" />

          <button
            onClick={handleClose}
            className="shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
            aria-label={t("details.close")}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30 p-5 md:p-6">
        {activeSections.length > 0 ? (
          <div className="mx-auto max-w-4xl space-y-6">
            {images.length > 0 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 h-64 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm p-1.5">

                <div
                  onClick={handleOpenGallery}
                  className={`group relative overflow-hidden rounded-lg cursor-pointer border border-slate-100 ${images.length > 1 ? "sm:col-span-2" : "sm:col-span-3"
                    }`}
                >
                  <img
                    src={images[0].filePath}
                    alt="Vista principal del vertedero"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenGallery();
                    }}
                    className="absolute right-3 bottom-3 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm backdrop-blur-sm transition-all hover:bg-white border border-slate-200/50"
                  >
                    <Image size={14} className="text-slate-500" />
                    <span>{t("details.see_photos", { count: images.length })}</span>
                  </button>
                </div>

                {images.length > 1 && (
                  <div className="hidden sm:flex flex-col gap-1.5 h-full overflow-hidden">
                    {images.slice(1, 3).map((img, idx) => (
                      <div
                        key={img.filePath}
                        onClick={handleOpenGallery}
                        className="group relative flex-1 overflow-hidden rounded-lg cursor-pointer border border-slate-100"
                      >
                        <img
                          src={img.filePath}
                          alt={`Miniatura ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />

                        {idx === 1 && images.length > 3 && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white font-semibold backdrop-blur-[1px]">
                            <span className="text-lg">+{images.length - 3}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-200">Fotos</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSections.map(({ voKey, titleKey, rows }) => (
              <DetailSection
                key={voKey ?? titleKey}
                voKey={voKey}
                titleKey={titleKey}
                rows={rows}
                hasSensitiveData={details.hasSensitiveData}
                code={details.code}
              />
            ))}

            {details.samplings && details.samplings.length > 0 && (
              <SamplingsSection samplings={details.samplings} />
            )}

            {details.studies && details.studies.length > 0 && (
              <StudiesSection studies={details.studies} />
            )}

            {docs && docs.length > 0 && (
              <DocumentsSection docs={docs} />
            )}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center text-slate-400">
            <p className="text-sm font-medium text-slate-600">
              {t("details.full_details.no_data")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}