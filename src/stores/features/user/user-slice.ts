import { createSlice } from '@reduxjs/toolkit';
import { endpoints } from './user-api';
import { User } from './type';
import { setCookie } from 'cookies-next';

interface IUserSlice {
   currentUser: User | undefined;
   access_token: string;
   refresh_token: string;
}

const initialState: IUserSlice = {
   currentUser: undefined,
   access_token: '',
   refresh_token: '',
};

export const UserSlice = createSlice({
   name: 'userSlice',
   reducers: {
      logOutUser: (state, action) => {
         state.currentUser = undefined;
         state.access_token = '';
         state.refresh_token = '';
      },
   },
   initialState,
   extraReducers(builder) {
      builder.addMatcher(endpoints.login.matchFulfilled, (state, action) => {
         const data = action.payload;
         state.access_token = data.access_token;
         state.refresh_token = data.refresh_token;

         // set Cookies
         setCookie('access_token', data.access_token, {
            maxAge: 24 * 60 * 60,
         });
      });
      builder.addMatcher(endpoints.getCurrentUser.matchFulfilled, (state, action) => {
         state.currentUser = action.payload;
      });
      builder.addMatcher(endpoints.register.matchFulfilled, (state, action) => {
         state.access_token = action.payload.access_token;
         state.refresh_token = action.payload.access_token;
      });
      builder.addMatcher(endpoints.logout.matchFulfilled, (state, action) => {
         state.currentUser = undefined;
         state.access_token = '';
      });
   },
});

export const { logOutUser } = UserSlice.actions;

export default UserSlice.reducer;
