import Link from 'next/link';

import Bounded from '@/components/common/containers/bounded';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getHotelDetail } from '@/services/hotel';
import { IHotelReservation } from '@/stores/features/stay/type';
import { convertToTitleCase } from '@/utilities/string';
import dynamic from 'next/dynamic';

const MainContent = dynamic(() =>
  import('./components/main-content').then(module_ => module_.default),
);

interface HotelDetailFeatureProps {
  id: string;
}

const HotelDetailFeature = async ({ id }: HotelDetailFeatureProps) => {
  const data: IHotelReservation = await getHotelDetail(id);

  return (
    <Bounded className="relative">
      {/* <div className="flex items-center justify-start py-4 md:hidden md:py-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={'/hotel'}>
                <div
                  className={buttonVariants({
                    variant: 'ghost',
                  })}
                >
                  <ArrowLeftIcon className="mr-2 h-5 w-5" />
                  Back
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Back</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div> */}

      <div className="mb-10 mt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/" className="text-base text-neutral-600">
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/hotel" className="text-base text-neutral-600">
                Hotels
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-base font-medium">
                {data?.name || convertToTitleCase(data?.id || '')}
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
