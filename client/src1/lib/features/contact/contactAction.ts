import { createAsyncThunk } from "@reduxjs/toolkit";
import { IContactForm } from "../../../types/components/contactFormTypes/contactForm.types";
import { axiosInstance } from "../../axiosInstance";

export const saveContact = createAsyncThunk<string, { body: IContactForm }>("contact/save-contact", async (req, { rejectWithValue }) => {
  try {
    const {
      data: { message },
    } = await axiosInstance.post("contact", req.body);
    return message as string;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
    });
  }
});
