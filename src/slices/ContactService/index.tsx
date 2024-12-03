import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';
import { Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

/**
 * Props for `ContactService`.
 */
export type ContactServiceProps = SliceComponentProps<Content.ContactServiceSlice>;

/**
 * Component for "ContactService" Slices.
 */
const ContactService = ({ slice }: ContactServiceProps): JSX.Element => {
   return (
      <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         <div className="grid grid-cols-4 gap-3">
            {slice?.primary?.group?.map((item, index) => (
               <div key={index} className="border border-neutral-200 rounded-md h-full flex flex-col justify-between items-start p-4">
                  <Button variant={'outline'} size={'icon'} className="rounded-md">
                     <PrismicNextImage field={item?.icon} alt="" />
                  </Button>

                  <div className="flex-grow my-5">
                     <PrismicRichText
                        field={item?.title}
                        components={{
                           heading6: ({ children }) => (
                              <Heading as="h6" className="!text-base hover:text-yellow-600 cursor-pointer">
                                 {children}
                              </Heading>
                           ),
                        }}
                     />
                     <PrismicRichText
                        field={item?.desc}
                        components={{
                           paragraph: ({ children }) => (
                              <Paragraph className="!text-sm text-neutral-600 text-wrap">
                                 {children}
                              </Paragraph>
                           ),
                        }}
                     />
                  </div>

                  <PrismicNextLink field={item?.link} className="text-sm font-bold hover:text-yellow-600">
                     {item?.label}
                  </PrismicNextLink>
               </div>
            ))}
         </div>
      </Bounded>
   );
};

export default ContactService;
