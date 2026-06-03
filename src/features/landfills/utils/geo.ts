// src/features/landfills/utils/geo.ts

import type * as GeoJSON from "geojson";
import type { LatLngExpression } from "leaflet";

/**
 * Convierte la geometría GeoJSON del vertedero en un array de coordenadas
 * entendibles por <Polygon /> de react-leaflet.
 *
 * - Para Polygon: usa todos los anillos (anillo exterior + holes).
 * - Para MultiPolygon: concatena todos los polígonos.
 */
export function geometryToLatLngs(
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon,
): LatLngExpression[][] {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.map((ring) =>
      ring.map(([lng, lat]) => [lat, lng] as LatLngExpression),
    );
  }

  if (geometry.type === "MultiPolygon") {
    const result: LatLngExpression[][] = [];
    for (const poly of geometry.coordinates) {
      for (const ring of poly) {
        result.push(ring.map(([lng, lat]) => [lat, lng] as LatLngExpression));
      }
    }
    return result;
  }

  return [];
}