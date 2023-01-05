import { CreatorInfo } from '@components/CreatorInfo';
import Heading from '@components/Heading';
import { LOGO_MARKETPLACE_URL } from '@constants/common';
import { ROUTE_PATH } from '@constants/route-path';
import { IProjectItem } from '@interfaces/api/project';
import { User } from '@interfaces/user';
// import { projectCurrentSelector } from '@redux/project/selector';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { Stack } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import s from './styles.module.scss';
import { formatTokenId } from '@utils/format';

const CollectionItem = ({ data }: { data: IProjectItem }) => {
  const router = useRouter();
  // const projectCurrent = useSelector(projectCurrentSelector);

  const tokenID = useMemo(() => data.name.split('#')[1], [data.name]);
  // const tokenName = useMemo(() => data.name.split('#')[0], [data.name]);
  // const listingPrice = 0.02;
  const handleClickItem = () => {
    router.push(
      `${ROUTE_PATH.GENERATIVE}/${Math.floor(
        parseInt(tokenID) / 1000000
      )}/${tokenID}`
    );
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
          {data.owner && <CreatorInfo creator={data.owner as User} />}
          <div className={s.collectionCard_info_title}>
            <Stack
              className={s.collectionCard_info_stack}
              direction="horizontal"
            >
              {/*<Heading as={'h4'}>{tokenName}</Heading>*/}
              <Heading as={'h4'} className="token_id ml-auto">
                #{formatTokenId(tokenID)}
              </Heading>
            </Stack>
          </div>
          {/* {listingPrice > 0 && (
            <Stack direction="horizontal" className={s.collectionCard_listing}>
              <b>{listingPrice} Ξ</b>
            </Stack>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
