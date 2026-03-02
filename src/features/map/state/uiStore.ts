// src/features/map/state/uiStore.ts

import { create } from "zustand";

export interface GalleryData {
  title: string;
  images: Array<{ url: string; title?: string }>;
}

export interface AboutData {
  initialTab: "changelog" | "announcements" | "project";
  targetAnnouncementId?: string;
}

export type ModalPayload = GalleryData | AboutData | null;

export type ModalId =
  | "none"
  | "search"
  | "legend"
  | "toolbar"
  | "selection"
  | "index"
  | "gallery"
  | "related_documentation"
  | "attributions"
  | "about"
  | "future_feature"
  | "contact"
  | "media_explorer";

interface UiState {
  selectedLandfillId: string | null;
  searchQuery: string;
  indexQuery: string;

  modalStack: ModalId[];
  activeModal: ModalId;

  modalData: ModalPayload;

  setSelectedLandfillId: (id: string | null) => void;
  setSearchQuery: (q: string) => void;

  openModal: (id: ModalId, stackPrevious?: boolean, data?: ModalPayload) => void;
  toggleActiveModal: (id: ModalId, stackPrevious?: boolean, data?: ModalPayload) => void;
  closeModal: () => void;

  openIndexWithQuery: (q: string) => void;

  openToolbarDropdownId: string | null;
  setOpenToolbarDropdownId: (id: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  selectedLandfillId: null,
  searchQuery: "",
  indexQuery: "",
  activeModal: "none",
  modalStack: [],
  modalData: null,
  openToolbarDropdownId: null,


  setSelectedLandfillId: (id) => set({ selectedLandfillId: id }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  openModal: (id, stackPrevious = false, data = null) =>
    set((state) => {
      // Si el modal ya está abierto y le pasamos nuevos datos o es la misma ID, actualizamos el modalData
      if (state.activeModal === id) {
        return {
          modalData: data,
        };
      }

      const newStack =
        stackPrevious && state.activeModal !== "none"
          ? [...state.modalStack, state.activeModal]
          : state.modalStack;

      return {
        activeModal: id,
        modalStack: newStack,
        modalData: data,
      };
    }),

  toggleActiveModal: (id, stackPrevious = false, data = null) =>
    set((state) => {
      if (state.activeModal === id) {
        const newStack = [...state.modalStack];
        const prev = newStack.pop() || "none";
        return { activeModal: prev, modalStack: newStack, modalData: null };
      }

      const newStack =
        stackPrevious && state.activeModal !== "none"
          ? [...state.modalStack, state.activeModal]
          : [];

      return {
        activeModal: id,
        modalStack: newStack,
        modalData: data,
      };
    }),

  closeModal: () =>
    set((state) => {
      if (state.modalStack.length === 0) {
        return { activeModal: "none", modalStack: [], modalData: null };
      }

      const newStack = [...state.modalStack];
      const prev = newStack.pop() ?? "none";

      return {
        activeModal: prev,
        modalStack: newStack,
        modalData: null,
        openToolbarDropdownId: null,
      };
    }),

  openIndexWithQuery: (q) =>
    set((state) => {
      if (state.activeModal === "index") {
        const newStack = [...state.modalStack];
        const prev = newStack.pop() || "none";
        return { activeModal: prev, modalStack: newStack, modalData: null };
      }

      const newStack =
        state.activeModal !== "none"
          ? [...state.modalStack, state.activeModal]
          : [];

      return {
        indexQuery: q,
        activeModal: "index",
        modalStack: newStack,
        modalData: null,
      };
    }),

  setOpenToolbarDropdownId: (id) => set({ openToolbarDropdownId: id }),
}));