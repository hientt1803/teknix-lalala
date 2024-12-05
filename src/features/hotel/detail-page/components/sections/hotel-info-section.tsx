import React from 'react';

import Image from '@/components/common/images/image';
import Badge from '@/components/custom/badges/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { IHotelReservation } from '@/stores/features/stay/type';
import { replaceSize } from '@/utilities/string';

type Props = {
  data?: IHotelReservation;
  scrollIntoListRoomSection: () => void;
};
const payments = [
  {
    id: 1,
    src: '/assets/logos/mastercard.png',
  },
  {
    id: 2,
    src: '/assets/logos/paypal.png',
  },
  {
    id: 3,
    src: '/assets/logos/skrill.png',
  },
  {
    id: 4,
    src: '/assets/logos/stripe.png',
  },
];

const HotelInfoSection = ({ data, scrollIntoListRoomSection }: Props) => {
  return (
    <div className="py-5 lg:py-16">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-16">
        <div className="col-span-6 flex flex-col gap-10">
          <Badge
            color="white"
            className="w-fit bg-yellow-300 px-5 py-4 text-base font-semibold"
          >
            Welcome to {data?.name}
          </Badge>
          <h1 className="text-6xl font-semibold leading-tight">
            A New Vision of Luxury
          </h1>
          <div className="leading-normal text-neutral-700 dark:text-neutral-300 lg:text-lg">
            {data?.description_struct?.slice(0, 1).map(de => (
              <div key={de.title}>
                <div className="flex">
                  <h3 className="font-semibold text-black dark:text-white">
                    {de.title}
                  </h3>
                </div>
                <span className="font-normal text-neutral-600 dark:text-neutral-400">
                  {de.paragraphs.map((pa, index) => (
                    <span key={index}>
                      <span>{pa}</span>
                      <br />
                      <br />
                    </span>
                  ))}
                </span>
                <br />
              </div>
            ))}
          </div>
          <div className="rounded-full border-b border-b-neutral-200 dark:border-b-neutral-700"></div>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-neutral-400">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2rem"
                    height="1.2rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m10.038 5.316l.649 1.163c.585 1.05.35 2.426-.572 3.349c0 0-1.12 1.119.91 3.148c2.027 2.027 3.146.91 3.147.91c.923-.923 2.3-1.158 3.349-.573l1.163.65c1.585.884 1.772 3.106.379 4.5c-.837.836-1.863 1.488-2.996 1.53c-1.908.073-5.149-.41-8.4-3.66c-3.25-3.251-3.733-6.492-3.66-8.4c.043-1.133.694-2.159 1.53-2.996c1.394-1.393 3.616-1.206 4.5.38"
                    ></path>
                  </svg>
                </div>
                Need help? Call us
              </div>
              <p className="text-2xl font-semibold">1-800-222-8888</p>
            </div>
            <Badge
              onClick={scrollIntoListRoomSection}
              color="gray"
              className="cursor-pointer px-6 py-4 text-base hover:bg-neutral-100"
            >
              Availability Rooms
            </Badge>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-sm">Payments accepted</h5>
            <Carousel
              className="w-fit"
              opts={{
                align: 'start',
                loop: true,
              }}
            >
              <CarouselContent>
                {payments.map((payment, index) => (
                  <CarouselItem key={index} className="basis-1/4">
                    <div className="pointer-events-none flex items-center justify-center rounded-lg border px-5 py-2">
                      <Image
                        src={payment.src}
                        alt=""
                        className="h-[1.875rem] w-fit"
                        classNameImage=" object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
                {payments.map((payment, index) => (
                  <CarouselItem key={index} className="basis-1/4">
                    <div className="pointer-events-none flex items-center justify-center rounded-lg border px-5 py-2">
                      <Image
                        src={payment.src}
                        alt=""
                        className="h-[1.875rem] w-fit"
                        classNameImage=" object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <div className="col-span-6 xl:col-span-5">
          <div className="relative h-fit w-full">
            <div className="aspect-[1/1.5]">
              <Image
                className="h-full w-full rounded-3xl object-cover"
                src={replaceSize(data?.images[0], '1024x768')}
                alt=""
              />
            </div>
            <Image
              className="absolute right-5 top-5 aspect-square w-40 rounded-3xl lg:-right-10 lg:top-10 lg:w-60"
              src={replaceSize(data?.images[1])}
              alt=""
            />
            <Image
              className="absolute bottom-5 left-5 aspect-square w-40 rounded-3xl lg:-bottom-10 lg:-left-10 lg:w-60"
              src={replaceSize(data?.images[2])}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelInfoSection;
