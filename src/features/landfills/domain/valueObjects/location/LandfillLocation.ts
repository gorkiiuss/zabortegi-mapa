// src/features/landfills/domain/valueObjects/location/LandfillLocation.ts

import { AccessVO, type Access } from "./Access";
import { AccessUpToEntranceVO, type AccessUpToEntrance } from "./AccessUpToEntrance";
import { CartographyVO, type Cartography } from "./Cartography";
import { DimensionsVO, type Dimensions, type DimensionsParams } from "./Dimensions";
import { HistoricTerritoryVO, type HistoricTerritory } from "./HistoricTerritory";
import { ZipCodeVO, type ZipCode } from "./ZipCode";

export interface LandfillLocationParams {
  historicTerritory: string | null;
  municipalityGroupName: string | null;
  municipalityName: string | null;
  address: string | null;
  isAccessible: boolean | null;
  zipCode: string | null;
  watershed: string | null;
  toponymy: string | null;
  toponymySource: string | null;
  accessesUpToEntrance: string[] | null;
  accesses: string[] | null;
  dimensionsParams: DimensionsParams;
  cartographies: string[] | null;
}

export interface LandfillLocation {
  readonly historicTerritory: HistoricTerritory | null;
  readonly municipalityGroupName: string | null;
  readonly municipalityName: string | null;
  readonly address: string | null;
  readonly isAccessible: boolean | null;
  readonly zipCode: ZipCode | null;
  readonly watershed: string | null;
  readonly toponymy: string | null;
  readonly toponymySource: string | null;
  readonly accessesUpToEntrance: AccessUpToEntrance[];
  readonly accesses: Access[];
  readonly dimensions: Dimensions;
  readonly cartographies: Cartography[];
}

export const LandfillLocationVO = {
  hydrate: (params: LandfillLocationParams): LandfillLocation => {
    return {
      historicTerritory: HistoricTerritoryVO.hydrate(params.historicTerritory),
      zipCode: ZipCodeVO.hydrate(params.zipCode),
      municipalityGroupName: params.municipalityGroupName,
      municipalityName: params.municipalityName,
      address: params.address,
      isAccessible: params.isAccessible,
      watershed: params.watershed,
      toponymy: params.toponymy,
      toponymySource: params.toponymySource,
      dimensions: DimensionsVO.hydrate(params.dimensionsParams),
      accessesUpToEntrance: (params.accessesUpToEntrance ?? [])
        .map(AccessUpToEntranceVO.hydrate)
        .filter((a): a is AccessUpToEntrance => a !== null),
      accesses: (params.accesses ?? [])
        .map(AccessVO.hydrate)
        .filter((a): a is Access => a !== null),
      cartographies: (params.cartographies ?? [])
        .map(CartographyVO.hydrate)
        .filter((c): c is Cartography => c !== null),
    };
  },
  create: (params: LandfillLocationParams): LandfillLocation => {
    return {
        historicTerritory: HistoricTerritoryVO.hydrate(params.historicTerritory),
        zipCode: ZipCodeVO.create(params.zipCode),
        municipalityGroupName: params.municipalityGroupName,
        municipalityName: params.municipalityName,
        address: params.address,
        isAccessible: params.isAccessible,
        watershed: params.watershed,
        toponymy: params.toponymy,
        toponymySource: params.toponymySource,
        dimensions: DimensionsVO.hydrate(params.dimensionsParams),
        accessesUpToEntrance: (params.accessesUpToEntrance ?? [])
          .map(AccessUpToEntranceVO.hydrate)
          .filter((a): a is AccessUpToEntrance => a !== null),
        accesses: (params.accesses ?? [])
          .map(AccessVO.hydrate)
          .filter((a): a is Access => a !== null),
        cartographies: (params.cartographies ?? [])
          .map(CartographyVO.create)
          .filter((c): c is Cartography => c !== null),
    }
  }
};