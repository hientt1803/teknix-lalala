import { LatLngExpression } from 'leaflet';

// FIXME: naming and structure
export const AppConfig = {
  minZoom: 9,
  maxZoom: 18, // max zoom level of CARTO: 18
  ui: {
    topBarHeight: 80,
    bigIconSize: 48,
    mapIconSize: 32,
    markerIconSize: 32,
    menuIconSize: 16,
    topBarIconSize: 24,
  },
  baseCenter: [
    52.020_225_925_979_71, 8.530_780_645_829_076,
  ] as LatLngExpression, // bielefeld lol
};

export enum NavMenuVariant {
  INTRO = 'vertical',
  TOPNAV = 'horizontal',
}
