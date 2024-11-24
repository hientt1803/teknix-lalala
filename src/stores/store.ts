import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import storage from './ssr-safe-storage';

import { setupListeners } from '@reduxjs/toolkit/query';
import { GlobalSlice } from './features/global/global-slice';
import { UserApi, UserSlice } from './features/user';
import { StayAPI, StaySlice } from './features/stay';
import { ReviewAPI } from './features/review';
import { ReservationAPI, ReservationSlice } from './features/reservation';
import { PaymentAPI, PaymentSlice } from './features/payment';
import { RegionSlice } from './features/region';
import { OpenStreetMapAPI } from './features/openstreetmap';

// CONFIG
const persistConfig = {
   key: 'root',
   version: 1,
   storage,
   whitelist: [
      'globalSlice',
      'staySlice',
      'userSlice',
      'paymentSlice',
      'reservationSlice',
      'regionSlice',
   ],
};

// REDUCER
const rootReducer = combineReducers({
   [UserApi.reducerPath]: UserApi.reducer,
   [StayAPI.reducerPath]: StayAPI.reducer,
   [ReviewAPI.reducerPath]: ReviewAPI.reducer,
   [ReservationAPI.reducerPath]: ReservationAPI.reducer,
   [PaymentAPI.reducerPath]: PaymentAPI.reducer,
   [OpenStreetMapAPI.reducerPath]: OpenStreetMapAPI.reducer,

   userSlice: UserSlice.reducer,
   globalSlice: GlobalSlice.reducer,
   staySlice: StaySlice.reducer,
   paymentSlice: PaymentSlice.reducer,
   reservationSlice: ReservationSlice.reducer,
   regionSlice: RegionSlice.reducer,
});

// Middleware
// const middlewares = [, UserApi.middleware, SportCenterAPI.middleware];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat([
         UserApi.middleware,
         StayAPI.middleware,
         ReviewAPI.middleware,
         ReservationAPI.middleware,
         PaymentAPI.middleware,
         OpenStreetMapAPI.middleware,
      ]),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
