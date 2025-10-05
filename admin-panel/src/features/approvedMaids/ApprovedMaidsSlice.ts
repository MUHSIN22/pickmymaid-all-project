import { createSlice } from '@reduxjs/toolkit';
import {
  deleteJobApplications,
  fetchApprovedMaids,
} from './AprovedMaidsAction';

const initialState = {
  maids: [],
  error: false,
  loading: false,
  status: 'idle',
  message: '',
  success: false,
};
const ApprovedMaidSlice = createSlice({
  name: 'ApprovedMaids',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = false;
    },
    removeMaid: (state, { payload }) => {
      console.log(state,payload)
      // if (payload && current(state.maids)) {
      //   let maids: any = current(state.maids);
      //   state.maids = maids.jobApplication.filter((item: any) => {
      //     return item._id !== payload;
      //   });
      // }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovedMaids.fulfilled, (state, action) => {
        state.maids = action.payload.data;
        state.loading = false;
        state.status = 'success';
      })
      .addCase(fetchApprovedMaids.pending, (state) => {
        state.loading = false;
        state.status = 'loading';
      })
      .addCase(fetchApprovedMaids.rejected, (state) => {
        state.loading = false;
        state.status = 'error';
      });

    builder
      .addCase(deleteJobApplications.fulfilled, (state, action) => {
        state.error = false;
        state.maids = action.payload.data;
        state.message = action.payload.message;
        state.loading = false;
        state.success = true;
        state.status = 'success';
      })
      .addCase(deleteJobApplications.pending, (state) => {
        state.error = false;
        state.loading = false;
        state.success = false;

        state.status = 'loading';
      })
      .addCase(deleteJobApplications.rejected, (state) => {
        state.success = false;
        state.error = true;
        state.loading = false;
        state.status = 'error';
      });
  },
});
export const { resetStatus, removeMaid } = ApprovedMaidSlice.actions;
export default ApprovedMaidSlice.reducer;
