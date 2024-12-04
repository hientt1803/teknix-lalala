// import {useAppSelector} from "@/stores";
import { Bell, Inbox, InboxContent, Notifications } from '@novu/react';
import { dark } from '@novu/react/themes';
import { formatDistanceToNowStrict } from 'date-fns';
import { BellIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { NOTIFICATION_NOVU_APP_ID } from '@/configs';

const Notification = () => {
  const router = useRouter();
  // const currentUser = useAppSelector((state) => state.userSlice.currentUser);
  const { resolvedTheme } = useTheme();

  const tabs = [
    {
      label: 'All Notifications',
      filter: { tags: [] },
    },
    {
      label: 'Unread',
      filter: { isRead: false },
    },
    {
      label: 'Read',
      filter: { isRead: true },
    },
  ];

  return (
    <Inbox
      applicationIdentifier={NOTIFICATION_NOVU_APP_ID || ''}
      subscriberId={''}
      // subscriberId={currentUser?.id || ""}
      routerPush={(path: string) => router.push(path)}
      localization={{
        'inbox.filters.labels.default': 'Notification',
      }}
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        animations: true,
        elements: {
          dropdownContent: 'dark:bg-neutral-900',
          channelsContainer: 'dark:bg-neutral-900',
          channelsContainerCollapsible: 'dark:bg-neutral-900',
          workflowContainer: 'dark:bg-neutral-900',
          preferencesContainer: 'dark:bg-neutral-900',
          inboxContent: 'dark:bg-neutral-900',
        },
      }}
    >
      <Popover>
        <PopoverTrigger>
          <Bell
            renderBell={unreadCount => (
              <Button
                variant="ghost"
                className="relative flex h-12 w-12 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800"
                size={'icon'}
              >
                {unreadCount > 0 && (
                  <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500 p-1" />
                )}

                <BellIcon className="h-6 w-6 dark:text-white" />
              </Button>
            )}
          />
        </PopoverTrigger>
        <PopoverContent align="end" className="mt-5 w-full max-w-md">
          <InboxContent
            renderNotification={notification => (
              <div className="relative grid gap-8 p-7">
                <div
                  onClick={notification.isRead ? () => {} : notification.read}
                  className="relative -m-3 flex cursor-pointer rounded-lg p-2 pr-8 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-800"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={notification.avatar || '/lalala.svg'} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 space-y-1 sm:ml-4">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                      Lalala Notification
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
                      {notification.body}
                    </p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-400">
                      {formatDistanceToNowStrict(
                        new Date(notification.createdAt),
                        {
                          addSuffix: true,
                        },
                      )}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <span className="absolute right-1 top-1/2 h-2 w-2 -translate-y-1/2 transform rounded-full bg-blue-500"></span>
                  )}
                </div>
              </div>
            )}
          />
        </PopoverContent>
      </Popover>
    </Inbox>
  );
};

export default Notification;
