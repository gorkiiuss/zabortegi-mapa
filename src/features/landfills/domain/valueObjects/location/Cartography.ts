// src/features/landfills/domain/valueObjects/location/Cartography.ts

export type Cartography = string & { readonly __brand: 'Cartography' };
const REGEX = /^\d{1,4}-((I|II|III|IV)(-[A-D])?|[1-4](-[A-D])?|\d{1,2}-\d{1,2})$/;

export const CartographyVO = {
  hydrate: (cartography: string | null | undefined): Cartography | null => {
    if (!cartography) return null
    return cartography as Cartography;
  },
  create: (cartography: string | null | undefined): Cartography | null => {
    if (!cartography) return null;
    const clean = cartography.trim();
    if (!REGEX.test(clean)) throw new CartographyVOError(`Invalid cartography format: ${cartography}`);
    return clean as Cartography;
  }
};

export class CartographyVOError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartographyVOError';
  }
}