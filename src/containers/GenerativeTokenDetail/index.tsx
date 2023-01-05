import Accordion from '@components/Accordion';
import ButtonIcon from '@components/ButtonIcon';
import Heading from '@components/Heading';
import Stats from '@components/Stats';
import Text from '@components/Text';
import ThumbnailPreview from '@components/ThumbnailPreview';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { LogLevel } from '@enums/log-level';
import { IGetGenerativeTokenUriResponse } from '@interfaces/api/token-uri';
import { getTokenUri } from '@services/token-uri';
import { getChainName, getScanUrl } from '@utils/chain';
import { formatAddress, formatTokenId } from '@utils/format';
import log from '@utils/logger';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { v4 } from 'uuid';
import MoreItemsSection from './MoreItemsSection';
import s from './styles.module.scss';

const LOG_PREFIX = 'GenerativeTokenDetail';

const GenerativeTokenDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { tokenID } = router.query as {
    projectID: string;
    tokenID: string;
  };

  const [itemDetail, setItemDetail] =
    useState<IGetGenerativeTokenUriResponse | null>(null);

  const scanURL = getScanUrl();

  const mintedDate = dayjs(itemDetail?.mintedTime).format('MMM DD, YYYY');

  const tokenInfos = [
    {
      id: 'contract-address',
      info: 'Contract Address',
      value: formatAddress(itemDetail?.project.genNFTAddr || ''),
      link: `${scanURL}/token/${itemDetail?.project.genNFTAddr}`,
    },
    {
      id: 'token-id',
      info: 'Token ID',
      value: formatTokenId(tokenID),
      link: `${scanURL}/token/${itemDetail?.project.genNFTAddr}?a=${tokenID}`,
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

  const featuresList = () => {
    if (itemDetail?.attributes && itemDetail.attributes?.length > 0) {
      const list = itemDetail.attributes.map(attr => {
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
    itemDetail?.description || itemDetail?.project?.desc || '';

  const fetchItemDetail = async (): Promise<void> => {
    try {
      if (tokenID) {
        const res = await getTokenUri({
          contractAddress: GENERATIVE_PROJECT_CONTRACT,
          tokenID,
        });
        setItemDetail(res);
      }
    } catch (err: unknown) {
      log('failed to fetch item detail', LogLevel.Error, LOG_PREFIX);
      throw Error('failed to fetch item detail');
    }
  };

  useEffect(() => {
    fetchItemDetail();
  }, [tokenID]);

  return (
    <Container>
      <div className={s.wrapper} style={{ marginBottom: '100px' }}>
        <div className={s.itemInfo}>
          <Heading as="h4" fontWeight="bold">
            {itemDetail?.project?.name} #
            {formatTokenId(itemDetail?.tokenID || '')}
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
                {(itemDetail?.project?.royalty || 0) / 100}%
              </Heading>
            </div>
          </div>
          <div className={s.CTA_btn}>
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
            {itemDetail?.attributes && itemDetail.attributes?.length > 0 && (
              <Accordion
                header={'Features'}
                content={<Stats data={featuresList()} />}
              ></Accordion>
            )}
            <Accordion
              header={'Owner'}
              content={
                <Text size="18" fontWeight="medium" className={s.walletAddress}>
                  {itemDetail?.owner?.displayName ||
                    formatAddress(
                      itemDetail?.ownerAddr ||
                        itemDetail?.owner?.walletAddress ||
                        ''
                    )}
                </Text>
              }
            ></Accordion>
            <Accordion
              header={'Creator'}
              content={
                <Text size="18" fontWeight="medium" className={s.walletAddress}>
                  {itemDetail?.creator?.displayName ||
                    formatAddress(itemDetail?.creator?.walletAddress || '')}
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
          <ThumbnailPreview data={itemDetail} previewToken />
        </div>
      </div>
      <div></div>
      {itemDetail?.project.genNFTAddr && (
        <MoreItemsSection genNFTAddr={itemDetail.project.genNFTAddr} />
      )}
    </Container>
  );
};

export default GenerativeTokenDetail;
