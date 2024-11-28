import Link from 'next/link';
import Bounded from '../containers/bounded';
import { createClient } from '@/prismicio';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { PrismicImage } from '@prismicio/react';
import { cn } from '@/lib/utils';

const SwitchTypeLazy = dynamic(() => import('./switch-type'), {
   loading: () => <Skeleton className="h-10 w-28" />,
});
const MobileMenuLazy = dynamic(() => import('./menu'), {
   loading: () => <Skeleton className="h-10 w-10" />,
   ssr: false,
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

const Header = async () => {
   const client = createClient();
   const settings = await client.getSingle('settins');

   const navigations = settings.data.navigation.map((nav) => ({
      title: nav.title,
      link: nav.link,
      description: nav.description,
      icon: nav.icon,
   }));

   return (
      <div
         className={cn(
            'fixed top-0 w-full left-0 right-0 z-40 dark:bg-transparent bg-opacity-60 backdrop-blur-2xl',
         )}
      >
         <Bounded as="header" className="p-0">
            <div className="relative">
               <div className="px-4 h-16 sm:h-18 lg:container flex justify-between items-center">
                  {/* LOGO AND NAVIGATION */}
                  <div className="justify-start items-center flex flex-1 space-x-3 sm:space-x-6 lg:space-x-8">
                     <Link href="/">
                        <PrismicImage
                           field={settings.data.logo}
                           alt=""
                           className="w-9 md:w-12 h-auto object-contain"
                        />
                     </Link>
                     <div className="hidden lg:block self-center h-10 border-l border-neutral-300 dark:border-neutral-300" />
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
                        <MobileMenuLazy />
                     </div>
                  </div>
               </div>
            </div>
         </Bounded>
      </div>
   );
};

export default Header;
