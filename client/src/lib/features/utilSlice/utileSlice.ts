import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUtilsState } from '@/types/features/utils/utils.types'

const initialState:IUtilsState = {
    redirection: null,
    paymentType: null
}

const utilSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        addRedirection: (state:IUtilsState, {payload}: PayloadAction<string>) => {
            state.redirection = payload;
        },
        addPaymentType: (state: IUtilsState, {payload}: PayloadAction< number >) => {
            state.paymentType = payload;
        },
        resetRedirection : (state: IUtilsState) => {
            state.redirection = null;
            state.paymentType = null;
        }
    }
})

export const {addRedirection, addPaymentType, resetRedirection} = utilSlice.actions;

export default utilSlice.reducer;