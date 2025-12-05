// src/features/landfills/data/geojsonRepository.ts

import type * as GeoJSON from "geojson";
import type { Landfill, LandfillId } from "../domain/types";
import type { LandfillRepository } from "../domain/repository";
import type { RawProperties } from "../domain/rawTypes";
import {
  createLandfillFromFeature,
  type LandfillGeometry,
} from "../domain/factories/landfillFactory";

// El FeatureCollection ahora usa los tipos exportados de la factoría o GeoJSON puro
interface LandfillsGeoJson extends GeoJSON.FeatureCollection<
  LandfillGeometry,
  RawProperties
> {}

const LANDFILLS_URL = `${import.meta.env.BASE_URL}landfills.geojson`;

//
// Fetch del GeoJSON
//
async function fetchGeoJson(): Promise<LandfillsGeoJson> {
  const res = await fetch(LANDFILLS_URL);
  if (!res.ok) {
    throw new Error(`Error cargando ${LANDFILLS_URL}: ${res.status}`);
  }
  return (await res.json()) as LandfillsGeoJson;
}

//
// Implementación del repositorio
//
export const geoJsonLandfillRepository: LandfillRepository = {
  async getAll(): Promise<Landfill[]> {
    const data = await fetchGeoJson();
    // Delegamos toda la lógica de transformación a la Factoría
    return data.features.map((f, index) =>
      createLandfillFromFeature(f, index),
    );
  },

  async getById(id: LandfillId): Promise<Landfill | null> {
    const all = await this.getAll();
    return all.find((lf) => lf.parcelId === id || lf.id === id) || null;
  },
};