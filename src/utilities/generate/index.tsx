import { Wifi, Hammer, Coffee, Zap, Dumbbell, MoreHorizontal, Waves, Spade } from 'lucide-react';

interface IconProps {
   iconType: string;
   className?: string;
}

export function generateIcon({ iconType, className }: IconProps) {
   switch (iconType) {
      case 'wifi':
         return <Wifi className={className} />;
      case 'swimming_pool':
         return <Waves className={className} />;
      case 'private_workshop':
         return <Hammer className={className} />;
      case 'breakfast':
         return <Coffee className={className} />;
      case 'electricity':
         return <Zap className={className} />;
      case 'gym':
         return <Dumbbell className={className} />;
      case 'spa':
         return <Spade className={className} />;
      case 'other':
         return <MoreHorizontal className={className} />;
      default:
         return null;
   }
}
