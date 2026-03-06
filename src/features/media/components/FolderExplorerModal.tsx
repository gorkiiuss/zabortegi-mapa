// src/features/media/components/FolderExplorerModal.tsx

import { useEffect, useMemo, useState } from "react";
import { useUiStore } from "@features/map/state/uiStore";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useLanguageStore } from "@shared/state/languageStore";
import { X, Search, Folder as FolderIcon, FileIcon, ArrowLeft, Download } from "@shared/components/Icons";

interface FolderIndexItem {
  name: string;
  path: string;
  parentPath: string;
  type: 'folder' | 'file';
  size?: number;
  extension?: string;
}

export function FolderExplorerModal() {
  const { closeModal, modalData } = useUiStore();
  const { handleMouseEnter, handleMouseLeave, modalRef } = useMapModalInteractions();
  const { t } = useLanguageStore();

  const [index, setIndex] = useState<FolderIndexItem[]>([]);
  const [loading, setLoading] = useState(true);

  const rootFolderPath = (modalData as any)?.targetFolder || "";

  const [currentPath, setCurrentPath] = useState(rootFolderPath);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal]);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL;
    fetch(`${baseUrl}data/folder_index.json?v=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        setIndex(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load folder index", err);
        setLoading(false);
      });
  }, []);

  const items = useMemo(() => {
    return index.filter(item => {
      if (!item.parentPath.startsWith(rootFolderPath)) return false;

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        return item.name.toLowerCase().includes(q) || (item.extension && item.extension.toLowerCase().includes(q));
      }

      const normalizedCurrent = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
      const itemParent = item.parentPath.startsWith('/') ? item.parentPath : `/${item.parentPath}`;

      return itemParent === normalizedCurrent;
    }).sort((a, b) => {
      if (a.type === 'folder' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'folder') return 1;
      return a.name.localeCompare(b.name);
    });
  }, [index, currentPath, searchQuery, rootFolderPath]);

  const handleItemClick = (item: FolderIndexItem) => {
    if (item.type === 'folder') {
      setCurrentPath(item.path);
      setSearchQuery("");
    } else {
      window.open(item.path, '_blank');
    }
  };

  const currentFolderChunks = useMemo(() => {
    if (!currentPath.startsWith(rootFolderPath)) return [];

    const rest = currentPath.substring(rootFolderPath.length);
    const parts = rest.split('/').filter(Boolean);
    return parts;
  }, [currentPath, rootFolderPath]);

  const goToRoot = () => {
    setCurrentPath(rootFolderPath);
  };

  const goUp = () => {
    if (currentPath === rootFolderPath || currentFolderChunks.length === 0) return;

    const parts = currentPath.split('/');
    parts.pop();
    setCurrentPath(parts.join('/'));
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "";
    const mb = bytes / (1024 * 1024);
    if (mb < 1) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            {currentPath !== rootFolderPath && (
              <button onClick={goUp} className="p-1 rounded bg-slate-200 hover:bg-slate-300 transition-colors">
                <ArrowLeft size={14} className="text-slate-600" />
              </button>
            )}
            {t("folder_explorer.title")}
          </h2>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
            <button
              onClick={goToRoot}
              className={`hover:text-emerald-600 transition-colors ${currentPath === rootFolderPath ? 'text-emerald-700 font-semibold' : ''}`}
            >
              {rootFolderPath.split('/').filter(Boolean).pop() || "Raíz"}
            </button>
            {currentFolderChunks.map((chunk: string, idx: number) => (
              <span key={idx} className="flex items-center gap-1">
                <span className="text-slate-300">/</span>
                <span className={idx === currentFolderChunks.length - 1 ? 'text-emerald-700 font-semibold' : ''}>{chunk}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder={t("folder_explorer.search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-1.5 pl-8 pr-4 text-xs shadow-sm transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <button
            onClick={closeModal}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
            aria-label={t("selection.close")}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30 p-4">
        {loading ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-slate-400">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          </div>
        ) : items.length > 0 ? (
          <div className="space-y-2">
            {items.map((item, idx) => {
              return (
                <button
                  key={`${item.path}-${idx}`}
                  onClick={() => handleItemClick(item)}
                  className="group flex w-full text-left items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-100/50"
                >
                  <div className={`shrink-0 rounded-lg p-2 transition-colors ${item.type === 'folder'
                    ? "bg-amber-50 text-amber-500 group-hover:bg-amber-100"
                    : (item.extension === '.pdf' ? "bg-red-50 text-red-500 group-hover:bg-red-100" : "bg-blue-50 text-blue-500 group-hover:bg-blue-100")
                    }`}>
                    {item.type === 'folder' ? <FolderIcon size={20} className={item.type === 'folder' ? "fill-current opacity-20" : ""} /> : <FileIcon size={20} />}
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="line-clamp-2 text-sm font-medium text-slate-700 transition-colors group-hover:text-emerald-800">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      {item.type === 'folder' ? "Directorio" : (item.extension || "Archivo").toUpperCase().replace('.', '')}
                      {item.size ? (
                        <>
                          <span className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                          <span>{formatSize(item.size)}</span>
                        </>
                      ) : null}

                      {searchQuery.trim().length > 0 && item.parentPath !== currentPath && (
                        <>
                          <span className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                          <span className="truncate italic text-slate-300 max-w-[120px]">{item.parentPath}</span>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1 text-slate-300 transition-colors group-hover:text-emerald-500">
                    {item.type === 'folder' ? <ArrowLeft size={16} className="rotate-180" /> : <Download size={16} />}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-slate-400">
            <FolderIcon size={32} className="mb-3 opacity-20" />
            <p className="text-sm font-medium text-slate-600">
              {searchQuery ? t("folder_explorer.no_results") : t("folder_explorer.empty_folder")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
