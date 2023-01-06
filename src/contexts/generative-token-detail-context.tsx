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
import { ListingStep } from '@enums/listing-generative';

const LOG_PREFIX = 'GenerativeTokenDetailContext';

export interface IGenerativeTokenDetailContext {
  tokenData: Token | null;
  setTokenData: Dispatch<SetStateAction<Token | null>>;
  showListingModal: boolean;
  openListingModal: () => void;
  hideListingModal: () => void;
  handleListingToken: (_: string) => Promise<void>;
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  listingStep: ListingStep;
  setListingStep: Dispatch<SetStateAction<ListingStep>>;
  listingPrice: number;
  setListingPrice: Dispatch<SetStateAction<number>>;
}

const initialValue: IGenerativeTokenDetailContext = {
  tokenData: null,
  setTokenData: _ => {
    return;
  },
  showListingModal: false,
  openListingModal: () => {
    return;
  },
  hideListingModal: () => {
    return;
  },
  handleListingToken: _ => new Promise(r => r()),
  listingStep: ListingStep.InputInfo,
  setListingStep: _ => {
    return;
  },
  listingPrice: 0,
  setListingPrice: _ => {
    return;
  },
  errorMessage: null,
  setErrorMessage: _ => {
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
  const [listingStep, setListingStep] = useState(ListingStep.InputInfo);
  const [listingPrice, setListingPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { call: listToken } = useContractOperation(ListingTokenOperation, true);
  const { call: checkTokenIsApproved } = useContractOperation(
    IsApprrovedForAllOperation,
    false
  );
  const { call: setApprovalForAll } = useContractOperation(
    SetApprrovalForAllOperation,
    true
  );

  const openListingModal = () => {
    setShowListingModal(true);
    document.body.style.overflow = 'hidden';
  };

  const hideListingModal = () => {
    setShowListingModal(false);
    setListingStep(ListingStep.InputInfo);
    document.body.style.overflow = 'auto';
  };

  const handleListingToken = async (price: string): Promise<void> => {
    setErrorMessage(null);

    if (!tokenData) {
      return;
    }

    // Check if token's already been approved
    const isTokenApproved = await checkTokenIsApproved({
      marketplaceAddress: GENERATIVE_MARKETPLACE_CONTRACT,
      chainID: NETWORK_CHAIN_ID,
      collectionAddress: tokenData.genNFTAddr,
    });
    if (isTokenApproved === null) {
      setErrorMessage('Denied permission.');
      log('user denied permission', LogLevel.Error, LOG_PREFIX);
      return;
    }
    if (!isTokenApproved) {
      const status = await setApprovalForAll({
        marketplaceAddress: GENERATIVE_MARKETPLACE_CONTRACT,
        chainID: NETWORK_CHAIN_ID,
        collectionAddress: tokenData.genNFTAddr,
      });
      if (!status) {
        setErrorMessage('Denied permission.');
        log('user denied permission', LogLevel.Error, LOG_PREFIX);
        return;
      }
    }

    const tx = await listToken({
      collectionAddress: tokenData.genNFTAddr,
      tokenID: tokenData.tokenID,
      durationTime: 0,
      price: price,
      chainID: NETWORK_CHAIN_ID,
    });
    if (!tx) {
      setErrorMessage('Oops. Something went wrong. Please try again later.');
      log('user denied permission', LogLevel.Error, LOG_PREFIX);
      return;
    } else {
      setListingStep(ListingStep.Success);
    }
  };

  const contextValues = useMemo((): IGenerativeTokenDetailContext => {
    return {
      tokenData,
      setTokenData,
      showListingModal,
      handleListingToken,
      listingStep,
      setListingStep,
      listingPrice,
      setListingPrice,
      openListingModal,
      hideListingModal,
      errorMessage,
      setErrorMessage,
    };
  }, [
    tokenData,
    setTokenData,
    showListingModal,
    handleListingToken,
    listingStep,
    setListingStep,
    listingPrice,
    setListingPrice,
    openListingModal,
    hideListingModal,
    errorMessage,
    setErrorMessage,
  ]);

  return (
    <GenerativeTokenDetailContext.Provider value={contextValues}>
      {children}
    </GenerativeTokenDetailContext.Provider>
  );
};
