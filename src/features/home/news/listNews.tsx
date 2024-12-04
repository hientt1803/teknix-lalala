'use client';

import Autoplay from 'embla-carousel-autoplay';
import dynamic from 'next/dynamic';
import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export const NewCard = dynamic(
  () => import('./newCard').then(module_ => module_.NewCard),
  {
    ssr: false,
  },
);

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
    image:
      'https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/news.png',
  },
  {
    date: '18 Sep 2024',
    duration: '6 mins',
    comments_count: 38,
    title: 'Discovering Hidden Gems: 10 Off-the-Beaten-Path Travel Tips',
    author: 'Jimmy Dave',
    category: 'Cultural',
    image:
      'https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/news2.png',
  },
  {
    date: '18 Sep 2024',
    duration: '6 mins',
    comments_count: 38,
    title: 'Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey',
    author: 'Jimmy Dave',
    category: 'Travel',
    image:
      'https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/news3.png',
  },
];

export const ListNews = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      className="mt-10 w-full"
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
          <CarouselItem
            key={index}
            className="pointer-events-none py-2 md:basis-1/2 lg:basis-1/3"
          >
            <NewCard newProps={news} />
          </CarouselItem>
        ))}
        {news?.map((news, index) => (
          <CarouselItem
            key={index}
            className="pointer-events-none py-2 md:basis-1/2 lg:basis-1/3"
          >
            <NewCard newProps={news} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
