import { IAuthReturn, IBasicStateStructure } from '../basic.types';

// Declare the type of auth state
export type IAuthState = IBasicStateStructure & {
  token: string | null;
  name: {
    firstName: string,
    lastName: string
  } | null;
  user: IAuthReturn | null;
  authModal: 'signup' | 'login' | 'forget' | 'sent' | 'login-form' | null;
}

// Declare the type of register body
export type IRegisterBodyState = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

// Declare the type of register return
export type IRegisterReturn = {
  token?: string;
  message: string;
  name: {
    firstName: string,
    lastName: string
  }
}

// Declare the type of login body
export type ILoginBodyState = {
  email: string;
  password: string;
}

// Declare the type of body of reset password
export type IResetPasswordBody = {
  password: string;
  confirm_password: string;
}