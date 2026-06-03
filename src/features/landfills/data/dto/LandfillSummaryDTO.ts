// src/features/landfills/data/dto/LandfillSummaryDTO.ts

export interface LandfillSummaryPropertiesDTO {
    readonly id: string;
    readonly parcel_id: number;
    readonly version_id: number;
    readonly name: string | null;
    readonly code: string | null;
    readonly global_risk_pct: number | null;
    readonly municipality: string | null;
    readonly historic_territory: string | null;
    readonly main_clp_symbol: string | null;
    readonly centroid: { readonly lat: number, readonly lng: number };
}

export interface GeometryDTO {
    readonly coordinates: number[][][][];
    readonly type: 'MultiPolygon';
}

export interface FeatureDTO {
    readonly geometry: GeometryDTO;
    readonly properties: LandfillSummaryPropertiesDTO;
    readonly type: 'Feature';
}

export interface FeatureCollectionDTO {
    readonly features: FeatureDTO[];
    readonly type: 'FeatureCollection';
}