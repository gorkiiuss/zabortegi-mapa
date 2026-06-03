// src/features/landfills/data/dto/LandfillVersionDTO.ts

export interface LandfillVersionDTO {
    readonly version_id: number;
    readonly version_number: number;
    readonly status: string;
    readonly created_by: number;
    readonly change_summary: string | null;
    readonly created_at: string | null;
    readonly reviewed_by: string | null;
    readonly review_notes: string | null;
    readonly reviewed_at: string | null;
}

export interface VersionsResponseDTO {
    readonly id: number,
    readonly versions: LandfillVersionDTO[]
}