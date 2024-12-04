import { LatLngExpression, Map } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';

import useMapContext from '@/components/common/map/useMapContext';
import { AppConfig } from '@/lib/AppConfig';
import { PlacesClusterType, PlacesType } from '@/lib/Places';
import { useAppSelector } from '@/stores';

interface useMapDataValues {
  locations?: PlacesType;
  map?: Map;
  center?: LatLngExpression;
  viewportWidth?: number;
  viewportHeight?: number;
}

interface allMarkerPosValues {
  minZoom: number;
  centerPos: LatLngExpression;
}

const useMarkerData = ({
  locations,
  map,
  center,
  viewportWidth,
  viewportHeight,
}: useMapDataValues) => {
  const searchGlobal = useAppSelector(state => state.globalSlice.searchGlobal);

  const [allMarkersBoundCenter, setAllMarkersBoundCenter] =
    useState<allMarkerPosValues>({
      minZoom: AppConfig.minZoom - 5,
      centerPos: center || [
        searchGlobal.location.lat || 0,
        searchGlobal.location.lon || 0,
      ],
    });
  const { leafletLib } = useMapContext();

  // get bounds of all markers
  const allMarkerBounds = useMemo(() => {
    if (!locations || !leafletLib) return;

    const coordsSum: LatLngExpression[] = [];
    locations.forEach(item => {
      coordsSum.push(item.position);
    });
    return leafletLib.latLngBounds(coordsSum);
  }, [leafletLib, locations]);

  const clustersByCategory = useMemo(() => {
    if (!locations) return;
    const groupedLocations = locations.reduce<PlacesClusterType>(
      (accumulator, location) => {
        const { category } = location;
        if (!accumulator[category]) {
          accumulator[category] = [];
        }
        accumulator[category].push(location);
        return accumulator;
      },
      {},
    );

    const mappedClusters = Object.keys(groupedLocations).map(key => ({
      category: Number(key),
      markers: groupedLocations[key],
    }));

    return mappedClusters;
  }, [locations]);

  // auto resize map to fit all markers on viewport change
  // it's crucial to set viewport size as dependecy to trigger the map resize
  useEffect(() => {
    if (!map) return;
    if (!viewportWidth || !viewportHeight) return;

    map.invalidateSize();

    const minZoom =
      allMarkerBounds && allMarkerBounds.isValid()
        ? map.getBoundsZoom(allMarkerBounds)
        : AppConfig.minZoom;

    const centerPos = center
      ? (center as LatLngExpression) // Use the provided center if available
      : allMarkerBounds && allMarkerBounds.isValid()
        ? ([
            allMarkerBounds.getCenter().lat,
            allMarkerBounds.getCenter().lng,
          ] as LatLngExpression) // Fallback to bounds center if valid
        : AppConfig.baseCenter; // Final fallback to base center

    setAllMarkersBoundCenter({
      minZoom,
      centerPos,
    });
  }, [allMarkerBounds, map, viewportWidth, viewportHeight]);

  return { clustersByCategory, allMarkersBoundCenter };
};

export default useMarkerData;
