import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Rate } from '@/stores/features/stay/type';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { convertKebabToTitleCase, replaceSize } from '@/utilities/string';
import { ArrowRight, Heart } from 'lucide-react';
import React from 'react';

type RoomCardType = {
   displayType: 'left' | 'right';
   roomData: Rate;
   selectedMap: any;
   handleReservation: (rate: Rate) => void;
};

const RoomCard = (props: RoomCardType) => {
   const { roomData, selectedMap, displayType, handleReservation } = props;

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
                     <Image
                        src={
                           replaceSize(selectedMap?.images[0] || '') ||
                           '/assets/images/place-holder-image.svg'
                        }
                        className="w-full h-full object-cover rounded-md"
                        alt={selectedMap?.name}
                        loading="lazy"
                     />
                  </div>
               </div>
               <div className="absolute left-5 top-5 z-20">
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
               <div className="w-full h-full flex flex-col md:flex-row justify-between items-center gap-3 md:p-0">
                  <div className="flex-[3] w-full px-3">
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
                        <h3
                           className={cn(
                              'text-2xl capitalize font-semibold line-clamp-2 mb-1 hover:text-yellow-700 cursor-pointer',
                           )}
                        >
                           {roomData?.room_name}
                        </h3>
                     </div>

                     {/* ADAMENTINE */}
                     <div className="my-3">
                        <div className="flex justify-start items-center flex-wrap gap-2">
                           {roomData?.amenities_data?.map((amentine, index) => (
                              <React.Fragment key={index}>
                                 <div className="text-neutral-800 text-xs border cursor-pointer hover:shadow-md border-neutral-300 p-2 px-4 rounded-full">
                                    {convertKebabToTitleCase(amentine)}
                                 </div>
                              </React.Fragment>
                           ))}
                        </div>
                     </div>

                     {/* SERVICE */}
                     <div className="group">
                        <div className="columns-1 md:columns-2 gap-3">
                           {roomData?.payment_options?.payment_types[0]?.cancellation_penalties
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
                                       roomData?.payment_options?.payment_types[0]
                                          ?.cancellation_penalties?.free_cancellation_before
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

                           {roomData?.meal_data?.has_breakfast && (
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

                           {roomData?.meal_data?.has_breakfast && (
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
                                 No Child Meal
                              </div>
                           )}

                           {/* <div className="flex items-center gap-1 text-green-600 text-sm mb-1">
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
                              <span className="text-neutral-800">Free Wifi</span>
                           </div>
                           <div className="flex items-center gap-1 text-green-600 text-sm mb-1">
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
                              <span className="text-neutral-800">Luxury Rooms</span>
                           </div>
                           <div className="flex items-center gap-1 text-green-600 text-sm mb-1">
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
                              <span className="text-neutral-800">Business Rooms</span>
                           </div> */}
                        </div>
                     </div>

                     {/* DESC */}
                     <div className="text-sm text-neutral-700 mt-4">
                        <p
                           className="text-sm text-neutral-600 line-clamp-3"
                           dangerouslySetInnerHTML={{
                              __html:
                                 selectedMap?.description_struct[Math.floor(Math.random() * 3)]
                                    ?.paragraphs[0],
                           }}
                        />
                     </div>
                  </div>

                  {/* PRICE */}
                  <div className="w-full h-full flex-1 flex flex-col justify-between items-center flex-wrap">
                     <div />
                     <div className="bg-[#fcfcf3] flex flex-col justify-center items-center gap-3 w-full h-full md:h-fit border boder-neutral-200 rounded-2xl p-5 md:p-8">
                        <span className="text-xl font-bold flex flex-col justify-center items-center text-center gap-2">
                           <span className={cn('')}>
                              {`${formatCurrencyWithCodeAsSuffix(
                                 Number(
                                    roomData?.payment_options?.payment_types[0]?.show_amount || 0,
                                 ),
                                 roomData?.payment_options?.payment_types[0]?.show_currency_code ||
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
                           onClick={() => handleReservation(roomData)}
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
            className="absolute right-10 top-0 z-30 bg-no-repeat bg-cover w-[2.75rem] h-[2.75rem] text-black text-sm text-center font-medium flex justify-center items-center"
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
