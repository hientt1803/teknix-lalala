import { SearchGroup } from '@/components/common/searchGroup/searchGroup';

export const HotelBanner = () => {
   return (
      <div
         className="block w-full h-full relative bg-cover bg-center rounded-lg overflow-hidden mt-2 mb-6 object-cover"
         style={{ backgroundImage: "url('/assets/images/hotel/banner.jpg')" }}
      >
         <div className="w-full h-full flex justify-center items-center bg-black/50">
            <div className="flex flex-col justify-center items-center gap-10 min-w-[90%] w-full max-w-[90%]">
               <h1 className="text-center font-bold text-white text-6xl mt-24">
                  150 Hotels in New York
               </h1>
               <div className="mb-28">
                  <SearchGroup className="!block !static w-full" />
               </div>
            </div>
         </div>
      </div>
   );
};
