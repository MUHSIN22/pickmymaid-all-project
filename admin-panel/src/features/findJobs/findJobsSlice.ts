import { createSlice } from '@reduxjs/toolkit';
import { createFindJobs, deleteJobs, fetchFindJobs } from './findJobsAction';

const initialState = {
  findJob: [],
  error: false,
  loading: false,
  status: 'idle',
  message: '',
  success: false,
};

const findJob = createSlice({
  name: 'findJob',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFindJobs.fulfilled, (state, action) => {
        state.findJob = action.payload.data;
        state.error = false;
        state.loading = false;
        state.status = 'success';
      })
      .addCase(fetchFindJobs.pending, (state) => {
        state.error = false;
        state.loading = false;
        state.status = 'loading';
      })
      .addCase(fetchFindJobs.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.status = 'error';
      });

    builder
      .addCase(createFindJobs.fulfilled, (state, { payload }) => {
        state.success = true;
        console.log('success.....', state.success);
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = payload.message;
      })
      .addCase(createFindJobs.pending, (state: any) => {
        state.loading = true;
        state.success = false;
        console.log('loading.....');
        state.error = false;
        state.status = 'loading';
      })
      .addCase(
        createFindJobs.rejected,
        (state: any, { payload }: { payload: any }) => {
          console.log('fail.....');
          state.error = true;
          state.loading = false;
          state.status = 'error';
          state.success = false;
          state.message = payload.message;
        }
      );

    builder
      .addCase(deleteJobs.fulfilled, (state, { payload }) => {
        state.success = true;
        console.log('success.....', state.success);
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = payload.message;
      })
      .addCase(deleteJobs.pending, (state: any) => {
        state.loading = true;
        state.success = false;
        console.log('loading.....');
        state.error = false;
        state.status = 'loading';
      })
      .addCase(
        deleteJobs.rejected,
        (state: any, { payload }: { payload: any }) => {
          console.log('fail.....');
          state.error = true;
          state.loading = false;
          state.status = 'error';
          state.success = false;
          state.message = payload.message;
        }
      );
  },
});
export const { resetStatus } = findJob.actions;
export default findJob.reducer;
