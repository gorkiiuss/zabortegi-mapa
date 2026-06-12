// src/features/search/domain/entities/AdvancedSearchQuery.ts

export interface TextFilter {
  type: "text";
  value: string;
  includeNull?: boolean;
  onlyNull?: boolean;
}

export interface BooleanFilter {
  type: "boolean";
  value: boolean;
  includeNull?: boolean;
  onlyNull?: boolean;
}

export interface EnumFilter {
  type: "enum";
  value: string[];
  includeNull?: boolean;
  onlyNull?: boolean;
}

export interface NumberRangeFilter {
  type: "number_range";
  min?: number;
  max?: number;
  includeNull?: boolean;
  onlyNull?: boolean;
}

export type Filter = TextFilter | BooleanFilter | EnumFilter | NumberRangeFilter;

export interface AdvancedSearchQuery {
  // General & Location
  name?: TextFilter;
  code?: TextFilter;
  municipality?: EnumFilter;
  historic_territory?: EnumFilter;
  address?: TextFilter;
  is_landfill_accessible?: BooleanFilter;
  zip_code?: TextFilter;
  watershed?: TextFilter;
  toponymy?: TextFilter;
  toponymy_source?: TextFilter;
  accesses_up_to_entrance?: EnumFilter;
  accesses?: EnumFilter;
  surface_ha?: NumberRangeFilter;
  volume_m3?: NumberRangeFilter;
  expected_total_capacity_m3?: NumberRangeFilter;
  landfill_height?: NumberRangeFilter;
  cartographies?: TextFilter;

  // Operation
  classified_activity_record_numbers?: TextFilter;
  property_type?: EnumFilter;
  holder?: TextFilter;
  contact?: TextFilter;
  phone_number?: TextFilter;
  legal_status?: EnumFilter;
  license_characteristics?: EnumFilter;
  equipment_installation_date?: TextFilter; // Treated as string/date match
  equipment?: TextFilter;
  activity_start_date?: TextFilter;
  activity_end_date?: TextFilter;
  years_operating?: NumberRangeFilter;
  landfill_type?: EnumFilter;
  waste_legal_category?: EnumFilter;
  waste_type?: EnumFilter;
  waste_components?: EnumFilter;
  waste_description?: TextFilter;
  grading?: EnumFilter;
  waste_source_company?: TextFilter;
  occurred_incident?: TextFilter;
  waste_layout?: EnumFilter;
  deposit_shapes?: EnumFilter;

  // Infrastructure
  underground_channeling_state?: EnumFilter;
  underground_channeling_type?: EnumFilter;
  hired_personnel?: NumberRangeFilter;
  existing_machinery?: EnumFilter;
  stormwater_management?: TextFilter;
  leachate_sampling_points_state?: EnumFilter;
  bed_waterproofing_state?: EnumFilter;
  side_waterproofing_state?: EnumFilter;
  peripheral_enclosure_state?: EnumFilter;
  hedge_state?: EnumFilter;
  operation_plan_state?: EnumFilter;
  closing_plan_state?: EnumFilter;

  // Fauna & Vegetation
  vegetation_cover?: TextFilter;
  vegetation_cover_description?: TextFilter;
  environment_vegetation?: EnumFilter;
  fauna?: EnumFilter;

  // Hydrology
  annual_precipitation?: NumberRangeFilter;
  effective_rainfall?: NumberRangeFilter;
  drainage_system?: TextFilter;
  near_water_abstraction?: EnumFilter;
  distance_to_nearest_watercourse?: NumberRangeFilter;
  water_abstraction_type?: TextFilter;
  stream_direction?: EnumFilter;
  distance?: NumberRangeFilter;
  crossing_watercourse_state?: EnumFilter;
  underlying_watercourse_state?: EnumFilter;
  stream_name?: TextFilter;

  // Geology
  lithologycal_and_lithostratigraphycal_units?: TextFilter;
  superficial_deposit?: EnumFilter;
  regolith_thickness?: NumberRangeFilter;
  soil_type?: EnumFilter;
  morphology?: EnumFilter;
  permeability_level?: EnumFilter;
  permeability_reason?: EnumFilter;

  // Hydrogeology
  aquifer_type?: EnumFilter;
  estimated_depth?: NumberRangeFilter;
  estimated_stream_direction?: TextFilter;
  vulnerability_level?: EnumFilter;
  hydrogeologycal_unit?: TextFilter;

  // Geotechnique
  hillside_slope?: NumberRangeFilter;
  slope_instability_processes?: EnumFilter;
  waste_mass_stability_level?: EnumFilter;
  flood_potential?: EnumFilter;
  erodibility_level?: EnumFilter;
  structural_discontinuities?: TextFilter;
  covering_state?: EnumFilter;
  land_covering_type?: EnumFilter;
  land_covering_description?: TextFilter;
  covering_material_state?: EnumFilter;
  covering_material_description?: TextFilter;
  effect_on_existing_structures_state?: EnumFilter;
  elements_undergo_slipping_state?: EnumFilter;

  // Human Environment
  surrounding_population?: NumberRangeFilter;
  distance_to_houses_or_recreation?: NumberRangeFilter;
  near_houses_count?: NumberRangeFilter;
  current_usage_status?: EnumFilter;
  current_usage_description?: TextFilter;
  future_usages?: EnumFilter;
  surface_water_usage?: EnumFilter;
  ground_water_usage?: EnumFilter;
  urban_clasification?: EnumFilter;
  urban_calification?: EnumFilter;

  // Other Impacts
  impact_description?: TextFilter;
  natural_heritage_state?: EnumFilter;
  bad_smells?: EnumFilter;
  particle_emission_state?: EnumFilter;
  particle_description?: TextFilter;
  heavy_vehicle_traffic_state?: EnumFilter;
  rodent_and_insect_presence_state?: EnumFilter;
  periodic_situation_impacts_state?: EnumFilter;
  exploitation_loss_state?: EnumFilter;
  cultural_heritage_state?: EnumFilter;
  effects_and_impacts_level?: EnumFilter;
  environment_visual_basin_level?: EnumFilter;
  where_its_seen_from?: TextFilter;
  fires_state?: EnumFilter;
  fires_cause?: TextFilter;
  fires_frequency?: TextFilter;
  paper_and_plastic_flights?: EnumFilter;

  // Correcting Measures
  measures?: EnumFilter;
  correcting_measures_description?: TextFilter;
  correcting_measures_source?: TextFilter;
  correcting_measures_other?: TextFilter;

  // Risks
  global_risk_pct?: NumberRangeFilter;
  infra_risk_pct?: NumberRangeFilter;
  hydro_risk_pct?: NumberRangeFilter;
  geo_risk_pct?: NumberRangeFilter;
  social_risk_pct?: NumberRangeFilter;
  impacts_risk_pct?: NumberRangeFilter;

  // Associations existence checks
  has_samplings?: BooleanFilter;
  has_studies?: BooleanFilter;
  has_multimedia?: BooleanFilter;
}
