export default {
  toolbar: {
    tools: "Herramientas",
    index: "Índice de vertederos",
    extractor: "Extractor de datos",
    search: "Buscador avanzado",
    view: "Vista",
    sharing: "Compartir",
    copy_link: "Copiar enlace",
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
    media_explorer: "Explorador de medios"
  },
  app: {
    menu: "Menú",
    search_placeholder: "Buscar vertederos...",
    legend: "Leyenda",
    title: "Mapa de Vertederos"
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
    add_correction: "Añadir corrección",
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
      "Estamos trabajando para implementar esta característica. Pronto podrás acceder a más herramientas.",
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
        text: "Datos del Inventario de Suelos de la CAPV proporcionados por <a href='https://www.geo.euskadi.eus/' target='_blank' class='font-semibold text-slate-800 hover:underline'>GeoEuskadi</a> e <a href='https://www.ihobe.eus/' target='_blank' class='font-semibold text-slate-800 hover:underline'>Ihobe</a>. Utilizados bajo licencia <a href='https://creativecommons.org/licenses/by/4.0/deed.es' target='_blank' class='text-emerald-600 font-medium hover:underline'>CC BY 4.0 Internacional</a>.",
      },
      code: {
        title: "Tecnología e Infraestructura",
        osm: "© Colaboradores de OSM",
        leaflet: "Motor de mapas",
      },
    },
  },
  about: {
    tabs: {
      announcements_title: "Avisos",
      announcements: {
        no_active_announcements: "No hay avisos activos actualmente.",
      },
      whats_new: "Novedades",
      project_info: "Proyecto",
    },
    hero: {
      badge: "Emergencia Medioambiental y de Salud Pública",
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
      contaminated_soils: "Presiones",
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
    accordion: {
      whats_new: "Cambios al mapa",
      new_excl: "¡Novedades!",
      project_info: "Información del Proyecto",
    },
    announcements: {
      share: "Compartir",
      mentioned_in: "Mencionado en"
    },
    widget: {
      countdown: {
        finished: "Plazo finalizado",
        days: "Días",
      },
      gallery: {
        title: "Galería de imágenes",
        see: "Ver galería ({{count}} imágenes)"
      }
    }
  },
  clock: {
    label: "Fin de legislatura",
    days: "Días",
    hours: "H",
    mins: "Min",
    secs: "Seg"
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
  share: {
    defaultMessage:
      "Mira este mapa de vertederos en Euskadi: Utzitako zabortegiak EAEn - 2008tik gainditu gabeko irakasgaia",
    bluesky:
      "Mira este mapa de vertederos en Euskadi #Zabortegiak #EkologistakMartxan",
  },
  tutorial: {
    title: "Tutorial",
    previous: "Anterior",
    next: "Siguiente",
    start: "Empezar"
  },
  media_explorer: {
    title: "Explorador de medios",
    subtitle: "{{count}} archivos encontrados",
    search_placeholder: "Buscar por título, tipo o contexto...",
    all_files: "Todos los archivos",
    image_context_label: "Fotos de Informes",
    document_context_label: "Documentación Oficial",
    announcement_context_label: "Archivos de Avisos",
    image_label: "Imágenes",
    document_label: "Documentos PDF",
    items_count: "{{count}} archivos",
    load_more: "{{count}} archivos por cargar",
    toggle_sort_direction: "Cambiar dirección de ordenamiento"
  }
}