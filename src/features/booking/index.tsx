import { Home } from 'lucide-react';
import dynamic from 'next/dynamic';

import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const CardInfoUser = dynamic(() => import('./components/card-info'), {
  ssr: false,
  loading: () => <CardInfoUserSkeleton />,
});
const CardListing = dynamic(() => import('./components/card-listing'), {
  ssr: false,
  loading: () => <CardListingUserSkeleton />,
});

const BookingFeatures = () => {
  return (
    <Bounded className="mt-12 py-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center">
              <Home className="me-2 h-3 w-3" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>•</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Booking</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="my-5 mb-8">
        <div className="flex-1 rounded-2xl bg-indigo-100 pt-5">
          <div className="grid grid-cols-1 place-items-center lg:grid-cols-4">
            <div className="relative col-span-1 hidden lg:block">
              <Image
                src="/assets/images/flight/woman-guide.svg"
                className="h-full w-full object-cover"
                alt=""
                loading="lazy"
              />
            </div>
            <div className="col-span-2">
              <div className="flex h-full flex-col items-start justify-start gap-2 p-5 lg:p-0">
                <h2 className="text-xl font-bold text-neutral-900 lg:text-3xl">
                  International Guideline
                </h2>
                <p className="text-base text-neutral-600">
                  COVID safety measures adopted by various countries including
                  VISA restrictions, quarantine rules, etc.
                </p>
                <Button className="px-7 py-5">View Guideline</Button>
              </div>
            </div>
            <div className="relative col-span-1 hidden lg:block">
              <Image
                src="/assets/images/flight/man-guide.svg"
                className="h-full w-full object-cover"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <main className="mb-24 mt-12 flex flex-col lg:mb-32 lg:flex-row">
        {/* INFOMATION */}
        <CardInfoUser />
        {/* FEATURES & HISTORY*/}
        <CardListing />
      </main>
    </Bounded>
  );
};

export default BookingFeatures;

const CardInfoUserSkeleton = () => (
  <Skeleton className="block h-[600px] flex-grow rounded-3xl" />
);
const CardListingUserSkeleton = () => (
  <Skeleton className="h-[900px] w-full flex-shrink-0 space-y-8 rounded-3xl lg:ml-10 lg:w-3/5 lg:space-y-10 xl:w-2/3" />
);
