// src/features/landfills/domain/valueObjects/location/ZipCode.ts

export type ZipCode = string & { readonly __brand: 'ZipCode' };
const REGEX = /^\d{5}$/;

export const ZipCodeVO = {
  hydrate: (zipCode: string | null | undefined): ZipCode | null => {
    if (!zipCode) return null
    return zipCode as ZipCode;
  },
  create: (zipCode: string | null | undefined): ZipCode | null => {
    if (!zipCode) return null;
    const clean = zipCode.trim();
    if (!REGEX.test(clean)) throw new ZipCodeVOError(`Invalid zip code format: ${zipCode}`);
    return clean as ZipCode;
  }
};

export class ZipCodeVOError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ZipCodeVOError';
  }
}