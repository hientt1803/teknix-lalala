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
import { Home } from 'lucide-react';
import dynamic from 'next/dynamic';

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
      <Bounded className='mt-12 py-12'>
         <Breadcrumb >
            <BreadcrumbList>
               <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex items-center">
                     <Home className="w-3 h-3 me-2" />
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
            <div className="bg-indigo-100 rounded-2xl pt-5 flex-1">
               <div className="grid grid-cols-1 lg:grid-cols-4 place-items-center">
                  <div className="col-span-1 relative hidden lg:block">
                     <Image
                        src="/assets/images/flight/woman-guide.svg"
                        className="w-full h-full object-cover"
                     />
                  </div>
                  <div className="col-span-2">
                     <div className="flex flex-col p-5 lg:p-0 gap-2 h-full justify-start items-start">
                        <h2 className="text-neutral-900 text-xl lg:text-3xl font-bold">
                           International Guideline
                        </h2>
                        <p className="text-neutral-600 text-base">
                           COVID safety measures adopted by various countries including VISA
                           restrictions, quarantine rules, etc.
                        </p>
                        <Button className="px-7 py-5">View Guideline</Button>
                     </div>
                  </div>
                  <div className="col-span-1 relative hidden lg:block">
                     <Image
                        src="/assets/images/flight/man-guide.svg"
                        className="w-full h-full object-cover"
                     />
                  </div>
               </div>
            </div>
         </div>
         <main className=" mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
            {/* INFOMATION */}
            <CardInfoUser />
            {/* FEATURES & HISTORY*/}
            <CardListing />
         </main>
      </Bounded>
   );
};

export default BookingFeatures;

const CardInfoUserSkeleton = () => <Skeleton className="h-[600px] block flex-grow rounded-3xl" />;
const CardListingUserSkeleton = () => (
   <Skeleton className="h-[900px] rounded-3xl w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:ml-10 flex-shrink-0" />
);
