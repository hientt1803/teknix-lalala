'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/stores';
import { useGetRoomActiveByHotelIdQuery } from '@/stores/features/stay';
import { IHotelReservation, RgExt } from '@/stores/features/stay/type';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { addDays, formatDate } from 'date-fns';
import {
   BathIcon,
   BedIcon,
   Building2Icon,
   CircleCheckIcon,
   EyeIcon,
   HeartIcon,
   MapPin,
   MapPinIcon,
   SparkleIcon,
   StarIcon,
   UploadIcon,
   UserIcon,
   UsersIcon,
} from 'lucide-react';

import React, { useMemo } from 'react';

type Props = {
   data?: IHotelReservation;
   id: string;
};

const MainSection = ({ data, id }: Props) => {
   const searchGlobal = useAppSelector((state) => state.globalSlice.searchGlobal);

   const {
      data: dataInfo,
      isLoading,
      isFetching,
   } = useGetRoomActiveByHotelIdQuery({
      checkin: searchGlobal?.dateRange?.startDate || formatDate(new Date(), 'yyyy-MM-dd'),
      // checkout:
      //    searchGlobal?.dateRange?.endDate || formatDate(addDays(new Date(), 2), 'yyyy-MM-dd'),
      checkout: '2024-11-29',
      currency: 'VND',
      language: 'en',
      guests: searchGlobal.people || [
         {
            adults: 1,
            children: [],
         },
      ],
      id: id,
      residency: 'VN',
   });

   const totalExp = useMemo(() => {
      if (!dataInfo || dataInfo.hotels.length === 0) return null;

      let total: RgExt = {
         class: 0,
         quality: 0,
         sex: 0,
         bathroom: 0,
         bedding: 0,
         family: 0,
         capacity: 0,
         club: 0,
         bedrooms: 0,
         balcony: 0,
         view: 0,
         floor: 0,
      };

      total = dataInfo.hotels[0].rates[0].rg_ext;

      // dataInfo.hotels.forEach((hotel) => {
      //     hotel.rates.forEach((rate) => {
      //         const {rg_ext} = rate;

      //         (Object.keys(total) as (keyof RgExt)[]).forEach((key) => {
      //             total[key] += rg_ext[key] || 0;
      //         });
      //     });
      // });

      return total;
   }, [dataInfo]);

   const rg_ext_Rendering = () => {
      if (!totalExp) return null;

      // Helper function to get the icon based on the key
      const getIconByKey = (ext: keyof RgExt) => {
         switch (ext) {
            case 'class':
               return <Building2Icon className="w-5 h-5" strokeWidth={1.5} />;
            case 'quality':
               return <SparkleIcon className="w-5 h-5" strokeWidth={1.5} />;
            case 'sex':
               return <UserIcon className="w-5 h-5" strokeWidth={1.5} />;
            case 'bathroom':
               return <BathIcon className="w-5 h-5" strokeWidth={1.5} />;
            case 'bedding':
               return <BedIcon className="w-5 h-5" strokeWidth={1.5} />;
            case 'family':
               return <UsersIcon className="w-5 h-5" strokeWidth={1.5} />;
            case 'capacity':
               return <UserIcon className="w-5 h-5" strokeWidth={1.5} />;
            case 'club':
               return <Building2Icon className="w-5 h-5" strokeWidth={1.5} />;
            case 'bedrooms':
               return <BedIcon className="w-5 h-5" strokeWidth={1.5} />;
            case 'balcony':
               return <EyeIcon className="w-5 h-5" strokeWidth={1.5} />;
            case 'view':
               return <EyeIcon className="w-5 h-5" strokeWidth={1.5} />;
            case 'floor':
               return <StarIcon className="w-5 h-5" strokeWidth={1.5} />;
            default:
               return <UserIcon className="w-5 h-5" strokeWidth={1.5} />; // Default icon
         }
      };

      return Object.keys(totalExp).map((ext) => {
         const value = totalExp[ext as keyof RgExt]; // Get the value of the current key

         // Skip rendering if the value is 0
         if (value === 0) return null;

         return (
            <div key={ext} className="flex items-center space-x-3">
               {/* Render the corresponding icon based on the key */}
               {getIconByKey(ext as keyof RgExt)}

               <span className="flex flex-col">
                  <span>{value.toString()}</span>
                  <span className="hidden xs:inline-block capitalize">{ext}</span>{' '}
                  {/* Render the key name */}
               </span>
            </div>
         );
      });
   };

   return (
      <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-2xl space-y-8">
         <div className="flex justify-between items-center">
            <span className="inline-flex px-2.5 py-1 rounded-full font-medium text-xs  text-blue-800 bg-blue-100  relative">
               {data?.hotel_chain ? data.hotel_chain : 'Loading...'}
            </span>
            <div className="flow-root">
               <div className="flex text-slate-700 dark:text-slate-50 text-sm -mx-3 -my-1.5">
                  <Button variant="ghost" className="py-1.5 px-3 flex rounded-lg cursor-pointer">
                     <UploadIcon className="w-5 h-5" strokeWidth={1.5} />
                     <span className="hidden sm:block ml-2.5">Share</span>
                  </Button>
                  <Button variant="ghost" className="py-1.5 px-3 flex rounded-lg cursor-pointer">
                     <HeartIcon className="w-5 h-5" strokeWidth={1.5} />
                     <span className="hidden sm:block ml-2.5">Save</span>
                  </Button>
               </div>
            </div>
         </div>
         <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {data?.name ? data.name : 'Loading...'}
         </h2>
         <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm">
               <div className="pb-[2px]">
                  <StarFilledIcon className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
               </div>
               <span className="font-medium">{data?.star_rating ? data.star_rating : 0}</span>
               <span className="text-slate-500 dark:text-slate-300">(112)</span>
            </div>
            <span>·</span>
            <span className="flex items-center">
               <MapPinIcon className="w-5 h-5" strokeWidth={1.5} />
               <span className="ml-2">{data?.address ? data.address : 'Loading...'}</span>
            </span>
         </div>
         <div className="flex items-center">
            <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 ring-1 ring-white ">
               <Avatar>
                  <AvatarImage src={'/testimonials/client6.png'} />
               </Avatar>
               <span className="rounded-full bg-green-600 text-xs flex items-center justify-center absolute  w-4 h-4 -top-0.5 -right-0.5">
                  <CircleCheckIcon
                     strokeWidth={1.5}
                     // color={theme.colors.green[7]}
                  />
               </span>
            </div>
            <span className="ml-2.5 text-slate-500 dark:text-slate-400">
               Hosted by{' '}
               <span className="text-slate-900 dark:text-slate-200 font-medium">Kevin Francis</span>
            </span>
         </div>
         <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 text-sm text-slate-700 dark:text-slate-50">
            {rg_ext_Rendering()}
            {/* <div className="flex items-center space-x-3 ">
                    <IconBrandAirtable
                        style={{
                            width: rem(24),
                            height: rem(24),
                        }}
                        stroke={1.5}
                    />
                    <span className="flex flex-col">
                        <span>2</span>
                        <span className="hidden sm:inline-block">beds</span>
                    </span>
                </div>
                <div className="flex items-center space-x-3 ">
                    <IconBath
                        style={{
                            width: rem(24),
                            height: rem(24),
                        }}
                        stroke={1.5}
                    />
                    <span className="flex flex-col">
                        <span>3</span>
                        <span className="hidden sm:inline-block">baths</span>
                    </span>
                </div>
                <div className="flex items-center space-x-3 ">
                    <IconWallpaper
                        style={{
                            width: rem(24),
                            height: rem(24),
                        }}
                        stroke={1.5}
                    />
                    <span className="flex flex-col">
                        <span>6</span>
                        <span className="hidden sm:inline-block">bedrooms</span>
                    </span>
                </div> */}
         </div>
      </div>
   );
};

export default MainSection;
