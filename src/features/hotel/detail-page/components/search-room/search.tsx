import { useCallback, useEffect, useMemo, useState } from 'react';
import GuestSearch from './guest-search';
import TimeSearch from './time-search';
import { useAppSelector } from '@/stores';
import { formatDate, isEqual, toDate } from 'date-fns';
import { useDispatch } from 'react-redux';
import {
   setSearchGlobalDateRange,
   setSearchGlobalPeople,
} from '@/stores/features/global/global-slice';
import { DateRange } from 'react-day-picker';
import { isEqualObjects } from '@/utilities/comparator';

type Props = {
   isLoading: boolean;
   isFetching: boolean;
};

const SearchRoomComnponent = ({ isFetching, isLoading }: Props) => {
   const dispatch = useDispatch();
   const searchGlobal = useAppSelector((state) => state.globalSlice.searchGlobal);

   const [date, setDate] = useState<DateRange | undefined>();
   const [dateUpdate, setDateUpdate] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(),
   });
   const [people, setPeople] = useState<{ adults: number; children: number[] }[]>();
   const [updatePeople, setUpdatePeople] = useState<{ adults: number; children: number[] }[]>();
   const totalAdults = useMemo(() => {
      let total = 0;
      updatePeople?.forEach((room) => {
         total += room.adults;
      });
      return total;
   }, [updatePeople]);

   const totalChildren = useMemo(() => {
      let total = 0;
      updatePeople?.forEach((room) => {
         total += room.children.length;
      });
      return total;
   }, [updatePeople]);

   // const totalDay = useMemo(() => {
   //     let total = countTotalDaysInRange(
   //         formatDate((dateUpdate && dateUpdate.from) || new Date(), "yyyy-MM-dd"),
   //         formatDate((dateUpdate && dateUpdate.to) || new Date(), "yyyy-MM-dd")
   //     );
   //     return total;
   // }, [dateUpdate]);

   const isChange = useMemo(() => !isEqualObjects(people, updatePeople), [updatePeople, people]);

   const isChangeDate = useMemo(() => {
      // Check if both date arrays are defined
      if (date && dateUpdate) {
         // Return true if any date is null or if they are not equal
         return (
            date.from === null ||
            dateUpdate.from === null ||
            date.to === null ||
            dateUpdate.to === null ||
            !isEqual(date.from || '', dateUpdate.from || '') ||
            !isEqual(date.to || '', dateUpdate.to || '')
         );
      }
      // If either date array is null or undefined, return true (indicating a change)
      return false;
   }, [date, dateUpdate]);

   const handleSearchChange = useCallback(() => {
      if (isChange || isChangeDate) {
         // Dispatch actions to update the state
         if (updatePeople) {
            dispatch(setSearchGlobalPeople(updatePeople));
         }
         if (dateUpdate?.from && dateUpdate.to) {
            dispatch(
               setSearchGlobalDateRange({
                  startDate: formatDate(dateUpdate.from, 'yyyy-MM-dd'),
                  endDate: formatDate(dateUpdate.to, 'yyyy-MM-dd'),
               }),
            );
         }
      }

      // Use a timeout to simulate a delay for loading state
      setPeople(updatePeople);
      setDate(dateUpdate);
   }, [dispatch, isChange, isChangeDate, updatePeople, dateUpdate]);

   useEffect(() => {
      // First rendering
      if (searchGlobal) {
         setPeople(searchGlobal.people);
         setUpdatePeople(searchGlobal.people);
         setDate({
            from: toDate(searchGlobal.dateRange.startDate),
            to: toDate(searchGlobal.dateRange.endDate),
         });
         setDateUpdate({
            from: toDate(searchGlobal.dateRange.startDate || new Date().toDateString()),
            to: toDate(searchGlobal.dateRange.endDate || new Date().toDateString()),
         });
      }
   }, []);

   return (
      <form className="flex flex-col sm:flex-row justify-between border border-neutral-200 rounded-3xl my-5">
         <TimeSearch date={dateUpdate} setDate={setDateUpdate} />
         <div className="border-b sm:border-r border-neutral-200 " />
         <GuestSearch
            isChange={isChange || isChangeDate}
            totalAdults={totalAdults}
            totalChildrens={totalChildren}
            updatePeople={updatePeople}
            setUpdatePeople={setUpdatePeople}
            handleSearchChange={handleSearchChange}
            isLoading={isLoading}
            isFetching={isFetching}
         />
      </form>
   );
};

export default SearchRoomComnponent;
