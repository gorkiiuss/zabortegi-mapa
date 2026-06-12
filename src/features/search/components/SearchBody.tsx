// src/features/search/components/SearchBody.tsx

import SearchCard from "./SearchCard";
import MoreResultsCard from "./MoreResultsCard";
import { useLanguageStore } from "@shared/state/languageStore";
import { useUiStore } from "@features/map/state/uiStore";
import { Search, X } from "@shared/components/Icons";
import type { LandfillSummaryEntity } from "@features/landfills/domain/entities/LandfillSummary";
import { useAdvancedSearchStore } from "../state/useAdvancedSearchStore";
import { Trash2 } from "lucide-react";

interface SearchBodyProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  suggestions: LandfillSummaryEntity[];
  highlightedIndex: number;
  setHighlightedIndex: (i: number) => void;
  hasMoreCard: boolean;
  totalItems: number;
  onSelect: (item: LandfillSummaryEntity) => void;
  onOpenIndex: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;

  showInput: boolean;
  placeholderText?: string;
}

export function SearchBody({
  searchQuery,
  setSearchQuery,
  suggestions,
  highlightedIndex,
  setHighlightedIndex,
  hasMoreCard,
  totalItems,
  onSelect,
  onOpenIndex,
  onSubmit,
  onKeyDown,
  showInput,
  placeholderText,
}: SearchBodyProps) {
  const { t } = useLanguageStore();
  const { advancedSearchResults, clearResults, resetFilters } = useAdvancedSearchStore();

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSubmit} className="group relative">
        {showInput ? (
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={16} className="text-slate-400" />
            </div>

            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholderText || t("search.placeholder_default")}
              className="block w-full rounded-xl border border-slate-300 bg-white py-2.5 pr-10 pl-9 text-sm text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onKeyDown}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-slate-100 p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                aria-label={t("search.aria_clear")}
              >
                <X size={14} />
              </button>
            )}
          </div>
        ) : (
          <div className={`relative flex cursor-text items-center gap-2 rounded-xl border border-slate-200/60 px-3 py-2.5 transition-colors hover:bg-slate-100/50 ${advancedSearchResults !== null ? "bg-emerald-50/50 border-emerald-200 text-emerald-800" : ""}`}>
            <Search size={16} className={advancedSearchResults !== null ? "text-emerald-500" : "text-slate-400"} />
            <span
              className={`flex-1 truncate pr-6 text-sm ${advancedSearchResults !== null
                ? "font-semibold text-emerald-800"
                : searchQuery
                  ? "font-medium text-slate-800"
                  : "text-slate-500"
                }`}
            >
              {advancedSearchResults !== null
                ? `${t("search.advanced.active")} (${advancedSearchResults.length})`
                : searchQuery || t("search.placeholder_collapsed")}
            </span>

            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 z-10 rounded-full bg-slate-100 p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                title={t("search.aria_clear")}
              >
                <X size={14} />
              </button>
            )}
          </div>
        )}
      </form>

      {showInput && advancedSearchResults !== null && (
        <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2 text-xs text-emerald-800 animate-in fade-in slide-in-from-top-1 duration-200 -mt-2">
          <div className="flex items-center gap-1.5 font-medium">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {t("search.advanced.active_filters")}: <strong>{advancedSearchResults.length}</strong> {t("search.advanced.landfills")}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              clearResults();
              resetFilters();
            }}
            className="flex items-center justify-center rounded-lg p-1 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
            title={t("search.clear_advanced")}
          >
            <Trash2 size={13} />
          </button>
        </div>
      )}

      {showInput && (
        <div className="flex justify-end px-1 -mt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              useUiStore.getState().toggleActiveModal("advanced-search");
            }}
            className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold transition-colors flex items-center gap-0.5"
          >
            <span>{t("search.advanced.title")}</span>
            <span>→</span>
          </button>
        </div>
      )}

      {showInput && (
        <div className="space-y-3">
          {totalItems > 0 ? (
            <>
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  {t("search.results_title")}
                </span>
                <span
                  className="hidden text-[10px] text-slate-400 sm:inline-block"
                  dangerouslySetInnerHTML={{
                    __html: t("search.keyboard_hint"),
                  }}
                />
              </div>

              <div className="space-y-1">
                {suggestions.map((item, index) => (
                  <SearchCard
                    key={item.id}
                    item={item}
                    active={index === highlightedIndex}
                    onClick={() => onSelect(item)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  />
                ))}

                {hasMoreCard && (
                  <MoreResultsCard
                    query={searchQuery}
                    active={highlightedIndex === suggestions.length}
                    onClick={onOpenIndex}
                    onMouseEnter={() => setHighlightedIndex(suggestions.length)}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              {searchQuery ? (
                <p className="text-sm text-slate-500">
                  {t("search.no_results", { query: searchQuery })}
                </p>
              ) : (
                <p className="text-sm text-slate-400">
                  {t("search.start_typing")}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
