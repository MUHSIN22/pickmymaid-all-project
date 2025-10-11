import { IBasicStateStructure } from '../basic.types';

export type IPaymentState = IBasicStateStructure & {
  paymentLink: string | null;
  paymentDetails: IPaymentStatusReturn | null;
  selectedType: number | null;
}

export type IPaymentStatusReturn = {
  subscriptionStatus: 0 | 1 | 2;
  subscribedPlan: 0 | 1 | 2;
  expiryDate: Date | string | null;
  transactionID: string | null;
  paymentDate: Date | string | null;
}
