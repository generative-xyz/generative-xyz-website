import { CreatorInfo } from '@components/CreatorInfo';
import Heading from '@components/Heading';
import { LOGO_MARKETPLACE_URL } from '@constants/common';
import { ROUTE_PATH } from '@constants/route-path';
import { User } from '@interfaces/user';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { Stack } from 'react-bootstrap';
import s from './styles.module.scss';
import { formatTokenId, getProjectIdFromTokenId } from '@utils/format';
import { getListing } from '@services/marketplace';
import Web3 from 'web3';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { Token } from '@interfaces/token';

const CollectionItem = ({ data }: { data: Token }) => {
  const router = useRouter();
  const tokenID = useMemo(() => data.name.split('#')[1], [data.name]);
  const [listingTokenPrice, setListingTokenPrice] = useState('0');

  const handleFetchListingTokenPrice = async () => {
    try {
      const listingTokens = await getListing(
        {
          genNFTAddr: data.genNFTAddr,
          tokenId: tokenID,
        },
        {
          closed: false,
          sort_by: 'newest',
          sort: -1,
        }
      );
      if (listingTokens && listingTokens.result[0]) {
        setListingTokenPrice(
          Web3.utils.fromWei(listingTokens.result[0].price, 'ether')
        );
      }
    } catch (e) {
      log('can not fetch price', LogLevel.Error, '');
    }
  };

  const handleClickItem = () => {
    router.push(
      `${ROUTE_PATH.GENERATIVE}/${getProjectIdFromTokenId(
        parseInt(tokenID)
      )}/${tokenID}`
    );
  };

  const [thumb, setThumb] = useState<string>(data.image);

  const onThumbError = () => {
    setThumb(LOGO_MARKETPLACE_URL);
  };

  useEffect(() => {
    handleFetchListingTokenPrice();
  }, [data.genNFTAddr]);

  return (
    <div onClick={handleClickItem} className={s.collectionCard}>
      <div className={s.collectionCard_inner}>
        <div
          className={`${s.collectionCard_thumb} ${
            thumb === LOGO_MARKETPLACE_URL ? s.isDefault : ''
          }`}
        >
          <img
            onError={onThumbError}
            src={thumb}
            alt={data.name}
            loading={'lazy'}
          />
        </div>
        <div className={s.collectionCard_info}>
          {data.owner ? (
            <CreatorInfo creator={data.owner as User} />
          ) : (
            <CreatorInfo creator={{ walletAddress: data.ownerAddr } as User} />
          )}
          <div className={s.collectionCard_info_title}>
            <Stack
              className={s.collectionCard_info_stack}
              direction="horizontal"
            >
              <Heading as={'h4'} className="token_id ml-auto">
                #{formatTokenId(tokenID)}
              </Heading>
              {listingTokenPrice !== '0' && (
                <Stack
                  direction="horizontal"
                  className={s.collectionCard_listing}
                >
                  <b>Ξ{listingTokenPrice}</b>
                </Stack>
              )}
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
