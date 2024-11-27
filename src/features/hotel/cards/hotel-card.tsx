import Image from '@/components/common/images/image';
import { Rating } from '@/components/custom/rating/rating';
import { Button } from '@/components/ui/button';
import {
   Carousel,
   CarouselContent,
   CarouselDots,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

export interface Tour {
   id: number;
   name: string;
   location: string;
   imageUrl: string[];
   pricePerPerson: number;
   rating: {
      score: number;
      reviews: number;
   };
   promotion?: {
      discount: number;
      label: string;
   };
   isAds?: boolean;
   type: string;
   amenities: {
      label: string;
   }[];
   isFavorite: boolean;
   displayType: 'list' | 'grid';
}

const HotelCard = ({ imageUrl, promotion, name, location, pricePerPerson, displayType }: Tour) => {
   const items = imageUrl.map((item, index) => (
      <CarouselItem
         key={index}
         className={cn(displayType == 'list' ? 'aspect-square m-0 p-0' : 'aspect-square  m-0 p-0')}
      >
         <Image
            src={item}
            className="w-full h-full object-cover rounded-md"
            alt={name}
            fallback={
               <div className="w-fit h-full flex flex-1 justify-center items-center bg-slate-100">
                  <svg
                     className="w-fit h-full text-white"
                     xmlns="http://www.w3.org/2000/svg"
                     width="1em"
                     height="1em"
                     viewBox="0 0 24 24"
                  >
                     <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                     >
                        <path d="M15 8h.01M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9" />
                        <path d="M3.5 15.5L8 11c.928-.893 2.072-.893 3 0l5 5" />
                        <path d="m14 14l1-1c.928-.893 2.072-.893 3 0l2.5 2.5" />
                     </g>
                  </svg>
               </div>
            }
         />
      </CarouselItem>
   ));

   return (
      <div className="group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-md shadow-md overflow-hidden hover:shadow-xl transition-shadow w-full h-full">
         <div
            className={cn(
               'h-full w-full flex gap-3 items-center',
               displayType == 'list' ? 'flex-col md:flex-row' : 'flex-col',
            )}
         >
            <div className={cn('flex-1 h-full p-2')}>
               <div className="relative h-full">
                  <Carousel
                     opts={{
                        loop: true,
                     }}
                  >
                     <CarouselContent className="m-0 p-0">{items}</CarouselContent>
                     <CarouselPrevious className="left-2 invisible group-hover:visible transition-all ease-in" />
                     <CarouselNext className="right-2 invisible group-hover:visible transition-all ease-in" />
                     <CarouselDots className="absolute inset-x-0 bottom-3" />
                  </Carousel>
               </div>
               {promotion && (
                  <div className="flex items-center justify-center text-xs py-1 px-2 text-red-50 rounded-md font-medium absolute left-5 top-5 !bg-red-600">
                     -10% today
                  </div>
               )}
            </div>
            {/* Main Content */}
            <div
               className={cn(
                  'flex-[2] flex flex-col items-start',
                  displayType == 'list' ? ' p-5 md:pr-2' : ' p-5',
               )}
            >
               {/* HEAD */}
               <div
                  className={cn(
                     'w-full flex justify-between items-center',
                     displayType == 'list' ? '' : 'mb-3',
                  )}
               >
                  {displayType == 'list' ? (
                     <Rating rating={4.5} variant="yellow" size={15} disabled />
                  ) : (
                     <Button
                        variant={'default'}
                        className="text-white bg-neutral-900 text-sm py-1 px-2"
                     >
                        ⭐️ 4.8
                     </Button>
                  )}
                  <div className="flex gap-1 items-center">
                     <Button
                        variant={'default'}
                        size={'icon'}
                        className="bg-neutral-100 hover:bg-neutral-900 text-black hover:text-white rounded-full text-md"
                     >
                        ❤️
                     </Button>
                     <Button
                        variant={'default'}
                        size={'icon'}
                        className="bg-neutral-100 hover:bg-neutral-900 text-black hover:text-white rounded-full text-md"
                     >
                        🔗
                     </Button>
                  </div>
               </div>

               {/* NAME & LOCATION */}
               <div className="mb-4">
                  <Link href={'/hotel/test_hotel'}>
                     <div className="text-xl font-bold capitalize line-clamp-2 mb-1 hover:text-yellow-700 cursor-pointer">
                        {name}
                     </div>
                  </Link>
                  <p className="flex items-center gap-2">
                     <MapPin className="w-4 h-4 text-slate-500" />
                     <span className="text-sm text-slate-500">{location}</span>
                  </p>
               </div>

               {/* ADAMENTINE */}
               <div className="mb-2">
                  <div className="flex justify-start items-center flex-wrap gap-2">
                     <div className="text-neutral-500 font-normal text-sm">Air Conditioning</div>
                     <div>⋅</div>
                     <div className="text-neutral-500 font-normal text-sm">Wifi</div>
                     <div>⋅</div>
                     <div className="text-neutral-500 font-normal text-sm">Kitchen</div>
                     <div>⋅</div>
                     <div className="text-neutral-500 font-normal text-sm">Pool</div>
                  </div>
               </div>

               <div className="w-full">
                  {/* SERVICE */}
                  {displayType == 'list' && (
                     <div className="group">
                        <div className="flex items-center gap-1 text-green-600 text-xs font-[550] mb-1">
                           <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 16 16"
                              className="me-2"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                           </svg>
                           Free Cancellation till 7 Jan 2022
                        </div>
                        <div className="flex items-center gap-1 text-green-600 text-xs font-[550] mb-1">
                           <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 16 16"
                              className="me-2"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                           </svg>
                           Free Breakfast
                        </div>
                        <div className="flex items-center gap-1 text-red-600 text-xs font-[550] mb-1">
                           <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 16 16"
                              className="me-2"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                           </svg>
                           Non Refundable
                        </div>
                     </div>
                  )}

                  {/* PRICE */}
                  <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 "></div>
                  <div className="w-full flex justify-between items-center flex-wrap mt-3">
                     <span className="text-xl font-bold flex items-center gap-1">
                        <span>${pricePerPerson}</span>
                        <span className="text-sm font-light text-slate-500"> / day</span>
                        <span className="line-through text-neutral-400 text-sm font-normal ml-2">
                           $1000
                        </span>
                     </span>
                     {displayType == 'list' ? (
                        <Button variant="default" className="text-sm">
                           Select Room
                        </Button>
                     ) : (
                        <Button
                           variant="default"
                           className="text-sm font-medium bg-neutral-100 text-black hover:bg-neutral-800 hover:text-neutral-200"
                        >
                           View Detail
                           <ArrowRight className="w-4 h-4" />
                        </Button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HotelCard;
