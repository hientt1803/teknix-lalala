import {Skeleton} from "@/components/ui/skeleton";

const CardHistorySkeleton = ({length}: {length: number}) => {
    return (
        <div className="grid grid-cols-1 gap-4 pt-4">
            {[...Array(length)].map((_, index) => (
                <div
                    key={index}
                    className="grid grid-cols-1 md:flex md:flex-row rounded-3xl overflow-hidden border relative border-slate-200 hover:shadow-xl cursor-pointer"
                >
                    <div className="absolute right-4 top-4">
                        {/* Badge skeleton */}
                        <Skeleton className="h-10 w-32" />
                    </div>
                    <div className="relative flex-shrink-0 w-full md:w-72">
                        <div className="block w-full h-64 md:h-full">
                            {/* Image skeleton */}
                            <Skeleton className="w-full h-full bg-slate-200 animate-pulse" />
                        </div>
                    </div>
                    <div className="flex-grow p-3 sm:p-5 flex flex-col">
                        <div className="space-y-2">
                            {/* Room name skeleton */}
                            <Skeleton className="h-4 w-36 bg-slate-200 animate-pulse" />
                            <div className="flex items-center space-x-2">
                                {/* Hotel name skeleton */}
                                <Skeleton className="h-6 w-64 bg-slate-200 animate-pulse" />
                            </div>
                            <div className="text-sm text-slate-500">
                                <div className="flex flex-col md:flex-row justify-between w-full">
                                    <div className="flex">
                                        <div className="flex-shrink-0 flex flex-col items-center py-2">
                                            {/* Check-in and Check-out timeline skeleton */}
                                            <Skeleton className="h-3 w-3 rounded-full bg-slate-200 animate-pulse" />
                                            <Skeleton className="h-10 w-px bg-slate-200 animate-pulse" />
                                            <Skeleton className="h-3 w-3 rounded-full bg-slate-200 animate-pulse" />
                                        </div>
                                        <div className="ml-4 space-y-5 text-sm">
                                            <div className="flex flex-col space-y-1">
                                                {/* Check-in date skeleton */}
                                                <Skeleton className="h-3.5 w-24 bg-slate-200 animate-pulse" />
                                                <Skeleton className="h-4 w-12 bg-slate-200 animate-pulse" />
                                            </div>
                                            <div className="flex flex-col space-y-1">
                                                {/* Check-out date skeleton */}
                                                <Skeleton className="h-3.5 w-24 bg-slate-200 animate-pulse" />
                                                <Skeleton className="h-4 w-12 bg-slate-200 animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-r border-dashed border-slate-300" />
                                    <div className="flex flex-col items-end space-y-2">
                                        <div className="flex items-center space-x-3 text-slate-500">
                                            {/* Guests icon and skeleton */}
                                            <Skeleton className="h-4 w-4 rounded-full bg-slate-200 animate-pulse" />
                                            <Skeleton className="h-4 w-12 bg-slate-200 animate-pulse" />
                                        </div>
                                        <div className="flex items-center space-x-2 text-slate-500">
                                            {/* Total price skeleton */}
                                            <Skeleton className="h-4 w-4 rounded-full bg-slate-200 animate-pulse" />
                                            <Skeleton className="h-4 w-12 bg-slate-200 animate-pulse" />
                                        </div>
                                        <div className="flex items-center space-x-2 text-slate-500">
                                            {/* Total price skeleton */}
                                            <Skeleton className="h-4 w-4 rounded-full bg-slate-200 animate-pulse" />
                                            <Skeleton className="h-4 w-12 bg-slate-200 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-14 border-b border-slate-100 my-4" />

                        <div className="flex justify-between items-end">
                            {/* Star rating skeleton */}
                            <div className="flex items-center space-x-1 text-sm">
                                <Skeleton className="h-5 w-5 rounded-full bg-slate-200 animate-pulse" />
                                <Skeleton className="h-5 w-5 bg-slate-200 animate-pulse" />
                                <Skeleton className="h-4 w-5 bg-slate-200 animate-pulse" />
                            </div>
                            {/* Button skeleton */}
                            <Skeleton className="h-11 w-28 bg-slate-200 rounded-lg animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardHistorySkeleton;
