import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { logos } from './mock';
import Image from '@/components/common/images/image';
import Bounded from '@/components/common/containers/bounded';

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
                  className="group relative mt-6 flex gap-6 overflow-hidden p-2"
                  style={{
                     maskImage:
                        'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                  }}
               >
                  {Array(5)
                     .fill(null)
                     .map((index) => (
                        <div
                           key={index}
                           className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
                        >
                           {logos.map((logo, key) => (
                              <Image
                                 key={key}
                                 src={logo.url}
                                 className="h-10 w-fit px-2 brightness-0  dark:invert"
                                 alt={`${logo.name}`}
                              />
                           ))}
                        </div>
                     ))}
               </div>
            </div>
         </div>
      </Bounded>
   );
};

export default LogosSection;
