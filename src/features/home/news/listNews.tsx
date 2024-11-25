'use client';

import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import dynamic from 'next/dynamic';

export const NewCard = dynamic(() => import('./newCard').then((mod) => mod.NewCard), {
   ssr: false,
});

export type newsType = {
   date: string;
   duration: string;
   comments_count: number;
   title: string;
   author: string;
   category: string;
   image: string;
};

const news: newsType[] = [
   {
      date: '18 Sep 2024',
      duration: '6 mins',
      comments_count: 38,
      title: 'Top 10 Travel Hacks for Budget-Conscious Adventurers',
      author: 'Jimmy Dave',
      category: 'Discovery',
      image: 'image',
   },
   {
      date: '18 Sep 2024',
      duration: '6 mins',
      comments_count: 38,
      title: 'Discovering Hidden Gems: 10 Off-the-Beaten-Path Travel Tips',
      author: 'Jimmy Dave',
      category: 'Cultural',
      image: 'image',
   },
   {
      date: '18 Sep 2024',
      duration: '6 mins',
      comments_count: 38,
      title: 'Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey',
      author: 'Jimmy Dave',
      category: 'Travel',
      image: 'image',
   },
];

export const ListNews = () => {
   const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

   return (
      <Carousel
         className="w-full mt-10"
         opts={{
            align: 'start',
            loop: true,
         }}
         plugins={[plugin.current]}
         onMouseEnter={plugin.current.stop}
         onMouseLeave={plugin.current.reset}
      >
         <CarouselContent>
            {news?.map((news, index) => (
               <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 py-2 pointer-events-none">
                  <NewCard newProps={news} />
               </CarouselItem>
            ))}
            {news?.map((news, index) => (
               <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 py-2 pointer-events-none">
                  <NewCard newProps={news} />
               </CarouselItem>
            ))}
         </CarouselContent>
      </Carousel>
   );
};
