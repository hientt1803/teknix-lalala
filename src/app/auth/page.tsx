"use client";

import {Separator} from "@/components/ui/separator";
import {Skeleton} from "@/components/ui/skeleton";
import {SignInFlow} from "@/features/auth/types";
import {useAppSelector} from "@/stores";
import dynamic from "next/dynamic";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

const AuthScreen = dynamic(() => import("@/features/auth/components/auth-screen"), {
    ssr: false,
    loading: () => <AuthSkeleton />,
});

const AuthPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const user = useAppSelector((state) => state.userSlice.access_token);
    const [screenDisplay, setScreenDisplay] = useState<SignInFlow>("signIn");

    useEffect(() => {
        const screen = searchParams.get("screen") as SignInFlow;
        if (screen) setScreenDisplay(screen);
    }, [searchParams]);

    useEffect(() => {
        if (user) {
            const redirectUrl = searchParams.get("redirect") || "/";
            router.push(redirectUrl);
        }
    }, [user, searchParams, router]);

    return <AuthScreen screen={screenDisplay} />;
};

export default AuthPage;

const AuthSkeleton = () => (
    <div className="container mb-24 lg:mb-32">
        <div className="my-20 flex flex-col items-center justify-center">
            <Skeleton className="h-10 w-24" />
        </div>
        <div className="max-w-md mx-auto space-y-6">
            <div className="grid gap-3">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-10 mt-1" />
                </div>
                <div>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-10 mt-1" />
                </div>
                <div>
                    <Skeleton className="h-14 mt-1" />
                </div>
            </div>
        </div>
    </div>
);
