import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../app/axiosInstance";
import { IPayment } from "../../types/features/payment.types";

export const getPayments = createAsyncThunk('payments/get-payments', async (_, { rejectWithValue }) => {
  try {
    const { data: { data: { payments } } } = await axiosInstance.get('payment');
    console.log(payments, 'p');
    
    const returnFormat: IPayment[] = payments?.map((payment: any) => ({
      id: payment._id,
      userId: payment.user_id,
      name: payment.name,
      email: payment.email,
      mobile: payment.mobile,
      transactionToken: payment.transactionToken,
      transRef: payment.transRef,
      type: payment.type,
      status: payment.status,
      expiryDate: payment.expiryDate,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt
    }))
    return returnFormat as IPayment[];
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message || error.message
    })
  }
})

export const verifyPayment = createAsyncThunk<
  string,
  {
    transRef: string | null,
    user_id: string | null | undefined
  }
>('payments/verify-payments', async (body, {rejectWithValue}) => {
  try{
    await axiosInstance.post('admin/verify-payment', body )
    return "Payment verified!"
  }catch(error:any){
    return rejectWithValue({
      message: error.response.data.message || error.message
    })
  }
})