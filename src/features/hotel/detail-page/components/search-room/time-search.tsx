import {Dispatch, SetStateAction, useState} from "react";
import {addDays, format as formatDate, isEqual} from "date-fns";
import {DateRange} from "react-day-picker";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {CalendarIcon} from "lucide-react";

type Props = {
    date: DateRange | undefined;
    setDate?: Dispatch<SetStateAction<DateRange | undefined>>; // Accept undefined instead of null
};

const TimeSearch = ({date, setDate}: Props) => {
    const [openDate, setOpenDate] = useState(false);

    const handleCheckDate = () => {
        let start = date?.from;
        let end = date?.to;

        // Case 1: Both start and end are undefined or null
        if (!start && !end) {
            setDate?.({from: new Date(), to: addDays(new Date(), 1)});
        }
        // Case 2: Start exists but end is undefined or null
        else if (start && !end) {
            setDate?.({from: start, to: addDays(start, 1)});
        }
        // Case 3: Both start and end exist and are equal
        else if (start && end && isEqual(start, end)) {
            const newEndDate = addDays(end, 1);
            setDate?.({from: start, to: newEndDate});
        }
        // Case 4: Both start and end exist and are not equal - no adjustment needed
    };

    return (
        <Popover open={openDate} onOpenChange={setOpenDate}>
            <PopoverTrigger>
                <div
                    className="z-10 relative flex flex-1"
                    onClick={() => setOpenDate((o) => !o)}
                >
                    <div
                        className={cn(
                            "flex flex-grow relative p-4 xl:p-6 items-center cursor-pointer space-x-3 focus:outline-none",
                            openDate &&
                                `shadow-md rounded-t-3xl rounded-b-none sm:shadow-md sm:rounded-l-3xl sm:rounded-r-none`
                        )}
                    >
                        <div className="text-neutral-300 dark:text-neutral-400">
                            <CalendarIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-grow text-left">
                            <span className="block xl:text-lg font-semibold">
                                {`${formatDate(
                                    (date && date.from) || new Date(),
                                    "MMM dd"
                                )} - ${formatDate(
                                    (date && (date.to || date.from)) || new Date(),
                                    "MMM dd"
                                )}` || "Check in - out"}
                            </span>
                            <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                                Check in - Check out
                            </span>
                        </div>
                    </div>
                </div>
            </PopoverTrigger>

            <PopoverContent
                onInteractOutside={(e) => handleCheckDate()}
                className="w-full overflow-hidden z-40 rounded-3xl shadow-lg ring-1 ring-neutral-100 ring-opacity-5 bg-white p-5"
            >
                <div className="overflow-y-scroll">
                    <Calendar
                        mode="range"
                        numberOfMonths={2}
                        selected={date}
                        onSelect={setDate} // Corrected type
                        fromDate={new Date()}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default TimeSearch;
