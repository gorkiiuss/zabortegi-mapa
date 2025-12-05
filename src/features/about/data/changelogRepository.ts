// src/features/about/data/changelogRepository.ts

export interface ChangeLogEntry {
  version: string;
  date: string;
  title: {
    es: string;
    eu: string;
  };
  changes: {
    es: string[];
    eu: string[];
  };
}

export const CHANGELOG_DATA: ChangeLogEntry[] = [
  {
    version: "1.1.0",
    date: "2025-12-XX",
    title: {
      es: "",
      eu: ""
    },
    changes: {
      es: [],
      eu: [],
    }
  },
  {
    version: "1.0.1",
    date: "2025-12-03",
    title: {
      es: "Hotfix: Mejoras de UI y Navegación",
      eu: "Hotfix: UI eta Nabigazio Hobekuntzak",
    },
    changes: {
      es: [
        "Añadido cambio de idioma desde la presentación.",
        "Añadido versionaje en la ventana sobre la aplicación.",
        "Añadido botón para compartir.",
        "Arreglado link al código fuente.",
      ],
      eu: [
        "Hizkuntza aldaketa aurkezpenean gehitu da.",
        "Aplikazioari buruzko leihoan bertsioa gehitu da.",
        "Partekatzeko botoia gehitu da.",
        "Iturburu kodearen esteka konponduta.",
      ],
    },
  },
  {
    version: "1.0.0",
    date: "2025-12-02",
    title: {
      es: "Lanzamiento Oficial",
      eu: "Aurkezpen Ofiziala",
    },
    changes: {
      es: ["Lanzamiento oficial de la plataforma."],
      eu: ["Plataformaren aurkezpen ofiziala."],
    },
  },
];
