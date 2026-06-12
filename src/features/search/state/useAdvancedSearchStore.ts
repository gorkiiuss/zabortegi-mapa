// src/features/search/state/useAdvancedSearchStore.ts

import { create } from "zustand";
import type { AdvancedSearchQuery } from "../domain/entities/AdvancedSearchQuery";
import type { LandfillSummaryEntity } from "@features/landfills/domain/entities/LandfillSummary";
import { apiLandfillsRepository } from "@features/landfills/data/apiRepository";

interface AdvancedSearchState {
  filters: AdvancedSearchQuery;
  advancedSearchResults: LandfillSummaryEntity[] | null;
  isSearching: boolean;
  searchError: string | null;
  
  updateFilter: <K extends keyof AdvancedSearchQuery>(
    key: K,
    filter: AdvancedSearchQuery[K] | undefined
  ) => void;
  resetFilters: () => void;
  clearResults: () => void;
  executeSearch: () => Promise<void>;
}

export const useAdvancedSearchStore = create<AdvancedSearchState>((set, get) => ({
  filters: {},
  advancedSearchResults: null,
  isSearching: false,
  searchError: null,

  updateFilter: (key, filter) => {
    set((state) => {
      const nextFilters = { ...state.filters };
      if (filter === undefined) {
        delete nextFilters[key];
      } else {
        nextFilters[key] = filter as any;
      }
      return { filters: nextFilters };
    });
  },

  resetFilters: () => {
    set({ filters: {} });
  },

  clearResults: () => {
    set({ advancedSearchResults: null, searchError: null });
  },

  executeSearch: async () => {
    set({ isSearching: true, searchError: null });
    try {
      const results = await apiLandfillsRepository.advancedSearch(get().filters);
      set({ advancedSearchResults: results, isSearching: false });
    } catch (err: any) {
      set({
        searchError: err.message || "Error during advanced search execution",
        isSearching: false,
      });
    }
  },
}));
