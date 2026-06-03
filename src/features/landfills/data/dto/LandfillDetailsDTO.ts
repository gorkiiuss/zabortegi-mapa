// src/features/landfills/data/dto/LandfillDetailsDTO.ts

export interface OwnershipDTO {
    readonly type: string;
    readonly is_heuristic: boolean;
}

export interface LandfillDetailsRisksDTO {
    readonly global: number | null;
    readonly infra: number | null;
    readonly hydro: number | null;
    readonly geo: number | null;
    readonly social: number | null;
    readonly impacts: number | null;
}

export interface LandfillDetailsLocationDTO {
    readonly historic_territory: string | null;
    readonly municipality_group_name: string | null;
    readonly municipality_name: string | null;
    readonly address: string | null;
    readonly is_landfill_accessible: boolean | null;
    readonly zip_code: string | null;
    readonly watershed: string | null;
    readonly toponymy: string | null;
    readonly toponymy_source: string | null;
    readonly accesses_up_to_entrance: string[] | null;
    readonly accesses: string[] | null;
    readonly surface_ha: number | null;
    readonly volume_m3: number | null;
    readonly expected_total_capacity_m3: number | null;
    readonly landfill_height: number | null;
    readonly cartographies: string[] | null;
}

export interface LandfillDetailsOperationDTO {
    readonly classified_activity_record_numbers: string[] | null;
    readonly property_type: string | null;
    readonly holder: string | null;
    readonly contact: string | null;
    readonly address: string | null;
    readonly phone_number: string | null;
    readonly legal_status: string;
    readonly license_characteristics: string | null;
    readonly equipment_installation_date: string | null;
    readonly equipment: string[] | null;
    readonly activity_start_date: string | null;
    readonly activity_end_date: string | null;
    readonly years_operating: number | null;
    readonly landfill_type: string;
    readonly waste_legal_category: string | null;
    readonly waste_type: string | null;
    readonly waste_components: string[] | null;
    readonly waste_description: string | null;
    readonly grading: string | null;
    readonly waste_source_company: string | null;
    readonly occurred_incident: string | null;
    readonly waste_layout: string | null;
    readonly deposit_shapes: string[] | null;
}

export interface LandfillDetailsInfrastructureDTO {
    readonly underground_channeling_state: string | null;
    readonly underground_channeling_type: string | null;
    readonly hired_personnel: string | null;
    readonly existing_machinery: string | null;
    readonly stormwater_management: boolean | null;
    readonly leachate_sampling_points_state: string | null;
    readonly bed_waterproofing_state: string | null;
    readonly side_waterproofing_state: string | null;
    readonly peripheral_enclosure_state: string | null;
    readonly hedge_state: string | null;
    readonly operation_plan_state: string | null;
    readonly closing_plan_state: string | null;
}

export interface LandfillDetailsFaunaAndVegetationDTO {
    readonly vegetation_cover: string | null;
    readonly vegetation_cover_description: string | null;
    readonly environment_vegetation: string[] | null;
    readonly fauna: string[] | null;
}

export interface LandfillDetailsHydrologyDTO {
    readonly annual_precipitation: string | null;
    readonly effective_rainfall: string | null;
    readonly drainage_system: string | null;
    readonly near_water_abstraction: string | null;
    readonly distance_to_nearest_watercourse: string | null;
    readonly water_abstraction_type: string | null;
    readonly stream_direction: string;
    readonly distance: string | null;
    readonly crossing_watercourse_state: string | null;
    readonly underlying_watercourse_state: string | null;
    readonly stream_name: string | null;
}

export interface LandfillDetailsGeologyDTO {
    readonly lithologycal_and_lithostratigraphycal_units: string | null;
    readonly superficial_deposit: string | null;
    readonly regolith_thickness: string | null;
    readonly soil_type: string | null;
    readonly morphology: string | null;
    readonly permeability_level: string | null;
    readonly permeability_reason: string | null;
}

export interface LandfillDetailsHydrogeologyDTO {
    readonly aquifer_type: string | null;
    readonly estimated_depth: string | null;
    readonly estimated_stream_direction: string | null;
    readonly vulnerability_level: string | null;
    readonly hydrogeologycal_unit: string | null;
}

export interface LandfillDetailsGeotechniqueCharacteristicsDTO {
    readonly hillside_slope: string | null;
    readonly slope_instability_processes: string | null;
    readonly waste_mass_stability_level: string | null;
    readonly flood_potential: string | null;
    readonly erodibility_level: string | null;
    readonly structural_discontinuities: string | null;
    readonly covering_state: string | null;
    readonly land_covering_type: string | null;
    readonly land_covering_description: string | null;
    readonly covering_material_state: string | null;
    readonly covering_material_description: string | null;
    readonly effect_on_existing_structures_state: string | null;
    readonly elements_undergo_slipping_state: string | null;
}

export interface LandfillDetailsHumanAndSocialEnvironmentDTO {
    readonly surrounding_population: string | null;
    readonly distance_to_houses_or_recreation: string | null;
    readonly near_houses_count: number | null;
    readonly current_usage_status: string | null;
    readonly current_usage_description: string | null;
    readonly future_usages: string | null;
    readonly surface_water_usage: string | null;
    readonly ground_water_usage: string | null;
    readonly urban_clasification: string | null;
    readonly urban_calification: string | null;
}

export interface LandfillDetailsOtherImpactsDTO {
    readonly impact_description: string | null;
    readonly natural_heritage_state: string | null;
    readonly bad_smells: string | null;
    readonly particle_emission_state: string | null;
    readonly particle_description: string | null;
    readonly heavy_vehicle_traffic_state: string | null;
    readonly rodent_and_insect_presence_state: string | null;
    readonly periodic_situation_impacts_state: string | null;
    readonly exploitation_loss_state: string | null;
    readonly cultural_heritage_state: string | null;
    readonly effects_and_impacts_level: string | null;
    readonly environment_visual_basin_level: string | null;
    readonly where_its_seen_from: string | null;
    readonly fires_state: string | null;
    readonly fires_cause: string | null;
    readonly fires_frequency: string | null;
    readonly paper_and_plastic_flights: string | null;
}

export interface LandfillCorrectingMeasuresDTO {
    readonly measures: string | null;
    readonly description: string | null;
    readonly source: string | null;
    readonly other: string | null;
}

export interface ParameterDTO {
    readonly name: string;
    readonly family: string | null;
    readonly legal_limit: number | null;
}

export interface LandfillSamplingResultDTO {
    readonly parameter: ParameterDTO;
    readonly regulation_ref: string | null;
    readonly matrix: string;
    readonly result_operator: string | null;
    readonly result_value: number;
    readonly alternative_result_value: string | null;
    readonly unit: string | null;
}

export interface LandfillSamplingDTO {
    readonly id: string;
    readonly description: string;
    readonly sampling_date: string;
    readonly sample_type: string;
    readonly location: string;
    readonly results: LandfillSamplingResultDTO[] | null;
}

export interface LandfillDetailsStudyDTO {
    readonly study: string;
}

export interface LandfillMultimediaDTO {
    readonly file_name: string;
    readonly file_path: string;
    readonly category: string;
    readonly description: string | null;
    readonly file_size_bytes: number | null;
    readonly uploaded_at: string;
}

export interface LandfillDetailsDTO {
    readonly id: string;
    readonly parcel_id: number;
    readonly version_id: number;
    readonly version_number: number;
    readonly has_sensitive_data: boolean;
    readonly code: string | null;
    readonly name: string | null;
    readonly ownership: OwnershipDTO;
    readonly risks: LandfillDetailsRisksDTO;
    readonly location: LandfillDetailsLocationDTO;
    readonly operation: LandfillDetailsOperationDTO;
    readonly infrastructure: LandfillDetailsInfrastructureDTO;
    readonly fauna_and_vegetation: LandfillDetailsFaunaAndVegetationDTO;
    readonly hydrology: LandfillDetailsHydrologyDTO;
    readonly geology: LandfillDetailsGeologyDTO;
    readonly hydrogeology: LandfillDetailsHydrogeologyDTO;
    readonly geotechnique_characteristics: LandfillDetailsGeotechniqueCharacteristicsDTO;
    readonly human_and_social_environment: LandfillDetailsHumanAndSocialEnvironmentDTO;
    readonly other_impacts: LandfillDetailsOtherImpactsDTO;
    readonly correcting_measures: LandfillCorrectingMeasuresDTO;
    readonly samplings: LandfillSamplingDTO[] | null;
    readonly studies: LandfillDetailsStudyDTO[] | null;
    readonly multimedia: LandfillMultimediaDTO[] | null;
    readonly legacy_raw_data?: any | null;
}