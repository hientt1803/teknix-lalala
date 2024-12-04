import 'leaflet-geosearch/dist/geosearch.css';

import L, { Map } from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@/stores';
import { setSearchGlobalLocation } from '@/stores/features/global/global-slice';
import { setRegion } from '@/stores/features/region';
import { setTriggerSearch } from '@/stores/features/stay';

interface LocationBounds {
  bounds: [number, number][];
}

interface LocationRawData {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [string, string, string, string];
}

interface GeoSearchLocation {
  x: number; // longitude
  y: number; // latitude
  label: string;
  bounds: LocationBounds['bounds'];
  raw: LocationRawData;
}

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LeafletgeoSearch = ({ map }: { map: Map | null }) => {
  const dispatch = useDispatch();
  const searchGlobal = useAppSelector(state => state.globalSlice.searchGlobal);
  const markerRef = useRef<L.Marker | null>(null); // Reference to the current marker

  const handleSelectedDestination = (region: GeoSearchLocation) => {
    // Clear existing marker
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    // Dispatch location to Redux
    dispatch(
      setSearchGlobalLocation({
        name: region.label,
        searchType: 'region',
        regionId: region.raw.place_id,
        lat: region.y,
        lon: region.x,
        radius: searchGlobal.location.radius || 15_000,
      }),
    );
    dispatch(
      setRegion({
        id: region.raw.place_id,
        country_code: '',
        name: region.label,
        type: '',
      }),
    );
    dispatch(setTriggerSearch(true));

    // Create a new marker
    const newMarker = L.marker([region.y, region.x], { icon: icon }).addTo(
      map!,
    );
    const tooltipContent = `
            <div>
                <h4 className="text-2xl">${region.label}</h4>
                <p>Latitude: ${region.y}, Longitude: ${region.x}</p>
            </div>
        `;
    newMarker.bindTooltip(tooltipContent, {
      permanent: false,
      className: 'rounded-2xl',
      direction: 'top',
    });

    // Update marker reference
    markerRef.current = newMarker;
  };

  useEffect(() => {
    if (!map) return;

    const provider = new OpenStreetMapProvider();
    const searchControl = GeoSearchControl({
      provider,
      showMarker: false, // Disable automatic marker creation
      showPopup: false, // Disable default popup
      style: 'bar',
      classNames: {
        input: 'bg-white text-black',
        container: 'bg-white text-black',
      },
    });

    map.addControl(searchControl);

    // Listen for location selection events
    map.on('geosearch/showlocation', (res: any) => {
      const { location } = res;
      handleSelectedDestination(location);
    });

    // Update the search bar input with initial Redux state
    if (searchGlobal?.location?.name) {
      const searchInput: HTMLInputElement | null = document.querySelector(
        '.leaflet-control-geosearch form input',
      );
      if (searchInput) {
        searchInput.value = searchGlobal.location.name;
      }
    }

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, searchGlobal.location]);

  return null;
};

export default LeafletgeoSearch;
