import {LatLngExpression} from "leaflet";
import {Expand, Shrink} from "lucide-react";
import {useCallback, useState} from "react";
import {useMapEvents} from "react-leaflet";

import {AppConfig} from "@/lib/AppConfig";

import useMapContext from "../useMapContext";
import {Button} from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface FullScreenButtonProps {
    toggle: () => void;
    fullScreen: boolean;
}

export const FullScreenButton = ({fullScreen, toggle}: FullScreenButtonProps) => {
    const [isTouched, setIsTouched] = useState(false);
    const {map} = useMapContext();

    const touch = useCallback(() => {
        if (!isTouched && map) {
            setIsTouched(true);
        }
    }, [isTouched, map]);

    useMapEvents({
        move() {
            touch();
        },
        zoom() {
            touch();
        },
    });

    const handleClick = useCallback(() => {
        toggle();
    }, [map, isTouched, toggle, fullScreen]);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        type="button"
                        style={{zIndex: 400}}
                        size={"icon"}
                        className={`absolute top-2 right-3 rounded p-2 shadow-md`}
                        onClick={() => handleClick()}
                    >
                        {fullScreen ? (
                            <Shrink size={AppConfig.ui.mapIconSize} />
                        ) : (
                            <Expand size={AppConfig.ui.mapIconSize} />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Full screen</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
