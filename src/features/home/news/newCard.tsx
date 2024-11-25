import React from 'react';
import { newsType } from './listNews';
import Image from '@/components/common/images/image';
import { CalendarDays, Clock3, HeartIcon, MessageCircleMore } from 'lucide-react';
import { MainButton } from '@/components/common/button/mainButton';
import Badge from '@/components/custom/badges/badge';

export const NewCard = ({ newProps }: { newProps: newsType }) => {
   return (
      <div className="col-span-4 w-fit h-fit border border-neutral-200 rounded-[1.875rem] overflow-hidden transition-all duration-200 ease-in-out hover:shadow-xl hover:translate-y-[-0.5rem]">
         <div className="relative w-full h-[21.875rem] z-[-1]">
            <Image
               src={
                  'https://images.unsplash.com/photo-1731437519637-747bb78a0217?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D'
               }
               alt={newProps.title}
               className="w-full h-full rounded-none z-[1]"
            />

            <div className="absolute top-3 left-3 right-3 z-20">
               <div className="w-full flex justify-between items-center">
                  <Badge color="white" className="px-6 py-3">
                     {newProps.category}
                  </Badge>

                  <div className="bg-white rounded-full p-2 hover:bg-red-100 hover:text-red-600 cursor-pointer">
                     <HeartIcon className="w-4 h-4" />
                  </div>
               </div>
            </div>
         </div>

         <div className="w-full h-fit bg-white rounded-t-[1.875rem] p-6 z-20 mt-[-30px] overflow-hidden">
            <div className="flex justify-start items-center flex-wrap gap-x-6 gap-y-1 mb-5 z-20">
               <div className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  <div className="text-sm text-neutral-800">{newProps.date}</div>
               </div>
               <div className="flex items-center gap-1">
                  <Clock3 className="w-3 h-3" />
                  <div className="text-sm text-neutral-800">{newProps.duration}</div>
               </div>
               <div className="flex items-center gap-1">
                  <MessageCircleMore className="w-3 h-3" />
                  <div className="text-sm text-neutral-800">{newProps.comments_count} comments</div>
               </div>
            </div>

            <div className="text-xl font-medium mb-10 cursor-pointer hover:text-yellow-600 line-clamp-2">
               {newProps.title}
            </div>

            <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <Image src={"https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/avatar.png"} alt="" className="w-7 h-7 rounded-full" />
                  <div className="text-sm font-medium">{newProps.author}</div>
               </div>
               <MainButton className="bg-gray-100 text-neutral-800 hover:bg-black hover:text-white py-2 px-4 text-sm border border-gray-200">
                  Keep Reading
               </MainButton>
            </div>
         </div>
      </div>
   );
};
