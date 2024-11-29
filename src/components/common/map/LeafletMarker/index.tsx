import dynamic from "next/dynamic";
import {useCallback, useEffect, useMemo, useRef} from "react";
import {Marker as ReactMarker, Tooltip} from "react-leaflet";
import {AppConfig} from "@/lib/AppConfig";
import MarkerCategories from "@/lib/MarkerCategories";
import {PlaceValues} from "@/lib/Places";
import LeafletDivIcon from "../LeafletDivIcon";
import useMapContext from "../useMapContext";
import MarkerIconWrapper from "./MarkerIconWrapper";
import {useRouter, useSearchParams} from "next/navigation";
// import {useHoverStore} from "@/hooks/use-hover-card";
import {Marker} from "leaflet";

const LeafletPopup = dynamic(() => import("../LeafletPopup"));
const LeafletTooltip = dynamic(() => import("../LeafletTooltip"));

export interface CustomMarkerProps {
    place: PlaceValues;
}

export const CustomMarker = ({place}: CustomMarkerProps) => {
    const {map} = useMapContext();
    const router = useRouter();
    const searchParams = useSearchParams(); 

    const markerCategory = useMemo(
        () => MarkerCategories[place.category],
        [place.category]
    );

    // const hoveredHotelId = useHoverStore((state) => state.hoveredHotelId);
    const markerRef = useRef<Marker>(null);

    const handlePopupClose = useCallback(() => {
        if (markerRef.current) {
            markerRef.current.closePopup();
        }
    }, []);
    const handleMarkerClick = useCallback(() => {
        if (!map) return;
        const clampZoom = map.getZoom() < 14 ? 14 : 18;
        map.setView(place.position, clampZoom);
        // setTimeout(() => map.setView(place.position, clampZoom), 3000);
    }, [map, place.position]);

    const handleOpenLocation = useCallback(
        (id: string) => {
            router.push(`/stays/${id}`);
        },
        [router]
    );

    // Debounce timeout reference
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    // useEffect(() => {
    //     // Clear previous timeout when hoveredHotelId changes
    //     if (debounceTimeout.current) {
    //         clearTimeout(debounceTimeout.current);
    //     }

    //     if (hoveredHotelId === place.id && markerRef.current) {
    //         // Trigger the popup with a debounce delay when this marker is hovered
    //         debounceTimeout.current = setTimeout(() => {
    //             markerRef.current?.openPopup();
    //             handleMarkerClick();
    //         }, 500);
    //     } else if (hoveredHotelId !== place.id && markerRef.current) {
    //         // Close the popup with a delay if hover state changes
    //         debounceTimeout.current = setTimeout(() => handlePopupClose(), 500);
    //     }

    //     // Clear timeout on cleanup to prevent memory leaks
    //     return () => {
    //         if (debounceTimeout.current) {
    //             clearTimeout(debounceTimeout.current);
    //         }
    //     };
    // }, [hoveredHotelId, handlePopupClose, handleMarkerClick, place.id]);
    return (
        <ReactMarker
            ref={markerRef}
            position={place.position}
            icon={LeafletDivIcon({
                source: (
                    <MarkerIconWrapper
                        color={markerCategory.color}
                        icon={markerCategory.icon}
                        // label={place.price + ""}
                    />
                ),
                anchor: [
                    AppConfig.ui.markerIconSize / 2,
                    AppConfig.ui.markerIconSize / 2,
                ],
            })}
            eventHandlers={{click: handleMarkerClick}}
            autoPan={false}
            autoPanOnFocus={false}
        >
            <LeafletPopup
                autoPan={false}
                autoClose
                closeButton={false}
                interactive
                item={place}
                color={markerCategory.color}
                icon={markerCategory.icon}
                handleOpenLocation={handleOpenLocation}
                handlePopupClose={handlePopupClose}
                searchParams={searchParams}
            />
            {place.id !== "user_location" && (
                <LeafletTooltip
                    direction="top"
                    permanent
                    color={markerCategory.color}
                    icon={markerCategory.icon}
                    item={place}
                />
            )}
        </ReactMarker>
    );
};
