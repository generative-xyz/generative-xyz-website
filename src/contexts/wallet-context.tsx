import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { WalletManager } from '@services/wallet';

interface IVerifyWalletStateParams {
  chainID: number;
}

export interface IWalletContext {
  connectedAddress: string | null;
  walletManager: WalletManager | null;
  verifyWalletState: (params: IVerifyWalletStateParams) => Promise<void>;
}

const initialValue: IWalletContext = {
  connectedAddress: null,
  walletManager: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  verifyWalletState: async (_: IVerifyWalletStateParams): Promise<void> => {},
};

export const WalletContext = React.createContext<IWalletContext>(initialValue);

export const WalletProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const [connectedAddress, setConnectedAddress] = useState('');
  const [walletManager, setWalletManager] = useState<WalletManager | null>(
    null
  );
  const walletManagerRef = useRef<WalletManager | null>(walletManager);

  const verifyWalletState = useCallback(
    async ({ chainID }: IVerifyWalletStateParams): Promise<void> => {
      const wallet = walletManagerRef.current;

      if (wallet) {
        const walletConnectRes = await wallet.connect();
        if (walletConnectRes.isSuccess && walletConnectRes.data) {
          setConnectedAddress(walletConnectRes.data);
        }

        const isChainSupported = await wallet.isChainSupported(chainID);
        if (isChainSupported) return;

        await wallet.requestSwitchChain(chainID);
      }
    },
    []
  );

  useEffect(() => {
    const walletManagerInstance = new WalletManager();
    setWalletManager(walletManagerInstance);
  }, []);

  useEffect(() => {
    walletManagerRef.current = walletManager;
  }, [walletManager]);

  const contextValues = useMemo((): IWalletContext => {
    return {
      verifyWalletState,
      walletManager,
      connectedAddress,
    };
  }, [verifyWalletState, walletManager, connectedAddress]);

  return (
    <WalletContext.Provider value={contextValues}>
      {children}
    </WalletContext.Provider>
  );
};
