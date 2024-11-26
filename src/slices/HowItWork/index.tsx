import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';

/**
 * Props for `HowItWork`.
 */
export type HowItWorkProps = SliceComponentProps<Content.HowItWorkSlice>;
const components: JSXMapSerializer = {
   heading2: ({ children }) => <Heading>{children}</Heading>,
   paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
/**
 * Component for "HowItWork" Slices.
 */
const HowItWork = ({ slice }: HowItWorkProps): JSX.Element => {
   return (
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="py-16"
      >
         {slice.variation == 'default' && (
            <Bounded>
               <div className="flex flex-col justify-center items-center gap-10">
                  <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-16 text-neutral-900 dark:text-neutral-50">
                     <div className="text-center w-full max-w-2xl mx-auto">
                        <PrismicRichText field={slice.primary.heading} components={components} />
                        <PrismicRichText field={slice.primary.body} components={components} />
                     </div>
                  </div>
                  <div className="relative grid md:grid-cols-3 gap-20 mt-10">
                     <img
                        src="/dash.svg"
                        alt="dash"
                        className="hidden md:block absolute inset-x-0 top-10"
                     />
                     {slice.primary.howitworks.map((item, index) => (
                        <div
                           key={index}
                           className="relative flex flex-col gap-5 items-center max-w-xs mx-auto"
                        >
                           <div className="max-w-[200px] mx-auto">
                              <PrismicNextImage
                                 field={item.image_light}
                                 alt=""
                                 className="object-cover w-full h-full block dark:hidden"
                              />
                              <PrismicNextImage
                                 field={item.image_dark}
                                 alt=""
                                 className="object-cover w-full h-full hidden dark:block"
                              />
                           </div>
                           <div className="text-center mt-auto">
                              <PrismicRichText
                                 field={item.title}
                                 components={{
                                    heading3: ({ children }) => (
                                       <h3 className="text-xl font-semibold">{children}</h3>
                                    ),
                                 }}
                              />
                              <PrismicRichText
                                 field={item.description}
                                 components={{
                                    paragraph: ({ children }) => (
                                       <p className="block mt-5 text-neutral-500 dark:text-neutral-400">
                                          {children}
                                       </p>
                                    ),
                                 }}
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </Bounded>
         )}
      </section>
   );
};

export default HowItWork;
