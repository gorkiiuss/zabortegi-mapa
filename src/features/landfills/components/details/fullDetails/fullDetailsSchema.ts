// src/features/landfills/components/details/fullDetails/fullDetailsSchema.ts

import type { LandfillDetailsEntity } from "@features/landfills/domain/entities/LandfillDetails";
import type { TxKeyPath } from "i18n/config";
import { LegalStatusVO } from "@features/landfills/domain/valueObjects/operation/LegalStatus";
import { LicenseCharacteristicsVO } from "@features/landfills/domain/valueObjects/operation/LicenseCharacteristics";
import { LandfillTypeVO } from "@features/landfills/domain/valueObjects/operation/LandfillType";
import { WasteLegalCategoryVO } from "@features/landfills/domain/valueObjects/operation/WasteLegalCategory";
import { WasteTypeVO } from "@features/landfills/domain/valueObjects/operation/WasteType";
import { WasteComponentVO } from "@features/landfills/domain/valueObjects/operation/WasteComponent";
import { GradingVO } from "@features/landfills/domain/valueObjects/operation/Grading";
import { WasteLayoutVO } from "@features/landfills/domain/valueObjects/operation/WasteLayout";
import { DepositShapeVO } from "@features/landfills/domain/valueObjects/operation/DepositShape";
import { HistoricTerritoryVO } from "@features/landfills/domain/valueObjects/location/HistoricTerritory";
import { InspectionStateVO } from "@features/landfills/domain/valueObjects/InspectionState";
import { ChannelingTypeVO } from "@features/landfills/domain/valueObjects/infrastructure/ChannelingType";
import { ExistingMachineryVO } from "@features/landfills/domain/valueObjects/infrastructure/ExistingMachinery";
import { EnvironmentVegetationTypeVO } from "@features/landfills/domain/valueObjects/faunaAndVegetation/EnvironmentVegetationType";
import { FaunaTypeVO } from "@features/landfills/domain/valueObjects/faunaAndVegetation/FaunaType";
import { StreamDirectionVO } from "@features/landfills/domain/valueObjects/hydrology/StreamDirection";
import { SuperficialDepositVO } from "@features/landfills/domain/valueObjects/geology/SuperficialDeposit";
import { SoilTypeVO } from "@features/landfills/domain/valueObjects/geology/SoilType";
import { MorphologyVO } from "@features/landfills/domain/valueObjects/geology/Morphology";
import { MagnitudeLevelVO } from "@features/landfills/domain/valueObjects/MagnitudeLevel";
import { PermeabilityReasonVO } from "@features/landfills/domain/valueObjects/geology/PermeabilityReason";
import { AquiferTypeVO } from "@features/landfills/domain/valueObjects/hydrogeology/AquiferType";
import { SlopeInstabilityProcessesVO } from "@features/landfills/domain/valueObjects/geotechniqueCharacteristics/SlopeInstabilityProcesses";
import { FloodPotentialVO } from "@features/landfills/domain/valueObjects/geotechniqueCharacteristics/FloodPotential";
import { LandCoveringTypeVO } from "@features/landfills/domain/valueObjects/geotechniqueCharacteristics/LandCoveringType";
import { UsageStatusVO } from "@features/landfills/domain/valueObjects/humanAndSocialEnvironment/UsageStatus";
import { WaterUsageVO } from "@features/landfills/domain/valueObjects/humanAndSocialEnvironment/WaterUsage";
import { UrbanClassificationVO } from "@features/landfills/domain/valueObjects/humanAndSocialEnvironment/UrbanClassification";
import { UrbanCalificationVO } from "@features/landfills/domain/valueObjects/humanAndSocialEnvironment/UrbanCalification";
import { CorrectingMeasuresVO } from "@features/landfills/domain/valueObjects/correctingMeasures/CorrectingMeasures";
import type { ViewableEnumVO } from "@shared/domain/interfaces/ViewableEnumVO";
import { OwnershipTypeVO } from "@features/landfills/domain/valueObjects/operation/ownership/OwnershipType";

export type FieldConfig =
  | TxKeyPath
  | { labelKey: TxKeyPath, enumVO?: ViewableEnumVO, getValue?: (obj: any) => any, fullWidth?: boolean }

export interface SectionSchema {
  voKey?: keyof LandfillDetailsEntity;
  titleKey: TxKeyPath;
  fields: Record<string, FieldConfig>;
}

export const FULL_DETAILS_SCHEMA: SectionSchema[] = [
  {
    titleKey: "domain.entities.landfill_details.title",
    fields: {
      parcelId: "domain.entities.landfill_details.parcel_id",
      code: "domain.entities.landfill_details.code",
      name: "domain.entities.landfill_details.name"
    },
  },
  {
    voKey: "risks",
    titleKey: "domain.vos.risks.title",
    fields: {
      global: "domain.vos.risks.global",
      infra: "domain.vos.risks.infra",
      hydro: "domain.vos.risks.hydro",
      geo: "domain.vos.risks.geo",
      social: "domain.vos.risks.social",
      impacts: "domain.vos.risks.impacts"
    }
  },
  {
    voKey: "location",
    titleKey: "domain.vos.location.title",
    fields: {
      historicTerritory: {
        labelKey: "domain.vos.location.historic_territory.title",
        enumVO: HistoricTerritoryVO
      },
      zipCode: "domain.vos.location.zip_code",
      municipalityGroupName: "domain.vos.location.municipality_group_name",
      municipalityName: "domain.vos.location.municipality_name",
      address: "domain.vos.location.address",
      isAccessible: "domain.vos.location.is_accessible",
      watershed: "domain.vos.location.watershed",
      toponymy: "domain.vos.location.toponymy",
      toponymySource: "domain.vos.location.toponymy_source",
      surfaceHa: "domain.vos.location.dimensions.surface_ha",
      volumeM3: "domain.vos.location.dimensions.volume_m3",
      expectedTotalCapacityM3: "domain.vos.location.dimensions.expected_total_capacity_m3",
      landfillHeight: "domain.vos.location.dimensions.landfill_height",
      fillPercent: "domain.vos.location.dimensions.fill_percent"
    }
  },
  {
    voKey: "operation",
    titleKey: "domain.vos.operation.title",
    fields: {
      "classifiedActivityRecordNumbers": "domain.vos.operation.classified_activity_record_number",
      "propertyType": "domain.vos.operation.property_type",
      "ownership": {
        labelKey: "domain.vos.operation.property_type",
        enumVO: OwnershipTypeVO,
        getValue: (op: any) => op.ownership?.type
      },
      "holder": "domain.vos.operation.holder",
      "contact": "domain.vos.operation.contact",
      "address": "domain.vos.operation.address",
      "phoneNumber": "domain.vos.operation.phone_number",
      "legalStatus": {
        labelKey: "domain.vos.operation.legal_status.title",
        enumVO: LegalStatusVO
      },
      "licenseCharacteristics": {
        labelKey: "domain.vos.operation.license_characteristics.title",
        enumVO: LicenseCharacteristicsVO
      },
      "equipmentInstallationDate": "domain.vos.operation.equipment_installation_date",
      "equipment": "domain.vos.operation.equipment",
      "activityStartDate": "domain.vos.operation.activity_start_date",
      "activityEndDate": "domain.vos.operation.activity_end_date",
      "yearsOperating": "domain.vos.operation.years_operating",
      "landfillType": {
        labelKey: "domain.vos.operation.landfill_type.title",
        enumVO: LandfillTypeVO
      },
      "wasteLegalCategory": {
        labelKey: "domain.vos.operation.waste_legal_category.title",
        enumVO: WasteLegalCategoryVO
      },
      "wasteType": {
        labelKey: "domain.vos.operation.waste_type.title",
        enumVO: WasteTypeVO
      },
      "wasteComponents": {
        labelKey: "domain.vos.operation.waste_components.title",
        enumVO: WasteComponentVO
      },
      "wasteDescription": {
        labelKey: "domain.vos.operation.waste_description",
        fullWidth: true
      },
      "grading": {
        labelKey: "domain.vos.operation.grading.title",
        enumVO: GradingVO
      },
      "wasteSourceCompany": "domain.vos.operation.waste_source_company",
      "occurredIncident": {
        labelKey: "domain.vos.operation.occurred_incident",
        fullWidth: true
      },
      "wasteLayout": {
        labelKey: "domain.vos.operation.waste_layout.title",
        enumVO: WasteLayoutVO
      },
      "depositShapes": {
        labelKey: "domain.vos.operation.deposit_shapes.title",
        enumVO: DepositShapeVO
      }
    }
  },
  {
    voKey: "infrastructure",
    titleKey: "domain.vos.infrastructure.title",
    fields: {
      undergroundChannelingState: {
        labelKey: "domain.vos.infrastructure.underground_channeling_state",
        enumVO: InspectionStateVO
      },
      undergroundChannelingType: {
        labelKey: "domain.vos.infrastructure.underground_channeling_type.title",
        enumVO: ChannelingTypeVO
      },
      hiredPersonnel: "domain.vos.infrastructure.hired_personnel",
      existingMachinery: {
        labelKey: "domain.vos.infrastructure.existing_machinery.title",
        enumVO: ExistingMachineryVO
      },
      stormwaterManagement: "domain.vos.infrastructure.stormwater_management",
      leachateSamplingPointsState: {
        labelKey: "domain.vos.infrastructure.leachate_sampling_points_state",
        enumVO: InspectionStateVO
      },
      bedWaterproofingState: {
        labelKey: "domain.vos.infrastructure.bed_waterproofing_state",
        enumVO: InspectionStateVO
      },
      sideWaterproofingState: {
        labelKey: "domain.vos.infrastructure.side_waterproofing_state",
        enumVO: InspectionStateVO
      },
      peripheralEnclosureState: {
        labelKey: "domain.vos.infrastructure.peripheral_enclosure_state",
        enumVO: InspectionStateVO
      },
      hedgeState: {
        labelKey: "domain.vos.infrastructure.hedge_state",
        enumVO: InspectionStateVO
      },
      operationPlanState: {
        labelKey: "domain.vos.infrastructure.operation_plan_state",
        enumVO: InspectionStateVO
      },
      closingPlanState: {
        labelKey: "domain.vos.infrastructure.closing_plan_state",
        enumVO: InspectionStateVO
      }
    }
  },
  {
    voKey: "faunaAndVegetation",
    titleKey: "domain.vos.fauna_and_vegetation.title",
    fields: {
      vegetationCover: "domain.vos.fauna_and_vegetation.vegetation_cover",
      vegetationCoverDescription: {
        labelKey: "domain.vos.fauna_and_vegetation.vegetation_cover_description",
        fullWidth: true
      },
      environmentVegetation: {
        labelKey: "domain.vos.fauna_and_vegetation.environment_vegetation.title",
        enumVO: EnvironmentVegetationTypeVO
      },
      fauna: {
        labelKey: "domain.vos.fauna_and_vegetation.fauna_type.title",
        enumVO: FaunaTypeVO
      }
    }
  },
  {
    voKey: "hydrology",
    titleKey: "domain.vos.hydrology.title",
    fields: {
      annualPrecipitation: "domain.vos.hydrology.annual_precipitation",
      effectiveRainfall: "domain.vos.hydrology.effective_rainfall",
      drainageSystem: "domain.vos.hydrology.drainage_system",
      nearWaterAbstraction: {
        labelKey: "domain.vos.hydrology.near_water_abstraction",
        enumVO: InspectionStateVO
      },
      distanceToNearestWatercourse: "domain.vos.hydrology.distance_to_nearest_watercourse",
      waterAbstractionType: "domain.vos.hydrology.water_abstraction_type",
      streamDirection: {
        labelKey: "domain.vos.hydrology.stream_direction.title",
        enumVO: StreamDirectionVO
      },
      distance: "domain.vos.hydrology.distance",
      crossingWatercourseState: {
        labelKey: "domain.vos.hydrology.crossing_watercourse_state",
        enumVO: InspectionStateVO
      },
      underlyingWatercourseState: {
        labelKey: "domain.vos.hydrology.underlying_watercourse_state",
        enumVO: InspectionStateVO
      },
      streamName: "domain.vos.hydrology.streamName"
    }
  },
  {
    voKey: "geology",
    titleKey: "domain.vos.geology.title",
    fields: {
      lithologycalAndLithostratigraphycalUnits: "domain.vos.geology.lithologycal_and_lithostratigraphycal_units",
      superficialDeposit: {
        labelKey: "domain.vos.geology.superficial_deposit.title",
        enumVO: SuperficialDepositVO
      },
      regolithThickness: "domain.vos.geology.regolith_thickness",
      soilType: {
        labelKey: "domain.vos.geology.soil_type.title",
        enumVO: SoilTypeVO
      },
      morphology: {
        labelKey: "domain.vos.geology.morphology.title",
        enumVO: MorphologyVO
      },
      permeabilityLevel: {
        labelKey: "domain.vos.geology.permeability_level",
        enumVO: MagnitudeLevelVO
      },
      permeabilityReason: {
        labelKey: "domain.vos.geology.permeability_reason.title",
        enumVO: PermeabilityReasonVO
      }
    }
  },
  {
    voKey: "hydrogeology",
    titleKey: "domain.vos.hydrogeology.title",
    fields: {
      aquiferType: {
        labelKey: "domain.vos.hydrogeology.aquifer_type.title",
        enumVO: AquiferTypeVO
      },
      estimatedDepth: "domain.vos.hydrogeology.estimated_depth",
      estimatedStreamDirection: "domain.vos.hydrogeology.estimated_stream_direction",
      vulnerabilityLevel: {
        labelKey: "domain.vos.hydrogeology.vulnerability_level",
        enumVO: MagnitudeLevelVO
      },
      hydrogeologycalUnit: "domain.vos.hydrogeology.hydrogeologycal_unit"
    }
  },
  {
    voKey: "geotechniqueCharacteristics",
    titleKey: "domain.vos.geotechnique_characteristics.title",
    fields: {
      hillsideSlope: "domain.vos.geotechnique_characteristics.hillside_slope",
      slopeInstabilityProcesses: {
        labelKey: "domain.vos.geotechnique_characteristics.slope_instability_processes.title",
        enumVO: SlopeInstabilityProcessesVO
      },
      wasteMassStabilityLevel: {
        labelKey: "domain.vos.geotechnique_characteristics.waste_mass_stability_level",
        enumVO: MagnitudeLevelVO
      },
      floodPotential: {
        labelKey: "domain.vos.geotechnique_characteristics.flood_potential.title",
        enumVO: FloodPotentialVO
      },
      erodibilityLevel: {
        labelKey: "domain.vos.geotechnique_characteristics.erodibility_level",
        enumVO: MagnitudeLevelVO
      },
      structuralDiscontinuities: "domain.vos.geotechnique_characteristics.structural_discontinuities",
      coveringState: {
        labelKey: "domain.vos.geotechnique_characteristics.covering_state",
        enumVO: InspectionStateVO
      },
      landCoveringType: {
        labelKey: "domain.vos.geotechnique_characteristics.land_covering_type.title",
        enumVO: LandCoveringTypeVO
      },
      landCoveringDescription: "domain.vos.geotechnique_characteristics.land_covering_description",
      coveringMaterialState: {
        labelKey: "domain.vos.geotechnique_characteristics.covering_material_state",
        enumVO: InspectionStateVO
      },
      coveringMaterialDescription: "domain.vos.geotechnique_characteristics.covering_material_description",
      effectOnExistingStructuresState: {
        labelKey: "domain.vos.geotechnique_characteristics.effect_on_existing_structures_state",
        enumVO: InspectionStateVO
      },
      elementsUndergoSlippingState: {
        labelKey: "domain.vos.geotechnique_characteristics.elements_undergo_slipping_state",
        enumVO: InspectionStateVO
      }
    }
  },
  {
    voKey: "humanAndSocialEnvironment",
    titleKey: "domain.vos.humanAndSocialEnvironment.title",
    fields: {
      surroundingPopulation: "domain.vos.humanAndSocialEnvironment.surrounding_population",
      distanceToHousesOrRecreation: "domain.vos.humanAndSocialEnvironment.distance_to_houses_or_recreation",
      nearHousesCount: "domain.vos.humanAndSocialEnvironment.near_houses_count",
      currentUsageStatus: {
        labelKey: "domain.vos.humanAndSocialEnvironment.current_usage_status",
        enumVO: UsageStatusVO
      },
      currentUsageDescription: {
        labelKey: "domain.vos.humanAndSocialEnvironment.current_usage_description",
        fullWidth: true
      },
      futureUsages: {
        labelKey: "domain.vos.humanAndSocialEnvironment.future_usages",
        enumVO: UsageStatusVO
      },
      surfaceWaterUsage: {
        labelKey: "domain.vos.humanAndSocialEnvironment.surface_water_usage",
        enumVO: WaterUsageVO
      },
      groundWaterUsage: {
        labelKey: "domain.vos.humanAndSocialEnvironment.ground_water_usage",
        enumVO: WaterUsageVO
      },
      urbanClasification: {
        labelKey: "domain.vos.humanAndSocialEnvironment.urban_clasification.title",
        enumVO: UrbanClassificationVO
      },
      urbanCalification: {
        labelKey: "domain.vos.humanAndSocialEnvironment.urban_calification.title",
        enumVO: UrbanCalificationVO
      }
    }
  },
  {
    voKey: "otherImpacts",
    titleKey: "domain.vos.otherImpacts.title",
    fields: {
      impactDescription: {
        labelKey: "domain.vos.otherImpacts.impact_description",
        fullWidth: true
      },
      naturalHeritageState: {
        labelKey: "domain.vos.otherImpacts.natural_heritage_state",
        enumVO: InspectionStateVO
      },
      badSmells: {
        labelKey: "domain.vos.otherImpacts.bad_smells",
        enumVO: InspectionStateVO
      },
      particleEmissionState: {
        labelKey: "domain.vos.otherImpacts.particle_emission_state",
        enumVO: InspectionStateVO
      },
      particleDescription: {
        labelKey: "domain.vos.otherImpacts.particle_description",
        fullWidth: true
      },
      heavyVehicleTrafficState: {
        labelKey: "domain.vos.otherImpacts.heavy_vehicle_traffic_state",
        enumVO: InspectionStateVO
      },
      rodentAndInsectPresenceState: {
        labelKey: "domain.vos.otherImpacts.rodent_and_insect_presence_state",
        enumVO: InspectionStateVO
      },
      periodicSituationImpactsState: {
        labelKey: "domain.vos.otherImpacts.periodic_situation_impacts_state",
        enumVO: InspectionStateVO
      },
      exploitationLossState: {
        labelKey: "domain.vos.otherImpacts.exploitation_loss_state",
        enumVO: InspectionStateVO
      },
      culturalHeritageState: {
        labelKey: "domain.vos.otherImpacts.cultural_heritage_state",
        enumVO: InspectionStateVO
      },
      effectsAndImpactsLevel: {
        labelKey: "domain.vos.otherImpacts.effects_and_impacts_level",
        enumVO: MagnitudeLevelVO
      },
      environmentVisualBasinLevel: {
        labelKey: "domain.vos.otherImpacts.environment_visual_basin_level",
        enumVO: MagnitudeLevelVO
      },
      whereItsSeenFrom: "domain.vos.otherImpacts.where_its_seen_from",
      firesState: {
        labelKey: "domain.vos.otherImpacts.fires_state",
        enumVO: InspectionStateVO
      },
      firesCause: "domain.vos.otherImpacts.fires_cause",
      firesFrequency: "domain.vos.otherImpacts.fires_frequency",
      paperAndPlasticFlights: {
        labelKey: "domain.vos.otherImpacts.paper_and_plastic_flights",
        enumVO: InspectionStateVO
      },
    }
  },
  {
    voKey: "correctingMeasures",
    titleKey: "domain.vos.correcting_measures.title",
    fields: {
      measures: {
        labelKey: "domain.vos.correcting_measures.measures.title",
        enumVO: CorrectingMeasuresVO
      },
      description: {
        labelKey: "domain.vos.correcting_measures.description",
        fullWidth: true
      },
      source: "domain.vos.correcting_measures.source",
      other: {
        labelKey: "domain.vos.correcting_measures.other",
        fullWidth: true
      }
    }
  }
];
