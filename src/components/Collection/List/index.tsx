import React from 'react';
import CollectionItem from '@components/Collection/Item';
import { IProjectItem } from '@interfaces/api/project';
import { Empty } from '@components/Collection/Empty';

const CollectionList = ({ listData }: { listData: IProjectItem[] }) => {
  return (
    <>
      {listData?.length > 0 ? (
        <div className="grid grid-cols-4 mt-4">
          {listData.map((item, index: number) => (
            <CollectionItem key={`collection-item-${index}`} data={item} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default CollectionList;
