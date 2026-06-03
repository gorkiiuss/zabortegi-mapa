// src/features/about/domain/valueObjects/Widget.ts

import { MultilingualTextVO, type MultilingualText } from "./MultilingualText";

export interface CounterWidgetConfig {
  readonly type: "counter";
  readonly presetId?: number;
  readonly targetDate?: string;
  readonly startDate?: string;
  readonly label: MultilingualText;
  readonly targetDateLabel?: MultilingualText;
  readonly style?: "neutral" | "alarm" | "success";
}

export interface GalleryWidgetConfig {
  readonly type: "gallery";
  readonly images: string[];
}

export type Widget = CounterWidgetConfig | GalleryWidgetConfig;

export const WidgetVO = {
  hydrate: (raw: any): Widget => {
    if (raw?.type === "gallery") {
      return {
        type: "gallery",
        images: Array.isArray(raw?.images) ? raw.images : [],
      };
    }
    return {
      type: "counter",
      presetId: raw?.presetId,
      targetDate: raw?.targetDate,
      startDate: raw?.startDate,
      label: MultilingualTextVO.hydrate(raw?.label),
      targetDateLabel: raw?.targetDateLabel ? MultilingualTextVO.hydrate(raw.targetDateLabel) : undefined,
      style: raw?.style ?? "neutral",
    };
  },
};
