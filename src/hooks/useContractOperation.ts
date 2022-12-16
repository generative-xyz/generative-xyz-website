import { useContext, useState } from 'react';
import { TransactionReceipt } from 'web3-eth';
import {
  TContractOperation,
  ContractOperationCallback,
  ContractOperationHookReturn,
  ContractOperationRequiredParams,
} from '@interfaces/contract';
import { ContractOperationStatus } from '@enums/contract';
import { WalletContext } from '@contexts/wallet-context';

const useContractOperation = <P extends ContractOperationRequiredParams>(
  OperationClass: TContractOperation<P>
): ContractOperationHookReturn<P> => {
  const walletCtx = useContext(WalletContext);
  const [status, setStatus] = useState<ContractOperationStatus>(
    ContractOperationStatus.IDLE
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [tx, setTx] = useState<TransactionReceipt | null>(null);
  const [params, setParams] = useState<P | null>(null);

  const reset = (): void => {
    setIsLoading(false);
    setIsError(false);
    setIsError(false);
    setTx(null);
    setTxHash(null);
    setParams(null);
    setSuccessMsg(null);
    setErrMsg(null);
    setStatus(ContractOperationStatus.IDLE);
  };

  const call = async (params: P): Promise<void> => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setSuccessMsg(null);
    setErrMsg(null);
    setTx(null);
    setTxHash(null);
    setParams(params);
    setStatus(ContractOperationStatus.IDLE);

    const statusCallback: ContractOperationCallback = (opStatus, data) => {
      setStatus(opStatus);

      if (opStatus === ContractOperationStatus.SUCCESS) {
        setIsSuccess(true);
        setIsLoading(false);

        if (data?.message) {
          setSuccessMsg(data.message);
        }

        if (data?.transactionHash) {
          setTxHash(data.transactionHash);
        }
        if (data?.transaction) {
          setTx(data?.transaction);
        }
      }

      if (status === ContractOperationStatus.ERROR) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    if (!walletCtx.connectedAddress || !walletCtx.walletManager) {
      try {
        await walletCtx.connect();
        await walletCtx.checkAndSwitchChain({
          chainID: params.chainID,
        });
      } catch (err) {
        statusCallback(ContractOperationStatus.ERROR);
        return;
      }
    }

    walletCtx.walletManager?.runContractOperation<P>(
      OperationClass,
      params,
      statusCallback
    );
  };

  return {
    isLoading,
    isError,
    isSuccess,
    successMessage: successMsg,
    errorMessage: errMsg,
    call,
    reset,
    params,
    transaction: tx,
    transactionHash: txHash,
    status,
  };
};

export default useContractOperation;
