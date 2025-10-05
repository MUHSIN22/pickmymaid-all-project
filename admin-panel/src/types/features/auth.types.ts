import { CaseReducer } from "@reduxjs/toolkit";
import { ITeamMember } from "./manageTeam.types";

export type Builder<T> = {
  addCase: (actionCreator: any, reducer: any) => Builder<T>;
  addMatcher: (
    matcher: (action: any) => boolean,
    reducer: CaseReducer<T, any>
  ) => Builder<T>;
  addDefaultCase: (reducer: CaseReducer<T, any>) => Builder<T>;
};
// Declare the type of auth state
export type IAuthState = {
  error: boolean;
  loading: boolean;
  status: 'idle' | 'success' | 'error' | 'loading';
  message: string | null;
  token: string | null;
}

// Declare the type of login body
export type ILoginBody = {
  email: string;
  password: string;
}

// Declare the type of login return
export type ILoginReturn = {
  token: string;
  message: string;
}

// Declare the type of register body
export type IRegisterBody = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  is_super_admin: boolean;
}

// Declare the type of register return
export type IRegisterReturn = {
  message: string;
  userData: ITeamMember
}