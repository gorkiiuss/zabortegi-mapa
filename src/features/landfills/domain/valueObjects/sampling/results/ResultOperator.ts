// src/features/landfills/domain/valueObjects/sampling/results/ResultOperator.ts

export type ResultOperator = string & { readonly __brand: 'ResultOperator' };
const REGEX = /^<|>|<=|>=|=|ND|NULL$/;

export const ResultOperatorVO = {
  hydrate: (resultOperator: string | null | undefined): ResultOperator | null => {
    if (!resultOperator) return null
    return resultOperator as ResultOperator;
  },
  create: (resultOperator: string | null | undefined): ResultOperator | null => {
    if (!resultOperator) return null;
    const clean = resultOperator.trim();
    if (!REGEX.test(clean)) throw new ResultOperatorVOError(`Invalid result operator format: ${resultOperator}`);
    return clean as ResultOperator;
  }
};

export class ResultOperatorVOError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ResultOperatorVOError';
  }
}