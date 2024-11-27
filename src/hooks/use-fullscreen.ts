import {useCallback, useRef, useState} from "react";

function useFullscreen<T extends HTMLElement = any>() {
    const [fullscreen, setFullscreen] = useState(false);
    const elementRef = useRef<T | null>(null);

    const handleChange = () => {
        setFullscreen(!!document.fullscreenElement);
    };

    const toggle = useCallback(async () => {
        if (!elementRef.current) return;

        if (!document.fullscreenElement) {
            await elementRef.current.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    }, []);

    const ref = useCallback((element: T | null) => {
        if (element) {
            elementRef.current = element;
            document.addEventListener("fullscreenchange", handleChange);
        } else {
            document.removeEventListener("fullscreenchange", handleChange);
        }
    }, []);

    return {ref, toggle, fullscreen};
}

export default useFullscreen;
