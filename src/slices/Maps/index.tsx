import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const PreviewMap = dynamic(() =>
   import('@/components/custom/maps/preview-map').then((mod) => mod.PreviewMap),
);

/**
 * Props for `Maps`.
 */
export type MapsProps = SliceComponentProps<Content.MapsSlice>;

/**
 * Component for "Maps" Slices.
 */
const Maps = ({ slice }: MapsProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className='w-full h-full'>
         <PreviewMap />
      </section>
   );
};

export default Maps;
