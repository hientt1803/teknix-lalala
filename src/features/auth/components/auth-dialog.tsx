'use client';
import React, { useEffect, useState } from 'react';

import { SignInFlow } from '../types';
import SignInCardDialog from './sign-in-card-dialog';
import SignUpCardDialog from './sign-up-card-dialog';

interface AuthScreenProps {
  screen?: SignInFlow;
}
const AuthDialogScreen = ({ screen = 'signIn' }: AuthScreenProps) => {
  const [state, setState] = useState<SignInFlow>(screen);
  useEffect(() => {
    if (screen) setState(screen);
  }, [screen]);

  return (
    <div className="flex w-full flex-col">
      <div className="w-full">
        {state === 'signIn' ? (
          <SignInCardDialog setState={setState} />
        ) : (
          <SignUpCardDialog setState={setState} />
        )}
      </div>
    </div>
  );
};

export default AuthDialogScreen;
