import s from './Owned.module.scss';
import { Loading } from '@components/Loading';
import CollectionList from '@components/Collection/List';
import React from 'react';
import TokenTopFilter from '@containers/GenerativeProjectDetail/TokenTopFilter';
import { Token } from '@interfaces/token';

interface IProp {
  tokens?: Token[];
}

export const OwnedTab = ({ tokens }: IProp): JSX.Element => {
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
          <Loading isLoaded={Boolean(tokens && tokens?.length)} />
          {Boolean(tokens && tokens?.length) && (
            <div className={s.tokenList}>
              <CollectionList listData={tokens} projectInfo={null} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
