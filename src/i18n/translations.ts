export type Language = "eu" | "es";

export const translations = {
  es: {
    toolbar: {
      tools: "Herramientas",
      index: "Índice de vertederos",
      extractor: "Extractor de datos",
      search: "Buscador avanzado",
      view: "Vista",
      show_no_info: "Ver vertederos sin información",
      hide_no_info: "Ocultar vertederos sin información",
      help: "Ayuda",
      attributions: "Atribuciones",
      about: "Sobre este proyecto",
      tutorial: "Tutorial",
      languages: "Idiomas",
      basque: "Euskera",
      spanish: "Castellano",
      contact: "Contacto",
    },
    app: {
      menu: "Menú",
      search_placeholder: "Buscar vertederos...",
      legend: "Leyenda",
    },
    loading: {
      title: "Cargando vertederos...",
      subtitle:
        "Estamos descargando los datos de todos los vertederos. Puede tardar unos segundos.",
      hint: "Si la carga se alarga demasiado, recarga la página.",
    },
    index: {
      header: {
        title: "Índice de Vertederos",
        subtitle: "{{count}} vertederos totales",
        subtitle_q: "{{found}} encontrados de {{count}}",
      },
      not_found: "No se encontraron vertederos con ese criterio.",
    },
    search: {
      title: "Búsqueda",
      subtitle: "Localizar vertederos",
      placeholder_default: "Buscar por nombre, municipio o ID...",
      placeholder_collapsed: "Buscar vertedero...",
      aria_close: "Cerrar panel",
      aria_clear: "Borrar búsqueda",
      results_title: "Resultados",
      keyboard_hint:
        "Usa <kbd class='font-sans bg-slate-100 px-1 rounded'>↑</kbd> <kbd class='font-sans bg-slate-100 px-1 rounded'>↓</kbd> y <kbd class='font-sans bg-slate-100 px-1 rounded'>Enter</kbd>",
      footer_esc:
        "Presiona <kbd class='font-sans font-semibold'>Esc</kbd> para cerrar",
      no_results: 'No encontramos nada con "{{query}}"',
      start_typing: "Escribe para buscar vertederos...",
      more_results: {
        title: "Ver más resultados en el índice",
        subtitle_filtered: "Abrir índice filtrado por “{{query}}”",
        subtitle_all: "Abrir el índice completo",
      },
    },
    legend: {
      title: "Leyenda",
      subtitle: "Simbología y niveles de riesgo",
      risk_color: "Color de riesgo",
      risk_desc:
        'Más rojo =&nbsp;mayor peligrosidad. Los símbolos que <span class="font-semibold">pulsan</span> son de los más peligrosos de los que se ven.',
      clp_pictograms: "Pictogramas CLP",
      clp_info:
        'Más info sobre los pictogramas CLP en <a href="https://echa.europa.eu/es/regulations/clp/clp-pictograms" target="_blank" rel="noreferrer" class="text-emerald-700 underline">echa.europa.eu</a>.',
      items: {
        "clp-acute-toxicity": {
          label: "Toxicidad aguda (GHS06)",
          note: "Puede causar intoxicaciones graves o mortales en exposiciones breves.",
        },
        "clp-health-hazard": {
          label: "Peligro para la salud (GHS08)",
          note: "Riesgos crónicos: cáncer, sensibilización respiratoria, efectos en órganos…",
        },
        "clp-corrosive": {
          label: "Corrosivo (GHS05)",
          note: "Puede destruir tejidos y corroer metales.",
        },
        "clp-flammable": {
          label: "Inflamable (GHS02)",
          note: "Arde con facilidad en contacto con una fuente de ignición.",
        },
        "clp-environmental": {
          label: "Peligro ambiental (GHS09)",
          note: "Muy tóxico para organismos acuáticos, con efectos a largo plazo.",
        },
        "clp-irritant": {
          label: "Irritante / nocivo (GHS07)",
          note: "Puede causar irritación o efectos nocivos menores.",
        },
      },
    },
    selection: {
      close: "Cerrar",
      center_map: "Centrar vertedero en el mapa",
      see_photos: "Ver fotos ({{count}})",
      download_report: "Descargar Informe PDF",
      generating_report: "Generando informe...",
      related_docs: "Documentos relacionados",
      add_suggestion: "Añadir sugerencia / corrección",
      cards: {
        climate: {
          title: "Clima e hidrología",
          precip: "Precipitación anual",
          rain: "Lluvia útil",
        },
        dimensions: {
          title: "Dimensiones",
          surface: "Superficie",
          volume: "Volumen",
          capacity: "Capacidad total",
          fill: "% de llenado (estimado)",
          unit_has: "Has",
          unit_m3: "m³",
        },
        legal: {
          title: "Uso y situación legal",
          status: "Situación legal",
          type: "Tipo de vertedero",
          waste_type: "Tipos de residuos",
          waste_desc: "Descripción de los residuos",
        },
        measures: {
          title: "Medidas correctoras",
        },
        risk: {
          title: "Peligrosidad",
          global: "Peligrosidad global",
          incomplete: "(datos incompletos)",
          no_data: "Sin dato",
          insufficient:
            "No hay datos suficientes en la ficha para desglosar la peligrosidad.",
          sections: {
            infra: "Infraestructura",
            hydro: "Hidrología",
            geology: "Geología",
            human: "Medio humano",
            impacts: "Impactos",
          },
        },
        more_info: {
          button: "Ver más información",
        },
      },
      related_docs_modal: {
        title: "Documentación Relacionada",
        no_docs: "No hay documentos disponibles",
        untitled: "Documento sin título",
        open_new_tab: "Abrir en nueva pestaña",
      },
      gallery: {
        count: "Imagen {{current}} / {{total}}",
        close: "Cerrar galería",
      },
    },
    future_feature: {
      title: "Funcionalidad en desarrollo",
      description:
        "Estamos trabajando para permitir que los usuarios envíen correcciones o sugerencias sobre los datos de los vertederos directamente desde la aplicación.",
      button: "Entendido",
    },
    attributions: {
      title: "Créditos y atribuciones",
      body: {
        team: {
          title: "Equipo del Proyecto",
          org_desc: "Organización promotora",
          coord_role: "Coordinador",
          geo_role: "Geógrafa",
          dev_role: "Desarrollador informático",
        },
        data: {
          title: "Fuentes de Datos",
          text: "Datos del Inventario de Suelos de la CAPV proporcionados por <a href='https://www.geo.euskadi.eus/' target='_blank' class='font-semibold text-slate-800 hover:underline'>GeoEuskadi</a> e <a href='https://www.ihobe.eus/' target='_blank' class='font-semibold text-slate-800 hover:underline'>Ihobe</a>. Utilizados bajo licencia <a href='https://creativecommons.org/licenses/by/4.0/deed.es' target='_blank' class='text-emerald-600 font-medium hover:underline'>CC BY 4.0 Internacional</a>."
        },
        code: {
          title: "Tecnología e Infraestructura",
          osm: "© Colaboradores de OSM",
          leaflet: "Motor de mapas",
        },
      },
    },
    about: {
      hero: {
        badge: "Emergencia Medioambiental",
        title: "Vertederos abandonados<br/>en la CAPV",
        subtitle: "Una asignatura pendiente desde 2008",
      },
      chips: {
        code: "Código Fuente",
        credits: "Créditos",
      },
      stats: {
        intro:
          "El inventario de suelos que soportan o han soportado actividades o instalaciones potencialmente contaminantes tiene registrados un total de:",
        total_label: "Vertederos Totales",
        undocumented: "Sin documentar",
      },
      legal: {
        title: "Directivas Europeas",
        directive_name: "Directiva 2008/98/CE",
        directive_text:
          '"Los Estados miembros están obligados a garantizar que la gestión de residuos no ponga en peligro la salud humana".',
        compliance:
          'La Comisión Europea reconoce que <span class="font-bold text-slate-800 bg-slate-100 px-1 rounded">"España no ha adoptado las medidas necesarias"</span>. Persisten al menos 195 vertederos ilegales.',
      },
      impact: {
        title: "Impacto y Acción",
        problem:
          '<strong class="text-slate-800">Incumplimiento grave:</strong> Se ha detectado contaminación por HCH-lindano en ríos, afectando críticamente al estuario del Nervión-Ibaizabal.',
        goal_title: "Objetivo del Mapa",
        goal_text:
          'Visibilizar la situación para caracterizar los suelos, conocer afecciones y proceder a su <span class="font-semibold underline decoration-emerald-300">clausura y regeneración</span>.',
      },
    },
    misc: {
      landfill_count: "{{count}} vertederos",
    },
    contact: {
      title: "Contacto",
      subtitle: "Ante cualquier duda, ponte en contacto con nosotros",
      phone: "Teléfono",
      email: "Email",
      web: "Página web",
      close: "Cerrar",
    },
  },
  eu: {
    toolbar: {
      tools: "Tresnak",
      index: "Zabortegien aurkibidea",
      extractor: "Datu-erauzlea",
      search: "Bilaketa aurreratua",
      view: "Ikuspegia",
      show_no_info: "Ikusi informaziorik gabekoak",
      hide_no_info: "Ezkutatu informaziorik gabekoak",
      help: "Laguntza",
      attributions: "Aitortzak",
      about: "Proiektu honi buruz",
      tutorial: "Tutoriala",
      languages: "Hizkuntzak",
      basque: "Euskara",
      spanish: "Gaztelania",
      contact: "Kontaktua",
    },
    app: {
      menu: "Menua",
      search_placeholder: "Bilatu zabortegiak...",
      legend: "Legenda",
    },
    loading: {
      title: "Zabortegiak kargatzen...",
      subtitle:
        "Zabortegi guztien datuak deskargatzen ari gara. Baliteke segundo batzuk irautea.",
      hint: "Karga gehiegi luzatzen bada, freskatu orria.",
    },
    index: {
      header: {
        title: "Zabortegi aurkibidea",
        subtitle: "{{count}} zabortegi guztira",
        subtitle_q: "{{count}}tik {{found}} aurkitu dira",
      },
      not_found: "Bilaketa-irizpide hauekin ez dira zabortegirik aurkitu.",
    },
    search: {
      title: "Bilaketa",
      subtitle: "Zabortegiak aurkitu",
      placeholder_default:
        "Bilatu izenaren, udalerriaren edo IDaren arabera...",
      placeholder_collapsed: "Bilatu zabortegia...",
      aria_close: "Itxi panela",
      aria_clear: "Ezabatu bilaketa",
      results_title: "Emaitzak",
      keyboard_hint:
        "Erabili <kbd class='font-sans bg-slate-100 px-1 rounded'>↑</kbd> <kbd class='font-sans bg-slate-100 px-1 rounded'>↓</kbd> eta <kbd class='font-sans bg-slate-100 px-1 rounded'>Enter</kbd>",
      footer_esc:
        "Sakatu <kbd class='font-sans font-semibold'>Esc</kbd> ixteko",
      no_results: 'Ez dugu ezer aurkitu "{{query}}" bilaketarekin',
      start_typing: "Idatzi zabortegiak bilatzeko...",
      more_results: {
        title: "Ikusi emaitza gehiago aurkibidean",
        subtitle_filtered:
          "Ireki “{{query}}” bilaketarekin iragazitako aurkibidea",
        subtitle_all: "Ireki aurkibide osoa",
      },
    },
    legend: {
      title: "Legenda",
      subtitle: "Sinbologia eta arrisku mailak",
      risk_color: "Arrisku kolorea",
      risk_desc:
        'Zenbat eta gorriagoa, orduan eta arrisku handiagoa. <span class="font-semibold">Taupaka</span> ari diren ikurrak ikusten direnen artean arriskutsuenak dira.',
      clp_pictograms: "CLP piktogramak",
      clp_info:
        'CLP piktogramei buruzko informazio gehiago <a href="https://echa.europa.eu/es/regulations/clp/clp-pictograms" target="_blank" rel="noreferrer" class="text-emerald-700 underline">echa.europa.eu</a> webgunean.',
      items: {
        "clp-acute-toxicity": {
          label: "Toxikotasun akutua (GHS06)",
          note: "Intoxikazio larriak edo hilgarriak eragin ditzake esposizio laburretan.",
        },
        "clp-health-hazard": {
          label: "Osasunerako arriskua (GHS08)",
          note: "Arrisku kronikoak: minbizia, arnas-sentsibilizazioa, ondorioak organoetan...",
        },
        "clp-corrosive": {
          label: "Korrosiboa (GHS05)",
          note: "Ehunak suntsitu eta metalak korroditu ditzake.",
        },
        "clp-flammable": {
          label: "Sukoia (GHS02)",
          note: "Erraz erretzen da su-iturri batekin kontaktuan jartzean.",
        },
        "clp-environmental": {
          label: "Ingurumen-arriskua (GHS09)",
          note: "Oso toxikoa uretako organismoentzat, iraupen luzeko ondorioekin.",
        },
        "clp-irritant": {
          label: "Narritagarria / Kaltegarria (GHS07)",
          note: "Narritadura edo ondorio kaltegarri txikiak eragin ditzake.",
        },
      },
    },
    selection: {
      close: "Itxi",
      center_map: "Zentratu zabortegia mapan",
      see_photos: "Ikusi argazkiak ({{count}})",
      download_report: "Deskargatu PDF txostena",
      generating_report: "Txostena sortzen...",
      related_docs: "Erlazionatutako dokumentuak",
      add_suggestion: "Gehitu iradokizuna / zuzenketa",
      cards: {
        climate: {
          title: "Klima eta hidrologia",
          precip: "Urteko prezipitazioa",
          rain: "Euri baliagarria",
        },
        dimensions: {
          title: "Dimentsioak",
          surface: "Azalera",
          volume: "Bolumena",
          capacity: "Edukiera osoa",
          fill: "Betetze % (zenbatetsia)",
          unit_has: "Ha",
          unit_m3: "m³",
        },
        legal: {
          title: "Erabilera eta legezko egoera",
          status: "Legezko egoera",
          type: "Zabortegi mota",
          waste_type: "Hondakin motak",
          waste_desc: "Hondakinen deskribapena",
        },
        measures: {
          title: "Neurri zuzentzaileak",
        },
        risk: {
          title: "Arriskugarritasuna",
          global: "Arriskugarritasun orokorra",
          incomplete: "(datu osatugabeak)",
          no_data: "Daturik gabe",
          insufficient:
            "Fitxan ez dago arriskugarritasuna zehazteko nahikoa datu.",
          sections: {
            infra: "Azpiegitura",
            hydro: "Hidrologia",
            geology: "Geología",
            human: "Giza ingurunea",
            impacts: "Inpaktuak",
          },
        },
        more_info: {
          button: "Ikusi informazio gehiago",
        },
      },
      related_docs_modal: {
        title: "Erlazionatutako dokumentazioa",
        no_docs: "Ez dago dokumenturik eskuragarri",
        untitled: "Izenbururik gabeko dokumentua",
        open_new_tab: "Ireki fitxa berrian",
      },
      gallery: {
        count: "{{current}} / {{total}} irudia",
        close: "Itxi galeria",
      },
    },
    future_feature: {
      title: "Funtzionalitatea garatzen",
      description:
        "Lanean ari gara erabiltzaileek zabortegien datuei buruzko zuzenketak edo iradokizunak aplikaziotik zuzenean bidaltzeko aukera izan dezaten.",
      button: "Ulertuta",
    },
    attributions: {
      title: "Kredituak eta aitortzak",
      body: {
        team: {
          title: "Proiektuaren taldea",
          org_desc: "Erakunde sustatzailea",
          coord_role: "Koordinatzailea",
          geo_role: "Geografoa",
          dev_role: "Garatzaile informatikoa",
        },
        data: {
          title: "Datuen iturriak",
          text: "EAEko Lurzoru Inbentarioaren datuak <a href='https://www.geo.euskadi.eus/' target='_blank' class='font-semibold text-slate-800 hover:underline'>GeoEuskadi</a>-k eta <a href='https://www.ihobe.eus/' target='_blank' class='font-semibold text-slate-800 hover:underline'>Ihobe</a>-k emanak. <a href='https://creativecommons.org/licenses/by/4.0/deed.eu' target='_blank' class='text-emerald-600 font-medium hover:underline'>Nazioarteko CC BY 4.0</a> lizentziapean erabiliak."
        },
        code: {
          title: "Teknologiak eta azpiegiturak",
          osm: "© OSM-ko kolaboratzaileak",
          leaflet: "Mapa motorra",
        },
      },
    },
    about: {
      hero: {
        badge: "Ingurumen Larrialdia",
        title: "Utzitako zabortegiak<br/>EAEn",
        subtitle: "2008tik gainditu gabeko irakasgaia",
      },
      chips: {
        code: "Iturburu Kodea",
        credits: "Kredituak",
      },
      stats: {
        intro:
          "Kutsatzaileak izan daitezkeen jarduerak edo instalazioak jasan dituzten edo jasaten dituzten lurzoruen inbentarioak guztira honako hau erregistratu du:",
        total_label: "Zabortegi Guztira",
        undocumented: "Dokumentatu gabe",
      },
      legal: {
        title: "Europako Zuzentarauak",
        directive_name: "2008/98/CE Zuzentaraua",
        directive_text:
          '"Estatu kideek bermatu behar dute hondakinen kudeaketak ez duela giza osasuna arriskuan jartzen".',
        compliance:
          'Europako Batzordeak onartzen du <span class="font-bold text-slate-800 bg-slate-100 px-1 rounded">"Espainiak ez dituela beharrezko neurriak hartu"</span>. Legez kanpoko 195 zabortegi daude oraindik.',
      },
      impact: {
        title: "Eragina eta Ekintza",
        problem:
          '<strong class="text-slate-800">Ez-betetze larria:</strong> HCH-lindano bidezko kutsadura atzeman da ibaietan, eta horrek eragin kritikoa du Nerbioi-Ibaizabal itsasadarrean.',
        goal_title: "Maparen Helburua",
        goal_text:
          'Egoera ikusaraztea lurzoruak karakterizatzeko, afekzioak ezagutzeko eta haien <span class="font-semibold underline decoration-emerald-300">itxiera eta onbideratzea</span> bideratzeko.',
      },
    },
    contact: {
      title: "Kontaktua",
      subtitle: "Zalantzarik baduzu, jarri gurekin harremanetan",
      phone: "Telefonoa",
      email: "Emaila",
      web: "Weborria",
      close: "Itxi",
    },
    misc: {
      landfill_count: "{{count}} zabortegi",
    },
  },
};
