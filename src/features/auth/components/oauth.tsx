import {Button} from "@/components/ui/button";
import React from "react";

const Oauth = () => {
    return (
        <div className="grid gap-3">
            <Button
                variant={"ghost"}
                className="will-change-transform bg-slate-50 dark:bg-slate-800 flex w-full rounded-lg px-4 py-5 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
            >
                <img src="/icons/facebook-icon.svg" className="flex-shrink-0" />
                <h3 className="flex-grow text-center text-sm font-medium text-slate-700 dark:text-slate-300 sm:text-sm">
                    Continune with Facebook
                </h3>
            </Button>
            <Button
                variant={"ghost"}
                className="will-change-transform  bg-slate-50 dark:bg-slate-800 flex w-full rounded-lg px-4 py-5 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
            >
                <img src="/icons/twitter-icon.svg" className="flex-shrink-0" />
                <h3 className="flex-grow text-center text-sm font-medium text-slate-700 dark:text-slate-300 sm:text-sm">
                    Continune with Twitter
                </h3>
            </Button>
            <Button
                variant={"ghost"}
                className="will-change-transform  bg-slate-50 dark:bg-slate-800 flex w-full rounded-lg px-4 py-5 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
            >
                <img src="/icons/google-icon.svg" className="flex-shrink-0" />
                <h3 className="flex-grow text-center text-sm font-medium text-slate-700 dark:text-slate-300 sm:text-sm">
                    Continune with Google
                </h3>
            </Button>
        </div>
    );
};

export default Oauth;
