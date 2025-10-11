import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axiosInstance";
import { IJobSearchBodyState, IJobSearchReturn } from "@/types/features/job/job.types";

export const fetchJobsData = createAsyncThunk("job/fetchJobsData", async () => {
  try {
    const response = await axiosInstance.get("/job/find");
    return response.data.data.jobs;
  } catch (error) {
    throw new Error("Failed to fetch job data");
  }
});

export const searchJobsData = createAsyncThunk<IJobSearchReturn, { body: IJobSearchBodyState }>("job/searchJobsData", async (req, { rejectWithValue }) => {
  try {
    const { data: response } = await axiosInstance.post("/job/find-search", req);
    return {
      message: response.message,
      data: response.data.jobs.data,
    };
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
    });
  }
});
