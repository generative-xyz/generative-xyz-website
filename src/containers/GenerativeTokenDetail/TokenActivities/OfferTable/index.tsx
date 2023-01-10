import ButtonIcon from '@components/ButtonIcon';
import Link from '@components/Link';
import Table from '@components/Table';
import { ROUTE_PATH } from '@constants/route-path';
import { GenerativeTokenDetailContext } from '@contexts/generative-token-detail-context';
import { getUserSelector } from '@redux/user/selector';
import { calculateFloorDifference, convertToETH } from '@utils/currency';
import { formatAddress } from '@utils/format';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import s from './styles.module.scss';
import dayjs from 'dayjs';

const TABLE_OFFERS_HEADING = [
  'Price',
  'Floor difference',
  'Expiration',
  'From',
  '',
];

const OfferTable = () => {
  const { tokenOffers, marketplaceStats } = useContext(
    GenerativeTokenDetailContext
  );

  const user = useSelector(getUserSelector);

  const offerDatas = tokenOffers?.map(offer => {
    const endDate = dayjs.unix(Number(offer?.durationTime));
    return {
      id: offer.offeringID,
      render: {
        price: convertToETH(offer?.price || ''),
        floor_differece: calculateFloorDifference(
          marketplaceStats?.floorPrice || '0',
          offer?.price
        ),
        expired_date:
          offer?.durationTime === '0'
            ? 'On Time'
            : endDate.format('MMM DD, YYYY'),
        buyer:
          user.walletAddress === offer?.buyer ? (
            <Link href={ROUTE_PATH.PROFILE}>You</Link>
          ) : (
            // TODO: Update to correct profile
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

  return <Table tableHead={TABLE_OFFERS_HEADING} data={offerDatas}></Table>;
};

export default OfferTable;
