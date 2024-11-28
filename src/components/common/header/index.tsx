'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Bounded from '../containers/bounded';
import { createClient } from '@/prismicio';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { PrismicImage } from '@prismicio/react';
import { Button } from '@/components/ui/button';
import { Grip } from 'lucide-react';
import { Content } from '@prismicio/client';

const SwitchTypeLazy = dynamic(() => import('./switch-type'), {
   loading: () => <Skeleton className="h-10 w-28" />,
});

const RightSiderHeaderLazy = dynamic(() => import('./right-side'), {
   ssr: false,
   loading: () => (
      <div className="flex space-x-4">
         <Skeleton className="h-11 w-32 rounded" />
         <Skeleton className="h-11 w-32 rounded" />
         <Skeleton className="h-11 w-32 rounded" />
         <Skeleton className="h-11 w-11 rounded-full" />
         <Skeleton className="h-11 w-24 rounded-full" />
         <Skeleton className="h-11 w-24 rounded-full" />
      </div>
   ),
});

const Header = () => {
   const [settings, setSettings] = useState<Content.SettinsDocument>();
   const [navigations, setNavigations] = useState<Content.SettinsDocumentDataNavigationItem[]>([]);
   const [lastScrollY, setLastScrollY] = useState(0);
   const [isHeaderVisible, setIsHeaderVisible] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         const client = createClient();
         const fetchedSettings = await client.getSingle('settins');
         setSettings(fetchedSettings);
         const navItems = fetchedSettings.data.navigation.map((nav) => ({
            title: nav.title,
            link: nav.link,
            description: nav.description,
            icon: nav.icon,
         }));
         setNavigations(navItems);
      };

      fetchData();
   }, []);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY < lastScrollY) {
            // scrolling down
            setIsHeaderVisible(true);
         } else {
            // scrolling up
            setIsHeaderVisible(false);
         }
         setLastScrollY(window.scrollY);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [lastScrollY]);

   // Ensure settings is loaded before rendering
   if (!settings) return null; // You can also show a loading skeleton here

   return (
      <div
         className={`fixed top-0 w-full left-0 right-0 z-40 dark:bg-transparent bg-opacity-60 backdrop-blur-2xl py-0  transition-transform duration-300 ${
            isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
         }`}
      >
         <Bounded as="header" className="p-0">
            <div className="relative">
               <div className="px-4 h-16 sm:h-20 lg:container flex justify-between items-center">
                  {/* LOGO AND NAVIGATION */}
                  <div className="justify-start items-center flex flex-1 space-x-3 sm:space-x-6 lg:space-x-8">
                     <Link href="/">
                        <PrismicImage
                           field={settings.data.logo}
                           alt=""
                           className="w-16 h-auto object-contain"
                        />
                     </Link>
                     <div className="hidden lg:block self-center h-10 border-l border-neutral-600 dark:border-neutral-300" />
                     <div className="hidden lg:block">
                        <SwitchTypeLazy navigation={navigations} />
                     </div>
                  </div>

                  {/* USER BUTTON & NOTIFICATION & MENU HUMBUGER */}
                  <div className="flex flex-shrink-0 items-center justify-end flex-1 space-x-1 lg:flex-none text-slate-700">
                     <div className="hidden md:block">
                        <RightSiderHeaderLazy />
                     </div>
                     <div className="block lg:hidden">
                        <Button
                           variant="ghost"
                           size="icon"
                           className="bg-yellow-400 hover:bg-neutral-950 hover:text-white w-10 h-10 rounded-lg"
                        >
                           <Grip className="w-6 h-6" />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </Bounded>
      </div>
   );
};

export default Header;
