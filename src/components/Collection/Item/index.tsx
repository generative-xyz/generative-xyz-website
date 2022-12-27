import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { Stack } from 'react-bootstrap';
import AvatarInfo from '@components/AvatarInfo';
import { IProjectItem } from '@interfaces/api/project';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@constants/route-path';

const CollectionItem = ({ data }: { data: IProjectItem }) => {
  const router = useRouter();
  const { projectID } = router.query as {
    projectID: string;
  };

  const tokenID = useMemo(() => data.name.split('#')[1], [data.name]);
  const owner = data.owner?.name;
  const ownerAvatar = data.owner?.avatar;
  const listingPrice = 0.02; // TODO call api marketplace to getting this data
  const handleClickItem = () => {
    router.push(`${ROUTE_PATH.GENERATIVE}/${projectID}/${tokenID}`);
  };

  return (
    <div className={styles.wrapper} onClick={handleClickItem}>
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
      <h5>{`# ${parseInt(tokenID) % 1e6}`}</h5>
      {data.owner != null && (
        <Stack direction="horizontal" className={styles.creator} gap={2}>
          <AvatarInfo
            imgSrc={ownerAvatar}
            leftContent={owner}
            width={32}
            height={32}
            wrapperStyle={{ marginBottom: '20px' }}
          />
        </Stack>
      )}
      {listingPrice > 0 && (
        <div className={styles.info}>
          <b>{listingPrice} ETH</b>
          {/*<Stack direction="horizontal">
            <span>by &nbsp;</span>
            <AvatarInfo imgSrc="" width={32} height={32}/>
          </Stack>*/}
        </div>
      )}
    </div>
  );
};

export default CollectionItem;
