'use client';

import { User } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMediaQuery } from '@/hooks/use-media-query';
import { setSearchGlobalPeople } from '@/stores/features/global/global-slice';
import { useAppSelector } from '@/stores/hook';

const GroupInputSelectDrawerContent = dynamic(
  () =>
    import('./selectGuestContent').then(
      module_ => module_.GroupInputSelectDrawerContent,
    ),
  { loading: () => <div className="h-12 w-full animate-pulse bg-gray-200" /> },
);

export const GroupPeopleInput = React.memo(() => {
  // Redux
  const searchGlobal = useAppSelector(state => state.globalSlice.searchGlobal);
  const dispatch = useDispatch();

  // State
  const [opened, setOpened] = useState(false);
  const [listRoom, setListRoom] = useState<
    { adults: number; children: number[] }[]
  >(
    searchGlobal.people[0]
      ? searchGlobal.people.map(person => ({
          adults: person.adults,
          children:
            person.children.length > 0
              ? person.children.map(child => child)
              : [],
        }))
      : [
          {
            adults: 1,
            children: [],
          },
        ],
  );

  // Hooks
  const matches = useMediaQuery('(min-width:768px)');

  // Logic
  const handleStorePeopleToStorage = useCallback(() => {
    const newPeople = listRoom.map(room => ({
      adults: room.adults,
      children: room.children.map(Number),
    }));

    console.log(newPeople);

    dispatch(setSearchGlobalPeople(newPeople));
  }, [dispatch, listRoom]);

  const handleOnChangeChildren = useCallback(
    (roomIndex: number, value: string | null) => {
      if (value) {
        setListRoom(previous =>
          previous.map((room, index) =>
            index === roomIndex
              ? { ...room, children: [...room.children, Number(value)] }
              : room,
          ),
        );
      }
    },
    [],
  );

  const handleDeleteChildren = useCallback(
    (roomIndex: number, value: number) => {
      setListRoom(previous =>
        previous.map((room, index) =>
          index === roomIndex
            ? { ...room, children: room.children.filter(age => age !== value) }
            : room,
        ),
      );
    },
    [],
  );

  const addNewRoom = useCallback(() => {
    setListRoom(previous => [...previous, { adults: 1, children: [] }]);
  }, []);

  const deleteRoom = useCallback(
    (roomIndex: number) => {
      if (listRoom.length > 1) {
        setListRoom(previous =>
          previous.filter((_, index) => index !== roomIndex),
        );
      }
    },
    [listRoom.length],
  );

  const handleOnChangeAdults = useCallback(
    (value: number, roomIndex: number) => {
      setListRoom(previous =>
        previous.map((room, index) =>
          index === roomIndex ? { ...room, adults: value } : room,
        ),
      );
    },
    [],
  );

  const handleCloseInputSelect = useCallback(() => {
    if (!matches) {
      const params = new URLSearchParams(globalThis.location.search);
      params.delete('showSelectPeople');
      params.delete('fromChooseDateRange');
      const newUrl = `${globalThis.location.pathname}?${params.toString()}`;
      globalThis.history.replaceState(null, document.title, newUrl);
    }
    handleStorePeopleToStorage();
    setOpened(false);
  }, [handleStorePeopleToStorage, matches]);

  const totalAdults = useMemo(() => {
    let total = 0;
    listRoom.forEach(room => {
      total += room.adults;
    });
    return total;
  }, [listRoom]);

  const totalChildren = useMemo(() => {
    let total = 0;
    listRoom.forEach(room => {
      total += room.children.length;
    });
    return total;
  }, [listRoom]);

  const inputPlaceHolderValue = `${totalAdults} adult${
    totalAdults > 1 ? 's' : ''
  } · ${totalChildren || 0} children${totalChildren > 1 ? 's' : ''} · ${
    listRoom.length
  } room${listRoom.length > 1 ? 's' : ''}`;

  return (
    <Popover open={opened} onOpenChange={setOpened}>
      <PopoverTrigger
        onClick={() => {
          setOpened(true);
        }}
        asChild
      >
        <div className="flex items-center justify-start gap-2">
          <User className="h-5 w-5 text-neutral-400" />
          <span className="line-clamp-1 w-full min-w-[9.375rem] text-sm font-medium text-neutral-700 dark:text-neutral-50">
            {inputPlaceHolderValue}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={e => {
          e.preventDefault();
        }}
        onCloseAutoFocus={e => {
          e.preventDefault();
          handleStorePeopleToStorage();
        }}
        className="w-[25rem]"
      >
        <GroupInputSelectDrawerContent
          listRoom={listRoom}
          handleDeleteChildren={handleDeleteChildren}
          handleOnChangeChildren={handleOnChangeChildren}
          handleOnChangeAdults={handleOnChangeAdults}
          close={handleCloseInputSelect}
          open={() => setOpened(true)}
          addNewRoom={addNewRoom}
          deleteRoom={deleteRoom}
        />
      </PopoverContent>
    </Popover>
  );
});

GroupPeopleInput.displayName = 'GroupPeopleInput';
