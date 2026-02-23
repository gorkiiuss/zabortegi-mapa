// src/features/tutorial/components/TutorialManager.tsx

import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTutorialStore } from "../state/tutorialStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { useAppOrchestrator } from "@features/orchestrator/hooks/useAppOrchestrator";
import { X, ChevronRight, ChevronLeft, GraduationCap } from "@shared/components/Icons";
import { LanguageSelector } from "@shared/components/LanguageSelector";

const TUTORIAL_STYLES = `
  .tutorial-pulse-ring {
    position: absolute;
    border-radius: 12px;
    pointer-events: none;
    z-index: 9998;
    box-shadow: 0 0 0 2px #dc2626, 0 0 0 4px rgba(220, 38, 38, 0.3);
    animation: tutorial-pulse 1.8s infinite;
  }
  
  @keyframes tutorial-pulse {
    0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
    70% { box-shadow: 0 0 0 15px rgba(220, 38, 38, 0); }
    100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
  }
`;

export function TutorialManager() {
  const { activeTutorialId, currentStepIndex, tutorials, nextStep, prevStep, endTutorial } = useTutorialStore();
  const { currentLanguage } = useLanguageStore();
  const { dispatch } = useAppOrchestrator();
  const lang = currentLanguage as 'es' | 'eu';

  const cardRef = useRef<HTMLDivElement>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [cardRect, setCardRect] = useState<{ width: number, height: number } | null>(null);
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    if (!document.getElementById("tutorial-styles")) {
      const style = document.createElement("style");
      style.id = "tutorial-styles";
      style.textContent = TUTORIAL_STYLES;
      document.head.appendChild(style);
    }
  }, []);

  const activeTutorial = activeTutorialId ? tutorials[activeTutorialId] : null;
  const currentStep = activeTutorial ? activeTutorial.steps[currentStepIndex] : null;

  useEffect(() => {
    if (currentStep?.onEnterAction) {
      if (Array.isArray(currentStep.onEnterAction)) {
        currentStep.onEnterAction.forEach(action => dispatch(action));
      } else {
        dispatch(currentStep.onEnterAction);
      }
    }
  }, [currentStep, dispatch]);

  const handleFinish = () => {
    if (activeTutorial?.onCompleteAction) {
      if (Array.isArray(activeTutorial.onCompleteAction)) {
        activeTutorial.onCompleteAction.forEach(action => dispatch(action));
      } else {
        dispatch(activeTutorial.onCompleteAction);
      }
    }
    endTutorial();
  };

  useEffect(() => {
    if (!currentStep?.targetId) {
      setTargetRect(null);
      return;
    }

    let intervalId: ReturnType<typeof setInterval>;

    const updateMetrics = () => {
      const el = document.getElementById(currentStep.targetId!);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
        clearInterval(intervalId)
      }
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };

    updateMetrics();

    intervalId = setInterval(updateMetrics, 50);
    const timeoutId = setTimeout(() => clearInterval(intervalId), 1000);

    window.addEventListener("resize", updateMetrics);
    window.addEventListener("scroll", updateMetrics, true);

    return () => {
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("scroll", updateMetrics, true);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [currentStep?.targetId, activeTutorialId, currentStepIndex]);

  useLayoutEffect(() => {
    if (cardRef.current) {
      const { width, height } = cardRef.current.getBoundingClientRect();
      if (width > 0) setCardRect({ width, height });
    }
  }, [currentStepIndex, currentLanguage, activeTutorialId]);

  if (!activeTutorial || !currentStep) return null;

  const getCardPosition = () => {
    if (!currentStep.targetId || !targetRect) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', visibility: cardRect ? 'visible' : 'hidden' as any, opacity: cardRect ? 1 : 0 };
    }
    if (!cardRect) return { top: '0px', left: '0px', visibility: 'hidden' as any, opacity: 0 };

    const gap = 20;
    const margin = 20;
    const { width: W, height: H } = cardRect;
    const pos = currentStep.position || 'bottom';

    let top = 0, left = 0;

    switch (pos) {
      case 'top': top = targetRect.top - H - gap; left = targetRect.left + (targetRect.width / 2) - (W / 2); break;
      case 'bottom': top = targetRect.bottom + gap; left = targetRect.left + (targetRect.width / 2) - (W / 2); break;
      case 'left': top = targetRect.top + (targetRect.height / 2) - (H / 2); left = targetRect.left - W - gap; break;
      case 'right': top = targetRect.top + (targetRect.height / 2) - (H / 2); left = targetRect.right + gap; break;
      default: top = (windowSize.h / 2) - (H / 2); left = (windowSize.w / 2) - (W / 2);
    }

    left = Math.max(margin, Math.min(left, windowSize.w - W - margin));
    top = Math.max(margin, Math.min(top, windowSize.h - H - margin));

    return { top: `${top}px`, left: `${left}px`, transform: 'none', visibility: 'visible' as any, opacity: 1, position: 'absolute' as const };
  };

  const cardStyle = getCardPosition();
  const pulseStyle = targetRect ? { top: targetRect.top + window.scrollY, left: targetRect.left + window.scrollX, width: targetRect.width, height: targetRect.height } : undefined;

  return createPortal(
    <div className="fixed inset-0 z-9999 overflow-hidden">

      <div className="absolute inset-0 bg-slate-900/3 cursor-default pointer-events-auto" />
      {targetRect && (
        <div
          className="tutorial-pulse-ring transition-all duration-300 pointer-events-none"
          style={{ ...pulseStyle, zIndex: 10 }}
        />
      )}
      <div
        ref={cardRef}
        className="absolute transition-all duration-300 ease-out w-[90vw] max-w-[380px] pointer-events-auto flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        style={{ ...cardStyle, zIndex: 20 }}
      >
        <div className="flex shrink-0 flex-col border-b border-slate-200 bg-slate-50/50">

          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {activeTutorial.title[lang]} • {currentStepIndex + 1}/{activeTutorial.steps.length}
            </p>

            <div className="flex items-center gap-2">
              {currentStep.id === 'welcome' && (
                <div className="pointer-events-auto scale-90 origin-right">
                  <LanguageSelector />
                </div>
              )}

              <div className="mx-1 h-4 w-px bg-slate-200" />

              <button
                onClick={handleFinish}
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                aria-label="Cerrar Tutorial"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="px-4 pb-3">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-tight">
              <GraduationCap size={16} className="shrink-0 text-emerald-600" />
              <span className="truncate">{currentStep.title[lang]}</span>
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white p-5">
          <p className="text-[13px] leading-relaxed text-slate-600">
            {currentStep.content[lang]}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/30 px-4 py-3">
          <button
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className={`group flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-800 ${currentStepIndex === 0 ? "invisible" : ""}`}
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            {lang === 'es' ? 'Anterior' : 'Aurrekoa'}
          </button>

          <button
            onClick={currentStepIndex === activeTutorial.steps.length - 1 ? handleFinish : nextStep}
            className="group flex items-center gap-2 rounded-xl border border-slate-900 bg-slate-900 px-5 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl active:scale-95"
          >
            {currentStepIndex === activeTutorial.steps.length - 1
              ? (lang === 'es' ? 'Empezar' : 'Hasi')
              : (lang === 'es' ? 'Siguiente' : 'Hurrengoa')
            }
            {currentStepIndex !== activeTutorial.steps.length - 1 && (
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}