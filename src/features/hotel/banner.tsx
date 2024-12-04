import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

import Bounded from '@/components/common/containers/bounded';
import { Skeleton } from '@/components/ui/skeleton';

const SearchGroup = dynamic(() =>
  import('@/components/common/searchGroup/searchGroup').then(
    module_ => module_.SearchGroup,
  ),
);

export const HotelBanner = async () => {
  const cookieStore = await cookies();
  const locationSearch =
    cookieStore.get('locationSearch')?.value || 'Top destinations';
  const locationImage =
    cookieStore.get('locationImage')?.value ||
    '/assets/images/hotel/banner-2.png';

  return (
    <div
      className="relative z-[0] mb-6 mt-2 block h-full w-full overflow-hidden bg-cover bg-center object-cover py-4 2xl:py-16"
      style={{ backgroundImage: `url(${locationImage})` }}
    >
      <Bounded>
        <div className="z-20 flex h-full w-full items-center justify-center">
          <div className="flex w-full min-w-[90%] max-w-[90%] flex-col items-center justify-center gap-10">
            <div className="mt-24 text-center text-5xl font-bold text-neutral-100">
              Journey with Lalala - Begin Your Story!
            </div>
            <h5 className="-mt-5 text-center text-2xl font-medium text-neutral-200">
              {locationSearch ? (
                <span>
                  Discover top-rated hotels in{' '}
                  <strong>{`"${locationSearch}"`}</strong>, offering comfort,
                  great locations, and exceptional service.
                </span>
              ) : (
                'Easily search for top hotels offered by our professional network'
              )}
            </h5>
          </div>
        </div>
        <div className="my-20 w-full">
          <SearchGroup
            className="!static !block w-full"
            tabWrapperClassname="p-5"
          />
        </div>
      </Bounded>
      <div className="absolute inset-0 z-[-1] bg-black/60" />
    </div>
  );
};

export const HotelBannerSkeleton = () => {
  return (
    <div className="relative mb-6 mt-2 h-full w-full overflow-hidden rounded-lg bg-cover bg-center object-cover">
      <div className="flex h-full w-full items-center justify-center bg-black/50">
        <div className="flex w-full min-w-[90%] max-w-[90%] flex-col items-center justify-center gap-10">
          <Skeleton className="h-10 w-full rounded-md" />
          <div className="mb-28">
            {/* <SearchGroup className="!block!static w-full" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
