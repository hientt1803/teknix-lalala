"use client"

import {useGetReservationHistoryQuery, MapHotel} from "@/stores/features/reservation";
import React, {useMemo} from "react";
import CardHistory from "./card-history";
import CardHistorySkeleton from "./card-history-skeleton";
import {Button} from "@/components/ui/button";
const data = [
    {label: "Stays", value: "stay"},
    {label: "Experiences", value: "exp"},
    {label: "Car For Rent", value: "car"},
];

const HistoryListing = () => {
    const {data: dataHistory, isLoading, isFetching} = useGetReservationHistoryQuery({});

    const historyData = useMemo(() => {
        if (!dataHistory) return [];

        const {records, map_hotels} = dataHistory;

        // Create a map to quickly find the hotel by its id
        const hotelMap = map_hotels.reduce(
            (acc, hotel) => {
                acc[hotel.id] = hotel;
                return acc;
            },
            {} as Record<string, MapHotel>
        );

        // Group records with their corresponding hotel
        return records.map((record) => {
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
                <div className="mt-8 grid grid-cols-1 gap-4 md:gap-6">
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
                <div className="flex mt-11 justify-center items-center">
                    <Button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600">
                        Show me more
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HistoryListing;
