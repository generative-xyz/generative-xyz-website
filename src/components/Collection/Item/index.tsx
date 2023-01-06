import { CreatorInfo } from '@components/CreatorInfo';
import Heading from '@components/Heading';
import { LOGO_MARKETPLACE_URL } from '@constants/common';
import { ROUTE_PATH } from '@constants/route-path';
import { IProjectItem } from '@interfaces/api/project';
import { User } from '@interfaces/user';
// import { projectCurrentSelector } from '@redux/project/selector';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { Stack } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import s from './styles.module.scss';
import { formatTokenId, getProjectIdFromTokenId } from '@utils/format';
import { getListing, getMakeOffers } from '@services/marketplace';
import Web3 from 'web3';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { IMakeOffers } from '@interfaces/api/marketplace';

const CollectionItem = ({ data }: { data: IProjectItem }) => {
  const router = useRouter();
  // const projectCurrent = useSelector(projectCurrentSelector);

  const tokenID = useMemo(() => data.name.split('#')[1], [data.name]);
  // const tokenName = useMemo(() => data.name.split('#')[0], [data.name]);
  const [listingTokenPrice, setListingTokenPrice] = useState('0');
  const [makeOffers, setMakeOffers] = useState<IMakeOffers | null>(null);
  const handleFetchListingTokenPrice = async () => {
    try {
      const listingTokens = await getListing({
        genNFTAddr: data.genNFTAddr,
        tokenId: tokenID,
        closed: false,
      });
      if (listingTokens && listingTokens.result[0]) {
        setListingTokenPrice(
          Web3.utils.fromWei(listingTokens.result[0].price, 'ether')
        );
      }
    } catch (e) {
      log('can not fetch price', LogLevel.Error, '');
      // throw Error('failed to fetch item detail');
    }
  };
  const handleFetchMakeOffers = async () => {
    try {
      const makeOffers = await getMakeOffers({
        genNFTAddr: data.genNFTAddr,
        tokenId: tokenID,
        closed: false,
      });
      if (makeOffers && makeOffers.result[0]) {
        setMakeOffers(makeOffers);
      }
    } catch (e) {
      log('can not fetch price', LogLevel.Error, '');
      // throw Error('failed to fetch item detail');
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
    handleFetchMakeOffers();
  }, []);

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
              {/*<Heading as={'h4'}>{tokenName}</Heading>*/}
              <Heading as={'h4'} className="token_id ml-auto">
                #{formatTokenId(tokenID)}
              </Heading>
              {listingTokenPrice != '0' && (
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
        <div style={{ display: 'none' }}>
          {makeOffers &&
            makeOffers.result &&
            makeOffers.result.length > 0 &&
            makeOffers.result.map((item, i) => (
              <div key={`item_listing_token_${i}`}>
                {item.offeringID}, {item.token ? item.token.image : ''}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
