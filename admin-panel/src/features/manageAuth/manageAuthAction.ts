import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginBody, ILoginReturn, IRegisterBody, IRegisterReturn } from "../../types/features/auth.types";
import { axiosInstance } from "../../app/axiosInstance";

export let adminLogin = createAsyncThunk<
  ILoginReturn,
  { body: ILoginBody }
>(
  'authentication/admin-login',
  async (req, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.post('auth/admin/login', req.body);
      let data = { token: response.data.token, message: response.message };
      return data as ILoginReturn
    } catch (error: any) {
      return rejectWithValue({
        message: error
      })
    }
  }
)


export const adminRegister = createAsyncThunk<
  IRegisterReturn,
  { body: IRegisterBody }
>('auth/admin-register', async (req, { rejectWithValue }) => {
  try {
    const { data: response } = await axiosInstance.post('auth/admin/register', req.body)
    let userData = response.data?.userDetails
    userData.role = userData.is_super_admin ? "Super Admin" : "Admin"
    return {
      message: response.message,
      userData
    } as IRegisterReturn
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
      errorKey: error.response.data.errorKey
    })
  }
})


export const adminLogout = createAsyncThunk('auth/admin-logout', async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.post('auth/admin/logout');
    return 'Logged out successfully'
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message
    })
  }
})