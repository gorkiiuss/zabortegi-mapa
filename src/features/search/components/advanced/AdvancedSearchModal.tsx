// src/features/search/components/advanced/AdvancedSearchModal.tsx

import React, { useState } from "react";
import { X, Search, RotateCcw, Download } from "lucide-react";
import { useUiStore } from "@features/map/state/uiStore";
import { useDataExtractorStore } from "../../../extractor/state/useDataExtractorStore";
import { useAdvancedSearchStore } from "../../state/useAdvancedSearchStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useLandfillsStore } from "@features/landfills/state/landfillsStore";

// Inputs
import { NullableTextInput } from "./inputs/NullableTextInput";
import { TriStateCheckbox } from "./inputs/TriStateCheckbox";
import { RangeInput } from "./inputs/RangeInput";
import { NullableSelect } from "./inputs/NullableSelect";

// Value Objects for Options
import { HistoricTerritoryVO } from "@features/landfills/domain/valueObjects/location/HistoricTerritory";
import { AccessVO } from "@features/landfills/domain/valueObjects/location/Access";
import { AccessUpToEntranceVO } from "@features/landfills/domain/valueObjects/location/AccessUpToEntrance";
import { InspectionStateVO } from "@features/landfills/domain/valueObjects/InspectionState";
import { MagnitudeLevelVO } from "@features/landfills/domain/valueObjects/MagnitudeLevel";
import { ChannelingTypeVO } from "@features/landfills/domain/valueObjects/infrastructure/ChannelingType";
import { ExistingMachineryVO } from "@features/landfills/domain/valueObjects/infrastructure/ExistingMachinery";
import { EnvironmentVegetationTypeVO } from "@features/landfills/domain/valueObjects/faunaAndVegetation/EnvironmentVegetationType";
import { FaunaTypeVO } from "@features/landfills/domain/valueObjects/faunaAndVegetation/FaunaType";
import { StreamDirectionVO } from "@features/landfills/domain/valueObjects/hydrology/StreamDirection";
import { SuperficialDepositVO } from "@features/landfills/domain/valueObjects/geology/SuperficialDeposit";
import { SoilTypeVO } from "@features/landfills/domain/valueObjects/geology/SoilType";
import { MorphologyVO } from "@features/landfills/domain/valueObjects/geology/Morphology";
import { PermeabilityReasonVO } from "@features/landfills/domain/valueObjects/geology/PermeabilityReason";
import { AquiferTypeVO } from "@features/landfills/domain/valueObjects/hydrogeology/AquiferType";
import { SlopeInstabilityProcessesVO } from "@features/landfills/domain/valueObjects/geotechniqueCharacteristics/SlopeInstabilityProcesses";
import { FloodPotentialVO } from "@features/landfills/domain/valueObjects/geotechniqueCharacteristics/FloodPotential";
import { LandCoveringTypeVO } from "@features/landfills/domain/valueObjects/geotechniqueCharacteristics/LandCoveringType";
import { UsageStatusVO } from "@features/landfills/domain/valueObjects/humanAndSocialEnvironment/UsageStatus";
import { WaterUsageVO } from "@features/landfills/domain/valueObjects/humanAndSocialEnvironment/WaterUsage";
import { UrbanClassificationVO } from "@features/landfills/domain/valueObjects/humanAndSocialEnvironment/UrbanClassification";
import { UrbanCalificationVO } from "@features/landfills/domain/valueObjects/humanAndSocialEnvironment/UrbanCalification";
import { CorrectingMeasuresVO } from "@features/landfills/domain/valueObjects/correctingMeasures/CorrectingMeasures";
import { OwnershipTypeVO } from "@features/landfills/domain/valueObjects/operation/ownership/OwnershipType";
import { LegalStatusVO } from "@features/landfills/domain/valueObjects/operation/LegalStatus";
import { LicenseCharacteristicsVO } from "@features/landfills/domain/valueObjects/operation/LicenseCharacteristics";
import { LandfillTypeVO } from "@features/landfills/domain/valueObjects/operation/LandfillType";
import { WasteLegalCategoryVO } from "@features/landfills/domain/valueObjects/operation/WasteLegalCategory";
import { WasteTypeVO } from "@features/landfills/domain/valueObjects/operation/WasteType";
import { WasteComponentVO } from "@features/landfills/domain/valueObjects/operation/WasteComponent";
import { GradingVO } from "@features/landfills/domain/valueObjects/operation/Grading";
import { WasteLayoutVO } from "@features/landfills/domain/valueObjects/operation/WasteLayout";
import { DepositShapeVO } from "@features/landfills/domain/valueObjects/operation/DepositShape";

type TabId =
  | "general"
  | "location"
  | "operation"
  | "risks"
  | "infrastructure"
  | "natural_medium"
  | "human_medium"
  | "impacts_measures";

export function AdvancedSearchModal() {
  const toggleModal = useUiStore((s) => s.toggleActiveModal);
  const handleClose = () => toggleModal("none");
  const { handleMouseEnter, handleMouseLeave, modalRef } = useMapModalInteractions();
  const { t } = useLanguageStore();

  const landfillsSummary = useLandfillsStore((s) => s.landfillsSummary) || [];

  const {
    filters,
    updateFilter,
    resetFilters,
    clearResults,
    executeSearch,
    isSearching,
    advancedSearchResults,
  } = useAdvancedSearchStore();

  const [activeTab, setActiveTab] = useState<TabId>("general");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSearch();
    handleClose();
  };

  const handleClear = () => {
    clearResults();
    resetFilters();
  };

  // Helper to map TranslatableEnumVO to options list
  const getOptionsFromVO = (enumVO: any) => {
    return enumVO.values().map((val: any) => ({
      label: t(enumVO.getTxKey(val) as any),
      value: val,
    }));
  };

  // Auto-extract dynamic municipalities list from loaded summaries
  const municipalityOptions = React.useMemo(() => {
    const uniques = Array.from(
      new Set(landfillsSummary.map((lf) => lf.municipality).filter((m): m is string => !!m))
    ).sort((a, b) => a.localeCompare(b));
    return uniques.map((m) => ({ label: m, value: m }));
  }, [landfillsSummary]);

  // Constraints/Validation Checks
  const zipCodeVal = filters.zip_code?.value || "";
  const isZipCodeInvalid = zipCodeVal && !/^\d{5}$/.test(zipCodeVal);

  const cartographyVal = filters.cartographies?.value || "";
  const isCartographyInvalid = cartographyVal && !/^\d{1,4}-((I|II|III|IV)(-[A-D])?|[1-4](-[A-D])?|\d{1,2}-\d{1,2})$/.test(cartographyVal);

  const classifiedVal = filters.classified_activity_record_numbers?.value || "";
  const isClassifiedInvalid = classifiedVal && !/^([A-Z]{2,4}[- ]?)?[\d\?]{1,6}\/[\d]{1,6}([- ][A-Z0-9]+)?$/.test(classifiedVal);

  const phoneVal = filters.phone_number?.value || "";
  const isPhoneInvalid = phoneVal && !/^\d{9,15}|\*\*\* BABESTUTA \*\*\*$/.test(phoneVal);

  const tabs: { id: TabId; label: string }[] = [
    { id: "general", label: t("search.advanced.sections.general") },
    { id: "location", label: t("search.advanced.sections.location") },
    { id: "operation", label: t("search.advanced.sections.operation") },
    { id: "risks", label: t("search.advanced.sections.risks") },
    { id: "infrastructure", label: t("search.advanced.sections.infrastructure") },
    { id: "natural_medium", label: t("search.advanced.sections.natural_medium") },
    { id: "human_medium", label: t("search.advanced.sections.human_medium") },
    { id: "impacts_measures", label: t("search.advanced.sections.impacts_measures") },
  ];

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-none sm:rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
    >
      {/* HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">{t("search.advanced.title")}</h2>
          <p className="text-xs text-slate-500">
            {t("search.advanced.description")}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* BODY */}
      <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
        {/* TAB NAVIGATION: Horizontal scroll on mobile, Vertical list on desktop */}
        <div className="flex sm:flex-col w-full sm:w-48 shrink-0 overflow-x-auto sm:overflow-y-auto whitespace-nowrap sm:whitespace-normal border-b sm:border-b-0 sm:border-r border-slate-100 bg-slate-50/30 py-1 sm:py-3 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`advanced-search-tab-${tab.id}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center sm:justify-start px-4 py-2 sm:py-2.5 text-xs font-semibold border-b-2 sm:border-b-0 sm:border-l-2 transition-all outline-none ${activeTab === tab.id
                ? "border-emerald-500 bg-emerald-50/30 text-emerald-800"
                : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FORMS */}
        <form onSubmit={handleSearch} className="flex flex-1 flex-col overflow-hidden bg-white">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">

            {/* TAB: GENERAL */}
            {activeTab === "general" && (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <h3 className="col-span-full border-b border-slate-100 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t("domain.entities.landfill_details.basic_data")}
                </h3>
                <NullableTextInput
                  label={t("domain.entities.landfill_details.name")}
                  value={filters.name?.value}
                  onlyNull={filters.name?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("name", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.entities.landfill_details.code")}
                  value={filters.code?.value}
                  onlyNull={filters.code?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("code", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />

                <h3 className="col-span-full border-b border-slate-100 pb-1 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t("search.advanced.sections.title")}
                </h3>
                <TriStateCheckbox
                  label={t("search.advanced.sections.has_samples")}
                  value={filters.has_samplings?.value}
                  onlyNull={filters.has_samplings?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("has_samplings", val !== undefined || onlyNull ? { type: "boolean", value: !!val, onlyNull } : undefined)
                  }
                />
                <TriStateCheckbox
                  label={t("search.advanced.sections.has_studies")}
                  value={filters.has_studies?.value}
                  onlyNull={filters.has_studies?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("has_studies", val !== undefined || onlyNull ? { type: "boolean", value: !!val, onlyNull } : undefined)
                  }
                />
                <TriStateCheckbox
                  label={t("search.advanced.sections.has_multimedia")}
                  value={filters.has_multimedia?.value}
                  onlyNull={filters.has_multimedia?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("has_multimedia", val !== undefined || onlyNull ? { type: "boolean", value: !!val, onlyNull } : undefined)
                  }
                />
              </div>
            )}

            {/* TAB: LOCATION */}
            {activeTab === "location" && (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <h3 className="col-span-full border-b border-slate-100 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t("search.advanced.sections.location")}
                </h3>
                <NullableSelect
                  label={t("domain.vos.location.historic_territory.title")}
                  options={getOptionsFromVO(HistoricTerritoryVO)}
                  selectedValues={filters.historic_territory?.value}
                  includeNull={filters.historic_territory?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("historic_territory", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.location.municipality_name")}
                  options={municipalityOptions}
                  selectedValues={filters.municipality?.value}
                  includeNull={filters.municipality?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("municipality", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.location.address")}
                  value={filters.address?.value}
                  onlyNull={filters.address?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("address", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <div>
                  <NullableTextInput
                    label={t("domain.vos.location.zip_code")}
                    value={filters.zip_code?.value}
                    onlyNull={filters.zip_code?.onlyNull}
                    onChange={(val, onlyNull) => {
                      const cleanVal = (val || "").replace(/\D/g, ""); // limit input to digits only
                      updateFilter("zip_code", cleanVal || onlyNull ? { type: "text", value: cleanVal, onlyNull } : undefined);
                    }}
                  />
                  {isZipCodeInvalid && (
                    <span className="text-[10px] font-medium text-rose-500 mt-1 block px-1 animate-in fade-in slide-in-from-top-1 duration-150">
                      ⚠️ {t("search.advanced.expected_format")}: 5 {t("search.advanced.digits")} ({t("search.advanced.example")}: 48001)
                    </span>
                  )}
                </div>
                <TriStateCheckbox
                  label={t("domain.vos.location.is_accessible")}
                  value={filters.is_landfill_accessible?.value}
                  onlyNull={filters.is_landfill_accessible?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("is_landfill_accessible", val !== undefined || onlyNull ? { type: "boolean", value: !!val, onlyNull } : undefined)
                  }
                />

                <h3 className="col-span-full border-b border-slate-100 pb-1 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t("domain.vos.location.dimensions.title")}
                </h3>
                <RangeInput
                  label={t("domain.vos.location.dimensions.surface_ha")}
                  min={filters.surface_ha?.min}
                  max={filters.surface_ha?.max}
                  onlyNull={filters.surface_ha?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("surface_ha", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="Ha"
                />
                <RangeInput
                  label={t("domain.vos.location.dimensions.volume_m3")}
                  min={filters.volume_m3?.min}
                  max={filters.volume_m3?.max}
                  onlyNull={filters.volume_m3?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("volume_m3", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="m³"
                />
                <RangeInput
                  label={t("domain.vos.location.dimensions.expected_total_capacity_m3")}
                  min={filters.expected_total_capacity_m3?.min}
                  max={filters.expected_total_capacity_m3?.max}
                  onlyNull={filters.expected_total_capacity_m3?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("expected_total_capacity_m3", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="m³"
                />
                <RangeInput
                  label={t("domain.vos.location.dimensions.landfill_height")}
                  min={filters.landfill_height?.min}
                  max={filters.landfill_height?.max}
                  onlyNull={filters.landfill_height?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("landfill_height", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="m"
                />

                <h3 className="col-span-full border-b border-slate-100 pb-1 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                </h3>
                <NullableTextInput
                  label={t("domain.vos.location.watershed")}
                  value={filters.watershed?.value}
                  onlyNull={filters.watershed?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("watershed", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.location.toponymy")}
                  value={filters.toponymy?.value}
                  onlyNull={filters.toponymy?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("toponymy", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.location.toponymy_source")}
                  value={filters.toponymy_source?.value}
                  onlyNull={filters.toponymy_source?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("toponymy_source", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.location.accesses_up_to_entrance.title")}
                  options={getOptionsFromVO(AccessUpToEntranceVO)}
                  selectedValues={filters.accesses_up_to_entrance?.value}
                  includeNull={filters.accesses_up_to_entrance?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("accesses_up_to_entrance", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.location.accesses.title")}
                  options={getOptionsFromVO(AccessVO)}
                  selectedValues={filters.accesses?.value}
                  includeNull={filters.accesses?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("accesses", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <div>
                  <NullableTextInput
                    label={t("domain.vos.location.cartographies")}
                    value={filters.cartographies?.value}
                    onlyNull={filters.cartographies?.onlyNull}
                    onChange={(val, onlyNull) =>
                      updateFilter("cartographies", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                    }
                  />
                  {isCartographyInvalid && (
                    <span className="text-[10px] font-medium text-rose-500 mt-1 block px-1 animate-in fade-in slide-in-from-top-1 duration-150">
                      ⚠️ {t("search.advanced.expected_format")} ({t("search.advanced.example")}: 123-II {t("search.advanced.or")} 123-3-A {t("search.advanced.or")} 12-34)
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* TAB: OPERATION */}
            {activeTab === "operation" && (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <h3 className="col-span-full border-b border-slate-100 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t("search.advanced.sections.operation")}
                </h3>
                <NullableSelect
                  label={t("domain.vos.operation.landfill_type.title")}
                  options={getOptionsFromVO(LandfillTypeVO)}
                  selectedValues={filters.landfill_type?.value}
                  includeNull={filters.landfill_type?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("landfill_type", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.operation.ownership.ownership_types.title")}
                  options={getOptionsFromVO(OwnershipTypeVO)}
                  selectedValues={filters.property_type?.value}
                  includeNull={filters.property_type?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("property_type", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.operation.holder")}
                  value={filters.holder?.value}
                  onlyNull={filters.holder?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("holder", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.operation.contact")}
                  value={filters.contact?.value}
                  onlyNull={filters.contact?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("contact", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <div>
                  <NullableTextInput
                    label={t("domain.vos.operation.phone_number")}
                    value={filters.phone_number?.value}
                    onlyNull={filters.phone_number?.onlyNull}
                    onChange={(val, onlyNull) =>
                      updateFilter("phone_number", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                    }
                  />
                  {isPhoneInvalid && (
                    <span className="text-[10px] font-medium text-rose-500 mt-1 block px-1 animate-in fade-in slide-in-from-top-1 duration-150">
                      ⚠️ Debe tener entre 9 y 15 dígitos
                    </span>
                  )}
                </div>
                <NullableSelect
                  label={t("domain.vos.operation.legal_status.title")}
                  options={getOptionsFromVO(LegalStatusVO)}
                  selectedValues={filters.legal_status?.value}
                  includeNull={filters.legal_status?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("legal_status", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.operation.license_characteristics.title")}
                  options={getOptionsFromVO(LicenseCharacteristicsVO)}
                  selectedValues={filters.license_characteristics?.value}
                  includeNull={filters.license_characteristics?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("license_characteristics", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <div>
                  <NullableTextInput
                    label={t("domain.vos.operation.classified_activity_record_number")}
                    value={filters.classified_activity_record_numbers?.value}
                    onlyNull={filters.classified_activity_record_numbers?.onlyNull}
                    onChange={(val, onlyNull) =>
                      updateFilter("classified_activity_record_numbers", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                    }
                  />
                  {isClassifiedInvalid && (
                    <span className="text-[10px] font-medium text-rose-500 mt-1 block px-1 animate-in fade-in slide-in-from-top-1 duration-150">
                      ⚠️ {t("search.advanced.expected_format")} ({t("search.advanced.example")}: BI-1234/56)
                    </span>
                  )}
                </div>

                <h3 className="col-span-full border-b border-slate-100 pb-1 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                </h3>
                <RangeInput
                  label={t("domain.vos.operation.years_operating")}
                  min={filters.years_operating?.min}
                  max={filters.years_operating?.max}
                  onlyNull={filters.years_operating?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("years_operating", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.operation.equipment_installation_date")}
                  placeholder="AAAA-MM-DD"
                  value={filters.equipment_installation_date?.value}
                  onlyNull={filters.equipment_installation_date?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("equipment_installation_date", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.operation.equipment")}
                  value={filters.equipment?.value}
                  onlyNull={filters.equipment?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("equipment", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.operation.activity_start_date")}
                  placeholder="AAAA-MM-DD"
                  value={filters.activity_start_date?.value}
                  onlyNull={filters.activity_start_date?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("activity_start_date", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.operation.activity_end_date")}
                  placeholder="AAAA-MM-DD"
                  value={filters.activity_end_date?.value}
                  onlyNull={filters.activity_end_date?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("activity_end_date", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.operation.occurred_incident")}
                  value={filters.occurred_incident?.value}
                  onlyNull={filters.occurred_incident?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("occurred_incident", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />

                <h3 className="col-span-full border-b border-slate-100 pb-1 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                </h3>
                <NullableSelect
                  label={t("domain.vos.operation.waste_legal_category.title")}
                  options={getOptionsFromVO(WasteLegalCategoryVO)}
                  selectedValues={filters.waste_legal_category?.value}
                  includeNull={filters.waste_legal_category?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("waste_legal_category", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.operation.waste_type.title")}
                  options={getOptionsFromVO(WasteTypeVO)}
                  selectedValues={filters.waste_type?.value}
                  includeNull={filters.waste_type?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("waste_type", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.operation.waste_components.title")}
                  options={getOptionsFromVO(WasteComponentVO)}
                  selectedValues={filters.waste_components?.value}
                  includeNull={filters.waste_components?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("waste_components", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.operation.waste_description")}
                  value={filters.waste_description?.value}
                  onlyNull={filters.waste_description?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("waste_description", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.operation.grading.title")}
                  options={getOptionsFromVO(GradingVO)}
                  selectedValues={filters.grading?.value}
                  includeNull={filters.grading?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("grading", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.operation.waste_source_company")}
                  value={filters.waste_source_company?.value}
                  onlyNull={filters.waste_source_company?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("waste_source_company", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.operation.waste_layout.title")}
                  options={getOptionsFromVO(WasteLayoutVO)}
                  selectedValues={filters.waste_layout?.value}
                  includeNull={filters.waste_layout?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("waste_layout", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.operation.deposit_shapes.title")}
                  options={getOptionsFromVO(DepositShapeVO)}
                  selectedValues={filters.deposit_shapes?.value}
                  includeNull={filters.deposit_shapes?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("deposit_shapes", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
              </div>
            )}

            {/* TAB: RISKS */}
            {activeTab === "risks" && (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <RangeInput
                  label={`${t("domain.vos.risks.title")} ${t("domain.vos.risks.global")}`}
                  min={filters.global_risk_pct?.min}
                  max={filters.global_risk_pct?.max}
                  onlyNull={filters.global_risk_pct?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("global_risk_pct", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="%"
                />
                <RangeInput
                  label={t("domain.vos.risks.infra")}
                  min={filters.infra_risk_pct?.min}
                  max={filters.infra_risk_pct?.max}
                  onlyNull={filters.infra_risk_pct?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("infra_risk_pct", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="%"
                />
                <RangeInput
                  label={t("domain.vos.risks.hydro")}
                  min={filters.hydro_risk_pct?.min}
                  max={filters.hydro_risk_pct?.max}
                  onlyNull={filters.hydro_risk_pct?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("hydro_risk_pct", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="%"
                />
                <RangeInput
                  label={t("domain.vos.risks.geo")}
                  min={filters.geo_risk_pct?.min}
                  max={filters.geo_risk_pct?.max}
                  onlyNull={filters.geo_risk_pct?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("geo_risk_pct", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="%"
                />
                <RangeInput
                  label={t("domain.vos.risks.social")}
                  min={filters.social_risk_pct?.min}
                  max={filters.social_risk_pct?.max}
                  onlyNull={filters.social_risk_pct?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("social_risk_pct", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="%"
                />
                <RangeInput
                  label={t("domain.vos.risks.impacts")}
                  min={filters.impacts_risk_pct?.min}
                  max={filters.impacts_risk_pct?.max}
                  onlyNull={filters.impacts_risk_pct?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("impacts_risk_pct", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="%"
                />
              </div>
            )}

            {/* TAB: INFRASTRUCTURE */}
            {activeTab === "infrastructure" && (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <h3 className="col-span-full border-b border-slate-100 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t("search.advanced.sections.infrastructure")}
                </h3>
                <NullableSelect
                  label={t("domain.vos.infrastructure.bed_waterproofing_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.bed_waterproofing_state?.value}
                  includeNull={filters.bed_waterproofing_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("bed_waterproofing_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.infrastructure.side_waterproofing_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.side_waterproofing_state?.value}
                  includeNull={filters.side_waterproofing_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("side_waterproofing_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.infrastructure.peripheral_enclosure_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.peripheral_enclosure_state?.value}
                  includeNull={filters.peripheral_enclosure_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("peripheral_enclosure_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.infrastructure.hedge_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.hedge_state?.value}
                  includeNull={filters.hedge_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("hedge_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />

                <h3 className="col-span-full border-b border-slate-100 pb-1 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                </h3>
                <NullableSelect
                  label={t("domain.vos.infrastructure.underground_channeling_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.underground_channeling_state?.value}
                  includeNull={filters.underground_channeling_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("underground_channeling_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.infrastructure.underground_channeling_type.title")}
                  options={getOptionsFromVO(ChannelingTypeVO)}
                  selectedValues={filters.underground_channeling_type?.value}
                  includeNull={filters.underground_channeling_type?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("underground_channeling_type", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.infrastructure.stormwater_management")}
                  value={filters.stormwater_management?.value}
                  onlyNull={filters.stormwater_management?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("stormwater_management", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.infrastructure.leachate_sampling_points_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.leachate_sampling_points_state?.value}
                  includeNull={filters.leachate_sampling_points_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("leachate_sampling_points_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.infrastructure.existing_machinery.title")}
                  options={getOptionsFromVO(ExistingMachineryVO)}
                  selectedValues={filters.existing_machinery?.value}
                  includeNull={filters.existing_machinery?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("existing_machinery", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <RangeInput
                  label={t("domain.vos.infrastructure.hired_personnel")}
                  min={filters.hired_personnel?.min}
                  max={filters.hired_personnel?.max}
                  onlyNull={filters.hired_personnel?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("hired_personnel", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                />

                <h3 className="col-span-full border-b border-slate-100 pb-1 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                </h3>
                <NullableSelect
                  label={t("domain.vos.infrastructure.operation_plan_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.operation_plan_state?.value}
                  includeNull={filters.operation_plan_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("operation_plan_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.infrastructure.closing_plan_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.closing_plan_state?.value}
                  includeNull={filters.closing_plan_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("closing_plan_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
              </div>
            )}

            {/* TAB: NATURAL MEDIUM */}
            {activeTab === "natural_medium" && (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <h3 className="col-span-full border-b border-slate-100 pb-1 text-xl font-bold text-slate-800 uppercase tracking-wider">
                  {t("search.advanced.sections.natural_medium")}
                </h3>
                <h3 className="col-span-full border-b border-slate-100 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t("domain.vos.fauna_and_vegetation.title")}
                </h3>
                <NullableTextInput
                  label={t("domain.vos.fauna_and_vegetation.vegetation_cover")}
                  value={filters.vegetation_cover?.value}
                  onlyNull={filters.vegetation_cover?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("vegetation_cover", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.fauna_and_vegetation.vegetation_cover_description")}
                  value={filters.vegetation_cover_description?.value}
                  onlyNull={filters.vegetation_cover_description?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("vegetation_cover_description", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.fauna_and_vegetation.environment_vegetation.title")}
                  options={getOptionsFromVO(EnvironmentVegetationTypeVO)}
                  selectedValues={filters.environment_vegetation?.value}
                  includeNull={filters.environment_vegetation?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("environment_vegetation", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.fauna_and_vegetation.fauna_type.title")}
                  options={getOptionsFromVO(FaunaTypeVO)}
                  selectedValues={filters.fauna?.value}
                  includeNull={filters.fauna?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("fauna", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />

                <h3 className="col-span-full border-b border-slate-100 pb-1 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t("domain.vos.hydrology.title")}
                </h3>
                <RangeInput
                  label={t("domain.vos.hydrology.annual_precipitation")}
                  min={filters.annual_precipitation?.min}
                  max={filters.annual_precipitation?.max}
                  onlyNull={filters.annual_precipitation?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("annual_precipitation", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="mm"
                />
                <RangeInput
                  label={t("domain.vos.hydrology.effective_rainfall")}
                  min={filters.effective_rainfall?.min}
                  max={filters.effective_rainfall?.max}
                  onlyNull={filters.effective_rainfall?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("effective_rainfall", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="mm"
                />
                <NullableTextInput
                  label={t("domain.vos.hydrology.drainage_system")}
                  value={filters.drainage_system?.value}
                  onlyNull={filters.drainage_system?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("drainage_system", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.hydrology.near_water_abstraction")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.near_water_abstraction?.value}
                  includeNull={filters.near_water_abstraction?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("near_water_abstraction", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <RangeInput
                  label={t("domain.vos.hydrology.distance_to_nearest_watercourse")}
                  min={filters.distance_to_nearest_watercourse?.min}
                  max={filters.distance_to_nearest_watercourse?.max}
                  onlyNull={filters.distance_to_nearest_watercourse?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("distance_to_nearest_watercourse", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="m"
                />
                <NullableTextInput
                  label={t("domain.vos.hydrology.water_abstraction_type")}
                  value={filters.water_abstraction_type?.value}
                  onlyNull={filters.water_abstraction_type?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("water_abstraction_type", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.hydrology.stream_direction.title")}
                  options={getOptionsFromVO(StreamDirectionVO)}
                  selectedValues={filters.stream_direction?.value}
                  includeNull={filters.stream_direction?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("stream_direction", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <RangeInput
                  label={t("domain.vos.hydrology.distance")}
                  min={filters.distance?.min}
                  max={filters.distance?.max}
                  onlyNull={filters.distance?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("distance", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="m"
                />
                <NullableSelect
                  label={t("domain.vos.hydrology.crossing_watercourse_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.crossing_watercourse_state?.value}
                  includeNull={filters.crossing_watercourse_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("crossing_watercourse_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.hydrology.underlying_watercourse_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.underlying_watercourse_state?.value}
                  includeNull={filters.underlying_watercourse_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("underlying_watercourse_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.hydrology.streamName")}
                  value={filters.stream_name?.value}
                  onlyNull={filters.stream_name?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("stream_name", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />

                <h3 className="col-span-full border-b border-slate-100 pb-1 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t("domain.vos.geology.title")}
                </h3>
                <NullableTextInput
                  label={t("domain.vos.geology.lithologycal_and_lithostratigraphycal_units")}
                  value={filters.lithologycal_and_lithostratigraphycal_units?.value}
                  onlyNull={filters.lithologycal_and_lithostratigraphycal_units?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("lithologycal_and_lithostratigraphycal_units", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geology.superficial_deposit.title")}
                  options={getOptionsFromVO(SuperficialDepositVO)}
                  selectedValues={filters.superficial_deposit?.value}
                  includeNull={filters.superficial_deposit?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("superficial_deposit", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <RangeInput
                  label={t("domain.vos.geology.regolith_thickness")}
                  min={filters.regolith_thickness?.min}
                  max={filters.regolith_thickness?.max}
                  onlyNull={filters.regolith_thickness?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("regolith_thickness", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="m"
                />
                <NullableSelect
                  label={t("domain.vos.geology.soil_type.title")}
                  options={getOptionsFromVO(SoilTypeVO)}
                  selectedValues={filters.soil_type?.value}
                  includeNull={filters.soil_type?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("soil_type", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geology.morphology.title")}
                  options={getOptionsFromVO(MorphologyVO)}
                  selectedValues={filters.morphology?.value}
                  includeNull={filters.morphology?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("morphology", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geology.permeability_level")}
                  options={getOptionsFromVO(MagnitudeLevelVO)}
                  selectedValues={filters.permeability_level?.value}
                  includeNull={filters.permeability_level?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("permeability_level", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geology.permeability_reason.title")}
                  options={getOptionsFromVO(PermeabilityReasonVO)}
                  selectedValues={filters.permeability_reason?.value}
                  includeNull={filters.permeability_reason?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("permeability_reason", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />

                <h3 className="col-span-full border-b border-slate-100 pb-1 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t("domain.vos.hydrogeology.title")}
                </h3>
                <NullableSelect
                  label={t("domain.vos.hydrogeology.aquifer_type.title")}
                  options={getOptionsFromVO(AquiferTypeVO)}
                  selectedValues={filters.aquifer_type?.value}
                  includeNull={filters.aquifer_type?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("aquifer_type", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <RangeInput
                  label={t("domain.vos.hydrogeology.estimated_depth")}
                  min={filters.estimated_depth?.min}
                  max={filters.estimated_depth?.max}
                  onlyNull={filters.estimated_depth?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("estimated_depth", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="m"
                />
                <NullableTextInput
                  label={t("domain.vos.hydrogeology.estimated_stream_direction")}
                  value={filters.estimated_stream_direction?.value}
                  onlyNull={filters.estimated_stream_direction?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("estimated_stream_direction", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.hydrogeology.vulnerability_level")}
                  options={getOptionsFromVO(MagnitudeLevelVO)}
                  selectedValues={filters.vulnerability_level?.value}
                  includeNull={filters.vulnerability_level?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("vulnerability_level", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.hydrogeology.hydrogeologycal_unit")}
                  value={filters.hydrogeologycal_unit?.value}
                  onlyNull={filters.hydrogeologycal_unit?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("hydrogeologycal_unit", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />

                <h3 className="col-span-full border-b border-slate-100 pb-1 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t("domain.vos.geotechnique_characteristics.title")}
                </h3>
                <RangeInput
                  label={t("domain.vos.geotechnique_characteristics.hillside_slope")}
                  min={filters.hillside_slope?.min}
                  max={filters.hillside_slope?.max}
                  onlyNull={filters.hillside_slope?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("hillside_slope", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="%"
                />
                <NullableSelect
                  label={t("domain.vos.geotechnique_characteristics.slope_instability_processes.title")}
                  options={getOptionsFromVO(SlopeInstabilityProcessesVO)}
                  selectedValues={filters.slope_instability_processes?.value}
                  includeNull={filters.slope_instability_processes?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("slope_instability_processes", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geotechnique_characteristics.waste_mass_stability_level")}
                  options={getOptionsFromVO(MagnitudeLevelVO)}
                  selectedValues={filters.waste_mass_stability_level?.value}
                  includeNull={filters.waste_mass_stability_level?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("waste_mass_stability_level", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geotechnique_characteristics.flood_potential.title")}
                  options={getOptionsFromVO(FloodPotentialVO)}
                  selectedValues={filters.flood_potential?.value}
                  includeNull={filters.flood_potential?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("flood_potential", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geotechnique_characteristics.erodibility_level")}
                  options={getOptionsFromVO(MagnitudeLevelVO)}
                  selectedValues={filters.erodibility_level?.value}
                  includeNull={filters.erodibility_level?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("erodibility_level", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.geotechnique_characteristics.structural_discontinuities")}
                  value={filters.structural_discontinuities?.value}
                  onlyNull={filters.structural_discontinuities?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("structural_discontinuities", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geotechnique_characteristics.covering_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.covering_state?.value}
                  includeNull={filters.covering_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("covering_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geotechnique_characteristics.land_covering_type.title")}
                  options={getOptionsFromVO(LandCoveringTypeVO)}
                  selectedValues={filters.land_covering_type?.value}
                  includeNull={filters.land_covering_type?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("land_covering_type", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.geotechnique_characteristics.land_covering_description")}
                  value={filters.land_covering_description?.value}
                  onlyNull={filters.land_covering_description?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("land_covering_description", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geotechnique_characteristics.covering_material_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.covering_material_state?.value}
                  includeNull={filters.covering_material_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("covering_material_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.geotechnique_characteristics.covering_material_description")}
                  value={filters.covering_material_description?.value}
                  onlyNull={filters.covering_material_description?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("covering_material_description", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geotechnique_characteristics.effect_on_existing_structures_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.effect_on_existing_structures_state?.value}
                  includeNull={filters.effect_on_existing_structures_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("effect_on_existing_structures_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.geotechnique_characteristics.elements_undergo_slipping_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.elements_undergo_slipping_state?.value}
                  includeNull={filters.elements_undergo_slipping_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("elements_undergo_slipping_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
              </div>
            )}

            {/* TAB: HUMAN MEDIUM */}
            {activeTab === "human_medium" && (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <RangeInput
                  label={t("domain.vos.humanAndSocialEnvironment.surrounding_population")}
                  min={filters.surrounding_population?.min}
                  max={filters.surrounding_population?.max}
                  onlyNull={filters.surrounding_population?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("surrounding_population", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                />
                <RangeInput
                  label={t("domain.vos.humanAndSocialEnvironment.distance_to_houses_or_recreation")}
                  min={filters.distance_to_houses_or_recreation?.min}
                  max={filters.distance_to_houses_or_recreation?.max}
                  onlyNull={filters.distance_to_houses_or_recreation?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("distance_to_houses_or_recreation", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                  unit="m"
                />
                <RangeInput
                  label={t("domain.vos.humanAndSocialEnvironment.near_houses_count")}
                  min={filters.near_houses_count?.min}
                  max={filters.near_houses_count?.max}
                  onlyNull={filters.near_houses_count?.onlyNull}
                  onChange={(min, max, onlyNull) =>
                    updateFilter("near_houses_count", min !== undefined || max !== undefined || onlyNull ? { type: "number_range", min, max, onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.humanAndSocialEnvironment.current_usage_status")}
                  options={getOptionsFromVO(UsageStatusVO)}
                  selectedValues={filters.current_usage_status?.value}
                  includeNull={filters.current_usage_status?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("current_usage_status", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.humanAndSocialEnvironment.current_usage_description")}
                  value={filters.current_usage_description?.value}
                  onlyNull={filters.current_usage_description?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("current_usage_description", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.humanAndSocialEnvironment.future_usages")}
                  options={getOptionsFromVO(UsageStatusVO)}
                  selectedValues={filters.future_usages?.value}
                  includeNull={filters.future_usages?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("future_usages", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.humanAndSocialEnvironment.surface_water_usage")}
                  options={getOptionsFromVO(WaterUsageVO)}
                  selectedValues={filters.surface_water_usage?.value}
                  includeNull={filters.surface_water_usage?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("surface_water_usage", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.humanAndSocialEnvironment.ground_water_usage")}
                  options={getOptionsFromVO(WaterUsageVO)}
                  selectedValues={filters.ground_water_usage?.value}
                  includeNull={filters.ground_water_usage?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("ground_water_usage", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.humanAndSocialEnvironment.urban_clasification.title")}
                  options={getOptionsFromVO(UrbanClassificationVO)}
                  selectedValues={filters.urban_clasification?.value}
                  includeNull={filters.urban_clasification?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("urban_clasification", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.humanAndSocialEnvironment.urban_calification.title")}
                  options={getOptionsFromVO(UrbanCalificationVO)}
                  selectedValues={filters.urban_calification?.value}
                  includeNull={filters.urban_calification?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("urban_calification", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
              </div>
            )}

            {/* TAB: IMPACTS & MEASURES */}
            {activeTab === "impacts_measures" && (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <NullableTextInput
                  label={t("domain.vos.otherImpacts.impact_description")}
                  value={filters.impact_description?.value}
                  onlyNull={filters.impact_description?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("impact_description", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.natural_heritage_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.natural_heritage_state?.value}
                  includeNull={filters.natural_heritage_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("natural_heritage_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.bad_smells")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.bad_smells?.value}
                  includeNull={filters.bad_smells?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("bad_smells", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.particle_emission_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.particle_emission_state?.value}
                  includeNull={filters.particle_emission_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("particle_emission_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.otherImpacts.particle_description")}
                  value={filters.particle_description?.value}
                  onlyNull={filters.particle_description?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("particle_description", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.heavy_vehicle_traffic_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.heavy_vehicle_traffic_state?.value}
                  includeNull={filters.heavy_vehicle_traffic_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("heavy_vehicle_traffic_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.rodent_and_insect_presence_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.rodent_and_insect_presence_state?.value}
                  includeNull={filters.rodent_and_insect_presence_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("rodent_and_insect_presence_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.periodic_situation_impacts_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.periodic_situation_impacts_state?.value}
                  includeNull={filters.periodic_situation_impacts_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("periodic_situation_impacts_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.exploitation_loss_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.exploitation_loss_state?.value}
                  includeNull={filters.exploitation_loss_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("exploitation_loss_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.cultural_heritage_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.cultural_heritage_state?.value}
                  includeNull={filters.cultural_heritage_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("cultural_heritage_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.effects_and_impacts_level")}
                  options={getOptionsFromVO(MagnitudeLevelVO)}
                  selectedValues={filters.effects_and_impacts_level?.value}
                  includeNull={filters.effects_and_impacts_level?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("effects_and_impacts_level", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.environment_visual_basin_level")}
                  options={getOptionsFromVO(MagnitudeLevelVO)}
                  selectedValues={filters.environment_visual_basin_level?.value}
                  includeNull={filters.environment_visual_basin_level?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("environment_visual_basin_level", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.otherImpacts.where_its_seen_from")}
                  value={filters.where_its_seen_from?.value}
                  onlyNull={filters.where_its_seen_from?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("where_its_seen_from", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.paper_and_plastic_flights")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.paper_and_plastic_flights?.value}
                  includeNull={filters.paper_and_plastic_flights?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("paper_and_plastic_flights", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.otherImpacts.fires_state")}
                  options={getOptionsFromVO(InspectionStateVO)}
                  selectedValues={filters.fires_state?.value}
                  includeNull={filters.fires_state?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("fires_state", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.otherImpacts.fires_cause")}
                  value={filters.fires_cause?.value}
                  onlyNull={filters.fires_cause?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("fires_cause", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.otherImpacts.fires_frequency")}
                  value={filters.fires_frequency?.value}
                  onlyNull={filters.fires_frequency?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("fires_frequency", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableSelect
                  label={t("domain.vos.correcting_measures.measures.title")}
                  options={getOptionsFromVO(CorrectingMeasuresVO)}
                  selectedValues={filters.measures?.value}
                  includeNull={filters.measures?.includeNull}
                  onChange={(sel, incNull) =>
                    updateFilter("measures", sel || incNull ? { type: "enum", value: sel || [], includeNull: incNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.correcting_measures.description")}
                  value={filters.correcting_measures_description?.value}
                  onlyNull={filters.correcting_measures_description?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("correcting_measures_description", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.correcting_measures.source")}
                  value={filters.correcting_measures_source?.value}
                  onlyNull={filters.correcting_measures_source?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("correcting_measures_source", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
                <NullableTextInput
                  label={t("domain.vos.correcting_measures.other")}
                  value={filters.correcting_measures_other?.value}
                  onlyNull={filters.correcting_measures_other?.onlyNull}
                  onChange={(val, onlyNull) =>
                    updateFilter("correcting_measures_other", val || onlyNull ? { type: "text", value: val || "", onlyNull } : undefined)
                  }
                />
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 sm:px-6 sm:py-4 shrink-0">
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-semibold text-slate-600 shadow-xs hover:bg-slate-50 transition-colors"
            >
              <RotateCcw size={14} />
              <span>{t("search.advanced.clear")}</span>
            </button>

            <div className="flex items-center gap-3">
              {advancedSearchResults !== null && (
                <span className="hidden sm:inline-block text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                  {advancedSearchResults.length} {t("search.advanced.results")}
                </span>
              )}
              {advancedSearchResults !== null && advancedSearchResults.length > 0 && (
                <button
                  id="advanced-search-btn-export"
                  type="button"
                  onClick={() => {
                    useDataExtractorStore.getState().setSelectedOption("filtered");
                    toggleModal("data-extractor", true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/50 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-bold text-emerald-700 shadow-xs hover:bg-emerald-50 transition-colors"
                >
                  <Download size={14} />
                  <span>{t("extractor.buttons.export_shortcut" as any) || "Exportar"}</span>
                </button>
              )}
              <button
                id="advanced-search-btn-submit"
                type="submit"
                disabled={isSearching}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition-colors disabled:opacity-75"
              >
                {isSearching ? (
                  <>
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Buscando...</span>
                  </>
                ) : (
                  <>
                    <Search size={14} />
                    <span>{t("search.advanced.search")} {advancedSearchResults !== null ? `(${advancedSearchResults.length})` : ""}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
