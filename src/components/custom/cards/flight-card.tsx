'use client';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Flight } from '@/slices/FlightSection/mock';

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '../accordions/accordion';

type Props = {
  data: Flight;
  index: number;
};

const FlightCard = ({ data, index }: Props) => {
  return (
    <AccordionItem
      value={'item' + index}
      // className="rounded-2xl hover:shadow-lg transition-shadow"
    >
      <AccordionHeader>
        {/* <Link href={"#"} className="w-full cursor-pointer relative"> */}
        <div className="flex flex-1 flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0">
          <div className="w-24 flex-shrink-0 lg:w-32">
            <img src={data.imageUrl} className="w-10" />
          </div>
          {/* MOBILE DISPLAY */}
          <div className="block space-y-1 lg:hidden">
            <div className="flex font-semibold">
              <div>
                <span>{data.departureTime}</span>
                <span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
                  {data.route.slice(0, 3)}
                </span>
              </div>
              <span className="flex w-12 justify-center">
                <i className="las la-long-arrow-alt-right text-2xl"></i>
              </span>
              <div>
                <span>{data.arrivalTime}</span>
                <span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
                  {data.route.substring(5, data.route.length)}
                </span>
              </div>
            </div>
            <div className="mt-0.5 text-sm font-normal text-neutral-500">
              <span className="VG3hNb">{data.stops}</span>
              <span className="mx-2">·</span>
              <span>{data.flightDuration}</span>
              <span className="mx-2">·</span>
              <span>{data.currency}</span>
            </div>
          </div>
          {/* DESKTOP DISPLAY */}
          <div className="hidden min-w-[150px] flex-[4] lg:block">
            {/* Time Depart - Arrival */}
            <div className="text-lg font-medium">
              {data.departureTime} - {data.arrivalTime}
            </div>
            {/* Air line */}
            <div className="mt-0.5 text-sm font-normal text-neutral-500">
              {data.airline}
            </div>
          </div>
          <div className="hidden flex-[4] whitespace-nowrap lg:block">
            {/* Route EX: HND - SIN */}
            <div className="text-lg font-medium">{data.route}</div>
            <div className="mt-0.5 text-sm font-normal text-neutral-500">
              {data.flightDuration}
            </div>
          </div>
          {/* STOP */}
          <div className="hidden flex-[4] whitespace-nowrap lg:block">
            <div className="text-lg font-medium">{data.stops}</div>
            <div className="mt-0.5 text-sm font-normal text-neutral-500">
              {data.stops && data.stops !== 'Nonstop'
                ? '2 hours 15 minutes BKK'
                : 'Trip none stop'}
            </div>
          </div>
          <div className="flex-[4] whitespace-nowrap sm:text-right">
            <div>
              <span className="text-xl font-semibold text-teal-600">
                ${data.price}
              </span>
            </div>
            <div className="mt-0.5 text-xs font-normal text-neutral-500 sm:text-sm">
              {data.flightType}
            </div>
          </div>
        </div>
        {/* </Link> */}
      </AccordionHeader>
      <AccordionPanel>
        <div className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700 md:p-8">
          {/* START */}
          <div>
            <div className="flex flex-col md:flex-row">
              <div className="w-24 flex-shrink-0 md:w-20 md:pt-7 lg:w-24">
                <img src={data.imageUrl} className="w-10" alt="" />
              </div>
              <div className="my-5 flex md:my-0">
                <div className="flex flex-shrink-0 flex-col items-center py-2">
                  <span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
                  <span className="my-1 block flex-grow border-l border-dashed border-neutral-400"></span>
                  <span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
                </div>
                <div className="ml-4 space-y-10 text-sm">
                  <div className="flex flex-col space-y-1">
                    <span className="text-neutral-500">
                      {data.details[0].departureDate}
                    </span>
                    <span className="font-semibold text-neutral-400">
                      {data.details[0].departureAirport}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-neutral-500">
                      {data.details[0].arrivalDate}
                    </span>
                    <span className="font-semibold text-neutral-400">
                      {data.details[0].arrivalAirport}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-l border-neutral-200 dark:border-neutral-600 md:mx-6 lg:mx-10"></div>
              <ul className="space-y-1 text-sm text-neutral-500 md:space-y-2">
                <li>Trip time: {data.details[0].tripTime}</li>
                <li>
                  {data.details[0].airline} · {data.details[0].cabinClass} ·{' '}
                  {data.details[0].aircraft} · {data.details[0].flightNumber}
                </li>
              </ul>
            </div>
          </div>
          {/* CHILLIN AND VIBES */}
          <div className="my-7 space-y-5 md:my-10 md:pl-24">
            {data.details[0].transit && (
              <>
                <div className="border-t border-neutral-200" />
                <div className="text-sm text-neutral-700 md:text-base">
                  Transit time: {data.details[0].transit.stopDuration} -{' '}
                  {data.details[0].transit.stopPoint}
                </div>
              </>
            )}
            <div className="border-t border-neutral-200" />
          </div>
          {/* GO HOME */}
          {!data.details[1] ||
            (!data.details[1].transit && (
              <div>
                <div className="flex flex-col md:flex-row">
                  <div className="w-24 flex-shrink-0 md:w-20 md:pt-7 lg:w-24">
                    <img src={data.imageUrl} className="w-10" alt="" />
                  </div>
                  <div className="my-5 flex md:my-0">
                    <div className="flex flex-shrink-0 flex-col items-center py-2">
                      <span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
                      <span className="my-1 block flex-grow border-l border-dashed border-neutral-400"></span>
                      <span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
                    </div>
                    <div className="ml-4 space-y-10 text-sm">
                      <div className="flex flex-col space-y-1">
                        <span className="text-neutral-500">
                          {data.details[1].departureDate}
                        </span>
                        <span className="font-semibold text-neutral-400">
                          {data.details[1].departureAirport}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-neutral-500">
                          {data.details[1].arrivalDate}
                        </span>
                        <span className="font-semibold text-neutral-400">
                          {data.details[1].arrivalAirport}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border-l border-neutral-200 md:mx-6 lg:mx-10"></div>
                  <ul className="space-y-1 text-sm text-neutral-500 md:space-y-2">
                    <li>Trip time: {data.details[1].tripTime}</li>
                    <li>
                      {data.details[1].airline} · {data.details[1].cabinClass} ·{' '}
                      {data.details[1].aircraft} ·{' '}
                      {data.details[1].flightNumber}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default FlightCard;
