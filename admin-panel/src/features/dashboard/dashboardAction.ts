import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../app/axiosInstance";
import { ICategoryAnalytics } from "../../types/features/dashboard.type";

export const getCategoryAnalytics = createAsyncThunk<ICategoryAnalytics[], {
    from?: string;
    to?: string;
}>('dashboard/get-category-analytics', async(req,{rejectWithValue}) => {
    try{
        let queryString: string = '?'
        
        if(req?.from){
            queryString += `from=${req.from}`
        }
        if(req?.to){
            queryString += queryString === "?" ? `to=${req.to}` : `&to=${req.to}`
        }

        const {data: {data}} = await axiosInstance(`analytics/category-analytics${queryString}`)

        const returnFormatter: ICategoryAnalytics[] = data?.map((item: any) => ({
            category: item._id,
            count: item.count
        }))

        return returnFormatter
    }catch(error:any){
        return rejectWithValue(error.message)
    }
})