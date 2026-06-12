export default {
    toolbar: {
        tools: "Tresnak",
        index: "Zabortegien aurkibidea",
        extractor: "Datu-erauzlea",
        search: "Bilaketa aurreratua",
        view: "Ikuspegia",
        sharing: "Partekatu",
        copy_link: "Esteka kopiatu",
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
        media_explorer: "Media esploratzailea"
    },
    app: {
        menu: "Menua",
        search_placeholder: "Bilatu zabortegiak...",
        legend: "Legenda",
        title: "Zabortegien Mapa"
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
        no_risk_score: "Puntuaziorik gabe",
        not_found: "Bilaketa-irizpide hauekin ez dira zabortegirik aurkitu.",
    },
    search: {
        advanced: {
            landfills: "zabortegi",
            active_filters: "Iragazki aktiboak",
            active: "Bilaketa aktibatuta",
            selected: "hautatuta",
            title: "Bilaketa aurreratua",
            expected_format: "Esperotako formatua",
            digits: "digitu",
            example: "adib",
            or: "edo",
            description: "Gurutzatu inbentarioko eremu guztiak zabortegi espezifikoak aurkitzeko.",
            inputs: {
                ti_placeholder: "Idatzi bilatzeko...",
                null: "Nulu",
                ignore: "Baztertu",
                no_data: "Daturik ez?",
                rotate: "Klikatu aldatzeko",
                searching_for_null: " Datu hori ez duten zabortegiak bilatzen... "
            },
            sections: {
                title: "Atalak",
                has_samples: "Laginketarik du?",
                has_studies: "Azterlanik du?",
                has_multimedia: "Multimediarik du?",
                general: "Orokorra",
                location: "Kokapena",
                operation: "Uztiapena",
                risks: "Arriskuak",
                infrastructure: "Infraestruktura",
                natural_medium: "Ingurune naturala",
                human_medium: "Giza ingurunea",
                impacts_measures: "Inpaktua eta neurriak"
            },
            clear: "Garbitu",
            results: "emaitza",
            search: "Bilatu"
        },
        clear_advanced: "Bilaketa aurreratua garbitu",
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
    extractor: {
        title: "Datu-erauzlea",
        description: "Konfiguratu eta deskargatu inbentarioko datuak zure neurrira.",
        steps: {
            landfills: "1. Zabortegiak",
            fields: "2. Eremuak",
            format: "3. Formatua",
        },
        landfills: {
            choose_scope: "1. Zabortegien esparrua",
            all: "Zabortegi guztiak",
            all_desc: "Aktibo dagoen inbentario osoa esportatzen du.",
            filtered: "Iragazki aktiboa",
            filtered_desc: "Bilaketaren emaitzak.",
            no_active_filter: "Ez dago bilaketa aktiborik.",
            manual: "Eskuzko hautapena",
            manual_desc: "Markatu nahi dituzunak banan-banan.",
        },
        select_all: "Hautatu denak",
        deselect_all: "Desmarkatu denak",
        fields: {
            choose: "2. Hautatu sartu nahi dituzun eremuak",
            selected: "eremu hautatuta",
        },
        format: {
            choose: "3. Formatuaren konfigurazioa",
            csv_desc: "Egokia Excel edo kalkulu-orrietarako.",
            json_desc: "Datu-formatu hierarkiko gordina.",
            geojson_desc: "Mapako geometriak txertatutako datuekin.",
            csv_options: "CSV-aren aukerak",
            delimiter: "Zutabeen bereizlea",
            comma: "Koma (,)",
            semicolon: "Puntu eta koma (;)",
            header_labels: "Goiburuko izenak",
            translated: "Itzulita",
            technical: "Teknikoak (db)",
        },
        validation: {
            no_landfills: "Ez dago hautatutako zabortegirik",
            no_landfills_desc: "Itzuli 1. urratsera eta hautatu esportatu nahi dituzun zabortegiak.",
            no_fields: "Ez dago hautatutako eremurik",
            no_fields_desc: "Itzuli 2. urratsera eta markatu gutxienez inbentarioko eremu bat.",
        },
        buttons: {
            back: "Atzera",
            next: "Jarraitu",
            exporting: "Esportatzen...",
            download: "Deskargatu",
            export_shortcut: "Esportatu",
        },
        error_exporting: "Errorea datuak esportatzean.",
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
    details: {
        full_details: {
            title: "Zabortegiaren datu guztiak",
            no_data: "Ez dago zabortegi honetarako erakusteko daturik.",
            loading: "Datu guztiak kargatzen..."
        },
        loading: "Zabortegiaren datuak kargatzen...",
        close: "Itxi",
        center_map: "Zentratu zabortegia mapan",
        see_photos: "Ikusi argazkiak ({{count}})",
        see_more: "Ikusi gehiago",
        see_less: "Ikusi gutxiago",
        download_report: "Deskargatu PDF txostena",
        legacy_report: "Legacy txostena",
        legacy_report_tooltip: "Deskargatu jatorrizko txostena",
        export_data: "Zabortegiaren datuak esportatu",
        export_data_tooltip: "Datu-erauzlean ireki",
        legacy_documents_notice: "Jatorrizko dokumentuak deskargatzeko eskuragarri daude aplikazioan.",
        no_historic_territory: "Lurralde historikorik esleitu gabe",
        related_docs: "Erlazionatutako dokumentuak",
        add_correction: "Gehitu zuzenketa",
        no_images: "Ez dago argazkirik eskuragarri",
        cards: {
            no_data: "Informaziorik gabe",
            ownership: {
                title: "Titularitatea eta Jabetza",
                protected_title: "Informazio Babestua",
                protected_desc: "Titularraren izena ezkutatu egin da pribatutasuna bermatzeko, pertsona fisiko gisa sailkatua izan delako edo ezezaguna delako.",
                no_name: "Izenik gabe",
                heuristic: "Estimatutako Datua",
                report_protected: "Enpresa bat da? Erakusteko eskatu",
                report_public: "Datu pribatuak ditu? Berrikuspena eskatu",
            },
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
                fill: "Betetze ehunekoa",
                unit_has: "Ha",
                unit_m3: "m³",
            },
            legal: {
                title: "Erabilera eta legezko egoera",
                status: "Legezko egoera",
                landfill_type: "Zabortegi mota",
                waste_legal_category: "Hondakinaren legezko kategoria",
                waste_type: "Hondakin motak",
                waste_desc: "Hondakinen deskribapena",
            },
            measures: {
                title: "Neurri zuzentzaileak",
            },
            risk: {
                incomplete: "(datu osatugabeak)",
                no_data: "Daturik gabe",
                insufficient:
                    "Fitxan ez dago arriskugarritasuna zehazteko nahikoa datu.",
                clp_alt: "Arriskugarritasun sinboloa"
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
            "Ezaugarri hau ezartzeko lanean ari gara. Laster herraminta gehiago izango dituzu.",
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
                text: "EAEko Lurzoru Inbentarioaren datuak <a href='https://www.geo.euskadi.eus/' target='_blank' class='font-semibold text-slate-800 hover:underline'>GeoEuskadi</a>-k eta <a href='https://www.ihobe.eus/' target='_blank' class='font-semibold text-slate-800 hover:underline'>Ihobe</a>-k emanak. <a href='https://creativecommons.org/licenses/by/4.0/deed.eu' target='_blank' class='text-emerald-600 font-medium hover:underline'>Nazioarteko CC BY 4.0</a> lizentziapean erabiliak.",
            },
            code: {
                title: "Teknologiak eta azpiegiturak",
                osm: "© OSM-ko kolaboratzaileak",
                leaflet: "Mapa motorra",
            },
        },
    },
    about: {
        tabs: {
            announcements_title: "Oharrak",
            announcements: {
                no_active_announcements: "Une honetan ez dago ohar aktiborik.",
            },
            whats_new: "Berriak",
            project_info: "Proiektua",
        },
        hero: {
            badge: "Ingurumen eta Osasun Publiko Larrialdia",
            title: "Utzitako zabortegiak EAEn",
            subtitle: "2008tik gainditu gabeko irakasgaia",
        },
        chips: {
            code: "Iturburu Kodea",
            credits: "Kredituak",
        },
        stats: {
            intro:
                "Kutsatzaileak izan daitezkeen jarduerak edo instalazioak jasan dituzten edo jasaten dituzten lurzoruen inbentarioak guztira honako hau erregistratu du:",
            contaminated_soils: "Presio",
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
        accordion: {
            whats_new: "Maparen aldaketak",
            new_excl: "Berriak!",
            project_info: "Proiektuaren Informazioa",
        },
        announcements: {
            share: "Partekatu",
            mentioned_in: "Aipatua"
        },
        widget: {
            countdown: {
                finished: "Epea amaituta",
                days: "Egun",
            },
            gallery: {
                title: "Irudi galeria",
                see: "Ikusi galeria ({{count}} irudi)",
            }
        }
    },
    changelog: {
        show_development_versions: "Erakutsi garapen-bertsioak",
        in_development: "Garapenean",
        new: "Berria",
        upcoming: "Laster"
    },
    folder_explorer: {
        title: "Karpeta Bilatzailea",
        search_placeholder: "Bilatu karpetetan...",
        no_results: "Ez da fitxategirik aurkitu",
        empty_folder: "Karpeta hau hutsik dago.",
    },
    clock: {
        label: "Legegintzaldiaren amaiera",
        days: "Egun",
        hours: "H",
        mins: "Min",
        secs: "Seg"
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
    share: {
        defaultMessage:
            "Begiratu EAEn dauden zabortegien mapa hau: Utzitako zabortegiak EAEn - 2008tik gainditu gabeko irakasgaia",
        bluesky: "Begiratu EAEn dauden zabortegien mapa hau {{hashtags}}",
    },
    tutorial: {
        title: "Tutoriala",
        previous: "Aurrekoa",
        next: "Hurrengoa",
        start: "Hasi"
    },
    media_explorer: {
        title: "Media esploratzailea",
        subtitle: "{{count}} fitxategi aurkituta",
        search_placeholder: "Izenaren, zabortegiaren edo albistearen arabera bilatu...",
        all_files: "Fitxategi guztiak",
        image_context_label: "Txostenetako Argazkiak",
        document_context_label: "Dokumentazio Ofiziala",
        announcement_context_label: "Oharren Fitxategiak",
        image_label: "Irudiak",
        document_label: "PDF Dokumentuak",
        items_count: "{{count}} fitxategi",
        load_more: "{{count}} fitxategi kargatzeko",
        toggle_sort_direction: "Ordenatzeko norabidea aldatu",
        loading: "Multimedia fitxategiak kargatzen..."
    },
    domain: {
        boolean: {
            yes: "Bai",
            no: "Ez",
        },
        entities: {
            landfill_summary: {
                name_placeholder: "Izenik gabe",
                municipality_placeholder: "Herririk gabe",
                code_placeholder: "Koderik gabe"
            },
            landfill_details: {
                basic_data: "Oinarrizko datuak",
                title: "Zabortegiaren xehetasunak",
                parcel_id: "Partzelaren zkia.",
                code: "Zabortegiaren kodea",
                name: "Zabortegiaren izena",
                name_placeholder: "Izenik gabe"
            },
            landfill_version: {
                status: {
                    title: "Bertsioaren egoera",
                    types: {
                        active: "Azken bertsioa",
                        archived: "Artxibatuta",
                        pending: "Onesteko zain"
                    }
                }
            }
        },
        vos: {
            risks: {
                title: "Arriskuak",
                global: "Orokorra",
                infra: "Azpiegitura",
                hydro: "Hidrologia",
                geo: "Geologia",
                social: "Soziala",
                impacts: "Inpaktuak"
            },
            location: {
                title: "Kokalekua",
                historic_territory: {
                    title: "Lurralde historikoa",
                    types: {
                        araba: "Araba",
                        bizkaia: "Bizkaia",
                        gipuzkoa: "Gipuzkoa"
                    }
                },
                zip_code: "Posta-kodea",
                municipality_group_name: "Mankomunitatea",
                municipality_name: "Udalerria",
                address: "Helbidea",
                is_accessible: "Iristeko modukoa da?",
                watershed: "Arroa",
                toponymy: "Toponimia",
                toponymy_source: "Toponimiaren iturria",
                dimensions: {
                    title: "Dimentsioak",
                    surface_ha: "Azalera",
                    volume_m3: "Bolumena",
                    expected_total_capacity_m3: "Aurreikusitako edukiera osoa",
                    landfill_height: "Altuera",
                    fill_percent: "Betetze ehunekoa",
                },
                accesses_up_to_entrance: {
                    title: "Sarrera arteko sarbideak",
                    types: {
                        passable_forest_trail: "Baso-bide erabilgarria",
                        urban_area: "Hiri-eremua",
                        factory_access: "Fabrika bidezko sarbidea",
                        impassable_forest_trail: "Baso-bide erabili ezina",
                        other: "Beste batzuk"
                    }
                },
                accesses: {
                    title: "Zabortegira sarbideak",
                    types: {
                        free_access: "Sarbide librea",
                        fenced_off: "Hesituta",
                        partially_fenced: "Hesituta partzialki",
                        impassable_fencing: "Hesi igaroezina",
                        security_service: "Zaintza zerbitzua",
                        chained: "Katea",
                        impassable_due_to_overgrowth: "Sasitea dela eta igaroezina",
                        impassable_due_to_slope_toe: "Ezinezkoa ezponda-oinagatik",
                        unleashed_dogs: "Txakur askeak",
                        other: "Beste batzuk"
                    }
                },
                cartographies: "Kartografia"
            },
            operation: {
                title: "Ustiapena",
                classified_activity_record_number: "Jarduera sailkatuaren espediente zkia.",
                property_type: "Jabetza mota",
                holder: "Jabea",
                contact: "Kontaktua",
                address: "Helbidea",
                phone_number: "Telefono zkia.",
                legal_status: {
                    title: "Legezko egoera",
                    types: {
                        not_authorized: "Ez baimenduta",
                        unknown: "Ezezaguna",
                        authorized: "Baimenduta",
                        sub_judice: "Tramitatzen"
                    }
                },
                ownership: {
                    ownership_types: {
                        title: "Jabetza mota",
                        types: {
                            private_individual: "Banakako pribatua",
                            private_company: "Enpresa pribatua",
                            public_municipal: "Udal publikoa",
                            public_mancomunidad: "Mankomunitate publikoa",
                            public_provincial: "Lurraldeko publikoa / Aldundiarena",
                            public_regional: "Autonomia-erkidegoko publikoa",
                            public_state: "Estatu-publikoa",
                            unknown: "Ezezaguna"
                        }
                    }
                },
                license_characteristics: {
                    title: "Lizentziaren ezaugarriak",
                    types: {
                        no_license: "Lizentziarik gabe",
                        other: "Beste batzuk",
                        earthwork_infill: "Lur-betetzea",
                        non_hazardous_landfill: "Hondakin ez-arriskutsuen zabortegia",
                        c_and_d_inert_landfill: "Eraikuntza-hondakin inerten zabortegia",
                        terrain_remodeling: "Lursaila egokitzea",
                        inert_industrial_landfill: "Hondakin industrial inerten zabortegia",
                        inertized_hazardous_landfill: "Hondakin arriskutsu inertizatuen zabortegia",
                        inert_landfill: "Zabortegi inertea"
                    }
                },
                equipment_installation_date: "Ekipamendua instalatzeko data",
                equipment: "Ekipamendua",
                activity_start_date: "Jarduera hasiera data",
                activity_end_date: "Jarduera amaiera data",
                years_operating: "Ustiapen urteak",
                landfill_type: {
                    title: "Zabortegi mota",
                    types: {
                        inert: "Inertea",
                        industrial: "Industriala",
                        urban: "Hirikoa",
                        co_disposal: "Kodisposizioa",
                        dumping_source: "Isurtze Gunea",
                        dumps: "Hondakindegia",
                        unknown: "Ezezaguna"
                    }
                },
                waste_legal_category: {
                    title: "Hondakinen legezko kategoria",
                    types: {
                        no_hazardous: "Ez arriskutsuak",
                        inert: "Inerteak",
                        hazardous: "Arriskutsuak"
                    }
                },
                waste_type: {
                    title: "Hondakin mota",
                    types: {
                        building: "Eraikuntza",
                        fit_for_backfilling: "Betetzerako baliagarria",
                        inert_industrial: "Industrial inerteak",
                        inertizied: "Inertizatuak",
                        generic: "Generikoak"
                    }
                },
                waste_components: {
                    title: "Hondakinen osagaiak",
                    types: {
                        no_waste_observed: "Ez da osagairik ikusi",
                        earth_and_rocks: "Lurrak eta harriak",
                        construction_debris: "Obra-hondakinak",
                        pesticides_and_pops: "Pestizidak eta POPak",
                        oils_and_fats: "Olioak eta koipeak",
                        sludges_and_ashes: "Lotoak eta errautsak",
                        metallurgical_waste: "Hondakin metalurgikoak",
                        tyres_and_rubber: "Gomak eta gurpilak",
                        paints_and_solvents: "Pinturak eta disolbatzaileak",
                        wood_and_vegetation: "Zura eta landaredia",
                        paper_and_cellulose: "Papera eta zelulosa",
                        urban_waste_rsu: "Hiri-hondakinak",
                        asbestos_uralite: "Amiantoa",
                        drums_and_containers: "Bidoiak eta edukiontziak",
                        liquids: "Likidoak",
                        other: "Beste batzuk",
                        powder_waste: "Hautsa"
                    }
                },
                waste_description: "Hondakinen deskribapena",
                grading: {
                    title: "Granulometria",
                    types: {
                        heterometric: "Heterometrikoa",
                        sands: "Hareak",
                        clays: "Buztinak",
                        boulders: "Blokeak",
                        gravels: "Legarrak",
                        pebbles: "Boloak"
                    }
                },
                waste_source_company: "Hondakinen jatorriko enpresa",
                occurred_incident: "Gertatutako istripuak/gertakariak",
                waste_layout: {
                    title: "Isurketaren kokapena eta antolaketa",
                    types: {
                        on_a_slope: "Magalean",
                        in_a_thalweg: "Ibarbidean",
                        on_a_plain: "Lautadan",
                        quarry_backfill: "Meategi edo harrobi zuloan",
                        adjacent_to_watercourse: "Uraren ibilbidearen ondoan",
                        flood_zone: "Uholde-arrisku eremuan",
                        mixed: "Nahastuta",
                        in_segregated_areas: "Eremu ezberdinetan",
                        near_populated_areas: "Biztanle-guneen ondoan",
                        prograding: "Progradatzailea"
                    }
                },
                deposit_shapes: {
                    title: "Gordailuaren forma",
                    types: {
                        platform_with_steep_slope: "Plataforma ezponda handiarekin",
                        small_piles: "Montoi txikiak",
                        uniform_pile: "Montoi homogeneoa",
                        benches: "Tostak",
                        several_working_faces: "Hainbat  fronte",
                        fan_shaped: "Haizemaile formakoa"
                    }
                }
            },
            infrastructure: {
                title: "Zabortegiaren azpiegitura",
                underground_channeling_state: "Lurpeko kanalizazioak",
                underground_channeling_type: {
                    title: "Lurpeko kanalizazio motak",
                    types: {
                        other: "Beste batzuk",
                        leached: "Lixibiatuak",
                        sanitary: "Saneamendukoak"
                    }
                },
                hired_personnel: "Kontratatutako langileak",
                existing_machinery: {
                    title: "Dagoen makineria",
                    types: {
                        frequent: "Makina bultzatzailea edota retrohondeagailua edota konpaktatzailea",
                        sporadically: "Noizean behin makina bultzatzailea edota retrohondeagailua",
                        none: "Batere ez"
                    }
                },
                stormwater_management: "Euri-uren eta jariatze-uren bilketa eta bideratzea",
                leachate_sampling_points_state: "Lixibiatuak lagintzeko kutxatilak",
                bed_waterproofing_state: "Ohearen iragazgaiztea",
                side_waterproofing_state: "Alboetako iragazgaiztea",
                peripheral_enclosure_state: "Inguruko itxitura",
                hedge_state: "Landare-estaldura",
                operation_plan_state: "Ustiapen plana",
                closing_plan_state: "Itxiera plana"
            },
            fauna_and_vegetation: {
                title: "Fauna eta landaredia",
                vegetation_cover: "Zabortegiaren landare-estaldura",
                vegetation_cover_description: "Estalduraren deskribapena",
                environment_vegetation: {
                    title: "Inguruko landaredia",
                    types: {
                        forest_plantations: "Baso-landaketak",
                        atlantic_meadows_and_crops: "Larre eta lantze atlantikoak",
                        broadleaf_patches: "Gune hostotsuak",
                        broadleaf_forest: "Baso hostotsuak",
                        cereal_crops: "Zereal laboreak",
                        potato_and_beet_crops: "Patata eta erremolatxa",
                        strawberry_tree_shrubland: "Gurbitz sastrakadiak",
                        gallery_forest: "Ibai-hertzetako basoa",
                        fern_field: "Iralekua",
                        gorse_shrubland: "Elordia",
                        market_gardens: "Ortuak",
                        fruit_trees: "Fruta-arbolak",
                        tall_grassland: "Lastonala"
                    }
                },
                fauna_type: {
                    title: "Fauna",
                    types: {
                        avifauna: "Hegaztiak",
                        small_vertebrates: "Vertebratu txikiak",
                        livestock: "Abereak",
                        large_vertebrates: "Vertebratu handiak",
                        rodents: "Karraskariak"
                    }
                }
            },
            hydrology: {
                title: "Hidrologia",
                annual_precipitation: "Urteko prezipitazioa",
                effective_rainfall: "Euri baliagarria",
                drainage_system: "Drenatze-sarea",
                near_water_abstraction: "Hurbileko ur bilketak",
                distance_to_nearest_watercourse: "Hurbilen dagoen ibilguarekiko distantzia",
                water_abstraction_type: "Ur bilketa mota",
                stream_direction: {
                    title: "Uretan",
                    types: {
                        upstream: "Gora",
                        downstream: "Behera",
                        unknown: "Ezezaguna"
                    }
                },
                distance: "Distantzia",
                crossing_watercourse_state: "Zabortegia zeharkatzen duen ibilgua",
                underlying_watercourse_state: "Zabortegiaren azpiko ibilgua",
                streamName: "Errekaren izena"
            },
            geology: {
                title: "Geologia",
                lithologycal_and_lithostratigraphycal_units: "Unitate litologiko eta litoestratigrafikoak",
                superficial_deposit: {
                    title: "Azaleko eraketak",
                    types: {
                        none: "Ez",
                        eluvium: "Elubiala",
                        alluvium: "Alubiala",
                        artificial_backfilling: "Betetze artifizialak",
                        colluvium: "Kolubiala",
                        fluvio_marine: "Flubiomarinokoa",
                        mixed_or_polygenic: "Mistoa edo poligenikoa",
                        alluviocolluvium: "Alubio-kolubiala",
                        karst: "Karstikoa",
                        marine: "Itsasokoa",
                        unknown: "Ezezaguna"
                    }
                },
                regolith_thickness: "Erregolitoaren lodiera",
                soil_type: {
                    title: "Lurzoru mota",
                    types: {
                        dystric_cambisol: "Kambisol distrikoa",
                        no_soil: "Lurzorurik gabe",
                        eutric_cambisol: "Kambisol eutrikoa"
                    }
                },
                morphology: {
                    title: "Morfologia",
                    types: {
                        slope: "Malda",
                        thalweg: "Ibarbidea",
                        plain: "Lautada",
                        quarry_hole: "Harrobi-zuloa",
                        floodplain: "Uholde-lautada",
                        riverbed: "Ibai-ibilgua",
                        chasm: "Leizea edo torka",
                    }
                },
                permeability_level: "Iragazkortasun maila",
                permeability_reason: {
                    title: "Iragazkortasunaren arrazoia",
                    types: {
                        for_porosity: "Porositatea",
                        for_cracking: "Pitzaduraketa"
                    }
                }
            },
            hydrogeology: {
                title: "Hidrogeologia",
                aquifer_type: {
                    title: "Akuifero mota",
                    types: {
                        low_permeability_system: "Iragazkortasun baxuko sistema",
                        no_aquifer: "Akuiferorik gabe",
                        not_consolidated_detrital: "Detritiko ez-sendotua",
                        strict_direction_karstic: "Karstiko zentzu hertsian",
                        mixed_karstic: "Karstiko mistoa",
                        consolidated_detrital: "Detritiko sendotua",
                        mixed_detrital: "Detritiko mistoa",
                        diffused_flow_karstic: "Isuri zehaztugabeko karstikoa"
                    }
                },
                estimated_depth: "Gutxi gorabeherako sakonera",
                estimated_stream_direction: "Gutxi gorabeherako isuri norabidea",
                vulnerability_level: "Ahultasun maila",
                hydrogeologycal_unit: "Atal hidrogeologikoa"
            },
            geotechnique_characteristics: {
                title: "Ezaugarri geoteknikoak",
                hillside_slope: "Maldaren aldapa",
                slope_instability_processes: {
                    title: "Maldako ezegonkortasun prozesuak",
                    types: {
                        no: "Ez",
                        slidings: "Lur-jausiak",
                        landslides: "Lur-erorketak",
                        downhill_creep: "Narrasteak",
                        avalanche: "Elauso edo lohi iragazketak"
                    }
                },
                waste_mass_stability_level: "Isuritako masaren egonkortasuna",
                flood_potential: {
                    title: "Uholde-arriskua",
                    types: {
                        no: "Ez",
                        t10: "10 urteko itzulera-aldiaren muga barruan",
                        other: "Beste batzuk",
                        t100: "100 urteko itzulera-aldiaren muga barruan",
                        t500: "500 urteko itzulera-aldiaren muga barruan"
                    }
                },
                erodibility_level: "Higagarritasun maila",
                structural_discontinuities: "Egitura etenak eta faktoreak",
                covering_state: "Estaldura",
                land_covering_type: {
                    title: "Estaldura mota",
                    types: {
                        soil: "Lurra",
                        construction: "Eraikuntza",
                        concrete: "Hormigoia",
                        sealed: "Itxita"
                    }
                },
                land_covering_description: "Estalduraren deskribapena",
                covering_material_state: "Estaldura materialen eskuragarritasuna",
                covering_material_description: "Estaldura materialen deskribapena",
                effect_on_existing_structures_state: "Egitura eraginen gaineko erasanak",
                elements_undergo_slipping_state: "Irristatu daitezkeen elementuak"
            },
            humanAndSocialEnvironment: {
                title: "Giza eta gizarte ingurunea",
                surrounding_population: "Inguruko biztanleria",
                distance_to_houses_or_recreation: "Distantzia etxeetara edo aisialdi-eremuetara",
                near_houses_count: "Hurbileko etxebizitzen kopurua",
                usage_status_types: {
                    public_open_spaces: "Erabilera orokorreko eremu irekia",
                    other: "Beste batzuk",
                    industrial: "Industriala",
                    agricultural_use: "Nekazaritza ustiapena",
                    residential: "Etxebizitza",
                    open_spaces: "Eremu irekiak",
                    multi_family_housing: "Etxebizitza kolektiboa",
                    commercial: "Merkataritza",
                    sports: "Kirol-erabilera",
                    infrastructure: "Azpiegiturak",
                    educational: "Hezkuntza",
                },
                current_usage_status: "Zabortegiaren lurzoruaren egungo erabilerak",
                current_usage_description: "Egungo erabileraren deskribapena",
                future_usages: "Zabortegiaren lurzoruaren etorkizuneko erabilerak",
                water_usage_types: {
                    no_use: "Erabilerarik gabe",
                    other: "Beste batzuk",
                    agriculture_ranching_industrial: "Nekazaritza, Abeltzaintza edo Industria",
                    potable: "Edatekoa",
                    watering: "Ureztatzea"
                },
                surface_water_usage: "Eremuko azaleko uren erabilerak",
                ground_water_usage: "Eremuko lurpeko uren erabilerak",
                urban_clasification: {
                    title: "Sailkapen urbanistikoa",
                    types: {
                        not_developable: "Urbanizaezina",
                        developable: "Urbanizagarria",
                        urban: "Hiri-lurra"
                    }
                },
                urban_calification: {
                    title: "Kalifikazio urbanistikoa",
                    types: {
                        rural_settlements_on_not_developable: "Nekazal-nukleoak urbanizaezinean",
                        urban_for_economic: "Hirikoa jarduera ekonomikoetarako",
                        scheduled_developable_for_economic: "Urbanizagarri programatua jarduera ekonomikoetarako",
                        gs_open_spaces: "Sitema orokorretako eremu irekia",
                        economic_on_not_developable: "Jarduera ekonomikoak urbanizaezinean",
                        extractive_activities: "Erauzketa-jarduerak",
                        residential_urban: "Hiri etxebizitza erabilera",
                        scheduled_developable_for_residential: "Urbanizagarri programatua etxebizitza-erabilerarako",
                        gs_t_and_c: "Sistema orokorretako garraio eta komunikazio eremua",
                        gs_public_facilities: "Sistema orokorreko hornikuntza eremua",
                        unscheduled_developable_for_residential: "Urbanizagarria N.P. etxebizitza-erabilerarako",
                        unscheduled_developable_for_economic: "Urbanizagarria N.P. jarduera ekonomikoetarako",
                        gs_basic_infrastructure: "Sistema orokorretako oinarrizko azpiegituren eremua"
                    }
                }
            },
            otherImpacts: {
                title: "Beste erasan eta eragin batzuk",
                impact_description: "Eraginaren deskribapena",
                natural_heritage_state: "Natura-ondarea",
                bad_smells: "Usain txarrak",
                particle_emission_state: "Partikula igorpena",
                particle_description: "Partikulen deskribapena",
                heavy_vehicle_traffic_state: "Ibilgailu astunen zirkulazioa",
                rodent_and_insect_presence_state: "Karraskari eta intsektuen presentzia",
                periodic_situation_impacts_state: "Tartekako egoeretatik eratorritako eraginak",
                exploitation_loss_state: "Ustiapen-galerak",
                cultural_heritage_state: "Kultura-ondarea",
                effects_and_impacts_level: "Erasan eta eraginen maila",
                environment_visual_basin_level: "Inguruko ikus-eremuaren maila",
                where_its_seen_from: "Zabortegia nondik ikusten den",
                fires_state: "Suteak",
                fires_cause: "Suteen arrazoiak",
                fires_frequency: "Suteen maiztasuna",
                paper_and_plastic_flights: "Paperen edota plastikoen hegaldiak"
            },
            correcting_measures: {
                title: "Neurri zuzentzaileak",
                measures: {
                    title: "Neurri zuzentzaileak",
                    types: {
                        waste_removal_management: "Hondakinak kendu eta kudeatzea",
                        surface_drainage: "Azaleko drenajea",
                        leachate_c_and_d_systems: "Lixibiatuak biltzeko eta kudeatzeko sistemak",
                        surface_sealing: "Azaleko zigilatzea",
                        in_situ_stabilization: "In situ estabilizazioa",
                        gas_collection: "Gasen biltzea",
                        physical_chem_treatment: "Tratamendu fisiko-kimikoa",
                        impermeable_barriers: "Estalki iragazgaitzak",
                        groundwater_drainage: "Lurpeko uraren drenajea",
                        biological_treatment: "Tratamendu biologikoa",
                        other: "Beste neurri batzuk",
                        phys_chem_treatment: "Tratamendu fisiko-kimikoa",
                    }
                },
                description: "Deskribapena",
                source: "Iturriak",
                other: "Beste batzuk"
            },
            sampling: {
                title: "Laginketa",
                description: "ID",
                description_placeholder: "{{count}} zkia. laginketa",
                date: "Data",
                sampling_type: {
                    title: "Laginketa mota",
                    types: {
                        surface_water: "Azaleko ura",
                        leachate: "Lixibiatua",
                        soil: "Lurzorua",
                        ground_water: "Lurpeko ura",
                        waste: "Hondakina",
                        sediment: "Sedimentua",
                        air: "Airea",
                        other: "Beste batzuk"
                    }
                },
                location: "Deskribapena eta kokapena",
                results: {
                    parameters: "Parametroak",
                    sample_matrix: {
                        title: "Matrizeak",
                        types: {
                            unknown: "Ezezaguna",
                            lixiviate: "Lixibiatua",
                            solid: "Solidoa"
                        }
                    },
                    results: "Emaitzak",
                    legal_limits: "Legezko mugak",
                    no_results: "Ez da analitika erregistratu laginketa honetarako."
                }
            },
            studies: "Egindako azterlanak",
            multimedia: {
                doc: {
                    title: "Erlazionatutako dokumentazioa",
                    description_placeholder: "Izenbururik gabeko dokumentua",
                    open: "Ireki fitxa berrian"
                }
            },
            inspection_state_types: {
                yes: "Bai",
                no: "Ez",
                unknown: "Ezezaguna"
            },
            magnitude_level_types: {
                insignificant: "Nabari ezina",
                very_low: "Oso baxua",
                low: "Baxua",
                mid: "Ertaina",
                high: "Altua",
                very_high: "Oso altua"
            }
        }
    },
    tutorial_selection: {
        title: "Hautatu Tutorial bat",
        subtitle: "Aukeratu gida interaktibo bat plataformako atal desberdinak erabiltzen ikasteko.",
        onboarding_title: "Hasierako Gida Azkarra",
        onboarding_desc: "Ikasi mapan nabigatzen, iragazkiak erabiltzen, zerrenda kontsultatzen eta legenda ulertzen.",
        full_details_title: "Espediente Osoa",
        full_details_desc: "Ezagutu fitxa dinamiko berriaren funtzionamendua: bertsioen historia, arrisku zehatzak, zuzentze-neurriak eta analisi kimikoak.",
        extractor_title: "Datu-erauzlea",
        extractor_desc: "Ikasi zabortegien informazioa zure neurrira esportatzen eta deskargatzen CSV, JSON edo GeoJSON formatuetan.",
        advanced_search_title: "Bilaketa Aurreratua",
        advanced_search_desc: "Ikasi inbentarioko eremuen edozein konbinazioren arabera bilatzen.",
        btn_start: "Hasi",
        btn_cancel: "Utzi"
    },
    gallery: {
        title_placeholder: "Izenburubako irudi galeria"
    }
}