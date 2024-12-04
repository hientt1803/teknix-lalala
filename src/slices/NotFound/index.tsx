import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { ArrowLeft } from 'lucide-react';

import Bounded from '@/components/common/containers/bounded';
import { Button } from '@/components/ui/button';

/**
 * Props for `NotFound`.
 */
export type NotFoundProps = SliceComponentProps<Content.NotFoundSlice>;

/**
 * Component for "NotFound" Slices.
 */
const NotFound = ({ slice }: NotFoundProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-40"
    >
      <div className="flex flex-col items-center justify-center gap-5">
        <PrismicNextImage
          field={slice?.primary?.image}
          alt=""
          className="h-fit w-fit"
        />

        <PrismicRichText
          field={slice?.primary?.heading}
          components={{
            paragraph: ({ children }) => (
              <p className="text-6xl font-normal">{children}</p>
            ),
          }}
        />
        <PrismicRichText
          field={slice?.primary?.sub_heading}
          components={{
            paragraph: ({ children }) => (
              <p className="text-lg font-normal text-neutral-600 dark:text-neutral-400">
                {children}
              </p>
            ),
          }}
        />

        <div className="iitems-center mt-10 flex gap-4">
          <Button className="px-4 py-6 text-lg">
            <ArrowLeft className="mr-1 size-6" /> Go back
          </Button>
          <Button className="px-4 py-6 text-lg" variant={'ghost'}>
            Help center
          </Button>
        </div>
      </div>
    </Bounded>
  );
};

export default NotFound;
