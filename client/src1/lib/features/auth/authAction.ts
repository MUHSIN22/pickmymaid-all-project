import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosInstanceV2 } from "../../axiosInstance";
import { ILoginBodyState, IRegisterBodyState, IRegisterReturn, IResetPasswordBody } from "../../../types/features/auth/auth.types";
import { IBaseRequestReturn } from "../../../types/features/basic.types";
import { IForgetPasswordForm } from "../../../types/components/authenticationForm/authenticationForms.types";

/* This code exports a function called `registerUser` which is created using the `createAsyncThunk`
function from the `@reduxjs/toolkit` library. This function is used to create an asynchronous action
that can be dispatched to the Redux store. */
export const registerUser = createAsyncThunk<IRegisterReturn, { body: IRegisterBodyState }>("auth/register-user", async (req, { rejectWithValue }) => {
  try {
    const { data: response } = await axiosInstance.post("auth/customer/register", req.body);
    return {
      message: response.message,
      name: {
        firstName: response.data.first_name,
        lastName: response.data.last_name || "",
      },
    };
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const loginUser = createAsyncThunk<IRegisterReturn, { body: ILoginBodyState }>("auth/login-user", async (req, { rejectWithValue }) => {
  try {
    const { data: response } = await axiosInstanceV2.post("auth/local", req.body);
    console.log({ response });
    window.location.reload();
    return {
      message: response?.message,
      name: {
        firstName: response.data.first_name,
        lastName: response.data.last_name || "",
      },
    } as IRegisterReturn;
  } catch (error: any) {
    console.log(error, "this is error");

    return rejectWithValue({
      message: error.response.data?.message,
    });
  }
});

export const forgetPassword = createAsyncThunk<IBaseRequestReturn, { body: IForgetPasswordForm }>("auth/forget-password", async (req, { rejectWithValue }) => {
  try {
    const { data: response } = await axiosInstance.post("auth/customer/forget-password", req.body);
    return { message: response.message } as IBaseRequestReturn;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const resetPassword = createAsyncThunk<IBaseRequestReturn, { body: IResetPasswordBody; token: string }>(
  "auth/reset-password",
  async (req, { rejectWithValue }) => {
    try {
      // const token = await base64url.decode(req.token)
      const { data } = await axiosInstance.post("auth/customer/reset-password", req.body, {
        headers: {
          Authorization: `${req.token}`,
        },
      });
      return { message: data.message } as IBaseRequestReturn;
    } catch (error: any) {
      console.log({ error });

      return rejectWithValue({
        message: error.response.data.message,
      });
    }
  }
);

export const verifyAuthentication = createAsyncThunk("auth/verify-auth", async (_, { rejectWithValue }) => {
  try {
    const {
      data: {
        data: { user },
      },
    } = await axiosInstanceV2.get("auth/login/success", {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });

    return user;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstanceV2.get("auth/logout", {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });
    return { message: data?.message };
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
    });
  }
});
