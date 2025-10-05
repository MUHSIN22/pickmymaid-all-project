import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../app/axiosInstance";
import { IContactSupport } from "../../types/pages/contactSupport/contactSupport.types";

export const getAllContactDetails = createAsyncThunk('contact/get-contacts', async (_, { rejectWithValue }) => {
  try {
    const { data: { data: { contacts } } } = await axiosInstance.get('contact');
    const returnFormat: IContactSupport[] = contacts?.map((contact: any) => ({
      name: contact.name,
      email: contact.email,
      mobile: contact.mobile,
      message: contact.message,
      updatedOn: contact.updatedAt
    }))

    return returnFormat as IContactSupport[];
  } catch (error: any) {
    return rejectWithValue({
      message: 'Something went wrong!'
    })
  }
})