import { createSlice } from '@reduxjs/toolkit';
import { endpoints } from './stay-api';
import { IHotelSlice } from './type';

const initialState: IHotelSlice = {
   listHotelSearch: {
      hotels: [],
      regions: [],
   },
   hotels: {
      hotels: [],
      ids: [''],
      map_hotels: [],
   },
   activeHotel: {
      hotels: [],
      ids: '',
      map_hotels: [],
   },
   reserveForm: {
      hotel_id: '',
      room_id: '',
      checkin_date: '',
      checkout_date: '',
      book_hash: '',
      match_hash: '',
      num_guests: 0,
      rate: undefined,
      meta_data: {
         additional: {
            is_renting_car: false,
         },
         is_trip_booking: false,
         booking_details: {
            country: 'VN',
            first_name: '',
            last_name: '',
            email: '',
         },
         arrival_time: '',
         is_main_guest: true,
      },
      coupon_code: '',
   },
   isTriggerGlobal: false,
   isTriggerRoomSearch: false,
};

export const StaySlice = createSlice({
   name: 'staySlice',
   initialState,
   reducers: {
      setHotels: (state, action) => {
         state.hotels = action.payload;
      },
      setHotelSearch: (state, action) => {
         state.listHotelSearch = action.payload;
      },
      setReserveForm: (state, action) => {
         state.reserveForm = action.payload;
      },
      setTriggerSearch: (state, action) => {
         state.isTriggerGlobal = action.payload;
      },
      setTriggerRoomSearch: (state, action) => {
         state.isTriggerRoomSearch = action.payload;
      },
   },
   extraReducers(builder) {
      builder.addMatcher(
         endpoints.getListHoteStayByLocationKeyWord.matchFulfilled,
         (state, action) => {
            state.listHotelSearch = action.payload;
         },
      );
      builder.addMatcher(
         endpoints.getListHotelByGeoSearchEngine.matchFulfilled,
         (state, action) => {
            // state.hotels = action.payload;
            state.isTriggerGlobal = false;
         },
      );
      builder.addMatcher(endpoints.getListHotelByGeoSearchEngine.matchRejected, (state, action) => {
         state.isTriggerGlobal = false;
      });
      builder.addMatcher(endpoints.getRoomActiveByHotelId.matchFulfilled, (state, action) => {
         // state.hotels = action.payload;
         state.isTriggerRoomSearch = false;
      });
      builder.addMatcher(endpoints.getRoomActiveByHotelId.matchRejected, (state, action) => {
         state.isTriggerRoomSearch = false;
      });
      // builder.addMatcher(
      //   endpoints.getHotelByHotelId.matchFulfilled,
      //   (state, action) => {
      //     state.activeHotel = action.payload;
      //   }
      // );
      // builder.addMatcher(
      //   endpoints?.getHotelByHotelId.matchFulfilled,
      //   (state, action) => {
      //     state.isTriggerSearchHotelStart = false;
      //   }
      // );
      // builder.addMatcher(
      //   endpoints?.getHotelByHotelId.matchRejected,
      //   (state, action) => {
      //     state.isTriggerSearchHotelStart = false;
      //   }
      // );
   },
});

export const { setHotels, setHotelSearch, setReserveForm, setTriggerSearch, setTriggerRoomSearch } =
   StaySlice.actions;

export default StaySlice.reducer;
