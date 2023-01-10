import s from './Owned.module.scss';
import { Loading } from '@components/Loading';
import React, { useContext } from 'react';
import TokenTopFilter from '@containers/GenerativeProjectDetail/TokenTopFilter';
import { calculateFloorDifference, convertToETH } from '@utils/currency';
import Link from '@components/Link';
import { ROUTE_PATH } from '@constants/route-path';
import { formatAddress } from '@utils/format';
import ButtonIcon from '@components/ButtonIcon';
import Table from '@components/Table';
import { ProfileContext } from '@contexts/profile-context';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';

const TABLE_OFFERS_HEADING = [
  'Price',
  'Floor difference',
  // 'Expiration',
  'From',
  '',
];

export const OfferTab = (): JSX.Element => {
  const user = useAppSelector(getUserSelector);
  const { isLoadedProfileMakeOffer, profileMakeOffer } =
    useContext(ProfileContext);

  const offerDatas = profileMakeOffer?.result?.map(offer => {
    return {
      id: offer.offeringID,
      render: {
        price: convertToETH(offer?.price || ''),
        floor_differece: calculateFloorDifference(
          offer?.token?.project?.stats?.floorPrice || '0',
          offer?.price
        ),
        // expired_date: offer?.durationTime,
        buyer:
          user.walletAddress === offer?.buyer ? (
            <Link href={ROUTE_PATH.PROFILE}>You</Link>
          ) : (
            <Link href={ROUTE_PATH.PROFILE}>
              {formatAddress(offer?.buyer || '')}
            </Link>
          ),
        cancel: user.walletAddress === offer?.buyer && (
          <div className={s.action_btn}>
            <ButtonIcon sizes="small" variants="outline">
              Cancel
            </ButtonIcon>
          </div>
        ),
      },
    };
  });

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
          <Loading isLoaded={isLoadedProfileMakeOffer} />
          {isLoadedProfileMakeOffer && (
            <Table
              tableHead={TABLE_OFFERS_HEADING}
              data={offerDatas || undefined}
            ></Table>
          )}
        </div>
      </div>
    </>
  );
};
