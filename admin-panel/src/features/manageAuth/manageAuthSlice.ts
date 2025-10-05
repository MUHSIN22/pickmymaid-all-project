import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthState, ILoginReturn, IRegisterReturn } from "../../types/features/auth.types";
import { adminLogin, adminLogout, adminRegister } from "./manageAuthAction";

let token: string | null = localStorage.getItem('token') || null

const initialState: IAuthState = {
  error: false,
  loading: false,
  status: 'idle',
  message: null,
  token: token,
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    resetAuthState: (state: IAuthState) => {
      state.error = false;
      state.loading = false;
      state.status = 'idle';
      state.message = null;
    },
    logout: (state: IAuthState) => {
      state.error = false;
      state.loading = false;
      state.status = 'error';
      state.message = `You're logged out as your session is expired!`;
      localStorage.removeItem('token');
    }
  },
  extraReducers(builder) {
    builder
      .addCase(adminLogin.fulfilled, (state: IAuthState, { payload }: PayloadAction<ILoginReturn>) => {
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = payload.message;
        state.token = payload.token
      })
      .addCase(adminLogin.pending, (state: IAuthState) => {
        state.loading = true;
        state.status = 'loading'
      })
      .addCase(adminLogin.rejected, (state: IAuthState, { payload }: PayloadAction<any>) => {
        state.error = false;
        state.loading = false;
        state.status = 'error';
        state.message = payload.message;
      })


    builder.addCase(adminRegister.fulfilled, (state: IAuthState, { payload }: { payload: IRegisterReturn }) => {
      state.error = false;
      state.loading = false;
      state.status = 'success'
      state.message = payload.message;
    }).addCase(adminRegister.pending, (state: IAuthState) => {
      state.loading = true;
      state.status = 'loading';
    }).addCase(adminRegister.rejected, (state: IAuthState, { payload }: { payload: any }) => {
      state.error = true;
      state.loading = false;
      state.status = 'error';
      state.message = payload.message;
    })

    builder.addCase(adminLogout.fulfilled, (state: IAuthState, { payload }: { payload: string }) => {
      state.error = false;
      state.loading = false;
      state.status = 'success'
      state.message = payload;
      state.token = null;
      localStorage.removeItem('token');
    }).addCase(adminLogout.pending, (state: IAuthState) => {
      state.loading = true;
      state.status = 'loading';
    }).addCase(adminLogout.rejected, (state: IAuthState, { payload }: { payload: any }) => {
      state.error = true;
      state.loading = false;
      state.status = 'error';
      state.message = payload.message;
    })

  },
})

export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer;