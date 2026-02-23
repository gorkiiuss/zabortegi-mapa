// src/features/tutorial/data/onboardingTutorialMobile.ts

import type { TutorialDefinition } from "../domain/types";

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
                { type: 'SELECT_LANDFILL', payload: { landfillId: '1309' } },
                { type: 'TOGGLE_MODAL', payload: { modalId: 'selection' } }
            ]
        },
        {
            id: 'details-pdf',
            targetId: 'mobile-tutorial-btn-pdf',
            position: 'bottom',
            title: { es: "Descarga del Informe", eu: "Txostenaren Deskarga" },
            content: {
                es: "Aquí puedes generar y descargar al instante un informe completo en PDF con todos los datos técnicos del emplazamiento.",
                eu: "Hemen berehala sortu eta deskarga dezakezu PDF formatuko txosten osoa, kokalekuaren datu tekniko guztiekin."
            }
        },
        {
            id: 'details-docs',
            targetId: 'mobile-tutorial-btn-docs',
            position: 'bottom',
            title: { es: "Documentación Oficial", eu: "Dokumentazio Ofiziala" },
            content: {
                es: "Accede directamente a los documentos oficiales originales de las instituciones.",
                eu: "Sartu zuzenean erakundeen dokumentu ofizialetara."
            }
        },
        {
            id: 'details-corrections',
            targetId: 'mobile-tutorial-btn-corrections',
            position: 'bottom',
            title: { es: "Próximas Funcionalidades", eu: "Hurrengo Funtzionalitateak" },
            content: {
                es: "Los botones con estilo verde discontinuo indican funciones que estamos desarrollando, como la futura posibilidad de proponer correcciones o actualizaciones de datos.",
                eu: "Ertz eteneko estilo berdea duten botoiek garatzen ari garen funtzioak adierazten dituzte, hala nola etorkizunean datuen zuzenketak edo eguneratzeak proposatzeko aukera."
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