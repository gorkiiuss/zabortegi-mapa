// src/features/landfills/domain/clpClassification.ts
import type { LandfillKind, ClpSymbol } from "./types";
import type { RawProperties } from "./rawTypes";

// 1) Prioridad global: qué símbolo se enseña en el mapa si hay varios
export const CLP_PRIORITY: ClpSymbol[] = [
  "acute-toxicity", // si hay calavera, es lo primero
  "environmental", // luego pez+árbol
  "health-hazard", // luego riesgo crónico
  "corrosive",
  "flammable",
  "irritant",
];

export function pickMainClpSymbol(symbols: ClpSymbol[]): ClpSymbol | null {
  for (const s of CLP_PRIORITY) {
    if (symbols.includes(s)) return s;
  }
  return null;
}

// 2) CLP base por "Tipo de vertedero"
const TIPO_VERTEDERO_CLP_BASE: Record<string, ClpSymbol[]> = {
  inerte: [],
  escombreras: [],
  industrial: ["environmental"],
  codisposición: ["environmental", "irritant"],
  codisposicion: ["environmental", "irritant"],
  "foco vertido": ["environmental", "health-hazard"],
  urbano: ["irritant"],
};

// 3) CLP por "Tipo residuos depositados"
function inferFromTipoResiduos(tipoResiduos?: string): ClpSymbol[] {
  if (!tipoResiduos) return [];

  const v = tipoResiduos.toLowerCase();

  // Peligrosos "a pelo"
  if (v.trim() === "peligrosos") {
    return ["acute-toxicity", "environmental", "health-hazard"];
  }

  // Residuos peligrosos inertizados
  if (v.includes("peligrosos inertizados")) {
    return ["environmental", "health-hazard"];
  }

  // Residuos urbanos
  if (v.includes("residuos urbanos")) {
    return ["environmental", "irritant"];
  }

  // Residuos industriales inertes tipo II:
  // podemos marcarlos solo como ambientales suaves
  if (v.includes("residuos industriales inertes tipo ii")) {
    return ["environmental"];
  }

  // Inertes -> no añadimos nada
  if (v.includes("inertes")) {
    return [];
  }

  return [];
}

// 4) Diccionario palabra -> CLP (de "Descripción de los residuos")
const WORD_CLP: Record<string, ClpSymbol[]> = {
  // pesticidas gordos
  hch: ["acute-toxicity", "environmental", "health-hazard"],
  lindane: ["acute-toxicity", "environmental", "health-hazard"],
  pesticida: ["acute-toxicity", "environmental", "health-hazard"],

  // hidrocarburos / aceites
  aceites: ["environmental", "health-hazard", "flammable"],
  aceite: ["environmental", "health-hazard", "flammable"],
  grasas: ["environmental", "health-hazard"],

  // lodos / polvos / cenizas / contaminadas
  lodos: ["environmental", "health-hazard"],
  polvos: ["environmental", "irritant"],
  polvo: ["environmental", "irritant"],
  cenizas: ["environmental", "health-hazard"],
  contaminadas: ["environmental", "health-hazard"],

  // metalurgia / mina
  metales: ["environmental", "health-hazard"],
  metálicos: ["environmental", "health-hazard"],
  metalicos: ["environmental", "health-hazard"],
  escorias: ["environmental", "health-hazard"],
  escoria: ["environmental", "health-hazard"],
  fundición: ["environmental", "health-hazard"],
  fundicion: ["environmental", "health-hazard"],
  acería: ["environmental", "health-hazard"],
  aceria: ["environmental", "health-hazard"],
  cascarilla: ["environmental", "health-hazard"],
  refractarios: ["environmental"],
  moldeo: ["environmental"],
  mina: ["environmental", "health-hazard"],

  // inflamables / orgánicos problemáticos
  neumáticos: ["flammable", "environmental"],
  neumaticos: ["flammable", "environmental"],
  pintura: ["flammable", "environmental", "health-hazard"],
  pinturas: ["flammable", "environmental", "health-hazard"],

  madera: ["flammable"],
  maderas: ["flammable"],
  poda: ["flammable"],
  podas: ["flammable"],
  vegetación: ["flammable"],
  vegetacion: ["flammable"],

  papelera: ["environmental", "irritant"],

  // RSU / urbanos / domésticos
  rsu: ["environmental", "irritant"],
  urbanos: ["environmental", "irritant"],
  domésticos: ["environmental", "irritant"],
  domesticos: ["environmental", "irritant"],

  // amianto / uralita
  uralita: ["health-hazard", "environmental"],
};

// Helper para tokenizar palabras de la descripción
function tokenizeWords(text: string): string[] {
  const lower = text.toLowerCase();
  const matches = lower.match(/\p{L}+/gu);
  return matches ?? [];
}

function inferFromDescripcion(descripcion?: string): ClpSymbol[] {
  if (!descripcion || typeof descripcion !== "string") return [];
  const words = tokenizeWords(descripcion);
  const result = new Set<ClpSymbol>();

  for (const w of words) {
    const symbols = WORD_CLP[w];
    if (!symbols) continue;
    for (const s of symbols) {
      result.add(s);
    }
  }

  return Array.from(result);
}

// 5) Punto de entrada público: inferir CLP a partir del raw
export function inferClpSymbols(
  raw: RawProperties,
  kind: LandfillKind,
): ClpSymbol[] {
  const out = new Set<ClpSymbol>();

  const sections = raw.sections ?? {};
  const datosGenerales = sections["1.- Datos generales"] as
    | Record<string, unknown>
    | undefined;
  const explotacion = datosGenerales?.["EXPLOTACIÓN"] as
    | Record<string, unknown>
    | undefined;

  const tipoVertederoRaw = (explotacion?.["Tipo de vertedero"] ?? "") as string;
  const tipoResiduosRaw = (explotacion?.["Tipo residuos depositados"] ??
    "") as string;
  const descripcionRaw = (explotacion?.["Descripción de los residuos"] ??
    "") as string;

  // 5.1. Por tipo de vertedero (texto original)
  if (tipoVertederoRaw) {
    const key = tipoVertederoRaw.toLowerCase();
    const base = TIPO_VERTEDERO_CLP_BASE[key];
    if (base) {
      for (const s of base) out.add(s);
    }
  }

  // 5.2. Por LandfillKind normalizado (por si no coincide el texto)
  switch (kind) {
    case "industrial":
      out.add("environmental");
      break;
    case "urban":
      out.add("irritant");
      break;
    case "mining":
      out.add("environmental");
      out.add("health-hazard");
      break;
    // "inert", "hazardous", "unknown" los tratamos más abajo con otras reglas
  }

  // 5.3. Por "Tipo residuos depositados"
  for (const s of inferFromTipoResiduos(tipoResiduosRaw)) {
    out.add(s);
  }

  // 5.4. Por palabras en "Descripción de los residuos"
  for (const s of inferFromDescripcion(descripcionRaw)) {
    out.add(s);
  }

  // 5.5. Extra: si LandfillKind es "hazardous" y no ha salido nada, al menos marcamos ambiental + salud
  if (kind === "hazardous" && out.size === 0) {
    out.add("environmental");
    out.add("health-hazard");
  }

  // (Opcional) Podríamos usar riskLevel aquí para reforzar algún símbolo, pero de momento lo dejamos así.

  return Array.from(out);
}
