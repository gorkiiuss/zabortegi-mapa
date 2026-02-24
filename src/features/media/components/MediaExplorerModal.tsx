// src/features/media/components/MediaExplorerModal.tsx

import { useMemo } from "react";
import { useUiStore } from "@features/map/state/uiStore";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useLanguageStore } from "@shared/state/languageStore";

import { useMediaIndex } from "../hooks/useMediaIndex";
import { useMediaExplorerStore } from "../state/mediaExplorerStore";
import type { MediaItem } from "@shared/domain/mediaTypes";

import { MediaExplorerHeader } from "./MediaExplorerHeader";
import { MediaGroupSection } from "./MediaGroupSection";

export function MediaExplorerModal() {
    const { closeModal } = useUiStore();
    const { t, currentLanguage } = useLanguageStore();

    const { modalRef, handleMouseEnter, handleMouseLeave } = useMapModalInteractions();

    const allMedia = useMediaIndex();
    const { searchQuery, typeFilter, contextFilter, sortBy, sortDirection, viewMode } = useMediaExplorerStore();

    const filteredMedia = useMemo(() => {
        return allMedia.filter((item) => {
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                item.filename.toLowerCase().includes(q) ||
                item.title.toLowerCase().includes(q) ||
                item.relatedName.toLowerCase().includes(q);

            const matchesType = typeFilter === "all" ? true : item.type === typeFilter;
            const matchesContext = contextFilter === "all" ? true : item.context === contextFilter;

            return matchesSearch && matchesType && matchesContext;
        });
    }, [allMedia, searchQuery, typeFilter, contextFilter]);

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

        const groups: Record<string, { label: string; items: MediaItem[] }> = {};

        filteredMedia.forEach((item) => {
            let key = "other";
            let label = "Otros";

            if (sortBy === "type") {
                key = item.type;
                label = item.type === "image" ? t("media_explorer.image_label") : t("media_explorer.document_label");
            } else if (sortBy === "context") {
                key = item.context;
                if (item.context === "landfill_image") label = t("media_explorer.image_context_label");
                if (item.context === "landfill_doc") label = t("media_explorer.document_context_label");
                if (item.context === "announcement") label = t("media_explorer.announcement_context_label");
            } else if (sortBy === "related") {
                key = item.relatedId;
                label = item.relatedName;
            }

            if (!groups[key]) groups[key] = { label, items: [] };
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

    return (
        <div
            ref={modalRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl`}
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
                        <p className="text-sm">{t("index.not_found")}</p>
                    </div>
                )}
            </div>
        </div>
    );
}