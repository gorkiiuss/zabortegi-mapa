import { useEffect } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";

export function AttributionsModal() {
  // 1. Hooks de interacción
  const { handleMouseEnter, handleMouseLeave, modalRef } =
    useMapModalInteractions();

  // 2. Control del estado global
  const { closeModal } = useUiStore();

  const handleClose = () => closeModal();

  const { t } = useLanguageStore();

  // 3. Cerrar con tecla Escape
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
      className={`pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl`}
    >
      {/* ─── HEADER ─── */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            {t("attributions.title")}
          </h2>
        </div>
        <button
          onClick={handleClose}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
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
      </div>

      {/* ─── BODY ─── */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30 p-5">
        <div className="space-y-6">
          {/* SECCIÓN 1: ORGANIZACIÓN Y EQUIPO */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              {t("attributions.body.team.title")}
            </h3>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-800">
                  Ekologistak Martxan
                </p>
                <p className="text-xs text-slate-500">
                  {t("attributions.body.team.org_desc")}
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                <AttributionItem
                  name="Carlos Alonso Cidad"
                  role={t("attributions.body.team.coord_role")}
                />
                <AttributionItem
                  name="José Javier Vázquez"
                  role={t("attributions.body.team.coord_role")}
                />
                <AttributionItem
                  name="Simone Lara Ramírez"
                  role={t("attributions.body.team.geo_role")}
                />
                <AttributionItem
                  name="Gorka Puente Díez"
                  role={t("attributions.body.team.dev_role")}
                />
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: DATOS (Aquí está el cambio principal) */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
              {t("attributions.body.data.title")}
            </h3>
            <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
              <p
                dangerouslySetInnerHTML={{
                  __html: t("attributions.body.data.text"),
                }}
              />
            </div>
          </section>

          {/* SECCIÓN 3: TECNOLOGÍA */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              {t("attributions.body.code.title")}
            </h3>
            <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white text-sm shadow-sm">
              <li className="group flex items-center justify-between p-3">
                <span className="text-slate-700">OpenStreetMap</span>
                <span className="text-xs text-slate-400">
                  {t("attributions.body.code.osm")}
                </span>
              </li>
              <li className="group flex items-center justify-between p-3">
                <span className="text-slate-700">Leaflet</span>
                <span className="text-xs text-slate-400">
                  {t("attributions.body.code.leaflet")}
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function AttributionItem({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex flex-col gap-0.5 p-3 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-slate-700">{name}</span>
      <span className="w-fit rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-400">
        {role}
      </span>
    </div>
  );
}
