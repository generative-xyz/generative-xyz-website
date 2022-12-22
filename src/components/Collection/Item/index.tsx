import React from 'react';
import styles from './styles.module.scss';
import { Stack } from 'react-bootstrap';
import AvatarInfo from '@components/AvatarInfo';
import { IProjectItem } from '@interfaces/api/project';
import Image from 'next/image';

const CollectionItem = ({ data }: { data: IProjectItem }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnail}>
        <Image
          src={data.image}
          alt="item thumbnail"
          fill
          style={{ objectFit: 'cover', width: '100%' }}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 25vw"
        />
      </div>
      <h5>{data.name}</h5>
      <Stack direction="horizontal" className={styles.creator} gap={2}>
        <AvatarInfo
          imgSrc=""
          address="Owner Name"
          width={32}
          height={32}
          wrapperStyle={{ marginBottom: '20px' }}
        />
      </Stack>
      <div className={styles.info}>
        <b>price ETH</b>
        <Stack direction="horizontal">
          <span>by &nbsp;</span>
          <AvatarInfo imgSrc="" width={32} height={32} />
        </Stack>
      </div>
    </div>
  );
};

export default CollectionItem;
