import { ArrowRight, BedSingle, Heart, Images } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';

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
import { ISearchGlobal } from '@/stores/features/global/type';
import { Rate, RoomGroup } from '@/stores/features/stay/type';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { convertKebabToTitleCase, replaceSize } from '@/utilities/string';

type RoomCardType = {
  displayType: 'left' | 'right';
  roomRate: Rate;
  roomGroup?: RoomGroup;
  selectedMap: any;
  searchGlobal: ISearchGlobal;
  handleReservation: (rate: Rate) => void;
};

const CardRoomV2Detail = dynamic(() =>
  import('./card-room-v2-detail').then(mob => mob.CardRoomV2Detail),
);

const RoomCard = (props: RoomCardType) => {
  // PROPS
  const {
    roomGroup,
    roomRate,
    selectedMap,
    displayType,
    searchGlobal,
    handleReservation,
  } = props;

  // LOGIC
  const items =
    roomGroup?.images && roomGroup?.images?.length > 0 ? (
      roomGroup?.images?.map((item, index) => {
        return (
          <CarouselItem key={index} className={cn('ml-0 pl-0')}>
            <Image
              src={replaceSize(item)}
              className="h-full w-full cursor-pointer object-cover"
              alt={selectedMap?.name}
            />
          </CarouselItem>
        );
      })
    ) : (
      <Image
        src=""
        className="h-full w-full cursor-pointer object-cover"
        alt={selectedMap?.name}
      />
    );

  const renderBedBaseOnBedType = (beddingType: string) => {
    switch (beddingType) {
      case 'single bed': {
        return <BedSingle className="size-5" />;
      }

      case 'twin beds': {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 18v-5q0-.444.256-.946T4 11.3V9q0-.846.577-1.423T6 7h4.5q.517 0 .883.213q.365.212.617.587q.252-.375.617-.587Q12.983 7 13.5 7H18q.846 0 1.423.577T20 9v2.3q.489.252.744.754q.256.502.256.946v5h-1v-2H4v2zm9.5-7H19V9q0-.425-.288-.712T18 8h-4.5q-.425 0-.712.288T12.5 9zM5 11h6.5V9q0-.425-.288-.712T10.5 8H6q-.425 0-.712.288T5 9zm-1 4h16v-2q0-.425-.288-.712T19 12H5q-.425 0-.712.288T4 13zm16 0H4z"
            />
          </svg>
        );
      }

      case 'full double bed': {
        return (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 18v-5q0-.444.256-.946T4 11.3V9q0-.846.577-1.423T6 7h4.5q.517 0 .883.213q.365.212.617.587q.252-.375.617-.587Q12.983 7 13.5 7H18q.846 0 1.423.577T20 9v2.3q.489.252.744.754q.256.502.256.946v5h-1v-2H4v2zm9.5-7H19V9q0-.425-.288-.712T18 8h-4.5q-.425 0-.712.288T12.5 9zM5 11h6.5V9q0-.425-.288-.712T10.5 8H6q-.425 0-.712.288T5 9zm-1 4h16v-2q0-.425-.288-.712T19 12H5q-.425 0-.712.288T4 13zm16 0H4z"
              />
            </svg>
          </>
        );
      }

      default: {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
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
    }
  };

  const renderService = () => (
    <div className="group">
      <div className="columns-1 gap-3 md:columns-2">
        {roomRate?.payment_options?.payment_types[0]?.cancellation_penalties
          ?.free_cancellation_before === null ? (
          <div className="mb-1 flex items-center gap-1 text-xs font-[450] text-red-600">
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
        ) : (
          <div className="mb-1 flex items-center gap-1 text-xs font-[450] text-green-600">
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
            <span className="text-neutral-800 dark:text-neutral-200">
              Free cancellation before{' '}
              {
                roomRate?.payment_options?.payment_types[0]
                  ?.cancellation_penalties?.free_cancellation_before
              }
            </span>
          </div>
        )}

        {roomRate?.meal_data?.has_breakfast && (
          <div className="mb-1 flex items-center gap-1 text-xs font-[450] text-green-600">
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
            <span className="text-neutral-800 dark:text-neutral-200">
              Free Breakfast
            </span>
          </div>
        )}

        {/* {result !== 0 ? ( */}
        <div className="mb-1 flex items-center gap-1 text-xs font-[450] text-green-600">
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
          <span className="text-neutral-800 dark:text-neutral-200">
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
                  <span className="text-neutral-800 dark:text-neutral-200">Not includes tax and fees</span>
               </div>
            )} */}

        {roomRate?.amenities_data?.includes('no-window') && (
          <div className="mb-1 flex items-center gap-1 text-xs font-[450] text-red-600">
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
            <span className="text-neutral-800 dark:text-neutral-200">
              No Windows
            </span>
          </div>
        )}

        {roomRate?.amenities_data?.includes('non-smoking') ? (
          <div className="mb-1 flex items-center gap-1 text-xs font-[450] text-red-600">
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
            <span className="text-neutral-800 dark:text-neutral-200">
              Non-Smoking
            </span>
          </div>
        ) : (
          <div className="mb-1 flex items-center gap-1 text-xs font-[450] text-green-600">
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
            <span className="text-neutral-800 dark:text-neutral-200">
              Smoking rooms
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card className="group relative h-full w-full overflow-hidden rounded-[1.875rem] border-neutral-200 transition-shadow hover:shadow-xl dark:border-neutral-700">
      <div className={cn('grid h-full w-full grid-cols-5 items-center')}>
        {/* Image */}
        <div
          className={cn(
            displayType == 'left'
              ? 'order-1 col-span-5 lg:col-span-2'
              : 'order-1 col-span-5 lg:order-2 lg:col-span-2',
          )}
        >
          <div className="relative z-10 h-full">
            <div className={cn('m-0 aspect-video p-0 md:aspect-[5/4]')}>
              <Carousel className="m-0 aspect-video h-full w-full p-0 md:aspect-[5/4]">
                <CardRoomV2Detail
                  listImages={roomGroup?.images}
                  roomRate={roomRate}
                  selectedMap={selectedMap}
                  roomGroup={roomGroup}
                  handleReservation={handleReservation}
                >
                  <CarouselContent className="m-0 aspect-video h-full w-full p-0 md:aspect-[5/4]">
                    {items}
                  </CarouselContent>
                </CardRoomV2Detail>
                <CarouselPrevious className="left-10" />
                <CarouselNext className="right-10" />
              </Carousel>
            </div>
            <CardRoomV2Detail
              listImages={roomGroup?.images}
              roomRate={roomRate}
              selectedMap={selectedMap}
              roomGroup={roomGroup}
              handleReservation={handleReservation}
            >
              <Button
                variant={'default'}
                className={cn(
                  'absolute bottom-8 bg-white p-3 text-black hover:bg-neutral-200 hover:text-black dark:bg-neutral-300 lg:bottom-3',
                  displayType == 'left' ? 'left-3' : 'right-3',
                )}
              >
                <Images className="size-4" /> {roomGroup?.images?.length || 0}{' '}
                photos
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
              className="text-md rounded-full bg-neutral-100 p-2 text-black hover:bg-neutral-100 hover:text-yellow-400 dark:bg-neutral-700 dark:text-neutral-200"
            >
              <Heart />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={cn(
            'z-20 flex w-full flex-col items-start justify-between rounded-[1.875rem] bg-white p-5 dark:bg-neutral-900',
            displayType == 'left'
              ? 'order-2 col-span-5 -mt-6 [height:calc(100%+24px)] md:-ml-6 md:-mt-0 md:h-full md:pr-2 md:[width:calc(100%+24px)] lg:col-span-3'
              : 'order-2 col-span-5 -mr-6 [height:calc(100%+24px)] md:-mr-6 md:-mt-0 md:h-full md:pl-2 md:[width:calc(100%+24px)] lg:order-1 lg:col-span-3',
          )}
        >
          <div className="flex h-full w-full flex-col items-center justify-between gap-3 md:flex-row md:p-0 lg:py-7">
            <div className="h-full w-full flex-[3] px-3">
              <div className="flex h-full flex-col items-start justify-between">
                {/* TOP */}
                <div>
                  {/* HEAD */}
                  <div
                    className={cn('flex w-full items-center justify-between')}
                  >
                    <div
                      className={cn(
                        'mb-3 rounded-full border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 shadow-2xl dark:border-neutral-600 dark:text-neutral-200',
                      )}
                    >
                      ⭐ {selectedMap?.star_rating.toFixed(1) || 0}{' '}
                      <span className="text-neutral-500 dark:text-neutral-400">
                        ({627} reviews)
                      </span>
                    </div>
                  </div>

                  {/* NAME & LOCATION */}
                  <div className="mb-4">
                    <CardRoomV2Detail
                      listImages={roomGroup?.images}
                      roomRate={roomRate}
                      selectedMap={selectedMap}
                      roomGroup={roomGroup}
                      handleReservation={handleReservation}
                    >
                      <div className="flex flex-col items-start gap-0">
                        <h3
                          className={cn(
                            'mb-1 line-clamp-2 cursor-pointer text-2xl font-semibold capitalize hover:text-yellow-700 dark:text-neutral-100',
                          )}
                        >
                          {searchGlobal?.people?.length > 1 &&
                            `${searchGlobal?.people?.length}`}
                          {searchGlobal?.people?.length > 1 && (
                            <span className="mx-2 text-base">x</span>
                          )}
                          {roomRate?.room_name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          <span>
                            {renderBedBaseOnBedType(
                              roomRate?.room_data_trans?.bedding_type,
                            )}
                          </span>
                          <span>
                            {roomRate?.room_data_trans?.bedding_type ||
                              'Various Bedding type (No provided data)'}
                          </span>
                        </div>
                      </div>
                    </CardRoomV2Detail>
                  </div>

                  {/* ADAMENTINE */}
                  <div className="my-3">
                    <div className="flex flex-wrap items-center justify-start gap-2">
                      {roomGroup?.room_amenities
                        ?.slice(0, 7)
                        .map((amentine, index) => (
                          <React.Fragment key={index}>
                            <div className="cursor-pointer rounded-full border border-neutral-300 p-2 px-4 text-xs text-neutral-800 hover:shadow-md dark:border-neutral-500 dark:text-neutral-200">
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
                {/* <CardRoomV2Detail
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
                        </CardRoomV2Detail> */}
              </div>
            </div>

            {/* PRICE CARD */}
            <div className="mt-auto flex h-full w-full flex-1 flex-col flex-wrap items-center justify-between">
              <div />
              <div className="boder-neutral-200 flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border bg-[#fcfcf3] p-5 dark:bg-[#212114] md:h-fit md:p-8">
                <span className="flex flex-col items-center justify-center gap-2 text-center text-xl font-bold">
                  <span className={'dark:text-neutral-200'}>
                    {`${formatCurrencyWithCodeAsSuffix(
                      Number(
                        roomRate?.payment_options?.payment_types[0]
                          ?.show_amount || 0,
                      ),
                      roomRate?.payment_options?.payment_types[0]
                        ?.show_currency_code || 'VND',
                    )}`}
                  </span>
                  <span className="text-base font-light text-neutral-700 dark:text-neutral-400">
                    Per Nights
                  </span>
                </span>
                <Button
                  variant="default"
                  className={cn(
                    'mx-auto mt-5 rounded-full bg-neutral-100 text-sm font-medium text-black transition-all duration-300 ease-in-out hover:bg-neutral-800 hover:text-neutral-200 dark:bg-neutral-300 dark:text-neutral-700',
                  )}
                  onClick={() => handleReservation(roomRate)}
                >
                  Book now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right sell off */}
      <div
        className={cn(
          displayType == 'left' ? 'right-10 top-0' : 'left-10 top-0',
          'absolute z-30 flex h-[2.75rem] w-[2.75rem] items-center justify-center bg-cover bg-no-repeat text-center text-sm font-medium text-black',
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
