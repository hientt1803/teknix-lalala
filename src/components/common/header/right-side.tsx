'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
// import {NavigationMenuComp} from "./navigation";
import { Button } from '@/components/ui/button';
import UserButton from './user-button';

// import {useAppSelector} from "@/stores";
import { Skeleton } from '@/components/ui/skeleton';
import { KeyTextField, RichTextField } from '@prismicio/client';
import { LinkField } from '@prismicio/client';
import LanguageButton from './languages';
import Link from 'next/link';
import CurrencyButton from './currency';
import Notification from './nofitication';
import { ModeToggle } from '@/components/common/themes/mode-toggle';
import { useAppSelector } from '@/stores';

type Props = {
   navigation: {
      title: KeyTextField;
      href: LinkField;
      description: RichTextField;
   }[];
};
const RightSiderHeader = () => {
   const router = useRouter();
   const user = useAppSelector((state) => state.userSlice.access_token);

   const renderAuthButtons = () => (
      <>
         <Button
            className="rounded-full hidden lg:flex"
            variant="outline"
            onClick={() => router.push('/auth?screen=signUp&redirect=/')}
         >
            Sign up
         </Button>
         <Button
            className="rounded-full"
            onClick={() => router.push('/auth?screen=signIn&redirect=/')}
         >
            Sign in
         </Button>
      </>
   );

   const renderUserActions = () => (
      <div className="space-x-1 flex items-center">
         <CurrencyButton />
         <LanguageButton />
         <Link
            href="#"
            className=" text-opacity-90 group px-4 py-2 border border-slate-300 hover:border-slate-400 dark:border-slate-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-slate-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
         >
            List your property
         </Link>
         <Notification />
         <ModeToggle />
         <UserButton />
      </div>
   );

   return (
      <>
         {/* DESKTOP HEADER */}
         <div className="hidden lg:flex items-center space-x-2">
            {/* <NavigationMenuComp navigations={navigation} /> */}
            {user ? (
               renderUserActions()
            ) : (
               <div className="space-x-2 flex items-center">
                  <ModeToggle />
                  {renderAuthButtons()}
               </div>
            )}
         </div>

         {/* MOBILE HEADER */}
         <div className="flex items-center space-x-2 lg:hidden">
            {user ? (
               <>
                  <ModeToggle />
                  <Notification />
                  <UserButton />
               </>
            ) : (
               renderAuthButtons()
            )}
         </div>
      </>
   );
};

export default RightSiderHeader;
