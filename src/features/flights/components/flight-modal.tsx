import React from 'react';

import Image from '@/components/common/images/image';
import Tab from '@/components/custom/tabs/tab';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GlobalModal } from '@/types/modal';

import { flightsData } from './fligt-data';

const FlightModal = ({ open, setOpen }: GlobalModal) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent className="top-[5%] flex min-h-[300px] translate-y-0 flex-col items-start justify-start md:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Flight Details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Tab defaultTab="Flight Infomation">
          <div className="mb-2 flex w-full items-center gap-2 rounded-md bg-primary/5 p-2">
            <Tab.Trigger text="Flight Infomation" className="w-full py-3" />
            <Tab.Trigger text="Fare Detail" className="w-full py-3" />
            <Tab.Trigger text="Baggage Rules" className="w-full py-3" />
            <Tab.Trigger text="Cancellation Rules" className="w-full py-3" />
          </div>
          <Tab.Content text="Flight Infomation">
            <div className="flex w-full flex-col items-start justify-between gap-3 rounded-xl border border-neutral-200 p-5">
              <div className="flex w-full flex-1 items-center justify-between">
                <div className="flex items-center gap-2 font-medium text-neutral-600">
                  <Image
                    src={flightsData[0].airline.logoUrl}
                    className="h-8 w-8"
                    classNameImage="object-contain"
                  />
                  <span>{flightsData[0].airline.name}</span>
                  <span>
                    ({flightsData[0].airline.code} -{' '}
                    {flightsData[0].flightNumber})
                  </span>
                </div>
                <div className="font-normal text-neutral-500">
                  Travel class:{' '}
                  <span className="font-semibold text-neutral-900">
                    {flightsData[0].travelClass}
                  </span>
                </div>
              </div>
              <div className="grid w-full grid-cols-12 items-center">
                <div className="col-span-12">
                  {flightsData[0].segments.map((segment, index) => (
                    <div className="grid grid-cols-3 gap-6 py-4" key={index}>
                      <div className="col-span-1">
                        <div className="flex flex-col">
                          <h2 className="mb-2 text-2xl font-bold">
                            {segment.arrival.time}
                          </h2>
                          <p className="font-semibold">
                            {segment.arrival.date}
                          </p>
                          <p className="text-sm text-neutral-600">
                            {segment.arrival.airport} -{' '}
                            {segment.arrival.terminal}
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
                          <p className="font-semibold">
                            {segment.departure.date}
                          </p>
                          <p className="text-sm text-neutral-600">
                            {segment.departure.airport} -{' '}
                            {segment.departure.terminal}
                          </p>
                          <p className="text-sm text-neutral-600">
                            {segment.departure.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-center rounded-xl bg-neutral-100 py-3 text-sm text-neutral-600">
                    Change of planes: 3h 15m Layover in France
                  </div>
                  {flightsData[0].segments.map((segment, index) => (
                    <div className="grid grid-cols-3 gap-6 py-4" key={index}>
                      <div className="col-span-1">
                        <div className="flex flex-col">
                          <h2 className="mb-2 text-2xl font-bold">
                            {segment.arrival.time}
                          </h2>
                          <p className="font-semibold">
                            {segment.arrival.date}
                          </p>
                          <p className="text-sm text-neutral-600">
                            {segment.arrival.airport} -{' '}
                            {segment.arrival.terminal}
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
                          <p className="font-semibold">
                            {segment.departure.date}
                          </p>
                          <p className="text-sm text-neutral-600">
                            {segment.departure.airport} -{' '}
                            {segment.departure.terminal}
                          </p>
                          <p className="text-sm text-neutral-600">
                            {segment.departure.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tab.Content>
          <Tab.Content text="Fare Detail">
            <div className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-3 rounded-xl bg-neutral-800 px-5">
                <div className="py-5 text-sm font-semibold text-white">
                  Base Fare
                </div>
                <div className="py-5 text-sm font-semibold text-white">
                  Taxes and Fees
                </div>
                <div className="py-5 text-sm font-semibold text-white">
                  Total Fees
                </div>
              </div>
              <div className="grid grid-cols-3 px-5">
                <span className="py-3">$36,500</span>
                <span className="py-3">$1,050</span>
                <span className="py-3 text-xl font-bold">$37,550</span>
              </div>
              <div className="border-b border-b-neutral-200"></div>
              <span className="text-sm text-neutral-500">
                *From The Date Of Departure
              </span>
            </div>
          </Tab.Content>
          <Tab.Content text="Baggage Rules">
            <div className="divide-y divide-neutral-300 rounded-3xl border border-neutral-300">
              <div className="flex items-center gap-2 p-5">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aero_K_logo.svg/120px-Aero_K_logo.svg.png"
                  className="w-20"
                  classNameImage="object-contain"
                />
                <span className="text-xl font-bold">BOM - CDG</span>
              </div>
              <div className="grid grid-cols-1 gap-3 p-5">
                <div className="grid grid-cols-3 rounded-xl bg-neutral-800 px-5">
                  <div className="py-5 text-sm font-semibold text-white">
                    Baggage Type
                  </div>
                  <div className="py-5 text-sm font-semibold text-white">
                    Check In
                  </div>
                  <div className="py-5 text-sm font-semibold text-white">
                    Cabin
                  </div>
                </div>
                <div className="grid grid-cols-3 px-5">
                  <span className="py-3">Adult</span>
                  <span className="py-3">2 PC</span>
                  <span className="py-3">7 Kg</span>
                </div>
                <div className="border-b border-b-neutral-200"></div>
                <span className="text-sm text-neutral-500">*1PC = 23KG</span>
              </div>
            </div>
          </Tab.Content>
          <Tab.Content text="Cancellation Rules">
            <div className="divide-y divide-neutral-300 rounded-3xl border border-neutral-300">
              <div className="flex items-center gap-2 p-5">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aero_K_logo.svg/120px-Aero_K_logo.svg.png"
                  className="w-20"
                  classNameImage="object-contain"
                />
                <span className="text-xl font-bold">BOM - CDG</span>
              </div>
              <div className="grid grid-cols-1 gap-3 p-5">
                <div className="grid grid-cols-2 rounded-xl bg-neutral-800 px-5">
                  <div className="py-5 text-sm font-semibold text-white">
                    Time Frame
                  </div>
                  <div className="py-5 text-sm font-semibold text-white">
                    Air Free + MMT Free
                  </div>
                </div>
                <div className="grid grid-cols-2 border-b border-neutral-300 px-5">
                  <span className="py-3">0 hours to 24 hours</span>
                  <span className="py-3">Non Refundable</span>
                </div>
                <div className="grid grid-cols-2 border-b border-neutral-300 px-5">
                  <span className="py-3">24 hours to 365 days</span>
                  <span className="py-3">$16,325 + $250</span>
                </div>
                <span className="py-2 text-sm text-neutral-500">
                  *From The Date Of Departure
                </span>
              </div>
            </div>
          </Tab.Content>
        </Tab>
      </DialogContent>
    </Dialog>
  );
};

export default FlightModal;
