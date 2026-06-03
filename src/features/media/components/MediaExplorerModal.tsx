// src/features/media/components/MediaExplorerModal.tsx

import { useMemo } from "react";
import { useUiStore } from "@features/map/state/uiStore";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useLanguageStore } from "@shared/state/languageStore";

import { useMediaIndex } from "../hooks/useMediaIndex";
import { useMediaExplorerStore } from "../state/mediaExplorerStore";
import type { MediaItemEntity } from "../domain/entities/MediaItemEntity";
import { Spinner } from "@shared/components/Icons";

import { MediaExplorerHeader } from "./MediaExplorerHeader";
import { MediaGroupSection } from "./MediaGroupSection";

export function MediaExplorerModal() {
    const { closeModal } = useUiStore();
    const { t, currentLanguage } = useLanguageStore();

    const { modalRef, handleMouseEnter, handleMouseLeave } = useMapModalInteractions();

    const { mediaItems, isLoading } = useMediaIndex();
    const { searchQuery, typeFilter, contextFilter, sortBy, sortDirection, viewMode } = useMediaExplorerStore();

    const filteredMedia = useMemo(() => {
        return mediaItems.filter((item) => {
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                item.fileName.toLowerCase().includes(q) ||
                item.title.toLowerCase().includes(q) ||
                item.relatedName.toLowerCase().includes(q);

            const matchesType = typeFilter === "all" ? true : item.category === typeFilter;
            const matchesContext = contextFilter === "all" ? true : item.context === contextFilter;

            return matchesSearch && matchesType && matchesContext;
        });
    }, [mediaItems, searchQuery, typeFilter, contextFilter]);

    const groupedMedia = useMemo(() => {
        if (sortBy === "az") {
            const sorted = [...filteredMedia].sort((a, b) => a.title.localeCompare(b.title));
            if (sortDirection === "desc") sorted.reverse();

            return [{
                key: "all",
                label: t("media_explorer.all_files"),
                items: sorted
            }];
        }

        const groups: Record<string, { key: string; label: string; items: MediaItemEntity[] }> = {};

        filteredMedia.forEach((item) => {
            let key = "other";
            let label = "Otros";

            if (sortBy === "type") {
                key = item.category;
                label = item.category === "IMAGE" ? t("media_explorer.image_label") : t("media_explorer.document_label");
            } else if (sortBy === "context") {
                key = item.context;
                if (item.context === "LANDFILL_IMAGE") label = t("media_explorer.image_context_label");
                if (item.context === "LANDFILL_DOC") label = t("media_explorer.document_context_label");
                if (item.context === "ANNOUNCEMENT") label = t("media_explorer.announcement_context_label");
            } else if (sortBy === "related") {
                key = item.relatedId;
                label = item.relatedName;
            }

            if (!groups[key]) groups[key] = { key, label, items: [] };
            groups[key].items.push(item);
        });

        const finalGroups = Object.values(groups).sort((a, b) => a.label.localeCompare(b.label));
        if (sortDirection === "desc") finalGroups.reverse();
        finalGroups.forEach(group => {
            group.items.sort((a, b) => a.title.localeCompare(b.title));
            if (sortDirection === "desc") group.items.reverse();
        });

        return finalGroups;
    }, [filteredMedia, sortBy, sortDirection, currentLanguage]);

    if (isLoading) {
        return (
            <div
                ref={modalRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="pointer-events-auto flex h-full w-full flex-col items-center justify-center p-6 rounded-none sm:rounded-2xl border-0 sm:border border-slate-200 bg-white shadow-2xl"
            >
                <div className="flex flex-col items-center justify-center">
                    <Spinner className="h-8 w-8 animate-spin text-emerald-600" />
                    <p className="mt-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {t("media_explorer.loading")}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={modalRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-none sm:rounded-2xl border-0 sm:border border-slate-200 bg-white shadow-2xl`}
        >
            <MediaExplorerHeader totalCount={filteredMedia.length} onClose={closeModal} />

            <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30 px-4 py-4">
                {groupedMedia.length > 0 && groupedMedia[0].items.length > 0 ? (
                    <div className="space-y-4">
                        {groupedMedia.map((group) => (
                            <MediaGroupSection
                                key={group.key}
                                group={group}
                                viewMode={viewMode}
                                forceOpen={groupedMedia.length === 1}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center p-8 text-center text-slate-400">
                        <p className="text-sm">{t("list.not_found")}</p>
                    </div>
                )}
            </div>
        </div>
    );
}