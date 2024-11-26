'use client';

import { ChevronDown, User } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMediaQuery } from '@/hooks/use-media-query';

import dynamic from 'next/dynamic';

const GroupInputSelectDrawerContent = dynamic(
   () => import('./selectGuestContent').then((mod) => mod.GroupInputSelectDrawerContent),
   { loading: () => <div className="h-12 w-full bg-gray-200 animate-pulse" /> },
);

export const GroupPeopleInput = React.memo(() => {
   const matches = useMediaQuery('(min-width:768px)');
   const [opened, setOpened] = useState(false);
   const searchGlobalPeople = [
      {
         adults: 1,
         children: [],
      },
   ];

   const [listRoom, setListRoom] = useState<{ adults: number; children: number[] }[]>(
      searchGlobalPeople
         ? searchGlobalPeople.map((person) => ({
              adults: person.adults,
              children: person.children.length > 0 ? person.children : [],
           }))
         : [{ adults: 1, children: [] }],
   );

   useEffect(() => {
      if (!matches) {
         const params = new URLSearchParams(window.location.search);
         if (params.get('showSelectPeople') && params.get('fromChooseDateRange')) {
            setOpened(true);
         }
      }
   }, [matches]);

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
      setOpened(false);
   }, [matches]);

   return (
      <div>
         <Popover open={opened} onOpenChange={setOpened}>
            <PopoverTrigger asChild>
               <div className="flex justify-start items-center gap-2">
                  <User className="text-neutral-400 w-5 h-5" />
                  <Input
                     type="text"
                     placeholder="2 adults, 0 children"
                     className="placeholder:text-neutral-800 dark:placeholder:text-neutral-200 placeholder:font-medium min-w-[9.375rem] w-full shadow-none border-none outline-none focus:border-none focus:outline-none"
                     onClick={() => {
                        setOpened(true);
                     }}
                  />
                  {/* <ChevronDown className="text-black w-5 h-5" /> */}
               </div>
            </PopoverTrigger>
            <PopoverContent className="w-[25rem]">
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
