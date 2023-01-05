import { Token } from '@interfaces/token';
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { GENERATIVE_MARKETPLACE_CONTRACT } from '@constants/contract-address';
import { NETWORK_CHAIN_ID } from '@constants/config';
import useContractOperation from '@hooks/useContractOperation';
import ListingTokenOperation from '@services/contract-operations/generative-marketplace/listing-token';
import IsApprrovedForAllOperation from '@services/contract-operations/generative-nft/is-approved-for-all';
import SetApprrovalForAllOperation from '@services/contract-operations/generative-nft/set-approval-for-all';
import { LogLevel } from '@enums/log-level';
import log from '@utils/logger';

const LOG_PREFIX = 'GenerativeTokenDetailContext';

export interface IGenerativeTokenDetailContext {
  tokenData: Token | null;
  setTokenData: Dispatch<SetStateAction<Token | null>>;
  showListingModal: boolean;
  setShowListingModal: Dispatch<SetStateAction<boolean>>;
  handleListingToken: () => Promise<void>;
  isMinting: boolean;
  setIsMinting: Dispatch<SetStateAction<boolean>>;
}

const initialValue: IGenerativeTokenDetailContext = {
  tokenData: null,
  setTokenData: _ => {
    return;
  },
  showListingModal: false,
  setShowListingModal: _ => {
    return;
  },
  handleListingToken: () => new Promise(r => r()),
  isMinting: false,
  setIsMinting: _ => {
    return;
  },
};

export const GenerativeTokenDetailContext =
  createContext<IGenerativeTokenDetailContext>(initialValue);

export const GenerativeTokenDetailProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const [tokenData, setTokenData] = useState<Token | null>(null);
  const [showListingModal, setShowListingModal] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const { call: _ } = useContractOperation(ListingTokenOperation, true);
  const { call: checkTokenIsApproved } = useContractOperation(
    IsApprrovedForAllOperation,
    false
  );
  const { call: setApprovalForAll } = useContractOperation(
    SetApprrovalForAllOperation,
    true
  );

  const handleListingToken = async (): Promise<void> => {
    try {
      if (!tokenData) {
        return;
      }

      // setIsMinting(true);
      // Check if token's already been approved
      const isTokenApproved = await checkTokenIsApproved({
        marketplaceAddress: GENERATIVE_MARKETPLACE_CONTRACT,
        chainID: NETWORK_CHAIN_ID,
      });
      if (!isTokenApproved) {
        const status = await setApprovalForAll({
          marketplaceAddress: GENERATIVE_MARKETPLACE_CONTRACT,
          chainID: NETWORK_CHAIN_ID,
        });
        if (!status) {
          log('user denied permission', LogLevel.Error, LOG_PREFIX);
          return;
        }
      }
      // const tx = await listToken({
      //   collectionAddress: itemDetail.genNFTAddr,
      //   tokenID: itemDetail.name,
      //   durationTime: 0,
      //   price:
      // })
    } catch (err: unknown) {
      log(err as Error, LogLevel.Error, LOG_PREFIX);
    } finally {
      setIsMinting(false);
    }
  };

  const contextValues = useMemo((): IGenerativeTokenDetailContext => {
    return {
      tokenData,
      setTokenData,
      showListingModal,
      setShowListingModal,
      isMinting,
      setIsMinting,
      handleListingToken,
    };
  }, [
    tokenData,
    setTokenData,
    showListingModal,
    setShowListingModal,
    isMinting,
    setIsMinting,
    setIsMinting,
  ]);

  return (
    <GenerativeTokenDetailContext.Provider value={contextValues}>
      {children}
    </GenerativeTokenDetailContext.Provider>
  );
};
