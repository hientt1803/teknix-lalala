"use client";

import {useEffect, useState} from "react";
import {SignInFlow} from "../types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

interface AuthScreenProps {
    screen?: SignInFlow;
}
const AuthScreen = ({screen = "signIn"}: AuthScreenProps) => {
    const [state, setState] = useState<SignInFlow>(screen);
    useEffect(() => {
        if (screen) setState(screen);
    }, [screen]);

    return (
        <div className="flex flex-col">
            <div className="w-full">
                {state === "signIn" ? (
                    <SignInCard setState={setState} />
                ) : (
                    <SignUpCard setState={setState} />
                )}
            </div>
        </div>
    );
};

export default AuthScreen;
