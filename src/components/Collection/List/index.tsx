import React from 'react';
import CollectionItem from '@components/Collection/Item';
import { IProjectItem } from '@interfaces/api/project';
import { Empty } from '@components/Collection/Empty';
import { Project } from '@interfaces/project';

const CollectionList = ({
  listData,
  projectInfo,
}: {
  listData: IProjectItem[];
  projectInfo: Project | null;
}) => {
  return (
    <>
      {listData?.length > 0 ? (
        <div className="grid grid-cols-4">
          {listData.map((item, index: number) => (
            <CollectionItem key={`collection-item-${index}`} data={item} />
          ))}
        </div>
      ) : (
        <Empty projectInfo={projectInfo} />
      )}
    </>
  );
};

export default CollectionList;
