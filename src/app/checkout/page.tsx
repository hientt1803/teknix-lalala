import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
const CheckoutFeaturesLazy = dynamic(() => import('@/features/checkout'), {
   ssr: false,
   loading: () => <CheckoutPageSkeleton />,
});

const CheckoutPage = () => {
   return (
      <div className="py-16">
         <CheckoutFeaturesLazy />
      </div>
   );
};

export default CheckoutPage;

const CheckoutPageSkeleton = () => {
   return (
      <div className="container mx-auto relative mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
         <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
            <div className="w-full flex flex-col sm:rounded-2xl sm:border border-slate-200 space-y-8 px-0 sm:p-6 xl:p-8">
               <Skeleton className="h-16 w-60" />
               <div className="border-b border-slate-200" />
               <div>
                  <div className="space-y-2">
                     <Skeleton className="h-10 w-28 rounded-3xl" />
                     <div className="mt-7">
                        <div className="space-y-5">
                           <Skeleton className="h-12 w-full rounded-3xl" />
                           <div className="flex gap-2">
                              <div className="flex-1">
                                 <Skeleton className="h-12 w-full rounded-3xl" />
                              </div>
                              <div className="flex-1">
                                 <Skeleton className="h-12 w-full rounded-3xl" />
                              </div>
                           </div>
                           <Skeleton className="h-12 w-full rounded-3xl" />
                           <Skeleton className="h-12 w-full rounded-3xl" />
                           <Skeleton className="h-32 w-full rounded-3xl" />
                        </div>
                     </div>
                     <div className="flex flex-1 justify-end ">
                        <Skeleton className="h-12 w-28 rounded-3xl mt-7" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="hidden lg:block flex-grow">
            <Skeleton className="h-[600px] w-full rounded-3xl" />
         </div>
      </div>
   );
};
