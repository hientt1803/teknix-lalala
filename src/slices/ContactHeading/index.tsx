import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { ArrowRight, MapPin } from 'lucide-react';

import Bounded from '@/components/common/containers/bounded';
import { Button } from '@/components/ui/button';

/**
 * Props for `ContactHeading`.
 */
export type ContactHeadingProps =
  SliceComponentProps<Content.ContactHeadingSlice>;

/**
 * Component for "ContactHeading" Slices.
 */
const ContactHeading = ({ slice }: ContactHeadingProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-20"
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 flex flex-col items-start justify-start gap-3">
          <PrismicRichText
            field={slice?.primary?.heading}
            components={{
              paragraph: ({ children }) => (
                <p className="mt-2 block text-6xl font-normal text-neutral-900 dark:text-neutral-100 md:mt-3">
                  {children}
                </p>
              ),
            }}
          />
          <PrismicRichText
            field={slice?.primary?.description}
            components={{
              paragraph: ({ children }) => (
                <p className="mt-2 block text-xl font-normal text-neutral-500 dark:text-neutral-400 md:mt-3">
                  {children}
                </p>
              ),
            }}
          />
        </div>

        <div className="col-span-12 md:col-span-5">
          <div className="ml-auto mt-16">
            <div className="flex flex-col items-end justify-end flex-wrap gap-1">
              {slice?.primary?.use_button ? (
                <Button className="mt-auto px-6 py-6 text-base">
                  {slice?.primary?.button_text}
                  <ArrowRight className="ml-1 size-5" />
                </Button>
              ) : (
                <>
                  <div className="mr-20 flex items-center gap-2 font-medium">
                    <MapPin className="size-4" />
                    Our Location
                  </div>
                  <p className="mt-2 max-w-52 text-base font-normal text-neutral-500 dark:text-neutral-300 md:mt-3">
                    {slice?.primary?.address}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default ContactHeading;
