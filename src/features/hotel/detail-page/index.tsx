'use client';

import Bounded from '@/components/common/containers/bounded';
import MainContent from './components/main-content';
import { setTriggerSearch, useGetStaylDataByIdQuery } from '@/stores/features/stay';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Tooltip, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { buttonVariants } from '@/components/ui/button';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { ArrowLeftIcon } from 'lucide-react';
import ImageGalleryComp from '@/components/custom/media/image-gallery';

interface HotelDetailFeatureProps {
   id: string;
}

const HotelDetailFeature = ({ id }: HotelDetailFeatureProps) => {
   // next api
   const router = useRouter();

   // redux
   const { data } = useGetStaylDataByIdQuery(
      { id: id },
      {
         skip: !id,
      },
   );
   const dispatch = useDispatch();

   // handle logic
   const backList = () => {
      dispatch(setTriggerSearch(true));
      router.back();
   };

   return (
      <Bounded className="relative">
         <div className="flex justify-start items-center py-4 md:py-8">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger>
                     <div
                        onClick={backList}
                        className={buttonVariants({
                           variant: 'ghost',
                        })}
                     >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Back
                     </div>
                  </TooltipTrigger>
                  <TooltipContent>Back</TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>
         {data?.images.length ? (
            // <ImagesGalleryLazy images={data?.images ?? []} type="default" />
            <ImageGalleryComp images={data?.images ?? []} type="default" />
         ) : (
            <p>No images available</p>
         )}

         {/* Render your main content here */}
         <MainContent id={id} data={data} />
      </Bounded>
   );
};

export default HotelDetailFeature;
