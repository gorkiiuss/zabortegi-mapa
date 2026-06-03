// src/features/landfills/state/landfillsStore.ts

import { create } from "zustand";
import type { LandfillSummaryEntity } from "../domain/entities/LandfillSummary";
import { apiLandfillsRepository } from "../data/apiRepository";

interface LandfillsState {
  landfillsSummary: LandfillSummaryEntity[];
  isLoadingSummary: boolean;
  summaryError: string | null;
  fetchSummaryList: () => Promise<void>;
}

export const useLandfillsStore = create<LandfillsState>((set, get) => ({
  landfillsSummary: [],
  isLoadingSummary: false,
  summaryError: null,

  fetchSummaryList: async () => {
    if (get().isLoadingSummary || get().landfillsSummary.length > 0) return;

    set({ isLoadingSummary: true, summaryError: null });
    try {
      const summaryData = await apiLandfillsRepository.getSummary();
      set({ landfillsSummary: summaryData, isLoadingSummary: false });
    } catch (err: any) {
      set({
        summaryError: err.message || "Error while loading landfill points on the map",
        isLoadingSummary: false,
      });
    }
  },
}));
