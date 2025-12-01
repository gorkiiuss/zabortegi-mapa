// src/features/map/state/uiStore.ts
import { create } from "zustand";

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
  | "contact";

interface UiState {
  selectedLandfillId: string | null;
  searchQuery: string;
  indexQuery: string;

  modalStack: ModalId[];
  activeModal: ModalId;

  setSelectedLandfillId: (id: string | null) => void;
  setSearchQuery: (q: string) => void;

  openModal: (id: ModalId, stackPrevious?: boolean) => void;
  toggleActiveModal: (id: ModalId, stackPrevious?: boolean) => void;
  closeModal: () => void;

  openIndexWithQuery: (q: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  selectedLandfillId: null,
  searchQuery: "",
  indexQuery: "",
  activeModal: "none",
  modalStack: [],

  setSelectedLandfillId: (id) => set({ selectedLandfillId: id }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  openModal: (id, stackPrevious = false) =>
    set((state) => {
      const newStack =
        stackPrevious && state.activeModal !== "none"
          ? [...state.modalStack, state.activeModal]
          : state.modalStack;

      return {
        activeModal: id,
        modalStack: newStack,
      };
    }),
  toggleActiveModal: (id, stackPrevious = false) =>
    set((state) => {
      if (state.activeModal === id) {
        const newStack = [...state.modalStack];
        const prev = newStack.pop() || "none";
        return { activeModal: prev, modalStack: newStack };
      }

      const newStack =
        stackPrevious && state.activeModal !== "none"
          ? [...state.modalStack, state.activeModal]
          : [];

      return {
        activeModal: id,
        modalStack: newStack,
      };
    }),
  closeModal: () =>
    set((state) => {
      if (state.modalStack.length === 0) {
        return { activeModal: "none", modalStack: [] };
      }

      const newStack = [...state.modalStack];
      const prev = newStack.pop() ?? "none";

      return {
        activeModal: prev,
        modalStack: newStack,
      };
    }),

  openIndexWithQuery: (q) =>
    set((state) => {
      if (state.activeModal === "index") {
        const newStack = [...state.modalStack];
        const prev = newStack.pop() || "none";
        return { activeModal: prev, modalStack: newStack };
      }

      const newStack =
        state.activeModal !== "none"
          ? [...state.modalStack, state.activeModal]
          : [];

      return {
        indexQuery: q,
        activeModal: "index",
        modalStack: newStack,
      };
    }),
}));
