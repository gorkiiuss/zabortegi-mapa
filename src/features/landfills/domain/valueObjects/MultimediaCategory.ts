// src/features/landfills/domain/valueObjects/MultimediaCategory.ts

const MULTIMEDIA_CATEGORIES = [
   "IMAGE", "PDF", "OTHER"
] as const;

export type MultimediaCategory = typeof MULTIMEDIA_CATEGORIES[number];

export const MultimediaCategoryVO = {
  hydrate: (value: string | null | undefined): MultimediaCategory => {
    return value as MultimediaCategory;
  },
  values: (): readonly MultimediaCategory[] => MULTIMEDIA_CATEGORIES
};