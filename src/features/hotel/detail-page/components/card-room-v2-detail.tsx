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
import { useAppSelector } from '@/stores/hook';
import { Rate, RoomGroup } from '@/stores/features/stay/type';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { convertStringToDate, daysBetweenDateRange } from '@/utilities/datetime';
import { convertKebabToTitleCase, replaceSize } from '@/utilities/string';
import { CreditCard } from 'lucide-react';
import React, { useMemo } from 'react';

export const CardRoomV2Detail = ({
   children,
   listImages,
   roomRate,
   selectedMap,
   roomGroup,
}: {
   children: React.ReactNode;
   listImages?: string[];
   roomRate: Rate;
   selectedMap: any;
   roomGroup?: RoomGroup;
}) => {
   // redux
   const searchGlobal = useAppSelector((state) => state.globalSlice.searchGlobal);

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

   // let result = 0;
   // const data = roomRate?.payment_options?.payment_types[0]?.tax_data?.taxes
   //    ?.filter((tax) => !tax.included_by_supplier)
   //    ?.map((item) => (result += Number(item?.amount)));

   const renderService = () => (
      <div className="group">
         <div className="columns-1 gap-3">
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

            {/* {result !== 0 ? (
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
                     Taxes and fees:{' '}
                     {`${
                        roomRate?.payment_options?.payment_types[0]?.tax_data?.taxes?.filter(
                           (tax) => !tax.included_by_supplier,
                        )[0]?.currency_code || 'VND'
                     } ${formatCurrency(result, roomRate?.payment_options?.payment_types[0]?.show_currency_code || 'VND')}`}
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
                  <span className="text-neutral-800">Not includes tax and fees</span>
               </div>
            )} */}
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
               <span className="text-neutral-800">All taxes included</span>
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
      <Credenza>
         <CredenzaTrigger asChild>{children}</CredenzaTrigger>
         <CredenzaContent className="lg:min-w-[80rem] lg:w-fit h-fit lg:h-fit lg:max-h-[90vh] overflow-y-scroll lg:overflow-hidden">
            <CredenzaHeader>
               <CredenzaTitle className="text-2xl">{selectedMap?.name}</CredenzaTitle>
               <CredenzaDescription>
                  Information for room <strong className="text-black">{roomRate?.room_name}</strong>
               </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody className="overflow-hidden">
               <ScrollArea className="h-[70vh]">
                  <div className="grid grid-cols-12 gap-3 h-full">
                     <div className="col-span-12 md:col-span-8 order-2 lg:order-1 h-full">
                        <ScrollArea className="h-full lg:h-[77vh] overflow-y-auto">
                           <div className="columns-2 gap-3">
                              {listImages?.map((image, index) => (
                                 <div
                                    key={index}
                                    className="w-full h-full aspect-square rounded-lg overflow-hidden mb-3"
                                 >
                                    <Image
                                       src={replaceSize(image)}
                                       alt=""
                                       className="w-full h-full"
                                    />
                                 </div>
                              ))}
                           </div>
                        </ScrollArea>
                     </div>
                     <div className="col-span-12 md:col-span-4 order-1 lg:order-2 bg-neutral-100 rounded-lg h-full p-1">
                        <ScrollArea className="h-full lg:h-[77vh]">
                           <div className="p-3">
                              <h2
                                 className={cn(
                                    'text-lg capitalize font-semibold line-clamp-2 mb-1',
                                 )}
                              >
                                 Services and Amenities
                              </h2>

                              {/* ADAMENTINE */}
                              <div className="my-3">
                                 <div className="flex justify-start items-center flex-wrap gap-2">
                                    {roomGroup?.room_amenities?.map((amentine, index) => (
                                       <React.Fragment key={index}>
                                          <div className="text-neutral-800 bg-neutral-300 text-xs border cursor-pointer hover:shadow-md border-neutral-300 p-2 px-4 rounded-full">
                                             {convertKebabToTitleCase(amentine)}
                                          </div>
                                       </React.Fragment>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           <div className="bg-white rounded-lg p-2">
                              {/* SERVICE */}
                              {renderService()}

                              <div className="flex items-center gap-1">
                                 <span className={'text-neutral-900 font-bold text-2xl mt-3'}>
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
                                    'text-sm transition-all duration-300 ease-in-out w-full mt-5 rounded-md font-medium bg-neutral-900 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-200',
                                 )}
                              >
                                 Book now <CreditCard className="size-4" />
                              </Button>
                           </div>
                        </ScrollArea>
                     </div>
                  </div>
               </ScrollArea>
            </CredenzaBody>
         </CredenzaContent>
      </Credenza>
   );
};
