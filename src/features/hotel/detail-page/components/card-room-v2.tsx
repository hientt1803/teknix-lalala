import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Rate, RoomGroup } from '@/stores/features/stay/type';
import { formatCurrency, formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { convertKebabToTitleCase, replaceSize } from '@/utilities/string';
import { ArrowRight, Heart, Images, Search } from 'lucide-react';
import React from 'react';
import { CardRoomV2Detail } from './card-room-v2-detail';

type RoomCardType = {
   displayType: 'left' | 'right';
   roomRate: Rate;
   roomGroup?: RoomGroup;
   selectedMap: any;
   handleReservation: (rate: Rate) => void;
};

const RoomCard = (props: RoomCardType) => {
   const { roomGroup, roomRate, selectedMap, displayType, handleReservation } = props;

   const items =
      roomGroup?.images && roomGroup?.images?.length > 0 ? (
         roomGroup?.images?.map((item, index) => {
            return (
               <CarouselItem key={index} className={cn('ml-0 pl-0')}>
                  <Image
                     src={replaceSize(item)}
                     className="w-full h-full object-cover"
                     alt={selectedMap?.name}
                     loading="lazy"
                     // fallback={
                     //    <Image
                     //       src="/assets/images/place-holder-image.svg"
                     //       alt={roomRate?.room_name}
                     //       className="w-full h-full object-cover"
                     //    />
                     // }
                  />
               </CarouselItem>
            );
         })
      ) : (
         <Image
            src=""
            className="w-full h-full object-cover"
            alt={selectedMap?.name}
            loading="lazy"
         />
      );

   // let result = 0;
   // const data = roomRate?.payment_options?.payment_types[0]?.tax_data?.taxes
   //    ?.filter((tax) => !tax.included_by_supplier)
   //    ?.map((item) => (result += Number(item?.amount)));

   const renderService = () => (
      <div className="group">
         <div className="columns-1 md:columns-2 gap-3">
            {roomRate?.payment_options?.payment_types[0]?.cancellation_penalties
               ?.free_cancellation_before !== null ? (
               <div className="flex items-center gap-1 text-green-600 text-xs font-[450] mb-1">
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
                  <span className="text-neutral-800">
                     Free cancellation before{' '}
                     {
                        roomRate?.payment_options?.payment_types[0]?.cancellation_penalties
                           ?.free_cancellation_before
                     }
                  </span>
               </div>
            ) : (
               <div className="flex items-center gap-1 text-red-600 text-xs font-[450] mb-1">
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

            {roomRate?.meal_data?.has_breakfast && (
               <div className="flex items-center gap-1 text-green-600 text-xs font-[450] mb-1">
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
                  <span className="text-neutral-800">Free Breakfast</span>
               </div>
            )}

            {/* {result !== 0 ? ( */}
               <div className="flex items-center gap-1 text-green-600 text-xs font-[450] mb-1">
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
                  <span className="text-neutral-800">
                  All taxes included
                  </span>
               </div>
            {/* ) : (
               <div className="flex items-center gap-1 text-red-600 text-xs font-[450] mb-1">
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
                  <span className="text-neutral-800">Not includes tax and fees</span>
               </div>
            )} */}

            {roomRate?.amenities_data?.includes('no-window') && (
               <div className="flex items-center gap-1 text-red-600 text-xs font-[450] mb-1">
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
                  <span className="text-neutral-800">No Windows</span>
               </div>
            )}

            {roomRate?.amenities_data?.includes('non-smoking') ? (
               <div className="flex items-center gap-1 text-red-600 text-xs font-[450] mb-1">
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
                  <span className="text-neutral-800">Non-Smoking</span>
               </div>
            ) : (
               <div className="flex items-center gap-1 text-green-600 text-xs font-[450] mb-1">
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
                  <span className="text-neutral-800">Smoking rooms</span>
               </div>
            )}
         </div>
      </div>
   );

   return (
      <Card className="group relative border-neutral-200 overflow-hidden hover:shadow-xl rounded-[1.875rem] transition-shadow w-full h-full">
         <div className={cn('h-full w-full grid grid-cols-5 items-center')}>
            {/* Image */}
            <div
               className={cn(
                  displayType == 'left'
                     ? 'col-span-5 lg:col-span-2 order-1'
                     : 'order-1 lg:order-2 col-span-5 lg:col-span-2',
               )}
            >
               <div className="relative h-full z-10">
                  <div className={cn('aspect-video md:aspect-[5/4] m-0 p-0')}>
                     <Carousel className="w-full h-full aspect-video md:aspect-[5/4] m-0 p-0">
                        <CarouselContent className="w-full h-full aspect-video md:aspect-[5/4] m-0 p-0">
                           {items}
                        </CarouselContent>
                        <CarouselPrevious className="left-10" />
                        <CarouselNext className="right-10" />
                     </Carousel>
                  </div>
                  <CardRoomV2Detail
                     listImages={roomGroup?.images}
                     roomRate={roomRate}
                     selectedMap={selectedMap}
                     roomGroup={roomGroup}
                  >
                     <Button
                        variant={'default'}
                        className={cn(
                           'absolute bottom-8 lg:bottom-3 bg-white text-black hover:bg-neutral-200 hover:text-black p-3',
                           displayType == 'left' ? 'left-3' : 'right-3',
                        )}
                     >
                        <Images className="size-4" /> {roomGroup?.images?.length || 0} photos
                     </Button>
                  </CardRoomV2Detail>
               </div>
               <div
                  className={cn(
                     'absolute top-5 z-20',
                     displayType == 'left' ? 'left-5' : 'right-5',
                  )}
               >
                  <Button
                     variant={'default'}
                     size={'icon'}
                     className="bg-neutral-100 hover:bg-neutral-100 text-black hover:text-yellow-400 rounded-full p-2 text-md"
                  >
                     <Heart />
                  </Button>
               </div>
            </div>

            {/* Main Content */}
            <div
               className={cn(
                  'w-full flex flex-col items-start justify-between bg-white z-20 rounded-[1.875rem] p-5',
                  displayType == 'left'
                     ? 'order-2 col-span-5 lg:col-span-3 md:pr-2 [height:calc(100%+24px)] md:h-full md:[width:calc(100%+24px)] -mt-6 md:-mt-0 md:-ml-6'
                     : 'order-2 lg:order-1 col-span-5 lg:col-span-3 md:pl-2 [height:calc(100%+24px)] md:h-full md:[width:calc(100%+24px)] -mr-6 md:-mt-0 md:-mr-6',
               )}
            >
               <div className="w-full h-full flex flex-col md:flex-row justify-between items-center gap-3 lg:py-7 md:p-0">
                  <div className="flex-[3] w-full h-full px-3">
                     <div className="h-full flex flex-col justify-between items-start">
                        {/* TOP */}
                        <div>
                           {/* HEAD */}
                           <div className={cn('w-full flex justify-between items-center')}>
                              <div
                                 className={cn(
                                    'shadow-2xl border border-neutral-200 text-sm font-medium text-neutral-900 rounded-full py-2 px-3 mb-3',
                                 )}
                              >
                                 ⭐ {selectedMap?.star_rating.toFixed(1) || 0}{' '}
                                 <span className="text-neutral-500">({627} reviews)</span>
                              </div>
                           </div>

                           {/* NAME & LOCATION */}
                           <div className="mb-4">
                              <CardRoomV2Detail
                                 listImages={roomGroup?.images}
                                 roomRate={roomRate}
                                 selectedMap={selectedMap}
                                 roomGroup={roomGroup}
                              >
                                 <h3
                                    className={cn(
                                       'text-2xl capitalize font-semibold line-clamp-2 mb-1 hover:text-yellow-700 cursor-pointer',
                                    )}
                                 >
                                    {roomRate?.room_name}
                                 </h3>
                              </CardRoomV2Detail>
                           </div>

                           {/* ADAMENTINE */}
                           <div className="my-3">
                              <div className="flex justify-start items-center flex-wrap gap-2">
                                 {roomGroup?.room_amenities?.slice(0, 7).map((amentine, index) => (
                                    <React.Fragment key={index}>
                                       <div className="text-neutral-800 text-xs border cursor-pointer hover:shadow-md border-neutral-300 p-2 px-4 rounded-full">
                                          {convertKebabToTitleCase(amentine)}
                                       </div>
                                    </React.Fragment>
                                 ))}
                                 {roomGroup && (
                                    <div className="mt-4">
                                       {roomGroup?.room_amenities?.length > 7 && '....'}
                                    </div>
                                 )}
                              </div>
                           </div>

                           {/* SERVICE */}
                           {renderService()}
                        </div>

                        {/* BOTTOM */}
                        <CardRoomV2Detail
                           listImages={roomGroup?.images}
                           roomRate={roomRate}
                           selectedMap={selectedMap}
                           roomGroup={roomGroup}
                        >
                           <Button
                              variant="default"
                              className={cn(
                                 'text-sm transition-all duration-300 ease-in-out rounded-lg font-medium bg-neutral-100 text-black hover:bg-neutral-800 hover:text-neutral-200',
                              )}
                           >
                              <Search className="size-4" /> Show Detail
                           </Button>
                        </CardRoomV2Detail>
                     </div>
                  </div>

                  {/* PRICE CARD */}
                  <div className="w-full h-full flex-1 flex flex-col justify-between items-center flex-wrap mt-auto">
                     <div />
                     <div className="bg-[#fcfcf3] flex flex-col justify-center items-center gap-3 w-full h-full md:h-fit border boder-neutral-200 rounded-2xl p-5 md:p-8">
                        <span className="text-xl font-bold flex flex-col justify-center items-center text-center gap-2">
                           <span className={cn('')}>
                              {`${formatCurrencyWithCodeAsSuffix(
                                 Number(
                                    roomRate?.payment_options?.payment_types[0]?.show_amount || 0,
                                 ),
                                 roomRate?.payment_options?.payment_types[0]?.show_currency_code ||
                                    'VND',
                              )}`}
                           </span>
                           <span className="text-base font-light text-neutral-700">Per Nights</span>
                        </span>
                        <Button
                           variant="default"
                           className={cn(
                              'text-sm transition-all duration-300 ease-in-out mt-5 mx-auto rounded-full font-medium bg-neutral-100 text-black hover:bg-neutral-800 hover:text-neutral-200',
                           )}
                           onClick={() => handleReservation(roomRate)}
                        >
                           Book now
                           <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Right sell off */}
         <div
            className={cn(
               displayType == 'left' ? 'right-10 top-0 ' : 'left-10 top-0 ',
               'absolute z-30 bg-no-repeat bg-cover w-[2.75rem] h-[2.75rem] text-black text-sm text-center font-medium flex justify-center items-center',
            )}
            style={{
               background: 'url(/assets/images/hotel/sale.png)',
               backgroundPosition: '50%',
            }}
         >
            <span className="-mt-2">-25%</span>
         </div>
      </Card>
   );
};

export default RoomCard;
