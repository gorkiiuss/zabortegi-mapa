// src/features/landfills/data/mappers/landfillDetailsMapper.ts

import { type LandfillDetailsDTO } from '../dto/LandfillDetailsDTO';
import { type LandfillDetailsHydrateParams } from '../../domain/entities/LandfillDetails';
import { mapMultimediaDTOToDomain } from './multimediaMapper';
import { mapSamplingDTOToDomain } from './samplingMapper';

export const mapLandfillDetailsDTOToDomain = (dto: LandfillDetailsDTO): LandfillDetailsHydrateParams => {
    return {
        id: dto.id,
        parcelId: dto.parcel_id,
        versionId: dto.version_id,
        versionNumber: dto.version_number,
        hasSensitiveData: dto.has_sensitive_data,
        code: dto.code,
        name: dto.name,
        risks: {
            global: dto.risks.global,
            infra: dto.risks.infra,
            hydro: dto.risks.hydro,
            geo: dto.risks.geo,
            social: dto.risks.social,
            impacts: dto.risks.impacts
        },
        location: {
            historicTerritory: dto.location.historic_territory,
            municipalityGroupName: dto.location.municipality_group_name,
            municipalityName: dto.location.municipality_name,
            address: dto.location.address,
            isAccessible: dto.location.is_landfill_accessible,
            zipCode: dto.location.zip_code,
            watershed: dto.location.watershed,
            toponymy: dto.location.toponymy,
            toponymySource: dto.location.toponymy_source,
            accessesUpToEntrance: dto.location.accesses_up_to_entrance,
            accesses: dto.location.accesses,
            dimensionsParams: {
                surfaceHa: dto.location.surface_ha,
                volumeM3: dto.location.volume_m3,
                expectedTotalCapacityM3: dto.location.expected_total_capacity_m3,
                landfillHeight: dto.location.landfill_height,
            },
            cartographies: dto.location.cartographies
        },
        operation: {
            classifiedActivityRecordNumbers: dto.operation?.classified_activity_record_numbers ?? null,
            propertyType: dto.operation?.property_type ?? null,
            holder: dto.operation?.holder ?? null,
            contact: dto.operation?.contact ?? null,
            address: dto.operation?.address ?? null,
            phoneNumber: dto.operation?.phone_number ?? null,
            legalStatus: dto.operation?.legal_status ?? null,
            licenseCharacteristics: dto.operation?.license_characteristics ?? null,
            equipmentInstallationDate: dto.operation?.equipment_installation_date ?? null,
            equipment: dto.operation?.equipment ?? null,
            activityStartDate: dto.operation?.activity_start_date ?? null,
            activityEndDate: dto.operation?.activity_end_date ?? null,
            yearsOperating: dto.operation?.years_operating ?? null,
            landfillType: dto.operation?.landfill_type ?? null,
            wasteLegalCategory: dto.operation?.waste_legal_category ?? null,
            wasteType: dto.operation?.waste_type ?? null,
            wasteComponents: dto.operation?.waste_components ?? null,
            wasteDescription: dto.operation?.waste_description ?? null,
            grading: dto.operation?.grading ?? null,
            wasteSourceCompany: dto.operation?.waste_source_company ?? null,
            occurredIncident: dto.operation?.occurred_incident ?? null,
            wasteLayout: dto.operation?.waste_layout ?? null,
            depositShapes: dto.operation?.deposit_shapes ?? null,
            ownershipParams: {
                type: dto.ownership?.type ?? "UNKNOWN",
                is_heuristic: dto.ownership?.is_heuristic ?? true
            },
        },
        infrastructure: {
            undergroundChannelingState: dto.infrastructure.underground_channeling_state,
            undergroundChannelingType: dto.infrastructure.underground_channeling_type,
            hiredPersonnel: dto.infrastructure.hired_personnel,
            existingMachinery: dto.infrastructure.existing_machinery,
            stormwaterManagement: dto.infrastructure.stormwater_management,
            leachateSamplingPointsState: dto.infrastructure.leachate_sampling_points_state,
            bedWaterproofingState: dto.infrastructure.bed_waterproofing_state,
            sideWaterproofingState: dto.infrastructure.side_waterproofing_state,
            peripheralEnclosureState: dto.infrastructure.peripheral_enclosure_state,
            hedgeState: dto.infrastructure.hedge_state,
            operationPlanState: dto.infrastructure.operation_plan_state,
            closingPlanState: dto.infrastructure.closing_plan_state
        },
        faunaAndVegetation: {
            vegetationCover: dto.fauna_and_vegetation.vegetation_cover,
            vegetationCoverDescription: dto.fauna_and_vegetation.vegetation_cover_description,
            environmentVegetation: dto.fauna_and_vegetation.environment_vegetation,
            fauna: dto.fauna_and_vegetation.fauna,
        },
        hydrology: {
            annualPrecipitation: dto.hydrology.annual_precipitation,
            effectiveRainfall: dto.hydrology.effective_rainfall,
            drainageSystem: dto.hydrology.drainage_system,
            nearWaterAbstraction: dto.hydrology.near_water_abstraction,
            distanceToNearestWatercourse: dto.hydrology.distance_to_nearest_watercourse,
            waterAbstractionType: dto.hydrology.water_abstraction_type,
            streamDirection: dto.hydrology.stream_direction,
            distance: dto.hydrology.distance,
            crossingWatercourseState: dto.hydrology.crossing_watercourse_state,
            underlyingWatercourseState: dto.hydrology.underlying_watercourse_state,
            streamName: dto.hydrology.stream_name
        },
        geology: {
            lithologycalAndLithostratigraphycalUnits: dto.geology.lithologycal_and_lithostratigraphycal_units,
            superficialDeposit: dto.geology.superficial_deposit,
            regolithThickness: dto.geology.regolith_thickness,
            soilType: dto.geology.soil_type,
            morphology: dto.geology.morphology,
            permeabilityLevel: dto.geology.permeability_level,
            permeabilityReason: dto.geology.permeability_reason
        },
        hydrogeology: {
            aquiferType: dto.hydrogeology.aquifer_type,
            estimatedDepth: dto.hydrogeology.estimated_depth,
            estimatedStreamDirection: dto.hydrogeology.estimated_stream_direction,
            vulnerabilityLevel: dto.hydrogeology.vulnerability_level,
            hydrogeologycalUnit: dto.hydrogeology.hydrogeologycal_unit
        },
        geotechniqueCharacteristics: {
            hillsideSlope: dto.geotechnique_characteristics.hillside_slope,
            slopeInstabilityProcesses: dto.geotechnique_characteristics.slope_instability_processes,
            wasteMassStabilityLevel: dto.geotechnique_characteristics.waste_mass_stability_level,
            floodPotential: dto.geotechnique_characteristics.flood_potential,
            erodibilityLevel: dto.geotechnique_characteristics.erodibility_level,
            structuralDiscontinuities: dto.geotechnique_characteristics.structural_discontinuities,
            coveringState: dto.geotechnique_characteristics.covering_state,
            landCoveringType: dto.geotechnique_characteristics.land_covering_type,
            landCoveringDescription: dto.geotechnique_characteristics.land_covering_description,
            coveringMaterialState: dto.geotechnique_characteristics.covering_material_state,
            coveringMaterialDescription: dto.geotechnique_characteristics.covering_material_description,
            effectOnExistingStructuresState: dto.geotechnique_characteristics.effect_on_existing_structures_state,
            elementsUndergoSlippingState: dto.geotechnique_characteristics.elements_undergo_slipping_state
        },
        humanAndSocialEnvironment: {
            surroundingPopulation: dto.human_and_social_environment.surrounding_population,
            distanceToHousesOrRecreation: dto.human_and_social_environment.distance_to_houses_or_recreation,
            nearHousesCount: dto.human_and_social_environment.near_houses_count,
            currentUsageStatus: dto.human_and_social_environment.current_usage_status,
            currentUsageDescription: dto.human_and_social_environment.current_usage_description,
            futureUsages: dto.human_and_social_environment.future_usages,
            surfaceWaterUsage: dto.human_and_social_environment.surface_water_usage,
            groundWaterUsage: dto.human_and_social_environment.ground_water_usage,
            urbanClasification: dto.human_and_social_environment.urban_clasification,
            urbanCalification: dto.human_and_social_environment.urban_calification
        },
        otherImpacts: {
            impactDescription: dto.other_impacts.impact_description,
            naturalHeritageState: dto.other_impacts.natural_heritage_state,
            badSmells: dto.other_impacts.bad_smells,
            particleEmissionState: dto.other_impacts.particle_emission_state,
            particleDescription: dto.other_impacts.particle_description,
            heavyVehicleTrafficState: dto.other_impacts.heavy_vehicle_traffic_state,
            rodentAndInsectPresenceState: dto.other_impacts.rodent_and_insect_presence_state,
            periodicSituationImpactsState: dto.other_impacts.periodic_situation_impacts_state,
            exploitationLossState: dto.other_impacts.exploitation_loss_state,
            culturalHeritageState: dto.other_impacts.cultural_heritage_state,
            effectsAndImpactsLevel: dto.other_impacts.effects_and_impacts_level,
            environmentVisualBasinLevel: dto.other_impacts.environment_visual_basin_level,
            whereItsSeenFrom: dto.other_impacts.where_its_seen_from,
            firesState: dto.other_impacts.fires_state,
            firesCause: dto.other_impacts.fires_cause,
            firesFrequency: dto.other_impacts.fires_frequency,
            paperAndPlasticFlights: dto.other_impacts.paper_and_plastic_flights
        },
        correctingMeasures: {
            measures: dto.correcting_measures.measures,
            description: dto.correcting_measures.description,
            source: dto.correcting_measures.source,
            other: dto.correcting_measures.other
        },
        samplings: dto.samplings? 
            dto.samplings.map(mapSamplingDTOToDomain) 
            : null,
        studies: dto.studies ? (
            dto.studies.map((study) => ({
                study: study.study
            }))
        ) : null,
        multimedia: dto.multimedia ? 
            dto.multimedia.map((multi) => mapMultimediaDTOToDomain(multi, dto.id))
            : null,
        legacyRawData: dto.legacy_raw_data || null
    }
}