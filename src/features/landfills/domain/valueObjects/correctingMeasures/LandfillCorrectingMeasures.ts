// src/features/landfills/domain/valueObjects/correctingMeasures/LandfillCorrectingMeasures.ts

import { CorrectingMeasuresVO, type CorrectingMeasures } from "./CorrectingMeasures";


export interface LandfillCorrectingMeasuresParams {
    measures: string | null;
    description: string | null;
    source: string | null;
    other: string | null;
}

export interface LandfillCorrectingMeasures {
    readonly measures: CorrectingMeasures | null;
    readonly description: string | null;
    readonly source: string | null;
    readonly other: string | null;
}

export const LandfillCorrectingMeasuresMeasuresVO = {
    hydrate(params: LandfillCorrectingMeasuresParams): LandfillCorrectingMeasures {
        return {
            measures: CorrectingMeasuresVO.hydrate(params.measures),
            description: params.description,
            source: params.source,
            other: params.other
        }
    }
};