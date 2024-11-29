import Bounded from '@/components/common/containers/bounded';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { flights } from './mock';
import FlightCard from '@/components/custom/cards/flight-card';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@/components/custom/accordions/accordion';
import { ArrowRight, Plus } from 'lucide-react';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';

/**
 * Props for `FlightSection`.
 */
export type FlightSectionProps = SliceComponentProps<Content.FlightSectionSlice>;
const components: JSXMapSerializer = {
    heading2: ({ children }) => <Heading>{children}</Heading>,
    paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
/**
 * Component for "FlightSection" Slices.
 */
const FlightSection = ({ slice }: FlightSectionProps): JSX.Element => {
    return (
        <Bounded className='relative py-16' data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div className="absolute inset-y-0 w-screen xl:max-w-[1340px] 1920:max-w-screen-1920 left-1/2 transform -translate-x-1/2 xl:rounded-[40px] -z-10 bg-slate-50 dark:bg-black dark:bg-opacity-20 " />
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
            </div>
            <div className="grid grid-cols-1 gap-4 rounded-3xl ">
                <Accordion defaultValue={"item0"}>
                    {flights.map((data, index) => (
                        <AccordionItem key={index} value={`item${index}`}>
                            <AccordionHeader icon={<Plus />}>
                                <div className="flex flex-1 flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0">
                                    <div className="w-24 lg:w-32 flex-shrink-0">
                                        <img src={data.imageUrl} className="w-10" />
                                    </div>
                                    {/* MOBILE DISPLAY */}
                                    <div className="block lg:hidden w-full space-y-1">
                                        <div className="flex font-semibold">
                                            <div>
                                                <span>{data.departureTime}</span>
                                                <span className="flex items-center text-sm text-slate-500 font-normal mt-0.5">
                                                    {data.route.substring(0, 3)}
                                                </span>
                                            </div>
                                            <span className="w-12 flex justify-center">
                                                <i className=" text-2xl las la-long-arrow-alt-right"></i>
                                            </span>
                                            <div>
                                                <span>{data.arrivalTime}</span>
                                                <span className="flex items-center text-sm text-slate-500 font-normal mt-0.5">
                                                    {data.route.substring(5, data.route.length)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-slate-500 font-normal mt-0.5">
                                            <span className="VG3hNb">{data.stops}</span>
                                            <span className="mx-2">·</span>
                                            <span>{data.flightDuration}</span>
                                            <span className="mx-2">·</span>
                                            <span>{data.currency}</span>
                                        </div>
                                    </div>
                                    {/* DESKTOP DISPLAY */}
                                    <div className="hidden lg:block  min-w-[150px] flex-[4] ">
                                        {/* Time Depart - Arrival */}
                                        <div className="font-medium text-lg">
                                            {data.departureTime} - {data.arrivalTime}
                                        </div>
                                        {/* Air line */}
                                        <div className="text-sm text-slate-500 font-normal mt-0.5">
                                            {data.airline}
                                        </div>
                                    </div>
                                    <div className="hidden lg:block flex-[4] whitespace-nowrap">
                                        {/* Route EX: HND - SIN */}
                                        <div className="font-medium text-lg">{data.route}</div>
                                        <div className="text-sm text-slate-500 font-normal mt-0.5">
                                            {data.flightDuration}
                                        </div>
                                    </div>
                                    {/* STOP */}
                                    <div className="hidden lg:block flex-[4] whitespace-nowrap">
                                        <div className="font-medium text-lg">{data.stops}</div>
                                        <div className="text-sm text-slate-500 font-normal mt-0.5">
                                            {data.stops && data.stops !== "Nonstop"
                                                ? "2 hours 15 minutes BKK"
                                                : "Trip none stop"}
                                        </div>
                                    </div>
                                    <div className="flex-[4] whitespace-nowrap sm:text-right">
                                        <div>
                                            <span className="text-xl font-semibold text-teal-600">
                                                ${data.price}
                                            </span>
                                        </div>
                                        <div className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                                            {data.flightType}
                                        </div>
                                    </div>
                                </div>
                            </AccordionHeader>
                            <AccordionPanel>
                                <div className="p-4 md:p-8 border border-slate-200 dark:border-slate-700 rounded-2xl ">

                                    {/* START */}
                                    <div>
                                        <div className="flex flex-col md:flex-row ">
                                            <div className="w-24 md:w-20 lg:w-24 flex-shrink-0 md:pt-7">
                                                <img src={data.imageUrl} className="w-10" alt="" />
                                            </div>
                                            <div className="flex my-5 md:my-0">
                                                <div className="flex-shrink-0 flex flex-col items-center py-2">
                                                    <span className="block w-6 h-6 rounded-full border border-slate-400"></span>
                                                    <span className="block flex-grow border-l border-slate-400 border-dashed my-1"></span>
                                                    <span className="block w-6 h-6 rounded-full border border-slate-400"></span>
                                                </div>
                                                <div className="ml-4 space-y-10 text-sm">
                                                    <div className="flex flex-col space-y-1">
                                                        <span className=" text-slate-500">
                                                            {data.details[0].departureDate}
                                                        </span>
                                                        <span className=" font-semibold text-slate-400">
                                                            {data.details[0].departureAirport}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col space-y-1">
                                                        <span className=" text-slate-500">
                                                            {data.details[0].arrivalDate}
                                                        </span>
                                                        <span className=" font-semibold text-slate-400">
                                                            {data.details[0].arrivalAirport}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-l border-slate-200 dark:border-slate-600 md:mx-6 lg:mx-10"></div>
                                            <ul className="text-sm text-slate-500 space-y-1 md:space-y-2">
                                                <li>Trip time: {data.details[0].tripTime}</li>
                                                <li>
                                                    {data.details[0].airline} ·{" "}
                                                    {data.details[0].cabinClass} ·{" "}
                                                    {data.details[0].aircraft} ·{" "}
                                                    {data.details[0].flightNumber}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* CHILLIN AND VIBES */}
                                    <div className="my-7 md:my-10 space-y-5 md:pl-24">
                                        {data.details[0].transit && (
                                            <>
                                                <div className="border-t border-slate-200" />
                                                <div className="text-slate-700 text-sm md:text-base">
                                                    Transit time:{" "}
                                                    {data.details[0].transit.stopDuration} -{" "}
                                                    {data.details[0].transit.stopPoint}
                                                </div>
                                            </>
                                        )}
                                        <div className="border-t border-slate-200" />
                                    </div>
                                    {/* GO HOME */}
                                    {!data.details[1] ||
                                        (!data.details[1].transit && (
                                            <div>
                                                <div className="flex flex-col md:flex-row ">
                                                    <div className="w-24 md:w-20 lg:w-24 flex-shrink-0 md:pt-7">
                                                        <img
                                                            src={data.imageUrl}
                                                            className="w-10"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="flex my-5 md:my-0">
                                                        <div className="flex-shrink-0 flex flex-col items-center py-2">
                                                            <span className="block w-6 h-6 rounded-full border border-slate-400"></span>
                                                            <span className="block flex-grow border-l border-slate-400 border-dashed my-1"></span>
                                                            <span className="block w-6 h-6 rounded-full border border-slate-400"></span>
                                                        </div>
                                                        <div className="ml-4 space-y-10 text-sm">
                                                            <div className="flex flex-col space-y-1">
                                                                <span className=" text-slate-500">
                                                                    {data.details[1].departureDate}
                                                                </span>
                                                                <span className=" font-semibold text-slate-400">
                                                                    {data.details[1].departureAirport}
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-col space-y-1">
                                                                <span className=" text-slate-500">
                                                                    {data.details[1].arrivalDate}
                                                                </span>
                                                                <span className=" font-semibold text-slate-400">
                                                                    {data.details[1].arrivalAirport}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-l border-slate-200 md:mx-6 lg:mx-10"></div>
                                                    <ul className="text-sm text-slate-500 space-y-1 md:space-y-2">
                                                        <li>Trip time: {data.details[1].tripTime}</li>
                                                        <li>
                                                            {data.details[1].airline} ·{" "}
                                                            {data.details[1].cabinClass} ·{" "}
                                                            {data.details[1].aircraft} ·{" "}
                                                            {data.details[1].flightNumber}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </Bounded>
    );
};

export default FlightSection;
