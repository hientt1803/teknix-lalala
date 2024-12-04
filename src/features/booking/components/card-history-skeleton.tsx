import { Skeleton } from '@/components/ui/skeleton';

const CardHistorySkeleton = ({ length }: { length: number }) => {
  return (
    <div className="grid grid-cols-1 gap-4 pt-4">
      {[...new Array(length)].map((_, index) => (
        <div
          key={index}
          className="relative grid cursor-pointer grid-cols-1 overflow-hidden rounded-3xl border border-neutral-200 hover:shadow-xl md:flex md:flex-row"
        >
          <div className="absolute right-4 top-4">
            {/* Badge skeleton */}
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="relative w-full flex-shrink-0 md:w-72">
            <div className="block h-64 w-full md:h-full">
              {/* Image skeleton */}
              <Skeleton className="h-full w-full animate-pulse bg-neutral-200" />
            </div>
          </div>
          <div className="flex flex-grow flex-col p-3 sm:p-5">
            <div className="space-y-2">
              {/* Room name skeleton */}
              <Skeleton className="h-4 w-36 animate-pulse bg-neutral-200" />
              <div className="flex items-center space-x-2">
                {/* Hotel name skeleton */}
                <Skeleton className="h-6 w-64 animate-pulse bg-neutral-200" />
              </div>
              <div className="text-sm text-neutral-500">
                <div className="flex w-full flex-col justify-between md:flex-row">
                  <div className="flex">
                    <div className="flex flex-shrink-0 flex-col items-center py-2">
                      {/* Check-in and Check-out timeline skeleton */}
                      <Skeleton className="h-3 w-3 animate-pulse rounded-full bg-neutral-200" />
                      <Skeleton className="h-10 w-px animate-pulse bg-neutral-200" />
                      <Skeleton className="h-3 w-3 animate-pulse rounded-full bg-neutral-200" />
                    </div>
                    <div className="ml-4 space-y-5 text-sm">
                      <div className="flex flex-col space-y-1">
                        {/* Check-in date skeleton */}
                        <Skeleton className="h-3.5 w-24 animate-pulse bg-neutral-200" />
                        <Skeleton className="h-4 w-12 animate-pulse bg-neutral-200" />
                      </div>
                      <div className="flex flex-col space-y-1">
                        {/* Check-out date skeleton */}
                        <Skeleton className="h-3.5 w-24 animate-pulse bg-neutral-200" />
                        <Skeleton className="h-4 w-12 animate-pulse bg-neutral-200" />
                      </div>
                    </div>
                  </div>
                  <div className="border-r border-dashed border-neutral-300" />
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-3 text-neutral-500">
                      {/* Guests icon and skeleton */}
                      <Skeleton className="h-4 w-4 animate-pulse rounded-full bg-neutral-200" />
                      <Skeleton className="h-4 w-12 animate-pulse bg-neutral-200" />
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-500">
                      {/* Total price skeleton */}
                      <Skeleton className="h-4 w-4 animate-pulse rounded-full bg-neutral-200" />
                      <Skeleton className="h-4 w-12 animate-pulse bg-neutral-200" />
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-500">
                      {/* Total price skeleton */}
                      <Skeleton className="h-4 w-4 animate-pulse rounded-full bg-neutral-200" />
                      <Skeleton className="h-4 w-12 animate-pulse bg-neutral-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4 w-14 border-b border-neutral-100" />

            <div className="flex items-end justify-between">
              {/* Star rating skeleton */}
              <div className="flex items-center space-x-1 text-sm">
                <Skeleton className="h-5 w-5 animate-pulse rounded-full bg-neutral-200" />
                <Skeleton className="h-5 w-5 animate-pulse bg-neutral-200" />
                <Skeleton className="h-4 w-5 animate-pulse bg-neutral-200" />
              </div>
              {/* Button skeleton */}
              <Skeleton className="h-11 w-28 animate-pulse rounded-lg bg-neutral-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardHistorySkeleton;
