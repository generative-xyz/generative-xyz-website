import Accordion from '@components/Accordion';
import ButtonIcon from '@components/ButtonIcon';
import Heading from '@components/Heading';
import { Loading } from '@components/Loading';
import Stats from '@components/Stats';
import Text from '@components/Text';
import ThumbnailPreview from '@components/ThumbnailPreview';
import { ROUTE_PATH } from '@constants/route-path';
import {
  GenerativeTokenDetailContext,
  GenerativeTokenDetailProvider,
} from '@contexts/generative-token-detail-context';
import { getChainName, getScanUrl } from '@utils/chain';
import { formatAddress, formatTokenId } from '@utils/format';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { v4 } from 'uuid';
import ListingTokenModal from './ListingTokenModal';
import MakeOfferModal from './MakeOfferModal';
import MoreItemsSection from './MoreItemsSection';
import TokenActivities from './TokenActivities';
import CancelListingModal from './CancelListingModal';
import TransferTokenModal from './TransferTokenModal';
import s from './styles.module.scss';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@redux/user/selector';
import { TokenOffer } from '@interfaces/token';
import { toast } from 'react-hot-toast';

// const LOG_PREFIX = 'GenerativeTokenDetail';

const GenerativeTokenDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const {
    tokenData,
    tokenID,
    openListingModal,
    openMakeOfferModal,
    openTransferTokenModal,
    openCancelListingModal,
    handlePurchaseToken,
    isTokenOwner,
    isTokenCreator,
    isTokenListing,
    listingPrice,
    listingOffers,
  } = useContext(GenerativeTokenDetailContext);
  const scanURL = getScanUrl();
  const user = useSelector(getUserSelector);
  const mintedDate = dayjs(tokenData?.mintedTime).format('MMM DD, YYYY');
  const [isBuying, setIsBuying] = useState(false);
  const tokenInfos = [
    {
      id: 'contract-address',
      info: 'Contract Address',
      value: formatAddress(tokenData?.project.genNFTAddr || ''),
      link: `${scanURL}/token/${tokenData?.project.genNFTAddr}`,
    },
    {
      id: 'token-id',
      info: 'Token ID',
      value: formatTokenId(tokenID),
      link: `${scanURL}/token/${tokenData?.project.genNFTAddr}?a=${tokenID}`,
    },
    {
      id: 'token-standard',
      info: 'Token Standard',
      value: 'ERC-721',
      link: '',
    },
    {
      id: 'blockchain',
      info: 'Blockchain',
      value: getChainName() || '',
      link: '',
    },
  ];

  const handleOpenListingTokenModal = (): void => {
    openListingModal();
  };

  const handleOpenMakeOfferModal = (): void => {
    openMakeOfferModal();
  };

  const handleOpenCancelListingTokenModal = (): void => {
    const userListingOffer = listingOffers.find(
      (offer: TokenOffer) => offer.seller === user.walletAddress
    );
    if (userListingOffer) {
      openCancelListingModal(userListingOffer);
    } else {
      toast.error('Listing offer not found');
    }
  };

  const handleOpenTransferTokenModal = (): void => {
    openTransferTokenModal();
  };

  const featuresList = () => {
    if (tokenData?.attributes && tokenData.attributes?.length > 0) {
      return tokenData.attributes.map(attr => {
        return {
          id: `attr-${v4()}`,
          info: attr.trait_type,
          value: attr.value.toString(),
          link: '',
        };
      });
    }
    return null;
  };

  const tokenDescription =
    tokenData?.description || tokenData?.project?.desc || '';

  const handleLinkProfile = () => {
    router.push(`${ROUTE_PATH.PROFILE}`);
  };

  const handleBuyToken = async (): Promise<void> => {
    setIsBuying(true);
    await handlePurchaseToken(listingOffers[0]);
    setIsBuying(false);
  };

  return (
    <>
      <Container>
        <div className={s.wrapper} style={{ marginBottom: '100px' }}>
          <div className={s.itemInfo}>
            <Loading isLoaded={!!tokenData} className={s.loading_token} />
            <Heading as="h4" fontWeight="bold">
              {tokenData?.project?.name} #
              {formatTokenId(tokenData?.tokenID || '')}
            </Heading>
            <div className={s.prices}>
              {/* TODO: Remove when API ready  */}
              {/* <div>
              <Text size="12" fontWeight="bold">
                Price
              </Text>
              <Heading as="h5" fontWeight="bold">
                0.01 ETH
              </Heading>
            </div>
            <div>
              <Text size="12" fontWeight="bold">
                highest offer
              </Text>
              <Heading as="h5" fontWeight="bold">
                0.2 ETH
              </Heading>
            </div> */}
              {isTokenListing && (
                <div>
                  <Text size="12" fontWeight="bold">
                    Price
                  </Text>
                  <Heading as="h4" fontWeight="bold">
                    Ξ {listingPrice}
                  </Heading>
                </div>
              )}

              <div>
                <Text size="12" fontWeight="bold">
                  Royalty
                </Text>
                <Heading as="h4" fontWeight="bold">
                  {(tokenData?.project?.royalty || 0) / 100}%
                </Heading>
              </div>
            </div>
            <div className={s.CTA_btn}>
              {/* Due to owner and status of this token to render appropriate action */}
              {isTokenOwner && !isTokenListing && (
                <ButtonIcon
                  disabled={!tokenData}
                  onClick={handleOpenListingTokenModal}
                >
                  List for sale
                </ButtonIcon>
              )}
              {isTokenOwner && isTokenListing && (
                <ButtonIcon
                  disabled={!tokenData}
                  onClick={handleOpenCancelListingTokenModal}
                >
                  Cancel listing
                </ButtonIcon>
              )}
              {isTokenOwner && (
                <ButtonIcon
                  onClick={handleOpenTransferTokenModal}
                  disabled={!tokenData}
                  variants="outline"
                >
                  Transfer
                </ButtonIcon>
              )}
              {!isTokenOwner && isTokenListing && (
                <>
                  <ButtonIcon
                    disabled={!listingOffers.length || isBuying}
                    onClick={handleBuyToken}
                  >
                    Buy
                  </ButtonIcon>
                </>
              )}
              {!isTokenOwner && (
                <ButtonIcon
                  onClick={handleOpenMakeOfferModal}
                  disabled={!tokenData}
                  variants="outline"
                >
                  Make offer
                </ButtonIcon>
              )}
            </div>
            <div className={s.accordions}>
              {!!tokenDescription && (
                <Accordion
                  header={'DESCRIPTION'}
                  content={tokenDescription}
                ></Accordion>
              )}
              {tokenData?.attributes && tokenData.attributes?.length > 0 && (
                <Accordion
                  header={'Features'}
                  content={<Stats data={featuresList()} />}
                ></Accordion>
              )}
              {mintedDate && (
                <Accordion
                  header={'Minted on'}
                  content={
                    <Text size="18" fontWeight="semibold">
                      {mintedDate}
                    </Text>
                  }
                ></Accordion>
              )}
              <Accordion
                header={'Owner'}
                content={
                  <Text
                    size="18"
                    fontWeight="medium"
                    className={s.walletAddress}
                    onClick={handleLinkProfile}
                  >
                    {tokenData?.owner?.displayName ||
                      formatAddress(
                        tokenData?.ownerAddr ||
                          tokenData?.owner?.walletAddress ||
                          ''
                      )}
                    {isTokenOwner && ' (by you)'}
                  </Text>
                }
              ></Accordion>
              <Accordion
                header={'Creator'}
                content={
                  <Text
                    size="18"
                    fontWeight="medium"
                    className={s.walletAddress}
                    onClick={handleLinkProfile}
                  >
                    {tokenData?.creator?.displayName ||
                      formatAddress(tokenData?.creator?.walletAddress || '')}
                    {isTokenCreator && ' (by you)'}
                  </Text>
                }
              ></Accordion>

              <Accordion
                header={'Token Info'}
                content={<Stats data={tokenInfos} />}
              ></Accordion>
            </div>
          </div>
          <div className="h-divider"></div>
          <div>
            <ThumbnailPreview data={tokenData} previewToken />
          </div>
        </div>
        <div className="h-divider"></div>

        <TokenActivities></TokenActivities>
        {tokenData?.project.genNFTAddr && (
          <MoreItemsSection genNFTAddr={tokenData.project.genNFTAddr} />
        )}
      </Container>

      <ListingTokenModal />
      <MakeOfferModal />
      <CancelListingModal />
      <TransferTokenModal />
    </>
  );
};

const GenerativeTokenDetailWrapper: React.FC = (): React.ReactElement => {
  return (
    <GenerativeTokenDetailProvider>
      <GenerativeTokenDetail />
    </GenerativeTokenDetailProvider>
  );
};

export default GenerativeTokenDetailWrapper;
