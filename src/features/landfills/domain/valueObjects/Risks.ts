// src/features/landfills/domain/valueObjects/Risks.ts

export interface Risks {
  hasEnoughData(): boolean;
  getScore(field: keyof RisksParams): number | null;
  readonly global: number | null;
  readonly infra: number | null;
  readonly hydro: number | null;
  readonly geo: number | null;
  readonly social: number | null;
  readonly impacts: number | null;
}

export interface RisksParams {
  global: number | null;
  infra: number | null;
  hydro: number | null;
  geo: number | null;
  social: number | null;
  impacts: number | null;
}

export const RisksVO = {
  hydrate: (params: RisksParams): Risks => {
    return {
      global: params.global,
      infra: params.infra,
      hydro: params.hydro,
      geo: params.geo,
      social: params.social,
      impacts: params.impacts,
      hasEnoughData() {
        return this.global != null
      },
      getScore(field) {
        const val = this[field];
        if (val == null) return null;
        return Math.max(0, Math.min(1, val / 100));
      }
    };
  }
};