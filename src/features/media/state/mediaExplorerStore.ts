// src/features/media/state/mediaExplorerStore.ts

import { create } from 'zustand';
import type { MediaType, MediaContext } from '@shared/domain/mediaTypes';

export type SortOption = 'az' | 'za' | 'type' | 'context' | 'related';
export type SortDirection = 'asc' | 'desc';
export type ViewMode = 'grid' | 'list';

interface MediaExplorerState {
    searchQuery: string;
    typeFilter: MediaType | 'all';
    contextFilter: MediaContext | 'all';

    sortBy: SortOption;
    sortDirection: SortDirection;
    viewMode: ViewMode;

    setSearchQuery: (query: string) => void;
    setTypeFilter: (type: MediaType | 'all') => void;
    setContextFilter: (context: MediaContext | 'all') => void;
    setSortBy: (sort: SortOption) => void;
    setSortDirection: (dir: SortDirection) => void;
    setViewMode: (mode: ViewMode) => void;
    resetFilters: () => void;
}

export const useMediaExplorerStore = create<MediaExplorerState>((set) => ({
    searchQuery: '',
    typeFilter: 'all',
    contextFilter: 'all',
    sortBy: 'az',
    sortDirection: 'asc',
    viewMode: 'grid',

    setSearchQuery: (query) => set({ searchQuery: query }),
    setTypeFilter: (type) => set({ typeFilter: type }),
    setContextFilter: (context) => set({ contextFilter: context }),
    setSortBy: (sort) => set({ sortBy: sort }),
    setSortDirection: (dir) => set({ sortDirection: dir }),
    setViewMode: (mode) => set({ viewMode: mode }),
    resetFilters: () => set({
        searchQuery: '',
        typeFilter: 'all',
        contextFilter: 'all',
        sortBy: 'az',
        sortDirection: 'asc'
    }),
}));