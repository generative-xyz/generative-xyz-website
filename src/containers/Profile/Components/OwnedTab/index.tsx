import s from './Owned.module.scss';
import { Loading } from '@components/Loading';
import CollectionList from '@components/Collection/List';
import React, { useEffect, useState } from 'react';
import TokenTopFilter from '@containers/GenerativeProjectDetail/TokenTopFilter';
import { IGetProfileNFTsResponse } from '@interfaces/api/token-uri';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';
import { getProfileNFTs } from '@services/profile';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';

export const OwnedTab = (): JSX.Element => {
  const [tokens, setTokens] = useState<IGetProfileNFTsResponse | null>(null);
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const user = useAppSelector(getUserSelector);

  const handleFetchTokens = async () => {
    try {
      if (user.walletAddress) {
        const tokens = await getProfileNFTs({
          walletAddress: user.walletAddress,
        });
        if (tokens && tokens.result && tokens.result.length > 0) {
          setTokens(tokens);
          setTotalTokens(tokens.total || 0);
        }
        setIsLoaded(true);
      }
    } catch (ex) {
      log('can not fetch tokens', LogLevel.Error, '');
      // throw Error('failed to fetch item detail');
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    handleFetchTokens();
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
