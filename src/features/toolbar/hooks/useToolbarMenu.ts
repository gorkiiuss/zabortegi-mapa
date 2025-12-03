import { useMapStore } from "@features/map/state/mapStore";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { shareUtils } from "@shared/utils/sharing";

export interface MenuItem {
  label: string;
  action: () => void;
  disabled?: boolean;
  isActive?: boolean;
  isFutureFeature?: boolean;
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
          isFutureFeature: true,
          action: () => {
            toggleActiveModal("future_feature", true);
          },
        },
        {
          label: t("toolbar.search"),
          isFutureFeature: true,
          action: () => {
            toggleActiveModal("future_feature", true);
          },
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
      id: "sharing",
      label: t("toolbar.sharing"),
      items: [
        {
          label: "WhatsApp",
          action: () => {
            shareUtils.whatsapp();
            onCloseUi();
          },
        },
        {
          label: "Bluesky",
          action: () => {
            shareUtils.bluesky();
            onCloseUi();
          },
        },
        {
          label: "Facebook",
          action: () => {
            shareUtils.facebook();
            onCloseUi();
          },
        },
        {
          label: "Email",
          action: () => {
            shareUtils.email();
            onCloseUi();
          },
        },
        {
          label: t("toolbar.copy_link"),
          action: async () => {
            await shareUtils.copyLink();
            onCloseUi();
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
          isFutureFeature: true,
          action: () => {
            toggleActiveModal("future_feature", true);
          },
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
