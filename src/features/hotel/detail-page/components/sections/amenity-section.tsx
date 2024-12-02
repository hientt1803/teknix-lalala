"use client"

import {Button} from "@/components/ui/button";
import {AmenityGroup} from "@/stores/features/stay/type";
import {useState} from "react";

type Props = {
    amenites?: AmenityGroup[];
};

const AmenitiesSecion = ({amenites}: Props) => {
    const [showAll, setShowAll] = useState(false); 

    return (
        <div className="border border-neutral-200 dark:border-neutral-700 p-6 rounded-lg space-y-8 my-10">
            <div>
                <h2 className="text-2xl font-semibold">Amenities </h2>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-300">
                    {" "}
                    About the property&apos;s amenities and services
                </span>
            </div>
            <div className="w-14 border-b border-neutral-200" />

            {(showAll && amenites ? amenites : amenites?.slice(0, 4))?.map(
                (amenity, index) => (
                    <div key={index} className="space-y-3">
                        <div className="flex flex-col">
                            <h3 className="font-medium mb-5">{amenity.group_name}</h3>
                            <div
                                key={amenity.group_name}
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 text-sm text-neutral-700 dark:text-neutral-400"
                            >
                                {amenity.amenities.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3"
                                    >
                                        {/* <i className="text-2xl las la-key"></i> */}
                                        <span className=" ">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-b border-neutral-200 dark:border-neutral-700" />
                    </div>
                )
            )}

            {/* <div className="flex items-center space-x-3">
                    <i className="text-3xl las la-luggage-cart"></i>
                    <span className=" ">la-luggage-cart</span>
                </div>
                <div className="flex items-center space-x-3">
                    <i className="text-3xl las la-shower"></i>
                    <span className=" ">la-shower</span>
                </div>
                <div className="flex items-center space-x-3">
                    <i className="text-3xl las la-smoking"></i>
                    <span className=" ">la-smoking</span>
                </div>
                <div className="flex items-center space-x-3">
                    <i className="text-3xl las la-snowflake"></i>
                    <span className=" ">la-snowflake</span>
                </div>
                <div className="flex items-center space-x-3">
                    <i className="text-3xl las la-spa"></i>
                    <span className=" ">la-spa</span>
                </div>
                <div className="flex items-center space-x-3">
                    <i className="text-3xl las la-suitcase"></i>
                    <span className=" ">la-suitcase</span>
                </div>
                <div className="flex items-center space-x-3">
                    <i className="text-3xl las la-suitcase-rolling"></i>
                    <span className=" ">la-suitcase-rolling</span>
                </div>
                <div className="flex items-center space-x-3">
                    <i className="text-3xl las la-swimmer"></i>
                    <span className=" ">la-swimmer</span>
                </div>
                <div className="flex items-center space-x-3">
                    <i className="text-3xl las la-swimming-pool"></i>
                    <span className=" ">la-swimming-pool</span>
                </div>
                <div className="flex items-center space-x-3">
                    <i className="text-3xl las la-tv"></i>
                    <span className=" ">la-tv</span>
                </div>
                <div className="flex items-center space-x-3">
                    <i className="text-3xl las la-umbrella-beach"></i>
                    <span className=" ">la-umbrella-beach</span>
                </div> */}

            {/* <div className="w-14 border-b border-neutral-200" /> */}
            <div>
                <Button
                    onClick={() => setShowAll((o) => !o)}
                    className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 border bg-white border-neutral-200 text-neutral-700 hover:text-neutral-900  hover:bg-neutral-100   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 "
                >
                    {!showAll ? "View more amenities" : "Hide"}
                </Button>
            </div>
        </div>
    );
};

export default AmenitiesSecion;
