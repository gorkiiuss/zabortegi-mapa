// src/features/tutorial/data/advancedSearchTutorialMobile.ts

import type { TutorialDefinition } from "../types";

export const advancedSearchTutorialMobile: TutorialDefinition = {
  id: 'advanced-search-tour-mobile',
  title: { es: "Búsqueda Avanzada", eu: "Bilaketa Aurreratua" },
  steps: [
    {
      id: 'welcome',
      title: { es: "Búsqueda Avanzada", eu: "Bilaketa Aurreratua" },
      content: {
        es: "Te damos la bienvenida al tutorial de la Búsqueda Avanzada. Esta herramienta te permite cruzar y filtrar todos los campos del inventario para encontrar vertederos específicos.",
        eu: "Ongi etorri Bilaketa Aurreratuaren tutorialera. Tresna honek inbentarioko eremu guztiak gurutzatzen eta iragazten lagunduko dizu, zabortegi espezifikoak aurkitzeko."
      },
      position: 'center',
      onEnterAction: { type: 'TOGGLE_MODAL', payload: { modalId: 'none' } }
    },
    {
      id: 'access',
      targetId: 'mobile-tutorial-btn-advanced-search',
      position: 'bottom',
      title: { es: "Acceso al Buscador", eu: "Bilatzailera sartzea" },
      content: {
        es: "Puedes abrir el buscador avanzado en cualquier momento desde el menú de herramientas. En móvil este menú se abre con el botón de hamburguesa superior.",
        eu: "Bilaketa aurreratua ireki dezakezu tresnen menutik. Mugikorrean menu hau goiko hanburgesa botoiarekin irekitzen dela gogoratu."
      },
      onEnterAction: { type: 'TOGGLE_MODAL', payload: { modalId: 'toolbar' } }
    },
    {
      id: 'tabs',
      targetId: 'advanced-search-tab-general',
      position: 'bottom',
      title: { es: "Secciones de Filtro", eu: "Iragazkien Atalak" },
      content: {
        es: "Los filtros están organizados en pestañas horizontales según su naturaleza: datos generales, localización, explotación, riesgos, infraestructura, etc. Deslízalas para explorar los campos.",
        eu: "Iragazkiak fitxa horizontaletan antolatuta daude euren izaeraren arabera: datu orokorrak, kokapena, ustiapena, arriskuak, etab. Pasatu itzazu eremuak arakatzeko."
      },
      onEnterAction: [
        { type: 'TOGGLE_MODAL', payload: { modalId: 'advanced-search' } }
      ]
    },
    {
      id: 'submit',
      targetId: 'advanced-search-btn-submit',
      position: 'top',
      title: { es: "Ejecutar Búsqueda", eu: "Bilaketa Gauzatu" },
      content: {
        es: "Una vez configurados tus filtros (que también permiten buscar campos vacíos o nulos), pulsa en 'Buscar' para aplicar el filtro y actualizar los vertederos visibles en el mapa.",
        eu: "Iragazkiak konfiguratu ondoren (eremu hutsak edo nuluak bilatzeko aukera ere ematen dutenak), egin klik 'Bilatu' botoian iragazkia aplikatzeko eta mapako zabortegiak eguneratzeko."
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
