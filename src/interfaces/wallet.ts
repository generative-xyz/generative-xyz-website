export type WalletOperationReturn<T> = {
  isSuccess: boolean;
  isError: boolean;
  message: string;
  data?: T;
};
