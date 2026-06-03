// src/features/landfills/domain/valueObjects/operation/PhoneNumber.ts

export type PhoneNumber = string & { readonly __brand: 'PhoneNumber' };
const REGEX = /^\d{9,15}|\*\*\* BABESTUTA \*\*\*$/;

export const PhoneNumberVO = {
  hydrate: (phoneNumber: string | null | undefined): PhoneNumber | null => {
    if (!phoneNumber) return null
    return phoneNumber as PhoneNumber;
  },
  create: (phoneNumber: string | null | undefined): PhoneNumber | null => {
    if (!phoneNumber) return null;
    const clean = phoneNumber.trim();
    if (!REGEX.test(clean)) throw new PhoneNumberVOError(`Invalid phone number format: ${phoneNumber}`);
    return clean as PhoneNumber;
  }
};

export class PhoneNumberVOError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PhoneNumberVOError';
  }
}