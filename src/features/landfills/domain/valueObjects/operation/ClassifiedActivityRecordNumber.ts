// src/features/landfills/domain/valueObjects/operation/ClassifiedActivityRecordNumber.ts

export type ClassifiedActivityRecordNumber = string & { readonly __brand: 'ClassifiedActivityRecordNumber' };
const REGEX = /^([A-Z]{2,4}[- ]?)?[\d\?]{1,6}\/[\d]{1,6}([- ][A-Z0-9]+)?$/

export const ClassifiedActivityRecordNumberVO = {
  hydrate: (classifiedActivityRecordNumber: string | null | undefined): ClassifiedActivityRecordNumber | null => {
    if (!classifiedActivityRecordNumber) return null
    return classifiedActivityRecordNumber as ClassifiedActivityRecordNumber;
  },
  create: (classifiedActivityRecordNumber: string | null | undefined): ClassifiedActivityRecordNumber | null => {
    if (!classifiedActivityRecordNumber) return null;
    const clean = classifiedActivityRecordNumber.trim();
    if (!REGEX.test(clean)) throw new ClassifiedActivityRecordNumberVOError(`Invalid classified activity record number format: ${classifiedActivityRecordNumber}`);
    return clean as ClassifiedActivityRecordNumber;
  }
};

export class ClassifiedActivityRecordNumberVOError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClassifiedActivityRecordNumberVOError';
  }
}