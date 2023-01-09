import s from './Owned.module.scss';
import { Loading } from '@components/Loading';
import CollectionList from '@components/Collection/List';
import React, { useState } from 'react';
import TokenTopFilter from '@containers/GenerativeProjectDetail/TokenTopFilter';
// import useAsyncEffect from 'use-async-effect';
// import { ProfileContext } from '@contexts/profile-context';

export const ListingTab = (): JSX.Element => {
  // const context = useContext(ProfileContext);
  //todo
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // useAsyncEffect(async () => {
  //   await
  // }, []);
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
