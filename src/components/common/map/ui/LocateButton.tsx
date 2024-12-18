import { LatLngExpression } from 'leaflet';
import { LocateFixed } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AppConfig } from '@/lib/AppConfig';
import { Category } from '@/lib/MarkerCategories';
import { PlaceValues } from '@/lib/Places';

import { CustomMarker } from '../LeafletMarker';
import useMapContext from '../useMapContext';

interface LocationButtonProps {
  place?: PlaceValues;
}

export const LocateButton = ({ place }: LocationButtonProps) => {
  const { map } = useMapContext();
  const [userPosition, setUserPosition] = useState<
    LatLngExpression | undefined
  >();

  const handleClick = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      setUserPosition(undefined);
    }
  }, []);

  useEffect(() => {
    if (userPosition) {
      map?.flyTo(userPosition);
    }
  }, [map, userPosition]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              style={{ zIndex: 400 }}
              size={'icon'}
              className="absolute right-3 top-16 rounded p-2 shadow-md"
              onClick={() => handleClick()}
            >
              <LocateFixed size={AppConfig.ui.mapIconSize} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Your Location</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {userPosition && (
        <CustomMarker
          place={{
            id: place?.id || 'user_location',
            title: place?.title || 'Your location here',
            address: place?.address || 'Your address here',
            image: place?.image || ['lalala.svg'],
            position: userPosition,
            category: Category.LOCATE,
            price: 0,
            star: 0,
          }}
        />
      )}
    </>
  );
};
