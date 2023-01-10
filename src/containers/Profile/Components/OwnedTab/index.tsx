import s from './Owned.module.scss';
import { Loading } from '@components/Loading';
import CollectionList from '@components/Collection/List';
import React, { useContext, useState } from 'react';
import TokenTopFilter from '@containers/GenerativeProjectDetail/TokenTopFilter';
import { ProfileContext } from '@contexts/profile-context';
import useAsyncEffect from 'use-async-effect';

export const OwnedTab = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { profileTokens, handleFetchTokens } = useContext(ProfileContext);
  useAsyncEffect(async () => {
    if (handleFetchTokens) {
      await handleFetchTokens();
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
              <CollectionList listData={profileTokens?.result} />
              <div className={s.trigger} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
