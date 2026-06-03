// src/features/landfills/domain/valueObjects/sampling/results/Parameter.ts

export interface ParameterParams {
  name: string;
  family: string | null;
  legalLimit: number | null;
}

export interface Parameter {
  readonly name: string;
  readonly family: string | null;
  readonly legalLimit: number | null;
}

export const ParameterVO = {
  hydrate: (params: ParameterParams): Parameter => {
    return {
      name: params.name.trim(),
      family: params.family ? params.family.trim() : null,
      legalLimit: params.legalLimit
    };
  }
};