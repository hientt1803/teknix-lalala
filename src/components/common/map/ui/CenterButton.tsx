import { LatLngExpression } from 'leaflet';
import { MapPin, Shrink } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useMapEvents } from 'react-leaflet';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AppConfig } from '@/lib/AppConfig';

import useMapContext from '../useMapContext';

interface CenterButtonProps {
  center: LatLngExpression;
  zoom: number;
}

export const CenterButton = ({ center, zoom }: CenterButtonProps) => {
  const [isTouched, setIsTouched] = useState(false);
  const { map } = useMapContext();

  const touch = useCallback(() => {
    if (!isTouched && map) {
      setIsTouched(true);
    }
  }, [isTouched, map]);

  useMapEvents({
    move() {
      touch();
    },
    zoom() {
      touch();
    },
  });

  const handleClick = useCallback(() => {
    if (!isTouched || !map) return;

    map.flyTo(center, zoom);
    map.once('moveend', () => {
      setIsTouched(false);
    });
  }, [map, isTouched, zoom, center]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            style={{ zIndex: 400 }}
            size={'icon'}
            className={`absolute right-3 top-[120px] rounded p-2 shadow-md`}
            onClick={() => handleClick()}
          >
            <MapPin size={AppConfig.ui.mapIconSize} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Center Position</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
