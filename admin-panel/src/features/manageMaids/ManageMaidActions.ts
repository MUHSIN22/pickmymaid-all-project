import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../app/axiosInstance';

export const fetchMaidData = createAsyncThunk(
  'manageMaid/fetchMaidData',
  async () => {
    try {
      const response = await axiosInstance.get('/job');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch maid data');
    }
  }
);
export const fetchMaidDataById = createAsyncThunk(
  'manageMaid/fetchMaidDatabyId',
  async (id: string) => {
    try {
      const response = await axiosInstance.post(`/job/id-dashboard`, { id });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch maid data');
    }
  }
);
export const submitMaidData = createAsyncThunk(
  'manageMaid/submitMaid',
  async (req: { body: FormData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/job', req?.body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Modify this if you need to return a specific value
    } catch (error) {
      console.log(error);
      return rejectWithValue(error); // Return the rejected value using rejectWithValue
    }
  }
);

export const updateMaidData = createAsyncThunk(
  'manageMaid/updateMaid',
  async (req: { body: FormData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/job', req?.body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Modify this if you need to return a specific value
    } catch (error) {
      return rejectWithValue(error); // Return the rejected value using rejectWithValue
    }
  }
);
