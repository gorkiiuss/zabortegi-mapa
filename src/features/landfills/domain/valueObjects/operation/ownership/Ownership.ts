// src/features/landfills/domain/valueObjects/operation/ownership/Ownership.ts

import { OwnershipTypeVO, type OwnershipType } from "./OwnershipType";

export interface OwnershipParams {
    type: string;
    is_heuristic: boolean;
}

export interface Ownership {
    readonly type: OwnershipType;
    readonly is_heuristic: boolean;
}

export const OwnershipVO = {
    hydrate: (params: OwnershipParams): Ownership => {
        return {
            type: OwnershipTypeVO.hydrate(params.type),
            is_heuristic: params.is_heuristic,
        }
    },
}