// src/features/about/domain/valueObjects/ChangeLogItem.ts

import { MultilingualTextVO, type MultilingualText } from "./MultilingualText";
import type { AppAction } from "@features/orchestrator/types";

export interface ChangeLogItem {
  readonly text: MultilingualText;
  readonly action?: AppAction;
}

export const ChangeLogItemVO = {
  hydrate: (raw: any): ChangeLogItem => {
    return {
      text: MultilingualTextVO.hydrate(raw?.text),
      action: raw?.action ?? undefined,
    };
  },
};
