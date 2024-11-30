import React from 'react';
import { newsType } from './listNews';
import Image from '@/components/common/images/image';
import { CalendarDays, Clock3, HeartIcon, MessageCircleMore } from 'lucide-react';
import { MainButton } from '@/components/common/button/mainButton';
import Badge from '@/components/custom/badges/badge';
import { Card } from '@/components/ui/card';

export const NewCard = ({ newProps }: { newProps: newsType }) => {
   return (
      <Card className="p-0 border-0 flex-1 flex-col rounded-3xl relative overflow-hidden w-full hover:shadow-xl mb-8">
         <div className="relative aspect-square">
            <Image
               src={newProps.image}
               alt={newProps.title}
               className="w-full h-full rounded-none"
            />

            <div className="absolute top-3 left-3 right-3">
               <div className="w-full flex justify-between items-center">
                  <Badge color="white" className="dark:bg-neutral-800 dark:text-neutral-200 px-6 py-3">
                     {newProps.category}
                  </Badge>

                  <div className="bg-white dark:bg-neutral-800 rounded-full p-2 hover:bg-red-100 hover:text-red-600 cursor-pointer">
                     <HeartIcon className="w-4 h-4" />
                  </div>
               </div>
            </div>
         </div>

         <div className="relative w-full bg-white dark:bg-neutral-900 -mt-20 rounded-t-[1.875rem] p-6 overflow-hidden">
            <div className="flex justify-start items-center flex-wrap gap-x-6 gap-y-1 mb-5">
               <div className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  <div className="text-sm text-neutral-800 dark:text-neutral-200">{newProps.date}</div>
               </div>
               <div className="flex items-center gap-1">
                  <Clock3 className="w-3 h-3" />
                  <div className="text-sm text-neutral-800 dark:text-neutral-200">
                     {newProps.duration}
                  </div>
               </div>
               <div className="flex items-center gap-1">
                  <MessageCircleMore className="w-3 h-3" />
                  <div className="text-sm text-neutral-800 dark:text-neutral-200">
                     {newProps.comments_count} comments
                  </div>
               </div>
            </div>

            <div className="text-xl font-medium mb-10 cursor-pointer hover:text-yellow-600 line-clamp-2">
               {newProps.title}
            </div>

            <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <Image
                     src={'https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/avatar.png'}
                     alt=""
                     className="w-7 h-7 rounded-full"
                  />
                  <div className="text-sm font-medium">{newProps.author}</div>
               </div>
               <MainButton className="bg-gray-100 text-neutral-800 hover:bg-black hover:text-white py-2 px-4 text-sm border border-gray-200">
                  Keep Reading
               </MainButton>
            </div>
         </div>
      </Card>
   );
};
