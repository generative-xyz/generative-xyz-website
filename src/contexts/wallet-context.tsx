import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { WalletManager } from '@services/wallet';
import { linkWallet, unlinkWallet } from '@services/profile-service';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { useAppDispatch } from '@redux';
import { resetUser, setUser } from '@redux/user/action';

const LOG_PREFIX = 'WalletContext';

interface IWalletState {
  chainID: number;
}

export interface IWalletContext {
  connectedAddress: string | null;
  walletManager: WalletManager | null;
  checkAndSwitchChain: (params: IWalletState) => Promise<void>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const initialValue: IWalletContext = {
  connectedAddress: null,
  walletManager: null,
  checkAndSwitchChain: async (_: IWalletState): Promise<void> =>
    new Promise(r => r()),
  connect: () => new Promise<void>(r => r()),
  disconnect: () => new Promise<void>(r => r()),
};

export const WalletContext = React.createContext<IWalletContext>(initialValue);

export const WalletProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [walletManager, setWalletManager] = useState<WalletManager | null>(
    null
  );
  const walletManagerRef = useRef<WalletManager | null>(walletManager);
  const dispatch = useAppDispatch();

  const checkAndSwitchChain = useCallback(
    async ({ chainID }: IWalletState): Promise<void> => {
      const wallet = walletManagerRef.current;

      if (wallet) {
        const isChainSupported = await wallet.isChainSupported(chainID);
        if (isChainSupported) return;

        await wallet.requestSwitchChain(chainID);
      }
    },
    []
  );

  const connect = useCallback(async (): Promise<void> => {
    const wallet = walletManagerRef.current;
    if (!wallet) {
      return;
    }

    const walletConnectRes = await wallet.connect();
    if (!walletConnectRes.isSuccess || !walletConnectRes.data) {
      return;
    }
    const walletAddress = walletConnectRes.data;
    try {
      const userRes = await linkWallet({ walletAddress });
      dispatch(setUser(userRes));
      setConnectedAddress(walletAddress);
    } catch (err: unknown) {
      log('can not connect wallet', LogLevel.Error, LOG_PREFIX);
    }
  }, [dispatch]);

  const disconnect = useCallback(async (): Promise<void> => {
    const wallet = walletManagerRef.current;
    if (!wallet) {
      return;
    }

    const walletConnectRes = await wallet.connect();
    if (walletConnectRes.isSuccess && walletConnectRes.data) {
      const walletAddress = walletConnectRes.data;
      try {
        await unlinkWallet({ walletAddress });
        dispatch(resetUser());
        setConnectedAddress(null);
      } catch (err: unknown) {
        log('can not disconnect wallet', LogLevel.Error, LOG_PREFIX);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const walletManagerInstance = new WalletManager();
    setWalletManager(walletManagerInstance);
  }, []);

  useEffect(() => {
    walletManagerRef.current = walletManager;
  }, [walletManager]);

  const contextValues = useMemo((): IWalletContext => {
    return {
      checkAndSwitchChain,
      connect,
      disconnect,
      walletManager,
      connectedAddress,
    };
  }, [
    connect,
    disconnect,
    checkAndSwitchChain,
    walletManager,
    connectedAddress,
  ]);

  return (
    <WalletContext.Provider value={contextValues}>
      {children}
    </WalletContext.Provider>
  );
};
