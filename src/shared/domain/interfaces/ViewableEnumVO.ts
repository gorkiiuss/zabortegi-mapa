// src/shared/domain/interfaces/ViewableEnumVO.ts

export interface ViewableEnumVO<T = any> {
  getTxKey(value: T): string;
}