import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPayment, IPaymentState } from "../../types/features/payment.types";
import { getPayments, verifyPayment } from "./paymentsAction";

const initialState: IPaymentState = {
  error: false,
  loading: false,
  status: 'idle',
  message: null,
  paymentsList: null
}

const paymentSlice = createSlice({
  initialState,
  name: 'payment',
  reducers: {
    resetPayment: (state: IPaymentState) => {
      state.error = false;
      state.loading = false;
      state.message = null;
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayments.fulfilled, (state: IPaymentState, { payload }: PayloadAction<IPayment[]>) => {
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = null;
        state.paymentsList = payload;
      })
      .addCase(getPayments.pending, (state: IPaymentState) => {
        state.error = false;
        state.loading = true;
        state.status = 'loading'
      })
      .addCase(getPayments.rejected, (state: IPaymentState, { payload }: PayloadAction<any>) => {
        state.error = true;
        state.loading = false;
        state.status = 'error';
        state.message = payload.message;
      })

      .addCase(verifyPayment.fulfilled, (state: IPaymentState, { payload }: PayloadAction<string>) => {
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = payload;
      })
      .addCase(verifyPayment.pending, (state: IPaymentState) => {
        state.error = false;
        state.loading = true;
        state.status = 'loading'
      })
      .addCase(verifyPayment.rejected, (state: IPaymentState, { payload }: PayloadAction<any>) => {
        state.error = true;
        state.loading = false;
        state.status = 'error';
        state.message = payload.message;
      })
  }
})

export const {resetPayment} = paymentSlice.actions;
export default paymentSlice.reducer;