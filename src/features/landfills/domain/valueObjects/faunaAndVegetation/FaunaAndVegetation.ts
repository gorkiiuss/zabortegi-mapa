// src/features/landfills/domain/valueObjects/faunaAndVegetation/FaunaAndVegetation.ts

import { EnvironmentVegetationTypeVO, type EnvironmentVegetationType } from "./EnvironmentVegetationType";
import { FaunaTypeVO, type FaunaType } from "./FaunaType";

export interface FaunaAndVegetationParams {
    vegetationCover: string | null;
    vegetationCoverDescription: string | null;
    environmentVegetation: string[] | null;
    fauna: string[] | null;
}

export interface FaunaAndVegetation {
    readonly vegetationCover: string | null;
    readonly vegetationCoverDescription: string | null;
    readonly environmentVegetation: EnvironmentVegetationType[] | null;
    readonly fauna: FaunaType[] | null;
}

export const FaunaAndVegetationVO = {
    hydrate: (params: FaunaAndVegetationParams): FaunaAndVegetation => {
        const environmentVegetation = params.environmentVegetation?
            params.environmentVegetation    
                .map(ev => EnvironmentVegetationTypeVO.hydrate(ev))
                .filter((v): v is EnvironmentVegetationType => v !== null) 
            : null;
        const fauna = params.fauna?
            params.fauna    
                .map(f => FaunaTypeVO.hydrate(f))
                .filter((v): v is FaunaType => v !== null)
            : null;
        return {
            vegetationCover: params.vegetationCover,
            vegetationCoverDescription: params.vegetationCoverDescription,
            environmentVegetation: environmentVegetation,
            fauna: fauna
        };
    }
};