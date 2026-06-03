// src/features/legend/hooks/useLegendItems.ts

import { useMemo } from "react";
import { useLanguageStore } from "@shared/state/languageStore";
import { legendConfig } from "../config";
import type { LegendItem } from "../types";

export function useLegendItems(): LegendItem[] {
  const { t } = useLanguageStore();

  const items = useMemo(() => {
    return legendConfig.map((config): LegendItem => {
      const labelKey = `legend.items.${config.id}.label`;
      const noteKey = `legend.items.${config.id}.note`;

      return {
        id: config.id,
        icon: {
          kind: "image",
          src: config.icon.src,
          alt: t(labelKey as any),
        },
        label: t(labelKey as any),
        note: t(noteKey as any),
      };
    });
  }, [t]);

  return items;
}
