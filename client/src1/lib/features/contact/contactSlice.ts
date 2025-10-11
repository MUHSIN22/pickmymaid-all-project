import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBasicStateStructure } from '../../../types/features/basic.types';
import { saveContact } from './contactAction';

const initialState: IBasicStateStructure = {
  error: false,
  status: 'idle',
  loading: false,
  message: null
}


const contactSlice = createSlice({
  initialState,
  name: 'contactDetails',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveContact.pending, (state: IBasicStateStructure) => {
        state.loading = true;
        state.status = 'loading';
        state.error = false;
        state.message = null
      })
      .addCase(saveContact.fulfilled, (state: IBasicStateStructure, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.status = 'success';
        state.error = false;
        state.message = payload;
      })
      .addCase(saveContact.rejected, (state: IBasicStateStructure, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.status = 'error';
        state.error = true;
        state.message = payload.message;
      })
  }
})

export default contactSlice.reducer;