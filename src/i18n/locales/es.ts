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
  list: {
    header: {
      title: "Índice de Vertederos",
      subtitle: "{{count}} vertederos totales",
      subtitle_q: "{{found}} encontrados de {{count}}",
    },
    no_risk_score: "Sin puntuación",
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
  changelog: {
    show_development_versions: "Mostrar versiones en desarrollo",
    in_development: "En Desarrollo",
    new: "Nuevo",
    upcoming: "Próximamente",
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
  details: {
    full_details: {
      title: "Todos los datos del vertedero",
      no_data: "No hay datos técnicos adicionales registrados para este vertedero.",
      loading: "Cargando datos completos..."
    },
    loading: "Cargando datos del vertedero...",
    close: "Cerrar",
    center_map: "Centrar vertedero en el mapa",
    see_photos: "Ver fotos ({{count}})",
    see_more: "Ver más",
    see_less: "Ver menos",
    generating_report: "Generando informe...",
    legacy_report: "Informe Legacy",
    legacy_report_tooltip: "Descargar informe original",
    legacy_documents_notice: "Los documentos originales están disponibles para descarga en la aplicación.",
    no_historic_territory: "Sin territorio histórico asignado",
    related_docs: "Documentos relacionados",
    add_correction: "Añadir corrección",
    no_images: "No hay imágenes disponibles",
    cards: {
      no_data: "Sin información",
      ownership: {
        title: "Titularidad y Propiedad",
        protected_title: "Información Protegida",
        protected_desc: "El nombre del titular se ha ocultado por defecto para garantizar la privacidad, al haber sido clasificado como persona física o ser desconocido.",
        no_name: "Sin nombre",
        heuristic: "Dato Estimado",
        report_protected: "¿Es una empresa? Solicitar desocultación",
        report_public: "¿Contiene datos privados? Solicitar revisión",
      },
      climate: {
        title: "Clima e hidrología",
      },
      dimensions: {
        title: "Dimensiones",
        unit_ha: "Ha",
        unit_m3: "m3",
      },
      legal: {
        title: "Uso y situación legal",
      },
      measures: {
        title: "Medidas correctoras",
      },
      risk: {
        title: "Peligrosidad",
        incomplete: "(datos incompletos)",
        no_data: "Sin dato",
        insufficient:
          "No hay datos suficientes en la ficha para desglosar la peligrosidad.",
        clp_alt: "Símbolo de peligrosidad"
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
  folder_explorer: {
    title: "Explorador de carpetas",
    search_placeholder: "Buscar en carpetas...",
    no_results: "No se encontraron ficheros",
    empty_folder: "Esta carpeta está vacía.",
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
    toggle_sort_direction: "Cambiar dirección de ordenamiento",
    loading: "Cargando archivos multimedia..."
  },
  domain: {
    boolean: {
      yes: "Sí",
      no: "No",
    },
    entities: {
      landfill_summary: {
        name_placeholder: "Sin nombre",
        municipality_placeholder: "Sin municipio",
        code_placeholder: "Sin código"
      },
      landfill_details: {
        title: "Detalles del vertedero",
        parcel_id: "Nº de parcela",
        code: "Código del vertedero",
        name: "Nombre del vertedero",
      },
      landfill_version: {
        status: {
          title: "Estado de la versión",
          types: {
            active: "Última versión",
            archived: "Archivada",
            pending: "Pendiente de aprobación"
          }
        }
      }
    },
    vos: {
      risks: {
        title: "Riesgos",
        global: "Global",
        infra: "Infraestructura",
        hydro: "Hidrología",
        geo: "Geología",
        social: "Social",
        impacts: "Impactos"
      },
      location: {
        title: "Localización",
        historic_territory: {
          title: "Territorio histórico",
          types: {
            araba: "Araba",
            bizkaia: "Bizkaia",
            gipuzkoa: "Gipuzkoa"
          }
        },
        zip_code: "Código postal",
        municipality_group_name: "Mancomunidad",
        municipality_name: "Municipio",
        address: "Dirección",
        is_accessible: "Es accesible?",
        watershed: "Cuenca",
        toponymy: "Toponimia",
        toponymy_source: "Fuente de la toponimia",
        dimensions: {
          title: "Dimensiones",
          surface_ha: "Superficie",
          volume_m3: "Volumen",
          expected_total_capacity_m3: "Capacidad total prevista",
          landfill_height: "Altura",
          fill_percent: "Porcentaje de llenado",
        },
        accesses_up_to_entrance: {
          title: "Accesos hasta la entrada",
          types: {
            passable_forest_trail: "Pista forestal practicable",
            urban_area: "Zona urbana",
            factory_access: "Acceso por fábrica",
            impassable_forest_trail: "Pista forestal impracticable",
            other: "Otros"
          }
        },
        accesses: {
          title: "Accesos al propio vertedero",
          types: {
            free_access: "Acceso libre",
            fenced_off: "Vallado",
            partially_fenced: "Vallado parcial",
            impassable_fencing: "Vallado impracticable",
            security_service: "Servicio de vigilancia",
            chained: "Cadena",
            impassable_due_to_overgrowth: "Impracticable por maleza",
            impassable_due_to_slope_toe: "Impracticable pie de talud",
            unleashed_dogs: "Perros sueltos",
            other: "Otros"
          }
        },
        cartographies: "Cartografía"
      },
      operation: {
        title: "Explotación",
        classified_activity_record_number: "Nº de expediente de actividad clasificada",
        property_type: "Tipo de propiedad",
        holder: "Propietario",
        contact: "Contacto",
        address: "Dirección",
        phone_number: "Nº de teléfono",
        legal_status: {
          title: "Estado legal",
          types: {
            not_authorized: "No Autorizado",
            unknown: "Desconocido",
            authorized: "Autorizado",
            sub_judice: "En Trámite"
          }
        },
        ownership: {
          ownership_types: {
            types: {
              private_individual: "Privada individual",
              private_company: "Empresa privada",
              public_municipal: "Pública municipal",
              public_mancomunidad: "Pública de mancomunidad",
              public_provincial: "Pública provincial",
              public_regional: "Pública autonómica",
              public_state: "Pública estatal",
              unknown: "Desconocido"
            }
          }
        },
        license_characteristics: {
          title: "Características de la licencia",
          types: {
            no_license: "Sin licencia",
            other: "Otros",
            earthwork_infill: "Relleno de tierras",
            non_hazardous_landfill: "Vertedero de residuos no peligrosos",
            c_and_d_inert_landfill: "Vertedero de residuos inertes de construcción",
            terrain_remodeling: "Acondicionamiento de terreno",
            inert_industrial_landfill: "Vertedero de residuos industriales inertes",
            inertized_hazardous_landfill: "Vertedero de residuos peligrosos inertizados"
          }
        },
        equipment_installation_date: "Fecha de instalación del equipamiento",
        equipment: "Equipo",
        activity_start_date: "Fecha de inicio de actividad",
        activity_end_date: "Fecha de cese de actividad",
        years_operating: "Años operando",
        landfill_type: {
          title: "Tipo de vertedero",
          types: {
            inert: "Inerte",
            industrial: "Industrial",
            urban: "Urbano",
            co_disposal: "Codisposición",
            dumping_source: "Foco de Vertido",
            dumps: "Escrombrera",
            unknown: "Desconocido"
          }
        },
        waste_legal_category: {
          title: "Categoría legal de los residuos",
          types: {
            no_hazardous: "No peligrosos",
            inert: "Inertes",
            hazardous: "Peligrosos"
          }
        },
        waste_type: {
          title: "Tipo de residuos",
          types: {
            building: "Construcción",
            fit_for_backfilling: "Aptos para Relleno",
            inert_industrial: "Industriales Inertes",
            inertizied: "Inertizados",
            generic: "Genericos"
          }
        },
        waste_components: {
          title: "Componentes entre los residuos",
          types: {
            no_waste_observed: "Sin componentes observados",
            earth_and_rocks: "Tierras y rocas",
            construction_debris: "Escombro de obras",
            pesticides_and_pops: "Pesticidas y COPs",
            oils_and_fats: "Aceites y grasas",
            sludges_and_ashes: "Lodos y cenizas",
            metallurgical_waste: "Residuos metalúrgicos",
            tyres_and_rubber: "Gomas y ruedas",
            paints_and_solvents: "Pinturas y disolventes",
            wood_and_vegetation: "Madera y vegetación",
            paper_and_cellulose: "Papel y celulosa",
            urban_waste_rsu: "Residuos urbanos",
            asbestos_uralite: "Amianto",
            drums_and_containers: "Bidones y contenedores",
            liquids: "Líquidos",
            other: "Otros",
            powder_waste: "Polvo"
          }
        },
        waste_description: "Descripción de los residuos",
        grading: {
          title: "Granulometría",
          types: {
            heterometric: "Heterométrico",
            sands: "Arenas",
            clays: "Arcillas",
            boulders: "Bloques",
            gravels: "Gravas",
            pebbles: "Bolos"
          }
        },
        waste_source_company: "Compañía origen de los residuos",
        occurred_incident: "Incidentes ocurridos",
        waste_layout: {
          title: "Disposición del vertido",
          types: {
            on_a_slope: "En ladera",
            in_a_thalweg: "En vaguada",
            on_a_plain: "En llanura",
            quarry_backfill: "Rellenando de hueco de cantera",
            adjacent_to_watercourse: "Junto a curso agua superficial",
            flood_zone: "Zona inundable",
            mixed: "Mezclados",
            in_segregated_areas: "En zonas diferenciadas",
            near_populated_areas: "Junto zonas habitadas",
            prograding: "Progradante"
          }
        },
        deposit_shapes: {
          title: "Forma del depósito",
          types: {
            platform_with_steep_slope: "Plataforma con gran talud",
            small_piles: "Pequeños montones",
            uniform_pile: "Montón homogéneo",
            benches: "Bancadas",
            several_working_faces: "Varios frentes",
            fan_shaped: "En abanico"
          }
        }
      },
      infrastructure: {
        title: "Infraestructura del vertedero",
        underground_channeling_state: "Canalizaciones Subterraneas",
        underground_channeling_type: {
          title: "Tipo de canalizaciones subterráneas",
          types: {
            other: "Otras",
            leached: "Lixiado",
            sanitary: "Sanitarias"
          }
        },
        hired_personnel: "Personal contratado",
        existing_machinery: {
          title: "Maquinaria existente",
          types: {
            frequent: "Máquina empujadora y/o retroexcavadora y/o compactadora",
            sporadically: "Esporádicamente máquina empujadora y/o retroexcavadora",
            none: "Ninguna"
          }
        },
        stormwater_management: "Recogida y canalización de aguas de lluvia y escorrentía",
        leachate_sampling_points_state: "Arquetas de toma de muestras de lixiviados",
        bed_waterproofing_state: "Impermeabilización del lecho",
        side_waterproofing_state: "Impermeabilización lateral",
        peripheral_enclosure_state: "Cerramiento periférico",
        hedge_state: "Pantalla vegetal",
        operation_plan_state: "Plan de explotación",
        closing_plan_state: "Plan de clausura"
      },
      fauna_and_vegetation: {
        title: "Fauna y vegetación",
        vegetation_cover: "Cubierta vegetal del vertedero",
        vegetation_cover_description: "Descripción de la Cubierta",
        environment_vegetation: {
          title: "Vegetación del entorno",
          types: {
            forest_plantations: "Plantaciones forestales",
            atlantic_meadows_and_crops: "Prados y cultivos atlánticos",
            broadleaf_patches: "Manchas frondosas",
            broadleaf_forest: "Bosques frondosos",
            cereal_crops: "Cultivos de cereal",
            potato_and_beet_crops: "Patata y remolacha",
            strawberry_tree_shrubland: "Bortal",
            gallery_forest: "Bosque en galería",
            fern_field: "Helechal",
            gorse_shrubland: "Argomal",
            market_gardens: "Huertas",
            fruit_trees: "Frutales",
            tall_grassland: "Lastonar"
          }
        },
        fauna_type: {
          title: "Fauna",
          types: {
            avifauna: "Avifauna",
            small_vertebrates: "Pequeños vertebrados",
            livestock: "Ganado",
            large_vertebrates: "Grandes vertebrados",
            rodents: "Roedores"
          }
        }
      },
      hydrology: {
        title: "Hidrología",
        annual_precipitation: "Precipitación anual",
        effective_rainfall: "Lluvia útil",
        drainage_system: "Red de drenaje",
        near_water_abstraction: "Captación de aguas próximas",
        distance_to_nearest_watercourse: "Distancia al cauce más cercano",
        water_abstraction_type: "Tipo de Captación",
        stream_direction: {
          title: "Aguas",
          types: {
            upstream: "Arriba",
            downstream: "Abajo",
            unknown: "Desconocido"
          }
        },
        distance: "Distancia",
        crossing_watercourse_state: "Cauce que atraviesa el vertedero",
        underlying_watercourse_state: "Cauce subyacente al vertedero",
        streamName: "Nombre del Arroyo"
      },
      geology: {
        title: "Geología",
        lithologycal_and_lithostratigraphycal_units: "Unidades litológicas y litoestratigráficas",
        superficial_deposit: {
          title: "Formaciones superficiales",
          types: {
            none: "No",
            eluvium: "Eluvial",
            alluvium: "Aluvial",
            artificial_backfilling: "Rellenos artificiales",
            colluvium: "Coluvial",
            fluvio_marine: "Fluviomarino",
            mixed_or_polygenic: "Mixto o poligénico",
            alluviocolluvium: "Aluviocoluvial",
            karst: "Kárstico",
            marine: "Marino",
            unknown: "Desconocido"
          }
        },
        regolith_thickness: "Espesor de regolito",
        soil_type: {
          title: "Tipo de suelo",
          types: {
            dystric_cambisol: "Cambisol dístrico",
            no_soil: "Sin suelo",
            eutric_cambisol: "Cambisol éutrico"
          }
        },
        morphology: {
          title: "Morfología",
          types: {
            slope: "Ladera",
            thalweg: "Vaguada",
            plain: "Llanura",
            quarry_hole: "Hueco de cantera",
            floodplain: "Llanura de inundación",
            riverbed: "En cauce fluvial",
            chasm: "Sima o dolina",
          }
        },
        permeability_level: "Nivel de permeabilidad",
        permeability_reason: {
          title: "Razón de la permeabilidad",
          types: {
            for_porosity: "Porosidad",
            for_cracking: "Fisuración"
          }
        }
      },
      hydrogeology: {
        title: "Hidrogeología",
        aquifer_type: {
          title: "Tipo de acuífero",
          types: {
            low_permeability_system: "Sistema de baja permeabilidad",
            no_aquifer: "Sin acuífero asociado",
            not_consolidated_detrital: "Detrítico no consolidado",
            strict_direction_karstic: "Kárstico sentido estricto",
            mixed_karstic: "Kárstico mixto",
            consolidated_detrital: "Detrítico consolidado",
            mixed_detrital: "Detrítico mixto",
            diffused_flow_karstic: "Kárstico flujo difuso"
          }
        },
        estimated_depth: "Profundidad estimada",
        estimated_stream_direction: "Dirección de flujo estimada",
        vulnerability_level: "Nivel de vulnerabilidad",
        hydrogeologycal_unit: "Unidad Hidrogeológica"
      },
      geotechnique_characteristics: {
        title: "Características geotécnicas",
        hillside_slope: "Pendientes de la ladera",
        slope_instability_processes: {
          title: "Procesos de inestabilidad en ladera",
          types: {
            no: "No",
            slidings: "Deslizamientos",
            landslides: "Desprendimientos",
            downhill_creep: "Reptaciones",
            avalanche: "Avalanchas o coladas de barro"
          }
        },
        waste_mass_stability_level: "Estabilidad de la masa de vertido",
        flood_potential: {
          title: "Inundabilidad",
          types: {
            no: "No",
            t10: "Dentro del límite del periodo de retorno de 10 años",
            other: "Otros",
            t100: "Dentro del límite del periodo de retorno de 100 años",
            t500: "Dentro del límite del periodo de retorno de 500 años"
          }
        },
        erodibility_level: "Nivel de erosionabilidad",
        structural_discontinuities: "Discontinuidad y factores estructurales",
        covering_state: "Cubrición",
        land_covering_type: {
          title: "Tipo de cubrición",
          types: {
            soil: "Tierra",
            construction: "Construcción",
            concrete: "Hormigon",
            sealed: "Sellado"
          }
        },
        land_covering_description: "Descripción de la cubrición",
        covering_material_state: "Disponibilidad de materiales de cubrición",
        covering_material_description: "Descripción de materiales de cubrición",
        effect_on_existing_structures_state: "Afecciones a estructuras existentes",
        elements_undergo_slipping_state: "Elementos que pueden sufrir deslizamientos"
      },
      humanAndSocialEnvironment: {
        title: "Medio humano y social",
        surrounding_population: "Población circundante",
        distance_to_houses_or_recreation: "Distancia a viviendas o zonas de esparcimiento",
        near_houses_count: "Nº de viviendas próximas",
        usage_status_types: {
          public_open_spaces: "General de espacios libres",
          other: "Otros",
          industrial: "Industrial",
          agricultural_use: "Explotación Agricola",
          residential: "Residencial",
          open_spaces: "Espacios libres",
          multi_family_housing: "Vivienda colectiva",
          commercial: "Terciario",
          sports: "Deportivo",
          infrastructure: "Infraestructuras",
          educational: "Docente",
        },
        current_usage_status: "Usos actuales del suelo del vertedero",
        current_usage_description: "Descripción de usos actuales",
        future_usages: "Usos futuros del suelo del vertedero",
        water_usage_types: {
          no_use: "Sin Uso",
          other: "Otros",
          agriculture_ranching_industrial: "Agricultura, Ganadería o Industrial",
          potable: "Potable",
          watering: "Riego"
        },
        surface_water_usage: "Usos del agua superficial en el entorno",
        ground_water_usage: "Usos del agua subterránea en el entorno",
        urban_clasification: {
          title: "Clasificación urbanística",
          types: {
            not_developable: "No Urbanizable",
            developable: "Urbanizable",
            urban: "Urbano"
          }
        },
        urban_calification: {
          title: "Calificación urbanística",
          types: {
            rural_settlements_on_not_developable: "Núcleos rurales en S.N.U.",
            urban_for_economic: "Urbano para actividades económicas",
            scheduled_developable_for_economic: "Urbanizable programado para actividades económicas",
            gs_open_spaces: "Sistema general de espacios libres",
            economic_on_not_developable: "Actividades económicas en S.N.U.",
            extractive_activities: "Actividades extractivas",
            residential_urban: "Urbano residencial",
            scheduled_developable_for_residential: "Urbanizable programado residencial",
            gs_t_and_c: "Sistema general de transportes y comunicaciones",
            gs_public_facilities: "Sistema general de equipamientos",
            unscheduled_developable_for_residential: "Urbanizable N.P. residencial",
            unscheduled_developable_for_economic: "Urbanizable N.P. para actividades económicas",
            gs_basic_infrastructure: "Sistema general de infraestructuras básicas"
          }
        }
      },
      otherImpacts: {
        title: "Otras Afecciones e Impactos",
        impact_description: "Descripción del Impacto",
        natural_heritage_state: "Patrimonio natural",
        bad_smells: "Malos olores",
        particle_emission_state: "Emisión de partículas",
        particle_description: "Descripción de las partículas",
        heavy_vehicle_traffic_state: "Circulación de vehículos pesados",
        rodent_and_insect_presence_state: "Presencia de roedores e insectos",
        periodic_situation_impacts_state: "Impactos derivados de situaciones episódicas",
        exploitation_loss_state: "Pérdida de aprovechamientos",
        cultural_heritage_state: "Patrimonio cultural",
        effects_and_impacts_level: "Nivel de las afecciones e impactos",
        environment_visual_basin_level: "Nivel de la cuenca visual del entorno",
        where_its_seen_from: "Desde donde se ve el vertedero",
        fires_state: "Incendios",
        fires_cause: "Motivos de los incendios",
        fires_frequency: "Frecuencia de los incendios",
        paper_and_plastic_flights: "Vuelo de papeles y/o plásticos"
      },
      correcting_measures: {
        title: "Medidas correctoras",
        measures: {
          title: "Medidas correctoras",
          types: {
            waste_removal_management: "Retirada y gestión de residuos",
            surface_drainage: "Drenaje superficial",
            leachate_c_and_d_systems: "Sistemas para recoger y evacuar lixiviados",
            surface_sealing: "Sellado superficial",
            in_situ_stabilization: "Estabilización in situ",
            gas_collection: "Captación de gases",
            physical_chem_treatment: "Tratamiento físico-químico",
            impermeable_barriers: "Pantallas impermeables",
            groundwater_drainage: "Drenaje de aguas subterráneas",
            biological_treatment: "Tratamiento biológico",
            other: "Otras medidas"
          }
        },
        description: "Descripción",
        source: "Fuentes",
        other: "Otros"
      },
      sampling: {
        title: "Muestreo",
        description: "ID",
        description_placeholder: "Muestreo nº {{count}}",
        date: "Fecha",
        sampling_type: {
          title: "Tipo de muestreo",
          types: {
            surface_water: "Agua superficial",
            leachate: "Lixiviado",
            soil: "Suelo",
            ground_water: "Agua subterránea",
            waste: "Residuo",
            sediment: "Sedimento",
            air: "Aire",
            other: "Otros"
          }
        },
        location: "Descripción y localización",
        results: {
          parameters: "Parámetros",
          sample_matrix: {
            title: "Matrices",
            types: {
              unknown: "Desconocido",
              lixiviate: "Lixiviado",
              solid: "Sólido"
            }
          },
          results: "Resultados",
          legal_limits: "Límites Legales",
          no_results: "No se han registrado analíticas para este muestreo."
        }
      },
      studies: "Estudios realizados",
      multimedia: {
        doc: {
          title: "Documentación relacionada",
          description_placeholder: "Documento sin título",
          open: "Abrir en nueva pestaña"
        }
      },
      inspection_state_types: {
        yes: "Sí",
        no: "No",
        unknown: "Desconocido"
      },
      magnitude_level_types: {
        insignificant: "No apreciable",
        very_low: "Muy bajo",
        low: "Bajo",
        mid: "Medio",
        high: "Alto",
        very_high: "Muy alto"
      }
    }
  },
  tutorial_selection: {
    title: "Selecciona un Tutorial",
    subtitle: "Elige una guía interactiva para aprender a usar las distintas secciones de la plataforma.",
    onboarding_title: "Guía de Inicio Rápido",
    onboarding_desc: "Aprende a navegar por el mapa, utilizar los filtros, consultar el listado y entender la leyenda.",
    full_details_title: "Expediente Completo",
    full_details_desc: "Descubre el funcionamiento de la nueva ficha dinámica: historial de versiones, riesgos detallados, medidas correctoras y análisis químicos.",
    btn_start: "Comenzar",
    btn_cancel: "Cancelar"
  },
  gallery: {
    title_placeholder: "Galería de imágenes sin título"
  }
}