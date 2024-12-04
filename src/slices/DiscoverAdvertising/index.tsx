import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';

import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';

/**
 * Props for `DiscoverAdvertising`.
 */
export type DiscoverAdvertisingProps =
  SliceComponentProps<Content.DiscoverAdvertisingSlice>;
export const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading className="!leading-normal">{children}</Heading>
  ),
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};

/**
 * Component for "DiscoverAdvertising" Slices.
 */
const DiscoverAdvertising = ({
  slice,
}: DiscoverAdvertisingProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-20 bg-[#f2f4f6] py-12 dark:bg-[#313131]"
    >
      <Bounded>
        <div className="relative w-full rounded-2xl bg-[#fff0ec] p-20 dark:bg-[#221f1e]">
          <div className="grid grid-cols-1 place-items-center gap-5 md:grid-cols-2">
            <div className="flex flex-col items-start justify-start gap-3">
              <Button variant={'secondary'} className="rounded-full px-7 py-5">
                {slice?.primary?.tag}
              </Button>
              <PrismicRichText
                field={slice?.primary?.heading}
                components={components}
              />
              <PrismicRichText
                field={slice?.primary?.description}
                components={components}
              />
              <div className="items-center mt-10 flex flex-wrap gap-4">
                {slice?.primary?.social_download?.map((down, index) => (
                  <PrismicNextImage key={index} field={down.image} alt="" />
                ))}
              </div>
            </div>

            {/* Right image */}
            <div className="visible relative inline-block h-full w-full">
              <div className="hidden md:absolute -left-20 -top-40">
                <PrismicNextImage
                  field={slice?.primary?.images[0]?.image}
                  alt=""
                  className="h-fit w-fit"
                />
              </div>
              <div className="hidden md:absolute -right-20 -top-40 z-20">
                <PrismicNextImage
                  field={slice?.primary?.images[1]?.image}
                  alt=""
                  className="h-fit w-fit"
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0">
            <Image
              src="/assets/images/faqs/bg-app.png"
              alt=""
              className="h-fit w-fit"
            />
          </div>

          {/* List background image */}
          <div className="absolute bottom-12 right-44">
            <PrismicNextImage
              field={slice?.primary?.images[2]?.image}
              alt=""
              className="h-fit w-fit"
            />
          </div>
          <div className="absolute bottom-4 right-72">
            <PrismicNextImage
              field={slice?.primary?.images[3]?.image}
              alt=""
              className="h-fit w-fit"
            />
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default DiscoverAdvertising;
