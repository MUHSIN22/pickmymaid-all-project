import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUtilState } from "../../types/features/utils.types"

const initialState:IUtilState = {
    status: 'idle',
    message: null,
    searchQuery: ''
}

const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        handleSearch: (state: IUtilState, {payload}: PayloadAction<string>) => {
            state.searchQuery = payload;
        }
    }
})

export const {handleSearch} = utilsSlice.actions;

export default utilsSlice.reducer;