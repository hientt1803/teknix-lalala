import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { dataMocks } from './mock';
import Link from 'next/link';

/**
 * Props for `ExploreStay`.
 */
export type ExploreStayProps = SliceComponentProps<Content.ExploreStaySlice>;
const components: JSXMapSerializer = {
    heading2: ({ children }) => <Heading>{children}</Heading>,
    paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
/**
 * Component for "ExploreStay" Slices.
 */
const ExploreStay = ({ slice }: ExploreStayProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="py-16 mt-16"
        >
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <div className="relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-16 text-neutral-900 dark:text-neutral-50">
                    <div className="max-w-2xl">
                        <PrismicRichText
                            field={slice.primary.heading}
                            components={components}
                        />
                        <PrismicRichText
                            field={slice.primary.body}
                            components={components}
                        />
                    </div>
                    <div className="mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
                        <div className="relative flex items-center text-neutral-900 dark:text-neutral-300 ">
                            <div className="relative w-10 h-10 mr-[6px]" title="Prev">
                                <CarouselPrevious className="absolute top-0 left-0 translate-y-0 w-full h-full" />
                            </div>
                            <div className=" relative w-10 h-10" title="Next">
                                <CarouselNext className="absolute top-0 left-0 translate-y-0 w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <CarouselContent>
                    {dataMocks.map((des, index) => (
                        <CarouselItem className="basis-1/2 md:basis-1/5" key={index}>
                            <Link href={"/"} className="flex flex-col">
                                <div className="flex-shrink-0 relative w-full aspect-square sm:aspect-[5/4] rounded-2xl overflow-hidden group">
                                    <img
                                        src={des.imageUrl}
                                        className="object-cover w-full h-full rounded-2xl"
                                        alt="nc-imgs"
                                    />

                                    <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
                                </div>
                                <div className="mt-4 truncate">
                                    <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate">
                                        {des.title}
                                    </h2>
                                    <span className="block mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        {des.properties} properties
                                    </span>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </Bounded>
    );
};

export default ExploreStay;
