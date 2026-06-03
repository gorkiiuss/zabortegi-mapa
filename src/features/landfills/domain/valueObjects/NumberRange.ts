// src/features/landfills/domain/valueObjects/NumberRange.ts

export interface NumberRange {
  readonly _type: "NumberRange";
  readonly min: number | null;
  readonly max: number | null;
  readonly type: 'discrete' | 'continuous';
}

export interface NumberRangeParams {
  min: number | null;
  max: number | null;
}

export const NumberRangeVO = {
  hydrate: (
    rangeStr: string | null | undefined, 
    options: { type?: 'discrete' | 'continuous' } = {}
  ): NumberRange | null => {
    if (!rangeStr || rangeStr.trim() === "" || rangeStr.toLowerCase() === 'empty') return null;

    const match = rangeStr.trim().match(/^([\[\(])(.*),(.*)([\]\)])$/);
    if (!match) return null;

    const lowerBoundSymbol = match[1];
    let min = match[2].trim() === "" ? null : Number(match[2].trim());
    let max = match[3].trim() === "" ? null : Number(match[3].trim());
    const upperBoundSymbol = match[4];

    const type = options.type ?? 'continuous';

    if (type === 'discrete') {
      if (min !== null && lowerBoundSymbol === '(') min += 1;
      if (max !== null && upperBoundSymbol === ')') max -= 1;
    }

    return NumberRangeVO.create({ min, max }, options);
  },

  create: (
    params: NumberRangeParams | null, 
    options: { type?: 'discrete' | 'continuous' } = {}
  ): NumberRange | null => {
    if (!params) return null;
    
    const { min, max } = params;
    if (min === null && max === null) return null;

    if (min !== null && max !== null && min > max) {
      throw new Error("The min value cannot be greater than the max value.");
    }

    const type = options.type ?? 'continuous';

    return { _type: "NumberRange", min, max, type };
  },

  toPostgresString: (range: NumberRange | null): string | null => {
    if (!range) return null;
    
    let minVal = range.min;
    let maxVal = range.max;

    if (range.type === 'discrete') {
      const finalMin = minVal !== null ? minVal : "";
      const finalMax = maxVal !== null ? maxVal + 1 : "";
      return `[${finalMin},${finalMax})`;
    }

    const finalMin = minVal !== null ? minVal : "";
    const finalMax = maxVal !== null ? maxVal : "";
    return `[${finalMin},${finalMax}]`;
  }
};