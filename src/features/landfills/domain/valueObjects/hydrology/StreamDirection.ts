// src/features/landfills/domain/valueObjects/hydrology/StreamDirection.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const STREAM_DIRECTIONS = [
    "UPSTREAM", "DOWNSTREAM", "UNKNOWN"
] as const;

export type StreamDirection = typeof STREAM_DIRECTIONS[number];

export const StreamDirectionVO : TranslatableEnumVO<StreamDirection, StreamDirection> = {
  hydrate: (value: string | null): StreamDirection => {
    if (!value) return "UNKNOWN"
    return value as StreamDirection;
  },
  values: (): readonly StreamDirection[] => STREAM_DIRECTIONS,
  getTxKey: function (value: StreamDirection): string {
    return `domain.vos.hydrology.stream_direction.types.${value.toLowerCase()}`
  }
};