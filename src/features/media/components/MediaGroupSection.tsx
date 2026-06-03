// src/features/media/components/MediaGroupSection.tsx

import { useState, useEffect } from "react";
import type { MediaItemEntity } from "../domain/entities/MediaItemEntity";
import type { ViewMode } from "../state/mediaExplorerStore";
import { MediaItemCard } from "./MediaItemCard";
import { useLanguageStore } from "@shared/state/languageStore";
import { Plus } from "@shared/components/Icons";

interface Props {
    group: { key: string; label: string; items: MediaItemEntity[] };
    viewMode: ViewMode;
    forceOpen?: boolean;
}

const ITEMS_PER_PAGE = 40;

export function MediaGroupSection({ group, viewMode, forceOpen = false }: Props) {
    const [isOpen, setIsOpen] = useState(forceOpen);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const { t } = useLanguageStore();

    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
    }, [group.items]);

    const visibleItems = group.items.slice(0, visibleCount);
    const hasMore = visibleCount < group.items.length;
    const remainingCount = group.items.length - visibleCount;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    return (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60">
            <button
                type="button"
                className="flex w-full items-center justify-between bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100/80 transition-colors"
                onClick={() => !forceOpen && setIsOpen((prev) => !prev)}
                style={{ cursor: forceOpen ? 'default' : 'pointer' }}
            >
                <span className="truncate pr-4 text-left">{group.label}</span>
                <div className="flex shrink-0 items-center gap-3 text-xs text-slate-500 font-medium">
                    <span>{t("media_explorer.items_count", { count: group.items.length })}</span>
                    {!forceOpen && <span className="text-base leading-none">{isOpen ? "▾" : "▸"}</span>}
                </div>
            </button>

            {isOpen && (
                <div className="bg-white px-4 py-4">
                    <div className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'
                            : 'flex flex-col gap-2'
                    }>
                        {visibleItems.map((item) => (
                            <MediaItemCard key={item.id} item={item} viewMode={viewMode} />
                        ))}
                    </div>

                    {hasMore && (
                        <div className="mt-6 mb-2 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow"
                            >
                                <Plus size={16} className="transition-transform group-hover:rotate-90" />
                                <span>
                                    {t("media_explorer.load_more", { count: remainingCount })}
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}