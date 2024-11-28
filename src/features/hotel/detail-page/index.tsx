import Bounded from '@/components/common/containers/bounded';
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { getHotelDetail } from '@/services/hotel';
import { IHotelReservation } from '@/stores/features/stay/type';
import { convertToTitleCase } from '@/utilities/string';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import MainContent from './components/main-content';

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
   const data: IHotelReservation = await getHotelDetail(id);

   return (
      <Bounded className="relative">
         <div className="flex md:hidden justify-start items-center py-4 md:py-8">
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

         <div className="mt-5 mb-10">
            <Breadcrumb>
               <BreadcrumbList>
                  <BreadcrumbItem>
                     <Link href="/" className="text-neutral-600 text-base">
                        Home
                     </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <Link href="/hotel" className="text-neutral-600 text-base">
                        Hotels
                     </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbPage className="text-lg font-medium">
                        {data?.name || convertToTitleCase(data?.id)}
                     </BreadcrumbPage>
                  </BreadcrumbItem>
               </BreadcrumbList>
            </Breadcrumb>
         </div>
         {/* {data?.images.length ? (
            // <ImagesGalleryLazy images={data?.images ?? []} type="default" />
            <ImageGalleryComp images={data?.images ?? []} type="default" />
         ) : (
            <p>No images available</p>
         )} */}

         {/* Render your main content here */}
         <MainContent id={id} data={data} />
      </Bounded>
   );
};

export default HotelDetailFeature;
