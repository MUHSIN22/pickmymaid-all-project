import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPaymentState, IPaymentStatusReturn } from '../../../types/features/payment/payment.types';
import { generatePaymentLink, getUserPaymentDetails, verifySubscription } from './paymentAction';

const initialState: IPaymentState = {
  error: false,
  loading: false,
  message: null,
  status: 'idle',
  paymentLink: null,
  paymentDetails: null,
  selectedType: null,
}

const paymentSlice = createSlice({
  initialState,
  name: 'payment',
  reducers: {
    resetState: (state: IPaymentState) => {
      state.error = false;
      state.loading = false;
      state.status = 'idle';
      state.message = null;
    },
    resetPaymentLink: (state: IPaymentState) => {
      state.paymentLink = null;
      state.error = false;
      state.loading = false;
      state.status = 'idle'
    },
    resetPaymentDetails: (state: IPaymentState) => {
      state.paymentDetails = null;
    },
    setPaymentTypeSelected: (state: IPaymentState, { payload }: PayloadAction<number>) => {
      state.selectedType = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generatePaymentLink.pending, (state: IPaymentState) => {
        state.error = false;
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(generatePaymentLink.fulfilled, (state: IPaymentState, { payload }: PayloadAction<string>) => {
        state.error = false;
        state.status = 'success';
        state.loading = false;
        state.paymentLink = payload
      })
      .addCase(generatePaymentLink.rejected, (state: IPaymentState, { payload }: PayloadAction<any>) => {
        state.error = true;
        state.status = 'error';
        state.loading = false;
        state.message = payload?.message;
      });

    builder
      .addCase(verifySubscription.pending, (state: IPaymentState) => {
        state.error = false;
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(verifySubscription.fulfilled, (state: IPaymentState, { payload }: PayloadAction<IPaymentStatusReturn>) => {
        state.error = false;
        state.status = 'success';
        state.loading = false;
        state.paymentDetails = payload;
      })
      .addCase(verifySubscription.rejected, (state: IPaymentState, { payload }: PayloadAction<any>) => {
        state.error = true;
        state.status = 'error';
        state.loading = false;
        state.message = payload?.message;
      });

    builder
      .addCase(getUserPaymentDetails.pending, (state: IPaymentState) => {
        state.error = false;
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getUserPaymentDetails.fulfilled, (state: IPaymentState, { payload }: PayloadAction<IPaymentStatusReturn>) => {
        state.error = false;
        state.status = 'success';
        state.loading = false;
        state.paymentDetails = payload;
      })
      .addCase(getUserPaymentDetails.rejected, (state: IPaymentState) => {
        state.error = true;
        state.status = 'error';
        state.loading = false;
        state.paymentDetails = null;
      })
  }
});

export const { resetPaymentLink, resetState, setPaymentTypeSelected, resetPaymentDetails } = paymentSlice.actions;
export default paymentSlice.reducer;