import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../app/axiosInstance';
import { IApproveBody } from '../../types/features/approve.type';

export const fetchApprovedMaids = createAsyncThunk(
  'approvedMaid/fetchData',
  async () => {
    try {
      const response = await axiosInstance.get('/job/all');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch maid data');
    }
  }
);

export const updateReferences = createAsyncThunk(
  'approve/fetchData',
  async ({ body, url }: { body: IApproveBody; url: string }) => {
    try {
      const response = await axiosInstance.post(`/job/${url}`, body);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch maid data');
    }
  }
);

export const deleteJobApplications = createAsyncThunk(
  'approve/delJobApplication',
  async ({ id }: { id: string }) => {
    try {
      const response = await axiosInstance.delete(`/job?id=${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch maid data');
    }
  }
);
