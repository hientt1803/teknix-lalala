import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import Link from 'next/link';

/**
 * Props for `GridSection`.
 */
export type GridSectionProps = SliceComponentProps<Content.GridSectionSlice>;

/**
 * Component for "GridSection" Slices.
 */
const GridSection = ({ slice }: GridSectionProps): JSX.Element => {
   return (
      <Bounded
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="relative py-16"
      >
         <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
               <Link
                  href="#"
                  className="relative flex w-full group rounded-2xl z-0 overflow-hidden flex-1"
               >
                  <div className="aspect-[16/10] sm:aspect-[16/12] xl:aspect-video w-full "></div>
                  <PrismicNextImage
                     alt=""
                     field={slice.primary.items[0]?.image}
                     className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 absolute inset-0 h-full w-full text-transparent"
                  />
                  <Image src="https://images.pexels.com/photos/2064534/pexels-photo-2064534.jpeg?auto=compress&cs=tinysrgb&w=600" />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white">
                     <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
                     <PrismicRichText
                        field={slice.primary.items[0]?.name}
                        components={{
                           heading3: ({ children }) => (
                              <h2 className="relative text-lg lg:text-xl font-semibold">
                                 {children}
                              </h2>
                           ),
                        }}
                     />
                     <span className="relative block mt-1.5 text-sm text-neutral-100">
                        {slice.primary.items[0]?.properties?.toFixed(0)} properties
                     </span>
                  </div>
               </Link>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
               <Link
                  href="#"
                  className="relative flex w-full group rounded-2xl z-0 overflow-hidden flex-1"
               >
                  <div className="aspect-[16/10] sm:aspect-[16/12] xl:aspect-video  w-full">
                     <PrismicNextImage
                        alt=""
                        field={slice.primary.items[1]?.image}
                        className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 absolute inset-0 h-full w-full text-transparent"
                     />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white">
                     <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
                     <PrismicRichText
                        field={slice.primary.items[1]?.name}
                        components={{
                           heading3: ({ children }) => (
                              <h2 className="relative text-lg lg:text-xl font-semibold">
                                 {children}
                              </h2>
                           ),
                        }}
                     />
                     <span className="relative block mt-1.5 text-sm text-neutral-100">
                        {slice.primary.items[1]?.properties?.toFixed(0)} properties
                     </span>
                  </div>
               </Link>
               <Link
                  href="#"
                  className="relative flex w-full group rounded-2xl z-0 overflow-hidden flex-1"
               >
                  <div className="aspect-[16/10] sm:aspect-[16/12] xl:aspect-video w-full "></div>
                  <PrismicNextImage
                     alt=""
                     field={slice.primary.items[2]?.image}
                     className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 absolute inset-0 h-full w-full text-transparent"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white">
                     <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
                     <PrismicRichText
                        field={slice.primary.items[2]?.name}
                        components={{
                           heading3: ({ children }) => (
                              <h2 className="relative text-lg lg:text-xl font-semibold">
                                 {children}
                              </h2>
                           ),
                        }}
                     />
                     <span className="relative block mt-1.5 text-sm text-neutral-100">
                        {slice.primary.items[2]?.properties?.toFixed(0)} properties
                     </span>
                  </div>
               </Link>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
               <Link
                  href="#"
                  className="relative flex w-full group rounded-2xl z-0 overflow-hidden flex-1"
               >
                  <div className="aspect-[16/10] sm:aspect-[16/12] xl:aspect-[16/9] w-full "></div>
                  <PrismicNextImage
                     alt=""
                     field={slice.primary.items[3]?.image}
                     className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 absolute inset-0 h-full w-full text-transparent"
                  />

                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white">
                     <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
                     <PrismicRichText
                        field={slice.primary.items[3]?.name}
                        components={{
                           heading3: ({ children }) => (
                              <h2 className="relative text-lg lg:text-xl font-semibold">
                                 {children}
                              </h2>
                           ),
                        }}
                     />
                     <span className="relative block mt-1.5 text-sm text-neutral-100">
                        {slice.primary.items[3]?.properties?.toFixed(0)} properties
                     </span>
                  </div>
               </Link>
            </div>
         </div>
      </Bounded>
   );
};

export default GridSection;
