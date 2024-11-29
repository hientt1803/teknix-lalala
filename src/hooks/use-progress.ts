import {create} from "zustand";

interface ProgressState {
    progress: number;
    isVisible: boolean;
    intervalId: NodeJS.Timeout | null;
    start: () => void;
    done: () => void;
    reset: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
    progress: 0,
    isVisible: false,
    intervalId: null,

    start: () => {
        const existingInterval = get().intervalId;
        if (existingInterval) {
            clearInterval(existingInterval);
        }

        set(() => ({
            progress: 0,
            isVisible: true,
        }));

        // Increment the progress bar by a smaller step (e.g., 2%) with a slower interval
        const interval = setInterval(() => {
            set((state) => {
                if (state.progress >= 90) {
                    clearInterval(interval);
                    return {progress: 90, intervalId: null};
                }
                return {progress: Math.min(state.progress + 2, 90)}; // Increment by 2%
            });
        }, 100); // Slower update frequency for smoother effect

        set(() => ({intervalId: interval}));
    },

    done: () => {
        const intervalId = get().intervalId;
        if (intervalId) {
            clearInterval(intervalId);
        }

        set(() => ({
            progress: 100,
        }));

        setTimeout(() => {
            set(() => ({
                isVisible: false,
                intervalId: null,
            }));

            setTimeout(() => {
                set(() => ({progress: 0}));
            }, 500);
        }, 200);
    },

    reset: () => {
        const intervalId = get().intervalId;
        if (intervalId) {
            clearInterval(intervalId);
        }

        set(() => ({
            progress: 0,
            isVisible: false,
            intervalId: null,
        }));
    },
}));
