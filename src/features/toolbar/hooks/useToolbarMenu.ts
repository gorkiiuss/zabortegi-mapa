import { useMapStore } from "@features/map/state/mapStore";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";

export interface MenuItem {
  label: string;
  action: () => void;
  disabled?: boolean;
  isActive?: boolean;
}

export interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}

interface UseToolbarMenuProps {
  onOpenIndex: () => void;
  onCloseUi: () => void;
}

export function useToolbarMenu({
  onOpenIndex,
  onCloseUi,
}: UseToolbarMenuProps) {
  const showNoInfoLandFills = useMapStore((s) => s.showNoInfoLandfills);
  const toggleShowNoInfoLandfills = useMapStore(
    (s) => s.toggleShowNoInfoLandfills,
  );
  const { toggleActiveModal } = useUiStore();

  const { t, setLanguage, currentLanguage } = useLanguageStore();

  const menuStructure: MenuSection[] = [
    {
      id: "tools",
      label: t("toolbar.tools"),
      items: [
        {
          label: t("toolbar.index"),
          action: () => {
            onOpenIndex();
          },
        },
        {
          label: t("toolbar.extractor"),
          action: () => onCloseUi(),
          disabled: true,
        },
        {
          label: t("toolbar.search"),
          action: () => onCloseUi(),
          disabled: true,
        },
      ],
    },
    {
      id: "view",
      label: t("toolbar.view"),
      items: [
        {
          label: showNoInfoLandFills
            ? t("toolbar.hide_no_info")
            : t("toolbar.show_no_info"),
          action: () => {
            toggleShowNoInfoLandfills();
          },
        },
      ],
    },
    {
      id: "help",
      label: t("toolbar.help"),
      items: [
        {
          label: t("toolbar.attributions"),
          action: () => {
            toggleActiveModal("attributions", true);
          },
        },
        {
          label: t("toolbar.about"),
          action: () => {
            toggleActiveModal("about", true);
          },
        },
        {
          label: t("toolbar.contact"),
          action: () => {
            toggleActiveModal("contact", true);
          },
        },
        {
          label: t("toolbar.tutorial"),
          action: () => onCloseUi(),
          disabled: true,
        },
      ],
    },
    {
      id: "languages",
      label: t("toolbar.languages"),
      items: [
        {
          label: t("toolbar.basque"),
          isActive: currentLanguage === "eu",
          action: () => {
            setLanguage("eu");
            onCloseUi();
          },
        },
        {
          label: t("toolbar.spanish"),
          isActive: currentLanguage === "es",
          action: () => {
            setLanguage("es");
            onCloseUi();
          },
        },
      ],
    },
  ];

  return { menuStructure };
}
