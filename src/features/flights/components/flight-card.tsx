'use client';
import { Eye } from 'lucide-react';
import { useState } from 'react';

import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import FlightModal from './flight-modal';
import { Flight } from './fligt-data';

const FlightCard = ({
  additionalInfo,
  airline,
  flightNumber,
  price,
  refundable,
  seatsLeft,
  segments,
  ticketType,
  travelClass,
}: Flight) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex w-full flex-col items-start justify-between gap-3 rounded-xl border border-neutral-200 p-5">
        <div className="flex w-full flex-1 items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-neutral-600">
            <Image
              src={airline.logoUrl}
              className="h-8 w-8"
              classNameImage="object-contain"
            />
            <span>{airline.name}</span>
            <span>
              ({airline.code} - {flightNumber})
            </span>
          </div>
          <div className="font-normal text-neutral-500">
            Travel class:{' '}
            <span className="font-semibold text-neutral-900">
              {travelClass}
            </span>
          </div>
        </div>
        <div className="grid w-full grid-cols-12 items-center">
          <div className="col-span-9 divide-y">
            {segments.map((segment, index) => (
              <div className="grid grid-cols-3 gap-6 py-4" key={index}>
                <div className="col-span-1">
                  <div className="flex flex-col">
                    <h2 className="mb-2 text-2xl font-bold">
                      {segment.arrival.time}
                    </h2>
                    <p className="font-semibold">{segment.arrival.date}</p>
                    <p className="text-sm text-neutral-600">
                      {segment.arrival.airport} - {segment.arrival.terminal}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {segment.arrival.city}
                    </p>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <h4 className="text-lg font-semibold">
                      {segment.duration}
                    </h4>
                    <div className="relative flex h-full w-full items-center justify-center px-10">
                      <hr className="absolute h-[3px] w-full bg-primary opacity-5" />
                      <div className="flex h-full w-full items-center justify-center rounded-full text-white">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 576 512"
                            height="14"
                            width="14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M480 192H365.71L260.61 8.06A16.014 16.014 0 0 0 246.71 0h-65.5c-10.63 0-18.3 10.17-15.38 20.39L214.86 192H112l-43.2-57.6c-3.02-4.03-7.77-6.4-12.8-6.4H16.01C5.6 128-2.04 137.78.49 147.88L32 256 .49 364.12C-2.04 374.22 5.6 384 16.01 384H56c5.04 0 9.78-2.37 12.8-6.4L112 320h102.86l-49.03 171.6c-2.92 10.22 4.75 20.4 15.38 20.4h65.5c5.74 0 11.04-3.08 13.89-8.06L365.71 320H480c35.35 0 96-28.65 96-64s-60.65-64-96-64z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-col">
                    <h2 className="mb-2 text-2xl font-bold">
                      {segment.departure.time}
                    </h2>
                    <p className="font-semibold">{segment.departure.date}</p>
                    <p className="text-sm text-neutral-600">
                      {segment.departure.airport} - {segment.departure.terminal}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {segment.departure.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-3">
            <div className="flex flex-col items-end gap-3">
              <h3 className="text-3xl font-bold">${price}</h3>
              <Button className="px-7 py-5">Book now</Button>
              <p
                className="flex cursor-pointer items-center gap-1 text-sm text-blue-700"
                onClick={() => setShowModal(true)}
              >
                <Eye className="h-5 w-5" />
                <span className="underline">Flight Details</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between rounded-lg bg-neutral-100 px-5 py-3">
          <span className="text-sm text-red-700">
            Only {seatsLeft} Seat Left
          </span>
          <span
            className={cn('text-sm', {
              'text-red-700': !refundable,
              'text-green-700': refundable,
            })}
          >
            {refundable ? 'Refundable' : 'Non-Refundable'}
          </span>
        </div>
      </div>
      <FlightModal open={showModal} setOpen={setShowModal} />
    </>
  );
};

export default FlightCard;
