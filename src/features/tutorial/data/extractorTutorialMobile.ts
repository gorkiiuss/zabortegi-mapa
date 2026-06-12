// src/features/tutorial/data/extractorTutorialMobile.ts

import type { TutorialDefinition } from "../types";

export const extractorTutorialMobile: TutorialDefinition = {
  id: 'extractor-tour-mobile',
  title: { es: "Extractor de datos", eu: "Datu-erauzlea" },
  steps: [
    {
      id: 'welcome',
      title: { es: "Extractor de Datos", eu: "Datu-erauzlea" },
      content: {
        es: "Te damos la bienvenida al tutorial del Extractor de Datos. Esta potente herramienta te permite descargar la información de los vertederos adaptada a tus necesidades en formatos CSV, JSON o GeoJSON.",
        eu: "Ongi etorri Datu-erauzlearen tutorialera. Tresna indartsu honek zabortegien informazioa zure beharretara egokituta deskargatzeko aukera ematen dizu CSV, JSON edo GeoJSON formatuetan."
      },
      position: 'center',
      onEnterAction: { type: 'TOGGLE_MODAL', payload: { modalId: 'none' } }
    },
    {
      id: 'access',
      targetId: 'mobile-tutorial-btn-extractor',
      position: 'bottom',
      title: { es: "Acceso al Extractor", eu: "Datu-erauzlera sartzea" },
      content: {
        es: "Puedes abrir el extractor desde el menú de herramientas. Recuerda que en móvil este menú se abre con el botón de hamburguesa superior.",
        eu: "Datu-erauzlea ireki dezakezu tresnen menutik. Gogoratu mugikorrean menu hau goiko hanburgesa botoiarekin irekitzen dela."
      },
      onEnterAction: { type: 'TOGGLE_MODAL', payload: { modalId: 'toolbar' } }
    },
    {
      id: 'step1-scope',
      targetId: 'extractor-scope-options',
      position: 'bottom',
      title: { es: "Paso 1: Selección de Vertederos", eu: "1. Urratsa: Zabortegiak hautatzea" },
      content: {
        es: "Aquí seleccionas qué vertederos exportar: todos los de la base de datos, solo los que coinciden con tu búsqueda actual en el mapa, o seleccionarlos de manera manual marcando casillas.",
        eu: "Hemen zein zabortegi esportatu hautatzen duzu: datu-baseko guztiak, mapan une honetan iragazita dituzunak bakarrik, edo eskuz hautatu kutxatxoak markatuz."
      },
      onEnterAction: [
        { type: 'TOGGLE_MODAL', payload: { modalId: 'data-extractor' } },
        { type: 'SET_EXTRACTOR_STEP' as any, payload: { step: 1 } }
      ]
    },
    {
      id: 'step2-fields',
      targetId: 'extractor-fields-container',
      position: 'bottom',
      title: { es: "Paso 2: Selección de Campos", eu: "2. Urratsa: Eremuak hautatzea" },
      content: {
        es: "En este paso puedes marcar qué secciones y campos específicos del inventario quieres descargar. Tienes botones para marcar o desmarcar secciones enteras de una vez.",
        eu: "Urrats honetan, deskargatu nahi dituzun atal eta eremu zehatzak markatu ditzakezu. Atal osoak aldi berean markatzeko edo desmarkatzeko botoiak dituzu."
      },
      onEnterAction: [
        { type: 'TOGGLE_MODAL', payload: { modalId: 'data-extractor' } },
        { type: 'SET_EXTRACTOR_STEP' as any, payload: { step: 2 } }
      ]
    },
    {
      id: 'step3-format',
      targetId: 'extractor-format-options',
      position: 'bottom',
      title: { es: "Paso 3: Formato y Descarga", eu: "3. Urratsa: Formatua eta deskarga" },
      content: {
        es: "Elige el formato: CSV (con delimitadores y traducciones configurables para hojas de cálculo), JSON jerárquico crudo, o GeoJSON (que incluye las coordenadas y polígonos del mapa para sistemas de información geográfica SIG).",
        eu: "Aukeratu formatua: CSV (kalkulu-orrietarako bereizle eta itzulpen konfiguragarriekin), JSON hierarkiko gordina, edo GeoJSON (sistemetan erabiltzeko mapako koordenatu eta poligonoekin)."
      },
      onEnterAction: [
        { type: 'TOGGLE_MODAL', payload: { modalId: 'data-extractor' } },
        { type: 'SET_EXTRACTOR_STEP' as any, payload: { step: 3 } }
      ]
    },
    {
      id: 'download',
      targetId: 'extractor-btn-download',
      position: 'bottom',
      title: { es: "Generar Archivo", eu: "Fitxategia sortu" },
      content: {
        es: "Finalmente, haz clic en este botón para generar y descargar tu archivo personalizado instantáneamente. El proceso se realiza de forma local y segura en tu navegador.",
        eu: "Azkenik, egin klik botoi honetan zure fitxategi pertsonalizatua berehala sortu eta deskargatzeko. Prozesua modu lokal eta seguruan egiten da zure nabigatzailean."
      },
      onEnterAction: [
        { type: 'TOGGLE_MODAL', payload: { modalId: 'data-extractor' } },
        { type: 'SET_EXTRACTOR_STEP' as any, payload: { step: 3 } }
      ]
    },
    {
      id: 'advanced-search-shortcut',
      targetId: 'advanced-search-btn-export',
      position: 'bottom',
      title: { es: "Acceso Directo desde Búsqueda", eu: "Bilaketatik sarbide zuzena" },
      content: {
        es: "¡Un atajo muy útil! Si realizas una búsqueda avanzada, aparecerá este botón de exportación rápida que abre el extractor pre-seleccionando de inmediato los vertederos resultantes del filtro.",
        eu: "Lasterbide oso erabilgarria! Bilaketa aurreratu bat egiten baduzu, esportazio bizkorreko botoi hau agertuko da, erauzketa-panela ireki eta iragazitako zabortegiak berehala hautatzen dituena."
      },
      onEnterAction: [
        { type: 'TOGGLE_MODAL', payload: { modalId: 'advanced-search' } }
      ]
    }
  ],
  onCompleteAction: [
    { type: 'TOGGLE_MODAL', payload: { modalId: 'none' } }
  ]
};
