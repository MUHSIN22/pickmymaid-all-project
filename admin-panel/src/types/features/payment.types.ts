export type IPaymentState = {
  error: boolean;
  loading: boolean;
  status: 'idle' | 'success' | 'error' | 'loading';
  message: string | null;
  paymentsList: IPayment[] | null;
}

export type IPayment = {
  id: string;
  name: string;
  userId?: string;
  email: string;
  mobile: string;
  transactionToken: string;
  transRef: string;
  type: 0 | 1 | 2 | null;
  status: 0 | 1 | 2;
  expiryDate: Date | string | null;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
}