import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import { PlusIcon } from 'lucide-react';

import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';
import ContactForm from '@/features/slice-global/contact/contact-form';

/**
 * Props for `GetInTouch`.
 */
export type GetInTouchProps = SliceComponentProps<Content.GetInTouchSlice>;
export const getInTouchComponents: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading className="!leading-normal">{children}</Heading>
  ),
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};

/**
 * Component for "GetInTouch" Slices.
 */
const GetInTouch = ({ slice }: GetInTouchProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-20 w-full"
    >
      <div className="grid w-full grid-cols-1 place-content-between gap-6 md:grid-cols-2">
        <div className="mt-20">
          <div className="mb-5">
            <PrismicRichText
              field={slice?.primary?.heading}
              components={getInTouchComponents}
            />
          </div>
          <ContactForm />
        </div>

        {slice?.variation == 'default' && (
          <div className="h-full">
            <div className="aspect-square h-[21.875rem] w-full overflow-hidden rounded-2xl">
              <PrismicNextImage
                field={slice.primary.images[0]?.image}
                alt=""
                className="h-full w-full rounded-2xl"
              />
            </div>

            <div className="mt-3 columns-2 gap-3">
              <div className="mb-3">
                <div className="aspect-square max-h-[11.25rem] w-full overflow-hidden rounded-2xl bg-[#ffec88] p-6">
                  <div className="text-xl">
                    1684 people used <strong>Lalala</strong> in the last{' '}
                    <strong>24 hours</strong>
                  </div>
                  <div className="mt-5 flex items-center gap-0">
                    <Image
                      src="/assets/images/testimonials/client1.png"
                      width={30}
                      height={30}
                      alt=""
                      className="h-10 w-10"
                    />
                    <Image
                      src="/assets/images/testimonials/client2.png"
                      width={30}
                      height={30}
                      alt=""
                      className="-ml-2 h-10 w-10"
                    />
                    <Image
                      src="/assets/images/testimonials/client3.png"
                      width={30}
                      height={30}
                      alt=""
                      className="-ml-2 h-10 w-10"
                    />
                    <Button
                      variant={'outline'}
                      size={'icon'}
                      className="z-20 -ml-4 rounded-full border border-neutral-200 bg-[#fefa17] text-black hover:bg-neutral-100"
                    >
                      <PlusIcon className="size-5" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="overflow-hidden rounded-2xl">
                  <PrismicNextImage
                    field={slice.primary.images[2]?.image}
                    alt=""
                    className="w-full rounded-2xl"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="overflow-hidden rounded-2xl">
                  <PrismicNextImage
                    field={slice.primary.images[1]?.image}
                    alt=""
                    className="w-full rounded-2xl"
                  />
                </div>
              </div>
              <div className="mt-3">
                <div className="overflow-hidden rounded-2xl">
                  <PrismicNextImage
                    field={slice.primary.images[3]?.image}
                    alt=""
                    className="w-full rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {slice?.variation == 'singleImage' && (
               <div>
                  <div className="aspect-auto overflow-hidden">
                     <PrismicNextImage
                        field={slice.primary.image}
                        alt=""
                        className="w-full h-full"
                     />
                  </div>
               </div>
            )} */}
      </div>
    </Bounded>
  );
};

export default GetInTouch;
