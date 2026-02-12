// src/features/about/components/widgets/WidgetRenderer.tsx

import type { Widget } from "../../domain/types";
import { CounterWidget } from "./CounterWidget";
import { GalleryWidget } from "./GalleryWidget";

interface Props {
  widgets?: Widget[];
}

export function WidgetRenderer({ widgets }: Props) {
  if (!widgets || widgets.length === 0) return null;

  return (
    <div className="my-6 flex flex-col gap-4">
      {widgets.map((widget, index) => {
        switch (widget.type) {

          case 'counter':
            return <CounterWidget key={`widget-counter-${index}`} config={widget} />;

          case 'gallery':
            return <GalleryWidget key={`widget-gallery-${index}`} config={widget} />;

          default:
            return null;
        }
      })}
    </div>
  );
}