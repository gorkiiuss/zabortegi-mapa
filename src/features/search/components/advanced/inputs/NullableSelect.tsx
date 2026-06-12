// src/features/search/components/advanced/inputs/NullableSelect.tsx

import { useState } from "react";
import { useLanguageStore } from "@shared/state/languageStore";

interface NullableSelectProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValues?: string[];
  includeNull?: boolean;
  onChange: (selected?: string[], includeNull?: boolean) => void;
}

export function NullableSelect({ label, options, selectedValues = [], includeNull = false, onChange }: NullableSelectProps) {
  const { t } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState("");

  const handleOptionToggle = (val: string) => {
    const next = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];
    onChange(next.length ? next : undefined, includeNull);
  };

  const handleNullToggle = () => {
    onChange(selectedValues.length ? selectedValues : undefined, !includeNull);
  };

  const showSearch = options.length > 10;
  const filteredOptions = showSearch
    ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  return (
    <div className="flex flex-col gap-1.5 col-span-full">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
        {selectedValues.length > 0 && (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {selectedValues.length} {t("search.advanced.selected" as any) || "seleccionados"}
          </span>
        )}
      </div>

      {showSearch && (
        <div className="relative mb-1">
          <input
            type="text"
            placeholder={t("search.advanced.inputs.ti_placeholder") || "Escribe para buscar..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-1.5 pl-8 pr-8 text-xs shadow-xs placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-hidden transition-all text-slate-700"
          />
          <div className="absolute left-2.5 top-2.5 text-slate-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      <div className={`flex flex-wrap gap-1.5 ${options.length > 8 ? "max-h-36 overflow-y-auto p-1.5 border border-slate-100 rounded-xl bg-slate-50/20 shadow-inner" : ""}`}>
        {filteredOptions.map((opt) => {
          const isSelected = selectedValues.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleOptionToggle(opt.value)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${isSelected
                ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
            >
              {opt.label}
            </button>
          );
        })}
        
        {showSearch && filteredOptions.length === 0 && (
          <span className="text-xs text-slate-400 py-1.5 px-2 font-medium">
            {t("search.no_results" as any)?.replace("{{query}}", searchQuery) || "No se encontraron resultados"}
          </span>
        )}

        <button
          type="button"
          onClick={handleNullToggle}
          className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${includeNull
            ? "bg-amber-50 text-amber-800 border-amber-300 shadow-xs"
            : "bg-white text-slate-400 border-dashed border-slate-200 hover:bg-slate-50"
            }`}
        >
          {t("search.advanced.inputs.no_data")} ({t("search.advanced.inputs.null")})
        </button>
      </div>
    </div>
  );
}
