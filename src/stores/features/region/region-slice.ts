import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRegion } from './type';

const initialState: IRegion = {
   id: 0,
   country_code: '',
   name: '',
   type: '',
};

export const RegionSlice = createSlice({
   name: 'regionSlice',
   initialState,
   reducers: {
      setRegion: (state, action: PayloadAction<IRegion>) => {
         state.id = action.payload.id;
         state.name = action.payload.name;
         state.country_code = action.payload.country_code;
         state.type = action.payload.type;
      },
   },
});

export const { setRegion } = RegionSlice.actions;

export default RegionSlice.reducer;
