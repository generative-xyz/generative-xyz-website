import s from './CreatorInfo.module.scss';
import { User } from '@interfaces/user';
import Avatar from '@components/Avatar';
import { convertIpfsToHttp } from '@utils/image';
import { formatAddress } from '@utils/format';

interface IProps {
  creator: User;
}

export const CreatorInfo = ({ creator }: IProps): JSX.Element => {
  return (
    <div className={`${s.useInfo} useInfo`}>
      <div className={s.useInfo_avatar}>
        <Avatar
          imgSrcs={convertIpfsToHttp(creator.avatar)}
          width={34}
          height={34}
        />
      </div>
      <div className={s.userInfo_displayName}>
        {creator.displayName || formatAddress(creator.walletAddress)}
      </div>
    </div>
  );
};
