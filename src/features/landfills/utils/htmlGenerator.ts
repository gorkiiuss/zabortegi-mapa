// src/features/landfills/utils/htmlGenerator.ts

import type { Landfill } from "../domain/types";

// ---------------------------------------------------------------------------
// 1. CONFIGURACIÓN DE RUTAS
// ---------------------------------------------------------------------------
const BASE_URL = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const CSS_URL =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${BASE_URL}estilos.css`;
const LOGO_IHOBE =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${BASE_URL}imagenes/ihobe.jpg`;
const LOGO_GV =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${BASE_URL}imagenes/gobiernovasco.jpg`;
const BASE_DATA_URL =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${BASE_URL}media`;
const TEMPLATE_URL =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${BASE_URL}templates/report.html`;

// ---------------------------------------------------------------------------
// 2. HELPERS
// ---------------------------------------------------------------------------

async function imageToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) return "";
    const blob = await response.blob();
    // Evita intentar convertir un 404 HTML en imagen
    if (
      blob.type.includes("text/html") ||
      blob.type.includes("application/json")
    )
      return "";

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return "";
  }
}

function normalize(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/\s+/g, " ") // Colapsar espacios y saltos de línea
    .trim();
}

/**
 * BÚSQUEDA PROFUNDA E INTELIGENTE DE VALORES
 * Encuentra la clave aunque esté en subniveles o con diferencias de mayúsculas/espacios.
 */
function findValueInSections(
  sectionsData: any,
  sectionNameRaw: string,
  keyNameRaw: string,
): string {
  const targetSection = normalize(sectionNameRaw);
  const targetKey = normalize(keyNameRaw);

  // Recorremos todas las Secciones del JSON
  for (const rootKey in sectionsData) {
    const rootData = sectionsData[rootKey];
    const rootKeyNorm = normalize(rootKey);

    let contextData = null;

    // A. ¿Coincide la raíz? (ej: "1.- Datos generales" == "1.- Datos generales")
    if (rootKeyNorm.includes(targetSection)) {
      contextData = rootData;
    } else {
      // B. ¿Es una subsección? (ej: "LOCALIZACIÓN" dentro de "1.- Datos generales")
      if (typeof rootData === "object" && rootData !== null) {
        for (const childKey in rootData) {
          if (normalize(childKey).includes(targetSection)) {
            contextData = rootData[childKey];
            break;
          }
        }
      }
    }

    // Si encontramos dónde buscar...
    if (contextData && typeof contextData === "object") {
      // 1. Buscamos la clave directamente
      for (const k in contextData) {
        if (normalize(k) === targetKey) return String(contextData[k]);
      }

      // 2. Búsqueda profunda (por si está anidado un nivel más)
      for (const subKey in contextData) {
        const subItem = contextData[subKey];
        if (typeof subItem === "object" && subItem !== null) {
          for (const k in subItem) {
            // Comparación normalizada
            if (normalize(k) === targetKey) return String(subItem[k]);

            // Lógica especial para (m3) vs (m 3 )
            if (targetKey.includes("(m3)")) {
              const kNorm = normalize(k).replace(/\s/g, "");
              const targetKeyNoSpace = targetKey.replace(/\s/g, "");
              if (kNorm === targetKeyNoSpace) return String(subItem[k]);
            }
          }
        }
      }
    }
  }
  return "";
}

// ---------------------------------------------------------------------------
// 3. FUNCIÓN PRINCIPAL
// ---------------------------------------------------------------------------

export async function generateLandfillHtml(
  landfill: Landfill,
): Promise<string> {
  // Carga de recursos
  const [templateRes, cssRes, logoIhobeB64, logoGvB64] = await Promise.all([
    fetch(TEMPLATE_URL),
    fetch(CSS_URL),
    imageToBase64(LOGO_IHOBE),
    imageToBase64(LOGO_GV),
  ]);

  if (!templateRes.ok) {
    throw new Error(`No se pudo cargar el template: ${TEMPLATE_URL}`);
  }

  let html = await templateRes.text();
  const cssContent = cssRes.ok ? await cssRes.text() : "";

  // 1. Reemplazos Estáticos
  html = html
    .replace("{{__STYLES__}}", cssContent)
    .replace("{{__LOGO_IHOBE__}}", logoIhobeB64)
    .replace("{{__LOGO_GV__}}", logoGvB64)
    .replace("{{__FECHA__}}", new Date().toLocaleDateString("es-ES"))
    .replace(/{{HEADER::ID}}/g, landfill.parcelId ?? "")
    .replace(/{{HEADER::NAME}}/g, landfill.name);

  // 2. Extracción de Datos del Vertedero
  const sectionsData = (landfill.rawProperties?.sections as any) || {};

  // REGEX SEGURA: Usamos _match para evitar el warning del linter sin romper la lógica
  html = html.replace(
    /{{([^{}]+?)::([^{}]+?)}}/g,
    (_match, sectionNameRaw, keyNameRaw) => {
      return findValueInSections(sectionsData, sectionNameRaw, keyNameRaw);
    },
  );

  // 3. Tablas Dinámicas y Fotos
  const dynamicTables5 = renderDynamicTables(
    landfill,
    "5.- Localización de los puntos de muestreo y analítica realizada",
  );
  const dynamicTables7 = renderDynamicTables(
    landfill,
    "7.- Estudios realizados",
  );

  html = html
    .replace("{{__DYNAMIC_TABLES_5__}}", dynamicTables5)
    .replace("{{__DYNAMIC_TABLES_7__}}", dynamicTables7);

  const imagesHtml = await renderImages(landfill);
  html = html.replace("{{__IMAGES__}}", imagesHtml);

  return html;
}

// ---------------------------------------------------------------------------
// 4. SUB-FUNCIONES
// ---------------------------------------------------------------------------

async function renderImages(landfill: Landfill): Promise<string> {
  const rawImgs =
    (landfill.rawProperties?.imgs as Array<{ titulo: string; path: string }>) ||
    [];
  if (rawImgs.length === 0) return "<p>No hay imágenes disponibles.</p>";

  const idParcela = landfill.rawProperties?.IdParcela;
  const folderId = idParcela ? String(idParcela) : landfill.id;

  const processedImages = await Promise.all(
    rawImgs.map(async (img) => {
      const fullUrl = `${BASE_DATA_URL}/${folderId}/${img.path}`;
      const b64 = await imageToBase64(fullUrl);
      return { ...img, b64 };
    }),
  );

  const validImages = processedImages.filter((img) => img.b64 !== "");
  if (validImages.length === 0)
    return "<p>No se pudieron cargar las imágenes.</p>";

  return validImages
    .map(
      (img) => `
    <span class="denominacionIMG">${img.titulo}</span>
    <br>
    <img src="${img.b64}" class="imagenes" alt="${img.titulo}">
    <br><br>
  `,
    )
    .join("");
}

function renderDynamicTables(
  landfill: Landfill,
  sectionNameTarget: string,
): string {
  const sectionsData = (landfill.rawProperties?.sections as any) || {};
  const targetNorm = normalize(sectionNameTarget);

  let section = null;
  // Búsqueda flexible de la sección dinámica
  for (const k in sectionsData) {
    if (normalize(k).includes(targetNorm)) {
      section = sectionsData[k];
      break;
    }
  }

  if (!section) return "";

  const tableKeys = Object.keys(section).filter((k) => k.startsWith("Tabla"));
  if (tableKeys.length === 0) return "";

  return tableKeys
    .map((tableName) => {
      const rows = section[tableName] as Array<Record<string, string>>;
      if (!rows || rows.length === 0) return "";
      const headers = Object.keys(rows[0]);

      return `
      <table class="tabla3" border="1" cellspacing="0" cellpadding="0" style="width:100%; margin-bottom: 20px; border-collapse:collapse;">
          <thead>
              <tr>
                  ${headers.map((h) => `<td style="background-color:#e0e0e0; font-weight:bold; padding:4px;">${h}</td>`).join("")}
              </tr>
          </thead>
          <tbody>
              ${rows
                .map(
                  (row) => `
                  <tr>
                      ${headers.map((h) => `<td style="padding:4px;">${row[h] || ""}</td>`).join("")}
                  </tr>
              `,
                )
                .join("")}
          </tbody>
      </table>
    `;
    })
    .join("");
}
