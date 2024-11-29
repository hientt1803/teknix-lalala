import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {StarFilledIcon} from "@radix-ui/react-icons";
import {CalendarIcon, CircleCheckIcon, ClockIcon, MessageSquareIcon} from "lucide-react";

const HostInfoSection = () => {
    return (
        <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-2xl space-y-8">
            <h2 className="text-2xl font-semibold">Host Infomation</h2>
            <div className="w-14 border-b border-slate-200 dark:border-slate-700"></div>
            <div className="flex items-center space-x-4">
                <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 ring-1 ring-white ">
                    <Avatar>
                        <AvatarImage src={"/testimonials/client6.png"} />
                    </Avatar>
                    <span className="rounded-full bg-green-600 text-xs flex items-center justify-center absolute  w-4 h-4 -top-0.5 -right-0.5">
                        <CircleCheckIcon
                            className="w-5 h-5"
                            strokeWidth={1.5}
                            // color={theme.colors.green[7]}
                        />
                    </span>
                </div>
                <div>
                    <span className="block text-xl font-medium">Kevlin Francis</span>
                    <div className="mt-1.5 flex items-center text-sm text-slate-500 dark:text-slate-200">
                        <div className="flex items-center space-x-1 text-sm">
                            <div className="pb-[2px]">
                                <StarFilledIcon
                                    className="w-5 h-5 text-orange-500"
                                    strokeWidth={1.5}
                                />
                            </div>
                            <span className="font-medium">4.5</span>
                            <span className="text-slate-500 dark:text-slate-400">
                                (112)
                            </span>
                        </div>
                        <span className="mx-2">·</span>
                        <span> 12 places</span>
                    </div>
                </div>
            </div>
            <span className="block text-slate-600 dark:text-slate-50">
                Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
                accommodation, an outdoor swimming pool, a bar, a shared lounge, a garden
                and barbecue facilities...
            </span>
            <div className="block text-slate-500 dark:text-slate-50 space-y-2.5">
                <div className="flex items-center space-x-3">
                    <CalendarIcon />
                    <span>Joined in March 2016</span>
                </div>
                <div className="flex items-center space-x-3">
                    <MessageSquareIcon />
                    <span>Response rate - 100%</span>
                </div>
                <div className="flex items-center space-x-3">
                    <ClockIcon />
                    <span>Fast response - within a few hours</span>
                </div>
            </div>
            <div className="w-14 border-b border-border-200 dark:border-slate-700"></div>
            <div>
                <Button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base px-4 py-3 sm:px-6  font-medium border bg-white border-slate-200 text-slate-700 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 ">
                    See host profile
                </Button>
            </div>
        </div>
    );
};

export default HostInfoSection;
