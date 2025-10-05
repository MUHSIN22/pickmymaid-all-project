import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IContactSliceState } from "../../types/features/contact.types";
import { getAllContactDetails } from "./contactSupportAction";
import { IContactSupport } from "../../types/pages/contactSupport/contactSupport.types";

const initialState: IContactSliceState = {
  error: false,
  loading: false,
  status: 'idle',
  message: null,
  contactDetails: null
}

const contactSlice = createSlice({
  initialState,
  name: 'contact',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContactDetails.pending, (state: IContactSliceState) => {
        state.loading = true;
        state.message = null;
        state.status = 'loading';
      })
      .addCase(getAllContactDetails.fulfilled, (state: IContactSliceState, { payload }: PayloadAction<IContactSupport[]>) => {
        state.loading = false;
        state.error = false;
        state.status = 'success';
        state.message = null;
        state.contactDetails = payload
      })
      .addCase(getAllContactDetails.rejected, (state: IContactSliceState) => {
        state.loading = false;
        state.message = null;
        state.status = 'error';
        state.error = true;
      })
  }
})

export default contactSlice.reducer;