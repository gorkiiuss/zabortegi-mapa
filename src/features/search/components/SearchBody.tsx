import SearchCard from "./SearchCard";
import MoreResultsCard from "./MoreResultsCard";
import type { LandfillSummary } from "@features/landfills/domain/types";
import { useLanguageStore } from "@shared/state/languageStore";

interface SearchBodyProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  suggestions: LandfillSummary[];
  highlightedIndex: number;
  setHighlightedIndex: (i: number) => void;
  hasMoreCard: boolean;
  totalItems: number;
  onSelect: (item: LandfillSummary) => void;
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

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ─── INPUT / FORMULARIO ─── */}
      <form onSubmit={onSubmit} className="group relative">
        {showInput ? (
          // ─── MODO EXPANDIDO / MÓVIL ───
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-emerald-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
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

            {/* BOTÓN BORRAR */}
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-slate-100 p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                aria-label={t("search.aria_clear")}
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        ) : (
          // ─── MODO REDUCIDO ───
          <div className="relative flex cursor-text items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 transition-colors">
            <span className="text-lg opacity-60">🔍</span>

            <span
              className={`flex-1 truncate pr-6 text-sm ${searchQuery ? "font-medium text-slate-800" : "text-slate-500"}`}
            >
              {searchQuery || t("search.placeholder_collapsed")}
            </span>

            {/* BOTÓN BORRAR MODO REDUCIDO */}
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 z-10 rounded-full bg-slate-100 p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                title={t("search.aria_clear")}
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        )}
      </form>

      {/* ─── RESULTADOS ─── */}
      {showInput && (
        <div className="space-y-3">
          {totalItems > 0 ? (
            <>
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  {t("search.results_title")}
                </span>
                {/* HTML inyectado para las teclas de ayuda */}
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
