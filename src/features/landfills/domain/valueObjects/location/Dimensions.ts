// src/features/landfills/domain/valueObjects/location/Dimensions.ts

export interface DimensionsParams {
    surfaceHa: number | null,
    volumeM3: number | null,
    expectedTotalCapacityM3: number | null,
    landfillHeight: number | null
}

export interface Dimensions {
    fillPercent(): number | null;
    readonly surfaceHa: number | null,
    readonly volumeM3: number | null,
    readonly expectedTotalCapacityM3: number | null,
    readonly landfillHeight: number | null
}

export const DimensionsVO = {
    hydrate: (params: DimensionsParams): Dimensions => {
        return {
            surfaceHa: params.surfaceHa,
            volumeM3: params.volumeM3,
            expectedTotalCapacityM3: params.expectedTotalCapacityM3,
            landfillHeight: params.landfillHeight,
            fillPercent() {
                if (this.volumeM3 == null || this.expectedTotalCapacityM3 == null || this.expectedTotalCapacityM3 == 0)
                    return null
                return (this.volumeM3 / this.expectedTotalCapacityM3) * 100
            },
        };
    },
};