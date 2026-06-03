// src/features/about/domain/valueObjects/MultilingualText.ts

export interface MultilingualText {
  readonly es: string;
  readonly eu: string;
}

export const MultilingualTextVO = {
  hydrate: (raw: { es?: string; eu?: string } | null | undefined): MultilingualText => {
    return {
      es: raw?.es ?? "",
      eu: raw?.eu ?? "",
    };
  },
};
