'use client';

import {
  // eslint-disable-next-line import/named
  IMessage,
  NovuProvider,
  PopoverNotificationCenter,
} from '@novu/notification-center';
import { formatDistanceToNowStrict } from 'date-fns';
import { BellIcon, CheckIcon, DotIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NOVU_IDENTIFY, NOVU_SUBSCRIBER_ID } from '@/configs';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/stores/hook';
import { useTheme } from 'next-themes';

const CustomBell = ({ unseenCount }: { unseenCount: number }) => {
  return (
    <div className="group relative flex h-12 w-12 items-center justify-center gap-2 rounded-full p-2 transition hover:bg-neutral-100 dark:hover:bg-neutral-700">
      {Number(unseenCount) > 0 ? (
        <div className="relative">
          <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unseenCount}
          </div>
          <BellIcon className="h-6 w-6 cursor-pointer text-neutral-800 group-hover:text-neutral-600 dark:text-neutral-300" />
        </div>
      ) : (
        <BellIcon className="h-6 w-6 cursor-pointer text-neutral-800 group-hover:text-neutral-600 dark:text-neutral-300" />
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
  const userInfo = useAppSelector(state => state.userSlice.currentUser);

  return (
    <div
      className={cn(
        'min-w-full max-w-[350px] cursor-pointer rounded-sm px-4 transition-all hover:bg-neutral-200 md:w-full',
        !notification.read && 'bg-[#F0F0F0]',
      )}
      onClick={() => handleNotificationClick()}
    >
      <div className="container flex min-w-full flex-col gap-1 rounded-md px-1 py-2">
        <div className="flex min-w-full items-start gap-2">
          {/* Avatar */}
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/lalala.svg" alt="User Avatar" />
              <AvatarFallback>
                {userInfo?.email?.slice(0, 2).toUpperCase() || 'US'}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Right side */}
          <div className="flex-1">
            <div className="flex min-w-full flex-wrap items-center justify-between gap-2">
              <div className="line-clamp-1 flex-1 text-xs font-bold dark:text-neutral-200">
                {(notification?.payload?.subject?.toString() as string) || ''}
              </div>
              <div className="flex gap-1">
                <div className="line-clamp-1 text-xs font-semibold dark:text-neutral-500">
                  {formatDistanceToNowStrict(
                    new Date(notification?.createdAt),
                    {
                      addSuffix: true,
                    },
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {notification?.read ? (
                    <CheckIcon className="h-3 w-3 text-neutral-400" />
                  ) : (
                    <DotIcon className="h-4 w-4 animate-ping text-[#FF971D] opacity-90" />
                  )}
                </div>
              </div>
            </div>
            <div className="line-clamp-3 text-xs text-neutral-600 dark:text-neutral-300">
              {(notification?.payload?.body?.toString() as string) || ''}
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 border-t border-neutral-200 dark:border-neutral-700" />
    </div>
  );
};

const NovuNotificationV2 = ({ userId }: { userId: string }) => {
  //    console.log("USERID", userId);
  //    console.log("NOVU_IDENTIFY", NOVU_IDENTIFY);
  //    console.log("NOVU_SUBSCRIBER_ID", NOVU_SUBSCRIBER_ID);
  const { theme } = useTheme();

  return (
    <NovuProvider
      applicationIdentifier={NOVU_IDENTIFY!}
      subscriberId={userId || NOVU_SUBSCRIBER_ID!}
    >
      <PopoverNotificationCenter
        position="bottom-end"
        offset={20}
        colorScheme={theme == 'light' ? 'light' : 'dark'}
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
