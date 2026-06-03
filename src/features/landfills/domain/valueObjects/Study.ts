// src/features/landfills/domain/valueObjects/Study.ts

export interface StudyParams {
    study: string;
}

export interface Study {
    readonly study: string;
}

export const StudyVO = {
    hydrate: (StudyParams: StudyParams): Study => {
        return {
            study: StudyParams.study
        }
    }
}