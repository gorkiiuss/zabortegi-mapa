// src/features/tutorial/data/advancedSearchTutorial.ts

import type { TutorialDefinition } from "../types";

export const advancedSearchTutorial: TutorialDefinition = {
  id: 'advanced-search-tour',
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
      targetId: 'desktop-tutorial-btn-advanced-search',
      position: 'right',
      title: { es: "Acceso al Buscador", eu: "Bilatzailera sartzea" },
      content: {
        es: "Puedes abrir el buscador avanzado en cualquier momento desde el menú de herramientas de la barra de navegación.",
        eu: "Nahi duzunean ireki dezakezu bilaketa aurreratua tresnen menutik."
      },
      onEnterAction: { type: 'OPEN_TOOLBAR_DROPDOWN', payload: { dropdownId: 'tools' } }
    },
    {
      id: 'tabs',
      targetId: 'advanced-search-tab-general',
      position: 'right',
      title: { es: "Secciones de Filtro", eu: "Iragazkien Atalak" },
      content: {
        es: "Los filtros están organizados en pestañas laterales según su naturaleza: datos generales, localización, explotación, riesgos, infraestructura, etc. Haz clic en ellas para explorar sus campos.",
        eu: "Iragazkiak fitxa lateraletan antolatuta daude euren izaeraren arabera: datu orokorrak, kokapena, ustiapena, arriskuak, etab. Egin klik haietan eremuak arakatzeko."
      },
      onEnterAction: [
        { type: 'OPEN_TOOLBAR_DROPDOWN', payload: { dropdownId: null } },
        { type: 'TOGGLE_MODAL', payload: { modalId: 'advanced-search', stackPrevious: true } }
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
        { type: 'TOGGLE_MODAL', payload: { modalId: 'advanced-search', stackPrevious: true } }
      ]
    }
  ],
  onCompleteAction: [
    { type: 'TOGGLE_MODAL', payload: { modalId: 'none' } }
  ]
};
