import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { IJobListItem, IJobSearchReturn, IJobState } from '../../../types/features/job/job.types';
import { fetchJobsData, searchJobsData } from './jobAction';

const totalItemsPerPage = 6
const initialState: IJobState = {
  error: false,
  loading: false,
  status: 'idle',
  message: null,
  data: [],
  filterdData: null,
  filterdDataBackup: [],
  singlejob: {},
  searchResults: [],
  totalLength: 0,
};


const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {

    pagination: (state, { payload: { page } }) => {
      const perPage = totalItemsPerPage; // Number of items per page
      const startIndex = (page - 1) * perPage; // Calculate the starting index of the current page
      const endIndex = startIndex + perPage; // Calculate the ending index of the current page
      console.log(page);
      const paginatedData =
        current(state.filterdDataBackup)?.slice(startIndex, endIndex) ?? [];

      state.filterdData = paginatedData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchJobsData.fulfilled,
        (state, { payload }: PayloadAction<IJobListItem[]>) => {
          console.log(payload,"payload")
          state.error = false;
          state.data = payload
          state.filterdData = payload.slice(0, totalItemsPerPage);
          state.filterdDataBackup = payload
          state.totalLength = payload.length;
          state.loading = false;
          state.status = 'success';
        }
      )
      .addCase(fetchJobsData.pending, (state) => {
        state.error = false;
        state.loading = false;
        state.status = 'loading';
      })
      .addCase(fetchJobsData.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.status = 'error';
      })
      .addCase(
        searchJobsData.fulfilled,
        (state, { payload }: PayloadAction<IJobSearchReturn>) => {
        
          state.error = false;
          state.data = payload.data
          state.filterdData = payload.data?.slice(0, totalItemsPerPage);
          state.filterdDataBackup = payload?.data
          state.totalLength = state.filterdData.length;
          state.loading = false;
          state.status = 'success';
        }
      )
      .addCase(searchJobsData.pending, (state) => {
        state.error = false;
        state.loading = false;
        state.status = 'loading';
      })
      .addCase(searchJobsData.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.status = 'error';
      });
  },
});

export const {
  pagination,
} = jobSlice.actions;
export default jobSlice.reducer;