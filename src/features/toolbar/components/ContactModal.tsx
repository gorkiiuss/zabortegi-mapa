import { useEffect } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";

export function ContactModal() {
  const { handleMouseEnter, handleMouseLeave, modalRef } =
    useMapModalInteractions();
  const { closeModal } = useUiStore();
  const { t } = useLanguageStore();

  const handleClose = () => closeModal();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto relative flex w-full max-w-sm flex-col self-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl`}
    >
      {/* Botón Cerrar (X) */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        aria-label="Cerrar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="flex flex-col items-center gap-5 text-center">
        {/* Encabezado: Icono Principal y Título */}
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-emerald-50 p-3 text-emerald-500">
            {/* Icono de Información / Contacto */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-800">
              {t("contact.title")}
            </h2>
            <p className="text-sm text-slate-500">{t("contact.subtitle")}</p>
          </div>
        </div>

        {/* Lista de Datos de Contacto */}
        <div className="flex w-full flex-col gap-2">
          {/* 1. Teléfono */}
          <a
            href="tel:+34945000000"
            className="group flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
          >
            <div className="rounded-lg bg-white p-2 text-slate-400 shadow-sm transition-colors group-hover:text-emerald-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                {t("contact.phone")}
              </span>
              <span className="text-sm font-medium">+34 667 93 61 26</span>
            </div>
          </a>

          {/* 2. Email */}
          <a
            href="mailto:info@example.eus"
            className="group flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
          >
            <div className="rounded-lg bg-white p-2 text-slate-400 shadow-sm transition-colors group-hover:text-emerald-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                {t("contact.email")}
              </span>
              <span className="text-sm font-medium">
                barakaldo@ekologistakmartxan.org
              </span>
            </div>
          </a>

          {/* 3. Web */}
          <a
            href="https://www.euskadi.eus"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
          >
            <div className="rounded-lg bg-white p-2 text-slate-400 shadow-sm transition-colors group-hover:text-emerald-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                {t("contact.web")}
              </span>
              <span className="text-sm font-medium">
                ekologistakmartxan.org
              </span>
            </div>
          </a>
        </div>

        <button
          onClick={handleClose}
          className="mt-2 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          {t("contact.close")}
        </button>
      </div>
    </div>
  );
}
