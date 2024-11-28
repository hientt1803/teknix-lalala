import Bounded from '@/components/common/containers/bounded';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const SearchGroup = dynamic(() =>
   import('@/components/common/searchGroup/searchGroup').then((mod) => mod.SearchGroup),
);

export const HotelBanner = () => {
   return (
      <div
         className="block w-full h-full relative bg-cover bg-center bg-black/50 rounded-lg overflow-hidden mt-2 mb-6 object-cover"
         style={{ backgroundImage: "url('/assets/images/hotel/banner.jpg')" }}
      >
         <Bounded>
            <div className="w-full h-full flex justify-center items-center">
               <div className="flex flex-col justify-center items-center gap-10 min-w-[90%] w-full max-w-[90%]">
                  <h1 className="text-center font-bold text-white text-4xl mt-24">
                     Journey with Travila - Begin Your Story!
                  </h1>
                  <h5 className="text-center font-bold text-white text-xl">
                     Easily search for top tours offered by our professional network
                  </h5>
                  <div className="mb-28">
                     <SearchGroup className="!block !static w-full" />
                  </div>
               </div>
            </div>
         </Bounded>
      </div>
   );
};

export const HotelBannerSkeleton = () => {
   return (
      <div className="w-full h-full relative bg-cover bg-center rounded-lg overflow-hidden mt-2 mb-6 object-cover">
         <div className="w-full h-full flex justify-center items-center bg-black/50">
            <div className="flex flex-col justify-center items-center gap-10 min-w-[90%] w-full max-w-[90%]">
               <Skeleton className="h-10 w-full rounded-md" />
               <div className="mb-28">{/* <SearchGroup className="!block!static w-full" /> */}</div>
            </div>
         </div>
      </div>
   );
};
