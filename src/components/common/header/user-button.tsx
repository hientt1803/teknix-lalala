import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useAppSelector } from '@/stores';
import { logOutUser, useLazyGetCurrentUserQuery } from '@/stores/features/user';
import Link from 'next/link';

const UserButton = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const user = useAppSelector((state) => state.userSlice.currentUser);
   const [getData, { data, isLoading, isFetching }] = useLazyGetCurrentUserQuery();
   const [open, setOpen] = useState(false);

   useEffect(() => {
      if (!user) {
         getData({});
      }
   }, [user]);

   const handleLogout = () => {
      dispatch(logOutUser({}));
      router.push('/');
   };

   const userData = user || data;
   const handleClosePopover = () => {
      setOpen(false);
   };
   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <div className="relative w-12 h-12 flex items-center justify-center">
               <Button
                  variant="ghost"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center"
                  size={'icon'}
               >
                  <Avatar>
                     <AvatarImage
                        src={userData?.avatar}
                        alt={userData?.first_name || userData?.email}
                     />
                     <AvatarFallback className="uppercase font-bold dark:text-rose-400">
                        {userData?.email?.substring(0, 2)}
                     </AvatarFallback>
                  </Avatar>
               </Button>
            </div>
         </PopoverTrigger>
         <PopoverContent
            align="end"
            className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5"
         >
            <div className="relative grid gap-6 p-5">
               <Link
                  className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  href="/profile"
                  onClick={handleClosePopover}
               >
                  <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="w-6 h-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        ></path>
                     </svg>
                  </div>
                  <div className="ml-4">
                     <p className="text-sm font-medium ">Account</p>
                  </div>
               </Link>
               <Link
                  className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  href="/##"
                  onClick={handleClosePopover}
               >
                  <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="w-6 h-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        ></path>
                     </svg>
                  </div>
                  <div className="ml-4">
                     <p className="text-sm font-medium ">Messages</p>
                  </div>
               </Link>
               <Link
                  className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  href="#"
                  onClick={handleClosePopover}
               >
                  <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="w-6 h-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        ></path>
                     </svg>
                  </div>
                  <div className="ml-4">
                     <p className="text-sm font-medium ">Wishlists</p>
                  </div>
               </Link>
               <Link
                  className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  href="/booking"
                  onClick={handleClosePopover}
               >
                  <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="w-6 h-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        ></path>
                     </svg>
                  </div>
                  <div className="ml-4">
                     <p className="text-sm font-medium ">Booking</p>
                  </div>
               </Link>
            </div>
            <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />
            <div className="relative grid gap-6 p-5">
               <Link
                  href="#"
                  onClick={handleClosePopover}
                  className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
               >
                  <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="w-6 h-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288"
                        ></path>
                     </svg>
                  </div>
                  <div className="ml-4">
                     <p className="text-sm font-medium ">Help</p>
                  </div>
               </Link>
               <Button
                  onClick={handleLogout}
                  variant={'ghost'}
                  className="flex justify-start items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
               >
                  <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="w-6 h-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                        ></path>
                     </svg>
                  </div>
                  <div className="ml-2">
                     <p className="text-sm font-medium ">Logout</p>
                  </div>
               </Button>
            </div>
         </PopoverContent>
      </Popover>
   );
};

export default UserButton;
