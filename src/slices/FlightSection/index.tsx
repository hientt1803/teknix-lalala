import Bounded from '@/components/common/containers/bounded';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { flights } from './mock';
import FlightCard from '@/components/custom/cards/flight-card';
import { Accordion } from '@/components/custom/accordions/accordion';

/**
 * Props for `FlightSection`.
 */
export type FlightSectionProps = SliceComponentProps<Content.FlightSectionSlice>;

/**
 * Component for "FlightSection" Slices.
 */
const FlightSection = ({ slice }: FlightSectionProps): JSX.Element => {
    return (
        <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div className="lg:p-10 lg:bg-slate-50 dark:bg-slate-900 grid grid-cols-1 gap-6 rounded-3xl">
                {flights.map((item, index) => (
                    <Accordion key={index}>
                        <FlightCard  data={item} />
                    </Accordion>
                  
                ))}
            </div>
        </Bounded>
    );
};

export default FlightSection;
