'use client';

import { Tooltip, TooltipProps } from 'react-leaflet';

import { MarkerCategoriesValues } from '@/lib/MarkerCategories';
import { PlaceValues } from '@/lib/Places';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { useAppSelector } from '@/stores/hook';

interface LeafletTooltipProps extends TooltipProps {
   item: PlaceValues;
   color: MarkerCategoriesValues['color'];
   icon: MarkerCategoriesValues['icon'];
}

const LeafletTooltip = ({ color, icon, item, ...props }: LeafletTooltipProps) => {
   const { title, address, id, price, star } = item;

   // Global currency code
   const globalCurrencyCode = useAppSelector(
      (state) => state.globalSlice.searchGlobal.currency.code,
   );

   return (
      <Tooltip {...props}>
         {formatCurrencyWithCodeAsSuffix(price, globalCurrencyCode || 'VND')}
      </Tooltip>
   );
};

export default LeafletTooltip;
