import ThumbnailPreview from '@components/ThumbnailPreview';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { LogLevel } from '@enums/log-level';
import { IGetGenerativeTokenUriResponse } from '@interfaces/api/token-uri';
import { getTokenUri } from '@services/token-uri';
import log from '@utils/logger';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { Container, Stack } from 'react-bootstrap';
import Heading from '@components/Heading';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import Text from '@components/Text';
import dayjs from 'dayjs';
import Avatar from '@components/Avatar';
import { formatAddress } from '@utils/format';
import ButtonIcon from '@components/ButtonIcon';
import Accordion from '@components/Accordion';
import { getChainName, getScanUrl } from '@utils/chain';
import { v4 } from 'uuid';
import Link from 'next/link';
import MoreItemsSection from './MoreItemsSection';

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

  const AttributeList = () => {
    return (
      <>
        {itemDetail &&
          itemDetail.attributes?.length > 0 &&
          itemDetail.attributes.map((attr, index: number) => (
            <div key={`${attr.trait_type}-${index}`}>{attr.trait_type}</div>
          ))}
      </>
    );
  };

  const TokenInfo = () => {
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
      },
      {
        id: 'blockchain',
        info: 'Blockchain',
        value: getChainName(),
      },
    ];

    return (
      <>
        {tokenInfos.length > 0 &&
          tokenInfos.map(item => (
            <div className={s.tokenInfo} key={`token-${v4()}`}>
              <Text size="18" fontWeight="semibold">
                {item.info}
              </Text>
              <Stack direction="horizontal" gap={2}>
                <Text size="18" fontWeight="semibold">
                  {item.value}
                </Text>
                {!!item?.link && (
                  <Link href={item.link}>
                    <SvgInset svgUrl={`${CDN_URL}/icons/ic-link.svg`} />
                  </Link>
                )}
              </Stack>
            </div>
          ))}
      </>
    );
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
                  Owner
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

            <Accordion
              header={'Features'}
              content={<AttributeList />}
            ></Accordion>
            <Accordion
              header={'Token Info'}
              content={<TokenInfo />}
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
