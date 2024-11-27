import {IActiveRoom} from "@/stores/features/stay/type";
import {useMemo} from "react";
import RoomCard from "./card-room";

type Props = {
    data?: IActiveRoom;
};
const ListRooms = ({data}: Props) => {
    const id = data?.ids;
    const roomGroupResolve = useMemo(() => {
        const roomRates = data?.hotels?.[0]?.rates ?? [];
        const roomMap = data?.map_hotels?.[0]?.room_groups ?? [];

        // Create a Map to store the latest room group based on group_id
        const roomGroupMap = new Map();

        roomMap.forEach((map) => {
            const matchingRates = roomRates.filter(
                (rate) => rate.room_data_trans?.main_name === map.name_struct?.main_name
            );

            if (matchingRates.length > 0) {
                // Check if there's already a room group with the same main_name
                const existingGroup = roomGroupMap.get(map.name_struct?.main_name);

                // Add or replace the group if it's new or has a larger group_id
                if (!existingGroup || map.room_group_id > existingGroup.group_id) {
                    roomGroupMap.set(map.name_struct?.main_name, {
                        roomGroup: map,
                        rates: matchingRates,
                    });
                }
            }
        });

        // If no room groups are found, return one entry with "no_group" and all room rates
        if (roomGroupMap.size === 0) {
            roomGroupMap.set("no_group", {
                roomGroup: null,
                rates: roomRates,
            });
        }

        // Convert the Map values back into an array and sort by the lowest show_amount in rates
        return Array.from(roomGroupMap.values()).sort((a, b) => {
            const aPrice = parseFloat(
                a.rates[0]?.payment_options?.payment_types?.[0]?.show_amount || "0"
            );
            const bPrice = parseFloat(
                b.rates[0]?.payment_options?.payment_types?.[0]?.show_amount || "0"
            );
            return aPrice - bPrice;
        });
    }, [data?.hotels, data?.map_hotels]);

    return (
        <div className="flex flex-col gap-5">
            {data && data.hotels && data.hotels.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                    {roomGroupResolve.map((room, index) => (
                        <RoomCard active={index === 0} id={id} key={index} data={room} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-lg font-bold text-gray-500">
                    No rooms available
                </div>
            )}
        </div>
    );
};

export default ListRooms;
