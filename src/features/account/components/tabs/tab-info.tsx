import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon, ImagePlusIcon} from "lucide-react";
import {useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import InputLabel from "@/components/custom/input/input-label";

const TabInfo = () => {
    const [date, setDate] = useState<Date>();
    return (
        <div className="pt-14 sm:pt-20 pb-24 lg:pb-32">
            <div className="space-y-6 sm:space-y-8">
                <h2 className="text-3xl font-semibold">Account infomation</h2>
                <div className="w-14 border-b border-neutral-200" />
                <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex items-start">
                        <div className="relative rounded-full overflow-hidden flex">
                            <div className="relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-32 h-32 ring-1 ring-white">
                                <Avatar className="w-full h-full">
                                    <AvatarImage
                                        src="/testimonials/client2.png"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                    <AvatarFallback className="w-full h-full">
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                                <ImagePlusIcon strokeWidth={1.5} />
                                <span className="mt-1 text-xs">Change Image</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                        <div>
                            <InputLabel
                                label="Name"
                                defaultValue={"Mr. Minh"}
                                className="block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                                sizes="small"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-neutral-900">
                                Gender
                            </Label>
                            <Select>
                                <SelectTrigger className="w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="apple">Male</SelectItem>
                                        <SelectItem value="banana">Female</SelectItem>
                                        <SelectItem value="blueberry">Other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <InputLabel
                                label="User name"
                                defaultValue={"@eden_minh"}
                                className="block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                                sizes="small"
                            />
                        </div>
                        <div>
                            <InputLabel
                                label="Email"
                                defaultValue={"example@email.com"}
                                className="block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                                sizes="small"
                            />
                        </div>
                        <div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div>
                                        <Label className="text-sm font-medium text-neutral-900">
                                            Day of birth
                                        </Label>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full flex justify-between items-center border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            {date ? (
                                                format(date, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent
                                    side="bottom"
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <InputLabel
                                label="Phone number"
                                defaultValue={"0345678910"}
                                className="block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                                sizes="small"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-neutral-900">
                                About you
                            </Label>
                            <Textarea
                                placeholder={"About you..."}
                                className="block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal min-h-[100px] px-4 py-3 mt-1.5"
                                rows={5}
                            />
                        </div>
                        <div className="pt-2">
                            <Button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                                Update info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>{" "}
        </div>
    );
};

export default TabInfo;
