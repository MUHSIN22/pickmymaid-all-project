import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../app/axiosInstance';

export const fetchFindJobs = createAsyncThunk(
  'findJob/fetchFindJobs',
  async () => {
    try {
      const response = await axiosInstance.get('job/findjob');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch maid data');
    }
  }
);

export const createFindJobs = createAsyncThunk(
  'findJob/createFindJob',
  async (req: { formData: FormData }) => {
    try {
      const response = await axiosInstance.post('job/findjob', req.formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch maid data');
    }
  }
);

export const deleteJobs = createAsyncThunk(
  'findJob/deleteJob',
  async ({ id }: { id: string }) => {
    try {
      const response = await axiosInstance.delete(`/job/findjob?id=${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch maid data');
    }
  }
);
