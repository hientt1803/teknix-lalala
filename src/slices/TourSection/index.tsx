import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { ArrowRight } from 'lucide-react';
import { mockTours } from './mock';
import TourCard from '@/components/custom/cards/tour-card';

/**
 * Props for `TourSection`.
 */
export type TourSectionProps = SliceComponentProps<Content.TourSectionSlice>;
const components: JSXMapSerializer = {
    heading2: ({ children }) => <Heading>{children}</Heading>,
    paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
/**
 * Component for "TourSection" Slices.
 */
const TourSection = ({ slice }: TourSectionProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="py-16 relative"
        >
            <div className="absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-slate-100 dark:bg-black dark:bg-opacity-20 " />

            <div className="relative">
                <div className="flex flex-col mb-8 relative">
                    {/* HEADING */}
                    <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50">
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
                    </div>
                    {/* TABS */}
                    <div className="flex items-center justify-between">
                        <nav
                            className="nc-Nav relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
                            data-nc-id="Nav"
                        >
                            <ul className="flex  sm:space-x-2">
                                <li className="nc-NavItem relative" data-nc-id="NavItem">
                                    <Button className="font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full bg-teal-900 text-white hover:text-slate-100 focus:outline-none">
                                        New York
                                    </Button>
                                </li>
                                <li className="relative" data-nc-id="NavItem">
                                    <Button
                                        variant="ghost"
                                        className="font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full  focus:outline-none"
                                    >
                                        Tokyo
                                    </Button>
                                </li>
                                <li className="nc-NavItem relative" data-nc-id="NavItem">
                                    <Button
                                        variant="ghost"
                                        className="font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full  focus:outline-none"
                                    >
                                        Paris
                                    </Button>
                                </li>
                                <li className="nc-NavItem relative" data-nc-id="NavItem">
                                    <Button
                                        variant="ghost"
                                        className="font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full  focus:outline-none"
                                    >
                                        London
                                    </Button>
                                </li>
                            </ul>
                        </nav>
                        <span className="hidden sm:block flex-shrink-0">
                            <Button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base  px-4 py-3 sm:px-6  ttnc-ButtonSecondary font-medium border bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 !leading-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:focus:ring-offset-0">
                                <span>View all</span>
                                <ArrowRight className='w-5 h-5' />
                            </Button>
                        </span>
                    </div>
                </div>
                {/* CARD LIST */}
                <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
                    {mockTours.map((pro, index) => (
                        <TourCard {...pro} key={index} />
                    ))}
                </div>
            </div>
        </Bounded>
    );
};

export default TourSection;
