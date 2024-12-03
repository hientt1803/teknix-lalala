import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { Phone } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

export const ListAgents = dynamic(() =>
   import('@/features/slice-global/agents/list-agents').then((mod) => mod.ListAgents),
);

/**
 * Props for `Agents`.
 */
export type AgentsProps = SliceComponentProps<Content.AgentsSlice>;
export const newComponent: JSXMapSerializer = {
   heading2: ({ children }) => <Heading>{children}</Heading>,
   paragraph: ({ children }) => <Paragraph className="text-neutral-500">{children}</Paragraph>,
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
         <div className="flex justify-between items-end gap-2">
            <div className="flex flex-col justify-start items-start gap-1">
               <Button className="bg-[#fefa17] hover:bg-neutral-100 text-black border border-neutral-200 rounded-full py-6 px-5">
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
               <PrismicRichText field={slice.primary.title} components={newComponent} />
               <PrismicRichText field={slice.primary.description} components={newComponent} />
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
               <div className="flex items-center gap-3">
                  <Button variant={'outline'} size={'icon'} className="rounded-full">
                     <Phone className="size-3 m-0" />
                  </Button>
                  <PrismicRichText
                     field={slice.primary?.need_help}
                     components={{
                        heading3: ({ children }) => (
                           <Heading as="h3" className="text-neutral-900 font-medium !text-lg">
                              {children}
                           </Heading>
                        ),
                     }}
                  />
               </div>
               <span className="text-2xl font-semibold">{slice.primary?.phone_number}</span>
            </div>
         </div>

         <div className="mt-10">
            <ListAgents />
         </div>
      </Bounded>
   );
};

export default Agents;
