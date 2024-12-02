import { Property } from '@/slices/StaySection/mock';
import Link from 'next/link';
import {
   Carousel,
   CarouselContent,
   CarouselDots,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';

interface StayCardProps extends Property {}
const StayCard = ({ imageUrl, name, location, pricePerNight }: StayCardProps) => {
   return (
      <Card className="group relative rounded-[2rem] border-0 shadow-none bg-transparent overflow-hidden will-change-transform hover:shadow transition-shadow">
         <div className="relative w-full">
            <div className="aspect-square md:aspect-[6/5] m-0 p-0">
               <Image src={imageUrl[0]} className="w-full h-full object-cover rounded-[2rem]" />
            </div>
            <div
               className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-white bg-black bg-opacity-30 hover:bg-opacity-50 absolute right-3 top-3 z-[1]"
               title="Save"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2rem"
                  height="1.2rem"
                  viewBox="0 0 24 24"
               >
                  <path
                     fill="currentColor"
                     d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037.033l.034-.03a6 6 0 0 1 4.733-1.44l.246.036a6 6 0 0 1 3.364 10.008l-.18.185l-.048.041l-7.45 7.379a1 1 0 0 1-1.313.082l-.094-.082l-7.493-7.422A6 6 0 0 1 6.979 3.074"
                  ></path>
               </svg>
            </div>
            <div className=" absolute -bottom-5 right-10 bg-white dark:bg-neutral-800 px-5 py-2 rounded-full shadow flex items-center space-x-1 text-sm">
               <div className="pb-[2px]">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="currentColor"
                     aria-hidden="true"
                     data-slot="icon"
                     className="w-[18px] h-[18px] text-orange-500"
                  >
                     <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                     ></path>
                  </svg>
               </div>
               <span className="font-medium">4.8</span>
               <span className="text-neutral-500 dark:text-neutral-400">(28 reviews)</span>
            </div>
            {/* <div
               className="nc-SaleOffBadge flex items-center justify-center text-xs py-0.5 px-3 bg-red-700 text-red-50 rounded-full absolute left-3 top-3"
               data-nc-id="SaleOffBadge"
            >
               -10% today
            </div> */}
         </div>
         <Link href="/">
            <div className="p-4 pt-7 space-y-4">
               <div className="space-y-2">
                  {/* <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            Entire cabin · 10 beds
                        </span> */}
                  <div className="flex items-center space-x-2">
                     {/* <span className="inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-green-800 bg-green-100  relative">
                        ADS
                     </span> */}
                     <h2 className=" font-medium capitalize text-lg">
                        <span className="line-clamp-1">{name}</span>
                     </h2>
                  </div>
                  <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-base space-x-2">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="1.5"
                           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="1.5"
                           d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                     </svg>
                     <span className="">{location}</span>
                  </div>
               </div>
               <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
               <div className="flex justify-between items-center">
                  <span className="text-2xl font-semibold">
                     $ {pricePerNight}
                     <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                        /person
                     </span>
                  </span>
                  <Button variant="outline" className="px-6 py-5 rounded-full">
                     Book Now
                  </Button>
               </div>
            </div>
         </Link>
      </Card>
   );
};

export default StayCard;
