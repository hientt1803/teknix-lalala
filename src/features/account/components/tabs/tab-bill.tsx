import {Button} from "@/components/ui/button";
import React from "react";

const TabChangeBill = () => {
    return (
        <div className="pt-14 sm:pt-20 pb-24 lg:pb-32">
            <div className="space-y-6 sm:space-y-8">
                <h2 className="text-3xl font-semibold">Payments & payouts</h2>
                <div className="w-14 border-b border-neutral-200" />
                <div className="max-w-2xl">
                    <span className="text-xl font-semibold block">Payout methods</span>
                    <br />
                    <span className="text-neutral-700 block">
                        When you receive a payment for a reservation, we call that payment
                        to you a &apos;payout.&apos; Our secure payment system supports several
                        payout methods, which can be set up below. Go to FAQ.
                        <br />
                        <br />
                        To get paid, you need to set up a payout method Airbnb releases
                        payouts about 24 hours after a guest&apos;s scheduled check-in time.
                        The time it takes for the funds to appear in your account depends
                        on your payout method. Learn more
                    </span>
                    <div className="pt-10">
                        <Button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:focus:ring-offset-0">
                            Add payout method
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabChangeBill;
