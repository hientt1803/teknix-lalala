"use client";
import Bounded from "@/components/common/containers/bounded";
import {useScrollIntoView} from "@/hooks/use-scroll";
import {useAppSelector} from "@/stores/hook";
import {useGetStaylDataByIdQuery} from "@/stores/features/stay/stay-api";
import {countTotalDaysInRange} from "@/utilities/time";
import {StarFilledIcon} from "@radix-ui/react-icons";
import {format} from "date-fns";
import {useSearchParams} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import FormInfomation from "./components/form";
import Payment from "./components/payment";
import {CircleHelpIcon} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatCurrencyWithCodeAsSuffix } from "@/utilities/currency";

const CheckoutFeatures = () => {
    const searchParams = useSearchParams();
    const [isConfirm, setIsConfirm] = useState(false);
    const {scrollIntoView, targetRef} = useScrollIntoView<HTMLDivElement>({
        alignment: "start",
    });
    const hotel = useAppSelector((state) => state.staySlice.reserveForm);
    // console.log("🚀 ~ CheckoutFeatures ~ hotel:", hotel);
    const totalDay = useMemo(() => {
        let total = countTotalDaysInRange(
            format(hotel.checkin_date || new Date(), "yyyy-MM-dd"),
            format(hotel.checkout_date || new Date(), "yyyy-MM-dd")
        );
        return total;
    }, [hotel]);

    const taxes = useMemo(() => {
        const taxes = hotel.rate?.payment_options.payment_types[0]?.tax_data?.taxes || [];

        const includedTaxes = taxes.filter((tax) => tax.included_by_supplier === true);
        const notIncludedTaxes = taxes.filter(
            (tax) => tax.included_by_supplier === false
        );

        return {
            includedTaxes,
            notIncludedTaxes,
        };
    }, [hotel]);

    const {data, isLoading} = useGetStaylDataByIdQuery({
        id: hotel.hotel_id,
    });

    useEffect(() => {
        const reservation = searchParams.get("reservation");
        if (reservation) {
            setIsConfirm(true);
            scrollIntoView();
        }
    }, []);
    useEffect(() => {
        if (isConfirm) {
            scrollIntoView();
        }
    }, [isConfirm]);
    return (
        <Bounded className="relative mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
            {/* MAIN SECTION */}
            <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
                <div className="w-full flex flex-col sm:rounded-2xl sm:border border-slate-200 dark:border-slate-700 space-y-8 px-0 sm:p-6 xl:p-8">
                    <h2 className="text-3xl lg:text-4xl font-semibold">
                        Confirm and payment
                    </h2>
                    <div className="border-b border-slate-200 dark:border-slate-700" />
                    <div>
                        {/* DETAIL MOBILE */}
                        <div className="block lg:hidden flex-grow">
                            <div className="sticky top-28 w-full flex flex-col sm:rounded-2xl lg:border border-slate-200 dark:border-slate-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex-shrink-0 w-full sm:w-40">
                                        <div className="aspect-square relative rounded-2xl overflow-hidden">
                                            <img
                                                alt=""
                                                className="absolute inset-0 h-full object-cover"
                                                src={data?.images[0]?.replace(
                                                    "{size}",
                                                    "640x400"
                                                )}
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                    <div className="py-5 sm:px-5 space-y-3">
                                        <div>
                                            <span className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                                                {data?.address}
                                            </span>
                                            <span className="text-base font-medium mt-1 block">
                                                {data?.name}
                                            </span>
                                        </div>
                                        <span className="block  text-sm text-slate-500 dark:text-slate-400">
                                            {hotel.rate?.room_name}
                                            {/* - {hotel.rate?.room_data_trans.bedding_type} */}
                                        </span>
                                        <div className="w-10 border-b border-slate-200 dark:border-slate-700" />
                                        <div className="flex justify-start items-start gap-1">
                                            <StarFilledIcon className="text-orange-500 w-4 h-4" />

                                            <p className="font-semibold text-sm">
                                                {data?.star_rating}
                                            </p>
                                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                                (112)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <h3 className="text-2xl font-semibold">
                                        Price detail
                                    </h3>
                                    <div className="flex justify-between text-slate-600 dark:text-slate-50">
                                        <span>
                                            {formatCurrencyWithCodeAsSuffix(
                                                hotel.rate?.daily_prices[0] || 0
                                            )}
                                            x {totalDay} day
                                        </span>
                                        <span>
                                            {formatCurrencyWithCodeAsSuffix(
                                                Number.parseFloat(
                                                    hotel.rate?.daily_prices[0] || "0"
                                                ) * totalDay
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 dark:text-slate-50">
                                        <span>Service charge</span>
                                        <span>$0</span>
                                    </div>
                                    <div className="border-b border-slate-200"></div>
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>
                                            {formatCurrencyWithCodeAsSuffix(
                                                Number.parseFloat(
                                                    hotel.rate?.daily_prices[0] || "0"
                                                ) * totalDay
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3 className="text-2xl font-semibold">Your info</h3>
                            <FormInfomation
                                data={data}
                                isConfirm={isConfirm}
                                scrollIntoView={scrollIntoView}
                                setIsConfirm={setIsConfirm}
                            />
                        </div>
                    </div>
                    {/* Trigger scroll */}
                    <div ref={targetRef} />
                    <Payment isConfirm={isConfirm} />
                </div>
            </div>
            {/* DETAILS */}
            <div className="hidden lg:block flex-grow">
                <div className="sticky top-28 w-full flex flex-col sm:rounded-2xl lg:border border-slate-200 dark:border-slate-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="flex-shrink-0 w-full sm:w-40">
                            <div className="aspect-square relative rounded-2xl overflow-hidden">
                                <img
                                    alt=""
                                    className="absolute inset-0 h-full object-cover"
                                    src={data?.images[0]?.replace("{size}", "640x400")}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div className="py-5 sm:px-5 space-y-3">
                            <div>
                                <span className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                                    {data?.address}
                                </span>
                                <span className="text-base font-medium mt-1 block">
                                    {data?.name}
                                </span>
                            </div>
                            <span className="block  text-sm text-slate-500 dark:text-slate-400">
                                {hotel.rate?.room_name}
                                {/* - {hotel.rate?.room_data_trans.bedding_type} */}
                            </span>
                            <div className="w-10 border-b border-slate-200 dark:border-slate-700" />
                            <div className="flex items-start justify-start gap-1">
                                <StarFilledIcon className="text-orange-500 w-5 h-5" />

                                <span className="text-sm font-medium">
                                    {data?.star_rating}
                                </span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    (112)
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                            <h3 className="text-2xl font-semibold">Your trip</h3>
                        </div> */}
                    {/* <div className="mt-6">Hello</div> */}
                    <div className="border border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col sm:flex-row divide-y divide-solid sm:divide-x sm:divide-y-0 divide-slate-200 dark:divide-slate-700  overflow-hidden z-10">
                        <div
                            className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-slate-50 dark:hover:bg-slate-700"
                            // onClick={handleOpenDateChange.open}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm text-slate-400">
                                    Check in - check out
                                </span>
                                <span className="mt-1.5 text-lg font-semibold">
                                    {format(hotel.checkin_date, "MMM dd")}
                                    {" - "}
                                    {format(hotel.checkout_date, "MMM dd")}
                                </span>
                            </div>
                            {/* <IconEdit className="text-slate-500" /> */}
                        </div>

                        <div
                            className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-slate-50 dark:hover:bg-slate-700"
                            // onClick={handleOpenGuestChange.open}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm text-slate-400">Guests</span>
                                <span className="mt-1.5 text-lg font-semibold">
                                    {hotel.num_guests} Guests
                                </span>
                            </div>
                            {/* <IconEdit className="text-slate-500" /> */}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-2xl font-semibold">Price detail</h3>
                        <div className="flex justify-between text-slate-600 dark:text-slate-50">
                            <span>
                                {formatCurrencyWithCodeAsSuffix(hotel.rate?.daily_prices[0] || 0)} x{" "}
                                {totalDay} day
                            </span>
                            <span>
                                {formatCurrencyWithCodeAsSuffix(
                                    Number.parseFloat(
                                        hotel.rate?.daily_prices[0] || "0"
                                    ) * totalDay
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between text-slate-600  dark:text-slate-50">
                            <span>Service charge</span>
                            <span>{formatCurrencyWithCodeAsSuffix(0)}</span>
                        </div>
                        <div className="border-b border-slate-200 dark:border-slate-700"></div>
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>
                                {formatCurrencyWithCodeAsSuffix(
                                    Number.parseFloat(
                                        hotel.rate?.daily_prices[0] || "0"
                                    ) * totalDay
                                )}
                            </span>
                        </div>
                        <div className="border-b border-slate-200 dark:border-slate-700"></div>

                        <div className="flex justify-between items-start space-x-5">
                            <p className="text-sm text-slate-800  dark:text-slate-400">
                                Approximate price in VND: the currency rate might change
                                at the time of payment.
                            </p>

                            {/* Tooltip wrapper cho CircleHelpIcon */}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="cursor-pointer">
                                            <CircleHelpIcon className="w-4 h-4" />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="top"
                                        align="center"
                                        className="max-w-xs"
                                    >
                                        <p>
                                            This is an estimate and the final amount might
                                            vary depending on the currency exchange rate
                                            at the time of payment.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        {taxes.includedTaxes.map((tax, index) => (
                            <div
                                className="flex justify-between text-slate-600  dark:text-slate-50"
                                key={index}
                            >
                                <span className="capitalize text-sm">
                                    {tax.name.replaceAll("_", " ")}
                                </span>
                                <span>
                                    {formatCurrencyWithCodeAsSuffix(Number.parseFloat(tax.amount))}
                                </span>
                            </div>
                        ))}
                        <div className="border-b border-slate-200 dark:border-slate-700"></div>
                        <p className="text-base font-medium text-slate-800  dark:text-slate-400">
                            To be paid upon arrival
                        </p>
                        {taxes.notIncludedTaxes.map((tax, index) => (
                            <div
                                className="flex justify-between text-slate-600  dark:text-slate-50"
                                key={index}
                            >
                                <span className="capitalize text-sm">
                                    {tax.name.replaceAll("_", " ")}
                                </span>
                                <span>
                                    {formatCurrencyWithCodeAsSuffix(Number.parseFloat(tax.amount))}
                                </span>
                            </div>
                        ))}
                        <div className="border-b border-slate-200"></div>
                        <p className="text-sm text-slate-500  dark:text-slate-400">
                            Please note You&apos;ll have to pay taxes and fees in the
                            local currency VND.
                        </p>
                    </div>
                </div>
            </div>
        </Bounded>
    );
};

export default CheckoutFeatures;
