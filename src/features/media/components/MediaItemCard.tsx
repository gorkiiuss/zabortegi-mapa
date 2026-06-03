// src/features/media/components/MediaItemCard.tsx

import type { MediaItemEntity } from "../domain/entities/MediaItemEntity";
import type { ViewMode } from "../state/mediaExplorerStore";
import { useUiStore } from "@features/map/state/uiStore";
import { FileText, Image as ImageIcon } from "@shared/components/Icons";

interface Props {
    item: MediaItemEntity;
    viewMode: ViewMode;
}

export function MediaItemCard({ item, viewMode }: Props) {
    const { toggleActiveModal } = useUiStore();

    const handleAction = () => {
        if (item.category === 'PDF') {
            window.open(item.filePath, '_blank', 'noopener,noreferrer');
        } else if (item.category === 'IMAGE') {
            toggleActiveModal('gallery', true, {
                title: item.title || item.relatedName,
                images: [item]
            });
        }
    };

    const isPdf = item.category === 'PDF';

    if (viewMode === 'list') {
        return (
            <div
                onClick={handleAction}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm"
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div className={`shrink-0 rounded-lg p-2 ${isPdf ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                        {isPdf ? <FileText size={16} /> : <ImageIcon size={16} />}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">{item.title}</p>
                        <p className="truncate text-[10px] text-slate-500">{item.relatedName}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={handleAction}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md hover:border-emerald-300"
        >
            {item.category === 'IMAGE' ? (
                <img src={item.filePath} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
            ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-white text-red-400 group-hover:text-red-500 transition-colors">
                    <FileText size={40} strokeWidth={1.5} />
                    <span className="mt-2 text-[10px] font-bold tracking-widest uppercase text-slate-400">PDF</span>
                </div>
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 text-white opacity-0 transition-opacity group-hover:opacity-100 lg:opacity-0">
                <p className="line-clamp-2 text-[10px] font-medium leading-tight shadow-black drop-shadow-md">
                    {item.title}
                </p>
            </div>
        </div>
    );
}