// src/features/extractor/utils/exportFormatters.ts

import { FULL_DETAILS_SCHEMA } from "@features/landfills/components/details/fullDetails/fullDetailsSchema";
import { parseDisplay } from "@features/landfills/components/details/fullDetails/parseDisplay";
import { SampleTypeVO } from "@features/landfills/domain/valueObjects/sampling/SampleType";
import { SampleMatrixVO } from "@features/landfills/domain/valueObjects/sampling/results/SampleMatrix";

export interface SelectedFieldMeta {
  sectionTitleKey: string;
  fieldKey: string;
  voKey?: string;
  path: string;
  labelKey: string;
  getValue?: (obj: any) => any;
  enumVO?: any;
}

// Retrieve ordered metadata for selected fields
export function getSelectedFieldsMeta(
  selectedFieldsState: Record<string, Record<string, boolean>>
): SelectedFieldMeta[] {
  const list: SelectedFieldMeta[] = [];

  FULL_DETAILS_SCHEMA.forEach((section) => {
    const sectionTitleKey = section.titleKey;
    const voKey = section.voKey;

    Object.entries(section.fields).forEach(([fieldKey, config]) => {
      const isSelected = selectedFieldsState[sectionTitleKey]?.[fieldKey];
      if (!isSelected) return;

      const isAdvanced = typeof config === "object";
      const labelKey = isAdvanced ? config.labelKey : config;
      const getValue = isAdvanced && "getValue" in config ? config.getValue : undefined;
      const enumVO = isAdvanced && "enumVO" in config ? config.enumVO : undefined;

      const path = voKey ? `${String(voKey)}.${fieldKey}` : fieldKey;

      list.push({
        sectionTitleKey,
        fieldKey,
        voKey: voKey ? String(voKey) : undefined,
        path,
        labelKey,
        getValue,
        enumVO,
      });
    });
  });

  return list;
}

// Compile hierarchical JSON export
export function compileJSONExport(
  detailsList: any[],
  selectedFieldsState: Record<string, Record<string, boolean>>
): any[] {
  const metas = getSelectedFieldsMeta(selectedFieldsState);

  return detailsList.map((details) => {
    const exportedItem: Record<string, any> = {
      id: details.id,
      name: details.name,
      code: details.code && typeof details.code === "object" && "value" in details.code ? details.code.value : details.code,
    };

    metas.forEach((meta) => {
      const sectionObj = meta.voKey ? details[meta.voKey] : details;
      if (!sectionObj) return;

      let val = sectionObj[meta.fieldKey];
      if (meta.getValue) {
        val = meta.getValue(sectionObj);
      }

      // Unwrap value objects
      if (val && typeof val === "object" && "value" in val) {
        val = val.value;
      }

      if (meta.voKey) {
        if (!exportedItem[meta.voKey]) {
          exportedItem[meta.voKey] = {};
        }
        exportedItem[meta.voKey][meta.fieldKey] = val;
      } else {
        exportedItem[meta.fieldKey] = val;
      }
    });

    return exportedItem;
  });
}

// Compile GeoJSON features by merging with geometries from loaded summaries
export function compileGeoJSONExport(
  detailsList: any[],
  summaries: any[],
  selectedFieldsState: Record<string, Record<string, boolean>>
): any {
  const jsonExport = compileJSONExport(detailsList, selectedFieldsState);

  const features = jsonExport.map((props) => {
    const sum = summaries.find((s) => s.id === props.id);
    const geometry = sum ? sum.geometry : null;
    return {
      type: "Feature",
      geometry: geometry,
      properties: props,
    };
  });

  return {
    type: "FeatureCollection",
    features: features.filter((f) => f.geometry !== null),
  };
}

// Compile properly escaped CSV content
export function compileCSVExport(
  detailsList: any[],
  selectedFieldsState: Record<string, Record<string, boolean>>,
  delimiter: "," | ";",
  translateHeaders: boolean,
  t: any,
  formatSeparatedDate: any
): string {
  const metas = getSelectedFieldsMeta(selectedFieldsState);

  const headers = metas.map((meta) => {
    if (translateHeaders) {
      return t(meta.labelKey);
    }
    return meta.path;
  });

  // Add name header
  const finalHeaders = [translateHeaders ? t("domain.entities.landfill_details.name" as any) : "name", ...headers];

  const escapeCSVValue = (val: any) => {
    if (val == null) return "";
    const clean = String(val).replace(/"/g, '""');
    if (clean.includes('"') || clean.includes(',') || clean.includes(';') || clean.includes('\n') || clean.includes('\r')) {
      return `"${clean}"`;
    }
    return clean;
  };

  const rows = detailsList.map((details) => {
    const nameVal = details.name || "";
    const values = metas.map((meta) => {
      const sectionObj = meta.voKey ? details[meta.voKey] : details;
      if (!sectionObj) return "";

      let rawValue = sectionObj[meta.fieldKey];
      if (meta.getValue) {
        rawValue = meta.getValue(sectionObj);
      }

      let displayVal;
      if (meta.fieldKey === "samplings" && Array.isArray(rawValue)) {
        displayVal = rawValue.map((s: any) => {
          const dateStr = s.samplingDate;
          const typeStr = s.sampleType && s.sampleType !== "UNKNOWN" ? t(SampleTypeVO.getTxKey(s.sampleType) as any) : "";
          const descStr = s.description || "";
          const resultsStr = (s.results || []).map((r: any) => {
            const limitStr = r.legalLimit !== null ? ` (Limit: ${r.legalLimit})` : "";
            const matrixStr = r.matrix && r.matrix !== "UNKNOWN" ? ` [${t(SampleMatrixVO.getTxKey(r.matrix) as any)}]` : "";
            return `${r.parameterName}${matrixStr}=${r.resultOperator || ""}${r.resultValue} ${r.unit || ""}${limitStr}`;
          }).join("; ");
          return `[${dateStr}] ${descStr} (${typeStr}): ${resultsStr}`;
        }).join(" | ");
      } else {
        displayVal = parseDisplay(rawValue, meta.enumVO || null, sectionObj, t, formatSeparatedDate);
      }
      return displayVal || "";
    });

    return [nameVal, ...values].map(escapeCSVValue).join(delimiter);
  });

  return [finalHeaders.map(escapeCSVValue).join(delimiter), ...rows].join("\r\n");
}

// Helper to trigger file download in browser
export function triggerFileDownload(content: string, filename: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
