import s from './Owned.module.scss';
import { Loading } from '@components/Loading';
import CollectionList from '@components/Collection/List';
import React, { useEffect, useState } from 'react';
import TokenTopFilter from '@containers/GenerativeProjectDetail/TokenTopFilter';
import { IGetProfileNFTsResponse } from '@interfaces/api/token-uri';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';
import { getProfileNFTs, getProfileProjects } from '@services/profile';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { IGetProjectItemsResponse } from '@interfaces/api/project';

export const CreatedTab = (): JSX.Element => {
  const [projects, setProjects] = useState<IGetProjectItemsResponse | null>(
    null
  );
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const user = useAppSelector(getUserSelector);

  const handleFetchProjects = async () => {
    try {
      if (user.walletAddress) {
        const collections = await getProfileProjects();
        if (collections && collections.result && collections.result.length) {
          setProjects(collections);
          setTotalProjects(collections.total);
        }
      }
    } catch (ex) {
      log('can not fetch created collections', LogLevel.Error, '');
      // throw Error('failed to fetch item detail');
    }
  };

  useEffect(() => {
    handleFetchProjects();
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
