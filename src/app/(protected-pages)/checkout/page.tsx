import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

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
    <div className="container mx-auto space-y-8 py-16">
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
      </div>
      <div className="mt-5 h-full w-full">
        <Skeleton className="h-[12.5rem] w-full rounded-lg" />
      </div>
      <div className="relative mb-24 mt-11 flex flex-col-reverse lg:mb-32 lg:flex-row">
        <div className="w-full lg:w-3/5 lg:pr-10 xl:w-2/3">
          <div className="flex w-full flex-col space-y-8 border-neutral-200 px-0 dark:border-neutral-700 sm:rounded-2xl sm:border sm:p-6 xl:p-8">
            <Skeleton className="h-16 w-60" />
            <div className="border-b border-neutral-200 dark:border-neutral-700" />
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
                <div className="flex flex-1 justify-end">
                  <Skeleton className="mt-7 h-12 w-28 rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden flex-grow lg:block">
          <Skeleton className="h-[600px] w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
};
