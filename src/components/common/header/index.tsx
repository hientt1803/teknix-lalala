import { PrismicImage } from '@prismicio/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { createClient } from '@/prismicio';

import Bounded from '../containers/bounded';

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

  const navigations = settings.data.navigation.map(nav => ({
    title: nav.title,
    link: nav.link,
    description: nav.description,
    icon: nav.icon,
  }));

  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 z-40 w-full bg-opacity-60 backdrop-blur-2xl dark:bg-transparent',
      )}
    >
      <Bounded as="header" className="p-0">
        <div className="relative">
          <div className="sm:h-18 flex h-16 items-center justify-between px-4 lg:container">
            {/* LOGO AND NAVIGATION */}
            <div className="flex flex-1 items-center justify-start space-x-3 sm:space-x-6 lg:space-x-8">
              <Link href="/">
                <PrismicImage
                  field={settings.data.logo}
                  alt=""
                  className="h-auto w-9 object-contain md:w-12"
                />
              </Link>
              <div className="hidden h-10 self-center border-l border-neutral-300 dark:border-neutral-300 lg:block" />
              <div className="hidden lg:block">
                <SwitchTypeLazy navigation={navigations} />
              </div>
            </div>

            {/* USER BUTTON & NOTIFICATION & MENU HUMBUGER */}
            <div className="flex flex-1 flex-shrink-0 items-center justify-end space-x-2 text-neutral-700 lg:flex-none">
              <div className="hidden md:block">
                <RightSiderHeaderLazy />
              </div>
              <div className="block">
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
