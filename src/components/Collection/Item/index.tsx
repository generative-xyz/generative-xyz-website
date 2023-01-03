import React, { useMemo, useState } from 'react';
import s from './styles.module.scss';
import { IProjectItem } from '@interfaces/api/project';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@constants/route-path';
import { LOGO_MARKETPLACE_URL } from '@constants/common';
import { CreatorInfo } from '@components/CreatorInfo';
import Heading from '@components/Heading';
import { Stack } from 'react-bootstrap';
import AvatarInfo from '@components/AvatarInfo';
import { useSelector } from 'react-redux';
import { projectCurrentSelector } from '@redux/project/selector';
import { User } from '@interfaces/user';

const CollectionItem = ({ data }: { data: IProjectItem }) => {
  const router = useRouter();
  const projectCurrent = useSelector(projectCurrentSelector);

  const tokenID = useMemo(() => data.name.split('#')[1], [data.name]);
  const tokenName = useMemo(() => data.name.split('#')[0], [data.name]);
  const listingPrice = 0.02; // TODO call api marketplace to getting this data
  const handleClickItem = () => {
    router.push(`${ROUTE_PATH.GENERATIVE}/${projectCurrent.id}/${tokenID}`);
  };

  const [thumb, setThumb] = useState<string>(data.image);

  const onThumbError = () => {
    setThumb(LOGO_MARKETPLACE_URL);
  };

  return (
    <div onClick={handleClickItem} className={s.collectionCard}>
      <div className={s.collectionCard_inner}>
        <div
          className={`${s.collectionCard_thumb} ${
            thumb === LOGO_MARKETPLACE_URL ? s.isDefault : ''
          }`}
        >
          <img
            onError={onThumbError}
            src={thumb}
            alt={data.name}
            loading={'lazy'}
          />
        </div>
        <div className={s.collectionCard_info}>
          {projectCurrent.creatorProfile && (
            <CreatorInfo creator={projectCurrent.creatorProfile as User} />
          )}
          <div className={s.collectionCard_info_title}>
            <Stack
              className={s.collectionCard_info_stack}
              direction="horizontal"
            >
              <Heading as={'h4'}>{tokenName}</Heading>
              <Heading as={'h4'} className="token_id ml-auto">
                #{tokenID}
              </Heading>
            </Stack>
          </div>
          {listingPrice > 0 && (
            <Stack direction="horizontal" className={s.collectionCard_listing}>
              <b>{listingPrice} ETH</b>
              <Stack
                className={s.collectionCard_listing_owner}
                direction="horizontal"
              >
                <span>by &nbsp;</span>
                <AvatarInfo
                  imgSrc={data.owner?.avatar}
                  width={32}
                  height={32}
                />
              </Stack>
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
