import { useContext } from 'react';

import { MapContext } from './LeafletMapContextProvider';

const useMapContext = () => {
  const mapInstance = useContext(MapContext);
  const map = mapInstance?.map;
  const setMap = mapInstance?.setMap;
  const leafletLibrary = mapInstance?.leafletLib;
  const setLeafletLibrary = mapInstance?.setLeafletLib;

  return {
    map,
    setMap,
    leafletLib: leafletLibrary,
    setLeafletLib: setLeafletLibrary,
  };
};

export default useMapContext;
