import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPaymentStatusReturn } from "../../../types/features/payment/payment.types";
import { axiosInstance, axiosInstanceV2 } from "../../axiosInstance";

/* This code exports a function called `generatePaymentLink` which is created using the
`createAsyncThunk` function from the `@reduxjs/toolkit` library. This function takes two arguments:
a string representing the type of payment and a callback function that handles the asynchronous
logic of generating a payment link. */
export const generatePaymentLink = createAsyncThunk<string, number>("payment/generate-link", async (type, { rejectWithValue }) => {
  try {
    const {
      data: {
        data: { payment_url: paymentURL },
      },
    } = await axiosInstanceV2.post("payment/create-payment", { type });
    return paymentURL as string;
  } catch (_: any) {
    return rejectWithValue({
      message: "Something went wrong, Please try again!",
    });
  }
});

export const verifySubscription = createAsyncThunk<IPaymentStatusReturn, { body: { Tid: string } }>(
  "payment/verify-subscription",
  async (req, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axiosInstanceV2.post(`payment/acknowledge/${req.body?.Tid}`);

      return {
        subscriptionStatus: data.status,
        subscribedPlan: data.type,
        expiryDate: data.expiryDate,
        transactionID: data.ref,
        paymentDate: data.paymentType,
      } as IPaymentStatusReturn;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue({
        message: error.response.data.message,
      });
    }
  }
);

export const getUserPaymentDetails = createAsyncThunk<IPaymentStatusReturn, undefined>("payment/get-payment-details", async (_, { rejectWithValue }) => {
  try {
    const {
      data: {
        data: { user },
      },
    } = await axiosInstance.get("payment/payment-details");
    if (user) {
      return {
        subscriptionStatus: user.status,
        subscribedPlan: user.type,
        expiryDate: user.expiryDate,
        transactionID: user.transRef,
        paymentDate: user.updatedAt,
      } as IPaymentStatusReturn;
    } else {
      return {
        subscriptionStatus: 0,
        subscribedPlan: 0,
        expiryDate: null,
        transactionID: null,
        paymentDate: null,
      } as IPaymentStatusReturn;
    }
  } catch (error: any) {
    return rejectWithValue({
      message: "Something went wrong, Please contact our support team!",
    });
  }
});
