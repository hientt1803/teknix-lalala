'use client';

import { StarFilledIcon } from '@radix-ui/react-icons';
import { EditIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAppSelector } from '@/stores/hook';
import { useLazyGetCurrentUserQuery } from '@/stores/features/user';

const CardInfoUser = () => {
  const userInfo = useAppSelector(state => state.userSlice.currentUser);
  const [getData, { data, isLoading, isFetching }] =
    useLazyGetCurrentUserQuery();

  useEffect(() => {
    if (!userInfo) {
      getData({});
    }
  }, [userInfo]);

  const userData = userInfo || data;
  return (
    <div className="mb-24 block flex-grow lg:mb-0">
      <div className="lg:sticky lg:top-24">
        <Card className="relative flex w-full flex-col items-center space-y-6 px-0 text-center sm:space-y-7 sm:rounded-3xl sm:p-6 xl:p-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipContent>Edit profile</TooltipContent>
              <TooltipTrigger className="absolute right-2 top-2 rounded-lg bg-transparent p-2 hover:bg-neutral-100">
                <Link href="/profile">
                  <EditIcon className="text-neutral-500" />
                </Link>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>

          <div className="relative inline-flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full shadow-inner ring-1 ring-white">
            <Avatar className="h-full w-full cursor-pointer">
              <AvatarImage src={userData?.avatar} />
              <AvatarFallback className="text-3xl font-bold text-neutral-700">
                {isLoading || isFetching ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    {userData?.first_name && userData?.last_name
                      ? `${userData.first_name[0]}${userData.last_name[0]}`.toUpperCase()
                      : userData?.email?.slice(0, 2).toUpperCase()}
                  </>
                )}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -top-0.5 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-xs text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2rem"
                height="1.2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m10 15.17l9.192-9.191l1.414 1.414L10 17.999l-6.364-6.364l1.414-1.414z"
                ></path>
              </svg>
            </span>
          </div>
          <div className="flex flex-col items-center space-y-3 text-center">
            <h2 className="text-3xl font-semibold">
              {' '}
              {userData?.first_name && userData?.last_name
                ? `${userData.last_name} ${userData.first_name}`
                : userData?.email?.slice(0, userData.email.lastIndexOf('@')) ||
                  'No Name Provided'}
            </h2>
            <div className="flex items-start justify-start gap-1">
              <StarFilledIcon className="h-5 w-5 text-orange-500" />

              <span className="text-sm font-medium">4.5</span>
              <span className="text-xs text-neutral-500">(112)</span>
            </div>
          </div>
          <p className="text-neutral-500">
            {userData?.description || 'No description'}
          </p>
          <nav className="flex !space-x-3 text-2xl text-neutral-600">
            <a
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-xl"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2rem"
                height="1.2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14 19h5V5H5v14h7v-5h-2v-2h2v-1.654c0-1.337.14-1.822.4-2.311A2.73 2.73 0 0 1 13.536 6.9c.382-.205.857-.328 1.687-.381q.494-.032 1.278.08v1.9H16c-.917 0-1.296.043-1.522.164a.73.73 0 0 0-.314.314c-.12.226-.164.45-.164 1.368V12h2.5l-.5 2h-2zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1"
                ></path>
              </svg>
            </a>
            <a
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-xl"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2rem"
                height="1.2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M22.213 5.656a8.4 8.4 0 0 1-2.402.658A4.2 4.2 0 0 0 21.649 4c-.82.488-1.719.83-2.655 1.015a4.182 4.182 0 0 0-7.126 3.814a11.87 11.87 0 0 1-8.621-4.37a4.17 4.17 0 0 0-.566 2.103c0 1.45.739 2.731 1.86 3.481a4.2 4.2 0 0 1-1.894-.523v.051a4.185 4.185 0 0 0 3.355 4.102a4.2 4.2 0 0 1-1.89.072A4.185 4.185 0 0 0 8.02 16.65a8.4 8.4 0 0 1-6.192 1.732a11.83 11.83 0 0 0 6.41 1.88c7.694 0 11.9-6.373 11.9-11.9q0-.271-.012-.541a8.5 8.5 0 0 0 2.086-2.164"
                ></path>
              </svg>
            </a>
            <a
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-xl"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Youtube"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2rem"
                height="1.2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19.607 6.995c-.076-.298-.292-.523-.539-.592C18.63 6.28 16.501 6 12.001 6s-6.628.28-7.069.403c-.244.068-.46.293-.537.592c-.109.424-.394 2.2-.394 5.005s.285 4.58.394 5.006c.076.297.292.522.538.59C5.373 17.72 7.5 18 12 18s6.629-.28 7.069-.403c.244-.068.46-.293.537-.592c.11-.424.394-2.205.394-5.005s-.285-4.58-.394-5.005m1.937-.497C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.897 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.108 4 12.001 4 12.001 4s5.896 0 7.605.476c.944.266 1.687 1.04 1.938 2.022M10.001 15.5v-7l6 3.5z"
                ></path>
              </svg>
            </a>
            <a
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-xl"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2rem"
                height="1.2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10m6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0M12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.9 2.9 0 0 0-1.08.703a2.9 2.9 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.9 2.9 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.9 2.9 0 0 0-.703-1.08a2.9 2.9 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4m0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122s-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06s-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.9 4.9 0 0 1-1.772-1.153a4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.012 15.056 2 14.717 2 12s.01-3.056.06-4.122s.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2"
                ></path>
              </svg>
            </a>
          </nav>
          <div className="w-14 border-b border-neutral-200" />
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span className="text-neutral-600">Ha Noi, Viet Nam</span>
            </div>
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                ></path>
              </svg>
              <span className="text-neutral-600">Speaking English</span>
            </div>
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span className="text-neutral-600">Joined in March 2016</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CardInfoUser;
