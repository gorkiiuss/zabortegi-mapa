// src/features/landfills/domain/valueObjects/operation/DepositShape.ts

import type { TranslatableEnumVO } from "@shared/domain/interfaces/TranslatableEnumVO";

const DEPOSIT_SHAPES = [
    "PLATFORM_WITH_STEEP_SLOPE", "SMALL_PILES", "UNIFORM_PILE", "BENCHES", "SEVERAL_WORKING_FACES", "FAN_SHAPED"
] as const;

export type DepositShape = typeof DEPOSIT_SHAPES[number];

export const DepositShapeVO : TranslatableEnumVO<DepositShape> = {
  hydrate: (value: string | null | undefined): DepositShape | null => {
    if (!value) return null;
    return value as DepositShape;
  },
  values: (): readonly DepositShape[] => DEPOSIT_SHAPES,
  getTxKey: function (value: DepositShape): string {
      return `domain.vos.operation.deposit_shapes.types.${value.toLocaleLowerCase()}`
  }
};