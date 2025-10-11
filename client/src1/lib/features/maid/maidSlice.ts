import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import {
  applyForJob,
  fetchFeaturedMaids,
  fetchMaidCounts,
  fetchMaidDataById,
  fetchMaidForSearch,
} from './maidAction';
import { IBasicStateStructure } from '../../../types/features/basic.types';
import {
  IFeaturedMaidCard,
  IMaidCountType,
  IMaidListItem,
  IMaidState,
} from '../../../types/features/maid/maid.types';
import {
  getFilterdDataByCountry,
  getFilterdDatabyLocationAndService,
} from '../utils/getFilterdDataByQueries';

const totalItemsPerPage = 6;

// function sortByValues(a: any, b: any, type: string) {
//   const locationA = a[type]?.toUpperCase();
//   const locationB = b[type]?.toUpperCase();

//   if (locationA < locationB) {
//     console.log(locationB, 'greater');
//     return -1;
//   }
//   if (locationA > locationB) {
//     console.log(locationB, 'less');
//     return 1;
//   }
//   return 0;
// }

const initialState: IMaidState = {
  error: false,
  loading: false,
  status: 'idle',
  message: null,
  data: [],
  singleMaid: {},
  filterdData: null,
  filterdDataBackup: [],
  filter: [],

  maids: {},
  maidsCount: 0,
  counts: null,

  featuredMaid: null,
  totalLength: 0,
};
const maidSlice = createSlice({
  name: 'maid',
  initialState,
  reducers: {
    resetMaidState: (state: IMaidState) => {
      state.error = false;
      state.loading = false;
      state.status = 'idle';
      state.message = null;
    },
    filterByCountry: (state, { payload }) => {
      const result = getFilterdDataByCountry(payload, current(state.data));
      state.filterdData = result.slice(0, totalItemsPerPage);
      state.filterdDataBackup = result;
      state.totalLength = result.length;
    },
    filterByLocationAndService: (state, { payload }) => {
      const result = getFilterdDatabyLocationAndService(
        payload.location,
        payload.service,
        current(state.data)
      );
      state.filterdData = result.slice(0, totalItemsPerPage);
      state.filterdDataBackup = result;
      state.totalLength = result.length;
    },
    // sortingData: (state, { payload }: any) => {
    //   let sortedArr: any = [];
    //   const arr = current(state.filterdDataBackup);
    //   console.log({ arr, sort: current(state?.filterdData) });
    //   switch (payload) {
    //     case 'Location':
    //       sortedArr = [...arr].sort((a, b) => sortByValues(a, b, 'location'));
    //       break;
    //     case 'Availability':
    //       sortedArr = [...arr].sort((a, b) => b.availability - a.availability);
    //       break;
    //     case 'Position':
    //       sortedArr = [...arr].sort((a, b) => sortByValues(a, b, 'service'));
    //       break;
    //     default:
    //       break;
    //   }
    //   if (sortedArr.length > 0) {
    //     state.filterdDataBackup = sortedArr;
    //     console.log({ sortedArr }, { filter: state?.filterdDataBackup });
    //   }
    // },
    // filterData: (state, { payload }) => {
    //   state.filter = payload;
    //   const resultData = getFilterdData(payload, current(state.data));
    //   state.filterdData = resultData.slice(0, totalItemsPerPage);
    //   state.filterdDataBackup = resultData;
    //   state.totalLength = resultData.length;
    // },
    // clearFilterData: (state) => {
    //   state.filterdData = current(state.data);
    //   state.filterdDataBackup = current(state.data);
    //   state.totalLength = state.filterdData.length;
    // },
    // pagination: (state, { payload: { page } }) => {
    //   const perPage = totalItemsPerPage; // Number of items per page
    //   const startIndex = (page - 1) * perPage; // Calculate the starting index of the current page
    //   const endIndex = startIndex + perPage; // Calculate the ending index of the current page
    //   console.log(
    //     { backup: current(state.filterdDataBackup) },
    //     { filter: current(state.filter) },
    //     { startIndex },
    //     { endIndex }
    //   );

    //   const paginatedData =
    //     current(state.filterdDataBackup)?.slice(startIndex, endIndex) ?? [];
    //   console.log({ paginatedData });
    //   state.filterdData = paginatedData;
    // },

    setLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMaidForSearch.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<{
            maids: IMaidListItem[];
            count: number;
            page: number;
          }>
        ) => {
          state.error = false;
          state.loading = false;
          state.status = 'success';
          state.maids[payload.page] = payload.maids;
          state.maidsCount = payload.count;
        }
      )
      .addCase(fetchMaidForSearch.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchMaidForSearch.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.status = 'error';
      })

      .addCase(fetchMaidDataById.fulfilled, (state, { payload }) => {
        state.error = false;
        state.singleMaid = payload;
        state.loading = false;
        state.status = 'success';
      })
      .addCase(fetchMaidDataById.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchMaidDataById.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.status = 'error';
      })

      .addCase(applyForJob.pending, (state: IMaidState) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(
        applyForJob.fulfilled,
        (
          state: IMaidState,
          { payload }: PayloadAction<IBasicStateStructure>
        ) => {
          state.loading = false;
          state.status = 'success';
          state.error = false;
          state.message = payload.message;
        }
      )
      .addCase(
        applyForJob.rejected,
        (state: IMaidState, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.status = 'error';
          state.error = true;
          state.message = payload.message;
        }
      )
      .addCase(
        fetchMaidCounts.fulfilled,
        (state: IMaidState, { payload }: PayloadAction<IMaidCountType>) => {
          state.counts = payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchFeaturedMaids.fulfilled,
        (
          state: IMaidState,
          { payload }: PayloadAction<IFeaturedMaidCard[]>
        ) => {
          state.featuredMaid = payload;
          state.loading = false;
        }
      );
  },
});
export const {
  resetMaidState,
  filterByCountry,
  setLoading,
  stopLoading,
  filterByLocationAndService,
} = maidSlice.actions;
export default maidSlice.reducer;
