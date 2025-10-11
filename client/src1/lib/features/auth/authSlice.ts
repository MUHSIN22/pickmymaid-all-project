import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAuthState, IRegisterReturn } from '../../../types/features/auth/auth.types';
import { forgetPassword, loginUser, logoutUser, registerUser, resetPassword, verifyAuthentication } from './authAction';
import { IAuthReturn, IBaseRequestReturn } from '../../../types/features/basic.types'

// const token: string | null = localStorage.getItem('token') || null
// const name: string | null = localStorage.getItem('name') || null
let token, name;

const initialState: IAuthState = {
  error: false,
  loading: false,
  status: 'idle',
  message: null,
  authModal: null,
  token: token || null,
  name: name ? JSON.parse(name) : null,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state: IAuthState) => {
      state.error = false;
      state.loading = false;
      state.status = 'idle';
      state.message = null;
    },
    setAuthModal: (state: IAuthState, {payload}: PayloadAction<'signup' | 'login' | 'forget' | 'sent' | 'login-form' | null>) => {
      state.authModal = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state: IAuthState, { payload }: PayloadAction<IRegisterReturn>) => {
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = payload.message;
        state.name = payload.name;
        localStorage.setItem('name', JSON.stringify(payload.name))
      })
      .addCase(registerUser.pending, (state: IAuthState) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(registerUser.rejected, (state: IAuthState, { payload }: PayloadAction<any>) => {
        state.error = false;
        state.loading = false;
        state.status = 'error';
        state.message = payload.message;
      })

      .addCase(loginUser.fulfilled, (state: IAuthState, { payload }: PayloadAction<IRegisterReturn>) => {
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = payload.message;
        state.name = payload.name;
        localStorage.setItem('name', JSON.stringify(payload.name))
      })
      .addCase(loginUser.pending, (state: IAuthState) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(loginUser.rejected, (state: IAuthState, { payload }: PayloadAction<any>) => {
        state.error = false;
        state.loading = false;
        state.status = 'error';
        state.message = payload.message;
      })

      .addCase(logoutUser.fulfilled, (state: IAuthState) => {
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = 'Logged out successfully!';
        state.user = null;
        state.name = null;
      })
      .addCase(logoutUser.pending, (state: IAuthState) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(logoutUser.rejected, (state: IAuthState, { payload }: PayloadAction<any>) => {
        state.error = false;
        state.loading = false;
        state.status = 'error';
        state.message = payload.message;
      })

      .addCase(verifyAuthentication.fulfilled, (state: IAuthState, { payload }: PayloadAction<IAuthReturn>) => {
        state.error = false;
        state.loading = false;
        // state.status = 'success';
        state.user = payload;
        state.name = {
          firstName: payload?.first_name as string,
          lastName: ''
        };
      })
      .addCase(verifyAuthentication.pending, (state: IAuthState) => {
        state.loading = true;
        // state.status = 'loading';
      })
      .addCase(verifyAuthentication.rejected, (state: IAuthState) => {
        state.error = false;
        state.loading = false;
        state.token = null;
        state.user = null;
        state.name = null;
        // state.status = 'error';
      })

      .addCase(forgetPassword.fulfilled, (state: IAuthState) => {
        state.error = false;
        state.loading = false;
        state.status = 'success';
      })
      .addCase(forgetPassword.pending, (state: IAuthState) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(forgetPassword.rejected, (state: IAuthState, { payload }: PayloadAction<any>) => {
        state.error = false;
        state.loading = false;
        state.status = 'error';
        state.message = payload.message;
      })

      .addCase(resetPassword.fulfilled, (state: IAuthState, { payload }: PayloadAction<IBaseRequestReturn>) => {
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = payload.message;
      })
      .addCase(resetPassword.pending, (state: IAuthState) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(resetPassword.rejected, (state: IAuthState, { payload }: PayloadAction<any>) => {
        state.error = false;
        state.loading = false;
        state.status = 'error';
        state.message = payload.message;
      })
  },
})

export const { resetAuthState, setAuthModal } = authSlice.actions;
export default authSlice.reducer;