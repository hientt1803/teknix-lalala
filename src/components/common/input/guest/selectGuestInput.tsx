'use client';

import { User } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMediaQuery } from '@/hooks/use-media-query';

import { setSearchGlobalPeople } from '@/stores/features/global/global-slice';
import { useAppSelector } from '@/stores/hook';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';

const GroupInputSelectDrawerContent = dynamic(
   () => import('./selectGuestContent').then((mod) => mod.GroupInputSelectDrawerContent),
   { loading: () => <div className="h-12 w-full bg-gray-200 animate-pulse" /> },
);

export const GroupPeopleInput = React.memo(() => {
   // Redux
   const searchGlobal = useAppSelector((state) => state.globalSlice.searchGlobal);
   const dispatch = useDispatch();

   // State
   const [opened, setOpened] = useState(false);
   const [listRoom, setListRoom] = useState<{ adults: number; children: number[] }[]>(
      searchGlobal.people[0]
         ? searchGlobal.people.map((person) => ({
              adults: person.adults,
              children: person.children.length > 0 ? person.children.map((child) => child) : [],
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
   // useEffect(() => {
   //    if (!matches) {
   //       const params = new URLSearchParams(window.location.search);
   //       if (params.get('showSelectPeople') && params.get('fromChooseDateRange')) {
   //          setOpened(true);
   //       }
   //    }
   // }, [matches]);

   const handleStorePeopleToStorage = useCallback(() => {
      const newPeople = listRoom.map((room) => ({
         adults: room.adults,
         children: room.children.map(Number),
      }));

      console.log(newPeople);

      dispatch(setSearchGlobalPeople(newPeople));
   }, [dispatch, listRoom]);

   const handleOnChangeChildren = useCallback((roomIndex: number, value: string | null) => {
      if (value) {
         setListRoom((prev) =>
            prev.map((room, index) =>
               index === roomIndex
                  ? { ...room, children: [...room.children, Number(value)] }
                  : room,
            ),
         );
      }
   }, []);

   const handleDeleteChildren = useCallback((roomIndex: number, value: number) => {
      setListRoom((prev) =>
         prev.map((room, index) =>
            index === roomIndex
               ? { ...room, children: room.children.filter((age) => age !== value) }
               : room,
         ),
      );
   }, []);

   const addNewRoom = useCallback(() => {
      setListRoom((prev) => [...prev, { adults: 1, children: [] }]);
   }, []);

   const deleteRoom = useCallback(
      (roomIndex: number) => {
         if (listRoom.length > 1) {
            setListRoom((prev) => prev.filter((_, index) => index !== roomIndex));
         }
      },
      [listRoom.length],
   );

   const handleOnChangeAdults = useCallback((value: number, roomIndex: number) => {
      setListRoom((prev) =>
         prev.map((room, index) => (index === roomIndex ? { ...room, adults: value } : room)),
      );
   }, []);

   const handleCloseInputSelect = useCallback(() => {
      if (!matches) {
         const params = new URLSearchParams(window.location.search);
         params.delete('showSelectPeople');
         params.delete('fromChooseDateRange');
         const newUrl = `${window.location.pathname}?${params.toString()}`;
         window.history.replaceState(null, document.title, newUrl);
      }
      handleStorePeopleToStorage()
      setOpened(false);
   }, [handleStorePeopleToStorage, matches]);

   const totalAdults = useMemo(() => {
      let total = 0;
      listRoom.forEach((room) => {
         total += room.adults;
      });
      return total;
   }, [listRoom]);

   const totalChildren = useMemo(() => {
      let total = 0;
      listRoom.forEach((room) => {
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
      <div>
         <Popover
            open={opened}
            onOpenChange={(isOpen) => {
               setOpened(isOpen);
               if (isOpen == false) {
                  handleStorePeopleToStorage();
               }
            }}
         >
            <PopoverTrigger
               onClick={() => {
                  setOpened(true);
               }}
               asChild
            >
               <div className="flex justify-start items-center gap-2">
                  <User className="text-neutral-400 w-5 h-5" />
                  <span className="min-w-[9.375rem] w-full text-sm text-neutral-700 font-medium line-clamp-1">
                     {inputPlaceHolderValue}
                  </span>
               </div>
            </PopoverTrigger>
            <PopoverContent
               onOpenAutoFocus={(e) => {
                  e.preventDefault();
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

         {/* <Drawer open={opened} onClose={handleCloseInputSelect}>
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
            </Drawer> */}
      </div>
   );
});

GroupPeopleInput.displayName = 'GroupPeopleInput';
