import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { DialogSlice } from './features/dialog';
import { GlobalSlice } from './features/global/global-slice';
import { OpenStreetMapAPI } from './features/openstreetmap';
import { PaymentAPI, PaymentSlice } from './features/payment';
import { RegionSlice } from './features/region';
import { ReservationAPI, ReservationSlice } from './features/reservation';
import { ReviewAPI } from './features/review';
import { StayAPI, StaySlice } from './features/stay';
import { UserApi, UserSlice } from './features/user';
import storage from './ssr-safe-storage';

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
    'dialogSlice',
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
  dialogSlice: DialogSlice.reducer,
});

// Middleware
const middlewares = [
  UserApi.middleware,
  StayAPI.middleware,
  ReviewAPI.middleware,
  ReservationAPI.middleware,
  PaymentAPI.middleware,
  OpenStreetMapAPI.middleware,
];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
