// src/features/landfills/domain/indexGrouping.ts
import type { Landfill, Territory, LandfillSummary } from "./types";
import { filterRankingByQuery, summarize } from "./selectors";

export type TerritoryKey = Territory | "unknown-territory";

export interface MunicipalityGroup {
  key: string;
  label: string;
  landfills: Landfill[];
  totalCount: number;
}

export interface TerritoryGroup {
  key: TerritoryKey;
  label: string;
  municipalities: MunicipalityGroup[];
  totalCount: number;
}

export interface LandfillIndexGroupingResult {
  territories: TerritoryGroup[];
  totalCount: number;
  matchCount: number;
}

const TERRITORY_ORDER: Territory[] = ["Araba", "Bizkaia", "Gipuzkoa"];

const UNKNOWN_TERRITORY_KEY: TerritoryKey = "unknown-territory";
const UNKNOWN_TERRITORY_LABEL = "Sin territorio histórico";
const UNKNOWN_MUNICIPALITY_LABEL = "Sin municipio";

function territorySortKey(key: TerritoryKey): number {
  const idx = TERRITORY_ORDER.indexOf(key as Territory);
  if (idx >= 0) return idx;
  if (key === UNKNOWN_TERRITORY_KEY) return TERRITORY_ORDER.length + 1;
  return TERRITORY_ORDER.length + 2;
}

function renderTerritoryLabel(key: TerritoryKey): string {
  if (key === UNKNOWN_TERRITORY_KEY) return UNKNOWN_TERRITORY_LABEL;
  return key;
}

/**
 * Agrupa vertederos para el índice:
 *  - TH -> Municipio -> Vertederos
 *  - "Sin territorio histórico" al final
 *  - "Sin municipio" al final dentro de cada TH
 *  - Dentro de un municipio: primero con riesgo conocido (score desc),
 *    luego los de riskLevel === "unknown".
 */
export function groupLandfillsForIndex(
  landfills: Landfill[],
  query: string,
): LandfillIndexGroupingResult {
  const totalCount = landfills.length;
  if (!totalCount) {
    return { territories: [], totalCount: 0, matchCount: 0 };
  }

  // Filtro textual usando el mismo helper que el resto de la app
  const trimmed = query.trim();
  let working = landfills;

  if (trimmed) {
    const rankingItems: LandfillSummary[] = landfills.map((lf) =>
      summarize(lf),
    );

    const filtered = filterRankingByQuery(rankingItems, trimmed);
    const allowed = new Set(filtered.map((r) => r.id));

    working = landfills.filter((lf) => allowed.has(lf.parcelId ?? ""));
  }

  const byTerritory = new Map<TerritoryKey, Map<string, Landfill[]>>();

  for (const lf of working) {
    // Territorio histórico (o sin territorio)
    const rawTerritory = (lf.territory as Territory | undefined) ?? undefined;
    const territoryKey: TerritoryKey =
      rawTerritory && TERRITORY_ORDER.includes(rawTerritory)
        ? rawTerritory
        : UNKNOWN_TERRITORY_KEY;

    // Municipio (o sin municipio)
    const rawMunicipality = (lf.municipality ?? "").trim();
    const municipalityKey =
      rawMunicipality.length > 0 ? rawMunicipality : UNKNOWN_MUNICIPALITY_LABEL;

    let muniMap = byTerritory.get(territoryKey);
    if (!muniMap) {
      muniMap = new Map<string, Landfill[]>();
      byTerritory.set(territoryKey, muniMap);
    }

    const arr = muniMap.get(municipalityKey) ?? [];
    arr.push(lf);
    muniMap.set(municipalityKey, arr);
  }

  const territories: TerritoryGroup[] = [];

  [...byTerritory.entries()]
    .sort(([ta], [tb]) => territorySortKey(ta) - territorySortKey(tb))
    .forEach(([territoryKey, muniMap]) => {
      const municipalities: MunicipalityGroup[] = [...muniMap.entries()]
        .sort(([a], [b]) => {
          const aUnknown = a === UNKNOWN_MUNICIPALITY_LABEL;
          const bUnknown = b === UNKNOWN_MUNICIPALITY_LABEL;
          if (aUnknown && !bUnknown) return 1;
          if (!aUnknown && bUnknown) return -1;
          return a.localeCompare(b, "es");
        })
        .map(([muniKey, lfs]) => {
          const knownRisk = lfs.filter(
            (lf) => lf.riskLevel && lf.riskLevel !== "unknown",
          );
          const unknownRisk = lfs.filter(
            (lf) => !lf.riskLevel || lf.riskLevel === "unknown",
          );
          const sortedKnown = [...knownRisk].sort(
            (a, b) => b.riskScore - a.riskScore,
          );

          const label =
            muniKey === UNKNOWN_MUNICIPALITY_LABEL
              ? UNKNOWN_MUNICIPALITY_LABEL
              : muniKey;

          const landfillsSorted = [...sortedKnown, ...unknownRisk];

          return {
            key: muniKey,
            label,
            landfills: landfillsSorted,
            totalCount: landfillsSorted.length,
          };
        });

      const tTotal = municipalities.reduce((acc, m) => acc + m.totalCount, 0);

      territories.push({
        key: territoryKey,
        label: renderTerritoryLabel(territoryKey),
        municipalities,
        totalCount: tTotal,
      });
    });

  const matchCount = territories.reduce((acc, t) => acc + t.totalCount, 0);

  return { territories, totalCount, matchCount };
}
