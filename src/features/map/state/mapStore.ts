// src/features/map/state/mapStore.ts
import { create } from "zustand";

interface MapViewport {
  center: { lat: number; lng: number };
  zoom: number;
  bounds?: [number, number, number, number];
}

interface MapState {
  viewport: MapViewport;
  maxVisibleInReduced: number;
  showNoInfoLandfills: boolean;

  focusLandfillId: string | null;

  setViewport: (partial: Partial<MapViewport>) => void;
  setBounds: (bounds: [number, number, number, number] | undefined) => void;
  toggleShowNoInfoLandfills: () => void;
  setMaxVisibleInReduced: (value: number) => void;
  setFocusLandfillId: (id: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  viewport: {
    center: { lat: 43.4, lng: -2.9 },
    zoom: 9,
    bounds: undefined,
  },
  showNoInfoLandfills: false,
  maxVisibleInReduced: 20,
  focusLandfillId: null,

  setViewport: (partial) =>
    set((state) => ({
      viewport: {
        ...state.viewport,
        ...partial,
      },
    })),

  setBounds: (bounds) =>
    set((state) => ({
      viewport: {
        ...state.viewport,
        bounds,
      },
    })),

  toggleShowNoInfoLandfills: () =>
    set((state) => ({
      showNoInfoLandfills: !state.showNoInfoLandfills,
    })),

  setMaxVisibleInReduced: (maxVisibleInReduced) => set({ maxVisibleInReduced }),

  setFocusLandfillId: (focusLandfillId) => set({ focusLandfillId }),
}));
