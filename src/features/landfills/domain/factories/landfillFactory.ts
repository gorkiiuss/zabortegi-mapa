// src/features/landfills/domain/factories/landfillFactory.ts

import type * as GeoJSON from "geojson";
import type {
  Landfill,
  LandfillId,
  LandfillKind,
  RiskLevel,
  Territory,
} from "../types";
import type { RawSections, RawProperties } from "../rawTypes";
import {
  inferClpSymbols,
  pickMainClpSymbol,
} from "../clpClassification";

// Definimos el tipo aquí para tipar la entrada de la factoría
export type LandfillGeometry = GeoJSON.Polygon | GeoJSON.MultiPolygon;
export type LandfillFeature = GeoJSON.Feature<LandfillGeometry, RawProperties>;

// ─── HELPERS DE LÓGICA DE NEGOCIO (Extraídos del Repositorio) ───

function checkInfo(props: RawProperties): boolean {
  // Caso principal: confiamos en hasFicha
  if (props.hasFicha === true) return true;
  if (props.hasFicha === false) return false;

  // Fallback por si en algún caso no viene hasFicha,
  // pero sí hay secciones en bruto (ficha parseada).
  const rawSections = (props.sections ?? {}) as RawSections;
  return Object.keys(rawSections).length > 0;
}

// Centroid aproximado: media de todos los vértices
function computeCentroid(geometry: LandfillGeometry): {
  lat: number;
  lng: number;
} {
  let sumLat = 0;
  let sumLng = 0;
  let count = 0;

  const addCoords = (coords: number[][]) => {
    for (const [lng, lat] of coords) {
      sumLat += lat;
      sumLng += lng;
      count += 1;
    }
  };

  if (geometry.type === "Polygon") {
    const rings = geometry.coordinates;
    if (rings[0]) addCoords(rings[0]);
  } else if (geometry.type === "MultiPolygon") {
    const polys = geometry.coordinates;
    for (const poly of polys) {
      if (poly[0]) addCoords(poly[0]);
    }
  }

  if (count === 0) {
    return { lat: 0, lng: 0 };
  }

  return {
    lat: sumLat / count,
    lng: sumLng / count,
  };
}

function riskLevelFromScore(score: number): RiskLevel {
  if (score >= 80) return "very-high";
  if (score >= 60) return "high";
  if (score >= 40) return "medium";
  if (score > 0) return "low";
  return "unknown";
}

/**
 * Deriva un riskScore 0–100 a partir de las propiedades `risk` del GeoJSON.
 * Si no hay datos suficientes, devuelve 0 y nivel "unknown".
 */
function deriveRiskScoreFromRaw(props: RawProperties): {
  riskScore: number;
  riskLevel: RiskLevel;
} {
  const rawRisk = props.risk;

  if (
    !rawRisk ||
    rawRisk.status !== "ok" ||
    !rawRisk.hasEnoughData ||
    rawRisk.final == null ||
    typeof rawRisk.final !== "number" ||
    !Number.isFinite(rawRisk.final)
  ) {
    return {
      riskScore: 0,
      riskLevel: "unknown",
    };
  }

  const MAX_RISK_FINAL = 3;
  const pct = Math.max(
    0,
    Math.min(100, (rawRisk.final / MAX_RISK_FINAL) * 100),
  );
  const rounded = Math.round(pct);

  return {
    riskScore: rounded,
    riskLevel: riskLevelFromScore(rounded),
  };
}

function normalizeTerritory(value?: string): Territory {
  if (value === "Bizkaia" || value === "Vizcaya" || value === "Bizcaya") {
    return "Bizkaia";
  }
  if (value === "Gipuzkoa" || value === "Guipúzcoa") {
    return "Gipuzkoa";
  }
  return "Araba";
}

function normalizeKind(value?: string): LandfillKind {
  if (!value) return "unknown";

  const v = value.toLowerCase();

  if (v.includes("industrial")) return "industrial";
  if (v.includes("inerte") || v.includes("inertes")) return "inert";
  if (v.includes("peligros")) return "hazardous";
  if (v.includes("urbano") || v.includes("residuos urbanos")) return "urban";
  if (v.includes("min")) return "mining";

  return "unknown";
}

// ─── MÉTODO PRINCIPAL DE LA FACTORÍA ───

export function createLandfillFromFeature(
  feature: LandfillFeature,
  index: number,
): Landfill {
  const { geometry, properties } = feature;
  const sections = (properties.sections ?? {}) as RawSections;

  const datosGenerales = sections["1.- Datos generales"] ?? {};
  const loc = datosGenerales.LOCALIZACIÓN ?? {};
  const expl = datosGenerales.EXPLOTACIÓN ?? {};

  const rawParcelId = properties.IdParcela;
  const objectId = properties.OBJECTID;

  const technicalId: LandfillId = `lf-${index}-${objectId ?? "no-id"}`;
  const businessId = rawParcelId ? String(rawParcelId) : technicalId;

  const name = properties.NombreVertedero;
  const municipality = (loc.Municipio as string | undefined) ?? "Desconocido";
  const territory = normalizeTerritory(
    loc["Territorio Histórico"] as string | undefined,
  );
  const kind = normalizeKind(
    (expl["Tipo de vertedero"] as string | undefined) ?? undefined,
  );

  const centroid = computeCentroid(geometry);
  const { riskScore, riskLevel } = deriveRiskScoreFromRaw(properties);

  const { sections: _sections, ...restProps } = properties;
  const rawProps: Record<string, unknown> = { ...restProps, sections };

  const clpSymbols = inferClpSymbols(properties, kind);
  const mainClpSymbol = pickMainClpSymbol(clpSymbols);
  const hasInfo = checkInfo(properties);

  return {
    hasInfo,
    id: technicalId,
    parcelId: businessId,
    code: properties.Código,
    name,
    municipality,
    territory,
    kind,
    riskScore,
    riskLevel,
    centroid,
    geometry,
    clpSymbols,
    mainClpSymbol,
    rawProperties: rawProps,
  };
}