import {Tooltip, TooltipProps} from "react-leaflet";

import {MarkerCategoriesValues} from "@/lib/MarkerCategories";
import {PlaceValues} from "@/lib/Places";
import { formatCurrency } from "@/utilities/currency";

interface LeafletTooltipProps extends TooltipProps {
    item: PlaceValues;
    color: MarkerCategoriesValues["color"];
    icon: MarkerCategoriesValues["icon"];
}

const LeafletTooltip = ({color, icon, item, ...props}: LeafletTooltipProps) => {
    const {title, address, id, price, star} = item;

    return <Tooltip {...props}>{formatCurrency(price)}</Tooltip>;
};

export default LeafletTooltip;
