'use client';
import {
  ArrowRight,
  Bell,
  Bookmark,
  Dot,
  Grip,
  PercentCircle,
  Settings,
  Sun,
  Ticket,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/stores';
import { onClose, onOpen } from '@/stores/features/dialog';
import {
  logOutUser,
  useLazyGetCurrentUserQuery,
  User,
} from '@/stores/features/user';

import Image from '../images/image';
import { ModeToggleText } from '../themes/mode-text';

const links = [
  //    {
  //       label: 'Notifications',
  //       description: 'New messages',
  //       href: '/',
  //       isTrigger: true,
  //       icon: <Bell className="w-5 h-5" strokeWidth={1.5} />,
  //    },
  {
    label: 'Booking',
    description: '7 tours, 2 moons',
    href: '/booking',
    icon: <Bookmark className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    label: 'My Wallet',
    description: '$4500',
    href: '#',
    icon: <Wallet className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    label: 'Discount',
    description: 'Only today',
    href: '#',
    icon: <PercentCircle className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    label: 'Frieds',
    description: 'Your team',
    href: '#',
    icon: <Users className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    label: 'Tickets',
    description: 'Your tickets',
    href: '#',
    isTrigger: true,
    icon: <Ticket className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    label: 'Settings',
    description: 'Your account',
    href: '/profile?tab=setting',
    icon: <Settings className="h-5 w-5" strokeWidth={1.5} />,
  },
];

const MobileMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector(state => state.userSlice.currentUser);
  const isOpen = useAppSelector(state => state.dialogSlice.isOpen);

  const [getData, { data: fetchedUser, isLoading }] =
    useLazyGetCurrentUserQuery();
  const [userData, setUserData] = useState<User | null>();

  useEffect(() => {
    if (!user && !userData) {
      getData({});
    }
  }, [user, getData]);

  useEffect(() => {
    if (fetchedUser) {
      setUserData(fetchedUser); // Save fetched user data to the state
    }
  }, [fetchedUser]);

  const handleLogout = () => {
    dispatch(logOutUser({}));
    setUserData(undefined); // Clear user info
    router.push('/');
  };

  const handleLogin = () => {
    if (isOpen) {
      dispatch(onClose());
    } else {
      dispatch(onOpen());
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-lg bg-yellow-400 hover:bg-neutral-950 hover:text-white"
        >
          <Grip className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:min-w-[32rem]">
        <SheetHeader>
          <SheetClose asChild>
            <Link href="/">
              <Image src="/lalala.svg" className="w-12" alt="" />
            </Link>
          </SheetClose>

          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-50px)]">
          <div className="space-y-8 p-0">
            <div className="flex items-center justify-between rounded-xl border p-3 py-4 dark:bg-neutral-800">
              <div className="flex items-center gap-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={userData?.avatar}
                    alt={userData?.first_name || userData?.email}
                  />
                  <AvatarFallback className="font-bold uppercase dark:text-rose-400">
                    {userData?.email?.slice(0, 2) || 'GU'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h4 className="font-medium capitalize">
                    {' '}
                    {userData?.first_name && userData?.last_name
                      ? `${userData.last_name} ${userData.first_name}`
                      : userData?.email?.slice(
                          0,
                          userData.email.lastIndexOf('@'),
                        ) || 'Guest'}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-300">
                    {userData?.location || 'Sign in now!'}
                  </p>
                </div>
              </div>
              {userData ? (
                <SheetClose asChild>
                  <Button className="rounded-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </SheetClose>
              ) : (
                // <SheetClose asChild>
                <Button className="rounded-full" onClick={handleLogin}>
                  Login
                </Button>
                // </SheetClose>
              )}
            </div>
            {/* LINKS */}
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold">🔗 Quick Links</h2>
              <div className="grid grid-cols-2 gap-3">
                {links.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <SheetClose key={index} className="w-full" asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          'group flex cursor-pointer items-center justify-start gap-2 rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700',
                          {
                            'bg-neutral-100 dark:bg-neutral-800':
                              link.href === pathname,
                          },
                        )}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-12 w-12 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-600"
                        >
                          {IconComponent}
                        </Button>
                        <div className="flex flex-col items-start gap-1">
                          <h5 className="text-sm font-medium">{link.label}</h5>
                          <p className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                            {link.isTrigger && (
                              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                            )}
                            {link.description}
                          </p>
                        </div>
                      </Link>
                    </SheetClose>
                  );
                })}
                <ModeToggleText />
              </div>
            </div>
            {/* EVENTS */}
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold">🏙️ Event Dates</h2>
              <div className="grid grid-cols-1 gap-3 px-3">
                <div className="grid h-36 cursor-pointer grid-cols-2 items-center overflow-hidden rounded-xl border border-neutral-200 hover:shadow dark:border-neutral-700 dark:bg-neutral-900">
                  <Image
                    className="h-full w-full"
                    src="https://images.pexels.com/photos/6675833/pexels-photo-6675833.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt=""
                  />
                  <div className="flex flex-col gap-2 p-3">
                    <h4 className="text-lg font-bold">Book & Enjoy</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      20% OFF on the best availiable room rate
                    </p>
                  </div>
                </div>
                <div className="grid h-36 cursor-pointer grid-cols-2 items-center overflow-hidden rounded-xl border border-neutral-200 hover:shadow dark:border-neutral-700 dark:bg-neutral-900">
                  <div className="flex flex-col gap-2 p-3">
                    <h4 className="text-lg font-bold">Hotel Summer Nights</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Up to 3 nights free
                    </p>
                  </div>
                  <Image
                    className="h-full w-full"
                    src="https://images.pexels.com/photos/2403569/pexels-photo-2403569.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt=""
                  />
                </div>
                <div className="grid h-36 cursor-pointer grid-cols-2 items-center overflow-hidden rounded-xl border border-neutral-200 hover:shadow dark:border-neutral-700 dark:bg-neutral-900">
                  <Image
                    className="h-full w-full"
                    src="https://images.pexels.com/photos/29525883/pexels-photo-29525883/free-photo-of-modern-geometric-abstract-design-with-blue-patterns.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt=""
                  />
                  <div className="flex flex-col gap-2 p-3">
                    <h4 className="text-lg font-bold">
                      Daily 50 Lucky Winners get a Free Stay
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Valid till: 15 Nov
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* SAVED PLACES */}
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold">✈️ Saved Places</h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="grid cursor-pointer grid-cols-3 items-center gap-3 rounded-lg border border-neutral-200 p-2 hover:shadow dark:border-neutral-700 dark:bg-neutral-900">
                  <div className="col-span-1">
                    <Image
                      className="aspect-square"
                      classNameImage="rounded"
                      src="https://images.pexels.com/photos/29352713/pexels-photo-29352713/free-photo-of-scenic-open-road-under-clear-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
                      alt=""
                    />
                  </div>
                  <div className="col-span-2 h-full">
                    <div className="flex h-full items-center justify-between py-5 pe-2">
                      <div className="flex h-full w-2/3 flex-col items-start justify-between gap-2">
                        <h4 className="font-semibold">Alibaba Trap</h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300">
                          Carved by the Colorado River in Arizona, United States
                        </p>
                      </div>
                      <div className="flex h-full w-1/3 flex-col items-end justify-between gap-2">
                        <p className="text-xs">⭐4/5</p>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid cursor-pointer grid-cols-3 items-center gap-3 rounded-lg border border-neutral-200 p-2 hover:shadow dark:border-neutral-700 dark:bg-neutral-900">
                  <div className="col-span-1">
                    <Image
                      className="aspect-square"
                      classNameImage="rounded"
                      src="https://images.pexels.com/photos/29494484/pexels-photo-29494484/free-photo-of-rustic-wooden-cottage-with-blue-shuttered-window.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
                      alt=""
                    />
                  </div>
                  <div className="col-span-2 h-full">
                    <div className="flex h-full items-center justify-between py-5 pe-2">
                      <div className="flex h-full w-2/3 flex-col items-start justify-between gap-2">
                        <h4 className="font-semibold">Alibaba Trap</h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300">
                          Carved by the Colorado River in Arizona, United States
                        </p>
                      </div>
                      <div className="flex h-full w-1/3 flex-col items-end justify-between gap-2">
                        <p className="text-xs">⭐4/5</p>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* CONTACT */}
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold">📬 Contact Us</h2>
              <div className="grid grid-cols-1 gap-3 px-3">
                <div className="flex items-center justify-start space-x-2 text-neutral-500 dark:text-neutral-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203.21l-4.243 4.242a3 3 0 0 1-4.097.135l-.144-.135l-4.244-4.243A9 9 0 0 1 18.364 4.636M12 8a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                    />
                  </svg>
                  <p className="text-sm">
                    4517 Washington Ave. Manchester, Kentucky 39495
                  </p>
                </div>
                <div className="flex items-center justify-start space-x-2 text-neutral-500 dark:text-neutral-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34M12 6a1 1 0 0 0-.993.883L11 7v5l.009.131a1 1 0 0 0 .197.477l.087.1l3 3l.094.082a1 1 0 0 0 1.226 0l.094-.083l.083-.094a1 1 0 0 0 0-1.226l-.083-.094L13 11.585V7l-.007-.117A1 1 0 0 0 12 6"
                    />
                  </svg>
                  <p className="text-sm">Hours: 8:00 - 17:00, Mon - Sat</p>
                </div>
                <div className="flex items-center justify-start space-x-2 text-neutral-500 dark:text-neutral-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="currentColor">
                      <path d="M22 7.535V17a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V7.535l9.445 6.297l.116.066a1 1 0 0 0 .878 0l.116-.066z" />
                      <path d="M19 4c1.08 0 2.027.57 2.555 1.427L12 11.797l-9.555-6.37a3 3 0 0 1 2.354-1.42L5 4z" />
                    </g>
                  </svg>
                  <p className="text-sm">support@lalala.com</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
