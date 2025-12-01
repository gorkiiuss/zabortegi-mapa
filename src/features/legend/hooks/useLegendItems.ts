import { useMemo } from "react";
import { useLanguageStore } from "@shared/state/languageStore";
import { legendConfig } from "../domain/config";
import type { LegendItem } from "../domain/types";

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
          alt: t(labelKey),
        },
        label: t(labelKey),
        note: t(noteKey),
      };
    });
  }, [t]);

  return items;
}
