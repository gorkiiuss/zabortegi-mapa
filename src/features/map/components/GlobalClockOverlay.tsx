// src/features/map/components/GlobalClockOverlay.tsx

import { useLanguageStore } from "@shared/state/languageStore";
import { useCountdown } from "@shared/hooks/useCountdown";
import { Clock } from "@shared/components/Icons";
import { useUiStore } from "@features/map/state/uiStore";

export function GlobalClockOverlay() {
    const { t } = useLanguageStore();
    const openModal = useUiStore((s) => s.openModal);

    const state = useCountdown({
        startDate: "2024-05-14",
        targetDate: "2028-04-01"
    });

    const getDynamicColor = () => {
        const hue = 45 - (state.progress * 0.45);
        return `hsl(${hue}, 90%, 55%)`;
    };

    const dynamicColor = getDynamicColor();

    const handleClick = () => {
        openModal("about", false, {
            initialTab: "announcements",
            targetAnnouncementId: "zabortegien_zerratzea-02_17-2026"
        });
    };

    return (
        <button
            onClick={handleClick}
            className="group pointer-events-auto flex items-center justify-center rounded-2xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:border-slate-300 active:scale-95 overflow-hidden"
            aria-label={t("clock.label")}
        >
            {/* MOBILE ONLY (SQUARE VIEW) */}
            <div
                className="flex md:hidden h-14 w-14 flex-col items-center justify-center relative"
                style={{ color: dynamicColor }}
            >
                <span className="text-2xl font-bold tabular-nums leading-none tracking-tight">
                    {state.days}
                </span>
                <span className="text-[10px] font-bold uppercase opacity-80 mt-0.5">
                    {t("clock.days")}
                </span>

                {/* Progress bar at the bottom of the square */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-200">
                    <div className="h-full transition-all duration-1000 ease-linear" style={{ width: `${state.progress}%`, backgroundColor: dynamicColor }} />
                </div>
            </div>

            {/* TABLET / DESKTOP (EXTENDED VIEW) */}
            <div className="hidden md:flex items-center gap-3 p-3 pr-5">
                <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 shadow-inner transition-transform group-hover:scale-105"
                    style={{ color: dynamicColor }}
                >
                    <Clock size={20} className="h-5 w-5" />
                </div>

                <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-500 transition-colors">
                        {t("clock.label")}
                    </span>

                    <div className="flex items-end gap-1.5 mt-0.5" style={{ color: dynamicColor }}>

                        {/* Days */}
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold tabular-nums leading-none tracking-tight">
                                {String(state.days).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] font-semibold opacity-60">
                                {t("clock.days")}
                            </span>
                        </div>

                        <span className="text-lg font-light opacity-30 leading-none mb-0.5">:</span>

                        {/* Hours */}
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold tabular-nums leading-none tracking-tight">
                                {String(state.hours).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] font-semibold opacity-60">
                                {t("clock.hours")}
                            </span>
                        </div>

                        <span className="text-lg font-light opacity-30 leading-none mb-0.5">:</span>

                        {/* Minutes */}
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold tabular-nums leading-none tracking-tight">
                                {String(state.minutes).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] font-semibold opacity-60">
                                {t("clock.mins")}
                            </span>
                        </div>

                        {/* Seconds (Only on XL screens) */}
                        <span className="hidden xl:inline text-lg font-light opacity-30 leading-none mb-0.5">:</span>
                        <div className="hidden xl:flex items-baseline gap-1">
                            <span className="text-xl font-bold tabular-nums leading-none tracking-tight">
                                {String(state.seconds).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] font-semibold opacity-60">
                                {t("clock.secs")}
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Progress bar for Extended View */}
            <div className="hidden md:block absolute bottom-0 left-0 h-[3px] w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-full bg-slate-200">
                    <div className="h-full transition-all duration-1000 ease-linear" style={{ width: `${state.progress}%`, backgroundColor: dynamicColor }} />
                </div>
            </div>
        </button>
    );
}
