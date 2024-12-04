import { Content } from '@prismicio/client';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import { Phone } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';

export const ListAgents = dynamic(() =>
  import('@/features/slice-global/agents/list-agents').then(
    module_ => module_.ListAgents,
  ),
);

/**
 * Props for `Agents`.
 */
export type AgentsProps = SliceComponentProps<Content.AgentsSlice>;
export const newComponent: JSXMapSerializer = {
  heading2: ({ children }) => <Heading>{children}</Heading>,
  paragraph: ({ children }) => (
    <Paragraph className="text-neutral-500">{children}</Paragraph>
  ),
};

/**
 * Component for "Agents" Slices.
 */
const Agents = ({ slice }: AgentsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-20"
    >
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div className="flex flex-col items-start justify-start flex-wrap gap-1">
          <Button className="rounded-full border border-neutral-200 bg-[#fefa17] px-5 py-6 text-black hover:bg-neutral-100">
            <div className="flex items-center gap-0">
              <Image
                src="/assets/images/testimonials/client1.png"
                width={22}
                height={22}
                alt=""
              />
              <Image
                src="/assets/images/testimonials/client2.png"
                width={22}
                height={22}
                alt=""
                className="-ml-2"
              />
              <Image
                src="/assets/images/testimonials/client3.png"
                width={22}
                height={22}
                alt=""
                className="-ml-2"
              />
            </div>
            <span className="text-sm font-medium">Our Team</span>
          </Button>
          <PrismicRichText
            field={slice.primary.title}
            components={newComponent}
          />
          <PrismicRichText
            field={slice.primary.description}
            components={newComponent}
          />
        </div>
        
        <div className="flex flex-col items-start justify-start gap-1 mt-10 md:mt-0">
          <div className="flex items-center gap-3">
            <Button variant={'outline'} size={'icon'} className="rounded-full">
              <Phone className="m-0 size-3" />
            </Button>
            <PrismicRichText
              field={slice.primary?.need_help}
              components={{
                heading3: ({ children }) => (
                  <Heading
                    as="h3"
                    className="!text-lg font-medium text-neutral-900"
                  >
                    {children}
                  </Heading>
                ),
              }}
            />
          </div>
          <span className="text-2xl font-semibold">
            {slice.primary?.phone_number}
          </span>
        </div>
      </div>

      <div className="mt-10">
        <ListAgents />
      </div>
    </Bounded>
  );
};

export default Agents;
