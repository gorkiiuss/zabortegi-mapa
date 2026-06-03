// src/shared/domain/interfaces/TranslatableEnumVO.ts

import type { ViewableEnumVO } from "./ViewableEnumVO";

export interface TranslatableEnumVO<T, ReturnType = T | null> extends ViewableEnumVO<T> {
  values: () => readonly T[];
  hydrate: (value: string | null) => ReturnType;
}