import {
  CalendarDays,
  Clock3,
  HeartIcon,
  MessageCircleMore,
} from 'lucide-react';
import React from 'react';

import { MainButton } from '@/components/common/button/main-button';
import Image from '@/components/common/images/image';
import Badge from '@/components/custom/badges/badge';
import { Card } from '@/components/ui/card';

import { newsType } from './listNews';

export const NewCard = ({ newProps }: { newProps: newsType }) => {
  return (
    <Card className="relative mb-8 w-full flex-1 flex-col overflow-hidden rounded-3xl border-0 p-0 hover:shadow-xl">
      <div className="relative aspect-square">
        <Image
          src={newProps.image}
          alt={newProps.title}
          className="h-full w-full rounded-none"
        />

        <div className="absolute left-3 right-3 top-3">
          <div className="flex w-full items-center justify-between">
            <Badge
              color="white"
              className="px-6 py-3 dark:bg-neutral-800 dark:text-neutral-200"
            >
              {newProps.category}
            </Badge>

            <div className="cursor-pointer rounded-full bg-white p-2 hover:bg-red-100 hover:text-red-600 dark:bg-neutral-800">
              <HeartIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-20 w-full overflow-hidden rounded-t-[1.875rem] border border-neutral-300 bg-white p-6 dark:border-neutral-800 dark:bg-[#191919]">
        <div className="mb-5 flex flex-wrap items-center justify-start gap-x-6 gap-y-1">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            <div className="text-sm text-neutral-800 dark:text-neutral-200">
              {newProps.date}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock3 className="h-3 w-3" />
            <div className="text-sm text-neutral-800 dark:text-neutral-200">
              {newProps.duration}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircleMore className="h-3 w-3" />
            <div className="text-sm text-neutral-800 dark:text-neutral-200">
              {newProps.comments_count} comments
            </div>
          </div>
        </div>

        <div className="mb-10 line-clamp-2 cursor-pointer text-xl font-medium hover:text-yellow-600">
          {newProps.title}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={
                'https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/avatar.png'
              }
              alt=""
              className="h-7 w-7 rounded-full"
            />
            <div className="text-sm font-medium">{newProps.author}</div>
          </div>
          <MainButton className="border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-neutral-800 hover:bg-black hover:text-white">
            Keep Reading
          </MainButton>
        </div>
      </div>
    </Card>
  );
};
