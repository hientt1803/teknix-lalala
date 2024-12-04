import { Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { ArrowRight } from 'lucide-react';

import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';

/**
 * Props for `ContactService`.
 */
export type ContactServiceProps =
  SliceComponentProps<Content.ContactServiceSlice>;

/**
 * Component for "ContactService" Slices.
 */
const ContactService = ({ slice }: ContactServiceProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {slice?.primary?.group?.map((item, index) => (
          <div
            key={index}
            className="flex h-full flex-col items-start justify-between rounded-md border border-neutral-200 p-7"
          >
            <div className="rounded-md border border-neutral-400 p-4">
              <PrismicNextImage
                field={item?.icon}
                alt=""
                className="size-6 dark:invert-[1]"
              />
            </div>

            <div className="my-5 flex-grow">
              <PrismicRichText
                field={item?.title}
                components={{
                  heading6: ({ children }) => (
                    <Heading
                      as="h6"
                      className="cursor-pointer !text-lg hover:text-yellow-600"
                    >
                      {children}
                    </Heading>
                  ),
                }}
              />
              <PrismicRichText
                field={item?.desc}
                components={{
                  paragraph: ({ children }) => (
                    <Paragraph className="text-wrap !text-sm text-neutral-400">
                      {children}
                    </Paragraph>
                  ),
                }}
              />
            </div>

            <div className="group flex items-center gap-2">
              <PrismicNextLink
                field={item?.link}
                className="text-sm font-semibold group-hover:text-yellow-600"
              >
                {item?.label}
              </PrismicNextLink>
              <ArrowRight className="size-5 cursor-pointer group-hover:text-yellow-600" />
            </div>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default ContactService;
