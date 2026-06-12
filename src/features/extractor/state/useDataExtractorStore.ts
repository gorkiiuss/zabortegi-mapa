// src/features/extractor/state/useDataExtractorStore.ts

import { create } from "zustand";
import { FULL_DETAILS_SCHEMA } from "@features/landfills/components/details/fullDetails/fullDetailsSchema";

export type LandfillsExportOption = "all" | "filtered" | "manual";

interface DataExtractorState {
  currentStep: number;
  selectedOption: LandfillsExportOption;
  manualSelectedIds: Record<string, boolean>;
  selectedFields: Record<string, Record<string, boolean>>; // sectionTitleKey -> fieldKey -> boolean
  csvDelimiter: "," | ";";
  translateHeaders: boolean;
  isExporting: boolean;

  setStep: (step: number) => void;
  setSelectedOption: (opt: LandfillsExportOption) => void;
  toggleLandfillManual: (id: string) => void;
  setAllLandfillsManual: (ids: string[], selected: boolean) => void;
  toggleField: (sectionTitleKey: string, fieldKey: string) => void;
  toggleSectionFields: (sectionTitleKey: string, selected: boolean) => void;
  toggleAllFields: (selected: boolean) => void;
  setCsvDelimiter: (delim: "," | ";") => void;
  setTranslateHeaders: (val: boolean) => void;
  setIsExporting: (val: boolean) => void;
  reset: () => void;
}

const getInitialFields = () => {
  const fieldsMap: Record<string, Record<string, boolean>> = {};
  FULL_DETAILS_SCHEMA.forEach((section) => {
    fieldsMap[section.titleKey] = {};
    Object.keys(section.fields).forEach((fieldKey) => {
      fieldsMap[section.titleKey][fieldKey] = true;
    });
  });
  return fieldsMap;
};

export const useDataExtractorStore = create<DataExtractorState>((set) => ({
  currentStep: 1,
  selectedOption: "all",
  manualSelectedIds: {},
  selectedFields: getInitialFields(),
  csvDelimiter: ",",
  translateHeaders: true,
  isExporting: false,

  setStep: (step) => set({ currentStep: step }),
  setSelectedOption: (opt) => set({ selectedOption: opt }),
  toggleLandfillManual: (id) =>
    set((state) => ({
      manualSelectedIds: {
        ...state.manualSelectedIds,
        [id]: !state.manualSelectedIds[id],
      },
    })),
  setAllLandfillsManual: (ids, selected) =>
    set((state) => {
      const next = { ...state.manualSelectedIds };
      ids.forEach((id) => {
        next[id] = selected;
      });
      return { manualSelectedIds: next };
    }),
  toggleField: (sectionTitleKey, fieldKey) =>
    set((state) => {
      const nextFields = { ...state.selectedFields };
      if (nextFields[sectionTitleKey]) {
        nextFields[sectionTitleKey] = {
          ...nextFields[sectionTitleKey],
          [fieldKey]: !nextFields[sectionTitleKey][fieldKey],
        };
      }
      return { selectedFields: nextFields };
    }),
  toggleSectionFields: (sectionTitleKey, selected) =>
    set((state) => {
      const nextFields = { ...state.selectedFields };
      if (nextFields[sectionTitleKey]) {
        const section = { ...nextFields[sectionTitleKey] };
        Object.keys(section).forEach((k) => {
          section[k] = selected;
        });
        nextFields[sectionTitleKey] = section;
      }
      return { selectedFields: nextFields };
    }),
  toggleAllFields: (selected) =>
    set(() => {
      const nextFields = getInitialFields();
      Object.keys(nextFields).forEach((sectionKey) => {
        Object.keys(nextFields[sectionKey]).forEach((fieldKey) => {
          nextFields[sectionKey][fieldKey] = selected;
        });
      });
      return { selectedFields: nextFields };
    }),
  setCsvDelimiter: (delim) => set({ csvDelimiter: delim }),
  setTranslateHeaders: (val) => set({ translateHeaders: val }),
  setIsExporting: (val) => set({ isExporting: val }),
  reset: () =>
    set({
      currentStep: 1,
      selectedOption: "all",
      manualSelectedIds: {},
      selectedFields: getInitialFields(),
      csvDelimiter: ",",
      translateHeaders: true,
      isExporting: false,
    }),
}));
