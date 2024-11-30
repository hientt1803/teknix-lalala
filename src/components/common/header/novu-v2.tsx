'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NOVU_IDENTIFY, NOVU_SUBSCRIBER_ID } from '@/configs';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/stores/hook';
import { IMessage, NovuProvider, PopoverNotificationCenter } from '@novu/notification-center';
import { formatDistanceToNowStrict } from 'date-fns';
import { BellIcon, CheckIcon, DotIcon } from 'lucide-react';

const CustomBell = ({ unseenCount }: { unseenCount: number }) => {
   return (
      <div className="relative flex justify-center items-center w-12 h-12 gap-2 p-2 transition rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 group">
         {Number(unseenCount) > 0 ? (
            <div className="relative ">
               <div className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 bg-red-500 text-white text-xs rounded-full">
                  {unseenCount}
               </div>
               <BellIcon className="w-6 h-6 text-neutral-800 dark:text-neutral-300 cursor-pointer group-hover:text-neutral-600" />
            </div>
         ) : (
            <BellIcon className="w-6 h-6 text-neutral-800 dark:text-neutral-300 cursor-pointer group-hover:text-neutral-600" />
         )}
      </div>
   );
};

const RenderCustomNotification = ({
   notification,
   handleNotificationClick,
}: {
   notification: IMessage;
   handleNotificationClick: any;
}) => {
   const userInfo = useAppSelector((state) => state.userSlice.currentUser);

   return (
      <div
         className={cn(
            'transition-all max-w-[350px] md:w-full px-4 min-w-full cursor-pointer rounded-sm hover:bg-neutral-200',
            !notification.read && 'bg-[#F0F0F0]',
         )}
         onClick={() => handleNotificationClick()}
      >
         <div className="container min-w-full py-2 px-1 rounded-md flex flex-col gap-1">
            <div className="min-w-full flex items-start gap-2">
               {/* Avatar */}
               <div className="flex gap-1 items-center">
                  <Avatar className="w-8 h-8">
                     <AvatarImage src="/lalala.svg" alt="User Avatar" />
                     <AvatarFallback>
                        {userInfo?.email?.slice(0, 2).toUpperCase() || 'US'}
                     </AvatarFallback>
                  </Avatar>
               </div>

               {/* Right side */}
               <div className="flex-1">
                  <div className="min-w-full flex justify-between items-center gap-2 flex-wrap">
                     <div className="flex-1 font-bold text-xs line-clamp-1">
                        {(notification?.payload?.subject?.toString() as string) || ''}
                     </div>
                     <div className="flex gap-1">
                        <div className="font-semibold text-xs line-clamp-1">
                           {formatDistanceToNowStrict(new Date(notification?.createdAt), {
                              addSuffix: true,
                           })}
                        </div>
                        <div className="flex gap-2 items-center">
                           {notification?.read ? (
                              <CheckIcon className="w-3 h-3 text-neutral-400" />
                           ) : (
                              <DotIcon className="w-4 h-4 text-[#FF971D] opacity-90 animate-ping" />
                           )}
                        </div>
                     </div>
                  </div>
                  <div className="text-xs text-neutral-600 line-clamp-3">
                     {(notification?.payload?.body?.toString() as string) || ''}
                  </div>
               </div>
            </div>
         </div>
         <div className="border-t border-neutral-200 my-2" />
      </div>
   );
};

const NovuNotificationV2 = ({ userId }: { userId: string }) => {
   //    console.log("USERID", userId);
   //    console.log("NOVU_IDENTIFY", NOVU_IDENTIFY);
   //    console.log("NOVU_SUBSCRIBER_ID", NOVU_SUBSCRIBER_ID);

   return (
      <NovuProvider
         applicationIdentifier={NOVU_IDENTIFY!}
         subscriberId={userId || NOVU_SUBSCRIBER_ID!}
      >
         <PopoverNotificationCenter
            position="bottom-end"
            offset={20}
            colorScheme="light"
            footer={() => <></>}
            showUserPreferences={false}
            listItem={(notification, handleNotificationClick) => (
               <RenderCustomNotification
                  notification={notification}
                  handleNotificationClick={handleNotificationClick}
               />
            )}
         >
            {({ unseenCount }) => <CustomBell unseenCount={unseenCount || 0} />}
         </PopoverNotificationCenter>
      </NovuProvider>
   );
};

export default NovuNotificationV2;
