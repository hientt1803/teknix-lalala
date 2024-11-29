import { createSlice } from '@reduxjs/toolkit';
import { endpoints } from './reservation-api';
import { IReservationSlice } from './type';

const initialState: IReservationSlice = {
   currentReservation: {
      id: '',
      user_created: '',
      date_created: '',
      user_updated: {},
      date_updated: {},
      hotel_id: '',
      room_id: '',
      checkin_date: '',
      checkout_date: '',
      num_guests: 0,

      meta_data: {
         additional: {
            is_renting_car: false,
         },
         arrival_time: '',
         booking_details: {
            country: '',
            email: '',
            first_name: '',
            last_name: '',
         },
         is_main_guest: false,
         is_trip_booking: false,
      },
      special_request: {},
      status: '',
      coupon_code: '',
      match_hash: '',
      payment_method: '',
      total_price: 0,
      base_price: 0,
      total_discount: 0,
      meal_data: '',
      book_hash: '',
      is_expired: {},
      payment_id: {},
      payment_link: {},
      rate_meta_data: {
         allotment: 0,
         amenities_data: [],
         any_residency: false,
         book_hash: '',
         daily_prices: [],
         deposit: {},
         match_hash: '',
         meal: '',
         meal_data: null,
         no_show: {
            amount: '',
            currency_code: '',
            from_time: '',
         },
         payment_options: {
            payment_types: [],
         },
         rg_ext: {
            balcony: 0,
            bathroom: 0,
            bedding: 0,
            bedrooms: 0,
            capacity: 0,
            class: 0,
            club: 0,
            family: 0,
            floor: 0,
            quality: 0,
            sex: 0,
            view: 0,
         },
         room_data_trans: {
            bathroom: undefined,
            bedding_type: undefined,
            main_name: '',
            main_room_type: '',
            misc_room_type: undefined,
         },
         room_name: '',
         room_name_info: {},
         sell_price_limits: {},
         serp_filters: [],
      },
   },
};

export const ReservationSlice = createSlice({
   name: 'reservationSlice',
   initialState,
   reducers: {
      cleartReservationInfor: (state) => {
         state.currentReservation = initialState.currentReservation;
      },
   },
   extraReducers(builder) {
      builder.addMatcher(endpoints.createReservation.matchFulfilled, (state, action) => {
         state.currentReservation = action.payload;
      });
      builder.addMatcher(endpoints.getReservationById.matchFulfilled, (state, action) => {
         state.currentReservation = action.payload;
      });
      builder.addMatcher(endpoints.applyCoupon.matchFulfilled, (state, action) => {
         state.currentReservation = action.payload;
      });
   },
});

export const { cleartReservationInfor } = ReservationSlice.actions;

export default ReservationSlice.reducer;
