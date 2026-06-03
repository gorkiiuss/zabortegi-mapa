// src/features/map/state/uiStore.ts

import type { MultimediaEntity } from "@features/landfills/domain/entities/Multimedia";
import type { MediaItemEntity } from "@features/media/domain/entities/MediaItemEntity";
import { create } from "zustand";

export interface GalleryData {
  title: string;
  images: (MultimediaEntity | MediaItemEntity)[];
}

export interface AboutData {
  initialTab: "changelog" | "announcements" | "project";
  targetAnnouncementId?: string;
}

export interface FolderExplorerData {
  targetFolder: string;
}

export type ModalPayload = GalleryData | AboutData | FolderExplorerData | null;

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
  | "media_explorer"
  | "folder_explorer"
  | "full-details"
  | "tutorial_selection";

interface ModalStackEntry {
  id: ModalId;
  data: ModalPayload | null;
}

interface UiState {
  selectedLandfillId: string | null;
  searchQuery: string;
  indexQuery: string;

  aboutModalState: {
    activeTab: "changelog" | "announcements" | "project";
    scrollTop: number;
  };
  setAboutModalState: (state: Partial<UiState["aboutModalState"]>) => void;

  modalStack: ModalStackEntry[];
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
  aboutModalState: {
    activeTab: "project",
    scrollTop: 0,
  },
  activeModal: "none",
  modalStack: [],
  modalData: null,
  openToolbarDropdownId: null,

  setAboutModalState: (partialState) =>
    set((state) => ({
      aboutModalState: { ...state.aboutModalState, ...partialState },
    })),

  setSelectedLandfillId: (id) => set({ selectedLandfillId: id }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  openModal: (id, stackPrevious = false, data = null) =>
    set((state) => {
      if (state.activeModal === id) {
        return {
          modalData: data,
        };
      }

      const newStack =
        stackPrevious && state.activeModal !== "none"
          ? [...state.modalStack, { id: state.activeModal, data: state.modalData }]
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
        const prev = newStack.pop() || { id: "none", data: null };
        return { activeModal: prev.id as ModalId, modalStack: newStack, modalData: prev.data };
      }

      const newStack =
        stackPrevious && state.activeModal !== "none"
          ? [...state.modalStack, { id: state.activeModal, data: state.modalData }]
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
      const prev = newStack.pop() ?? { id: "none", data: null };

      return {
        activeModal: prev.id as ModalId,
        modalStack: newStack,
        modalData: prev.data,
        openToolbarDropdownId: null,
      };
    }),

  openIndexWithQuery: (q) =>
    set((state) => {
      if (state.activeModal === "index") {
        const newStack = [...state.modalStack];
        const prev = newStack.pop() || { id: "none", data: null };
        return { activeModal: prev.id as ModalId, modalStack: newStack, modalData: prev.data };
      }

      const newStack =
        state.activeModal !== "none"
          ? [...state.modalStack, { id: state.activeModal, data: state.modalData }]
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