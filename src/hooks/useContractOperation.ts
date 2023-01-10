import { useContext, useState } from 'react';
import {
  TContractOperation,
  ContractOperationCallback,
  ContractOperationHookReturn,
  ContractOperationRequiredParams,
  ContractOperationReturn,
} from '@interfaces/contract';
import { ContractOperationStatus } from '@enums/contract';
import { WalletContext } from '@contexts/wallet-context';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { WalletError } from '@enums/wallet-error';
import { METAMASK_DOWNLOAD_PAGE } from '@constants/common';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@redux/user/selector';

const LOG_PREFIX = 'useContractOperation';

const useContractOperation = <
  P extends ContractOperationRequiredParams,
  R extends ContractOperationReturn
>(
  OperationClass: TContractOperation<P, R>,
  requiredConnectWallet: boolean
): ContractOperationHookReturn<P, R> => {
  const walletCtx = useContext(WalletContext);
  const user = useSelector(getUserSelector);
  const [status, setStatus] = useState<ContractOperationStatus>(
    ContractOperationStatus.IDLE
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [data, setData] = useState<R | null>(null);
  const [params, setParams] = useState<P | null>(null);

  const reset = (): void => {
    setIsLoading(false);
    setIsError(false);
    setIsError(false);
    setData(null);
    setTxHash(null);
    setParams(null);
    setSuccessMsg(null);
    setErrMsg(null);
    setStatus(ContractOperationStatus.IDLE);
  };

  const call = async (params: P): Promise<R | null> => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setSuccessMsg(null);
    setErrMsg(null);
    setData(null);
    setTxHash(null);
    setParams(params);
    setStatus(ContractOperationStatus.IDLE);

    const statusCallback: ContractOperationCallback = (opStatus, res) => {
      setStatus(opStatus);

      if (opStatus === ContractOperationStatus.SUCCESS) {
        setIsSuccess(true);
        setIsLoading(false);

        // Refresh balance after each operation
        walletCtx.refreshWalletBalance();

        if (res?.message) {
          setSuccessMsg(res.message);
        }

        if (res?.transactionHash) {
          setTxHash(res.transactionHash);
        }

        if (res?.data !== undefined) {
          setData(res.data as R);
        }
      }

      if (opStatus === ContractOperationStatus.ERROR) {
        setIsLoading(false);
        setIsError(true);

        if (res?.message) {
          setErrMsg(res.message);
        }
      }
    };

    if (walletCtx.walletManager) {
      const isInstalled = walletCtx.walletManager.isInstalled();
      if (!isInstalled) {
        log(WalletError.NO_METAMASK, LogLevel.Error, LOG_PREFIX);
        statusCallback(ContractOperationStatus.ERROR, {
          message: WalletError.NO_METAMASK,
        });
        window.open(METAMASK_DOWNLOAD_PAGE);
        return null;
      }

      try {
        if (requiredConnectWallet) {
          const walletAddress = await walletCtx.connectedAddress();
          if (!walletAddress || !user.walletAddress) {
            await walletCtx.connect();
          }
        }

        await walletCtx.checkAndSwitchChain({
          chainID: params.chainID,
        });
      } catch (err: unknown) {
        log(err as Error, LogLevel.Error, LOG_PREFIX);
        statusCallback(ContractOperationStatus.ERROR, {
          message: (err as Error).message,
        });
        return null;
      }

      return walletCtx.walletManager?.runContractOperation<P, R>(
        OperationClass,
        params,
        statusCallback
      );
    } else {
      log(WalletError.NO_INSTANCE, LogLevel.Error, LOG_PREFIX);
      statusCallback(ContractOperationStatus.ERROR, {
        message: WalletError.NO_INSTANCE,
      });

      return null;
    }
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
    data,
    transactionHash: txHash,
    status,
  };
};

export default useContractOperation;
