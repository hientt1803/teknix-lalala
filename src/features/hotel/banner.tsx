import Bounded from '@/components/common/containers/bounded';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const SearchGroup = dynamic(() =>
   import('@/components/common/searchGroup/searchGroup').then((mod) => mod.SearchGroup),
);

export const HotelBanner = () => {
   return (
      <div
         className="block w-full h-full relative bg-cover bg-center overflow-hidden mt-2 mb-6 object-cover"
         style={{ backgroundImage: "url('/assets/images/hotel/banner-2.png')" }}
      >
         <Bounded>
            <div className="w-full h-full flex justify-center items-center z-20">
               <div className="flex flex-col justify-center items-center gap-10 min-w-[90%] w-full max-w-[90%]">
                  <div className="text-center font-bold text-black text-5xl mt-24">
                     Journey with Lalala - Begin Your Story!
                  </div>
                  <h5 className="text-center font-medium text-black text-2xl -mt-5">
                     Easily search for top hotels offered by our professional network
                  </h5>
               </div>
            </div>
            <div className="w-full my-20">
               <SearchGroup className="!block !static w-full" tabWrapperClassname='p-5' />
            </div>
         </Bounded>
         <div className="absolute inset-0 bg-black/50 -z-[1]" />
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
