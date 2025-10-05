import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../app/axiosInstance";
import { ICustomerReturn } from "../../types/features/manageCustomer.types";

export const getAllCustomers = createAsyncThunk('manage-customers/get-all-customers', async (_, { rejectWithValue }) => {
  try {
    const { data: { data: { customer } } } = await axiosInstance.get('admin/customer');

    const returnFormat: ICustomerReturn[] = customer.map((c: any) => ({
      userID: c.user_id,
      fullName: `${c.first_name} ${c.last_name}`,
      email: c.email,
      mobile: c.phone,
      createdAt: c.createdAt
    }))

    return returnFormat as ICustomerReturn[]
  } catch (error: any) {
    console.log({ error });

    return rejectWithValue({
      message: 'Something went wrong while fetching!'
    })
  }
})

export const updateCustomerPassword = createAsyncThunk<
  string,
  { body: { user_id: string } }
>('manage-customers/updateCustomerPassword', async (req, { rejectWithValue }) => {
  try {
    const { data: { data: { password } } } = await axiosInstance.put('admin/customer-password', req.body);
    return password
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message
    })
  }
})

export const toggleCustomerBlock = createAsyncThunk<
  any, 
  {body: {user_id: string}}
>('manage-customer/toggleBlock', async (req, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.get(`admin/block-user/${req.body.user_id}`);
    console.log(response)
    // return password
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message
    })
  }
})