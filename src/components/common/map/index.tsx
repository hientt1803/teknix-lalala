import dynamic from 'next/dynamic';

import 'leaflet/dist/leaflet.css';
import './leaflet-custom.css';

import { useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { AppConfig } from '@/lib/AppConfig';
import MarkerCategories, { Category } from '@/lib/MarkerCategories';
import { Places, PlaceValues } from '@/lib/Places';

import LeafleftMapContextProvider from './LeafletMapContextProvider';
import useMapContext from './useMapContext';
import useMarkerData from './useMarkerData';
import { LatLngExpression } from 'leaflet';
import useFullscreen from '@/hooks/use-fullscreen';
import LeafletgeoSearch from './search';

const LeafletCluster = dynamic(async () => (await import('./LeafletCluster')).LeafletCluster(), {
   ssr: false,
});
const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
   ssr: false,
});
const CustomMarker = dynamic(async () => (await import('./LeafletMarker')).CustomMarker, {
   ssr: false,
});
const LocateButton = dynamic(async () => (await import('./ui/LocateButton')).LocateButton, {
   ssr: false,
});
const FullscreenButton = dynamic(
   async () => (await import('./ui/FullscreenButton')).FullScreenButton,
   {
      ssr: false,
   },
);
const LeafletMapContainer = dynamic(
   async () => (await import('./LeafletMapContainer')).LeafletMapContainer,
   {
      ssr: false,
   },
);
const Search = dynamic(async () => (await import('./search')).default, {
   ssr: false,
});

interface LeafletMapDataProps {
   data?: PlaceValues[];
   center?: LatLngExpression;
}
const LeafletMapInner = ({ data, center }: LeafletMapDataProps) => {
   const { map } = useMapContext();
   const {
      width: viewportWidth,
      height: viewportHeight,
      ref: viewportRef,
   } = useResizeDetector({
      refreshMode: 'debounce',
      refreshRate: 200,
   });

   const { ref, toggle, fullscreen } = useFullscreen<HTMLDivElement>();

   const { clustersByCategory, allMarkersBoundCenter } = useMarkerData({
      locations: data,
      center: center,
      map,
      viewportWidth,
      viewportHeight,
   });

   const isLoading = !map || !viewportWidth || !viewportHeight;

   /** watch position & zoom of all markers */
   useEffect(() => {
      if (!allMarkersBoundCenter || !map) return;

      const moveEnd = () => {
         map.off('moveend', moveEnd);
      };

      map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, {
         animate: false,
      });
      map.once('moveend', moveEnd);
   }, [allMarkersBoundCenter, map]);

   return (
      <div className="absolute h-full w-full overflow-hidden" ref={viewportRef}>
         <div
            ref={ref}
            className={`absolute left-0 w-full transition-opacity ${isLoading ? 'opacity-0' : 'opacity-1 '}`}
            style={{
               // top: AppConfig.ui.topBarHeight,
               width: '100%',
               height: '100%',
            }}
         >
            {allMarkersBoundCenter && clustersByCategory && (
               <LeafletMapContainer
                  center={allMarkersBoundCenter.centerPos}
                  zoom={allMarkersBoundCenter.minZoom}
                  maxZoom={AppConfig.maxZoom}
                  minZoom={AppConfig.minZoom}
               >
                  {!isLoading ? (
                     <>
                        <Search map={map} />
                        <CenterToMarkerButton
                           center={allMarkersBoundCenter.centerPos}
                           zoom={allMarkersBoundCenter.minZoom}
                        />
                        <FullscreenButton fullScreen={fullscreen} toggle={toggle} />

                        <LocateButton />
                        {Object.values(clustersByCategory).map((item) => (
                           <LeafletCluster
                              key={item.category}
                              icon={MarkerCategories[item.category as Category].icon}
                              color={MarkerCategories[item.category as Category].color}
                              chunkedLoading
                           >
                              {item.markers.map((marker) => (
                                 <CustomMarker place={marker} key={marker.id} />
                              ))}
                           </LeafletCluster>
                        ))}
                     </>
                  ) : (
                     // we have to spawn at least one element to keep it happy
                     // eslint-disable-next-line react/jsx-no-useless-fragment
                     <></>
                  )}
               </LeafletMapContainer>
            )}
         </div>
      </div>
   );
};

const Map = ({ data, center }: LeafletMapDataProps) => (
   <LeafleftMapContextProvider>
      <LeafletMapInner data={data} center={center} />
   </LeafleftMapContextProvider>
);

export default Map;
