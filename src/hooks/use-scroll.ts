import {useRef} from "react";

interface ScrollIntoViewOptions {
    offset?: number;
    alignment?: "start" | "center" | "end";
}

export function useScrollIntoView<T extends HTMLElement>({
    offset = 0,
    alignment = "start",
}: ScrollIntoViewOptions) {
    const targetRef = useRef<T | null>(null);

    const scrollIntoView = () => {
        if (targetRef.current) {
            const behavior = "smooth";
            // const block = alignment;

            const targetPosition = targetRef.current.getBoundingClientRect().top;
            const offsetPosition = targetPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior,
            });
        }
    };

    return {scrollIntoView, targetRef};
}
