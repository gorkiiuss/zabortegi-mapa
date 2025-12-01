// src/features/landfills/components/index/LandfillIndexHeader.tsx

import { useLanguageStore } from "@shared/state/languageStore";

interface LandfillIndexHeaderProps {
  query: string;
  totalCount: number;
  matchCount: number;
  onQueryChange: (value: string) => void;
  onClose: () => void;
}

export function LandfillIndexHeader({
  query,
  totalCount,
  matchCount,
  onQueryChange,
  onClose,
}: LandfillIndexHeaderProps) {
  const trimmed = query.trim();

  const { t } = useLanguageStore();

  const subtitle = trimmed
    ? `${t("index.header.subtitle_q", { count: totalCount, found: matchCount })}`
    : `${t("index.header.subtitle", { count: totalCount })}`;

  return (
    <div className="flex shrink-0 flex-col border-b border-slate-200 bg-slate-50/50">
      {/* ─── FILA SUPERIOR: Título y Cerrar ─── */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            {t("index.header.title")}
          </h2>
          <p className="text-[11px] text-slate-500">{subtitle}</p>
        </div>

        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
          aria-label="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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

      {/* ─── FILA INFERIOR: Buscador Integrado ─── */}
      <div className="px-4 pb-3">
        <div className="group relative">
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
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t("search.placeholder")}
            className="block w-full rounded-xl border border-slate-300 bg-white py-2 pr-3 pl-9 text-sm shadow-sm transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
