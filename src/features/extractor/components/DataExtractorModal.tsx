// src/features/extractor/components/DataExtractorModal.tsx

import React, { useState, useMemo } from "react";
import { X, Search, ChevronRight, Check, Download, FileJson, FileSpreadsheet, Map, AlertCircle, ArrowLeft } from "lucide-react";
import { useUiStore } from "@features/map/state/uiStore";
import { useLandfillsStore } from "@features/landfills/state/landfillsStore";
import { useAdvancedSearchStore } from "@features/search/state/useAdvancedSearchStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useDataExtractorStore } from "../state/useDataExtractorStore";
import { FULL_DETAILS_SCHEMA } from "@features/landfills/components/details/fullDetails/fullDetailsSchema";
import { apiLandfillsRepository } from "@features/landfills/data/apiRepository";
import {
  compileCSVExport,
  compileJSONExport,
  compileGeoJSONExport,
  triggerFileDownload,
  getSelectedFieldsMeta,
} from "../utils/exportFormatters";

type ExportFormat = "csv" | "json" | "geojson";

export function DataExtractorModal() {
  const toggleModal = useUiStore((s) => s.toggleActiveModal);
  const handleClose = () => toggleModal("none");
  const { handleMouseEnter, handleMouseLeave, modalRef } = useMapModalInteractions();
  const { t, formatSeparatedDate } = useLanguageStore();

  const landfillsSummary = useLandfillsStore((s) => s.landfillsSummary) || [];
  const { advancedSearchResults } = useAdvancedSearchStore();

  // Store state
  const {
    currentStep,
    selectedOption,
    manualSelectedIds,
    selectedFields,
    csvDelimiter,
    translateHeaders,
    isExporting,
    setStep,
    setSelectedOption,
    toggleLandfillManual,
    setAllLandfillsManual,
    toggleField,
    toggleSectionFields,
    toggleAllFields,
    setCsvDelimiter,
    setTranslateHeaders,
    setIsExporting,
  } = useDataExtractorStore();

  // Local state for search query in manual selection step
  const [manualSearchQuery, setManualSearchQuery] = useState("");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("csv");

  // Determine active target UUIDs based on option
  const exportUuids = useMemo(() => {
    if (selectedOption === "all") {
      return landfillsSummary.map((lf) => lf.id);
    } else if (selectedOption === "filtered") {
      return (advancedSearchResults || []).map((lf) => lf.id);
    } else if (selectedOption === "manual") {
      return Object.entries(manualSelectedIds)
        .filter(([_, checked]) => checked)
        .map(([id]) => id);
    }
    return [];
  }, [selectedOption, landfillsSummary, advancedSearchResults, manualSelectedIds]);

  // Filtered landfills list for manual checkbox selection
  const filteredLandfillsForManual = useMemo(() => {
    if (!manualSearchQuery) return landfillsSummary;
    const query = manualSearchQuery.toLowerCase();
    return landfillsSummary.filter((lf) => {
      const nameMatch = lf.name?.toLowerCase().includes(query);
      const codeMatch = lf.code?.toLowerCase().includes(query);
      const munMatch = lf.municipality?.toLowerCase().includes(query);
      return nameMatch || codeMatch || munMatch;
    });
  }, [landfillsSummary, manualSearchQuery]);

  // Count total selected fields
  const totalSelectedFieldsCount = useMemo(() => {
    return getSelectedFieldsMeta(selectedFields).length;
  }, [selectedFields]);

  // Handle Export Trigger
  const handleExport = async () => {
    if (exportUuids.length === 0) return;
    if (totalSelectedFieldsCount === 0) return;

    setIsExporting(true);
    try {
      // Fetch details in batch
      const details = await apiLandfillsRepository.exportDetails(exportUuids);

      let fileContent = "";
      let filename = `export_vertederos_${new Date().toISOString().split("T")[0]}`;
      let mimeType = "";

      if (exportFormat === "json") {
        const json = compileJSONExport(details, selectedFields);
        fileContent = JSON.stringify(json, null, 2);
        filename += ".json";
        mimeType = "application/json";
      } else if (exportFormat === "geojson") {
        const geojson = compileGeoJSONExport(details, landfillsSummary, selectedFields);
        fileContent = JSON.stringify(geojson, null, 2);
        filename += ".geojson";
        mimeType = "application/geo+json";
      } else {
        fileContent = compileCSVExport(
          details,
          selectedFields,
          csvDelimiter,
          translateHeaders,
          t,
          formatSeparatedDate
        );
        filename += ".csv";
        mimeType = "text/csv;charset=utf-8;";
      }

      triggerFileDownload(fileContent, filename, mimeType);
      handleClose();
    } catch (err) {
      console.error("Error during extraction:", err);
      alert(t("extractor.error_exporting" as any) || "Error exporting data.");
    } finally {
      setIsExporting(false);
    }
  };

  const steps = [
    { num: 1, label: t("extractor.steps.landfills" as any) || "Vertederos" },
    { num: 2, label: t("extractor.steps.fields" as any) || "Campos" },
    { num: 3, label: t("extractor.steps.format" as any) || "Formato" },
  ];

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-none sm:rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
    >
      {/* HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            {t("extractor.title" as any) || "Extractor de datos"}
          </h2>
          <p className="text-xs text-slate-500">
            {t("extractor.description" as any) || "Configura y descarga los datos del inventario a tu medida."}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* STEPPER STATUS BAR */}
      <div className="flex shrink-0 justify-center border-b border-slate-100 bg-white px-5 py-3">
        <div className="flex items-center gap-1.5 sm:gap-4">
          {steps.map((st) => (
            <React.Fragment key={st.num}>
              {st.num > 1 && (
                <div
                  className={`h-0.5 w-6 sm:w-12 rounded-full transition-colors duration-300 ${currentStep >= st.num ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                />
              )}
              <button
                type="button"
                onClick={() => !isExporting && setStep(st.num)}
                className="flex items-center gap-1.5 focus:outline-hidden"
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${currentStep === st.num
                      ? "bg-emerald-600 text-white ring-4 ring-emerald-500/20 shadow-md"
                      : currentStep > st.num
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-400"
                    }`}
                >
                  {currentStep > st.num ? <Check size={12} className="stroke-[3]" /> : st.num}
                </div>
                <span
                  className={`text-xs font-semibold tracking-wide transition-colors ${currentStep === st.num ? "text-emerald-800" : "text-slate-500"
                    }`}
                >
                  {st.label}
                </span>
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="flex-1 overflow-y-auto bg-slate-50/20 p-5">
        {/* STEP 1: LANDFILLS SELECTION */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t("extractor.landfills.choose_scope" as any) || "1. Ámbito de vertederos"}
            </h3>

            <div id="extractor-scope-options" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Option All */}
              <button
                onClick={() => setSelectedOption("all")}
                className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left shadow-xs transition-all ${selectedOption === "all"
                    ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
                  <Map size={18} />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {t("extractor.landfills.all" as any) || "Todos los vertederos"}
                </div>
                <div className="text-[11px] text-slate-500">
                  {t("extractor.landfills.all_desc" as any) || "Exporta todo el inventario activo."} (
                  {landfillsSummary.length})
                </div>
              </button>

              {/* Option Filtered */}
              <button
                onClick={() => advancedSearchResults !== null && setSelectedOption("filtered")}
                disabled={advancedSearchResults === null}
                className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left shadow-xs transition-all ${advancedSearchResults === null
                    ? "opacity-50 cursor-not-allowed border-slate-200 bg-slate-50"
                    : selectedOption === "filtered"
                      ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <div className="rounded-lg bg-indigo-100 p-2 text-indigo-700">
                  <AlertCircle size={18} />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {t("extractor.landfills.filtered" as any) || "Filtro activo"}
                </div>
                <div className="text-[11px] text-slate-500">
                  {advancedSearchResults !== null
                    ? `${t("extractor.landfills.filtered_desc" as any) || "Resultados de la búsqueda."} (${advancedSearchResults.length
                    })`
                    : t("extractor.landfills.no_active_filter" as any) || "No hay búsqueda activa."}
                </div>
              </button>

              {/* Option Manual */}
              <button
                onClick={() => setSelectedOption("manual")}
                className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left shadow-xs transition-all ${selectedOption === "manual"
                    ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <div className="rounded-lg bg-orange-100 p-2 text-orange-700">
                  <Check size={18} />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {t("extractor.landfills.manual" as any) || "Selección manual"}
                </div>
                <div className="text-[11px] text-slate-500">
                  {t("extractor.landfills.manual_desc" as any) || "Marca uno a uno los que quieras."} (
                  {Object.values(manualSelectedIds).filter(Boolean).length})
                </div>
              </button>
            </div>

            {/* Manual Selection Checklist Panel */}
            {selectedOption === "manual" && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs animate-in slide-in-from-top-4 duration-300">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-3 border-b border-slate-100">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t("search.advanced.inputs.ti_placeholder") || "Escribe para buscar..."}
                      value={manualSearchQuery}
                      onChange={(e) => setManualSearchQuery(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 py-1.5 pl-9 pr-4 text-xs shadow-xs placeholder-slate-400 outline-hidden transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setAllLandfillsManual(
                          filteredLandfillsForManual.map((lf) => lf.id),
                          true
                        )
                      }
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      {t("extractor.select_all" as any) || "Seleccionar todos"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setAllLandfillsManual(
                          filteredLandfillsForManual.map((lf) => lf.id),
                          false
                        )
                      }
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      {t("extractor.deselect_all" as any) || "Desmarcar todos"}
                    </button>
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 pr-1">
                  {filteredLandfillsForManual.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      {t("search.no_results" as any)?.replace("{{query}}", manualSearchQuery) ||
                        "No se encontraron vertederos."}
                    </div>
                  ) : (
                    filteredLandfillsForManual.map((lf) => {
                      const isChecked = !!manualSelectedIds[lf.id];
                      return (
                        <label
                          key={lf.id}
                          className="flex cursor-pointer items-center justify-between py-2.5 px-1 hover:bg-slate-50/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleLandfillManual(lf.id)}
                              className="h-4 w-4 rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500/20 focus:outline-hidden"
                            />
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-700">{lf.name}</span>
                              <span className="text-[10px] text-slate-500">
                                {lf.municipality} · {lf.code || t("search.advanced.inputs.null")}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">{lf.id.substring(0, 8)}...</span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: FIELDS SELECTION */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  {t("extractor.fields.choose" as any) || "2. Selecciona los campos a incluir"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {totalSelectedFieldsCount} {t("extractor.fields.selected" as any) || "campos seleccionados"}.
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleAllFields(true)}
                  className="rounded-lg border border-emerald-200 bg-emerald-50/30 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  {t("extractor.select_all" as any) || "Seleccionar todo"}
                </button>
                <button
                  type="button"
                  onClick={() => toggleAllFields(false)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  {t("extractor.deselect_all" as any) || "Limpiar selección"}
                </button>
              </div>
            </div>

            {/* Grid of Sections */}
            <div id="extractor-fields-container" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {FULL_DETAILS_SCHEMA.map((section) => {
                const sectionFields = Object.keys(section.fields);
                const checkedCount = sectionFields.filter((k) => !!selectedFields[section.titleKey]?.[k]).length;
                const isAllChecked = checkedCount === sectionFields.length;
                const isSomeChecked = checkedCount > 0 && checkedCount < sectionFields.length;

                return (
                  <div key={section.titleKey} className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                    {/* Section Header */}
                    <div className="flex items-center justify-between bg-slate-50/80 px-4 py-2.5 border-b border-slate-100">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isAllChecked}
                          ref={(el) => {
                            if (el) el.indeterminate = isSomeChecked;
                          }}
                          onChange={(e) => toggleSectionFields(section.titleKey, e.target.checked)}
                          className="h-3.5 w-3.5 rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
                        />
                        <span className="text-xs font-bold text-slate-700">{t(section.titleKey)}</span>
                      </label>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">
                        {checkedCount}/{sectionFields.length}
                      </span>
                    </div>

                    {/* Section Fields Checklist */}
                    <div className="flex-1 p-4 space-y-2.5 max-h-48 overflow-y-auto">
                      {Object.entries(section.fields).map(([fieldKey, config]) => {
                        const isChecked = !!selectedFields[section.titleKey]?.[fieldKey];
                        const isAdvanced = typeof config === "object";
                        const labelKey = isAdvanced ? config.labelKey : config;

                        return (
                          <label key={fieldKey} className="flex cursor-pointer items-start gap-2 text-xs">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleField(section.titleKey, fieldKey)}
                              className="mt-0.5 h-3.5 w-3.5 rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
                            />
                            <span className="text-slate-600 font-medium hover:text-slate-800 transition-colors leading-tight">
                              {t(labelKey)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: FORMAT CONFIG & ACTIONS */}
        {currentStep === 3 && (
          <div className="space-y-6 max-w-xl mx-auto">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t("extractor.format.choose" as any) || "3. Configuración del formato"}
            </h3>

            {/* Format Card Options */}
            <div id="extractor-format-options" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* CSV */}
              <button
                onClick={() => setExportFormat("csv")}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center shadow-xs transition-all ${exportFormat === "csv"
                    ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
                  <FileSpreadsheet size={20} />
                </div>
                <div className="text-xs font-bold text-slate-800">CSV</div>
                <div className="text-[10px] text-slate-500">
                  {t("extractor.format.csv_desc" as any) || "Ideal para Excel u hojas de cálculo."}
                </div>
              </button>

              {/* JSON */}
              <button
                onClick={() => setExportFormat("json")}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center shadow-xs transition-all ${exportFormat === "json"
                    ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
                  <FileJson size={20} />
                </div>
                <div className="text-xs font-bold text-slate-800">JSON</div>
                <div className="text-[10px] text-slate-500">
                  {t("extractor.format.json_desc" as any) || "Formato de datos jerárquico crudo."}
                </div>
              </button>

              {/* GeoJSON */}
              <button
                onClick={() => setExportFormat("geojson")}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center shadow-xs transition-all ${exportFormat === "geojson"
                    ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <div className="rounded-lg bg-purple-100 p-2 text-purple-700">
                  <Map size={20} />
                </div>
                <div className="text-xs font-bold text-slate-800">GeoJSON</div>
                <div className="text-[10px] text-slate-500">
                  {t("extractor.format.geojson_desc" as any) || "Geometrías de mapa con datos integrados."}
                </div>
              </button>
            </div>

            {/* CSV Config options */}
            {exportFormat === "csv" && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs animate-in slide-in-from-top-4 duration-300">
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {t("extractor.format.csv_options" as any) || "Opciones del CSV"}
                </h4>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Delimiter */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      {t("extractor.format.delimiter" as any) || "Separador de columnas"}
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCsvDelimiter(",")}
                        className={`flex-1 rounded-lg border py-1.5 text-xs font-bold transition-all ${csvDelimiter === ","
                            ? "border-emerald-500 bg-emerald-50/50 text-emerald-800"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                      >
                        {t("extractor.format.comma" as any) || "Coma (,)"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCsvDelimiter(";")}
                        className={`flex-1 rounded-lg border py-1.5 text-xs font-bold transition-all ${csvDelimiter === ";"
                            ? "border-emerald-500 bg-emerald-50/50 text-emerald-800"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                      >
                        {t("extractor.format.semicolon" as any) || "Punto y coma (;)"}
                      </button>
                    </div>
                  </div>

                  {/* Translate headers option */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      {t("extractor.format.header_labels" as any) || "Nombres de cabecera"}
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setTranslateHeaders(true)}
                        className={`flex-1 rounded-lg border py-1.5 text-xs font-bold transition-all ${translateHeaders
                            ? "border-emerald-500 bg-emerald-50/50 text-emerald-800"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                      >
                        {t("extractor.format.translated" as any) || "Traducidos"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setTranslateHeaders(false)}
                        className={`flex-1 rounded-lg border py-1.5 text-xs font-bold transition-all ${!translateHeaders
                            ? "border-emerald-500 bg-emerald-50/50 text-emerald-800"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                      >
                        {t("extractor.format.technical" as any) || "Técnicos (db)"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Validation alerts */}
            {exportUuids.length === 0 && (
              <div className="flex gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold">
                    {t("extractor.validation.no_landfills" as any) || "No hay vertederos seleccionados"}
                  </span>
                  <p className="mt-0.5 text-[11px] text-amber-700/90 leading-normal">
                    {t("extractor.validation.no_landfills_desc" as any) ||
                      "Vuelve al paso 1 y selecciona qué vertederos deseas exportar."}
                  </p>
                </div>
              </div>
            )}

            {totalSelectedFieldsCount === 0 && (
              <div className="flex gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold">
                    {t("extractor.validation.no_fields" as any) || "No hay campos seleccionados"}
                  </span>
                  <p className="mt-0.5 text-[11px] text-amber-700/90 leading-normal">
                    {t("extractor.validation.no_fields_desc" as any) ||
                      "Vuelve al paso 2 y marca al menos un campo del inventario."}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex shrink-0 items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-4">
        {/* Back Button */}
        {currentStep > 1 ? (
          <button
            onClick={() => setStep(currentStep - 1)}
            disabled={isExporting}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <ArrowLeft size={14} />
            {t("extractor.buttons.back" as any) || "Atrás"}
          </button>
        ) : (
          <div />
        )}

        {/* Action Button: Next or Export */}
        {currentStep < 3 ? (
          <button
            id="extractor-btn-next"
            onClick={() => setStep(currentStep + 1)}
            className="flex items-center gap-1 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-emerald-700"
          >
            {t("extractor.buttons.next" as any) || "Continuar"}
            <ChevronRight size={14} />
          </button>
        ) : (
          <button
            id="extractor-btn-download"
            onClick={handleExport}
            disabled={exportUuids.length === 0 || totalSelectedFieldsCount === 0 || isExporting}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{t("extractor.buttons.exporting" as any) || "Exportando..."}</span>
              </>
            ) : (
              <>
                <Download size={14} />
                <span>
                  {t("extractor.buttons.download" as any) || "Descargar"} ({exportUuids.length} v. /{" "}
                  {totalSelectedFieldsCount} c.)
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
