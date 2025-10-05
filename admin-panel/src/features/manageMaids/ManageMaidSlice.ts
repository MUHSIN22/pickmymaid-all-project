import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMaidData,
  fetchMaidDataById,
  submitMaidData,
  updateMaidData,
} from './ManageMaidActions';

const initialState = {
  maids: [],
  maid: null,
  error: false,
  loading: false,
  status: 'idle',
  message: '',
  success: false,
};

const manageMaid = createSlice({
  name: 'manageMaid',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMaidData.fulfilled, (state, action) => {
        state.error = false;
        state.maids = action.payload.data;
        state.message = action.payload.message;
        state.loading = false;
        state.status = 'success';
      })
      .addCase(fetchMaidData.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchMaidData.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.status = 'error';
      })

      .addCase(submitMaidData.fulfilled, (state, action) => {
        state.error = false;
        state.message = action.payload.message;
        state.loading = false;
        state.success = true;
      })
      .addCase(submitMaidData.pending, (state) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.status = 'loading';
      })
      .addCase(submitMaidData.rejected, (state) => {
        state.error = true;
        state.success = false;
        state.loading = false;
        state.status = 'error';
      })

      .addCase(fetchMaidDataById.fulfilled, (state, action) => {
        state.error = false;
        state.message = action.payload.message;
        state.loading = false;
        state.maid = action.payload.data;
      })
      .addCase(fetchMaidDataById.pending, (state) => {
        state.error = false;
        state.loading = false;
        state.status = 'loading';
      })
      .addCase(fetchMaidDataById.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.status = 'error';
      })

      .addCase(updateMaidData.fulfilled, (state, action) => {
        state.error = false;
        state.message = action.payload.message;
        state.loading = false;
        state.success = true;
      })
      .addCase(updateMaidData.pending, (state) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.status = 'loading';
      })
      .addCase(updateMaidData.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.success = false;
        state.status = 'error';
      });
  },
});
export const { resetSuccess } = manageMaid.actions;
export default manageMaid.reducer;
