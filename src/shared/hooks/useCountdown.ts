// src/shared/hooks/useCountdown.ts

import { useState, useEffect } from "react";

export interface TimeState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    progress: number;
    isFinished: boolean;
}

export interface UseCountdownParams {
    startDate?: string;
    targetDate?: string;
}

export function useCountdown({ startDate, targetDate }: UseCountdownParams): TimeState {
    const [state, setState] = useState<TimeState>({
        days: 0, hours: 0, minutes: 0, seconds: 0, progress: 0, isFinished: false
    });

    useEffect(() => {
        const calculate = () => {
            const now = Date.now();
            const start = startDate ? new Date(startDate).getTime() : now;
            const target = targetDate ? new Date(targetDate).getTime() : null;

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
    }, [startDate, targetDate]);

    return state;
}
