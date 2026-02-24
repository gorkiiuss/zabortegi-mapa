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
        add_correction: "Gehitu zuzenketa",
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
        load_more: "{{count}} fitxategi kargatzeko"
    }
}