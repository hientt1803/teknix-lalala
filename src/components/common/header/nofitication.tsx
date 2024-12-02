import { NOTIFICATION_NOVU_APP_ID } from '@/configs';
// import {useAppSelector} from "@/stores";
import { Inbox, Bell, Notifications, InboxContent } from '@novu/react';
import { useRouter } from 'next/navigation';
import { dark } from '@novu/react/themes';
import { useTheme } from 'next-themes';
import { BellIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNowStrict } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

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
                  renderBell={(unreadCount) => (
                     <Button
                        variant="ghost"
                        className="relative w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center"
                        size={'icon'}
                     >
                        {unreadCount > 0 && (
                           <span className="rounded-full w-2 h-2 bg-red-500 p-1 absolute top-0 right-0" />
                        )}

                        <BellIcon className="w-6 h-6 dark:text-white" />
                     </Button>
                  )}
               />
            </PopoverTrigger>
            <PopoverContent align="end" className="mt-5 w-full  max-w-md">
               <InboxContent
                  renderNotification={(notification) => (
                     <div className="relative grid gap-8 p-7">
                        <div
                           onClick={!notification.isRead ? notification.read : () => {}}
                           className="flex p-2 pr-8 -m-3 cursor-pointer transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 relative"
                        >
                           <Avatar className="h-12 w-12">
                              <AvatarImage src={notification.avatar || '/lalala.svg'} />
                              <AvatarFallback>A</AvatarFallback>
                           </Avatar>
                           <div className="ml-3 sm:ml-4 space-y-1">
                              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                                 Lalala Notification
                              </p>
                              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                                 {notification.body}
                              </p>
                              <p className="text-xs text-neutral-400 dark:text-neutral-400">
                                 {formatDistanceToNowStrict(new Date(notification.createdAt), {
                                    addSuffix: true,
                                 })}
                              </p>
                           </div>
                           {!notification.isRead && (
                              <span className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></span>
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
