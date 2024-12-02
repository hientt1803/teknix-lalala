import { Rating } from "@/components/custom/rating/rating";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";

const CardReview = () => {
    return (
        <div className="flex flex-col p-4 border space-y-8 rounded-2xl">
            <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
            <div className="w-14 border-b border-neutral-200" />
            <div className="divide-y divide-solid  divide-neutral-100">
                <div className="flex space-x-4 pb-8">
                    <div className="pt-0.5">
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white">
                            <Avatar className="absolute inset-0 w-full h-full object-cover rounded-full">
                                <AvatarImage src={"/testimonials/client4.png"} />
                                <AvatarFallback>N</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="flex justify-between space-x-3">
                            <div className="flex flex-col">
                                <div className="text-sm font-semibold">
                                    <span>Cody Fisher</span>
                                    <span className="text-neutral-500 font-normal">
                                        {" "}
                                        review in{" "}
                                    </span>
                                    <a href="/">The Lounge &amp; Bar</a>
                                </div>
                                <span className="text-sm text-neutral-500 mt-0.5">
                                    May 20, 2021
                                </span>
                            </div>
                            <Rating rating={5} size={15} />
                        </div>
                        <span className="block mt-3 text-neutral-600">
                            There’s no stopping the tech giant. Apple now opens its 100th
                            store in China.There’s no stopping the tech giant.
                        </span>
                    </div>
                </div>
                <div className="flex space-x-4 py-8">
                    <div className="pt-0.5">
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white">
                            <Avatar className="absolute inset-0 w-full h-full object-cover rounded-full">
                                <AvatarImage src={"/testimonials/client4.png"} />
                                <AvatarFallback>N</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="flex justify-between space-x-3">
                            <div className="flex flex-col">
                                <div className="text-sm font-semibold">
                                    <span>Cody Fisher</span>
                                    <span className="text-neutral-500 font-normal">
                                        {" "}
                                        review in{" "}
                                    </span>
                                    <a href="/">The Lounge &amp; Bar</a>
                                </div>
                                <span className="text-sm text-neutral-500 mt-0.5">
                                    May 20, 2021
                                </span>
                            </div>
                            <Rating rating={5} size={15} />
                        </div>
                        <span className="block mt-3 text-neutral-600">
                            There’s no stopping the tech giant. Apple now opens its 100th
                            store in China.There’s no stopping the tech giant.
                        </span>
                    </div>
                </div>
                <div className="flex space-x-4 py-8">
                    <div className="pt-0.5">
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white">
                            <Avatar className="absolute inset-0 w-full h-full object-cover rounded-full">
                                <AvatarImage src={"/testimonials/client4.png"} />
                                <AvatarFallback>N</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="flex justify-between space-x-3">
                            <div className="flex flex-col">
                                <div className="text-sm font-semibold">
                                    <span>Cody Fisher</span>
                                    <span className="text-neutral-500 font-normal">
                                        {" "}
                                        review in{" "}
                                    </span>
                                    <a href="/">The Lounge &amp; Bar</a>
                                </div>
                                <span className="text-sm text-neutral-500 mt-0.5">
                                    May 20, 2021
                                </span>
                            </div>
                            <Rating rating={5} size={15} />
                        </div>
                        <span className="block mt-3 text-neutral-600">
                            There’s no stopping the tech giant. Apple now opens its 100th
                            store in China.There’s no stopping the tech giant.
                        </span>
                    </div>
                </div>
                <div className="flex space-x-4 py-8">
                    <div className="pt-0.5">
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white">
                            <Avatar className="absolute inset-0 w-full h-full object-cover rounded-full">
                                <AvatarImage src={"/testimonials/client4.png"} />
                                <AvatarFallback>N</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="flex justify-between space-x-3">
                            <div className="flex flex-col">
                                <div className="text-sm font-semibold">
                                    <span>Cody Fisher</span>
                                    <span className="text-neutral-500 font-normal">
                                        {" "}
                                        review in{" "}
                                    </span>
                                    <a href="/">The Lounge &amp; Bar</a>
                                </div>
                                <span className="text-sm text-neutral-500 mt-0.5">
                                    May 20, 2021
                                </span>
                            </div>
                            <Rating rating={5} size={15} />
                        </div>
                        <span className="block mt-3 text-neutral-600">
                            There’s no stopping the tech giant. Apple now opens its 100th
                            store in China.There’s no stopping the tech giant.
                        </span>
                    </div>
                </div>
                <div className="pt-8">
                    <Button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600">
                        View more 20 reviews
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CardReview;
