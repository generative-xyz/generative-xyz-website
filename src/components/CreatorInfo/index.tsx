import s from './CreatorInfo.module.scss';
import { User } from '@interfaces/user';
import { CDN_URL } from '@constants/config';

interface IProps {
  creator: User;
}
export const CreatorInfo = ({ creator }: IProps): JSX.Element => {
  return (
    <div className={s.useInfo}>
      <div className={s.useInfo_avatar}>
        <img
          src={creator.avatar || `${CDN_URL}/images/default-avatar.svg`}
          alt="avatar"
        />
      </div>
      <div className={s.userInfo_displayName}>
        {creator.displayName || 'Meo Meo'}
      </div>
    </div>
  );
};
