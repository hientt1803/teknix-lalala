import { createSlice } from '@reduxjs/toolkit';

import { IPaymentMethod } from './type';

interface IPaymentSlice {
  activePayment: IPaymentMethod | null;
}

const initialState: IPaymentSlice = {
  activePayment: null,
};

export const PaymentSlice = createSlice({
  name: 'paymentSlice',
  initialState,
  reducers: {
    setActivePayment: (state, action) => {
      state.activePayment = action.payload;
    },
  },
});

export const { setActivePayment } = PaymentSlice.actions;

export default PaymentSlice.reducer;
