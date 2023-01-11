import { NETWORK_CHAIN_ID } from '@constants/config';
import {
  GENERATIVE_MARKETPLACE_CONTRACT,
  GENERATIVE_PROJECT_CONTRACT,
  MAX_HEX_VALUE,
  WETH_ADDRESS,
} from '@constants/contract-address';
import { ListingStep } from '@enums/listing-generative';
import { LogLevel } from '@enums/log-level';
import useContractOperation from '@hooks/useContractOperation';
import { MarketplaceStats } from '@interfaces/marketplace';
import { Token, TokenOffer } from '@interfaces/token';
import { getUserSelector } from '@redux/user/selector';
import ApproveTokenAmountOperation from '@services/contract-operations/erc20/approve-token-amount';
import ListingToSaleTokenOperation from '@services/contract-operations/generative-marketplace/list-to-sale-token';
import MakeTokenOfferOperation from '@services/contract-operations/generative-marketplace/make-token-offer';
import PurchaseTokenOperation from '@services/contract-operations/generative-marketplace/purchase-token';
import IsApprrovedForAllOperation from '@services/contract-operations/generative-nft/is-approved-for-all';
import SetApprrovalForAllOperation from '@services/contract-operations/generative-nft/set-approval-for-all';
import AcceptTokenOfferOperation from '@services/contract-operations/generative-marketplace/accept-token-offer';
import CancelTokenOfferOperation from '@services/contract-operations/generative-marketplace/cancel-token-offer';
import TransferTokenOperation from '@services/contract-operations/generative-nft/transfer-token';
import {
  getListing,
  getMakeOffers,
  getMarketplaceStats,
} from '@services/marketplace';
import { getTokenUri } from '@services/token-uri';
import log from '@utils/logger';
import { useRouter } from 'next/router';
import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { ErrorMessage } from '@enums/error-message';
import Web3 from 'web3';
import GetAllowanceAmountOperation from '@services/contract-operations/erc20/get-allowance-amount';
import CancelListingTokenOperation from '@services/contract-operations/generative-marketplace/cancel-listing-token';

const LOG_PREFIX = 'GenerativeTokenDetailContext';

export interface IGenerativeTokenDetailContext {
  tokenData: Token | null;
  setTokenData: Dispatch<SetStateAction<Token | null>>;
  showListingModal: boolean;
  openListingModal: () => void;
  hideListingModal: () => void;
  handleListingToken: (_: string) => Promise<void>;
  marketplaceStats: MarketplaceStats | null;
  setMarketplaceStats: Dispatch<SetStateAction<MarketplaceStats | null>>;
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  listingStep: ListingStep;
  setListingStep: Dispatch<SetStateAction<ListingStep>>;
  listingOffers: Array<TokenOffer>;
  listingPrice: number;
  setListingPrice: Dispatch<SetStateAction<number>>;
  txHash: string | null;
  setTxHash: Dispatch<SetStateAction<string | null>>;
  handlePurchaseToken: (_: TokenOffer) => Promise<void>;
  tokenID: string;
  tokenOffers: Array<TokenOffer>;
  isTokenOwner: boolean;
  isTokenCreator: boolean;
  isTokenListing: boolean;
  showMakeOfferModal: boolean;
  openMakeOfferModal: () => void;
  hideMakeOffergModal: () => void;
  handleMakeTokenOffer: (_price: string, _duration: number) => Promise<void>;
  handleAcceptOffer: (_: TokenOffer) => Promise<void>;
  handleCancelOffer: (_: TokenOffer) => Promise<void>;
  handleTransferToken: (_tokenID: string, _addr: string) => Promise<void>;
  showCancelListingModal: { open: boolean; offer: TokenOffer | null };
  openCancelListingModal: (_: TokenOffer) => void;
  hideCancelListingModal: () => void;
  handleCancelListingOffer: (_: TokenOffer) => Promise<void>;
  showTransferTokenModal: boolean;
  openTransferTokenModal: () => void;
  hideTransferTokenModal: () => void;
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
  marketplaceStats: null,
  setMarketplaceStats: () => {
    return;
  },
  listingPrice: 0,
  setListingPrice: _ => {
    return;
  },
  listingOffers: [],
  errorMessage: null,
  setErrorMessage: _ => {
    return;
  },
  txHash: null,
  setTxHash: _ => {
    return;
  },
  handlePurchaseToken: _ => new Promise(r => r()),
  tokenID: '',
  tokenOffers: [],
  isTokenOwner: false,
  isTokenCreator: false,
  isTokenListing: false,
  showMakeOfferModal: false,
  openMakeOfferModal: () => {
    return;
  },
  hideMakeOffergModal: () => {
    return;
  },
  handleMakeTokenOffer: (_p: string, _d: number) => new Promise(r => r()),
  handleAcceptOffer: _ => new Promise(r => r()),
  handleCancelOffer: _ => new Promise(r => r()),
  handleTransferToken: (_tokenID, _addr) => new Promise(r => r()),
  showCancelListingModal: { open: false, offer: null },
  openCancelListingModal: _ => {
    return;
  },
  hideCancelListingModal: () => {
    return;
  },
  handleCancelListingOffer: _ => new Promise(r => r()),
  showTransferTokenModal: false,
  openTransferTokenModal: () => {
    return;
  },
  hideTransferTokenModal: () => {
    return;
  },
};

export const GenerativeTokenDetailContext =
  createContext<IGenerativeTokenDetailContext>(initialValue);

export const GenerativeTokenDetailProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const [tokenData, setTokenData] = useState<Token | null>(null);
  const [tokenOffers, setTokenOffers] = useState<Array<TokenOffer>>([]);
  const [showListingModal, setShowListingModal] = useState(false);
  const [showMakeOfferModal, setShowMakeOfferModal] = useState(false);
  const [showTransferTokenModal, setShowTransferTokenModal] = useState(false);
  const [showCancelListingModal, setShowCancelListingModal] = useState<{
    open: boolean;
    offer: TokenOffer | null;
  }>({ open: false, offer: null });
  const [listingStep, setListingStep] = useState(ListingStep.InputInfo);
  const [listingPrice, setListingPrice] = useState(0);
  const [listingOffers, setListingOffers] = useState<Array<TokenOffer>>([]);
  const [marketplaceStats, setMarketplaceStats] =
    useState<MarketplaceStats | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [txHash, setTxHash] = useState<string | null>(null);
  const user = useSelector(getUserSelector);
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
  const { call: makeTokenOffer } = useContractOperation(
    MakeTokenOfferOperation,
    true
  );
  const { call: approveTokenAmount } = useContractOperation(
    ApproveTokenAmountOperation,
    true
  );
  const { call: getAllowanceAmount } = useContractOperation(
    GetAllowanceAmountOperation,
    true
  );
  const { call: acceptOffer } = useContractOperation(
    AcceptTokenOfferOperation,
    true
  );
  const { call: cancelOffer } = useContractOperation(
    CancelTokenOfferOperation,
    true
  );
  const { call: transferToken } = useContractOperation(
    TransferTokenOperation,
    true
  );
  const { call: cancelListingToken } = useContractOperation(
    CancelListingTokenOperation,
    true
  );
  const router = useRouter();
  const { tokenID } = router.query as {
    tokenID: string;
  };

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

  const openMakeOfferModal = () => {
    setShowMakeOfferModal(true);
    document.body.style.overflow = 'hidden';
  };

  const hideMakeOffergModal = () => {
    // Reset state
    setShowMakeOfferModal(false);
    setTxHash(null);

    // Recover scroll behavior
    document.body.style.overflow = 'auto';
  };

  const openCancelListingModal = (offer: TokenOffer) => {
    setShowCancelListingModal({ open: true, offer });
    document.body.style.overflow = 'hidden';
  };

  const hideCancelListingModal = () => {
    // Reset state
    setShowCancelListingModal({ open: false, offer: null });
    setTxHash(null);

    // Recover scroll behavior
    document.body.style.overflow = 'auto';
  };

  const openTransferTokenModal = () => {
    setShowTransferTokenModal(true);
    document.body.style.overflow = 'hidden';
  };

  const hideTransferTokenModal = () => {
    // Reset state
    setShowTransferTokenModal(false);
    setTxHash(null);

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
      setErrorMessage(ErrorMessage.DEFAULT);
      log('listing token transaction error.', LogLevel.Error, LOG_PREFIX);
      return;
    } else {
      setListingStep(ListingStep.Success);
      setTxHash(tx.transactionHash);

      // Refresh listing offers
      fetchListingTokenOffers();
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
      toast.error(ErrorMessage.DEFAULT);
      log('purchase token transaction error.', LogLevel.Error, LOG_PREFIX);
    } else {
      toast.success('You has bought this art successfully');

      // Reload token data to update owner
      fetchTokenData();
    }
  };

  const handleMakeTokenOffer = async (price: string, durationTime: number) => {
    if (!tokenData) {
      return;
    }

    const allowanceAmount = await getAllowanceAmount({
      consumerAddress: GENERATIVE_MARKETPLACE_CONTRACT,
      chainID: NETWORK_CHAIN_ID,
      contractAddress: WETH_ADDRESS,
    });

    if (allowanceAmount === null) {
      log('Can not get allowanceAmount.', LogLevel.Error, LOG_PREFIX);
      throw Error(ErrorMessage.DEFAULT);
    }

    if (BigInt(allowanceAmount) < BigInt(MAX_HEX_VALUE)) {
      const approveTokenTx = await approveTokenAmount({
        contractAddress: WETH_ADDRESS,
        chainID: NETWORK_CHAIN_ID,
        consumerAddress: GENERATIVE_MARKETPLACE_CONTRACT,
      });

      if (!approveTokenTx) {
        log('User rejected WETH permission.', LogLevel.Error, LOG_PREFIX);
        throw Error(ErrorMessage.DEFAULT);
      }
    }

    const tx = await makeTokenOffer({
      collectionAddress: tokenData.genNFTAddr,
      tokenID: tokenData.tokenID,
      durationTime: durationTime,
      price: price,
      erc20Token: WETH_ADDRESS,
      chainID: NETWORK_CHAIN_ID,
    });

    if (!tx) {
      log('Make token offer transaction error.', LogLevel.Error, LOG_PREFIX);
      throw Error(ErrorMessage.DEFAULT);
    }

    hideMakeOffergModal();

    // Refresh offers data
    fetchTokenOffers();
  };

  const handleAcceptOffer = async (offer: TokenOffer): Promise<void> => {
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

    // Accept offer
    const tx = await acceptOffer({
      offerId: offer.offeringID,
      chainID: NETWORK_CHAIN_ID,
    });

    if (!tx) {
      log('Accept token offer transaction error.', LogLevel.Error, LOG_PREFIX);
      throw Error(ErrorMessage.DEFAULT);
    }

    // Refresh offers data
    fetchTokenOffers();
  };

  const handleCancelOffer = async (offer: TokenOffer): Promise<void> => {
    const tx = await cancelOffer({
      offerId: offer.offeringID,
      chainID: NETWORK_CHAIN_ID,
    });

    if (!tx) {
      log('Cancel token offer transaction error.', LogLevel.Error, LOG_PREFIX);
      throw Error(ErrorMessage.DEFAULT);
    }

    // Refresh offers data
    fetchTokenOffers();
  };

  const handleTransferToken = async (
    tokenID: string,
    toAddress: string
  ): Promise<void> => {
    if (!tokenData) {
      return;
    }

    const tx = await transferToken({
      chainID: NETWORK_CHAIN_ID,
      toAddress,
      tokenID,
      collectionAddress: tokenData?.genNFTAddr,
    });

    if (!tx) {
      log('Cancel token offer transaction error.', LogLevel.Error, LOG_PREFIX);
      throw Error(ErrorMessage.DEFAULT);
    }

    // Refresh offers data
    fetchTokenData();
  };

  const handleCancelListingOffer = async (offer: TokenOffer): Promise<void> => {
    const tx = await cancelListingToken({
      offerId: offer.offeringID,
      chainID: NETWORK_CHAIN_ID,
    });

    if (!tx) {
      log(
        'Cancel listing token offer transaction error.',
        LogLevel.Error,
        LOG_PREFIX
      );
      throw Error(ErrorMessage.DEFAULT);
    }

    hideCancelListingModal();

    // Refresh offers data
    fetchListingTokenOffers();
  };

  const fetchTokenData = async (): Promise<void> => {
    try {
      if (tokenID) {
        const res = await getTokenUri({
          contractAddress: GENERATIVE_PROJECT_CONTRACT,
          tokenID,
        });
        setTokenData(res);
      }
    } catch (err: unknown) {
      log('failed to fetch item detail', LogLevel.Error, LOG_PREFIX);
    }
  };

  const fetchTokenOffers = async () => {
    try {
      if (tokenData && tokenData.genNFTAddr && tokenID) {
        const { result } = await getMakeOffers({
          genNFTAddr: tokenData.genNFTAddr,
          tokenId: tokenID,
          closed: false,
        });
        if (result) {
          setTokenOffers(result);
        }
      }
    } catch (e) {
      log('can not fetch offers', LogLevel.Error, LOG_PREFIX);
    }
  };

  const fetchMarketplaceStats = async () => {
    try {
      if (tokenData && tokenData?.genNFTAddr) {
        const res = await getMarketplaceStats({
          collectionAddr: tokenData?.genNFTAddr,
        });
        if (res) setMarketplaceStats(res?.stats);
      }
    } catch (e) {
      log('can not fetch price', LogLevel.Error, '');
    }
  };

  const fetchListingTokenOffers = async () => {
    try {
      if (tokenData && tokenData.genNFTAddr) {
        const listingTokens = await getListing(
          {
            genNFTAddr: tokenData.genNFTAddr,
            tokenId: tokenID,
          },
          {
            closed: false,
            sort_by: 'newest',
            sort: -1,
          }
        );
        if (listingTokens && listingTokens.result[0]) {
          setListingOffers(listingTokens.result);
          setListingPrice(
            Number(Web3.utils.fromWei(listingTokens.result[0].price, 'ether'))
          );
        }
      }
    } catch (e) {
      log('can not fetch price', LogLevel.Error, '');
    }
  };

  const isTokenOwner = useMemo(() => {
    if (!user.walletAddress || !tokenData?.ownerAddr) return false;
    return user.walletAddress === tokenData?.ownerAddr;
  }, [tokenData, user]);

  const isTokenCreator = useMemo(() => {
    if (!user.walletAddress || !tokenData?.creator?.walletAddress) return false;
    return user.walletAddress === tokenData?.creator?.walletAddress;
  }, [tokenData, user]);

  const isTokenListing = useMemo(() => {
    if (!user.walletAddress || !listingOffers || listingOffers.length === 0)
      return false;
    return listingOffers.length > 0;
  }, [user, listingOffers]);

  useEffect(() => {
    fetchTokenData();
  }, [tokenID]);

  useEffect(() => {
    fetchTokenOffers();
    fetchListingTokenOffers();
    fetchMarketplaceStats();
  }, [tokenData]);

  const contextValues = useMemo((): IGenerativeTokenDetailContext => {
    return {
      tokenData,
      setTokenData,
      showListingModal,
      handleListingToken,
      marketplaceStats,
      setMarketplaceStats,
      listingStep,
      setListingStep,
      listingOffers,
      listingPrice,
      setListingPrice,
      openListingModal,
      hideListingModal,
      errorMessage,
      setErrorMessage,
      txHash,
      setTxHash,
      handlePurchaseToken,
      tokenID,
      tokenOffers,
      isTokenOwner,
      isTokenCreator,
      isTokenListing,
      showMakeOfferModal,
      openMakeOfferModal,
      hideMakeOffergModal,
      handleMakeTokenOffer,
      handleAcceptOffer,
      handleCancelOffer,
      handleTransferToken,
      showCancelListingModal,
      openCancelListingModal,
      hideCancelListingModal,
      handleCancelListingOffer,
      showTransferTokenModal,
      openTransferTokenModal,
      hideTransferTokenModal,
    };
  }, [
    tokenData,
    setTokenData,
    showListingModal,
    handleListingToken,
    marketplaceStats,
    setMarketplaceStats,
    listingOffers,
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
    tokenID,
    tokenOffers,
    isTokenOwner,
    isTokenCreator,
    isTokenListing,
    showMakeOfferModal,
    openMakeOfferModal,
    hideMakeOffergModal,
    handleMakeTokenOffer,
    handleAcceptOffer,
    handleCancelOffer,
    handleTransferToken,
    showCancelListingModal,
    openCancelListingModal,
    hideCancelListingModal,
    handleCancelListingOffer,
    showTransferTokenModal,
    openTransferTokenModal,
    hideTransferTokenModal,
  ]);

  return (
    <GenerativeTokenDetailContext.Provider value={contextValues}>
      {children}
    </GenerativeTokenDetailContext.Provider>
  );
};
