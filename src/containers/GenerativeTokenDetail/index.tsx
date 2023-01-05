import Accordion from '@components/Accordion';
import Avatar from '@components/Avatar';
import ButtonIcon from '@components/ButtonIcon';
import Heading from '@components/Heading';
import Stats from '@components/Stats';
import SvgInset from '@components/SvgInset';
import Text from '@components/Text';
import ThumbnailPreview from '@components/ThumbnailPreview';
import { CDN_URL } from '@constants/config';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { LogLevel } from '@enums/log-level';
import { IGetGenerativeTokenUriResponse } from '@interfaces/api/token-uri';
import { getTokenUri } from '@services/token-uri';
import { getChainName, getScanUrl } from '@utils/chain';
import { formatAddress } from '@utils/format';
import log from '@utils/logger';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { v4 } from 'uuid';
import MoreItemsSection from './MoreItemsSection';
import s from './styles.module.scss';

const LOG_PREFIX = 'GenerativeTokenDetail';

const MOCK_GEN_NFT_ADD = '0x15132113378dcd969b2dcac7cfc25526b35a2baa';

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
      value: tokenID,
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
        <div>
          <Heading as="h4" fontWeight="bold">
            {itemDetail?.name}
          </Heading>
          <Heading as="h5" fontWeight="bold" className={s.collectionName}>
            {itemDetail?.project?.name}
          </Heading>
          <div className={s.usersInfo}>
            <div className={s.usersInfo_item}>
              {itemDetail?.owner && (
                <Avatar
                  imgSrcs={itemDetail?.owner?.avatar}
                  width={34}
                  height={34}
                />
              )}
              <div>
                <Text
                  size="12"
                  fontWeight="bold"
                  className={s.usersInfo_mainText}
                >
                  Owner
                </Text>
                <Text fontWeight="semibold">
                  {itemDetail?.owner?.displayName ||
                    formatAddress(
                      itemDetail?.ownerAddr ||
                        itemDetail?.owner?.walletAddress ||
                        ''
                    )}
                </Text>
              </div>
            </div>
            <div className={s.usersInfo_item}>
              {itemDetail?.creator && (
                <Avatar
                  imgSrcs={itemDetail?.creator?.avatar}
                  width={34}
                  height={34}
                />
              )}
              <div>
                <Text
                  size="12"
                  fontWeight="bold"
                  className={s.usersInfo_mainText}
                >
                  Creator
                </Text>
                <Text fontWeight="semibold">
                  {itemDetail?.creator?.displayName ||
                    formatAddress(
                      itemDetail?.ownerAddr ||
                        itemDetail?.creator?.walletAddress ||
                        ''
                    )}
                </Text>
              </div>
            </div>
            <div className={s.usersInfo_item}>
              <SvgInset svgUrl={`${CDN_URL}/icons/ic-calendar.svg`} />
              <div>
                <Text
                  size="12"
                  fontWeight="bold"
                  className={s.usersInfo_mainText}
                >
                  Created date
                </Text>
                <Text fontWeight="semibold">{mintedDate}</Text>
              </div>
            </div>
          </div>
          <div className="divider"></div>
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
              <Heading as="h5" fontWeight="bold">
                {(itemDetail?.project?.royalty || 0) / 100}%
              </Heading>
            </div>
          </div>
          <div className={s.CTA_btn}>
            <ButtonIcon>Buy</ButtonIcon>
            <ButtonIcon variants="outline">Make offer</ButtonIcon>
          </div>
          <div className={s.accordions}>
            <Accordion
              header={'DESCRIPTION'}
              content={itemDetail?.description}
            ></Accordion>
            {itemDetail?.attributes && itemDetail.attributes?.length > 0 && (
              <Accordion
                header={'Features'}
                content={<Stats data={featuresList()} />}
              ></Accordion>
            )}
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
      <MoreItemsSection genNFTAddr={MOCK_GEN_NFT_ADD} />
    </Container>
  );
};

export default GenerativeTokenDetail;
