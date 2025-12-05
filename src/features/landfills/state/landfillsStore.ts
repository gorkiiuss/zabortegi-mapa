// src/features/landfills/state/landfillsStore.ts

import { create } from "zustand";
import type { Landfill } from "../domain/types";
import { geoJsonLandfillRepository } from "../data/geojsonRepository";

interface LandfillsState {
  landfills: Landfill[];
  loading: boolean;
  hasLoaded: boolean;
  error: string | null;

  loadAll: () => Promise<void>;
  markAsRendered: () => void;
}

export const useLandfillsStore = create<LandfillsState>((set, get) => ({
  landfills: [],
  loading: false,
  hasLoaded: false,
  error: null,

  markAsRendered: () => {
    set({ loading: false, hasLoaded: true });
  },

  async loadAll() {
    const { loading, hasLoaded } = get();
    if (loading || hasLoaded) return;

    try {
      set({ loading: true, hasLoaded: false, error: null });

      const landfills = await geoJsonLandfillRepository.getAll();

      // CASO IMPORTANTE: Si no hay vertederos, no se renderiza nada en el mapa,
      // así que nadie avisará. Cerramos aquí directamente.
      if (landfills.length === 0) {
        set({ landfills, loading: false, hasLoaded: true });
        return;
      }

      set({ landfills });
    } catch (err) {
      console.error(err);
      set({ loading: false, hasLoaded: false, error: "Error" });
    }
  },
}));
