import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IGlobalSlice } from './type';

const initialState: IGlobalSlice = {
  searchGlobal: {
    location: {
      name: '',
      searchType: 'hotel',
      hotelId: '',
      regionId: 0,
      lat: 0,
      lon: 0,
      radius: 15_000,
      placeId: 1,
    },
    currency: {
      code: 'VND',
      name: 'Vietnamese Dong',
      symbol: '₫',
    },
    lang: {
      flags: {
        png: 'https://flagcdn.com/w320/vn.png',
        svg: 'https://flagcdn.com/vn.svg',
        alt: 'The flag of Vietnam features a large five-pointed yellow star on a red field.',
      },
      name: {
        common: 'Vietnam',
        official: 'Socialist Republic of Vietnam',
        nativeName: {
          vie: {
            official: 'Cộng hòa xã hội chủ nghĩa Việt Nam',
            common: 'Việt Nam',
          },
        },
      },
      cca2: 'VN',
      ccn3: '704',
      cca3: 'VNM',
    },
    dateRange: {
      startDate: '',
      endDate: '',
    },
    people: [
      {
        adults: 1,
        children: [],
      },
    ],
    memorizedData: {
      adults: 1,
      children: 0,
      rooms: 1,
    },
    filter: {
      listTagFilter: [],
      sortBy: [],
    },
    hotelSortBy: '',
    isCanSearch: true,
  },
};

export const GlobalSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: {
    setSearchGlobal: (state, action) => {
      state.searchGlobal = action.payload;
    },
    setSearchGlobalLocation: (
      state,
      action: {
        payload: {
          name: string;
          searchType: 'hotel' | 'region';
          hotelId?: string;
          regionId?: number;
          lat?: number;
          lon?: number;
          radius?: number;
          placeId?: number;
        };
      },
    ) => {
      state.searchGlobal.location = action.payload;
    },
    setSearchGlobalDateRange: (
      state,
      action: {
        payload: {
          startDate: string;
          endDate: string;
        };
      },
    ) => {
      const { startDate, endDate } = action.payload;
      state.searchGlobal.dateRange = {
        startDate: startDate,
        endDate: endDate,
      };
    },
    setSearchGlobalPeople: (state, action) => {
      state.searchGlobal.people = action.payload;
    },
    setSearchGlobalLanguage: (state, action) => {
      state.searchGlobal.lang = action.payload;
    },
    setSearchGlobalCurrency: (state, action) => {
      state.searchGlobal.currency = action.payload;
    },
    setSearchGlobalRadius: (state, action) => {
      state.searchGlobal.location.radius = action.payload;
    },
    setSearchGlobalHotelSortBy: (state, action) => {
      state.searchGlobal.hotelSortBy = action.payload;
    },
    setSearchGlobalFilterLisTag: (state, action) => {
      state.searchGlobal.filter.listTagFilter = action.payload;
    },
    setSearchGlobalFilterSortBy: (state, action) => {
      state.searchGlobal.filter.sortBy = action.payload;
    },
    setIsCanSearchGlobal: (state, action: PayloadAction<boolean>) => {
      state.searchGlobal.isCanSearch = action.payload;
    },
    setSearchGlobalLocationRadius: (
      state,
      action: {
        payload: {
          radius: number;
        };
      },
    ) => {
      state.searchGlobal.location.radius = action.payload.radius;
    },
    // memorized
    setMemorizeData: (
      state,
      action: {
        payload: { adults: any; children: any; rooms: any };
      },
    ) => {
      const { adults, children, rooms } = action.payload;
      state.searchGlobal.memorizedData = {
        adults,
        children,
        rooms,
      };
    },
  },
});

export const {
  setSearchGlobal,
  setSearchGlobalLocation,
  setSearchGlobalDateRange,
  setSearchGlobalPeople,
  setSearchGlobalCurrency,
  setSearchGlobalLanguage,
  setSearchGlobalRadius,
  setSearchGlobalFilterLisTag,
  setSearchGlobalFilterSortBy,
  setSearchGlobalHotelSortBy,
  setIsCanSearchGlobal,
  setMemorizeData,
  setSearchGlobalLocationRadius,
} = GlobalSlice.actions;

export default GlobalSlice.reducer;
