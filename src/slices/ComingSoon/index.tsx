import { Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import { Button } from '@/components/ui/button';

export const CountdownTimer = dynamic(
  () =>
    import('@/features/slice-global/comingsoon/count-down').then(
      module_ => module_.default,
    ),
  {
    ssr: false,
  },
);

/**
 * Props for `ComingSoon`.
 */
export type ComingSoonProps = SliceComponentProps<Content.ComingSoonSlice>;

/**
 * Component for "ComingSoon" Slices.
 */
const ComingSoon = ({ slice }: ComingSoonProps): JSX.Element => {
  const targetDate = '2024-12-25T00:00:00';

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-20 pt-20"
    >
      <Bounded>
        <div className="flex items-center justify-center rounded-lg border border-neutral-200 p-14 dark:border-neutral-700">
          <div className="grid grid-cols-2 place-content-center place-items-center gap-8">
            <div className="flex flex-col items-start justify-start gap-5">
              <Button className="rounded-full bg-[#fefa17] px-5 py-6 text-black hover:bg-neutral-100">
                <Image
                  src="/assets/images/home/banner-earth.png"
                  width={30}
                  height={30}
                  alt=""
                />
                <span className="text-base font-medium">
                  {slice?.primary?.tag}
                </span>
              </Button>

              <PrismicRichText
                field={slice?.primary?.heading}
                components={{
                  heading1: ({ children }) => <Heading>{children}</Heading>,
                }}
              />

              <CountdownTimer targetDate={targetDate} />

              <PrismicRichText
                field={slice?.primary?.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mt-2 block text-xl font-normal text-neutral-700 dark:text-neutral-500 md:mt-3">
                      {children}
                    </p>
                  ),
                }}
              />

              <PrismicNextLink field={slice?.primary?.button_link}>
                <Button className="px-6 py-5 text-base">
                  {slice?.primary?.button_text}
                  <ArrowRight className="size-5" />
                </Button>
              </PrismicNextLink>
            </div>
            <div className="h-full w-full">
              <PrismicNextImage
                field={slice?.primary?.image}
                alt=""
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default ComingSoon;
