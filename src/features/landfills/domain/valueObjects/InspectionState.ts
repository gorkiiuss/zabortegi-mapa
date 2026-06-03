// src/features/landfills/domain/valueObjects/InspectionState.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const INSPECTION_STATES = [
    "YES", "NO", "UNKNOWN"
] as const;

export type InspectionState = typeof INSPECTION_STATES[number];

export const InspectionStateVO : TranslatableEnumVO<InspectionState> = {
  hydrate: (value: string | null | undefined): InspectionState | null => {
    if (!value) return null;
    return value as InspectionState;
  },
  values: (): readonly InspectionState[] => INSPECTION_STATES,
  getTxKey: function (value: InspectionState): string {
    return `domain.vos.inspection_state_types.${value.toLowerCase()}`
  }
};