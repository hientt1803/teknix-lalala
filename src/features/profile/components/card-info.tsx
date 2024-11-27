"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/stores";
import { useLazyGetCurrentUserQuery } from "@/stores/features/user";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { EditIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const CardInfoUser = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userInfo = useAppSelector((state) => state.userSlice.currentUser);
    const [getData, {data, isLoading, isFetching}] = useLazyGetCurrentUserQuery();

    useEffect(() => {
        if (!userInfo) {
            getData({});
        }
    }, [userInfo]);

    const userData = userInfo || data;
    return (
        <div className="block flex-grow mb-24 lg:mb-0">
            <div className="lg:sticky lg:top-24">
                <div className="w-full relative flex flex-col items-center text-center sm:rounded-2xl sm:border border-slate-200 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipContent>Edit profile</TooltipContent>
                            <TooltipTrigger className="absolute right-2 top-2 bg-transparent hover:bg-slate-100 p-2 rounded-lg">
                                <Link href="/profile/account">
                                    <EditIcon className="text-slate-500" />
                                </Link>
                            </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>

                    <div className="relative flex-shrink-0 inline-flex items-center justify-center shadow-inner rounded-full w-28 h-28 ring-1 ring-white ">
                        <Avatar className="cursor-pointer w-full h-full">
                            <AvatarImage src={userData?.avatar} />
                            <AvatarFallback className="text-3xl font-bold text-slate-700">
                                {isLoading || isFetching ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        {userData?.first_name && userData?.last_name
                                            ? `${userData.first_name[0]}${userData.last_name[0]}`.toUpperCase()
                                            : userData?.email?.slice(0, 2).toUpperCase()}
                                    </>
                                )}
                            </AvatarFallback>
                        </Avatar>
                        <span className=" bg-teal-500 rounded-full text-white text-xs flex items-center justify-center absolute  w-6 h-6 -top-0.5 right-2">
                            <i className="las la-check"></i>
                        </span>
                    </div>
                    <div className="space-y-3 text-center flex flex-col items-center">
                        <h2 className="text-3xl font-semibold">
                            {" "}
                            {userData?.first_name && userData?.last_name
                                ? `${userData.last_name} ${userData.first_name}`
                                : userData?.email?.slice(
                                      0,
                                      userData.email.lastIndexOf("@")
                                  ) || "No Name Provided"}
                        </h2>
                        <div className="flex justify-start items-start gap-1">
                            <StarFilledIcon className="w-5 h-5 text-orange-500" />

                            <span className="text-sm font-medium">4.5</span>
                            <span className="text-xs text-slate-500">(112)</span>
                        </div>
                    </div>
                    <p className="text-slate-500">
                        {userData?.description || "No description"}
                    </p>
                    <nav className="flex text-2xl text-slate-600 !space-x-3">
                        <a
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-xl"
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                        >
                            <i className="lab la-facebook-square"></i>
                        </a>
                        <a
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-xl"
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Twitter"
                        >
                            <i className="lab la-twitter"></i>
                        </a>
                        <a
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-xl"
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Youtube"
                        >
                            <i className="lab la-youtube"></i>
                        </a>
                        <a
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-xl"
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Instagram"
                        >
                            <i className="lab la-instagram"></i>
                        </a>
                    </nav>
                    <div className="border-b border-slate-200 w-14" />
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-slate-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                ></path>
                            </svg>
                            <span className="text-slate-600">Ha Noi, Viet Nam</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-slate-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                ></path>
                            </svg>
                            <span className="text-slate-600">Speaking English</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-slate-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                            </svg>
                            <span className="text-slate-600">Joined in March 2016</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardInfoUser;
