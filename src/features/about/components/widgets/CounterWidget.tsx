// src/features/about/components/widgets/CounterWidget.tsx

import { useEffect, useState } from "react";
import type { CounterWidgetConfig } from "../../domain/types";
import { useLanguageStore } from "@shared/state/languageStore";
import { Clock, Ban } from "@shared/components/Icons";

interface Props {
  config: CounterWidgetConfig;
}

interface TimeState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  progress: number;
  isFinished: boolean;
}

export function CounterWidget({ config }: Props) {
  const { currentLanguage, t, formatDate } = useLanguageStore();

  const [state, setState] = useState<TimeState>({
    days: 0, hours: 0, minutes: 0, seconds: 0, progress: 0, isFinished: false
  });

  useEffect(() => {
    const calculate = () => {
      const now = Date.now();
      const start = config.startDate ? new Date(config.startDate).getTime() : now;
      const target = config.targetDate ? new Date(config.targetDate).getTime() : null;

      let effectiveCurrent = now;
      let isFinished = false;

      if (target && now >= target) {
        effectiveCurrent = target;
        isFinished = true;
      }

      const elapsed = Math.max(0, effectiveCurrent - start);

      const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
      const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

      let progress = 0;
      if (target) {
        const totalDuration = target - start;
        if (totalDuration > 0) {
          progress = Math.min(100, (elapsed / totalDuration) * 100);
        } else {
          progress = 100;
        }
      }

      setState({ days, hours, minutes, seconds, progress, isFinished });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [config.startDate, config.targetDate]);

  const getDynamicColor = () => {
    if (!config.targetDate) return "hsl(0, 80%, 60%)";

    const hue = 45 - (state.progress * 0.45);
    return `hsl(${hue}, 90%, 55%)`;
  };

  const dynamicColor = getDynamicColor();

  return (
    <div
      className="relative overflow-hidden rounded-xl border bg-slate-50 p-5 shadow-sm transition-colors"
      style={{ borderColor: config.targetDate ? dynamicColor : '#e2e8f0' }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Cabecera */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
            style={{ color: dynamicColor }}
          >
            {state.isFinished ? <Ban size={20} /> : <Clock size={20} />}
          </div>
          <div>
            <h4 className="font-bold leading-tight text-slate-800">
              {config.label[currentLanguage]}
            </h4>

            {/* ETIQUETA DE FECHA LÍMITE */}
            {config.targetDate && config.targetDateLabel && (
              <div className="mt-1 flex flex-wrap gap-1 text-[11px] font-medium text-slate-500">
                <span>{config.targetDateLabel[currentLanguage]}</span>
                <span className="text-slate-700 font-bold">
                  {formatDate(config.targetDate, 'numeric')}
                </span>
              </div>
            )}

            {/* Mensaje de Finalizado */}
            {state.isFinished && (
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-red-600">
                {t("about.widget.countdown.finished")}
              </span>
            )}

            {/* Porcentaje numérico */}
            {!state.isFinished && config.targetDate && (
              <span className="mt-1 block text-[10px] font-medium text-slate-400">
                {Math.round(state.progress)}%
              </span>
            )}
          </div>
        </div>

        {/* Números */}
        <div className="flex justify-center gap-2 text-center" style={{ color: dynamicColor }}>
          <TimeUnit value={state.days} label={t("about.widget.countdown.days")} />
          <span className="mt-2 text-lg font-light opacity-30">:</span>
          <TimeUnit value={state.hours} label="H" />
          <span className="mt-2 text-lg font-light opacity-30">:</span>
          <TimeUnit value={state.minutes} label="Min" />
          <span className="mt-2 text-lg font-light opacity-30">:</span>
          <TimeUnit value={state.seconds} label="Seg" />
        </div>
      </div>

      {/* BARRA DE PROGRESO */}
      {config.targetDate && (
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full transition-all duration-1000 ease-linear"
            style={{
              width: `${state.progress}%`,
              backgroundColor: dynamicColor
            }}
          />
        </div>
      )}
    </div>
  );
}

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center min-w-12">
    <span className="text-2xl font-mono font-bold leading-none tracking-tight">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-[9px] uppercase font-bold opacity-60 mt-1">{label}</span>
  </div>
);