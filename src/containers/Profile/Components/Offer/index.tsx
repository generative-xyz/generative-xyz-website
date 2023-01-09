import s from './Owned.module.scss';
import { Loading } from '@components/Loading';
import CollectionList from '@components/Collection/List';
import React, { useEffect, useState } from 'react';
import TokenTopFilter from '@containers/GenerativeProjectDetail/TokenTopFilter';
import { IGetProfileTokensResponse } from '@interfaces/api/token-uri';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { getMakeOffersByWallet } from '@services/marketplace';

export const OfferTab = (): JSX.Element => {
  const [tokens, setTokens] = useState<IGetProfileTokensResponse | null>(null);
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const user = useAppSelector(getUserSelector);
  const handleFetchMakeOffers = async () => {
    try {
      if (user.walletAddress) {
        const makeOffers = await getMakeOffersByWallet({
          walletAddress: user.walletAddress,
          closed: false,
        });
        if (makeOffers && makeOffers.result && makeOffers.result.length) {
          setTokens(makeOffers.result);
        }
      }
    } catch (ex) {
      log('can not fetch listing tokens', LogLevel.Error, '');
      // throw Error('failed to fetch item detail');
    }
  };

  useEffect(() => {
    handleFetchMakeOffers();
  }, [user.walletAddress]);

  return (
    <>
      <div className={s.tabContent}>
        <div className={s.filterWrapper}>
          <TokenTopFilter
            keyword=""
            sort=""
            onKeyWordChange={() => {
              //
            }}
            onSortChange={() => {
              //
            }}
          />
        </div>
        <div className={s.tokenListWrapper}>
          <Loading isLoaded={isLoaded} />
          {isLoaded && (
            <div className={s.tokenList}>
              <CollectionList listData={tokens?.result} />
              <div className={s.trigger} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
