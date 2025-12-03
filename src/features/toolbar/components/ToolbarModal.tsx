import { useUiStore } from "@features/map/state/uiStore";
import { useToolbarMenu } from "../hooks/useToolbarMenu";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";

interface ToolbarModalProps {
  onOpenIndex: () => void;
}

export function ToolbarModal({ onOpenIndex }: ToolbarModalProps) {
  const { closeModal } = useUiStore();

  const { menuStructure } = useToolbarMenu({
    onOpenIndex,
    onCloseUi: () => closeModal(),
  });

  const { modalRef, handleMouseEnter, handleMouseLeave } =
    useMapModalInteractions();

  const getItemClasses = (item: any) => {
    const baseClasses =
      "group flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-200";

    if (item.disabled) {
      return `${baseClasses} cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400`;
    }
    if (item.isFutureFeature) {
      return `${baseClasses} border-dashed border-emerald-300 bg-emerald-50/50 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50`;
    }

    if (item.isActive) {
      return `${baseClasses} border-slate-900 bg-slate-900 text-white font-medium`;
    }

    return `${baseClasses} border-slate-200 bg-white text-slate-700 shadow-sm hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900 hover:shadow-md hover:shadow-emerald-100/50`;
  };

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl`}
    >
      {/* ─── HEADER ─── */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50/50 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Menú Principal
          </h2>
          <p className="text-[11px] text-slate-500">Herramientas y opciones</p>
        </div>
        <button
          onClick={() => closeModal()}
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
      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30 p-4">
        <div className="space-y-5">
          {menuStructure.map((section) => (
            <section key={section.id}>
              <div className="mb-2 px-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                {section.label}
              </div>

              <div className="space-y-1">
                {section.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={!item.disabled ? item.action : undefined}
                    className={getItemClasses(item)}
                  >
                    <span>{item.label}</span>

                    {/* Icono condicional */}
                    {!item.disabled && (
                      <>
                        {item.isFutureFeature ? (
                          <svg
                            className="h-4 w-4 text-emerald-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        ) : (
                          <svg
                            className={`h-4 w-4 transition-colors ${
                              item.isActive
                                ? "text-white"
                                : "text-slate-300 group-hover:text-emerald-500"
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        )}
                      </>
                    )}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
