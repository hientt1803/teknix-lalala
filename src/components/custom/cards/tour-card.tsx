import Image from '@/components/common/images/image';
import {
   Carousel,
   CarouselContent,
   CarouselDots,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel';
import Badge from '../badges/badge';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Tour {
   id: number;
   name: string;
   location: string;
   imageUrl: string[];
   pricePerPerson: number;
   rating: {
      score: number;
      reviews: number;
   };
   promotion?: {
      discount: number;
      label: string;
   };
   isAds?: boolean;
   type: string;
   amenities: {
      label: string;
   }[];
   isFavorite: boolean;
}
const TourCard = ({
   imageUrl,
   promotion,
   amenities,
   isAds,
   id,
   name,
   isFavorite,
   location,
   pricePerPerson,
   rating,
   type,
}: Tour) => {
   const items = imageUrl.map((item, index) => (
      <CarouselItem key={index} className="aspect-square md:aspect-[6/5] m-0 p-0">
         <Image src={item} className="w-full h-full object-cover rounded-xl" />
      </CarouselItem>
   ));
   return (
      <div className="nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow h-full">
         <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 p-3 w-full sm:w-64 ">
               <div className="relative">
                  <Carousel
                     opts={{
                        loop: true,
                     }}
                  >
                     <CarouselContent className="m-0 p-0">{items}</CarouselContent>
                     <CarouselPrevious className="left-2 invisible group-hover:visible transition-all ease-in" />
                     <CarouselNext className="right-2 invisible group-hover:visible transition-all ease-in" />
                     <CarouselDots className="absolute inset-x-0 bottom-3" />
                  </Carousel>
               </div>
               {promotion && (
                  <div className="flex items-center justify-center text-xs py-0.5 px-3  text-red-50 rounded-full absolute left-5 top-5 !bg-orange-500">
                     -10% today
                  </div>
               )}
            </div>
            <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
               <div className="space-y-4 w-full">
                  <div className="inline-flex flex-wrap gap-3">
                     {amenities.map((amenity) => (
                        <Badge color="blue">{amenity.label}</Badge>
                     ))}
                  </div>
                  <div className="flex items-center space-x-2">
                     {isAds && <Badge color="green">ADS</Badge>}
                     <h2 className="text-lg font-medium capitalize">
                        <span className="line-clamp-2">{name}</span>
                     </h2>
                  </div>
                  <p className="flex items-center gap-2">
                     <MapPin className="w-4 h-4 text-slate-700" />
                     <span className="text-sm text-slate-700">{location}</span>
                  </p>
                  <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 "></div>
                  <div className="flex w-full justify-between items-end">
                     <div className="nc-StartRating flex items-center space-x-1 text-sm  ">
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
                                 fill-rule="evenodd"
                                 d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                 clip-rule="evenodd"
                              ></path>
                           </svg>
                        </div>
                        <span className="font-medium ">{rating.score}</span>
                        <span className="text-neutral-500 dark:text-neutral-400">
                           ({rating.reviews})
                        </span>
                     </div>
                     <Button variant="ghost">
                        <span className="text-xl font-bold">
                           ${pricePerPerson}
                           <span className="text-sm font-light text-slate-500"> / person</span>
                        </span>
                     </Button>
                  </div>
               </div>
            </div>
         </div>
         <div
            className={cn(
               'w-8 h-8 flex items-center justify-center rounded-full cursor-pointer    bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-600 dark:text-neutral-400 absolute right-5 top-5 sm:right-3 sm:top-3',
               {
                  'text-red-600': isFavorite,
               },
            )}
         >
            {!isFavorite ? (
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
                     stroke-width="1.5"
                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
               </svg>
            ) : (
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
            )}
         </div>
      </div>
   );
};

export default TourCard;
