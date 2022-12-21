export type WalletOperationReturn<T> = {
  isSuccess: boolean;
  isError: boolean;
  message: string;
  data?: T;
};

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
