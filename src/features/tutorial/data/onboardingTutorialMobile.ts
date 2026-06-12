// src/features/tutorial/data/onboardingTutorialMobile.ts

import type { TutorialDefinition } from "../types";

export const onboardingTutorialMobile: TutorialDefinition = {
    id: 'onboarding-mobile',
    title: { es: "Guía de inicio", eu: "Hasierako gida" },
    steps: [
        {
            id: 'welcome',
            title: { es: "Bienvenido al Mapa de Vertederos", eu: "Ongi etorri Zabortegien Mapara" },
            content: {
                es: "Esta herramienta te permite explorar los vertederos abandonados de la CAPV. Te enseñaremos brevemente cómo usarla.",
                eu: "Tresna honek EAEko utzitako zabortegiak arakatzeko aukera ematen dizu. Laburki erakutsiko dizugu nola erabili."
            },
            position: 'center',
            onEnterAction: { type: 'TOGGLE_MODAL', payload: { modalId: 'none' } }
        },
        {
            id: 'search',
            targetId: 'tutorial-mobile-search',
            position: 'bottom',
            title: { es: "Buscador", eu: "Bilatzailea" },
            content: {
                es: "Usa este botón para buscar vertederos por nombre, municipio o código. ¡Pruébalo!",
                eu: "Erabili botoi hau zabortegiak izenaren, udalerriaren edo kodearen arabera bilatzeko. Probatu!"
            }
        },
        {
            id: 'legend',
            targetId: 'tutorial-mobile-legend',
            position: 'top',
            title: { es: "Leyenda", eu: "Legenda" },
            content: {
                es: "Aquí puedes consultar qué significan los símbolos. El color rojo indica mayor riesgo.",
                eu: "Hemen ikurrek zer esan nahi duten kontsulta dezakezu. Kolore gorriak arrisku handiagoa adierazten du."
            }
        },
        {
            id: 'details',
            targetId: 'tutorial-mobile-details',
            position: 'bottom',
            title: { es: "Ficha del Vertedero", eu: "Zabortegiaren Fitxa" },
            content: {
                es: "Al hacer clic en un vertedero, verás toda su información: informes, evaluación de riesgos, posibles impactos y documentación oficial.",
                eu: "Zabortegi batean klik egitean, bere informazio guztia ikusiko duzu: txostenak, arriskuen ebaluazioa eta dokumentazio ofiziala."
            },
            onEnterAction: [
                { type: 'SELECT_LANDFILL', payload: { landfillId: 'e2179184-f96d-43d5-86b8-e98d30df53c2' } },
                { type: 'TOGGLE_MODAL', payload: { modalId: 'selection' } }
            ]
        },
        {
            id: 'details-pdf',
            targetId: 'mobile-tutorial-btn-pdf',
            position: 'bottom',
            title: { es: "Descarga del Informe (Legacy)", eu: "Txostenaren Deskarga (Legacy)" },
            content: {
                es: "Para los vertederos históricos o 'legacy', dispones de este botón para descargar el informe original digitalizado en formato PDF.",
                eu: "Zabortegi historiko edo 'legacy'-etarako, botoi hau duzu jatorrizko txosten digitalizatua PDF formatuan deskargatzeko."
            }
        },
        {
            id: 'details-more-info',
            targetId: 'mobile-tutorial-btn-more-info',
            position: 'bottom',
            title: { es: "Ver más información", eu: "Ikusi informazio gehiago" },
            content: {
                es: "Pulsa en este botón para entrar al expediente completo de este vertedero y acceder a información y opciones adicionales.",
                eu: "Sakatu botoi hau zabortegi honen espediente osoa irekitzeko eta informazio eta aukera gehiago ikusteko."
            }
        },
        {
            id: 'details-corrections',
            targetId: 'full-details-btn-corrections',
            position: 'bottom',
            title: { es: "Próximas Funcionalidades", eu: "Hurrengo Funtzionalitateak" },
            content: {
                es: "Las acciones indicadas en verde discontinuo representan funciones futuras, como la posibilidad de proponer correcciones o editar información.",
                eu: "Ertz eten berdea duten ekintzek etorkizuneko funtzionalitateak adierazten dituzte, hala nola zuzenketak proposatzea edota informazioa editatzea."
            },
            onEnterAction: { type: 'TOGGLE_MODAL', payload: { modalId: 'full-details', stackPrevious: true } }
        },
        {
            id: 'details-docs',
            targetId: 'full-details-section-docs',
            position: 'bottom',
            title: { es: "Documentación Oficial", eu: "Dokumentazio Ofiziala" },
            content: {
                es: "En la parte inferior de la ficha técnica ampliada encontrarás la sección con todos los documentos y actas oficiales disponibles para este vertedero.",
                eu: "Fitxa tekniko zabalduaren beheko aldean aurkituko duzu zabortegi honetarako eskuragarri dauden dokumentu eta akta ofizial guztien atala."
            }
        },
        {
            id: 'menu',
            targetId: 'tutorial-mobile-menu',
            position: 'bottom',
            title: { es: "Menú y Herramientas", eu: "Menua eta Tresnak" },
            content: {
                es: "En este menú encontrarás el índice completo de vertederos, el cambio de idioma y contacto entre otras cosas. ¡Explóralo!",
                eu: "Menu honetan zabortegien aurkibide osoa, hizkuntza aldaketa eta kontaktua beste gauzen artean aurkituko dituzu. Exploratu!"
            },
            onEnterAction: [
                { type: 'TOGGLE_MODAL', payload: { modalId: 'none' } },
                { type: 'SELECT_LANDFILL', payload: { landfillId: null } },
                { type: 'RESET_MAP_ZOOM', payload: {} },
            ]
        },
        {
            id: 'menu-tools-advanced-search',
            targetId: 'mobile-tutorial-btn-advanced-search',
            position: 'bottom',
            title: { es: "Buscador Avanzado", eu: "Bilaketa Aurreratua" },
            content: {
                es: "Esta potente herramienta te permite buscar y filtrar vertederos cruzando múltiples criterios del inventario, como localización, riesgos o dimensiones.",
                eu: "Tresna indartsu honek zabortegiak bilatzeko eta iragazteko aukera ematen dizu, inbentarioko hainbat irizpide gurutzatuz (kokapena, arriskuak edo dimentsioak, adibidez)."
            },
            onEnterAction: { type: 'TOGGLE_MODAL', payload: { modalId: 'toolbar' } }
        },
        {
            id: 'menu-tools-extractor',
            targetId: 'mobile-tutorial-btn-extractor',
            position: 'bottom',
            title: { es: "Extractor de Datos", eu: "Datu-erauzlea" },
            content: {
                es: "Permite configurar y descargar la información de los vertederos adaptada a tus necesidades en formatos CSV, JSON o GeoJSON.",
                eu: "Zabortegien informazioa zure beharretara egokituta konfiguratu eta deskargatzeko aukera ematen dizu CSV, JSON edo GeoJSON formatuetan."
            },
            onEnterAction: { type: 'TOGGLE_MODAL', payload: { modalId: 'toolbar' } }
        },
        {
            id: 'tutorial-selection',
            targetId: 'mobile-tutorial-btn-selection',
            position: 'top',
            title: { es: "Otros Tutoriales", eu: "Beste tutorial batzuk" },
            content: {
                es: "Desde esta opción de menú podrás acceder a otros tutoriales en cualquier momento, como la guía del Expediente Completo para descubrir todas las novedades.",
                eu: "Menu-aukera honetatik beste tutorial batzuk erabili ahal izango dituzu nahi duzunean, hala nola Espediente Osoaren gida, berrikuntza guztiak ezagutzeko."
            },
            onEnterAction: { type: 'TOGGLE_MODAL', payload: { modalId: 'toolbar' } }
        },
        {
            id: 'about-project',
            targetId: 'mobile-tutorial-btn-about-project',
            position: 'top',
            title: { es: "Sobre el Proyecto", eu: "Proiektuari Buruz" },
            content: {
                es: "Aquí podrás revisar qué hay de nuevo, leer los avisos y conocer más sobre la iniciativa. ¡Se abrirá automáticamente si hay noticias importantes!",
                eu: "Hemen berritasunak ikusi, oharrak irakurri eta ekimenari buruz gehiago jakin ahal izango duzu. Albiste garrantzitsuak daudenean automatikoki irekiko da!"
            },
            onEnterAction: { type: 'TOGGLE_MODAL', payload: { modalId: 'toolbar' } }
        }
    ],
    onCompleteAction: [
        { type: 'TOGGLE_MODAL', payload: { modalId: 'none' } },
        { type: 'TOGGLE_MODAL', payload: { modalId: 'about', modalPayload: { initialTab: 'project' } } }
    ]
};