import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICategoryAnalytics, IDashboardState } from "../../types/features/dashboard.type";
import { getCategoryAnalytics } from "./dashboardAction";

const initialState: IDashboardState = {
    categoryAnalytics: [],
    error: false,
    loading: false,
    status: 'idle',
    message: null,
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getCategoryAnalytics.pending, (state: IDashboardState) => {
            state.error = false;
            state.message = null;
            state.loading = true;
            state.status = 'loading';
        })
        .addCase(getCategoryAnalytics.fulfilled, (state: IDashboardState, {payload}: PayloadAction<ICategoryAnalytics[]>) => {
            state.error = false;
            state.message = null;
            state.loading = false;
            state.status = 'success';
            state.categoryAnalytics = payload;
        })
        .addCase(getCategoryAnalytics.rejected, (state: IDashboardState, {payload}: PayloadAction<any>) => {
            state.error = true;
            state.message = payload;
            state.loading = false;
            state.status = 'error';
        })
        
    },
})

export default dashboardSlice.reducer;