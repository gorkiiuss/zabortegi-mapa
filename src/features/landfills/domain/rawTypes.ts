// src/features/landfills/domain/rawTypes.ts

export interface RawSections {
  "1.- Datos generales"?: {
    LOCALIZACIÓN?: {
      "Territorio Histórico"?: string;
      Municipio?: string;
      "C.P."?: string;
      "Superficie (Has)"?: string | number;
      "Volumen (m 3 )"?: string | number;
      "Capacidad total prevista (m 3 )"?: string | number;
      [key: string]: unknown;
    };
    EXPLOTACIÓN?: {
      "Tipo de vertedero"?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  "2.- Datos del Entorno"?: {
    HIDROLOGIA?: {
      "Precipitación anual"?: string;
      "Lluvia útil"?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  "4.- Medidas correctoras"?: {
    "Medidas correctoras"?: string;
    Descripción?: string;
    Otros?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface RawRisk {
  status?: string;
  hasEnoughData?: boolean;
  infra?: number | null;
  hydro?: number | null;
  geology?: number | null;
  human?: number | null;
  impacts?: number | null;
  final?: number | null;
  [key: string]: unknown;
}

export interface RawProperties {
  OBJECTID: number;
  Código: string;
  NombreVertedero: string;
  sections?: RawSections;
  documentation?: {
    label: string;
    path: string;
  }[];
  imgs?: {
    titulo: string;
    path: string;
  }[];
  hasFicha?: boolean;
  IdParcela?: number;
  risk?: RawRisk | null;
  [key: string]: unknown;
}
