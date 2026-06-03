// src/features/landfills/domain/entities/LandfillDetails.ts

import { LandfillCodeVO, type LandfillCode } from "../valueObjects/LandfillCode";
import { OtherImpactsVO, type OtherImpacts, type OtherImpactsParams } from "../valueObjects/OtherImpacts";
import { RisksVO, type Risks, type RisksParams } from "../valueObjects/Risks";
import { StudyVO, type Study, type StudyParams } from "../valueObjects/Study";
import { LandfillCorrectingMeasuresMeasuresVO, type LandfillCorrectingMeasures, type LandfillCorrectingMeasuresParams } from "../valueObjects/correctingMeasures/LandfillCorrectingMeasures";
import { FaunaAndVegetationVO, type FaunaAndVegetation, type FaunaAndVegetationParams } from "../valueObjects/faunaAndVegetation/FaunaAndVegetation";
import { GeologyVO, type Geology, type GeologyCreateParams, type GeologyHydrateParams } from "../valueObjects/geology/Geology";
import { GeotechniqueCharacteristicsVO, type GeotechniqueCharacteristics, type GeotechniqueCharacteristicsCreateParams, type GeotechniqueCharacteristicsHydrateParams } from "../valueObjects/geotechniqueCharacteristics/GeotechniqueCharacteristics";
import { HumanAndSocialEnvironmentVO, type HumanAndSocialEnvironment, type HumanAndSocialEnvironmentCreateParams, type HumanAndSocialEnvironmentHydrateParams } from "../valueObjects/humanAndSocialEnvironment/HumanAndSocialEnvironment";
import { HydrogeologyVO, type Hydrogeology, type HydrogeologyCreateParams, type HydrogeologyHydrateParams } from "../valueObjects/hydrogeology/Hydrogeology";
import { HydrologyVO, type Hydrology, type HydrologyCreateParams, type HydrologyHydrateParams } from "../valueObjects/hydrology/Hydrology";
import { InfrastructureVO, type Infrastructure, type InfrastructureCreateParams, type InfrastructureHydrateParams } from "../valueObjects/infrastructure/Infrastructure";
import { LandfillLocationVO, type LandfillLocation, type LandfillLocationParams } from "../valueObjects/location/LandfillLocation";
import { OperationVO, type Operation, type OperationParams } from "../valueObjects/operation/Operation";
import { MultimediaEntityFactory, type MultimediaEntity, type MultimediaEntityParams } from "./Multimedia";
import { SamplingEntityFactory, type SamplingEntity, type SamplingEntityParams } from "./Sampling";

export interface LandfillDetailsHydrateParams {
    id: string;
    parcelId: number;
    versionId: number;
    versionNumber: number;
    hasSensitiveData: boolean;
    code: string | null;
    name: string | null;
    risks: RisksParams;
    location: LandfillLocationParams;
    operation: OperationParams;
    infrastructure: InfrastructureHydrateParams;
    faunaAndVegetation: FaunaAndVegetationParams;
    hydrology: HydrologyHydrateParams;
    geology: GeologyHydrateParams;
    hydrogeology: HydrogeologyHydrateParams;
    geotechniqueCharacteristics: GeotechniqueCharacteristicsHydrateParams;
    humanAndSocialEnvironment: HumanAndSocialEnvironmentHydrateParams;
    otherImpacts: OtherImpactsParams;
    correctingMeasures: LandfillCorrectingMeasuresParams;
    samplings: SamplingEntityParams[] | null;
    studies: StudyParams[] | null;
    multimedia: MultimediaEntityParams[] | null;
    legacyRawData?: any | null;
}

export interface LandfillDetailsCreateParams {
    id: string;
    parcelId: number;
    versionId: number;
    versionNumber: number;
    hasSensitiveData: boolean;
    code: string | null;
    name: string | null;
    risks: RisksParams;
    location: LandfillLocationParams;
    operation: OperationParams;
    infrastructure: InfrastructureCreateParams;
    faunaAndVegetation: FaunaAndVegetationParams;
    hydrology: HydrologyCreateParams;
    geology: GeologyCreateParams;
    hydrogeology: HydrogeologyCreateParams;
    geotechniqueCharacteristics: GeotechniqueCharacteristicsCreateParams;
    humanAndSocialEnvironment: HumanAndSocialEnvironmentCreateParams;
    otherImpacts: OtherImpactsParams;
    correctingMeasures: LandfillCorrectingMeasuresParams;
    samplings: SamplingEntityParams[] | null;
    studies: StudyParams[] | null;
    multimedia: MultimediaEntityParams[] | null;
    legacyRawData?: any | null;
}

export interface LandfillDetailsEntity {
    readonly id: string;
    readonly parcelId: number;
    readonly versionId: number;
    readonly versionNumber: number,
    readonly hasSensitiveData: boolean;
    readonly code: LandfillCode | null;
    readonly name: string | null;
    readonly risks: Risks;
    readonly location: LandfillLocation;
    readonly operation: Operation;
    readonly infrastructure: Infrastructure;
    readonly faunaAndVegetation: FaunaAndVegetation;
    readonly hydrology: Hydrology;
    readonly geology: Geology;
    readonly hydrogeology: Hydrogeology;
    readonly geotechniqueCharacteristics: GeotechniqueCharacteristics;
    readonly humanAndSocialEnvironment: HumanAndSocialEnvironment;
    readonly otherImpacts: OtherImpacts;
    readonly correctingMeasures: LandfillCorrectingMeasures;
    readonly samplings: SamplingEntity[] | null;
    readonly studies: Study[] | null;
    readonly multimedia: MultimediaEntity[] | null;
    readonly legacyRawData: any | null;
}

export const LandfillDetailsFactory = {
    hydrate: (params: LandfillDetailsHydrateParams): LandfillDetailsEntity => {
        return {
            id: params.id,
            parcelId: params.parcelId,
            versionId: params.versionId,
            versionNumber: params.versionNumber,
            hasSensitiveData: params.hasSensitiveData,
            code: LandfillCodeVO.hydrate(params.code),
            name: params.name,
            risks: RisksVO.hydrate(params.risks),
            location: LandfillLocationVO.hydrate(params.location),
            operation: OperationVO.hydrate(params.operation),
            infrastructure: InfrastructureVO.hydrate(params.infrastructure),
            faunaAndVegetation: FaunaAndVegetationVO.hydrate(params.faunaAndVegetation),
            hydrology: HydrologyVO.hydrate(params.hydrology),
            geology: GeologyVO.hydrate(params.geology),
            hydrogeology: HydrogeologyVO.hydrate(params.hydrogeology),
            geotechniqueCharacteristics: GeotechniqueCharacteristicsVO.hydrate(params.geotechniqueCharacteristics),
            humanAndSocialEnvironment: HumanAndSocialEnvironmentVO.hydrate(params.humanAndSocialEnvironment),
            otherImpacts: OtherImpactsVO.hydrate(params.otherImpacts),
            correctingMeasures: LandfillCorrectingMeasuresMeasuresVO.hydrate(params.correctingMeasures),
            samplings: params.samplings ?
                params.samplings.map((samplingParam) => SamplingEntityFactory.hydrate(samplingParam))
                : null,
            studies: params.studies ?
                params.studies.map((studyParam) => StudyVO.hydrate(studyParam))
                : null,
            multimedia: params.multimedia ?
                params.multimedia.map((multimediaParam) => MultimediaEntityFactory.hydrate(multimediaParam))
                : null,
            legacyRawData: params.legacyRawData || null
        }
    },
    create: (params: LandfillDetailsCreateParams): LandfillDetailsEntity => {
        return {
            id: params.id,
            parcelId: params.parcelId,
            versionId: params.versionId,
            versionNumber: params.versionNumber,
            hasSensitiveData: params.hasSensitiveData,
            code: LandfillCodeVO.create(params.code),
            name: params.name,
            risks: RisksVO.hydrate(params.risks),
            location: LandfillLocationVO.create(params.location),
            operation: OperationVO.create(params.operation),
            infrastructure: InfrastructureVO.create(params.infrastructure),
            faunaAndVegetation: FaunaAndVegetationVO.hydrate(params.faunaAndVegetation),
            hydrology: HydrologyVO.create(params.hydrology),
            geology: GeologyVO.create(params.geology),
            hydrogeology: HydrogeologyVO.create(params.hydrogeology),
            geotechniqueCharacteristics: GeotechniqueCharacteristicsVO.create(params.geotechniqueCharacteristics),
            humanAndSocialEnvironment: HumanAndSocialEnvironmentVO.create(params.humanAndSocialEnvironment),
            otherImpacts: OtherImpactsVO.hydrate(params.otherImpacts),
            correctingMeasures: LandfillCorrectingMeasuresMeasuresVO.hydrate(params.correctingMeasures),
            samplings: params.samplings ?
                params.samplings.map((samplingParam) => SamplingEntityFactory.create(samplingParam))
                : null,
            studies: params.studies ?
                params.studies.map((studyParam) => StudyVO.hydrate(studyParam))
                : null,
            multimedia: params.multimedia ?
                params.multimedia.map((multimediaParam) => MultimediaEntityFactory.hydrate(multimediaParam))
                : null,
            legacyRawData: params.legacyRawData || null
        }
    }
}