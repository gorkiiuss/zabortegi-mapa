// src/shared/utils/media.ts

const MEDIA_BASE_URL =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${import.meta.env.BASE_URL}media`;

export function buildLandfillMediaUrl(
  idParcela: number | string | undefined,
  relativePath: string | undefined | null,
): string | null {
  if (idParcela == null || !relativePath) return null;

  const base = MEDIA_BASE_URL.replace(/\/+$/, "");
  const idStr = String(idParcela);
  const rel = relativePath.replace(/^\/+/, "");

  return `${base}/landfills/${idStr}/${rel}`;
}