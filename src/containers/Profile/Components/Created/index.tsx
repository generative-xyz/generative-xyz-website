import { useContext } from 'react';
import s from './Owned.module.scss';
import { Loading } from '@components/Loading';
import CollectionList from '@components/Collection/List';
import React, { useState } from 'react';
import TokenTopFilter from '@containers/GenerativeProjectDetail/TokenTopFilter';
import { ProfileContext } from '@contexts/profile-context';
import useAsyncEffect from 'use-async-effect';

export const CreatedTab = (): JSX.Element => {
  const { profileProjects, handleFetchProjects } = useContext(ProfileContext);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useAsyncEffect(async () => {
    if (handleFetchProjects) {
      await handleFetchProjects();
      setIsLoaded(true);
    }
  }, []);

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
              <CollectionList listData={profileProjects?.result} />
              <div className={s.trigger} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
