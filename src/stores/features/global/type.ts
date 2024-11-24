import { CurrencyType } from '@/components/common/header/currency';
import { CountryType } from '@/components/common/header/languages';

export interface ISearchGlobal {
   location: {
      name: string;
      searchType: 'hotel' | 'region';
      hotelId?: string;
      regionId?: number;
      lat: number;
      lon: number;
      radius?: number;
   };
   lang: CountryType;
   currency: CurrencyType;
   dateRange: {
      startDate: string;
      endDate: string;
   };
   people: {
      adults: number;
      children: number[];
   }[];
   memorizedData: {
      adults: number;
      children: number;
      rooms: number;
   };
   filter: {
      listTagFilter: {
         id: number;
         title: string;
         value: number;
         count: number;
         active: boolean;
      }[];
      sortBy: {
         id: number;
         label: string;
         type: string;
         value: string;
         active: boolean;
      }[];
   };
   hotelSortBy: string;
   isCanSearch: boolean;
}

// ************** Global slice **************
export interface IGlobalSlice {
   searchGlobal: ISearchGlobal;
}
