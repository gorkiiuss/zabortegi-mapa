import { useEffect } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { Globe, Info, Mail, Phone, X } from "@shared/components/Icons";

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
        <X size={16} />
      </button>

      <div className="flex flex-col items-center gap-5 text-center">
        {/* Encabezado: Icono Principal y Título */}
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-emerald-50 p-3 text-emerald-500">
            {/* Icono de Información / Contacto */}
            <Info size={32} />
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
              <Phone size={18} />
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
              <Mail size={18} />
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
              <Globe size={18} />
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
