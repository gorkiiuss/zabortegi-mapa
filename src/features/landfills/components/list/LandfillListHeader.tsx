// src/features/landfills/components/list/LandfillListHeader.tsx

import { useLanguageStore } from "@shared/state/languageStore";
import { Search, X } from "@shared/components/Icons";

interface LandfillListHeaderProps {
  query: string;
  totalCount: number;
  matchCount: number;
  onQueryChange: (value: string) => void;
  onClose: () => void;
}

export function LandfillListHeader({
  query,
  totalCount,
  matchCount,
  onQueryChange,
  onClose,
}: LandfillListHeaderProps) {
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
          <X size={16} />
        </button>
      </div>

      {/* ─── FILA INFERIOR: Buscador Integrado ─── */}
      <div className="px-4 pb-3">
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={16} className="text-slate-400 group-focus-within:text-emerald-500" />
          </div>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t("app.search_placeholder")}
            className="block w-full rounded-xl border border-slate-300 bg-white py-2 pr-3 pl-9 text-sm shadow-sm transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
