// src/features/landfills/domain/valueObjects/CLPSymbol.ts

import type { LandfillType } from "./operation/LandfillType";
import type { WasteComponent } from "./operation/WasteComponent";
import type { WasteLegalCategory } from "./operation/WasteLegalCategory";

const ALLOWED_CLP_SYMBOLS = [
  "acute-toxicity", // GHS06 – Calavera
  "environmental",  // GHS09 – Pez y árbol
  "health-hazard",  // GHS08 – Peligro salud crónico
  "corrosive",      // GHS05
  "flammable",      // GHS02
  "irritant",       // GHS07 – Exclamación
] as const;

const WASTE_LEGAL_CATEGORY_MAPPING: Record<WasteLegalCategory, CLPSymbol[]> = {
    HAZARDOUS: ["acute-toxicity", "environmental", "health-hazard"],
    INERT: [],
    NO_HAZARDOUS: []
}

const LANDFILL_TYPE_MAPPING: Record<LandfillType, CLPSymbol[]> = {
    CO_DISPOSAL: ["environmental", "irritant"],
    DUMPING_SOURCE: ["environmental", "health-hazard"],
    DUMPS: [],
    INDUSTRIAL: ["environmental"],
    INERT: [],
    UNKNOWN: [],
    URBAN: ["irritant"]
}

const COMPONENT_MAPPING: Record<WasteComponent, CLPSymbol[]> = {
    PESTICIDES_AND_POPS: ["acute-toxicity", "environmental", "health-hazard"],
    ASBESTOS_URALITE: ["environmental", "health-hazard"],
    CONSTRUCTION_DEBRIS: [],
    DRUMS_AND_CONTAINERS: [],
    EARTH_AND_ROCKS: [],
    LIQUIDS: [],
    METALLURGICAL_WASTE: ["environmental", "health-hazard"],
    NO_WASTE_OBSERVED: [],
    OILS_AND_FATS: ["environmental", "health-hazard", "flammable"],
    OTHER: [],
    PAINTS_AND_SOLVENTS: ["environmental", "health-hazard", "flammable"],
    PAPER_AND_CELLULOSE: ["environmental", "irritant"],
    SLUDGES_AND_ASHES: ["environmental", "health-hazard"],
    TYRES_AND_RUBBER: ["environmental", "flammable"],
    URBAN_WASTE_RSU: ["environmental", "irritant"],
    WOOD_AND_VEGETATION: ["flammable"],
    POWDER_WASTE: ["health-hazard", "irritant"]
}

export type CLPSymbol = typeof ALLOWED_CLP_SYMBOLS[number];

export const CLPSymbolVO = {
    hydrate: (value: string | null | undefined): CLPSymbol | null => {
        if (!value) return null;
        
        const normalized = value.trim().toLowerCase();
        if (!ALLOWED_CLP_SYMBOLS.includes(normalized as CLPSymbol)) {
            return null;
        }
        
        return normalized as CLPSymbol;
    },
    
    pickMain: (candidateSymbols: CLPSymbol[]): CLPSymbol | null => {
        if (candidateSymbols.length === 0) return null;
        for (const symbol of ALLOWED_CLP_SYMBOLS) {
            if (candidateSymbols.includes(symbol)) return symbol;
        }
        return null;
    },

    values: (): readonly CLPSymbol[] => ALLOWED_CLP_SYMBOLS,

    derive: (
        wasteLegalCategory: WasteLegalCategory | null, 
        landfillType: LandfillType,
        wasteComponents: WasteComponent[] | null
    ): CLPSymbol[] => {
        const out = new Set<CLPSymbol>();

        const legalSymbols = wasteLegalCategory ? 
            WASTE_LEGAL_CATEGORY_MAPPING[wasteLegalCategory]
            : [];
        if (legalSymbols) {
            legalSymbols.forEach(s => out.add(s));
        }

        const typeSymbols = LANDFILL_TYPE_MAPPING[landfillType];
        if (typeSymbols) {
            typeSymbols.forEach(s => out.add(s));
        }

        for (const component of wasteComponents ? wasteComponents : []) {
            const componentSymbols = COMPONENT_MAPPING[component];
            if (componentSymbols) {
                componentSymbols.forEach(s => out.add(s));
            }
        }
        if (wasteLegalCategory === "HAZARDOUS" && out.size === 0) {
            out.add("environmental");
            out.add("health-hazard");
        }

        return ALLOWED_CLP_SYMBOLS.filter(symbol => out.has(symbol));
    }
}