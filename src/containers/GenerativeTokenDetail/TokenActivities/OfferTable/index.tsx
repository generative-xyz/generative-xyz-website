import ButtonIcon from '@components/ButtonIcon';
import Link from '@components/Link';
import Table from '@components/Table';
import { ROUTE_PATH } from '@constants/route-path';
import { GenerativeTokenDetailContext } from '@contexts/generative-token-detail-context';
import { ErrorMessage } from '@enums/error-message';
import { TokenOffer } from '@interfaces/token';
import { getUserSelector } from '@redux/user/selector';
import { calculateFloorDifference, convertToETH } from '@utils/currency';
import { formatAddress } from '@utils/format';
import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import s from './styles.module.scss';

const TABLE_OFFERS_HEADING = [
  'Price',
  'Floor difference',
  // 'Expiration',
  'From',
  '',
];

const OfferTable = () => {
  const { tokenOffers, handleAcceptOffer, handleCancelOffer } = useContext(
    GenerativeTokenDetailContext
  );
  const user = useSelector(getUserSelector);
  const [isLoading, setIsLoading] = useState(false);

  const onAcceptOffer = async (offer: TokenOffer) => {
    try {
      setIsLoading(true);
      await handleAcceptOffer(offer);
      toast.success('Accepted offer successfully');
    } catch (_: unknown) {
      toast.error(ErrorMessage.DEFAULT);
    } finally {
      setIsLoading(false);
    }
  };

  const onCancelOffer = async (offer: TokenOffer) => {
    try {
      setIsLoading(true);
      await handleCancelOffer(offer);
      toast.success('Canceled offer successfully');
    } catch (_: unknown) {
      toast.error(ErrorMessage.DEFAULT);
    } finally {
      setIsLoading(false);
    }
  };

  const offerDatas = tokenOffers?.map(offer => {
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
            // TODO: Update to correct profile
            <Link href={ROUTE_PATH.PROFILE}>
              {formatAddress(offer?.buyer || '')}
            </Link>
          ),
        cancel: (
          <div className={s.actionWrapper}>
            {user.walletAddress === offer?.token?.ownerAddr && (
              <ButtonIcon
                disabled={isLoading}
                onClick={() => onAcceptOffer(offer)}
                className={s.actionBtn}
                sizes="small"
              >
                Accept
              </ButtonIcon>
            )}
            {user.walletAddress === offer?.buyer && (
              <ButtonIcon
                disabled={isLoading}
                onClick={() => onCancelOffer(offer)}
                className={s.actionBtn}
                sizes="small"
                variants="outline"
              >
                Cancel
              </ButtonIcon>
            )}
          </div>
        ),
      },
    };
  });

  return (
    <Table
      tableHead={TABLE_OFFERS_HEADING}
      data={offerDatas || undefined}
    ></Table>
  );
};

export default OfferTable;
