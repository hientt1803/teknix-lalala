'use client';

import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';
import {
   Credenza,
   CredenzaBody,
   CredenzaContent,
   CredenzaDescription,
   CredenzaHeader,
   CredenzaTitle,
   CredenzaTrigger,
} from '@/components/ui/credenza';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Rate, RoomGroup } from '@/stores/features/stay/type';
import { useAppSelector } from '@/stores/hook';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { convertStringToDate, daysBetweenDateRange } from '@/utilities/datetime';
import { convertKebabToTitleCase, replaceSize } from '@/utilities/string';
import { format } from 'date-fns';
import { ArrowUp, BedSingle, CreditCard } from 'lucide-react';
import React, { useMemo, useRef } from 'react';

export const CardRoomV2Detail = ({
   children,
   listImages,
   roomRate,
   selectedMap,
   roomGroup,
   handleReservation,
}: {
   children: React.ReactNode;
   listImages?: string[];
   roomRate: Rate;
   selectedMap: any;
   roomGroup?: RoomGroup;
   handleReservation: (rate: Rate) => void;
}) => {
   // redux
   const searchGlobal = useAppSelector((state) => state.globalSlice.searchGlobal);

   // state
   const mobileScrollRef = useRef<HTMLDivElement | null>(null);

   // logic
   const totalAdults = useMemo(() => {
      let total = 0;
      searchGlobal.people.forEach((room) => {
         total += room.adults;
      });
      return total;
   }, [searchGlobal.people]);

   const totalChildren = useMemo(() => {
      let total = 0;
      searchGlobal.people.forEach((room) => {
         total += room.children.length;
      });
      return total;
   }, [searchGlobal.people]);

   const renderBedBaseOnBedType = (beddingType: string) => {
      switch (beddingType) {
         case 'single bed':
            return <BedSingle className="size-4" />;

         case 'twin beds':
            return (
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path
                     fill="currentColor"
                     d="M3 18v-5q0-.444.256-.946T4 11.3V9q0-.846.577-1.423T6 7h4.5q.517 0 .883.213q.365.212.617.587q.252-.375.617-.587Q12.983 7 13.5 7H18q.846 0 1.423.577T20 9v2.3q.489.252.744.754q.256.502.256.946v5h-1v-2H4v2zm9.5-7H19V9q0-.425-.288-.712T18 8h-4.5q-.425 0-.712.288T12.5 9zM5 11h6.5V9q0-.425-.288-.712T10.5 8H6q-.425 0-.712.288T5 9zm-1 4h16v-2q0-.425-.288-.712T19 12H5q-.425 0-.712.288T4 13zm16 0H4z"
                  />
               </svg>
            );

         case 'full double bed':
            return (
               <>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     viewBox="0 0 24 24"
                  >
                     <path
                        fill="currentColor"
                        d="M3 18v-5q0-.444.256-.946T4 11.3V9q0-.846.577-1.423T6 7h4.5q.517 0 .883.213q.365.212.617.587q.252-.375.617-.587Q12.983 7 13.5 7H18q.846 0 1.423.577T20 9v2.3q.489.252.744.754q.256.502.256.946v5h-1v-2H4v2zm9.5-7H19V9q0-.425-.288-.712T18 8h-4.5q-.425 0-.712.288T12.5 9zM5 11h6.5V9q0-.425-.288-.712T10.5 8H6q-.425 0-.712.288T5 9zm-1 4h16v-2q0-.425-.288-.712T19 12H5q-.425 0-.712.288T4 13zm16 0H4z"
                     />
                  </svg>
               </>
            );

         default:
            return (
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path
                     fill="none"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M7 7a2 2 0 1 0 2 2m13 8v-3h-4m-4 0H2m0-6v9m10-5v2h2m4 0h4v-2a3 3 0 0 0-3-3h-6M3 3l18 18"
                  />
               </svg>
            );
      }
   };

   const renderService = () => (
      <div className="w-full">
         <div className="columns-2 gap-3">
            <div className="flex items-center gap-1 text-xs font-[450] dark:text-neutral-700 mb-1">
               {renderBedBaseOnBedType(roomRate?.room_data_trans?.bedding_type)}
               {roomRate?.room_data_trans?.bedding_type ||
                  'Various Bedding type (No provided data)'}
            </div>
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
                  <span className="text-neutral-800 dark:text-neutral-700">
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
                  <span className="text-neutral-800 dark:text-neutral-700">Free Breakfast</span>
               </div>
            )}
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
               <span className="text-neutral-800 dark:text-neutral-700">All taxes included</span>
            </div>

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
                  <span className="text-neutral-800 dark:text-neutral-700">No Windows</span>
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
                  <span className="text-neutral-800 dark:text-neutral-700">Non-Smoking</span>
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
                  <span className="text-neutral-800 dark:text-neutral-700">Smoking rooms</span>
               </div>
            )}
         </div>
      </div>
   );

   return (
      <Credenza>
         <CredenzaTrigger asChild>
            <div>{children}</div>
         </CredenzaTrigger>
         <CredenzaContent className="md:min-w-[50rem] lg:min-w-[64rem] xl:min-w-[80rem] 2xl:min-w-[93.75rem] lg:w-fit h-fit lg:h-fit lg:max-h-[90vh] overflow-y-hidden">
            <CredenzaHeader>
               <CredenzaTitle className="text-2xl">{selectedMap?.name}</CredenzaTitle>
               <CredenzaDescription>
                  Information for room{' '}
                  <strong className="text-black dark:text-neutral-100">
                     {roomRate?.room_name}
                  </strong>
               </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody className="overflow-hidden">
               <div
                  className="h-[70vh] overflow-y-scroll mb-3"
                  ref={mobileScrollRef}
                  style={{
                     scrollbarWidth: 'none',
                  }}
               >
                  <div className="grid grid-cols-12 gap-3 h-full">
                     <div className="col-span-12 md:col-span-8 order-2 lg:order-1 h-full">
                        <div
                           className="h-full lg:h-[77vh] overflow-y-scroll"
                           style={{
                              scrollbarWidth: 'none',
                           }}
                        >
                           <div className="relative grid grid-cols-2 gap-3">
                              {listImages?.map((image, index) => (
                                 <div
                                    key={index}
                                    className={`w-full col-span-2 ${
                                       (index + 1) % 8 === 3
                                          ? 'col-span-2'
                                          : 'col-span-2 lg:col-span-1'
                                    } h-full aspect-square rounded-lg overflow-hidden`}
                                 >
                                    <Image
                                       src={replaceSize(
                                          image,
                                          (index + 1) % 8 === 3 ? '1024x768' : '640x400',
                                       )}
                                       alt=""
                                       className="w-full h-full"
                                    />
                                 </div>
                              ))}

                              <div className="fixed bottom-10 right-10 md:hidden">
                                 <Button
                                    size={'icon'}
                                    className="bg-neutral-800 text-neutral-100 rounded-full hover:bg-neutral-700"
                                    onClick={() => {
                                       mobileScrollRef?.current?.scroll({
                                          top: 0,
                                          behavior: 'smooth',
                                       });
                                    }}
                                 >
                                    <ArrowUp className="size-5" />
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-span-12 md:col-span-4 order-1 lg:order-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg h-full p-2">
                        <ScrollArea className="h-full lg:h-[77vh]">
                           <div className="p-2">
                              <h2
                                 className={cn(
                                    'text-lg capitalize font-semibold line-clamp-2 mb-1 dark:text-neutral-200',
                                 )}
                              >
                                 Services and Amenities
                              </h2>

                              {/* ADAMENTINE */}
                              <div className="my-3">
                                 <div className="flex justify-start items-center flex-wrap gap-2">
                                    {roomGroup?.room_amenities?.map((amentine, index) => (
                                       <React.Fragment key={index}>
                                          <div className="text-neutral-800 dark:text-neutral-200 bg-neutral-300 dark:bg-neutral-500 text-xs border cursor-pointer hover:shadow-md border-neutral-300 dark:border-neutral-400 p-2 px-4 rounded-full">
                                             {convertKebabToTitleCase(amentine)}
                                          </div>
                                       </React.Fragment>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           <div className="bg-white dark:bg-neutral-300 rounded-lg p-3 mb-2">
                              <div className="text-neutral-500 dark:text-neutral-600 font-semibold mb-4">
                                 Price for{' '}
                                 <strong className='text-neutral-800 dark:text-neutral-900'>
                                    {totalAdults} adults
                                    {totalChildren > 0 && `, ${totalChildren} children`}
                                    {`, ${searchGlobal?.people?.length} ${searchGlobal?.people?.length > 1 ? 'rooms' : 'room'}`}
                                 </strong>
                              </div>

                              <div className="flex">
                                 <div className="flex-shrink-0 flex flex-col items-center py-2">
                                    <span className="block w-4 h-4 rounded-full border border-neutral-400"></span>
                                    <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
                                    <span className="block w-4 h-4 rounded-full border border-neutral-400"></span>
                                 </div>
                                 <div className="ml-4 space-y-5 text-sm">
                                    <div className="flex flex-col space-y-1">
                                       <span className=" text-neutral-500 dark:text-neutral-700">
                                          {format(
                                             searchGlobal?.dateRange?.startDate,
                                             'EEEE, MMMM d, y',
                                          )}
                                       </span>
                                       <span className="font-normal dark:text-neutral-600">
                                          Check in after <strong>14:00:00</strong>
                                       </span>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                       <span className="text-neutral-500 dark:text-neutral-700">
                                          {format(
                                             searchGlobal?.dateRange?.endDate,
                                             'EEEE, MMMM d, y',
                                          )}
                                       </span>
                                       <span className="font-normal dark:text-neutral-600">
                                          Check out before <strong>12:00:00</strong>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="bg-white dark:bg-neutral-300 rounded-lg p-3">
                              {/* SERVICE */}
                              {renderService()}

                              <div className="flex items-center gap-1 mt-6">
                                 <span
                                    className={
                                       'text-neutral-900 dark:text-neutral-900 font-bold text-2xl mt-3'
                                    }
                                 >
                                    {`${formatCurrencyWithCodeAsSuffix(
                                       Number(
                                          roomRate?.payment_options?.payment_types[0]
                                             ?.show_amount || 0,
                                       ),
                                       roomRate?.payment_options?.payment_types[0]
                                          ?.show_currency_code || 'VND',
                                    )}`}
                                 </span>
                                 <span className="text-sm text-neutral-600">
                                    /{' '}
                                    {daysBetweenDateRange(
                                       convertStringToDate(searchGlobal?.dateRange?.startDate),
                                       convertStringToDate(searchGlobal?.dateRange?.endDate),
                                    )}{' '}
                                    nights for {totalAdults + totalChildren} guest
                                 </span>
                              </div>

                              <Button
                                 variant="default"
                                 className={cn(
                                    'text-sm transition-all duration-300 ease-in-out w-full mt-2 rounded-md font-medium bg-neutral-900 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-200',
                                 )}
                                 onClick={() => handleReservation(roomRate)}
                              >
                                 Book now <CreditCard className="size-4" />
                              </Button>
                           </div>
                        </ScrollArea>
                     </div>
                  </div>
               </div>
            </CredenzaBody>
         </CredenzaContent>
      </Credenza>
   );
};
