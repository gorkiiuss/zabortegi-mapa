// src/features/landfills/utils/htmlGenerator.ts

import { useLanguageStore } from "@shared/state/languageStore";

const BASE_URL = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const CSS_URL =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${BASE_URL}estilos.css`;
const LOGO_IHOBE =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${BASE_URL}assets/brand/ihobe.jpg`;
const LOGO_GV =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${BASE_URL}assets/brand/gobiernovasco.jpg`;
const BASE_DATA_URL =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${BASE_URL}media/landfills`;
const TEMPLATE_URL =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${BASE_URL}templates/report.html`;


async function imageToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) return "";
    const blob = await response.blob();
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
    .replace(/\s+/g, " ")
    .trim();
}

function findValueInSections(
  sectionsData: any,
  sectionNameRaw: string,
  keyNameRaw: string,
): string {
  const targetSection = normalize(sectionNameRaw);
  const targetKey = normalize(keyNameRaw);

  for (const rootKey in sectionsData) {
    const rootData = sectionsData[rootKey];
    const rootKeyNorm = normalize(rootKey);

    let contextData = null;

    if (rootKeyNorm.includes(targetSection)) {
      contextData = rootData;
    } else {
      if (typeof rootData === "object" && rootData !== null) {
        for (const childKey in rootData) {
          if (normalize(childKey).includes(targetSection)) {
            contextData = rootData[childKey];
            break;
          }
        }
      }
    }

    if (contextData && typeof contextData === "object") {
      for (const k in contextData) {
        if (normalize(k) === targetKey) return String(contextData[k]);
      }

      for (const subKey in contextData) {
        const subItem = contextData[subKey];
        if (typeof subItem === "object" && subItem !== null) {
          for (const k in subItem) {
            if (normalize(k) === targetKey) return String(subItem[k]);

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

export async function generateLandfillHtml(
  legacyRawData: any,
  uuid?: string,
): Promise<string> {
  const properties = legacyRawData?.properties || legacyRawData || {};
  const parcelId = String(properties.IdParcela || properties.id || "");
  const folderId = uuid || String(properties.id || parcelId);
  const name = String(properties.NombreVertedero || properties.name || "");
  const sectionsData = properties.sections || {};

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
  const documentsNotice = useLanguageStore.getState().t("details.legacy_documents_notice");
  html = html
    .replace("{{__STYLES__}}", cssContent)
    .replace("{{__LOGO_IHOBE__}}", logoIhobeB64)
    .replace("{{__LOGO_GV__}}", logoGvB64)
    .replace("{{__FECHA__}}", new Date().toLocaleDateString("es-ES"))
    .replace(/{{HEADER::ID}}/g, parcelId)
    .replace(/{{HEADER::NAME}}/g, name)
    .replace("{{__DOCUMENTS_LEGACY_NOTICE__}}", documentsNotice);

  html = html.replace(
    /{{([^{}]+?)::([^{}]+?)}}/g,
    (_match, sectionNameRaw, keyNameRaw) => {
      return findValueInSections(sectionsData, sectionNameRaw, keyNameRaw);
    },
  );

  const dynamicTables5 = renderDynamicTables(
    sectionsData,
    "5.- Localización de los puntos de muestreo y analítica realizada",
  );
  const dynamicTables7 = renderDynamicTables(
    sectionsData,
    "7.- Estudios realizados",
  );

  html = html
    .replace("{{__DYNAMIC_TABLES_5__}}", dynamicTables5)
    .replace("{{__DYNAMIC_TABLES_7__}}", dynamicTables7);

  const imagesHtml = await renderImages(folderId, properties.imgs);
  html = html.replace("{{__IMAGES__}}", imagesHtml);

  return html;
}

async function renderImages(folderId: string, imgs: any): Promise<string> {
  const rawImgs =
    (imgs as Array<{ titulo: string; path: string }>) ||
    [];
  if (rawImgs.length === 0) return "<p>No hay imágenes disponibles.</p>";

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
  sectionsData: any,
  sectionNameTarget: string,
): string {
  const targetNorm = normalize(sectionNameTarget);

  let section = null;
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
