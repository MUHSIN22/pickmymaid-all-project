export type ICustomerState = {
  error: boolean;
  loading: boolean;
  status: 'idle' | 'success' | 'error' | 'loading';
  message: string | null;
  customers: ICustomerReturn[] | null;
}

export type ICustomerReturn = {
  userID: string;
  fullName: string;
  email: string;
  mobile: string;
  createdAt: Date;
}