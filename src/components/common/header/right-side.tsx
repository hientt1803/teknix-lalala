'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
// import {NavigationMenuComp} from "./navigation";
import { Button } from '@/components/ui/button';
import UserButton from './user-button';

// import {useAppSelector} from "@/stores";
import { KeyTextField, RichTextField } from '@prismicio/client';
import { LinkField } from '@prismicio/client';
import LanguageButton from './languages';
import Link from 'next/link';
import CurrencyButton from './currency';
import Notification from './nofitication';
import { ModeToggle } from '@/components/common/themes/mode-toggle';
import { useAppSelector } from '@/stores';
import { ModeToggleMenu } from '../themes/mode-menu';

type Props = {
   navigation: {
      title: KeyTextField;
      href: LinkField;
      description: RichTextField;
   }[];
};
type RightSideHeaderProps = {
    className?: string
}
const RightSiderHeader = () => {
   const router = useRouter();
   const user = useAppSelector((state) => state.userSlice.access_token);

   const renderAuthButtons = () => (
      <>
         <Button
            className="rounded-full hidden lg:flex"
            variant="secondary"
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
         {/* <Button
            asChild
            className="rounded-full px-5 py-5 ring-1 ring-slate-700 dark:ring-slate-200 dark:text-slate-200 text-base hover:ring-0"
            variant="ghost"
         >
            <Link href="#">List your property</Link>
         </Button> */}
         <Notification />
         {/* <ModeToggle /> */}
         <ModeToggleMenu />
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
                  <CurrencyButton />
                  <LanguageButton />
                  {/* <ModeToggle /> */}
                  <ModeToggleMenu />
                  {renderAuthButtons()}
               </div>
            )}
         </div>

         {/* MOBILE HEADER */}
         <div className="flex items-center space-x-2 lg:hidden">
            {user ? (
               <>
                  {/* <ModeToggle /> */}
                  <ModeToggleMenu />
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
