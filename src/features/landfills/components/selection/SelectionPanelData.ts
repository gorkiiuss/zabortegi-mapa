import type { Landfill } from "../../domain/types";
import type { GalleryImage } from "./galleryTypes";
import type { RiskSectionInfo } from "./cards/SelectionRiskCard";
import { buildLandfillMediaUrl } from "@shared/utils/media";

interface RawLocationSection {
  "Territorio Histórico"?: string;
  Municipio?: string;
  "C.P."?: string;
  "Superficie (Has)"?: string | number;
  "Volumen (m 3 )"?: string | number;
  "Capacidad total prevista (m 3 )"?: string | number;
  [key: string]: unknown;
}

interface RawExploitationSection {
  "Situación legal"?: string;
  "Tipo de vertedero"?: string;
  "Tipo residuos depositados"?: string;
  "Descripción de los residuos"?: string;
  [key: string]: unknown;
}

interface RawGeneralSection {
  LOCALIZACIÓN?: RawLocationSection;
  EXPLOTACIÓN?: RawExploitationSection;
  [key: string]: unknown;
}

interface RawHydrologySection {
  "Precipitación anual"?: string;
  "Lluvia útil"?: string;
  [key: string]: unknown;
}

interface RawEnvironmentSection {
  HIDROLOGIA?: RawHydrologySection;
  [key: string]: unknown;
}

interface RawMeasuresSection {
  "Medidas correctoras"?: string;
  Descripción?: string;
  Otros?: string;
  [key: string]: unknown;
}

export interface RawSections {
  "1.- Datos generales"?: RawGeneralSection;
  "2.- Datos del Entorno"?: RawEnvironmentSection;
  "4.- Medidas correctoras"?: RawMeasuresSection;
  [key: string]: unknown;
}

interface RawImg {
  titulo?: string;
  path?: string;
}

interface RawRisk {
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

export interface RawProps {
  Código?: string;
  IdParcela?: number;
  sections?: RawSections;
  imgs?: RawImg[];
  risk?: RawRisk;
  [key: string]: unknown;
}

export interface SelectionPanelData {
  // header
  subtitle: string;
  imgsCount: number;
  coverImageUrl: string | null;
  galleryImages: GalleryImage[];

  // riesgo
  hasRealRisk: boolean;
  hasDetailedRisk: boolean;
  riskGlobalPercent: number | null;
  riskSectionsInfo: RiskSectionInfo[];

  // dimensiones
  superficieDisplay: string;
  volumenDisplay: string;
  capacidadDisplay: string | null;
  fillPercent: number | null;

  // legal
  situacionLegal: string | null;
  tipoVertedero: string | null;
  tiposResiduos: string | null;
  descripcionResiduos: string | null;

  // clima
  precipitacion: string | null;
  lluviaUtil: string | null;

  // medidas correctoras
  medidasTitulo: string | null;
  medidasDescripcion: string | null;
  medidasOtros: string | null;

  // qué bloques se muestran
  showDimensions: boolean;
  showLegal: boolean;
  showClimate: boolean;
  showMeasures: boolean;

  // info detallada
  moreInfoSections: Record<string, unknown>;
}

//
// Helpers de formateo / parsing
//

function parseNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === "string") {
    const cleaned = value
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/\s/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function toDisplay(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === "number") return String(value);
  if (typeof value === "string" && value.trim().length > 0) return value;
  return null;
}

// Convierte riesgo 0–3 a 0–100 (para las barras por sección)
function riskToPercent(
  score: number | null | undefined,
  max = 3,
): number | null {
  if (score == null || !Number.isFinite(score)) return null;
  const pct = (score / max) * 100;
  return Math.max(0, Math.min(100, pct));
}

//
// Builder principal
//

export function buildSelectionPanelData(
  landfill: Landfill,
): SelectionPanelData {
  const raw = (landfill.rawProperties ?? {}) as RawProps;
  const sections = (raw.sections ?? {}) as RawSections;

  const datosGenerales = sections["1.- Datos generales"] ?? {};
  const loc = (datosGenerales.LOCALIZACIÓN ?? {}) as RawLocationSection;
  const expl = (datosGenerales.EXPLOTACIÓN ?? {}) as RawExploitationSection;

  const entorno = (sections["2.- Datos del Entorno"] ??
    {}) as RawEnvironmentSection;
  const hidro = (entorno.HIDROLOGIA ?? {}) as RawHydrologySection;

  const medidas = (sections["4.- Medidas correctoras"] ??
    {}) as RawMeasuresSection;

  const imgs = (raw.imgs ?? []) as RawImg[];
  const risk = raw.risk as RawRisk | undefined;

  const codigo = (raw.Código as string | undefined) ?? landfill.id;
  const cp = (loc["C.P."] as string | undefined) ?? "";
  const territorioHistorico =
    (loc["Territorio Histórico"] as string | undefined) ?? landfill.territory;

  const superficieRaw = loc["Superficie (Has)"];
  const volumenRaw = loc["Volumen (m 3 )"];
  const capacidadRaw = loc["Capacidad total prevista (m 3 )"];

  const volumenNum = parseNumber(volumenRaw);
  const capacidadNum = parseNumber(capacidadRaw);

  const superficieDisplay = toDisplay(superficieRaw) ?? "—";
  const volumenDisplay = toDisplay(volumenRaw) ?? "—";
  const capacidadDisplay =
    capacidadNum == null || capacidadNum <= 0
      ? null
      : (toDisplay(capacidadRaw) ?? "—");

  const fillPercent =
    volumenNum != null && capacidadNum != null && capacidadNum > 0
      ? (volumenNum / capacidadNum) * 100
      : null;

  const precipitacion = toDisplay(hidro["Precipitación anual"]);
  const lluviaUtil = toDisplay(hidro["Lluvia útil"]);

  const medidasTitulo = toDisplay(medidas["Medidas correctoras"]);
  const medidasDescripcion = toDisplay(medidas.Descripción);
  const medidasOtros = toDisplay(medidas.Otros);

  const situacionLegal = toDisplay(expl["Situación legal"]);
  const tipoVertedero = toDisplay(expl["Tipo de vertedero"]);
  const tiposResiduos = toDisplay(expl["Tipo residuos depositados"]);
  const descripcionResiduos = toDisplay(expl["Descripción de los residuos"]);

  const subtitleParts = [
    landfill.municipality,
    cp || null,
    codigo,
    territorioHistorico,
  ].filter(Boolean) as string[];

  const subtitle = subtitleParts.join(" · ");

  const idParcela = raw.IdParcela;
  const galleryImages: GalleryImage[] =
    idParcela && imgs.length > 0
      ? imgs
          .map((img) => {
            if (!img.path) return null;
            return {
              title: img.titulo || landfill.name,
              url: buildLandfillMediaUrl(idParcela, img.path),
            };
          })
          .filter((img): img is GalleryImage => Boolean(img && img.url))
      : [];

  const imgsCount = galleryImages.length;
  const coverImageUrl = galleryImages[0]?.url ?? null;

  // usamos el riskScore ya normalizado (0–100) del dominio
  const hasRealRisk =
    !!risk &&
    risk.status === "ok" &&
    !!risk.hasEnoughData &&
    typeof risk.final === "number" &&
    Number.isFinite(risk.final) &&
    landfill.riskScore > 0;

  const riskGlobalPercent: number | null = hasRealRisk
    ? landfill.riskScore
    : null;

  const riskSectionsInfo: RiskSectionInfo[] = [
    {
      id: "infra",
      label: "selection.cards.risk.sections.infra",
      percent: riskToPercent(risk?.infra ?? null),
    },
    {
      id: "hydro",
      label: "selection.cards.risk.sections.hydro",
      percent: riskToPercent(risk?.hydro ?? null),
    },
    {
      id: "geology",
      label: "selection.cards.risk.sections.geology",
      percent: riskToPercent(risk?.geology ?? null),
    },
    {
      id: "human",
      label: "selection.cards.risk.sections.human",
      percent: riskToPercent(risk?.human ?? null),
    },
    {
      id: "impacts",
      label: "selection.cards.risk.sections.impacts",
      percent: riskToPercent(risk?.impacts ?? null),
    },
  ];

  const showDimensions =
    superficieDisplay !== "—" ||
    volumenDisplay !== "—" ||
    (capacidadDisplay != null && capacidadDisplay !== "—") ||
    fillPercent != null;

  const showLegal =
    situacionLegal != null ||
    tipoVertedero != null ||
    tiposResiduos != null ||
    descripcionResiduos != null;

  const showClimate = precipitacion != null || lluviaUtil != null;

  const showMeasures =
    medidasTitulo != null || medidasDescripcion != null || medidasOtros != null;

  const moreInfoSections = (sections ?? {}) as Record<string, unknown>;

  return {
    subtitle,
    imgsCount,
    coverImageUrl,
    galleryImages,
    hasRealRisk,
    hasDetailedRisk: !!(risk && risk.status === "ok" && risk.hasEnoughData),
    riskGlobalPercent,
    riskSectionsInfo,
    superficieDisplay,
    volumenDisplay,
    capacidadDisplay,
    fillPercent,
    situacionLegal,
    tipoVertedero,
    tiposResiduos,
    descripcionResiduos,
    precipitacion,
    lluviaUtil,
    medidasTitulo,
    medidasDescripcion,
    medidasOtros,
    showDimensions,
    showLegal,
    showClimate,
    showMeasures,
    moreInfoSections,
  };
}
