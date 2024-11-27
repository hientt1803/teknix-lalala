import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { logos } from './mock';
import Image from '@/components/common/images/image';
import Bounded from '@/components/common/containers/bounded';
import { PrismicNextImage } from '@prismicio/next';

/**
 * Props for `LogosSection`.
 */
export type LogosSectionProps = SliceComponentProps<Content.LogosSectionSlice>;

/**
 * Component for "LogosSection" Slices.
 */
const LogosSection = ({ slice }: LogosSectionProps): JSX.Element => {
   return (
      <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         <div className="w-full py-12">
            <div className="mx-auto w-full md:px-8">
               <div
                  className="group relative mt-6 flex items-center justify-center gap-6 overflow-hidden p-2"
                  style={{
                     maskImage: `${slice.primary.is_marquee && 'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)'}`,
                  }}
               >
                  {slice.primary.is_marquee ? (
                     <>
                        {Array(5)
                           .fill(null)
                           .map((index) => (
                              <div
                                 key={index}
                                 className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
                              >
                                 {slice.primary.logos.map((logo, key) => (
                                    <PrismicNextImage
                                       key={key}
                                       field={logo.image}
                                       className="h-10 w-fit px-2 brightness-0  dark:invert hover:brightness-100 duration-500 transition-all"
                                       alt={``}
                                    />
                                 ))}
                              </div>
                           ))}
                     </>
                  ) : (
                     <>
                        {slice.primary.logos.map((logo, key) => (
                           <PrismicNextImage
                              key={key}
                              field={logo.image}
                              className="h-10 w-fit px-2 brightness-0 dark:invert hover:brightness-100 duration-500 transition-all"
                              alt={``}
                           />
                        ))}
                     </>
                  )}
               </div>
            </div>
         </div>
      </Bounded>
   );
};

export default LogosSection;
