// Definimos una interfaz simplificada para la configuración base
interface LegendConfigItem {
  id: string;
  icon: {
    kind: "image";
    src: string;
    altKey: string;
  };
}

const BASE = import.meta.env.BASE_URL;

export const legendConfig: LegendConfigItem[] = [
  {
    id: "clp-acute-toxicity",
    icon: {
      kind: "image",
      src: `${BASE}icons/landfills/clp_acute-toxicity.svg`,
      altKey: "clp-acute-toxicity",
    },
  },
  {
    id: "clp-health-hazard",
    icon: {
      kind: "image",
      src: `${BASE}icons/landfills/clp_health-hazard.svg`,
      altKey: "clp-health-hazard",
    },
  },
  {
    id: "clp-corrosive",
    icon: {
      kind: "image",
      src: `${BASE}icons/landfills/clp_corrosive.svg`,
      altKey: "clp-corrosive",
    },
  },
  {
    id: "clp-flammable",
    icon: {
      kind: "image",
      src: `${BASE}icons/landfills/clp_flammable.svg`,
      altKey: "clp-flammable",
    },
  },
  {
    id: "clp-environmental",
    icon: {
      kind: "image",
      src: `${BASE}icons/landfills/clp_environmental.svg`,
      altKey: "clp-environmental",
    },
  },
  {
    id: "clp-irritant",
    icon: {
      kind: "image",
      src: `${BASE}icons/landfills/clp_irritant.svg`,
      altKey: "clp-irritant",
    },
  },
];
