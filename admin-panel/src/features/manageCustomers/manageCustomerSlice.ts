import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICustomerReturn, ICustomerState } from "../../types/features/manageCustomer.types";
import { getAllCustomers, toggleCustomerBlock, updateCustomerPassword } from "./manageCustomersAction";

const initialState: ICustomerState = {
  error: false,
  loading: false,
  status: 'idle',
  message: null,
  customers: null,
}

const customerSlice = createSlice({
  initialState,
  name: 'customers',
  reducers: {
    resetCustomerState: (state: ICustomerState) => {
      state.error = false;
      state.message = null;
      state.loading = false;
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, (state: ICustomerState) => {
        state.error = false;
        state.message = null;
        state.loading = true;
        state.status = 'loading'
      })
      .addCase(getAllCustomers.fulfilled, (state: ICustomerState, { payload }: PayloadAction<ICustomerReturn[]>) => {
        state.error = false;
        state.message = null;
        state.loading = false;
        state.status = 'success';
        state.customers = payload
      })
      .addCase(getAllCustomers.rejected, (state: ICustomerState, { payload }: PayloadAction<any>) => {
        state.error = true;
        state.message = payload.message;
        state.loading = false;
        state.status = 'error';
      })


      .addCase(updateCustomerPassword.pending, (state: ICustomerState) => {
        state.error = false;
        state.message = null;
        state.loading = true;
        state.status = 'loading'
      })
      .addCase(updateCustomerPassword.fulfilled, (state: ICustomerState, { payload }: PayloadAction<string>) => {
        state.error = false;
        state.message = `Password updated and copied to your clipboard. ${payload}`;
        state.loading = false;
        state.status = 'success';
        navigator.clipboard.writeText(payload)
      })
      .addCase(updateCustomerPassword.rejected, (state: ICustomerState, { payload }: PayloadAction<any>) => {
        state.error = true;
        state.message = payload.message;
        state.loading = false;
        state.status = 'error';
      })

      .addCase(toggleCustomerBlock.pending, (state: ICustomerState) => {
        state.error = false;
        state.message = null;
        state.loading = true;
        state.status = 'loading'
      })
      .addCase(toggleCustomerBlock.fulfilled, (state: ICustomerState) => {
        state.error = false;
        state.message = `Blocked the user successfully!`;
        state.loading = false;
        state.status = 'success';
      })
      .addCase(toggleCustomerBlock.rejected, (state: ICustomerState, { payload }: PayloadAction<any>) => {
        state.error = true;
        state.message = payload.message;
        state.loading = false;
        state.status = 'error';
      })
  }
})


export const {resetCustomerState} = customerSlice.actions;
export default customerSlice.reducer;