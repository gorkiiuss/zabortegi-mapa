import { useUiStore } from "@features/map/state/uiStore";
import { useToolbarMenu } from "../hooks/useToolbarMenu";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { ChevronRight, Plus, X } from "@shared/components/Icons";

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
          <X size={18} />
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
                          <Plus size={14} className="text-emerald-500 transition-colors group-hover:text-emerald-600" />
                        ) : (
                          <ChevronRight size={14} />
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
