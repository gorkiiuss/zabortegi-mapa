// src/features/landfills/domain/valueObjects/operation/Operation.ts

import { ClassifiedActivityRecordNumberVO, type ClassifiedActivityRecordNumber } from "./ClassifiedActivityRecordNumber";
import { DepositShapeVO, type DepositShape } from "./DepositShape";
import { GradingVO, type Grading } from "./Grading";
import { LandfillTypeVO, type LandfillType } from "./LandfillType";
import { LegalStatusVO, type LegalStatus } from "./LegalStatus";
import { LicenseCharacteristicsVO, type LicenseCharacteristics } from "./LicenseCharacteristics";
import { OwnershipVO, type Ownership, type OwnershipParams } from "./ownership/Ownership";
import { PhoneNumberVO, type PhoneNumber } from "./PhoneNumber";
import { WasteComponentVO, type WasteComponent } from "./WasteComponent";
import { WasteLayoutVO, type WasteLayout } from "./WasteLayout";
import { WasteLegalCategoryVO, type WasteLegalCategory } from "./WasteLegalCategory";
import { WasteTypeVO, type WasteType } from "./WasteType";

export interface OperationParams {
    classifiedActivityRecordNumbers: string[] | null;
    propertyType: string | null;
    holder: string | null;
    contact: string | null;
    address: string | null;
    phoneNumber: string | null;
    legalStatus: string;
    licenseCharacteristics: string | null;
    equipmentInstallationDate: string | null;
    equipment: string[] | null;
    activityStartDate: string | null;
    activityEndDate: string | null;
    yearsOperating: number | null;
    landfillType: string;
    wasteLegalCategory: string | null;
    wasteType: string | null;
    wasteComponents: string[] | null;
    wasteDescription: string | null;
    grading: string | null;
    wasteSourceCompany: string | null;
    occurredIncident: string | null;
    wasteLayout: string | null;
    depositShapes: string[] | null;
    ownershipParams: OwnershipParams;
}

export interface Operation {
    readonly classifiedActivityRecordNumbers: ClassifiedActivityRecordNumber[] | null;
    readonly propertyType: string | null;
    readonly holder: string | null;
    readonly contact: string | null;
    readonly address: string | null;
    readonly phoneNumber: PhoneNumber | null;
    readonly legalStatus: LegalStatus;
    readonly licenseCharacteristics: LicenseCharacteristics | null;
    readonly equipmentInstallationDate: Date | null;
    readonly equipment: string[] | null;
    readonly activityStartDate: Date | null;
    readonly activityEndDate: Date | null;
    readonly yearsOperating: number | null;
    readonly landfillType: LandfillType;
    readonly wasteLegalCategory: WasteLegalCategory | null;
    readonly wasteType: WasteType | null;
    readonly wasteComponents: WasteComponent[] | null;
    readonly wasteDescription: string | null;
    readonly grading: Grading | null;
    readonly wasteSourceCompany: string | null;
    readonly occurredIncident: string | null;
    readonly wasteLayout: WasteLayout | null;
    readonly depositShapes: DepositShape[] | null;
    readonly ownership: Ownership;
}

export const OperationVO = {
    hydrate: (params: OperationParams): Operation => {
        const classifiedActivityRecordNumbers = params.classifiedActivityRecordNumbers ? 
            params.classifiedActivityRecordNumbers
                .map(ClassifiedActivityRecordNumberVO.hydrate)
                .filter((x): x is ClassifiedActivityRecordNumber => x !== null)
            : null;
        const depositShapes = params.depositShapes ?
            params.depositShapes
                .map(DepositShapeVO.hydrate)
                .filter((x): x is DepositShape => x !== null)
            : null;
        const wasteComponents = params.wasteComponents ?
            params.wasteComponents
                .map((wc) => WasteComponentVO.hydrate(wc))
                .filter((x): x is WasteComponent => x !== null)
            : null;
        return {
            classifiedActivityRecordNumbers: classifiedActivityRecordNumbers,
            propertyType: params.propertyType,
            holder: params.holder,
            contact: params.contact,
            address: params.address,
            phoneNumber: PhoneNumberVO.hydrate(params.phoneNumber),
            legalStatus: LegalStatusVO.hydrate(params.legalStatus),
            licenseCharacteristics: LicenseCharacteristicsVO.hydrate(params.licenseCharacteristics),
            equipmentInstallationDate: params.equipmentInstallationDate ? new Date(params.equipmentInstallationDate) : null,
            equipment: params.equipment,
            activityStartDate: params.activityStartDate ? new Date(params.activityStartDate) : null,
            activityEndDate: params.activityEndDate ? new Date(params.activityEndDate) : null,
            yearsOperating: params.yearsOperating,
            landfillType: LandfillTypeVO.hydrate(params.landfillType),
            wasteLegalCategory: WasteLegalCategoryVO.hydrate(params.wasteLegalCategory),
            wasteType: WasteTypeVO.hydrate(params.wasteType),
            wasteComponents: wasteComponents,
            wasteDescription: params.wasteDescription,
            grading: GradingVO.hydrate(params.grading),
            wasteSourceCompany: params.wasteSourceCompany,
            occurredIncident: params.occurredIncident,
            wasteLayout: WasteLayoutVO.hydrate(params.wasteLayout),
            depositShapes: depositShapes,
            ownership: OwnershipVO.hydrate(params.ownershipParams)
        }
    },
    create: (params: OperationParams): Operation => {
            const classifiedActivityRecordNumbers = params.classifiedActivityRecordNumbers ? 
            params.classifiedActivityRecordNumbers
            .map(ClassifiedActivityRecordNumberVO.create)
            .filter((x): x is ClassifiedActivityRecordNumber => x !== null)
            : null;
        const depositShapes = params.depositShapes ?
            params.depositShapes
            .map(DepositShapeVO.hydrate)
            .filter((x): x is DepositShape => x !== null)
            : null;
        const wasteComponents = params.wasteComponents ?
            params.wasteComponents
            .map((wc) => WasteComponentVO.hydrate(wc))
            .filter((x): x is WasteComponent => x !== null)
            : null;
        return {
            classifiedActivityRecordNumbers: classifiedActivityRecordNumbers,
            propertyType: params.propertyType,
            holder: params.holder,
            contact: params.contact,
            address: params.address,
            phoneNumber: PhoneNumberVO.create(params.phoneNumber),
            legalStatus: LegalStatusVO.hydrate(params.legalStatus),
            licenseCharacteristics: LicenseCharacteristicsVO.hydrate(params.licenseCharacteristics),
            equipmentInstallationDate: params.equipmentInstallationDate ? new Date(params.equipmentInstallationDate) : null,
            equipment: params.equipment,
            activityStartDate: params.activityStartDate ? new Date(params.activityStartDate) : null,
            activityEndDate: params.activityEndDate ? new Date(params.activityEndDate) : null,
            yearsOperating: params.yearsOperating,
            landfillType: LandfillTypeVO.hydrate(params.landfillType),
            wasteLegalCategory: WasteLegalCategoryVO.hydrate(params.wasteLegalCategory),
            wasteType: WasteTypeVO.hydrate(params.wasteType),
            wasteComponents: wasteComponents,
            wasteDescription: params.wasteDescription,
            grading: GradingVO.hydrate(params.grading),
            wasteSourceCompany: params.wasteSourceCompany,
            occurredIncident: params.occurredIncident,
            wasteLayout: WasteLayoutVO.hydrate(params.wasteLayout),
            depositShapes: depositShapes,
            ownership: OwnershipVO.hydrate(params.ownershipParams)
        }
    }
}