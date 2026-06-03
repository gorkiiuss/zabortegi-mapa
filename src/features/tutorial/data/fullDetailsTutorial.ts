// src/features/tutorial/data/fullDetailsTutorial.ts

import type { TutorialDefinition } from "../types";

export const fullDetailsTutorial: TutorialDefinition = {
  id: 'full-details-tour',
  title: { es: "Nuevo Expediente", eu: "Espediente Berria" },
  steps: [
    {
      id: 'welcome',
      title: { es: "Expediente Completo", eu: "Espediente Osoa" },
      content: {
        es: "Te presentamos el nuevo expediente completo. Hemos rediseñado esta sección de arriba a abajo para ofrecerte toda la información de manera más clara y organizada.",
        eu: "Espediente oso berria aurkezten dizugu. Atal hau goitik behera birmoldatu dugu informazio guztia argiago eta antolatuago eskaintzeko."
      },
      position: 'center',
      onEnterAction: [
        { type: 'SELECT_LANDFILL', payload: { landfillId: 'e2179184-f96d-43d5-86b8-e98d30df53c2' } },
        { type: 'TOGGLE_MODAL', payload: { modalId: 'full-details', stackPrevious: true } }
      ]
    },
    {
      id: 'api-vs-geojson',
      title: { es: "Información en Tiempo Real", eu: "Informazioa Denbora Errealean" },
      content: {
        es: "Anteriormente, los datos eran estáticos. Con la nueva API dinámica, cualquier actualización se refleja al instante, permitiendo almacenar ficheros adjuntos, estudios detallados y análisis sin ralentizar la aplicación.",
        eu: "Lehen, datuak estatikoak ziren. API dinamiko berriarekin, egindako edozein eguneratze berehala islatzen da, eranskinak, azterketa zehatzak eta analisiak aplikazioa moteldu gabe gordetzeko aukera emanez."
      },
      position: 'center'
    },
    {
      id: 'versions',
      targetId: 'full-details-version-selector',
      position: 'bottom',
      title: { es: "Historial de Versiones", eu: "Bertsioen Historia" },
      content: {
        es: "¡Ahora los vertederos tienen historia! Este selector te permite consultar versiones anteriores de la ficha para ver cómo ha evolucionado el vertedero o qué datos nuevos se han incorporado con el tiempo.",
        eu: "Orain zabortegiek historia dute! Hautatzaile honek fitxaren aurreko bertsioak kontsultatzeko aukera ematen dizu, zabortegia nola aldatu den edo denboran zehar zein datu berri gehitu diren ikusko duzu."
      }
    },
    {
      id: 'section-risks',
      targetId: 'full-details-section-risks',
      position: 'left',
      title: { es: "Evaluación de Riesgos", eu: "Arriskuen Ebaluazioa" },
      content: {
        es: "En esta sección se detallan las valoraciones de riesgo calculadas. Para el caso de Bilbao, vemos un riesgo global del 56.35% (medio-alto), destacando un riesgo social del 66.67% e infraestructura del 63.16% debido a su cercanía a viviendas y su estado de abandono.",
        eu: "Atal honetan kalkulatutako arriskuen ebaluazioak zehazten dira. Bilboko kasurako, %56.35eko arrisku orokorra (ertain-altua) ikus dezakegu, %66.67ko gizarte-arriskua eta %63.16ko azpiegitura-arriskua nabarmenduz, etxebizitzetatik gertu egoteagatik eta abandonu egoeragatik."
      }
    },
    {
      id: 'section-operation',
      targetId: 'full-details-section-operation',
      position: 'left',
      title: { es: "Datos de Explotación", eu: "Ustiapen Datuak" },
      content: {
        es: "Aquí se muestra la información histórica. Verás que este vertedero estuvo activo durante 27 años (1970-1997), explotado por la Casa Vasca. Clasificado como mixto (co-disposal), recibió tierras, escombros y residuos peligrosos como HCH (lindano).",
        eu: "Hemen informazio historikoa erakusten da. Zabortegi honek 27 urtez jardun zuela (1970-1997) ikusiko duzu, Casa Vascak ustiatuta. Zabortegi misto gisa sailkatua (co-disposal), lurrak, escombruak eta hondakin arriskutsuak jaso zituen, HCH (lindanoa) esaterako."
      }
    },
    {
      id: 'section-measures',
      targetId: 'full-details-section-correctingMeasures',
      position: 'left',
      title: { es: "Medidas Correctoras", eu: "Zuzentze Neurriak" },
      content: {
        es: "Esta sección muestra qué acciones se han tomado para mitigar impactos. En este vertedero destaca la carencia absoluta de medidas correctoras, indicándose en la descripción que el canal perimetral está invadido por vegetación y persisten bidones de HCH corroídos.",
        eu: "Atal honek eraginak arintzeko zer ekintza burutu diren erakusten du. Zabortegi honetan zuzentze-neurri gabezia osoa nabarmentzen da, deskribapenean perimetroko kanala landarediak inbadituta dagoela eta HCH bidoi herdoilduak daudela adieraziz."
      }
    },
    {
      id: 'section-samplings',
      targetId: 'full-details-section-samplings',
      position: 'left',
      title: { es: "Análisis Químicos", eu: "Analisi Kimikoak" },
      content: {
        es: "¡Aquí tienes los análisis químicos reales! La tabla detalla los muestreos tomados en puntos específicos como ASP 1 y ASP 2, registrando parámetros como el pH e hidrocarburos que demuestran la contaminación real sobre el terreno.",
        eu: "Hemen dituzu benetako analisi kimikoak! Taulak ASP 1 eta ASP 2 bezalako puntu zehatzetan jasotako laginketak azaltzen ditu, lurzoruan dagoen kutsadura erreala frogatzen duten pH eta hidrokarburoak bezalako parametroak erregistratuz."
      }
    },
    {
      id: 'docs',
      targetId: 'full-details-section-docs',
      position: 'left',
      title: { es: "Estudios y Documentos", eu: "Ikerketak eta Dokumentuak" },
      content: {
        es: "Al final del expediente se listan los estudios y la documentación oficial original en PDF de las administraciones, accesibles con un solo clic.",
        eu: "Espedientearen amaieran administrazioen PDF formatuko jatorrizko azterketak eta dokumentazio ofiziala zerrendatzen dira, klik bakar batean eskuragarri."
      }
    },
    {
      id: 'corrections',
      targetId: 'full-details-btn-corrections',
      position: 'left',
      title: { es: "Colaboración Ciudadana", eu: "Herritarren Elkarlana" },
      content: {
        es: "A través de este botón, próximamente podrás colaborar enviando correcciones o adjuntando nuevos documentos para mantener la base de datos al día.",
        eu: "Botoi honen bidez, laster elkarlanean aritu ahal izango zara zuzenketak bidaliz edo dokumentu berriak erantsiz, datu-basea egunean mantentzeko."
      }
    }
  ],
  onCompleteAction: [
    { type: 'TOGGLE_MODAL', payload: { modalId: 'none' } },
    { type: 'SELECT_LANDFILL', payload: { landfillId: null } }
  ]
};
