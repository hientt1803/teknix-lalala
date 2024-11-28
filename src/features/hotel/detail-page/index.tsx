import Bounded from '@/components/common/containers/bounded';
import ImageGalleryComp from '@/components/custom/media/image-gallery';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import MainContent from './components/main-content';
import { getHotelDetail } from '@/services/hotel';

interface HotelDetailFeatureProps {
   id: string;
}

const HotelDetailFeature = async ({ id }: HotelDetailFeatureProps) => {
   // next api
   // const router = useRouter();

   // redux
   // const { data } = useGetStaylDataByIdQuery(
   //    { id: id },
   //    {
   //       skip: !id,
   //    },
   // );
   // const dispatch = useDispatch();

   // handle logic
   // const backList = () => {
   //    dispatch(setTriggerSearch(true));
   //    router.back();
   // };
   const data = await getHotelDetail(id);

   console.log(data);

   return (
      <Bounded className="relative">
         <div className="flex justify-start items-center py-4 md:py-8">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger>
                     <Link href={'/hotel'}>
                        <div
                           className={buttonVariants({
                              variant: 'ghost',
                           })}
                        >
                           <ArrowLeftIcon className="w-5 h-5 mr-2" />
                           Back
                        </div>
                     </Link>
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
