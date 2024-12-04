'use client';

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { AuthSkeleton } from '@/features/auth/components/auth-screen';
import { SignInFlow } from '@/features/auth/types';
import { useAppSelector } from '@/stores';

const AuthScreen = dynamic(
  () => import('@/features/auth/components/auth-screen'),
  {
    ssr: false,
    loading: () => <AuthSkeleton />,
  },
);

export const AuthContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector(state => state.userSlice.access_token);
  const [screenDisplay, setScreenDisplay] = useState<SignInFlow>('signIn');

  useEffect(() => {
    const screen = searchParams.get('screen') as SignInFlow;
    if (screen) setScreenDisplay(screen);
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      const redirectUrl = searchParams.get('redirect') || '/';
      router.push(redirectUrl);
    }
  }, [user, searchParams, router]);

  return <AuthScreen screen={screenDisplay} />;
};
