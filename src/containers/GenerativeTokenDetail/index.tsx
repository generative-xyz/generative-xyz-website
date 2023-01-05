import ButtonIcon from '@components/ButtonIcon';
import Stats from '@components/Stats';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { LogLevel } from '@enums/log-level';
import { getTokenUri } from '@services/token-uri';
import { formatAddress, formatTokenId } from '@utils/format';
import log from '@utils/logger';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import s from './styles.module.scss';
import { Container } from 'react-bootstrap';
import Heading from '@components/Heading';
import Text from '@components/Text';
import dayjs from 'dayjs';
import Accordion from '@components/Accordion';
import { getChainName, getScanUrl } from '@utils/chain';
import { v4 } from 'uuid';
import {
  GenerativeTokenDetailContext,
  GenerativeTokenDetailProvider,
} from '@contexts/generative-token-detail-context';
import MoreItemsSection from './MoreItemsSection';
import ThumbnailPreview from '@components/ThumbnailPreview';
import ListingTokenModal from './ListingTokenModal';

const LOG_PREFIX = 'GenerativeTokenDetail';

const GenerativeTokenDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { tokenData, setTokenData, openListingModal } = useContext(
    GenerativeTokenDetailContext
  );
  const { tokenID } = router.query as {
    projectID: string;
    tokenID: string;
  };
  const scanURL = getScanUrl();
  const mintedDate = dayjs(tokenData?.mintedTime).format('MMM DD, YYYY');
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

  const featuresList = () => {
    if (tokenData?.attributes && tokenData.attributes?.length > 0) {
      const list = tokenData.attributes.map(attr => {
        return {
          id: `attr-${v4()}`,
          info: attr.trait_type,
          value: attr.value.toString(),
          link: '',
        };
      });
      return list;
    }
    return null;
  };

  const tokenDescription =
    tokenData?.description || tokenData?.project?.desc || '';

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
      throw Error('failed to fetch item detail');
    }
  };

  useEffect(() => {
    fetchTokenData();
  }, [tokenID]);

  return (
    <>
      <Container>
        <div className={s.wrapper} style={{ marginBottom: '100px' }}>
          <div className={s.itemInfo}>
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
              <ButtonIcon onClick={handleOpenListingTokenModal}>
                List for sale
              </ButtonIcon>
              <ButtonIcon variants="outline">Transfer</ButtonIcon>
              <ButtonIcon>Buy</ButtonIcon>
              <ButtonIcon variants="outline">Make offer</ButtonIcon>
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
              <Accordion
                header={'Owner'}
                content={
                  <Text
                    size="18"
                    fontWeight="medium"
                    className={s.walletAddress}
                  >
                    {tokenData?.owner?.displayName ||
                      formatAddress(
                        tokenData?.ownerAddr ||
                          tokenData?.owner?.walletAddress ||
                          ''
                      )}
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
                  >
                    {tokenData?.creator?.displayName ||
                      formatAddress(tokenData?.creator?.walletAddress || '')}
                  </Text>
                }
              ></Accordion>
              <Accordion
                header={'Minted on'}
                content={
                  <Text size="18" fontWeight="semibold">
                    {mintedDate}
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
        <div></div>
        {tokenData?.project.genNFTAddr && (
          <MoreItemsSection genNFTAddr={tokenData.project.genNFTAddr} />
        )}
      </Container>
      <ListingTokenModal />
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
