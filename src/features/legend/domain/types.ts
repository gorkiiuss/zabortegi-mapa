// src/features/legend/domain/types.ts

export type LegendIcon =
  | { kind: "emoji"; value: string }
  | { kind: "image"; src: string; alt: string };

export interface LegendItem {
  id: string;
  icon: LegendIcon;
  label: string;
  note?: string;
}
