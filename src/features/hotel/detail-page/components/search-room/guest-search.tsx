import {Dispatch, SetStateAction, useCallback, useState} from "react";

import {childYears} from "@/configs";
import {Popover, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {
    Loader2,
    PlusIcon,
    SearchIcon,
    TrashIcon,
    UserIcon,
    XCircleIcon,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {PopoverContent} from "@radix-ui/react-popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {ScrollArea} from "@/components/ui/scroll-area";
import AmountAction from "@/components/custom/amount-action";

type Props = {
    totalAdults: number;
    totalChildrens: number;
    updatePeople: {adults: number; children: number[]}[] | undefined;
    setUpdatePeople: Dispatch<
        SetStateAction<
            | {
                  adults: number;
                  children: number[];
              }[]
            | undefined
        >
    >;
    handleSearchChange: () => void;
    isLoading: boolean;
    isFetching: boolean;
    isChange: boolean;
};
const GuestSearch = ({
    totalAdults,
    totalChildrens,
    updatePeople,
    setUpdatePeople,
    handleSearchChange,
    isLoading,
    isFetching,
    isChange,
}: Props) => {
    const [openGuest, setOpenGuest] = useState(false);
    // Handle changes for adults in a room
    const handleAdultChange = useCallback((value: number, index: number) => {
        setUpdatePeople((prev) =>
            prev?.map((room, i) => (i === index ? {...room, adults: value} : room))
        );
    }, []);

    // Handle adding a child to the room
    const handleAddChild = useCallback((value: number, index: number) => {
        setUpdatePeople((prev) =>
            prev?.map((room, i) =>
                i === index
                    ? {...room, children: [...room.children, value]} // Adds a new child with an incremented value
                    : room
            )
        );
    }, []);

    // Handle remove a child to the room
    const handleRemoveChild = useCallback((childIndex: number, roomIndex: number) => {
        setUpdatePeople((prev) => {
            if (!prev) return prev;

            // Create a deep copy of the people array
            const updatedPeople = [...prev];

            // Ensure the roomIndex is valid
            if (roomIndex < 0 || roomIndex >= updatedPeople.length) return prev;

            // Create a copy of the children array for the specific room
            const updatedChildren = [...updatedPeople[roomIndex].children];

            // Remove the specific child based on childIndex
            updatedChildren.splice(childIndex, 1);

            // Update the room with the new children array
            updatedPeople[roomIndex] = {
                ...updatedPeople[roomIndex],
                children: updatedChildren,
            };

            return updatedPeople;
        });
    }, []);

    // Handle add room
    const handleAddRoom = useCallback(() => {
        const newRoom = {
            adults: 1,
            children: [],
        };
        setUpdatePeople((prev) => (prev ? [...prev, newRoom] : [newRoom]));
    }, []);

    const handleDeleteRoom = useCallback((roomIndex: number) => {
        console.log(roomIndex);

        setUpdatePeople((prev) => {
            if (!prev || prev.length <= 1) return prev; // Prevent deleting the last room

            // Ensure the roomIndex is within bounds
            if (roomIndex < 0 || roomIndex >= prev.length) return prev;

            // Filter out the room at the specified index
            const newPeoples = prev.filter((_, index) => index !== roomIndex);

            return newPeoples;
        });
    }, []);

    const fields = (
        <div className="space-y-8 w-full">
            {updatePeople?.map((room, index) => {
                // const totalGuest = room.adults + room.children.length;
                return (
                    <div key={index} className="flex flex-col gap-5">
                        <div className="flex justify-between">
                            <h3 className="font-semibold">#Room {index + 1}</h3>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button
                                            size={"icon"}
                                            disabled={updatePeople.length <= 1}
                                            onClick={() => handleDeleteRoom(index)}
                                            className="bg-red-600 disabled:bg-slate-400"
                                        >
                                            <TrashIcon
                                                size="1rem"
                                                className="text-white"
                                            />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Delete room</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col gap-2">
                                <span>Adults</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    Ages 18 or above
                                </span>
                            </div>

                            <AmountAction
                                value={room.adults}
                                onChange={(value) => handleAdultChange(value, index)}
                            />
                        </div>

                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-2">
                                <span>Children</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    Ages 1 - 17
                                </span>
                            </div>
                            <div className={`grid grid-cols-1 gap-4 w-28`}>
                                {room.children.map((child, childrenIndex) => (
                                    <div
                                        className="border border-slate-200 dark:border-slate-800 text-center p-2 rounded-lg flex items-center justify-between"
                                        key={childrenIndex}
                                    >
                                        <div className="w-4/5">{child} years</div>

                                        <div className="w-1/5 ">
                                            <XCircleIcon
                                                className="cursor-pointer w-5 h-5"
                                                strokeWidth={1.5}
                                                onClick={() =>
                                                    handleRemoveChild(
                                                        childrenIndex,
                                                        index
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            disabled={room.children.length >= 4}
                                            className={`${
                                                room.children.length >= 4 && "hidden"
                                            }`}
                                        >
                                            {room.children.length >= 1 ? (
                                                <PlusIcon />
                                            ) : (
                                                "Add child"
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className={cn("max-h-72", {
                                            hidden: room.children.length >= 4,
                                        })}
                                    >
                                        <ScrollArea className="h-72">
                                            <DropdownMenuGroup>
                                                {childYears.map((year) => (
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            handleAddChild(year, index);
                                                        }}
                                                        key={year}
                                                    >
                                                        {year} years
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuGroup>
                                        </ScrollArea>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <div className="w-full border-b border-slate-200 dark:border-slate-600" />
                    </div>
                );
            })}
        </div>
    );
    return (
        <Popover open={openGuest} onOpenChange={setOpenGuest}>
            <div className="flex relative flex-1">
                <div
                    className={cn(
                        `flex-1 flex justify-between items-center gap-0 focus:outline-none ${
                            openGuest &&
                            `shadow-md rounded-b-3xl rounded-t-none sm:shadow-md sm:rounded-r-3xl sm:rounded-l-none`
                        }`
                    )}
                >
                    <PopoverTrigger className="relative w-4/5">
                        <div className=" z-10 flex-1 flex text-left items-center p-4 xl:p-6 cursor-pointer space-x-3 focus:outline-none">
                            <div className="text-slate-300 dark:text-slate-400">
                                <UserIcon className="w-6 h-6" />
                            </div>
                            <div className="flex-grow">
                                <span className="block xl:text-lg font-semibold">
                                    {totalAdults + totalChildrens > 0
                                        ? totalAdults + totalChildrens + " Guest"
                                        : "Guest"}
                                </span>
                                <span className="block mt-1 text-sm text-slate-400 leading-none font-light">
                                    {totalAdults + totalChildrens > 0
                                        ? "Guests"
                                        : "Add guest"}
                                </span>
                            </div>
                        </div>
                    </PopoverTrigger>
                    <div className="flex flex-col items-center justify-center pr-2">
                        <Button
                            className="w-14 h-14 flex flex-col items-center justify-center rounded-full"
                            type="button"
                            variant={isChange ? "destructive" : "default"}
                            onClick={() => {
                                handleSearchChange();
                                setOpenGuest(false);
                            }}
                        >
                            {isLoading || isFetching ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <SearchIcon />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <PopoverContent className="w-full z-40 overflow-hidden rounded-3xl shadow-lg ring-1 ring-neutral-100 ring-opacity-5 bg-white p-8">
                <div className="space-y-8">
                    {fields}
                    <div className="">
                        <Button variant="ghost" type="button" onClick={handleAddRoom}>
                            <PlusIcon className="w-5 h-5 mr-2" /> Add a room
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default GuestSearch;
