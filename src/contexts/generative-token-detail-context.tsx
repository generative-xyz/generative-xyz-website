import { Token, TokenOffer } from '@interfaces/token';
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
import ListingToSaleTokenOperation from '@services/contract-operations/generative-marketplace/list-to-sale-token';
import IsApprrovedForAllOperation from '@services/contract-operations/generative-nft/is-approved-for-all';
import SetApprrovalForAllOperation from '@services/contract-operations/generative-nft/set-approval-for-all';
import { LogLevel } from '@enums/log-level';
import log from '@utils/logger';
import { ListingStep } from '@enums/listing-generative';
import PurchaseTokenOperation from '@services/contract-operations/generative-marketplace/purchase-token';
import { toast } from 'react-hot-toast';

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
  txHash: string | null;
  setTxHash: Dispatch<SetStateAction<string | null>>;
  handlePurchaseToken: (_: TokenOffer) => Promise<void>;
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
  txHash: null,
  setTxHash: _ => {
    return;
  },
  handlePurchaseToken: _ => new Promise(r => r()),
};

export const GenerativeTokenDetailContext =
  createContext<IGenerativeTokenDetailContext>(initialValue);

export const GenerativeTokenDetailProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const [tokenData, setTokenData] = useState<Token | null>(null);
  const [showListingModal, setShowListingModal] = useState(false);
  const [listingStep, setListingStep] = useState(ListingStep.Success);
  const [listingPrice, setListingPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const { call: listToken } = useContractOperation(
    ListingToSaleTokenOperation,
    true
  );
  const { call: checkTokenIsApproved } = useContractOperation(
    IsApprrovedForAllOperation,
    false
  );
  const { call: setApprovalForAll } = useContractOperation(
    SetApprrovalForAllOperation,
    true
  );
  const { call: purchaseToken } = useContractOperation(
    PurchaseTokenOperation,
    true
  );

  const openListingModal = () => {
    setShowListingModal(true);
    document.body.style.overflow = 'hidden';
  };

  const hideListingModal = () => {
    // Reset state
    setShowListingModal(false);
    setListingStep(ListingStep.InputInfo);
    setTxHash(null);
    setListingPrice(0);

    // Recover scroll behavior
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
      setErrorMessage('Transaction rejected.');
      log('listing token transaction error.', LogLevel.Error, LOG_PREFIX);
      return;
    }
    if (!isTokenApproved) {
      const status = await setApprovalForAll({
        marketplaceAddress: GENERATIVE_MARKETPLACE_CONTRACT,
        chainID: NETWORK_CHAIN_ID,
        collectionAddress: tokenData.genNFTAddr,
      });
      if (!status) {
        setErrorMessage('Transaction rejected.');
        log('listing token transaction error.', LogLevel.Error, LOG_PREFIX);
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
      log('listing token transaction error.', LogLevel.Error, LOG_PREFIX);
      return;
    } else {
      setListingStep(ListingStep.Success);
      setTxHash(tx.transactionHash);
    }
  };

  const handlePurchaseToken = async (offer: TokenOffer): Promise<void> => {
    if (!offer.offeringID || !offer.price) {
      return;
    }

    const tx = await purchaseToken({
      offerId: offer.offeringID,
      price: offer.price,
      chainID: NETWORK_CHAIN_ID,
    });
    if (!tx) {
      toast.error('Oops. Something went wrong. Please try again later.');
      log('purchase token transaction error.', LogLevel.Error, LOG_PREFIX);
    } else {
      toast.success('You has bought this art successfully');
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
      txHash,
      setTxHash,
      handlePurchaseToken,
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
    txHash,
    setTxHash,
    handlePurchaseToken,
  ]);

  return (
    <GenerativeTokenDetailContext.Provider value={contextValues}>
      {children}
    </GenerativeTokenDetailContext.Provider>
  );
};
