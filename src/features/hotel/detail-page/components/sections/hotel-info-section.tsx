import Image from '@/components/common/images/image';
import Badge from '@/components/custom/badges/badge';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { IHotelReservation } from '@/stores/features/stay/type';
import { replaceSize } from '@/utilities/string';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

type Props = {
   data?: IHotelReservation;
   scrollIntoReviewSection: () => void;
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

const HotelInfoSection = ({ data, scrollIntoReviewSection }: Props) => {
   const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
   const { name, images, description_struct } = data!!;
   return (
      <div className="py-5 lg:py-16">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-16">
            <div className="flex flex-col gap-10 col-span-6">
               <Badge
                  color="white"
                  className="bg-yellow-300 py-4 px-5 text-base font-semibold w-fit"
               >
                  Welcome to {name}
               </Badge>
               <h1 className="font-semibold text-6xl leading-tight">A New Vision of Luxury</h1>
               {/* <p className="text-neutral-700 dark:text-neutral-300  lg:text-lg leading-normal">
                  Le Meurice is an iconic luxury hotel situated in the heart of Paris, France,
                  renowned for its elegance, sophistication, and rich history. Nestled on the Rue de
                  Rivoli, overlooking the splendid Tuileries Garden and just steps away from the
                  Louvre Museum, this esteemed establishment has been a beacon of opulence and
                  hospitality since its inception in 1835.
               </p> */}
               <p className="text-neutral-700 dark:text-neutral-300  lg:text-lg leading-normal">
                  {description_struct?.slice(0, 1).map((de) => (
                     <div key={de.title}>
                        <div className="flex">
                           <h3 className="text-black dark:text-white font-semibold">{de.title}</h3>
                        </div>
                        <p className="font-normal text-neutral-600 dark:text-neutral-400">
                           {de.paragraphs.map((pa, index) => (
                              <span key={index}>
                                 <span>{pa}</span>
                                 <br />
                                 <br />
                              </span>
                           ))}
                        </p>
                        <br />
                     </div>
                  ))}
               </p>
               <div className="border-b border-b-neutral-200 dark:border-b-neutral-700 rounded-full"></div>
               <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col space-y-2">
                     <p className="text-lg flex items-center gap-2 font-semibold text-neutral-900 dark:text-neutral-400">
                        <div className="w-7 h-7 border rounded-full border-neutral-400 flex items-center justify-center">
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
                     </p>
                     <p className="text-2xl font-semibold">1-800-222-8888</p>
                  </div>
                  <Badge
                     onClick={scrollIntoReviewSection}
                     color="gray"
                     className="py-4 px-6 text-base cursor-pointer hover:bg-neutral-100"
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
                     plugins={[plugin.current]}
                     onMouseEnter={plugin.current.stop}
                     onMouseLeave={plugin.current.reset}
                  >
                     <CarouselContent>
                        {payments.map((payment, index) => (
                           <CarouselItem key={index} className="basis-1/4">
                              <div className="border rounded-lg px-5 py-2 flex justify-center items-center pointer-events-none">
                                 <Image
                                    src={payment.src}
                                    alt=""
                                    className="w-fit h-[1.875rem]"
                                    classNameImage=" object-contain"
                                 />
                              </div>
                           </CarouselItem>
                        ))}
                        {payments.map((payment, index) => (
                           <CarouselItem key={index} className="basis-1/4">
                              <div className="border rounded-lg px-5 py-2 flex justify-center items-center pointer-events-none">
                                 <Image
                                    src={payment.src}
                                    alt=""
                                    className="w-fit h-[1.875rem]"
                                    classNameImage=" object-contain"
                                 />
                              </div>
                           </CarouselItem>
                        ))}
                     </CarouselContent>
                     {/* <CarouselPrevious />
         <CarouselNext /> */}
                  </Carousel>
               </div>
            </div>
            <div className="col-span-6 xl:col-span-5">
               <div className="relative w-full h-fit">
                  <Image className="aspect-[3.5/5] rounded-3xl" src={replaceSize(images[0])} />
                  <Image
                     className="aspect-square w-40 lg:w-60 rounded-3xl absolute right-5 top-5 lg:-right-10 lg:top-10"
                     src={replaceSize(images[1])}
                  />
                  <Image
                     className="aspect-square w-40 lg:w-60 rounded-3xl absolute left-5 bottom-5 lg:-left-10 lg:-bottom-10"
                     src={replaceSize(images[2])}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default HotelInfoSection;
