// src/features/landfills/domain/valueObjects/LandfillCode.ts

export type LandfillCode = string & { readonly __brand: 'LandfillCode' };
const REGEX = /^\d{5}-\d{5}$/;

export const LandfillCodeVO = {
  hydrate: (code: string | null | undefined): LandfillCode | null => {
    if (!code) return null;
    return code as LandfillCode;
  },
  create: (code: string | null | undefined): LandfillCode | null => {
    if (!code) return null;
    const clean = code.trim();
    if (!REGEX.test(clean)) throw new LandfillCodeVOError(`Invalid landfill code format: ${code}`);
    return clean as LandfillCode;
  }
};

export class LandfillCodeVOError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LandfillCodeVOError';
  }
}