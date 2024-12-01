'use client';

import Image from '@/components/common/images/image';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel';
import { API_URL } from '@/configs';
import { HotDestination } from '@/services/global';
import { setSearchGlobalLocation } from '@/stores/features/global/global-slice';
import { setTriggerSearch } from '@/stores/features/stay';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const destinationList = [
   {
      name: 'Statue of Liberty',
      hotels: 356,
      image: 'https://images.unsplash.com/photo-1731354233513-60e9edaddc5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
   },
   {
      name: 'Taj Mahal',
      hotels: 256,
      image: 'https://images.unsplash.com/photo-1721332150382-d4114ee27eff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
   },
   {
      name: 'Opera House',
      hotels: 845,
      image: 'https://images.unsplash.com/photo-1732279446373-18714789f2ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D',
   },
   {
      name: 'Colosseum',
      hotels: 243,
      image: 'https://images.unsplash.com/photo-1732221469856-c8be04dda990?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D',
   },
   {
      name: 'Grand Canyon',
      hotels: 463,
      image: 'https://images.unsplash.com/photo-1732631592378-f5c20fcc775f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D',
   },
   {
      name: 'Eiffel Tower',
      hotels: 834,
      image: 'https://images.unsplash.com/photo-1732639535051-63870f800ab7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D',
   },
   {
      name: 'Great Wall',
      hotels: 248,
      image: 'https://images.unsplash.com/photo-1732601471603-404af59bc450?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOXx8fGVufDB8fHx8fA%3D%3D',
   },
];

export const DestinationCaroucel = () => {
   // next api
   const router = useRouter();

   // redux
   const dispatch = useDispatch();

   // State
   const [listDestination, setListDestination] = useState<HotDestination[]>([]);

   useEffect(() => {
      const fetchData = async () => {
         const res = await fetch(`${API_URL}/api/global/hot_destinations`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         if (!res.ok) {
            return null;
         }

         const data = await res.json();
         setListDestination(data);
      };

      fetchData();
   }, []);

   const handleDirectAndSearch = (destination: HotDestination) => {
      dispatch(
         setSearchGlobalLocation({
            name: destination?.city_name,
            searchType: 'region',
            hotelId: destination?.id,
            lat: Number(destination?.lat),
            lon: Number(destination?.long),
            placeId: Number(destination?.place_id),
         }),
      );

      setCookie('locationSearch', destination?.city_name);
      setCookie('locationImage', destination?.image_url);

      dispatch(setTriggerSearch(true));

      router.push('/hotel');
   };

   return (
      <div>
         <Carousel
            className="w-full my-20"
            opts={{
               align: 'start',
               loop: true,
            }}
         >
            <CarouselContent>
               {listDestination?.map((des, index) => (
                  <CarouselItem
                     key={index}
                     className="md:basis-1/2 lg:basis-1/12 ml-5"
                     onClick={() => handleDirectAndSearch(des)}
                  >
                     <div className="flex flex-col justify-center items-center gap-4">
                        <div className="rounded-full aspect-vide overflow-hidden">
                           <Image
                              src={des?.image_url}
                              alt={des?.city_name}
                              className="w-full h-[120px] cursor-pointer"
                           />
                        </div>

                        <div className="flex flex-col text-sm items-center justify-center gap-2">
                           <div className="font-medium text-center cursor-pointer">
                              {des?.city_name}
                           </div>
                           <div className="font-medium text-neutral-500 text-xs cursor-pointer">
                              {des?.hotel_count} Hotels
                           </div>
                        </div>
                     </div>
                  </CarouselItem>
               ))}
               {listDestination?.map((des, index) => (
                  <CarouselItem
                     key={index}
                     className="md:basis-1/2 lg:basis-1/12 ml-5"
                     onClick={() => handleDirectAndSearch(des)}
                  >
                     <div className="flex flex-col justify-center items-center gap-4">
                        <div className="rounded-full aspect-vide overflow-hidden">
                           <Image
                              src={des?.image_url}
                              alt={des?.city_name}
                              className="w-full h-[120px] cursor-pointer"
                           />
                        </div>

                        <div className="flex flex-col text-sm items-center justify-center gap-2">
                           <div className="font-medium text-center cursor-pointer">
                              {des?.city_name}
                           </div>
                           <div className="font-medium text-neutral-500 text-xs cursor-pointer">
                              {des?.hotel_count} Hotels
                           </div>
                        </div>
                     </div>
                  </CarouselItem>
               ))}
               {listDestination?.map((des, index) => (
                  <CarouselItem
                     key={index}
                     className="md:basis-1/2 lg:basis-1/12 ml-5"
                     onClick={() => handleDirectAndSearch(des)}
                  >
                     <div className="flex flex-col justify-center items-center gap-4">
                        <div className="rounded-full aspect-vide overflow-hidden">
                           <Image
                              src={des?.image_url}
                              alt={des?.city_name}
                              className="w-full h-[120px] cursor-pointer"
                           />
                        </div>

                        <div className="flex flex-col text-sm items-center justify-center gap-2">
                           <div className="font-medium text-center cursor-pointer">
                              {des?.city_name}
                           </div>
                           <div className="font-medium text-neutral-500 text-xs cursor-pointer">
                              {des?.hotel_count} Hotels
                           </div>
                        </div>
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious className="-left-5 bg-neutral-200 hover:bg-neutral-800 hover:text-white text-black" />
            <CarouselNext className="-right-5 bg-neutral-200 hover:bg-neutral-800 hover:text-white text-black" />
         </Carousel>
      </div>
   );
};
