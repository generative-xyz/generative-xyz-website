import React from 'react';
import CollectionItem from '@components/Collection/Item';
import { IProjectItem } from '@interfaces/api/project';

const CollectionList = ({ listData }: { listData: IProjectItem[] }) => {
  return (
    <div className="grid grid-cols-4 mt-4">
      {listData?.length > 0 &&
        listData.map((item, index: number) => (
          <CollectionItem key={`collection-item-${index}`} data={item} />
        ))}
    </div>
  );
};

export default CollectionList;
