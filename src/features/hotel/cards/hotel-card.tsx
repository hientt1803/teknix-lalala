import Image from '@/components/common/images/image';
import { Rating } from '@/components/custom/rating/rating';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
   Carousel,
   CarouselContent,
   CarouselDots,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { IHotelDataHotels, IHotelDataMapHotels } from '@/stores/features/stay/type';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { convertKebabToTitleCase, replaceSize } from '@/utilities/string';
import { ArrowRight, MapPin, MapPinnedIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type HotelCArdType = {
   hotel?: IHotelDataHotels;
   selectedMap?: IHotelDataMapHotels;
   distance: number;
   displayType: 'list' | 'grid';
};

const HotelCard = (props: HotelCArdType) => {
   const { selectedMap, hotel, distance, displayType } = props;

   const items = selectedMap?.images?.slice(0, 5).map((item, index) => (
      <CarouselItem
         key={index}
         className={cn(
            displayType == 'list'
               ? 'aspect-square md:aspect-[7/6] m-0 p-0'
               : 'aspect-square m-0 p-0',
         )}
      >
         <Image
            src={replaceSize(item)}
            className="w-full h-full object-cover rounded-md"
            alt={selectedMap?.name}
            loading="lazy"
         />
      </CarouselItem>
   ));

   return (
      <Card className="group relative border-slate-200 overflow-hidden hover:shadow-xl transition-shadow w-full h-full">
         <div className={cn('h-full w-full grid grid-cols-5 items-center')}>
            <div
               className={cn(
                  displayType == 'list' ? 'col-span-5 md:col-span-2 p-2' : 'col-span-5 p-2',
               )}
            >
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
               {hotel?.rates[0]?.deposit && (
                  <div className="flex items-center justify-center text-xs py-1 px-2 text-red-50 rounded-md font-medium absolute left-5 top-5 !bg-red-600">
                     -10% today
                  </div>
               )}
            </div>
            {/* Main Content */}
            <div
               className={cn(
                  'flex flex-col items-start justify-between',
                  displayType == 'list' ? ' p-5 md:pr-2 col-span-3' : 'col-span-5 p-5',
               )}
            >
               <div className="w-full">
                  {/* HEAD */}
                  <div
                     className={cn(
                        'w-full flex justify-between items-center',
                        displayType == 'list' ? '' : 'mb-3',
                     )}
                  >
                     {displayType == 'list' ? (
                        <Rating
                           rating={selectedMap?.star_rating || 0}
                           variant="yellow"
                           size={15}
                           disabled
                        />
                     ) : (
                        <Button
                           variant={'default'}
                           className="text-white bg-neutral-900 text-sm py-1 px-2"
                        >
                           ⭐ {selectedMap?.star_rating.toFixed(2) || 0}
                        </Button>
                     )}

                     <div className="flex gap-1 items-center">
                        <Button
                           variant={'default'}
                           size={'icon'}
                           className="bg-neutral-100 hover:bg-neutral-900 text-black hover:text-white rounded-full text-md"
                        >
                           ❤
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
                     <h3 className="text-2xl font-bold capitalize line-clamp-2 mb-1 hover:text-yellow-700 cursor-pointer">
                        {selectedMap?.name}
                     </h3>
                     <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-500">{selectedMap?.address}</span>
                     </p>
                     <p className="flex items-center gap-2">
                        <MapPinnedIcon className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-500">{distance} from a center</span>
                     </p>
                  </div>

                  {/* ADAMENTINE */}
                  <div className="mb-2">
                     <div className="flex justify-start items-center flex-wrap gap-2">
                        {hotel?.rates[0]?.amenities_data?.map((amentine, index) => (
                           <React.Fragment key={amentine}>
                              <div className="text-slate-500 font-normal text-sm">
                                 {convertKebabToTitleCase(amentine)}
                              </div>
                              {index !== hotel?.rates[0]?.amenities_data?.length && <div>⋅</div>}
                           </React.Fragment>
                        ))}

                        <div className="text-slate-500 font-normal text-sm">Wifi</div>
                        <div>⋅</div>
                        <div className="text-slate-500 font-normal text-sm">Kitchen</div>
                        <div>⋅</div>
                        <div className="text-slate-500 font-normal text-sm">Pool</div>
                     </div>
                  </div>

                  {/* SERVICE */}
                  {displayType == 'list' && (
                     <div className="group">
                        {hotel?.rates[0]?.payment_options?.payment_types[0]?.cancellation_penalties
                           ?.free_cancellation_before !== null ? (
                           <div className="flex items-center gap-1 text-green-600 text-xs mb-1">
                              <svg
                                 stroke="currentColor"
                                 fill="currentColor"
                                 strokeWidth="0"
                                 viewBox="0 0 16 16"
                                 className="me-2"
                                 height="1em"
                                 width="1em"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                              </svg>
                              {
                                 hotel?.rates[0]?.payment_options?.payment_types[0]
                                    ?.cancellation_penalties?.free_cancellation_before
                              }
                           </div>
                        ) : (
                           <div className="flex items-center gap-1 text-red-600 text-xs mb-1">
                              <svg
                                 stroke="currentColor"
                                 fill="currentColor"
                                 strokeWidth="0"
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
                        )}

                        {hotel?.rates[0]?.meal && (
                           <div className="flex items-center gap-1 text-green-600 text-xs mb-1">
                              <svg
                                 stroke="currentColor"
                                 fill="currentColor"
                                 strokeWidth="0"
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
                        )}
                     </div>
                  )}
               </div>

               {/* PRICE */}
               <div className="w-full flex justify-between items-center flex-wrap mt-3">
                  <span className="text-2xl font-bold flex items-center gap-1">
                     <span>
                        {`${formatCurrencyWithCodeAsSuffix(
                           Number(
                              hotel?.rates[0]?.payment_options?.payment_types[0]?.show_amount || 0,
                           ),
                           hotel?.rates[0]?.payment_options?.payment_types[0]?.show_currency_code ||
                              'VND',
                        )}`}
                     </span>
                     <span className="text-sm font-light text-slate-500"> / day</span>
                     {/* <span className="line-through text-slate-400 text-sm font-normal ml-2">
                        $1000
                     </span> */}
                  </span>
                  {displayType == 'list' ? (
                     <Link href={`/hotel/${hotel?.hotel_id}`}>
                        <Button variant="default" className="text-sm">
                           Select Room
                        </Button>
                     </Link>
                  ) : (
                     <Link href={`/hotel/${hotel?.hotel_id}`}>
                        <Button
                           variant="default"
                           className="text-sm font-medium bg-neutral-100 text-black hover:bg-neutral-800 hover:text-neutral-200"
                        >
                           View Detail
                           <ArrowRight className="w-4 h-4" />
                        </Button>
                     </Link>
                  )}
               </div>
            </div>
         </div>
      </Card>
   );
};

export default HotelCard;

export const HotelCardSkeleton = ({ displayType = 'grid' }: { displayType?: 'list' | 'grid' }) => {
   return (
      <Card className="group relative border-slate-200 overflow-hidden hover:shadow-xl transition-shadow w-full h-full">
         <div className="h-full w-full grid grid-cols-5 items-center">
            <div className={`p-2 ${displayType === 'list' ? 'col-span-2' : 'col-span-5'}`}>
               <div
                  className={cn(
                     displayType == 'list'
                        ? 'aspect-square md:aspect-[7/6] m-0 p-0'
                        : 'aspect-square m-0 p-0',
                  )}
               >
                  <div className="h-full">
                     <Skeleton className="w-full h-full rounded-md" />
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div
               className={`flex flex-col items-start justify-between p-5 ${displayType === 'list' ? 'col-span-3' : 'col-span-5'}`}
            >
               <div className="w-full">
                  {/* HEAD */}
                  <div className="w-full flex justify-between items-center mb-3">
                     {displayType === 'list' ? (
                        <Skeleton className="h-5 w-16" /> // Skeleton for rating in list view
                     ) : (
                        <Skeleton className="h-8 w-16" /> // Larger skeleton for button in grid view
                     )}
                     <div className="flex gap-1 items-center">
                        <Skeleton className="h-8 w-8 rounded-full" /> {/* Heart button */}
                        <Skeleton className="h-8 w-8 rounded-full" /> {/* Link button */}
                     </div>
                  </div>

                  {/* NAME & LOCATION */}
                  <div className="mb-4">
                     <Skeleton className="h-8 w-3/4 mb-2" /> {/* Hotel Name */}
                     <div className="flex items-center gap-2 mb-1">
                        <Skeleton className="h-4 w-4" /> {/* MapPin icon */}
                        <Skeleton className="h-4 w-3/4" /> {/* Address */}
                     </div>
                     <div className="flex items-center gap-2 mb-1">
                        <Skeleton className="h-4 w-3/4" /> {/* Distance */}
                     </div>
                  </div>

                  {/* AMENITIES */}
                  <div className="mb-2">
                     <div className="flex justify-start items-center flex-wrap gap-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                     </div>
                  </div>

                  {/* SERVICE */}
                  <div className="group">
                     <div className="flex items-center gap-1 text-green-600 text-xs mb-1">
                        <Skeleton className="h-4 w-3/4" /> {/* Free cancellation */}
                     </div>
                     <div className="flex items-center gap-1 text-green-600 text-xs mb-1">
                        <Skeleton className="h-4 w-3/4" /> {/* Free Breakfast */}
                     </div>
                     <div className="flex items-center gap-1 text-red-600 text-xs mb-1">
                        <Skeleton className="h-4 w-3/4" /> {/* Non-refundable */}
                     </div>
                  </div>
               </div>

               {/* PRICE */}
               <div className="w-full flex justify-between items-center flex-wrap mt-3">
                  <div className="text-2xl font-bold flex items-center gap-1">
                     <Skeleton className="h-8 w-24" /> {/* Price */}
                     <Skeleton className="h-4 w-12" /> {/* / day text */}
                  </div>
                  <Skeleton className="h-10 w-32 rounded-md" /> {/* Button */}
               </div>
            </div>
         </div>
      </Card>
   );
};
