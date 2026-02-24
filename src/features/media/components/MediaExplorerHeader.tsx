// src/features/media/components/MediaExplorerHeader.tsx

import { useLanguageStore } from "@shared/state/languageStore";
import { Search, X } from "@shared/components/Icons";
import { useMediaExplorerStore, type SortOption } from "../state/mediaExplorerStore";
import { ArrowDown, ArrowUp } from "@shared/components/Icons";

interface Props {
    totalCount: number;
    onClose: () => void;
}

export function MediaExplorerHeader({ totalCount, onClose }: Props) {
    const { t } = useLanguageStore();
    const {
        searchQuery, setSearchQuery,
        typeFilter, setTypeFilter,
        sortBy, setSortBy,
        sortDirection, setSortDirection,
        viewMode, setViewMode
    } = useMediaExplorerStore();

    const title = t("media_explorer.title");
    const subtitle = t("media_explorer.subtitle", { count: totalCount });

    return (
        <div className="flex shrink-0 flex-col border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <div>
                    <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
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

            <div className="px-4 pt-3 pb-2">
                <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search size={16} className="text-slate-400 group-focus-within:text-emerald-500" />
                    </div>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t("media_explorer.search_placeholder")}
                        className="block w-full rounded-xl border border-slate-300 bg-white py-2 pr-3 pl-9 text-sm shadow-sm transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-4 pb-3">
                <div className="flex rounded-lg bg-slate-200/50 p-1">
                    {(['all', 'image', 'pdf'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setTypeFilter(type)}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${typeFilter === type ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {type === 'all' ? 'Todos' : type === 'image' ? 'Fotos' : 'PDFs'}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-1">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 shadow-sm focus:border-emerald-500 focus:outline-none"
                    >
                        <option value="related">Agrupar por Vertedero/Noticia</option>
                        <option value="context">Agrupar por Origen</option>
                        <option value="type">Agrupar por Tipo</option>
                        <option value="az">Orden Alfabético (A-Z)</option>
                    </select>

                    <button 
                        onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                        className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 shadow-sm hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                        title={t("media_explorer.toggle_sort_direction")}
                    >
                        {sortDirection === 'asc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                    </button>

                    <button
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        className="rounded-lg border border-slate-200 bg-white p-1 text-slate-500 shadow-sm hover:bg-slate-50 hover:text-slate-700"
                        title="Cambiar vista"
                    >
                        <span className="text-xs font-bold px-1">{viewMode === 'grid' ? 'GRID' : 'LIST'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}