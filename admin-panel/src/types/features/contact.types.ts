import { IContactSupport } from "../pages/contactSupport/contactSupport.types";

export type IContactSliceState = {
  error: boolean;
  loading: boolean;
  status: 'idle' | 'success' | 'error' | 'loading';
  message: string | null;
  contactDetails: IContactSupport[] | null;
}