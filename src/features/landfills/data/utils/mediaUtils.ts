// src/features/landfills/data/utils/mediaUtils.ts

const MEDIA_BASE_URL =
  (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined) ??
  `${import.meta.env.BASE_URL}media`;

export function buildMediaPath(
  id: string,
  relativePath: string,
): string {
  const base = MEDIA_BASE_URL.replace(/\/+$/, "");
  const rel = relativePath.replace(/^\/+/, "");

  return `${base}/landfills/${id}/${rel}`;
}