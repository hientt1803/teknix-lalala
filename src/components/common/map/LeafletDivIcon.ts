import Leaflet, {PointExpression} from "leaflet";
import {renderToString} from "react-dom/server";

interface divIconValues {
    source: JSX.Element;
    anchor: PointExpression;
    className?: string;
}

const LeafletDivIcon = ({source, anchor, className}: divIconValues) =>
    Leaflet?.divIcon({
        html: renderToString(source),
        iconAnchor: anchor,
        className: className,
    });

export default LeafletDivIcon;
