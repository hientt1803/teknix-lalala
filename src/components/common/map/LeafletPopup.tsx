import {ChevronLeft, ChevronRight, X} from "lucide-react";
import dynamic from "next/dynamic";
import {Popup, PopupProps} from "react-leaflet";

import {AppConfig} from "@/lib/AppConfig";
import {MarkerCategoriesValues} from "@/lib/MarkerCategories";
import {PlaceValues} from "@/lib/Places";

import {formatCurrency} from "@/utilities/currency";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MarkerIconWrapper = dynamic(
    () => import("@/components/common/map/LeafletMarker/MarkerIconWrapper")
);
interface LeafletPopupProps extends PopupProps {
    handlePopupClose: (active?: boolean) => void;
    handleOpenLocation: (value: string) => void;
    item: PlaceValues;
    color: MarkerCategoriesValues["color"];
    icon: MarkerCategoriesValues["icon"];
}

const LeafletPopup = ({
    handlePopupClose,
    handleOpenLocation,
    color,
    icon,
    item,
    ...props
}: LeafletPopupProps) => {
    const {title, address, id, price, star} = item;

    return (
        <Popup  {...props}>
            <Card
                className="absolute shadow p-3 min-w-[300px]"
                style={{
                    // todo: rework the offsets at some point
                    marginLeft: `calc(-150px + ${AppConfig.ui.markerIconSize - 5}px)`,

                    // todo: some offest to align with the marker icon
                    marginTop: -1,
                }}
            >
                <div className="flex flex-col gap-2">
                    <div className="aspect-video h-40">
                        <img
                            src={
                                item?.image && item.image.length > 0 ? item.image[0] : ""
                            }
                            className="w-full h-full object-cover"
                        />
                        <br />
                    </div>
                    <h3 className="text-lg font-bold leading-none pt-2">{title}</h3>
                    <p className="text-secondary">{address}</p>
                    <p className="mt-3 text-secondary font-bold text-xl flex justify-between">
                        <span className="flex items-center space-x-1 text-sm">
                            <span className="pb-[2px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="w-[18px] h-[18px] text-orange-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    />
                                </svg>
                            </span>
                            <span className="font-medium">{star}</span>
                            <span className="text-slate-500 dark:text-slate-400">
                                (28)
                            </span>
                        </span>
                        <span>{formatCurrency(price)}</span>
                    </p>
                </div>
                {/* todo: new component for button group */}
                {id !== "user_location" && (
                    <div className="mt-6 flex flex-row justify-between gap-2 p-2">
                        <Button
                            className="gap-2"
                            variant={"secondary"}
                            onClick={() => handlePopupClose()}
                        >
                            <ChevronLeft size={AppConfig.ui.menuIconSize} />
                            Close
                        </Button>
                        <Button className="gap-2" onClick={() => handleOpenLocation(id)}>
                            Open
                            <ChevronRight size={AppConfig.ui.menuIconSize} />
                        </Button>
                    </div>
                )}
            </Card>
        </Popup>
    );
};

export default LeafletPopup;
