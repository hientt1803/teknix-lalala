import Bounded from '@/components/common/containers/bounded';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { MapPin } from 'lucide-react';

/**
 * Props for `ContactHeading`.
 */
export type ContactHeadingProps = SliceComponentProps<Content.ContactHeadingSlice>;

/**
 * Component for "ContactHeading" Slices.
 */
const ContactHeading = ({ slice }: ContactHeadingProps): JSX.Element => {
   return (
      <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className='mb-20'>
         <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7 flex flex-col justify-start items-start gap-3">
               <PrismicRichText
                  field={slice?.primary?.heading}
                  components={{
                     paragraph: ({ children }) => (
                        <p className="mt-2 md:mt-3 font-normal block text-neutral-900 dark:text-neutral-100 text-6xl">
                           {children}
                        </p>
                     ),
                  }}
               />
               <PrismicRichText
                  field={slice?.primary?.description}
                  components={{
                     paragraph: ({ children }) => (
                        <p className="mt-2 md:mt-3 font-normal block text-neutral-500 dark:text-neutral-400 text-xl">
                           {children}
                        </p>
                     ),
                  }}
               />
            </div>

            <div className="col-span-5">
               <div className="mt-16 ml-auto">
                  <div className="flex flex-col justify-end items-end gap-1">
                     <div className="flex items-center gap-2 font-medium mr-20">
                        <MapPin className="size-4" />
                        Our Location
                     </div>
                     <p className="mt-2 md:mt-3 font-normal max-w-52 text-neutral-500 dark:text-neutral-300 text-base">
                        {slice?.primary?.address}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </Bounded>
   );
};

export default ContactHeading;
