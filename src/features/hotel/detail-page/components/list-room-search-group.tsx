import dynamic from 'next/dynamic';
import React from 'react';

const SearchGroup = dynamic(() =>
  import('@/components/common/searchGroup/searchGroup').then(
    mob => mob.SearchGroup,
  ),
);

export const ListRoomSearchGroup = () => {
  return (
    <div className="mb-5">
      <SearchGroup
        showLocation={false}
        isFromHotelDetail
        tabWrapperClassname="shadow-none p-0"
        tabContentClassname="flex !justify-start !items-center !gap-1 w-fit rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 py-1 px-3"
        showLabel={false}
        buttonClassname="rounded-2xl py-4 px-5"
      />
    </div>
  );
};
