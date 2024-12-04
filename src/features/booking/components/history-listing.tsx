'use client';

import React, { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import {
  MapHotel,
  useGetReservationHistoryQuery,
} from '@/stores/features/reservation';

import CardHistory from './card-history';
import CardHistorySkeleton from './card-history-skeleton';
const data = [
  { label: 'Stays', value: 'stay' },
  { label: 'Experiences', value: 'exp' },
  { label: 'Car For Rent', value: 'car' },
];

const HistoryListing = () => {
  const {
    data: dataHistory,
    isLoading,
    isFetching,
  } = useGetReservationHistoryQuery({});

  const historyData = useMemo(() => {
    if (!dataHistory) return [];

    const { records, map_hotels } = dataHistory;

    // Create a map to quickly find the hotel by its id
    const hotelMap = map_hotels.reduce(
      (accumulator, hotel) => {
        accumulator[hotel.id] = hotel;
        return accumulator;
      },
      {} as Record<string, MapHotel>,
    );

    // Group records with their corresponding hotel
    return records.map(record => {
      const matchedHotel = hotelMap[record.hotel_id];

      return {
        record: record, // Spread record data
        hotel: matchedHotel || null, // Attach the corresponding hotel, or null if not found
      };
    });
  }, [dataHistory]);
  return (
    <div>
      {/* <SegmentedControl
                size="md"
                data={data}
                withItemsBorders={false}
                color="#006666"
                radius={"xl"}
                bg={"transparent"}
                classNames={{
                    label: "px-5 py-2",
                }}
            /> */}
      <div>
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {isFetching || isLoading ? (
            <CardHistorySkeleton length={3} />
          ) : (
            <>
              {historyData.map((map, index) => (
                <CardHistory key={index} data={map} />
              ))}
            </>
          )}
        </div>
        <div className="mt-11 flex items-center justify-center">
          <Button className="focus:ring-primary-600 relative inline-flex h-auto items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 sm:px-6 sm:text-base">
            Show me more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HistoryListing;
